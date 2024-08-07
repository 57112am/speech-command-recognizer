// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add other file paths as needed
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
      backgroundImage: {
        'home-background': "url('https://cxscoop.com/wp-content/webp-express/webp-images/uploads/2022/11/7-Use-Cases-for-Speech-Analytics-1440x1072.jpg.webp')",
      },
    },
  },
  plugins: [require("daisyui")],
}
