import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "index.html"
      }
    }
  },
  publicDir: "public" // Ensures manifest.json and background.js are copied over
});
