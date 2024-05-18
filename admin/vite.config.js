import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = import.meta.env.VITE_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  base,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
