'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { NeonButton } from '@/components/fx/NeonButton';
import { useServices } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const SERVICE_FALLBACK =
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80';

export function ServicesSection() {
  const services = useServices();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const displayed = services.slice(0, 4);

  if (!displayed.length) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal>
            <p className="section-kicker">
              {isRTL ? 'خدماتنا' : 'What we offer'}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              <GradientText>
                {isRTL ? 'خدمات الإضاءة المتكاملة' : 'End-to-end lighting services'}
              </GradientText>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[color:var(--fg-muted)]">
              {isRTL
                ? 'استشارات، تصميم، توريد وتركيب — تحت سقف واحد.'
                : 'Consulting, design, supply and installation — all under one roof.'}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <NeonButton asChild variant="ghost" size="md">
              <Link href="/services" data-cursor-label="Services">
                {isRTL ? 'عرض الكل' : 'View all'}
                <ArrowUpRight className="size-4" />
              </Link>
            </NeonButton>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {displayed.map((svc, i) => {
            const title = isRTL ? svc.title_ar || svc.title_en : svc.title_en;
            const desc = isRTL ? svc.description_ar || svc.description_en : svc.description_en;
            const img = getImageUrl(svc.image_url) || SERVICE_FALLBACK;
            return (
              <ScrollReveal key={svc.id} delay={i * 0.08}>
                <SpotlightCard className="group card-lift h-full overflow-hidden p-0">
                  <div className="relative aspect-[4/5] w-full overflow-hidden corner-brackets shine-hover">
                    <Image
                      src={img}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                      unoptimized
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,7,11,0.1) 0%, rgba(7,7,11,0.65) 55%, rgba(7,7,11,0.95) 100%)',
                      }}
                    />
                    <div className="absolute inset-x-5 bottom-5 z-10">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                            0{i + 1}
                          </p>
                          <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
                            {title}
                          </h3>
                          {desc && (
                            <p className="mt-1.5 line-clamp-2 text-xs text-white/70">
                              {desc}
                            </p>
                          )}
                        </div>
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/60 text-[color:var(--brand-gold)] transition-all group-hover:rotate-45 group-hover:bg-[rgba(194,50,74,0.35)] group-hover:text-white">
                          <ArrowUpRight className="size-4" />
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

export default ServicesSection;
