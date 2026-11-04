import { Users, Award, TrendingUp, CheckCircle, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SearchAutocomplete from "./SearchAutocomplete";
import { useEffect, useState } from "react";
import SearchOverlay from "./search/SearchOverlay";

// Typewriter rotating strings
const rotatingTexts = [
  "Engineering Colleges",
  "Medical Colleges",
  "MBA Programs",
  "Top Universities",
  "Best Courses",
  "Entrance Exams",
];

// Dynamic social proof messages
const socialProofMessages = [
  { count: 338, college: "Amrita University" },
  { count: 251, college: "VIT University" },
  { count: 189, college: "SRM Institute" },
  { count: 412, college: "Anna University" },
  { count: 176, college: "PSG College of Technology" },
  { count: 295, college: "Manipal University" },
];

// Trending searches
const trendingSearches = [
  "Top Universities in Tamil Nadu",
  "Top Universities in Kerala",
  "Top Universities in Karnataka",
  "Best Engineering Colleges 2026",
  "TNEA Counselling",
  "Top MBA Colleges",
];

// Partner college logos (placeholder logos using initials)
const partnerColleges = [
  { name: "Anna University", short: "AU" },
  { name: "VIT University", short: "VIT" },
  { name: "SRM Institute", short: "SRM" },
  { name: "Amrita University", short: "AU" },
  { name: "PSG Tech", short: "PSG" },
  { name: "Manipal University", short: "MU" },
  { name: "Christ University", short: "CU" },
  { name: "Loyola College", short: "LC" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  // Typewriter Logic
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [socialProofIndex, setSocialProofIndex] = useState(0);

  useEffect(() => {
    const fullText = rotatingTexts[currentTextIndex];

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      }

    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex]);

  // Rotate social proof messages
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % socialProofMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentProof = socialProofMessages[socialProofIndex];

  return (
    <section id="hero-section" className="relative w-full py-24 md:py-32 bg-black overflow-hidden flex flex-col justify-center">

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full pointer-events-none">
        <img
          src="/hero-bg.png"
          className="w-full h-full object-cover"
          alt="University Campus"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Floating Premium Elements Removed for Performance */}

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 md:px-6">

        <div className="max-w-4xl mx-auto w-full">

          {/* HEADLINE */}
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight animate-fade-in drop-shadow-2xl shadow-black">
            South India's Most Trusted Platform <br className="hidden sm:block" />
            For <span className="text-orange-500 block sm:inline mt-2 sm:mt-0">{displayedText}</span>
            <span className="typing-cursor text-orange-500">|</span>
          </h1>

          {/* TAGLINE */}
          <p className="text-orange-300 text-base sm:text-lg md:text-xl font-semibold tracking-wide animate-fade-in mb-2">
            South India's Most Trusted College Discovery Platform
          </p>

          {/* SUBTEXT */}
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in mb-6 font-medium">
            Search, compare, and discover top colleges with verified data and AI‑guided recommendations.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-4 md:mt-6 max-w-2xl mx-auto animate-slide-up w-full">
            <div className="bg-white/95 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 border border-orange-200 backdrop-blur-sm">
              <div className="w-full flex-1 relative" onClick={() => setIsSearchOpen(true)}>
                {/* Overlay trigger */}
                <div className="absolute inset-0 z-10 cursor-text" />
                <SearchAutocomplete
                  placeholder="Search colleges, exams..."
                  variant="hero"
                  className="w-full text-sm md:text-base bg-transparent border-none focus:ring-0"
                />
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-5 text-sm rounded-lg md:rounded-xl shadow-lg"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* DYNAMIC SOCIAL PROOF */}
          <div className="mt-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all duration-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <p className="text-white text-xs sm:text-sm font-medium">
                <span className="text-orange-400 font-bold">{currentProof.count}</span> students searched{" "}
                <span className="text-orange-300 font-semibold">{currentProof.college}</span> in the last hour
              </p>
            </div>
          </div>

          {/* TRENDING SEARCHES */}
          <div className="mt-6 animate-fade-in">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3 font-semibold">
              🔥 Trending Searches
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {trendingSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const slug = search.toLowerCase().replace(/\./g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    navigate(`/${slug}`);
                  }}
                  className="text-xs sm:text-sm px-4 py-2 rounded-full bg-black/40 text-white border border-white/30 backdrop-blur-md hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-10 animate-scale-in">
            {[
              { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-orange-400 mx-auto" />, value: "6000+", label: "Verified Colleges" },
              { icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-orange-400 mx-auto" />, value: "500+", label: "Popular Courses" },
              { icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-400 mx-auto" />, value: "95%", label: "Satisfaction" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-xl p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/20 flex flex-col items-center justify-center shadow-2xl hover:border-orange-500/50 hover:bg-black/60 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="mb-2 p-2 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                  {item.icon}
                </div>
                <p className="text-xl md:text-3xl font-bold text-white">{item.value}</p>
                <p className="text-xs sm:text-sm text-white/70 text-center leading-tight font-medium mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 md:mt-10 animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/colleges">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-xl shadow-xl hover:scale-[1.04] transition-all w-full sm:w-auto"
              >
                Explore All Colleges <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/exams">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 text-base md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-xl shadow-xl hover:scale-[1.04] transition-all w-full sm:w-auto backdrop-blur-sm"
              >
                View All Exams
              </Button>
            </Link>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 md:gap-6 text-white/70 text-xs md:text-sm animate-fade-in">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              ISO Certified
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              Verified Data
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              2M+ Students
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;