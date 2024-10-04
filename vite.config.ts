import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  },
  server: {
    port: 5173
  },
  preview: {
    port: 5173
  }
})
