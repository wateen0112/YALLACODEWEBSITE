import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cairo } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SiteLoadOverlay } from '@/components/ui/SiteLoadOverlay';
import { AOSProvider } from '@/components/ui/AOSProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FramerMotionProvider } from '@/components/ui/FramerMotionProvider';
import '../globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'YallaCode | Next-Gen Software',
  description: 'Full-stack software & AI solutions for visionary companies',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" href="/logo.png" as="image" type="image/png" fetchPriority="high" />
      </head>
      <body className="font-main main-font transition-colors duration-300 antialiased bg-background text-text-primary">
        <NextIntlClientProvider messages={messages}>
          <SiteLoadOverlay>
            <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
              <AOSProvider>
                <FramerMotionProvider>
                  <CustomCursor />
                  {children}
                </FramerMotionProvider>
              </AOSProvider>
            </ThemeProvider>
          </SiteLoadOverlay>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
