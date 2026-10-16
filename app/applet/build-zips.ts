import * as fs from 'fs';
import * as path from 'path';
const archiver = require('archiver');

async function createZip(sourceDir: string, outPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`Created ${outPath} (${archive.pointer()} total bytes)`);
            resolve(true);
        });

        archive.on('error', (err: any) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(sourceDir, path.basename(sourceDir));
        archive.finalize();
    });
}

async function run() {
    try {
        await createZip('hackersshikkhok-core', 'hackersshikkhok-core.zip');
        await createZip('hackersshikkhok-theme', 'hackersshikkhok-theme.zip');

        if (!fs.existsSync('dist/downloads')) {
            fs.mkdirSync('dist/downloads', { recursive: true });
        }
        fs.copyFileSync('hackersshikkhok-core.zip', 'dist/downloads/hackersshikkhok-core.zip');
        fs.copyFileSync('hackersshikkhok-theme.zip', 'dist/downloads/hackersshikkhok-theme.zip');
        console.log('Successfully updated all ZIP packages!');
    } catch (e) {
        console.error('Error building zips:', e);
        process.exit(1);
    }
}

run();
