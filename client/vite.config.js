import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/sitemap.xml': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/sitemap\.xml/, '/sitemap.xml'),
        },
      },
    },
    // server: {
    //   host: '0.0.0.0',
    //   port: 443,
    //   proxy: {
    //     '/sitemap.xml': {
    //       target: 'https://localhost:3000',
    //       changeOrigin: true,
    //       secure: true,
    //       rewrite: (path) => path.replace(/^\/sitemap\.xml/, '/sitemap.xml')
    //     }
    //   }
    // },

    plugins: [vue(), VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      // registerType: 'prompt',
      injectRegister: 'auto',
      manifest: {
        name: 'Theatrix - Discover Events, Buy Tickets, & More!',
        short_name: 'Theatrix',
        description: 'Discover Events, Buy Tickets, & More!',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: './',
        start_url: '/',
        icons: [
          {
            src: 'assets/pwa/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'assets/pwa/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'assets/pwa/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'assets/pwa/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
  
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg}'],
        globIgnores: [
          'node_modules/**/*',
          'sw.js',
          'workbox-*.js',
          '**/manifest-*.png',
        ],
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })],
  // optimizeDeps: {
  //   exclude: ['js-big-decimal']
  // }
  };
});
