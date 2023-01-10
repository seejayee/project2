/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./*.html', './views/*.handlebars', './views/layouts/*.handlebars'],
  theme: {
    screens: {
      sm: '480px',
      mdlrg: '950px',
    },
    extend: {
      height: {
        128: '60rem',
      },
    },
    textShadow: {
      sm: '0 0 0.5em rgb(6 78 59 / var(--tw-bg-opacity))',
    },
    dropShadow: {
      button: ' 0 0 0.5em rgb(6 78 59 / var(--tw-bg-opacity))',
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
