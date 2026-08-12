'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useBanners, useCountries } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 6000;

/**
 * The market banner — CMS `banners`, one slide per country.
 *
 * Rebuilt as a single full-bleed plate with the slide index rendered as a
 * ruled list beside it, rather than dots under a box. The active row's rule
 * fills over the autoplay duration, so the timer is the progress indicator
 * instead of a separate bar. Crossfade only: nothing slides, nothing zooms.
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
          const countryName =
            (country ? (isRTL ? country.name_ar || country.name_en : country.name_en) : '') || '';
          const rawTitle = (isRTL ? b.name_ar || b.name_en : b.name_en) || '';
          return {
            id: b.id,
            title: rawTitle.replace(/\s+hero$/i, '').trim() || countryName,
            description:
              (isRTL ? b.description_ar || b.description_en : b.description_en) || '',
            country: countryName,
            countrySlug: country?.slug || '',
            image: getImageUrl(b.image_url),
          };
        })
        .filter((b): b is typeof b & { image: string } => Boolean(b.image)),
    [bannersRaw, countries, isRTL],
  );

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = slides.length;

  React.useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, paused, index]);

  if (!count) return null;

  const active = slides[index];

  return (
    <section
      className="relative border-b border-line bg-surface"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-roledescription="carousel"
      aria-label={isRTL ? 'أسواقنا' : 'Our markets'}
    >
      <div className="wrap grid gap-8 py-14 lg:grid-cols-[1fr_20rem] lg:gap-12 lg:py-20">
        {/* Plate */}
        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-canvas sm:aspect-[16/8]">
          {slides.map((s, i) => (
            <div
              key={s.id}
              aria-hidden={i !== index}
              className="absolute inset-0"
              style={{
                opacity: i === index ? 1 : 0,
                transition: 'opacity 1.1s var(--ease-out-expo)',
              }}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}

          {/* Scrim keeps the caption legible over any photograph */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.35) 45%, transparent 75%)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="t-mono text-[0.5625rem] text-white/60">
              {active.country || (isRTL ? 'السوق' : 'Market')}
            </p>
            <h3 className="t-h2 mt-2 max-w-lg text-white">{active.title}</h3>
            {active.description && (
              <p className="mt-2 line-clamp-2 max-w-md text-[0.875rem] text-white/70">
                {active.description}
              </p>
            )}
            {active.countrySlug && (
              <Link
                href={`/${active.countrySlug}` as never}
                className="group mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-white"
              >
                {isRTL ? 'اكتشف السوق' : 'Explore this market'}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Ruled index */}
        <div className="flex flex-col">
          <p className="kicker">{isRTL ? 'أسواقنا' : 'Our markets'}</p>

          <ul className="mt-6 flex-1 border-t border-line">
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  className="group relative flex w-full items-baseline justify-between gap-4 border-b border-line py-4 text-start"
                >
                  {/* The autoplay clock, drawn as the row's own rule */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
                    style={{
                      transform: i === index ? 'scaleX(1)' : 'scaleX(0)',
                      transition:
                        i === index && !paused
                          ? `transform ${AUTOPLAY_MS}ms linear`
                          : 'transform 400ms var(--ease-out-expo)',
                    }}
                  />
                  <span
                    className={cn(
                      'text-[0.9375rem] font-medium transition-colors duration-300',
                      i === index ? 'text-accent' : 'text-ink-2 group-hover:text-ink',
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="t-mono text-[0.5625rem] text-ink-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {count > 1 && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="mt-6 inline-flex w-fit items-center gap-2 text-[0.75rem] text-ink-3 transition-colors hover:text-accent"
              aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              <span className="t-mono text-[0.5625rem]">
                {paused ? (isRTL ? 'تشغيل' : 'Play') : (isRTL ? 'إيقاف' : 'Pause')}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default BannerCarousel;
