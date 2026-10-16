const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function makeZip(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`Created ${outPath} (${archive.pointer()} total bytes)`);
            resolve();
        });

        archive.on('error', (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(sourceDir, path.basename(sourceDir));
        archive.finalize();
    });
}

async function run() {
    try {
        await makeZip('/app/applet/hackersshikkhok-core', '/app/applet/hackersshikkhok-core.zip');
        await makeZip('/app/applet/hackersshikkhok-theme', '/app/applet/hackersshikkhok-theme.zip');
        console.log('All zips built successfully!');
    } catch (err) {
        console.error('Error building zips:', err);
        process.exit(1);
    }
}

run();
