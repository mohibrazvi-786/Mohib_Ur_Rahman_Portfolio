import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
      resolve: {
        alias: [
          { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ],
      },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation'
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-3d'
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
