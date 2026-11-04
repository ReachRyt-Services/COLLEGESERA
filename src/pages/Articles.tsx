
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, User } from "lucide-react";
import { format } from "date-fns";
import { getArticles } from "@/services/articleService";

const Articles = () => {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch published articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['published-articles'],
    queryFn: async () => {
      const allArticles = await getArticles();
      // Filter for published articles only
      return allArticles.filter(a => a.status === 'published');
    }
  });

  // Derive unique categories (labels) from articles
  const categories = Array.from(new Set(articles.map(a => a.article_label).filter(Boolean))) as string[];
  const categoryNames = ["All", ...categories];

  const filteredArticles = articles.filter(article => {
    if (activeCategory === "All") return true;
    return article.article_label === activeCategory;
  });

  // Update article views by fetching current views and incrementing
  const incrementViews = async (articleId: string) => {
    // TODO: Implement view increment logic in backend/service if needed
    console.log('incrementViews', { articleId });
  };

  const handleArticleClick = (slug: string) => {
    navigate(`/articles/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* News Banner */}
      <div className="bg-red-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-red-500 px-3 py-1 rounded text-sm font-semibold">Latest News</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {articles.slice(0, 3).map(article => article.title).join(' | ') ||
                  'Latest education news and updates from colleges across Tamil Nadu'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600">
            Home / Articles
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Latest Education Articles | Colleges, Exams, Careers, Courses
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b">
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeCategory === category
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading articles...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleArticleClick(article.slug)}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        {article.featured && (
                          <Badge variant="default" className="bg-orange-500">
                            Featured
                          </Badge>
                        )}
                      </div>

                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="font-medium text-orange-600">
                            Admin
                          </span>
                        </div>
                        <span>{format(new Date(article.created_at), 'MMM dd, yyyy')}</span>
                        {article.article_label && (
                          <Badge
                            variant="outline"
                          >
                            {article.article_label}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0} views
                        </span>
                      </div>
                    </div>
                    {article.featured_image && (
                      <div className="w-full md:w-48 h-48 md:h-auto">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover md:rounded-r-lg rounded-t-lg md:rounded-l-none"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredArticles.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found in this category</p>
          </div>
        )}
      </div>

      <Footer />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default Articles;
