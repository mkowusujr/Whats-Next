const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
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
        "fade-in": 'fadeIn 150ms ease-in',
        "fade-out": 'fadeOut 150ms ease-out',
        "slide-in-Right": 'slideInRight 150ms ease-out',
        "slide-out-right": 'slideOutRight 150ms ease-out',
      },
    },

  },
  plugins: []
};
