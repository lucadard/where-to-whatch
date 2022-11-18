/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        light: 'rgb(248 250 252)',
        dark: 'rgb(25 39 52)'
      }
    }
  },
  plugins: []
}
