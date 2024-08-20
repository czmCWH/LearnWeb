import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 1、创建 pinia 实例
const pinia = createPinia()
// 2、使用 pinia 插件
pinia.use(persist)

export default pinia

// 简写：把 counter 里面的所有按需导出
export * from './modules/counter'
