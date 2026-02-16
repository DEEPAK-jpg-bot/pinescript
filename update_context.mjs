
import fs from 'fs';
import path from 'path';

const contextPath = path.join(process.cwd(), 'api', 'data', 'pine_script_context.txt');
const outputPath = path.join(process.cwd(), 'src', 'lib', 'pineScriptContext.ts');

if (fs.existsSync(contextPath)) {
    console.log(`Reading from: ${contextPath}`);
    const content = fs.readFileSync(contextPath, 'utf8');

    // 1. Escape backticks for template literal
    // 2. Escape ${ sequence to prevent interpolation
    const escapedContent = content
        .replace(/\\/g, '\\\\') // Escape backslashes first!
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${');

    const tsContent = `// Auto-generated from api/data/pine_script_context.txt
export const PINE_SCRIPT_CONTEXT = \`${escapedContent}\`;
`;

    fs.writeFileSync(outputPath, tsContent);
    console.log(`✅ Successfully generated ${outputPath} (${content.length} bytes)`);
} else {
    console.error(`❌ Context file not found at ${contextPath}`);
    process.exit(1);
}
