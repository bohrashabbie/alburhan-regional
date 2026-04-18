import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';

// Only fonts actually referenced in globals.css are loaded. Dropping the
// unused Montserrat/Roboto/Open_Sans cuts ~300 KB of font CSS + WOFF2 traffic
// on the first paint.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'AL-BURHAN — Innovative Lighting Solutions',
  description:
    'Leading lighting solutions provider delivering innovative, design-forward lighting across the region.',
  icons: { icon: '/logo.jpeg' },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        style={{ direction: dir }}
      >
        {children}
      </body>
    </html>
  );
}
