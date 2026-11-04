import { DatabaseCrmContact, DatabaseCrmLead, DatabaseCrmInteraction } from "@/types/database";

// Input interfaces for creating records with proper required fields
import { supabase, getSupabaseClient } from '@/lib/supabaseClient';

// ... (keep existing code)

export async function getContacts(token?: string): Promise<DatabaseCrmContact[]> {
  const client = getSupabaseClient(token);
  const { data, error } = await client.from('crm_contacts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ... (keep existing code)

export async function getLeads(token?: string): Promise<(DatabaseCrmLead & { contact?: DatabaseCrmContact })[]> {
  const client = getSupabaseClient(token);
  const { data, error } = await client.from('crm_leads').select('*, contact:crm_contacts(*)').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ... (keep existing code)

export async function getInteractions(contactId?: string, leadId?: string, token?: string): Promise<DatabaseCrmInteraction[]> {
  const client = getSupabaseClient(token);
  let query = client.from('crm_interactions').select('*').order('created_at', { ascending: false });
  if (contactId) query = query.eq('contact_id', contactId);
  if (leadId) query = query.eq('lead_id', leadId);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createInteraction(interaction: CreateInteractionInput): Promise<DatabaseCrmInteraction> {
  const { data, error } = await supabase.from('crm_interactions').insert(interaction).select().single();
  if (error) throw error;
  return data;
}

// Helper to create Contact + Lead in one go (Common for "Apply Now" forms)
export async function createLeadWithContact(
  contactData: CreateContactInput,
  leadData: Omit<CreateLeadInput, 'contact_id'>
): Promise<{ contact: DatabaseCrmContact; lead: DatabaseCrmLead }> {
  // DEPRECATED: Use submitLeadForm for public forms to avoid RLS issues
  // This function is kept for admin usage if needed

  // 1. Check if contact exists by email or phone
  let contactId: string | null = null;
  let contact: DatabaseCrmContact | null = null;

  if (contactData.email) {
    const { data } = await supabase.from('crm_contacts').select('*').eq('email', contactData.email).maybeSingle();
    if (data) {
      contact = data;
      contactId = data.id;
    }
  }

  if (!contactId && contactData.phone) {
    const { data } = await supabase.from('crm_contacts').select('*').eq('phone', contactData.phone).maybeSingle();
    if (data) {
      contact = data;
      contactId = data.id;
    }
  }

  // 2. Create new contact if not found
  if (!contactId) {
    contact = await createContact(contactData);
    contactId = contact.id;
  }

  // 3. Create Lead linked to contact
  const lead = await createLead({
    ...leadData,
    contact_id: contactId
  });

  return { contact: contact!, lead };
}

// Secure RPC call for public forms
export async function submitLeadForm(data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  course: string;
  source?: string;
  notes?: string;
}) {
  const { data: result, error } = await supabase.rpc('submit_lead', {
    p_name: data.name,
    p_email: data.email,
    p_phone: data.phone,
    p_city: data.city,
    p_course: data.course,
    p_source: data.source || 'website_popup',
    p_notes: data.notes
  });

  if (error) throw error;
  return result;
}

export async function getCrmDashboardStats() {
  // Placeholder for stats logic
  return {
    totalContacts: 0,
    activeLeads: 0,
    highPriorityLeads: 0,
    conversionRate: '0.0',
    recentInteractions: []
  };
}
