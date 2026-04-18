'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import Header from './Header';
import Footer from './Footer';
import { BackToTop } from './chrome/BackToTop';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Top-level client shell for every locale page.
 * Hosts the dark glass backdrop, header, main, footer, and
 * all floating chrome widgets (cursor, scroll progress, back-to-top, cmd-k).
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative flex min-h-screen flex-col bg-[color:var(--bg-base)] text-[color:var(--fg-default)]"
    >
      <Header />

      <main className="relative z-[1] flex flex-1 flex-col">
        {children}
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
};

export default AppShell;
