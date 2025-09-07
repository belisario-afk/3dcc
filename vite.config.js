import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: Match this to the actual GitHub repository name.
// If your repo is named 3dcc (as the URL suggests), keep '/3dcc/'.
export default defineConfig({
  base: '/3dcc/',
  plugins: [react()],
  build: {
    sourcemap: true
  }
});