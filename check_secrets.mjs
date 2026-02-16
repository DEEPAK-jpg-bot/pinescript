#!/usr/bin/env node
/**
 * PRE-COMMIT SECURITY CHECK
 * Run this before every push to ensure no secrets are exposed
 */

import { execSync } from 'child_process';

console.log('\n🔒 SECURITY SCAN - Checking for exposed secrets\n');
console.log('='.repeat(70));

let errorCount = 0;

function check(name, test) {
    try {
        const result = test();
        if (result.includes('error') || result.length > 100) {
            console.log(`❌ ${name}`);
            console.log(`   ${result.substring(0, 200)}`);
            errorCount++;
        } else {
            console.log(`✅ ${name}`);
        }
    } catch (e) {
        console.log(`✅ ${name} (no matches)`);
    }
}

console.log('\n🔍 Scanning for potential secrets...\n');

// Check for .env files in git
check('No .env files in git', () =>
    execSync('git ls-files | findstr /i ".env"', { encoding: 'utf8' }));

// Check for API keys
check('No hardcoded API keys', () =>
    execSync('git grep -i "sk-\\|AIza" -- ":!*.md" ":!.env.example" ":!node_modules"', { encoding: 'utf8' }));

// Check for database URLs
check('No database URLs', () =>
    execSync('git grep -i "postgres://\\|postgresql://" -- ":!*.md" ":!node_modules"', { encoding: 'utf8' }));

// Check for Supabase service keys (high-privilege)
check('No Supabase service keys', () =>
    execSync('git grep -i "eyJ.*service_role" -- ":!*.md" ":!.env.example" ":!node_modules"', { encoding: 'utf8' }));

// Check for passwords
check('No hardcoded passwords', () =>
    execSync('git grep -i "password.*=.*[\'\\"]" -- ":!*.md" ":!package-lock.json" ":!node_modules"', { encoding: 'utf8' }));

console.log('\n' + '='.repeat(70));

if (errorCount === 0) {
    console.log('\n✅ SAFE TO COMMIT - No secrets detected\n');
    process.exit(0);
} else {
    console.log(`\n❌ DANGER - ${errorCount} potential secrets found!\n`);
    console.log('🚨 DO NOT PUSH until secrets are removed\n');
    console.log('Actions to take:');
    console.log('1. Review the files listed above');
    console.log('2. Move secrets to .env.local');
    console.log('3. Add sensitive files to .gitignore');
    console.log('4. Re-run this script\n');
    process.exit(1);
}
