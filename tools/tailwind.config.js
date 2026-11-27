/** Tailwind build config. Run from the project root:
 *  npx tailwindcss@3.4.17 -c tools/tailwind.config.js -i tools/tailwind.input.css -o tailwind.css --minify
 */
module.exports = {
  content: ['./index.html', './app.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      }
    }
  }
};
