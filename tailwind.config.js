/** @type {import('tailwindcss').Config} */
const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    './tailwind-theme.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald : ['Oswald'],
        montserrat : ['Montserrat'],
        tektur : ['Tektur'],
      }
    },
  },
  plugins: [
    FormKitVariants,
    require('@headlessui/tailwindcss'),
    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' })

  ],
}

