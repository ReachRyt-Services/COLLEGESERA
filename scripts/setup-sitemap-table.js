#!/usr/bin/env node
/**
 * setup-sitemap-table.js
 *
 * Run ONCE to create the sitemap_overrides table in Supabase.
 * Usage:  node scripts/setup-sitemap-table.js
 *
 * Alternatively, paste supabase/migrations/create_sitemap_overrides.sql
 * directly into: https://supabase.com/dashboard/project/gsvxhqxuxwanujktjjys/sql
 */

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

const PROJECT_ID = 'gsvxhqxuxwanujktjjys';
const SQL = `
CREATE TABLE IF NOT EXISTS sitemap_overrides (
  slug         TEXT PRIMARY KEY,
  priority     TEXT     DEFAULT NULL,
  changefreq   TEXT     DEFAULT NULL,
  lastmod      DATE     DEFAULT NULL,
  exclude      BOOLEAN  DEFAULT FALSE,
  notes        TEXT     DEFAULT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_sitemap_overrides_ts()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sitemap_overrides_ts ON sitemap_overrides;
CREATE TRIGGER trg_sitemap_overrides_ts
  BEFORE UPDATE ON sitemap_overrides
  FOR EACH ROW EXECUTE FUNCTION update_sitemap_overrides_ts();

INSERT INTO sitemap_overrides (slug, priority, changefreq, notes) VALUES
  ('iit-madras',          '1.0', 'daily',  'Top IIT – highest priority'),
  ('nit-trichy',          '1.0', 'daily',  'Top NIT – highest priority'),
  ('vit-vellore',         '0.9', 'daily',  'Very popular private college'),
  ('anna-university-ceg', '0.9', 'daily',  'Top state university')
ON CONFLICT (slug) DO NOTHING;
`;

console.log('\n📋  To create the sitemap_overrides table:\n');
console.log('   Option A (easiest) — paste the SQL in Supabase dashboard:');
console.log(`   🔗  https://supabase.com/dashboard/project/${PROJECT_ID}/sql/new\n`);
console.log('   Then paste the contents of:');
console.log('   📄  supabase/migrations/create_sitemap_overrides.sql\n');
console.log('─'.repeat(60));
console.log('\n   Option B — the SQL to run:\n');
console.log(SQL);
console.log('─'.repeat(60));
console.log('\n   After creating the table, your SEO team can manage it at:');
console.log(`   🔗  https://supabase.com/dashboard/project/${PROJECT_ID}/editor\n`);
console.log('   They can use the Table Editor (no SQL knowledge needed!)\n');
