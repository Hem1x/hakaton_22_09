/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#EB0C00',
        dark: '#391B94',
        light: '#f5f5f5',
      },
      dropShadow: {
        neon: '0px 0px 10px #ccc',
      },
      boxShadow: {
        block: '0px 4px 4px 0px #0000002B',
      },
    },
  },
  plugins: [],
};
