'use client';

import * as React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

/**
 * Closing call to action.
 *
 * The one block that stays dark in both themes (see --slab), so the end of
 * the scroll reads as a deliberate stop rather than one more section. The ask
 * is specific: send a ceiling plan, get fixtures and quantities back.
 */
export function CTASection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { ref, visible } = useReveal(0.2);

  return (
    <section
      className="relative overflow-hidden bg-slab text-slab-ink"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* A single shaft of warm light across the slab */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 50% at 50% -10%, var(--lumen-glow), transparent 65%)',
        }}
      />
      <div aria-hidden className="beam-sweep left-1/4 opacity-60" />

      <div
        ref={ref}
        className="wrap relative grid gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:items-end md:py-28"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(26px)',
          transition: 'opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo)',
        }}
      >
        <div>
          <p className="t-mono text-[0.625rem] text-lumen">
            {isRTL ? 'لنبدأ' : 'Start a project'}
          </p>
          <h2 className="t-h1 mt-5 max-w-2xl text-slab-ink">
            {isRTL ? (
              <>
                أرسل لنا مخطط السقف — نعيد إليك{' '}
                <em className="t-accent text-lumen">الأجهزة والكميات</em>
              </>
            ) : (
              <>
                Send us the ceiling plan — we’ll send back{' '}
                <em className="t-accent text-lumen">fixtures and quantities</em>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-slab-ink/70">
            {isRTL
              ? 'مخطط، صورة مرجعية، أو حتى لقطة من الموقع تكفي للبدء. نرد بالمواصفات والفوتومترية والأوراق التي يحتاجها الاستشاري.'
              : 'A drawing, a mood reference, or just a photo of the space is enough to start. You get fixtures, photometrics and the paperwork your consultant needs.'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/contact"
            className="group inline-flex h-14 items-center justify-between gap-4 bg-slab-ink px-6 text-slab transition-colors duration-300 hover:bg-lumen"
          >
            <span className="text-[0.9375rem] font-medium">
              {isRTL ? 'تحدّث إلى مختص' : 'Talk to a specifier'}
            </span>
            <ArrowRight
              className={cn(
                'size-4 transition-transform duration-300 group-hover:translate-x-1',
                isRTL && 'rotate-180 group-hover:-translate-x-1',
              )}
            />
          </Link>

          <Link
            href="/products"
            className="inline-flex h-14 items-center justify-between gap-4 border border-slab-ink/30 px-6 text-slab-ink transition-colors duration-300 hover:border-slab-ink"
          >
            <span className="text-[0.9375rem] font-medium">
              {isRTL ? 'تصفّح الكتالوج' : 'Browse the catalogue'}
            </span>
            <ArrowRight className={cn('size-4', isRTL && 'rotate-180')} />
          </Link>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="tel:+96599935529"
              className="flex items-center gap-2 text-[0.8125rem] text-slab-ink/65 transition-colors hover:text-slab-ink"
            >
              <Phone className="size-3.5 text-lumen" />
              +965 999 35 529
            </a>
            <a
              href="mailto:info@alburhan-regional.com"
              className="flex items-center gap-2 text-[0.8125rem] text-slab-ink/65 transition-colors hover:text-slab-ink"
            >
              <Mail className="size-3.5 text-lumen" />
              info@alburhan-regional.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
