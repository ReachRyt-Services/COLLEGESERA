import React, { useState } from 'react';
import { DatabaseCollege } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Download, ArrowRight, Heart, Scale, Trophy } from "lucide-react";
import { getCollegeUrl } from "@/utils/collegeUrl";
import BookingModal from "@/components/BookingModal";
import { toast } from "@/hooks/use-toast";

interface CollegeCardHorizontalProps {
    college: DatabaseCollege;
}

const CollegeCardHorizontal: React.FC<CollegeCardHorizontalProps> = ({ college }) => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // --- Derived Data ---

    // Salary — from placements table (most recent year first)
    const placement = college.placements?.[0];
    const avgSalary = placement?.average_salary;
    const maxSalary = placement?.max_salary;
    const salaryDisplay = avgSalary
      ? `Avg: ${avgSalary}`
      : maxSalary
        ? `Max: ${maxSalary}`
        : null;

    // Fees — placeholder (fee_structures require RPC, not available in list query)
    const feeString = null; // Will show 'See details' linking to courses & fees

    // Exams — derive from admission_process if available
    const admissionBasis = (college as any).admission_process?.admission_basis;
    const getFallbackExams = () => {
      const cleanTypeStr = `${college.type_collwge || ''} ${college.name || ''} ${college.type || ''}`
        .toLowerCase()
        .replace(/coimbatore/gi, ' ');

      if (cleanTypeStr.includes('occupational') || cleanTypeStr.includes('bot')) {
        return ["TN Paramedical", "Merit-Based"];
      }
      if (cleanTypeStr.includes('paramedical') || cleanTypeStr.includes('nursing') || cleanTypeStr.includes('physiotherapy') || cleanTypeStr.includes('allied health')) {
        return ["TN Paramedical", "Merit-Based"];
      }
      if (cleanTypeStr.includes('medical') || cleanTypeStr.includes('dental') || /\bmbbs\b/i.test(cleanTypeStr) || /\bbds\b/i.test(cleanTypeStr)) {
        return ["NEET UG"];
      }
      if (cleanTypeStr.includes('pharmacy') || cleanTypeStr.includes('pharm')) {
        return ["TN Paramedical", "GPAT"];
      }
      if (cleanTypeStr.includes('engineering') || cleanTypeStr.includes('technology') || cleanTypeStr.includes('polytechnic') || cleanTypeStr.includes('autonomous')) {
        return ["TNEA", "JEE Main"];
      }
      if (cleanTypeStr.includes('architecture') || cleanTypeStr.includes('b.arch')) {
        return ["NATA"];
      }
      if (cleanTypeStr.includes('law') || /\bllb\b/i.test(cleanTypeStr)) {
        return ["CLAT"];
      }
      const hasMbaCourse = college.courses?.some(c => {
        const cName = (c.name || '').toLowerCase().replace(/coimbatore/gi, ' ');
        return /\bmba\b/i.test(cName) || cName.includes('pgdm') || cName.includes('management');
      });
      if (/\bmba\b/i.test(cleanTypeStr) || cleanTypeStr.includes('management') || cleanTypeStr.includes('pgdm') || hasMbaCourse) {
        return ["TANCET", "MAT"];
      }
      if (cleanTypeStr.includes('art') || cleanTypeStr.includes('science') || cleanTypeStr.includes('commerce')) {
        return ["Merit-Based"];
      }
      return ["Merit-Based"];
    };

    const exams = admissionBasis
      ? admissionBasis.split(/[,/]+/).map((e: string) => e.trim()).filter(Boolean).slice(0, 3)
      : getFallbackExams();

    // Ranking
    const ranking = college.rankings?.[0];
    const rankingText = ranking ? `${ranking.agency} #${ranking.rank}` : null;

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "Added to Compare",
            description: `${college.name} has been added to your comparison list.`,
        });
    };

    const handleBrochureClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (college.brochure_file) {
            window.open(college.brochure_file, '_blank', 'noopener,noreferrer');
        } else {
            setIsBookingModalOpen(true);
        }
    };

    const handleApplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookingModalOpen(true);
    };

    return (
        <>
            <Card className="group overflow-hidden bg-white border border-slate-100/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-xl mb-4 relative z-0 w-full max-w-full">
                <div className="flex flex-col md:flex-row w-full min-w-0">

                    {/* --- Left & Middle Section --- */}
                    <div className="flex-1 min-w-0 p-3.5 sm:p-5 pb-3 md:pr-0">
                        {/* Top Header: Logo + College Info */}
                        <div className="flex gap-3 sm:gap-4 items-start min-w-0">
                            {/* Clickable Logo */}
                            <Link
                                to={getCollegeUrl(college.slug)}
                                className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 bg-white border border-slate-100 hover:border-orange-300 rounded-lg p-1.5 sm:p-2 flex items-center justify-center shadow-sm transition-colors"
                                aria-label={`View ${college.name}`}
                            >
                                <img
                                    src={college.college_logo || "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop"}
                                    alt={`${college.name} logo`}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </Link>

                            {/* Header Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                        <Link to={getCollegeUrl(college.slug)} className="block">
                                            <h3 className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug break-words">
                                                {college.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                                <span className="truncate">{college.district || college.location}, Tamil Nadu</span>
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span className="text-slate-600 font-medium">{college.type || "Private"}</span>
                                        </div>
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsWishlisted(!isWishlisted);
                                        }}
                                        className={`p-1.5 rounded-full transition-colors md:hidden shrink-0 ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-slate-300 hover:text-red-500'}`}
                                        aria-label="Save to wishlist"
                                    >
                                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Full-width Stats Section (Utilizes 100% card width on mobile & desktop) */}
                        <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-3 sm:gap-x-6 bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-100/80 group-hover:bg-orange-50/30 transition-colors duration-300 w-full min-w-0">
                            {/* Exam */}
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">Exam Accepted</p>
                                <p className="text-xs font-medium text-slate-900 truncate" title={exams.join(", ")}>
                                    {exams.length > 0 ? exams.join(", ") : "N/A"}
                                </p>
                            </div>
                            {/* Fees (Clickable link to Courses & Fees) */}
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">Fees</p>
                                <p className="text-xs font-bold text-orange-600 truncate">
                                    {feeString ?? (
                                        <Link
                                            to={getCollegeUrl(college.slug, 'courses-fees')}
                                            className="text-orange-600 hover:text-orange-700 hover:underline font-semibold"
                                            title="View courses and fee structure"
                                        >
                                            See details
                                        </Link>
                                    )}
                                </p>
                            </div>
                            {/* Salary */}
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">Avg. Package</p>
                                <p className="text-xs font-medium text-slate-900 truncate">
                                    {salaryDisplay ?? <span className="text-slate-400">N/A</span>}
                                </p>
                            </div>
                            {/* Courses */}
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">Total Courses</p>
                                <p className="text-xs font-medium text-orange-600 truncate">
                                    {college.courses?.length ? `${college.courses.length} Courses` : <span className="text-slate-400">N/A</span>}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Links (Desktop) */}
                        <div className="hidden md:flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                            <div className="flex gap-4 text-xs font-medium text-blue-600">
                                <Link to={getCollegeUrl(college.slug, 'placements')} className="hover:underline">Placement</Link>
                                <span className="text-slate-300">|</span>
                                <Link to={getCollegeUrl(college.slug, 'admission')} className="hover:underline">Admission</Link>
                                <span className="text-slate-300">|</span>
                                <Link to={getCollegeUrl(college.slug, 'facilities')} className="hover:underline">Facilities</Link>
                            </div>

                            {rankingText && (
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                <Trophy size={14} className="text-yellow-500" />
                                Ranking - <span className="text-slate-900">{rankingText}</span>
                              </div>
                            )}
                        </div>
                    </div>

                    {/* --- Right Actions Column --- */}
                    {/* On mobile (< 640px): 2 columns with Compare & Brochure side-by-side and Apply Now full width below */}
                    {/* On tablet (640-768px): 3 columns in single row */}
                    {/* On desktop (>= 768px): Vertical column on the right */}
                    <div className="border-t md:border-t-0 md:border-l border-slate-100 p-2.5 sm:p-4 md:w-[200px] bg-slate-50/40 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-2 items-stretch w-full min-w-0">
                        <Button
                            type="button"
                            onClick={handleCompareClick}
                            variant="outline"
                            className="w-full h-9 sm:h-10 px-2 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all"
                        >
                            <Scale className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                            <span className="truncate">Compare</span>
                        </Button>

                        <Button
                            type="button"
                            onClick={handleBrochureClick}
                            variant="outline"
                            className="w-full h-9 sm:h-10 px-2 text-xs font-medium border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 shadow-sm transition-all"
                        >
                            <Download className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                            <span className="truncate">Brochure</span>
                        </Button>

                        <Button
                            type="button"
                            onClick={handleApplyClick}
                            className="col-span-2 sm:col-span-1 md:col-span-auto w-full h-10 px-3 text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all border-0"
                        >
                            <span>Apply Now</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                        </Button>
                    </div>

                </div>
            </Card>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
            />
        </>
    );
};

export default CollegeCardHorizontal;
