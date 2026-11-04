
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Helper to read .env
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

console.log('--- Database Connection Debug ---');
console.log(`Supabase URL: ${supabaseUrl}`);
console.log(`Supabase Key (first 10 chars): ${supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MISSING'}`);

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCollege() {
    console.log('\nSearching for slug "anna-university-ceg" in database...');

    const { data, error } = await supabase
        .from('colleges')
        .select('id, name, slug, college_logo, description, image_url')
        .eq('slug', 'anna-university-ceg');

    if (error) {
        console.error('Error querying database:', error);
    } else {
        console.log(`Found ${data.length} matches:`);
        console.log(JSON.stringify(data, null, 2));
    }
}

checkCollege();
