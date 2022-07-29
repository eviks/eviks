import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/baku/apartment/sale';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
