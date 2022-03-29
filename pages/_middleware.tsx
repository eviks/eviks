import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, locale, defaultLocale } = req.nextUrl;
  const localeString = defaultLocale !== locale ? `/${locale}` : '';

  if (pathname === '/') {
    return NextResponse.redirect(`${localeString}/baku/sale`);
  }
  return NextResponse.next();
}
