/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

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
      backgroundImage: {
        hero: "url('./src/assets/images/hero.png')",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      },
      animation: {
        fadeIn: "fadeIn 1500ms ease-in-out",
      },
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      boxShadow: {
        top: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      gridTemplateColumns: {
        footer: "2fr 1fr 1fr",
        custom: "repeat(auto-fill, minmax(240px, 1fr))",
        cartItem: "1fr 1.5fr 1fr 1fr 1fr 0.5fr",
      },
    },
  },
  plugins: [scrollbarHide],
};
