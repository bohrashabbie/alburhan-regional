import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowUpRight, Check } from 'lucide-react';

import { Link, routing } from '@/i18n/routing';
import { CatalogHero } from '@/components/catalog/CatalogHero';
import { CATALOG, findModel } from '@/lib/catalog/ms-lighting';

type Props = { params: Promise<{ locale: string; family: string; model: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATALOG.flatMap((f) =>
      f.products.map((p) => ({ locale, family: f.slug, model: p.slug })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family, model } = await params;
  const found = findModel(family, model);
  if (!found) return {};
  return {
    title: `${found.model.code} — ${found.family.name}`,
    description: `${found.model.code} ${found.family.name}. Specifications, technical data and certifications from Al-Burhan Regional.`,
  };
}

const CERTS = ['CE', 'RoHS', 'CB', 'SASO'];

export default async function ModelPage({ params }: Props) {
  const { locale, family, model } = await params;
  setRequestLocale(locale);

  const found = findModel(family, model);
  if (!found) notFound();

  const { family: fam, model: item } = found;
  const isRTL = locale === 'ar';
  const related = fam.products.filter((p) => p.slug !== item.slug).slice(0, 4);
  const zoneLabel = fam.zone === 'indoor'
    ? (isRTL ? 'داخلي' : 'Indoor')
    : (isRTL ? 'خارجي' : 'Outdoor');

  return (
    <>
      <CatalogHero
        kicker={fam.name}
        title={item.code}
        lead={
          isRTL
            ? `${item.code} من عائلة ${fam.name} — البيانات الفنية والمنحنيات الفوتومترية والأبعاد والشهادات موضحة في ورقة المواصفات أدناه.`
            : `${item.code} is part of our ${fam.name} range. Technical data, photometrics, dimensions and certifications are on the specification sheet below.`
        }
        crumbs={[
          { label: isRTL ? 'الرئيسية' : 'Home', href: '/' },
          { label: isRTL ? 'الكتالوج' : 'Catalogue', href: '/products' },
          { label: fam.name, href: `/products/${fam.slug}` },
          { label: item.code },
        ]}
      />

      {/* ── Plate + facts ── */}
      <section className="wrap grid gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="relative aspect-square overflow-hidden border border-line bg-surface">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(55% 42% at 50% 20%, var(--lumen-glow), transparent 72%)',
            }}
          />
          <Image
            src={item.image}
            alt={`${item.code} — ${fam.name}`}
            fill
            sizes="(max-width: 1024px) 92vw, 52vw"
            priority
            className="object-contain p-6 sm:p-10"
          />
          <span aria-hidden className="absolute left-3 top-3 size-3 border-l border-t border-line-2" />
          <span aria-hidden className="absolute right-3 top-3 size-3 border-r border-t border-line-2" />
          <span aria-hidden className="absolute bottom-3 left-3 size-3 border-b border-l border-line-2" />
          <span aria-hidden className="absolute bottom-3 right-3 size-3 border-b border-r border-line-2" />
        </div>

        <div>
          <dl className="border-t border-line">
            {[
              { k: isRTL ? 'رمز الموديل' : 'Model code', v: item.code },
              { k: isRTL ? 'العائلة' : 'Family', v: fam.name },
              { k: isRTL ? 'التطبيق' : 'Application', v: zoneLabel },
              { k: isRTL ? 'التصنيع' : 'Manufacture', v: isRTL ? 'جيانغمن، الصين' : 'Jiangmen, China' },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                <dt className="t-mono text-[0.625rem] text-ink-4">{row.k}</dt>
                <dd className="text-[0.9375rem] font-medium text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {CERTS.map((c) => (
              <span key={c} className="chip">
                <Check className="size-3 text-accent" />
                {c}
              </span>
            ))}
          </div>

          <p className="t-small mt-6">
            {isRTL
              ? 'متوفر ومدعوم في كل أسواق شبكة البرهان الإقليمية — الكويت والإمارات والصين، ومصر قريباً.'
              : 'Sold and supported in every market of the Al-Burhan regional network — Kuwait, the UAE, China, and Egypt soon.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-lg">
              {isRTL ? 'اطلب عرض سعر لهذا الموديل' : 'Request a quote for this model'}
            </Link>
            <Link href={`/products/${fam.slug}` as never} className="btn btn-outline btn-lg">
              {isRTL ? `كل ${fam.name}` : `All ${fam.name}`}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Specification sheet ── */}
      {item.spec && (
        <section className="border-t border-line bg-surface py-14">
          <div className="wrap">
            <div className="flex items-end justify-between border-b border-line pb-4">
              <h2 className="t-h3">
                {isRTL ? 'المواصفات والبيانات الفنية' : 'Specifications & technical data'}
              </h2>
              <a
                href={item.spec}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent"
              >
                {isRTL ? 'فتح بالحجم الكامل' : 'Open full size'}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            {/* Spec sheets are dense technical drawings. Scaled to a 360 px
                screen the dimension callouts are illegible, so below the
                sheet's natural width the container pans instead of shrinking. */}
            <div className="mt-6 overflow-x-auto border border-line bg-canvas">
              <Image
                src={item.spec}
                alt={`${item.code} specification sheet`}
                width={1600}
                height={1100}
                sizes="(max-width: 48rem) 44rem, 82rem"
                className="h-auto w-full min-w-[44rem] object-contain"
              />
            </div>
            <p className="t-mono mt-3 text-[0.625rem] text-ink-4 md:hidden">
              {isRTL ? 'مرّر أفقياً لقراءة الورقة' : 'Scroll sideways to read the sheet'}
            </p>
          </div>
        </section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="border-t border-line py-14">
          <div className="wrap">
            <p className="kicker">{isRTL ? 'من العائلة نفسها' : 'Same family'}</p>

            <div className="mt-6 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${fam.slug}/${p.slug}` as never}
                  className="group flex flex-col bg-canvas transition-colors duration-500 hover:bg-surface"
                >
                  <span className="relative block aspect-square overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.code}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="object-contain p-4 transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.06] sm:p-6"
                    />
                  </span>
                  <span className="border-t border-line px-4 py-3.5">
                    <span className="block text-[0.875rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                      {p.code}
                    </span>
                    <span className="t-mono mt-1 block text-[0.625rem] text-ink-4">{fam.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
