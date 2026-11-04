import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArticlesByCollege } from "@/services/articleService";
import { DatabaseArticle } from "@/types/database";

interface NewsArticlesProps {
    collegeId: string;
    collegeName: string;
}

const NewsArticles = ({ collegeId, collegeName }: NewsArticlesProps) => {
    const [articles, setArticles] = useState<DatabaseArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticlesByCollege(collegeId);
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles", error);
            } finally {
                setLoading(false);
            }
        };

        if (collegeId) {
            fetchArticles();
        }
    }, [collegeId]);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading news...</div>;
    }

    if (articles.length === 0) {
        return (
            <Card>
                <CardContent className="py-10 text-center text-gray-500">
                    <Newspaper className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>No news articles found for {collegeName}.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">News & Articles</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        to={`/articles/${article.slug}`}
                        className="group block h-full"
                    >
                        <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden border-slate-200">
                            {article.featured_image && (
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={article.featured_image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardContent className="p-5 flex flex-col h-[calc(100%-12rem)]">
                                <div className="flex items-center justify-between mb-3">
                                    {article.article_label && (
                                        <Badge variant="secondary" className="text-xs">
                                            {article.article_label}
                                        </Badge>
                                    )}
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    {article.title}
                                </h3>

                                {article.excerpt && (
                                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                                        {article.excerpt}
                                    </p>
                                )}

                                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-orange-600">
                                    Read Article <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsArticles;
