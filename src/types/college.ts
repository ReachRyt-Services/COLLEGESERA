// College data structure for the Collegesera platform
export interface College {
  id: string;
  college_id: string;
  slug: string;
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
    studentsPlaced?: number; // Added based on the new database schema
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

export interface PredictionFilters {
  marks: number;
  category: string;
  preferredDistrict?: string;
  collegeType?: string[];
  branches?: string[];
}
