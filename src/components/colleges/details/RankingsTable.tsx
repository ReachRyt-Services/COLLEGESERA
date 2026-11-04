import React from "react";
import { Ranking } from "@/types/database";
import { Award, Calendar, Hash } from "lucide-react";

interface RankingsTableProps {
  collegeName: string;
  rankings: Ranking[];
}

const RankingsTable: React.FC<RankingsTableProps> = ({
  collegeName,
  rankings,
}) => {
  return (
    <section className="mt-10 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-slate-800">
        {collegeName} Rankings
      </h3>

      <div className="rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-orange-50 border-b border-orange-200 px-5 py-4">
          <p className="font-semibold text-orange-700 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-600" />
            Ranking Overview
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-orange-100/40 text-orange-800 text-sm">
                <th className="px-5 py-3 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4" /> Agency
                </th>
                <th className="px-5 py-3 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Year
                </th>
                <th className="px-5 py-3 font-semibold flex items-center gap-2">
                  <Hash className="w-4 h-4" /> Rank
                </th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              {rankings.map((ranking, index) => (
                <tr
                  key={index}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-orange-50/40"
                  } hover:bg-orange-50`}
                >
                  <td className="px-5 py-4 font-medium">{ranking.agency}</td>
                  <td className="px-5 py-4">{ranking.year}</td>
                  <td className="px-5 py-4 font-semibold text-orange-600">
                    #{ranking.rank}
                  </td>
                </tr>
              ))}

              {/* No data */}
              {rankings.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-6 text-center text-slate-500 italic"
                  >
                    No ranking data available.
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

export default RankingsTable;
