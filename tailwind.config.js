/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-beat': 'pulse-beat 0.1s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-beat': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color)' },
          '100%': { boxShadow: '0 0 10px var(--tw-shadow-color), 0 0 40px var(--tw-shadow-color)' },
        },
      },
    },
  },
  plugins: [],
}
