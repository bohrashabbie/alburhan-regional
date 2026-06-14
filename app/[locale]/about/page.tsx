'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Lightbulb, Shield, Zap, Globe2, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { useServices, useSiteContent } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CountUp } from '@/components/motion/CountUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { GlassCard } from '@/components/fx/GlassCard';
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80';

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const cmsServices = useServices();
  const { setting, content } = useSiteContent();

  const serviceImage = (index: number) => {
    const svc = cmsServices[index];
    return getImageUrl(svc?.image_url) || FALLBACK_IMAGE;
  };

  const serviceTitle = (index: number, fallback: string) => {
    const svc = cmsServices[index];
    if (!svc) return fallback;
    return (isRTL ? svc.title_ar || svc.title_en : svc.title_en) || fallback;
  };

  const featureImage =
    getImageUrl(setting('about_feature_image_url')) ||
    getImageUrl(setting('about_hero_image')) ||
    FALLBACK_IMAGE;

  const values = isRTL
    ? [
        { icon: <Lightbulb className="size-5" />, title: 'ابتكار', desc: 'تصاميم تسبق عصرها.' },
        { icon: <Shield className="size-5" />, title: 'موثوقية', desc: 'تنفيذ بلا أخطاء.' },
        { icon: <Zap className="size-5" />, title: 'طاقة', desc: 'تقنيات موفرة.' },
        { icon: <Globe2 className="size-5" />, title: 'حضور', desc: 'أربع دول وتزداد.' },
      ]
    : [
        { icon: <Lightbulb className="size-5" />, title: 'Innovation', desc: 'Designs that outpace trends.' },
        { icon: <Shield className="size-5" />, title: 'Reliability', desc: 'Execution without surprises.' },
        { icon: <Zap className="size-5" />, title: 'Efficiency', desc: 'Lean, smart, grid-friendly.' },
        { icon: <Globe2 className="size-5" />, title: 'Reach', desc: 'Four countries and growing.' },
      ];

  // CMS-editable story: page_contents row with page_key='about', section_key='story'.
  // Edit it in the CMS; the hardcoded copy below is only a fallback when the row
  // is missing/empty. Paragraphs are split on blank lines (or single newlines).
  const aboutStory = content?.page_contents?.find(
    (p) => p.page_key === 'about' && p.section_key === 'story',
  );
  const cmsStoryBody = (isRTL ? aboutStory?.content_ar : aboutStory?.content_en)?.trim();
  const cmsStoryTitle = (isRTL ? aboutStory?.title_ar : aboutStory?.title_en)?.trim();

  const fallbackParagraphs = isRTL
    ? [
        'لكل شركة نقطة بداية. أما بدايتنا فكانت مع شخصين آمنا بأن النجاح لا يُقاس بالمكان الذي تأتي منه، بل بمدى التزامك بالمكان الذي تريد الوصول إليه.',
        'تأسست البرهان للإضاءة عام 2008 على الإصرار والعمل الجاد ووعدٍ بسيط — أن نعامل كل عميل بصدقٍ واحترام. وما بدأ كعملٍ صغير في مجال الإضاءة نما تدريجياً ليصبح شركة عالمية لها عمليات في الكويت ودبي والصين ومصر. لم تكن الرحلة سهلة قط، لكن كل تحدٍّ أصبح درساً، وكل عميلٍ راضٍ أصبح سبباً لمواصلة المسير.',
        'بالنسبة لنا، الإضاءة أكثر من مجرد منتجات؛ إنها تتعلق بمساعدة الناس على خلق مساحاتٍ أفضل للعيش والعمل والنمو. وسواء كان منزلاً أو مشروعاً تجارياً أو مشروعاً فندقياً أو منشأة صناعية، فإننا نتعامل مع كل مشروع بالقدر نفسه من الالتزام، بغض النظر عن حجمه.',
        'رضا العملاء ليس مجرد قيمة مكتوبة على موقعنا — بل هو المبدأ الذي يوجّه كل قرارٍ نتخذه. نؤمن بأن العلاقات طويلة الأمد تُبنى على الموثوقية والجودة والثقة، وما زالت هذه المبادئ تشكّل شركتنا حتى اليوم.',
        'بعد أكثر من عقدٍ على تأسيسنا، ما زلنا مدفوعين بالروح نفسها التي بدأت بها هذه الرحلة: العمل بجدّ، والتحلّي بالتواضع، والبحث المستمر عن طرقٍ أفضل لخدمة عملائنا.',
      ]
    : [
        'Every company has a starting point. Ours started with two individuals who believed that success is not determined by where you come from, but by how committed you are to where you want to go.',
        'Founded in 2008, Al Burhan Lighting was built on determination, hard work, and a simple promise—to treat every customer with honesty and respect. What began as a small lighting business has steadily grown into an international company with operations in Kuwait, Dubai, China, and Egypt. The journey was never easy, but every challenge became a lesson, and every satisfied customer became a reason to keep moving forward.',
        'For us, lighting is more than just products. It is about helping people create better spaces to live, work, and grow. Whether it is a home, a commercial development, a hospitality project, or an industrial facility, we approach every project with the same level of commitment, regardless of its size.',
        'Customer satisfaction is not just a value written on our website—it is the principle that guides every decision we make. We believe long-term relationships are built through reliability, quality, and trust, and these principles continue to shape our company today.',
        'More than a decade after our founding, we remain driven by the same spirit that started this journey: working hard, staying humble, and continuously finding better ways to serve our customers.',
      ];

  const storyParagraphs = cmsStoryBody
    ? cmsStoryBody.split(/\r?\n\s*\r?\n|\r?\n/).map((s) => s.trim()).filter(Boolean)
    : fallbackParagraphs;

  const tiles = [
    { key: 'interior' },
    { key: 'exterior' },
    { key: 'commercial' },
    { key: 'residential' },
  ];

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'من نحن' : 'Who we are'}
        title={t('sections.aboutUsTitle')}
        description={
          isRTL
            ? 'نحن نحكي قصصاً بالضوء. من الكويت إلى آسيا وأوروبا، نصمم ونصنع ونركّب حلول إضاءة استثنائية.'
            : 'We tell stories with light. From Kuwait across Asia and Europe, we design, build and commission lighting that resonates.'
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <NeonButton asChild size="md">
            <Link href="/contact" data-cursor-label="Contact">
              {isRTL ? 'تواصل معنا' : "Let's talk"}
              <ArrowUpRight className="size-4" />
            </Link>
          </NeonButton>
          <NeonButton asChild size="md" variant="ghost">
            <Link href="/projects" data-cursor-label="Portfolio">
              {isRTL ? 'معرض الأعمال' : 'See our work'}
            </Link>
          </NeonButton>
        </div>
      </PageHero>

      {/* Feature image + story */}
      <section className="relative pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(212,168,67,0.18), transparent 70%)',
                }}
              />
              <GlassCard intensity="strong" className="relative overflow-hidden p-2">
                <ParallaxImage
                  src={featureImage}
                  alt="Feature"
                  width={720}
                  height={900}
                  shift={40}
                  containerClassName="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
                  className="size-full"
                />
              </GlassCard>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                {isRTL ? 'قصتنا' : 'Our story'}
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
                <GradientText>
                  {cmsStoryTitle ||
                    (isRTL
                      ? '20 عاماً من الإضاءة المتقنة'
                      : 'Two decades of precision lighting')}
                </GradientText>
              </h2>
              <div className="mt-6 space-y-4">
                {storyParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={0.08 + i * 0.05}>
                  <GlassCard className="group h-full p-5 transition-colors duration-500 hover:border-[color:var(--brand-gold)]">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(201,169,79,0.1)]">
                      {v.icon}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1 text-sm text-[color:var(--fg-muted)]">{v.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <GlassCard intensity="strong" className="grid grid-cols-2 gap-4 p-8 md:grid-cols-4 md:p-10">
              {[
                { to: 20, suffix: '+', label: isRTL ? 'سنوات' : 'Years' },
                { to: 4, suffix: '', label: isRTL ? 'دول' : 'Countries' },
                { to: 500, suffix: '+', label: isRTL ? 'مشروع' : 'Projects' },
                { to: 98, suffix: '%', label: isRTL ? 'رضا العملاء' : 'Client satisfaction' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-4xl font-bold md:text-5xl">
                    <GradientText as="span">
                      <CountUp to={s.to} suffix={s.suffix} />
                    </GradientText>
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--fg-subtle)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Services / tiles */}
      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              {isRTL ? 'ماذا نقدم' : 'What we offer'}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              <GradientText>
                {isRTL ? 'حلول متكاملة عبر قطاعات متعددة' : 'Integrated solutions across sectors'}
              </GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile, i) => (
              <ScrollReveal key={tile.key} delay={i * 0.08}>
                <SpotlightCard className="group h-full overflow-hidden">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={serviceImage(i)}
                      alt={serviceTitle(i, tile.key)}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(7,7,11,0.15) 0%, rgba(7,7,11,0.65) 55%, rgba(7,7,11,0.95) 100%)',
                      }}
                    />
                    <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                          0{i + 1}
                        </p>
                        <h3 className="mt-1.5 font-display text-lg font-semibold capitalize text-white">
                          {serviceTitle(i, tile.key)}
                        </h3>
                      </div>
                      <div className="flex size-9 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/60 text-[color:var(--brand-gold)] transition-all group-hover:rotate-45 group-hover:bg-[rgba(212,168,67,0.12)] group-hover:text-white">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <GlassCard intensity="strong" className="relative overflow-hidden p-10 text-center md:p-14">
              <div
                aria-hidden
                className="absolute -inset-20 -z-10 opacity-70"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(212,168,67,0.15), transparent 65%)',
                }}
              />
              <h3 className="font-display text-3xl font-bold leading-tight md:text-5xl">
                <GradientText>
                  {isRTL ? 'لنضئ مشروعك القادم معاً' : "Let's light your next project"}
                </GradientText>
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm text-[color:var(--fg-muted)] md:text-base">
                {isRTL ? 'فريقنا جاهز لبدء المحادثة.' : 'Our team is ready to start the conversation.'}
              </p>
              <div className="mt-8 flex justify-center">
                <NeonButton asChild size="lg">
                  <Link href="/contact" data-cursor-label="Contact">
                    {isRTL ? 'تواصل معنا' : 'Get in touch'}
                    <ArrowUpRight className="size-5" />
                  </Link>
                </NeonButton>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
