import { NextResponse, type NextRequest } from 'next/server'

// Pure pass-through middleware. No Supabase, no auth, no session checks.
// Backend/login removed — everything is local-only for Anh Kiet.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
