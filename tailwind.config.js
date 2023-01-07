/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      mdlrg: '950px',
    },
    extend: {
      height: {
        128: '60rem',
      },
    },
  },
  plugins: [],
};
