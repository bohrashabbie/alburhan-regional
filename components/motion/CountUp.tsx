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
 * Respects reduced-motion (shows final value immediately).
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
  const mv = useMotionValue(reduced ? to : from);
  const rounded = useTransform(mv, (v) => {
    const n = Number.isFinite(v) ? v : 0;
    return prefix + n.toFixed(decimals) + suffix;
  });

  React.useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(mv, to, { duration, ease: [0.19, 1, 0.22, 1] });
    return () => controls.stop();
  }, [inView, mv, to, duration, reduced]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

export default CountUp;
