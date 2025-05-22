import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './lib/auth'; // Reverted to use isAuthenticated

export default async function middleware(request: NextRequest) {
  // Paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/practice',
    '/progress',
  ];
  
  const path = request.nextUrl.pathname;
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  
  if (isProtectedPath) {
    const isAuth = await isAuthenticated(request); // Reverted to use isAuthenticated
    
    if (!isAuth) {
      // Redirect to login page with return URL
      const returnUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search); // Keep improved returnUrl
      return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/practice/:path*',
    '/progress/:path*',
  ],
};