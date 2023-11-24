/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}","./public/ **/.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'mblue': '#00aff5',
        'tmain':'#054652',
        'tsec':'#6f8b90',
        'tthird':'#ededed'
      },
      backgroundImage: {
        'heroBg': "url('/client/src/assets/banner.svg')",
    },
  },
  plugins: [],
}
}

