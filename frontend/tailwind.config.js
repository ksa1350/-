/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecf7ff',
          100: '#d3ebff',
          200: '#a8d8ff',
          300: '#7cc4ff',
          400: '#50b1ff',
          500: '#1b98ff',
          600: '#0076db',
          700: '#005ab4',
          800: '#00408a',
          900: '#002860',
        },
      },
    },
  },
  plugins: [],
};
