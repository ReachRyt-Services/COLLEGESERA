import React from "react";
import { DatabaseCollege } from "@/types/database";
import { CheckCircle } from "lucide-react";

interface FacilitiesTableProps {
  collegeName: string;
  facilities: DatabaseCollege["facilities"];
}

const FacilitiesTable: React.FC<FacilitiesTableProps> = ({
  collegeName,
  facilities,
}) => {
  return (
    <section className="mt-10 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-slate-800">
        Facilities at {collegeName}
      </h3>

      <div className="rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-orange-50 border-b border-orange-200 px-5 py-4">
          <p className="font-semibold text-orange-700">Available Facilities</p>
        </div>

        <div className="divide-y divide-orange-100">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="px-5 py-4 flex items-center gap-3 hover:bg-orange-50/50 transition-colors"
            >
              <CheckCircle className="w-5 h-5 text-orange-500" />
              <span className="text-slate-700 font-medium">{facility}</span>
            </div>
          ))}

          {facilities.length === 0 && (
            <div className="px-5 py-6 text-center text-slate-500 italic">
              No facilities listed for this college.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesTable;
