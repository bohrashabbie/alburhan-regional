'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { CATALOG, CATALOG_MODEL_COUNT, CATALOG_FAMILY_COUNT } from '@/lib/catalog/ms-lighting';

/**
 * The banner.
 *
 * An editorial split: statement on one side, a lit plate on the other. The
 * plate cycles through real catalogue models — each one crossfades in behind a
 * slow warm beam, with its model code and family set in mono underneath, so
 * the first thing a visitor sees is actual product rather than stock imagery.
 */

const SPOTLIGHT = [
  { family: 'recessed-down-light', model: 'ms-240r' },
  { family: 'linear-light', model: 'ms-t8' },
  { family: 'track-spot-light', model: 'ms-601c' },
  { family: 'magnet-light', model: 'ms20y' },
  { family: 'flood-light', model: 'ms-413' },
] as const;

const SLIDES = SPOTLIGHT.map(({ family, model }) => {
  const fam = CATALOG.find((f) => f.slug === family);
  const mod = fam?.products.find((p) => p.slug === model) ?? fam?.products[0];
  return fam && mod
    ? { famName: fam.name, famSlug: fam.slug, code: mod.code, slug: mod.slug, image: mod.image }
    : null;
}).filter(Boolean) as {
  famName: string;
  famSlug: string;
  code: string;
  slug: string;
  image: string;
}[];

const STATS = [
  { value: '20+', en: 'Years in the region', ar: 'سنة في المنطقة' },
  { value: '500+', en: 'Projects delivered', ar: 'مشروع منجز' },
  { value: `${CATALOG_MODEL_COUNT}`, en: 'Models in catalogue', ar: 'موديل في الكتالوج' },
  { value: '4', en: 'Countries', ar: 'دول' },
];

export function HeroSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [index, setIndex] = React.useState(0);

  // Hold each model long enough to actually be read, and stop entirely when
  // the tab is hidden or the visitor has asked for less motion.
  React.useEffect(() => {
    if (SLIDES.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4200);
    };
    const onVisibility = () => {
      clearInterval(timer);
      if (!document.hidden) start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const active = SLIDES[index];

  return (
    <section className="relative overflow-hidden border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Blueprint grid, masked so it fades out before it reaches the type */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 20%, transparent 78%)',
        }}
      />
      <div aria-hidden className="lumen-wash" />

      <div className="wrap relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-24">
        {/* ── Statement ── */}
        <div>
          <p className="kicker enter-fade">
            {isRTL ? 'مجموعة البرهان' : 'Al-Burhan Regional'}
          </p>

          <h1 className="t-display mt-6">
            <span className="line-in" style={{ '--d': '80ms' } as React.CSSProperties}>
              <span>{isRTL ? 'نُضيء معالم' : 'We light the'}</span>
            </span>
            <span className="line-in" style={{ '--d': '190ms' } as React.CSSProperties}>
              <span>
                {isRTL ? 'المنطقة' : 'region’s'}{' '}
                <em className="t-accent text-accent">
                  {isRTL ? 'من مصنعنا' : 'landmarks'}
                </em>
              </span>
            </span>
            <span className="line-in" style={{ '--d': '300ms' } as React.CSSProperties}>
              <span>{isRTL ? 'حتى التركيب' : 'from the factory up'}</span>
            </span>
          </h1>

          <p className="t-lead enter-up mt-7 max-w-xl" style={{ '--d': '470ms' } as React.CSSProperties}>
            {isRTL
              ? 'نصمّم ونصنّع ونورّد ونركّب حلول الإضاءة المعمارية في الكويت والإمارات والصين ومصر — بدعم من مصنعنا الخاص MS Lighting في جيانغمن.'
              : 'We specify, manufacture, supply and install architectural lighting across Kuwait, the UAE, China and Egypt — backed by MS Lighting, our own factory in Jiangmen, Guangdong.'}
          </p>

          <div
            className="enter-up mt-9 flex flex-wrap items-center gap-3"
            style={{ '--d': '620ms' } as React.CSSProperties}
          >
            <Link href="/products" className="btn btn-primary btn-lg">
              {isRTL ? 'تصفّح الكتالوج' : 'Browse the catalogue'}
              <ArrowRight className={`size-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link href="/projects" className="btn btn-outline btn-lg">
              {isRTL ? 'شاهد مشاريعنا' : 'See our projects'}
            </Link>
          </div>

          {/* Stats — a hairline-ruled row, not four floating cards */}
          <dl className="mt-12 grid grid-cols-2 gap-px border-t border-line pt-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.en}
                className="enter-up"
                style={{ '--d': `${720 + i * 90}ms` } as React.CSSProperties}
              >
                <dt className="t-mono text-[0.5625rem] text-ink-4">{isRTL ? s.ar : s.en}</dt>
                <dd className="mt-1.5 text-[1.75rem] font-medium tracking-[-0.035em] text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Lit plate ── */}
        <div className="enter-fade relative" style={{ '--d': '360ms' } as React.CSSProperties}>
          <div className="relative aspect-square w-full overflow-hidden border border-line bg-surface sm:aspect-[4/5] lg:aspect-square">
            {/* Warm cone from the top edge — this is the "light" in the picture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  'conic-gradient(from 200deg at 50% -8%, transparent 130deg, var(--lumen-glow) 160deg, var(--lumen-glow) 200deg, transparent 230deg)',
              }}
            />
            <div aria-hidden className="beam-sweep left-0 z-[3]" />

            {/* Crossfading product plates */}
            {SLIDES.map((s, i) => (
              <div
                key={s.code}
                aria-hidden={i !== index}
                className="absolute inset-0 flex items-center justify-center p-10 sm:p-14"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'scale(1)' : 'scale(1.04)',
                  transition:
                    'opacity 1.1s var(--ease-out-expo), transform 1.4s var(--ease-out-expo)',
                }}
              >
                <Image
                  src={s.image}
                  alt={`${s.code} — ${s.famName}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  priority={i === 0}
                  className="object-contain p-6"
                />
              </div>
            ))}

            {/* Corner registration marks — quiet, technical */}
            <span aria-hidden className="absolute left-3 top-3 z-[4] size-3 border-l border-t border-line-2" />
            <span aria-hidden className="absolute right-3 top-3 z-[4] size-3 border-r border-t border-line-2" />
            <span aria-hidden className="absolute bottom-3 left-3 z-[4] size-3 border-b border-l border-line-2" />
            <span aria-hidden className="absolute bottom-3 right-3 z-[4] size-3 border-b border-r border-line-2" />
          </div>

          {/* Caption bar */}
          <div className="mt-px flex items-stretch border border-line border-t-0 bg-canvas">
            <Link
              href={`/products/${active.famSlug}/${active.slug}` as never}
              className="group flex flex-1 items-center justify-between gap-4 px-5 py-4"
            >
              <span className="min-w-0">
                <span className="t-mono block text-[0.5625rem] text-ink-4">{active.famName}</span>
                <span className="mt-1 block truncate text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent">
                  {active.code}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>

            {/* Slide indicators double as the progress readout */}
            <div className="flex items-center gap-1.5 border-s border-line px-5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.code}`}
                  aria-current={i === index}
                  className="group py-4"
                >
                  <span
                    className="block h-[2px] w-5 transition-colors duration-500"
                    style={{ background: i === index ? 'var(--accent)' : 'var(--line-2)' }}
                  />
                </button>
              ))}
            </div>
          </div>

          <p className="t-mono mt-3 text-[0.5625rem] text-ink-4">
            {isRTL
              ? `${CATALOG_FAMILY_COUNT} عائلة · ${CATALOG_MODEL_COUNT} موديل · MS Lighting`
              : `${CATALOG_FAMILY_COUNT} families · ${CATALOG_MODEL_COUNT} models · manufactured by MS Lighting`}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
