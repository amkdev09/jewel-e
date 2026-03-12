import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBase = env.VITE_API_BASE_URL || 'http://localhost:5000'

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ['qrcode', 'html2canvas'],
    },
    build: {
      outDir: "dist",
    },
    server: {
      historyApiFallback: true,
      hmr: {
        overlay: false,
      },
      // Proxy API (and socket) to backend to avoid CORS in development.
      // Browser sees same-origin requests; Vite forwards to the real API.
      proxy: {
        '/api': {
          target: apiBase,
          changeOrigin: true,
        },
        '/socket.io': {
          target: apiBase,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  }
})
