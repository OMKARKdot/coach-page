import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  const coachpageDomains = ['coachpage.in', 'www.coachpage.in'];
  const isVercelPreview = hostname.includes('vercel.app');
  const isCoachpageDomain = coachpageDomains.includes(hostname);

  if (isCoachpageDomain) {
    if (pathname === '/' || pathname === '/coach') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Apply slug rewrite for coachpage domains AND Vercel preview URLs
  if (isCoachpageDomain || isVercelPreview) {
    if (!pathname.startsWith('/coach') && !pathname.startsWith('/coach-admin')) {
      const slug = pathname.split('/')[1];
      if (slug && !slug.startsWith('_next') && !slug.includes('.')) {
        return NextResponse.rewrite(new URL(`/coach/${slug}`, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
