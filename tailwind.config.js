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
        scan: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
        },
        scanLine: { "0%": { top: 0 }, "100%": { top: "100%" } },
      },
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0px 0px 50px 30px rgba(26,77,46, 1)",
      },
      animation: {
        scan: "scan 3s infinite",
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in",
        scan: "scan 3s linear infinite",
        line: "scan 2s linear infinite",
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
        "lightest-green": "#F0FAF0",
      },
      transitionProperty: {
        "min-w": "min-width",
        "min-h": "min-height",
        "max-w": "max-width",
        "max-h": "max-height",
        opacity: "opacity",
      },
    },
  },
  plugins: [],
};
