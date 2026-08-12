'use client';

import * as React from 'react';

/**
 * Route-level loading state, used by `app/[locale]/loading.tsx`.
 *
 * Deliberately the quiet sibling of the first-load curtain: same canvas, same
 * mono metadata, but one indeterminate hairline sweeping across the seam
 * instead of the full sequence. A route change is not an arrival, so it
 * doesn't get an arrival animation.
 */
export function LoadingScreen({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[700] grid place-items-center bg-canvas">
      <div className="flex w-full max-w-xs flex-col items-center gap-5 px-6">
        <span className="t-mono text-[0.625rem] text-ink-4">{label}</span>

        {/* Indeterminate hairline */}
        <span className="relative block h-px w-full overflow-hidden bg-line">
          <span
            className="absolute inset-y-0 w-1/3 bg-accent"
            style={{ animation: 'ls-sweep 1.25s var(--ease-in-out-expo) infinite' }}
          />
        </span>

        <style>{`@keyframes ls-sweep{
          0%{transform:translateX(-120%)}
          100%{transform:translateX(420%)}
        }`}</style>
      </div>
    </div>
  );
}

export default LoadingScreen;
