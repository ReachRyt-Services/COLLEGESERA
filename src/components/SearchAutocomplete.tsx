
import { useRef, useCallback } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";
import { cn } from "@/lib/utils";
import { SearchAutocompleteProps } from "./search/types";
import { useSuggestionGenerator } from "./search/useSuggestionGenerator";
import { useSearchLogic } from "./search/useSearchLogic";
import SearchDropdown from "./search/SearchDropdown";

const SearchAutocomplete = ({ 
  placeholder = "Search colleges, courses, or locations...", 
  className = "",
  inputClassName = "",
  showIcon = true,
  onSearch,
  variant = 'hero'
}: SearchAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: colleges = [] } = useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  const generateSuggestions = useSuggestionGenerator(colleges);
  
  const {
    query,
    isOpen,
    selectedIndex,
    suggestions,
    isLoading,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    handleSubmit,
    handleFocus,
    handleBlur
  } = useSearchLogic(generateSuggestions, onSearch);

  const handleBlurWithDropdown = (e: React.FocusEvent) => {
    // Delay closing to allow clicking on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        handleBlur();
      }
    }, 150);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center">
          {showIcon && (
            <MapPin className="w-5 h-5 text-gray-500 absolute left-3 z-10" />
          )}
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlurWithDropdown}
            placeholder={placeholder}
            className={cn(
              "w-full transition-all duration-200",
              showIcon ? "pl-10" : "pl-4",
              variant === 'hero' 
                ? "pr-4 py-4 text-lg border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder:text-gray-500" 
                : "pr-4",
              // Remove default focus styles that cause black outline
              "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
              inputClassName
            )}
          />
        </div>
      </form>

      <SearchDropdown
        ref={dropdownRef}
        isOpen={isOpen && (query.length >= 2 || suggestions.length > 0)}
        query={query}
        suggestions={suggestions}
        isLoading={isLoading}
        selectedIndex={selectedIndex}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
};

export default SearchAutocomplete;
