/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#87bdf0',
        secondary: '#2DA6FF14',
        tertiary: '#0D5D59',
        caregray: '#616161',
      },
    },
  },
  plugins: [],
}
