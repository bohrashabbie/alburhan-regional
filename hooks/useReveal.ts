'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight Intersection Observer hook for scroll-reveal animations.
 * Returns a ref to attach to the target element and a boolean `visible`
 * that becomes true (and stays true) once the element enters the viewport.
 *
 * Pair with the `.reveal` / `.reveal-left` CSS utility classes in globals.css:
 *   <div ref={ref} className={`reveal ${visible ? 'on' : ''}`} />
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}
