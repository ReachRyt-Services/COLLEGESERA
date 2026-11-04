
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "./types";
import { debounce } from "./utils";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";

export const useSearchLogic = (
  generateSuggestions: (query: string) => SearchSuggestion[],
  onSearch?: (query: string) => void
) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const generateSuggestionsRef = useRef(generateSuggestions);
  useEffect(() => {
    generateSuggestionsRef.current = generateSuggestions;
  }, [generateSuggestions]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        if (searchQuery.length < 2) {
          setSuggestions([]);
          setIsLoading(false);
          return;
        }

        const filtered = generateSuggestionsRef.current(searchQuery);
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300),
    []
  );

  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true);
      debouncedSearch(query);
    } else {
      setSuggestions((prev) => (prev.length === 0 ? prev : []));
      setIsLoading((prev) => (prev ? false : prev));
    }
  }, [query, debouncedSearch]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const slug = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/${slug}`);
      setIsOpen(false);
      setQuery(searchQuery);
      if (onSearch) {
        onSearch(searchQuery);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(query);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'college') {
      navigate(`/college/${getCleanCollegeSlug(suggestion.id)}`);
    } else {
      handleSearch(suggestion.text);
    }
    setIsOpen(false);
    setQuery(suggestion.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return {
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
    handleBlur,
    setIsOpen,
    setSelectedIndex
  };
};
