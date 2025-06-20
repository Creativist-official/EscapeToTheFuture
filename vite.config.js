import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Bitritto/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        "name": "Il laboratorio del mago Pdor",
        "short_name": "Mago Pdor",
        "description": "Questa è un Escape Room realizzata dai ragazzi del centro diurno 'I cento passi' di Bitritto.\nRiuscirai a portare il salvo Enrico?",
        "start_url": "/Bitritto/",
        "display": "fullscreen",
        "background_color": "#463B3E",
        "theme_color": "#F54900",
        "orientation": "landscape",
        "scope": "/Bitritto/",
        "lang": "it-IT",
        "dir": "ltr",
        "categories": ["education", "game"],
        "screenshots": [
          {
            "src": "/Bitritto/screenshot/1-desktop.png",
            "sizes": "1920x1080",
            "type": "image/png",
            "label": "Inizio del gioco",
            "platform": "desktop",
            "form_factor": "wide"
          },
          {
            "src": "/Bitritto/screenshot/1-mobile.png",
            "sizes": "874x402",
            "type": "image/png",
            "label": "Inizio del gioco",
            "platform": "mobile",
            "form_factor": "narrow"
          }
        ],
        "icons": [
          {
            "src": "logos/logo-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "logos/logo-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "logos/logo-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "logos/logo-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "logos/logo-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "logos/logo-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "logos/logo-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "logos/logo-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "logos/logo-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "logos/logo-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
      
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,mp3,jpg,jpeg,GIF}"],
        maximumFileSizeToCacheInBytes: 7000000, // Set limit to 7 MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@data": path.resolve(__dirname, "./src/data"),
    },
  },
  build: {
    outDir: "build",
  },
  assetsInclude: ["**/*.GIF"],
});
