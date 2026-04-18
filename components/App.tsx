'use client';

import React from 'react';
import AppShell from './AppShell';

/**
 * Thin backwards-compat wrapper. The real shell lives in `AppShell.tsx`.
 * Kept so any legacy direct import of `components/App` keeps working.
 */
const App: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell>{children}</AppShell>
);

export default App;
