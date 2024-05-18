/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
