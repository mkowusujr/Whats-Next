const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-scondary)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-neutral)',
        "base-100": 'var(--color-base-100)',
        "base-300": 'var(--color-base-300)',
      },
      fontFamily: {
        sans: ['"Lato"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "fade-in": 'fadeIn 100ms ease-in',
        "fade-out": 'fadeOut 100ms ease-out',
        "slide-in-right": 'slideInRight 300ms ease-out',
        "slide-out-right": 'slideOutRight 300ms ease-out',
      },
    },

  },
  plugins: []
};
