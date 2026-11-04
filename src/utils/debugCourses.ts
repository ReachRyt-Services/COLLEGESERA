import { supabase } from '@/lib/supabaseClient';

// Run this from browser console: import('/src/utils/debugCourses.ts').then(m => m.debugCourses())
export async function debugCourses(collegeSlug?: string) {
  // 1. Check all distinct degree_type values in courses table
  const { data: degreeTypes, error: dtError } = await supabase
    .from('courses')
    .select('degree_type, name')
    .limit(100);

  console.group('📚 Courses table - degree_type values');
  if (dtError) console.error(dtError);
  else {
    const map: Record<string, string[]> = {};
    degreeTypes?.forEach(c => {
      const key = c.degree_type || '(null/empty)';
      if (!map[key]) map[key] = [];
      map[key].push(c.name);
    });
    console.table(Object.entries(map).map(([type, names]) => ({
      degree_type: type,
      count: names.length,
      examples: names.slice(0, 3).join(', ')
    })));
  }
  console.groupEnd();

  // 2. If slug provided, check that college's courses
  if (collegeSlug) {
    const { data: college } = await supabase
      .from('colleges')
      .select('id, name, courses(*), fee_structures(*, components: fee_components(*))')
      .eq('slug', collegeSlug)
      .single();
    
    console.group(`🏫 College: ${college?.name}`);
    console.log('Total courses:', college?.courses?.length);
    console.log('Fee structures:', college?.fee_structures?.length);
    console.table(college?.courses?.map((c: any) => ({
      id: c.id.substring(0, 8),
      name: c.name,
      degree_type: c.degree_type || '(empty)',
      duration: c.duration,
    })));
    console.groupEnd();
  }

  return 'Debug complete - check console';
}
