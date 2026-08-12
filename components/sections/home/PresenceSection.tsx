'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { useCountries, useContactInfo } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const isValidContact = (v: string | null | undefined): v is string =>
  typeof v === 'string' && v.length > 0 && !/(to be added|information|placeholder)/i.test(v);

const FALLBACKS: Record<string, string> = {
  china: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1200&q=80',
  kuwait: 'https://images.unsplash.com/photo-1578895104528-1daa6f2a5d4b?auto=format&fit=crop&w=1200&q=80',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  egypt: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b0b?auto=format&fit=crop&w=1200&q=80',
};

const ROLES: Record<string, { en: string; ar: string }> = {
  kuwait: { en: 'Head office · supply & installation', ar: 'المقر الرئيسي · التوريد والتركيب' },
  uae: { en: 'Regional trading & projects', ar: 'التجارة الإقليمية والمشاريع' },
  china: { en: 'Manufacturing · Jiangmen, Guangdong', ar: 'التصنيع · جيانغمن، قوانغدونغ' },
  egypt: { en: 'Opening soon', ar: 'قريباً' },
};

/**
 * Presence as a four-row ledger instead of four photo tiles. Each row states
 * the market, the legal entity and what that office actually does — the photo
 * is a wide plate on the end that only fills in on hover, so the information
 * leads and the imagery supports.
 */
export function PresenceSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const countries = useCountries();
  const allContacts = useContactInfo();

  const { ref: gridRef, visible } = useReveal(0.1);

  const ordered = React.useMemo(() => {
    const order = ['kuwait', 'uae', 'china', 'egypt'];
    const map = new Map(countries.map((c) => [c.slug, c]));
    return order.map((s) => map.get(s)).filter(Boolean) as typeof countries;
  }, [countries]);

  if (!ordered.length) return null;

  return (
    <section className="section border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">{isRTL ? 'وجودنا' : 'Where we are'}</p>
            <h2 className="t-h1 mt-5 max-w-xl">
              {isRTL ? (
                <>أربع أسواق، <em className="t-accent text-accent">شركة واحدة</em></>
              ) : (
                <>Four markets, <em className="t-accent text-accent">one company</em></>
              )}
            </h2>
          </div>
          <p className="t-lead max-w-sm">
            {isRTL
              ? 'من المصنع في الصين إلى موقع التركيب في الخليج — نفس الفريق ونفس المسؤولية.'
              : 'From the factory floor in China to the ceiling grid in the Gulf — same company, same accountability.'}
          </p>
        </div>

        <div ref={gridRef} className="mt-12 border-t border-line">
          {ordered.map((c, idx) => {
            const slug = c.slug;
            const name = (isRTL ? c.name_ar || c.name_en : c.name_en) || '';
            const firm = isRTL ? c.firm_name_ar || c.firm_name_en : c.firm_name_en;
            const img = getImageUrl(c.country_image_url) || FALLBACKS[slug] || FALLBACKS.uae;
            const ci = allContacts.find((x) => x.country_id === c.id);
            const role = ROLES[slug];
            const hasContact = isValidContact(ci?.phone1) || isValidContact(ci?.email);

            return (
              <Link
                key={c.id}
                href={`/${slug}` as never}
                className="group relative grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-3 border-b border-line py-7 md:grid-cols-[7rem_1fr_14rem_auto] md:items-center md:gap-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.8s var(--ease-out-expo) ${idx * 90}ms, transform 0.8s var(--ease-out-expo) ${idx * 90}ms`,
                }}
              >
                {/* Market */}
                <div>
                  <span className="t-mono block text-[0.625rem] text-ink-4">
                    {slug.toUpperCase()}
                  </span>
                  <span className="mt-1.5 block text-[1.375rem] font-medium tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-accent">
                    {name}
                  </span>
                </div>

                <ArrowUpRight className="size-4 shrink-0 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:order-last" />

                {/* Entity, role and contacts. On phones this drops to a full
                    -width second row rather than being hidden — the number and
                    the address are the whole point of the section. */}
                <div className="col-span-2 md:col-span-1">
                  {firm && <p className="text-[0.9375rem] text-ink-2">{firm}</p>}
                  {role && <p className="t-small mt-1">{isRTL ? role.ar : role.en}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                    {isValidContact(ci?.phone1) && (
                      <span className="flex items-center gap-1.5 text-[0.75rem] text-ink-3">
                        <Phone className="size-3 shrink-0 text-accent" />
                        {ci!.phone1}
                      </span>
                    )}
                    {isValidContact(ci?.email) && (
                      <span className="flex min-w-0 items-center gap-1.5 text-[0.75rem] text-ink-3">
                        <Mail className="size-3 shrink-0 text-accent" />
                        <span className="truncate">{ci!.email}</span>
                      </span>
                    )}
                    {!hasContact && (
                      <span className="chip">{isRTL ? 'قريباً' : 'Coming soon'}</span>
                    )}
                  </div>
                </div>

                {/* Plate — desaturated until hover, so the row stays calm.
                    Dropped below md: at that width it would be a letterbox. */}
                <span className="relative hidden h-20 overflow-hidden border border-line md:block">
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="224px"
                    loading="lazy"
                    className="object-cover opacity-70 grayscale transition-all duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PresenceSection;
