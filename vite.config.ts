import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-seo-files',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/ads.txt' || req.url?.startsWith('/ads.txt?')) {
              const publicPath = path.resolve(__dirname, 'public/ads.txt');
              const rootPath = path.resolve(__dirname, 'ads.txt');
              const target = fs.existsSync(publicPath) ? publicPath : (fs.existsSync(rootPath) ? rootPath : null);
              if (target) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'public, max-age=3600');
                return res.end(fs.readFileSync(target, 'utf-8'));
              }
            }

            if (req.url === '/sitemap.xml' || req.url?.startsWith('/sitemap.xml?')) {
              const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
              if (fs.existsSync(sitemapPath)) {
                res.setHeader('Content-Type', 'application/xml; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'public, max-age=3600');
                return res.end(fs.readFileSync(sitemapPath, 'utf-8'));
              }
            }

            if (req.url === '/robots.txt' || req.url?.startsWith('/robots.txt?')) {
              const robotsPath = path.resolve(__dirname, 'public/robots.txt');
              if (fs.existsSync(robotsPath)) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'public, max-age=3600');
                return res.end(fs.readFileSync(robotsPath, 'utf-8'));
              }
            }

            if (req.url === '/favicon.svg' || req.url?.startsWith('/favicon.svg?')) {
              const faviconPath = path.resolve(__dirname, 'public/favicon.svg');
              if (fs.existsSync(faviconPath)) {
                res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'public, max-age=3600');
                return res.end(fs.readFileSync(faviconPath, 'utf-8'));
              }
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
