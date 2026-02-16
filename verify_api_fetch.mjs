
import fs from 'fs';
import path from 'path';

// Load Env
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
        const parts = line.split('=');
        if (parts.length >= 2 && !line.startsWith('#')) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
            env[key] = val;
        }
    }
}

const API_KEY = env.GOOGLE_AI_SERVER_KEY || env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ No API Key found.");
    process.exit(1);
}

console.log("🔑 Checking Key Validity via REST API...");

async function checkKey() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Ping" }] }]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HTTP ${response.status}: ${err}`);
        }

        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (output) {
            console.log(`✅ API Key Valid! Model Responded: "${output.trim()}"`);
        } else {
            console.warn("⚠️ API Key Valid but no text output (maybe safety filter?)");
        }

    } catch (error) {
        console.error("❌ API Validation Failed:", error.message);
        process.exit(1);
    }
}

checkKey();
