import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Absolute site URL for social-share (og/twitter) image tags.
// Set SITE_URL at build time (e.g. on Vercel/Netlify) so WhatsApp & co
// get an absolute image url. Unset → relative paths (fine for local + most
// scrapers, but WhatsApp needs the absolute form).
const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/$/, "");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-site-url",
      transformIndexHtml(html) {
        return html.replaceAll("__SITE__", SITE_URL);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
