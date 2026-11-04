-- ============================================================================
-- MASTER SQL SCRIPT: UPDATE / POPULATE ALL 10 COIMBATORE MBA INSTITUTIONS
-- 1. PSG Institute of Management (PSGIM)
-- 2. Amrita School of Business (ASB)
-- 3. KCT Business School (KCTBS)
-- 4. GRG School of Management Studies (GRGSMS)
-- 5. Jansons School of Business (JSB)
-- 6. Karunya School of Management (KSM)
-- 7. Bharathiar University – Department of Management Studies
-- 8. Coimbatore Institute of Technology (CIT) – MBA
-- 9. Sri Krishna College of Engineering & Technology (SKCET) – MBA
-- 10. Sardar Vallabhbhai Patel International School of Textiles & Management (SVPISTM)
-- ============================================================================

-- Common Variable helper: find or create MBA program_id
DO $$
DECLARE
    v_mba_id UUID;
BEGIN
    SELECT id INTO v_mba_id FROM programs WHERE code = 'MBA' LIMIT 1;
    IF v_mba_id IS NULL THEN
        INSERT INTO programs (id, code, name, level, degree_type)
        VALUES (gen_random_uuid(), 'MBA', 'Master of Business Administration', 'PG', 'FULL TIME');
    END IF;
END $$;


-- ============================================================================
-- 1. PSG INSTITUTE OF MANAGEMENT (PSGIM)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'psg-institute-of-management';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'psg-institute-of-management', 'PSG Institute of Management', 'Peelamedu, Coimbatore', 'Coimbatore', 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004', 'https://psgim.ac.in/', 1994, 'Private', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

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
        'The institute offers a two-year, full-time MBA focused on management fundamentals, practical learning and professional development. Teaching methods include case studies, internships, live consulting projects, summer projects and activity-based learning. The programme is affiliated with Anna University, approved by AICTE, and accredited by NBA and ACBSP.\n\n' ||
        '• Location: Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004.\n' ||
        '• Course duration: 2 years, full-time.\n' ||
        '• Eligibility: Bachelor''s degree with a minimum of 60% aggregate; final-year students may apply provisionally.\n' ||
        '• Official website: https://psgim.ac.in/\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        'Students study core management subjects in the first year and pursue specialisations and electives in the second year, culminating in a project-based dissertation.\n' ||
        '• Specialisations: Finance, Marketing, Human Resources, Decision Science & Analytics.\n' ||
        '• Fees: Current official 2026–27 intake fees are unverified in third-party sources. Check directly with official admissions.\n\n' ||
        '3. MBA Admission Process\n' ||
        'Admission considers academic performance, entrance-exam scores (CAT, MAT, ATMA, TANCET for 2026 cycle), work experience and personal interviews.\n\n' ||
        '4. MBA Placements (2025–26 Highlights)\n' ||
        '• Highest CTC: ₹20.12 LPA | Average CTC: ₹7.71 LPA | Median CTC: ₹7.50 LPA | Total Offers: 226.\n' ||
        '• Placement Trends: 2024-25 (Avg ₹7.53 LPA, Max ₹16.42 LPA) | 2023-24 (Avg ₹7.50 LPA, Max ₹16.22 LPA) | 2022-23 (Avg ₹7.30 LPA, Max ₹14.83 LPA).\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• EducationWorld: 20th among Business Schools | BusinessWorld: 22nd among Business Schools.\n' ||
        '• ACBSP & NBA Accredited | AICTE Approved | Anna University Affiliated.\n\n' ||
        '6. Campus Facilities\n' ||
        'Library and digital academic databases, live consulting projects, international exchange, ALPS leadership training, hostels and sports facilities.',
      updated_at = NOW()
    WHERE id = v_college_id;

    -- Courses & Fees
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Finance, Marketing, Human Resources, Decision Science & Analytics',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with minimum 60% aggregate. CAT / MAT / ATMA / TANCET (2026 cycle)',
      'Entrance Score + Academic Profile + Work Experience + Interview'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'MANAGEMENT / GOVERNMENT',
      'ENTRANCE',
      'Official 2026–27 fee structure unverified in published listings. Contact admissions office directly.',
      'Bachelor''s degree with minimum 60% aggregate'
    );

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES
      (v_college_id, 2026, '₹7.50 LPA (Median)', '₹7.71 LPA', '₹20.12 LPA', ARRAY['226 Total Offers', 'PSGIM Official Placement Highlights']),
      (v_college_id, 2025, 'N/A', '₹7.53 LPA', '₹16.42 LPA', ARRAY['PSGIM Official Placement Trends']),
      (v_college_id, 2024, 'N/A', '₹7.50 LPA', '₹16.22 LPA', ARRAY['PSGIM Official Placement Trends']),
      (v_college_id, 2023, 'N/A', '₹7.30 LPA', '₹14.83 LPA', ARRAY['PSGIM Official Placement Trends']);

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'EducationWorld', 2024, '20 (Business Schools)'),
      (v_college_id, 'BusinessWorld', 2024, '22 (Business Schools)'),
      (v_college_id, 'ACBSP Accreditation', 2024, '1st Indian B-School accredited for MBA & EMBA'),
      (v_college_id, 'NBA & AICTE', 2024, 'NBA Accredited & AICTE Approved');

    -- Admission Process
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CAT / MAT / ATMA / TANCET (2026 admission cycle) + Academic Profile & Selection Rounds',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree in any discipline with minimum 60% aggregate marks (final-year students may apply provisionally).',
            'Accepted Entrance Exams: CAT, MAT, ATMA, and TANCET for 2026 admission cycle.',
            'Submit application form online at https://psgim.ac.in/admissions/ with required academic credentials.',
            'Shortlisted applicants undergo GD / PI and profile evaluation.'
          ]),
          offline_application_steps = to_jsonb(ARRAY[
            'Visit the PSGIM Admissions Office: Avinashi Road, Peelamedu, Coimbatore – 641004 for physical application and counseling.'
          ]),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (
          v_college_id,
          'CAT / MAT / ATMA / TANCET (2026 admission cycle) + Academic Profile & Selection Rounds',
          to_jsonb(ARRAY[
            'Bachelor''s degree in any discipline with minimum 60% aggregate marks (final-year students may apply provisionally).',
            'Accepted Entrance Exams: CAT, MAT, ATMA, and TANCET for 2026 admission cycle.',
            'Submit application form online at https://psgim.ac.in/admissions/ with required academic credentials.',
            'Shortlisted applicants undergo GD / PI and profile evaluation.'
          ]),
          to_jsonb(ARRAY[
            'Visit the PSGIM Admissions Office: Avinashi Road, Peelamedu, Coimbatore – 641004 for physical application and counseling.'
          ]),
          NOW()
        );
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/psg-institute-of-management', 'psg-institute-of-management', 'PSG Institute of Management', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '1/10: Updated PSGIM successfully.';
END $$;


-- ============================================================================
-- 2. AMRITA SCHOOL OF BUSINESS, COIMBATORE (ASB)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'amrita-school-of-business-coimbatore';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'amrita-school-of-business-coimbatore', 'Amrita School of Business', 'Ettimadai, Coimbatore', 'Coimbatore', 'Amritanagar, Ettimadai, Coimbatore, Tamil Nadu – 641112', 'https://www.amrita.edu/school/business/coimbatore/', 1996, 'Private', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Amrita School of Business',
      location = 'Ettimadai, Coimbatore',
      district = 'Coimbatore',
      address = 'Amritanagar, Ettimadai, Coimbatore, Tamil Nadu – 641112',
      website = 'https://www.amrita.edu/school/business/coimbatore/',
      established = 1996,
      type = 'Deemed University',
      type_collwge = 'MBA',
      facilities = ARRAY[
        'Central Academic Library & Research Databases',
        'Smart Multimedia Lecture Halls & Discussion Pods',
        'Residential Hostels with Dining Amenities',
        'Sports Grounds (Badminton, Volleyball, Cricket)',
        'Healthcare Support & On-Campus Clinic',
        'Banking, ATM & Campus Transport Facilities',
        'Industry Business Simulation Labs',
        'High-Speed Wi-Fi Campus'
      ],
      highlights = to_jsonb(ARRAY[
        'AACSB International Accredited Business School (Top 5% Globally)',
        'NIRF Management Ranking 2025: 26th in India | Deemed University: 8th in India',
        '2025 Placement Highlights: Highest CTC ₹24.84 LPA | Average CTC ₹8.34 LPA | Top 20% ₹11.85 LPA',
        'Over 115 Prominent Corporate Recruiters Visiting Campus Annually',
        '2-Year Full-Time MBA across 6 Trimesters with Dual Specialisation Options',
        'Specialisations in Business Analytics, Finance, HR, Marketing & Operations',
        'Rigorous Pedagogy: Live Industry Projects, Simulations, and Summer Internships'
      ]),
      description = E'1. Overview\n' ||
        'Amrita School of Business (ASB), Coimbatore, is the prestigious management school of Amrita Vishwa Vidyapeetham, a deemed-to-be university. The institute focuses on developing management, analytical, communication and leadership skills through academic learning and practical business exposure.\n\n' ||
        '• Location: Amritanagar, Ettimadai, Coimbatore, Tamil Nadu – 641112.\n' ||
        '• Course: Master of Business Administration (MBA), 2 years full-time (6 trimesters).\n' ||
        '• Specialisations: Business Analytics, Finance, Human Resources, Marketing, Operations Management.\n' ||
        '• Approvals & Accreditation: AACSB International Accredited, NIRF #26 in Management.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        'The curriculum spans 6 trimesters covering core management, analytics, business simulations, and summer internships.\n' ||
        '• Total MBA Tuition Fee: ₹12,00,000 (Approx. ₹6,00,000 per year)\n' ||
        '• Caution Deposit: ₹10,000 | Hostel Fees: ~₹1,20,000 per year\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree (10+2+3 pattern) with min 60% aggregate in 10th, 12th, and UG.\n' ||
        '• Accepted Exams: ACAT (Amrita Common Aptitude Test), CAT, XAT, MAT, CMAT, GMAT, GRE, NMAT.\n' ||
        '• Selection: Shortlisting based on exam scores followed by Personal Interview (PI).\n\n' ||
        '4. MBA Placements\n' ||
        '• Highest CTC: ₹24.84 LPA | Average CTC: ₹8.34 LPA | Median CTC: ₹7.60 LPA | Top 20% Average: ₹11.85 LPA.\n' ||
        '• Recruiters: Over 115 recruiters across consulting, BFSI, analytics, and FMCG.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• NIRF 2025 Management: 26th in India.\n' ||
        '• AACSB International Accreditation.\n' ||
        '• Amrita Vishwa Vidyapeetham: NIRF 2025 #8 in Universities, #17 Overall.\n\n' ||
        '6. Campus Facilities\n' ||
        'World-class digital library, multimedia classrooms, sports grounds, residential facilities, healthcare, and corporate engagement zones.',
      updated_at = NOW()
    WHERE id = v_college_id;

    -- Courses & Fees
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Business Analytics, Finance, HR, Marketing, Operations Management',
      '2 Years (6 Trimesters)',
      'FULL TIME',
      'Bachelor''s degree (10+2+3) with min 60% marks in 10th, 12th & Graduation',
      'ACAT / CAT / XAT / MAT / CMAT / GMAT / GRE / NMAT + Personal Interview'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'MERIT',
      'ENTRANCE',
      'Total MBA Tuition Fee: ₹12,00,000 for 2 years (~₹6,00,000/yr). Caution deposit: ₹10,000. Hostel: ~₹1,20,000/year.',
      'Bachelor''s degree with min 60% aggregate marks'
    ) RETURNING id INTO v_fs_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs_id, 'Annual Tuition Fee', 600000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2025,
      '₹7.60 LPA (Median)',
      '₹8.34 LPA',
      '₹24.84 LPA',
      ARRAY['115 Recruiters', 'Top 20% Avg: ₹11.85 LPA', 'Deloitte', 'Amazon', 'EY', 'KPMG', 'Accenture', 'Federal Bank']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'NIRF Management', 2025, '26 in India'),
      (v_college_id, 'AACSB', 2025, 'Internationally Accredited'),
      (v_college_id, 'NIRF Universities', 2025, '8 in India (Amrita Vishwa Vidyapeetham)');

    -- Admission Process
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'ACAT / CAT / XAT / MAT / CMAT / GMAT / GRE / NMAT + Personal Interview (PI)',
          online_application_steps = to_jsonb(ARRAY[
            'Academic Eligibility: Bachelor''s degree under 10+2+3 pattern with min 60% marks in 10th, 12th, and UG.',
            'Entrance Test: Appear for ACAT or submit valid national scores (CAT/XAT/MAT/CMAT/GMAT/GRE).',
            'Submit online application on Amrita admissions portal with documents and exam scores.',
            'Shortlisted candidates attend Personal Interview (PI) assessing communication, analytical ability & profile.',
            'Accept admission offer and complete fee payment.'
          ]),
          offline_application_steps = to_jsonb(ARRAY[
            'Contact ASB Admissions Office: Amritanagar, Ettimadai, Coimbatore – 641112 for campus visits and guidance.'
          ]),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (
          v_college_id,
          'ACAT / CAT / XAT / MAT / CMAT / GMAT / GRE / NMAT + Personal Interview (PI)',
          to_jsonb(ARRAY[
            'Academic Eligibility: Bachelor''s degree under 10+2+3 pattern with min 60% marks in 10th, 12th, and UG.',
            'Entrance Test: Appear for ACAT or submit valid national scores (CAT/XAT/MAT/CMAT/GMAT/GRE).',
            'Submit online application on Amrita admissions portal with documents and exam scores.',
            'Shortlisted candidates attend Personal Interview (PI) assessing communication, analytical ability & profile.',
            'Accept admission offer and complete fee payment.'
          ]),
          to_jsonb(ARRAY[
            'Contact ASB Admissions Office: Amritanagar, Ettimadai, Coimbatore – 641112 for campus visits and guidance.'
          ]),
          NOW()
        );
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/amrita-school-of-business-coimbatore', 'amrita-school-of-business-coimbatore', 'Amrita School of Business', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '2/10: Updated Amrita School of Business successfully.';
END $$;


-- ============================================================================
-- 3. KCT BUSINESS SCHOOL, COIMBATORE (KCTBS)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID; v_c4_id UUID; v_c5_id UUID;
    v_fs1_id UUID; v_fs2_id UUID; v_fs3_id UUID; v_fs4_id UUID; v_fs5_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'kct-business-school';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'kct-business-school', 'KCT Business School', 'Saravanampatti, Coimbatore', 'Coimbatore', 'Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049', 'https://www.kctbs.ac.in/', 2005, 'Private', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

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
      highlights = to_jsonb(ARRAY[
        'Autonomous Business School under Kumaraguru College of Technology | Affiliated with Anna University',
        'Parent Institution Accredited with NAAC A++ Grade & NBA-Accredited Programmes',
        'Specialised MBA Offerings in Project Management, IEV, Agri Business & Supply Chain',
        'Experiential Pedagogy: Case Studies, Live Business Simulations & Management Consulting',
        'Dedicated Career Development Centre (CDC) with Comprehensive Aptitude & Interview Grooming',
        'Top Recruiters: Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture & Federal Bank'
      ]),
      description = E'1. Overview\n' ||
        'KCT Business School (KCTBS) is the management school of Kumaraguru College of Technology, located in Coimbatore, Tamil Nadu. Established in 2005, the business school focuses on management education, industry-oriented learning, entrepreneurship and leadership development.\n\n' ||
        '• Location: Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049.\n' ||
        '• Established: 2005 | Affiliation: Anna University (Autonomous).\n' ||
        '• Programmes: MBA General, Project Management, IEV, Agri Business, Logistics & Supply Chain.\n\n' ||
        '2. MBA Course and Fees Structure (Published 2025–26 1st-Year Govt Quota Fee):\n' ||
        '• MBA – General: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST)\n' ||
        '• MBA – Logistics & Supply Chain: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST)\n' ||
        '• MBA – Agri Business Management: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST)\n' ||
        '• MBA – Project Management: ₹3,70,000 (OC/BC/MBC) | ₹3,74,000 (SC/ST)\n' ||
        '• MBA – IEV: ₹3,20,000 (OC/BC/MBC) | ₹3,24,000 (SC/ST)\n\n' ||
        '3. MBA Admission Process\n' ||
        'Bachelor''s degree with min 60% marks. Accepted exams: MAT, CAT and online assessment. Selection via SOP, GD, and PI.\n\n' ||
        '4. MBA Placements\n' ||
        'CDC supports students with aptitude, GD, and interview grooming. Top recruiters include Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture, Federal Bank.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        'Autonomous under KCT; NAAC A++ accreditation; NBA accredited programmes; Anna University affiliated.\n\n' ||
        '6. Campus Facilities\n' ||
        'Mahatma Gandhi Central Library, smart classrooms, hostels, sports complex, healthcare, and innovation labs.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    -- 5 MBA Courses & Fees
    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'General Management (Finance, Marketing, HR, Strategy)', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% aggregate. CAT / MAT / Online Assessment', 'Entrance Score + SOP + GD + PI') RETURNING id INTO v_c1_id;
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c1_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year government-quota fee. OC/BC/MBC: ₹2,70,000 | SC/ST: ₹2,74,000.', 'Min 60% UG marks') RETURNING id INTO v_fs1_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs1_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Project Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% aggregate. Math preferred.', 'Entrance Score + SOP + GD + PI') RETURNING id INTO v_c2_id;
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c2_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹3,70,000 (OC/BC/MBC) | ₹3,74,000 (SC/ST).', 'Min 60% UG marks') RETURNING id INTO v_fs2_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs2_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 370000, 'per_year', 'INR', true);

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Innovation, Entrepreneurship and Venture Development (IEV)', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% aggregate.', 'Entrance Score + SOP + GD + PI') RETURNING id INTO v_c3_id;
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c3_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹3,20,000 (OC/BC/MBC) | ₹3,24,000 (SC/ST).', 'Min 60% UG marks') RETURNING id INTO v_fs3_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs3_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 320000, 'per_year', 'INR', true);

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Agri Business Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% aggregate.', 'Entrance Score + SOP + GD + PI') RETURNING id INTO v_c4_id;
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c4_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST).', 'Min 60% UG marks') RETURNING id INTO v_fs4_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs4_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Logistics and Supply Chain Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% aggregate.', 'Entrance Score + SOP + GD + PI') RETURNING id INTO v_c5_id;
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c5_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST).', 'Min 60% UG marks') RETURNING id INTO v_fs5_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs5_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES
      (v_college_id, 2025, 'Programme-Wise', 'See Batch Report', 'See Batch Report', ARRAY['Axis Bank', 'Grant Thornton', 'UTI Mutual Fund', 'SLB', 'Berger Paints', 'Accenture', 'Federal Bank']),
      (v_college_id, 2024, 'Programme-Wise', 'See Batch Report', 'See Batch Report', ARRAY['Accenture', 'Axis Bank', 'Federal Bank', 'Berger Paints', 'Grant Thornton']);

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'NAAC', 2024, 'A++ Grade (Parent Institution KCT)'),
      (v_college_id, 'NBA Accreditation', 2024, 'Accredited Programmes (KCT)'),
      (v_college_id, 'Anna University', 2024, 'Autonomous Business School');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CAT / MAT / Prescribed Online Entrance Assessment + SOP, GD & PI',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree from recognized university with min 60% undergraduate marks.',
            'Submit valid scores from MAT, CAT, or KCTBS prescribed online entrance assessment.',
            'Register and complete online MBA application on official portal.',
            'Participate in SOP, Group Discussion, and Personal Interview rounds.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit Kumaraguru Campus Admissions Office: Chinnavedampatti, Coimbatore – 641049.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'CAT / MAT / Prescribed Online Entrance Assessment + SOP, GD & PI', to_jsonb(ARRAY['Bachelor''s degree with min 60% undergraduate marks.', 'Submit valid scores from MAT, CAT, or online assessment.', 'Participate in SOP, GD, and PI.']), to_jsonb(ARRAY['Visit Kumaraguru Campus Admissions Office: Chinnavedampatti, Coimbatore – 641049.']), NOW());
    END IF;

    RAISE NOTICE '3/10: Updated KCT Business School successfully.';
END $$;


-- ============================================================================
-- 4. GRG SCHOOL OF MANAGEMENT STUDIES, COIMBATORE (GRGSMS)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID;
    v_fs1_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'grg-school-of-management-studies-coimbatore';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'grg-school-of-management-studies-coimbatore', 'GRG School of Management Studies', 'Peelamedu, Coimbatore', 'Coimbatore', 'PSGR Krishnammal College for Women, Peelamedu, Coimbatore, Tamil Nadu – 641004', 'https://www.grgsms.ac.in/', 1993, 'Private', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'GRG School of Management Studies',
      location = 'Peelamedu, Coimbatore',
      district = 'Coimbatore',
      address = 'PSGR Krishnammal College for Women, Peelamedu, Coimbatore, Tamil Nadu – 641004',
      website = 'https://www.grgsms.ac.in/',
      established = 1993,
      type = 'Women''s Business School',
      type_collwge = 'MBA',
      naac_grade = 'A++',
      facilities = ARRAY[
        'Management Library & Digital Learning Resources',
        'Technology-Enabled Teaching Spaces & Multimedia Halls',
        'Residential Hostels with Dining Arrangements',
        'Sports Grounds & Recreational Facilities',
        'Cafeteria & Campus Dining',
        'Conference & Seminar Halls',
        'MBAPlus Leadership Training Center',
        'Community Immersion Center'
      ],
      highlights = to_jsonb(ARRAY[
        'Premier Women''s Business School established in 1993 | Affiliated with Bharathiar University',
        'AICTE Approved MBA Programme | Internationally Accredited by ACBSP (USA)',
        'Parent College (PSGR Krishnammal) Accredited with NAAC A++ Grade',
        'Parent Institution Ranked 9th in India (NIRF 2025 Colleges Category) & 7th (NIRF 2024)',
        '2025 Placements: Highest CTC ₹10.75 LPA | Average CTC ₹4.10 LPA',
        'Top Recruiters: Deloitte, Amazon, Barclays, ANZ, HCLTech, TCS, Cognizant, KPMG, HDFC Bank'
      ]),
      description = E'1. Overview\n' ||
        'GRG School of Management Studies (GRGSMS) is the Department of Management of PSGR Krishnammal College for Women, located in Peelamedu, Coimbatore. Established in 1993, the institution focuses on women''s management education, leadership development, entrepreneurship and professional growth.\n\n' ||
        '• Location: PSGR Krishnammal College for Women, Peelamedu, Coimbatore, Tamil Nadu – 641004.\n' ||
        '• Established: 1993 | Institution type: Women''s business school.\n' ||
        '• Courses: MBA and MBA in Digital Media & Marketing Communications.\n' ||
        '• Affiliation: Bharathiar University | Accreditation: ACBSP (USA), AICTE Approved.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        '• MBA (Specialisations: Finance, Marketing, Human Resources, Entrepreneurship, General Management)\n' ||
        '• MBA in Digital Media & Marketing Communications\n' ||
        '• Course Fees: Reported by third-party listings as ~₹4 lakh per year (~₹8 lakh total), subject to official confirmation.\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree in any discipline with min 50% marks.\n' ||
        '• Accepted Exams: MAT, TANCET.\n' ||
        '• Selection: Online application, entrance score, Group Discussion and Personal Interview.\n\n' ||
        '4. MBA Placements\n' ||
        '• 2025: Highest CTC ₹10.75 LPA | Average CTC ₹4.10 LPA\n' ||
        '• 2024: Highest CTC ₹12.00 LPA | Average CTC ₹4.50 LPA\n' ||
        '• Top Recruiters: Deloitte, Amazon, Barclays, ANZ, HCLTech, TCS, Cognizant, Reliance Retail, Decathlon, HDFC Bank, ICICI Securities, KPMG.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• ACBSP International Accreditation (USA) | AICTE Approved | Bharathiar University Affiliated.\n' ||
        '• Parent College (PSGR Krishnammal): NAAC A++, NIRF 2025 #9 in Colleges category.\n\n' ||
        '6. Campus Facilities\n' ||
        'Digital library, modern classrooms, hostels, sports grounds, conference halls, MBAPlus initiative, and Community Immersion Programme.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES 
      (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'General Management, Finance, Marketing, HR, Entrepreneurship', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% marks', 'MAT / TANCET + GD & PI') RETURNING id INTO v_c1_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES 
      (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Digital Media & Marketing Communications', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% marks', 'MAT / TANCET + GD & PI') RETURNING id INTO v_c2_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c1_id, 'MERIT', 'ENTRANCE', 'Indicative fee approx ₹4,00,000 per year, subject to official confirmation for next intake.', 'Min 50% UG marks') RETURNING id INTO v_fs1_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs1_id, 'Annual Tuition Fee (Indicative)', 400000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES
      (v_college_id, 2025, 'N/A', '₹4.10 LPA', '₹10.75 LPA', ARRAY['Deloitte', 'Amazon', 'Barclays', 'ANZ', 'HCLTech', 'TCS', 'Cognizant', 'KPMG', 'HDFC Bank']),
      (v_college_id, 2024, 'N/A', '₹4.50 LPA', '₹12.00 LPA', ARRAY['Deloitte', 'Amazon', 'TCS', 'ICICI Securities', 'Decathlon']);

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'ACBSP Accreditation', 2025, 'Internationally Accredited (USA)'),
      (v_college_id, 'NIRF Colleges', 2025, '9th in India (Parent College PSGR Krishnammal)'),
      (v_college_id, 'NAAC', 2025, 'A++ Grade (Parent College)');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'MAT / TANCET + Group Discussion & Personal Interview',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree in any discipline with min 50% marks from a recognised university.',
            'Appear for MAT or TANCET entrance examinations.',
            'Submit online application with graduation certificates and entrance scorecards.',
            'Participate in Group Discussion and Personal Interview rounds.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit GRGSMS Admissions Office at PSGR Krishnammal College Campus, Peelamedu, Coimbatore – 641004.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'MAT / TANCET + Group Discussion & Personal Interview', to_jsonb(ARRAY['Bachelor''s degree in any discipline with min 50% marks.', 'Appear for MAT or TANCET.', 'Participate in GD and PI.']), to_jsonb(ARRAY['Visit GRGSMS Admissions Office at PSGR Krishnammal College Campus, Peelamedu, Coimbatore – 641004.']), NOW());
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/grg-school-of-management-studies-coimbatore', 'grg-school-of-management-studies-coimbatore', 'GRG School of Management Studies', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '4/10: Updated GRGSMS successfully.';
END $$;


-- ============================================================================
-- 5. JANSONS SCHOOL OF BUSINESS, COIMBATORE (JSB)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'jansons-school-of-business-coimbatore';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'jansons-school-of-business-coimbatore', 'Jansons School of Business', 'Karumathampatti, Coimbatore', 'Coimbatore', 'Karumathampatti, Coimbatore, Tamil Nadu – 641659', 'https://www.jsb.ac.in/', 2002, 'Private', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Jansons School of Business',
      location = 'Karumathampatti, Coimbatore',
      district = 'Coimbatore',
      address = 'Karumathampatti, Coimbatore, Tamil Nadu – 641659',
      website = 'https://www.jsb.ac.in/',
      established = 2002,
      type = 'Autonomous Institution',
      type_collwge = 'MBA',
      facilities = ARRAY[
        'Library with 18,000+ Books & 78 Periodicals',
        'Computer Laboratories with Internet Access',
        'Classrooms & Seminar Spaces for Corporate Talks',
        'Residential Campus with Hostels & Dining',
        'Campus-wide Wi-Fi Connectivity',
        'Centres of Excellence for Industry Partnerships',
        'Career Commencement Cell (Employability Training)',
        'Sambandh Community Engagement Center'
      ],
      highlights = to_jsonb(ARRAY[
        'Autonomous Business School established in 2002 | Affiliated with Bharathiar University',
        'AICTE Recognised, NBA Accredited, and International ACBSP Accreditation (USA)',
        '2025–26 Placement Highlights: Highest CTC ₹13.96 LPA | Average CTC ₹5.70 LPA',
        'Specialisations in Finance, HR, Marketing, Supply Chain & Operations, Business Analytics',
        'Top Recruiters: Asian Paints, Berger Paints, Britannia, Nestlé, ITC, Grant Thornton, TCS',
        'TANCET Counselling Candidates are Exempt from Group Discussion & Personal Interview'
      ]),
      description = E'1. Overview\n' ||
        'Jansons School of Business (JSB) is an autonomous management institute located in Karumathampatti, Coimbatore, Tamil Nadu. Established in 2002, the institution focuses on management education, entrepreneurship, leadership development and practical business learning.\n\n' ||
        '• Location: Karumathampatti, Coimbatore, Tamil Nadu – 641659.\n' ||
        '• Established: 2002 | Status: Autonomous institution affiliated with Bharathiar University.\n' ||
        '• Accreditation: AICTE approved, NBA accredited, and ACBSP accredited (USA).\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        '2-year full-time MBA structured across four semesters.\n' ||
        '• Specialisations: Finance, Human Resources, Marketing, Supply Chain Management & Operations, Business Analytics.\n' ||
        '• Approximate 2-Year Total Fees:\n' ||
        '  - Day scholars: ₹6.5 lakh – ₹7 lakh\n' ||
        '  - Hostellers: ₹9.5 lakh – ₹10 lakh (including college and hostel fees)\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree from a recognised institution (as per TN admission norms).\n' ||
        '• Accepted Exams: CAT, MAT, CMAT, ATMA, TANCET.\n' ||
        '• Note: Candidates admitted via TANCET counselling are exempt from GD/PI.\n\n' ||
        '4. MBA Placements (2025–26 Published Highlights)\n' ||
        '• Highest CTC: ₹13.96 LPA | Average CTC: ₹5.70 LPA\n' ||
        '• Regular Recruiters: Asian Paints, Berger Paints, Britannia, CavinKare, City Union Bank, Grant Thornton, HDFC Life, HDB Financial, HomeFirst Finance, ICICI Prudential, ITC, Nestlé, Ramco Cements, TCS, Varun Beverages.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• NBA & ACBSP Accredited | AICTE Recognised | Bharathiar University Autonomous.\n\n' ||
        '6. Campus Facilities\n' ||
        'Library with 18,000+ books, computer labs, seminar halls, residential hostels, Centres of Excellence, and Career Commencement cell.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Finance, HR, Marketing, Supply Chain & Operations, Business Analytics',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree from a recognised institution (TN admission norms)',
      'CAT / MAT / CMAT / ATMA / TANCET + GD & PI (TANCET counselling exempt from GD/PI)'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'MERIT',
      'ENTRANCE',
      'Total 2-year fee: ₹6.5L–₹7.0L (Day Scholars) | ₹9.5L–₹10.0L (Hostellers including lodging & mess).',
      'Bachelor''s degree pass'
    ) RETURNING id INTO v_fs_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs_id, 'Annual Academic Fee (Day Scholar Approx)', 335000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2026,
      'N/A',
      '₹5.70 LPA',
      '₹13.96 LPA',
      ARRAY['Asian Paints', 'Berger Paints', 'Britannia', 'CavinKare', 'City Union Bank', 'Grant Thornton', 'HDFC Life', 'ITC', 'Nestle', 'TCS']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'ACBSP Accreditation', 2024, 'Internationally Accredited (USA)'),
      (v_college_id, 'NBA Accreditation', 2024, 'Accredited MBA Programme'),
      (v_college_id, 'Bharathiar University', 2024, 'Autonomous Management Institution');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CAT / MAT / CMAT / ATMA / TANCET + GD & PI (TANCET quota exempt from GD/PI)',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree from any recognised university as per TN eligibility.',
            'Submit score for CAT / MAT / CMAT / ATMA or appear for TANCET.',
            'Complete online application with personal & academic details.',
            'Shortlisted applicants attend Group Discussion and Personal Interview (TANCET allotment candidates exempt).'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit JSB Campus: Karumathampatti, Coimbatore – 641659.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'CAT / MAT / CMAT / ATMA / TANCET + GD & PI', to_jsonb(ARRAY['Bachelor''s degree from any recognised university.', 'Submit score for CAT/MAT/CMAT/TANCET.', 'Attend GD & PI.']), to_jsonb(ARRAY['Visit JSB Campus: Karumathampatti, Coimbatore – 641659.']), NOW());
    END IF;

    RAISE NOTICE '5/10: Updated Jansons School of Business successfully.';
END $$;


-- ============================================================================
-- 6. KARUNYA SCHOOL OF MANAGEMENT, COIMBATORE (KSM)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'karunya-school-of-management-coimbatore';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'karunya-school-of-management-coimbatore', 'Karunya School of Management', 'Karunya Nagar, Coimbatore', 'Coimbatore', 'Karunya Institute of Technology and Sciences, Karunya Nagar, Coimbatore, Tamil Nadu – 641114', 'https://www.karunya.edu/management', 1994, 'Deemed University', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Karunya School of Management',
      location = 'Karunya Nagar, Coimbatore',
      district = 'Coimbatore',
      address = 'Karunya Institute of Technology and Sciences, Karunya Nagar, Coimbatore, Tamil Nadu – 641114',
      website = 'https://www.karunya.edu/management',
      established = 1994,
      type = 'Deemed University',
      type_collwge = 'MBA',
      facilities = ARRAY[
        'Business Analytics Lab with High-End Terminals',
        'Central Library & Digital Academic Databases',
        'Air-conditioned Classrooms & Seminar Halls',
        'Separate Residential Hostels with Dining Services',
        'Sports Complex, Gymnasium & Recreational Arenas',
        'Entrepreneurship & Incubation Support Cell',
        'High-Speed Wi-Fi Campus',
        'Corporate Relations & Placement Grooming Hub'
      ],
      highlights = to_jsonb(ARRAY[
        'Management School of Karunya Institute of Technology and Sciences (Deemed University)',
        'Established in 1994 with 3 Decades of Academic & Corporate Legacy',
        'ACCA-Accredited Programme Offerings in Finance & Accounting',
        '2026 MBA Placement Highlights: Highest CTC ₹17.00 LPA | Top 30% Avg ₹7.50 LPA',
        'Dedicated Business Analytics Terminal Lab for Hands-on Simulations & Dashboards',
        'Specialisations in Finance, Marketing, HR, International Business, Supply Chain & Analytics'
      ]),
      description = E'1. Overview\n' ||
        'Karunya School of Management (KSM) is the management school of Karunya Institute of Technology and Sciences, a deemed-to-be university located in Coimbatore, Tamil Nadu. Established in 1994, the school focuses on management education, leadership development, industry engagement and professional skills.\n\n' ||
        '• Location: Karunya Nagar, Coimbatore, Tamil Nadu – 641114.\n' ||
        '• Course: 2-year full-time MBA (4 semesters).\n' ||
        '• Specialisations: Finance, Marketing, HR, International Business, Supply Chain, Business Analytics, Entrepreneurship.\n' ||
        '• Accreditation: Deemed University, ACCA-accredited programme offerings.\n\n' ||
        '2. Course and Fees Structure\n' ||
        '• Approximate total 2-year MBA fee is ₹6.3 lakh to ₹6.6 lakh (approx ₹3.2 lakh/year). Hostel and exam fees extra.\n\n' ||
        '3. Admission\n' ||
        '• Eligibility: Bachelor''s degree in any discipline with min 50% marks.\n' ||
        '• Accepted Exams: KMAT (Karunya Management Aptitude Test), CAT, MAT, TANCET, etc.\n\n' ||
        '4. Placements (2026 Highlights)\n' ||
        '• Highest Salary Package: ₹17.00 LPA | Average of top 30% students: ₹7.50 LPA.\n' ||
        '• Sectors: Consulting, BFSI, FMCG, IT, logistics, business analytics and startups.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        'Deemed-to-be university under UGC; ACCA-accredited offerings.\n\n' ||
        '6. Facilities\n' ||
        'Business Analytics Lab, digital library, seminar halls, hostels, gym, and incubation support.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Finance, Marketing, HR, International Business, Supply Chain, Analytics, Entrepreneurship',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree in any discipline with min 50% marks',
      'KMAT / CAT / MAT / TANCET + University Selection Process'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'MERIT',
      'ENTRANCE',
      'Total 2-year programme fee approx ₹6.3 lakh to ₹6.6 lakh. Hostel extra.',
      'Bachelor''s degree with min 50% marks'
    ) RETURNING id INTO v_fs_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs_id, 'Annual Tuition Fee (Approx)', 320000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2026,
      'Top 30% Avg ₹7.5 LPA',
      '₹7.50 LPA (Top 30%)',
      '₹17.00 LPA',
      ARRAY['BFSI Recruiters', 'Consulting Firms', 'FMCG Brands', 'IT & Analytics Corporates']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'UGC', 2025, 'Deemed-to-be University (KITS)'),
      (v_college_id, 'ACCA', 2025, 'ACCA Accredited Offerings');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'KMAT / CAT / MAT / TANCET + Verification & Interview',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree in any discipline with min 50% marks.',
            'Appear for KMAT or submit scores of CAT / MAT / TANCET.',
            'Submit online application on Karunya portal.',
            'Complete document verification and fee payment.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit Karunya Nagar Admissions Desk, Coimbatore – 641114.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'KMAT / CAT / MAT / TANCET', to_jsonb(ARRAY['Bachelor''s degree with min 50% marks.', 'Appear for KMAT or national exam.']), to_jsonb(ARRAY['Visit Karunya Nagar Admissions Desk, Coimbatore – 641114.']), NOW());
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/karunya-school-of-management-coimbatore', 'karunya-school-of-management-coimbatore', 'Karunya School of Management', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '6/10: Updated Karunya School of Management successfully.';
END $$;


-- ============================================================================
-- 7. BHARATHIAR UNIVERSITY – MBA, COIMBATORE
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID;
    v_fs1_id UUID; v_fs2_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'bharathiar-university-department-of-management';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'bharathiar-university-department-of-management', 'Bharathiar University (Department of Management)', 'Marudhamalai Road, Coimbatore', 'Coimbatore', 'Marudhamalai Road, Coimbatore, Tamil Nadu – 641046', 'https://b-u.ac.in/', 1982, 'Government / State University', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Bharathiar University (Department of Management)',
      location = 'Marudhamalai Road, Coimbatore',
      district = 'Coimbatore',
      address = 'Marudhamalai Road, Coimbatore, Tamil Nadu – 641046',
      website = 'https://b-u.ac.in/',
      established = 1982,
      type = 'State University',
      type_collwge = 'MBA',
      naac_grade = 'A++',
      facilities = ARRAY[
        'University Central Library & E-Resource Consortium',
        'Computer & Internet Laboratories',
        'Air-conditioned Classrooms & Seminar Facilities',
        'Research Resource Centers for Management Studies',
        'Campus Student Activity Hubs & Cultural Centres',
        'Career Development & Placement Guidance Cell',
        'Distance & Online Learning Support (CDOE)',
        'University Hostels & Healthcare Centre'
      ],
      highlights = to_jsonb(ARRAY[
        'Premier State University established in 1982 | UGC Recognised',
        'Accredited by NAAC with prestigious A++ Grade',
        'Offers Regular MBA, Distance Education MBA (ODL), and Online MBA Modes',
        'Highly Affordable University Fee Structure (ODL ₹52,630 | Online ₹71,030 total)',
        'Core Specialisations in Marketing, Finance, Human Resource Management & Operations',
        'TANCET Single-Window Counselling Admission for Regular MBA Seats'
      ]),
      description = E'1. Overview\n' ||
        'Bharathiar University is a state university located on Marudhamalai Road in Coimbatore, Tamil Nadu. Established in 1982, the university offers postgraduate programmes across various disciplines, including management studies through its university departments and Centre for Distance and Online Education (CDOE).\n\n' ||
        '• Location: Marudhamalai Road, Coimbatore, Tamil Nadu – 641046.\n' ||
        '• Established: 1982 | State University | NAAC A++ Grade.\n' ||
        '• Learning Modes: Regular Campus MBA, Distance MBA (ODL), and Online MBA.\n\n' ||
        '2. Course and Fees Structure\n' ||
        '• Distance MBA (ODL): Approx ₹52,630 total course fee.\n' ||
        '• Online MBA: Approx ₹71,030 total course fee.\n' ||
        '• Regular MBA: Low-cost government subsidized tuition fee as per annual university notification.\n\n' ||
        '3. Admission\n' ||
        '• Regular MBA: TANCET examination followed by Tamil Nadu state counselling.\n' ||
        '• Distance / Online MBA: Direct admission based on undergraduate degree eligibility.\n\n' ||
        '4. Placements\n' ||
        'Career development cell facilitates recruitment opportunities in banking, finance, HR, manufacturing, and analytics.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        'NAAC A++ Grade; UGC recognised State University.\n\n' ||
        '6. Facilities\n' ||
        'Comprehensive central library, computing facilities, CDOE digital support, and university hostels.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Regular - Marketing, Finance, HR, Operations', '2 Years', 'FULL TIME', 'Recognised bachelor''s degree', 'TANCET Counselling') RETURNING id INTO v_c1_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Distance MBA (ODL)', '2 Years', 'DISTANCE', 'Recognised bachelor''s degree', 'Direct Admission / Merit') RETURNING id INTO v_c2_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Online MBA', '2 Years', 'ONLINE', 'Recognised bachelor''s degree', 'Direct Admission / Merit') RETURNING id INTO v_c3_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c2_id, 'GOVERNMENT', 'DIRECT', 'Distance MBA total fee: ₹52,630 (~₹26,315/yr).', 'Bachelor''s degree pass') RETURNING id INTO v_fs1_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs1_id, 'Annual ODL Course Fee', 26315, 'per_year', 'INR', true);

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c3_id, 'GOVERNMENT', 'DIRECT', 'Online MBA total fee: ₹71,030 (~₹35,515/yr).', 'Bachelor''s degree pass') RETURNING id INTO v_fs2_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs2_id, 'Annual Online Course Fee', 35515, 'per_year', 'INR', true);

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'NAAC', 2025, 'A++ Grade State University'),
      (v_college_id, 'UGC', 2025, 'Recognised State University');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'TANCET (Regular MBA) / Direct Application (ODL & Online MBA)',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree from any recognised university.',
            'Regular MBA: Register for TANCET and participate in Tamil Nadu state MBA counselling.',
            'Distance / Online MBA: Apply directly on Bharathiar University CDOE portal.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit Bharathiar University Campus: Marudhamalai Road, Coimbatore – 641046.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'TANCET / Direct (CDOE)', to_jsonb(ARRAY['Bachelor''s degree pass.', 'TANCET for regular campus seats.']), to_jsonb(ARRAY['Visit Bharathiar University Campus: Marudhamalai Road, Coimbatore – 641046.']), NOW());
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/bharathiar-university-department-of-management', 'bharathiar-university-department-of-management', 'Bharathiar University (Department of Management)', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '7/10: Updated Bharathiar University successfully.';
END $$;


-- ============================================================================
-- 8. COIMBATORE INSTITUTE OF TECHNOLOGY (CIT), COIMBATORE – MBA
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'coimbatore-institute-of-technology-autonomous' OR slug = 'coimbatore-institute-of-technology' LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'coimbatore-institute-of-technology-autonomous', 'Coimbatore Institute of Technology (CIT)', 'Peelamedu, Coimbatore', 'Coimbatore', 'Avinashi Road, Civil Aerodrome Post, Peelamedu, Coimbatore, Tamil Nadu – 641014', 'https://www.cit.edu.in/', 1956, 'Government-Aided Autonomous', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    -- Update highlights, facilities, description for CIT
    UPDATE colleges 
    SET 
      name = 'Coimbatore Institute of Technology (CIT)',
      location = 'Peelamedu, Coimbatore',
      district = 'Coimbatore',
      address = 'Avinashi Road, Civil Aerodrome Post, Peelamedu, Coimbatore, Tamil Nadu – 641014',
      website = 'https://www.cit.edu.in/',
      established = 1956,
      type = 'Government-Aided Autonomous',
      type_collwge = 'MBA',
      facilities = ARRAY[
        'Central Academic Library & Research Repositories',
        'Advanced Computing Infrastructure for Business Analytics',
        'Smart Classrooms & Discussion Seminar Halls',
        'Interdisciplinary Technical & Management Labs',
        'Separate Hostels for Men & Women',
        'Sports Complex & Physical Education Courts',
        'Dedicated Career Guidance & Placement Cell',
        'Industry-Institute Interaction Hub'
      ],
      highlights = to_jsonb(ARRAY[
        'Government-Aided Autonomous Institution established in 1956 | Affiliated with Anna University',
        'Approved by AICTE with NBA-Accredited Programmes',
        '2-Year Full-Time MBA with 2025–26 Total Programme Fee of ₹4,19,315',
        'Curriculum Covers Marketing, Finance, HR, Operations, Analytics, Strategy & Entrepreneurship',
        'Admission through TANCET Single-Window State MBA Counselling',
        'Strong Corporate Partnerships Across Manufacturing, Banking, IT & Consulting Sectors'
      ]),
      description = E'1. Overview\n' ||
        'Coimbatore Institute of Technology (CIT) is a government-aided, autonomous engineering and technology institution located on Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu. Established in 1956, CIT offers a two-year, full-time Master of Business Administration (MBA) programme designed to develop managerial skills, business knowledge and leadership capabilities.\n\n' ||
        '• Location: Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641014.\n' ||
        '• Established: 1956 | Status: Government-aided, autonomous affiliated with Anna University.\n' ||
        '• Course: Master of Business Administration (MBA), 2 years full-time (4 semesters).\n\n' ||
        '2. Course and Fees Structure (Published 2025–26 Schedule):\n' ||
        '• Semester 1: ₹1,08,900 | Semester 2: ₹1,02,300\n' ||
        '• Semester 3: ₹1,05,815 | Semester 4: ₹1,02,300\n' ||
        '• Total 2-Year Programme Fee: ₹4,19,315\n\n' ||
        '3. Admission\n' ||
        '• Eligibility: Recognised bachelor''s degree of at least 3 years with min 50% marks (45% for reserved categories).\n' ||
        '• Entrance Exam: TANCET (Tamil Nadu MBA counselling through DoTE).\n\n' ||
        '4. Placements\n' ||
        'Dedicated placement cell connects students to recruitment drives in banking, financial services, consulting, FMCG, and technology.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        'Government-aided autonomous status; Anna University affiliated; AICTE approved.\n\n' ||
        '6. Facilities\n' ||
        'Central library, computing labs, smart lecture halls, hostels, and sports facilities.',
      updated_at = NOW()
    WHERE id = v_college_id;

    -- Ensure MBA course exists
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id AND course_id IN (SELECT id FROM courses WHERE college_id = v_college_id AND name = 'MBA'));
    DELETE FROM fee_structures WHERE college_id = v_college_id AND course_id IN (SELECT id FROM courses WHERE college_id = v_college_id AND name = 'MBA');
    DELETE FROM courses WHERE college_id = v_college_id AND name = 'MBA';

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Marketing, Finance, HR, Operations, Business Analytics, Strategy',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree (3 yrs) with min 50% marks (45% for reserved)',
      'TANCET Single-Window State Counselling'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'GOVERNMENT / TANCET',
      'ENTRANCE',
      '2025–26 Published Total Fee: ₹4,19,315 (Sem 1: ₹1,08,900; Sem 2: ₹1,02,300; Sem 3: ₹1,05,815; Sem 4: ₹1,02,300).',
      'Bachelor''s degree with min 50% marks'
    ) RETURNING id INTO v_fs_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs_id, '1st Year Academic Fee (Sem 1 + Sem 2)', 211200, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2025,
      'Competitive',
      'Competitive',
      'Competitive',
      ARRAY['Manufacturing', 'Banking and Financial Services', 'Consulting', 'IT', 'FMCG']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'Government-Aided Autonomous', 2025, 'Autonomous Institution (Anna University Affiliated)'),
      (v_college_id, 'AICTE & NBA', 2025, 'Approved and Accredited Technical Education Institution');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'TANCET Single-Window MBA Counselling (DoTE Guidelines)',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree of at least 3 years with min 50% marks (45% for reserved category).',
            'Register and appear for TANCET examination conducted by Anna University.',
            'Register for Tamil Nadu single-window MBA counselling under Directorate of Technical Education (DoTE).',
            'Participate in seat allotment counselling and complete document verification and fee payment.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit CIT Campus: Avinashi Road, Peelamedu, Coimbatore – 641014.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (
          v_college_id,
          'TANCET Single-Window MBA Counselling (DoTE)',
          to_jsonb(ARRAY[
            'Bachelor''s degree of at least 3 years with min 50% marks (45% for reserved category).',
            'Appear for TANCET examination.',
            'Participate in DoTE single-window MBA counselling.'
          ]),
          to_jsonb(ARRAY['Visit CIT Campus: Avinashi Road, Peelamedu, Coimbatore – 641014.']),
          NOW()
        );
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/coimbatore-institute-of-technology-autonomous', 'coimbatore-institute-of-technology-autonomous', 'Coimbatore Institute of Technology (CIT)', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '8/10: Updated CIT MBA successfully.';
END $$;


-- ============================================================================
-- 9. SRI KRISHNA COLLEGE OF ENGINEERING & TECHNOLOGY (SKCET) – MBA
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'sri-krishna-college-of-engineering-and-technology-autonomous' OR slug = 'sri-krishna-college-of-engineering-and-technology' LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'sri-krishna-college-of-engineering-and-technology-autonomous', 'Sri Krishna College of Engineering and Technology (SKCET)', 'Kuniamuthur, Coimbatore', 'Coimbatore', 'Kuniamuthur, Coimbatore, Tamil Nadu – 641008', 'https://www.skcet.ac.in/', 1998, 'Private Autonomous', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Sri Krishna College of Engineering and Technology (SKCET)',
      location = 'Kuniamuthur, Coimbatore',
      district = 'Coimbatore',
      address = 'Kuniamuthur, Coimbatore, Tamil Nadu – 641008',
      website = 'https://www.skcet.ac.in/',
      established = 1998,
      type = 'Private Autonomous',
      type_collwge = 'MBA',
      naac_grade = 'A++',
      facilities = ARRAY[
        'Central Digital Library & Academic Portals',
        'Advanced Computing Infrastructure & Business Labs',
        'Smart Classrooms & Seminar Auditoriums',
        'Residential Hostels with Dining for Boys & Girls',
        'Sports Complex, Fitness Gymnasium & Grounds',
        'Placement & Career Support Cell',
        'Student Clubs & Entrepreneurship Association'
      ],
      highlights = to_jsonb(ARRAY[
        'Autonomous Institution affiliated with Anna University | Approved by AICTE',
        'Accredited with prestigious NAAC A++ Grade & NBA-Accredited Programmes',
        '2-Year Full-Time MBA with Exposure to Coimbatore''s Industrial Ecosystem',
        '2025–26 MBA Placement Highlights: Highest Package ₹10.10 LPA | Average Package ₹5.00 LPA',
        'Top MBA Recruiters: BNY, EY, Grant Thornton, Veritas Finance, Home First, IndiaMart, TCS, D-Mart, Bajaj Finserv'
      ]),
      description = E'1. Overview\n' ||
        'Sri Krishna College of Engineering and Technology (SKCET) is an autonomous institution located in Kuniamuthur, Coimbatore, Tamil Nadu. Established in 1998, the college is affiliated with Anna University and offers a two-year, full-time Master of Business Administration (MBA) programme designed to develop managerial expertise and leadership abilities.\n\n' ||
        '• Location: Kuniamuthur, Coimbatore, Tamil Nadu – 641008.\n' ||
        '• Established: 1998 | Autonomous | NAAC A++ Grade | Anna University Affiliated.\n\n' ||
        '2. Course and Fees Structure\n' ||
        '4-semester MBA curriculum covering Marketing, Finance, HR, Operations, Business Analytics, Strategy & Entrepreneurship. Fees as per college and government guidelines.\n\n' ||
        '3. Admission\n' ||
        'Bachelor''s degree (3 years) with min 50% marks (45% for reserved category). Admission through TANCET counselling.\n\n' ||
        '4. Placements (Published 2025–26 MBA Data)\n' ||
        '• Highest Salary Package: ₹10.10 LPA | Average Salary Package: ₹5.00 LPA.\n' ||
        '• Recruiters: BNY, EY, Grant Thornton, Veritas Finance, Home First Finance, IndiaMart, City Union Bank, TCS, D-Mart, Bajaj Finserv, EClerx.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        'NAAC A++ Grade; Autonomous institution; NBA accredited programmes; AICTE approved.\n\n' ||
        '6. Facilities\n' ||
        'Digital library, computing facilities, lecture halls, hostels, sports, and career development support.',
      updated_at = NOW()
    WHERE id = v_college_id;

    -- Ensure MBA course is present
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id AND course_id IN (SELECT id FROM courses WHERE college_id = v_college_id AND name = 'MBA'));
    DELETE FROM fee_structures WHERE college_id = v_college_id AND course_id IN (SELECT id FROM courses WHERE college_id = v_college_id AND name = 'MBA');
    DELETE FROM courses WHERE college_id = v_college_id AND name = 'MBA';

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Marketing, Finance, HR, Operations, Business Analytics, Strategy',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree with min 50% marks (45% for reserved categories)',
      'TANCET Single-Window State Counselling'
    ) RETURNING id INTO v_course_id;

    -- Fee Structure
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'GOVERNMENT / MANAGEMENT',
      'ENTRANCE / COUNSELLING',
      'Approximate fees: The total MBA programme fee should be confirmed directly with the college for the relevant admission year.',
      'Bachelor''s degree (at least 3 years) with min 50% marks (45% for reserved category)'
    );

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2026,
      'N/A',
      '₹5.00 LPA',
      '₹10.10 LPA',
      ARRAY['BNY', 'EY', 'Grant Thornton', 'Veritas Finance', 'Home First Finance', 'IndiaMart', 'City Union Bank', 'TCS', 'D-Mart', 'Bajaj Finserv', 'EClerx']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'NAAC', 2025, 'A++ Grade'),
      (v_college_id, 'NBA Accreditation', 2025, 'Accredited Programmes'),
      (v_college_id, 'Anna University', 2025, 'Autonomous Institution');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'TANCET Single-Window State Counselling',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree of at least 3 years with min 50% marks (45% for reserved category).',
            'Register and appear for TANCET entrance examination.',
            'Participate in Tamil Nadu MBA counselling under applicable admission guidelines.',
            'Receive seat allotment based on merit and complete document verification and fee payment.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit SKCET Campus: Kuniamuthur, Coimbatore – 641008.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (
          v_college_id,
          'TANCET Single-Window State Counselling',
          to_jsonb(ARRAY[
            'Bachelor''s degree of at least 3 years with min 50% marks (45% for reserved category).',
            'Appear for TANCET entrance examination.',
            'Participate in Tamil Nadu MBA counselling.'
          ]),
          to_jsonb(ARRAY['Visit SKCET Campus: Kuniamuthur, Coimbatore – 641008.']),
          NOW()
        );
    END IF;

    -- Sitemap
    INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
    VALUES ('college', '/college/sri-krishna-college-of-engineering-and-technology-autonomous', 'sri-krishna-college-of-engineering-and-technology-autonomous', 'Sri Krishna College of Engineering and Technology (SKCET)', '0.8', 'weekly')
    ON CONFLICT (slug) DO UPDATE SET college_name = EXCLUDED.college_name, updated_at = NOW();

    RAISE NOTICE '9/10: Updated SKCET MBA successfully.';
END $$;


-- ============================================================================
-- 10. SARDAR VALLABHBHAI PATEL INTERNATIONAL SCHOOL OF TEXTILES & MANAGEMENT (SVPISTM)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID; v_c4_id UUID; v_c5_id UUID;
    v_fs1_id UUID;
BEGIN
    SELECT id INTO v_college_id FROM colleges WHERE slug = 'sardar-vallabhbhai-patel-international-school-of-textile-and-management-coimbatore';
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (id, college_id, slug, name, location, district, address, website, established, type, type_collwge)
        VALUES (v_college_id, v_college_id, 'sardar-vallabhbhai-patel-international-school-of-textile-and-management-coimbatore', 'Sardar Vallabhbhai Patel International School of Textiles & Management (SVPISTM)', 'Peelamedu, Coimbatore', 'Coimbatore', '1483, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004', 'https://svpistm.ac.in/', 2002, 'Government Institution', 'MBA');
    END IF;

    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    UPDATE colleges 
    SET 
      name = 'Sardar Vallabhbhai Patel International School of Textiles & Management (SVPISTM)',
      location = 'Peelamedu, Coimbatore',
      district = 'Coimbatore',
      address = '1483, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004',
      website = 'https://svpistm.ac.in/',
      established = 2002,
      type = 'Government Institution (Ministry of Textiles)',
      type_collwge = 'MBA',
      naac_grade = 'B+',
      facilities = ARRAY[
        'Management & Textile Reference Library',
        'Advanced Textile Material & Testing Laboratories',
        'Computer & Business Analytics Labs',
        'Smart Classrooms & Seminar Facilities',
        'Industry-Oriented Training & Mill Visit Center',
        'Residential Hostels & Dining Facilities',
        'Career Development & Textile Placement Cell'
      ],
      highlights = to_jsonb(ARRAY[
        'National-Level Autonomous Institution under the Ministry of Textiles, Government of India',
        'Established in 2002 | AICTE Approved & NAAC B+ Accredited',
        'Specialised MBA in Textile, Apparel, Retail, Technical Textiles & Textile Analytics',
        'Affordable Total 2-Year Programme Fee of ₹2,06,000 (Sem 1: ₹55k, Sem 2: ₹50k, Sem 3: ₹51k, Sem 4: ₹50k)',
        '2024–25 Placements: 80 Placed out of 94 Students (85%+ Rate) | Median Package ₹4.60 LPA',
        'India Today 2024: Ranked #1 in Coimbatore, #2 in Tamil Nadu & #7 in South India (Govt B-Schools)'
      ]),
      description = E'1. Overview\n' ||
        'Sardar Vallabhbhai Patel International School of Textiles and Management (SVPISTM) is a national-level institution established in 2002 by the Government of India’s Ministry of Textiles. Located in Coimbatore, Tamil Nadu, the institute specialises in management education, training, research and consultancy related to the textile, apparel, retail and manufacturing industries.\n\n' ||
        '• Location: 1483, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004.\n' ||
        '• Established: 2002 | Ministry of Textiles, Govt of India | NAAC B+ | AICTE Approved.\n\n' ||
        '2. Course and Fees Structure\n' ||
        '2-year full-time specialised MBA programmes:\n' ||
        '• MBA in Textile Management | MBA in Apparel Management | MBA in Retail Management | MBA in Technical Textile Management | MBA in Textile Business Analytics.\n' ||
        '• Published Semester Fee Schedule:\n' ||
        '  - Sem 1: ₹55,000 | Sem 2: ₹50,000 | Sem 3: ₹51,000 | Sem 4: ₹50,000\n' ||
        '  - Total 2-Year Programme Fee: ₹2,06,000\n\n' ||
        '3. Admission\n' ||
        '• Eligibility: Bachelor''s degree in any discipline with min 50% (45% for OBC-NCL/EWS, 40% for SC/ST/PwD).\n' ||
        '• Accepted Exams: CUET-PG, SVPISTM Entrance Test, MAT, CAT, TANCET.\n\n' ||
        '4. Placements (Published 2024–25 Graduating Batch)\n' ||
        '• Students Graduated: 94 | Students Placed: 80 | Median Salary Package: ₹4.60 LPA.\n' ||
        '• Recruiters: Textile mills, garment exporters, retail corporations, supply chain agencies.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        '• India Today 2024: 1st in Coimbatore, 2nd in Tamil Nadu, 7th in South India (Government B-School Excellence category).\n' ||
        '• Ministry of Textiles, Govt of India; AICTE approved; NAAC B+.\n\n' ||
        '6. Facilities\n' ||
        'Textile laboratories, digital library, computer facilities, hostels, and industry-oriented training.',
      updated_at = NOW()
    WHERE id = v_college_id;

    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Textile Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% (45% OBC/EWS, 40% SC/ST)', 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET') RETURNING id INTO v_c1_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Apparel Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% (45% OBC/EWS, 40% SC/ST)', 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET') RETURNING id INTO v_c2_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Retail Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% (45% OBC/EWS, 40% SC/ST)', 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET') RETURNING id INTO v_c3_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Technical Textile Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% (45% OBC/EWS, 40% SC/ST)', 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET') RETURNING id INTO v_c4_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Textile Business Analytics', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 50% (45% OBC/EWS, 40% SC/ST)', 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET') RETURNING id INTO v_c5_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c1_id, 'GOVERNMENT', 'ENTRANCE', 'Total 2-Year Fee: ₹2,06,000 (Sem 1: ₹55k, Sem 2: ₹50k, Sem 3: ₹51k, Sem 4: ₹50k).', 'Min 50% marks in UG') RETURNING id INTO v_fs1_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs1_id, '1st Year Academic Fee (Sem 1 + Sem 2)', 105000, 'per_year', 'INR', true);

    -- Placements
    DELETE FROM placements WHERE college_id = v_college_id;
    INSERT INTO placements (college_id, year, min_salary, average_salary, max_salary, recruiters)
    VALUES (
      v_college_id,
      2025,
      '₹4.60 LPA (Median)',
      '₹4.60 LPA (Median)',
      '₹6.50 LPA (Approx)',
      ARRAY['80 Placed of 94 Students', 'Textile Mills', 'Garment Export Houses', 'Retail Chains', 'Supply Chain Firms']
    );

    -- Rankings
    DELETE FROM rankings WHERE college_id = v_college_id;
    INSERT INTO rankings (college_id, agency, year, rank)
    VALUES
      (v_college_id, 'India Today Govt B-Schools', 2024, '1st in Coimbatore, 2nd in TN, 7th in South India'),
      (v_college_id, 'NAAC', 2024, 'B+ Grade'),
      (v_college_id, 'Ministry of Textiles', 2024, 'Government of India Institution');

    -- Admission
    IF EXISTS (SELECT 1 FROM admission_process WHERE college_id = v_college_id) THEN
        UPDATE admission_process
        SET
          admission_basis = 'CUET-PG / SVPISTM Entrance / MAT / CAT / TANCET + GD & PI',
          online_application_steps = to_jsonb(ARRAY[
            'Bachelor''s degree in any discipline with min 50% (45% for OBC-NCL/EWS, 40% for SC/ST/PwD).',
            'Submit valid score from CUET-PG, SVPISTM Entrance Test, MAT, CAT, or TANCET.',
            'Submit online application on SVPISTM website.',
            'Participate in GD/PI where applicable, followed by document verification.'
          ]),
          offline_application_steps = to_jsonb(ARRAY['Visit SVPISTM Campus: 1483, Avinashi Road, Peelamedu, Coimbatore – 641004.']),
          updated_at = NOW()
        WHERE college_id = v_college_id;
    ELSE
        INSERT INTO admission_process (college_id, admission_basis, online_application_steps, offline_application_steps, updated_at)
        VALUES (v_college_id, 'CUET-PG / SVPISTM Test / MAT / CAT / TANCET', to_jsonb(ARRAY['Bachelor''s degree with min 50% marks.', 'Submit valid entrance score.']), to_jsonb(ARRAY['Visit SVPISTM Campus: 1483, Avinashi Road, Peelamedu, Coimbatore – 641004.']), NOW());
    END IF;

    RAISE NOTICE '10/10: Updated SVPISTM successfully.';
END $$;
