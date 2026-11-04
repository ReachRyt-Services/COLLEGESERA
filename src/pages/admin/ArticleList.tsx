
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getArticles, deleteArticle } from "@/services/articleService";
import { DatabaseArticle } from "@/types/database";

const ArticleList = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { getToken, isLoaded } = useAuth();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const token = await getToken({ template: "supabase" });
            return getArticles(token || undefined);
        },
        enabled: isLoaded,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken({ template: "supabase" });
            return deleteArticle(id, token || undefined);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            toast({
                title: "Article deleted",
                description: "The article has been successfully deleted.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to delete article.",
                variant: "destructive",
            });
        },
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            deleteMutation.mutate(id);
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.article_label && article.article_label.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
                    <p className="text-muted-foreground">
                        Manage your blog posts, exam updates, and other content.
                    </p>
                </div>
                <Button onClick={() => navigate("/secure-portal/articles/new")}>
                    <Plus className="w-4 h-4 mr-2" /> New Article
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    Loading articles...
                                </TableCell>
                            </TableRow>
                        ) : filteredArticles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No articles found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredArticles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell>
                                        {article.article_label ? (
                                            <Badge variant="outline">{article.article_label}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                                            {article.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{article.views}</TableCell>
                                    <TableCell>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => navigate(`/secure-portal/articles/edit/${article.id}`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ArticleList;
