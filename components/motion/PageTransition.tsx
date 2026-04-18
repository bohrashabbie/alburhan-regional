'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useReducedMotion, EASE_EXPO } from '@/utils/motion';

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps route children so each navigation crossfades with a subtle rise.
 * Respects reduced motion.
 */
export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduced ? undefined : { opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE_EXPO }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
