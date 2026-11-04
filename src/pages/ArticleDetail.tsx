
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticleBySlug } from "@/services/articleService";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, List, Facebook, Twitter, Linkedin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import UserForm from "@/components/UserForm";

const ArticleDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);

    const { data: article, isLoading, error } = useQuery({
        queryKey: ['article', slug],
        queryFn: () => getArticleBySlug(slug!),
        enabled: !!slug,
    });

    // Process content to add IDs to H2s and H3s and generate TOC
    const processedContent = useMemo(() => {
        if (!article?.content) return "";

        let content = article.content;
        const headings: { id: string; text: string; level: number }[] = [];

        // Replace H2
        content = content.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match, attrs, text) => {
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            headings.push({ id, text: text.replace(/<[^>]*>/g, ''), level: 2 });
            return `<h2 id="${id}"${attrs}>${text}</h2>`;
        });

        // Also capture H3 for TOC if needed, but let's stick to H2 for simplicity or mixed?
        // Let's do just H2 for the TOC to keep it clean, as user asked for "Table of Contents".
        setToc(headings);

        return content;
    }, [article]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const shareUrl = window.location.href;

    const handleShare = (platform: string) => {
        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article?.title || '')}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
        }
        if (url) window.open(url, '_blank', 'width=600,height=400');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <Skeleton className="h-8 w-32 mb-4" />
                        <Skeleton className="h-12 w-3/4 mb-6" />
                        <Skeleton className="h-96 w-full mb-8 rounded-xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                    <div className="hidden lg:block lg:col-span-4">
                        <Skeleton className="h-64 w-full" />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h1>
                    <p className="text-slate-600 mb-6">The article you are looking for does not exist or has been removed.</p>
                    <Button onClick={() => navigate('/articles')}>Back to Articles</Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEO
                title={`${article.title} | CollegeSera`}
                description={article.meta_description || article.excerpt || "Read more on CollegeSera"}
                keywords={article.tags?.join(', ') || "college, education, article"}
                image={article.featured_image}
                url={window.location.href}
                type="article"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": article.title,
                    "image": article.featured_image,
                    "datePublished": article.created_at,
                    "dateModified": article.updated_at,
                    "author": {
                        "@type": "Organization",
                        "name": "CollegeSera"
                    }
                }}
            />
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 pl-0 text-slate-600 hover:bg-transparent hover:text-orange-600 transition-colors"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                        {/* Featured Image */}
                        {article.featured_image && (
                            <div className="w-full aspect-video relative">
                                <img
                                    src={article.featured_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-6 md:p-10">
                            {/* Header Info */}
                            <div className="mb-8 border-b border-slate-100 pb-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none px-3 py-1">
                                        {article.article_label || 'Article'}
                                    </Badge>
                                    <span className="text-slate-400 text-sm flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1" />
                                        {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    {article.views !== undefined && (
                                        <span className="text-slate-400 text-sm flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1" />
                                            {article.views} reads
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                    {article.title}
                                </h1>

                                {/* Social Share */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-slate-500 mr-2">Share:</span>
                                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-500 hover:bg-blue-50 border-slate-200" onClick={() => handleShare('twitter')}>
                                        <Twitter className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-slate-200" onClick={() => handleShare('facebook')}>
                                        <Facebook className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full text-blue-700 hover:text-blue-800 hover:bg-blue-50 border-slate-200" onClick={() => handleShare('linkedin')}>
                                        <Linkedin className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Mobile TOC */}
                            <div className="lg:hidden mb-10 bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-3 flex items-center">
                                    <List className="w-4 h-4 mr-2" /> Table of Contents
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    {toc.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className="text-slate-600 hover:text-orange-600 text-left font-medium"
                                            >
                                                {item.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Article Body */}
                            <div
                                className="prose prose-lg prose-slate max-w-none 
                                prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6
                                prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-800 prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-6
                                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6 prose-li:text-slate-700 prose-li:mb-2
                                prose-strong:text-slate-900 prose-strong:font-bold
                                "
                                dangerouslySetInnerHTML={{ __html: processedContent }}
                            />
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-4 space-y-8">
                        {/* Desktop TOC */}
                        <div className="sticky top-24">
                            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
                                        <List className="w-4 h-4 mr-2 text-orange-500" />
                                        Table of Contents
                                    </h3>
                                    <nav>
                                        <ul className="space-y-1 relative border-l-2 border-slate-100 ml-1.5">
                                            {toc.map((item, index) => (
                                                <li key={index} className="pl-4 relative">
                                                    <button
                                                        onClick={() => scrollToSection(item.id)}
                                                        className="text-sm text-slate-600 hover:text-orange-600 hover:font-medium text-left transition-all py-1.5 block w-full truncate"
                                                    >
                                                        {item.text}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </CardContent>
                            </Card>

                            {/* Related Placeholder */}
                            <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center shadow-lg">
                                <h3 className="font-bold text-xl mb-2">Need Career Guidance?</h3>
                                <p className="text-blue-100 text-sm mb-4">Get expert advice on choosing the right college for you.</p>
                                <Button
                                    onClick={() => setIsUserFormOpen(true)}
                                    className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-md"
                                >
                                    Consult an Expert
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
            <UserForm isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} />
        </div>
    );
};

export default ArticleDetail;
