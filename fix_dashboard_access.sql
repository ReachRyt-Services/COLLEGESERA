-- TEMPORARY FIX: Enable Public Read Access for Admin Dashboard
-- Reason: The project uses Clerk for Auth but Supabase for DB. 
-- Since they are not integrated (JWT), Supabase sees all users as "Anonymous".
-- This script allows Anonymous users to VIEW the leads so the Dashboard works.

-- 1. Drop existing restrictive policies (if they exist)
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON crm_contacts;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON crm_leads;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON crm_interactions;

-- 2. Create new policies allowing public read
CREATE POLICY "Enable public read access" ON crm_contacts
    FOR SELECT USING (true);

CREATE POLICY "Enable public read access" ON crm_leads
    FOR SELECT USING (true);

CREATE POLICY "Enable public read access" ON crm_interactions
    FOR SELECT USING (true);

-- Note: This makes your leads visible to anyone who knows your API URL.
-- For production, you MUST integrate Clerk with Supabase properly.
