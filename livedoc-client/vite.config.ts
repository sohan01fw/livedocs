import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      buffer: "buffer/",
      stream: "stream-browserify",
      events: "events/",
      util: "util/",
    },
},
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
});
