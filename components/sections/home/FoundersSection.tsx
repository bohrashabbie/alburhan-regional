'use client';

import * as React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { GradientText } from '@/components/fx/GradientText';
import { useTeam } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const FALLBACK_OWNER =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80';

export function FoundersSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const team = useTeam();

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
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-14 text-center">
          <div className="flex justify-center">
            <p className="section-kicker">
              {isRTL ? 'صوت المؤسسين' : 'Voices behind the vision'}
            </p>
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            <GradientText>{t('sections.fromOwner')}</GradientText>
          </h2>
          <div aria-hidden className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent" />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {owners.map((m, i) => {
            const name = isRTL ? m.name_ar || m.name_en : m.name_en;
            const role = isRTL ? m.designation_ar || m.designation_en : m.designation_en;
            const quote = isRTL ? m.quote_ar || m.quote_en : m.quote_en;
            const img = getImageUrl(m.image_url) || FALLBACK_OWNER;

            return (
              <ScrollReveal key={m.id} delay={i * 0.12}>
                <SpotlightCard
                  className="group card-lift corner-brackets relative h-full overflow-hidden"
                  color={i === 0 ? 'rgba(201,169,79,0.3)' : 'rgba(194,50,74,0.3)'}
                >
                  <div className="grid h-full grid-cols-1 md:grid-cols-5">
                    {/* Portrait */}
                    <div
                      className={cn(
                        'relative aspect-square md:aspect-auto md:col-span-2',
                        i % 2 ? 'md:order-last' : '',
                      )}
                    >
                      <Image
                        src={img}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                        unoptimized
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background: i % 2
                            ? 'linear-gradient(270deg, rgba(7,7,11,0.1), rgba(7,7,11,0.85))'
                            : 'linear-gradient(90deg, rgba(7,7,11,0.1), rgba(7,7,11,0.85))',
                        }}
                      />
                    </div>

                    {/* Quote */}
                    <div className="flex flex-col justify-center gap-4 p-6 md:col-span-3 md:p-8">
                      <Quote className="size-7 text-[color:var(--brand-gold)]/70" />
                      <p className="font-display text-lg leading-relaxed text-[color:var(--fg-default)] md:text-xl">
                        {quote ||
                          (isRTL
                            ? 'الإضاءة ليست مجرد ضوء — إنها حكاية تروى بصمت.'
                            : '“Lighting is storytelling — told quietly, felt instantly.”')}
                      </p>
                      <div className="mt-2 flex items-center gap-3 border-t border-[color:var(--glass-border)] pt-4">
                        <div>
                          <p className="font-display text-lg font-semibold">{name}</p>
                          {role && (
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                              {role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
