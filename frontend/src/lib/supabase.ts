import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (these will be generated from your actual database)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_premium: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          is_premium?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          is_premium?: boolean;
          created_at?: string;
        };
      };
      ingredients: {
        Row: {
          id: string;
          name: string;
          quantity: number;
          unit: string;
          expiry_date: string;
          category: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          quantity: number;
          unit: string;
          expiry_date: string;
          category: string;
          user_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          quantity?: number;
          unit?: string;
          expiry_date?: string;
          category?: string;
          user_id?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          name: string;
          description: string;
          ingredients: any;
          instructions: string[];
          cooking_time: number;
          difficulty: string;
          servings: number;
          image_url: string | null;
          category: string;
          is_premium: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          ingredients: any;
          instructions: string[];
          cooking_time: number;
          difficulty: string;
          servings: number;
          image_url?: string | null;
          category: string;
          is_premium: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          ingredients?: any;
          instructions?: string[];
          cooking_time?: number;
          difficulty?: string;
          servings?: number;
          image_url?: string | null;
          category?: string;
          is_premium?: boolean;
        };
      };
    };
  };
}
