// College data structure for the Collegesera platform
export interface College {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Deemed';
  ranking: number;
  rating: number;
  fees: {
    annual: number;
    total: number;
  };
  courses: string[];
  streams: string[];
  established: number;
  image: string;
  description: string;
  facilities: string[];
  admissionProcess: string;
  eligibility: string[];
  placements: {
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string[];
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

export interface Stream {
  id: string;
  name: string;
  description: string;
  icon: string;
  courses: string[];
  careerOpportunities: string[];
  averageSalary: number;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  type: 'Undergraduate' | 'Postgraduate' | 'Diploma';
  stream: string;
  colleges: string[];
  eligibility: string[];
  averageFees: number;
  scope: string[];
}

export const colleges: College[] = [
  {
    id: 'clg-001',
    name: 'PSG College of Technology',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Private',
    ranking: 2,
    rating: 4.5,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["B.E. Mechanical Engineering", "B.E. Computer Science", "B.Tech Information Technology"],
    streams: ["Engineering", "Technology"],
    established: 1951,
    image: "https://example.com/images/psg-college.jpg",
    description: "PSG College of Technology is one of the premier engineering colleges in Tamil Nadu, known for its strong academic programs, industry collaborations, and research facilities.",
    facilities: ["Hostel", "Library", "Laboratories", "Sports Complex", "Cafeteria", "Auditorium"],
    admissionProcess: "Admission is based on TNEA counseling, which considers marks obtained in the 12th standard with Physics, Chemistry, and Mathematics.",
    eligibility: ["10+2 with PCM", "Valid TNEA Rank"],
    placements: {
      averagePackage: 600000,
      highestPackage: 2000000,
      placementRate: 92,
      topRecruiters: ["TCS", "Infosys", "Wipro", "Amazon", "L&T"]
    },
    contact: {
      phone: "+91-422-2572177",
      email: "info@psgtech.ac.in",
      website: "https://www.psgtech.edu",
      address: "Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India"
    }
  },
  {
    id: 'clg-002',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    type: 'Government',
    ranking: 2,
    rating: 4.8,
    fees: {
      annual: 250000,
      total: 1000000
    },
    courses: ['B.Tech', 'M.Tech', 'PhD', 'MBA'],
    streams: ['Engineering', 'Management', 'Research'],
    established: 1961,
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg',
    description: 'IIT Delhi is one of the premier engineering institutions in India, known for its excellence in technical education and research.',
    facilities: ['Library', 'Hostels', 'Labs', 'Sports Complex', 'Medical Center'],
    admissionProcess: 'JEE Advanced for B.Tech, GATE for M.Tech, CAT for MBA',
    eligibility: ['12th with PCM for B.Tech', 'Bachelor\'s degree for M.Tech'],
    placements: {
      averagePackage: 1800000,
      highestPackage: 5500000,
      placementRate: 95,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
    },
    contact: {
      phone: '+91-11-2659-1000',
      email: 'registrar@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in',
      address: 'Hauz Khas, New Delhi - 110016'
    }
  },
  {
    id: 'clg-003',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, Delhi',
    type: 'Government',
    ranking: 1,
    rating: 4.9,
    fees: {
      annual: 150000,
      total: 750000
    },
    courses: ['MBBS', 'MD', 'MS', 'B.Sc Nursing'],
    streams: ['Medical', 'Nursing', 'Research'],
    established: 1956,
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    description: 'AIIMS Delhi is India\'s premier medical institution, renowned for its excellence in medical education, research, and patient care.',
    facilities: ['Hospital', 'Research Centers', 'Library', 'Hostels', 'Auditorium'],
    admissionProcess: 'NEET-UG for MBBS, NEET-PG for MD/MS',
    eligibility: ['12th with PCB for MBBS', 'MBBS for MD/MS'],
    placements: {
      averagePackage: 1200000,
      highestPackage: 3000000,
      placementRate: 98,
      topRecruiters: ['Apollo Hospitals', 'Fortis', 'Max Healthcare', 'Government Hospitals']
    },
    contact: {
      phone: '+91-11-2659-3333',
      email: 'registrar@aiims.ac.in',
      website: 'https://www.aiims.edu',
      address: 'Ansari Nagar, New Delhi - 110029'
    }
  },
  {
    id: 'clg-004',
    name: 'Delhi University',
    location: 'New Delhi, Delhi',
    type: 'Government',
    ranking: 5,
    rating: 4.6,
    fees: {
      annual: 75000,
      total: 225000
    },
    courses: ['B.A', 'B.Com', 'B.Sc', 'M.A', 'M.Com', 'M.Sc'],
    streams: ['Arts', 'Commerce', 'Science'],
    established: 1922,
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg',
    description: 'University of Delhi is one of India\'s largest universities, offering diverse undergraduate and postgraduate programs.',
    facilities: ['Central Library', 'Sports Complex', 'Cultural Centers', 'Research Labs', 'Hostels'],
    admissionProcess: 'Merit-based admission, Entrance tests for some courses',
    eligibility: ['12th for undergraduate courses', 'Bachelor\'s degree for postgraduate'],
    placements: {
      averagePackage: 800000,
      highestPackage: 2500000,
      placementRate: 85,
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Deloitte']
    },
    contact: {
      phone: '+91-11-2766-7049',
      email: 'info@du.ac.in',
      website: 'https://www.du.ac.in',
      address: 'Vice-Chancellor\'s Office, University of Delhi, Delhi - 110007'
    }
  },
  {
    id: 'clg-005',
    name: 'Jamia Millia Islamia',
    location: 'New Delhi, Delhi',
    type: 'Government',
    ranking: 8,
    rating: 4.4,
    fees: {
      annual: 65000,
      total: 260000
    },
    courses: ['B.Tech', 'B.A', 'B.Com', 'MBA', 'M.Tech'],
    streams: ['Engineering', 'Arts', 'Commerce', 'Management'],
    established: 1920,
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
    description: 'Jamia Millia Islamia is a central university known for its diverse academic programs and inclusive environment.',
    facilities: ['Library', 'Hostels', 'Medical Center', 'Sports Facilities', 'Auditorium'],
    admissionProcess: 'Entrance tests and merit-based selection',
    eligibility: ['12th for undergraduate', 'Bachelor\'s for postgraduate'],
    placements: {
      averagePackage: 700000,
      highestPackage: 2200000,
      placementRate: 80,
      topRecruiters: ['IBM', 'Accenture', 'HCL', 'Tech Mahindra']
    },
    contact: {
      phone: '+91-11-2698-1717',
      email: 'info@jmi.ac.in',
      website: 'https://www.jmi.ac.in',
      address: 'Jamia Nagar, New Delhi - 110025'
    }
  },
  {
    id: 'clg-006',
    name: 'Aishwarya College of Engineering and Technology - [ACET] (Erode, Tamil Nadu)',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.25,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Computer Science And Engineering", "Mechanical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Aishwarya College of Engineering and Technology - [ACET] (Erode, Tamil Nadu) is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-007',
    name: 'Akshaya College of Engineering and Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.38,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Mechatronics Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Artificial Intelligence & Data Science", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Akshaya College of Engineering and Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-008',
    name: 'AMRITA SCHOOL OF ENGINEERING',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.13,
    fees: {
      annual: 610000,
      total: 2440000
    },
    courses: ["Computer Science and Engineering", "Aerospace Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Electrical And Electronics Engineering", "Chemical Engineering", "Civil Engineering", "Computer And Communication Engineering", "Electrical And Computer Engineering", "Robotics and Automation"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "AMRITA SCHOOL OF ENGINEERING is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-009',
    name: 'Angel College of Engineering and Technology - [ACET] (Tiruppur, Tamil Nadu)',
    location: 'Tiruppur,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.38,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Electrical And Electronics Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Angel College of Engineering and Technology - [ACET] (Tiruppur, Tamil Nadu) is an engineering college located in Tiruppur,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tiruppur,  Tamil Nadu"
    }
  },
  {
    id: 'clg-010',
    name: 'Annapoorana Engineering College',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.38,
    fees: {
      annual: 70000,
      total: 280000
    },
    courses: ["Computer Science And Engineering", "Electrical And Electronics Engineering", "Automobile Engineering", "Biomedical Engineering", "Civil Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Annapoorana Engineering College is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-011',
    name: 'Asian College of Engineering and Technology Saravanampatty - [ACET] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.31,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Agricultural Engineering", "Mechanical Engineering", "Artificial Intelligence and Data Science", "Biomedical Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Asian College of Engineering and Technology Saravanampatty - [ACET] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-012',
    name: 'AVS Engineering College - [AVSEC] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.8,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Biomedical Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "AVS Engineering College - [AVSEC] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-013',
    name: 'Bannari Amman Institute of Technology',
    location: 'Sathyamangalam,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.86,
    fees: {
      annual: 75000,
      total: 300000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Aeronautical Engineering", "Biomedical Engineering", "Electrical And Electronics Engineering", "Mechatronics Engineering", "Mechanical Engineering", "Electronics And Instrumentation Engineering", "Automobile Engineering (Discontinued)", "Computer Science and Design", "Information Science & Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Information Technology", "Biotechnology", "Artificial Intelligence & Machine Learning", "Agricultural Engineering", "Food Technology", "Fashion Technology", "Computer Science and Business Systems", "Textile Technology (Discontinued)", "Computer Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Bannari Amman Institute of Technology is an engineering college located in Sathyamangalam,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Sathyamangalam,  Tamil Nadu"
    }
  },
  {
    id: 'clg-014',
    name: 'Bharathiyar Institute of Engineering for Women',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.0,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Artificial Intelligence and Data Science", "Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Bharathiyar Institute of Engineering for Women is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-015',
    name: 'Builders Engineering College',
    location: 'Tiruppur,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.93,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Civil Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Builders Engineering College is an engineering college located in Tiruppur,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tiruppur,  Tamil Nadu"
    }
  },
  {
    id: 'clg-016',
    name: 'Christ the King Engineering College (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.88,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Christ the King Engineering College (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-017',
    name: 'Coimbatore Institute of Engineering and Technology - [CIET] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.8,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Cyber Security", "Electronics & Communication Engineering", "Mechatronics Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Coimbatore Institute of Engineering and Technology - [CIET] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-018',
    name: 'Coimbatore Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.0,
    fees: {
      annual: 33350,
      total: 133400
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Chemical Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Coimbatore Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-019',
    name: 'CSI College of Engineering - [CSICE] (The Nilgiris, Tamil Nadu)',
    location: 'The Nilgiris,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.86,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "CSI College of Engineering - [CSICE] (The Nilgiris, Tamil Nadu) is an engineering college located in The Nilgiris,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "The Nilgiris,  Tamil Nadu"
    }
  },
  {
    id: 'clg-020',
    name: 'Dhaanish Ahmed Institute of Technology (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.72,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Biomedical Engineering", "Computer Science And Engineering", "Robotics and Automation", "Electronics & Communication Engineering", "Cyber Security", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Information Technology", "Food Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Dhaanish Ahmed Institute of Technology (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-021',
    name: 'Dhanalakshmi Srinivasan College of Engineering',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.86,
    fees: {
      annual: 125000,
      total: 500000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Biomedical Engineering", "Agricultural Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Cyber Security", "Artificial Intelligence & Data Science", "Food Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Dhanalakshmi Srinivasan College of Engineering is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-022',
    name: 'Dr. Mahalingam College of Engineering and Technology',
    location: 'Pollachi,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.02,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Cyber Security", "Electrical And Electronics Engineering", "Artificial Intelligence & Machine Learning", "Automobile Engineering", "Advanced Communication Technology", "Civil Engineering", "Mechatronics Engineering", "Electronics And Instrumentation Engineering", "VLSI Design & Technology", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Dr. Mahalingam College of Engineering and Technology is an engineering college located in Pollachi,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Pollachi,  Tamil Nadu"
    }
  },
  {
    id: 'clg-023',
    name: 'Dr. N.G.P Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.12,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Computer Science and Business Systems", "Cyber Security", "Biomedical Engineering", "Electronics & Communication Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering", "Civil Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Dr. N.G.P Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-024',
    name: 'Dr. Nallini Institute of Engineering and Technology (Tiruppur, Tamil Nadu)',
    location: 'Dharapuram,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.0,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Information Technology", "Mechanical Engineering", "Computer Science And Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Dr. Nallini Institute of Engineering and Technology (Tiruppur, Tamil Nadu) is an engineering college located in Dharapuram,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Dharapuram,  Tamil Nadu"
    }
  },
  {
    id: 'clg-025',
    name: 'EASA College of Engineering and Technology - [ECET]',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.66,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Cyber Security", "Agricultural Engineering", "Mechanical Engineering", "Artificial Intelligence & Machine Learning", "Biomedical Engineering", "Artificial Intelligence & Data Science", "Petroleum Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "EASA College of Engineering and Technology - [ECET] is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-026',
    name: 'Erode Sengunthar Engineering College (Erode, Tamil Nadu)',
    location: 'Perundurai,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.6,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Electronics And Instrumentation Engineering", "Robotics and Automation", "Biomedical Engineering", "Cyber Security", "Agricultural Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering", "Computer Science And Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Chemical Engineering", "Information Technology", "Biotechnology", "Computer Science and Design", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Erode Sengunthar Engineering College (Erode, Tamil Nadu) is an engineering college located in Perundurai,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Perundurai,  Tamil Nadu"
    }
  },
  {
    id: 'clg-027',
    name: 'Faculty of Management, Builders Engineering College (Tiruppur, Tamil Nadu)',
    location: 'Tiruppur,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.0,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Civil Engineering", "Electrical & Communication Engineering", "Mechanical Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Faculty of Management, Builders Engineering College (Tiruppur, Tamil Nadu) is an engineering college located in Tiruppur,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tiruppur,  Tamil Nadu"
    }
  },
  {
    id: 'clg-028',
    name: 'HINDUSTHAN COLLEGE OF ENGINEERING AND TECHNOLOGY - [HCET], COIMBATORE',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.03,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Aeronautical Engineering", "Electronics & Communication Engineering", "Mechatronics Engineering", "Automobile Engineering", "Mechanical Engineering", "Civil Engineering", "Biomedical Engineering", "Agricultural Engineering", "Electrical And Electronics Engineering", "Electronics And Instrumentation Engineering", "Cyber Security", "Artificial Intelligence & Machine Learning", "Information Technology", "Food Technology", "Chemical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "HINDUSTHAN COLLEGE OF ENGINEERING AND TECHNOLOGY - [HCET], COIMBATORE is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-029',
    name: 'HINDUSTHAN INSTITUTE OF TECHNOLOGY - [HIT], COIMBATORE',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.47,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Aeronautical Engineering", "Pharmaceutical Engineering", "Automobile Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Pharmaceutical Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "HINDUSTHAN INSTITUTE OF TECHNOLOGY - [HIT], COIMBATORE is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-030',
    name: 'Info Institute of Engineering - [IIE] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.93,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Info Institute of Engineering - [IIE] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-031',
    name: 'Jai Shriram Engineering College',
    location: 'Tiruppur,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 5.33,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Fashion Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Jai Shriram Engineering College is an engineering college located in Tiruppur,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tiruppur,  Tamil Nadu"
    }
  },
  {
    id: 'clg-032',
    name: 'Jairupaa College of Engineering (Tiruppur, Tamil Nadu)',
    location: 'Tiruppur,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.5,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Civil Engineering", "Computer Science And Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Jairupaa College of Engineering (Tiruppur, Tamil Nadu) is an engineering college located in Tiruppur,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tiruppur,  Tamil Nadu"
    }
  },
  {
    id: 'clg-033',
    name: 'Jansons Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.27,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Computer Science and Business Systems (Discontinued)", "Electrical And Electronics Engineering", "Civil Engineering", "Artificial Intelligence & Data Science", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Jansons Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-034',
    name: 'JCT College Of Engineering And Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.69,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Petrochemical Engineering", "Petroleum Engineering", "Mechanical Engineering", "Biotechnology", "Computer Science and Business Systems", "Civil Engineering", "Electrical And Electronics Engineering", "Food Technology", "Automobile Engineering", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "JCT College Of Engineering And Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-035',
    name: 'Kalaignar Karunanidhi Institute of Technology - [KIT] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.81,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Mechanical Engineering", "Electronics & Communication Engineering", "Computer Science And Engineering", "Aeronautical Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Biomedical Engineering", "Electronics Engineering", "Cyber Security", "Electrical And Electronics Engineering", "VLSI Design & Technology", "Agricultural Engineering", "Artificial Intelligence & Data Science", "Biotechnology", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Kalaignar Karunanidhi Institute of Technology - [KIT] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-036',
    name: 'Karpagam Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.18,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Karpagam Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-037',
    name: 'Karunya Institute of Technology and Sciences',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.11,
    fees: {
      annual: 303500,
      total: 1214000
    },
    courses: ["Computer Science and Engineering", "Biotechnology", "Biomedical Engineering", "Food Process Engineering", "Computer Engineering - Cyber Security", "Robotics and Automation", "Mechanical Engineering", "Aerospace Engineering", "Mechanical Engineering - Artificial Intelligence and Machine Learning", "Biotechnology - Artificial Intelligence", "Robotics and Automation - Artificial Intelligence and Data Science", "Biotechnology - Genome Engineering and Technology", "Electronics & Communication Engineering", "Biomedical Engineering - Artificial Intelligence and Machine Learning", "Artificial Intelligence & Machine Learning", "Artificial Intelligence", "Robotics and Automation - Artificial Intelligence and Machine Learning", "Food Processing and Engineering - Internet of Things", "Aerospace Engineering - Unmanned Aerial Vehicles", "Electrical And Electronics Engineering", "Computer Engineering", "Electronics and Communication Engineering-Internet of Things", "Electronics and Communication Engineering - Artificial Intelligence", "Electrical and Electronics Engineering - Artificial Intelligence and Machine Learning", "Aerospace Engineering - Artificial Intelligence and Machine Learning", "Civil Engineering", "Artificial Intelligence & Data Science", "Biomedical Engineering - Data Science", "Biotechnology - Medical Biotechnology", "Civil Engineering - BIM and Digital Twin", "Civil Engineering - GIS and Remote Sensing", "Cyber Security", "Electrical and Electronics - Data Science", "Robotics and Automation - Artificial Intelligence"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Karunya Institute of Technology and Sciences is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-038',
    name: 'Kathir College of Engineering (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.08,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Computer and Communication Engineering", "Electrical And Electronics Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Kathir College of Engineering (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-039',
    name: 'Ganesh College of Engineering - [GCE] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.5,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Biomedical Engineering", "Information Technology", "Artificial Intelligence and Data Science", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Ganesh College of Engineering - [GCE] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-040',
    name: 'KGiSL Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.33,
    fees: {
      annual: 87200,
      total: 348800
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Robotics and Automation", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Cyber Security", "Information Technology", "Artificial Intelligence & Data Science", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "KGiSL Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-041',
    name: 'KNOWLEDGE INSTITUTE OF TECHNOLOGY - [KIOT], SALEM',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.14,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Electrical And Electronics Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Electronics and Computer Engineering", "Mechanical Engineering", "Computer Science and Business Systems", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "KNOWLEDGE INSTITUTE OF TECHNOLOGY - [KIOT], SALEM is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-042',
    name: 'Kongu Engineering College',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.68,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Mechatronics Engineering", "Civil Engineering", "Electronics And Instrumentation Engineering", "Mechanical Engineering", "Computer Science and Design", "Electrical And Electronics Engineering", "Automobile Engineering", "Artificial Intelligence & Machine Learning", "Artificial Intelligence & Data Science", "Food Technology", "Information Technology", "Chemical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Kongu Engineering College is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-043',
    name: 'KPR Institute of Engineering & Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.35,
    fees: {
      annual: 96900,
      total: 387600
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Mechatronics Engineering", "Mechanical Engineering", "Artificial Intelligence & Machine Learning", "Electrical And Electronics Engineering", "Biomedical Engineering", "Civil Engineering", "Cyber Security", "Artificial Intelligence & Data Science", "Chemical Engineering", "Information Technology", "Computer Science and Business Systems"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "KPR Institute of Engineering & Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-044',
    name: 'Maharaja Engineering College',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.5,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Mechanical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Maharaja Engineering College is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-045',
    name: 'Maharaja Institute of Technology - [MIT] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.5,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Maharaja Institute of Technology - [MIT] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-046',
    name: 'Mahendra College of Engineering, Salem',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.36,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Electrical And Electronics Engineering", "Computer Science And Engineering", "Artificial Intelligence and Data Science", "Biomedical Engineering", "Electronics & Communication Engineering", "Information Technology", "Civil Engineering", "Mechatronics Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Mahendra College of Engineering, Salem is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-047',
    name: 'Merit International Institute of Technology (The Nilgiris, Tamil Nadu)',
    location: 'The Nilgiris,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.0,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Biotechnology", "Biotechnology And Biochemical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Merit International Institute of Technology (The Nilgiris, Tamil Nadu) is an engineering college located in The Nilgiris,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "The Nilgiris,  Tamil Nadu"
    }
  },
  {
    id: 'clg-048',
    name: 'MP Nachimuthu MJaganathan Engineering College (Erode, Tamil Nadu)',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.25,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "MP Nachimuthu MJaganathan Engineering College (Erode, Tamil Nadu) is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-049',
    name: 'MUTHAYAMMAL ENGINEERING COLLEGE - [MEC], RASIPURAM',
    location: 'Namakkal,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.25,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Electrical And Electronics Engineering", "Computer Science and Business Systems", "Biomedical Engineering", "Medical Electronics", "Mechanical Engineering", "Agricultural Engineering", "Mechatronics Engineering", "Robotics and Automation", "Cyber Security", "Civil Engineering", "VLSI Design & Technology", "Information Technology", "Artificial Intelligence & Data Science", "Biotechnology", "Chemical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "MUTHAYAMMAL ENGINEERING COLLEGE - [MEC], RASIPURAM is an engineering college located in Namakkal,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Namakkal,  Tamil Nadu"
    }
  },
  {
    id: 'clg-050',
    name: 'NANDHA ENGINEERING COLLEGE - [NEC], ERODE',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.61,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Cyber Security", "Biomedical Engineering", "Mechanical Engineering", "Internet of Things", "Civil Engineering", "Electrical And Electronics Engineering", "Agricultural Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Chemical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "NANDHA ENGINEERING COLLEGE - [NEC], ERODE is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-051',
    name: 'Narasu\'s Sarathy Institute of Technology - [NSIT] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.25,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Electrical And Electronics Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Civil Engineering", "Information Technology", "Electronics & Communication Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Narasu's Sarathy Institute of Technology - [NSIT] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-052',
    name: 'Nehru College of Engineering',
    location: 'Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.77,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Mechatronics", "Computer Science and Engineering", "Computer Science and Engineering (Artificial Intelligence & Machine Learning)", "Electronics & Communication Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Electrical And Computer Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Nehru College of Engineering is an engineering college located in Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Tamil Nadu"
    }
  },
  {
    id: 'clg-053',
    name: 'PA College of Engineering and Technology - [PACET] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.88,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "PA College of Engineering and Technology - [PACET] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-054',
    name: 'Park College of Engineering and Technology - [PCET]',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.17,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Aeronautical Engineering", "Computer Science And Engineering", "Biomedical Engineering", "Robotics and Automation", "Geo Informatics", "Electrical And Electronics Engineering", "Mechanical Engineering", "Electronics & Communication Engineering", "Agricultural Engineering", "Artificial Intelligence and Data Science", "Mechatronics Engineering", "Information Technology", "Textile Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Park College of Engineering and Technology - [PCET] is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-055',
    name: 'Pollachi Institute of Engineering and Technology (Coimbatore, Coimbatore)',
    location: 'Pollachi,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.86,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Civil Engineering", "Artificial Intelligence and Data Science", "Electrical And Electronics Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Pollachi Institute of Engineering and Technology (Coimbatore, Coimbatore) is an engineering college located in Pollachi,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Pollachi,  Tamil Nadu"
    }
  },
  {
    id: 'clg-056',
    name: 'PPG Institute of Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.71,
    fees: {
      annual: 75000,
      total: 300000
    },
    courses: ["Computer Science And Engineering", "Biomedical Engineering", "Electronics & Communication Engineering", "Artificial Intelligence and Data Science", "Artificial Intelligence & Machine Learning", "Information Technology", "Agricultural Engineering", "Mechanical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "PPG Institute of Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-057',
    name: 'PSG INSTITUTE OF ADVANCED STUDIES - [PSGIAS], COIMBATORE',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.0,
    fees: {
      annual: 420080,
      total: 1680320
    },
    courses: ["Mechatronics Engineering", "Innovative Textiles", "Mechanical Engineering", "Automobile Engineering", "Electrical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "PSG INSTITUTE OF ADVANCED STUDIES - [PSGIAS], COIMBATORE is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-058',
    name: 'RVS College Of Engineering And Technology, Coimbatore',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.47,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Petrochemical Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "RVS College Of Engineering And Technology, Coimbatore is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-059',
    name: 'Salem College of Engineering and Technology',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.34,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Biomedical Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Mechatronics Engineering", "Electrical And Electronics Engineering", "Civil Engineering", "Biotechnology", "Information Technology", "Data Science and Artificial Intelligence"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Salem College of Engineering and Technology is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-060',
    name: 'Sasurie Academy of Engineering (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.77,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Computer Science And Engineering", "Civil Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sasurie Academy of Engineering (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-061',
    name: 'School of Engineering, Avinashalingam University (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.0,
    fees: {
      annual: 37000,
      total: 148000
    },
    courses: ["Printing Technology", "Computer Science And Engineering", "Food Technology", "Civil Engineering", "Artificial Intelligence & Machine Learning", "Artificial Intelligence and Data Science", "Biomedical Engineering", "Electronics & Communication Engineering", "Internet of Things"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "School of Engineering, Avinashalingam University (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-062',
    name: 'Shree Sathyam College of Engineering and Technology (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 5.5,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Artificial Intelligence and Data Science", "Electronics & Communication Engineering", "Civil Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Shree Sathyam College of Engineering and Technology (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-063',
    name: 'Shree Venkateshwara HiTech Engineering College (Erode, Tamil Nadu)',
    location: 'Gobichettipalayam,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.57,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering", "Civil Engineering", "Electronics & Communication Engineering", "Biomedical Engineering", "Cyber Security", "Artificial Intelligence & Data Science", "Information Technology", "Pharmaceutical Technology", "Biotechnology", "Artificial Intelligence & Machine Learning"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Shree Venkateshwara HiTech Engineering College (Erode, Tamil Nadu) is an engineering college located in Gobichettipalayam,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Gobichettipalayam,  Tamil Nadu"
    }
  },
  {
    id: 'clg-064',
    name: 'SNS College of Engineering',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.73,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Mechatronics Engineering", "Electrical And Electronics Engineering", "Artificial Intelligence & Data Science", "Computer Science and Technology", "Internet of Things & Cyber Security Including Blockchain Technology", "Information Technology", "Computer Science and Design", "Biomedical and Robotics Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "SNS College of Engineering is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-065',
    name: 'Sree Sakthi Engineering College',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.39,
    fees: {
      annual: 75000,
      total: 300000
    },
    courses: ["Computer Science And Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Cyber Security", "Civil Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Artificial Intelligence & Machine Learning"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sree Sakthi Engineering College is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-066',
    name: 'Sri Eshwar College Of Engineering',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.06,
    fees: {
      annual: 68000,
      total: 272000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Artificial Intelligence & Machine Learning", "Computer and Communication Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Cyber Security", "Artificial Intelligence & Data Science", "Computer Science and Business Systems", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Eshwar College Of Engineering is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-067',
    name: 'Sri Krishna College of Engineering and Technology',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.85,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Cyber Security", "Mechatronics Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Computer Science and Design", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Internet of Things"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Krishna College of Engineering and Technology is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-068',
    name: 'Sri Ramakrishna Engineering College - [SREC] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.02,
    fees: {
      annual: 175000,
      total: 700000
    },
    courses: ["Computer Science And Engineering", "Aeronautical Engineering", "Electronics & Communication Engineering", "Robotics and Automation", "Biomedical Engineering", "Electrical And Electronics Engineering", "Civil Engineering", "Electronics And Instrumentation Engineering", "Mechanical Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Ramakrishna Engineering College - [SREC] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-069',
    name: 'Sri Ranganathar Institute of Engineering & Technology - [SRIET] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.02,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electrical And Electronics Engineering", "Information Technology", "Electronics & Communication Engineering", "Mechanical Engineering", "Civil Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Ranganathar Institute of Engineering & Technology - [SRIET] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-070',
    name: 'Sri Shakthi Institute of Engineering and Technology - [SIET]',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.55,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Agricultural Engineering", "Civil Engineering", "Cyber Security", "Mechanical Engineering", "Electrical And Electronics Engineering", "Biomedical Engineering", "Food Technology", "Artificial Intelligence & Data Science", "Biotechnology", "Information Technology", "Artificial Intelligence & Machine Learning"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Shakthi Institute of Engineering and Technology - [SIET] is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-071',
    name: 'Sri Shanmugha College of Engineering and Technology - [SSCET] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.47,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Electronics & Communication Engineering", "Biomedical Engineering", "Computer Science And Engineering", "Cyber Security", "Mechanical Engineering", "Agricultural Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Sri Shanmugha College of Engineering and Technology - [SSCET] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-072',
    name: 'Study World College of Engineering',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.36,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Artificial Intelligence & Machine Learning", "Electrical And Electronics Engineering", "Mechanical Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Study World College of Engineering is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-073',
    name: 'Suguna College of Engineering - [SCE] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.25,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechatronics Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Electrical And Electronics Engineering", "Agricultural Engineering", "Electronics & Communication Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Suguna College of Engineering - [SCE] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-074',
    name: 'Surya Engineering College (Erode, Tamil Nadu)',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.17,
    fees: {
      annual: 50000,
      total: 200000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Cyber Security", "Biomedical Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Surya Engineering College (Erode, Tamil Nadu) is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-075',
    name: 'Tamilnadu College of Engineering - [TNCE] (Coimbatore, Coimbatore)',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.83,
    fees: {
      annual: 55000,
      total: 220000
    },
    courses: ["Computer Science And Engineering", "Instrumentation & Control Engineering", "Electronics & Communication Engineering", "Civil Engineering", "Electrical And Electronics Engineering", "Mechanical Engineering", "Automobile Engineering", "Artificial Intelligence & Data Science", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Tamilnadu College of Engineering - [TNCE] (Coimbatore, Coimbatore) is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  },
  {
    id: 'clg-076',
    name: 'The Kavery College of Engineering - [KCE] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.87,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electrical And Electronics Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Biomedical Engineering", "Civil Engineering", "Mechanical Engineering", "Artificial Intelligence & Data Science", "Chemical Engineering", "Agricultural Engineering", "Information Technology & Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "The Kavery College of Engineering - [KCE] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-077',
    name: 'The Kavery Engineering College - [TKEC] (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 3.61,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Electronics & Communication Engineering", "Mechanical Engineering", "Biomedical Engineering", "Information Technology", "Artificial Intelligence and Data Science", "Electrical And Electronics Engineering", "Chemical Engineering", "Civil Engineering", "Agricultural Engineering", "Computer Science and Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "The Kavery Engineering College - [TKEC] (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-078',
    name: 'Veerammal Engineering College (Coimbatore, Coimbatore)',
    location: 'Dindigul,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.0,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Electronics & Communication Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering", "Civil Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Veerammal Engineering College (Coimbatore, Coimbatore) is an engineering college located in Dindigul,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Dindigul,  Tamil Nadu"
    }
  },
  {
    id: 'clg-079',
    name: 'Velalar College of Engineering and Technology -[VCET] (Erode, Tamil Nadu)',
    location: 'Erode,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.23,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Computer Science And Engineering", "Artificial Intelligence and Data Science", "Electronics & Communication Engineering", "Biomedical Engineering", "Electrical And Electronics Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Mechanical Engineering", "Medical Electronics", "Civil Engineering"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "Velalar College of Engineering and Technology -[VCET] (Erode, Tamil Nadu) is an engineering college located in Erode,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Erode,  Tamil Nadu"
    }
  },
  {
    id: 'clg-080',
    name: 'VSA School of Engineering and School of Management (Salem, Tamil Nadu)',
    location: 'Salem,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 2.75,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Biomedical Engineering", "Electronics & Communication Engineering", "Computer Science And Engineering", "Electrical And Electronics Engineering", "Civil Engineering", "Information Technology"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "VSA School of Engineering and School of Management (Salem, Tamil Nadu) is an engineering college located in Salem,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Salem,  Tamil Nadu"
    }
  },
  {
    id: 'clg-081',
    name: 'VSB College of Engineering Technical Campus',
    location: 'Coimbatore,  Tamil Nadu',
    type: 'Private',
    ranking: 0,
    rating: 4.14,
    fees: {
      annual: 87000,
      total: 348000
    },
    courses: ["Mechanical Engineering", "Computer Science And Engineering", "Electronics & Communication Engineering", "Electrical And Electronics Engineering", "Agricultural Engineering", "Civil Engineering", "Information Technology", "Artificial Intelligence & Data Science"],
    streams: ["Engineering"],
    established: 0,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    description: "VSB College of Engineering Technical Campus is an engineering college located in Coimbatore,  Tamil Nadu.",
    facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Medical Center"],
    admissionProcess: "TNEA Counseling based on Class 12 marks",
    eligibility: ["12th with PCM"],
    placements: {
      averagePackage: 0,
      highestPackage: 0,
      placementRate: 0,
      topRecruiters: []
    },
    contact: {
      phone: "+91-00000-00000",
      email: "info@example.edu",
      website: "https://example.edu",
      address: "Coimbatore,  Tamil Nadu"
    }
  }
];

export const streams: Stream[] = [
  {
    id: 'str-001',
    name: 'Engineering',
    description: 'Engineering stream covers multiple disciplines such as Mechanical, Electrical, Civil, and Computer Science, focusing on design, innovation, and problem-solving in various industries.',
    icon: '⚙️',
    courses: ["B.E. Mechanical Engineering", "B.E. Computer Science"],
    careerOpportunities: ["Design Engineer", "Software Developer", "Project Manager", "Research Engineer"],
    averageSalary: 700000
  },
  {
    id: 'str-002',
    name: 'Technology',
    description: 'Technology stream emphasizes applied sciences and modern innovations, including Information Technology and emerging fields like AI and Data Science.',
    icon: '💻',
    courses: ["B.Tech Information Technology"],
    careerOpportunities: ["Software Engineer", "Data Scientist", "System Analyst", "AI Engineer"],
    averageSalary: 800000
  },
  {
    id: 'str-003',
    name: 'Medical',
    description: 'Healthcare and medical sciences for healing and research',
    icon: '🩺',
    courses: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm'],
    careerOpportunities: ['Doctor', 'Surgeon', 'Pharmacist', 'Medical Researcher'],
    averageSalary: 1200000
  },
  {
    id: 'str-004',
    name: 'Commerce',
    description: 'Business, finance, and commercial studies',
    icon: '💼',
    courses: ['B.Com', 'BBA', 'CA', 'CS', 'CMA'],
    careerOpportunities: ['Chartered Accountant', 'Financial Analyst', 'Business Manager', 'Investment Banker'],
    averageSalary: 600000
  },
  {
    id: 'str-005',
    name: 'Arts',
    description: 'Humanities, social sciences, and creative studies',
    icon: '🎨',
    courses: ['B.A English', 'B.A History', 'B.A Psychology', 'B.A Political Science'],
    careerOpportunities: ['Teacher', 'Writer', 'Psychologist', 'Civil Services'],
    averageSalary: 500000
  },
  {
    id: 'str-006',
    name: 'Science',
    description: 'Pure sciences and research-oriented programs',
    icon: '🔬',
    courses: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology'],
    careerOpportunities: ['Research Scientist', 'Lab Technician', 'Data Analyst', 'Teacher'],
    averageSalary: 550000
  },
  {
    id: 'str-007',
    name: 'Law',
    description: 'Legal studies and jurisprudence',
    icon: '⚖️',
    courses: ['LLB', 'BA LLB', 'LLM'],
    careerOpportunities: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Counsel'],
    averageSalary: 900000
  },
  {
    id: 'str-008',
    name: 'Engineering',
    description: 'Engineering disciplines including Computer Science, Electronics, Mechanical, Civil and allied fields.',
    icon: '⚙️',
    courses: ["Civil Engineering", "Electrical And Electronics Engineering", "Electronics & Communication Engineering", "Computer Science And Engineering", "Mechanical Engineering", "Mechatronics Engineering", "Artificial Intelligence & Data Science", "Computer Science and Business Systems", "Aerospace Engineering", "Chemical Engineering", "Computer And Communication Engineering", "Electrical And Computer Engineering", "Robotics and Automation", "Automobile Engineering", "Biomedical Engineering", "Information Technology", "Agricultural Engineering", "Artificial Intelligence and Data Science", "Aeronautical Engineering", "Electronics And Instrumentation Engineering", "Automobile Engineering (Discontinued)", "Computer Science and Design", "Information Science & Engineering", "Biotechnology", "Artificial Intelligence & Machine Learning", "Food Technology", "Fashion Technology", "Textile Technology (Discontinued)", "Computer Technology", "Cyber Security", "Advanced Communication Technology", "VLSI Design & Technology", "Petroleum Engineering", "Electrical & Communication Engineering", "Pharmaceutical Engineering", "Pharmaceutical Technology", "Computer Science and Business Systems (Discontinued)", "Petrochemical Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Electronics Engineering", "Food Process Engineering", "Computer Engineering - Cyber Security", "Mechanical Engineering - Artificial Intelligence and Machine Learning", "Biotechnology - Artificial Intelligence", "Robotics and Automation - Artificial Intelligence and Data Science", "Biotechnology - Genome Engineering and Technology", "Biomedical Engineering - Artificial Intelligence and Machine Learning", "Artificial Intelligence", "Robotics and Automation - Artificial Intelligence and Machine Learning", "Food Processing and Engineering - Internet of Things", "Aerospace Engineering - Unmanned Aerial Vehicles", "Computer Engineering", "Electronics and Communication Engineering-Internet of Things", "Electronics and Communication Engineering - Artificial Intelligence", "Electrical and Electronics Engineering - Artificial Intelligence and Machine Learning", "Aerospace Engineering - Artificial Intelligence and Machine Learning", "Biomedical Engineering - Data Science", "Biotechnology - Medical Biotechnology", "Civil Engineering - BIM and Digital Twin", "Civil Engineering - GIS and Remote Sensing", "Electrical and Electronics - Data Science", "Robotics and Automation - Artificial Intelligence", "Electronics and Computer Engineering", "Biotechnology And Biochemical Engineering", "Medical Electronics", "Internet of Things", "Mechatronics", "Computer Science and Engineering (Artificial Intelligence & Machine Learning)", "Geo Informatics", "Textile Technology", "Innovative Textiles", "Electrical Engineering", "Data Science and Artificial Intelligence", "Printing Technology", "Computer Science and Technology", "Internet of Things & Cyber Security Including Blockchain Technology", "Biomedical and Robotics Engineering", "Instrumentation & Control Engineering", "Information Technology & Engineering"],
    careerOpportunities: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Data Scientist"],
    averageSalary: 600000
  }
];

export const courses: Course[] = [
  {
    id: 'crs-001',
    name: "B.E. Mechanical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-001"],
    eligibility: ["10+2 with PCM", "TNEA Counseling"],
    averageFees: 50000,
    scope: ["Automobile Industry", "Manufacturing", "Robotics", "Research"]
  },
  {
    id: 'crs-002',
    name: "B.E. Computer Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-001"],
    eligibility: ["10+2 with PCM", "TNEA Counseling"],
    averageFees: 55000,
    scope: ["Software Development", "Cybersecurity", "Cloud Computing", "Artificial Intelligence"]
  },
  {
    id: 'crs-003',
    name: "B.Tech Information Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Technology",
    colleges: ["clg-001"],
    eligibility: ["10+2 with PCM", "TNEA Counseling"],
    averageFees: 60000,
    scope: ["IT Services", "Product Development", "Data Analytics", "Machine Learning"]
  },
  {
    id: 'crs-004',
    name: 'B.Tech Computer Science',
    duration: '4 years',
    type: 'Undergraduate',
    stream: 'Engineering',
    colleges: ['clg-006', 'clg-009'],
    eligibility: ['12th with PCM', 'JEE Main qualification'],
    averageFees: 400000,
    scope: ['Software Development', 'Data Science', 'Artificial Intelligence', 'Cybersecurity']
  },
  {
    id: 'crs-005',
    name: 'MBBS',
    duration: '5.5 years',
    type: 'Undergraduate',
    stream: 'Medical',
    colleges: ['clg-007'],
    eligibility: ['12th with PCB', 'NEET qualification'],
    averageFees: 750000,
    scope: ['General Practice', 'Specialization', 'Surgery', 'Research']
  },
  {
    id: 'crs-006',
    name: 'B.Com',
    duration: '3 years',
    type: 'Undergraduate',
    stream: 'Commerce',
    colleges: ['clg-008', 'clg-009'],
    eligibility: ['12th from any stream'],
    averageFees: 150000,
    scope: ['Accounting', 'Banking', 'Finance', 'Taxation']
  },
  {
    id: 'crs-007',
    name: 'B.A English',
    duration: '3 years',
    type: 'Undergraduate',
    stream: 'Arts',
    colleges: ['clg-008', 'clg-009'],
    eligibility: ['12th from any stream'],
    averageFees: 120000,
    scope: ['Teaching', 'Journalism', 'Content Writing', 'Translation']
  },
  {
    id: 'crs-008',
    name: "Civil Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-006", "clg-007", "clg-008", "clg-009", "clg-010", "clg-012", "clg-013", "clg-014", "clg-015", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-022", "clg-023", "clg-024", "clg-026", "clg-027", "clg-028", "clg-031", "clg-033", "clg-035", "clg-036", "clg-037", "clg-038", "clg-039", "clg-041", "clg-043", "clg-044", "clg-045", "clg-046", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-057", "clg-058", "clg-060", "clg-061", "clg-062", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-069", "clg-070", "clg-071", "clg-072", "clg-073", "clg-074", "clg-075", "clg-076", "clg-077", "clg-078", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 326839,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-009',
    name: "Electrical And Electronics Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-006", "clg-007", "clg-008", "clg-009", "clg-010", "clg-011", "clg-012", "clg-013", "clg-014", "clg-015", "clg-016", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-022", "clg-023", "clg-024", "clg-025", "clg-026", "clg-027", "clg-028", "clg-029", "clg-030", "clg-031", "clg-032", "clg-033", "clg-034", "clg-035", "clg-036", "clg-037", "clg-038", "clg-039", "clg-040", "clg-041", "clg-042", "clg-043", "clg-044", "clg-045", "clg-046", "clg-047", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-057", "clg-058", "clg-059", "clg-060", "clg-061", "clg-062", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-068", "clg-069", "clg-070", "clg-071", "clg-072", "clg-073", "clg-074", "clg-075", "clg-076", "clg-077", "clg-078", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 304161,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-010',
    name: "Electronics & Communication Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-006", "clg-007", "clg-008", "clg-009", "clg-010", "clg-011", "clg-012", "clg-013", "clg-014", "clg-015", "clg-016", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-022", "clg-023", "clg-024", "clg-025", "clg-026", "clg-027", "clg-028", "clg-029", "clg-030", "clg-031", "clg-032", "clg-033", "clg-034", "clg-035", "clg-036", "clg-037", "clg-038", "clg-039", "clg-040", "clg-041", "clg-042", "clg-043", "clg-044", "clg-045", "clg-046", "clg-047", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-057", "clg-058", "clg-059", "clg-060", "clg-061", "clg-062", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-068", "clg-069", "clg-070", "clg-071", "clg-072", "clg-073", "clg-074", "clg-075", "clg-076", "clg-077", "clg-078", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 333531,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-011',
    name: "Computer Science And Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-006", "clg-007", "clg-008", "clg-009", "clg-010", "clg-011", "clg-012", "clg-013", "clg-014", "clg-015", "clg-016", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-022", "clg-023", "clg-024", "clg-025", "clg-026", "clg-027", "clg-028", "clg-029", "clg-030", "clg-031", "clg-032", "clg-033", "clg-034", "clg-035", "clg-036", "clg-037", "clg-038", "clg-039", "clg-040", "clg-041", "clg-042", "clg-043", "clg-044", "clg-045", "clg-046", "clg-047", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-057", "clg-058", "clg-059", "clg-060", "clg-061", "clg-062", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-068", "clg-069", "clg-070", "clg-071", "clg-072", "clg-073", "clg-074", "clg-075", "clg-076", "clg-077", "clg-078", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 340429,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-012',
    name: "Mechanical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-006", "clg-007", "clg-008", "clg-010", "clg-011", "clg-012", "clg-013", "clg-014", "clg-015", "clg-016", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-022", "clg-023", "clg-024", "clg-025", "clg-026", "clg-027", "clg-028", "clg-029", "clg-030", "clg-031", "clg-032", "clg-033", "clg-034", "clg-035", "clg-036", "clg-037", "clg-038", "clg-039", "clg-040", "clg-041", "clg-042", "clg-043", "clg-044", "clg-045", "clg-046", "clg-047", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-057", "clg-058", "clg-059", "clg-060", "clg-061", "clg-062", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-068", "clg-069", "clg-070", "clg-071", "clg-072", "clg-073", "clg-074", "clg-075", "clg-076", "clg-077", "clg-078", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 333557,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-013',
    name: "Mechatronics Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-013", "clg-017", "clg-022", "clg-028", "clg-037", "clg-038", "clg-041", "clg-043", "clg-049", "clg-059", "clg-062", "clg-067", "clg-073"],
    eligibility: ["12th with PCM"],
    averageFees: 399461,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-014',
    name: "Artificial Intelligence & Data Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-007", "clg-010", "clg-012", "clg-013", "clg-015", "clg-016", "clg-017", "clg-018", "clg-020", "clg-021", "clg-023", "clg-025", "clg-026", "clg-029", "clg-030", "clg-031", "clg-032", "clg-035", "clg-036", "clg-037", "clg-038", "clg-041", "clg-043", "clg-044", "clg-045", "clg-046", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-056", "clg-057", "clg-058", "clg-060", "clg-061", "clg-063", "clg-065", "clg-066", "clg-067", "clg-069", "clg-070", "clg-071", "clg-073", "clg-074", "clg-075", "clg-076", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 319234,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-015',
    name: "Computer Science and Business Systems",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-007", "clg-013", "clg-018", "clg-023", "clg-028", "clg-030", "clg-031", "clg-035", "clg-036", "clg-038", "clg-044", "clg-045", "clg-051", "clg-056", "clg-061", "clg-065", "clg-070"],
    eligibility: ["12th with PCM"],
    averageFees: 276033,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-016',
    name: "Aerospace Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-032", "clg-037", "clg-043", "clg-049", "clg-063"],
    eligibility: ["12th with PCM"],
    averageFees: 1277000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-017',
    name: "Chemical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-018", "clg-021", "clg-023", "clg-037", "clg-038", "clg-044", "clg-045", "clg-070", "clg-071", "clg-077"],
    eligibility: ["12th with PCM"],
    averageFees: 406900,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-018',
    name: "Computer And Communication Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-033", "clg-061"],
    eligibility: ["12th with PCM"],
    averageFees: 443333,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-019',
    name: "Electrical And Computer Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-047"],
    eligibility: ["12th with PCM"],
    averageFees: 1640000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-020',
    name: "Robotics and Automation",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-015", "clg-017", "clg-022", "clg-025", "clg-030", "clg-032", "clg-037", "clg-043", "clg-049", "clg-059", "clg-063", "clg-068"],
    eligibility: ["12th with PCM"],
    averageFees: 586850,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-021',
    name: "Automobile Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-010", "clg-017", "clg-023", "clg-024", "clg-029", "clg-037", "clg-052", "clg-070"],
    eligibility: ["12th with PCM"],
    averageFees: 432040,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-022',
    name: "Biomedical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-010", "clg-011", "clg-012", "clg-013", "clg-015", "clg-016", "clg-017", "clg-020", "clg-021", "clg-023", "clg-030", "clg-032", "clg-034", "clg-038", "clg-041", "clg-044", "clg-045", "clg-049", "clg-051", "clg-054", "clg-056", "clg-058", "clg-063", "clg-065", "clg-066", "clg-069", "clg-070", "clg-071", "clg-074", "clg-075", "clg-078", "clg-080"],
    eligibility: ["12th with PCM"],
    averageFees: 353680,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-023',
    name: "Information Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-010", "clg-011", "clg-012", "clg-013", "clg-014", "clg-015", "clg-017", "clg-018", "clg-019", "clg-020", "clg-021", "clg-023", "clg-024", "clg-025", "clg-026", "clg-031", "clg-034", "clg-035", "clg-036", "clg-037", "clg-038", "clg-041", "clg-043", "clg-044", "clg-045", "clg-046", "clg-048", "clg-049", "clg-050", "clg-051", "clg-053", "clg-054", "clg-055", "clg-056", "clg-058", "clg-059", "clg-060", "clg-061", "clg-063", "clg-064", "clg-065", "clg-066", "clg-067", "clg-068", "clg-069", "clg-070", "clg-072", "clg-075", "clg-076", "clg-077", "clg-079", "clg-080"],
    eligibility: ["12th with PCM"],
    averageFees: 299563,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-024',
    name: "Agricultural Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-011", "clg-013", "clg-016", "clg-020", "clg-021", "clg-023", "clg-030", "clg-037", "clg-038", "clg-041", "clg-044", "clg-045", "clg-049", "clg-051", "clg-056", "clg-065", "clg-066", "clg-068", "clg-070", "clg-071", "clg-072", "clg-076"],
    eligibility: ["12th with PCM"],
    averageFees: 303777,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-025',
    name: "Artificial Intelligence and Data Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-011", "clg-014", "clg-034", "clg-041", "clg-045", "clg-046", "clg-049", "clg-050", "clg-054", "clg-056", "clg-057", "clg-058", "clg-060", "clg-061", "clg-063", "clg-065", "clg-066", "clg-067", "clg-069", "clg-070", "clg-071", "clg-073", "clg-074", "clg-075", "clg-076", "clg-079", "clg-080", "clg-081"],
    eligibility: ["12th with PCM"],
    averageFees: 332363,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-026',
    name: "Aeronautical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-008", "clg-023", "clg-024", "clg-030", "clg-043", "clg-049", "clg-063"],
    eligibility: ["12th with PCM"],
    averageFees: 328000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-027',
    name: "Electronics And Instrumentation Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-017", "clg-021", "clg-023", "clg-037", "clg-063"],
    eligibility: ["12th with PCM"],
    averageFees: 377333,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-028',
    name: "Automobile Engineering (Discontinued)",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013"],
    eligibility: ["12th with PCM"],
    averageFees: 300000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-029',
    name: "Computer Science and Design",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-021", "clg-037", "clg-059", "clg-062"],
    eligibility: ["12th with PCM"],
    averageFees: 257600,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-030',
    name: "Information Science & Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013"],
    eligibility: ["12th with PCM"],
    averageFees: 300000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-031',
    name: "Biotechnology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-021", "clg-029", "clg-030", "clg-032", "clg-042", "clg-044", "clg-054", "clg-058", "clg-065", "clg-070"],
    eligibility: ["12th with PCM"],
    averageFees: 366600,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-032',
    name: "Artificial Intelligence & Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-017", "clg-020", "clg-023", "clg-032", "clg-037", "clg-038", "clg-051", "clg-056", "clg-058", "clg-060", "clg-061", "clg-065", "clg-067", "clg-074", "clg-079"],
    eligibility: ["12th with PCM"],
    averageFees: 385257,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-033',
    name: "Food Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-015", "clg-016", "clg-023", "clg-029", "clg-037", "clg-056", "clg-065"],
    eligibility: ["12th with PCM"],
    averageFees: 281100,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-034',
    name: "Fashion Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013", "clg-026"],
    eligibility: ["12th with PCM"],
    averageFees: 250000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-035',
    name: "Textile Technology (Discontinued)",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013"],
    eligibility: ["12th with PCM"],
    averageFees: 300000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-036',
    name: "Computer Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-013"],
    eligibility: ["12th with PCM"],
    averageFees: 300000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-037',
    name: "Cyber Security",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-017", "clg-018", "clg-020", "clg-021", "clg-023", "clg-025", "clg-030", "clg-032", "clg-035", "clg-038", "clg-041", "clg-044", "clg-045", "clg-048", "clg-058", "clg-061", "clg-062", "clg-065", "clg-066", "clg-069"],
    eligibility: ["12th with PCM"],
    averageFees: 370023,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-038',
    name: "Advanced Communication Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-017"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-039',
    name: "VLSI Design & Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-017", "clg-030", "clg-044"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-040',
    name: "Petroleum Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-020", "clg-029"],
    eligibility: ["12th with PCM"],
    averageFees: 284000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-041',
    name: "Electrical & Communication Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-022"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-042',
    name: "Pharmaceutical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-024"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-043',
    name: "Pharmaceutical Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-024", "clg-058"],
    eligibility: ["12th with PCM"],
    averageFees: 284000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-044',
    name: "Computer Science and Business Systems (Discontinued)",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-028"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-045',
    name: "Petrochemical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-029", "clg-053"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-046',
    name: "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-030", "clg-033", "clg-035", "clg-044", "clg-062", "clg-074"],
    eligibility: ["12th with PCM"],
    averageFees: 305200,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-047',
    name: "Electronics Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-030"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-048',
    name: "Food Process Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-049',
    name: "Computer Engineering - Cyber Security",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1214000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-050',
    name: "Mechanical Engineering - Artificial Intelligence and Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-051',
    name: "Biotechnology - Artificial Intelligence",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-052',
    name: "Robotics and Automation - Artificial Intelligence and Data Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-053',
    name: "Biotechnology - Genome Engineering and Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-054',
    name: "Biomedical Engineering - Artificial Intelligence and Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-055',
    name: "Artificial Intelligence",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1214000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-056',
    name: "Robotics and Automation - Artificial Intelligence and Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-057',
    name: "Food Processing and Engineering - Internet of Things",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-058',
    name: "Aerospace Engineering - Unmanned Aerial Vehicles",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-059',
    name: "Computer Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1214000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-060',
    name: "Electronics and Communication Engineering-Internet of Things",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1214000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-061',
    name: "Electronics and Communication Engineering - Artificial Intelligence",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1214000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-062',
    name: "Electrical and Electronics Engineering - Artificial Intelligence and Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-063',
    name: "Aerospace Engineering - Artificial Intelligence and Machine Learning",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-064',
    name: "Biomedical Engineering - Data Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-065',
    name: "Biotechnology - Medical Biotechnology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-066',
    name: "Civil Engineering - BIM and Digital Twin",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-067',
    name: "Civil Engineering - GIS and Remote Sensing",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-068',
    name: "Electrical and Electronics - Data Science",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 974000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-069',
    name: "Robotics and Automation - Artificial Intelligence",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-032"],
    eligibility: ["12th with PCM"],
    averageFees: 1114000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-070',
    name: "Electronics and Computer Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-036"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-071',
    name: "Biotechnology And Biochemical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-042"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-072',
    name: "Medical Electronics",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-044", "clg-074"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-073',
    name: "Internet of Things",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-045", "clg-056", "clg-062"],
    eligibility: ["12th with PCM"],
    averageFees: 424000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-074',
    name: "Mechatronics",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-047"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-075',
    name: "Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-047"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-076',
    name: "Geo Informatics",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-049"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-077',
    name: "Textile Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-049"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-078',
    name: "Innovative Textiles",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-052"],
    eligibility: ["12th with PCM"],
    averageFees: 906240,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-079',
    name: "Electrical Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-052"],
    eligibility: ["12th with PCM"],
    averageFees: 1680320,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-080',
    name: "Data Science and Artificial Intelligence",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-054"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-081',
    name: "Printing Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-056"],
    eligibility: ["12th with PCM"],
    averageFees: 148000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-082',
    name: "Computer Science and Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-059", "clg-072"],
    eligibility: ["12th with PCM"],
    averageFees: 274000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-083',
    name: "Internet of Things & Cyber Security Including Blockchain Technology",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-059"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-084',
    name: "Biomedical and Robotics Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-059"],
    eligibility: ["12th with PCM"],
    averageFees: 200000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-085',
    name: "Instrumentation & Control Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-070"],
    eligibility: ["12th with PCM"],
    averageFees: 220000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  },
  {
    id: 'crs-086',
    name: "Information Technology & Engineering",
    duration: "4 years",
    type: "Undergraduate",
    stream: "Engineering",
    colleges: ["clg-071"],
    eligibility: ["12th with PCM"],
    averageFees: 348000,
    scope: ["Industry", "Research", "Higher Studies", "Entrepreneurship"]
  }
];
