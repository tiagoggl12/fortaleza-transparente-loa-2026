import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // Base path: subcaminho apenas no GitHub Pages (via env GITHUB_PAGES);
    // em outros hosts (Railway, Docker) os assets ficam na raiz.
    base: env.GITHUB_PAGES === 'true' ? '/fortaleza-transparente-loa-2026/' : '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    }
  };
});
