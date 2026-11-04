import { MapPin, Star, Calendar, BookOpen, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { DatabaseCollege } from "@/types/database";
import { getCollegeUrl } from "@/utils/collegeUrl";

interface CollegeCardProps {
  college: DatabaseCollege;
}

/**
 * Responsive, modern CollegeCard
 * - Collapses nicely on small screens
 * - Smaller image + stacked layout on mobile
 * - Compact info "chips" adapt into a 2x2 grid on small screens
 * - Action buttons become full-width on mobile
 * - Preserves all data & routes (no backend logic changes)
 */

const CollegeCard = ({ college }: CollegeCardProps) => {
  // keep rating static as requested previously
  const rating = 4.0;

  return (
    <Link to={getCollegeUrl(college.slug)} aria-label={`View details for ${college.name}`}>
      <Card
        className="
          group overflow-hidden transition-all duration-300 cursor-pointer
          bg-white border border-transparent shadow-sm hover:shadow-2xl
          sm:rounded-2xl relative
        "
      >
        {/* Featured gradient bar */}
        {college.featured && (
          <>
            <div
              aria-hidden
              className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <div className="absolute left-0 top-0 z-10">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg shadow-sm uppercase tracking-wide">
                Featured
              </span>
            </div>
          </>
        )}

        <CardContent className={`p-4 sm:p-6 ${college.featured ? "pt-6 sm:pt-8" : ""}`}>
          {/* Layout: horizontal on md+, stacked on small */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div
                className="
                  w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-gray-50 overflow-hidden
                  flex items-center justify-center shadow-sm
                "
              >
                <img
                  src={college.college_logo || "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop"}
                  alt={`${college.name} logo`}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Middle: Main info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div className="min-w-0">
                  <h3
                    className="
                      font-poppins font-semibold text-base sm:text-lg leading-tight text-gray-900
                      truncate group-hover:text-orange-600 transition-colors
                    "
                  >
                    {college.name}
                  </h3>

                  <div className="mt-1 flex items-center text-sm text-gray-600 gap-2 truncate">
                    <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="truncate">{college.location || college.address || "Location N/A"}</span>
                  </div>
                </div>

                {/* Rating & type badge */}
                <div className="flex items-start gap-3 mt-2 sm:mt-0">
                  <div className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{rating.toFixed(1)}</span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {college.type || "Type"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact details chips: responsive grid */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex flex-col p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Calendar className="w-3 h-3" />
                    <span>Est.</span>
                  </div>
                  <div className="text-sm font-medium text-blue-800">
                    {college.established || "N/A"}
                  </div>
                </div>

                <div className="flex flex-col p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <BookOpen className="w-3 h-3" />
                    <span>Courses</span>
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    {Array.isArray(college.courses) ? college.courses.length : "—"}
                  </div>
                </div>

                <div className="flex flex-col p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <Award className="w-3 h-3" />
                    <span>NAAC</span>
                  </div>
                  <div className="text-sm font-medium text-orange-800">
                    {college.naac_grade || "N/A"}
                  </div>
                </div>

                <div className="flex flex-col p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-purple-600">
                    <Users className="w-3 h-3" />
                    <span>District</span>
                  </div>
                  <div className="text-sm font-medium text-purple-800 truncate">
                    {college.district || "N/A"}
                  </div>
                </div>
              </div>

              {/* Bottom row: small screen shows type badge and actions stacked */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* type badge visible on mobile here */}
                <div className="flex items-center gap-2">
                  <div className="sm:hidden">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {college.type || "Type"}
                    </span>
                  </div>

                  {/* Optional small meta */}

                </div>

                {/* Actions */}
                <div className="w-full sm:w-auto flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto px-3 py-2 text-sm hover:bg-gray-50"
                    aria-label={`Compare ${college.name}`}
                  >
                    Compare
                  </Button>

                  <Button
                    size="sm"
                    className="w-full sm:w-auto px-3 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:shadow-md"
                    aria-label={`View details for ${college.name}`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollegeCard;
