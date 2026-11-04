import { supabase } from '@/lib/supabaseClient';
import { Program } from "@/types/database";

export async function getAllPrograms(): Promise<Program[]> {
    try {
        const { data, error } = await supabase
            .from('programs')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return (data || []) as Program[];
    } catch (error: any) {
        console.error('Service error in getAllPrograms:', error.message);
        return [];
    }
}
