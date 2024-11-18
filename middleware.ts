/**
 * This middleware file is responsible for handling user sessions by ensuring that the 
 * session is properly refreshed for each request. It updates the session using the 
 * `updateSession` function from the utils/supabase/middleware.ts file.
 * 
 * The middleware checks if the user is authenticated before allowing access to 
 * certain paths. If the user is not authenticated and tries to access restricted 
 * paths, they are redirected to the login page.
 * 
 * The `matcher` config defines which request paths this middleware should apply to, 
 * excluding static assets like images, static files, and the favicon.
 * 
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} - The response object after updating the session.
 */

import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  /**
   * Defines the pattern of request paths that this middleware should apply to. 
   * It excludes static files and images, as well as the favicon, from the middleware's 
   * logic. Modify this pattern as necessary to fit the application's requirements.
   */
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}