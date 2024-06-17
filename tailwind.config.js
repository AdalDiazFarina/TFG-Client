/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '95': '95%',
        '22': '5.5rem',
        '22r': '22rem',
        '112': '28rem'
      },
      width: {
        '95': '95%',
        '50r': '50rem'
      },
      screens: {
        'xs': '300px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1370px'
      },
      maxWidth: {
        '0': '0',
        '15': '15rem'
      },
    },
  },
  plugins: [],
}

