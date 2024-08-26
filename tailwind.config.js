/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gg-rich-black': '#0D1F2D',
        'gg-robin-egg-blue': '#06BCC1',
        'gg-sunglow': '#FFD23F',
        'gg-lavender-blush': '#fffdfc',
        'gg-cinnabar': '#F4442E',
      },
    },
  },
  plugins: [],
}