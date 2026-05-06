/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: '#333d4d',
        'rose-gold': '#d4956e',
        'rose-gold-light': '#e8b89a',
        'charcoal-light': '#4a5568',
        'charcoal-dark': '#1a2332',
      },
      fontFamily: {
        retro: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
