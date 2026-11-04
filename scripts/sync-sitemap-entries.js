#!/usr/bin/env node
/**
 * sync-sitemap-entries.js
 *
 * Syncs the `sitemap_entries` table in Supabase with the current list of colleges.
 * - Adds NEW colleges that aren't in the table yet
 * - Skips colleges already in the table (preserves any SEO edits)
 * - Never deletes existing entries (safe to re-run anytime)
 *
 * Run:  node scripts/sync-sitemap-entries.js
 * Or:   npm run sitemap:sync
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

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fetchAllColleges() {
  const PAGE_SIZE = 1000;
  let all = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('colleges')
      .select('slug, name, updated_at')
      .not('slug', 'is', null)
      .order('created_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) { console.error('❌ Supabase (colleges):', error.message); process.exit(1); }
    all = all.concat(data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

async function fetchAllArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, updated_at, status')
    .eq('status', 'published')
    .not('slug', 'is', null)
    .order('created_at', { ascending: true });
  if (error) { console.error('❌ Supabase (articles):', error.message); process.exit(1); }
  return data || [];
}

async function fetchExistingEntries() {
  const { data, error } = await supabase
    .from('sitemap_entries')
    .select('id, loc, type, slug');
  if (error) { console.error('❌ Supabase (sitemap_entries):', error.message); process.exit(1); }
  return data || [];
}

async function sync() {
  console.log('\n🔄  Syncing sitemap_entries table with colleges & articles…');

  const [colleges, articles, existingEntries] = await Promise.all([
    fetchAllColleges(),
    fetchAllArticles(),
    fetchExistingEntries(),
  ]);

  const existingLocs = new Set(existingEntries.map(r => r.loc));

  console.log(`    Found ${colleges.length} colleges in DB`);
  console.log(`    Found ${articles.length} published articles in DB`);
  console.log(`    Found ${existingEntries.length} existing entries in sitemap_entries`);

  // Fix any existing article entries previously typed as 'static'
  for (const entry of existingEntries) {
    if (entry.loc.startsWith('/articles/') && entry.type !== 'article') {
      const artSlug = entry.loc.replace(/^\/articles\//, '');
      console.log(`    Fixing entry type for ${entry.loc} -> type: 'article'`);
      await supabase
        .from('sitemap_entries')
        .update({ type: 'article', slug: entry.slug || artSlug })
        .eq('id', entry.id);
    }
  }

  // Build new rows for colleges not yet in the table
  const newCollegeRows = [];
  for (const college of colleges) {
    const slug = college.slug?.trim();
    if (!slug) continue;
    const loc = `/college/${slug}`;
    if (existingLocs.has(loc)) continue; // already exists, don't overwrite SEO edits
    newCollegeRows.push({
      type: 'college',
      loc,
      slug,
      college_name: college.name || slug,
      priority: '0.8',
      changefreq: 'weekly',
      sort_order: 999,
    });
  }

  // Build new rows for published articles not yet in the table
  const newArticleRows = [];
  for (const article of articles) {
    const slug = article.slug?.trim();
    if (!slug) continue;
    const loc = `/articles/${slug}`;
    if (existingLocs.has(loc)) continue; // already exists, don't overwrite SEO edits
    newArticleRows.push({
      type: 'article',
      loc,
      slug,
      college_name: article.title || slug,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: article.updated_at ? article.updated_at.slice(0, 10) : undefined,
      sort_order: 500,
    });
  }

  const allNewRows = [...newArticleRows, ...newCollegeRows];

  if (allNewRows.length === 0) {
    console.log('    ✅  Everything up to date — no new colleges or articles to add.\n');
    return;
  }

  // Insert in batches of 200
  const BATCH = 200;
  let inserted = 0;
  for (let i = 0; i < allNewRows.length; i += BATCH) {
    const batch = allNewRows.slice(i, i + BATCH);
    const { error } = await supabase
      .from('sitemap_entries')
      .insert(batch);
    if (error) { console.error('❌ Insert error:', error.message); process.exit(1); }
    inserted += batch.length;
    console.log(`    ✅  Inserted ${inserted}/${allNewRows.length} new entries…`);
  }

  console.log(`\n    🎉  Done! Added ${newArticleRows.length} articles and ${newCollegeRows.length} colleges to sitemap_entries.\n`);
}

sync().catch(err => { console.error('❌ Fatal:', err); process.exit(1); });
