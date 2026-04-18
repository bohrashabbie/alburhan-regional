'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/utils/motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  radius?: number;
}

/**
 * A glass card that tracks the pointer with a soft light beam,
 * reinforcing the futuristic glass feeling.
 */
export function SpotlightCard({
  className,
  color = 'rgba(201, 169, 79, 0.35)',
  radius = 420,
  children,
  style,
  ...props
}: Props) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState({ x: -9999, y: -9999, opacity: 0 });

  const handleMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
      });
    },
    [reduced],
  );
  const handleLeave = React.useCallback(() => setPos((p) => ({ ...p, opacity: 0 })), []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'glass-surface transition-colors duration-500',
        className,
      )}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 60%)`,
          opacity: pos.opacity,
        }}
      />
      {children}
    </div>
  );
}

export default SpotlightCard;
