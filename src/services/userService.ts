import { supabase } from '@/lib/supabaseClient';

export interface UserData {
  name: string;
  phone_number: string;
  email: string;
  course: string;
  city: string;
}

export const saveUserData = async (userData: UserData) => {
  try {
    const { data, error } = await supabase
      .from('userdata')
      .insert([userData]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
