import { Filter, ChevronDown, MapPin, Building2, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { DatabaseBranch } from "@/types/database";

interface CollegeFiltersProps {
  branches: DatabaseBranch[];
  collegeTypes: string[];
  locations: string[]; // Districts
  states: string[];    // States
  degrees: string[];
  ownerships: string[];
  selectedCategory: string;
  selectedDistrict: string;
  selectedState: string;
  selectedDegree: string;
  selectedOwnership: string;
  showFilters: boolean;
  onCategoryChange: (category: string) => void;
  onDistrictChange: (district: string) => void;
  onStateChange: (state: string) => void;
  onDegreeChange: (degree: string) => void;
  onOwnershipChange: (ownership: string) => void;
  onToggleFilters: () => void;
}

const CollegeFilters = ({
  branches,
  collegeTypes,
  locations,
  states,
  degrees,
  ownerships,
  selectedCategory,
  selectedDistrict,
  selectedState,
  selectedDegree,
  selectedOwnership,
  showFilters,
  onCategoryChange,
  onDistrictChange,
  onStateChange,
  onDegreeChange,
  onOwnershipChange,
  onToggleFilters,
}: CollegeFiltersProps) => {

  // Normalize selected values case-insensitively so they accurately match dropdown items
  const normalizedCategory = collegeTypes.find(
    (t) => t.toLowerCase() === selectedCategory.toLowerCase() ||
           (selectedCategory.toLowerCase() === 'mba' && (t.toLowerCase().includes('manage') || /\bmba\b/i.test(t.toLowerCase().replace(/coimbatore/gi, ' '))))
  ) || (selectedCategory.toLowerCase() === 'all' ? 'all' : selectedCategory);

  const normalizedDistrict = locations.find(
    (l) => l.toLowerCase() === selectedDistrict.toLowerCase()
  ) || (selectedDistrict.toLowerCase() === 'all' ? 'all' : selectedDistrict);

  const normalizedState = states.find(
    (s) => s.toLowerCase() === selectedState.toLowerCase()
  ) || (selectedState.toLowerCase() === 'all' ? 'all' : selectedState);

  return (
    <div className="w-full">
      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>

        {/* Category Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <School className="w-4 h-4 text-orange-600" />
            Category
          </div>
          <Select value={normalizedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-orange-500">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {collegeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* State Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <MapPin className="w-4 h-4 text-orange-600" />
            State
          </div>
          <Select value={normalizedState} onValueChange={onStateChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-orange-500">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City Filter (formerly District) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <Building2 className="w-4 h-4 text-orange-600" />
            City
          </div>
          <Select value={normalizedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-orange-500">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Degree Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <GraduationCap className="w-4 h-4 text-orange-600" />
            Degree
          </div>
          <Select value={selectedDegree} onValueChange={onDegreeChange}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 focus:ring-orange-500">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Degrees</SelectItem>
              {degrees.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Ownership Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm uppercase tracking-wide">
            <School className="w-4 h-4 text-orange-600" />
            Type of College
          </div>
          <RadioGroup value={selectedOwnership} onValueChange={onOwnershipChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="ownership-all" className="text-orange-600 border-slate-300" />
              <Label htmlFor="ownership-all" className="text-slate-700 cursor-pointer">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Government" id="ownership-govt" className="text-orange-600 border-slate-300" />
              <Label htmlFor="ownership-govt" className="text-slate-700 cursor-pointer">Government</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Private" id="ownership-pvt" className="text-orange-600 border-slate-300" />
              <Label htmlFor="ownership-pvt" className="text-slate-700 cursor-pointer">Private</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default CollegeFilters;
