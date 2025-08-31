import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ここが重要！
    port: 5173, // 任意のポート（デフォルトは5173）
  },
})
