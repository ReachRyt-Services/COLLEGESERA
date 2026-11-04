import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { preview } from 'vite';

// Helper for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Env
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                const [key, ...rest] = line.split('=');
                if (key && rest.length > 0) {
                    const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
                    process.env[key.trim()] = val;
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
const supabase = createClient(supabaseUrl, supabaseKey);

const DIST_DIR = path.resolve(process.cwd(), 'dist');

const PRIORITY_SEO_ROUTES = [
    '/top-mba-colleges-in-coimbatore',
    '/top-engineering-colleges-in-coimbatore',
    '/autonomous-engineering-colleges-in-coimbatore',
    '/top-paramedical-colleges-in-coimbatore',
    '/top-occupational-therapy-colleges-in-coimbatore',
    '/top-engineering-colleges-in-salem',
    '/nirf-ranked-engineering-colleges-in-coimbatore',
    '/mba-colleges-in-tamil-nadu',
    '/colleges-in-coimbatore'
];

async function prerenderRoute(browser, baseUrl, route, outputPath) {
    const page = await browser.newPage();
    try {
        // Intercept and block non-essential media for faster prerendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            if (['font'].includes(resourceType)) {
                req.abort();
            } else {
                req.continue();
            }
        });

        const url = `${baseUrl}${route}`;
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });

        // Ensure React has populated content
        await page.waitForSelector('#root', { timeout: 10000 });

        const html = await page.content();

        const outDir = path.dirname(outputPath);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, html, 'utf8');
        return true;
    } catch (err) {
        console.error(`  ❌ Failed to prerender ${route}:`, err.message);
        return false;
    } finally {
        await page.close();
    }
}

async function run() {
    console.log('\n🚀 Starting Static Pre-rendering Pipeline...');

    // 1. Verify dist folder exists
    if (!fs.existsSync(DIST_DIR)) {
        console.error('❌ dist/ directory not found. Please run "vite build" first.');
        process.exit(1);
    }

    // 2. Start Vite Preview Server programmatically
    console.log('📡 Starting in-process preview server...');
    const previewServer = await preview({
        preview: { port: 4178, open: false },
        root: process.cwd()
    });
    const port = previewServer.config.preview.port || 4178;
    const baseUrl = `http://localhost:${port}`;
    console.log(`✅ Preview server active at ${baseUrl}`);

    // 3. Launch Headless Browser
    console.log('🌐 Launching headless browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    try {
        // 4. Prerender Static Core Routes
        const staticRoutes = [
            '/',
            '/colleges',
            '/exams',
            '/courses',
            '/articles',
            '/about-us',
            '/contact-us',
            '/privacy-policy',
            '/terms-and-conditions',
            '/scholarship',
            '/programs'
        ];

        console.log('\n📄 Prerendering Core Static Routes...');
        for (const route of staticRoutes) {
            const outPath = route === '/' 
                ? path.join(DIST_DIR, 'index.html') 
                : path.join(DIST_DIR, route.substring(1), 'index.html');
            process.stdout.write(`  Prerendering ${route}... `);
            const ok = await prerenderRoute(browser, baseUrl, route, outPath);
            if (ok) console.log('✅');
        }

        // 5. Prerender 404 Page (dist/404.html)
        console.log('\n📄 Prerendering 404 Page (dist/404.html)...');
        await prerenderRoute(browser, baseUrl, '/404', path.join(DIST_DIR, '404.html'));
        console.log('  404.html generated ✅');

        // 6. Fetch SEO landing pages from sitemap_entries & merge with priority routes
        console.log('\n🔍 Fetching SEO Landing Pages...');
        const { data: seoEntries } = await supabase
            .from('sitemap_entries')
            .select('loc')
            .eq('type', 'seo_search')
            .eq('exclude', false);

        const seoRoutesSet = new Set(PRIORITY_SEO_ROUTES);
        if (seoEntries) {
            seoEntries.forEach(e => {
                if (e.loc) seoRoutesSet.add(e.loc.trim());
            });
        }
        const seoRoutes = Array.from(seoRoutesSet);
        console.log(`Found ${seoRoutes.length} SEO search landing routes to prerender.`);

        for (const route of seoRoutes) {
            const clean = route.replace(/^\//, '');
            const outPath = path.join(DIST_DIR, clean, 'index.html');
            process.stdout.write(`  Prerendering SEO: ${route}... `);
            const ok = await prerenderRoute(browser, baseUrl, route, outPath);
            if (ok) console.log('✅');
        }

        // 7. Fetch College Detail Pages
        console.log('\n🏛️ Fetching College Pages from database...');
        const { data: colleges, error: colError } = await supabase
            .from('colleges')
            .select('slug');

        if (colError) {
            console.error('Error fetching colleges:', colError);
        } else {
            const validColleges = colleges.filter(c => Boolean(c.slug));
            console.log(`Found ${validColleges.length} colleges to prerender.`);

            // Concurrency pool for college pages
            const CONCURRENCY = 4;
            for (let i = 0; i < validColleges.length; i += CONCURRENCY) {
                const chunk = validColleges.slice(i, i + CONCURRENCY);
                await Promise.all(chunk.map(async (c, idx) => {
                    const slug = c.slug;
                    const route = `/college/${slug}`;
                    const outPath = path.join(DIST_DIR, 'college', slug, 'index.html');
                    const num = i + idx + 1;
                    const ok = await prerenderRoute(browser, baseUrl, route, outPath);
                    if (ok && num % 20 === 0) {
                        console.log(`  [${num}/${validColleges.length}] Colleges prerendered...`);
                    }
                }));
            }
            console.log(`✅ All ${validColleges.length} college pages prerendered.`);
        }

        // 8. Fetch Article Detail Pages
        console.log('\n📰 Fetching Article Pages from database...');
        const { data: dbArticles, error: artError } = await supabase
            .from('articles')
            .select('slug')
            .eq('status', 'published');

        if (artError) {
            console.error('Error fetching articles:', artError);
        } else {
            const validArticles = (dbArticles || []).filter(a => Boolean(a.slug));
            console.log(`Found ${validArticles.length} published articles to prerender.`);

            for (let i = 0; i < validArticles.length; i++) {
                const slug = validArticles[i].slug;
                const route = `/articles/${slug}`;
                const outPath = path.join(DIST_DIR, 'articles', slug, 'index.html');
                process.stdout.write(`  [${i + 1}/${validArticles.length}] Prerendering Article: ${route}... `);
                const ok = await prerenderRoute(browser, baseUrl, route, outPath);
                if (ok) console.log('✅');
            }
            console.log(`✅ All ${validArticles.length} article pages prerendered.`);
        }

        // Write static redirect for legacy numbered URL to canonical URL without numbers
        const redirectDir = path.join(DIST_DIR, 'top-10-mba-colleges-in-coimbatore');
        if (!fs.existsSync(redirectDir)) fs.mkdirSync(redirectDir, { recursive: true });
        fs.writeFileSync(
            path.join(redirectDir, 'index.html'),
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=/top-mba-colleges-in-coimbatore">
    <link rel="canonical" href="https://collegesera.com/top-mba-colleges-in-coimbatore">
    <title>Redirecting to Top MBA Colleges in Coimbatore...</title>
</head>
<body>
    <p>Redirecting to <a href="/top-mba-colleges-in-coimbatore">Top MBA Colleges in Coimbatore</a>...</p>
</body>
</html>`
        );
        console.log('  Created legacy redirect: /top-10-mba-colleges-in-coimbatore -> /top-mba-colleges-in-coimbatore');

        console.log('\n🎉 Static Pre-rendering Complete! All HTML files created in dist/');

    } catch (error) {
        console.error('❌ Prerendering Error:', error);
        process.exit(1);
    } finally {
        await browser.close();
        if (previewServer && previewServer.httpServer) {
            previewServer.httpServer.close();
        }
    }
}

run().catch((err) => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
