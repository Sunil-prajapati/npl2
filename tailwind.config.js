/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#FFF6E0',
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        },
        silver: {
          light: '#F5F5F5',
          DEFAULT: '#C0C0C0',
          dark: '#A9A9A9',
        },
      },
    },
  },
  plugins: [],
}

