'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { useServices } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';

const FALLBACK =
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80';

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const services = useServices();

  const pick = (en?: string | null, ar?: string | null) =>
    (isRTL ? ar || en : en || ar) || '';

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'ماذا نقدم' : 'What we offer'}
        title={t('header.services')}
        description={
          isRTL
            ? 'من التصميم إلى التنفيذ — خدمات إضاءة متكاملة تحت سقف واحد.'
            : 'End-to-end lighting — from concept and design to on-site commissioning.'
        }
      />

      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.length === 0 && (
            <GlassCard className="p-16 text-center text-[color:var(--fg-muted)]">
              {isRTL ? 'لا توجد خدمات حالياً.' : 'No services published yet.'}
            </GlassCard>
          )}

          <div className="grid gap-6 md:gap-8">
            {services.map((svc, i) => {
              const title = pick(svc.title_en, svc.title_ar);
              const desc = pick(svc.description_en, svc.description_ar);
              const img = getImageUrl(svc.image_url) || FALLBACK;
              const reverse = i % 2 === 1;

              return (
                <ScrollReveal key={svc.id} delay={0.05 * i}>
                  <SpotlightCard className="grid gap-0 overflow-hidden md:grid-cols-5">
                    <div
                      className={`relative aspect-[4/3] md:aspect-auto md:col-span-2 ${reverse ? 'md:order-last' : ''}`}
                    >
                      <Image
                        src={img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="size-full object-cover"
                        unoptimized
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background: reverse
                            ? 'linear-gradient(270deg, rgba(7,7,11,0.1), rgba(7,7,11,0.6))'
                            : 'linear-gradient(90deg, rgba(7,7,11,0.1), rgba(7,7,11,0.6))',
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-10">
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                        <GradientText>{title}</GradientText>
                      </h3>
                      {desc && (
                        <p className="mt-3 text-sm leading-relaxed text-[color:var(--fg-muted)] md:text-base">
                          {desc}
                        </p>
                      )}
                      {svc.items && svc.items.length > 0 && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {svc.items.map((it) => (
                            <li key={it.id} className="flex items-start gap-2 text-sm text-[color:var(--fg-default)]/90">
                              <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                              <span>{pick(it.text_en, it.text_ar)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-7">
                        <NeonButton asChild size="sm" variant="outline">
                          <Link href="/contact" data-cursor-label="Discuss">
                            {isRTL ? 'ناقش مشروعك' : 'Discuss this service'}
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </NeonButton>
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
