'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useReveal } from '@/hooks/useReveal';
import { useTeam } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const FALLBACK_OWNER =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80';

/**
 * Founders, set as pull quotes.
 *
 * The quote is the largest thing in the block — it's the only place on the
 * homepage where the company speaks in the first person, so it gets the
 * serif and the room. Portraits are small, square and secondary.
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
                className="flex flex-col justify-between bg-canvas p-8 md:p-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(22px)',
                  transition: `opacity 0.9s var(--ease-out-expo) ${i * 130}ms, transform 0.9s var(--ease-out-expo) ${i * 130}ms`,
                }}
              >
                <blockquote className="t-accent text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] text-ink">
                  “{quote}”
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line">
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="48px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">{name}</span>
                    {role && <span className="t-mono mt-0.5 block text-[0.5625rem] text-accent">{role}</span>}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
