import { useOutletContext } from "react-router-dom";
import PlacementsTable from "@/components/colleges/details/PlacementsTable";
import SEO from "@/components/SEO";

export default function CollegePlacements() {
  const { college } = useOutletContext<{ college: any }>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} Placements: Highest Package, Top Recruiters`}
        description={`Explore the latest placement statistics, average package, and top companies visiting ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/placements`}
      />
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Placements</h2>
        <PlacementsTable collegeName={college.name} placements={college.placements} />
      </div>
    </div>
  );
}
