import { useEffect, useState } from "react";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { supabase } from "@/lib/supabaseClient";

interface CollegeLogo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

const TrustedColleges = () => {
  const [colleges, setColleges] = useState<CollegeLogo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback gradients if we need to generate them
  const gradients = [
    { from: "#FF5722", via: "#FF9800", to: "#FFC107" },
    { from: "#4CAF50", via: "#8BC34A", to: "#CDDC39" },
    { from: "#E91E63", via: "#F44336", to: "#FF5722" },
    { from: "#9C27B0", via: "#673AB7", to: "#3F51B5" },
    { from: "#2196F3", via: "#03A9F4", to: "#00BCD4" },
    { from: "#F44336", via: "#E91E63", to: "#9C27B0" },
    { from: "#00BCD4", via: "#009688", to: "#4CAF50" },
    { from: "#3F51B5", via: "#2196F3", to: "#03A9F4" },
  ];

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const { data, error } = await supabase
          .from("colleges")
          .select("name, image")
          .limit(8);

        if (error) {
          console.error("Error fetching colleges:", error);
          setColleges(getFallbackColleges());
          return;
        }

        if (data && data.length > 0) {
          const formattedColleges = data.map((college, idx) => ({
            src: college.image || "https://svgl.app/library/google.svg", // Fallback if no image
            alt: college.name,
            gradient: gradients[idx % gradients.length],
          }));
          setColleges(formattedColleges);
        } else {
          // If no colleges in db, use fallbacks
          setColleges(getFallbackColleges());
        }
      } catch (err) {
        console.error("Error fetching colleges for marquee:", err);
        setColleges(getFallbackColleges());
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const getFallbackColleges = () => {
    const defaultAlt = ["Engineering", "Business", "Medical", "Arts & Science", "Tech", "Law", "Design", "Research"];
    return gradients.map((grad, i) => ({
      src: "https://svgl.app/library/google.svg", // Generic fallback SVG
      alt: `Top ${defaultAlt[i]} College`,
      gradient: grad,
    }));
  };

  if (loading) return null;

  return (
    <div className="bg-slate-50 py-16 w-full flex items-center justify-center border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <MarqueeLogoScroller
          title="Trusted by Top Colleges"
          description="India's leading institutions trust CollegeSera to connect them with the right students."
          logos={colleges}
          speed="normal"
          className="border-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default TrustedColleges;
