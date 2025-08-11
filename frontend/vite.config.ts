import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; //Tailwind v4 official vite plugin(no tailwind.config.js needed)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], //activates Tailwind v4 pipeline(reads @import "tailwindcss" in CSS)
});
