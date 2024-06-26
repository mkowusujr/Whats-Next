/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  daisyui: {
    themes: ["nord"]
  },
  theme: {
    extend: {
      colors: {
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
}