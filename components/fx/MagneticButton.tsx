'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCanUseRichMotion } from '@/utils/motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
}

/**
 * Wraps any content in a magnet — it gently pulls toward the cursor on hover.
 * Great for CTAs and icon buttons. Disabled on mobile + reduced-motion.
 */
export function MagneticButton({ className, strength = 0.35, children, ...props }: Props) {
  const active = useCanUseRichMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block will-change-transform', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
