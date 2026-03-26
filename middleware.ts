import { NextResponse, type NextRequest } from 'next/server';

const OWNER_COOKIE_NAME = 'owner_auth';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === '/owner' || pathname.startsWith('/owner/')) {
    if (pathname.startsWith('/owner/login')) {
      return NextResponse.next();
    }

    const cookie = req.cookies.get(OWNER_COOKIE_NAME)?.value;
    if (cookie !== '1') {
      const url = req.nextUrl.clone();
      url.pathname = '/owner/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/owner/:path*'],
};
