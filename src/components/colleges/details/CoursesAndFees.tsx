import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Clock,
  IndianRupee,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  CalendarDays,
  Users,
  Layers,
} from "lucide-react";
import { Course, FeeStructure } from "@/types/database";

interface CoursesAndFeesProps {
  college: any;
  onApplyClick?: () => void;
}

// ─── Degree Level Classifier ────────────────────────────────────────────────
const UG_DEGREES = [
  'b.e', 'b.tech', 'btech', 'be', 'b.e.',
  'b.sc', 'bsc', 'bachelor of science',
  'b.a', 'ba', 'bachelor of arts',
  'b.com', 'bcom', 'bachelor of commerce',
  'bba', 'bachelor of business administration',
  'bca', 'bachelor of computer applications',
  'b.pharm', 'bachelor of pharmacy',
  'b.arch', 'bachelor of architecture',
  'llb', 'bachelor of laws',
  'b.ed', 'bachelor of education',
  'b.des', 'bachelor of design',
  'bachelor of business and law',
  'bba & law',
];

const PG_DEGREES = [
  'mba', 'm.b.a', 'master of business administration',
  'm.tech', 'mtech',
  'mca', 'm.c.a', 'master of computer applications',
  'm.sc', 'msc', 'master of science',
  'ma', 'master of arts',
  'm.com', 'mcom', 'master of commerce',
  'm.e', 'me',
  'm.pharm', 'master of pharmacy',
  'm.ed', 'master of education',
  'mhm', 'master of hotel management',
  'llm',
];

const DIPLOMA_DEGREES = ['diploma', 'polytechnic', 'pgdm', 'pgd'];
const PHD_DEGREES    = ['ph.d', 'phd', 'doctor of philosophy', 'm.phil'];

function getLevel(name: string): string {
  const lower = name.toLowerCase().trim();
  if (PHD_DEGREES.some(d => lower.includes(d)))    return 'Ph.D / M.Phil';
  if (PG_DEGREES.some(d => lower === d || lower.startsWith(d + ' '))) return 'PG Programs';
  if (UG_DEGREES.some(d => lower === d || lower.startsWith(d + ' '))) return 'UG Programs';
  if (DIPLOMA_DEGREES.some(d => lower.includes(d)))                   return 'Diploma';
  return 'Other Programs';
}

// Level display order
const LEVEL_ORDER = ['UG Programs', 'PG Programs', 'Diploma', 'Ph.D / M.Phil', 'Other Programs'];

// ─── Degree Name Normalizer ──────────────────────────────────────────────────
function normalizeName(name: string): string {
  const map: Record<string, string> = {
    'b.e': 'B.E', 'be': 'B.E', 'b.e.': 'B.E',
    'b.tech': 'B.Tech', 'btech': 'B.Tech', 'b.tech.': 'B.Tech',
    'b.sc': 'B.Sc', 'bsc': 'B.Sc', 'bachelor of science': 'B.Sc',
    'b.a': 'B.A', 'ba': 'B.A', 'bachelor of arts': 'B.A',
    'b.com': 'B.Com', 'bcom': 'B.Com', 'bachelor of commerce': 'B.Com',
    'bba': 'BBA', 'bachelor of business administration': 'BBA',
    'bca': 'BCA', 'bachelor of computer applications': 'BCA',
    'bachelor of business and law': 'BBA & Law',
    'mba': 'MBA', 'm.b.a': 'MBA',
    'm.tech': 'M.Tech', 'mtech': 'M.Tech',
    'mca': 'MCA', 'm.c.a': 'MCA',
    'm.sc': 'M.Sc', 'msc': 'M.Sc', 'master of science': 'M.Sc',
    'ma': 'M.A', 'master of arts': 'M.A',
    'm.com': 'M.Com', 'mcom': 'M.Com',
    'm.e': 'M.E',
    'ph.d': 'Ph.D', 'phd': 'Ph.D', 'doctor of philosophy': 'Ph.D',
    'm.phil': 'M.Phil',
  };
  return map[name.toLowerCase().trim()] ?? name.trim();
}

// ─── Fee Helpers ─────────────────────────────────────────────────────────────
function getFeeForCourse(courseId: string, feeStructures: FeeStructure[]): FeeStructure | undefined {
  return feeStructures?.find(fs => fs.course_id === courseId);
}

function sumMandatoryComponents(fs: FeeStructure): number | null {
  const comps = (fs as any).components as any[];
  if (!comps || comps.length === 0) return null;
  const total = comps
    .filter((c: any) => c.is_mandatory !== false)
    .reduce((sum: number, c: any) => sum + Number(c.amount || 0), 0);
  return total > 0 ? total : null;
}

function formatINR(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)   return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const CoursesAndFees: React.FC<CoursesAndFeesProps> = ({ college, onApplyClick }) => {
  const courses: Course[]          = college.courses || [];
  const feeStructures: FeeStructure[] = college.fee_structures || [];
  const [expandedFee, setExpandedFee] = useState<string | null>(null);

  // Group courses by level (UG / PG / Diploma / PhD)
  const grouped = useMemo(() => {
    const g: Record<string, Course[]> = {};
    for (const c of courses) {
      const level = getLevel(c.name);
      if (!g[level]) g[level] = [];
      g[level].push(c);
    }
    return g;
  }, [courses]);

  const levels = LEVEL_ORDER.filter(l => grouped[l]);

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-medium">No course information available yet.</p>
        <p className="text-slate-400 text-sm mt-1">Contact the college for detailed program info.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {levels.map(level => {
        const levelCourses = grouped[level];

        return (
          <div key={level} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Level Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600">
              <Layers className="w-4 h-4 text-white/90" />
              <h3 className="font-bold text-white text-sm tracking-wide uppercase">{level}</h3>
              <span className="ml-auto text-xs text-white/80 font-medium">
                {levelCourses.length} program{levelCourses.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Degree</th>
                    <th className="px-4 py-3 text-left">Specialization / Branch</th>
                    <th className="px-4 py-3 text-left">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Duration
                      </span>
                    </th>
                    <th className="px-4 py-3 text-left">Eligibility</th>
                    <th className="px-4 py-3 text-right">
                      <span className="flex items-center gap-1 justify-end">
                        <IndianRupee className="w-3 h-3" /> Annual Fee
                      </span>
                    </th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {levelCourses.map((course, idx) => {
                    const fs       = getFeeForCourse(course.id, feeStructures);
                    const totalFee = fs ? sumMandatoryComponents(fs) : null;
                    const comps    = fs ? ((fs as any).components as any[] || []) : [];
                    const isFeeOpen = expandedFee === course.id;
                    const degreeName = normalizeName(course.name);

                    return (
                      <React.Fragment key={course.id}>
                        <tr className={`hover:bg-orange-50/40 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                          {/* Degree */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                              </div>
                              <span className="font-bold text-slate-900">{degreeName}</span>
                            </div>
                          </td>

                          {/* Specialization */}
                          <td className="px-4 py-3.5">
                            {course.specialization ? (
                              <span className="font-medium text-slate-800">{course.specialization}</span>
                            ) : (
                              <span className="text-slate-400 italic text-xs">All Specializations</span>
                            )}
                            {/* Intake seats if available */}
                            {course.intake_seats && (
                              <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                <Users className="w-2.5 h-2.5" /> {course.intake_seats} seats
                              </span>
                            )}
                          </td>

                          {/* Duration */}
                          <td className="px-4 py-3.5">
                            <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                              {course.duration ?? '—'}
                            </span>
                          </td>

                          {/* Eligibility */}
                          <td className="px-4 py-3.5 text-slate-600 max-w-[200px]">
                            <p className="line-clamp-2 text-xs leading-relaxed">
                              {course.eligibility || fs?.eligibility || '—'}
                            </p>
                            {/* Application window */}
                            {fs && (fs.application_start_date || fs.application_end_date) && (
                              <p className="text-[10px] text-orange-600 mt-1 flex items-center gap-1">
                                <CalendarDays className="w-2.5 h-2.5" />
                                {fs.application_start_date
                                  ? new Date(fs.application_start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                                  : ''}{' → '}
                                {fs.application_end_date
                                  ? new Date(fs.application_end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                  : ''}
                              </p>
                            )}
                          </td>

                          {/* Fee */}
                          <td className="px-4 py-3.5 text-right">
                            {totalFee ? (
                              <div>
                                <p className="font-bold text-orange-600 text-base">{formatINR(totalFee)}</p>
                                {comps.length > 0 && (
                                  <button
                                    onClick={() => setExpandedFee(isFeeOpen ? null : course.id)}
                                    className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5 ml-auto mt-0.5"
                                  >
                                    Breakdown
                                    <ChevronDown className={`w-3 h-3 transition-transform ${isFeeOpen ? 'rotate-180' : ''}`} />
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Contact college</span>
                            )}
                          </td>

                          {/* Action */}
                          <td className="px-4 py-3.5 text-center">
                            <Button
                              size="sm"
                              className="h-8 px-4 text-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-sm"
                              onClick={onApplyClick}
                            >
                              Apply
                            </Button>
                          </td>
                        </tr>

                        {/* Fee Breakdown Row */}
                        {isFeeOpen && comps.length > 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-0 bg-blue-50/40">
                              <div className="py-3">
                                <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                                  Fee Breakdown — {degreeName}{course.specialization ? ` (${course.specialization})` : ''}
                                  {fs?.quota && <span className="ml-2 text-purple-600 normal-case">· Quota: {fs.quota}</span>}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                  {comps.map((comp: any, i: number) => (
                                    <div key={comp.id || i} className="bg-white rounded-lg border border-slate-200 px-3 py-2 text-xs">
                                      <p className="text-slate-500 font-medium truncate">{comp.component_name}</p>
                                      <p className="font-bold text-slate-900 mt-0.5">{formatINR(Number(comp.amount))}</p>
                                      <p className="text-[10px] text-slate-400 capitalize">{comp.frequency?.replace(/_/g, ' ')}</p>
                                      {comp.is_mandatory === false && (
                                        <span className="text-[10px] text-amber-600">Optional</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                  <span className="text-xs font-bold text-slate-700">
                                    Total Mandatory: {formatINR(totalFee!)}
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesAndFees;
