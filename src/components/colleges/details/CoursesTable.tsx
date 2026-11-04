import React from "react";
import { Course } from "@/types/database";
import { BookOpen, Clock, GraduationCap } from "lucide-react";

interface CoursesTableProps {
  collegeName: string;
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ collegeName, courses }) => {
  return (
    <section className="mt-10 mb-12">
      <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-orange-500" />
        Courses Offered by {collegeName}
      </h3>

      <div className="w-full rounded-xl border border-orange-200 shadow-sm overflow-hidden bg-white">
        {/* Header */}
        <div className="bg-orange-50 border-b border-orange-200">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-5 py-4 text-left font-semibold text-orange-700">
                  Course Name
                </th>
                <th className="px-5 py-4 text-left font-semibold text-orange-700">
                  Course Details
                </th>
                <th className="px-5 py-4 text-left font-semibold text-orange-700">
                  Selection Basis
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={index}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-orange-50/30" : "bg-white"
                  } hover:bg-orange-50/60`}
                >
                  {/* Course Name */}
                  <td className="px-5 py-4 border-b border-orange-100 font-semibold text-slate-800">
                    {course.name}
                  </td>

                  {/* Course Details */}
                  <td className="px-5 py-4 border-b border-orange-100 text-slate-700">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>
                          <span className="font-semibold">Duration:</span>{" "}
                          {course.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-orange-500" />
                        <span>
                          <span className="font-semibold">Eligibility:</span>{" "}
                          {course.eligibility}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Selection Basis */}
                  <td className="px-5 py-4 border-b border-orange-100 text-slate-700">
                    {course.selection_basis}
                  </td>
                </tr>
              ))}

              {/* No courses fallback */}
              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-slate-500 italic"
                  >
                    No courses available for this college
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

export default CoursesTable;
