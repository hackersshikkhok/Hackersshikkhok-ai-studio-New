import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

async function createZip(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`${outPath} created successfully (${archive.pointer()} total bytes)`);
            resolve(true);
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
        await createZip('hackersshikkhok-core', 'hackersshikkhok-core.zip');
        await createZip('hackersshikkhok-theme', 'hackersshikkhok-theme.zip');
        console.log('All zips created successfully!');
    } catch (err) {
        console.error('Error creating zips:', err);
        process.exit(1);
    }
}

run();
