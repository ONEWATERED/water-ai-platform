import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of routes that require admin role
const adminRoutes = ['/admin'];

// List of error and static routes that should always be accessible
const errorRoutes = [
  '/_next',
  '/api/auth',
  '/error',
  '/not-found',
  '/loading',
  '/global-error',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt',
  '/assets',
  '/images',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow error routes and static assets
  if (errorRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // For admin routes, check admin authentication
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    // Check for auth token
    const token = request.cookies.get('auth-token');
    const userCookie = request.cookies.get('user');
    
    if (!token || !userCookie) {
      // Redirect to login if no token or user cookie
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const user = JSON.parse(userCookie.value);
      if (user?.role !== 'admin') {
        // Redirect to home if not admin
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      // Clear invalid cookies and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      response.cookies.delete('user');
      return response;
    }
  }

  // Allow all other routes without authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
