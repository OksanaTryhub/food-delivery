/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
      },
      colors: {
        dark: {
          1: "#473a3f",
          popup: "rgba(71, 58, 63, 0.7)",
        },
        light: {
          1: "#f9f9fc",
        },
        accent: {
          1: "#ea2324",
          hover: "rgba(234,35,36, 0.7)",
        },
      },
      fontSize: {
        responsive: "max(2vw, 30px)",
        responsive2: "max(2vw, 18px)",
      },
      gridTemplateColumns: {
        layout: "1fr 4fr",
        // custom: "repeat(auto-fill, minmax(240px, 1fr))",
        // cartItem: "1fr 1.5fr 1fr 1fr 1fr 0.5fr",
        // cartItemXS: "1fr 1.5fr 1fr ",
      },
    },
  },
  plugins: [],
};
