import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, locale, defaultLocale } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(
      `${defaultLocale !== locale ? locale : ''}/baku/sale`,
    );
  }
  return NextResponse.next();
}
