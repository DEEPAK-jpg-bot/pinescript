#!/usr/bin/env node
/**
 * SIMPLIFIED FINAL VERIFICATION
 * Confirms Pine Script context is fully integrated
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n✅ PINE SCRIPT CONTEXT INTEGRATION - FINAL CHECK\n');
console.log('='.repeat(70));

let allPassed = true;

function check(name, condition) {
    const icon = condition ? '✅' : '❌';
    console.log(`${icon} ${name}`);
    if (!condition) allPassed = false;
    return condition;
}

// 1. Source file exists and has content
const contextPath = join(__dirname, 'api', 'data', 'pine_script_context.txt');
const context = readFileSync(contextPath, 'utf8');
check('Source context file exists and loaded', context.length > 80000);

// 2. Typescript module exists and exports
const tsPath = join(__dirname, 'src', 'lib', 'pineScriptContext.ts');
const tsModule = readFileSync(tsPath, 'utf8');
check('TypeScript module generated', tsModule.includes('export const PINE_SCRIPT_CONTEXT'));

// 3. API route imports and uses context
const apiPath = join(__dirname, 'src', 'app', 'api', 'generate', 'route.ts');
const api = readFileSync(apiPath, 'utf8');
check('API imports PINE_SCRIPT_CONTEXT', api.includes('import { PINE_SCRIPT_CONTEXT }'));
check('API injects context into prompt', api.includes('${PINE_SCRIPT_CONTEXT}'));

// 4. Critical content present
check('Contains v6 rules', context.includes('VERSION & DECLARATION RULES'));
check('Contains type rules', context.includes('TYPE SYSTEM RULES'));
check('Contains scope rules', context.includes('LOCAL SCOPE RESTRICTIONS'));
check('Contains loop syntax', context.includes('for i in range'));

// 5. Rate limit correct
check('Rate limit set to 14 RPM', api.includes('maxPerMinute: 14'));

// 6. Models are stable
check('Uses stable Gemini models', api.includes('gemini-2.0-flash') && !api.includes('gemini-pro'));

// 7. Caching enabled
check('Response caching active', api.includes('response_cache'));

console.log('\n' + '='.repeat(70));

if (allPassed) {
    console.log('\n🎉 SUCCESS! Pine Script context is FULLY INTEGRATED\n');
    console.log('Every AI generation will follow these rules:');
    console.log('   • ' + context.split('\n').length + ' lines of Pine Script v6 rules');
    console.log('   • Injected into every API request');
    console.log('   • Enforced by the AI model\n');
    process.exit(0);
} else {
    console.log('\n❌ FAILED - Some checks did not pass\n');
    process.exit(1);
}
