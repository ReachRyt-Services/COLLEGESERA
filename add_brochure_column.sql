-- 1. Add brochure_url column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'colleges' AND column_name = 'brochure_file') THEN
        ALTER TABLE public.colleges ADD COLUMN brochure_file TEXT;
    END IF;
END $$;

-- 2. Update Firebird record
UPDATE public.colleges 
SET brochure_file = 'https://firebird.ac.in/wp-content/uploads/2024/11/Final-Brochure-2025.pdf' -- Placeholder or user provided?
WHERE id = '104'; -- Using ID as confirmed earlier
