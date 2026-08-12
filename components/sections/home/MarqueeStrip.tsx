'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { CATALOG } from '@/lib/catalog/ms-lighting';

/**
 * A single hairline-bounded band that names every fixture family we make.
 * It exists to answer "what do you actually sell?" in the two seconds after
 * the hero, without asking anyone to click.
 *
 * The track is duplicated and translated -50%, so the loop is seamless with
 * one animation and no JS. It pauses on hover so a name can be read.
 */
export function MarqueeStrip() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const items = React.useMemo(() => CATALOG.map((f) => f.name), []);

  return (
    <section
      aria-label={isRTL ? 'عائلات المنتجات' : 'Product families'}
      className="group relative overflow-hidden border-b border-line bg-surface py-4"
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${isRTL ? 'marquee-rtl' : 'marquee'} 48s linear infinite`,
        }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((name) => (
              <li key={name} className="flex items-center whitespace-nowrap">
                <span className="px-6 text-[0.8125rem] font-medium text-ink-2">{name}</span>
                <span aria-hidden className="size-1 rounded-full bg-accent/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Edge fades — the band should dissolve, not get chopped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
      />
    </section>
  );
}

export default MarqueeStrip;
