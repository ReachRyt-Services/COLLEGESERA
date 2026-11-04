
-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    category_id UUID,
    tags TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    featured_image TEXT,
    meta_description TEXT,
    article_label TEXT,
    author_id TEXT,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public articles are viewable by everyone" 
ON public.articles FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can do everything" 
ON public.articles FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index on slug
CREATE INDEX IF NOT EXISTS articles_slug_idx ON public.articles (slug);
