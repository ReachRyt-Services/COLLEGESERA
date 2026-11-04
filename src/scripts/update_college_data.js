
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

const updates = [
    {
        slug: 'anna-university-ceg',
        data: {
            college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png',
            description: "The College of Engineering, Guindy (CEG) is India's oldest technical institution, established in 1794. As a constituent college of Anna University, it is a premier hub for engineering education and research, renowned for its rich heritage and academic excellence."
        }
    },
    {
        slug: 'nit-trichy',
        data: {
            college_logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/NIT_Trichy_Logo.png',
            description: "National Institute of Technology, Tiruchirappalli (NIT Trichy) is a top-ranked public technical university and an Institute of National Importance. Consistently ranked #1 among NITs, it offers world-class education in engineering, management, and architecture."
        }
    },
    {
        slug: 'srm-ist-kattankulathur',
        data: {
            college_logo: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png',
            description: "SRM Institute of Science and Technology (SRMIST), Kattankulathur, is a top-ranking private deemed university. Known for its state-of-the-art infrastructure and global placements, it offers diverse programs in engineering, medicine, science, and humanities."
        }
    },
    {
        slug: 'loyola-college-chennai',
        data: {
            college_logo: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Loyola_College_Chennai_coat_of_arms.png',
            description: "Loyola College, Chennai, is a prestigious autonomous Jesuit institution founded in 1925. Consistently ranked among India's top colleges for arts, commerce, and science, it is celebrated for its academic rigor and commitment to social justice."
        }
    }
];

async function updateColleges() {
    console.log('Starting updates...');

    for (const item of updates) {
        console.log(`Updating ${item.slug}...`);
        const { error } = await supabase
            .from('colleges')
            .update(item.data)
            .eq('slug', item.slug);

        if (error) {
            console.error(`Failed to update ${item.slug}:`, error.message);
        } else {
            console.log(`Successfully updated ${item.slug}`);
        }
    }

    console.log('All updates completed.');
}

updateColleges();
