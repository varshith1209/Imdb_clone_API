const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(99,102,241,0.2), transparent 60%)',
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
          muted: '#a5b4fc',
        },
        slate: {
          950: '#030712',
        },
      },
      boxShadow: {
        glow: '0 25px 65px rgba(99, 102, 241, 0.35)',
      },
    },
  },
  plugins: [],
};


