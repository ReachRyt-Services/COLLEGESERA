
import { supabase } from "@/lib/supabaseClient";
import { DatabaseArticle } from "@/types/database";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const getArticles = async (token?: string) => {
    const client = getSupabaseClient(token);
    const { data, error } = await client
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }

    return data as DatabaseArticle[];
};

export const getArticleBySlug = async (slug: string) => {
    let { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (!data) {
        // Fallback for neet-ug-2026 / neet-ug-2026-medical-entrance-exam
        if (slug === 'neet-ug-2026') {
            const res = await supabase.from('articles').select('*').eq('slug', 'neet-ug-2026-medical-entrance-exam').maybeSingle();
            data = res.data;
        } else if (slug === 'neet-ug-2026-medical-entrance-exam') {
            const res = await supabase.from('articles').select('*').eq('slug', 'neet-ug-2026').maybeSingle();
            data = res.data;
        } else if (slug === 'top-mba-colleges-in-coimbatore') {
            const res = await supabase.from('articles').select('*').eq('slug', 'top-10-mba-colleges-in-coimbatore').maybeSingle();
            data = res.data;
        } else if (slug === 'top-10-mba-colleges-in-coimbatore') {
            const res = await supabase.from('articles').select('*').eq('slug', 'top-mba-colleges-in-coimbatore').maybeSingle();
            data = res.data;
        }
    }

    if (!data) {
        if (error) console.error('Error fetching article:', error);
        throw error || new Error('Article not found');
    }

    return data as DatabaseArticle;
};

export const getArticlesByLabel = async (label: string) => {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('article_label', label)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles by label:', error);
        throw error;
    }

    return data as DatabaseArticle[];
};

export const getArticlesByCollege = async (collegeId: string) => {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('college_id', collegeId)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching articles by college:', error);
        return [];
    }

    return data as DatabaseArticle[];
};

export const createArticle = async (article: Partial<DatabaseArticle>, token?: string) => {
    const client = getSupabaseClient(token);

    // Generate slug if not provided
    if (!article.slug && article.title) {
        article.slug = article.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    const { data, error } = await client
        .from('articles')
        .insert([article])
        .select()
        .single();

    if (error) {
        console.error('Error creating article:', error);
        throw error;
    }

    return data as DatabaseArticle;
};

export const updateArticle = async (id: string, updates: Partial<DatabaseArticle>, token?: string) => {
    const client = getSupabaseClient(token);
    const { data, error } = await client
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating article:', error);
        throw error;
    }

    return data as DatabaseArticle;
};

export const deleteArticle = async (id: string, token?: string) => {
    const client = getSupabaseClient(token);
    const { error } = await client
        .from('articles')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
};
