import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cairo } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SiteLoadOverlay } from '@/components/ui/SiteLoadOverlay';
import { AOSProvider } from '@/components/ui/AOSProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FramerMotionProvider } from '@/components/ui/FramerMotionProvider';
import { SITE_CONFIG } from '@/lib/site-config';
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
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
      'fr': '/fr',
      'de': '/de',
      'es': '/es',
      'it': '/it',
      'pt': '/pt',
      'ru': '/ru',
      'tr': '/tr',
      'nl': '/nl',
      'sv': '/sv',
      'da': '/da',
      'no': '/no',
      'fi': '/fi',
      'pl': '/pl',
      'cs': '/cs',
      'ro': '/ro',
      'uk': '/uk',
      'el': '/el',
      'ja': '/ja',
      'ko': '/ko',
      'zh': '/zh',
      'hi': '/hi',
      'id': '/id',
      'ms': '/ms',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yallacode',
    creator: '@yallacode',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.url}/logo.png`,
          width: 730,
          height: 194,
        },
        description: SITE_CONFIG.description,
        email: SITE_CONFIG.email,
        location: SITE_CONFIG.location,
        sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SITE_CONFIG.email,
          availableLanguage: ['English', 'Arabic'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          '@id': `${SITE_CONFIG.url}/#organization`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: `${SITE_CONFIG.name} Software Development Services`,
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'AggregateOffer',
          offeredBy: {
            '@id': `${SITE_CONFIG.url}/#organization`,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '50',
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={cairo.variable}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" href="/logo.png" as="image" type="image/png" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
