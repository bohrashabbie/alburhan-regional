'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import Header from './Header';
import Footer from './Footer';
import { BackToTop } from './chrome/BackToTop';
import { ScrollProgress } from './chrome/ScrollProgress';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative flex min-h-screen flex-col bg-[#080808] text-white"
    >
      {/* 2 px gold progress bar — fixed at the very top */}
      <ScrollProgress />

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
