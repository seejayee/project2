/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './views/*.handlebars', './views/layouts/*.handlebars'],
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
