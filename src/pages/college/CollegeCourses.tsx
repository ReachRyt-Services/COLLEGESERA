import { useOutletContext } from "react-router-dom";
import CoursesAndFees from "@/components/colleges/details/CoursesAndFees";
import SEO from "@/components/SEO";
import { useState } from "react";
import UserForm from "@/components/UserForm";

export default function CollegeCourses() {
  const { college } = useOutletContext<{ college: any }>();
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} Courses & Fees`}
        description={`Check out the complete list of courses, fees, eligibility and fee breakdown for ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/courses-fees`}
      />
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Courses & Fee Structure</h2>
          <span className="text-sm text-slate-500">
            {(college.courses || []).length} courses offered
          </span>
        </div>
        <CoursesAndFees college={college} onApplyClick={() => setIsUserFormOpen(true)} />
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Syllabus Overview</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">The curriculum for various programs is designed to meet industry standards. Please refer to the detailed syllabus provided by the university during the commencement of the academic year.</p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg text-orange-800 text-sm font-medium border border-orange-100 flex items-center justify-between">
            <span>Download detailed syllabus and curriculum structure.</span>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition-colors" onClick={() => setIsUserFormOpen(true)}>Get Syllabus</button>
          </div>
        </div>
      </div>
      <UserForm isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} />
    </div>
  );
}
