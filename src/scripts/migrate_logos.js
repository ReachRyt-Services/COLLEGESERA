
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Env manually since we are in a script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Or SERVICE_ROLE_KEY if available
const BUCKET_NAME = 'college-logos';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Loaded' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function downloadImage(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error.message);
        return null;
    }
}

async function migrateLogos() {
    console.log('Starting Logo Migration...');

    // 1. Fetch colleges with external logos (simple check: starts with http)
    const { data: colleges, error } = await supabase
        .from('colleges')
        .select('id, slug, college_logo')
        .ilike('college_logo', 'http%'); // Only fetch those with URLs

    if (error) {
        console.error('Error fetching colleges:', error);
        return;
    }

    console.log(`Found ${colleges.length} colleges to process.`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const [index, college] of colleges.entries()) {
        const { id, slug, college_logo } = college;

        // Skip if already a supabase storage URL (optional check if query didn't catch it)
        if (college_logo && college_logo.includes('supabase.co')) {
            console.log(`[${index + 1}/${colleges.length}] Skipping ${slug} (already migrated)`);
            skipCount++;
            continue;
        }

        console.log(`[${index + 1}/${colleges.length}] Processing ${slug}...`);

        // 2. Download Image
        const imageBuffer = await downloadImage(college_logo);
        if (!imageBuffer) {
            failCount++;
            continue;
        }

        // 3. Upload to Storage
        // Use slug as filename, assume jpg/png based on url or default to jpg
        const ext = path.extname(college_logo).split('?')[0] || '.jpg';
        const fileName = `${slug}${ext}`;

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from(BUCKET_NAME)
            .upload(fileName, imageBuffer, {
                contentType: 'image/jpeg', // You might want to detect this dynamically
                upsert: true
            });

        if (uploadError) {
            console.error(`  Failed to upload ${slug}:`, uploadError.message);
            failCount++;
            continue;
        }

        // 4. Get Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        // 5. Update Database
        const { error: updateError } = await supabase
            .from('colleges')
            .update({ college_logo: publicUrl })
            .eq('id', id);

        if (updateError) {
            console.error(`  Failed to update DB for ${slug}:`, updateError.message);
            failCount++;
        } else {
            console.log(`  Success! New URL: ${publicUrl}`);
            successCount++;
        }
    }

    console.log('\n--- Migration Summary ---');
    console.log(`Total: ${colleges.length}`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Skipped: ${skipCount}`);
}

migrateLogos();

