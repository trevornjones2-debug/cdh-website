/** Tailwind settings for the CDH site. Scans the page template and form script for class names. */
module.exports = {
  content: ['../index.html', '../assets/quote-form.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
};
