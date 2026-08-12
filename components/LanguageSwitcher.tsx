'use client';

import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'ع', name: 'العربية' },
] as const;

/**
 * Segmented EN / ع control. A two-option dropdown was always one click too
 * many — both states fit in the same footprint, so show both.
 */
const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const change = (code: string) => {
    if (code === locale) return;
    router.push(pathname, { locale: code });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex h-8 items-center rounded-full border border-line bg-surface p-0.5"
      style={{ direction: 'ltr' }}
    >
      {LANGUAGES.map((lang) => {
        const active = lang.code === locale;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => change(lang.code)}
            aria-pressed={active}
            aria-label={lang.name}
            className={cn(
              'inline-flex h-7 min-w-8 items-center justify-center rounded-full px-2 text-[0.6875rem] font-medium transition-colors duration-300',
              active
                ? 'bg-canvas text-accent shadow-[var(--shadow-1)]'
                : 'text-ink-4 hover:text-ink-2',
            )}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
