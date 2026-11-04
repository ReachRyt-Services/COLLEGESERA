import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('verify_output.txt', 'Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
    try {
        fs.writeFileSync('verify_output.txt', 'Verifying articles data...\n');
        const { data, error } = await supabase
            .from('articles')
            .select('*');

        if (error) {
            fs.appendFileSync('verify_output.txt', `Error fetching articles: ${JSON.stringify(error)} \n`);
        } else {
            fs.appendFileSync('verify_output.txt', `Found ${data.length} articles: \n`);
            data.forEach(a => fs.appendFileSync('verify_output.txt', `- ${a.title} (${a.status}) \n`));
        }
    } catch (e) {
        fs.appendFileSync('verify_output.txt', `Exception: ${e} \n`);
    }
}

verifyData();
