/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: "#E14658",
      dark: "#13131A",
      grey: "#252D3C",
      "dark-third":"#292932",
      "dark-second": "#1C1C24",
      white: "#ffffff",
      "text-dark":"#97ABC0"
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-transparent": {
          borderRadius: "5px",
          padding: "8px 12px",
          fontSize: "14px",
          transition: "ease 0.5s all",
          border: "1px solid transparent",
          fontWeight: "600",
          "&:hover": {
            borderColor: "white",
          },
        },
        ".btn-red": {
          backgroundColor: "#E14658",
          color: "#fff",
          padding: "8px 12px",
          fontSize: "14px",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
          borderRadius: "5px",
          border: "1px solid #E14658",
          transition: "ease 0.3s all",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "#b12435",
            borderColor: "#b12435",
          },
        },
        ".back-transparent": {
          background:"none"
        }
      });
    }),
  ],
};
