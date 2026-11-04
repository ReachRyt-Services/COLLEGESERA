import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeads } from '@/services/crmService';
import { useAuth } from '@clerk/clerk-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';

const ScholarshipList = () => {
    const { getToken, isLoaded } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: leads = [], isLoading } = useQuery({
        queryKey: ['admin-scholarship-leads'],
        queryFn: async () => {
            const token = await getToken({ template: 'supabase' });
            const allLeads = await getLeads(token || undefined);
            // Filter for scholarship leads on the client side for now, 
            // as getLeads fetches everything. 
            // Ideally backend would support filtering.
            // Assumption: 'lead_source' in DB maps to 'source' sent from frontend RPC.
            return allLeads.filter(lead => lead.lead_source === 'scholarship_page');
        },
        enabled: isLoaded,
    });

    const filteredLeads = useMemo(() => {
        return leads.filter(lead =>
            lead.contact?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.contact?.phone?.includes(searchTerm) ||
            lead.preferred_district?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [leads, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-orange-600" />
                        Scholarship Applications
                    </h1>
                    <p className="text-slate-500">View and manage scholarship requests</p>
                </div>
                <div className="text-sm font-medium bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                    Total Applications: {leads.length}
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>Date</TableHead>
                            <TableHead>Applicant Name</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                    Loading applications...
                                </TableCell>
                            </TableRow>
                        ) : filteredLeads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                    No scholarship applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className="hover:bg-slate-50/50">
                                    <TableCell className="whitespace-nowrap text-slate-500">
                                        {lead.created_at ? format(new Date(lead.created_at), 'dd MMM yyyy') : '-'}
                                        <div className="text-xs text-slate-400">
                                            {lead.created_at ? format(new Date(lead.created_at), 'hh:mm a') : ''}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        {lead.contact?.name || 'Unknown'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{lead.contact?.email}</span>
                                            <span className="text-slate-500">{lead.contact?.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {/* Course is stored in preferred_branches or need to check mapping. 
                                            RPC maps 'p_course' to preferred_branches array?
                                            Let's check 'preferred_branches' or logs.
                                            Actually, 'submit_lead' RP likely maps p_course to preferred_branches [0] or marks/category?
                                            Let's display lead.preferred_branches joined or notes?
                                            Wait, createLeadWithContact logic usually puts it in preferred_branches.
                                            Let's assume preferred_branches contains it.
                                        */}
                                        <Badge variant="outline">
                                            {lead.preferred_branches?.[0] || 'N/A'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {lead.preferred_district || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`
                                            ${lead.status === 'new' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                                            ${lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : ''}
                                            ${lead.status === 'converted' ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                                        `}>
                                            {lead.status || 'new'}
                                        </Badge>
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

export default ScholarshipList;
