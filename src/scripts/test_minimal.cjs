
const fs = require('fs');
const path = require('path');

console.log('1. Script started');

try {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log('2. Resolving .env at:', envPath);

    if (fs.existsSync(envPath)) {
        console.log('3. File exists. Reading...');
        const content = fs.readFileSync(envPath, 'utf8');
        console.log('4. Read complete. Length:', content.length);
    } else {
        console.log('3. File does not exist');
    }
} catch (e) {
    console.error('Error:', e);
}

console.log('5. Require Supabase...');
try {
    const { createClient } = require('@supabase/supabase-js');
    console.log('6. Supabase required');
} catch (e) {
    console.error('Error requiring supabase:', e);
}

console.log('7. Done');
