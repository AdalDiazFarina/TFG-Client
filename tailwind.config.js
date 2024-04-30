/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '95': '95%',
      },
      width: {
        '95': '95%',
      },
      screens: {
        'xs': '300px',
        'sm': '640px',  // Small devices (tablets and large phones)
        'md': '768px',  // Medium devices (landscape tablets)
        'lg': '1024px', // Large devices (desktops)
        'xl': '1280px', // Extra large devices (large desktops)
      },
    },
  },
  plugins: [],
}

