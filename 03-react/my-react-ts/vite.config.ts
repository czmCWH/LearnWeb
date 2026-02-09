import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
// export default defineConfig({
//   base: './',
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [
//         postCssPxToViewport({
//           unitToConvert: 'px',    // 需要转换的单位
//           viewportWidth: 393,     // 设计稿的视口宽度（通常以 iPhone 6/7/8 为准）
//           unitPrecision: 5,       // 转换后保留的小数位数
//           propList: ['*'],        // 能转化为 vw 的属性列表
//           viewportUnit: 'vw',     // 希望使用的视口单位
//           fontViewportUnit: 'vw', // 字体使用的视口单位
//           selectorBlackList: ['.ignore-'], // 忽略的 CSS 类名
//           minPixelValue: 1,       // 设置最小转换数值，小于 1 则不转换
//           mediaQuery: false,      // 是否在媒体查询中也转换 px
//           exclude: [/node_modules/], // 忽略 node_modules 目录下的文件
//         }),
//       ],
//     },
//   },
//   server: {
//     host: true,
//     proxy: {
//       "^/dev-api": {
//         target: import.meta.env.VITE_API_BASE_URL,
//         ws: true,
//         /** 是否允许跨域 */
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/dev-api/, "")
//       }
//     }
//   },
// })


export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
   const env = loadEnv(mode, process.cwd());

  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // 配置 tailwindcss 插件，让项目编译时自动分析类名转换为对应的样式
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      proxy: {
        "^/dev-api": {
          target: env.VITE_API_BASE_URL,
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          rewrite: path => path.replace(/^\/dev-api/, "")
        }
      }
    },
  }
});