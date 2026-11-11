import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticlesByLabel } from "@/services/articleService";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  ArrowRight
} from "lucide-react";

const Footer = () => {

  const { data: exams = [] } = useQuery({
    queryKey: ['footer-exams'],
    queryFn: () => getArticlesByLabel('Exam'),
  });

  // Take only top 5 exams
  const topExams = exams.slice(0, 5);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 font-sans">

      {/* CTA / Newsletter Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -top-10 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Unlock your potential today
              </h3>
              <p className="text-orange-100 text-sm max-w-md">
                Get expert career advice, daily exam updates, and personalized counseling directly to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-4 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none w-full sm:w-64"
                />
              </div>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 h-12 px-6 rounded-lg shadow-lg transition-all hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="pt-0 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <div>
              <Link to="/" className="text-3xl font-bold text-white tracking-tight">
                College<span className="text-orange-500">Sera</span>
              </Link>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                Empowering students with accurate data, expert counseling, and the latest updates on India's leading institutions.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61581886108783", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/collegesera/", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/collegesera/", label: "LinkedIn" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-800 hover:border-orange-500"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Top Colleges & Programs) */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Top Colleges <span className="h-1 w-8 bg-orange-500 rounded-full inline-block"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/top-mba-colleges-in-coimbatore"
                  className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 group font-medium text-orange-400"
                >
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Top MBA Colleges in Coimbatore
                </Link>
              </li>
              <li>
                <Link
                  to="/top-engineering-colleges-in-coimbatore"
                  className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 group"
                >
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Top Engineering Colleges in Coimbatore
                </Link>
              </li>
              {['IIT Madras', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Delhi'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/college/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Exams */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Entrance Exams <span className="h-1 w-8 bg-orange-500 rounded-full inline-block"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {topExams.length > 0 ? (
                topExams.map((exam) => (
                  <li key={exam.id}>
                    <Link
                      to={`/articles/${exam.slug}`}
                      className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {exam.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback if no exams found
                ['JEE Mains 2026', 'GATE 2026', 'CAT 2026', 'XAT 2026', 'NEET UG'].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-200 group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Get in Touch <span className="h-1 w-8 bg-orange-500 rounded-full inline-block"></span>
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Coimbatore</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Chennai</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Bangalore</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Kochi</span>
              </li>
              <li>
                <a
                  href="mailto:help@collegesera.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors duration-200 group"
                >
                  <Mail className="text-orange-500 shrink-0 group-hover:text-orange-400 transition-colors" size={18} />
                  <span>help@collegesera.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/articles" className="hover:text-white transition-colors font-medium text-orange-400 hover:text-orange-300">Articles</Link>
              <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link>
              <Link to="/scholarship" className="hover:text-white transition-colors font-medium text-orange-500 hover:text-orange-400">Scholarship</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
