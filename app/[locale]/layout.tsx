import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import MUIThemeProvider from "../../components/MUIThemeProvider";
import App from "../../components/App";
import { SiteContentProvider } from '../../context/SiteContentContext';
import { getSiteContent } from '../../lib/api';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch site content from CMS
  const siteContent = await getSiteContent();

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteContentProvider content={siteContent}>
        <MUIThemeProvider locale={locale}>
          <App>
            {children}
          </App>
        </MUIThemeProvider>
      </SiteContentProvider>
    </NextIntlClientProvider>
  );
}

