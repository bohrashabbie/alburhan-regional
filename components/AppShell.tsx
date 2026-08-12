'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import Header from './Header';
import Footer from './Footer';
import { BackToTop } from './chrome/BackToTop';
import { ScrollProgress } from './chrome/ScrollProgress';
import { Curtain } from './chrome/Curtain';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Sits outside #ct-stage so it doesn't inherit the settle transform. */}
      <Curtain />

      {/* Everything the curtain reveals. The 3% overscale → 1 settle is applied
          to this element by the .ct-active / .ct-lifting classes on <html>. */}
      <div
        id="ct-stage"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative flex min-h-screen flex-col bg-canvas text-ink"
      >
        <ScrollProgress />

        <Header />

        <main className="relative z-[1] flex flex-1 flex-col">{children}</main>

        <Footer />

        <BackToTop />
      </div>

      {/* Film grain over the whole composition — fixed, so it never scrolls
          with the content and never lands on a scaled layer. */}
      <div className="grain" aria-hidden />
    </>
  );
};

export default AppShell;
