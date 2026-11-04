import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used
// Assuming a service function to fetch programs exists
// import { fetchPrograms } from '@/services/programService'; // Placeholder

// Define the structure of a program object based on provided schema
interface Program {
  id: string; // uuid
  name: string; // text
  level: string | null; // text
  // program_id: string; // This is a foreign key to programs itself, not for linking to colleges.
  // The user mentioned 'program_id' for courses, but for programs, we'll use 'id' to link to colleges.
  // The table structure provided for 'courses' has 'program_id' which links to 'programs'.
  // For 'PopularPrograms', we need to link to colleges. The 'courses' table has 'college_id'.
  // It's unclear how 'programs' directly links to 'colleges' from the provided schema.
  // Assuming for now that we can filter colleges by program ID, or that there's a direct link.
  // If not, we might need to join or fetch related data.
  // For now, let's assume a direct link or a way to filter colleges by program ID.
  // Let's use 'id' of the program to link to colleges.
}

const PopularPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        // Replace with actual data fetching logic
        // For now, using dummy data based on the provided table structure
        // Assuming 'programs' table has 'id', 'name', and 'level'
        const fetchedPrograms: Program[] = [
          { id: 'prog1', name: 'Bachelor of Technology', level: 'Undergraduate' },
          { id: 'prog2', name: 'Master of Business Administration', level: 'Postgraduate' },
          { id: 'prog3', name: 'Doctor of Philosophy', level: 'Doctoral' },
          { id: 'prog4', name: 'Associate Degree in Arts', level: 'Associate' },
        ];
        setPrograms(fetchedPrograms);
        setError(null);
      } catch (err) {
        setError('Failed to load programs.');
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading programs...</div>; // Placeholder for loading state
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>; // Placeholder for error state
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.length > 0 ? (
            programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-3">{program.name}</h3>
                {program.level && <p className="text-gray-600 mb-4">Level: {program.level}</p>}
                <p className="text-gray-600 mb-4">Explore colleges offering this program.</p>
                <Link
                  to={`/colleges/${program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                  className="btn btn-secondary btn-outline mt-auto" // Using daisyUI classes, mt-auto to push to bottom
                >
                  View Colleges
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No popular programs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularPrograms;
