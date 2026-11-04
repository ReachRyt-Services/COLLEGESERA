import { useOutletContext } from "react-router-dom";
import FacilitiesTable from "@/components/colleges/details/FacilitiesTable";
import SEO from "@/components/SEO";

export default function CollegeFacilities() {
  const { college } = useOutletContext<{ college: any }>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} Campus Facilities & Infrastructure`}
        description={`Discover the campus life, hostels, library, and other facilities offered at ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/facilities`}
      />
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
        <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
      </div>
    </div>
  );
}
