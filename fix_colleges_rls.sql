
-- Enable RLS (in case it was disabled or not enabled)
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure a clean slate
DROP POLICY IF EXISTS "Public colleges are viewable by everyone" ON public.colleges;
DROP POLICY IF EXISTS "Admins can do everything" ON public.colleges;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.colleges;

-- Policy 1: Public Read Access
-- Allows anyone (anon or authenticated) to SELECT colleges.
CREATE POLICY "Public colleges are viewable by everyone" 
ON public.colleges FOR SELECT 
USING (true);

-- Policy 2: Admin Full Access (for Admin Dashboard and Population Script)
-- Ideally, this should check for a specific role, but for now we'll allow all operations for authenticated users (or everyone if we want to be permissive for the population script).
-- Since the population script uses the ANON key, we need to allow it to INSERT/UPDATE.
-- WARNING: This is insecure for production but necessary if the population script runs as anon.
CREATE POLICY "Admins can do everything" 
ON public.colleges FOR ALL 
USING (true) 
WITH CHECK (true);
