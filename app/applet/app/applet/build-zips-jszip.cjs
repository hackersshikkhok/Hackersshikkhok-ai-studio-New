const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

function addDirToZip(dir, zipFolder, baseDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.endsWith('.zip')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const subZip = zipFolder.folder(entry.name);
            addDirToZip(fullPath, subZip, baseDir);
        } else if (entry.isFile()) {
            const content = fs.readFileSync(fullPath);
            zipFolder.file(entry.name, content);
        }
    }
}

async function makeZip(sourceDir, outPath) {
    const zip = new JSZip();
    const rootName = path.basename(sourceDir);
    const rootFolder = zip.folder(rootName);
    addDirToZip(sourceDir, rootFolder, sourceDir);

    const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    fs.writeFileSync(outPath, content);
    console.log(`Successfully created ${outPath} (${content.length} bytes)`);
}

async function run() {
    try {
        await makeZip('/app/applet/hackersshikkhok-core', '/app/applet/hackersshikkhok-core.zip');
        await makeZip('/app/applet/hackersshikkhok-theme', '/app/applet/hackersshikkhok-theme.zip');
        console.log('All zips built successfully via JSZip!');
    } catch (err) {
        console.error('Error building zips:', err);
        process.exit(1);
    }
}

run();
