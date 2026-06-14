'use client';

import * as React from 'react';
import { ArrowUpRight, Headphones, PenTool, Package, Wrench, Lightbulb } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { useServices } from '@/context/SiteContentContext';

function pickIcon(title: string) {
  const t = title.toLowerCase();
  if (/consult|advis|support|help/i.test(t)) return Headphones;
  if (/design|plan|concept|draft/i.test(t)) return PenTool;
  if (/supply|product|deliver|source/i.test(t)) return Package;
  if (/install|maintain|service|repair/i.test(t)) return Wrench;
  return Lightbulb;
}

export function ServicesSection() {
  const services = useServices();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const displayed = services.slice(0, 6);

  const { ref: headRef, visible: headVisible } = useReveal(0.3);
  const { ref: listRef, visible: listVisible } = useReveal(0.1);

  if (!displayed.length) return null;

  return (
    <section
      className="luxury-section relative bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headRef}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateX(0)' : (isRTL ? 'translateX(30px)' : 'translateX(-30px)'),
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
              {isRTL ? 'خدماتنا' : 'What we offer'}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
              {isRTL ? 'خدمات الإضاءة المتكاملة' : 'End-to-end lighting services'}
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-b border-[#2A2A2A] pb-1 text-[11px] uppercase tracking-[0.2em] text-[#555] transition-all duration-300 hover:border-[#D4A843] hover:text-white"
          >
            {isRTL ? 'عرض الكل' : 'View all'}
            <ArrowUpRight className="size-3" />
          </Link>
        </div>

        {/* List */}
        <div ref={listRef} className="divide-y divide-[#111]">
          {displayed.map((svc, i) => {
            const title = isRTL ? svc.title_ar || svc.title_en : svc.title_en;
            const desc = isRTL ? svc.description_ar || svc.description_en : svc.description_en;
            const Icon = pickIcon(svc.title_en || '');
            const num = String(i + 1).padStart(2, '0');

            return (
              <div
                key={svc.id}
                className="group flex items-center gap-6 py-7 transition-colors duration-300"
                style={{
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'translateX(0)' : (isRTL ? 'translateX(30px)' : 'translateX(-30px)'),
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                }}
              >
                {/* Number */}
                <span className="w-8 shrink-0 font-mono text-[11px] text-[#333] transition-colors duration-300 group-hover:text-[#D4A843]">
                  {num}
                </span>

                {/* Icon */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#1A1A1A] text-[#333] transition-all duration-300 group-hover:border-[#D4A843]/40 group-hover:text-[#D4A843]">
                  <Icon className="size-4" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-light text-white transition-colors duration-300 group-hover:text-[#D4A843]">
                    {title}
                  </h3>
                  {desc && (
                    <p className="mt-1 line-clamp-1 text-[12px] font-light text-[#444]">
                      {desc}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ArrowUpRight className="size-4 shrink-0 text-[#2A2A2A] transition-all duration-300 group-hover:text-[#D4A843] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
