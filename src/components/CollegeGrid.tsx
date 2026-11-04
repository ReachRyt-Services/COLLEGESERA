import { MapPin, Star, Calendar, BookOpen, Award, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { DatabaseCollege } from "@/types/database";
import { getCollegeUrl } from "@/utils/collegeUrl";

interface CollegeCardProps {
  college: DatabaseCollege;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  // Static rating for now
  const rating = 4.0;

  // Helper to stop link navigation when clicking "Compare"
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add your compare logic here
    console.log("Added to compare:", college.name);
  };

  return (
    <Link
      to={getCollegeUrl(college.slug)}
      className="block group h-full"
      aria-label={`View details for ${college.name}`}
    >
      <Card className="
        relative h-full overflow-hidden border border-slate-200 bg-white 
        transition-all duration-300 ease-out
        hover:border-orange-200 hover:shadow-xl hover:-translate-y-1
        rounded-xl flex flex-col
      ">

        {/* Featured Badge (Floating) */}
        {college.featured && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-br-lg shadow-sm">
              Featured
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col gap-4 flex-1">

          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="
              w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-100 bg-slate-50 
              flex items-center justify-center overflow-hidden shadow-sm p-2 shrink-0
            ">
              <img
                src={college.college_logo || "https://via.placeholder.com/100?text=Logo"}
                alt={`${college.name} logo`}
                className="w-full h-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Title & Location */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">
                {college.name}
              </h3>

              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate">{college.location || college.address || "India"}</span>
              </div>
            </div>
          </div>

          {/* Specs Grid - More spacious */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600 mt-2">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{college.type || "College"}</span>
            </div>

            {college.established && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Est. {college.established}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{Array.isArray(college.courses) ? `${college.courses.length} Courses` : "Courses Available"}</span>
            </div>

            {college.naac_grade && (
              <div className="flex items-center gap-1.5 text-orange-600 font-medium">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Grade {college.naac_grade}</span>
              </div>
            )}
          </div>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="pt-4 border-t border-dashed border-slate-100 flex items-center gap-3 mt-2">
            <Button
              onClick={handleCompareClick}
              variant="outline"
              size="sm"
              className="flex-1 h-9 text-xs font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              + Compare
            </Button>

            <Button
              size="sm"
              className="flex-1 h-9 text-xs bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CollegeCard;