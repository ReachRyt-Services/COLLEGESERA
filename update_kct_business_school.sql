-- ============================================================================
-- SQL Script: Update KCT Business School, Coimbatore (KCTBS)
-- Target Slug: 'kct-business-school'
-- Dynamically looks up college_id & program_id; no hardcoded IDs.
-- ============================================================================

DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_c1_id UUID;
    v_c2_id UUID;
    v_c3_id UUID;
    v_c4_id UUID;
    v_c5_id UUID;
    v_fs1_id UUID;
    v_fs2_id UUID;
    v_fs3_id UUID;
    v_fs4_id UUID;
    v_fs5_id UUID;
BEGIN
    -- 1. Dynamically find college ID by slug
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'kct-business-school';

    IF v_college_id IS NULL THEN
        RAISE EXCEPTION 'College with slug kct-business-school not found!';
    END IF;

    -- 2. Dynamically find MBA program ID from programs table
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;
    IF v_program_id IS NULL THEN
        SELECT id INTO v_program_id FROM programs WHERE name ILIKE '%Business Administration%' LIMIT 1;
    END IF;

    -- 3. Update College Profile Details
    UPDATE colleges 
    SET 
      name = 'KCT Business School',
      location = 'Saravanampatti, Coimbatore',
      district = 'Coimbatore',
      address = 'Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049',
      website = 'https://www.kctbs.ac.in/',
      established = 2005,
      type = 'Private',
      type_collwge = 'MBA',
      naac_grade = 'A++',

      -- Campus Facilities
      facilities = ARRAY[
        'Mahatma Gandhi Central Library & Digital Databases',
        'Smart Classrooms & Collaborative Discussion Chambers',
        'Separate Residential Hostels for Men & Women',
        'Sports Complex, Gymnasium & Indoor/Outdoor Courts',
        'Healthcare & On-Campus Medical Support Facilities',
        'Campus Dining, Cafeterias & Student Conveniences',
        'High-Speed Wi-Fi Campus',
        'Dedicated Career Development Centre (CDC)',
        'Innovation, Incubation & Startup Labs'
      ],

      -- Highlights
      highlights = to_jsonb(ARRAY[
        'Autonomous Business School under Kumaraguru College of Technology | Affiliated with Anna University',
        'Parent Institution Accredited with NAAC A++ Grade & NBA-Accredited Programmes',
        'Specialised MBA Offerings in Project Management, IEV, Agri Business & Supply Chain',
        'Experiential Pedagogy: Case Studies, Live Business Simulations & Management Consulting',
        'Dedicated Career Development Centre (CDC) with Comprehensive Aptitude & Interview Grooming',
        'Top Recruiters: Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture & Federal Bank',
        'Mahatma Gandhi Central Library, Innovation Labs & Comprehensive Sports/Hostel Amenities'
      ]),

      -- Comprehensive Description (Sections 1 through 6)
      description = E'1. Overview\n' ||
        'KCT Business School (KCTBS) is the management school of Kumaraguru College of Technology, located in Coimbatore, Tamil Nadu. Established in 2005, the business school focuses on management education, industry-oriented learning, entrepreneurship and leadership development.\n\n' ||
        'The MBA programmes combine classroom learning with case studies, internships, business simulations, projects and corporate interactions to help students develop practical management skills.\n\n' ||
        '• Location: Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049.\n' ||
        '• Established: 2005.\n' ||
        '• Courses offered: MBA, MBA in Project Management, MBA in Innovation, Entrepreneurship and Venture Development, MBA in Agri Business Management, and MBA in Logistics and Supply Chain Management.\n' ||
        '• Duration: 2 years, full-time.\n' ||
        '• Academic affiliation: Anna University (Autonomous under Kumaraguru College of Technology).\n' ||
        '• Learning approach: Case studies, industry interactions, internships, business simulations and management projects.\n' ||
        '• Student profile: KCT Business School caters to students from diverse academic backgrounds, including engineering, commerce, science and business administration.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        'KCT Business School offers a general MBA along with specialised programmes designed for different management and industry career paths:\n\n' ||
        'MBA programmes offered:\n' ||
        '• MBA – General: Core management, finance, marketing, HR and business strategy.\n' ||
        '• MBA – Project Management: Project planning, execution, scheduling, cost control and risk management.\n' ||
        '• MBA – Innovation, Entrepreneurship and Venture Development: Innovation, startup development, entrepreneurship and venture creation.\n' ||
        '• MBA – Agri Business Management: Agricultural markets, agribusiness operations and rural business management.\n' ||
        '• MBA – Logistics and Supply Chain Management: Logistics, procurement, inventory, transportation and supply chain operations.\n\n' ||
        'The general MBA curriculum includes subjects such as managerial economics, accounting for management, financial management, marketing management, human resource management, business law, digital transformation and leadership development.\n\n' ||
        'MBA fees structure (Published 2025–26 government-quota schedule - 1st Year Academic Fee):\n' ||
        '• MBA – General: ₹2,70,000 (OC/BC/BCM/MBC/DNC) | ₹2,74,000 (SC/SCA/ST)\n' ||
        '• MBA – Logistics and Supply Chain Management: ₹2,70,000 (OC/BC/BCM/MBC/DNC) | ₹2,74,000 (SC/SCA/ST)\n' ||
        '• MBA – Agri Business Management: ₹2,70,000 (OC/BC/BCM/MBC/DNC) | ₹2,74,000 (SC/SCA/ST)\n' ||
        '• MBA – Project Management: ₹3,70,000 (OC/BC/BCM/MBC/DNC) | ₹3,74,000 (SC/SCA/ST)\n' ||
        '• MBA – Innovation, Entrepreneurship and Venture Development: ₹3,20,000 (OC/BC/BCM/MBC/DNC) | ₹3,24,000 (SC/SCA/ST)\n\n' ||
        '(Note: These figures are for the first year only, not the complete two-year programme fee. They are from the 2025–26 schedule; the applicable 2026–27 fees and any management-quota differences should be confirmed before publication).\n\n' ||
        '3. MBA Admission Process\n' ||
        'KCT Business School follows an admission process that considers academic performance, entrance-exam scores and performance in the selection stages.\n\n' ||
        'Eligibility criteria:\n' ||
        '• A bachelor''s degree from a recognised university.\n' ||
        '• A minimum of 60% undergraduate marks is indicated in the general MBA admission criteria.\n' ||
        '• A mathematics background may be preferred, depending on the programme.\n' ||
        '• Applicants must satisfy the relevant entrance-exam and selection requirements.\n\n' ||
        'Accepted entrance examinations:\n' ||
        'MAT, CAT and the institute''s prescribed online entrance assessment may be accepted, subject to the programme''s current admission rules.\n\n' ||
        'Admission procedure:\n' ||
        '1. Submit the MBA application with academic details and supporting documents.\n' ||
        '2. Provide the accepted entrance-exam score or complete the applicable entrance assessment.\n' ||
        '3. Participate in the selection process, which may include a Statement of Purpose (SOP), Group Discussion (GD) and Personal Interview (PI).\n' ||
        '4. Complete document verification and fee payment if selected.\n' ||
        '(Admission criteria can differ across the general MBA and specialised programmes. Candidates should confirm the requirements for their chosen programme and admission year).\n\n' ||
        '4. MBA Placements\n' ||
        'KCT Business School has a dedicated Career Development Centre that supports eligible MBA students through placement preparation, internships, recruiter interactions and career guidance.\n' ||
        'The institute publishes separate placement statistics for the 2024–25 academic year for its general MBA, Innovation, Entrepreneurship and Venture Development (IEV), and Project Management (PM) programmes.\n\n' ||
        'Placement preparation includes:\n' ||
        '• Aptitude training and assessment.\n' ||
        '• Group Discussion and Personal Interview practice.\n' ||
        '• Resume preparation and interview guidance.\n' ||
        '• Business presentations and communication development.\n' ||
        '• Industry interactions and internship opportunities.\n' ||
        '• Career counselling and alumni engagement.\n\n' ||
        'Top Recruiters:\n' ||
        'Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture, Federal Bank and other organisations across finance, consulting, banking and business services.\n\n' ||
        'Potential career opportunities for graduates:\n' ||
        'Business Analyst, Financial Analyst, Marketing Executive/Manager, HR Executive/Business Partner, Management Consultant, Project Coordinator/Manager, Logistics & Supply Chain Analyst, Business Development Manager, Entrepreneur or Startup Founder.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        'KCT Business School operates under Kumaraguru College of Technology, which is an autonomous institution affiliated with Anna University.\n' ||
        '• NAAC accreditation: Kumaraguru College of Technology holds NAAC A++ accreditation.\n' ||
        '• NBA accreditation: The parent institution has NBA-accredited programmes; accreditation should be verified for the specific programme concerned.\n' ||
        '• Academic affiliation: The MBA degree is awarded through Anna University.\n' ||
        '• Rankings note: A current, independently verifiable numerical NIRF Management ranking specifically for KCT Business School could not be confirmed. It is better not to assign the institution a rank without a clearly identified ranking source and year.\n\n' ||
        '6. Campus Facilities\n' ||
        'Located within the Kumaraguru campus in Coimbatore, major facilities include:\n' ||
        '• Library and digital resources: Mahatma Gandhi Central Library with books, journals, research resources, digital databases and collaborative study spaces.\n' ||
        '• Classrooms and learning spaces: Smart facilities supporting lectures, group discussions, presentations and collaborative learning.\n' ||
        '• Hostel accommodation: Separate residential facilities for male and female students, with shared rooms and common amenities.\n' ||
        '• Sports and recreation: Indoor games, outdoor sports grounds and gym access.\n' ||
        '• Medical facilities: On-campus healthcare support.\n' ||
        '• Dining and student amenities: Campus dining facilities, cafés, Wi-Fi and student conveniences.\n' ||
        '• Career development facilities: CDC placement preparation, mock interviews, and recruiter interaction zones.',

      updated_at = NOW()
    WHERE id = v_college_id;


    -- 4. Update Courses & Fee Structures
    -- Clear previous fee components, fee structures and courses for KCTBS
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    -- Course 1: MBA – General
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'General Management (Finance, Marketing, HR, Strategy)',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate. Accepted exams: CAT / MAT / Online Assessment',
      'Entrance Score + SOP + GD + PI'
    ) RETURNING id INTO v_c1_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c1_id,
      'GOVERNMENT / MERIT',
      'ENTRANCE',
      '2025–26 1st-year government-quota fee. OC/BC/BCM/MBC/DNC: ₹2,70,000 | SC/SCA/ST: ₹2,74,000. 2nd-year fees and management quota subject to official confirmation.',
      'Bachelor''s degree with minimum 60% marks'
    ) RETURNING id INTO v_fs1_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs1_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);


    -- Course 2: MBA – Project Management
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Project Management',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate. Mathematics background may be preferred.',
      'Entrance Score + SOP + GD + PI'
    ) RETURNING id INTO v_c2_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c2_id,
      'GOVERNMENT / MERIT',
      'ENTRANCE',
      '2025–26 1st-year government-quota fee. OC/BC/BCM/MBC/DNC: ₹3,70,000 | SC/SCA/ST: ₹3,74,000. 2nd-year fees and management quota subject to official confirmation.',
      'Bachelor''s degree with minimum 60% marks'
    ) RETURNING id INTO v_fs2_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs2_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 370000, 'per_year', 'INR', true);


    -- Course 3: MBA – Innovation, Entrepreneurship and Venture Development (IEV)
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Innovation, Entrepreneurship and Venture Development (IEV)',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate. Focus on startup & venture creation.',
      'Entrance Score + SOP + GD + PI'
    ) RETURNING id INTO v_c3_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c3_id,
      'GOVERNMENT / MERIT',
      'ENTRANCE',
      '2025–26 1st-year government-quota fee. OC/BC/BCM/MBC/DNC: ₹3,20,000 | SC/SCA/ST: ₹3,24,000. 2nd-year fees and management quota subject to official confirmation.',
      'Bachelor''s degree with minimum 60% marks'
    ) RETURNING id INTO v_fs3_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs3_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 320000, 'per_year', 'INR', true);


    -- Course 4: MBA – Agri Business Management
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Agri Business Management',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate in any discipline.',
      'Entrance Score + SOP + GD + PI'
    ) RETURNING id INTO v_c4_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c4_id,
      'GOVERNMENT / MERIT',
      'ENTRANCE',
      '2025–26 1st-year government-quota fee. OC/BC/BCM/MBC/DNC: ₹2,70,000 | SC/SCA/ST: ₹2,74,000. 2nd-year fees and management quota subject to official confirmation.',
      'Bachelor''s degree with minimum 60% marks'
    ) RETURNING id INTO v_fs4_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs4_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);


    -- Course 5: MBA – Logistics and Supply Chain Management
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Logistics and Supply Chain Management',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate in any discipline.',
      'Entrance Score + SOP + GD + PI'
    ) RETURNING id INTO v_c5_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c5_id,
      'GOVERNMENT / MERIT',
      'ENTRANCE',
      '2025–26 1st-year government-quota fee. OC/BC/BCM/MBC/DNC: ₹2,70,000 | SC/SCA/ST: ₹2,74,000. 2nd-year fees and management quota subject to official confirmation.',
      'Bachelor''s degree with minimum 60% marks'
    ) RETURNING id INTO v_fs5_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs5_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);


    -- 5. Update Placements
    DELETE FROM placements WHERE college_id = v_college_id;

    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES
      (
        v_college_id,
        2025,
        'Programme-Wise',
        'See Batch Report',
        'See Batch Report',
        ARRAY['Axis Bank', 'Grant Thornton', 'UTI Mutual Fund', 'SLB', 'Berger Paints', 'Accenture', 'Federal Bank']
      ),
      (
        v_college_id,
        2024,
        'Programme-Wise',
        'See Batch Report',
        'See Batch Report',
        ARRAY['Accenture', 'Axis Bank', 'Federal Bank', 'Berger Paints', 'Grant Thornton']
      );


    -- 6. Update Rankings & Accreditations (NAAC A++, NBA Programmes, Anna University)
    DELETE FROM rankings WHERE college_id = v_college_id;

    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'NAAC', 2024, 'A++ Grade (Parent Institution KCT)'),
      (v_college_id, 'NBA Accreditation', 2024, 'Accredited Programmes (Kumaraguru College of Technology)'),
      (v_college_id, 'Anna University', 2024, 'Autonomous Business School');


    -- 7. Update Admission Process
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CAT / MAT / Prescribed Online Entrance Assessment + SOP, Group Discussion (GD) & Personal Interview (PI)',
          online_application_steps = to_jsonb(ARRAY[
            'Eligibility Criteria: Bachelor''s degree in any discipline from a recognised university with minimum 60% undergraduate marks (mathematics background preferred for specific tracks).',
            'Accepted Entrance Examinations: Submit valid scores from MAT, CAT, or the institute''s prescribed online entrance assessment.',
            'Application Submission: Register and fill out the online MBA application form on the official KCTBS portal with personal, academic, and scorecard details.',
            'Selection Stages: Shortlisted candidates are invited for the selection process, including Statement of Purpose (SOP), Group Discussion (GD), and Personal Interview (PI).',
            'Final Allotment: Selection is confirmed based on composite merit score across academics, entrance score, GD/PI performance, followed by document verification and fee payment.'
          ]),
          offline_application_steps = to_jsonb(ARRAY[
            'Visit the Kumaraguru Campus Admissions Office: Chinnavedampatti, Saravanampatti, Coimbatore – 641049 for physical prospectus, counseling, and campus facilities tour.',
            'Submit completed application documents, statement of purpose, and entrance exam scorecards directly to the admissions department.'
          ]),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (
          college_id,
          admission_basis,
          online_application_steps,
          offline_application_steps,
          updated_at
        ) VALUES (
          v_college_id,
          'CAT / MAT / Prescribed Online Entrance Assessment + SOP, Group Discussion (GD) & Personal Interview (PI)',
          to_jsonb(ARRAY[
            'Eligibility Criteria: Bachelor''s degree in any discipline from a recognised university with minimum 60% undergraduate marks (mathematics background preferred for specific tracks).',
            'Accepted Entrance Examinations: Submit valid scores from MAT, CAT, or the institute''s prescribed online entrance assessment.',
            'Application Submission: Register and fill out the online MBA application form on the official KCTBS portal with personal, academic, and scorecard details.',
            'Selection Stages: Shortlisted candidates are invited for the selection process, including Statement of Purpose (SOP), Group Discussion (GD), and Personal Interview (PI).',
            'Final Allotment: Selection is confirmed based on composite merit score across academics, entrance score, GD/PI performance, followed by document verification and fee payment.'
          ]),
          to_jsonb(ARRAY[
            'Visit the Kumaraguru Campus Admissions Office: Chinnavedampatti, Saravanampatti, Coimbatore – 641049 for physical prospectus, counseling, and campus facilities tour.',
            'Submit completed application documents, statement of purpose, and entrance exam scorecards directly to the admissions department.'
          ]),
          NOW()
        );
    END IF;

    -- 8. Update Sitemap & SEO Metadata
    UPDATE sitemap_entries
    SET
      college_name = 'KCT Business School',
      seo_title = 'KCT Business School (KCTBS) Coimbatore - MBA Admissions, Fees, Placements',
      seo_description = 'KCT Business School Coimbatore offers MBA in General, Project Management, IEV, Agri Business & Supply Chain. Check 2025-26 fees, admissions, and placements.',
      updated_at = NOW()
    WHERE slug = 'kct-business-school';

    RAISE NOTICE 'Successfully updated KCT Business School (KCTBS)!';
END $$;
