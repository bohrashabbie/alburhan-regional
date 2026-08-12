import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Three faces, three jobs:
//   Geist Sans   — everything structural (headlines, body, nav)
//   Geist Mono   — technical captions, counters, model codes
//   Instrument Serif italic — a single emphasised word per headline
// Poppins was dropped: it only ever rendered at 600/700 behind `font-display`,
// which now resolves to Geist Sans, so nothing loses its typeface.
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

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Al-Burhan Regional — Lighting, engineered for the region',
    template: '%s | Al-Burhan Regional',
  },
  description:
    'Al-Burhan Regional supplies, engineers and installs architectural lighting across Kuwait, the UAE, China and Egypt — backed by MS Lighting, the group’s own factory in Jiangmen, Guangdong.',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
};

/**
 * Runs before first paint.
 *  1. Resolves the stored/system theme and stamps `class="dark"` so there is
 *     no white flash before next-themes hydrates.
 *  2. Decides whether the intro curtain plays. It plays once per tab session;
 *     on every later navigation `data-intro="off"` keeps it out of the render
 *     entirely, and `ct-active` pre-scales the stage only when it will play.
 */
const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem('theme')||'system';
var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
d.classList.toggle('dark',dark);
d.style.colorScheme=dark?'dark':'light';
var quiet=matchMedia('(prefers-reduced-motion: reduce)').matches;
var skip=quiet||sessionStorage.getItem('ab_intro');
if(skip){d.setAttribute('data-intro','off');}else{d.classList.add('ct-active');}
d.style.setProperty('--enter-delay',skip?'0ms':'1900ms');
}catch(e){}})();`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* Without JS the curtain would never lift, so remove it outright and
            land every scroll-reveal in its resting state. */}
        <noscript>
          <style>{`#curtain{display:none!important}
.reveal,.reveal-left,.reveal-plate{opacity:1!important;transform:none!important;clip-path:none!important}
.reveal-line>*{transform:none!important}`}</style>
        </noscript>
        <link
          rel="preconnect"
          href="https://alburhan-asset.s3.eu-north-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
        style={{ direction: dir }}
      >
        {children}
      </body>
    </html>
  );
}
