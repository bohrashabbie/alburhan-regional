'use client';

import * as React from 'react';
import { ArrowRight, Sparkles, Zap, Globe, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { NeonButton } from '@/components/fx/NeonButton';
import { GradientText } from '@/components/fx/GradientText';
import { TypewriterText } from '@/components/motion/TypewriterText';
import { CountUp } from '@/components/motion/CountUp';
import Hero3D from '@/components/hero/Hero3D';

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const rotating = isRTL
    ? ['يضيء', 'يلهم', 'يحوّل', 'يبهر']
    : ['Illuminate', 'Inspire', 'Transform', 'Astonish'];

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-16 md:py-24">
      {/* Ambient radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(194,50,74,0.18), transparent 55%),' +
            'radial-gradient(ellipse 60% 50% at 85% 75%, rgba(201,169,79,0.14), transparent 55%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Text column */}
        <div className="relative z-10 flex flex-col items-start justify-center lg:col-span-7 animate-[fade-in_0.6s_ease-out_both]">
          <div className="section-kicker mb-6">
            <Sparkles className="size-3.5" />
            <span>{t('common.companyName')}</span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[color:var(--fg-default)] sm:text-6xl md:text-7xl">
            <span className="block">
              <GradientText as="span">
                <TypewriterText words={rotating} />
              </GradientText>
            </span>
            <span className="mt-2 block">
              {isRTL ? 'رؤيتك بالضوء' : t('hero.title2')}
            </span>
            <span className="mt-2 block text-[color:var(--fg-muted)]">
              {t('hero.title3')}.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
            {t('hero.description')}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <NeonButton asChild size="lg">
              <Link href="/projects">
                <Zap className="size-5" />
                {isRTL ? 'استكشف مشاريعنا' : 'Explore our projects'}
                <ArrowRight className="size-5" />
              </Link>
            </NeonButton>
            <NeonButton asChild size="lg" variant="ghost">
              <Link href="/contact">
                <Globe className="size-5" />
                {isRTL ? 'تواصل معنا' : 'Start a project'}
              </Link>
            </NeonButton>
          </div>

          {/* Stats */}
          <div className="mt-14 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { to: 20, suffix: '+', label: isRTL ? 'سنوات خبرة' : 'Years of expertise' },
              { to: 4, suffix: '', label: isRTL ? 'دول' : 'Countries' },
              { to: 500, suffix: '+', label: isRTL ? 'مشروع' : 'Projects' },
              { to: 50, suffix: '+', label: isRTL ? 'شريك تجاري' : 'Global brands' },
            ].map((s, i) => (
              <div key={i} className="stat-pill group">
                <span className="block font-display text-3xl font-bold md:text-4xl">
                  <GradientText as="span">
                    <CountUp to={s.to} suffix={s.suffix} duration={1.8} />
                  </GradientText>
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--fg-subtle)] transition-colors duration-300 group-hover:text-[color:var(--fg-muted)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual column */}
        <div className="relative lg:col-span-5 animate-[fade-in_0.8s_ease-out_0.2s_both]">
          <div className="relative mx-auto aspect-square max-w-[520px]">
            {/* Orbital decorative rings behind the 3D */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute inset-[6%] rounded-full border border-[rgba(201,169,79,0.14)] animate-[spin_36s_linear_infinite]"
                style={{
                  background:
                    'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(201,169,79,0.25) 60deg, transparent 120deg, transparent 240deg, rgba(194,50,74,0.25) 300deg, transparent 360deg)',
                  WebkitMask:
                    'radial-gradient(circle, transparent 58%, black 59%, black 60%, transparent 61%)',
                  mask:
                    'radial-gradient(circle, transparent 58%, black 59%, black 60%, transparent 61%)',
                }}
              />
              <div className="absolute inset-[14%] rounded-full border border-dashed border-[rgba(201,169,79,0.15)] animate-[spin_48s_linear_infinite_reverse]" />
              <div className="absolute inset-[24%] rounded-full border border-[rgba(201,169,79,0.10)]" />

              {/* Corner gold dots on the outer ring */}
              {[
                { x: '50%', y: '6%' },
                { x: '94%', y: '50%' },
                { x: '50%', y: '94%' },
                { x: '6%', y: '50%' },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--brand-gold)]"
                  style={{
                    left: p.x,
                    top: p.y,
                    boxShadow: '0 0 12px rgba(201,169,79,0.7)',
                  }}
                />
              ))}
            </div>

            {/* Soft center glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl opacity-70"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(194,50,74,0.35), transparent 70%)',
              }}
            />

            <Hero3D className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* Scroll indicator — polished mouse + chevron */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex justify-center animate-[fade-in_0.6s_ease-out_1s_both]"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--fg-subtle)]">
            {isRTL ? 'مرر' : 'Scroll'}
          </span>
          <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-[color:var(--glass-border)] bg-white/[0.02]">
            <span className="mt-1.5 block h-2 w-px rounded-full bg-[color:var(--brand-gold)] animate-[bounce-soft_2.4s_ease-in-out_infinite]" />
          </span>
          <ChevronDown className="size-3 text-[color:var(--brand-gold)]/70 animate-[bounce-soft_2.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
