import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Eleva el umbral: Three.js es intrínsecamente grande; se separa en su chunk.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) return 'three'
          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei')
          ) {
            return 'r3f'
          }
          return undefined
        },
      },
    },
  },
})
