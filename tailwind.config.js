const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-black': '#0D2438',
        'ternary-dark': '#1E3851',
      },
      minHeight: {
        '768': '768px',
      },
      container: {
        padding: {
          DEFAULT: '0.4rem',
          sm: '2rem',
          lg: '5rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      height: {
        '186': '186px',
        '290': '290px',
        '203': '203px',
        '242': '242px',
        '1024': '1024px',
      },
      screens: {
        ssm: '370px',

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
