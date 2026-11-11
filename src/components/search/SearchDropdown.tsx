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
  className?: string;
}

const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ isOpen, query, suggestions, isLoading, selectedIndex, onSuggestionClick, className }, ref) => {
    const trimmed = query.trim();
    if (!isOpen || (trimmed.length < 1 && suggestions.length === 0)) {
      return null;
    }

    return (
      <div
        ref={ref}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          "absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto",
          className
        )}
      >
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="py-1.5">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id}-${index}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSuggestionClick(suggestion)}
                className={cn(
                  "w-full px-4 py-2.5 text-left hover:bg-orange-50/70 flex items-center space-x-3 transition-colors border-b border-gray-50 last:border-0",
                  selectedIndex === index && "bg-orange-50 border-l-4 border-l-orange-500"
                )}
              >
                {suggestion.icon}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{suggestion.text}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {suggestion.type}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : trimmed.length >= 2 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="flex flex-col items-center space-y-1.5">
              <Search className="w-7 h-7 text-gray-300" />
              <span className="text-sm">No suggestions found for &ldquo;{trimmed}&rdquo;</span>
              <span className="text-xs text-gray-400">Press Enter to search anyway</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;
