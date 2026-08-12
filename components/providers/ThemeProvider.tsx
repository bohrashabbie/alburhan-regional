'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

/**
 * Light and dark are both first-class here — the token set in globals.css is
 * authored twice, not derived. `system` is the default so the site matches
 * whatever the visitor's OS already decided, and the choice persists under the
 * `theme` key that the boot script in app/layout.tsx reads before first paint.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      // The body transition in globals.css handles the crossfade; letting
      // next-themes kill transitions would make the switch snap.
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
