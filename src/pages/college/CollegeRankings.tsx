import { useOutletContext } from "react-router-dom";
import RankingsTable from "@/components/colleges/details/RankingsTable";
import SEO from "@/components/SEO";

export default function CollegeRankings() {
  const { college } = useOutletContext<{ college: any }>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} Rankings & Awards`}
        description={`Check the latest national and international rankings and accreditations for ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/rankings`}
      />
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Rankings & Awards</h2>
        <RankingsTable collegeName={college.name} rankings={college.rankings} />
      </div>
    </div>
  );
}
