import React from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  BookOpen,
  Briefcase,
  Stethoscope,
  Smile,
  Scale,
  Pill,
  Building2,
  Leaf,
  Heart,
  Activity,
  Palette,
  UtensilsCrossed,
  Plane,
  Wrench,
  TrendingUp,
} from "lucide-react";

interface StreamItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  bgColor: string;
  colleges: string;
}

const streams: StreamItem[] = [
  {
    name: "Engineering",
    icon: <Cpu className="w-7 h-7" />,
    path: "/colleges/engineering",
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-100",
    colleges: "2500+ Colleges",
  },
  {
    name: "Arts & Science",
    icon: <BookOpen className="w-7 h-7" />,
    path: "/colleges/arts",
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-100",
    colleges: "3000+ Colleges",
  },
  {
    name: "MBA",
    icon: <Briefcase className="w-7 h-7" />,
    path: "/colleges/mba",
    color: "text-amber-600",
    bgColor: "bg-amber-50 hover:bg-amber-100 border-amber-100",
    colleges: "1200+ Colleges",
  },
  {
    name: "Medical",
    icon: <Stethoscope className="w-7 h-7" />,
    path: "/colleges/medical",
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100 border-red-100",
    colleges: "600+ Colleges",
  },
  {
    name: "Dental",
    icon: <Smile className="w-7 h-7" />,
    path: "/colleges/dental",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 hover:bg-cyan-100 border-cyan-100",
    colleges: "300+ Colleges",
  },
  {
    name: "Law",
    icon: <Scale className="w-7 h-7" />,
    path: "/colleges/law",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 hover:bg-indigo-100 border-indigo-100",
    colleges: "450+ Colleges",
  },
  {
    name: "Pharmacy",
    icon: <Pill className="w-7 h-7" />,
    path: "/colleges/pharmacy",
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100 border-green-100",
    colleges: "800+ Colleges",
  },
  {
    name: "Architecture",
    icon: <Building2 className="w-7 h-7" />,
    path: "/colleges/architecture",
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-100",
    colleges: "200+ Colleges",
  },
  {
    name: "Agriculture",
    icon: <Leaf className="w-7 h-7" />,
    path: "/colleges/agriculture",
    color: "text-lime-600",
    bgColor: "bg-lime-50 hover:bg-lime-100 border-lime-100",
    colleges: "350+ Colleges",
  },
  {
    name: "Nursing",
    icon: <Heart className="w-7 h-7" />,
    path: "/colleges/nursing",
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:bg-pink-100 border-pink-100",
    colleges: "700+ Colleges",
  },
  {
    name: "Paramedical",
    icon: <Activity className="w-7 h-7" />,
    path: "/colleges/paramedical",
    color: "text-teal-600",
    bgColor: "bg-teal-50 hover:bg-teal-100 border-teal-100",
    colleges: "500+ Colleges",
  },
  {
    name: "Design",
    icon: <Palette className="w-7 h-7" />,
    path: "/colleges/design",
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-100",
    colleges: "150+ Colleges",
  },
  {
    name: "Hotel Management",
    icon: <UtensilsCrossed className="w-7 h-7" />,
    path: "/colleges/hotel-management",
    color: "text-rose-600",
    bgColor: "bg-rose-50 hover:bg-rose-100 border-rose-100",
    colleges: "250+ Colleges",
  },
  {
    name: "Aviation",
    icon: <Plane className="w-7 h-7" />,
    path: "/colleges/aviation",
    color: "text-sky-600",
    bgColor: "bg-sky-50 hover:bg-sky-100 border-sky-100",
    colleges: "50+ Colleges",
  },
  {
    name: "Polytechnic",
    icon: <Wrench className="w-7 h-7" />,
    path: "/colleges/polytechnic",
    color: "text-slate-600",
    bgColor: "bg-slate-50 hover:bg-slate-100 border-slate-100",
    colleges: "400+ Colleges",
  },
  {
    name: "Commerce",
    icon: <TrendingUp className="w-7 h-7" />,
    path: "/colleges/commerce",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100",
    colleges: "1800+ Colleges",
  },
];

const StreamsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            Browse by Stream
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Explore Colleges by <span className="text-orange-600">Stream</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Find the best colleges across 16+ popular streams. Compare courses, fees, and placements.
          </p>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
          {streams.map((stream) => (
            <Link
              key={stream.name}
              to={stream.path}
              className={`
                group relative flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl border
                ${stream.bgColor}
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3
                  bg-white shadow-sm ${stream.color}
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                {stream.icon}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-sm md:text-base text-slate-800 text-center leading-tight mb-1">
                {stream.name}
              </h3>

              {/* College count */}
              <p className="text-[11px] md:text-xs text-slate-500 font-medium">
                {stream.colleges}
              </p>

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Streams & Colleges
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StreamsSection;
