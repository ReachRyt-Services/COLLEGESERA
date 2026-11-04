
import { DatabaseCollege, DatabaseBranch, DatabaseCutoffData } from "@/types/database";
import { CollegeWithCutoff, PredictionFilters } from "@/types/college";

export function calculateProbability(userMarks: number, cutoffData: DatabaseCutoffData[]): {
  probability: "high" | "medium" | "low";
  probabilityScore: number;
} {
  if (!cutoffData.length) return { probability: "low", probabilityScore: 0 };

  // Get latest year cutoff
  const latestCutoff = cutoffData.sort((a, b) => b.year - a.year)[0];
  const difference = userMarks - latestCutoff.cutoff_mark;

  // Calculate probability based on marks difference
  if (difference >= 5) {
    return { probability: "high", probabilityScore: Math.min(95, 85 + difference * 2) };
  } else if (difference >= 0) {
    return { probability: "medium", probabilityScore: Math.min(75, 60 + difference * 3) };
  } else if (difference >= -3) {
    return { probability: "medium", probabilityScore: Math.max(30, 50 + difference * 5) };
  } else {
    return { probability: "low", probabilityScore: Math.max(5, 25 + difference * 2) };
  }
}

export function predictCollegesFromDatabase(
  filters: PredictionFilters,
  colleges: DatabaseCollege[],
  branches: DatabaseBranch[],
  cutoffData: DatabaseCutoffData[]
): CollegeWithCutoff[] {
  const results: CollegeWithCutoff[] = [];

  colleges.forEach(college => {
    // Apply college type filter
    if (filters.collegeType?.length && !filters.collegeType.includes(college.type)) {
      return;
    }

    // Apply district filter
    if (filters.preferredDistrict && college.district !== filters.preferredDistrict) {
      return;
    }

    branches.forEach(branch => {
      // Apply branch filter
      if (filters.branches?.length && !filters.branches.includes(branch.id)) {
        return;
      }

      // Get cutoff data for this college-branch-category combination
      const relevantCutoffs = cutoffData.filter(
        cutoff => cutoff.college_id === college.id && 
                 cutoff.branch_id === branch.id && 
                 cutoff.category === filters.category
      );

      if (relevantCutoffs.length === 0) return;

      const { probability, probabilityScore } = calculateProbability(filters.marks, relevantCutoffs);

      // Only include if there's some chance
      if (probabilityScore > 5) {
        // Convert database types to frontend types
        const convertedCutoffData = relevantCutoffs.map(cutoff => ({
          id: cutoff.id,
          collegeId: cutoff.college_id,
          branchId: cutoff.branch_id,
          year: cutoff.year,
          category: cutoff.category,
          cutoffMark: cutoff.cutoff_mark,
          openingRank: cutoff.opening_rank,
          closingRank: cutoff.closing_rank
        }));

        // Ensure type compatibility by casting to valid union type
        const collegeType = college.type as "government" | "aided" | "self-financing";

        results.push({
          id: college.id,
          name: college.name,
          location: college.location,
          district: college.district,
          type: collegeType,
          naacGrade: college.naac_grade,
          established: college.established,
          website: college.website,
          facilities: college.facilities,
          branch: {
            id: branch.id,
            name: branch.name,
            code: branch.code,
            duration: branch.duration
          },
          cutoffData: convertedCutoffData,
          probability,
          probabilityScore,
          fees: {
            tuition: collegeType === "government" ? 50000 : collegeType === "aided" ? 75000 : 150000,
            hostel: 40000,
            total: collegeType === "government" ? 90000 : collegeType === "aided" ? 115000 : 190000
          }
        });
      }
    });
  });

  // Sort by probability score (highest first)
  return results.sort((a, b) => b.probabilityScore - a.probabilityScore);
}
