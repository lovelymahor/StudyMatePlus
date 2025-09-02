import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false, 
      failOnWarning: false, 
    }),
    svgr(),
  ],
  server: {
    port: 3000,
  },
});
