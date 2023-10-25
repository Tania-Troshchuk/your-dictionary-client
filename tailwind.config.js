/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3d': '1px 1px 1px rgba(0,0,0,0.6)'
      },
      fontFamily: {
        'kalam': ['Kalam', 'sans-serif']
      },
      colors: {
        'melrose': {
          50: '#f4f2ff',
          100: '#ebe8ff',
          200: '#dad4ff',
          300: '#beb2ff',
          400: '#ad99ff',
          500: '#7f55fd',
          600: '#6f32f5',
          700: '#6020e1',
          800: '#511abd',
          900: '#44189a',
          950: '#280c69',
        },
      },
      animation: {
        'bounce-1': 'bounce 1s infinite 0.33s',
        'bounce-2': 'bounce 1s infinite 0.67s',
      },
    },
  },
  plugins: [],
}

