import { supabase, getSupabaseClient } from '@/lib/supabaseClient';
import { DatabaseCollege, DatabaseBranch, DatabaseCutoffData, Course, Placement, Ranking, AdmissionProcess, DegreeSummary, CourseFeeDetail, DatabaseAdvertisement } from "@/types/database";
import { sanitizeInput, isValidSlug } from "@/utils/security";
import { INDIAN_STATES } from "@/data/constants";

// Helper for fuzzy matching states (case-insensitive, ignore spaces)
const findMatchingState = (value: string): string | undefined => {
  if (!value) return undefined;
  const normalizedValue = value.toLowerCase().replace(/\s+/g, '');
  return INDIAN_STATES.find(state =>
    state.toLowerCase().replace(/\s+/g, '') === normalizedValue
  );
};

// Helper function to map Supabase data to DatabaseCollege interface
// Note: Supabase returns data in snake_case by default, so we map it to camelCase
const mapSupabaseCollegeToDatabaseCollege = (college: any): DatabaseCollege => {
  return {
    id: college.id,
    college_id: college.college_id,
    name: college.name,
    slug: college.slug,
    location: college.location,
    district: college.district,
    type: college.type,
    type_collwge: college.type_collwge, // Added mapping for the new field
    naac_grade: college.naac_grade,
    established: college.established,
    website: college.website,
    facilities: college.facilities,
    featured: college.featured,
    featured_priority: college.featured_priority || 0, // Added mapping
    homepage_featured: college.homepage_featured,
    display_order: college.display_order,
    image_url: college.image_url,
    college_logo: college.college_logo, // Mapped college_logo
    brochure_file: college.brochure_file, // Mapped brochure_file
    principal_name: college.principal_name,
    email: college.email,
    phone: college.phone,
    address: college.address,
    description: college.description,
    created_at: college.created_at,
    updated_at: college.updated_at,
    courses: college.courses,
    placements: college.placements,
    rankings: college.rankings,
    admission_process: college.admission_process,
    fee_structures: college.fee_structures, // Mapped fee_structures
    highlights: college.highlights, // Mapped highlights (jsonb)
  };
};

export async function getColleges(token?: string): Promise<DatabaseCollege[]> {
  try {
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('colleges')
      .select('*, courses(*), placements(*), rankings(*), admission_process(*)')
      .order('featured', { ascending: false })
      .order('featured_priority', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    // Map Supabase data to DatabaseCollege interface
    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getColleges:', error.message);
    throw error;
  }
}

export async function getFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('featured', true);

    if (error) throw error;
    if (!data) return [];

    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getFeaturedColleges:', error.message);
    throw error;
  }
}

export async function getHomepageFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('homepage_featured', true)
      .limit(9);

    if (error) throw error;
    if (!data) return [];

    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getHomepageFeaturedColleges:', error.message);
    throw error;
  }
}

export async function getCollegeBySlug(slug: string): Promise<DatabaseCollege | null> {
  try {
    // Validate and sanitize the slug input
    if (!isValidSlug(slug)) {
      return null;
    }

    const sanitizedSlug = sanitizeInput(slug);

    // 1. Try exact match on slug
    let { data, error } = await supabase
      .from('colleges')
      .select(`
        *,
        courses (*),
        placements (*),
        rankings (*),
        admission_process (*),
        fee_structures (
          *,
          components: fee_components(*)
        ),
        highlights
      `)
      .eq('slug', sanitizedSlug)
      .maybeSingle();

    // 2. If not found and slug has no numeric prefix, try matching colleges with legacy numeric prefix (e.g. 2011-slug)
    if (!data && !/^\d+-/.test(sanitizedSlug)) {
      const { data: prefixMatches } = await supabase
        .from('colleges')
        .select(`
          *,
          courses (*),
          placements (*),
          rankings (*),
          admission_process (*),
          fee_structures (
            *,
            components: fee_components(*)
          ),
          highlights
        `)
        .ilike('slug', `%-${sanitizedSlug}`)
        .limit(1);

      if (prefixMatches && prefixMatches.length > 0) {
        data = prefixMatches[0];
      }
    }

    // 3. If not found and slug has a numeric prefix, strip prefix and try exact match
    if (!data && /^\d+-/.test(sanitizedSlug)) {
      const cleanSlug = sanitizedSlug.replace(/^\d+-/, '');
      const { data: cleanMatch } = await supabase
        .from('colleges')
        .select(`
          *,
          courses (*),
          placements (*),
          rankings (*),
          admission_process (*),
          fee_structures (
            *,
            components: fee_components(*)
          ),
          highlights
        `)
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (cleanMatch) {
        data = cleanMatch;
      }
    }

    if (!data) {
      return null;
    }

    // Fetch SEO Overrides (check sanitizedSlug, stripped slug, or actual record slug)
    const cleanSlug = sanitizedSlug.replace(/^\d+-/, '');
    const { data: seoData } = await supabase
      .from('sitemap_entries')
      .select('seo_title, seo_description, og_image')
      .or(`slug.eq.${sanitizedSlug},slug.eq.${cleanSlug},slug.eq.${data.slug || ''}`)
      .limit(1)
      .maybeSingle();

    const collegeData = mapSupabaseCollegeToDatabaseCollege(data);
    
    // Attach SEO overrides if they exist
    if (seoData) {
      (collegeData as any).seo_title = seoData.seo_title;
      (collegeData as any).seo_description = seoData.seo_description;
      (collegeData as any).og_image = seoData.og_image;
    }

    return collegeData;
  } catch (error: any) {
    return null;
  }
}

export async function getBranches(): Promise<DatabaseBranch[]> {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*');

    if (error) throw error;
    if (!data) return [];

    // Assuming Supabase returns data compatible with DatabaseBranch or needs mapping
    // For now, returning as is, assuming structure matches or is handled by frontend
    return data as DatabaseBranch[];
  } catch (error: any) {
    console.error('Service error in getBranches:', error.message);
    throw error;
  }
}

export async function getCutoffData(): Promise<DatabaseCutoffData[]> {
  try {
    const { data, error } = await supabase
      .from('cutoffdata')
      .select('*');

    if (error) throw error;
    if (!data) return [];

    // Assuming Supabase returns data compatible with DatabaseCutoffData or needs mapping
    return data as DatabaseCutoffData[];
  } catch (error: any) {
    console.error('Service error in getCutoffData:', error.message);
    throw error;
  }
}

export async function getCutoffDataForCollege(collegeId: string): Promise<DatabaseCutoffData[]> {
  try {
    const { data, error } = await supabase
      .from('cutoffdata')
      .select('*')
      .eq('college_id', collegeId);

    if (error) throw error;
    if (!data) return [];

    return data as DatabaseCutoffData[];
  } catch (error: any) {
    console.error('Service error in getCutoffDataForCollege:', error.message);
    return [];
  }
}

export async function getCollegeTypes(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('type_collwge');

    if (error) throw error;
    if (!data) return [];

    // Deduplicate case-insensitively, but keep original casing of first occurrence
    const seen = new Set<string>();
    const types: string[] = [];
    for (const college of data) {
      const raw = college.type_collwge?.trim();
      if (!raw) continue;
      const key = raw.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        // Title-case for display (e.g. "arts & science" → "Arts & Science")
        types.push(raw.replace(/\b\w/g, (c) => c.toUpperCase()));
      }
    }

    return types.sort();
  } catch (error: any) {
    console.error('Service error in getCollegeTypes:', error.message);
    throw error;
  }
}

export async function getCollegeLocations(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('district');

    if (error) throw error;
    if (!data) return [];

    // Normalize: Split by comma and take the FIRST part for District/City
    // Filter out values that are States (user request: only districts in district filter)
    const locations = data.map(college => {
      const parts = college.district?.split(',') || [];
      const val = parts.length > 0 ? parts[0].trim() : college.district;

      if (!val) return null;
      // If matches a state (fuzzy), exclude it
      return findMatchingState(val) ? null : val;
    }).filter(Boolean) as string[];

    // Deduplicate
    const uniqueLocations = [...new Set(locations)].sort();

    return uniqueLocations;
  } catch (error: any) {
    console.error('Service error in getCollegeLocations:', error.message);
    throw error;
  }
}

export async function getCollegeStates(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('location');

    if (error) throw error;
    if (!data) return [];

    // Normalize: Split by comma and take the LAST part for State
    // Filter strictly to include ONLY valid Indian States
    const states = data.map(college => {
      const parts = college.location?.split(',') || [];
      const val = parts.length > 0 ? parts[parts.length - 1].trim() : college.location;

      if (!val) return null;
      // Return canonical state name if fuzzy matched, else null (exclude)
      return findMatchingState(val) || null;
    }).filter(Boolean) as string[]; // Filter out nulls

    // Deduplicate
    const uniqueStates = [...new Set(states)].sort();

    return uniqueStates;
  } catch (error: any) {
    console.error('Service error in getCollegeStates:', error.message);
    throw error;
  }
}

export async function getDegreeSummaryForCollege(collegeId: string): Promise<DegreeSummary[]> {
  try {
    const { data, error } = await supabase.rpc('get_degree_summary_for_college', { college_id_param: collegeId });

    if (error) throw error;
    if (!data) return [];

    return data as DegreeSummary[];
  } catch (error: any) {
    console.error('Service error in getDegreeSummaryForCollege:', error.message);
    throw error;
  }
}

export async function getCoursesAndFeesForDegree(collegeId: string, degreeType: string): Promise<CourseFeeDetail[]> {
  try {
    const { data, error } = await supabase.rpc('get_courses_and_fees_for_degree', {
      college_id_param: collegeId,
      degree_type_param: degreeType
    });

    if (error) throw error;
    if (!data) return [];

    return data as CourseFeeDetail[];
  } catch (error: any) {
    console.error('Service error in getCoursesAndFeesForDegree:', error.message);
    throw error;
  }
}
export async function getAds(placement: string): Promise<DatabaseAdvertisement[]> {
  try {
    const { data, error } = await supabase
      .from('ad_placements')
      .select('*')
      .eq('placement_area', placement)
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) throw error;
    return (data || []) as DatabaseAdvertisement[];
  } catch (error: any) {
    console.error('Service error in getAds:', error.message);
    return [];
  }
}

export async function updateCollege(id: string, updates: Partial<DatabaseCollege>, token?: string): Promise<DatabaseCollege | null> {
  try {
    const client = getSupabaseClient(token);
    const { data, error } = await client
      .from('colleges')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return null;

    return mapSupabaseCollegeToDatabaseCollege(data);
  } catch (error: any) {
    console.error('Service error in updateCollege:', error.message);
    throw error;
  }
}
