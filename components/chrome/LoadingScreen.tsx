'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { GridBackdrop } from '@/components/fx/GridBackdrop';

/**
 * Full-viewport loading screen with the brand monogram and an
 * animated neon ring. Used by `app/[locale]/loading.tsx`.
 */
export function LoadingScreen({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-[color:var(--bg-base)]">
      <GridBackdrop />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="relative grid size-28 place-items-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[color:var(--brand-gold)]/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-2 rounded-full border border-dashed border-[color:var(--brand-burgundy-bright)]/60"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          />
          <span className="text-gradient-brand font-display text-2xl font-bold tracking-[0.3em]">
            AB
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--fg-muted)]">
          <span>{label}</span>
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            •••
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;
