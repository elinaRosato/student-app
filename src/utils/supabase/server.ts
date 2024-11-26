/**
 * Utility functions to create a Supabase client for accessing the Supabase API 
 * from Server Components, Server Actions, and Route Handlers in a Next.js application.
 *
 * This client is intended for use on the server side, and it is more secure for 
 * operations that should not be exposed to the client. It can be used to interact 
 * with Supabase's services without exposing sensitive data to the browser.
 *
 * Usage:
 * - Can be used in Server Components, Server Actions, and API routes.
 * - Suitable for server-side operations like data manipulation, authentication 
 *   actions, and background processing.
 *
 * Example:
 *   import { createServerClient } from './server';
 *   const supabase = createServerClient();
 *   const { data, error } = await supabase.from('table').select('*');
 *
 * @returns {SupabaseClient} A Supabase client instance for use in Server Components 
 * or Server Actions.
 */

import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  try {
    const cookieStore = await cookies(); // No need for `await` here; `cookies` is synchronous.

    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(), // Access the `getAll` method correctly.
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore errors in static generation
            }
          },
        },
      }
    );
  } catch (error) {
    console.warn('Cookies unavailable. Returning a non-session Supabase client.');
    // Return a public client for static generation
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => [], // No cookies for static generation
          setAll: () => {}, // No cookie setting for static generation
        },
      }
    );
  }
}

  