DO $$
DECLARE
    v_college_id TEXT := '104';
    v_admission_basis TEXT;
    v_online_steps JSONB;
    v_offline_steps JSONB;
BEGIN
    -- 1. College ID is provided as 104

    -- 2. Prepare the data
    v_admission_basis := 'Entry Requirements: Candidates seeking admission to the PGDM programs should possess a graduate degree or equivalent qualification with not less than 50% marks in any discipline obtained from a University/Institute recognized by UGC and their schooling. Candidate has to appear in any one of the entrance examinations such as CAT, MAT, XAT, ATMA, GMAT, TANCET, or a similar score. ' ||
                         E'\n\nSelection Process: The applicants called for the selection process will undergo the Firebird Aptitude test, Group Discussion, and Personal Interview. Before the selection process, the applicants must provide copies of the documents mentioned below.';

    v_online_steps := jsonb_build_array(
        'Students can apply online or submit the applications offline.',
        'The application cost will be INR 1000/-.',
        'With the application form filled out and application fees paid, students will be allowed for the selection process.'
    );

    v_offline_steps := jsonb_build_array(
        'Download the application form by clicking here.',
        'Fill out the application form.',
        'Submit it along with the processing fee of INR 1,000 through one of the below payment options.'
    );

    -- 3. Perform Insert / Upsert
    IF v_college_id IS NOT NULL THEN
        INSERT INTO public.admission_process (
            college_id,
            admission_basis,
            online_application_steps,
            offline_application_steps,
            updated_at
        ) VALUES (
            v_college_id::text, -- Cast to varchar/text as per user schema description if needed, or relying on implicit cast for UUID
            v_admission_basis,
            v_online_steps,
            v_offline_steps,
            NOW()
        )
        ON CONFLICT (college_id) DO UPDATE SET
            admission_basis = EXCLUDED.admission_basis,
            online_application_steps = EXCLUDED.online_application_steps,
            offline_application_steps = EXCLUDED.offline_application_steps,
            updated_at = NOW();

        RAISE NOTICE 'Successfully updated admission_process for Firebird Institute';
    ELSE
        RAISE WARNING 'College not found: Firebird Institute';
    END IF;
END $$;
