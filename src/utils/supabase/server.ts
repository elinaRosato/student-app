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

import { Database } from '@/types/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
  