'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

/**
 * Two-state switch (light ⇄ dark) with a sliding thumb. `system` is the
 * default until the visitor touches this, at which point they've expressed a
 * preference and we store it.
 *
 * Rendered as a real <button role="switch"> so screen readers and keyboards
 * get the semantics for free. The icons cross-fade rather than swap, which
 * keeps the control from flickering on every toggle.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The server can't know the resolved theme, so the switch renders in its
  // light position and corrects on mount. Without this the markup mismatches
  // and React warns on every hydration.
  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`group relative inline-flex h-8 w-[3.25rem] shrink-0 items-center rounded-full border border-line bg-surface transition-colors duration-300 hover:border-line-2 ${className}`}
    >
      {/* Thumb */}
      <span
        aria-hidden
        className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-canvas shadow-[var(--shadow-1)] transition-[left] duration-[420ms] [transition-timing-function:var(--ease-out-expo)]"
        style={{ left: isDark ? 'calc(100% - 1.625rem)' : '0.125rem' }}
      />
      {/* Icons sit above the thumb and cross-fade */}
      <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-between px-[0.45rem]">
        <Sun
          className="size-3.5 transition-opacity duration-300"
          style={{ opacity: isDark ? 0.35 : 1, color: isDark ? 'var(--ink-4)' : 'var(--accent)' }}
        />
        <Moon
          className="size-3.5 transition-opacity duration-300"
          style={{ opacity: isDark ? 1 : 0.35, color: isDark ? 'var(--accent)' : 'var(--ink-4)' }}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
