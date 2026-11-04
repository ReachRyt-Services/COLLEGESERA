DO $$
DECLARE
    v_college_id UUID;
BEGIN
    -- Get the college ID
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'firebird-institute-of-research-in-management';

    IF v_college_id IS NOT NULL THEN
        -- Upsert into admission_process
        -- We try UPDATE first, if no rows affected (or simple IF EXISTS check), we INSERT.
        
        IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
            UPDATE admission_process
            SET
                admission_basis = 'Candidates seeking admission to the PGDM programs should possess a graduate degree or equivalent qualification with not less than 50% marks in any discipline obtained from a University/Institute recognized by UGC. Candidate has to appear in any one of the entrance examinations such as CAT, MAT, XAT, ATMA, GMAT, TANCET, or a similar score. Selection Process includes Firebird Aptitude test, Group Discussion, and Personal Interview.',
                
                -- Assuming text[] for now. If it fails, I will switch to to_jsonb(ARRAY[...])
                online_application_steps = ARRAY[
                    'Apply online at the official website',
                    'Pay application fee of INR 1000',
                    'Submit application to be allowed for selection process'
                ],
                
                offline_application_steps = ARRAY[
                    'Download the application form',
                    'Fill out the application form',
                    'Submit it along with the processing fee of INR 1,000',
                    'Submit via one of the available payment options'
                ],
                updated_at = NOW()
            WHERE college_id = v_college_id;
            
            RAISE NOTICE 'Updated admission_process for Firebird';
        ELSE
            INSERT INTO admission_process (
                college_id, 
                admission_basis, 
                online_application_steps, 
                offline_application_steps
            )
            VALUES (
                v_college_id,
                'Candidates seeking admission to the PGDM programs should possess a graduate degree or equivalent qualification with not less than 50% marks in any discipline obtained from a University/Institute recognized by UGC. Candidate has to appear in any one of the entrance examinations such as CAT, MAT, XAT, ATMA, GMAT, TANCET, or a similar score. Selection Process includes Firebird Aptitude test, Group Discussion, and Personal Interview.',
                ARRAY[
                    'Apply online at the official website',
                    'Pay application fee of INR 1000',
                    'Submit application to be allowed for selection process'
                ],
                ARRAY[
                    'Download the application form',
                    'Fill out the application form',
                    'Submit it along with the processing fee of INR 1,000',
                    'Submit via one of the available payment options'
                ]
            );
            
            RAISE NOTICE 'Inserted admission_process for Firebird';
        END IF;

    ELSE
        RAISE WARNING 'College not found: Firebird Institute';
    END IF;
END $$;
