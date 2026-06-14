'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useReveal } from '@/hooks/useReveal';
import { useTeam } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const FALLBACK_OWNER =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80';

export function FoundersSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const team = useTeam();

  const { ref: headRef, visible: headVisible } = useReveal(0.3);
  const { ref: cardsRef, visible: cardsVisible } = useReveal(0.1);

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
    <section
      className="luxury-section relative bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headRef}
          className="mb-14 text-center"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
            {isRTL ? 'صوت المؤسسين' : 'Voices behind the vision'}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            {t('sections.fromOwner')}
          </h2>
          <div aria-hidden className="mx-auto mt-6 h-px w-16 bg-[#D4A843]/30" />
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid gap-5 md:grid-cols-2"
        >
          {owners.map((m, i) => {
            const name = isRTL ? m.name_ar || m.name_en : m.name_en;
            const role = isRTL ? m.designation_ar || m.designation_en : m.designation_en;
            const quote = isRTL ? m.quote_ar || m.quote_en : m.quote_en;
            const img = getImageUrl(m.image_url) || FALLBACK_OWNER;

            return (
              <div
                key={m.id}
                className="group relative overflow-hidden border border-[#1A1A1A] bg-[#0C0C0C] transition-all duration-500 hover:border-[#D4A843]/30"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, border-color 0.5s`,
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  {/* Portrait */}
                  <div
                    className={`relative aspect-square sm:aspect-auto sm:col-span-2 ${i % 2 ? 'sm:order-last' : ''}`}
                  >
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {/* Side fade */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: i % 2
                          ? 'linear-gradient(270deg, rgba(12,12,12,0.05), rgba(12,12,12,0.9))'
                          : 'linear-gradient(90deg, rgba(12,12,12,0.05), rgba(12,12,12,0.9))',
                      }}
                    />
                  </div>

                  {/* Quote */}
                  <div className="relative flex flex-col justify-center gap-4 p-7 sm:col-span-3 sm:p-9">
                    {/* Decorative large serif " */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-2 left-5 select-none font-serif text-[7rem] leading-none text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#D4A843]/10"
                    >
                      &ldquo;
                    </span>

                    <p
                      className="relative z-10 font-light leading-relaxed text-[#777] transition-colors duration-700"
                      style={{
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                        color: cardsVisible ? undefined : '#555',
                      }}
                    >
                      {quote ||
                        (isRTL
                          ? 'الإضاءة ليست مجرد ضوء — إنها حكاية تروى بصمت.'
                          : 'Lighting is storytelling — told quietly, felt instantly.')}
                    </p>

                    <div className="relative z-10 mt-2 border-t border-[#1A1A1A] pt-4">
                      <p className="text-[14px] font-light text-white">
                        {name}
                      </p>
                      {role && (
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4A843]">
                          {role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
