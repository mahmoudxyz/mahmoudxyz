// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          // Add any other large dependencies here
          ui: [
            '@headlessui/react',
            'lucide-react',
            'framer-motion',
            'react-helmet-async'
          ],
          utils: [
            'date-fns',
            'lodash',
          ],
        },
      },
    },
  },
  define: {
    // Ensure process.env is available in development
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VITE_BASE_URL: JSON.stringify(process.env.VITE_BASE_URL),
    }
  },
});