/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E5F2FF',
          DEFAULT: '#007AFF',
          dark: '#004AAD',
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

