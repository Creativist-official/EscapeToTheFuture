import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/EscapeToTheFuture/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      "@scenes": path.resolve(__dirname, './src/screens'),
    },
  },
  build: {
    outDir: 'build'
  },
  assetsInclude: ['**/*.GIF']
})
