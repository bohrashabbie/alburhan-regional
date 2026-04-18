'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/fx/GradientText';

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared hero band for every interior page (about, contact, projects,
 * services, products, legal, case-studies, careers).
 * Dark glass backdrop with a burgundy glow and gold hairline at the bottom.
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
      className={cn(
        'relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(194,50,74,0.28), transparent 55%), radial-gradient(ellipse at 90% 20%, rgba(201,169,79,0.2), transparent 50%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-60"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />
      <div
        className={cn(
          'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
          align === 'center' && 'text-center',
        )}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
          className={cn(
            'font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl',
            eyebrow ? 'mt-4' : '',
          )}
        >
          {typeof title === 'string' ? <GradientText>{title}</GradientText> : title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              'mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
      {/* Gold hairline divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 mx-auto h-px w-[80%] opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,169,79,0.6), transparent)',
        }}
      />
    </section>
  );
}

export default PageHero;
