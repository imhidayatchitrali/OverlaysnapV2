// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   optimizeDeps: {
// //     exclude: ['lucide-react'],
// //   },
// // });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'robots.txt'],
//       manifest: {
//         name: 'My App',
//         short_name: 'App',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#ffffff',
//         theme_color: '#000000',
//         icons: [
//           {
//             src: '/pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: '/pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ],
//   optimizeDeps: {
//     exclude: ['lucide-react']
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'vite.svg',
        'logo.png', // make sure this matches the actual filename
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
            src: 'images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],

      }
    })
  ]
})
