'use client';

import { useEffect, useState } from 'react';

/**
 * Respects the user's OS-level "reduce motion" preference.
 * Returns true when rich animations should be suppressed.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/**
 * True if the viewport is below the `breakpoint` (default 768 / md).
 * Used to downgrade heavy effects on phones.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return mobile;
}

/**
 * Convenience gate for rich / heavy effects.
 * Returns true when the browser is a powered-up desktop with motion allowed.
 */
export function useCanUseRichMotion(): boolean {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  return !reduced && !mobile;
}

/**
 * Standard framer-motion spring presets used across the redesign.
 */
export const SPRING = {
  gentle: { type: 'spring' as const, stiffness: 180, damping: 24 },
  crisp: { type: 'spring' as const, stiffness: 320, damping: 28 },
  bouncy: { type: 'spring' as const, stiffness: 260, damping: 16 },
};

export const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const EASE_OUT_BACK: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
