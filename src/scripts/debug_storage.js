
import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'college-logos';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugStorage() {
    console.log('--- Debugging Storage ---');

    // 1. Try to Upload a Test File
    console.log('1. Attempting to upload test.txt...');
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(BUCKET_NAME)
        .upload('test.txt', 'Hello World', { upsert: true });

    if (uploadError) {
        console.error('❌ Upload Failed:', uploadError.message);
        console.error('   (This means you cannot WRITE to the bucket. Check RLS Policy for INSERT)');
    } else {
        console.log('✅ Upload Success:', uploadData);
    }

    // 2. Try to List Files
    console.log('\n2. Attempting to list files...');
    const { data: files, error: listError } = await supabase
        .storage
        .from(BUCKET_NAME)
        .list();

    if (listError) {
        console.error('❌ List Failed:', listError.message);
    } else {
        console.log(`✅ List Success. Found ${files.length} files.`);
        if (files.length === 0) {
            console.log('   (Bucket appears empty to the API. Did you upload files?)');
        } else {
            console.log('   Files:', files.map(f => f.name).join(', '));
        }
    }
}

debugStorage();
