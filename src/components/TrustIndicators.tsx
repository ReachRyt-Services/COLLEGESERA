import React from "react";
import { Shield, Star, Award } from "lucide-react";

const partnerColleges = [
  { name: "Anna University", short: "AU", color: "from-red-500 to-red-700" },
  { name: "VIT University", short: "VIT", color: "from-blue-600 to-blue-800" },
  { name: "SRM Institute", short: "SRM", color: "from-indigo-500 to-indigo-700" },
  { name: "Amrita University", short: "AMR", color: "from-orange-500 to-orange-700" },
  { name: "PSG Tech", short: "PSG", color: "from-green-600 to-green-800" },
  { name: "Manipal University", short: "MU", color: "from-purple-500 to-purple-700" },
  { name: "Christ University", short: "CU", color: "from-yellow-500 to-yellow-700" },
  { name: "Loyola College", short: "LC", color: "from-teal-500 to-teal-700" },
  { name: "SASTRA University", short: "SAU", color: "from-cyan-500 to-cyan-700" },
  { name: "Kumaraguru College", short: "KCT", color: "from-rose-500 to-rose-700" },
];

const TrustIndicators: React.FC = () => {
  return (
    <section className="py-14 md:py-16 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            Trusted & Verified
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Trusted by <span className="text-orange-600">Top Colleges</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            India's leading institutions trust CollegeSera to connect them with the right students.
          </p>
        </div>

        {/* Partner Logos - Scrolling Marquee */}
        <div className="relative overflow-hidden py-6">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex animate-marquee gap-6 md:gap-8">
            {[...partnerColleges, ...partnerColleges].map((college, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div
                  className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${college.color}
                    flex items-center justify-center text-white font-bold text-sm md:text-base
                    shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300
                  `}
                >
                  {college.short}
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium text-center max-w-[80px] leading-tight">
                  {college.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: <Shield className="w-6 h-6 text-green-600" />, value: "100%", label: "Verified Data", bg: "bg-green-50" },
            { icon: <Star className="w-6 h-6 text-amber-600" />, value: "4.8/5", label: "Student Rating", bg: "bg-amber-50" },
            { icon: <Award className="w-6 h-6 text-blue-600" />, value: "50+", label: "Partner Colleges", bg: "bg-blue-50" },
            { icon: <Shield className="w-6 h-6 text-purple-600" />, value: "ISO", label: "Certified Platform", bg: "bg-purple-50" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`
                ${stat.bg} rounded-2xl p-5 md:p-6 text-center border border-slate-100
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
              `}
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
