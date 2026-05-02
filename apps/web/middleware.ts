import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware: session check for `/team/*` routes.
 *
 * S0 MOCK: Real @supabase/ssr session check deferred until backend
 * OAuth READY (backend-developer AC-1/AC-2). For now we pass-through
 * with a mock session shape in headers so downstream pages can read it.
 *
 * Real wiring (once backend READY):
 *
 *   import { createServerClient } from '@supabase/ssr'
 *   const supabase = createServerClient(...)
 *   const { data: { session } } = await supabase.auth.getSession()
 *   if (!session) return NextResponse.redirect('/login')
 *   // role check: if employee.role !== 'manager' → 403
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect `/team/*` routes for now
  if (!pathname.startsWith('/team')) {
    return NextResponse.next()
  }

  // S0 MOCK session — remove when real OAuth lands
  const mockSession = {
    user: {
      id: 'mock-manager-001',
      email: 'manager@code.az',
    },
    access_token: 'mock-token-s0',
  }

  // Pass mock session to downstream via request header (readable in Server Components)
  const response = NextResponse.next()
  response.headers.set('x-mock-session', JSON.stringify(mockSession))

  return response
}

export const config = {
  matcher: ['/team/:path*'],
}
