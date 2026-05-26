export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#c084fc',
        accent: '#8b5cf6',
        dark: '#050505',
      },
      zIndex: {
        100: '100',
      },
    },
  },
  plugins: [],
};
