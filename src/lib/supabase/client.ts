import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ||
  process.env.NEXT_PUBLIC_STORAGE_URL || 
  process.env.STORAGE_URL || 
  '';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_STORAGE_ANON_KEY ||
  process.env.STORAGE_ANON_KEY ||
  '';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);
