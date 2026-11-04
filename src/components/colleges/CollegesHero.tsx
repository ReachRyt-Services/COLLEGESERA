
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import SearchAutocomplete from "../SearchAutocomplete";

interface CollegesHeroProps {
  collegeCount: number;
}

const CollegesHero = ({ collegeCount }: CollegesHeroProps) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div id="hero-section" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
              <div className="flex-1">
                <SearchAutocomplete
                  placeholder="Search colleges by name, location, or course..."
                  variant="hero"
                  showIcon={true}
                  className="flex-1"
                  inputClassName="text-gray-700 text-lg"
                />
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 px-6 ml-2"
                onClick={() => {
                  const searchInput = document.querySelector('input[placeholder*="Search colleges by name"]') as HTMLInputElement;
                  if (searchInput?.value) {
                    const slug = searchInput.value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    window.location.href = `/${slug}`;
                  }
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegesHero;
