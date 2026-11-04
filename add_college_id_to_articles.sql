-- Add college_id column to articles table
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS college_id TEXT REFERENCES public.colleges(id) ON DELETE SET NULL;

-- Create an index for faster lookups by college
CREATE INDEX IF NOT EXISTS idx_articles_college_id ON public.articles(college_id);
