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
