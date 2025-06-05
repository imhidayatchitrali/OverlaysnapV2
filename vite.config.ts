
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'vite.svg',
        'logo.png',
        'logo-192x192.png',
        'logo-512x512.png'
      ],
      manifest: {
        name: 'SnapOverlay',
        short_name: 'App',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ]
})
