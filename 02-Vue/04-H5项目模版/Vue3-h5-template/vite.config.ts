import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import { createHtmlPlugin } from 'vite-plugin-html'
// @ts-ignore
import pxtovw from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())

  // 移动端适配
  const my_pxtovw = pxtovw({
    unitToConvert: 'px',
    viewportWidth: 375
  })

  return {
    plugins: [
      vue(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || 'false'
          }
        }
      })
    ],
    base: './', // 根目录 => import.meta.env.BASE_URL
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [my_pxtovw]
      }
    }
  }
})
