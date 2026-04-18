'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Lightweight scroll-reveal using a single IntersectionObserver per instance.
 * Uses CSS transitions instead of framer-motion — near-zero JS overhead.
 */
export function ScrollReveal({
  direction = 'up',
  distance = 24,
  delay = 0,
  duration = 0.5,
  once = true,
  className,
  children,
  ...props
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const axis =
    direction === 'up' ? `translateY(${distance}px)` :
    direction === 'down' ? `translateY(-${distance}px)` :
    direction === 'left' ? `translateX(${distance}px)` :
    direction === 'right' ? `translateX(-${distance}px)` : 'none';

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : axis,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
