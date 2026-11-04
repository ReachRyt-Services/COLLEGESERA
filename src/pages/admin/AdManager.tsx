import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { DatabaseAdvertisement } from '@/types/database';
import { useAuth } from '@clerk/clerk-react';

const AdManager = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { isLoaded, getToken } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [newAd, setNewAd] = useState({
        title: '',
        image_url: '',
        link_url: '',
        placement_area: 'sidebar',
        priority: 10,
        max_display_count: 0,
    });

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['admin-ads'],
        queryFn: async () => {
            const token = await getToken({ template: 'supabase' });
            const client = getSupabaseClient(token);
            const { data, error } = await client
                .from('ad_placements')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data as DatabaseAdvertisement[];
        },
        enabled: isLoaded,
    });

    const createAdMutation = useMutation({
        mutationFn: async (adData: any) => {
            const token = await getToken({ template: 'supabase' });
            const client = getSupabaseClient(token);
            const { error } = await client.from('ad_placements').insert([adData]);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
            setIsAdding(false);
            setNewAd({ title: '', image_url: '', link_url: '', placement_area: 'sidebar', priority: 10, max_display_count: 0 });
            toast({ title: "Ad Created", description: "New advertisement added successfully." });
        },
        onError: (error: any) => {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    });

    const toggleAdMutation = useMutation({
        mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
            const token = await getToken({ template: 'supabase' });
            const client = getSupabaseClient(token);
            const { error } = await client.from('ad_placements').update({ is_active: isActive }).eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
            toast({ title: "Updated", description: "Ad status updated." });
        }
    });

    const deleteAdMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken({ template: 'supabase' });
            const client = getSupabaseClient(token);
            const { error } = await client.from('ad_placements').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
            toast({ title: "Deleted", description: "Advertisement removed." });
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Ad Manager</h1>
                    <p className="text-slate-500">Manage banners and sponsored placements</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" /> {isAdding ? 'Cancel' : 'Add New Ad'}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-semibold text-lg">Create New Advertisement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Ad Title (Internal use)"
                            value={newAd.title}
                            onChange={e => setNewAd({ ...newAd, title: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            value={newAd.image_url}
                            onChange={e => setNewAd({ ...newAd, image_url: e.target.value })}
                        />
                        <Input
                            placeholder="Target Link URL"
                            value={newAd.link_url}
                            onChange={e => setNewAd({ ...newAd, link_url: e.target.value })}
                        />
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={newAd.placement_area}
                            onChange={e => setNewAd({ ...newAd, placement_area: e.target.value })}
                        >
                            <option value="sidebar">Sidebar</option>
                            <option value="college_feed">College Feed</option>
                            <option value="college_top">College Top Drawer</option>
                            <option value="college_bottom">College Bottom</option>
                            <option value="home_hero">Home Hero</option>
                        </select>
                        <Input
                            type="number"
                            placeholder="Priority (Higher shows first)"
                            value={newAd.priority}
                            onChange={e => setNewAd({ ...newAd, priority: parseInt(e.target.value) })}
                        />
                        <div className="space-y-1">
                            <Input
                                type="number"
                                placeholder="Max Repeat Count (0 = Infinite)"
                                value={newAd.max_display_count || ''}
                                onChange={e => setNewAd({ ...newAd, max_display_count: parseInt(e.target.value) || 0 })}
                            />
                            <p className="text-[10px] text-slate-500 pl-1"> *Only applies to Feed ads</p>
                        </div>
                    </div>
                    <Button onClick={() => createAdMutation.mutate(newAd)} disabled={createAdMutation.isPending}>
                        {createAdMutation.isPending ? 'Saving...' : 'Create Ad'}
                    </Button>
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Placement</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-8">Loading ads...</TableCell></TableRow>
                        ) : ads.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-8 text-slate-500">No ads found. Create one to get started.</TableCell></TableRow>
                        ) : (
                            ads.map((ad) => (
                                <TableRow key={ad.id}>
                                    <TableCell>
                                        <div className="w-16 h-10 bg-slate-100 rounded overflow-hidden">
                                            <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {ad.title}
                                        <a href={ad.link_url} target="_blank" rel="noreferrer" className="ml-2 inline-block text-slate-400 hover:text-blue-500">
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{ad.placement_area}</Badge>
                                    </TableCell>
                                    <TableCell>{ad.priority}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={ad.is_active}
                                            onCheckedChange={(checked) => toggleAdMutation.mutate({ id: ad.id, isActive: checked })}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => deleteAdMutation.mutate(ad.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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

export default AdManager;
