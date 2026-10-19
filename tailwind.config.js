module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-cream': '#FFF9F2',
        'brand-pink': '#FFDCE6',
        'brand-blue': '#C8F1FF',
        'brand-yellow': '#FFF1A8',
        'brand-text': '#1F2937'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
