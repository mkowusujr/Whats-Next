const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        "base-100": 'var(--color-base-100)',
        "base-200": 'var(--color-base-200)',
        "interactive-300": 'var(--color-interactive-300)',
        "interactive-400": 'var(--color-interactive-400)',
        "interactive-500": 'var(--color-interactive-500)',
        "borders-600": 'var(--color-borders-600)',
        "borders-700": 'var(--color-borders-700)',
        "borders-800": 'var(--color-borders-800)',
        "solid-900": 'var(--color-solid-900)',
        "solid-1000": 'var(--color-solid-1000)',
        "accessible-1100": 'var(--color-accessible-1100)',
        "accessible-1200": 'var(--color-accessible-1200)'
      },
      fontFamily: {
        sans: ['"Lato"', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}