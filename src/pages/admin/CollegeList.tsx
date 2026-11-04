import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    MapPin,
    Star,
    MoreHorizontal,
    Loader2
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getColleges, updateCollege } from '@/services/collegeService';
import { DatabaseCollege } from '@/types/database';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import { useAuth } from '@clerk/clerk-react';
import { getCollegeUrl } from '@/utils/collegeUrl';

const CollegeList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { getToken, isLoaded } = useAuth();

    const { data: colleges = [], isLoading } = useQuery({
        queryKey: ['admin-colleges'],
        queryFn: async () => {
            const token = await getToken({ template: 'supabase' });
            return getColleges(token || undefined);
        },
        enabled: isLoaded,
    });

    const updateCollegeMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string, updates: Partial<DatabaseCollege> }) => {
            const token = await getToken({ template: 'supabase' });
            return updateCollege(id, updates, token || undefined);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-colleges'] });
            toast({ title: "Updated", description: "College updated successfully." });
        },
        onError: (error: any) => {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    });

    const deleteCollegeMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken({ template: 'supabase' });
            const supabase = createClerkSupabaseClient(token!);
            const { error } = await supabase.from('colleges').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-colleges'] });
            toast({ title: "College Deleted", description: "The college has been removed." });
        },
        onError: (error: any) => {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    });

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            deleteCollegeMutation.mutate(id);
        }
    };

    const handleToggleHomePage = (id: string, currentStatus: boolean) => {
        updateCollegeMutation.mutate({
            id,
            updates: { homepage_featured: !currentStatus }
        });
    };

    const handleToggleFeatured = (id: string, currentStatus: boolean) => {
        updateCollegeMutation.mutate({
            id,
            updates: { featured: !currentStatus }
        });
    };

    const filteredColleges = colleges.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Colleges</h1>
                    <p className="text-slate-500">Manage your college database</p>
                </div>
                <Button onClick={() => navigate('/secure-portal/colleges/new')} className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" /> Add New College
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="text-sm text-slate-500 ml-auto">
                    Showing {filteredColleges.length} colleges
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-[300px]">College Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Home Page</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                    Loading colleges...
                                </TableCell>
                            </TableRow>
                        ) : filteredColleges.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                    No colleges found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredColleges.map((college) => (
                                <TableRow key={college.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                                {college.image_url ? (
                                                    <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-400">IMG</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{college.name}</div>
                                                <div className="text-xs text-slate-500 truncate max-w-[200px]">{college.slug}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-slate-600">
                                            <MapPin className="w-3 h-3" /> {college.location}, {college.district}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {college.type_collwge || college.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`homepage-${college.id}`}
                                                checked={college.homepage_featured}
                                                onCheckedChange={() => handleToggleHomePage(college.id, college.homepage_featured)}
                                            />
                                            <label
                                                htmlFor={`homepage-${college.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {college.homepage_featured ? 'Yes' : 'No'}
                                            </label>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={`featured-${college.id}`}
                                                checked={college.featured}
                                                onCheckedChange={() => handleToggleFeatured(college.id, college.featured)}
                                            />
                                            <label
                                                htmlFor={`featured-${college.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {college.featured ? 'Yes' : 'No'}
                                            </label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigate(`/secure-portal/colleges/edit/${college.slug}`)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.open(getCollegeUrl(college.slug), '_blank')}>
                                                    <Link to={getCollegeUrl(college.slug)} target="_blank" className="flex items-center w-full">
                                                        <MapPin className="mr-2 h-4 w-4" /> View Live Page
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(college.id, college.name)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete College
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

export default CollegeList;
