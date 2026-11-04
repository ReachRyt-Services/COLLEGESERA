-- Run this once in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gsvxhqxuxwanujktjjys/sql

CREATE TABLE IF NOT EXISTS sitemap_overrides (
  slug         TEXT PRIMARY KEY,
  priority     TEXT     DEFAULT NULL,   -- e.g. '1.0', '0.9', '0.8', '0.7'
  changefreq   TEXT     DEFAULT NULL,   -- 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastmod      DATE     DEFAULT NULL,   -- e.g. 2025-12-01  (leave blank = use DB updated_at)
  exclude      BOOLEAN  DEFAULT FALSE,  -- TRUE = remove this college from sitemap entirely
  notes        TEXT     DEFAULT NULL,   -- free-text notes for the SEO team
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-timestamp trigger
CREATE OR REPLACE FUNCTION update_sitemap_overrides_ts()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sitemap_overrides_ts ON sitemap_overrides;
CREATE TRIGGER trg_sitemap_overrides_ts
  BEFORE UPDATE ON sitemap_overrides
  FOR EACH ROW EXECUTE FUNCTION update_sitemap_overrides_ts();

-- Seed with example high-priority colleges
INSERT INTO sitemap_overrides (slug, priority, changefreq, notes) VALUES
  ('iit-madras',          '1.0', 'daily',  'Top IIT – highest priority'),
  ('nit-trichy',          '1.0', 'daily',  'Top NIT – highest priority'),
  ('vit-vellore',         '0.9', 'daily',  'Very popular private college'),
  ('anna-university-ceg', '0.9', 'daily',  'Top state university')
ON CONFLICT (slug) DO NOTHING;
