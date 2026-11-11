import React, { useEffect, useRef } from "react";
import { X, Search, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSuggestionGenerator } from "./useSuggestionGenerator";
import { useSearchLogic } from "./useSearchLogic";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

// Popular search pills — clicking navigates to exact slug matching the label
const popularSearches = [
    { label: "Top MBA colleges in Coimbatore",               slug: "top-mba-colleges-in-coimbatore" },
    { label: "Top engineering colleges in Coimbatore",       slug: "top-engineering-colleges-in-coimbatore" },
    { label: "Autonomous engineering colleges in Coimbatore",slug: "autonomous-engineering-colleges-in-coimbatore" },
    { label: "Top engineering colleges in Salem",            slug: "top-engineering-colleges-in-salem" },
    { label: "NIRF ranked engineering colleges in Coimbatore",slug: "nirf-ranked-engineering-colleges-in-coimbatore" },
    { label: "Top paramedical colleges in Coimbatore",       slug: "top-paramedical-colleges-in-coimbatore" },
    { label: "Top Occupational Therapy Colleges in Coimbatore", slug: "top-occupational-therapy-colleges-in-coimbatore" },
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const { data: colleges = [] } = useQuery({
        queryKey: ["colleges"],
        queryFn: () => getColleges(),
    });

    const generateSuggestions = useSuggestionGenerator(colleges);
    const {
        query,
        setQuery,
        selectedIndex,
        suggestions,
        handleInputChange,
        handleKeyDown,
        handleSuggestionClick,
        handleSubmit,
    } = useSearchLogic(generateSuggestions, () => {
        onClose();
    });

    const trimmedQuery = query.trim();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] bg-white flex flex-col pt-20 px-4 md:px-0 h-screen w-screen overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>

                    <div className="w-full max-w-3xl mx-auto flex flex-col">
                        {/* Header */}
                        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                            What Are You <span className="text-orange-500">Looking</span> For?
                        </h2>

                        {/* Search Input */}
                        <div className="relative mb-10">
                            <form onSubmit={handleSubmit} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                                <Input
                                    ref={inputRef}
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search colleges, courses, cities, exams…"
                                    className="w-full pl-12 pr-28 py-6 text-lg rounded-xl border-2 border-blue-500 focus-visible:ring-0 focus-visible:border-blue-600 shadow-sm"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setQuery("");
                                            inputRef.current?.focus();
                                        }}
                                        className="absolute right-24 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600 px-2 py-1"
                                    >
                                        ✕
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                                >
                                    Search
                                </button>
                            </form>

                            {/* Live Suggestions Dropdown */}
                            {trimmedQuery.length >= 1 && suggestions.length > 0 && (
                                <div
                                    onMouseDown={(e) => e.preventDefault()}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[320px] overflow-y-auto z-10"
                                >
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={`${suggestion.type}-${suggestion.id}-${index}`}
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className={cn(
                                                "w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-orange-50/70 cursor-pointer border-b border-gray-50 last:border-0 transition-colors",
                                                selectedIndex === index && "bg-orange-50 border-l-4 border-l-orange-500"
                                            )}
                                        >
                                            {suggestion.icon}
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-gray-900 font-medium truncate">{suggestion.text}</span>
                                                <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* No results */}
                            {trimmedQuery.length >= 2 && suggestions.length === 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-6 text-center text-gray-500 z-10">
                                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <p>No results for &ldquo;<span className="font-medium text-gray-700">{trimmedQuery}</span>&rdquo;</p>
                                    <p className="text-xs mt-1 text-gray-400">Press Enter to search anyway</p>
                                </div>
                            )}
                        </div>

                        {/* Popular Searches */}
                        {trimmedQuery.length < 1 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-4 h-4 text-orange-500" />
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        Popular Searches
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={`/${item.slug}`}
                                            onClick={onClose}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200 cursor-pointer inline-flex items-center"
                                        >
                                            🔥 {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
