'use client';

import * as React from 'react';
import { ArrowUpRight, Headphones, PenTool, Package, Wrench, Lightbulb } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { useServices } from '@/context/SiteContentContext';

function pickIcon(title: string) {
  if (/consult|advis|support|help/i.test(title)) return Headphones;
  if (/design|plan|concept|draft/i.test(title)) return PenTool;
  if (/supply|product|deliver|source/i.test(title)) return Package;
  if (/install|maintain|service|repair/i.test(title)) return Wrench;
  return Lightbulb;
}

/**
 * Services as a ruled index rather than a card grid — six equal boxes make
 * every service look identical and none look considered. Rows let the eye
 * scan titles, and the hover state fills the row's leading rule in crimson
 * so the pointer has something to land on.
 */
export function ServicesSection() {
  const services = useServices();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const displayed = services.slice(0, 6);

  const { ref: listRef, visible: listVisible } = useReveal(0.1);

  if (!displayed.length) return null;

  return (
    <section className="section border-b border-line bg-surface" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">{isRTL ? 'خدماتنا' : 'What we do'}</p>
            <h2 className="t-h1 mt-5 max-w-lg">
              {isRTL ? 'خدمات إضاءة من الفكرة إلى التشغيل' : 'End-to-end lighting services'}
            </h2>
          </div>

          <Link href="/services" className="link-underline inline-flex w-fit items-center gap-2 text-[0.875rem] font-medium text-accent">
            {isRTL ? 'عرض الكل' : 'All services'}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div ref={listRef} className="mt-12 border-t border-line">
          {displayed.map((svc, i) => {
            const title = (isRTL ? svc.title_ar || svc.title_en : svc.title_en) || '';
            const desc = isRTL ? svc.description_ar || svc.description_en : svc.description_en;
            const Icon = pickIcon(svc.title_en || '');

            return (
              <Link
                key={svc.id}
                href="/services"
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-5 border-b border-line py-6 sm:grid-cols-[3rem_2.5rem_1fr_auto] sm:gap-6"
                style={{
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.7s var(--ease-out-expo) ${i * 70}ms, transform 0.7s var(--ease-out-expo) ${i * 70}ms`,
                }}
              >
                {/* Crimson rule that draws in under the row on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-[600ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                />

                <span className="t-mono hidden text-[0.625rem] text-ink-4 transition-colors duration-300 group-hover:text-accent sm:block">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="flex size-10 items-center justify-center rounded-full border border-line text-ink-3 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  <Icon className="size-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </span>
                  {desc && <span className="t-small mt-1 line-clamp-1 block">{desc}</span>}
                </span>

                <ArrowUpRight className="size-4 shrink-0 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
