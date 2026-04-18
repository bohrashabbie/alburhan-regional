'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { NeonButton } from '@/components/fx/NeonButton';
import { GradientText } from '@/components/fx/GradientText';
import { TypewriterText } from '@/components/motion/TypewriterText';
import { CountUp } from '@/components/motion/CountUp';
import { MagneticButton } from '@/components/fx/MagneticButton';
import Hero3D from '@/components/hero/Hero3D';

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const rotating = isRTL
    ? ['يضيء', 'يلهم', 'يحوّل', 'يبهر']
    : ['Illuminate', 'Inspire', 'Transform', 'Astonish'];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-16 md:py-24"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8"
      >
        {/* Text column */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex flex-col items-start justify-center lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]"
          >
            <Sparkles className="size-3.5" />
            <span>{t('common.companyName')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[color:var(--fg-default)] sm:text-6xl md:text-7xl"
          >
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <NeonButton asChild size="lg">
                <Link href="/projects" data-cursor-label="Explore">
                  <Zap className="size-5" />
                  {isRTL ? 'استكشف مشاريعنا' : 'Explore our projects'}
                  <ArrowRight className="size-5" />
                </Link>
              </NeonButton>
            </MagneticButton>
            <MagneticButton>
              <NeonButton asChild size="lg" variant="ghost">
                <Link href="/contact" data-cursor-label="Contact">
                  <Globe className="size-5" />
                  {isRTL ? 'تواصل معنا' : 'Start a project'}
                </Link>
              </NeonButton>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="mt-14 grid w-full grid-cols-2 gap-6 border-t border-[color:var(--glass-border)] pt-8 sm:grid-cols-4"
          >
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
          </motion.div>
        </motion.div>

        {/* 3D column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square max-w-[520px]">
            <Hero3D className="absolute inset-0" />
            {/* Bottom label ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-4 mx-auto h-10 w-3/4 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(194,50,74,0.45), transparent 70%)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex justify-center"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--fg-subtle)]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-8 w-px bg-gradient-to-b from-[color:var(--brand-gold)] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
