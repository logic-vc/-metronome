/**
 * Design System for Metronome App
 * Cyan blue primary color with magenta accent
 * Dark theme optimized for focus and eye comfort
 */

export const colors = {
  primary: {
    DEFAULT: '#00FFFF',
    50: '#E0FFFF',
    100: '#B3FFFF',
    200: '#80FFFF',
    300: '#4DFFFF',
    400: '#1AFFFF',
    500: '#00FFFF',
    600: '#00CCCC',
    700: '#009999',
    800: '#006666',
    900: '#003333',
  },
  accent: {
    DEFAULT: '#FF00FF',
    50: '#FFE0FF',
    100: '#FFB3FF',
    200: '#FF80FF',
    300: '#FF4DFF',
    400: '#FF1AFF',
    500: '#FF00FF',
    600: '#CC00CC',
    700: '#990099',
    800: '#660066',
    900: '#330033',
  },
  bg: {
    dark: '#0A0E1A',
    darker: '#05070F',
    card: '#0F1420',
    elevated: '#151A2A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0',
    muted: '#4A5568',
  },
} as const

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const

export const animation = {
  duration: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const

export const shadows = {
  glow: {
    primary: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
    accent: '0 0 20px rgba(255, 0, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.1)',
    subtle: '0 0 10px rgba(0, 255, 255, 0.15)',
  },
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Metronome-specific design tokens
export const metronome = {
  dial: {
    size: {
      sm: '200px',
      md: '280px',
      lg: '320px',
    },
    strokeWidth: 8,
    tickWidth: 2,
  },
  beatPad: {
    size: {
      sm: '40px',
      md: '56px',
      lg: '64px',
    },
    gap: '12px',
  },
  bpm: {
    min: 40,
    max: 300,
    default: 120,
  },
} as const
