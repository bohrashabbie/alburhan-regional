'use client';

import * as React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { MagneticButton } from '@/components/fx/MagneticButton';

const Bracket: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: 'rgba(201,169,79,0.7)',
    borderStyle: 'solid',
    pointerEvents: 'none',
  };
  const style: React.CSSProperties = {
    ...base,
    ...(position === 'tl' && { top: 18, left: 18, borderWidth: '1.5px 0 0 1.5px' }),
    ...(position === 'tr' && { top: 18, right: 18, borderWidth: '1.5px 1.5px 0 0' }),
    ...(position === 'bl' && { bottom: 18, left: 18, borderWidth: '0 0 1.5px 1.5px' }),
    ...(position === 'br' && { bottom: 18, right: 18, borderWidth: '0 1.5px 1.5px 0' }),
  };
  return <span aria-hidden style={style} />;
};

export function CTASection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--glass-border)] glass-premium p-10 text-center md:p-16">
            {/* Rotating conic glow */}
            <div aria-hidden className="conic-glow opacity-50" />

            {/* Sweeping beam */}
            <div aria-hidden className="beam-sweep" />

            {/* Grid backdrop with radial mask */}
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

            {/* Corner brackets */}
            <Bracket position="tl" />
            <Bracket position="tr" />
            <Bracket position="bl" />
            <Bracket position="br" />

            <div className="relative z-10">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[rgba(20,19,30,0.55)] backdrop-blur px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
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

              {/* Micro trust row */}
              <div className="divider-neon mx-auto mt-10 max-w-md text-[10px] uppercase tracking-[0.3em]">
                {isRTL ? 'شراكة موثوقة' : 'Trusted partnership'}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-[color:var(--fg-subtle)]">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
                  {isRTL ? '٢٠+ سنة خبرة' : '20+ yrs experience'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
                  {isRTL ? 'تسليم عالمي' : 'Global delivery'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
                  {isRTL ? 'دعم ٢٤/٧' : '24/7 support'}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CTASection;
