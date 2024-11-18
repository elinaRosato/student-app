/**
 * This utility file contains functions for managing user sessions with Supabase 
 * on the server side. The `updateSession` function is responsible for verifying 
 * the user's authentication status, refreshing the session, and ensuring that 
 * the user has access to protected pages.
 * 
 * The `updateSession` function checks if the user is logged in by using the 
 * `supabase.auth.getUser()` method. If the user is not logged in, it redirects 
 * the user to the login page, unless the user is already on login or auth-related pages.
 * 
 * The function also handles setting cookies for the user's session and passing 
 * these cookies along with the response to ensure proper synchronization between 
 * the server and client for a consistent session experience.
 * 
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} - The response object with updated session information.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch the user from Supabase to check authentication status
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If the user is not authenticated and not already on the login or auth pages, 
  // redirect to the login page
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Return the response with updated session details
  return supabaseResponse
}