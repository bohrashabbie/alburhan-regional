'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCanUseRichMotion } from '@/utils/motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Scale while hovering. */
  scale?: number;
  /** Show a subtle gloss that tracks the cursor. */
  gloss?: boolean;
}

/**
 * 3D perspective tilt on hover. Great for bento / product / project cards.
 */
export function TiltCard({
  className,
  max = 10,
  scale = 1.02,
  gloss = true,
  children,
  ...props
}: Props) {
  const active = useCanUseRichMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 18,
  });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={active ? { scale } : undefined}
      style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
      className={cn('relative [perspective:1200px] will-change-transform', className)}
      {...(props as any)}
    >
      <div className="relative h-full w-full" style={{ transform: 'translateZ(0)' }}>
        {children}
        {gloss && active && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background:
                'linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 40%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default TiltCard;
