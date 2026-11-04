
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('verify_colleges.txt', 'Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyColleges() {
    try {
        fs.writeFileSync('verify_colleges.txt', 'Verifying Home Page Colleges...\n');

        // 1. Fetch homepage featured colleges
        const { data: colleges, error } = await supabase
            .from('colleges')
            .select('*')
            .eq('homepage_featured', true)
            .limit(9);

        if (error) {
            fs.appendFileSync('verify_colleges.txt', `Error fetching colleges: ${JSON.stringify(error)}\n`);
        } else {
            fs.appendFileSync('verify_colleges.txt', `Found ${colleges.length} featured colleges:\n`);
            colleges.forEach(c => {
                fs.appendFileSync('verify_colleges.txt', `- ${c.name} (${c.location})\n`);
            });
        }
    } catch (e) {
        fs.appendFileSync('verify_colleges.txt', `Exception: ${e}\n`);
    }
}

verifyColleges();
