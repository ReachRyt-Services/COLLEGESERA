import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useParams, Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Filter, SlidersHorizontal, Search, LayoutGrid, List, ChevronDown } from "lucide-react";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import Advertisement from "@/components/Advertisement";
import AdBanner from "@/components/AdBanner";
import CollegesHero from "@/components/colleges/CollegesHero";
import CollegeCardHorizontal from "@/components/colleges/CollegeCardHorizontal";
import CollegeFilters from "@/components/colleges/CollegeFilters";
import SEOContentSection from "@/components/colleges/SEOContentSection";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabaseClient";

// UI Components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getColleges, getBranches, getCollegeTypes, getCollegeLocations, getCollegeStates, getAds } from "@/services/collegeService";
import { DatabaseCollege, DatabaseAdvertisement } from "@/types/database";
import { findMatchingColleges } from "@/utils/collegeSearch";

import { INDIAN_STATES } from "@/data/constants";

const KNOWN_CATEGORIES = [
  "engineering", "universities", "university", "arts", "arts-&-science", 
  "arts-and-science", "mba", "paramedical", "medical", "pharmacy", 
  "nursing", "law", "polytechnic", "management", "dental",
  "architecture", "agriculture", "design", "hotel-management", "aviation",
  "commerce", "science", "online"
];

const KNOWN_CITIES = [
  "salem", "coimbatore", "chennai", "madurai", "trichy", "tiruchirappalli", 
  "erode", "tirunelveli", "vellore", "thanjavur", "dindigul", "kanchipuram", 
  "tiruppur", "namakkal", "bangalore", "bengaluru", "kochi", "hyderabad", 
  "mumbai", "delhi", "pune"
];

const GENERIC_SEO_TOKENS = new Set([
  "top", "best", "10", "20", "5", "top10", "colleges", "college",
  "universities", "university", "institutes", "institutions", "in", "at",
  "of", "for", "and", "the", "list", "autonomous", "nirf", "ranked",
  "featured", "scholarship", "occupational", "therapy", "tamil", "nadu",
  "tamilnadu", "kerala", "karnataka", "india", "hotel",
  ...KNOWN_CATEGORIES,
  ...KNOWN_CITIES,
  ...INDIAN_STATES.flatMap(s => s.toLowerCase().split(/[\s-]+/)),
]);

interface RouteFilterInput {
  type?: string;
  location?: string;
  category?: string;
  subSlug?: string;
  courseSlug?: string;
  seoSlug?: string;
  state?: string;
  param1?: string;
  param2?: string;
  section?: string;
  slug?: string;
}

interface ParsedCollegeFilters {
  resolvedCategory: string;
  resolvedDistrict: string;
  resolvedState: string;
  isCountryIndia: boolean;
  resolvedTopCities: boolean;
  resolvedCourse: string;
  resolvedFeatured: boolean;
  resolvedAutonomous: boolean;
  resolvedNirf: boolean;
  resolvedLimit: number | null;
  resolvedInstitutionType?: string;
  h1Title: string;
  h2Title: string;
  seoDesc?: string;
}

function parseCollegeUrlFilters(params: RouteFilterInput): ParsedCollegeFilters {
  const { type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug } = params;

  let resolvedCategory = "all";
  let resolvedDistrict = "all";
  let resolvedState = "all";
  let isCountryIndia = false;
  let resolvedTopCities = false;
  let resolvedCourse = "";
  let resolvedFeatured = false;
  let resolvedAutonomous = false;
  let resolvedNirf = false;
  let resolvedLimit: number | null = null;
  let resolvedInstitutionType: string | undefined = undefined;
  let h1Title = "";
  let h2Title = "";
  let seoDesc: string | undefined = undefined;

  const allTokens = [type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug]
    .filter(Boolean)
    .map(s => s!.toLowerCase());

  // 1. Check for Country Targeting (India)
  // e.g. /colleges/universities-india, /colleges/engineering-colleges-india, /colleges/mba-colleges-india, etc.
  const isIndiaTarget = allTokens.some(t =>
    t === 'universities-india' ||
    t === 'engineering-india' ||
    t === 'engineering-colleges-india' ||
    t === 'mba-india' ||
    t === 'mba-colleges-india' ||
    t === 'arts-india' ||
    t === 'arts-and-science-india' ||
    t === 'arts-and-science-colleges-india' ||
    t === 'paramedical-india' ||
    t === 'paramedical-colleges-india' ||
    ((!seoSlug || t.split('-').every(tok => GENERIC_SEO_TOKENS.has(tok))) && (t.endsWith('-india') || t === 'india'))
  );

  if (isIndiaTarget) {
    isCountryIndia = true;
    resolvedState = 'all';
    resolvedDistrict = 'all';

    if (allTokens.some(t => t.includes('universit'))) {
      resolvedCategory = 'university';
      h1Title = 'Top Universities In India';
      h2Title = 'Top Universities in India - Rankings, Admissions & Fees';
    } else if (allTokens.some(t => t.includes('engineering'))) {
      resolvedCategory = 'engineering';
      h1Title = 'Top Engineering Colleges In India';
      h2Title = 'Top Engineering Colleges in India - Rankings, Fees & Placements';
    } else if (allTokens.some(t => {
      const safeT = t.replace(/coimbatore/gi, '');
      return /\bmba\b/i.test(safeT) || safeT.includes('management');
    })) {
      resolvedCategory = 'mba';
      h1Title = 'Top MBA Colleges In India';
      h2Title = 'Top MBA Colleges in India - Rankings, Fees & Placements';
    } else if (allTokens.some(t => t.includes('arts'))) {
      resolvedCategory = 'arts';
      h1Title = 'Top Arts & Science Colleges In India';
      h2Title = 'Top Arts & Science Colleges in India - Rankings, Fees & Placements';
    } else if (allTokens.some(t => t.includes('paramedical') || t.includes('medical'))) {
      resolvedCategory = 'paramedical';
      h1Title = 'Top Paramedical Colleges In India';
      h2Title = 'Top Paramedical Colleges in India - Rankings, Fees & Placements';
    } else {
      h1Title = 'Top Colleges In India';
      h2Title = 'Top Colleges in India - Rankings, Admissions & Fees';
    }

    if (!resolvedInstitutionType && resolvedCategory && resolvedCategory !== 'all') {
      resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
    };
  }

  // 2. Check 3-part route: /colleges/:category/:section/:slug
  const raw3Category = category || (section && slug ? param1 : undefined);
  const raw3Section = section || (param1 && param2 && courseSlug ? param2 : undefined);
  const raw3Slug = slug || (param1 && param2 && courseSlug ? courseSlug : undefined);

  if (raw3Category && raw3Section && raw3Slug) {
    const catLower = raw3Category.toLowerCase();
    if (catLower.includes('universit')) {
      resolvedCategory = 'university';
    } else if (catLower === 'arts' || catLower.includes('arts')) {
      resolvedCategory = 'arts';
    } else {
      resolvedCategory = raw3Category.replace(/-/g, ' ');
    }

    const secLower = raw3Section.toLowerCase();
    const slugLower = raw3Slug.toLowerCase();
    const catDisplayName = resolvedCategory === 'university'
      ? 'Universities'
      : resolvedCategory === 'arts'
        ? 'Arts & Science'
        : resolvedCategory.toUpperCase() === 'MBA'
          ? 'MBA'
          : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);

    if (secLower === 'by-state' || secLower.includes('-in') || secLower.includes('state')) {
      if (slugLower.includes('tamilnadu') || slugLower.includes('tamil-nadu')) {
        resolvedState = 'Tamil Nadu';
        if (catLower.includes('universit')) {
          h1Title = 'Universities in Tamilnadu';
          h2Title = 'Top Universities in Tamilnadu - Rankings, Courses & Admissions 2026';
        } else if (catLower === 'engineering') {
          h1Title = 'Engineering Colleges in Tamilnadu';
          h2Title = 'Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements';
        } else if (catLower === 'arts' || catLower.includes('arts')) {
          h1Title = 'Arts & Science Colleges in Tamilnadu';
          h2Title = 'Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements';
        } else if (catLower === 'mba') {
          h1Title = 'MBA Colleges in Tamilnadu';
          h2Title = 'Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements';
        } else if (catLower === 'paramedical') {
          h1Title = 'Paramedical Colleges in Tamilnadu';
          h2Title = 'Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements';
        } else {
          h1Title = `${catDisplayName} Colleges in Tamilnadu`;
          h2Title = `Top ${catDisplayName} Colleges in Tamilnadu - Rankings, Fees & Placements`;
        }
      } else if (slugLower.includes('kerala')) {
        resolvedState = 'Kerala';
        if (catLower.includes('universit')) {
          h1Title = 'Kerala Universities';
          h2Title = 'Top Universities in Kerala - Rankings, Courses & Admissions 2026';
        } else {
          h1Title = `Top ${catDisplayName} Colleges in Kerala`;
          h2Title = `Top ${catDisplayName} in Kerala - Rankings, Fees & Placements`;
        }
      } else if (slugLower.includes('karnataka')) {
        resolvedState = 'Karnataka';
        if (catLower.includes('universit')) {
          h1Title = 'Karnataka Universities';
          h2Title = 'Top Universities in Karnataka - Rankings, Courses & Admissions 2026';
        } else {
          h1Title = `Top ${catDisplayName} Colleges in Karnataka`;
          h2Title = `Top ${catDisplayName} in Karnataka - Rankings, Fees & Placements`;
        }
      } else {
        const matchState = INDIAN_STATES.find(s => slugLower.includes(s.toLowerCase().replace(/[^a-z0-9]/g, '')));
        if (matchState) {
          resolvedState = matchState;
          h1Title = `Top ${catDisplayName} Colleges in ${matchState}`;
          h2Title = `Top ${catDisplayName} Colleges in ${matchState} - Rankings, Fees & Placements`;
        } else {
          h1Title = raw3Slug.replace(/-/g, ' ');
          h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
        }
      }
    } else if (secLower === 'popular') {
      resolvedFeatured = true;
      if (slugLower.includes('top-ranked')) {
        h1Title = 'Top Ranked Universities';
        h2Title = 'Top Ranked Universities - Admissions, Rankings & Reviews';
      } else if (slugLower.includes('featured')) {
        h1Title = 'Featured Universities';
        h2Title = 'Featured Universities - Admissions, Rankings & Reviews';
      } else {
        h1Title = raw3Slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else if (secLower === 'trending-searches') {
      if (slugLower.includes('tamil-nadu') || slugLower.includes('tamilnadu')) {
        resolvedState = 'Tamil Nadu';
        h1Title = 'Top Universities in Tamil Nadu';
        h2Title = 'Top Universities in Tamil Nadu - Rankings, Courses & Admissions 2026';
      } else if (slugLower.includes('kerala')) {
        resolvedState = 'Kerala';
        h1Title = 'Top Universities in Kerala';
        h2Title = 'Top Universities in Kerala - Rankings, Courses & Admissions 2026';
      } else if (slugLower.includes('karnataka')) {
        resolvedState = 'Karnataka';
        h1Title = 'Top Universities in Karnataka';
        h2Title = 'Top Universities in Karnataka - Rankings, Courses & Admissions 2026';
      } else {
        h1Title = raw3Slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else if (secLower === 'top-cities' || secLower === 'by-city') {
      const cityCapitalized = raw3Slug.charAt(0).toUpperCase() + raw3Slug.slice(1);
      resolvedDistrict = cityCapitalized;
      h1Title = `${catDisplayName} Colleges in ${cityCapitalized}`;
      h2Title = `Top ${catDisplayName} Colleges in ${cityCapitalized} - Rankings, Fees & Placements`;
    } else if (secLower === 'popular-courses' || secLower === 'more-courses') {
      resolvedCourse = raw3Slug.replace(/-/g, ' ');
      const courseDisplayNames: Record<string, string> = {
        'bsc-nursing': 'B.Sc Nursing',
        'b-pharm': 'B.Pharm',
        'bpt': 'BPT (Physiotherapy)',
        'dmlt': 'DMLT',
        'bot': 'BOT (Occupational Therapy)',
        'bsc-radiology': 'B.Sc Radiology',
        'bsc-cardiac-technology': 'B.Sc Cardiac Technology',
        'bsc-optometry': 'B.Sc Optometry',
        'bsc-renal-dialysis': 'B.Sc Renal Dialysis',
        'bsc-anaesthesia': 'B.Sc Anaesthesia Technology',
        'bsc-respiratory': 'B.Sc Respiratory Therapy',
        'bsc-emergency-medicine': 'B.Sc Emergency Medicine',
      };
      const cName = courseDisplayNames[raw3Slug] || raw3Slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      h1Title = `Top ${cName} Colleges`;
      h2Title = `Top ${cName} Colleges - Rankings, Fees & Placements`;
    }

    if (!resolvedInstitutionType) {
      if (resolvedCategory === 'mba') resolvedInstitutionType = 'MBA';
      else if (resolvedCategory === 'engineering') resolvedInstitutionType = resolvedAutonomous ? 'Autonomous Engineering' : (resolvedNirf ? 'NIRF Ranked Engineering' : 'Engineering');
      else if (resolvedCourse?.includes('occupational')) resolvedInstitutionType = 'Occupational Therapy';
      else if (resolvedCategory === 'paramedical') resolvedInstitutionType = 'Paramedical';
      else if (resolvedCategory && resolvedCategory !== 'all') {
        resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      }
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
    };
  }

  // 3. Check SEO Slugs: /top-10-mba-colleges-in-coimbatore, /mba-colleges-in-salem, etc.
  if (seoSlug) {
    const seoLower = seoSlug.toLowerCase();

    const trendingTitleMap: Record<string, { 
      title: string; 
      h2?: string;
      category?: string; 
      state?: string; 
      district?: string; 
      course?: string;
      isAutonomous?: boolean;
      isNirf?: boolean;
      limit?: number;
      desc?: string;
      institutionType?: string;
    }> = {
      'top-mba-colleges-in-coimbatore': {
        title: 'Top MBA Colleges in Coimbatore',
        h2: 'Best MBA Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'mba',
        district: 'Coimbatore',
        institutionType: 'MBA',
        desc: 'Explore the top MBA colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'top-10-mba-colleges-in-coimbatore': {
        title: 'Top 10 MBA Colleges in Coimbatore',
        h2: 'Best MBA Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'mba',
        district: 'Coimbatore',
        institutionType: 'MBA',
        limit: 10,
        desc: 'Explore the top 10 MBA colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'top-engineering-colleges-in-coimbatore': {
        title: 'Top Engineering Colleges in Coimbatore',
        h2: 'Best Engineering Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'engineering',
        district: 'Coimbatore',
        institutionType: 'Engineering',
        desc: 'Explore the top engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'autonomous-engineering-colleges-in-coimbatore': {
        title: 'Autonomous Engineering Colleges in Coimbatore',
        h2: 'Best Autonomous Engineering Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'engineering',
        district: 'Coimbatore',
        institutionType: 'Autonomous Engineering',
        isAutonomous: true,
        desc: 'Explore autonomous engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'top-engineering-colleges-in-salem': {
        title: 'Top Engineering Colleges in Salem',
        h2: 'Best Engineering Colleges in Salem - Rankings, Fees & Placements',
        category: 'engineering',
        district: 'Salem',
        institutionType: 'Engineering',
        desc: 'Explore the top engineering colleges in Salem, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'nirf-ranked-engineering-colleges-in-coimbatore': {
        title: 'NIRF Ranked Engineering Colleges in Coimbatore',
        h2: 'Best NIRF Ranked Engineering Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'engineering',
        district: 'Coimbatore',
        institutionType: 'NIRF Ranked Engineering',
        isNirf: true,
        desc: 'Explore NIRF ranked engineering colleges in Coimbatore, including national rankings, fees, courses, placements, and admission details.',
      },
      'top-paramedical-colleges-in-coimbatore': {
        title: 'Top Paramedical Colleges in Coimbatore',
        h2: 'Best Paramedical Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'paramedical',
        district: 'Coimbatore',
        institutionType: 'Paramedical',
        desc: 'Explore the top paramedical colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.',
      },
      'top-occupational-therapy-colleges-in-coimbatore': {
        title: 'Top Occupational Therapy Colleges in Coimbatore',
        h2: 'Best Occupational Therapy Colleges in Coimbatore - Rankings, Fees & Placements',
        category: 'paramedical',
        district: 'Coimbatore',
        institutionType: 'Occupational Therapy',
        course: 'occupational therapy',
        desc: 'Explore top occupational therapy colleges in Coimbatore, including BOT course details, fees, placements, eligibility and admission details.',
      },
      'scholarship-for-mba-in-coimbatore': {
        title: 'Scholarship for MBA in Coimbatore',
        h2: 'Scholarship for MBA in Coimbatore - Eligibility & Grants',
        category: 'mba',
        district: 'Coimbatore',
        institutionType: 'MBA',
      },
      'top-engineering-colleges': { 
        title: 'Top Engineering Colleges', 
        h2: 'Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'engineering',
        institutionType: 'Engineering',
        state: 'Tamil Nadu'
      },
      'mba-colleges-in-tamil-nadu': { 
        title: 'MBA Colleges in Tamil Nadu', 
        h2: 'Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'mba', 
        institutionType: 'MBA',
        state: 'Tamil Nadu' 
      },
      'top-college-in-mba': { 
        title: 'Top Colleges in MBA', 
        h2: 'Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'mba',
        institutionType: 'MBA' 
      },
      'top-colleges-in-mba': { 
        title: 'Top Colleges in MBA', 
        h2: 'Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'mba',
        institutionType: 'MBA' 
      },
      'top-arts-science-colleges': { 
        title: 'Top Arts & Science Colleges', 
        h2: 'Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'arts',
        institutionType: 'Arts & Science' 
      },
      'colleges-in-coimbatore': { 
        title: 'Colleges in Coimbatore', 
        h2: 'Top Colleges in Coimbatore - Rankings, Fees & Placements',
        district: 'Coimbatore' 
      },
      'paramedical-colleges': { 
        title: 'Paramedical Colleges', 
        h2: 'Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements',
        category: 'paramedical',
        institutionType: 'Paramedical' 
      },
    };

    const seoTokens = seoLower.split('-').filter(Boolean);
    const isPureSeoSlug =
      Boolean(trendingTitleMap[seoLower]) ||
      (seoTokens.some(t => ['colleges', 'universities', 'institutes', 'institutions', 'scholarship'].includes(t)) &&
        seoTokens.every(t => GENERIC_SEO_TOKENS.has(t)));

    if (trendingTitleMap[seoLower]) {
      const item = trendingTitleMap[seoLower];
      h1Title = item.title;
      h2Title = item.h2 || `Best ${item.title} - Rankings, Fees & Placements`;
      if (item.category) resolvedCategory = item.category;
      if (item.state) resolvedState = item.state;
      if (item.district) resolvedDistrict = item.district;
      if (item.course) resolvedCourse = item.course;
      if (item.isAutonomous) resolvedAutonomous = true;
      if (item.isNirf) resolvedNirf = true;
      if (item.limit) resolvedLimit = item.limit;
      if (item.desc) seoDesc = item.desc;
      if (item.institutionType) resolvedInstitutionType = item.institutionType;
    } else if (isPureSeoSlug) {
      // Dynamic parsing of pure SEO slug (e.g. mba-colleges-in-salem)
      const safeSeo = seoLower.replace(/coimbatore/gi, ' ');
      if (safeSeo.includes('tamil-nadu') || safeSeo.includes('tamilnadu')) resolvedState = 'Tamil Nadu';
      if (safeSeo.includes('engineering')) resolvedCategory = 'engineering';
      if (/\bmba\b/i.test(safeSeo.replace(/-/g, ' '))) resolvedCategory = 'mba';
      if (safeSeo.includes('paramedical')) resolvedCategory = 'paramedical';
      if (safeSeo.includes('arts')) resolvedCategory = 'arts';
      if (safeSeo.includes('universit')) resolvedCategory = 'university';

      // Match city from known cities list
      const matchedCity = KNOWN_CITIES.find(c => seoLower.includes(c));
      if (matchedCity) {
        resolvedDistrict = matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1);
      }

      if (seoLower.includes('autonomous')) resolvedAutonomous = true;
      if (seoLower.includes('nirf')) resolvedNirf = true;
      if (seoLower.includes('occupational')) resolvedCourse = 'occupational therapy';
      if (seoLower.includes('top-10') || seoLower.includes('top10')) resolvedLimit = 10;

      const catDisplay = resolvedCategory === 'arts'
        ? 'Arts & Science'
        : resolvedCategory.toUpperCase() === 'MBA'
          ? 'MBA'
          : resolvedCategory === 'university'
            ? 'Universities'
            : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);

      const isTopQuery = seoLower.startsWith('top-') || seoLower.startsWith('top10-') || seoLower.startsWith('top-10-');
      const prefix = isTopQuery ? 'Top ' : '';

      if (resolvedDistrict !== 'all' && resolvedCategory !== 'all') {
        if (resolvedCategory === 'mba' && resolvedDistrict === 'Salem') {
          h1Title = 'MBA Colleges in Salem';
          h2Title = 'Top MBA Colleges In Salem - Rankings, Fees & Placements';
        } else {
          h1Title = `${prefix}${catDisplay} Colleges in ${resolvedDistrict}`;
          h2Title = `Best ${catDisplay} Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
        }
      } else if (resolvedDistrict !== 'all') {
        h1Title = `${prefix}Colleges in ${resolvedDistrict}`;
        h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
      } else if (resolvedState !== 'all' && resolvedCategory !== 'all') {
        h1Title = `${prefix}${catDisplay} Colleges in ${resolvedState}`;
        h2Title = `Top ${catDisplay} Colleges in ${resolvedState} - Rankings, Fees & Placements`;
      } else {
        h1Title = seoSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else {
      // User search query slug (e.g. /sri-krishna-college-of-engineering-and-technology, /amrita-university)
      h1Title = seoSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
    }

    if (!resolvedInstitutionType) {
      if (resolvedCategory === 'mba') resolvedInstitutionType = 'MBA';
      else if (resolvedCategory === 'engineering') resolvedInstitutionType = resolvedAutonomous ? 'Autonomous Engineering' : (resolvedNirf ? 'NIRF Ranked Engineering' : 'Engineering');
      else if (resolvedCourse?.includes('occupational')) resolvedInstitutionType = 'Occupational Therapy';
      else if (resolvedCategory === 'paramedical') resolvedInstitutionType = 'Paramedical';
      else if (resolvedCategory && resolvedCategory !== 'all') {
        resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      }
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
      seoDesc,
    };
  }

  // 4. Fallback to 1-part and 2-part routes
  if (state) {
    const matchState = INDIAN_STATES.find(
      s => s.toLowerCase().replace(/[^a-z0-9]/g, '') === state.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    if (matchState) {
      resolvedState = matchState;
      h1Title = `Top Colleges in ${matchState}`;
      h2Title = `Top Colleges in ${matchState} - Rankings, Fees & Placements`;
    }
  }

  if (location) {
    resolvedDistrict = location.charAt(0).toUpperCase() + location.slice(1);
    h1Title = `Top Colleges in ${resolvedDistrict}`;
    h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
  }

  let rawCat = category || type || "";
  let rawSub = subSlug || "";

  if (param1 && param2) {
    const p1Norm = param1.toLowerCase();
    const p2Norm = param2.toLowerCase();
    if (KNOWN_CATEGORIES.some(k => p1Norm.includes(k) || k.includes(p1Norm))) {
      rawCat = param1;
      rawSub = param2;
    } else if (KNOWN_CATEGORIES.some(k => p2Norm.includes(k) || k.includes(p2Norm))) {
      rawCat = param2;
      rawSub = param1;
    } else {
      rawCat = param1;
      rawSub = param2;
    }
  } else if (param1 && !rawCat) {
    const p1Norm = param1.toLowerCase();
    if (KNOWN_CATEGORIES.some(k => p1Norm.includes(k) || k.includes(p1Norm))) {
      rawCat = param1;
    } else {
      rawSub = param1;
    }
  }

  if (rawCat && !rawSub) {
    const catNorm = rawCat.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isKnownCategory = KNOWN_CATEGORIES.some(k => {
      const kNorm = k.toLowerCase().replace(/[^a-z0-9]/g, '');
      return catNorm.includes(kNorm) || kNorm.includes(catNorm);
    });

    if (isKnownCategory) {
      resolvedCategory = rawCat.replace(/-/g, " ");
      resolvedState = "Tamil Nadu"; // Default common menu landing pages to Tamil Nadu
      if (catNorm.includes('universit')) {
        resolvedCategory = 'university';
        h1Title = 'Universities in Tamilnadu';
        h2Title = 'Top Universities in Tamilnadu - Rankings, Courses & Admissions 2026';
      } else if (catNorm.includes('engineering')) {
        resolvedCategory = 'engineering';
        h1Title = 'Engineering Colleges in Tamilnadu';
        h2Title = 'Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements';
      } else if (catNorm.includes('arts')) {
        resolvedCategory = 'arts';
        h1Title = 'Arts & Science Colleges in Tamilnadu';
        h2Title = 'Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements';
      } else if (/\bmba\b/i.test(catNorm.replace(/coimbatore/gi, ' '))) {
        resolvedCategory = 'mba';
        h1Title = 'MBA Colleges in Tamilnadu';
        h2Title = 'Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements';
      } else if (catNorm.includes('paramedical')) {
        resolvedCategory = 'paramedical';
        h1Title = 'Paramedical Colleges in Tamilnadu';
        h2Title = 'Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements';
      } else {
        const cName = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
        h1Title = `${cName} Colleges in Tamilnadu`;
        h2Title = `Top ${cName} Colleges in Tamilnadu - Rankings, Fees & Placements`;
      }
    } else {
      if (catNorm === 'topcities' || catNorm === 'top-cities') {
        resolvedTopCities = true;
        h1Title = "Top Colleges in Top Cities";
        h2Title = "Top Colleges in Top Cities - Rankings, Fees & Placements";
      } else {
        const matchState = INDIAN_STATES.find(
          s => s.toLowerCase().replace(/[^a-z0-9]/g, '') === catNorm
        );
        if (matchState) {
          resolvedState = matchState;
          h1Title = `Top Colleges in ${matchState}`;
          h2Title = `Top Colleges in ${matchState} - Rankings, Fees & Placements`;
        } else {
          resolvedDistrict = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
          h1Title = `Top Colleges in ${resolvedDistrict}`;
          h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
        }
      }
    }
  } else if (rawCat) {
    resolvedCategory = rawCat.replace(/-/g, " ");
  }

  if (rawSub) {
    const subLower = rawSub.toLowerCase();
    const subNorm = subLower.replace(/[^a-z0-9]/g, '');

    if (subLower === 'topcities' || subLower === 'top-cities') {
      resolvedTopCities = true;
      const cName = resolvedCategory === 'arts' ? 'Arts & Science' : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      h1Title = `Top ${cName} Colleges in Top Cities`;
      h2Title = `Top ${cName} Colleges in Top Cities - Rankings, Fees & Placements`;
    } else if (subLower === 'top-ranked') {
      resolvedFeatured = true;
      h1Title = 'Top Ranked Universities';
      h2Title = 'Top Ranked Universities - Admissions, Rankings & Reviews';
    } else if (subLower === 'featured') {
      resolvedFeatured = true;
      h1Title = 'Featured Universities';
      h2Title = 'Featured Universities - Admissions, Rankings & Reviews';
    } else {
      const matchState = INDIAN_STATES.find(
        s => s.toLowerCase().replace(/[^a-z0-9]/g, '') === subNorm
      );
      if (matchState) {
        resolvedState = matchState;
        const cName = resolvedCategory === 'arts' ? 'Arts & Science' : (resolvedCategory !== 'all' ? resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1) : '');
        h1Title = cName ? `Top ${cName} Colleges in ${matchState}` : `Top Colleges in ${matchState}`;
        h2Title = `Top ${cName || 'Colleges'} in ${matchState} - Rankings, Fees & Placements`;
      } else {
        resolvedDistrict = rawSub.charAt(0).toUpperCase() + rawSub.slice(1);
        const cName = resolvedCategory === 'arts' ? 'Arts & Science' : (resolvedCategory !== 'all' ? resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1) : '');
        h1Title = cName ? `Top ${cName} Colleges in ${resolvedDistrict}` : `Top Colleges in ${resolvedDistrict}`;
        h2Title = `Top ${cName || 'Colleges'} in ${resolvedDistrict} - Rankings, Fees & Placements`;
      }
    }
  }

  if (courseSlug) {
    resolvedCourse = courseSlug.replace(/-/g, ' ');
    h1Title = `Top ${resolvedCourse.charAt(0).toUpperCase() + resolvedCourse.slice(1)} Colleges`;
    h2Title = `Top ${resolvedCourse.charAt(0).toUpperCase() + resolvedCourse.slice(1)} Colleges - Rankings, Fees & Placements`;
  }

  if (!h1Title) {
    h1Title = 'Explore Top Colleges';
    h2Title = 'Discover top-rated institutions, compare fees and placements, and find the perfect match for your future.';
  }

  if (!resolvedInstitutionType) {
    if (resolvedCategory === 'mba') resolvedInstitutionType = 'MBA';
    else if (resolvedCategory === 'engineering') resolvedInstitutionType = resolvedAutonomous ? 'Autonomous Engineering' : (resolvedNirf ? 'NIRF Ranked Engineering' : 'Engineering');
    else if (resolvedCourse?.includes('occupational')) resolvedInstitutionType = 'Occupational Therapy';
    else if (resolvedCategory === 'paramedical') resolvedInstitutionType = 'Paramedical';
    else if (resolvedCategory && resolvedCategory !== 'all') {
      resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
    }
  }

  return {
    resolvedCategory,
    resolvedDistrict,
    resolvedState,
    isCountryIndia,
    resolvedTopCities,
    resolvedCourse,
    resolvedFeatured,
    resolvedAutonomous,
    resolvedNirf,
    resolvedLimit,
    resolvedInstitutionType,
    h1Title,
    h2Title,
    seoDesc,
  };
}

const Colleges = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const routerLocation = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const { type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug } = useParams<{
    type?: string;
    location?: string;
    category?: string;
    subSlug?: string;
    courseSlug?: string;
    seoSlug?: string;
    state?: string;
    param1?: string;
    param2?: string;
    section?: string;
    slug?: string;
  }>();

  // Redirect legacy numbered slug to canonical slug without numbers
  if (seoSlug === 'top-10-mba-colleges-in-coimbatore') {
    return <Navigate to="/top-mba-colleges-in-coimbatore" replace />;
  }

  // Parse filters synchronously so first render matches search terms and location
  const urlFilters = useMemo(() => parseCollegeUrlFilters({
    type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug
  }), [type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(urlFilters.resolvedCategory);
  const [selectedDistrict, setSelectedDistrict] = useState(urlFilters.resolvedDistrict);
  const [selectedState, setSelectedState] = useState(urlFilters.resolvedState);
  const [isCountryIndia, setIsCountryIndia] = useState(urlFilters.isCountryIndia);
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");
  const [isTopCities, setIsTopCities] = useState(urlFilters.resolvedTopCities);
  const [courseSlugFilter, setCourseSlugFilter] = useState(urlFilters.resolvedCourse);
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(urlFilters.resolvedFeatured);
  const [isAutonomousOnly, setIsAutonomousOnly] = useState(urlFilters.resolvedAutonomous);
  const [isNirfOnly, setIsNirfOnly] = useState(urlFilters.resolvedNirf);
  const [maxCollegeLimit, setMaxCollegeLimit] = useState<number | null>(urlFilters.resolvedLimit);
  const [institutionType, setInstitutionType] = useState(urlFilters.resolvedInstitutionType);
  const [heroTitle, setHeroTitle] = useState(urlFilters.h1Title);
  const [heroSubtitle, setHeroSubtitle] = useState(urlFilters.h2Title);
  const [seoCustomDesc, setSeoCustomDesc] = useState(urlFilters.seoDesc);
  const [visibleCollegeCount, setVisibleCollegeCount] = useState(10);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const userManuallyToggledFilter = useRef(false);

  // Sync state if URL params change
  useEffect(() => {
    setSelectedCategory(urlFilters.resolvedCategory);
    setSelectedDistrict(urlFilters.resolvedDistrict);
    setSelectedState(urlFilters.resolvedState);
    setIsCountryIndia(urlFilters.isCountryIndia);
    setIsTopCities(urlFilters.resolvedTopCities);
    setCourseSlugFilter(urlFilters.resolvedCourse);
    setIsFeaturedOnly(urlFilters.resolvedFeatured);
    setIsAutonomousOnly(urlFilters.resolvedAutonomous);
    setIsNirfOnly(urlFilters.resolvedNirf);
    setMaxCollegeLimit(urlFilters.resolvedLimit);
    setInstitutionType(urlFilters.resolvedInstitutionType);
    setHeroTitle(urlFilters.h1Title);
    setHeroSubtitle(urlFilters.h2Title);
    setSeoCustomDesc(urlFilters.seoDesc);
    setInPageSearch("");
  }, [urlFilters]);

  // Auto-collapse filter on scroll down past header/hero
  useEffect(() => {
    const handleFilterScroll = () => {
      if (!userManuallyToggledFilter.current) {
        if (window.scrollY > 200) {
          setIsFilterCollapsed(true);
        } else {
          setIsFilterCollapsed(false);
        }
      }
    };
    window.addEventListener("scroll", handleFilterScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleFilterScroll);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedDistrict !== 'all') count++;
    if (selectedState !== 'all') count++;
    if (isCountryIndia) count++;
    if (selectedDegree !== 'all') count++;
    if (selectedOwnership !== 'all') count++;
    if (isAutonomousOnly) count++;
    if (isNirfOnly) count++;
    if (courseSlugFilter) count++;
    if (isTopCities) count++;
    if (isFeaturedOnly) count++;
    return count;
  }, [selectedCategory, selectedDistrict, selectedState, isCountryIndia, selectedDegree, selectedOwnership, isAutonomousOnly, isNirfOnly, courseSlugFilter, isTopCities, isFeaturedOnly]);

  // Intersection Observer for Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCollegeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCollegeCount(prev => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  // Data Fetching
  const { data: colleges = [], isLoading, error } = useQuery<DatabaseCollege[]>({
    queryKey: ['colleges'],
    queryFn: () => getColleges(),
  });

  // Ads Fetching
  const { data: topAds = [] } = useQuery<DatabaseAdvertisement[]>({
    queryKey: ['ads', 'college_top'],
    queryFn: () => getAds('college_top'),
  });

  const { data: bottomAds = [] } = useQuery<DatabaseAdvertisement[]>({
    queryKey: ['ads', 'college_bottom'],
    queryFn: () => getAds('college_bottom'),
  });

  const { data: feedAds = [] } = useQuery<DatabaseAdvertisement[]>({
    queryKey: ['ads', 'college_feed'],
    queryFn: () => getAds('college_feed'),
  });

  const { data: branches = [] } = useQuery<any[]>({
    queryKey: ['branches'],
    queryFn: getBranches,
  });

  const { data: collegeTypes = [] } = useQuery<string[]>({
    queryKey: ['collegeTypes'],
    queryFn: getCollegeTypes,
  });

  const { data: locations = [] } = useQuery<string[]>({ // Districts
    queryKey: ['locations'],
    queryFn: getCollegeLocations,
  });

  const { data: states = [] } = useQuery<string[]>({ // States
    queryKey: ['states'],
    queryFn: getCollegeStates,
  });

  // Fetch SEO & Header Overrides from sitemap_entries
  const cleanPath = (seoSlug ? `/${seoSlug}` : routerLocation.pathname).toLowerCase().replace(/\/+$/, '') || '/';
  const { data: seoOverride } = useQuery({
    queryKey: ['seo_override', cleanPath],
    queryFn: async () => {
      const { data } = await supabase
        .from('sitemap_entries')
        .select('college_name, seo_title, seo_description, notes, og_image')
        .eq('loc', cleanPath)
        .maybeSingle();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayHeroTitle = seoOverride?.college_name || (seoOverride?.seo_title ? seoOverride.seo_title.split('|')[0].trim() : heroTitle);

  // SEO Logic
  const seoData = useMemo(() => {
    let title = seoOverride?.seo_title || (heroTitle ? `${heroTitle} | Collegesera` : "Top Colleges in Tamil Nadu | Collegesera");
    let desc = seoOverride?.seo_description || (seoCustomDesc
      ? seoCustomDesc
      : (heroSubtitle
          ? `${displayHeroTitle}. ${heroSubtitle}. Compare fees, placements, and rankings.`
          : (displayHeroTitle 
              ? `Explore ${displayHeroTitle}. Compare fees, placements, and rankings across top rated colleges.` 
              : "Find the best colleges in Tamil Nadu. Check fees, placements, and rankings.")));
    return { title, desc };
  }, [seoOverride, heroTitle, heroSubtitle, seoCustomDesc, displayHeroTitle]);

  // Search State: Client-side state without changing URL to satisfy canonical SEO rules
  const [inPageSearch, setInPageSearch] = useState("");
  const isStructuredSeo = Boolean(
    seoSlug && (
      selectedCategory !== 'all' || 
      selectedDistrict !== 'all' || 
      selectedState !== 'all' || 
      isAutonomousOnly || 
      isNirfOnly || 
      Boolean(courseSlugFilter)
    )
  );
  const searchQuery = inPageSearch || searchParams.get('search') || (seoSlug && !isStructuredSeo ? seoSlug.replace(/-/g, ' ') : '');
  const fieldParam = searchParams.get('field') || '';
  const programParam = searchParams.get('program') || ''; // Support program filter

  // Derive unique degrees and ownerships from the fetched colleges list
  const availableDegrees = useMemo(() => {
    const degrees = new Set<string>();
    colleges.forEach(c => {
      c.courses?.forEach(course => {
        if (course.name) {
          // Just extract the first word or main degree code (e.g. B.E, B.Tech, MBA, BSc)
          const match = course.name.match(/^[a-zA-Z\.]+/);
          if (match) degrees.add(match[0].toUpperCase());
        }
      });
    });
    return Array.from(degrees).sort();
  }, [colleges]);

  const availableOwnerships = useMemo(() => {
    return ["Government", "Private"];
  }, []);

  // --- FILTER LOGIC ---
  const filteredColleges = useMemo(() => {
    const baseFiltered = colleges.filter(college => {
      // Category — matches type_collwge or type field (case-insensitive contains)
      if (selectedCategory !== "all") {
        const typeLower = (college.type_collwge || college.type || '').toLowerCase().trim();
        const catLower = selectedCategory.toLowerCase().trim();
        const nameLower = (college.name || '').toLowerCase();
        if (catLower.includes('universit')) {
          if (!typeLower.includes('universit') && !nameLower.includes('universit')) return false;
        } else if (catLower === 'arts' || catLower.includes('arts')) {
          if (!typeLower.includes('art') && !nameLower.includes('art') && !nameLower.includes('science')) return false;
        } else if (catLower === 'mba' || /\bmba\b/i.test(catLower.replace(/coimbatore/gi, ' ')) || catLower.includes('management')) {
          const hasMbaCourse = college.courses && college.courses.some(c => {
            const cName = (c.name || '').toLowerCase().replace(/coimbatore/gi, ' ');
            const cSpec = (c.specialization || '').toLowerCase().replace(/coimbatore/gi, ' ');
            return /\bmba\b/i.test(cName) || cName.includes('pgdm') || cName.includes('management') ||
                   /\bmba\b/i.test(cSpec) || cSpec.includes('pgdm') || cSpec.includes('management');
          });
          const safeTypeLower = typeLower.replace(/coimbatore/gi, ' ');
          const safeNameLower = nameLower.replace(/coimbatore/gi, ' ');
          const hasMbaInType = /\bmba\b/i.test(safeTypeLower) || safeTypeLower.includes('management');
          const hasMbaInName = /\bmba\b/i.test(safeNameLower) || safeNameLower.includes('management') || safeNameLower.includes('business');
          if (!hasMbaCourse && !hasMbaInType && !hasMbaInName) return false;
        } else {
          // Check for substring match in either direction for flexibility
          if (!typeLower.includes(catLower) && !catLower.includes(typeLower) && !nameLower.includes(catLower)) return false;
        }
      }

      // Degree
      if (selectedDegree !== "all") {
        const degLower = selectedDegree.toLowerCase();
        if (!college.courses || !college.courses.some(c => c.name.toLowerCase().startsWith(degLower))) return false;
      }

      // Ownership (Govt/Private)
      if (selectedOwnership !== "all") {
        const typeLower = (college.type || '').toLowerCase();
        const searchLower = selectedOwnership.toLowerCase();
        
        if (searchLower === 'government') {
          if (!typeLower.includes('govt') && !typeLower.includes('government')) return false;
        } else if (searchLower === 'private') {
          if (!typeLower.includes('private')) return false;
        }
      }

      // Field URL Param
      if (fieldParam) {
        const map: Record<string, string> = {
          "cs": "Computer Science", "mechanical": "Mechanical", "electronics": "Electronics",
          "civil": "Civil", "mbbs": "MBBS", "bds": "BDS", "nursing": "Nursing",
          "pharmacy": "Pharmacy", "fashion": "Fashion Design",
          "interior": "Interior Design", "graphic": "Graphic Design",
        };
        const target = map[fieldParam];
        if (target && college.courses && !college.courses.some(c => c.name.includes(target))) return false;
      }

      // Program URL Param
      if (programParam) {
        if (college.courses && !college.courses.some(c => c.name.toLowerCase().includes(programParam.toLowerCase()))) return false;
      }

      // District — compare against first part of the district field (handles "City, State" format)
      if (selectedDistrict !== "all") {
        const selectedLower = selectedDistrict.toLowerCase().trim();
        const distFirstPart = (college.district || '').split(',')[0].trim().toLowerCase();
        const locFirstPart = (college.location || '').split(',')[0].trim().toLowerCase();
        const fullDist = (college.district || '').toLowerCase();
        const fullLoc = (college.location || '').toLowerCase();
        
        const matchesDistrict = distFirstPart === selectedLower || 
          locFirstPart === selectedLower || 
          fullDist.includes(selectedLower) || 
          fullLoc.includes(selectedLower);
          
        if (!matchesDistrict) return false;
      }

      // State
      if (selectedState !== "all") {
        if (!college.location && !college.district) return false;

        // Fuzzy compare: normalize both sides (remove spaces, lower case)
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const collegeLocSafe = normalize(college.location || '');
        const collegeDistSafe = normalize(college.district || '');
        const selectedStateSafe = normalize(selectedState);

        const isTN = selectedStateSafe.includes('tamilnadu');
        if (isTN) {
          const tnTerms = ['tamilnadu', 'chennai', 'coimbatore', 'salem', 'erode', 'madurai', 'trichy', 'vellore', 'tirunelveli', 'namakkal', 'thanjavur', 'dindigul', 'kanchipuram', 'tiruppur'];
          const matchesTN = tnTerms.some(t => collegeLocSafe.includes(t) || collegeDistSafe.includes(t));
          if (!matchesTN) return false;
        } else {
          if (!collegeLocSafe.includes(selectedStateSafe) && !collegeDistSafe.includes(selectedStateSafe)) return false;
        }
      }

      // Autonomous filter
      if (isAutonomousOnly) {
        const checkAuto = (str?: string | null) => (str || '').toLowerCase().includes('autonomous');
        const isAuto = checkAuto(college.name) ||
          checkAuto(college.slug) ||
          checkAuto(college.type) ||
          checkAuto(college.type_collwge) ||
          checkAuto(college.description) ||
          (college.highlights && college.highlights.some(h => checkAuto(typeof h === 'string' ? h : JSON.stringify(h))));
        if (!isAuto) return false;
      }

      // NIRF ranked filter
      if (isNirfOnly) {
        const hasNirf = 
          (college.rankings && college.rankings.some(r => (r.agency || '').toUpperCase().includes('NIRF') || (r.rank && r.rank !== '-' && r.rank !== '0'))) ||
          (college.ranking && college.ranking > 0) ||
          (college.description || '').toLowerCase().includes('nirf') ||
          (college.highlights && college.highlights.some(h => JSON.stringify(h).toLowerCase().includes('nirf')));
        if (!hasNirf) return false;
      }

      // Top Cities filter
      if (isTopCities) {
        const topCities = ['chennai', 'coimbatore', 'bangalore', 'kochi', 'salem', 'erode', 'madurai', 'trichy', 'bengaluru', 'hyderabad'];
        const dist = (college.district || '').toLowerCase();
        const loc = (college.location || '').toLowerCase();
        const inTopCity = topCities.some(c => dist.includes(c) || loc.includes(c));
        if (!inTopCity) return false;
      }

      // Course Slug filter
      if (courseSlugFilter) {
        const cLower = courseSlugFilter.toLowerCase();
        const matchesCourse = 
          (college.courses && college.courses.some(c => 
            (c.name && c.name.toLowerCase().includes(cLower)) ||
            (c.specialization && c.specialization.toLowerCase().includes(cLower)) ||
            (cLower.includes('occupational') && (
              (c.name && (c.name.toLowerCase().includes('occupational') || c.name.toLowerCase().includes('bot'))) ||
              (c.specialization && (c.specialization.toLowerCase().includes('occupational') || c.specialization.toLowerCase().includes('bot')))
            ))
          )) ||
          (cLower.includes('occupational') && (
            (college.name || '').toLowerCase().includes('occupational') ||
            (college.description || '').toLowerCase().includes('occupational')
          ));
        if (!matchesCourse) return false;
      }

      // Featured filter
      if (isFeaturedOnly && !college.featured) return false;

      return true;
    });

    // Progressive keyword search matching up to the last matching keyword
    if (searchQuery && searchQuery.trim()) {
      return findMatchingColleges(baseFiltered, searchQuery).matchedColleges;
    }

    return baseFiltered;
  }, [colleges, selectedCategory, selectedDistrict, selectedState, selectedDegree, selectedOwnership, searchQuery, fieldParam, programParam, isTopCities, courseSlugFilter, isFeaturedOnly, isAutonomousOnly, isNirfOnly]);

  // Derive location for SEO content
  const derivedLocation = useMemo(() => {
    if (isTopCities) return "Top Cities";
    if (isCountryIndia) return "India";
    if (location) return location;
    if (selectedDistrict !== 'all') return selectedDistrict;
    if (selectedState !== 'all') return selectedState;

    if (searchQuery && filteredColleges.length > 0) {
      const queryLower = searchQuery.toLowerCase();
      const matchedDistrict = locations.find(loc => queryLower.includes(loc.toLowerCase()));
      if (matchedDistrict) return matchedDistrict;

      const firstDistrict = filteredColleges[0].district;
      const allSame = filteredColleges.every(c => c.district === firstDistrict);
      if (allSame) return firstDistrict;
    }
    return undefined;
  }, [location, selectedDistrict, selectedState, searchQuery, filteredColleges, locations, isTopCities, isCountryIndia]);

  const collegesToDisplay = useMemo(() => {
    let list = filteredColleges;
    if (isNirfOnly) {
      list = [...list].sort((a, b) => {
        const getRank = (c: DatabaseCollege) => {
          const nirf = c.rankings?.find(r => (r.agency || '').toUpperCase().includes('NIRF'));
          if (nirf && nirf.rank) {
            const num = parseInt(nirf.rank, 10);
            if (!isNaN(num) && num > 0) return num;
          }
          if (c.ranking && c.ranking > 0) return c.ranking;
          return 9999;
        };
        return getRank(a) - getRank(b);
      });
    }
    const limit = maxCollegeLimit ? Math.min(visibleCollegeCount, maxCollegeLimit) : visibleCollegeCount;
    return list.slice(0, limit);
  }, [filteredColleges, visibleCollegeCount, maxCollegeLimit, isNirfOnly]);

  // Prepare combined list with ads
  const combinedItems = useMemo(() => {
    if (!collegesToDisplay.length) return [];
    if (!feedAds.length) return collegesToDisplay.map(c => ({ type: 'college', data: c }));

    const items: any[] = [];
    let adIndex = 0;
    const adCounts: Record<string, number> = {};

    collegesToDisplay.forEach((college, index) => {
      items.push({ type: 'college', data: college });

      if ((index + 1) % 5 === 0) {
        let attempts = 0;
        let foundAd = null;

        while (attempts < feedAds.length) {
          const candidate = feedAds[adIndex % feedAds.length];
          const count = adCounts[candidate.id] || 0;
          const limit = candidate.max_display_count === 0 ? Infinity : (candidate.max_display_count || Infinity);

          if (count < limit) {
            foundAd = candidate;
            adCounts[candidate.id] = count + 1;
            adIndex++;
            break;
          }
          adIndex++;
          attempts++;
        }

        if (foundAd) {
          items.push({ type: 'ad', data: foundAd });
        }
      }
    });
    return items;
  }, [collegesToDisplay, feedAds]);


  // --- NAVIGATION LOGIC ---
  const navigate = useNavigate();

  const handleFilterNavigation = (newCategory: string, newDistrict: string) => {
    // 1. If both All -> /colleges
    if (newCategory === 'all' && newDistrict === 'all') {
      navigate('/colleges');
      return;
    }

    // 2. Format params for URL
    const catSlug = newCategory !== 'all' ? newCategory.toLowerCase().replace(/\s+/g, '-') : null;
    let distSlug = newDistrict !== 'all' ? newDistrict.toLowerCase().replace(/\s+/g, '-') : null;

    if (catSlug && distSlug) {
      // Both present -> clean SEO URL: /colleges/:category/:district
      navigate(`/colleges/${catSlug}/${distSlug}`);
    } else if (distSlug) {
      // Only District -> /colleges/location/:location
      navigate(`/colleges/location/${distSlug}`);
    } else if (catSlug) {
      // Only Category -> /colleges/:type
      navigate(`/colleges/${catSlug}`);
    }
  };

  // Filter Props Helper
  const filterProps = {
    branches, collegeTypes, locations, states,
    degrees: availableDegrees, ownerships: availableOwnerships,
    selectedCategory, selectedDistrict, selectedState, selectedDegree, selectedOwnership,
    onCategoryChange: (val: string) => handleFilterNavigation(val, selectedDistrict),
    onDistrictChange: (val: string) => handleFilterNavigation(selectedCategory, val),
    onStateChange: (st: string) => {
      setSelectedState(st);
      if (st !== 'all') {
        const stateSlug = st.toLowerCase().replace(/\s+/g, '-');
        const catSlug = selectedCategory !== 'all' ? selectedCategory.toLowerCase().replace(/\s+/g, '-') : null;
        if (catSlug) {
          navigate(`/colleges/${catSlug}/${stateSlug}`);
        } else {
          navigate(`/colleges/state/${stateSlug}`);
        }
      }
    },
    onDegreeChange: setSelectedDegree,
    onOwnershipChange: setSelectedOwnership,
    showFilters: true,
    onToggleFilters: () => { },
  };

  const currentPath = seoSlug ? `/${seoSlug}` : (routerLocation.pathname || '/colleges');
  const pageCanonicalUrl = `https://collegesera.com${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;
  const categoryPath = selectedCategory !== 'all' ? `/colleges/${selectedCategory}` : '/colleges';
  const categoryName = selectedCategory !== 'all' 
    ? (selectedCategory.toUpperCase() === 'MBA' ? 'MBA Colleges' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Colleges`) 
    : 'Colleges';

  const landingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": heroTitle || (seoData.title ? seoData.title.split('|')[0].trim() : "Colleges"),
        "url": pageCanonicalUrl,
        "description": seoData.desc
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://collegesera.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": categoryName,
            "item": `https://collegesera.com${categoryPath}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": heroTitle || (seoData.title ? seoData.title.split('|')[0].trim() : "Colleges"),
            "item": pageCanonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 text-slate-900">
      <SEO
        title={seoData.title}
        description={seoData.desc}
        url={pageCanonicalUrl}
        ogTitle={seoData.title}
        ogDescription={seoData.desc}
        twitterTitle={seoData.title}
        twitterDescription={seoData.desc}
        schema={landingSchema}
      />
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      {/* --- PREMIUM HERO & HEADER --- */}
      <div className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-sm text-slate-400 mb-3 flex items-center gap-2 flex-wrap">
                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                <span className="text-slate-600">/</span>
                <Link to={categoryPath} className="hover:text-orange-400 transition-colors">{categoryName}</Link>
                <span className="text-slate-600">/</span>
                <span className="font-medium text-slate-300">{displayHeroTitle || 'Colleges'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                {displayHeroTitle ? (
                  displayHeroTitle
                ) : searchQuery ? (
                  <span className="capitalize">{searchQuery}</span>
                ) : (
                  <>Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Top Colleges</span></>
                )}
              </h1>
              <p className="text-base md:text-lg text-slate-300">
                Discover top-rated {institutionType ? `${institutionType} ` : ''}institutions, compare fees and placements, and find the perfect match for your future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 -mt-6 relative z-20">

        {/* --- LAYOUT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* --- LEFT SIDEBAR (Non-sticky & Collapsible on scroll) --- */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      userManuallyToggledFilter.current = true;
                      setIsFilterCollapsed(!isFilterCollapsed);
                    }}
                    className="font-semibold text-slate-900 flex items-center gap-2 hover:text-orange-600 transition-colors group cursor-pointer"
                  >
                    <Filter className="w-4 h-4 text-orange-600" />
                    <span>Filters</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 group-hover:text-orange-600 transition-transform duration-300 ${isFilterCollapsed ? "" : "rotate-180"}`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                        {activeFilterCount}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedDistrict('all');
                        setSelectedState('all');
                        setIsCountryIndia(false);
                        setSelectedDegree('all');
                        setSelectedOwnership('all');
                        setIsAutonomousOnly(false);
                        setIsNirfOnly(false);
                        setMaxCollegeLimit(null);
                        setCourseSlugFilter('');
                        setIsTopCities(false);
                        setIsFeaturedOnly(false);
                        setHeroTitle('Explore Top Colleges');
                        setHeroSubtitle('Discover top-rated institutions, compare fees and placements, and find the perfect match for your future.');
                        setInPageSearch('');
                        setSearchParams({});
                      }}
                      className="text-[10px] uppercase font-bold text-orange-600 hover:text-orange-700 tracking-wide cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Collapsed Active Filter Chips */}
                {isFilterCollapsed && activeFilterCount > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {selectedCategory !== 'all' && (
                      <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
                        {selectedCategory}
                      </span>
                    )}
                    {selectedDistrict !== 'all' && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedDistrict}
                      </span>
                    )}
                    {selectedState !== 'all' && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedState}
                      </span>
                    )}
                    {isCountryIndia && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-medium">
                        India
                      </span>
                    )}
                    {selectedDegree !== 'all' && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedDegree}
                      </span>
                    )}
                    {isAutonomousOnly && (
                      <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
                        Autonomous
                      </span>
                    )}
                    {isNirfOnly && (
                      <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-medium">
                        NIRF Ranked
                      </span>
                    )}
                    {courseSlugFilter && (
                      <span className="text-[11px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md font-medium">
                        {courseSlugFilter.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    )}
                  </div>
                )}

                {/* Collapsible Filter Body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isFilterCollapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[1400px] opacity-100 mt-5"
                  }`}
                >
                  <CollegeFilters {...filterProps} />
                </div>
              </div>

              {/* Reserved Space Below Filter for Ads */}
              <div className="w-full">
                <AdBanner placement="sidebar" className="w-full rounded-xl overflow-hidden shadow-sm bg-slate-100 min-h-[300px] flex items-center justify-center border border-slate-200 border-dashed">
                  <span className="text-sm font-medium text-slate-400">Advertisement Space</span>
                </AdBanner>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-9 xl:col-span-7 space-y-6">

            {/* Top Ad */}
            {topAds.length > 0 && (
              <div className="w-full">
                <AdBanner placement="college_top" className="w-full rounded-xl overflow-hidden shadow-sm h-[100px] sm:h-[120px]" />
              </div>
            )}

            {/* SEO Content Section (Top) */}
            <SEOContentSection
              colleges={filteredColleges}
              location={derivedLocation}
              category={category || (selectedCategory !== 'all' ? selectedCategory : undefined)}
              subjectName={institutionType}
              h2Title={heroSubtitle}
            />

            {/* Mobile Tools Bar */}
            <div className="lg:hidden sticky top-[70px] z-30 bg-white/80 backdrop-blur-md p-2 -mx-4 px-4 border-b border-slate-200 flex gap-3 shadow-sm">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 h-10 shadow-sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                    {selectedCategory !== 'all' && <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700 h-5 px-1.5">1</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your college search</SheetDescription>
                  </SheetHeader>
                  <CollegeFilters {...filterProps} />
                  <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white pb-4">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Show Results</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select defaultValue="relevance">
                <SelectTrigger className="flex-1 bg-white border-slate-200 h-10 shadow-sm">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="fees_low">Fees: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm text-slate-600 font-medium">
                {filteredColleges.length > 0 ? (
                  <span>Showing <strong className="text-slate-900 font-semibold">{collegesToDisplay.length}</strong> of <strong className="text-slate-900 font-semibold">{filteredColleges.length}</strong> Colleges</span>
                ) : (
                  <span>Featured Institutes</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sort:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[160px] h-8 border-none bg-transparent focus:ring-0 px-0 font-medium text-slate-900 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="fees_low">Lowest Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* --- RESULTS LIST (SINGLE COLUMN) --- */}
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-[220px] bg-white rounded-xl border border-slate-200 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-xl border border-red-100">
                <p className="text-red-500">Unable to load data. Please try again.</p>
              </div>
            ) : collegesToDisplay.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No matches found</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  We couldn't find any colleges matching your current filters.
                </p>
                <Button
                  variant="link"
                  onClick={() => { 
                    setSelectedCategory('all'); 
                    setSelectedDistrict('all'); 
                    setSelectedState('all'); 
                    setSelectedDegree('all');
                    setSelectedOwnership('all');
                    setIsAutonomousOnly(false);
                    setIsNirfOnly(false);
                    setMaxCollegeLimit(null);
                    setCourseSlugFilter('');
                    setIsTopCities(false);
                    setIsFeaturedOnly(false);
                    setInPageSearch('');
                    setSearchParams({});
                  }}
                  className="mt-4 text-orange-600"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {combinedItems.map((item, index) => (
                  item.type === 'college' ? (
                    <div key={`college-${item.data.id}`}>
                      <CollegeCardHorizontal college={item.data} />
                    </div>
                  ) : (
                    <div key={`ad-${item.data.id}-${index}`} className="mt-0">
                      <AdBanner
                        placement="manual"
                        className="w-full rounded-xl overflow-hidden shadow-sm h-[120px] bg-slate-100"
                        adData={item.data}
                      />
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {filteredColleges.length > visibleCollegeCount && (
              <div ref={lastCollegeElementRef} className="pt-8 flex justify-center pb-8">
                <div className="flex space-x-2 justify-center items-center">
                  <span className="sr-only">Loading...</span>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

            {/* Crawlable Internal Links for Important SEO Landing Pages */}
            <section className="mt-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Popular Searches &amp; Top Colleges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Link
                  to="/top-mba-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top MBA Colleges in Coimbatore
                </Link>
                <Link
                  to="/top-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Engineering Colleges in Coimbatore
                </Link>
                <Link
                  to="/autonomous-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Autonomous Engineering Colleges in Coimbatore
                </Link>
                <Link
                  to="/top-engineering-colleges-in-salem"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Engineering Colleges in Salem
                </Link>
                <Link
                  to="/nirf-ranked-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  NIRF Ranked Engineering Colleges in Coimbatore
                </Link>
                <Link
                  to="/top-paramedical-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Paramedical Colleges in Coimbatore
                </Link>
                <Link
                  to="/top-occupational-therapy-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Occupational Therapy Colleges in Coimbatore
                </Link>
              </div>
            </section>

          </main>

          {/* --- RIGHT SIDEBAR (Sticky) FOR ADS --- */}
          <aside className="hidden xl:block xl:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Reserved Space on the Right for Ads */}
              <div className="w-full">
                <AdBanner placement="sidebar_right" className="w-full rounded-xl overflow-hidden shadow-sm bg-slate-100 min-h-[600px] flex flex-col items-center justify-center border border-slate-200 border-dashed">
                  <span className="text-sm font-medium text-slate-400 rotate-90 whitespace-nowrap opacity-50">Right Sidebar Ad Space</span>
                </AdBanner>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default Colleges;