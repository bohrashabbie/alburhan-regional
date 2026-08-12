'use client';

import * as React from 'react';
import Image from 'next/image';
import { Search as SearchIcon, X as ClearIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { CATALOG, allModels, type CatalogZone } from '@/lib/catalog/ms-lighting';

type Filter = 'all' | CatalogZone;

const MODELS = allModels();

/**
 * The catalogue browser.
 *
 * Two modes on one surface: with an empty search box it shows the range
 * grouped by family, which is how someone browsing thinks. Type anything and
 * it flattens to a flat model grid, which is how someone who already knows
 * the model code thinks. No tabs, no mode switch — the input decides.
 */
export function CatalogBrowser({ initialZone = 'all' }: { initialZone?: Filter }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [query, setQuery] = React.useState('');
  const [zone, setZone] = React.useState<Filter>(initialZone);

  const q = query.trim().toLowerCase();

  const families = React.useMemo(
    () => CATALOG.filter((f) => zone === 'all' || f.zone === zone),
    [zone],
  );

  const hits = React.useMemo(() => {
    if (!q) return [];
    return MODELS.filter(({ family, model }) => {
      if (zone !== 'all' && family.zone !== zone) return false;
      return (
        model.code.toLowerCase().includes(q) ||
        model.name.toLowerCase().includes(q) ||
        family.name.toLowerCase().includes(q)
      );
    });
  }, [q, zone]);

  const zones: { id: Filter; label: string }[] = [
    { id: 'all', label: isRTL ? 'الكل' : 'All' },
    { id: 'indoor', label: isRTL ? 'داخلي' : 'Indoor' },
    { id: 'outdoor', label: isRTL ? 'خارجي' : 'Outdoor' },
  ];

  return (
    <>
      {/* ── Controls: sticky under the header so filters never scroll away ── */}
      <div className="sticky top-[3.75rem] z-[600] border-y border-line bg-glass-strong backdrop-blur-[16px]">
        <div className="wrap flex flex-wrap items-center gap-3 py-3">
          <div className="flex h-10 min-w-0 flex-1 items-center border border-line bg-canvas px-3 focus-within:border-accent">
            <SearchIcon className="size-4 shrink-0 text-ink-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isRTL ? 'ابحث برقم الموديل أو النوع…' : 'Search by model code or family…'
              }
              aria-label={isRTL ? 'بحث' : 'Search the catalogue'}
              className="min-w-0 flex-1 bg-transparent px-3 text-[0.875rem] text-ink outline-none placeholder:text-ink-4"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={isRTL ? 'مسح' : 'Clear search'}
                className="text-ink-4 transition-colors hover:text-accent"
              >
                <ClearIcon className="size-4" />
              </button>
            )}
          </div>

          <div className="inline-flex h-10 items-center rounded-full border border-line bg-surface p-1">
            {zones.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z.id)}
                aria-pressed={zone === z.id}
                className={`inline-flex h-8 items-center rounded-full px-4 text-[0.8125rem] font-medium transition-colors duration-300 ${
                  zone === z.id
                    ? 'bg-canvas text-accent shadow-[var(--shadow-1)]'
                    : 'text-ink-3 hover:text-ink'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          <p className="t-mono hidden text-[0.5625rem] text-ink-4 sm:block">
            {q
              ? `${hits.length} ${isRTL ? 'نتيجة' : 'results'}`
              : `${families.reduce((n, f) => n + f.products.length, 0)} ${isRTL ? 'موديل' : 'models'}`}
          </p>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="wrap py-14">
        {q ? (
          hits.length ? (
            <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
              {hits.map(({ family, model }) => (
                <ModelTile key={`${family.slug}/${model.slug}`} family={family} model={model} />
              ))}
            </div>
          ) : (
            <div className="border border-line py-20 text-center">
              <p className="t-h3">{isRTL ? 'لا توجد نتائج' : 'No models match that'}</p>
              <p className="t-small mt-2">
                {isRTL
                  ? 'جرّب رقم موديل مثل MS-240R أو اسم عائلة مثل Linear.'
                  : 'Try a model code like MS-240R, or a family name like Linear.'}
              </p>
            </div>
          )
        ) : (
          <div className="space-y-16">
            {families.map((family) => (
              <section key={family.slug}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <p className="t-mono text-[0.5625rem] text-ink-4">
                      {family.zone === 'indoor'
                        ? isRTL ? 'داخلي' : 'Indoor'
                        : isRTL ? 'خارجي' : 'Outdoor'}
                    </p>
                    <h2 className="t-h2 mt-1.5">
                      <Link
                        href={`/products/${family.slug}` as never}
                        className="transition-colors hover:text-accent"
                      >
                        {family.name}
                      </Link>
                    </h2>
                  </div>
                  <p className="t-mono text-[0.5625rem] text-ink-4">
                    {family.products.length} {isRTL ? 'موديل' : 'models'}
                  </p>
                </div>

                <div className="mt-px grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
                  {family.products.map((model) => (
                    <ModelTile key={model.slug} family={family} model={model} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ModelTile({
  family,
  model,
}: {
  family: { slug: string; name: string };
  model: { slug: string; code: string; image: string };
}) {
  return (
    <Link
      href={`/products/${family.slug}/${model.slug}` as never}
      className="group flex flex-col bg-canvas transition-colors duration-500 hover:bg-surface"
    >
      <span className="relative block aspect-square overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(52% 42% at 50% 24%, var(--lumen-glow), transparent 72%)',
          }}
        />
        <Image
          src={model.image}
          alt={model.code}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          loading="lazy"
          className="object-contain p-5 transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
      </span>
      <span className="border-t border-line px-4 py-3.5">
        <span className="block text-[0.875rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          {model.code}
        </span>
        <span className="t-mono mt-1 block truncate text-[0.5625rem] text-ink-4">
          {family.name}
        </span>
      </span>
    </Link>
  );
}

export default CatalogBrowser;
