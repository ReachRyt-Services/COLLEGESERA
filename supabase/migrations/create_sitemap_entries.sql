-- ═══════════════════════════════════════════════════════════
-- Run this ONCE in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gsvxhqxuxwanujktjjys/sql/new
-- ═══════════════════════════════════════════════════════════

-- Drop old tables if re-running
DROP TABLE IF EXISTS sitemap_entries;
DROP TABLE IF EXISTS sitemap_overrides;

CREATE TABLE sitemap_entries (
  id           SERIAL PRIMARY KEY,
  type         TEXT NOT NULL DEFAULT 'college',   -- 'static' | 'college' | 'seo_search'
  loc          TEXT NOT NULL UNIQUE,              -- /college/iit-madras  or  /
  slug         TEXT,                              -- iit-madras (college only)
  college_name TEXT,                              -- Human-readable name (display only)
  priority     TEXT NOT NULL DEFAULT '0.8',       -- '1.0' | '0.9' | '0.8' | '0.7' | '0.6' | '0.5'
  changefreq   TEXT NOT NULL DEFAULT 'weekly',    -- 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastmod      DATE DEFAULT NULL,                 -- Leave NULL = use college updated_at from DB
  exclude      BOOLEAN NOT NULL DEFAULT FALSE,    -- TRUE = skip this URL from sitemap
  notes        TEXT DEFAULT NULL,                 -- Notes for SEO team
  sort_order   INT NOT NULL DEFAULT 999,          -- Controls order in sitemap (static pages use 1-20)
  seo_title    TEXT DEFAULT NULL,
  seo_description TEXT DEFAULT NULL,
  og_image     TEXT DEFAULT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-timestamp trigger
CREATE OR REPLACE FUNCTION update_sitemap_entries_ts()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sitemap_entries_ts ON sitemap_entries;
CREATE TRIGGER trg_sitemap_entries_ts
  BEFORE UPDATE ON sitemap_entries
  FOR EACH ROW EXECUTE FUNCTION update_sitemap_entries_ts();

-- Seed static pages (SEO team edits these via admin UI)
INSERT INTO sitemap_entries (type, loc, priority, changefreq, sort_order, notes) VALUES
  ('static', '/',          '1.0', 'daily',   1, 'Homepage'),
  ('static', '/colleges',  '0.9', 'daily',   2, 'College listings'),
  ('static', '/exams',     '0.8', 'weekly',  3, 'Exam listings'),
  ('static', '/articles',  '0.8', 'weekly',  4, 'Articles / Blog'),
  ('static', '/compare',   '0.7', 'weekly',  5, 'College comparison tool'),
  ('static', '/about-us',  '0.5', 'monthly', 6, 'About us page'),
  ('static', '/contact-us','0.5', 'monthly', 7, 'Contact page'),
  ('seo_search', '/mba-colleges-in-tamilnadu', '0.9', 'weekly', 8, 'SEO Popular Search'),
  ('seo_search', '/engineering-colleges-in-bangalore', '0.9', 'weekly', 9, 'SEO Popular Search'),
  ('seo_search', '/medical-colleges-in-delhi', '0.9', 'weekly', 10, 'SEO Popular Search')
ON CONFLICT (loc) DO NOTHING;

-- Enable Row Level Security (allow anon reads for the generator script)
ALTER TABLE sitemap_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read_sitemap_entries"
  ON sitemap_entries FOR SELECT
  USING (true);

CREATE POLICY "anon_insert_sitemap_entries"
  ON sitemap_entries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "anon_update_sitemap_entries"
  ON sitemap_entries FOR UPDATE
  USING (true);

CREATE POLICY "anon_delete_sitemap_entries"
  ON sitemap_entries FOR DELETE
  USING (true);
