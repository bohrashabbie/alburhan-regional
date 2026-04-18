'use client';

import * as React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient bar pinned at the top of the viewport
 * that tracks overall page scroll progress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[900] h-0.5 origin-left"
      style={{
        scaleX: width,
        background:
          'linear-gradient(90deg, var(--brand-burgundy-bright) 0%, var(--brand-gold) 50%, var(--brand-burgundy-bright) 100%)',
        boxShadow: '0 0 12px rgba(201,169,79,0.6)',
      }}
    />
  );
}

export default ScrollProgress;
