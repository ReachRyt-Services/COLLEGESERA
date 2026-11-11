import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";
import { useSuggestionGenerator } from "./search/useSuggestionGenerator";
import { useSearchLogic } from "./search/useSearchLogic";
import SearchDropdown from "./search/SearchDropdown";

/* ---------- ANIMATED DROPDOWN WRAPPER ---------- */
const MegaWrapper: React.FC<{
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}> = ({ children, isVisible, onClose }) => (
  <div
    onClick={onClose}
    className={`
      absolute left-1/2 top-full mt-2
      w-[min(1100px,95vw)] 
      -translate-x-1/2 
      bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50
      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] 
      origin-top
      ${isVisible ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 -translate-y-4 scale-95 invisible"}
    `}
    onMouseEnter={(e) => e.stopPropagation()}
    role="menu"
  >
    <div className="p-8">{children}</div>
  </div>
);

/* ---------- HELPERS ---------- */
const ParentLink: React.FC<{ parent: string; children: React.ReactNode }> = ({ parent, children }) => (
  <Link to={parent} className="block text-sm text-slate-600 hover:text-orange-600 hover:translate-x-1 transition-transform duration-200">
    {children}
  </Link>
);

const SectionHeader: React.FC<{ children: React.ReactNode; link?: string }> = ({ children, link }) => (
  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2">
    {link ? (
      <Link to={link} className="hover:text-orange-600 transition-colors inline-flex items-center gap-1">
        {children}
      </Link>
    ) : (
      children
    )}
  </h4>
);

/* ---------- UNIVERSITIES MEGA ---------- */
const UniversitiesMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">Find your Universities</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Explore top rated universities across South India based on NIRF ranking, placements, and student reviews.
      </p>
      <Link to="/colleges/universities" className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-orange-700 transition-colors">
        View All Universities
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-3 gap-8">
      <div>
        <SectionHeader>By State</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/university/by-state/tamilnadu-universities">Tamil Nadu Universities</ParentLink></li>
          <li><ParentLink parent="/colleges/university/by-state/kerala-universities">Kerala Universities</ParentLink></li>
          <li><ParentLink parent="/colleges/university/by-state/karnataka-universities">Karnataka Universities</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader>Popular</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/university/popular/top-ranked-universities">Top Ranked Universities</ParentLink></li>
          <li><ParentLink parent="/colleges/university/popular/featured-universities">Featured Universities</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader>Trending Searches</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/university/trending-searches/top-universities-in-tamil-nadu">Top Universities in Tamil Nadu</ParentLink></li>
          <li><ParentLink parent="/colleges/university/trending-searches/top-universities-in-kerala">Top Universities in Kerala</ParentLink></li>
          <li><ParentLink parent="/colleges/university/trending-searches/top-universities-in-karnataka">Top Universities in Karnataka</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- ENGINEERING MEGA ---------- */
const EngineeringMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">Engineering</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Discover top engineering colleges across South India with course details, fees & placement data.
      </p>
      <Link to="/colleges/engineering" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
        All Engineering Colleges
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-2 gap-8">
      <div>
        <SectionHeader>Top Engineering Colleges in</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/engineering/top-engineering-colleges-in/tamilnadu-engineering-colleges">Tamil Nadu</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-engineering-colleges-in/kerala-engineering-colleges">Kerala</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-engineering-colleges-in/karnataka-engineering-colleges">Karnataka</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/engineering/top-cities">Top Cities</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/engineering/top-cities/chennai">Chennai</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-cities/coimbatore">Coimbatore</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-cities/bangalore">Bangalore</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-cities/kochi">Kochi</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-cities/salem">Salem</ParentLink></li>
          <li><ParentLink parent="/colleges/engineering/top-cities/erode">Erode</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- ARTS & SCIENCE MEGA ---------- */
const ArtsMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">Arts & Science</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Find the best Arts & Science colleges across South India for BA, BSc, BCom & more.
      </p>
      <Link to="/colleges/arts" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-purple-700 transition-colors">
        All Arts & Science Colleges
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-2 gap-8">
      <div>
        <SectionHeader>Top Arts & Science Colleges in</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/arts/top-arts-colleges-in/tamilnadu-arts-colleges">Tamil Nadu</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-arts-colleges-in/kerala-arts-colleges">Kerala</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-arts-colleges-in/karnataka-arts-colleges">Karnataka</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/arts/top-cities">Top Cities</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/arts/top-cities/chennai">Chennai</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-cities/coimbatore">Coimbatore</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-cities/bangalore">Bangalore</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-cities/kochi">Kochi</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-cities/salem">Salem</ParentLink></li>
          <li><ParentLink parent="/colleges/arts/top-cities/erode">Erode</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- MBA MEGA ---------- */
const MbaMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">MBA</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Top MBA & PGDM colleges across South India with specializations, fees & ROI data.
      </p>
      <Link to="/colleges/mba" className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-amber-700 transition-colors">
        All MBA Colleges
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-2 gap-8">
      <div>
        <SectionHeader>Top MBA Colleges in</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/mba/top-mba-colleges-in/tamilnadu-mba-colleges">Tamil Nadu</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-mba-colleges-in/kerala-mba-colleges">Kerala</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-mba-colleges-in/karnataka-mba-colleges">Karnataka</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/mba/top-cities">Top Cities</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/mba/top-cities/chennai">Chennai</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-cities/coimbatore">Coimbatore</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-cities/bangalore">Bangalore</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-cities/kochi">Kochi</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-cities/salem">Salem</ParentLink></li>
          <li><ParentLink parent="/colleges/mba/top-cities/erode">Erode</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- PARAMEDICAL MEGA ---------- */
const ParamedicalMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">Paramedical</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Explore top paramedical colleges offering BPT, DMLT, B.Sc Nursing & more across South India.
      </p>
      <Link to="/colleges/paramedical" className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-teal-700 transition-colors">
        All Paramedical Colleges
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-2 gap-8">
      <div>
        <SectionHeader>Top Paramedical Colleges in</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/tamilnadu-paramedical-colleges">Tamil Nadu</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/kerala-paramedical-colleges">Kerala</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/karnataka-paramedical-colleges">Karnataka</ParentLink></li>
        </ul>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-6 mb-4 border-b border-slate-50 pb-2">Popular Courses</h4>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/paramedical/popular-courses/bsc-nursing">B.Sc Nursing</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/popular-courses/b-pharm">B.Pharm (Pharmacy)</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/popular-courses/bpt">BPT (Physiotherapy)</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/popular-courses/dmlt">DMLT (Lab Technology)</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader>More Courses</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/colleges/paramedical/more-courses/bot">BOT (Occupational Therapy)</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-radiology">B.Sc Radiology</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-cardiac-technology">B.Sc Cardiac Technology</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-optometry">B.Sc Optometry</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-renal-dialysis">B.Sc Renal Dialysis</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-anaesthesia">B.Sc Anaesthesia Technology</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-respiratory">B.Sc Respiratory Therapy</ParentLink></li>
          <li><ParentLink parent="/colleges/paramedical/more-courses/bsc-emergency-medicine">B.Sc Emergency Medicine</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- EXAMS MEGA ---------- */
const ExamsMega = () => (
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-4 bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100">
      <h3 className="font-bold text-xl text-slate-900 mb-2">Entrance Exams</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Complete guide to all major entrance examinations with dates, syllabus & preparation tips.
      </p>
      <Link to="/exams" className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-red-700 transition-colors">
        View All Exams
      </Link>
    </div>
    <div className="col-span-8 grid grid-cols-3 gap-8">
      <div>
        <SectionHeader>Engineering Exams</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/exams/jee-main">JEE Main</ParentLink></li>
          <li><ParentLink parent="/exams/jee-advanced">JEE Advanced</ParentLink></li>
          <li><ParentLink parent="/exams/tnea">TNEA</ParentLink></li>
          <li><ParentLink parent="/exams/gate">GATE</ParentLink></li>
          <li><ParentLink parent="/exams/bitsat">BITSAT</ParentLink></li>
          <li><ParentLink parent="/exams/viteee">VITEEE</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader>Medical & Law</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/exams/neet-ug">NEET UG</ParentLink></li>
          <li><ParentLink parent="/exams/neet-pg">NEET PG</ParentLink></li>
          <li><ParentLink parent="/exams/clat">CLAT</ParentLink></li>
          <li><ParentLink parent="/exams/nata">NATA</ParentLink></li>
          <li><ParentLink parent="/exams/cuet">CUET</ParentLink></li>
        </ul>
      </div>
      <div>
        <SectionHeader>MBA & Others</SectionHeader>
        <ul className="space-y-3">
          <li><ParentLink parent="/exams/cat">CAT</ParentLink></li>
          <li><ParentLink parent="/exams/mat">MAT</ParentLink></li>
          <li><ParentLink parent="/exams/cmat">CMAT</ParentLink></li>
          <li><ParentLink parent="/exams/xat">XAT</ParentLink></li>
          <li><ParentLink parent="/exams/tancet">TANCET</ParentLink></li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- MAIN HEADER ---------- */
type MenuKey = "universities" | "engineering" | "arts" | "paramedical" | "mba" | "exams" | null;

const Header: React.FC<{ onBookingClick?: () => void }> = ({ onBookingClick }) => {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: colleges = [] } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => getColleges(),
  });

  const generateSuggestions = useSuggestionGenerator(colleges);

  const handleMouseEnter = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(key);
  };

  const handleHeaderLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const closeImmediate = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(null);
  };

  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    isOpen: isSearchDropdownOpen,
    selectedIndex,
    suggestions,
    isLoading: isSearchLoading,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    handleSubmit: handleSearchSubmit,
    handleFocus: handleSearchFocus,
    handleBlur: handleSearchBlur,
  } = useSearchLogic(generateSuggestions, () => {
    closeImmediate();
    setMobileOpen(false);
  });

  const handleBlurWithDropdown = (e: React.FocusEvent) => {
    setTimeout(() => {
      const related = e.relatedTarget as Node | null;
      if (
        !desktopDropdownRef.current?.contains(related) &&
        !mobileDropdownRef.current?.contains(related)
      ) {
        handleSearchBlur();
      }
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        handleSearchBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleSearchBlur]);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // If bottom of hero section is at or above navbar bottom
        setIsPastHero(rect.bottom <= 90);
      } else {
        // Default scroll threshold fallback for pages without an explicit hero section
        setIsPastHero(window.scrollY > 250);
      }
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (path: string) => {
    navigate(path);
    closeImmediate();
    setMobileOpen(false);
  };

  const navItems: { label: string; key: MenuKey; path: string }[] = [
    { label: "Universities", key: "universities", path: "/colleges/universities" },
    { label: "Engineering", key: "engineering", path: "/colleges/engineering" },
    { label: "Arts & Science", key: "arts", path: "/colleges/arts" },
    { label: "MBA", key: "mba", path: "/colleges/mba" },
    { label: "Paramedical", key: "paramedical", path: "/colleges/paramedical" },
    { label: "Exams", key: "exams", path: "/exams" },
  ];

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleHeaderLeave}
      className={`
        fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200
        transition-all duration-300 ease-in-out
        ${isScrolled ? "py-1 shadow-md" : "py-1.5"}
      `}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-3 relative z-50 bg-white">

        {/* LOGO - Made bigger */}
        <Link to="/" className="flex-shrink-0 cursor-pointer py-0.5 flex items-center" onClick={closeImmediate}>
          <img
            src="/CollegeseraLogo.png"
            alt="Collegesera"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-16 md:h-20" : "h-20 sm:h-24 md:h-28"}`}
          />
        </Link>

        {/* DESKTOP NAV ITEMS - Hides smoothly when scrolled past hero */}
        <nav
          className={`
            hidden lg:flex items-center gap-1 transition-all duration-500 ease-in-out origin-left
            ${isPastHero
              ? "opacity-0 max-w-0 -translate-x-6 pointer-events-none overflow-hidden"
              : "opacity-100 max-w-[850px] translate-x-0 overflow-visible"}
          `}
        >
          {navItems.map((item) => (
            <div key={item.key} className="group shrink-0" onMouseEnter={() => handleMouseEnter(item.key)}>
              <button
                onClick={() => go(item.path)}
                className={`
                  flex items-center gap-1 px-3 py-2 text-base font-bold rounded-full transition-colors whitespace-nowrap
                  ${openMenu === item.key
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-700 hover:text-orange-600 hover:bg-slate-50"}
                `}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openMenu === item.key ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          ))}
        </nav>

        {/* DESKTOP SEARCH BAR - Replaces toll-free number & expands when scrolled past hero */}
        <div
          className={`
            hidden lg:flex items-center transition-all duration-500 ease-in-out
            ${isPastHero ? "flex-1 max-w-2xl mx-4" : "w-64 xl:w-72"}
          `}
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div
              className={`
                flex items-center bg-slate-100 hover:bg-slate-50 focus-within:bg-white
                border border-slate-200 focus-within:border-orange-500 rounded-full
                transition-all duration-300 shadow-sm
                ${isPastHero ? "py-2.5 px-4" : "py-1.5 px-3"}
              `}
            >
              <Search size={isPastHero ? 18 : 15} className="text-slate-400 mr-2 shrink-0 transition-all duration-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleSearchFocus}
                onBlur={handleBlurWithDropdown}
                placeholder={isPastHero ? "Search colleges, courses, cities, exams..." : "Search colleges..."}
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-slate-400 hover:text-slate-600 px-1 shrink-0"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className={`
                  ml-2 shrink-0 rounded-full font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all
                  ${isPastHero ? "px-4 py-1.5 text-xs shadow-sm" : "p-1.5"}
                `}
                title="Search"
              >
                {isPastHero ? "Search" : <Search size={13} />}
              </button>
            </div>

            <SearchDropdown
              ref={desktopDropdownRef}
              isOpen={isSearchDropdownOpen && (searchQuery.trim().length >= 1 || suggestions.length > 0)}
              query={searchQuery}
              suggestions={suggestions}
              isLoading={isSearchLoading}
              selectedIndex={selectedIndex}
              onSuggestionClick={handleSuggestionClick}
              className="min-w-[320px] sm:min-w-[380px] right-0 left-auto lg:left-0"
            />
          </form>
        </div>

        {/* DESKTOP ACTIONS - Ask Sera Chatbot */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="https://chat.collegesera.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg transition-all shrink-0"
          >
            {/* Bot icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M12 2a2 2 0 0 1 2 2v3H10V4a2 2 0 0 1 2-2z"/>
              <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none"/>
              <path d="M8 11V7" strokeWidth="1.5"/>
              <path d="M16 11V7" strokeWidth="1.5"/>
            </svg>
            <span className="relative z-10">Ask Sera</span>
          </a>
        </div>

        {/* MOBILE HAMBURGER */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* MEGA MENUS */}
      <div className="hidden lg:block">
        <MegaWrapper isVisible={openMenu === "universities"} onClose={closeImmediate}><UniversitiesMega /></MegaWrapper>
        <MegaWrapper isVisible={openMenu === "engineering"} onClose={closeImmediate}><EngineeringMega /></MegaWrapper>
        <MegaWrapper isVisible={openMenu === "arts"} onClose={closeImmediate}><ArtsMega /></MegaWrapper>
        <MegaWrapper isVisible={openMenu === "mba"} onClose={closeImmediate}><MbaMega /></MegaWrapper>
        <MegaWrapper isVisible={openMenu === "paramedical"} onClose={closeImmediate}><ParamedicalMega /></MegaWrapper>
        <MegaWrapper isVisible={openMenu === "exams"} onClose={closeImmediate}><ExamsMega /></MegaWrapper>
      </div>

      {/* BACKDROP */}
      <div
        onClick={closeImmediate}
        className={`
          fixed inset-0 top-[80px] bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300
          ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white h-[calc(100vh-60px)] overflow-y-auto border-t border-slate-100 shadow-xl z-50">
          <div className="p-4 space-y-2">
            {/* Search Bar Mobile (replacing toll-free) */}
            <form onSubmit={handleSearchSubmit} className="mb-4 relative">
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5">
                <Search size={18} className="text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleSearchFocus}
                  onBlur={handleBlurWithDropdown}
                  placeholder="Search colleges, courses, cities..."
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1 shrink-0"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="px-3 py-1 bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors shrink-0 ml-2"
                >
                  Search
                </button>
              </div>

              <SearchDropdown
                ref={mobileDropdownRef}
                isOpen={isSearchDropdownOpen && (searchQuery.trim().length >= 1 || suggestions.length > 0)}
                query={searchQuery}
                suggestions={suggestions}
                isLoading={isSearchLoading}
                selectedIndex={selectedIndex}
                onSuggestionClick={handleSuggestionClick}
              />
            </form>

            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => go(item.path)}
                className="block w-full text-left text-base font-semibold text-slate-800 py-3 border-b border-slate-50"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-6 flex flex-col gap-4">
              <Link to="/articles" className="text-slate-600 font-medium">Articles</Link>
              <a
                href="https://chat.collegesera.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#f97316,#ef4444)', boxShadow:'0 4px 14px rgba(249,115,22,0.4)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M12 2a2 2 0 0 1 2 2v3H10V4a2 2 0 0 1 2-2z"/>
                  <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none"/>
                  <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Ask Sera
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;