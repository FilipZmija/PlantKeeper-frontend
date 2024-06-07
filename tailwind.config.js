const { red, grey } = require("@mui/material/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "dark-green": "#88AB8E",
        green: "#AFC8AD",
        lightgreen: "#E1F0DA",
        beige: "#EEE7DA",
        "light-brown": "#E8DFCA",
        "light-mint": "#f0f2eb",
        "light-grey": "#F2F1EB",
        "text-green": "#1A4D2E",
      },
      transitionProperty: {
        "min-w": "min-width",
        "min-h": "min-height",
      },
    },
  },
  plugins: [],
};
