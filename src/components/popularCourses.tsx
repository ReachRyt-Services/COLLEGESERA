import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, ClipboardList } from "lucide-react";

interface Program {
  id: string;
  name: string;
  level: string | null;
}

const SkeletonProgramCard: React.FC = () => (
  <div className="animate-pulse bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gray-200" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
    <div className="h-8 bg-gray-200 rounded w-32" />
  </div>
);

const PopularPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        // === NO BACKEND CHANGE ===
        // keep data-fetching logic as-is; using dummy data for now
        const fetchedPrograms: Program[] = [
          { id: "prog1", name: "Bachelor of Technology", level: "Undergraduate" },
          { id: "prog2", name: "Master of Business Administration", level: "Postgraduate" },
          { id: "prog3", name: "Doctor of Philosophy", level: "Doctoral" },
          { id: "prog4", name: "Associate Degree in Arts", level: "Associate" },
        ];

        // small artificial delay to show loading UI nicely (dev only)
        await new Promise((r) => setTimeout(r, 220));
        setPrograms(fetchedPrograms);
        setError(null);
      } catch (err) {
        setError("Failed to load programs.");
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Popular <span className="text-orange-500">Courses</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-1 max-w-xl">
              Trending course levels and pathways — find the right one and explore colleges offering them.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
              aria-label="Browse all courses"
            >
              Browse all courses
            </Link>
          </div>
        </div>

        {/* error */}
        {error && !loading && (
          <div className="text-center text-red-500 py-6">{error}</div>
        )}

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonProgramCard key={i} />)
            : programs.length > 0
              ? programs.map((program) => (
                <article
                  key={program.id}
                  className="
                    relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm
                    hover:shadow-xl transition-transform duration-300 hover:-translate-y-1
                    flex flex-col
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 truncate">
                        {program.name}
                      </h3>

                      {program.level && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            {program.level}
                          </span>
                          <span className="text-xs text-slate-500">Popular pathway</span>
                        </div>
                      )}

                      <p className="text-sm text-slate-600 mt-3">
                        Explore colleges that offer <strong>{program.name}</strong> and compare fees, admissions & placements.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/colleges/${program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium shadow hover:from-orange-600 hover:to-orange-700 transition"
                      aria-label={`View colleges for ${program.name}`}
                    >
                      View Colleges
                      <ClipboardList className="w-4 h-4" />
                    </Link>

                    <Link
                      to={`/colleges/${program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                      className="text-sm text-slate-500 hover:text-slate-700 transition"
                    >
                      Learn more →
                    </Link>
                  </div>

                  {/* subtle hover wash */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-orange-50 to-transparent" />
                </article>
              ))
              : (
                <div className="col-span-full text-center py-12 text-slate-500">
                  No popular courses found.
                </div>
              )}
        </div>
      </div>
    </section>
  );
};

export default PopularPrograms;
