
import React, { useMemo } from "react";
import { MapPin, Building2, GraduationCap } from "lucide-react";
import { SearchSuggestion } from "./types";

// Helper function to format slug
const formatSlug = (slug: string): string => {
  if (!slug) return '';
  return slug
    .toLowerCase()
    .replace(/^\d+-/, '')        // Strip leading numeric identifiers (e.g. 2011-)
    .replace(/[^a-z0-9-]/g, '-') // Replace invalid characters with hyphens
    .replace(/-+/g, '-')        // Collapse consecutive hyphens
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
};

export const useSuggestionGenerator = (colleges: any[]) => {
  return useMemo(() => {
    const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
      const query = searchQuery.toLowerCase();
      const suggestions: SearchSuggestion[] = [];
      const seen = new Set<string>();

      // College names
      colleges.forEach(college => {
        if (college.name.toLowerCase().includes(query) && !seen.has(college.name)) {
          // Ensure the slug is formatted correctly before using it as ID
          const formattedSlug = formatSlug(college.slug);
          if (formattedSlug) { // Only add if slug is valid after formatting
            suggestions.push({
              id: formattedSlug,
              text: college.name,
              type: 'college',
              icon: <Building2 className="w-4 h-4 text-blue-500" />
            });
            seen.add(college.name); // Add to seen only if suggestion is added
          }
        }
      });

      // Locations
      const locations = [...new Set(colleges.map(c => c.location))];
      locations.forEach(location => {
        if (location.toLowerCase().includes(query) && !seen.has(location)) {
          suggestions.push({
            id: `location-${location}`,
            text: location,
            type: 'location',
            icon: <MapPin className="w-4 h-4 text-green-500" />
          });
          seen.add(location);
        }
      });

      // Districts
      const districts = [...new Set(colleges.map(c => c.district))];
      districts.forEach(district => {
        if (district.toLowerCase().includes(query) && !seen.has(district)) {
          suggestions.push({
            id: `district-${district}`,
            text: district,
            type: 'district',
            icon: <MapPin className="w-4 h-4 text-orange-500" />
          });
          seen.add(district);
        }
      });

      // Course types
      const courseTypes = [...new Set(colleges.map(c => c.type))];
      courseTypes.forEach(type => {
        if (type.toLowerCase().includes(query) && !seen.has(type)) {
          suggestions.push({
            id: `course-${type}`,
            text: type,
            type: 'course',
            icon: <GraduationCap className="w-4 h-4 text-purple-500" />
          });
          seen.add(type);
        }
      });

      return suggestions.slice(0, 8); // Limit to 8 suggestions
    };

    return generateSuggestions;
  }, [colleges]);
};
