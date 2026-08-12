'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useReveal } from '@/hooks/useReveal';
import { useBrands } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

/**
 * The brand wall.
 *
 * A hairline grid of logo cells rather than a scrolling marquee — partners
 * are a credibility claim, and a claim that slides past unreadably isn't one.
 * Logos sit in neutral grey and resolve to full colour on hover, which keeps
 * fifty different brand palettes from fighting the page.
 */
export function BrandsSection() {
  const brands = useBrands();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  const { ref, visible } = useReveal(0.1);

  const valid = React.useMemo(
    () =>
      (brands || [])
        .filter((b) => b.is_active !== false)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((b) => ({ ...b, img: getImageUrl(b.logo_url) }))
        .filter((b): b is typeof b & { img: string } => Boolean(b.img)),
    [brands],
  );

  if (!valid.length) return null;

  return (
    <section className="section border-b border-line bg-surface" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <div className="mx-auto max-w-xl text-center">
          <p className="kicker justify-center">{t('sections.europeanBrands')}</p>
          <h2 className="t-h2 mt-5">{t('sections.ourBrand')}</h2>
          <p className="t-lead mt-4">
            {isRTL
              ? 'إلى جانب إنتاجنا الخاص، نمثّل ونورّد علامات إضاءة أوروبية مختارة للمشاريع التي تطلبها بالاسم.'
              : 'Alongside our own production, we represent and supply selected European lighting houses for projects that specify them by name.'}
          </p>
        </div>

        {/* Logo grid — 1px gaps on the line colour give the ruled sheet look */}
        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
        >
          {valid.map((b, i) => {
            const Cell: React.ElementType = b.website_url ? 'a' : 'div';
            const linkProps = b.website_url
              ? { href: b.website_url, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Cell
                key={b.id}
                {...linkProps}
                title={b.name}
                aria-label={b.name}
                className="group flex h-24 items-center justify-center bg-canvas p-4 sm:h-28 sm:p-6 transition-colors duration-500 hover:bg-surface"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(14px)',
                  transition: `opacity 0.7s var(--ease-out-expo) ${Math.min(i, 12) * 45}ms, transform 0.7s var(--ease-out-expo) ${Math.min(i, 12) * 45}ms, background-color 0.5s`,
                }}
              >
                {/* Monochrome at rest so fifty brand palettes don't fight the
                    page; on dark, logos are knocked out to white because most
                    partner marks are dark-on-transparent and would vanish. */}
                <Image
                  src={b.img}
                  alt={b.name}
                  width={132}
                  height={48}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-70 dark:brightness-0 dark:invert dark:group-hover:opacity-100 dark:group-hover:brightness-100 dark:group-hover:invert-0"
                />
              </Cell>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {[
            isRTL ? 'مصادر أصلية' : 'Authentic sourcing',
            isRTL ? 'ضمان المصنّع' : 'Manufacturer warranty',
            isRTL ? 'دعم ما بعد البيع' : 'After-sales support',
          ].map((item) => (
            <span key={item} className="t-mono flex items-center gap-2 text-[0.625rem] text-ink-4">
              <span className="size-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
