module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#c084fc',
        accent: '#8b5cf6',
        dark: '#050505',
      },
      willChange: {
        'gpu': 'transform, opacity',
      },
    },
  },
  plugins: [],
};
