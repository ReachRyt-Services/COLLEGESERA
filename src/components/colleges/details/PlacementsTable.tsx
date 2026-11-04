import React from "react";
import { Placement } from "@/types/database";
import { Briefcase, TrendingUp, IndianRupee, Calendar, Users } from "lucide-react";

interface PlacementsTableProps {
  collegeName: string;
  placements?: Placement[] | null;
}

const PlacementsTable: React.FC<PlacementsTableProps> = ({
  collegeName,
  placements,
}) => {
  const data = placements || [];

  return (
    <section className="mt-10 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-slate-800">
        {collegeName} Placements
      </h3>

      <div className="rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-orange-50 border-b border-orange-200 px-5 py-4">
          <p className="font-semibold text-orange-700 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-orange-600" />
            Placement Overview
          </p>
        </div>

        {/* Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-orange-100/40 text-orange-800 text-sm">
                <th className="px-5 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Year
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" /> Min Package
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Avg Package
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" /> Max Package
                  </div>
                </th>
                <th className="px-5 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Top Recruiters
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              {data.map((placement, index) => (
                <tr
                  key={placement.id || index}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-orange-50/40"
                  } hover:bg-orange-50`}
                >
                  <td className="px-5 py-4 font-medium">{placement.year}</td>
                  <td className="px-5 py-4">{placement.min_salary ?? "N/A"}</td>
                  <td className="px-5 py-4">{placement.average_salary ?? "N/A"}</td>
                  <td className="px-5 py-4">{placement.max_salary ?? "N/A"}</td>
                  <td className="px-5 py-4">
                    {placement.recruiters && placement.recruiters.length > 0
                      ? placement.recruiters.join(", ")
                      : "N/A"}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-6 text-center text-slate-500 italic"
                  >
                    No placement data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PlacementsTable;
