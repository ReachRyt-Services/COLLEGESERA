import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

import {
  getDegreeSummaryForCollege,
  getCoursesAndFeesForDegree,
} from "@/services/collegeService";
import { DegreeSummary, CourseFeeDetail } from "@/types/database";

interface FeeOverviewProps {
  collegeId: string;
}

const FeeOverview: React.FC<FeeOverviewProps> = ({ collegeId }) => {
  const [degrees, setDegrees] = useState<DegreeSummary[]>([]);
  const [openDegree, setOpenDegree] = useState<string | null>(null);
  const [coursesByDegree, setCoursesByDegree] = useState<
    Record<string, CourseFeeDetail[]>
  >({});
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState<
    Record<string, boolean>
  >({});
  const [errorSummary, setErrorSummary] = useState<string | null>(null);
  const [errorCourses, setErrorCourses] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    const fetchDegreeSummary = async () => {
      setIsLoadingSummary(true);
      setErrorSummary(null);
      try {
        const summary = await getDegreeSummaryForCollege(collegeId);
        setDegrees(summary);
      } catch (err) {
        setErrorSummary("Failed to load fee overview.");
      } finally {
        setIsLoadingSummary(false);
      }
    };
    fetchDegreeSummary();
  }, [collegeId]);

  const handleToggle = async (degreeType: string) => {
    if (openDegree === degreeType) return setOpenDegree(null);
    setOpenDegree(degreeType);

    if (!coursesByDegree[degreeType]) {
      setIsLoadingCourses((p) => ({ ...p, [degreeType]: true }));
      setErrorCourses((p) => ({ ...p, [degreeType]: null }));
      try {
        const courses = await getCoursesAndFeesForDegree(collegeId, degreeType);
        setCoursesByDegree((p) => ({ ...p, [degreeType]: courses }));
      } catch (err) {
        setErrorCourses((p) => ({
          ...p,
          [degreeType]: `Failed to load courses for ${degreeType}.`,
        }));
      } finally {
        setIsLoadingCourses((p) => ({ ...p, [degreeType]: false }));
      }
    }
  };

  if (isLoadingSummary)
    return <div className="text-center py-8">Loading fee overview…</div>;

  if (errorSummary)
    return <div className="text-center py-8 text-red-500">{errorSummary}</div>;

  if (degrees.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">
        No fee information available.
      </div>
    );

  return (
    <div className="space-y-6">
      {degrees.map((d) => (
        <Card
          key={d.degree_type}
          className="border border-orange-200 shadow-md hover:shadow-lg transition-all rounded-xl"
        >
          <CardContent className="p-5">
            {/* Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(d.degree_type)}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-slate-800">
                    {d.degree_type}
                  </h3>
                </div>

                <p className="text-sm text-gray-600">
                  {d.courses_count} courses available
                </p>

                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white rounded-md px-3 py-1 text-sm">
                    {d.min_tuition && d.max_tuition
                      ? `₹${d.min_tuition.toLocaleString()} - ₹${d.max_tuition.toLocaleString()}`
                      : ""}
                  </Badge>
                </div>

                {d.earliest_application_start && (
                  <p className="mt-2 text-gray-600 flex items-center gap-1 text-sm">
                    <CalendarDays className="w-4 h-4 text-orange-600" />
                    Applications:{" "}
                    {new Date(d.earliest_application_start).toLocaleDateString()}
                    {d.latest_application_end &&
                      ` → ${new Date(
                        d.latest_application_end
                      ).toLocaleDateString()}`}
                  </p>
                )}
              </div>

              {/* Toggle Icon */}
              <Button variant="ghost" size="icon">
                {openDegree === d.degree_type ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </Button>
            </div>

            {/* Expanded Section */}
            {openDegree === d.degree_type && (
              <div className="mt-4 border-t pt-4 animate-fade-in">
                {isLoadingCourses[d.degree_type] ? (
                  <div className="py-4 text-center">Loading…</div>
                ) : errorCourses[d.degree_type] ? (
                  <div className="py-4 text-red-500 text-center">
                    {errorCourses[d.degree_type]}
                  </div>
                ) : (coursesByDegree[d.degree_type] || []).length === 0 ? (
                  <div className="py-4 text-gray-500 text-center">
                    No courses found.
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden border border-orange-100 shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-orange-50 text-orange-800">
                        <tr>
                          <th className="px-4 py-3 font-medium">Course</th>
                          <th className="px-4 py-3 font-medium flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" /> Fee
                          </th>
                          <th className="px-4 py-3 font-medium">Eligibility</th>
                          <th className="px-4 py-3 font-medium">Application</th>
                          <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {coursesByDegree[d.degree_type].map((c) => (
                          <tr
                            key={c.course_id}
                            className="odd:bg-white even:bg-orange-50/50 hover:bg-orange-100 transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-slate-800">
                              {c.course_name}
                            </td>

                            <td className="px-4 py-3 text-slate-700">
                              {c.total_first_year
                                ? `₹${Number(c.total_first_year).toLocaleString()}`
                                : c.total_per_semester
                                ? `₹${Number(
                                    c.total_per_semester
                                  ).toLocaleString()} / sem`
                                : "N/A"}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                              {c.eligibility || "N/A"}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                              {c.application_start_date &&
                              c.application_end_date
                                ? `${new Date(
                                    c.application_start_date
                                  ).toLocaleDateString()} → ${new Date(
                                    c.application_end_date
                                  ).toLocaleDateString()}`
                                : "N/A"}
                            </td>

                            <td className="px-4 py-3">
                              <Button
                                size="sm"
                                className="bg-orange-500 text-white hover:bg-orange-600 mr-2"
                              >
                                Apply
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-orange-400 text-orange-600 hover:bg-orange-50"
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeeOverview;
