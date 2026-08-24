import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El sitio se publica en https://ruber9125.github.io/automatiza360-landing/
// asi que en el build los assets deben colgar de esa subcarpeta.
// En desarrollo seguimos en la raiz (http://localhost:5173/) para no molestar.
const BASE_PRODUCCION = '/automatiza360-landing/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PRODUCCION : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
