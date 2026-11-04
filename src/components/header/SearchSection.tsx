
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchAutocomplete from "../SearchAutocomplete";

const SearchSection = () => {
  return (
    <>
      {/* Search Bar - Responsive */}
      <div className="hidden sm:flex bg-gray-100 rounded-lg px-3 py-2 w-full max-w-xs">
        <SearchAutocomplete
          placeholder="Search colleges, courses..."
          variant="header"
          showIcon={true}
          className="w-full"
          inputClassName="bg-transparent text-gray-700 placeholder:text-gray-500"
        />
      </div>

      {/* Mobile Search Icon */}
      <Button variant="ghost" size="sm" className="sm:hidden p-2">
        <Search size={20} className="text-gray-600" />
      </Button>
    </>
  );
};

export default SearchSection;
