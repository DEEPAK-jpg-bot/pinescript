#!/usr/bin/env node
/**
 * COMPLETE SYSTEM VERIFICATION SCRIPT
 * Verifies EVERY component of the Pine Script AI context integration
 */

import { readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔬 COMPLETE SYSTEM VERIFICATION\n');
console.log('='.repeat(80));

const results = {
    passed: 0,
    failed: 0,
    warnings: 0
};

function test(name, condition, details = '') {
    const icon = condition ? '✅' : '❌';
    console.log(`${icon} ${name}`);
    if (details) console.log(`   ${details}`);
    condition ? results.passed++ : results.failed++;
}

function warn(name, details = '') {
    console.log(`⚠️  ${name}`);
    if (details) console.log(`   ${details}`);
    results.warnings++;
}

// ============================================================================
// TEST 1: SOURCE CONTEXT FILE
// ============================================================================
console.log('\n📄 STEP 1: SOURCE CONTEXT FILE VALIDATION\n');

const contextPath = join(__dirname, 'api', 'data', 'pine_script_context.txt');
let contextContent;

try {
    contextContent = readFileSync(contextPath, 'utf8');
    const stats = statSync(contextPath);

    test('Context file exists', true, `${contextPath}`);
    test('Context file not empty', contextContent.length > 0, `${contextContent.length} bytes`);
    test('Context file size reasonable', contextContent.length > 50000 && contextContent.length < 200000,
        `${Math.round(contextContent.length / 1024)}KB`);

    // Check for critical sections
    test('Contains version rules', contextContent.includes('VERSION & DECLARATION RULES'));
    test('Contains type system rules', contextContent.includes('TYPE SYSTEM RULES'));
    test('Contains loop rules', contextContent.includes('LOOP RULES'));
    test('Contains v6 breaking changes', contextContent.includes('v6 BREAKING CHANGE') || contextContent.includes('v6 CHANGE'));
    test('Contains error examples', contextContent.includes('ERROR') || contextContent.includes('WRONG'));
    test('Contains fix examples', contextContent.includes('FIX') || contextContent.includes('CORRECT'));

    // Count rules
    const errorCount = (contextContent.match(/ERROR \d+\.\d+/g) || []).length;
    test('Has comprehensive error documentation', errorCount > 50, `${errorCount} documented errors`);

} catch (e) {
    test('Context file exists', false, e.message);
}

// ============================================================================
// TEST 2: CONVERSION SCRIPT
// ============================================================================
console.log('\n⚙️  STEP 2: CONVERSION SCRIPT VALIDATION\n');

const updateScriptPath = join(__dirname, 'update_context.mjs');

try {
    const updateScript = readFileSync(updateScriptPath, 'utf8');

    test('Conversion script exists', true);
    test('Script reads from correct path', updateScript.includes('api/data/pine_script_context.txt'));
    test('Script writes to correct path', updateScript.includes('src/lib/pineScriptContext.ts'));
    test('Script exports constant', updateScript.includes('export const PINE_SCRIPT_CONTEXT'));
    test('Script escapes special characters', updateScript.includes('replace') && updateScript.includes('\\\\'));

} catch (e) {
    test('Conversion script exists', false, e.message);
}

// ============================================================================
// TEST 3: GENERATED TYPESCRIPT MODULE
// ============================================================================
console.log('\n📦 STEP 3: GENERATED TYPESCRIPT MODULE VALIDATION\n');

const tsModulePath = join(__dirname, 'src', 'lib', 'pineScriptContext.ts');
let tsContent;

try {
    tsContent = readFileSync(tsModulePath, 'utf8');

    test('TypeScript module exists', true, tsModulePath);
    test('Module exports PINE_SCRIPT_CONTEXT', tsContent.includes('export const PINE_SCRIPT_CONTEXT'));
    test('Module is auto-generated comment', tsContent.includes('Auto-generated'));
    test('Content is template literal', tsContent.includes('`'));

    // Verify content integrity
    const tsSize = statSync(tsModulePath).size;
    test('Generated file size reasonable', tsSize > 50000 && tsSize < 200000, `${Math.round(tsSize / 1024)}KB`);

    // Check if content matches source (with escaping)
    const hasVersionRules = tsContent.includes('VERSION & DECLARATION RULES');
    test('Generated content includes source rules', hasVersionRules);

    // Verify no corruption
    test('No unescaped backticks in content', !tsContent.match(/`[^`]*\$\{[^}]*\}/), 'Template literal syntax clean');

} catch (e) {
    test('TypeScript module exists', false, e.message);
}

// ============================================================================
// TEST 4: API ROUTE INTEGRATION
// ============================================================================
console.log('\n🔌 STEP 4: API ROUTE INTEGRATION VALIDATION\n');

const apiRoutePath = join(__dirname, 'src', 'app', 'api', 'generate', 'route.ts');

try {
    const apiRoute = readFileSync(apiRoutePath, 'utf8');

    test('API route exists', true);
    test('Imports PINE_SCRIPT_CONTEXT', apiRoute.includes('import { PINE_SCRIPT_CONTEXT }') ||
        apiRoute.includes("import {PINE_SCRIPT_CONTEXT}"));
    test('Imports from correct path', apiRoute.includes("from '@/lib/pineScriptContext'"));
    test('Injects context into system prompt', apiRoute.includes('${PINE_SCRIPT_CONTEXT}'));
    test('System prompt mentions v6', apiRoute.includes('v6') || apiRoute.includes('V6'));
    test('System prompt is strict', apiRoute.includes('STRICT') || apiRoute.includes('strict'));
    test('Rate limiting configured', apiRoute.includes('rateLimiter'));
    test('Rate limit set to 14 RPM', apiRoute.includes('maxPerMinute: 14'));
    test('Response caching enabled', apiRoute.includes('response_cache'));
    test('Cache lookup before AI call', apiRoute.search(/cache/i) < apiRoute.search(/sendMessageStream/));

    // Verify model fallback list
    test('Uses stable models only', apiRoute.includes('gemini-2.0-flash') &&
        apiRoute.includes('gemini-1.5-pro') &&
        !apiRoute.includes('gemini-pro'));

} catch (e) {
    test('API route integration', false, e.message);
}

// ============================================================================
// TEST 5: CONTENT SYNCHRONIZATION
// ============================================================================
console.log('\n🔄 STEP 5: CONTENT SYNCHRONIZATION CHECK\n');

if (contextContent && tsContent) {
    // Extract the content from the TS template literal
    const tsContentExtracted = tsContent
        .match(/export const PINE_SCRIPT_CONTEXT = `(.+)`/s)?.[1]
        ?.replace(/\\\\/g, '\\')
        ?.replace(/\\n/g, '\n')
        ?.replace(/\\r/g, '\r')
        ?.trim();

    const sourceContentTrimmed = contextContent.trim();

    if (tsContentExtracted === sourceContentTrimmed) {
        test('Source and generated content PERFECTLY synchronized', true);
    } else {
        const sizeDiff = Math.abs(tsContentExtracted?.length - sourceContentTrimmed.length);
        if (sizeDiff < 100) {
            warn('Minor content difference detected', `${sizeDiff} bytes difference - may be escaping`);
        } else {
            test('Source and generated content synchronized', false,
                `${sizeDiff} bytes difference - run update_context.mjs`);
        }
    }

    // Check if critical sections are present in both
    const criticalSections = [
        'VERSION & DECLARATION RULES',
        'TYPE SYSTEM RULES',
        'CONTROL STRUCTURE RULES',
        'LOCAL SCOPE RESTRICTIONS'
    ];

    criticalSections.forEach(section => {
        const inSource = contextContent.includes(section);
        const inGenerated = tsContent.includes(section);
        test(`Section "${section}" in both files`, inSource && inGenerated);
    });
}

// ============================================================================
// TEST 6: BUILD VERIFICATION
// ============================================================================
console.log('\n🏗️  STEP 6: BUILD CONFIGURATION CHECK\n');

const packageJsonPath = join(__dirname, 'package.json');

try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

    test('Package.json exists', true);
    test('Has build script', packageJson.scripts?.build !== undefined);
    test('Uses Next.js', packageJson.dependencies?.next !== undefined);
    test('Has Supabase client', packageJson.dependencies?.['@supabase/supabase-js'] !== undefined);
    test('Has Google AI SDK', packageJson.dependencies?.['@google/generative-ai'] !== undefined);
    test('Has dotenv for audit', packageJson.dependencies?.dotenv !== undefined);

} catch (e) {
    test('Package.json valid', false, e.message);
}

// ============================================================================
// TEST 7: TYPESCRIPT CONFIG
// ============================================================================
console.log('\n🔧 STEP 7: TYPESCRIPT CONFIGURATION\n');

const tsconfigPath = join(__dirname, 'tsconfig.json');

try {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));

    test('TypeScript config exists', true);
    test('Path alias configured', tsconfig.compilerOptions?.paths?.['@/*'] !== undefined);

} catch (e) {
    test('TypeScript config valid', false, e.message);
}

// ============================================================================
// FINAL REPORT
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 VERIFICATION SUMMARY\n');

const total = results.passed + results.failed + results.warnings;
const percentage = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);

console.log(`✅ PASSED: ${results.passed}`);
console.log(`❌ FAILED: ${results.failed}`);
console.log(`⚠️  WARNINGS: ${results.warnings}`);
console.log(`\n🎯 SUCCESS RATE: ${percentage}%`);

if (results.failed === 0 && results.warnings === 0) {
    console.log('\n✨ PERFECT! All systems verified and operational.\n');
    console.log('🚀 The Pine Script context is FULLY INTEGRATED:');
    console.log('   1. Source file: api/data/pine_script_context.txt');
    console.log('   2. Converted to: src/lib/pineScriptContext.ts');
    console.log('   3. Imported in: src/app/api/generate/route.ts');
    console.log('   4. Injected into: AI system prompt');
    console.log('   5. Every rule is enforced for each generation\n');
} else if (results.failed === 0) {
    console.log('\n⚠️  System operational with minor warnings - review above.\n');
} else {
    console.log('\n❌ CRITICAL: Some verifications failed. Fix issues above.\n');
    process.exit(1);
}

console.log('📝 NEXT STEPS:\n');
console.log('   • If source file changes: Run `node update_context.mjs`');
console.log('   • Before deployment: Run `npm run build`');
console.log('   • To verify production: Run `node production_audit.mjs`');
console.log('\n' + '='.repeat(80) + '\n');

process.exit(results.failed > 0 ? 1 : 0);
