import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ensure this matches repo name.
export default defineConfig({
  base: '/3dcc/',
  plugins: [react()],
  build: {
    sourcemap: true
  }
});