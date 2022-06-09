module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'big': ['"Fredoka One"', 'cursive'],
        'preview': ['"Montserrat"', 'sans-serif'],
        'content': ['"Poppins One"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
