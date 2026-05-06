import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://nebyyfkigtibqnbiqbhi.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_WGaxjjXYpT3_knv2hU8Vag_yamDr0rI';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

function normalizeSupabaseUrl(url) {
  if (!url) return '';

  try {
    return new URL(url.trim()).origin;
  } catch {
    return url.trim().replace(/\/+$/, '');
  }
}

const normalizedSupabaseUrl = normalizeSupabaseUrl(supabaseUrl);

export const isSupabaseConfigured = Boolean(normalizedSupabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(normalizedSupabaseUrl, supabaseAnonKey.trim(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;
