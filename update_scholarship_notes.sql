-- 1. Ensure 'notes' column exists in crm_leads
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'notes') THEN
        ALTER TABLE crm_leads ADD COLUMN notes TEXT;
    END IF;
END $$;

-- 2. Update the RPC function to accept notes
CREATE OR REPLACE FUNCTION submit_lead(
    p_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_city TEXT,
    p_course TEXT,
    p_source TEXT DEFAULT 'website_popup',
    p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_contact_id UUID;
    v_lead_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Check if contact exists or create new
    SELECT id INTO v_contact_id FROM crm_contacts WHERE email = p_email OR phone = p_phone LIMIT 1;

    IF v_contact_id IS NULL THEN
        INSERT INTO crm_contacts (name, email, phone, contact_type, source, status, created_at, updated_at)
        VALUES (p_name, p_email, p_phone, 'student', p_source, 'new', NOW(), NOW())
        RETURNING id INTO v_contact_id;
    END IF;

    -- 2. Create Lead
    INSERT INTO crm_leads (
        contact_id, 
        lead_source, 
        status, 
        priority, 
        preferred_district, 
        preferred_branches,
        notes,
        created_at, 
        updated_at
    )
    VALUES (
        v_contact_id, 
        p_source, 
        'new', 
        'medium', 
        p_city, 
        ARRAY[p_course], -- Store course in preferred_branches array
        p_notes,
        NOW(), 
        NOW()
    )
    RETURNING id INTO v_lead_id;

    -- 3. Return result
    v_result := jsonb_build_object(
        'success', true,
        'lead_id', v_lead_id,
        'contact_id', v_contact_id,
        'message', 'Lead submitted successfully'
    );

    RETURN v_result;

EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;
