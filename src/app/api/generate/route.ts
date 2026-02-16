
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAdminClient } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';
import { generateSchema } from '@/lib/schemas';
import { PINE_SCRIPT_CONTEXT } from '@/lib/pineScriptContext';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Increased duration for detailed response

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

        // Synchronized with latest 2.5 and 2.0 release tracks
        const modelsToTry = [
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-pro'
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
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));

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
