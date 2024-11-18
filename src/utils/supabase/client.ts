/**
 * Utility functions to create a Supabase client for accessing the Supabase API 
 * from Client Components in a Next.js application.
 *
 * This client is intended for use in the browser, where it interacts directly 
 * with Supabase's REST API and services from the client's side.
 *
 * Usage:
 * - Can be used in Client Components, which run in the browser.
 * - Allows calling Supabase queries, authentication methods, and real-time features 
 *   in client-side components.
 *
 * Example:
 *   import { createClient } from './client';
 *   const supabase = createClient();
 *   const { data, error } = await supabase.from('table').select('*');
 *
 * @returns {SupabaseClient} A Supabase client instance for use in Client Components.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}