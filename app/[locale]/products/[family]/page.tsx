import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { CatalogHero } from '@/components/catalog/CatalogHero';
import { CATALOG, familiesByZone, findFamily } from '@/lib/catalog/ms-lighting';

type Props = { params: Promise<{ locale: string; family: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATALOG.map((f) => ({ locale, family: f.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family } = await params;
  const fam = findFamily(family);
  if (!fam) return {};
  return {
    title: fam.name,
    description: `${fam.name} — ${fam.products.length} models from Al-Burhan Regional. ${fam.blurb}`,
  };
}

export default async function FamilyPage({ params }: Props) {
  const { locale, family } = await params;
  setRequestLocale(locale);

  const fam = findFamily(family);
  if (!fam) notFound();

  const isRTL = locale === 'ar';
  const siblings = familiesByZone(fam.zone).filter((f) => f.slug !== fam.slug);
  const zoneLabel = fam.zone === 'indoor'
    ? (isRTL ? 'داخلي' : 'Indoor')
    : (isRTL ? 'خارجي' : 'Outdoor');

  return (
    <>
      <CatalogHero
        kicker={`${zoneLabel} · ${fam.tag}`}
        title={fam.name}
        lead={fam.blurb}
        crumbs={[
          { label: isRTL ? 'الرئيسية' : 'Home', href: '/' },
          { label: isRTL ? 'الكتالوج' : 'Catalogue', href: '/products' },
          { label: zoneLabel, href: `/products?zone=${fam.zone}` },
          { label: fam.name },
        ]}
        aside={
          <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden border border-line bg-surface md:w-72">
            <Image
              src={fam.image}
              alt=""
              fill
              sizes="288px"
              priority
              className="object-contain p-6"
            />
          </div>
        }
      />

      {/* ── Models ── */}
      <section className="wrap py-14">
        <div className="flex items-end justify-between border-b border-line pb-4">
          <h2 className="t-h3">{isRTL ? 'الموديلات' : 'Models'}</h2>
          <p className="t-mono text-[0.5625rem] text-ink-4">
            {fam.products.length} {isRTL ? 'موديل' : 'models'} · CE · RoHS
          </p>
        </div>

        <div className="mt-px grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
          {fam.products.map((model, i) => (
            <Link
              key={model.slug}
              href={`/products/${fam.slug}/${model.slug}` as never}
              className="group flex flex-col bg-canvas transition-colors duration-500 hover:bg-surface"
            >
              <span className="relative block aspect-square overflow-hidden">
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(52% 42% at 50% 24%, var(--lumen-glow), transparent 72%)',
                  }}
                />
                <Image
                  src={model.image}
                  alt={model.code}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={i < 4 ? 'eager' : 'lazy'}
                  className="object-contain p-6 transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <span className="t-mono absolute start-3 top-3 text-[0.5625rem] text-ink-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <span className="flex items-center justify-between gap-3 border-t border-line px-4 py-4">
                <span>
                  <span className="block text-[0.9375rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                    {model.code}
                  </span>
                  <span className="t-mono mt-1 block text-[0.5625rem] text-ink-4">
                    {isRTL ? 'عرض المواصفات' : 'View specifications'}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Sibling families ── */}
      <section className="border-t border-line bg-surface py-14">
        <div className="wrap">
          <p className="kicker">
            {isRTL ? `المزيد من الإضاءة ال${zoneLabel}` : `More ${zoneLabel.toLowerCase()} families`}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {siblings.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/products/${f.slug}` as never}
                  className="inline-flex items-center gap-2 border border-line bg-canvas px-4 py-2.5 text-[0.8125rem] text-ink-2 transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {f.name}
                  <span className="t-mono text-[0.5625rem] text-ink-4">{f.products.length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
