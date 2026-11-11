-- ============================================================================
-- MASTER SQL SCRIPT (FIXED & RESILIENT)
-- UPDATE / POPULATE ALL 10 COIMBATORE MBA INSTITUTIONS
--
-- FIXES APPLIED:
-- 1. All INSERT INTO colleges statements explicitly provide `facilities`,
--    `highlights`, and `description` to prevent NOT NULL constraint errors.
-- 2. Sitemap updates use `IF EXISTS ... UPDATE ... ELSE INSERT ...` based on `loc`
--    to avoid "there is no unique or exclusion constraint matching the ON CONFLICT specification" errors.
-- 3. `program_id` is dynamically retrieved/created and always supplied to
--    both `courses` and `fee_structures` to satisfy NOT NULL foreign keys.
--
-- COLLEGES INCLUDED:
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

-- Ensure MBA program exists in programs table
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
    v_slug TEXT := 'psg-institute-of-management';
    v_name TEXT := 'PSG Institute of Management';
    v_location TEXT := 'Peelamedu, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004';
    v_website TEXT := 'https://psgim.ac.in/';
    v_established INT := 1994;
    v_type TEXT := 'Private';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
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
    ];

    v_highlights := to_jsonb(ARRAY[
        'Affiliated with Anna University | Approved by AICTE | Accredited by NBA & ACBSP',
        'First Indian Business School to receive ACBSP international accreditation for MBA & EMBA',
        'Ranked 20th by EducationWorld and 22nd by BusinessWorld among Business Schools',
        '2025–26 Placement: Highest CTC ₹20.12 LPA, Average CTC ₹7.71 LPA, Median CTC ₹7.50 LPA (226 Offers)',
        '2-Year Full-Time MBA with Specialisations in Finance, Marketing, HR, Decision Science & Analytics',
        'Pedagogy: Case studies, live consulting projects, summer internships & project-based dissertation',
        'Active Learning Program Service (ALPS) for leadership, teamwork & outbound learning',
        'On-campus hostel (Single, Double & Triple) with Wi-Fi, Gym, Sports & 24/7 Power/Water'
    ]);

    v_description := E'1. Overview\n' ||
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
        'Library and digital academic databases, live consulting projects, international exchange, ALPS leadership training, hostels and sports facilities.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '1/10: Updated PSGIM successfully.';
END $$;


-- ============================================================================
-- 2. AMRITA SCHOOL OF BUSINESS, COIMBATORE (ASB)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'amrita-school-of-business-coimbatore';
    v_name TEXT := 'Amrita School of Business';
    v_location TEXT := 'Ettimadai, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Amritanagar, Ettimadai, Coimbatore, Tamil Nadu – 641112';
    v_website TEXT := 'https://www.amrita.edu/school/business/coimbatore/';
    v_established INT := 1996;
    v_type TEXT := 'Deemed University';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Central Academic Library & Research Databases',
        'Smart Multimedia Lecture Halls & Discussion Pods',
        'Residential Hostels with Dining Amenities',
        'Sports Grounds (Badminton, Volleyball, Cricket)',
        'Healthcare Support & On-Campus Clinic',
        'Banking, ATM & Campus Transport Facilities',
        'Industry Business Simulation Labs',
        'High-Speed Wi-Fi Campus'
    ];

    v_highlights := to_jsonb(ARRAY[
        'AACSB International Accredited Business School (Top 5% Globally)',
        'NIRF Management Ranking 2025: 26th in India | Deemed University: 8th in India',
        '2025 Placement Highlights: Highest CTC ₹24.84 LPA | Average CTC ₹8.34 LPA | Top 20% ₹11.85 LPA',
        'Over 115 Prominent Corporate Recruiters Visiting Campus Annually',
        '2-Year Full-Time MBA across 6 Trimesters with Dual Specialisation Options',
        'Specialisations in Business Analytics, Finance, HR, Marketing & Operations',
        'Rigorous Pedagogy: Live Industry Projects, Simulations, and Summer Internships'
    ]);

    v_description := E'1. Overview\n' ||
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
        'World-class digital library, multimedia classrooms, sports grounds, residential facilities, healthcare, and corporate engagement zones.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '2/10: Updated Amrita School of Business successfully.';
END $$;


-- ============================================================================
-- 3. KCT BUSINESS SCHOOL, COIMBATORE (KCTBS)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'kct-business-school';
    v_name TEXT := 'KCT Business School';
    v_location TEXT := 'Saravanampatti, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049';
    v_website TEXT := 'https://kctbs.ac.in/';
    v_established INT := 2005;
    v_type TEXT := 'Autonomous Institution';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID; v_c4_id UUID; v_c5_id UUID;
    v_fs1_id UUID; v_fs2_id UUID; v_fs3_id UUID; v_fs4_id UUID; v_fs5_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Mahatma Gandhi Central Library & Research Databases',
        'Smart Classrooms & Collaborative Learning Pods',
        'Dedicated Residential Hostels (Separate for Male & Female)',
        'Comprehensive Sports Complex & Fitness Gym',
        'On-Campus Healthcare & Medical Facility',
        'Campus Cafes, Dining Halls & Banking Counters',
        'Career Development Centre (CDC - Aptitude, Mock Interviews)',
        'Startup & Venture Incubation Hub'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Department of Management under Kumaraguru College of Technology (Autonomous)',
        'Affiliated with Anna University | Approved by AICTE | NAAC A++ Grade (Parent Institution)',
        'Specialised MBA Programmes in Project Management, IEV, Agri-Business & Logistics',
        '1st Year Academic Fees: General MBA ₹2,70,000 | Project Management ₹3,70,000 | IEV ₹3,20,000',
        'Active Career Development Centre with Reputed Corporate Placement Drives',
        'Recruiters: Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture, Federal Bank'
    ]);

    v_description := E'1. Overview\n' ||
        'KCT Business School (KCTBS) is the management school of Kumaraguru College of Technology, located in Coimbatore, Tamil Nadu. Established in 2005, the business school focuses on management education, industry-oriented learning, entrepreneurship and leadership development.\n\n' ||
        '• Location: Kumaraguru Campus, Chinnavedampatti, Saravanampatti, Coimbatore, Tamil Nadu – 641049.\n' ||
        '• Established: 2005 | Affiliation: Anna University | Accreditation: NAAC A++ (Parent Institution).\n' ||
        '• Courses: MBA General, MBA in Project Management, MBA in Innovation, Entrepreneurship & Venture Development (IEV), MBA in Agri Business, MBA in Logistics & Supply Chain Management.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        'Published 2025–26 1st-Year Government Quota Fee Schedule (OC/BC/BCM/MBC/DNC):\n' ||
        '• MBA – General: ₹2,70,000 (SC/SCA/ST: ₹2,74,000)\n' ||
        '• MBA – Logistics & Supply Chain Management: ₹2,70,000 (SC/SCA/ST: ₹2,74,000)\n' ||
        '• MBA – Agri Business Management: ₹2,70,000 (SC/SCA/ST: ₹2,74,000)\n' ||
        '• MBA – Project Management: ₹3,70,000 (SC/SCA/ST: ₹3,74,000)\n' ||
        '• MBA – Innovation, Entrepreneurship and Venture Development: ₹3,20,000 (SC/SCA/ST: ₹3,24,000)\n' ||
        'Note: Figures represent 1st-year fees only. 2nd-year fees and management-quota schedules subject to official confirmation.\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree with min 60% undergraduate marks.\n' ||
        '• Accepted Exams: MAT, CAT, and KCTBS online entrance assessment.\n' ||
        '• Selection: SOP, Group Discussion (GD), and Personal Interview (PI).\n\n' ||
        '4. MBA Placements\n' ||
        'Supported by a dedicated Career Development Centre. Recruiters include Axis Bank, Grant Thornton, UTI Mutual Fund, SLB, Berger Paints, Accenture, and Federal Bank.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• NAAC A++ Accreditation (Kumaraguru College of Technology).\n' ||
        '• NBA-accredited programmes under parent institution.\n' ||
        '• Degree awarded through Anna University.\n\n' ||
        '6. Campus Facilities\n' ||
        'Mahatma Gandhi Central Library, hostels, sports amenities, smart classrooms, and venture development incubation.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

    -- Courses & Fees
    DELETE FROM fee_components WHERE structure_id IN (SELECT id FROM fee_structures WHERE college_id = v_college_id);
    DELETE FROM fee_structures WHERE college_id = v_college_id;
    DELETE FROM courses WHERE college_id = v_college_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'General Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% marks', 'MAT / CAT / KCTBS Online Assessment + SOP, GD & PI') RETURNING id INTO v_c1_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Project Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% marks', 'MAT / CAT / KCTBS Online Assessment + SOP, GD & PI') RETURNING id INTO v_c2_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Innovation, Entrepreneurship and Venture Development', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% marks', 'MAT / CAT / KCTBS Online Assessment + SOP, GD & PI') RETURNING id INTO v_c3_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Agri Business Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% marks', 'MAT / CAT / KCTBS Online Assessment + SOP, GD & PI') RETURNING id INTO v_c4_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, 'MBA', 'Logistics and Supply Chain Management', '2 Years', 'FULL TIME', 'Bachelor''s degree with min 60% marks', 'MAT / CAT / KCTBS Online Assessment + SOP, GD & PI') RETURNING id INTO v_c5_id;

    -- Fee Structures & Components
    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c1_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year government-quota fee. OC/BC/MBC: ₹2,70,000 | SC/ST: ₹2,74,000.', 'Bachelor''s degree with min 60% marks') RETURNING id INTO v_fs1_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs1_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c2_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹3,70,000 (OC/BC/MBC) | ₹3,74,000 (SC/ST).', 'Bachelor''s degree with min 60% marks') RETURNING id INTO v_fs2_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs2_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 370000, 'per_year', 'INR', true);

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c3_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹3,20,000 (OC/BC/MBC) | ₹3,24,000 (SC/ST).', 'Bachelor''s degree with min 60% marks') RETURNING id INTO v_fs3_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs3_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 320000, 'per_year', 'INR', true);

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c4_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST).', 'Bachelor''s degree with min 60% marks') RETURNING id INTO v_fs4_id;
    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory) VALUES (v_fs4_id, '1st Year Academic Fee (Govt Quota - OC/BC/MBC)', 270000, 'per_year', 'INR', true);

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (gen_random_uuid(), v_college_id, v_program_id, v_c5_id, 'GOVERNMENT / MERIT', 'ENTRANCE', '2025–26 1st-year fee: ₹2,70,000 (OC/BC/MBC) | ₹2,74,000 (SC/ST).', 'Bachelor''s degree with min 60% marks') RETURNING id INTO v_fs5_id;
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

    -- Sitemap
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '3/10: Updated KCT Business School successfully.';
END $$;


-- ============================================================================
-- 4. GRG SCHOOL OF MANAGEMENT STUDIES, COIMBATORE (GRGSMS)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'grg-school-of-management-studies-coimbatore';
    v_name TEXT := 'GRG School of Management Studies (GRGSMS)';
    v_location TEXT := 'Peelamedu, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'PSGR Krishnammal College for Women Campus, Peelamedu, Coimbatore, Tamil Nadu – 641004';
    v_website TEXT := 'https://www.grgsms.ac.in/';
    v_established INT := 1993;
    v_type TEXT := 'Private Women''s Business School';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID;
    v_fs1_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Central Academic Library & Digital Journal Resources',
        'Modern Technology-Enabled Smart Classrooms',
        'Learning Management System & Online Portals',
        'Student Residential Hostels with Dining',
        'Sports Grounds & Recreational Amenities',
        'Campus Cafeteria & Dining Facilities',
        'Conference & Multi-Purpose Seminar Auditoriums',
        'Industry Engagement & CXO Talks Platform',
        'International Study-Abroad Partnerships',
        'MBAPlus Leadership Development & Community Immersion Program'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Department of Management of PSGR Krishnammal College for Women (Established 1993)',
        'NIRF 2025 College Ranking: 9th in India | NIRF 2024: 7th in India (Parent College)',
        'Accredited with NAAC A++ Grade & Internationally Accredited by ACBSP, USA',
        'Affiliated with Bharathiar University | Approved by AICTE',
        'Placements: Highest CTC ₹10.75 LPA (2025), ₹12.00 LPA (2024) | Average CTC ₹4.10 LPA',
        'Top Recruiters: Deloitte, Amazon, Barclays, ANZ, HCLTech, TCS, Cognizant, Reliance Retail, Decathlon'
    ]);

    v_description := E'1. Overview\n' ||
        'GRG School of Management Studies (GRGSMS) is the Department of Management of PSGR Krishnammal College for Women, located in Peelamedu, Coimbatore. Established in 1993, the institution focuses exclusively on women''s management education, leadership development, entrepreneurship and professional growth.\n\n' ||
        '• Location: PSGR Krishnammal College for Women, Peelamedu, Coimbatore, Tamil Nadu – 641004.\n' ||
        '• Established: 1993 | Type: Premier Women''s Business School.\n' ||
        '• Affiliation: Bharathiar University | Approvals: AICTE approved, internationally accredited by ACBSP, USA.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        '2-year full-time MBA programmes:\n' ||
        '• MBA: Specialisations in Finance, Marketing, Human Resources, Entrepreneurship, and General Management.\n' ||
        '• MBA in Digital Media & Marketing Communications: Digital marketing, media strategy, and brand development.\n' ||
        '• Indicative Fees: Approximately ₹4 lakh per year (subject to confirmation by admissions office).\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree in any discipline with minimum 50% marks.\n' ||
        '• Entrance Exams: MAT and TANCET.\n' ||
        '• Selection: Online application, entrance exam scorecard, Group Discussion (GD), and Personal Interview (PI).\n\n' ||
        '4. MBA Placements\n' ||
        '• 2025: Highest CTC ₹10.75 LPA | Average CTC ₹4.10 LPA.\n' ||
        '• 2024: Highest CTC ₹12.00 LPA | Average CTC ₹4.50 LPA.\n' ||
        '• Prominent Recruiters: Deloitte, Amazon, Barclays, ANZ, HCLTech, TCS, Cognizant, Reliance Retail, Decathlon, HDFC Bank, KPMG.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• NIRF 2025: 9th in India (College category for parent college PSGR Krishnammal).\n' ||
        '• NIRF 2024: 7th in India (College category).\n' ||
        '• ACBSP USA International Accreditation | NAAC A++ Grade.\n\n' ||
        '6. Campus Facilities\n' ||
        'Digital library, modern classrooms, conference halls, MBAPlus leadership modules, and community immersion programmes.';

    -- Upsert College (Facilities included in INSERT to prevent NOT NULL error)
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
      'Finance, Marketing, HR, Entrepreneurship, General Management',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree in any discipline with min 50% marks',
      'MAT / TANCET + Group Discussion & Personal Interview'
    ) RETURNING id INTO v_c1_id;

    INSERT INTO courses (id, college_id, program_id, name, specialization, duration, degree_type, eligibility, selection_basis)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      'MBA',
      'Digital Media & Marketing Communications',
      '2 Years',
      'FULL TIME',
      'Bachelor''s degree in any discipline with min 50% marks',
      'MAT / TANCET + Group Discussion & Personal Interview'
    ) RETURNING id INTO v_c2_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_c1_id,
      'MANAGEMENT / MERIT',
      'ENTRANCE',
      'Approx. ₹4,00,000 per year indicative tuition fee. Hostel extra.',
      'Bachelor''s degree with min 50% marks'
    ) RETURNING id INTO v_fs1_id;

    INSERT INTO fee_components (structure_id, component_name, amount, frequency, currency, is_mandatory)
    VALUES (v_fs1_id, 'Annual Tuition Fee (Indicative)', 400000, 'per_year', 'INR', true);

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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '4/10: Updated GRGSMS successfully.';
END $$;


-- ============================================================================
-- 5. JANSONS SCHOOL OF BUSINESS, COIMBATORE (JSB)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'jansons-school-of-business-coimbatore';
    v_name TEXT := 'Jansons School of Business (JSB)';
    v_location TEXT := 'Karumathampatti, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Karumathampatti, Coimbatore, Tamil Nadu – 641659';
    v_website TEXT := 'https://jsb.ac.in/';
    v_established INT := 2002;
    v_type TEXT := 'Autonomous Institution';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Library with 18,000+ Books & 78 Periodicals',
        'State-of-the-Art Computer Laboratories',
        'Air-Conditioned Smart Classrooms & Seminar Halls',
        'Residential Hostels with Mess & Dining',
        'Wi-Fi Enabled Campus',
        'Student Leadership & Management Clubs',
        'Corporate Relations Centre & CXO Talk Series',
        'Centres of Excellence & Industry Partnerships',
        'Sambandh Community Engagement Initiative'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Autonomous Business School established in 2002 | Affiliated with Bharathiar University',
        'Accredited by NBA & Internationally Accredited by ACBSP, USA',
        'Approved by AICTE with Doctoral Research Centre',
        '2-Year Full-Time MBA across 4 Semesters in Finance, HR, Marketing, Operations & Business Analytics',
        '2025–26 Placement Highlights: Highest CTC ₹13.96 LPA | Average CTC ₹5.70 LPA',
        'Approximate 2-Year Total Fees: ₹6.5–₹7.0 Lakh (Day Scholars) | ₹9.5–₹10.0 Lakh (Hostellers)',
        'Regular Recruiters: Asian Paints, Berger Paints, Britannia, CavinKare, City Union Bank, Grant Thornton, ITC, Nestle, TCS'
    ]);

    v_description := E'1. Overview\n' ||
        'Jansons School of Business (JSB) is a management institute located in Karumathampatti, Coimbatore, Tamil Nadu. Established in 2002, the institution focuses on management education, entrepreneurship, leadership development and practical business learning.\n\n' ||
        '• Location: Karumathampatti, Coimbatore, Tamil Nadu – 641659.\n' ||
        '• Established: 2002 | Status: Autonomous Institution affiliated with Bharathiar University.\n' ||
        '• Approvals & Accreditation: AICTE recognised, NBA accredited, and ACBSP internationally accredited.\n\n' ||
        '2. MBA Course and Fees Structure\n' ||
        '2-year, full-time MBA programme structured across four semesters.\n' ||
        '• Specialisations: Finance, Human Resources, Marketing, Supply Chain Management & Operations, Business Analytics.\n' ||
        '• Indicative 2-Year Total Fees:\n' ||
        '  - Day Scholars: ₹6.5 lakh – ₹7 lakh\n' ||
        '  - Hostellers: ₹9.5 lakh – ₹10 lakh (including college and hostel lodging/boarding)\n\n' ||
        '3. MBA Admission Process\n' ||
        '• Eligibility: Bachelor''s degree pass from any recognised institution.\n' ||
        '• Accepted Exams: CAT, MAT, CMAT, ATMA, and TANCET.\n' ||
        '• Selection: Online application, entrance score, GD & PI (TANCET counselling candidates are exempt from GD/PI).\n\n' ||
        '4. MBA Placements (Published 2025–26 Data)\n' ||
        '• Highest CTC: ₹13.96 LPA | Average CTC: ₹5.70 LPA.\n' ||
        '• Prominent Recruiters: Asian Paints, Berger Paints, Britannia, CavinKare, City Union Bank, Grant Thornton, HDFC Life, HDB Financial, HomeFirst, ICICI Prudential, ITC, Nestle, Ramco Cements, TCS, Varun Beverages.\n\n' ||
        '5. Rankings and Accreditations\n' ||
        '• NBA Accredited | ACBSP USA International Accreditation | AICTE Approved.\n' ||
        '• Outlook-ICARE 2021: 16th among Business Schools in South Zone.\n\n' ||
        '6. Campus Facilities\n' ||
        'Library with 18,000+ volumes, computer labs, student clubs, residential campus, Centres of Excellence, and Career Commencement cell.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
      'Finance, HR, Marketing, Supply Chain & Operations, Business Analytics',
      '2 Years',
      'FULL TIME',
      'Undergraduate degree pass from a recognised university',
      'CAT / MAT / CMAT / ATMA / TANCET + GD & PI'
    ) RETURNING id INTO v_course_id;

    INSERT INTO fee_structures (id, college_id, program_id, course_id, quota, entry_type, notes, eligibility)
    VALUES (
      gen_random_uuid(),
      v_college_id,
      v_program_id,
      v_course_id,
      'MERIT / MANAGEMENT',
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

    -- Sitemap
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '5/10: Updated Jansons School of Business successfully.';
END $$;


-- ============================================================================
-- 6. KARUNYA SCHOOL OF MANAGEMENT, COIMBATORE (KSM)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'karunya-school-of-management-coimbatore';
    v_name TEXT := 'Karunya School of Management (KSM)';
    v_location TEXT := 'Karunya Nagar, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Karunya Institute of Technology and Sciences, Karunya Nagar, Coimbatore, Tamil Nadu – 641114';
    v_website TEXT := 'https://karunya.edu/management';
    v_established INT := 1994;
    v_type TEXT := 'Deemed University';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Business Analytics High-End Computing Terminal Lab',
        'Comprehensive Academic Library & E-Resource Access',
        'Smart Classrooms & Discussion Auditoriums',
        'Campus Hostels & Cafeterias',
        'Sports Facilities, Gym & Outdoor Complex',
        'Entrepreneurship & Startup Incubation Cell',
        'Industry Mentoring & Executive Interactions'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Management School of Karunya Institute of Technology and Sciences (Deemed University)',
        'Established in 1994 | Offers ACCA-Accredited Programme Offerings',
        '2-Year Full-Time MBA divided into 4 Semesters with 7 In-Demand Specialisations',
        '2026 MBA Placement Highlights: Highest CTC ₹17 LPA | Top 30% Average ₹7.5 LPA',
        'Approximate Total 2-Year Programme Fee: ₹6.3 Lakh to ₹6.6 Lakh',
        'High-Tech Business Analytics Lab with Live Simulation Terminals & Industry Dashboards'
    ]);

    v_description := E'1. Overview\n' ||
        'Karunya School of Management (KSM) is the management school of Karunya Institute of Technology and Sciences, a deemed-to-be university located in Coimbatore, Tamil Nadu. Established in 1994, the school focuses on management education, leadership development, industry engagement and professional skills.\n\n' ||
        '• Location: Karunya Nagar, Coimbatore, Tamil Nadu – 641114.\n' ||
        '• Established: 1994 | Status: Deemed-to-be University (KITS).\n' ||
        '• Course: Master of Business Administration (MBA), 2 years full-time (4 semesters).\n\n' ||
        '2. Course and Fees Structure\n' ||
        'Flagship 2-year full-time MBA across four semesters.\n' ||
        '• Specialisations: Finance, Marketing, Human Resource Management, International Business, Operations and Supply Chain Management, Business Analytics, Entrepreneurship.\n' ||
        '• Approximate Programme Fee: Total MBA fee is approx ₹6.3 lakh to ₹6.6 lakh based on published listings (hostel and exam charges extra).\n\n' ||
        '3. Admission\n' ||
        '• Eligibility: Bachelor''s degree in any discipline with minimum 50% marks.\n' ||
        '• Entrance Exam: Karunya Management Aptitude Test (KMAT), CAT, MAT, or TANCET.\n' ||
        '• Procedure: Online application, entrance exam, document verification, and fee payment.\n\n' ||
        '4. Placements (Published 2026 MBA Highlights)\n' ||
        '• Highest Salary Package: ₹17 LPA.\n' ||
        '• Top 30% Average Salary: ₹7.5 LPA.\n' ||
        '• Key Sectors: Consulting, BFSI, FMCG, IT, logistics, and analytics.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        'Recognised deemed-to-be university with ACCA-accredited programme offerings.\n\n' ||
        '6. Facilities\n' ||
        'Business Analytics Lab, central library, smart seminar halls, residential facilities, and incubation support.';

    -- Upsert College (Facilities included in INSERT to prevent NOT NULL error)
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
      'Finance, Marketing, HR, International Business, Operations & Supply Chain, Business Analytics, Entrepreneurship',
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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '6/10: Updated Karunya School of Management successfully.';
END $$;


-- ============================================================================
-- 7. BHARATHIAR UNIVERSITY – MBA, COIMBATORE
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'bharathiar-university-department-of-management';
    v_name TEXT := 'Bharathiar University (Department of Management)';
    v_location TEXT := 'Marudhamalai Road, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Marudhamalai Road, Coimbatore, Tamil Nadu – 641046';
    v_website TEXT := 'https://b-u.ac.in/';
    v_established INT := 1982;
    v_type TEXT := 'State University';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID;
    v_fs1_id UUID; v_fs2_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'University Central Library with Extensive Journals & Thesis Repositories',
        'Campus Computer & Internet Research Centre',
        'Department Classrooms & Seminar Auditoriums',
        'Student Cultural & Sports Activities Infrastructure',
        'Career Guidance and University Placement Bureau',
        'Centre for Distance and Online Education (CDOE) Portal & Study Centres'
    ];

    v_highlights := to_jsonb(ARRAY[
        'State University Established in 1982 | UGC Recognised & NAAC A++ Accredited',
        'Multiple MBA Modes: Regular Campus MBA, Distance Education (ODL), and Online MBA',
        'Highly Affordable MBA: Distance MBA Total Fee ₹52,630 | Online MBA Total Fee ₹71,030',
        'Specialisations in Marketing, Finance, Human Resource Management & Operations',
        'Regular Campus MBA Admission through TANCET Single-Window Counselling',
        'Comprehensive University Placement Bureau & Career Development Initiatives'
    ]);

    v_description := E'1. Overview\n' ||
        'Bharathiar University is a state university located on Marudhamalai Road in Coimbatore, Tamil Nadu. Established in 1982, the university offers postgraduate programmes across various disciplines, including management studies.\n\n' ||
        'The university provides MBA education through its university departments and its Centre for Distance and Online Education (CDOE). Students can choose a learning mode based on their career goals, work commitments and educational requirements.\n\n' ||
        '• Location: Marudhamalai Road, Coimbatore, Tamil Nadu – 641046.\n' ||
        '• Established: 1982 | Status: State University recognised by UGC with NAAC A++ grade.\n' ||
        '• Modes: Regular (Campus), Distance Education (ODL), and Online MBA.\n\n' ||
        '2. Course and Fees Structure\n' ||
        '• Regular MBA: 2-Year campus programme covering Marketing, Finance, HR, and Operations.\n' ||
        '• Distance MBA (ODL): Total course fee ₹52,630.\n' ||
        '• Online MBA: Total course fee ₹71,030.\n' ||
        'Note: Regular MBA tuition and university fee schedules follow Tamil Nadu state university norms.\n\n' ||
        '3. Admission\n' ||
        '• Regular MBA: Bachelor''s degree pass + TANCET examination and single-window counselling.\n' ||
        '• Distance & Online MBA: Direct application through Bharathiar University CDOE portal.\n\n' ||
        '4. Placements\n' ||
        'University-level placement bureau facilitates recruitment drives for campus students in marketing, finance, analytics, and business development.\n\n' ||
        '5. Rankings and Accreditation\n' ||
        '• UGC recognised State University.\n' ||
        '• NAAC A++ Grade accreditation.\n\n' ||
        '6. Facilities\n' ||
        'University library, computer labs, research facilities, sports amenities, and dedicated distance learning online portals.';

    -- Upsert College (Facilities included in INSERT to prevent NOT NULL error)
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

    -- Courses & Fees
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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '7/10: Updated Bharathiar University successfully.';
END $$;


-- ============================================================================
-- 8. COIMBATORE INSTITUTE OF TECHNOLOGY (CIT), COIMBATORE – MBA
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'coimbatore-institute-of-technology-autonomous';
    v_name TEXT := 'Coimbatore Institute of Technology (CIT)';
    v_location TEXT := 'Peelamedu, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Avinashi Road, Civil Aerodrome Post, Peelamedu, Coimbatore, Tamil Nadu – 641014';
    v_website TEXT := 'https://www.cit.edu.in/';
    v_established INT := 1956;
    v_type TEXT := 'Government-Aided Autonomous';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
    v_fs_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Central Academic Library & Research Repositories',
        'Advanced Computing Infrastructure for Business Analytics',
        'Smart Classrooms & Discussion Seminar Halls',
        'Interdisciplinary Technical & Management Labs',
        'Separate Hostels for Men & Women',
        'Sports Complex & Physical Education Courts',
        'Dedicated Career Guidance & Placement Cell',
        'Industry-Institute Interaction Hub'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Government-Aided Autonomous Institution established in 1956 | Affiliated with Anna University',
        'Approved by AICTE with NBA-Accredited Programmes',
        '2-Year Full-Time MBA with 2025–26 Total Programme Fee of ₹4,19,315',
        'Curriculum Covers Marketing, Finance, HR, Operations, Analytics, Strategy & Entrepreneurship',
        'Admission through TANCET Single-Window State MBA Counselling',
        'Strong Corporate Partnerships Across Manufacturing, Banking, IT & Consulting Sectors'
    ]);

    v_description := E'1. Overview\n' ||
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
        'Central library, computing labs, smart lecture halls, hostels, and sports facilities.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug OR slug = 'coimbatore-institute-of-technology' LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '8/10: Updated CIT MBA successfully.';
END $$;


-- ============================================================================
-- 9. SRI KRISHNA COLLEGE OF ENGINEERING & TECHNOLOGY (SKCET) – MBA
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'sri-krishna-college-of-engineering-and-technology-autonomous';
    v_name TEXT := 'Sri Krishna College of Engineering and Technology (SKCET)';
    v_location TEXT := 'Kuniamuthur, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := 'Kuniamuthur, Coimbatore, Tamil Nadu – 641008';
    v_website TEXT := 'https://www.skcet.ac.in/';
    v_established INT := 1998;
    v_type TEXT := 'Private Autonomous';
    v_naac TEXT := 'A++';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_course_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Central Digital Library & Academic Portals',
        'Advanced Computing Infrastructure & Business Labs',
        'Smart Classrooms & Seminar Auditoriums',
        'Residential Hostels with Dining for Boys & Girls',
        'Sports Complex, Fitness Gymnasium & Grounds',
        'Placement & Career Support Cell',
        'Student Clubs & Entrepreneurship Association'
    ];

    v_highlights := to_jsonb(ARRAY[
        'Autonomous Institution affiliated with Anna University | Approved by AICTE',
        'Accredited with prestigious NAAC A++ Grade & NBA-Accredited Programmes',
        '2-Year Full-Time MBA with Exposure to Coimbatore''s Industrial Ecosystem',
        '2025–26 MBA Placement Highlights: Highest Package ₹10.10 LPA | Average Package ₹5.00 LPA',
        'Top MBA Recruiters: BNY, EY, Grant Thornton, Veritas Finance, Home First, IndiaMart, TCS, D-Mart, Bajaj Finserv'
    ]);

    v_description := E'1. Overview\n' ||
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
        'Digital library, computing facilities, lecture halls, hostels, sports, and career development support.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug OR slug = 'sri-krishna-college-of-engineering-and-technology' LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, naac_grade, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_naac, v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            naac_grade = v_naac,
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '9/10: Updated SKCET MBA successfully.';
END $$;


-- ============================================================================
-- 10. SARDAR VALLABHBHAI PATEL INTERNATIONAL SCHOOL OF TEXTILES & MANAGEMENT (SVPISTM)
-- ============================================================================
DO $$
DECLARE
    v_college_id TEXT;
    v_slug TEXT := 'sardar-vallabhbhai-patel-international-school-of-textile-and-management-coimbatore';
    v_name TEXT := 'Sardar Vallabhbhai Patel International School of Textiles & Management (SVPISTM)';
    v_location TEXT := 'Peelamedu, Coimbatore';
    v_district TEXT := 'Coimbatore';
    v_address TEXT := '1483, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004';
    v_website TEXT := 'https://svpistm.ac.in/';
    v_established INT := 2002;
    v_type TEXT := 'Government Institution (Ministry of Textiles)';
    v_naac TEXT := 'B+';
    v_facilities TEXT[];
    v_highlights JSONB;
    v_description TEXT;
    v_program_id UUID;
    v_c1_id UUID; v_c2_id UUID; v_c3_id UUID; v_c4_id UUID; v_c5_id UUID;
    v_fs1_id UUID;
BEGIN
    SELECT id INTO v_program_id FROM programs WHERE code = 'MBA' LIMIT 1;

    v_facilities := ARRAY[
        'Management & Textile Reference Library',
        'Advanced Textile Material & Testing Laboratories',
        'Computer & Business Analytics Labs',
        'Smart Classrooms & Seminar Facilities',
        'Industry-Oriented Training & Mill Visit Center',
        'Residential Hostels & Dining Facilities',
        'Career Development & Textile Placement Cell'
    ];

    v_highlights := to_jsonb(ARRAY[
        'National-Level Autonomous Institution under the Ministry of Textiles, Government of India',
        'Established in 2002 | AICTE Approved & NAAC B+ Accredited',
        'Specialised MBA in Textile, Apparel, Retail, Technical Textiles & Textile Analytics',
        'Affordable Total 2-Year Programme Fee of ₹2,06,000 (Sem 1: ₹55k, Sem 2: ₹50k, Sem 3: ₹51k, Sem 4: ₹50k)',
        '2024–25 Placements: 80 Placed out of 94 Students (85%+ Rate) | Median Package ₹4.60 LPA',
        'India Today 2024: Ranked #1 in Coimbatore, #2 in Tamil Nadu & #7 in South India (Govt B-Schools)'
    ]);

    v_description := E'1. Overview\n' ||
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
        'Textile laboratories, digital library, computer facilities, hostels, and industry-oriented training.';

    -- Upsert College
    SELECT id INTO v_college_id FROM colleges WHERE slug = v_slug LIMIT 1;
    IF v_college_id IS NULL THEN
        v_college_id := gen_random_uuid()::text;
        INSERT INTO colleges (
            id, college_id, slug, name, location, district, address, website,
            established, type, type_collwge, naac_grade, facilities, highlights, description, updated_at
        ) VALUES (
            v_college_id, v_college_id, v_slug, v_name, v_location, v_district, v_address, v_website,
            v_established, v_type, 'MBA', v_naac, v_facilities, v_highlights, v_description, NOW()
        );
    ELSE
        UPDATE colleges
        SET
            name = v_name,
            location = v_location,
            district = v_district,
            address = v_address,
            website = v_website,
            established = v_established,
            type = v_type,
            type_collwge = 'MBA',
            naac_grade = v_naac,
            facilities = v_facilities,
            highlights = v_highlights,
            description = v_description,
            updated_at = NOW()
        WHERE id = v_college_id;
    END IF;

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

    -- Sitemap
    IF EXISTS (SELECT 1 FROM sitemap_entries WHERE loc = '/college/' || v_slug) THEN
        UPDATE sitemap_entries SET college_name = v_name, slug = v_slug, updated_at = NOW() WHERE loc = '/college/' || v_slug;
    ELSE
        INSERT INTO sitemap_entries (type, loc, slug, college_name, priority, changefreq)
        VALUES ('college', '/college/' || v_slug, v_slug, v_name, '0.8', 'weekly');
    END IF;

    RAISE NOTICE '10/10: Updated SVPISTM successfully.';
END $$;
