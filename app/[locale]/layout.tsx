import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { getImageUrl, getSiteContent } from '@/lib/api';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ISR: render every page under /[locale] as static HTML and regenerate at
// most once per hour. The CMS already triggers /api/revalidate on content
// changes, so a 1 h fallback TTL is safe. This turns dynamic Node renders
// into pre-built files that nginx can cache at the edge.
export const revalidate = 3600;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const siteContent = await getSiteContent();

  // LCP preload: the BannerCarousel's first image is the Largest Contentful
  // Paint element on the home page. Without a preload, the browser only
  // discovers it after parsing/executing the carousel chunk. Emitting a
  // <link rel="preload"> in <head> lets the browser fetch it in parallel
  // with the HTML parse, lopping 200-400 ms off LCP on slow networks.
  const firstBanner = (siteContent?.banners || [])
    .filter((b) => b.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))[0];
  const lcpImageUrl = firstBanner ? getImageUrl(firstBanner.image_url) : null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteContentProvider content={siteContent}>
        <ThemeProvider>
          {lcpImageUrl && (
            <link
              rel="preload"
              as="image"
              href={lcpImageUrl}
              fetchPriority="high"
            />
          )}
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </SiteContentProvider>
    </NextIntlClientProvider>
  );
}
