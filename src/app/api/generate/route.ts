
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';
import { generateSchema } from '@/lib/schemas';
import { PINE_SCRIPT_CONTEXT } from '@/lib/pineScriptContext';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// GLOBAL RATE LIMITER (15 RPM = Google AI Free Tier Limit)
const rateLimiter = {
    requests: [] as number[],
    maxPerMinute: 14, // Safety margin: 1 below actual limit
    cleanOld() {
        const oneMinuteAgo = Date.now() - 60000;
        this.requests = this.requests.filter(t => t > oneMinuteAgo);
    },
    canMakeRequest(): boolean {
        this.cleanOld();
        return this.requests.length < this.maxPerMinute;
    },
    recordRequest() {
        this.requests.push(Date.now());
    },
    async waitForSlot(maxWaitMs = 30000): Promise<boolean> {
        const startTime = Date.now();
        while (!this.canMakeRequest()) {
            if (Date.now() - startTime > maxWaitMs) return false;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return true;
    },
    getStatus() {
        this.cleanOld();
        return {
            current: this.requests.length,
            max: this.maxPerMinute,
            available: this.maxPerMinute - this.requests.length
        };
    }
};

export async function POST(req: Request) {
    const dynamicApiKey = process.env.GOOGLE_AI_SERVER_KEY || process.env.GEMINI_API_KEY || '';

    if (!dynamicApiKey) {
        return NextResponse.json({ error: 'AI Service configuration missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(dynamicApiKey);

    const supabase = createAdminClient();
    if (!supabase) {
        console.error('Supabase admin client not initialized');
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    try {
        // 1. Auth & Validation
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Missing authorization header' }, { status: 401 });

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            console.error('Auth Verification Failed:', {
                message: authError?.message,
                status: authError?.status,
                tokenPresent: !!token,
                tokenLength: token?.length
            });
            return NextResponse.json({
                error: `Authentication failed: ${authError?.message || 'Invalid session'}. Please refresh the page.`
            }, { status: 401 });
        }

        // 2. Quota & Reset Logic (Trigger via RPC)
        const { data: quota, error: quotaError } = await supabase.rpc('check_gen_quota', { p_user_id: user.id });

        if (quotaError) {
            console.error('Quota Check Failed:', quotaError);
            return NextResponse.json({
                error: `Failed to verify account quota: ${quotaError.message}.`
            }, { status: 500 });
        }

        if (quota && !quota.allowed) {
            return NextResponse.json({
                error: `Quota exceeded: ${quota.reason === 'daily_quota_exceeded' ? 'You have used your daily limit.' : quota.reason}. Resets at: ${quota.resetAt}`
            }, { status: 429 });
        }

        // 3. Parse Body & Validate
        const body = await req.json();
        const validation = generateSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
        }

        const { messages } = validation.data;
        const lastUserMessage = messages[messages.length - 1];

        // AUTO-LEARN: If this is a "Fix Error" request, log it for future context updates
        if (lastUserMessage.content.startsWith('Fix Error:')) {
            // Fire-and-forget async log (don't await)
            const errorSnippet = lastUserMessage.content.replace('Fix Error:', '').trim();
            if (errorSnippet) {
                supabase.from('error_reports').insert({
                    user_id: user.id,
                    error_message: errorSnippet,
                    status: 'pending'
                }).then(({ error }) => {
                    if (error) console.error('Failed to log error report:', error);
                });
            }
        }

        // CACHE LOOKUP: Check if we've answered this exact query before
        const promptText = messages.map(m => `${m.role}: ${m.content}`).join('\n');
        const promptHash = crypto.createHash('sha256').update(promptText).digest('hex');

        const { data: cachedResponse } = await supabase
            .from('response_cache')
            .select('response, created_at')
            .eq('prompt_hash', promptHash)
            .single();

        if (cachedResponse && cachedResponse.created_at) {
            const cacheAge = Date.now() - new Date(cachedResponse.created_at).getTime();
            const isRecent = cacheAge < 7 * 24 * 60 * 60 * 1000; // 7 days

            if (isRecent) {
                console.log(`Cache hit: ${promptHash.substring(0, 8)}...`);
                const stream = new ReadableStream({
                    start(controller) {
                        const encoder = new TextEncoder();
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: cachedResponse.response })}\n\n`));
                        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                        controller.close();
                    }
                });
                return new NextResponse(stream, {
                    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
                });
            }
        }

        // RATE LIMIT: Queue request if near capacity
        const gotSlot = await rateLimiter.waitForSlot(10000);
        if (!gotSlot) {
            return NextResponse.json({
                error: 'Service at capacity. Please wait 30 seconds and retry.',
                retryAfter: 30
            }, { status: 429 });
        }
        rateLimiter.recordRequest();

        // 4. Prepare Prompt Rules (Context Injection from File)
        const systemPrompt = `You are an expert Pine Script v6 developer for TradingView. 
STRICT V6 RULES & ERROR PREVENTION:
${PINE_SCRIPT_CONTEXT}

OUTPUT INSTRUCTIONS:
- Return ONLY the valid Pine Script code in a \`\`\`pinescript block.
- Followed by a very short explanation.
- If the user asks to "fix" code, explain the specific v6 breaking change you fixed (e.g. "Removed deprecated 'transp' parameter").`;

        // 5. Model Fallback Logic (Absolute Resilience v4.4)
        // System Instruction via History Injection (Universal Compatibility)
        const history = [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: 'Understood. I will strictly follow the Pine Script v6 rules and output format.' }] },
            ...messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }))
        ];

        // Critical Fix: Use version-locked identifiers for maximum stability
        const modelsToTry = [
            'gemini-1.5-flash-latest',
            'gemini-1.5-pro-latest',
            'gemini-1.5-flash-8b-latest'
        ];

        let result;
        let lastGenerationError;

        for (const modelId of modelsToTry) {
            try {
                // Let the SDK auto-negotiate. System prompt is now in history.
                const testModel = genAI.getGenerativeModel({
                    model: modelId,
                    generationConfig: {
                        temperature: 0.5,
                        maxOutputTokens: 8192,
                    }
                });

                const chat = testModel.startChat({ history });
                const lastMessage = messages[messages.length - 1];

                // Active Handshake
                result = await chat.sendMessageStream(lastMessage.content);
                console.log(`Connection established: ${modelId}`);
                break;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                console.warn(`Handshake failed for ${modelId}: ${msg}`);
                lastGenerationError = e;
            }
        }

        if (!result) {
            const errorMsg = lastGenerationError instanceof Error ? lastGenerationError.message : 'Connection timed out';
            throw new Error(`AI Service Unavailable. Diagnostics: ${errorMsg}.`);
        }

        // 6. Stream Response Handler
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let fullResponse = '';
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            fullResponse += text;
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));

                    // CACHE WRITE: Save for future reuse (fire-and-forget)
                    if (fullResponse.length > 0) {
                        supabase.from('response_cache').upsert({
                            prompt_hash: promptHash,
                            prompt: promptText.substring(0, 5000),
                            response: fullResponse,
                            tokens_used: Math.ceil(fullResponse.length / 4)
                        }).then(({ error }) => {
                            if (error) console.error('Cache write failed:', error);
                        });
                    }

                } catch (e: unknown) {
                    controller.error(e);
                } finally {
                    controller.close();
                }
            }
        });

        return new NextResponse(stream, {
            headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
        });

    } catch (error: unknown) {
        console.error('API Error:', error);

        const errorMsg = error instanceof Error ? error.message : String(error);
        const status = (error as { status?: number })?.status || (errorMsg.includes('429') ? 429 : 500);

        return NextResponse.json({
            error: `AI Service Error (${status}): ${errorMsg}`,
            suggestion: status === 429 ? 'You may have reached your Google AI daily quota.' : 'Please try refreshing the page.'
        }, { status });
    }
}
