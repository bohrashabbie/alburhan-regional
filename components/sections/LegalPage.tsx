'use client';

import * as React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { cn } from '@/lib/utils';

export interface LegalSection {
  title: string;
  content: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  lastUpdated?: string;
  sections: LegalSection[];
}

/**
 * Shared template for Terms / Privacy / Cookies. Renders a PageHero
 * followed by a left-rail TOC and a glass card with all sections.
 */
export function LegalPage({
  eyebrow = 'Legal',
  title,
  description,
  lastUpdated,
  sections,
}: Props) {
  const slugOf = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <section className="relative pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-12 lg:px-8">
          {/* Sticky TOC (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                Contents
              </p>
              <nav className="flex flex-col gap-1 border-s border-[color:var(--glass-border)] ps-3">
                {sections.map((s) => (
                  <a
                    key={s.title}
                    href={`#${slugOf(s.title)}`}
                    className="text-sm text-[color:var(--fg-muted)] transition-colors hover:text-[color:var(--brand-gold)]"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div>
            {lastUpdated && (
              <ScrollReveal>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--fg-subtle)]">
                  Last updated · {lastUpdated}
                </p>
              </ScrollReveal>
            )}
            <ScrollReveal>
              <GlassCard intensity="strong" className="p-6 md:p-10">
                {sections.map((s, i) => (
                  <article
                    key={s.title}
                    id={slugOf(s.title)}
                    className={cn(
                      'scroll-mt-28',
                      i < sections.length - 1 &&
                        'mb-8 border-b border-[color:var(--glass-border)] pb-8',
                    )}
                  >
                    <h2 className="font-display text-xl font-semibold text-[color:var(--brand-gold-bright)] md:text-2xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 whitespace-pre-line text-sm leading-[1.85] text-[color:var(--fg-muted)] md:text-base">
                      {s.content}
                    </p>
                  </article>
                ))}
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default LegalPage;
