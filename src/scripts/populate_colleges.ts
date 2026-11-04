
import { createClient } from '@supabase/supabase-js';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const colleges = [
    {
        name: 'Indian Institute of Technology Madras (IITM)',
        slug: 'iit-madras',
        location: 'Chennai, Tamil Nadu',
        district: 'Chennai',
        type: 'Government',
        type_collwge: 'Engineering',
        established: 1959,
        website: 'https://www.iitm.ac.in',
        featured: true,
        homepage_featured: true,
        featured_priority: 100,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png',
        image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Hostel', 'Library', 'Sports', 'WiFi', 'Labs', 'Cafeteria'],
        description: 'IIT Madras is one of the premier engineering institutes in India, consistently ranked #1 by NIRF.'
    },
    {
        name: 'Anna University (CEG)',
        slug: 'anna-university-ceg',
        location: 'Chennai, Tamil Nadu',
        district: 'Chennai',
        type: 'Government',
        type_collwge: 'Engineering',
        established: 1794,
        website: 'https://www.annauniv.edu',
        featured: true,
        homepage_featured: true,
        featured_priority: 95,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png',
        image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Hostel', 'Library', 'Auditorium', 'Sports', 'Medical'],
        description: 'College of Engineering, Guindy (CEG) is India\'s oldest technical institution and a top choice for engineering aspirants.'
    },
    {
        name: 'National Institute of Technology, Tiruchirappalli (NITT)',
        slug: 'nit-trichy',
        location: 'Tiruchirappalli, Tamil Nadu',
        district: 'Tiruchirappalli',
        type: 'Government',
        type_collwge: 'Engineering',
        established: 1964,
        website: 'https://www.nitt.edu',
        featured: true,
        homepage_featured: true,
        featured_priority: 90,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/National_Institute_of_Technology%2C_Tiruchirappalli_Logo.png/220px-National_Institute_of_Technology%2C_Tiruchirappalli_Logo.png',
        image_url: 'https://images.unsplash.com/photo-1592280771884-131186570d96?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Hostel', 'Gym', 'Swimming Pool', 'Library', 'Shopping Complex'],
        description: 'NIT Trichy is the top-ranked NIT in India, known for its excellent placements and campus life.'
    },
    {
        name: 'Vellore Institute of Technology (VIT)',
        slug: 'vit-vellore',
        location: 'Vellore, Tamil Nadu',
        district: 'Vellore',
        type: 'Private',
        type_collwge: 'Engineering',
        established: 1984,
        website: 'https://www.vit.ac.in',
        featured: true,
        homepage_featured: true,
        featured_priority: 85,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png',
        image_url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Smart Classrooms', 'Research Labs', 'Sports Complex', 'Food Court'],
        description: 'VIT is a leading private university known for its rigorous academics and massive placement records.'
    },
    {
        name: 'Loyola College',
        slug: 'loyola-college-chennai',
        location: 'Chennai, Tamil Nadu',
        district: 'Chennai',
        type: 'Private',
        type_collwge: 'Arts & Science',
        established: 1925,
        website: 'https://www.loyolacollege.edu',
        featured: true,
        homepage_featured: true,
        featured_priority: 80,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Loyola_College_Chennai_Coat_of_Arms.png/220px-Loyola_College_Chennai_Coat_of_Arms.png',
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Library', 'Chapel', 'Sports Fields', 'Auditorium'],
        description: 'Loyola College is a prestigious institution for Arts, Commerce, and Science education in India.'
    },
    {
        name: 'PSG College of Technology',
        slug: 'psg-tech-coimbatore',
        location: 'Coimbatore, Tamil Nadu',
        district: 'Coimbatore',
        type: 'Private',
        type_collwge: 'Engineering',
        established: 1951,
        website: 'https://www.psgtech.edu',
        featured: true,
        homepage_featured: true,
        featured_priority: 75,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png',
        image_url: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Industry Labs', 'Hostel', 'Library', 'Incubation Center'],
        description: 'PSG Tech is renowned for its industry-institute interaction and strong engineering programs.'
    },
    {
        name: 'Madras Medical College (MMC)',
        slug: 'mmc-chennai',
        location: 'Chennai, Tamil Nadu',
        district: 'Chennai',
        type: 'Government',
        type_collwge: 'Medical',
        established: 1835,
        website: 'https://www.mmc.ac.in',
        featured: true,
        homepage_featured: true,
        featured_priority: 70,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Madras_Medical_College_logo.png/220px-Madras_Medical_College_logo.png',
        image_url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Hospital', 'Labs', 'Library', 'Hostel'],
        description: 'MMC is one of the oldest and most prestigious medical colleges in India, attached to RGGGH.'
    },
    {
        name: 'SRM Institute of Science and Technology',
        slug: 'srm-ist-kattankulathur',
        location: 'Kattankulathur, Tamil Nadu',
        district: 'Kancheepuram',
        type: 'Private',
        type_collwge: 'Engineering',
        established: 1985,
        website: 'https://www.srmist.edu.in',
        featured: true,
        homepage_featured: true,
        featured_priority: 65,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/SRM_Institute_of_Science_and_Technology_Logo.svg/1200px-SRM_Institute_of_Science_and_Technology_Logo.svg.png',
        image_url: 'https://images.unsplash.com/photo-1599687267812-35905d212f65?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Multipurpose Hall', 'Library', 'Sports', 'Transport'],
        description: 'SRM IST is a major private university offering a wide range of programs and global exposure.'
    },
    {
        name: 'Christian Medical College (CMC)',
        slug: 'cmc-vellore',
        location: 'Vellore, Tamil Nadu',
        district: 'Vellore',
        type: 'Private',
        type_collwge: 'Medical',
        established: 1900,
        website: 'https://www.cmch-vellore.edu',
        featured: true,
        homepage_featured: true,
        featured_priority: 60,
        college_logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Christian_Medical_College_Vellore_logo.png/220px-Christian_Medical_College_Vellore_logo.png',
        image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
        facilities: ['Hospital', 'Research Center', 'Library', 'Hostel'],
        description: 'CMC Vellore is consistently ranked among the top medical colleges in India, known for its service and excellence.'
    }
];

async function populateColleges() {
    console.log('Starting college population...');

    for (const college of colleges) {
        // Generate a random college_id if not provided (though in real app it might be specific)
        const collegeData = {
            ...college,
            id: crypto.randomUUID(), // Generate UUID for the primary key
            college_id: `COL-${Math.floor(Math.random() * 10000)}`,
            display_order: 0
        };

        const { data, error } = await supabase
            .from('colleges')
            .upsert(collegeData, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error inserting ${college.name}: `, error);
        } else {
            console.log(`Successfully inserted / updated: ${college.name}`);
        }
    }

    console.log('Done!');
}

populateColleges();
