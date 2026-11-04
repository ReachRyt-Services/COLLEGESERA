
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('populate_output.txt', 'Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const exams = [
    {
        title: 'JEE Mains 2026: Everything You Need to Know',
        slug: 'jee-mains-2026',
        article_label: 'Exam',
        status: 'published',
        featured: true,
        excerpt: 'Complete guide to JEE Mains 2026 including exam dates, syllabus, eligibility criteria, and preparation tips for aspiring engineers.',
        content: `
        <h2>JEE Mains 2026 Overview</h2>
        <p>The Joint Entrance Examination (JEE) Main is the premier engineering entrance exam in India, serving as the gateway to NITs, IIITs, and other Centrally Funded Technical Institutions (CFTIs). It also acts as the eligibility test for JEE Advanced.</p>

        <h3>Important Dates (Tentative)</h3>
        <ul>
            <li><strong>Registration Starts:</strong> November 2025</li>
            <li><strong>Session 1 Exam:</strong> January 2026</li>
            <li><strong>Session 2 Exam:</strong> April 2026</li>
        </ul>

        <h3>Eligibility Criteria</h3>
        <p>Candidates must have passed Class 12th or equivalent examination with Physics, Chemistry, and Mathematics. There is no age limit for appearing in JEE Main.</p>

        <h3>Exam Pattern</h3>
        <p>The exam consists of two papers: Paper 1 for B.E./B.Tech and Paper 2 for B.Arch/B.Planning. Paper 1 is conducted in Computer Based Test (CBT) mode.</p>
        `,
        featured_image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'GATE 2026: Gateway to Post Graduation',
        slug: 'gate-2026',
        article_label: 'Exam',
        status: 'published',
        featured: true,
        excerpt: 'Comprehensive details about GATE 2026 for M.Tech admissions and PSU recruitment. Check syllabus, pattern, and important dates.',
        content: `
        <h2>About GATE 2026</h2>
        <p>The Graduate Aptitude Test in Engineering (GATE) is a national-level exam conducted jointly by the IISc and seven IITs. It opens doors to M.Tech/Ph.D. programs and PSU jobs.</p>

        <h3>Key Highlights</h3>
        <ul>
            <li><strong>Conducting Body:</strong> IIT (TBD)</li>
            <li><strong>Exam Mode:</strong> Computer Based Test (CBT)</li>
            <li><strong>Duration:</strong> 3 Hours</li>
        </ul>

        <h3>Opportunities after GATE</h3>
        <p>Apart from higher studies in premier institutes like IITs and NITs, GATE scores are used by PSUs like ONGC, NTPC, BHEL, and IOCL for recruitment.</p>
        `,
        featured_image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'CAT 2026: Crack the IIM Admission',
        slug: 'cat-2026',
        article_label: 'Exam',
        status: 'published',
        featured: true,
        excerpt: 'Prepare for Common Admission Test (CAT) 2026. Get insights on exam pattern, top MBA colleges, and preparation strategies.',
        content: `
        <h2>CAT 2026 Guide</h2>
        <p>The Common Admission Test (CAT) is India's most prestigious management entrance exam, conducting admissions to the 20 IIMs and over 1,200 other B-schools.</p>

        <h3>Exam Pattern</h3>
        <p>CAT assesses candidates on Quantitative Ability (QA), Verbal Ability & Reading Comprehension (VARC), and Data Interpretation & Logical Reasoning (DILR).</p>

        <h3>Top Colleges Accepting CAT</h3>
        <ul>
            <li>IIM Ahmedabad, Bangalore, Calcutta</li>
            <li>FMS Delhi</li>
            <li>SPJIMR Mumbai</li>
            <li>MDI Gurgaon</li>
        </ul>
        `,
        featured_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'XAT 2026: Xavier Aptitude Test Guide',
        slug: 'xat-2026',
        article_label: 'Exam',
        status: 'published',
        featured: false,
        excerpt: 'All about XAT 2026 conducted by XLRI Jamshedpur. Check exam date, registration process, and decision making section tips.',
        content: `
        <h2>XAT 2026 Overview</h2>
        <p>Xavier Aptitude Test (XAT) is a national-level management entrance test conducted by XLRI Jamshedpur for admission to MBA/PGDM programs.</p>

        <h3>Unique Features</h3>
        <p>Unlike other exams, XAT includes a unique section on 'Decision Making' which tests managerial aptitude and ethical reasoning.</p>

        <h3>Participating Institutes</h3>
        <p>Scores are accepted by XLRI, XIMB, IMT Ghaziabad, TAPMI, and 160+ other B-schools across India.</p>
        `,
        featured_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000'
    },
    {
        title: 'NEET UG 2026: Medical Entrance Exam',
        slug: 'neet-ug-2026-medical-entrance-exam',
        article_label: 'Exam',
        status: 'published',
        featured: true,
        excerpt: 'The single entrance test for MBBS/BDS courses in India. Check NEET UG 2026 syllabus, eligibility, and exam pattern.',
        content: `
        <h2>NEET UG 2026</h2>
        <p>The National Eligibility cum Entrance Test (NEET) UG is the sole entrance examination for admission to undergraduate medical (MBBS), dental (BDS), and AYUSH courses in India.</p>

        <h3>Exam Pattern</h3>
        <p>NEET is a pen-and-paper test comprising 200 questions (180 to be attempted) from Physics, Chemistry, and Biology (Botany & Zoology).</p>

        <h3>Preparation Tips</h3>
        <ul>
            <li>Focus on NCERT textbooks.</li>
            <li>Practice previous year question papers.</li>
            <li>Maintain a consistent revision schedule.</li>
        </ul>
        `,
        featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'
    }
];

async function populateExams() {
    fs.writeFileSync('populate_output.txt', 'Starting exam population...\n');

    for (const exam of exams) {
        const { data, error } = await supabase
            .from('articles')
            .upsert(exam, { onConflict: 'slug' })
            .select();

        if (error) {
            fs.appendFileSync('populate_output.txt', `Error inserting ${exam.title}: ${JSON.stringify(error)}\n`);
        } else {
            fs.appendFileSync('populate_output.txt', `Successfully inserted / updated: ${exam.title}. Data: ${JSON.stringify(data)}\n`);
        }
    }

    fs.appendFileSync('populate_output.txt', 'Done!\n');
}

populateExams();
