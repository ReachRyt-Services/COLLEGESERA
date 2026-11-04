export interface Program {
  id: string;
  code?: string;
  name: string;
  level: string;
  degree_type?: string;
  created_at: string;
}

export interface Course {
  id: string;
  college_id?: string;
  name: string;                   // Degree name: B.E, MBA, B.Sc etc.
  specialization?: string | null; // Branch: Computer Science, Mechanical etc.
  duration?: string;
  eligibility?: string;
  selection_basis?: string;
  intake_seats?: number | null;   // Sanctioned intake capacity
  created_at: string;
  program_id?: string;            // Foreign key to programs table
  degree_type?: string;           // Study mode: FULL TIME / REGULAR / PART TIME
}

export interface Placement {
  id: string;
  college_id: string;
  year: number;
  min_salary?: string | null;
  max_salary?: string | null;
  average_salary?: string | null;
  recruiters?: string[] | null;
  created_at: string;
}

export interface Ranking {
  id: string;
  college_id: string;
  agency: string;
  year: number;
  rank: string;
  created_at: string;
}

export interface AdmissionProcess {
  id: string;
  college_id: string;
  admission_basis: string;
  online_application_steps: string[];
  offline_application_steps: string[];
  updated_at: string;
}

// New interfaces for Fee Structure and Fee Components
export type FeeComponentFrequency = 'one_time' | 'per_semester' | 'per_year' | 'per_term' | 'per_program';

export interface FeeComponent {
  id: string;
  structure_id: string;
  component_name: string;
  frequency: FeeComponentFrequency;
  semester?: number | null;
  amount: string; // numeric in DB, string for precision
  currency: string;
  is_mandatory: boolean;
  notes?: string | null;
  created_at: string;
}

export interface FeeStructure {
  id: string;
  college_id: string;
  program_id: string;
  course_id?: string; // Added as per DB assumption
  quota: string;
  entry_type: string;
  eligibility?: string; // Added as per DB assumption
  application_start_date?: string | null; // Added as per DB assumption
  application_end_date?: string | null;   // Added as per DB assumption
  effective_from?: string | null; // date in DB, string for ISO format
  effective_to?: string | null;   // date in DB, string for ISO format
  notes?: string | null;
  created_at: string;
  components?: FeeComponent[]; // To hold associated components
}

export interface DatabaseCollege {
  id: string;
  college_id: string;
  name: string;
  slug: string;
  location: string;
  district: string;
  type: string;
  type_collwge: string; // Added this line
  naac_grade?: string;
  established: number;
  website?: string;
  facilities: string[];
  featured: boolean;
  featured_priority: number; // Added for monetization
  homepage_featured: boolean;
  display_order: number;
  image_url?: string;
  college_logo?: string;
  brochure_file?: string; // Mapped brochure_file
  principal_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  description?: string;
  courses?: Course[];
  placements?: Placement[];
  rankings?: Ranking[];
  admission_process?: AdmissionProcess;
  fee_structures?: FeeStructure[]; // Added to hold fee data
  highlights?: any[] | null; // jsonb array from DB — can be string[] or [{label, value}]
  ranking?: number;
}

export interface DatabaseBranch {
  id: string;
  name: string;
  code: string;
  duration: string;
  created_at: string;
}

export interface DatabaseCutoffData {
  id: string;
  college_id: string;
  branch_id: string;
  year: number;
  category: string;
  cutoff_mark: number;
  opening_rank?: number;
  closing_rank?: number;
  created_at: string;
}

export interface DatabaseAdvertisement {
  id: string;
  title: string;
  image_url: string;
  link_url: string; // Renamed from target_url to match SQL
  placement_area: 'sidebar' | 'list_feed' | 'home_hero' | 'college_top' | 'college_bottom' | 'college_feed'; // Renamed from placement
  priority: number; // Added
  max_display_count?: number; // Added for feed repetition control
  is_active: boolean;
  clicks: number;
  impressions: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserBookmark {
  id: string;
  user_id: string;
  college_id: string;
  branch_id: string;
  created_at: string;
}

export interface DatabaseUserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  preferred_district?: string;
  tnea_marks?: number;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSearchAnalytics {
  id: string;
  user_id?: string;
  marks: number;
  category: string;
  preferred_district?: string;
  college_types?: string[];
  branches?: string[];
  results_count: number;
  session_id?: string;
  created_at: string;
}

export interface DatabasePageView {
  id: string;
  page_path: string;
  user_id?: string;
  session_id?: string;
  device_type?: string;
  referrer?: string;
  created_at: string;
}

export interface DatabaseAdminUser {
  id: string;
  user_id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  created_by: string | null;
}

export interface DatabaseAdminSession {
  id: string;
  admin_user_id: string;
  session_token: string;
  expires_at: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface DatabaseAdminActivityLog {
  id: string;
  admin_user_id: string;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface DatabaseArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: string;
  college_id?: string; // Link to a specific college
  tags?: string[];
  status: string;
  featured: boolean;
  featured_image?: string;
  meta_description?: string;
  article_label?: string;
  author_id: string;
  views: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseHomepageContent {
  id: string;
  section_name: string;
  title: string;
  content: any;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseHomepageArticle {
  id: string;
  article_id: string;
  position: number;
  section: string;
  is_active: boolean;
  created_at: string;
}

export interface DatabaseCrmContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  contact_type: string;
  source?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface DatabaseCrmLead {
  id: string;
  contact_id?: string;
  lead_source?: string;
  status: string;
  priority: string;
  interested_colleges?: string[];
  preferred_branches?: string[];
  tnea_marks?: number;
  category?: string;
  preferred_district?: string;
  expected_admission_year?: number;
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  last_contacted?: string;
}

export interface DatabaseCrmInteraction {
  id: string;
  contact_id?: string;
  lead_id?: string;
  interaction_type: string;
  subject?: string;
  description?: string;
  outcome?: string;
  next_action?: string;
  next_action_date?: string;
  created_by?: string;
  created_at: string;
}

export interface DatabaseAnalyticsDailyStats {
  id: string;
  date: string;
  total_page_views: number;
  unique_visitors: number;
  total_searches: number;
  ad_clicks: number;
  ad_impressions: number;
  bounce_rate: number;
  avg_session_duration: number;
  created_at: string;
  updated_at: string;
}

export interface DegreeSummary {
  degree_type: string;
  courses_count: number;
  min_tuition: number | null;
  max_tuition: number | null;
  earliest_application_start: string | null;
  latest_application_end: string | null;
  eligibility_summary: string | null;
}

export interface CourseFeeDetail {
  course_id: string;
  course_name: string;
  degree_type: string;
  structure_id: string;
  quota: string;
  entry_type: string;
  eligibility: string | null;
  application_start_date: string | null;
  application_end_date: string | null;
  total_first_year: number | null;
  total_per_semester: number | null;
}
