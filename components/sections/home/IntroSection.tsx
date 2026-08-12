'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

import { useReveal } from '@/hooks/useReveal';
import { useSiteContent } from '@/context/SiteContentContext';
import { cn } from '@/lib/utils';

/**
 * The positioning statement: what the group is, in one screen.
 *
 * Copy comes from the CMS (`home` / `introduction`) when it's there, with a
 * written fallback so the section is never an empty box on a cold CMS.
 * The four capability rows are the argument — specify, manufacture, supply,
 * install — the loop that competitors have to subcontract.
 */
export function IntroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { content } = useSiteContent();

  const { ref: leftRef, visible: leftVisible } = useReveal(0.2);
  const { ref: rightRef, visible: rightVisible } = useReveal<HTMLOListElement>(0.15);

  const intro = content?.page_contents?.find(
    (p) => p.page_key === 'home' && p.section_key === 'introduction',
  );
  const introBody =
    (isRTL ? intro?.content_ar : intro?.content_en) ||
    (isRTL
      ? 'قلة من موردي الإضاءة يملكون المصنع الذي ينتج ما يورّدونه. نحن نملكه — وهذا يعني تحكماً في المواصفات والجدول الزمني والسعر من أول رسم حتى آخر تركيب.'
      : 'Few lighting suppliers own the factory behind what they sell. We do — and that means control over specification, lead time and price, from the first drawing to the last fixture on site.');

  const steps = isRTL
    ? [
        { n: '01', title: 'التصميم والمواصفات', text: 'حسابات إضاءة، اختيار الأجهزة، وملفات فوتومترية لاعتماد الاستشاري.' },
        { n: '02', title: 'التصنيع', text: 'إنتاج داخلي في جيانغمن — مكوّنات Cree و Osram ومشغّلات Meanwell.' },
        { n: '03', title: 'التوريد', text: 'مخزون إقليمي في الكويت والإمارات يقصّر مدة التسليم للمشاريع.' },
        { n: '04', title: 'التركيب والتشغيل', text: 'فرق تركيب وتشغيل ودعم ما بعد التسليم في السوق نفسه.' },
      ]
    : [
        { n: '01', title: 'Specify', text: 'Lighting calculations, fixture selection and photometric files your consultant can sign off.' },
        { n: '02', title: 'Manufacture', text: 'Built in-house in Jiangmen on tier-one components — Cree, Osram, Meanwell drivers.' },
        { n: '03', title: 'Supply', text: 'Regional stock in Kuwait and the UAE, so project lead times stay in weeks, not quarters.' },
        { n: '04', title: 'Install & commission', text: 'Our own crews on site, and after-handover support in the same market.' },
      ];

  return (
    <section className="section border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* Statement */}
        <div
          ref={leftRef}
          className={cn('reveal-left', leftVisible && 'on')}
        >
          <p className="kicker">{t('sections.introduction')}</p>
          <h2 className="t-h1 mt-5">
            {isRTL ? (
              <>
                نملك <em className="t-accent text-accent">المصنع</em>، لا الوسيط فقط
              </>
            ) : (
              <>
                We own the <em className="t-accent text-accent">factory</em>, not just the invoice
              </>
            )}
          </h2>
          <p className="t-lead mt-6 max-w-md">{introBody}</p>

          <Link href="/about" className="link-underline mt-9 inline-flex w-fit items-center gap-2 text-[0.875rem] font-medium text-accent">
            {isRTL ? 'قصة المجموعة' : 'The group’s story'}
            <ArrowRight className={cn('size-4', isRTL && 'rotate-180')} />
          </Link>
        </div>

        {/* Capability loop */}
        <ol ref={rightRef} className="border-t border-line">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="group grid grid-cols-[3rem_1fr] gap-5 border-b border-line py-7 transition-colors duration-500 hover:bg-surface"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'none' : 'translateY(18px)',
                transition: `opacity 0.8s var(--ease-out-expo) ${i * 90}ms, transform 0.8s var(--ease-out-expo) ${i * 90}ms, background-color 0.5s`,
              }}
            >
              <span className="t-mono pt-1 text-[0.625rem] text-ink-4 transition-colors duration-300 group-hover:text-accent">
                {s.n}
              </span>
              <div>
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-small mt-1.5 max-w-md">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default IntroSection;
