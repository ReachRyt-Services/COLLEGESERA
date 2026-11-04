
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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const slugsToDelete = [
    'anna-university-ceg',
    'nit-trichy',
    'srm-ist-kattankulathur',
    'loyola-college-chennai',
    'psg-institute-of-management',
    'psg-tech-coimbatore'
];

async function deleteColleges() {
    console.log('Starting deletion process...');

    for (const slug of slugsToDelete) {
        console.log(`Deleting ${slug}...`);
        const { error } = await supabase
            .from('colleges')
            .delete()
            .eq('slug', slug);

        if (error) {
            console.error(`Failed to delete ${slug}:`, error.message);
        } else {
            console.log(`Successfully deleted ${slug}`);
        }
    }

    console.log('Deletion completed.');
}

deleteColleges();
