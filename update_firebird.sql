-- Update Firebird Institute of Research in Management details

UPDATE colleges 
SET 
  location = 'Coimbatore, Tamil Nadu',
  
  -- Update Facilities based on INFRASTRUCTURE section
  facilities = ARRAY[
    'Library', 
    'Cafeteria', 
    'Hostel', 
    'Shuttle Service', 
    'Sports Complex', 
    'Smart Classrooms', 
    'Computer Lab', 
    'Auditorium', 
    'Amphitheatre', 
    'Yoga and Meditation Hall', 
    'Temple', 
    'Seminar Halls', 
    'Startup Ventures', 
    'Executive Quarters', 
    'Medical facilities'
  ],

  -- Update Highlights based on Programme Highlights
  highlights = to_jsonb(ARRAY[
    'PGDM – Approved by AICTE, Ministry of HRD, Govt of India',
    'International MBA – Articulation Programme - Multimedia University, Malaysia',
    'Industry ready Curriculum',
    'Case Study-Based Learning',
    'Daily Internship during Study period - 4 to 5 Hours',
    '3 Months full-time Summer Internship',
    '1 Month International Exposure [Academic, Research, Industry and Tourism]',
    'Excellent Placement Opportunities from Top Companies',
    'Highest CTC 13.98 LPA | Average CTC 9 LPA | 100% Placement Opportunities',
    'International Placement opportunities',
    'In-House Entrepreneurial Ventures',
    'International Mentorship',
    'Scholarships for the eligible students',
    'Cost of Food and Accommodation for 2 Years is sponsored by parent organization'
  ]),

  -- Update Description with comprehensive details
  description = E'About Firebird\n' ||
    'Firebird was born out of a desire to create world-class contemporary management leadership grounded in industry relevance. This ethos was embedded from the very beginning due to its origins in the industrial sector. The institute initially began as an integral leadership development initiative of the Bannari Amman Spinning Mills and Shiva Texyarn Group of companies, a conglomerate with a current turnover of around 2700 crore. Leveraging the extensive industrial experience and strong support of its parent organization, Firebird has nurtured a deeply industry-connected culture that distinctly shapes its educational approach.\n\n' ||
    'Evolving from this foundation, Firebird now offers a full time Post Graduate Diploma in Management [PGDM], approved by AICTE. The program is designed to provide a contemporary, industry-aligned education that stands apart from conventional academic models by closely integrating real-world business practices and leadership development.\n\n' ||
    'About PGDM Programme\n' ||
    'The Post Graduate Diploma in Management (PGDM) at Firebird Institute of Research in Management, approved by the AICTE, is a two-year, full-time, industry-immersive program designed to create future-ready management professionals. Every student at Firebird works under the mentorship of a corporate manager throughout the program, gaining continuous on-field exposure and applied learning. This mentorship model bridges academic learning with real-world business problem-solving, enabling a seamless transition from campus to corporate.\n\n' ||
    'The program offers an International MBA through Multimedia University, Malaysia under the Articulation Model, along with Post Graduate Programs (PGP) from Firebird’s global academic partners for industry-integrated specializations. Upon successfully completing the program, students receive a Two-Year Work Experience Certificate, underscoring the practical and applied nature of their learning journey.\n\n' ||
    'Courses Offered\n' ||
    'Post Graduate Diploma in Management [PGDM]\n' ||
    'Core Specialisations: Human Resources, Finance, Marketing Management, Operations Management\n' ||
    'Industry Integrated Specialisations: Business Analytics, Fintech, Digital Marketing, Logistics and Supply Chain Management\n\n' ||
    'Admission 2026\n' ||
    'Entry Requirements: Candidates seeking admission to the PGDM programs should possess a graduate degree or equivalent qualification with not less than 50% marks in any discipline obtained from a University/Institute recognized by UGC and their schooling. Candidate has to appear in any one of the entrance examinations such as CAT, MAT, XAT, ATMA, GMAT, TANCET, or a similar score.\n\n' ||
    'Application Process: Students can apply online or submit the applications offline. The application cost will be INR 1000/-. With the application form filled out and application fees paid, students will be allowed for the selection process. Download the application form by clicking here. Fill out the application form and submit it along with the processing fee of INR 1,000 through one of the payment options.\n\n' ||
    'Selection Process: The applicants called for the selection process will undergo the Firebird Aptitude test, Group Discussion, and Personal Interview. Before the selection process, the applicants must provide copies of documents.\n\n' ||
    'Fees\n' ||
    'Fees for PGDM at Firebird: INR 11,10,000/- for 2 Years\n\n' ||
    'Scholarships\n' ||
    'Scholarships available up to 1.20 Lakhs for Eligible Students. Food and Accommodation – Complementary for 2 years through CSR Sponsorship worth of 2 Lakhs from parent company called Shiva Tex Yarn/Bannari Group.\n\n' ||
    'Placement\n' ||
    'Firebird Coimbatore has a Career Development Center (CDC) that provides 100% placement assistance to PGDM students by ensuring guidance and support to help them network with potential employers. The CDC is staffed with senior professionals with experience in respective domains. The institute offers industrial exposure to the students by arranging interactions with senior executives of multiple companies. FIREBIRD Coimbatore, with the help of CDC also conducts workshops, on various contemporary developments and offers value-added courses, involving top-of-the-line trainers and organisations in all functional areas to students.\n' ||
    'Highest CTC: 13.98 Lakhs\n' ||
    'Lowest CTC: 6.5 Lakhs\n' ||
    'Average Projected CTC: 9 Lakhs\n' ||
    '100% Placement Opportunities\n\n' ||
    'Top Recruiters include: Federal Bank, BOSCH, BNP Paribas, PIRAMAL Finance, ZOHO, Ramco cements, TCS, CII, ZOMATO, Park Global, IDFC First bank, PULKIT, HFFC, Larsen and Turbo, Cafe Coffee day, ELGI, Kondaas, TITAN, City Union BAnk, ESAF BAnk, DHL, Joyallukkas, Vodafone, Corizo, New Sens ltd, Rockow, Cavin care, J pensil, Wild craft, Kirtilal, Byuofuel, Unimarket research, Equitas Small Finance Bank, Indusind Bank, HALEON, Pinclick, TVS supply Chain, Sporfy, Voltaas, Texmo, WIPRO, Avasoft, Redington, Digital Garage, Roots.'

WHERE slug = 'firebird-institute-of-research-in-management';
