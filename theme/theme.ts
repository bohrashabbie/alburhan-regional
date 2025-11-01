// Centralized theme configuration for the application
export const theme = {
  colors: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626', // Mid dark red
      600: '#b91c1c',
      700: '#991b1b',
      800: '#7f1d1d',
      900: '#450a0a',
    },
    secondary: {
      50: '#ffffff',
      100: '#fefefe',
      200: '#fdfdfd',
      300: '#fcfcfc',
      400: '#fafafa',
      500: '#f8f8f8',
      600: '#f0f0f0',
      700: '#e8e8e8',
      800: '#d8d8d8',
      900: '#c8c8c8',
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626',
      600: '#b91c1c',
      700: '#991b1b',
      800: '#7f1d1d',
      900: '#450a0a',
    },
    neutral: {
      50: '#ffffff',
      100: '#fafafa',
      200: '#f5f5f5',
      300: '#e5e5e5',
      400: '#d4d4d4',
      500: '#a3a3a3',
      600: '#737373',
      700: '#525252',
      800: '#404040',
      900: '#171717',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626',
      600: '#b91c1c',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
};

// MUI Theme configuration
export const muiTheme = {
  palette: {
    primary: {
      main: theme.colors.primary[500], // Mid dark red
      light: theme.colors.primary[300],
      dark: theme.colors.primary[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: theme.colors.secondary[500], // White/light gray
      light: theme.colors.secondary[300],
      dark: theme.colors.secondary[700],
      contrastText: theme.colors.primary[500],
    },
    error: {
      main: theme.colors.error[500],
      light: theme.colors.error[300],
      dark: theme.colors.error[700],
    },
    warning: {
      main: theme.colors.warning[500],
      light: theme.colors.warning[300],
      dark: theme.colors.warning[700],
    },
    success: {
      main: theme.colors.success[500],
      light: theme.colors.success[300],
      dark: theme.colors.success[700],
    },
    background: {
      default: '#ffffff', // Pure white background
      paper: '#ffffff',
    },
    text: {
      primary: theme.colors.primary[500], // Mid dark red text
      secondary: theme.colors.neutral[600],
    },
  },
  typography: {
    fontFamily: theme.typography.fontFamily.sans.join(','),
    h1: {
      fontSize: theme.typography.fontSize['4xl'][0],
      fontWeight: theme.typography.fontWeight.bold,
    },
    h2: {
      fontSize: theme.typography.fontSize['3xl'][0],
      fontWeight: theme.typography.fontWeight.bold,
    },
    h3: {
      fontSize: theme.typography.fontSize['2xl'][0],
      fontWeight: theme.typography.fontWeight.semibold,
    },
    h4: {
      fontSize: theme.typography.fontSize.xl[0],
      fontWeight: theme.typography.fontWeight.semibold,
    },
    h5: {
      fontSize: theme.typography.fontSize.lg[0],
      fontWeight: theme.typography.fontWeight.medium,
    },
    h6: {
      fontSize: theme.typography.fontSize.base[0],
      fontWeight: theme.typography.fontWeight.medium,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: parseInt(theme.borderRadius.lg),
  },
};
