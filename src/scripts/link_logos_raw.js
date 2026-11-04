
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Env
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env file', e);
    }
}

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'college-logos';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

// Helper for fetch
async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}${endpoint}`;
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error ${response.status}: ${text}`);
    }

    return response;
}

async function linkLogos() {
    console.log('Starting Logo Linking (Raw Mode)...');

    try {
        // 1. List files
        console.log('Listing files...');
        const listResponse = await supabaseFetch(`/storage/v1/object/list/${BUCKET_NAME}`, {
            method: 'POST',
            body: JSON.stringify({
                prefix: '',
                limit: 1000,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            })
        });

        const files = await listResponse.json();
        console.log(`Found ${files.length} files.`);

        let updatedCount = 0;

        for (const file of files) {
            if (file.name === '.emptyFolderPlaceholder') continue;

            const slug = file.name.split('.')[0];
            const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${file.name}`;

            console.log(`Linking ${slug} -> ${publicUrl}`);

            // 2. Update Database
            // PATCH /rest/v1/colleges?slug=eq.value
            await supabaseFetch(`/rest/v1/colleges?slug=eq.${slug}`, {
                method: 'PATCH',
                body: JSON.stringify({ college_logo: publicUrl }),
                headers: {
                    'Prefer': 'return=minimal'
                }
            });

            updatedCount++;
        }

        console.log(`\nSuccessfully linked ${updatedCount} logos!`);

    } catch (error) {
        console.error('Script failed:', error.message);
    }
}

linkLogos();
