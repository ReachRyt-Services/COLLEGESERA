import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, ArrowRight, UserCircle2, Building2 } from "lucide-react";
import { getCollegeUrl } from "@/utils/collegeUrl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import Advertisement from "@/components/Advertisement";
import CollegeDetailsTable from "@/components/colleges/CollegeDetailsTable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { getCollegeDirectory } from "@/services/collegeDirectoryService";

const CollegeDetailsDirectory: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Data
  const { data: colleges = [], isLoading, error } = useQuery({
    queryKey: ["college-directory"],
    queryFn: getCollegeDirectory,
  });

  // Client-side Filtering
  const filteredColleges = useMemo(() => {
    const q = (searchTerm || "").trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter((college: any) => {
      if (!college) return false;
      const fields = [
        college.name,
        college.principalName,
        college.address,
        college.location,
        college.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return fields.includes(q);
    });
  }, [colleges, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      {/* ✅ THE FIX: 'pt-24'
         This creates space at the top so the Header doesn't cover the Title.
      */}
      <div className="pt-24 pb-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
               <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
                 Official Records
               </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              College Directory
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
              Access direct contact information, principal details, and administrative records for top institutions across India.
            </p>

            {/* Elevated Search Bar */}
            <div className="relative max-w-xl shadow-2xl shadow-black/20 rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by college, principal, or city..."
                className="pl-11 pr-4 py-6 w-full rounded-xl border-0 text-slate-900 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500 bg-white"
                aria-label="Search colleges"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16 relative z-10">
        
        {/* Advertisement Banner */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
          <Advertisement placement="results" className="w-full max-h-[100px] object-cover" />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-64 border border-slate-200 shadow-sm space-y-4">
                 <Skeleton className="h-12 w-12 rounded-lg" />
                 <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-4 w-1/2" />
                 <div className="pt-4 flex gap-2">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-10 w-1/2" />
                 </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 text-red-600 p-12 rounded-xl border border-red-100">
            <p className="font-semibold">Unable to load directory data.</p>
            <Button variant="outline" className="mt-4 border-red-200 text-red-600 hover:bg-red-100" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="flex items-center justify-between mb-6">
               <span className="text-slate-500 font-medium text-sm">
                 Showing {filteredColleges.length} institutions
               </span>
               {/* Optional View Switcher could go here */}
            </div>

            {/* MAIN GRID */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.length === 0 ? (
                <div className="col-span-full bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No results found</h3>
                  <p className="mt-2 text-slate-500">We couldn't find any colleges matching "{searchTerm}".</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-orange-600"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                filteredColleges.map((college: any) => (
                  <article
                    key={college.id || college.slug || college.name}
                    className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-5 flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 p-2 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={college.college_logo || "https://via.placeholder.com/100?text=IMG"}
                          alt={`${college.name} logo`}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2 text-lg">
                          {college.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{college.location || college.address || college.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Directory Details (Principal/Admin) */}
                    <div className="px-5 pb-2">
                       <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                          {college.principalName ? (
                             <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                                   <UserCircle2 size={18} />
                                </div>
                                <div>
                                   <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Principal</p>
                                   <p className="text-sm font-semibold text-slate-700 line-clamp-1">{college.principalName}</p>
                                </div>
                             </div>
                          ) : (
                             <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                <Building2 size={16} /> No admin details available
                             </div>
                          )}
                       </div>
                    </div>

                    {/* Tags Row */}
                    <div className="px-5 pt-4 pb-1 flex flex-wrap gap-2">
                       {college.type && (
                          <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                             {college.type}
                          </span>
                       )}
                       <span className="text-[10px] px-2 py-1 bg-green-50 text-green-700 rounded-md font-medium">
                          Verified
                       </span>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto p-5 grid grid-cols-2 gap-3">
                       <Button 
                          variant="outline" 
                          className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200 gap-2"
                          asChild
                       >
                          <a href={`tel:${college.phone}`}>
                             <Phone size={14} /> Call
                          </a>
                       </Button>
                       <Button 
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 shadow-sm"
                          asChild
                       >
                          <Link to={getCollegeUrl(college.slug)}>
                             Details <ArrowRight size={14} />
                          </Link>
                       </Button>
                    </div>
                  </article>
                ))
              )}
            </section>

            {/* Fallback Table View (Optional) */}
            <div className="mt-16">
               <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Full Data Table</span>
                  <div className="h-px flex-1 bg-slate-200"></div>
               </div>
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <CollegeDetailsTable colleges={filteredColleges} />
               </div>
            </div>
          </>
        )}
      </main>

      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default CollegeDetailsDirectory;