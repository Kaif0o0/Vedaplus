import { createClient } from '@supabase/supabase-js';

// Production configuration with fallback to Ayukam Supabase cloud instance
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://fczgahiunphmxjimoxsm.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_jRcPujaC8zGkQT-AocO7Fg_xUJDP_qk';

// Verify that the environment variables are provided and not placeholders
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0 &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
