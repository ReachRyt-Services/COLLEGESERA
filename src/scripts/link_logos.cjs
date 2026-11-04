const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function linkLogos() {
    console.log('Starting Logo Linking...');
    console.log('Connecting to Supabase Storage...');

    // 1. List all files in the bucket
    const { data: files, error: listError } = await supabase
        .storage
        .from(BUCKET_NAME)
        .list();

    console.log('Storage list call completed.');

    if (listError) {
        console.error('Error listing files:', listError);
        return;
    }

    console.log(`Found ${files.length} files in bucket '${BUCKET_NAME}'.`);

    let updatedCount = 0;

    for (const file of files) {
        if (file.name === '.emptyFolderPlaceholder') continue;

        // Assume filename is "slug.ext" (e.g., "iit-madras.jpg")
        const slug = file.name.split('.')[0];

        // Get Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from(BUCKET_NAME)
            .getPublicUrl(file.name);

        console.log(`Linking ${slug} -> ${publicUrl}`);

        // Update Database
        const { error: updateError } = await supabase
            .from('colleges')
            .update({ college_logo: publicUrl })
            .eq('slug', slug);

        if (updateError) {
            console.error(`  Failed to update DB for ${slug}:`, updateError.message);
        } else {
            updatedCount++;
        }
    }

    console.log(`\nSuccessfully linked ${updatedCount} logos!`);
}

linkLogos();
