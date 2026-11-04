import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Star, MapPin, Calendar, Download, ChevronRight, CheckCircle2, BookOpen } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import UserForm from "@/components/UserForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";
import { getCollegeBySlug } from "@/services/collegeService";
import { getCleanCollegeSlug, getCollegeUrl } from "@/utils/collegeUrl";
import SEO from "@/components/SEO";

const CollegeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  // Idle Timer Logic
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const openUserForm = () => {
    setIsUserFormOpen(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(openUserForm, 60000);
  };

  useEffect(() => {
    resetIdleTimer();
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    const handleActivity = () => resetIdleTimer();
    events.forEach(e => window.addEventListener(e, handleActivity));
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach(e => window.removeEventListener(e, handleActivity));
    };
  }, []);

  // Validation & Fetching
  useEffect(() => {
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      navigate("/404", { replace: true });
    }
  }, [slug, navigate]);

  const { data: college, isLoading, error } = useQuery({
    queryKey: ["college", slug],
    queryFn: () => getCollegeBySlug(slug || ""),
    enabled: !!slug,
  });

  // Seamlessly update browser URL if user entered a legacy numeric URL (e.g. /college/2011-college-name)
  useEffect(() => {
    if (slug && /^\d+-/.test(slug)) {
      const clean = getCleanCollegeSlug(slug);
      const newPath = location.pathname.replace(`/college/${slug}`, `/college/${clean}`);
      navigate(newPath, { replace: true });
    }
  }, [slug, location.pathname, navigate]);

  useEffect(() => {
    if (!isLoading && !college && !error) {
      navigate("/404", { replace: true });
    }
  }, [college, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBookingClick={() => setIsBookingModalOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!college) return null;

  const tabs = [
    { id: "overview", path: "/overview", label: "Overview", aliases: [""] },
    { id: "courses-fees", path: "/courses-fees", label: "Courses & Fees", aliases: ["courses", "courses-and-fees"] },
    { id: "admission", path: "/admission", label: "Admission", aliases: ["admissions"] },
    { id: "placements", path: "/placements", label: "Placements", aliases: ["placement"] },
    { id: "rankings", path: "/rankings", label: "Rankings", aliases: ["ranking"] },
    { id: "facilities", path: "/facilities", label: "Facilities", aliases: ["facility"] },
    { id: "news-articles", path: "/news-articles", label: "News & Articles", aliases: ["news", "news-and-articles"] },
  ];

  const normalizedPathname = location.pathname.replace(/\/$/, "");
  const cleanSlug = getCleanCollegeSlug(slug || college.slug);
  const collegeBasePath = `/college/${cleanSlug}`;
  const currentSubPath = normalizedPathname.startsWith(collegeBasePath)
    ? normalizedPathname.slice(collegeBasePath.length).replace(/^\//, "")
    : "";

  const isTabActive = (tab: typeof tabs[0]) => {
    if (currentSubPath === tab.id) return true;
    if (tab.aliases && tab.aliases.includes(currentSubPath)) return true;
    return false;
  };

  const currentTab = tabs.find(tab => isTabActive(tab));

  const pageTitle = (college as any).seo_title || `${college.name} – Courses, Fees and Admission`; 
  const pageDesc = (college as any).seo_description || `Get full details about ${college.name} – courses offered, fees, admission process and placement information. Explore MBA, PGDM and more.`;
  const socialTitle = (college as any).seo_title || `${college.name} – Courses, Fees and Admission | CollegeSera`;
  const socialDesc = (college as any).seo_description || `Discover ${college.name}: courses, fees, admissions, placements and more. A complete guide for prospective students.`;
  const socialImage = (college as any).og_image || college.image_url || "https://collegesera.com/path-to-college-image.jpg";
  const canonicalUrl = `https://collegesera.com/college/${cleanSlug}`;

  // SEO Schema adhering strictly to WebPage, BreadcrumbList, and CollegeOrUniversity (No ItemList, No generic Location)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": pageTitle,
        "url": canonicalUrl,
        "description": pageDesc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://collegesera.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Colleges",
            "item": "https://collegesera.com/colleges"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": college.name,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "CollegeOrUniversity",
        "name": college.name,
        "description": college.description || pageDesc,
        "url": canonicalUrl,
        ...(college.location || college.district ? {
          "address": {
            "@type": "PostalAddress",
            ...(college.location ? { "addressLocality": college.location } : {}),
            ...(college.district ? { "addressRegion": college.district } : {}),
            "addressCountry": "IN"
          }
        } : {}),
        ...(college.college_logo ? { "logo": college.college_logo } : {}),
        ...(college.image_url ? { "image": college.image_url } : {})
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 pt-24">
      {/* Default SEO - can be overridden by child routes */}
      <SEO
        title={pageTitle}
        description={pageDesc}
        image={socialImage}
        url={canonicalUrl}
        schema={schema}
        ogTitle={socialTitle}
        ogDescription={socialDesc}
        twitterTitle={socialTitle}
        twitterDescription={`Complete information on ${college.name}: courses, fees, admissions, placements — perfect for future MBA/PGDM students.`}
      />
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      {/* BREADCRUMBS */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/colleges" className="hover:text-blue-600">Colleges</Link>
          <ChevronRight className="w-4 h-4" />
          {currentTab && currentTab.id !== "overview" ? (
            <>
              <Link to={`/college/${cleanSlug}`} className="hover:text-blue-600 truncate max-w-[200px] md:max-w-none">
                {college.name}
              </Link>
              <ChevronRight className="w-4 h-4 shrink-0" />
              <span className="text-gray-900 font-medium whitespace-nowrap">{currentTab.label}</span>
            </>
          ) : (
            <span className="text-gray-900 font-medium truncate">{college.name}</span>
          )}
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative bg-slate-900 min-h-[350px] md:min-h-[400px] flex flex-col justify-end pt-24 pb-12">
        <div className="absolute inset-0">
          <img
            src={college.image_url || "/placeholder-college.jpg"}
            alt={college.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white p-2 rounded-full shadow-2xl shrink-0 border-4 border-white">
              <img src={college.college_logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-white space-y-3 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {college.type && (
                  <Badge className="bg-slate-700/80 hover:bg-slate-700 border border-slate-500 text-white rounded-md flex gap-1"><CheckCircle2 className="w-3 h-3"/> {college.type}</Badge>
                )}
                
                {/* Default rating placeholder until rating is added to DB */}
                <Badge className="bg-green-600 hover:bg-green-700 border-none text-white rounded-md flex gap-1"><Star className="w-3 h-3 fill-white" /> {(college as any).rating || '3.8'}</Badge>
                
                {college.rankings?.map(r => (
                  <Badge key={`${r.agency}-${r.year}`} className="bg-orange-500 hover:bg-orange-600 border-none text-white rounded-md">{r.agency} #{r.rank}</Badge>
                ))}

                <div className="hidden sm:flex gap-2">
                  {college.naac_grade && (
                    <Badge variant="outline" className="text-gray-300 border-gray-500 rounded-md">NAAC {college.naac_grade}</Badge>
                  )}
                  
                  {college.highlights?.map((h: any) => typeof h === 'string' ? h : h?.label || '').filter((h: string) => ['AICTE', 'UGC', 'NBA', 'MCI', 'DCI', 'PCI'].includes(h.toUpperCase())).map((approval: string) => (
                    <Badge key={approval} variant="outline" className="text-gray-300 border-gray-500 rounded-md">{approval.toUpperCase()}</Badge>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-400" /> {college.location}, {college.district}</div>
                {college.established && (
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-orange-400" /> Est. {college.established}</div>
                )}
              </div>
            </div>
          </div>

          {/* Glassmorphic Stats Banner */}
          <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 md:gap-12 w-full md:w-auto">
              {/* Courses Count */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Courses</p>
                  <p className="text-white font-bold text-sm md:text-lg">
                    {college.courses && college.courses.length > 0
                      ? `${college.courses.length}+`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              {/* Established */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Est.</p>
                  <p className="text-white font-bold text-sm md:text-lg">{college.established || 'N/A'}</p>
                </div>
              </div>
              {/* NAAC */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-white fill-transparent" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">NAAC</p>
                  <p className="text-white font-bold text-sm md:text-lg">{college.naac_grade || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Button onClick={() => setIsUserFormOpen(true)} className="w-full md:w-auto bg-white hover:bg-orange-50 text-slate-900 rounded-full px-8 py-6 font-bold text-base shadow-lg transition-transform hover:scale-105">
              Apply Now <ChevronRight className="w-5 h-5 ml-2 text-orange-500" />
            </Button>
          </div>

        </div>
      </div>

      {/* STICKY TAB NAV */}
      <div className="sticky top-0 md:top-[65px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 md:gap-8">
            {tabs.map((tab) => {
              const active = isTabActive(tab);
              return (
                <NavLink
                  key={tab.id}
                  to={getCollegeUrl(cleanSlug, tab.path)}
                  className={`
                    py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors inline-block
                    ${active
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                    }
                  `}
                  onClick={() => window.scrollTo({ top: 380, behavior: "smooth" })}
                >
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN - Render Child Route Here */}
        <div className="lg:col-span-8">
          <Outlet context={{ college }} />
        </div>

        {/* RIGHT SIDEBAR (Always visible) */}
        <div className="lg:col-span-4">
          <div className="sticky top-[140px] space-y-6">
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-slate-900 p-6 text-white text-center">
                <h3 className="font-bold text-xl mb-1">Get Admission Details</h3>
                <p className="text-slate-300 text-sm">Fill in your details to get a callback</p>
              </div>
              <CardContent className="p-6 bg-white space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter your full name" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 rounded-l-lg text-sm">+91</span>
                    <input type="tel" placeholder="9999999999" className="flex-1 w-full border border-slate-300 rounded-r-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Course of Interest</label>
                  <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-slate-700">
                    <option value="">Select a course</option>
                    {(college.courses || []).length > 0
                      ? college.courses!.map((c: any) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))
                      : (
                        <>
                          <option>B.Tech</option>
                          <option>MBA</option>
                          <option>B.Sc</option>
                        </>
                      )
                    }
                  </select>
                </div>
                <Button onClick={() => setIsUserFormOpen(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl font-bold text-base mt-2 shadow-lg shadow-orange-500/30">
                  Get Free Counselling
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
                  By submitting, you agree to receive communications from {college.name}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          variant="outline"
          className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
          onClick={() => college.brochure_file ? window.open(college.brochure_file, '_blank') : alert('Brochure not available')}
        >
          <Download className="w-4 h-4 mr-2" /> Brochure
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setIsUserFormOpen(true)}>
          Apply Now
        </Button>
      </div>

      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <UserForm isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} />
    </div>
  );
};

export default CollegeDetail;