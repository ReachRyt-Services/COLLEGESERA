
import { useEffect, useState } from 'react';
// Force HMR update
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { getCollegeBySlug } from '@/services/collegeService';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useAuth } from '@clerk/clerk-react';

const CollegeEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { getToken } = useAuth();
    const isEditing = !!slug;

    const { data: college, isLoading } = useQuery({
        queryKey: ['college', slug],
        queryFn: () => getCollegeBySlug(slug!),
        enabled: isEditing,
    });

    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            slug: '',
            location: '',
            district: '',
            type: '',
            type_collwge: '',
            established: new Date().getFullYear(),
            website: '',
            image_url: '',
            featured: false,
            featured_priority: 0,
            homepage_featured: false,
            description: '',
        }
    });

    useEffect(() => {
        if (college) {
            reset({
                name: college.name,
                slug: college.slug,
                location: college.location,
                district: college.district,
                type: college.type,
                type_collwge: college.type_collwge,
                established: college.established,
                website: college.website || '',
                image_url: college.image_url || '',
                featured: college.featured,
                featured_priority: college.featured_priority || 0,
                homepage_featured: college.homepage_featured,
                description: college.description || '',
            });
        }
    }, [college, reset]);

    const onSubmit = async (data: any) => {
        try {
            const token = await getToken({ template: 'supabase' });
            const client = getSupabaseClient(token);

            let error;
            if (isEditing) {
                const { error: updateError } = await client
                    .from('colleges')
                    .update(data)
                    .eq('id', college?.id);
                error = updateError;
            } else {
                const { error: insertError } = await client
                    .from('colleges')
                    .insert([data]);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: "Success",
                description: `College ${isEditing ? 'updated' : 'created'} successfully.`,
            });

            queryClient.invalidateQueries({ queryKey: ['admin-colleges'] });
            navigate('/secure-portal/colleges');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    };

    if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/secure-portal/colleges')}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isEditing ? `Edit ${college?.name}` : 'Add New College'}
                    </h1>
                    <p className="text-slate-500">
                        {isEditing ? 'Update college details and settings' : 'Create a new college entry'}
                    </p>
                </div>
                <div className="ml-auto">
                    <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                        {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="visibility">Visibility</TabsTrigger>
                    {/* <TabsTrigger value="courses">Courses</TabsTrigger> */}
                    {/* <TabsTrigger value="seo">SEO</TabsTrigger> */}
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Core details about the institution.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">College Name *</Label>
                                    <Input id="name" {...register("name", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (URL) *</Label>
                                    <Input id="slug" {...register("slug", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">City *</Label>
                                    <Input id="location" {...register("location", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="district">District *</Label>
                                    <Input id="district" {...register("district", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type (e.g., Engineering) *</Label>
                                    <Input id="type" {...register("type", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type_collwge">Category (e.g., Private/Govt)</Label>
                                    <Input id="type_collwge" {...register("type_collwge")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="established">Established Year</Label>
                                    <Input id="established" type="number" {...register("established")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website URL</Label>
                                    <Input id="website" {...register("website")} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image_url">Cover Image URL</Label>
                                <Input id="image_url" {...register("image_url")} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" className="min-h-[100px]" {...register("description")} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="visibility" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sponsorship & Visibility</CardTitle>
                            <CardDescription>Manage how this college appears in search results.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Featured (Sponsored)</Label>
                                    <p className="text-sm text-slate-500">
                                        Boost this college to the top of search results.
                                    </p>
                                </div>
                                <Switch
                                    checked={watch('featured')}
                                    onCheckedChange={(checked) => setValue('featured', checked)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="featured_priority">Priority Score (0-100)</Label>
                                <Input
                                    id="featured_priority"
                                    type="number"
                                    {...register("featured_priority", { valueAsNumber: true })}
                                />
                                <p className="text-xs text-slate-500">100 = Platinum, 50 = Gold, 10 = Silver</p>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Homepage Spotlight</Label>
                                    <p className="text-sm text-slate-500">
                                        Show on the main landing page.
                                    </p>
                                </div>
                                <Switch
                                    checked={watch('homepage_featured')}
                                    onCheckedChange={(checked) => setValue('homepage_featured', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CollegeEditor;
