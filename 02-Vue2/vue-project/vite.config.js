// Vue 配置文件

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    optimizeDeps: {
      include: ['linked-dep'],
    },
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
	// 配置打包后，云端路由访问的页面路径
    base: command === 'build'? '/m/ios/pay1/' : './',
  }
})
