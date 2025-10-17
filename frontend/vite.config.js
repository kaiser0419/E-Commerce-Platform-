import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      }
    }
  },
  
  // FIX: Added the resolve block to help with module loading conflicts
  resolve: {
    // Tells Vite to prioritize known module entry points.
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
})