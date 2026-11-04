import React from "react";
import { AdmissionProcess } from "@/types/database";
import { CheckCircle, Mail, FileText } from "lucide-react";

interface AdmissionProcessTableProps {
  collegeName: string;
  collegeLocation: string;
  admissionProcess: AdmissionProcess;
}

const AdmissionProcessTable: React.FC<AdmissionProcessTableProps> = ({
  collegeName,
  collegeLocation,
  admissionProcess,
}) => {
  if (!admissionProcess) {
    return (
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">
          {collegeName} Admission
        </h3>
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center text-slate-500">
          Admission details are currently being updated for this college.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-slate-800">
        {collegeName} Admission
      </h3>

      <div className="rounded-xl border border-orange-200 shadow-sm bg-white overflow-hidden">

        {/* Header */}
        <div className="bg-orange-50 p-4 border-b border-orange-200">
          <h4 className="text-lg font-semibold text-orange-700 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Admission Process
          </h4>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="text-sm">

              {/* Admission Basis */}
              <tr className="hover:bg-orange-50/40 transition-colors">
                <td className="p-4 font-semibold w-48 bg-orange-50 border-b border-orange-100">
                  Admission Basis
                </td>

                <td className="p-4 border-b border-orange-100 text-slate-700">
                  {admissionProcess.admission_basis}
                </td>
              </tr>

              {/* Online Application */}
              <tr className="hover:bg-orange-50/40 transition-colors">
                <td className="p-4 font-semibold w-48 bg-orange-50 border-b border-orange-100 align-top">
                  Online Application
                </td>

                <td className="p-4 border-b border-orange-100">
                  <ul className="space-y-2">
                    {Array.isArray(admissionProcess.online_application_steps) &&
                      admissionProcess.online_application_steps.map(
                        (step, index) => (
                          <li
                            key={index}
                            className="flex gap-2 items-start text-slate-700"
                          >
                            <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        )
                      )}
                  </ul>
                </td>
              </tr>

              {/* Offline Application */}
              <tr className="hover:bg-orange-50/40 transition-colors">
                <td className="p-4 font-semibold w-48 bg-orange-50 border-b border-orange-100 align-top">
                  Offline Application
                </td>

                <td className="p-4 border-b border-orange-100">
                  <ul className="space-y-2">
                    {Array.isArray(admissionProcess.offline_application_steps) &&
                      admissionProcess.offline_application_steps.map(
                        (step, index) => (
                          <li
                            key={index}
                            className="flex gap-2 items-start text-slate-700"
                          >
                            <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        )
                      )}

                    {/* Address block */}
                    <li className="mt-3">
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <p className="font-semibold text-orange-700 mb-1">
                          The Principal,
                        </p>
                        <p className="text-slate-700">{collegeName}</p>
                        <p className="text-slate-700">{collegeLocation}</p>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcessTable;
