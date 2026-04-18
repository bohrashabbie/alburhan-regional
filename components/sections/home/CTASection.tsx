'use client';

import * as React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { MagneticButton } from '@/components/fx/MagneticButton';

export function CTASection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--glass-border)] glass-surface-strong p-10 text-center md:p-16">
            <div
              aria-hidden
              className="absolute -inset-32 -z-10 opacity-80"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(194,50,74,0.35), transparent 65%), radial-gradient(closest-side, rgba(201,169,79,0.25), transparent 55%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 bg-grid-soft"
              style={{
                maskImage:
                  'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              }}
            />

            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              <Sparkles className="size-3.5" />
              <span>{isRTL ? 'هيا نبدأ' : "Let's build"}</span>
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">
              {isRTL ? (
                <>
                  نصمم ونضيء <GradientText>رؤيتك</GradientText> القادمة.
                </>
              ) : (
                <>
                  Design, build, and <GradientText>illuminate</GradientText> your next landmark.
                </>
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-[color:var(--fg-muted)] md:text-base">
              {isRTL
                ? 'فريقنا يرافقك من الفكرة إلى التسليم. شراكة واحدة — نتيجة استثنائية.'
                : 'From concept to commissioning — one partnership, one extraordinary result.'}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton>
                <NeonButton asChild size="lg">
                  <Link href="/contact" data-cursor-label="Start">
                    {t('header.contact')}
                    <ArrowUpRight className="size-5" />
                  </Link>
                </NeonButton>
              </MagneticButton>
              <MagneticButton>
                <NeonButton asChild size="lg" variant="ghost">
                  <Link href="/projects" data-cursor-label="Projects">
                    {isRTL ? 'معرض المشاريع' : 'Explore portfolio'}
                  </Link>
                </NeonButton>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CTASection;
