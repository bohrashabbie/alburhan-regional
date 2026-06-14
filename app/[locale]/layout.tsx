import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { getSiteContent } from '@/lib/api';

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteContentProvider content={siteContent}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </SiteContentProvider>
    </NextIntlClientProvider>
  );
}
