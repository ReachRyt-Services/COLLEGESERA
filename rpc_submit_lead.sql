-- Secure Function to Submit Lead (Bypasses RLS for Anon users)
CREATE OR REPLACE FUNCTION submit_lead(
    p_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_city TEXT,
    p_course TEXT,
    p_source TEXT DEFAULT 'website'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- CRITICAL: Runs with admin privileges to check for duplicates
AS $$
DECLARE
    v_contact_id UUID;
    v_lead_id UUID;
BEGIN
    -- 1. Check/Insert Contact
    -- Try to find by email first
    IF p_email IS NOT NULL AND p_email != '' THEN
        SELECT id INTO v_contact_id FROM crm_contacts WHERE email = p_email LIMIT 1;
    END IF;

    -- If not found, try by phone
    IF v_contact_id IS NULL AND p_phone IS NOT NULL AND p_phone != '' THEN
        SELECT id INTO v_contact_id FROM crm_contacts WHERE phone = p_phone LIMIT 1;
    END IF;

    -- If still not found, create new contact
    IF v_contact_id IS NULL THEN
        INSERT INTO crm_contacts (name, email, phone, source, contact_type)
        VALUES (p_name, p_email, p_phone, p_source, 'student')
        RETURNING id INTO v_contact_id;
    ELSE
        -- Update timestamp to show recent activity
        UPDATE crm_contacts SET updated_at = NOW() WHERE id = v_contact_id;
    END IF;

    -- 2. Create Lead
    INSERT INTO crm_leads (
        contact_id, 
        lead_source, 
        preferred_district, 
        notes, 
        status
    )
    VALUES (
        v_contact_id, 
        p_source, 
        p_city, 
        'Interested in Course: ' || p_course, 
        'new'
    )
    RETURNING id INTO v_lead_id;

    RETURN jsonb_build_object('contact_id', v_contact_id, 'lead_id', v_lead_id);
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION submit_lead TO anon, authenticated, service_role;
