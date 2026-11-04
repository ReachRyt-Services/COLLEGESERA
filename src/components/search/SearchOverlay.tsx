import React, { useEffect, useRef } from "react";
import { X, Search, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";
import { useNavigate, Link } from "react-router-dom";
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
    const navigate = useNavigate();
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
        suggestions,
        handleInputChange,
        handleKeyDown,
        handleSuggestionClick: originalHandleSuggestionClick,
        handleSubmit,
    } = useSearchLogic(generateSuggestions, (q) => {
        const slug = q.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        navigate(`/${slug}`);
        onClose();
    });

    const handleSuggestionClick = (suggestion: any) => {
        originalHandleSuggestionClick(suggestion);
        onClose();
    };

    const handleTrendingClick = (item: { label: string; slug?: string }) => {
        const slug = item.slug || item.label
            .trim()
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/\./g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        navigate(`/${slug}`);
        onClose();
    };

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
                                    className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-blue-500 focus-visible:ring-0 focus-visible:border-blue-600 shadow-sm"
                                />
                            </form>

                            {/* Live Suggestions Dropdown */}
                            {query.length >= 2 && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto z-10">
                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.id}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                        >
                                            {suggestion.icon}
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 font-medium">{suggestion.text}</span>
                                                <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* No results */}
                            {query.length >= 2 && suggestions.length === 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-6 text-center text-gray-500 z-10">
                                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <p>No results for "<span className="font-medium text-gray-700">{query}</span>"</p>
                                    <p className="text-xs mt-1 text-gray-400">Press Enter to search anyway</p>
                                </div>
                            )}
                        </div>

                        {/* Popular Searches */}
                        {query.length < 2 && (
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
