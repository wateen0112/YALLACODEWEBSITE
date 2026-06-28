import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/lib/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/projects', '/create-project'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const route of routes) {
      const path = locale === DEFAULT_LOCALE ? route : `/${locale}${route}`;
      entries.push({
        url: `${SITE_CONFIG.url}${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            SUPPORTED_LOCALES.map((loc) => [
              loc,
              `${SITE_CONFIG.url}${loc === DEFAULT_LOCALE ? route : `/${loc}${route}`}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
