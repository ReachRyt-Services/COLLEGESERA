
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteValidator from "@/components/routing/RouteValidator";
import ScrollToTop from "@/components/routing/ScrollToTop";
import ArticleDetail from "./pages/ArticleDetail";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Lazy load pages
const Colleges = lazy(() => import("./pages/Colleges"));
const CollegeDetail = lazy(() => import("./pages/CollegeDetail"));
const CollegeDetailsDirectory = lazy(() => import("./pages/CollegeDetailsDirectory"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Articles = lazy(() => import("./pages/Articles"));
const Exams = lazy(() => import("./pages/Exams"));
const Courses = lazy(() => import("./pages/Courses"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Scholarship = lazy(() => import("./pages/Scholarship"));
const SitemapAdmin = lazy(() => import("./pages/SitemapAdmin"));
const Programs = lazy(() => import("./pages/Programs"));

// College detail sub-pages
const CollegeOverview = lazy(() => import("./pages/college/CollegeOverview"));
const CollegeCourses = lazy(() => import("./pages/college/CollegeCourses"));
const CollegeAdmission = lazy(() => import("./pages/college/CollegeAdmission"));
const CollegePlacements = lazy(() => import("./pages/college/CollegePlacements"));
const CollegeRankings = lazy(() => import("./pages/college/CollegeRankings"));
const CollegeFacilities = lazy(() => import("./pages/college/CollegeFacilities"));
const CollegeNews = lazy(() => import("./pages/college/CollegeNews"));
import AdminLayout from "@/layouts/AdminLayout";
import LeadBoard from "@/pages/admin/LeadBoard";
import CollegeList from "@/pages/admin/CollegeList";
import CollegeEditor from "@/pages/admin/CollegeEditor";
import Analytics from "@/pages/admin/Analytics";
import AdManager from "@/pages/admin/AdManager";
import ArticleList from "@/pages/admin/ArticleList";
import ArticleEditor from "@/pages/admin/ArticleEditor";
const ScholarshipList = lazy(() => import("@/pages/admin/ScholarshipList"));
import FloatingContact from "@/components/FloatingContact";

function AppContent() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <FloatingContact />
        <BrowserRouter>
          <ScrollToTop />
          <RouteValidator>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/colleges/location/:location" element={<Colleges />} />
                <Route path="/colleges/state/:state" element={<Colleges />} />
                <Route path="/colleges/:type" element={<Colleges />} />
                <Route path="/colleges/:param1/:param2" element={<Colleges />} />
                <Route path="/colleges/:category/:section/:slug" element={<Colleges />} />
                <Route path="/colleges/:param1/:param2/:courseSlug" element={<Colleges />} />

                {/* Admin Routes */}
                <Route path="/secure-portal" element={<AdminLayout />}>
                  <Route index element={<LeadBoard />} /> {/* Default to Leads for now, or Dashboard later */}
                  <Route path="leads" element={<LeadBoard />} />
                  <Route path="colleges" element={<CollegeList />} />
                  <Route path="colleges/new" element={<CollegeEditor />} />
                  <Route path="colleges/edit/:slug" element={<CollegeEditor />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="seo" element={<SitemapAdmin />} />
                  <Route path="settings" element={<AdManager />} />
                  <Route path="articles" element={<ArticleList />} />
                  <Route path="articles/new" element={<ArticleEditor />} />
                  <Route path="articles/edit/:id" element={<ArticleEditor />} />
                  <Route path="scholarships" element={<ScholarshipList />} />
                </Route>
                <Route path="/college/:slug" element={<CollegeDetail />}>
                  <Route index element={<CollegeOverview />} />
                  <Route path="overview" element={<CollegeOverview />} />
                  <Route path="courses-fees" element={<CollegeCourses />} />
                  <Route path="courses" element={<CollegeCourses />} />
                  <Route path="courses-and-fees" element={<CollegeCourses />} />
                  <Route path="admission" element={<CollegeAdmission />} />
                  <Route path="admissions" element={<CollegeAdmission />} />
                  <Route path="placements" element={<CollegePlacements />} />
                  <Route path="placement" element={<CollegePlacements />} />
                  <Route path="rankings" element={<CollegeRankings />} />
                  <Route path="ranking" element={<CollegeRankings />} />
                  <Route path="facilities" element={<CollegeFacilities />} />
                  <Route path="facility" element={<CollegeFacilities />} />
                  <Route path="news-articles" element={<CollegeNews />} />
                  <Route path="news" element={<CollegeNews />} />
                  <Route path="news-and-articles" element={<CollegeNews />} />
                </Route>
                <Route path="/college-directory" element={<CollegeDetailsDirectory />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<ArticleDetail />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/exams/:examSlug" element={<Exams />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/programs" element={<Programs />} />

                <Route path="/auth" element={<Auth />} />
                <Route path="/seo-admin" element={<SitemapAdmin />} />
                <Route path="/:category/:subSlug" element={<Colleges />} />
                <Route path="/:seoSlug" element={<Colleges />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteValidator>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
