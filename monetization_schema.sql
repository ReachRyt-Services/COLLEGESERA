-- MONETIZATION FEATURES SCHEMA
-- 1. Add 'featured_priority' to 'colleges' table
--    This allows us to rank sponsored colleges (e.g., Platinum sponsors appear first).
--    We assume 'featured' column already exists based on existing code. If not, uncomment the next line.
-- ALTER TABLE colleges ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

ALTER TABLE colleges ADD COLUMN IF NOT EXISTS featured_priority INTEGER DEFAULT 0;

-- 2. Create 'ad_placements' table
--    Stores banner ads to be injected into the list and sidebar.
CREATE TABLE IF NOT EXISTS ad_placements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    placement_area TEXT NOT NULL CHECK (placement_area IN ('sidebar', 'list_feed', 'home_hero')),
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS for ad_placements
ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;

-- 4. Policies for ad_placements
--    Public: Read-only
--    Admin: Full access

CREATE POLICY "Public read access for ads" ON ad_placements
    FOR SELECT USING (true);

CREATE POLICY "Admin full access for ads" ON ad_placements
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. Insert some sample ads (Optional - for testing)
INSERT INTO ad_placements (title, image_url, link_url, placement_area, priority)
VALUES 
('Sidebar Ad 1', 'https://placehold.co/300x250/orange/white?text=Ad+Space', '#', 'sidebar', 10),
('Feed Ad 1', 'https://placehold.co/800x100/blue/white?text=Sponsored+Banner', '#', 'list_feed', 10);
