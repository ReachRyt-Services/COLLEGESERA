
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

const slugToDelete = 'psg-institute-of-management';

async function forceDelete() {
    console.log(`Force deleting ${slugToDelete}...`);

    // 1. Get College ID
    const { data: college, error: fetchError } = await supabase
        .from('colleges')
        .select('id')
        .eq('slug', slugToDelete)
        .single();

    if (fetchError || !college) {
        console.error('College not found or error fetching:', fetchError?.message);
        return;
    }

    const collegeId = college.id;
    console.log(`Found College ID: ${collegeId}`);

    // Helper to delete from a table
    const deleteFrom = async (table) => {
        const { error } = await supabase.from(table).delete().eq('college_id', collegeId);
        if (error) console.error(`Error deleting from ${table}:`, error.message);
        else console.log(`Deleted from ${table}.`);
    };

    await deleteFrom('courses');
    await deleteFrom('placements');
    await deleteFrom('rankings');
    await deleteFrom('admission_process');
    await deleteFrom('fee_structures'); // Might need to handle fee_components if no cascade
    await deleteFrom('CutoffData');

    // 3. Delete from colleges
    const { error: delError } = await supabase
        .from('colleges')
        .delete()
        .eq('id', collegeId);

    if (delError) {
        console.error('Error deleting college:', delError.message);
    } else {
        console.log('Successfully deleted college.');
    }
}

forceDelete();
