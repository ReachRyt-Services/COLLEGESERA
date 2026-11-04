
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to read .env file since we can't rely on dotenv being installed
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
const SITE_URL = 'https://collegesera.com';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
    console.log('Generating sitemap...');

    try {
        // 1. Fetch all colleges and published articles
        const [
            { data: colleges, error: colError },
            { data: articles, error: artError }
        ] = await Promise.all([
            supabase.from('colleges').select('slug, updated_at'),
            supabase.from('articles').select('slug, updated_at').eq('status', 'published').not('slug', 'is', null)
        ]);

        if (colError) throw colError;
        if (artError) console.warn('Could not fetch articles:', artError.message);

        // 2. Start XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
        <loc>${SITE_URL}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITE_URL}/colleges</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${SITE_URL}/exams</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${SITE_URL}/articles</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;

        // 3. Add Article Pages
        (articles || []).forEach(article => {
            const lastMod = article.updated_at ? new Date(article.updated_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
            xml += `    <url>
        <loc>${SITE_URL}/articles/${article.slug}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;
        });

        // 4. Add College Pages
        (colleges || []).forEach(college => {
            const lastMod = college.updated_at ? new Date(college.updated_at).toISOString() : new Date().toISOString();
            xml += `    <url>
        <loc>${SITE_URL}/college/${college.slug}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
`;
        });

        // 5. Close XML
        xml += '</urlset>';

        // 6. Write to file
        const publicDir = path.resolve(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
        console.log(`Sitemap generated successfully with ${(colleges || []).length} colleges and ${(articles || []).length} articles!`);
        console.log(`Saved to: ${path.join(publicDir, 'sitemap.xml')}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
