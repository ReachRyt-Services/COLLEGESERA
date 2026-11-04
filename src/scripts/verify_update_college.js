
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('verify_update.txt', 'Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyUpdate() {
    try {
        fs.writeFileSync('verify_update.txt', 'Verifying College Update...\n');

        // 1. Get a college
        const { data: colleges } = await supabase.from('colleges').select('*').limit(1);

        if (!colleges || colleges.length === 0) {
            fs.appendFileSync('verify_update.txt', 'No colleges found to test.\n');
            return;
        }

        const college = colleges[0];
        const originalStatus = college.homepage_featured;
        const newStatus = !originalStatus;

        fs.appendFileSync('verify_update.txt', `Testing update on: ${college.name}\n`);
        fs.appendFileSync('verify_update.txt', `Original status: ${originalStatus}\n`);

        // 2. Update status
        const { data: updated, error } = await supabase
            .from('colleges')
            .update({ homepage_featured: newStatus })
            .eq('id', college.id)
            .select()
            .single();

        if (error) {
            fs.appendFileSync('verify_update.txt', `Error updating: ${JSON.stringify(error)}\n`);
        } else {
            fs.appendFileSync('verify_update.txt', `Update successful. New status: ${updated.homepage_featured}\n`);

            if (updated.homepage_featured === newStatus) {
                fs.appendFileSync('verify_update.txt', `VERIFICATION PASSED: Status changed from ${originalStatus} to ${newStatus}\n`);
            } else {
                fs.appendFileSync('verify_update.txt', `VERIFICATION FAILED: Status did not change correctly.\n`);
            }

            // 3. Revert change
            await supabase.from('colleges').update({ homepage_featured: originalStatus }).eq('id', college.id);
            fs.appendFileSync('verify_update.txt', `Reverted status back to ${originalStatus}\n`);
        }

    } catch (e) {
        fs.appendFileSync('verify_update.txt', `Exception: ${e}\n`);
    }
}

verifyUpdate();
