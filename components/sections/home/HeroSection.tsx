'use client';

import * as React from 'react';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Text column */}
        <div className="relative z-10 flex flex-col items-start justify-center lg:col-span-7 animate-[fade-in_0.6s_ease-out_both]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
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
          <div className="mt-14 grid w-full grid-cols-2 gap-6 border-t border-[color:var(--glass-border)] pt-8 sm:grid-cols-4">
            {[
              { to: 20, suffix: '+', label: isRTL ? 'سنوات خبرة' : 'Years of expertise' },
              { to: 4, suffix: '', label: isRTL ? 'دول' : 'Countries' },
              { to: 500, suffix: '+', label: isRTL ? 'مشروع' : 'Projects' },
              { to: 50, suffix: '+', label: isRTL ? 'شريك تجاري' : 'Global brands' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl font-bold md:text-4xl">
                  <GradientText as="span">
                    <CountUp to={s.to} suffix={s.suffix} duration={1.8} />
                  </GradientText>
                </span>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual column */}
        <div className="relative lg:col-span-5 animate-[fade-in_0.8s_ease-out_0.2s_both]">
          <div className="relative mx-auto aspect-square max-w-[520px]">
            <Hero3D className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex justify-center animate-[fade-in_0.6s_ease-out_1s_both]"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--fg-subtle)]">
            Scroll
          </span>
          <span className="block h-8 w-px bg-gradient-to-b from-[color:var(--brand-gold)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
