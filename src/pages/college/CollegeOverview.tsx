import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CoursesAndFees from "@/components/colleges/details/CoursesAndFees";
import AdmissionProcessTable from "@/components/colleges/details/AdmissionProcessTable";
import PlacementsTable from "@/components/colleges/details/PlacementsTable";
import RankingsTable from "@/components/colleges/details/RankingsTable";
import FacilitiesTable from "@/components/colleges/details/FacilitiesTable";
import UserForm from "@/components/UserForm";

export default function CollegeOverview() {
  const { college } = useOutletContext<{ college: any }>();
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  // Normalize description: unescape literal \n, fix accidental leading characters, split into paragraphs
  const cleanDescription = (college?.description || '')
    .replace(/\\n/g, '\n')
    .replace(/^a(?=PSG\b)/, '')
    .trim();

  const paragraphs = cleanDescription
    ? cleanDescription.split(/\n\s*\n/).filter((p: string) => p.trim().length > 0)
    : [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {college.name}</h2>
            {paragraphs.length > 0 ? (
              <div className="text-gray-700 leading-relaxed space-y-4">
                {paragraphs.map((paragraph: string, idx: number) => (
                  <p key={idx} className="whitespace-pre-line leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No description available for this institution.</p>
            )}
          </CardContent>
        </Card>
        {college.highlights && college.highlights.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {college.highlights.map((item: any, idx: number) => {
                // Handle both string items and {label, value} objects
                const text = typeof item === 'string'
                  ? item
                  : item?.label
                    ? `${item.label}${item.value ? ': ' + item.value : ''}`
                    : JSON.stringify(item);
                return (
                  <div key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Courses & Fee Structure</h2>
          <span className="text-sm text-slate-500">
            {(college.courses || []).length} courses offered
          </span>
        </div>
        <CoursesAndFees college={college} onApplyClick={() => setIsUserFormOpen(true)} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Admission Process</h2>
        <AdmissionProcessTable
          collegeName={college.name}
          collegeLocation={college.location}
          admissionProcess={college.admission_process}
        />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Placements</h2>
        <PlacementsTable collegeName={college.name} placements={college.placements} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Rankings & Awards</h2>
        <RankingsTable collegeName={college.name} rankings={college.rankings} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
        <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Explore Other Popular Colleges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Static placeholders linking to standard locations/categories */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/mba-colleges-in-tamilnadu'}>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Top MBA Colleges in Tamil Nadu</h3>
              <p className="text-sm text-slate-600">Explore rankings, fees, and placements.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/engineering-colleges-in-bangalore'}>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Top Engineering Colleges in Bangalore</h3>
              <p className="text-sm text-slate-600">Find the best tech schools.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = '/medical-colleges-in-delhi'}>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Top Medical Colleges in Delhi</h3>
              <p className="text-sm text-slate-600">Discover top medical institutions.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <UserForm isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} />
    </div>
  );
}
