
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rawUrls = `
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/bishop-appasamy-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/c-m-s-college-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/cheran-college-of-allied-health-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/christ-the-king-engineering-college.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/christ-university.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/cmc-vellore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/cms-college-of-science-and-commerce-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/cms-institute-of-management-studies-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/cochin-university-of-science-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/coimbatore-institute-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/coimbatore-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/coimbatore-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dhaanish-ahmed-institute-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dhanalakshmi-srinivasan-college-of-engineering.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dr-gr-damodaran-college-of-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dr-mahalingam-college-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dr-n-g-p-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dr-ngp-arts-and-science-college.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/dr-sns-rajalakshmi-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/easa-college-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ellen-college-of-nursing.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/firebird-institute-of-research-in-management.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/firebird-institute-of-research-in-management.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ganga-institute-of-health-sciences.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/government-college-of-technology-coimbatore-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/happy-valley-business-school.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/hindusthan-college-of-arts-and-science-hicas-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/hindusthan-college-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/hindusthan-college-of-health-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/hindusthan-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iiser-thiruvananthapuram.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iit-delhi.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iit-jodhpur.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iit-kharagpur.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iit-madras.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/iit-roorkee.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/indian-institute-of-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/j-c-t-college-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/jansons-institute-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/jansons-school-of-business-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/k-p-r-institute-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/karpagam-college-of-engineering-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/karpagam-institute-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kasturba-medical-college-manipal.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kathir-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kathir-college-of-engineering.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kct-business-school.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kct-business-school.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kit-kalaignarkarunanidhi-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kl-deemed-to-be-university.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kmch-college-of-occupational-therapy.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kmch-institute-of-allied-health-sciences.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/koneru-lakshmaiah-education-foundation-university.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kongunadu-arts-and-science-college.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kongunadu-college-of-nursing.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kumaraguru-college-of-liberal-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kumaraguru-college-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/kv-institute-of-management-and-information-studies.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/maharajas-institute-of-medical-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/manipal-academy-of-higher-education.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/mmc-chennai.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/nehru-institute-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/nehru-institute-of-health-sciences-college.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/nehru-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/park-college-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/park-college-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ppg-business-school.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ppg-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ppg-college-of-nursing.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/ppg-institute-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/psg-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/psg-institute-of-architecture-and-planning.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/psg-institute-of-management.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/psg-institute-of-medical-sciences-and-research.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/psg-institute-of-technology-and-applied-research.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/r-v-s-college-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/rathinam-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/rathinam-technical-campus.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/rathinam-technical-campus.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/royal-care-nursing-college.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/rvs-nursing-college.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/rvs-technical-campus-coimbatore.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sakthi-institute-of-information-and-management-studies.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sankara-college-of-science-and-commerce.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sardar-vallabhbhai-patel-international-school-of-textile-and-management-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/saveetha-institute-of-medical-and-technical-sciences.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sms-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/snmv-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sns-college-of-allied-health-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sns-college-of-engineering-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sns-college-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sree-abirami-college-of-allied-health-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sree-narayana-guru-college-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sree-sakthi-engineering-college.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-eshwar-college-of-engineering-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-krishna-college-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-krishna-college-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-krishna-college-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-college-of-arts-and-science-for-women.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-college-of-arts-and-science.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-engineering-college-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-institute-of-paramedical-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-institute-of-paramedical-sciences.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ramakrishna-institute-of-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-ranganathar-institute-of-engineering-and-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-sai-ranganathan-engineering-college.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-shakthi-institute-of-engineering-and-technology-autonomous.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/sri-venkateswara-college-of-computer-applications-and-management-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/srm-institute-of-science-and-yechnology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/st-aloysius-college-deemed.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/studyworld-college-of-engineering.png
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/suguna-college-of-engineering.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/tamil-nadu-agriculture-university.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/tamilnadu-college-of-engineering.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/uit-nursing.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/united-college-of-arts-and-science.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/united-institute-of-technology.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/university-of-kerala.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/v-s-b-college-of-engineering-technical-campus.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/v-s-b-college-of-engineering-technical-campus.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/vit-vellore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/vivekananda-institute-of-management-studies-coimbatore.jpeg
https://gsvxhqxuxwanujktjjys.supabase.co/storage/v1/object/public/college-logos/vlb-janakiammal-college-of-arts-and-science.jpeg
`;

async function updateLogos() {
    console.log('Starting Logo Update...');

    // Clean up the list
    const urls = rawUrls
        .split('\n')
        .map(u => u.trim())
        .filter(u => u.length > 0 && u.startsWith('http'));

    console.log(`Found ${urls.length} URLs to process.`);

    let updatedCount = 0;

    for (const url of urls) {
        // Extract filename from URL
        const filename = url.split('/').pop();
        if (!filename) continue;

        // Extract slug (remove extension)
        const slug = filename.split('.')[0];

        // Special cleanup for the double URL case if any
        if (slug.includes('http')) continue;

        console.log(`Updating ${slug}...`);

        const { error } = await supabase
            .from('colleges')
            .update({ college_logo: url })
            .eq('slug', slug);

        if (error) {
            console.error(`  Failed to update ${slug}:`, error.message);
        } else {
            updatedCount++;
        }
    }

    console.log(`\nSuccessfully updated ${updatedCount} colleges!`);
}

updateLogos();
