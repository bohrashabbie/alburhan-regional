'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

/**
 * The latest delivered project, given a full section of its own.
 *
 * The projects page is a grid of equal tiles, which is the right shape for a
 * back catalogue and the wrong one for "this is what we just handed over".
 * So the newest job gets an editorial spread on the home page instead: three
 * portrait frames — room, shelf, counter — over a ruled spec block, in the
 * same technical voice the rest of the page speaks in.
 *
 * The frames are 3/4 because the source photographs are 1200x1600. Keep that
 * ratio in step with whatever you put in `PROJECT.images`: a landscape photo
 * dropped in here would be centre-cropped to a portrait slot and lose its
 * ceiling and floor, which on a lighting job is most of the work.
 *
 * Assets are local rather than CMS-driven on purpose: this is a hand-curated
 * marketing slot, not a feed. To swap the featured project, replace PROJECT
 * and the three files under public/OurProject/.
 */

const PROJECT = {
  /* Photographed at handover, before merchandising — the shopfront hoarding
     still reads "opening soon". Keep the copy in the past tense about the
     installation and silent about trading until the store actually opens. */
  location: 'Hessa Al Mubarak, Kuwait',
  year: '2026',
  images: {
    room: '/OurProject/Korea Town Hessa Mubarak/korea-town-hessa-room.jpg',
    shelf: '/OurProject/Korea Town Hessa Mubarak/korea-town-hessa-shelf-lighting.jpg',
    counter: '/OurProject/Korea Town Hessa Mubarak/korea-town-hessa-counter.jpg',
  },
} as const;

export function FeaturedProjectSection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { ref: headRef, visible: headVisible } = useReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useReveal(0.1);

  const copy = isRTL
    ? {
        kicker: 'أحدث مشروع',
        lead:
          'متجر كوريا تاون الجديد في حصة المبارك، مصوَّراً عند التسليم — منظومة الإضاءة كاملةً مركّبة ومشغّلة قبل وصول أول منتج إلى الرفوف. لوحة واجهة مضيئة، وكرنيش دائري وإسبوتات على كامل السقف، ولوحات إرشادية بإضاءة هالة، وإضاءة LED خطية مدمجة في كل رف ووحدة عرض وطاولة دفع. تصميماً وتوريداً وتركيباً.',
        allProjects: 'كل المشاريع',
        cta: 'ناقش مشروعك',
        frames: [
          { n: '01', t: 'الصالة', d: 'كرنيش دائري وإسبوتات وإرشادات مضيئة' },
          { n: '02', t: 'إضاءة الرفوف', d: 'إضاءة LED خطية مدمجة في كل خانة' },
          { n: '03', t: 'طاولة الدفع', d: 'واجهة مضيئة وشاشة LED' },
        ],
        specs: [
          { k: 'العميل', v: 'كوريا تاون' },
          { k: 'الموقع', v: 'حصة المبارك، الكويت' },
          { k: 'نطاق العمل', v: 'تصميم وتوريد وتركيب' },
          { k: 'التسليم', v: PROJECT.year },
        ],
      }
    : {
        kicker: 'Latest project',
        lead:
          'Korea Town’s new Hessa Mubarak store, photographed at handover — the full lighting package commissioned and burning in before a single product reached the shelves. Illuminated shopfront signage, a circular cove raft and downlights across the ceiling, halo-lit wayfinding, and integrated linear LED in every shelf, gondola and cash desk. Specified, supplied and installed by Al Burhan.',
        allProjects: 'All projects',
        cta: 'Discuss your project',
        frames: [
          { n: '01', t: 'The room', d: 'Cove raft, downlights and halo-lit wayfinding' },
          { n: '02', t: 'Shelf lighting', d: 'Integrated linear LED in every bay' },
          { n: '03', t: 'Cash desk', d: 'Backlit counter and LED wall' },
        ],
        specs: [
          { k: 'Client', v: 'Korea Town' },
          { k: 'Location', v: PROJECT.location },
          { k: 'Scope', v: 'Specify, supply & install' },
          { k: 'Handover', v: PROJECT.year },
        ],
      };

  const frames = [
    { src: PROJECT.images.room, cap: copy.frames[0] },
    { src: PROJECT.images.shelf, cap: copy.frames[1] },
    { src: PROJECT.images.counter, cap: copy.frames[2] },
  ];

  return (
    <section className="section border-b border-line" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="wrap">
        {/* Header */}
        <div ref={headRef} className={cn('reveal-left', headVisible && 'on')}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">{copy.kicker}</p>
              <h2 className="t-h1 mt-5">
                {isRTL ? (
                  <>
                    كل رفٍّ <em className="t-accent text-accent">مضاء</em>، قبل وصول أول منتج
                  </>
                ) : (
                  <>
                    Every shelf <em className="t-accent text-accent">lit</em>, before a single
                    product landed
                  </>
                )}
              </h2>
            </div>

            <Link
              href="/projects"
              className="link-underline inline-flex w-fit items-center gap-2 text-[0.875rem] font-medium text-accent"
            >
              {copy.allProjects}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <p className="t-lead mt-6 max-w-3xl">{copy.lead}</p>
        </div>

        {/* Three portrait frames — native 3/4, so nothing is cropped away */}
        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-3 md:gap-8">
          {frames.map((f, i) => (
            <figure
              key={f.src}
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'none' : 'translateY(20px)',
                transition: `opacity 0.85s var(--ease-out-expo) ${i * 120}ms, transform 0.85s var(--ease-out-expo) ${i * 120}ms`,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-surface">
                <Image
                  src={f.src}
                  alt={`Korea Town Hessa Mubarak — ${f.cap.t}: ${f.cap.d}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 27rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 border-t border-line pt-3">
                <span className="t-mono block text-[0.625rem] text-ink-4">
                  {f.cap.n} — {f.cap.t}
                </span>
                <span className="t-small mt-1 block">{f.cap.d}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Spec block */}
        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.specs.map((s) => (
              <div key={s.k}>
                <dt className="t-mono text-[0.625rem] text-ink-4">{s.k}</dt>
                <dd className="mt-2 text-[0.9375rem] font-medium text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>

          <Link href="/contact" className="btn btn-primary w-fit">
            {copy.cta}
            <ArrowUpRight className={cn('size-4', isRTL && 'rotate-180')} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjectSection;
