import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SiteLoadOverlay } from '@/components/ui/SiteLoadOverlay';
import { AOSProvider } from '@/components/ui/AOSProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import '../globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

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
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Kufam:ital,wght@0,400..900;1,400..900&family=Noto+Kufi+Arabic:wght@100..900&family=Reem+Kufi:wght@400..700&family=Revalia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-main main-font transition-colors duration-300 antialiased bg-background text-text-primary">
        <NextIntlClientProvider messages={messages}>
          <SiteLoadOverlay>
            <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
              <AOSProvider>
                <CustomCursor />
                {children}
              </AOSProvider>
            </ThemeProvider>
          </SiteLoadOverlay>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
