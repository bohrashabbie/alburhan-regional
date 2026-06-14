'use client';

import * as React from 'react';
import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion';
import { useReducedMotion } from '@/utils/motion';

interface Props {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Counts from `from` up to `to` as soon as the element enters view.
 * Initialises at `to` so SSR and pre-hydration show the final value, not "0+".
 * Respects reduced-motion (shows final value immediately, no animation).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  // Start at `to` so the server-rendered HTML and initial paint show the real
  // value instead of "0+". The animation resets to `from` on mount then counts up.
  const mv = useMotionValue(to);
  const rounded = useTransform(mv, (v) => {
    const n = Number.isFinite(v) ? v : 0;
    return prefix + n.toFixed(decimals) + suffix;
  });

  React.useEffect(() => {
    if (reduced || !inView) return;
    mv.set(from);
    const controls = animate(mv, to, { duration, ease: [0.19, 1, 0.22, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

export default CountUp;
