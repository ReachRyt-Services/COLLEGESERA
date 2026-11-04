
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual URL and Key if running locally
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    fs.writeFileSync('verify_articles_page.txt', 'Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyArticlesPage() {
    try {
        fs.writeFileSync('verify_articles_page.txt', 'Verifying Articles Page Data...\n');

        // 1. Fetch published articles (simulating what the page does)
        const { data: articles, error } = await supabase
            .from('articles')
            .select('*')
            .eq('status', 'published');

        if (error) {
            fs.appendFileSync('verify_articles_page.txt', `Error fetching articles: ${JSON.stringify(error)}\n`);
        } else {
            fs.appendFileSync('verify_articles_page.txt', `Found ${articles.length} published articles.\n`);

            // 2. Check for categories (labels)
            const categories = Array.from(new Set(articles.map(a => a.article_label).filter(Boolean)));
            fs.appendFileSync('verify_articles_page.txt', `Categories found: ${categories.join(', ')}\n`);

            // 3. Verify specific fields needed for the UI
            articles.forEach(a => {
                const hasTitle = !!a.title;
                const hasSlug = !!a.slug;
                const hasImage = !!a.featured_image;
                fs.appendFileSync('verify_articles_page.txt', `- ${a.title}: Slug=${hasSlug}, Image=${hasImage}, Label=${a.article_label}\n`);
            });
        }
    } catch (e) {
        fs.appendFileSync('verify_articles_page.txt', `Exception: ${e}\n`);
    }
}

verifyArticlesPage();
