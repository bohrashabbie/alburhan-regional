'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronDown } from 'lucide-react';

const STATS = [
  { to: 20, suffix: '+', labelEn: 'Years Experience', labelAr: 'سنة خبرة' },
  { to: 4,  suffix: '',  labelEn: 'Countries',        labelAr: 'دول' },
  { to: 500,suffix: '+', labelEn: 'Projects',         labelAr: 'مشروع' },
  { to: 50, suffix: '+', labelEn: 'Global Brands',    labelAr: 'علامة عالمية' },
];

function useWordReveal(count: number) {
  const [revealed, setRevealed] = React.useState<boolean[]>(() => Array(count).fill(false));
  React.useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      const t = setTimeout(
        () => { if (!cancelled) setRevealed((p) => p.map((v, j) => j === i ? true : v)); },
        300 + i * 90,
      );
      timers.push(t);
    }
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps
  return revealed;
}

function StatCounter({ to, suffix }: { to: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      obs.disconnect();
      const dur = 1600;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * to) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0' + suffix;
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, suffix]);
  return <span ref={ref} suppressHydrationWarning>{to}{suffix}</span>;
}

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  /* Words for the headline */
  const headline = isRTL
    ? ['يضيء', 'رؤيتك', 'بما', 'هو', 'أبعد', 'من', 'الضوء']
    : ['Illuminating', 'Your', 'Vision', 'Beyond', 'Light'];

  /* Words that get the gold accent colour */
  const goldenEn = new Set(['Beyond', 'Light']);
  const goldenArIdx = new Set([5, 6]);

  const revealed = useWordReveal(headline.length);
  const allIn = revealed[headline.length - 1];

  return (
    <section
      className="luxury-section relative min-h-[100svh] overflow-hidden bg-[#080808]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── Beam behind the headline ── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div
          className="animate-beam w-px"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, #D4A843 40%, #D4A843 60%, transparent 100%)', opacity: 0.15 }}
        />
        <div
          className="animate-cone absolute top-0 h-[55vh] w-[340px]"
          style={{ background: 'conic-gradient(from 270deg at 50% 0%, transparent 85deg, rgba(212,168,67,0.07) 90deg, transparent 95deg)' }}
        />
      </div>

      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 35% at 50% 28%, rgba(212,168,67,0.05), transparent 70%)' }}
      />

      {/* ── Main flex column ── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">

        {/* Centre block — grows to fill, centres content */}
        <div className="flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-8 text-center">

          {/* Eyebrow */}
          <p
            className="mb-7 font-mono text-[11px] uppercase tracking-[0.32em] text-[#D4A843]"
            style={{ opacity: revealed[0] ? 1 : 0, transition: 'opacity 0.7s ease 0.1s' }}
          >
            {t('common.companyName')}
          </p>

          {/* Headline — inline spans with natural word spacing */}
          <h1
            className="max-w-3xl font-display leading-[1.08] tracking-[-0.025em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.5rem)', fontWeight: 300 }}
            aria-label={headline.join(' ')}
          >
            {headline.map((word, i) => (
              <React.Fragment key={i}>
                {i > 0 && ' '}
                <span
                  className="inline-block transition-all duration-700"
                  style={{
                    opacity: revealed[i] ? 1 : 0,
                    transform: revealed[i] ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: `${i * 80}ms`,
                    color: (!isRTL && goldenEn.has(word)) || (isRTL && goldenArIdx.has(i)) ? '#D4A843' : undefined,
                  }}
                >
                  {word}
                </span>
              </React.Fragment>
            ))}
          </h1>

          {/* Description */}
          <p
            className="mt-7 max-w-lg text-[15px] font-light leading-relaxed text-[#444]"
            style={{ opacity: allIn ? 1 : 0, transform: allIn ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.8s ease, transform 0.8s ease', transitionDelay: '200ms' }}
          >
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
            style={{ opacity: allIn ? 1 : 0, transition: 'opacity 0.8s ease', transitionDelay: '360ms' }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#D4A843] px-7 py-3.5 text-[11px] font-normal uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#C49730]"
            >
              {isRTL ? 'استكشف مشاريعنا' : 'Explore Projects'}
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#2A2A2A] px-7 py-3.5 text-[11px] font-normal uppercase tracking-[0.18em] text-[#555] transition-all duration-300 hover:border-[#D4A843] hover:text-white"
            >
              {isRTL ? 'تواصل معنا' : 'Get In Touch'}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="flex justify-center py-3 transition-all duration-700"
          style={{ opacity: allIn ? 1 : 0, transitionDelay: '600ms' }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2A2A2A]">
              {isRTL ? 'مرر' : 'Scroll'}
            </span>
            <ChevronDown className="animate-scroll-pulse size-3.5 text-[#D4A843]" />
          </div>
        </div>

        {/* Stats strip pinned to bottom */}
        <div
          className="w-full border-t border-[#1A1A1A] transition-all duration-700"
          style={{ opacity: allIn ? 1 : 0, transitionDelay: '500ms' }}
        >
          <div className="grid grid-cols-2 divide-x divide-[#1A1A1A] sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center px-4 py-5 text-center">
                <span
                  className="font-display leading-none text-white"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 300 }}
                >
                  <StatCounter to={s.to} suffix={s.suffix} />
                </span>
                <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#333]">
                  {isRTL ? s.labelAr : s.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
