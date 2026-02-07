
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  define: {
    '__GEMINI_API_KEY__': mode === 'production' ? 'undefined' : JSON.stringify(process.env.VITE_GEMINI_API_KEY || '')
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}));
