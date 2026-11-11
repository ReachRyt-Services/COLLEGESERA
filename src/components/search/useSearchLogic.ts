import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "./types";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";

export const useSearchLogic = (
  generateSuggestions: (query: string) => SearchSuggestion[],
  onSearch?: (query: string) => void
) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();

  // Compute suggestions synchronously letter-by-letter as the user types
  const suggestions = useMemo(() => {
    if (query.trim().length < 1) {
      return [];
    }
    return generateSuggestions(query);
  }, [query, generateSuggestions]);

  const isLoading = false;

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const slug = trimmed
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) return;

    navigate(`/${slug}`);
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery(searchQuery);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(value.trim().length >= 1);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery(suggestion.text);

    if (suggestion.type === "college") {
      navigate(`/college/${getCleanCollegeSlug(suggestion.id)}`);
      if (onSearch) {
        onSearch(suggestion.text);
      }
    } else {
      handleSearch(suggestion.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen && suggestions.length > 0) {
          setIsOpen(true);
        }
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else {
      handleSearch(query);
    }
  };

  const handleFocus = () => {
    if (query.trim().length >= 1 || suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return {
    query,
    setQuery,
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
    setSelectedIndex,
  };
};
