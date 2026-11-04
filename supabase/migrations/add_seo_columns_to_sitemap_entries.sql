-- Run this in Supabase SQL Editor to add SEO metadata fields
-- https://supabase.com/dashboard/project/gsvxhqxuxwanujktjjys/sql/new

ALTER TABLE sitemap_entries
  ADD COLUMN IF NOT EXISTS seo_title       TEXT DEFAULT NULL,  -- Custom <title> tag (overrides default)
  ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT NULL,  -- Custom <meta description>
  ADD COLUMN IF NOT EXISTS og_image        TEXT DEFAULT NULL;  -- Custom og:image / twitter:image URL
