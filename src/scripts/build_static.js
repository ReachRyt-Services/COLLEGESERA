
import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    try {
        // 1. Build
        console.log('\n--- Step 1: Building Production App ---');
        execSync('npm run build', { stdio: 'inherit' });

        // 2. Start Preview Server
        console.log('\n--- Step 2: Starting Preview Server ---');
        const preview = spawn('npm', ['run', 'preview'], {
            stdio: ['ignore', 'pipe', 'inherit'],
            shell: true
        });

        let serverReady = false;

        // Wait for server to be ready
        await new Promise((resolve, reject) => {
            preview.stdout.on('data', (data) => {
                const output = data.toString();
                // console.log(output); // Optional: show server output
                if (output.includes('Local:') || output.includes('localhost')) {
                    serverReady = true;
                    console.log('Preview server is ready.');
                    resolve();
                }
            });

            preview.on('error', (err) => {
                reject(err);
            });

            // Timeout after 30s
            setTimeout(() => {
                if (!serverReady) {
                    reject(new Error('Preview server timeout'));
                }
            }, 30000);
        });

        // 3. Run Prerender
        console.log('\n--- Step 3: Prerendering Static Pages ---');
        // We import the prerender script logic dynamically or run it as a child process
        // Running as child process is safer to avoid module state issues
        execSync('node src/scripts/prerender.js', { stdio: 'inherit' });

        console.log('\n--- SUCCESS: Static Site Generated in /dist ---');

        // Cleanup
        preview.kill();
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

run();
