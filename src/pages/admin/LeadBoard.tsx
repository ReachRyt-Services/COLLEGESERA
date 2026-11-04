import { useQuery } from '@tanstack/react-query';
import { getLeads } from '@/services/crmService';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@clerk/clerk-react';

const LeadBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { getToken, isLoaded } = useAuth();

    const { data: leads = [], isLoading } = useQuery({
        queryKey: ['leads'],
        queryFn: async () => {
            const token = await getToken({ template: 'supabase' });
            return getLeads(token || undefined);
        },
        enabled: isLoaded,
    });

    const filteredLeads = leads.filter(lead =>
        lead.contact?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact?.phone?.includes(searchTerm) ||
        lead.preferred_district?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-yellow-100 text-yellow-700';
            case 'qualified': return 'bg-green-100 text-green-700';
            case 'lost': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Lead Management</h1>
                    <p className="text-slate-500">Manage and track student inquiries</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-9 w-[250px] bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">Export CSV</Button>
                </div>
            </div>

            {/* Stats Cards (Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">Total Leads</p>
                    <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">New Today</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">Pending Action</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {leads.filter(l => l.status === 'new').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500">Conversion Rate</p>
                    <p className="text-2xl font-bold text-green-600">0%</p>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>Student Name</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    Loading leads...
                                </TableCell>
                            </TableRow>
                        ) : filteredLeads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    No leads found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className="hover:bg-slate-50">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900">{lead.contact?.name || 'Unknown'}</span>
                                            <span className="text-xs text-slate-500">ID: {lead.id.slice(0, 8)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-sm text-slate-600">
                                            {lead.contact?.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3 h-3" /> {lead.contact.phone}
                                                </div>
                                            )}
                                            {lead.contact?.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-3 h-3" /> {lead.contact.email}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {lead.preferred_district && (
                                                <div className="flex items-center gap-1 text-xs text-slate-600">
                                                    <MapPin className="w-3 h-3" /> {lead.preferred_district}
                                                </div>
                                            )}
                                            {lead.notes && (
                                                <span className="text-xs text-slate-500 truncate max-w-[150px]" title={lead.notes}>
                                                    {lead.notes}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(lead.status)} border-none shadow-none`}>
                                            {lead.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" className="h-8">View</Button>
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

export default LeadBoard;
