'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from '../theme/theme';

interface MUIThemeProviderProps {
  children: React.ReactNode;
  locale?: string;
}

const MUIThemeProvider: React.FC<MUIThemeProviderProps> = ({ children, locale = 'en' }) => {
  const isRTL = locale === 'ar';
  
  const theme = React.useMemo(
    () =>
      createTheme({
        ...muiTheme,
        direction: isRTL ? 'rtl' : 'ltr',
      }),
    [isRTL]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
