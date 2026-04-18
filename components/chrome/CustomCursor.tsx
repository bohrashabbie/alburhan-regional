'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCanUseRichMotion } from '@/utils/motion';

const SELECTORS = 'a, button, [role="button"], input, textarea, select, .cursor-pointer';

/**
 * Desktop-only custom cursor:
 *   · small filled gold dot that tracks instantly
 *   · larger burgundy ring that trails with a spring
 *   · expands + gains text when hovering interactive elements
 */
export function CustomCursor() {
  const active = useCanUseRichMotion();
  const [label, setLabel] = React.useState('');
  const [hovering, setHovering] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.3 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.3 });

  React.useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add('cursor-none-important');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive = el.closest?.(SELECTORS);
      if (interactive) {
        setHovering(true);
        const data = (interactive as HTMLElement).getAttribute('data-cursor-label');
        setLabel(data || '');
      } else {
        setHovering(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('cursor-none-important');
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--brand-gold-bright)]"
        style={{ x, y, boxShadow: '0 0 12px rgba(201,169,79,0.8)' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--brand-burgundy-bright)] backdrop-blur-[1px]"
        style={{
          x: rx,
          y: ry,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          backgroundColor: hovering ? 'rgba(194,50,74,0.14)' : 'transparent',
          transition: 'width 180ms ease-out, height 180ms ease-out, background-color 180ms ease-out',
          boxShadow: hovering ? 'var(--neon-burgundy)' : undefined,
        }}
      >
        {label && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-widest text-[color:var(--fg-default)]">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}

export default CustomCursor;
