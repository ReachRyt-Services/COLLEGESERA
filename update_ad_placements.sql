-- 1. Add 'max_display_count' column
--    Used to limit how many times a specific ad is shown (e.g. in a feed loop).
--    Default is 0, which implies 'infinite' or 'no limit'.
ALTER TABLE ad_placements ADD COLUMN IF NOT EXISTS max_display_count INTEGER DEFAULT 0;

-- 2. Update the Check Constraint for 'placement_area'
--    First, drop the old constraint.
ALTER TABLE ad_placements DROP CONSTRAINT IF EXISTS ad_placements_placement_area_check;

--    Then, add the new constraint with updated values.
--    We keep 'list_feed' for valid existing data, but new UI uses 'college_feed'.
ALTER TABLE ad_placements ADD CONSTRAINT ad_placements_placement_area_check 
CHECK (placement_area IN (
    'sidebar', 
    'list_feed', 
    'home_hero', 
    'college_top', 
    'college_bottom', 
    'college_feed'
));

-- 3. (Optional) Migrate old 'list_feed' ads to 'college_feed' if you want them to appear in the new feed logic immediately.
-- UPDATE ad_placements SET placement_area = 'college_feed' WHERE placement_area = 'list_feed';
