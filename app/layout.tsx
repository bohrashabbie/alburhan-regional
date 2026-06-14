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

// Audit (2026-05): Poppins is used only with `font-display` className, and
// always combined with font-semibold (600) or font-bold (700). Weights 400
// and 500 were loaded but never rendered (body uses Geist Sans for normal
// text, Header nav uses Geist Sans + font-medium). Dropping unused weights
// saves ~50 KB of WOFF2 traffic on every cold load.
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'AL-BURHAN — Innovative Lighting Solutions',
  description:
    'Leading lighting solutions provider delivering innovative, design-forward lighting across the region.',
  // Favicon is served from the file-based convention `app/icon.png`
  // (the AL-Burhan Group logo). No manual `icons` override needed — the
  // previous `/logo.jpeg` reference pointed at a file that doesn't exist.
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
      <head>
        <link rel="preconnect" href="https://alburhan-asset.s3.eu-north-1.amazonaws.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cloudfront.net" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        style={{ direction: dir }}
      >
        {children}
      </body>
    </html>
  );
}
