import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // This middleware now simply passes the request to the next handler
  // without performing any authentication checks.
  // console.log(`Middleware triggered for: ${request.nextUrl.pathname}, passing through.`); // Optional: for debugging
  return NextResponse.next();
}

// The config remains, so this middleware function will still run for matched paths,
// but it won't perform operations incompatible with the Edge runtime.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/practice/:path*',
    '/progress/:path*',
  ],
};