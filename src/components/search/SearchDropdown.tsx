
import { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestion } from "./types";

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  selectedIndex: number;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
}

const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ isOpen, query, suggestions, isLoading, selectedIndex, onSuggestionClick }, ref) => {
    if (!isOpen || (query.length < 2 && suggestions.length === 0)) {
      return null;
    }

    return (
      <div 
        ref={ref}
        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
      >
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => onSuggestionClick(suggestion)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors",
                  selectedIndex === index && "bg-orange-50 border-l-4 border-orange-500"
                )}
              >
                {suggestion.icon}
                <div className="flex-1">
                  <span className="text-gray-900">{suggestion.text}</span>
                  <span className="text-xs text-gray-500 ml-2 capitalize">
                    {suggestion.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="flex flex-col items-center space-y-2">
              <Search className="w-8 h-8 text-gray-300" />
              <span>No suggestions found for "{query}"</span>
              <span className="text-xs">Press Enter to search anyway</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;
