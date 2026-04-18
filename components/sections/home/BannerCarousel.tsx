'use client';

import * as React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useBanners, useCountries } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/fx/GradientText';

const AUTOPLAY_MS = 2000;

/**
 * Home page banner carousel — driven from the CMS `banners` table.
 * Shows every active banner (country-tagged slides link to their country page),
 * with play/pause, dot pagination, and keyboard arrow navigation.
 */
export function BannerCarousel() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const bannersRaw = useBanners();
  const countries = useCountries();

  const slides = React.useMemo(
    () =>
      (bannersRaw || [])
        .filter((b) => b.is_active !== false)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((b) => {
          const country = countries.find((c) => c.id === b.country_id);
          const countryName = country
            ? (isRTL ? country.name_ar || country.name_en : country.name_en) ||
              ''
            : '';
          const countrySlug = country?.slug || '';
          return {
            id: b.id,
            title: (isRTL ? b.name_ar || b.name_en : b.name_en) || countryName,
            description:
              (isRTL
                ? b.description_ar || b.description_en
                : b.description_en) || '',
            country: countryName,
            countrySlug,
            image: getImageUrl(b.image_url),
          };
        })
        .filter((b): b is typeof b & { image: string } => Boolean(b.image)),
    [bannersRaw, countries, isRTL],
  );

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = slides.length;

  const go = React.useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  // autoplay
  React.useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count, go, index]);

  // keyboard
  React.useEffect(() => {
    if (count === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(isRTL ? -1 : 1);
      if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, isRTL, count]);

  if (count === 0) return null;

  const active = slides[index];

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--bg-elevated)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:aspect-[21/9]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* slides */}
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={active.title || 'Banner'}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* gradients */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,6,14,0.25) 0%, rgba(10,6,14,0.6) 70%, rgba(10,6,14,0.95) 100%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 20% 80%, rgba(194,50,74,0.28), transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(201,169,79,0.18), transparent 50%)',
            }}
          />

          {/* text overlay */}
          {(active.title || active.description || active.country) && (
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${active.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="max-w-2xl"
                >
                  {active.country && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-black/40 px-3 py-1 backdrop-blur-md">
                      <MapPin className="size-3 text-[color:var(--brand-gold)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                        {active.country}
                      </span>
                    </div>
                  )}
                  {active.title && (
                    <h3 className="font-display text-3xl font-bold leading-[1.1] text-white md:text-5xl">
                      <GradientText>{active.title}</GradientText>
                    </h3>
                  )}
                  {active.description && (
                    <p className="mt-3 max-w-xl text-sm text-white/80 md:mt-4 md:text-base">
                      {active.description}
                    </p>
                  )}
                  {active.countrySlug && (
                    <Link
                      href={`/${active.countrySlug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-[color:var(--brand-gold)] hover:bg-white/10"
                    >
                      {isRTL ? 'استكشف' : 'Explore'}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* gold hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-70"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,169,79,0.8), transparent)',
            }}
          />

          {/* arrows */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(isRTL ? 1 : -1)}
                aria-label="Previous"
                className={cn(
                  'absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md transition-all',
                  'border-[color:var(--glass-border)] bg-black/30 text-white hover:border-[color:var(--brand-gold)] hover:bg-black/50',
                  'left-3 md:left-6',
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(isRTL ? -1 : 1)}
                aria-label="Next"
                className={cn(
                  'absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md transition-all',
                  'border-[color:var(--glass-border)] bg-black/30 text-white hover:border-[color:var(--brand-gold)] hover:bg-black/50',
                  'right-3 md:right-6',
                )}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* play/pause */}
          {count > 1 && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play' : 'Pause'}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-black/40 text-white/80 backdrop-blur-md transition-all hover:border-[color:var(--brand-gold)] hover:text-white md:right-6 md:top-6"
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
          )}

          {/* counter */}
          {count > 1 && (
            <div className="absolute left-3 top-3 z-10 rounded-full border border-[color:var(--glass-border)] bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)] backdrop-blur-md md:left-6 md:top-6">
              {String(index + 1).padStart(2, '0')}
              <span className="text-white/40"> / {String(count).padStart(2, '0')}</span>
            </div>
          )}

          {/* dots */}
          {count > 1 && (
            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 md:bottom-6">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    i === index
                      ? 'w-8 bg-[color:var(--brand-gold)]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BannerCarousel;
