import { useOutletContext } from "react-router-dom";
import NewsArticles from "@/components/colleges/details/NewsArticles";
import SEO from "@/components/SEO";

export default function CollegeNews() {
  const { college } = useOutletContext<{ college: any }>();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO
        title={`${college.name} News, Events & Articles`}
        description={`Stay updated with the latest news, events, and important announcements from ${college.name}.`}
        url={`https://collegesera.com/college/${college.slug}/news-articles`}
      />
      <div className="space-y-6 mb-10">
        <NewsArticles collegeId={college.id} collegeName={college.name} />
      </div>
    </div>
  );
}
