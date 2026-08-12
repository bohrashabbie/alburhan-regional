'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

import { useReveal } from '@/hooks/useReveal';
import {
  CATALOG_FAMILY_COUNT,
  CATALOG_MODEL_COUNT,
  familiesByZone,
  type CatalogFamily,
} from '@/lib/catalog/ms-lighting';

/**
 * The range, split the way a specifier actually thinks about it: indoor
 * versus outdoor, family by family, model counts on the face of each card.
 *
 * Cards are plates on the surface colour with the fixture floating in the
 * middle — the same treatment the factory uses for its own cut sheets, so a
 * card and a spec sheet look like they came from one place.
 */

function FamilyCard({
  family,
  index,
  visible,
}: {
  family: CatalogFamily;
  index: number;
  visible: boolean;
}) {
  return (
    <Link
      href={`/products/${family.slug}` as never}
      className="group card flex flex-col overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? undefined : 'translateY(22px)',
        transition: `opacity 0.8s var(--ease-out-expo) ${Math.min(index, 8) * 70}ms, transform 0.8s var(--ease-out-expo) ${Math.min(index, 8) * 70}ms, border-color 320ms, box-shadow 420ms`,
      }}
    >
      <span className="relative block aspect-[5/4] overflow-hidden bg-surface">
        {/* A soft pool of warm light under the fixture */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(50% 40% at 50% 22%, var(--lumen-glow), transparent 70%)',
          }}
        />
        <Image
          src={family.image}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          loading="lazy"
          className="object-contain p-8 transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        <span className="chip absolute start-4 top-4 bg-canvas/80 backdrop-blur">
          {family.tag}
        </span>
      </span>

      <span className="flex flex-1 flex-col border-t border-line p-5">
        <span className="flex items-start justify-between gap-3">
          <span className="t-h3 text-ink transition-colors duration-300 group-hover:text-accent">
            {family.name}
          </span>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </span>
        <span className="t-small mt-2 line-clamp-2 flex-1">{family.blurb}</span>
        <span className="t-mono mt-4 text-[0.5625rem] text-ink-4">
          {family.products.length} {family.products.length === 1 ? 'model' : 'models'}
        </span>
      </span>
    </Link>
  );
}

export function RangeSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [zone, setZone] = React.useState<'indoor' | 'outdoor'>('indoor');
  const { ref, visible } = useReveal(0.12);

  const families = React.useMemo(() => familiesByZone(zone), [zone]);

  const tabs = [
    { id: 'indoor' as const, label: isRTL ? 'داخلي' : 'Indoor' },
    { id: 'outdoor' as const, label: isRTL ? 'خارجي' : 'Outdoor' },
  ];

  return (
    <section className="section border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">{isRTL ? 'المجموعة' : 'The range'}</p>
            <h2 className="t-h1 mt-5 max-w-xl">
              {isRTL ? (
                <>
                  {CATALOG_MODEL_COUNT} موديلاً عبر{' '}
                  <em className="t-accent text-accent">{CATALOG_FAMILY_COUNT}</em> عائلة
                </>
              ) : (
                <>
                  {CATALOG_MODEL_COUNT} models across{' '}
                  <em className="t-accent text-accent">{CATALOG_FAMILY_COUNT}</em> fixture families
                </>
              )}
            </h2>
            <p className="t-lead mt-4 max-w-lg">
              {isRTL
                ? 'كل موديل مصنوع في مصنعنا في جيانغمن، مع شهادات CE و RoHS جاهزة لاعتماد الاستشاري.'
                : 'Every model is built in our own factory in Jiangmen, and ships with the CE and RoHS documentation your consultant will ask for.'}
            </p>
          </div>

          {/* Zone switch */}
          <div className="inline-flex h-11 shrink-0 items-center rounded-full border border-line bg-surface p-1">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                type="button"
                onClick={() => setZone(tabItem.id)}
                aria-pressed={zone === tabItem.id}
                className={`inline-flex h-9 items-center rounded-full px-5 text-[0.8125rem] font-medium transition-colors duration-300 ${
                  zone === tabItem.id
                    ? 'bg-canvas text-accent shadow-[var(--shadow-1)]'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                {tabItem.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((f, i) => (
            <FamilyCard key={f.slug} family={f} index={i} visible={visible} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products" className="btn btn-outline btn-lg">
            {isRTL ? 'افتح الكتالوج الكامل' : 'Open the full catalogue'}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RangeSection;
