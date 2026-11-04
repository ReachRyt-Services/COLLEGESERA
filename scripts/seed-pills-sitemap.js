import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const pillRoutes = [
  {
    loc: '/top-mba-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Top MBA Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore the top MBA colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.'
  },
  {
    loc: '/top-engineering-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Top Engineering Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore the top engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.'
  },
  {
    loc: '/autonomous-engineering-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Autonomous Engineering Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore autonomous engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.'
  },
  {
    loc: '/top-engineering-colleges-in-salem',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Top Engineering Colleges in Salem | Collegesera',
    seo_description: 'Explore the top engineering colleges in Salem, including rankings, fees, courses, placements, eligibility and admission details.'
  },
  {
    loc: '/nirf-ranked-engineering-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'NIRF Ranked Engineering Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore NIRF ranked engineering colleges in Coimbatore, including national rankings, fees, courses, placements, and admission details.'
  },
  {
    loc: '/top-paramedical-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Top Paramedical Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore the top paramedical colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.'
  },
  {
    loc: '/top-occupational-therapy-colleges-in-coimbatore',
    type: 'seo_search',
    priority: 0.9,
    changefreq: 'weekly',
    exclude: false,
    seo_title: 'Top Occupational Therapy Colleges in Coimbatore | Collegesera',
    seo_description: 'Explore top occupational therapy colleges in Coimbatore, including BOT course details, fees, placements, eligibility and admission details.'
  }
];

async function seed() {
  console.log('Upserting pill routes into sitemap_entries...');

  // Remove legacy numbered URL from sitemap_entries if present
  const { error: delErr } = await supabase
    .from('sitemap_entries')
    .delete()
    .eq('loc', '/top-10-mba-colleges-in-coimbatore');
  if (delErr) {
    console.warn('Could not delete old route:', delErr.message);
  } else {
    console.log('Deleted /top-10-mba-colleges-in-coimbatore from sitemap_entries');
  }
  for (const item of pillRoutes) {
    const { data: existing } = await supabase
      .from('sitemap_entries')
      .select('id')
      .eq('loc', item.loc)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('sitemap_entries')
        .update({
          type: item.type,
          priority: item.priority,
          changefreq: item.changefreq,
          exclude: item.exclude,
          seo_title: item.seo_title,
          seo_description: item.seo_description,
          lastmod: new Date().toISOString().split('T')[0]
        })
        .eq('loc', item.loc);
      if (error) console.error(`Error updating ${item.loc}:`, error.message);
      else console.log(`Updated ${item.loc}`);
    } else {
      const { error } = await supabase
        .from('sitemap_entries')
        .insert({
          ...item,
          lastmod: new Date().toISOString().split('T')[0]
        });
      if (error) console.error(`Error inserting ${item.loc}:`, error.message);
      else console.log(`Inserted ${item.loc}`);
    }
  }
  console.log('Done!');
}

seed();
