/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cartoon: ["Comic Neue", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
