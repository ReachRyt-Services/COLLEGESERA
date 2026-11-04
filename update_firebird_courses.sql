DO $$
DECLARE
    v_college_id UUID;
BEGIN
    -- Get the college ID for Firebird Institute
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'firebird-institute-of-research-in-management';

    IF v_college_id IS NOT NULL THEN
        -- 1. DELETE existing courses for this college to avoid duplicates/stale data
        DELETE FROM courses WHERE college_id = v_college_id;
        
        -- 2. INSERT new courses (PGDM Specializations)
        INSERT INTO courses (college_id, name, duration, degree_type, eligibility, selection_basis)
        VALUES 
            -- Core Specialisations
            (v_college_id, 'PGDM - Human Resources', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Finance', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Marketing Management', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Operations Management', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            
            -- Industry Integrated Specialisations
            (v_college_id, 'PGDM - Business Analytics', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Fintech', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Digital Marketing', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI'),
            (v_college_id, 'PGDM - Logistics and Supply Chain Management', '2 Years', 'PGDM', 'Any Degree with 50% marks', 'Entrance Exam + GD + PI');

        RAISE NOTICE 'Successfully updated courses for Firebird Institute';
    ELSE
        RAISE WARNING 'College not found: Firebird Institute';
    END IF;
END $$;
