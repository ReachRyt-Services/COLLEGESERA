
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedColleges from "@/components/FeaturedColleges";
import StatsSection from "@/components/StatsSection";
import StreamsSection from "@/components/StreamsSection";
import NavigationSection from "@/components/NavigationSection";
import ExamsSection from "@/components/ExamsSection";
import CitiesSection from "@/components/CitiesSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PopularCourses from "@/components/popularCourses";
import { useState } from "react";

import SEO from "@/components/SEO";

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Home"
        description="Discover top colleges in South India. Compare fees, courses, and placements to find your perfect college match."
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://collegesera.com/#organization",
          "name": "CollegeSera",
          "alternateName": "College Sera",
          "url": "https://collegesera.com",
          "logo": "https://collegesera.com/CollegeseraLogo.png",
          "description": "CollegeSera (College Sera) is South India's most trusted platform that helps students discover colleges, courses, fees, rankings and admissions information.",
          "foundingDate": "2025",
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61581886108783",
            "https://www.instagram.com/collegesera/",
            "https://www.linkedin.com/company/collegesera/"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@collegesera.com",
            "telephone": "+91-9717819001",
            "availableLanguage": ["English", "Hindi"]
          }
        }}
      />
      <Header />
      <HeroSection />
      <StreamsSection />
      <FeaturedColleges />
      <StatsSection />
      <PopularCourses />
      <NavigationSection />
      <ExamsSection />
      <CitiesSection />
      <Footer />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default Index;
