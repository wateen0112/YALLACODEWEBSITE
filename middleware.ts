import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from '@/lib/locales';

const middleware = createMiddleware({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: DEFAULT_LOCALE
});

export default function(request: NextRequest) {
  return middleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|_vercel|.*\\..*).*)']
};
