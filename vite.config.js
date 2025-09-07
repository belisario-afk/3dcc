import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: base must match the repo name on GitHub Pages (3dcc).
export default defineConfig({
  base: '/3dcc/',
  plugins: [react()],
  build: {
    // outDir: 'dist' is default; keep standard for gh-pages deploy script.
    sourcemap: true
  }
});