'use client';

import React from 'react';
import { Languages, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', native: 'English', short: 'EN' },
  { code: 'ar', name: 'Arabic', native: 'العربية', short: 'AR' },
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  const change = (code: string) => {
    if (code === locale) return;
    router.push(pathname, { locale: code });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        data-cursor-label={current.short}
        className={cn(
          'group inline-flex items-center gap-1.5 rounded-full border border-[color:var(--glass-border)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--fg-default)]',
          'transition-colors duration-300 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-bright)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-gold)]',
        )}
      >
        <Languages className="size-3.5" />
        <span>{current.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'min-w-[180px] overflow-hidden rounded-xl p-1',
          'glass-surface-strong border border-[color:var(--glass-border-strong)]',
          'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]',
        )}
      >
        <AnimatePresence>
          {languages.map((lang, i) => {
            const active = lang.code === locale;
            return (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <DropdownMenuItem
                  onSelect={() => change(lang.code)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm outline-none',
                    active
                      ? 'bg-[rgba(194,50,74,0.18)] text-[color:var(--brand-gold-bright)]'
                      : 'text-[color:var(--fg-default)] hover:bg-white/[0.04] hover:text-[color:var(--brand-gold-bright)]',
                  )}
                >
                  <span className="flex flex-col">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {lang.name}
                    </span>
                  </span>
                  {active && <Check className="size-4" />}
                </DropdownMenuItem>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
