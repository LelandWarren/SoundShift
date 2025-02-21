import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    open: true, // Automatically opens the browser
  },
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
