import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 此文件中表示 基于 vite 的相关配置
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 指明 Vite 打包工具打包的是 Vue 项目
    // 因为 vite 可以打包很多类型的项目，比如：svelte、react
    vue()
  ],
  resolve: {
    // alias 取别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
