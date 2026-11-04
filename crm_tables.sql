-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create crm_contacts table
CREATE TABLE IF NOT EXISTS crm_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    contact_type TEXT DEFAULT 'student', -- student, parent, partner
    source TEXT, -- website, referral, manual
    status TEXT DEFAULT 'active', -- active, inactive, blocked
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID -- Reference to auth.users if needed, or admin ID
);

-- 2. Create crm_leads table
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
    lead_source TEXT, -- organic_search, paid_ad, social_media
    status TEXT DEFAULT 'new', -- new, contacted, qualified, converted, lost
    priority TEXT DEFAULT 'medium', -- low, medium, high
    interested_colleges TEXT[], -- Array of college IDs or names
    preferred_branches TEXT[], -- Array of branch names
    tnea_marks NUMERIC,
    category TEXT,
    preferred_district TEXT,
    expected_admission_year INTEGER,
    notes TEXT,
    assigned_to UUID, -- Reference to admin user ID
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_contacted TIMESTAMPTZ
);

-- 3. Create crm_interactions table
CREATE TABLE IF NOT EXISTS crm_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
    interaction_type TEXT NOT NULL, -- call, email, meeting, note
    subject TEXT,
    description TEXT,
    outcome TEXT,
    next_action TEXT,
    next_action_date TIMESTAMPTZ,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Standardize User Profile (Optional: If you want to migrate userdata)
-- This creates a cleaner profile table linked to auth.users
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    preferred_district TEXT,
    tnea_marks NUMERIC,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable RLS
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies (Basic)

-- Allow Anon to INSERT into crm_contacts (for "Apply Now" forms)
CREATE POLICY "Enable insert for anon users" ON crm_contacts
    FOR INSERT WITH CHECK (true);

-- Allow Anon to INSERT into crm_leads
CREATE POLICY "Enable insert for anon users" ON crm_leads
    FOR INSERT WITH CHECK (true);

-- Allow Authenticated users (Admins) to view all
-- Note: You might want to restrict this to specific admin roles later
CREATE POLICY "Enable read access for authenticated users" ON crm_contacts
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON crm_leads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON crm_interactions
    FOR SELECT USING (auth.role() = 'authenticated');
