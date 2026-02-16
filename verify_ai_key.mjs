
import { GoogleGenerativeAI } from '@google/generative-ai';
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

console.log("🔑 API Key found. Testing connection...");

async function testHelp() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent("Say 'System Operational'.");
        const response = result.response.text();
        console.log(`✅ AI Response: "${response.trim()}"`);
    } catch (error) {
        console.error("❌ AI Connection Failed:", error.message);
        process.exit(1);
    }
}

testHelp();
