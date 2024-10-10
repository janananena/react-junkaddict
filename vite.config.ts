/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  preview: {
    port: 5173
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: './src/test/setup.js',
  }
})
