import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/lib/locales';
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TOKEN } from '@/lib/api-config';

const intlMiddleware = createMiddleware({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: DEFAULT_LOCALE
});

export default function(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isHiddenAdminRoute = /^\/[^/]+\/internal(?:\/.*)?$/.test(pathname);
  const isLoginRoute = /^\/[^/]+\/internal\/login\/?$/.test(pathname);

  if (isHiddenAdminRoute && !isLoginRoute) {
    const locale = pathname.split('/')[1] || DEFAULT_LOCALE;
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

    if (!token || token !== ADMIN_SESSION_TOKEN) {
      const url = new URL(`/${locale}/internal/login`, request.url);
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|_vercel|.*\\..*).*)']
};
