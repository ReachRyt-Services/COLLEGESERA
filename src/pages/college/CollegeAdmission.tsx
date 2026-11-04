import { useOutletContext } from "react-router-dom";
import AdmissionProcessTable from "@/components/colleges/details/AdmissionProcessTable";
import SEO from "@/components/SEO";

export default function CollegeAdmission() {
  const { college } = useOutletContext<{ college: any }>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} Admission`}
        description={`Get complete details on the admission process, important dates, and eligibility for ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/admission`}
      />
      
      {/* Exams Accepting Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Exams Accepting</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">Admission to various courses at {college.name} is typically based on state or national level entrance exams. Please check the specific course for exact requirements.</p>
          <div className="mt-4 flex flex-wrap gap-2">
             <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">TANCET</span>
             <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">CAT</span>
             <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">MAT</span>
             <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">CMAT</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Admission Process</h2>
        <AdmissionProcessTable
          collegeName={college.name}
          collegeLocation={college.location}
          admissionProcess={college.admission_process}
        />
      </div>

      {/* Documents Required Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Documents Required</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>10th and 12th Mark sheets and Passing Certificates</li>
            <li>Graduation Mark sheets and Degree Certificate (for PG courses)</li>
            <li>Entrance Exam Scorecard</li>
            <li>Transfer Certificate (TC) & Migration Certificate</li>
            <li>Character Certificate</li>
            <li>Category Certificate (if applicable)</li>
            <li>Passport Size Photographs</li>
            <li>Aadhar Card or Valid ID Proof</li>
          </ul>
        </div>
      </div>

      {/* Course Cutoff Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Course Cutoff</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">The cutoff for admission varies each year depending on the difficulty of the entrance exam, the number of applicants, and the availability of seats. Candidates meeting the cutoff criteria are called for the subsequent rounds of the admission process (GD/PI).</p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg text-orange-800 text-sm font-medium border border-orange-100">
            Please contact our counselling team for the most recent cutoff trends for your desired course.
          </div>
        </div>
      </div>
    </div>
  );
}
