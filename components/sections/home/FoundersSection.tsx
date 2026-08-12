'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useReveal } from '@/hooks/useReveal';
import { useTeam } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const FALLBACK_OWNER =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80';

/**
 * Founders, set as pull quotes beside full-height portraits.
 *
 * The quote carries the serif because it's the only place on the homepage
 * where the company speaks in the first person, but the portrait gets real
 * estate on equal terms — it runs the whole height of the card and mirrors
 * on the second founder so the two quotes face each other.
 */
export function FoundersSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const team = useTeam();

  const { ref, visible } = useReveal(0.12);

  const founder =
    team.find(
      (m) =>
        /founder/i.test(m.designation_en || '') &&
        !/co[-\s]?founder/i.test(m.designation_en || ''),
    ) || team[0];
  const coFounder =
    team.find((m) => /co[-\s]?founder/i.test(m.designation_en || '')) ||
    team.find((m) => m !== founder);

  const owners = [founder, coFounder].filter(Boolean) as typeof team;
  if (!owners.length) return null;

  return (
    <section className="section border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <p className="kicker">{isRTL ? 'من المؤسسين' : 'From the founders'}</p>
        <h2 className="t-h1 mt-5 max-w-lg">{t('sections.fromOwner')}</h2>

        <div ref={ref} className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {owners.map((m, i) => {
            const name = (isRTL ? m.name_ar || m.name_en : m.name_en) || '';
            const role = isRTL ? m.designation_ar || m.designation_en : m.designation_en;
            const quote =
              (isRTL ? m.quote_ar || m.quote_en : m.quote_en) ||
              (isRTL
                ? 'الإضاءة ليست مجرد ضوء — إنها حكاية تُروى بصمت.'
                : 'Lighting is storytelling — told quietly, felt instantly.');
            const img = getImageUrl(m.image_url) || FALLBACK_OWNER;

            return (
              <figure
                key={m.id}
                className="group grid grid-cols-1 bg-canvas sm:grid-cols-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(22px)',
                  transition: `opacity 0.9s var(--ease-out-expo) ${i * 130}ms, transform 0.9s var(--ease-out-expo) ${i * 130}ms`,
                }}
              >
                {/* Portrait fills the full height of the card and mirrors to the
                    outer edge on the second founder, so the two quotes face
                    each other across the middle of the section. */}
                <div
                  className={cn(
                    'relative aspect-[4/5] overflow-hidden border-line sm:col-span-2 sm:aspect-auto sm:min-h-[26rem]',
                    i % 2 ? 'sm:order-last sm:border-s' : 'sm:border-e',
                  )}
                >
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 22vw"
                    loading="lazy"
                    className="object-cover grayscale transition-all duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>

                <div className="flex flex-col justify-between gap-8 p-8 sm:col-span-3 md:p-10">
                  <blockquote className="t-accent text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] text-ink">
                    “{quote}”
                  </blockquote>

                  <figcaption className="border-t border-line pt-6">
                    <p className="text-[1.0625rem] font-medium text-ink">{name}</p>
                    {role && (
                      <p className="t-mono mt-1 text-[0.625rem] text-accent">{role}</p>
                    )}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
