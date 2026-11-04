#!/usr/bin/env node
/**
 * generate-sitemap.js  (ESM)
 *
 * Reads ALL sitemap entries from the `sitemap_entries` Supabase table
 * and writes public/sitemap.xml
 *
 * Run manually:   npm run sitemap
 * Auto on build:  npm run build  (prebuild hook)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const BASE_URL = 'https://collegesera.com';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const OUTPUT_PATH = path.resolve(__dirname, '../public/sitemap.xml');

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrlBlock({ loc, changefreq, priority, lastmod }) {
  const cleanLoc = loc.replace(/^\/college\/\d+-/, '/college/');
  const lines = ['  <url>'];
  lines.push(`    <loc>${escapeXml(BASE_URL + cleanLoc)}</loc>`);
  if (lastmod)    lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority)   lines.push(`    <priority>${priority}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

async function generate() {
  console.log('\n🗺️   Generating sitemap from sitemap_entries table…');

  // 1. Fetch entries from sitemap_entries
  const { data: entries, error } = await supabase
    .from('sitemap_entries')
    .select('loc, type, priority, changefreq, lastmod, exclude, slug, college_name')
    .order('sort_order', { ascending: true })
    .order('type', { ascending: true })
    .order('loc', { ascending: true });

  if (error) {
    console.error('❌  Supabase error:', error.message);
    console.error('    Have you run the migration? See: supabase/migrations/create_sitemap_entries.sql');
    process.exit(1);
  }

  // 2. Fetch published articles from articles table
  const { data: articles, error: artError } = await supabase
    .from('articles')
    .select('slug, title, updated_at, status')
    .eq('status', 'published')
    .not('slug', 'is', null);

  if (artError) {
    console.warn('⚠️ Could not fetch articles from table:', artError.message);
  }

  const allEntries = entries || [];
  const sitemapEntryMap = new Map(allEntries.map(e => [e.loc, e]));
  const excludedLocs = new Set(allEntries.filter(e => e.exclude).map(e => e.loc));

  // Static pages (excluding any article URLs that were previously typed as static)
  const staticEntries = allEntries.filter(
    e => e.type === 'static' && !e.exclude && !e.loc.startsWith('/articles/')
  );

  // College pages
  const collegeEntries = allEntries.filter(e => e.type === 'college' && !e.exclude);

  // SEO search pages
  const seoSearchEntries = allEntries.filter(e => e.type === 'seo_search' && !e.exclude);

  // Articles map to deduplicate by loc
  const articleMap = new Map();

  // A. From sitemap_entries where type === 'article' or loc starts with /articles/
  for (const e of allEntries) {
    if (e.exclude) continue;
    if (e.type === 'article' || (e.loc.startsWith('/articles/') && e.loc !== '/articles')) {
      articleMap.set(e.loc, {
        loc: e.loc,
        priority: e.priority || '0.8',
        changefreq: e.changefreq || 'weekly',
        lastmod: e.lastmod || undefined,
      });
    }
  }

  // B. From articles table (published articles)
  for (const art of (articles || [])) {
    const slug = art.slug?.trim();
    if (!slug) continue;
    const loc = `/articles/${slug}`;
    if (excludedLocs.has(loc)) continue;

    const existing = sitemapEntryMap.get(loc);
    const lastmod = existing?.lastmod || (art.updated_at ? art.updated_at.slice(0, 10) : undefined);
    const priority = existing?.priority || '0.8';
    const changefreq = existing?.changefreq || 'weekly';

    articleMap.set(loc, {
      loc,
      priority,
      changefreq,
      lastmod,
    });
  }

  const articleEntries = Array.from(articleMap.values()).sort((a, b) => a.loc.localeCompare(b.loc));

  const staticBlocks = staticEntries.map(e => buildUrlBlock({
    loc: e.loc,
    priority: e.priority,
    changefreq: e.changefreq,
    lastmod: e.lastmod || undefined,
  }));

  const seoSearchBlocks = seoSearchEntries.map(e => buildUrlBlock({
    loc: e.loc,
    priority: e.priority,
    changefreq: e.changefreq,
    lastmod: e.lastmod || undefined,
  }));

  const articleBlocks = articleEntries.map(e => buildUrlBlock({
    loc: e.loc,
    priority: e.priority,
    changefreq: e.changefreq,
    lastmod: e.lastmod || undefined,
  }));

  const collegeBlocks = collegeEntries.map(e => buildUrlBlock({
    loc: e.loc,
    priority: e.priority,
    changefreq: e.changefreq,
    lastmod: e.lastmod || undefined,
  }));

  const now = new Date().toISOString().slice(0, 10);
  const totalUrls = staticBlocks.length + seoSearchBlocks.length + articleBlocks.length + collegeBlocks.length;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<!-- Generated: ${now} | ${totalUrls} URLs (${staticBlocks.length} static + ${seoSearchBlocks.length} SEO search + ${articleBlocks.length} articles + ${collegeBlocks.length} college pages) -->`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    '  <!-- ═══════════════════ -->',
    '  <!-- Static Pages        -->',
    '  <!-- ═══════════════════ -->',
    ...staticBlocks,
    '',
    '  <!-- ══════════════════════════════════ -->',
    `  <!-- SEO Search Pages (${seoSearchBlocks.length} pages)           -->`,
    '  <!-- ══════════════════════════════════ -->',
    ...seoSearchBlocks,
    '',
    '  <!-- ══════════════════════════════════ -->',
    `  <!-- Article Pages (${articleBlocks.length} pages)                -->`,
    '  <!-- ══════════════════════════════════ -->',
    ...articleBlocks,
    '',
    '  <!-- ══════════════════════════════════ -->',
    `  <!-- College Pages (${collegeBlocks.length} pages)           -->`,
    '  <!-- ══════════════════════════════════ -->',
    ...collegeBlocks,
    '',
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');

  const kb = (Buffer.byteLength(xml, 'utf8') / 1024).toFixed(1);
  console.log(`    ✅  ${totalUrls} URLs written (${staticBlocks.length} static + ${seoSearchBlocks.length} SEO search + ${articleBlocks.length} articles + ${collegeBlocks.length} college pages)`);
  console.log(`    📄  Output : ${OUTPUT_PATH}`);
  console.log(`    💾  Size   : ${kb} KB`);
  console.log('    🎉  Done!\n');
}

generate().catch(err => { console.error('❌ Fatal:', err); process.exit(1); });
