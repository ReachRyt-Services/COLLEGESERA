
import { createClient } from '@supabase/supabase-js';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
    console.log('Verifying articles data...');
    const { data, error } = await supabase
        .from('articles')
        .select('*');

    if (error) {
        console.error('Error fetching articles:', error);
    } else {
        console.log(`Found ${data.length} articles:`);
        data.forEach(a => console.log(`- ${a.title} (${a.status})`));
    }
}

verifyData();
