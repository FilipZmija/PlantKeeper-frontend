/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: { xs: "300px" },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in",
      },
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
        opacity: "opacity",
      },
    },
  },
  plugins: [],
};
