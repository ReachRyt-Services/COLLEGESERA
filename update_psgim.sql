-- ============================================================================
-- SQL Script: Update PSG Institute of Management (PSGIM)
-- Target Slug: 'psg-institute-of-management'
-- Dynamically looks up college_id; no hardcoded IDs.
-- ============================================================================

DO $$
DECLARE
    v_college_id TEXT;
BEGIN
    -- 1. Find college ID by slug
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'psg-institute-of-management';

    IF v_college_id IS NULL THEN
        RAISE EXCEPTION 'College with slug psg-institute-of-management not found!';
    END IF;

    -- 2. Update College Details (Overview, Facilities, Highlights, Location)
    UPDATE colleges 
    SET 
      name = 'PSG Institute of Management',
      location = 'Peelamedu, Coimbatore',
      district = 'Coimbatore',
      address = 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004',
      website = 'https://psgim.ac.in/',
      established = 1994,
      type = 'Private',
      type_collwge = 'MBA',

      facilities = ARRAY[
        'Library & Digital Academic Databases',
        'Practical Learning & Live Consulting Projects',
        'International Exchange Opportunities',
        'Active Learning Program Service (ALPS - Leadership & Teamwork)',
        'On-Campus Hostel (Single, Double & Triple Occupancy)',
        'High-Speed Wi-Fi Campus',
        'Gymnasium & Sports Facilities',
        'Recreation Hall',
        '24/7 Power & Water Supply',
        'Industry & Alumni Engagement Network'
      ],

      highlights = to_jsonb(ARRAY[
        'Affiliated with Anna University | Approved by AICTE | Accredited by NBA & ACBSP',
        'First Indian Business School to receive ACBSP international accreditation for MBA & EMBA',
        'Ranked 20th by EducationWorld and 22nd by BusinessWorld among Business Schools',
        '2025–26 Placement: Highest CTC ₹20.12 LPA, Average CTC ₹7.71 LPA, Median CTC ₹7.50 LPA (226 Offers)',
        '2-Year Full-Time MBA with Specialisations in Finance, Marketing, HR, Decision Science & Analytics',
        'Pedagogy: Case studies, live consulting projects, summer internships & project-based dissertation',
        'Active Learning Program Service (ALPS) for leadership, teamwork & outbound learning',
        'On-campus hostel (Single, Double & Triple) with Wi-Fi, Gym, Sports & 24/7 Power/Water'
      ]),

      description = E'1. Overview\n' ||
        'PSG Institute of Management (PSGIM) is a well-established business school located in Peelamedu, Coimbatore. Its roots go back to 1965, when it began as the Department of Management Sciences under PSG College of Technology. It became an independent institute in 1994.\n\n' ||
        'The institute offers a two-year, full-time MBA focused on management fundamentals, practical learning and professional development. Its teaching methods include case studies, internships, live consulting projects, summer projects and activity-based learning. The programme is affiliated with Anna University, approved by AICTE, and accredited by NBA and ACBSP, according to the institute''s official MBA page.\n\n' ||
        '• Location: Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004.\n' ||
        '• Course duration: 2 years, full-time.\n' ||
        '• Eligibility: Bachelor''s degree with a minimum of 60% aggregate; final-year students may also apply provisionally.\n' ||
        '• Official website: https://psgim.ac.in/\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        'PSGIM''s MBA is a two-year programme. Students study core management subjects in the first year and can pursue their areas of interest through specialisations and electives in the second year. The programme also includes a project-based dissertation.\n\n' ||
        'Key course details:\n' ||
        '• Course: Master of Business Administration (MBA)\n' ||
        '• Duration: 2 years, full-time\n' ||
        '• Specialisation areas: Finance, Marketing, Human Resources, Decision Science & Analytics\n' ||
        '• Learning methods: Case studies, internships, live projects, summer projects\n' ||
        '• Final-year component: Project-based dissertation\n\n' ||
        'MBA fees:\n' ||
        'The current official two-year MBA fee structure for the 2026–27 intake is not published in PSGIM''s official information. Third-party listings show inconsistent fee figures, so it is better not to publish an unverified amount as fact. For the latest tuition fee, deposits and hostel charges, check directly with the official admissions office.\n\n' ||
        '3. MBA Admission Process\n' ||
        'PSGIM''s admission process considers academic performance, entrance-exam scores and the applicant''s overall profile. Candidates should check the current intake requirements before applying, as accepted exams and admission dates can change each year.\n\n' ||
        'Eligibility criteria:\n' ||
        '• A bachelor''s degree in any discipline from a recognised university.\n' ||
        '• Minimum 60% aggregate marks.\n' ||
        '• Final-year undergraduate students can apply provisionally, subject to completing their degree.\n' ||
        '• Work experience may provide an additional advantage.\n' ||
        '• Entrance exams: The institute''s MBA page lists CAT, MAT, ATMA and TANCET for the 2026 admission cycle. Candidates should confirm which exam scores and test dates are accepted for their intended intake.\n' ||
        '• Application and selection: Applicants should review the current admission notification, submit the application and required details, and complete the selection stages for which they are shortlisted. The institute notes that selection can consider academics, work experience, diversity, extracurricular achievements, entrance scores and English-language proficiency.\n' ||
        '• For application updates, visit PSGIM MBA Admissions: https://psgim.ac.in/admissions/\n\n' ||
        '4. MBA Placements\n' ||
        'PSGIM publishes placement statistics for its management programmes. According to its official placement highlights, the 2025–26 figures are as follows:\n' ||
        '• Highest CTC: ₹20.12 LPA\n' ||
        '• Average CTC: ₹7.71 LPA\n' ||
        '• Median CTC: ₹7.50 LPA\n' ||
        '• Total offers: 226\n' ||
        '(Source: PSGIM''s official placement highlights page. Total offers are not necessarily the same as the number of students placed).\n\n' ||
        'Placement Trends (Official Highlights):\n' ||
        '• 2025–26: Average CTC ₹7.71 LPA | Highest CTC ₹20.12 LPA\n' ||
        '• 2024–25: Average CTC ₹7.53 LPA | Highest CTC ₹16.42 LPA\n' ||
        '• 2023–24: Average CTC ₹7.50 LPA | Highest CTC ₹16.22 LPA\n' ||
        '• 2022–23: Average CTC ₹7.30 LPA | Highest CTC ₹14.83 LPA\n' ||
        'These figures suggest an upward trend in the reported average and highest CTC. Students should also consider the median package, roles offered, recruiter mix and placement outcomes for their preferred specialisation when evaluating the programme.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        'PSGIM highlights its national and international accreditations and its presence in business-school rankings:\n' ||
        '• BusinessWorld: 22nd among business schools in the publication''s ranking.\n' ||
        '• EducationWorld: 20th among business schools.\n' ||
        '• ACBSP accreditation: First Indian business school to receive this international accreditation for its MBA and EMBA programmes.\n' ||
        '• NBA and AICTE: NBA accreditation and AICTE approval.\n' ||
        '(Ranking note: The rankings above are reported on PSGIM''s own website; confirm ranking year and category before presenting them as current rankings. Do not confuse PSGIM with PSG College of Technology, which is a separate institution and appears separately in NIRF listings).\n\n' ||
        '6. Campus Facilities and Learning Environment\n' ||
        'PSGIM combines classroom learning with practical activities and access to academic resources. Highlights include:\n' ||
        '• Library and digital resources: Access to a library and digital academic databases.\n' ||
        '• Practical learning: Case studies, internships, summer projects, live consulting projects and hands-on simulations.\n' ||
        '• International exposure: International exchange opportunities with partner universities.\n' ||
        '• Leadership development: Active Learning Program Service (ALPS) focusing on communication, leadership and teamwork.\n' ||
        '• Hostel accommodation: On-campus options include single, double and triple occupancy rooms with Wi-Fi, gym, sports facilities, recreation hall, and 24/7 power and water supply.\n' ||
        '• Industry and alumni connections: Extensive industry engagement and strong global alumni network.',

      updated_at = NOW()
    WHERE id = v_college_id;

    -- 3. Update Course Details
    IF EXISTS (SELECT 1 FROM courses WHERE college_id = v_college_id AND name = 'MBA') THEN
        UPDATE courses
        SET
          specialization = 'Finance, Marketing, Human Resources, Decision Science & Analytics',
          duration = '2 Years',
          degree_type = 'FULL TIME',
          eligibility = 'Bachelor''s degree in any discipline with minimum 60% aggregate (final-year students may apply provisionally). Accepted entrance exams: CAT, MAT, ATMA, TANCET (2026 cycle).',
          selection_basis = 'CAT / MAT / ATMA / TANCET (2026 cycle) + Academic Profile, Work Experience, Extracurriculars & Interview',
          intake_seats = NULL
        WHERE college_id = v_college_id AND name = 'MBA';
    ELSE
        INSERT INTO courses (college_id, name, specialization, duration, degree_type, eligibility, selection_basis)
        VALUES (
          v_college_id,
          'MBA',
          'Finance, Marketing, Human Resources, Decision Science & Analytics',
          '2 Years',
          'FULL TIME',
          'Bachelor''s degree in any discipline with minimum 60% aggregate (final-year students may apply provisionally). Accepted entrance exams: CAT, MAT, ATMA, TANCET (2026 cycle).',
          'CAT / MAT / ATMA / TANCET (2026 cycle) + Academic Profile, Work Experience, Extracurriculars & Interview'
        );
    END IF;

    -- 4. Update Fee Structure & Clear Unverified Component Amount
    DELETE FROM fee_components 
    WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);

    UPDATE fee_structures
    SET
      notes = 'Official 2026–27 two-year MBA fee structure is unverified in published sources. For the latest tuition fees, deposits and hostel charges, check directly with the official admissions office.',
      eligibility = 'Bachelor''s degree with minimum 60% aggregate; CAT / MAT / ATMA / TANCET (2026 cycle)'
    WHERE college_id = v_college_id;

    -- 5. Placements (4 Years of Official Highlights & Trends)
    DELETE FROM placements WHERE college_id = v_college_id;

    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES
      (v_college_id, 2026, '₹7.50 LPA (Median)', '₹7.71 LPA', '₹20.12 LPA', ARRAY['226 Total Offers', 'PSGIM Official Placement Highlights']),
      (v_college_id, 2025, 'N/A', '₹7.53 LPA', '₹16.42 LPA', ARRAY['PSGIM Official Placement Trends']),
      (v_college_id, 2024, 'N/A', '₹7.50 LPA', '₹16.22 LPA', ARRAY['PSGIM Official Placement Trends']),
      (v_college_id, 2023, 'N/A', '₹7.30 LPA', '₹14.83 LPA', ARRAY['PSGIM Official Placement Trends']);

    -- 6. Rankings & Accreditations (Official Published Figures)
    DELETE FROM rankings WHERE college_id = v_college_id;

    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'EducationWorld', 2024, '20 (Business Schools)'),
      (v_college_id, 'BusinessWorld', 2024, '22 (Business Schools)'),
      (v_college_id, 'ACBSP Accreditation', 2024, '1st Indian B-School accredited for MBA & EMBA'),
      (v_college_id, 'NBA & AICTE', 2024, 'NBA Accredited & AICTE Approved');

    -- 7. Admission Process
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CAT / MAT / ATMA / TANCET (2026 admission cycle) + Academic Profile, Work Experience, Diversity, Extracurriculars & Interview',
          online_application_steps = to_jsonb(ARRAY[
            'Eligibility Criteria: Bachelor''s degree in any discipline from a recognised university with minimum 60% aggregate marks.',
            'Final-year undergraduate students can apply provisionally, subject to completing their degree.',
            'Work experience may provide an additional advantage in the selection process.',
            'Accepted Entrance Exams: CAT, MAT, ATMA, and TANCET for the 2026 admission cycle. Confirm accepted exam scores and test dates for your intended intake.',
            'Application Form: Review the current admission notification and submit the application with required academic credentials and entrance exam scores.',
            'Selection Stages: Shortlisted applicants undergo evaluation based on academics, work experience, diversity, extracurricular achievements, entrance scores, and English-language proficiency.',
            'Admissions Portal: For latest updates, deadlines, and notifications, visit https://psgim.ac.in/admissions/'
          ]),
          offline_application_steps = to_jsonb(ARRAY[
            'Visit the PSGIM Admissions Office: Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004 for physical prospectus, admission counseling, and hostel details.',
            'Submit completed application documents along with required photocopies of degree certificates, mark sheets, and entrance exam scorecards.'
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
          'CAT / MAT / ATMA / TANCET (2026 admission cycle) + Academic Profile, Work Experience, Diversity, Extracurriculars & Interview',
          to_jsonb(ARRAY[
            'Eligibility Criteria: Bachelor''s degree in any discipline from a recognised university with minimum 60% aggregate marks.',
            'Final-year undergraduate students can apply provisionally, subject to completing their degree.',
            'Work experience may provide an additional advantage in the selection process.',
            'Accepted Entrance Exams: CAT, MAT, ATMA, and TANCET for the 2026 admission cycle. Confirm accepted exam scores and test dates for your intended intake.',
            'Application Form: Review the current admission notification and submit the application with required academic credentials and entrance exam scores.',
            'Selection Stages: Shortlisted applicants undergo evaluation based on academics, work experience, diversity, extracurricular achievements, entrance scores, and English-language proficiency.',
            'Admissions Portal: For latest updates, deadlines, and notifications, visit https://psgim.ac.in/admissions/'
          ]),
          to_jsonb(ARRAY[
            'Visit the PSGIM Admissions Office: Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004 for physical prospectus, admission counseling, and hostel details.',
            'Submit completed application documents along with required photocopies of degree certificates, mark sheets, and entrance exam scorecards.'
          ]),
          NOW()
        );
    END IF;

    -- 8. Sitemap & SEO Overrides
    UPDATE sitemap_entries
    SET
      college_name = 'PSG Institute of Management',
      seo_title = 'PSG Institute of Management (PSGIM) Coimbatore - MBA Admissions, Fees, Placements',
      seo_description = 'PSG Institute of Management (PSGIM) offers 2-year full-time MBA in Finance, Marketing, HR & Analytics. Check 2026 admissions, placements (₹20.12 LPA highest), and rankings.',
      updated_at = NOW()
    WHERE slug = 'psg-institute-of-management';

    RAISE NOTICE 'Successfully updated PSG Institute of Management (PSGIM)!';
END $$;
