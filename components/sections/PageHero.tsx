'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared page head for every interior screen (about, contact, projects,
 * services, legal, case studies, careers).
 *
 * Matched to the catalogue hero so the whole site opens the same way: a
 * blueprint grid masked to nothing before it reaches the type, one shaft of
 * warm light, and the title in ink rather than a gradient. Entrances are CSS
 * animations offset by --enter-delay, so they wait out the intro curtain
 * instead of playing behind it — and no Framer Motion is pulled into the
 * bundle for what three keyframes can do.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
  className,
}: Props) {
  return (
    <section
      className={cn('relative overflow-hidden border-b border-line', className)}
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        style={{
          maskImage: 'radial-gradient(110% 80% at 50% 0%, #000 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(110% 80% at 50% 0%, #000 10%, transparent 75%)',
        }}
      />
      <div aria-hidden className="lumen-wash" />

      <div
        className={cn('wrap relative py-16 md:py-24', align === 'center' && 'text-center')}
      >
        {eyebrow && (
          <p className={cn('kicker enter-fade', align === 'center' && 'justify-center')}>
            {eyebrow}
          </p>
        )}

        <h1
          className={cn('t-h1 max-w-3xl enter-up', eyebrow && 'mt-5', align === 'center' && 'mx-auto')}
          style={{ '--d': '90ms' } as React.CSSProperties}
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn('t-lead enter-up mt-5 max-w-2xl', align === 'center' && 'mx-auto')}
            style={{ '--d': '200ms' } as React.CSSProperties}
          >
            {description}
          </p>
        )}

        {children && (
          <div className="enter-up mt-8" style={{ '--d': '320ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
