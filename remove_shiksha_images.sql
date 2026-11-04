-- Remove Shiksha URLs from image_url column to improve SEO
-- This sets the column to NULL, so the frontend will use the fallback placeholder.

UPDATE colleges
SET image_url = NULL
WHERE image_url ILIKE '%shiksha.com%';

-- Optional: Verify the count of remaining external images
-- SELECT count(*) FROM colleges WHERE image_url IS NOT NULL;
