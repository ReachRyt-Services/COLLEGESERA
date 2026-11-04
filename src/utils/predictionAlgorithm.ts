
import { College, Branch, CutoffData, CollegeWithCutoff, PredictionFilters } from "@/types/college";

export function calculateProbability(userMarks: number, cutoffData: CutoffData[]): {
  probability: "high" | "medium" | "low";
  probabilityScore: number;
} {
  if (!cutoffData.length) return { probability: "low", probabilityScore: 0 };

  // Get latest year cutoff
  const latestCutoff = cutoffData.sort((a, b) => b.year - a.year)[0];
  const difference = userMarks - latestCutoff.cutoffMark;

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

export function predictColleges(
  filters: PredictionFilters,
  colleges: College[],
  branches: Branch[],
  cutoffData: CutoffData[]
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
        cutoff => cutoff.collegeId === college.id && 
                 cutoff.branchId === branch.id && 
                 cutoff.category === filters.category
      );

      if (relevantCutoffs.length === 0) return;

      const { probability, probabilityScore } = calculateProbability(filters.marks, relevantCutoffs);

      // Only include if there's some chance
      if (probabilityScore > 5) {
        results.push({
          ...college,
          branch,
          cutoffData: relevantCutoffs,
          probability,
          probabilityScore,
          fees: {
            tuition: college.type === "government" ? 50000 : college.type === "aided" ? 75000 : 150000,
            hostel: 40000,
            total: college.type === "government" ? 90000 : college.type === "aided" ? 115000 : 190000
          }
        });
      }
    });
  });

  // Sort by probability score (highest first)
  return results.sort((a, b) => b.probabilityScore - a.probabilityScore);
}
