/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'input': '0px 3px 5px 2px rgba(0,0,0,0.37)',
      }
    },
  },
  plugins: [],
};