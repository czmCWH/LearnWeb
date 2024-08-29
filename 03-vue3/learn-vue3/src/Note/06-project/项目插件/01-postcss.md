# 安装 `postcss-px-to-viewport` 插件适配移动端

```shell
npm install postcss-px-to-viewport -D
// or
npm install postcss-px-to-viewport --save-dev
```

新增配置 `postcss.config.js` 文件：
```js
// postcss.config.js
// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
}
```

有一个控制台警告可忽略，或者使用 `postcss-px-to-viewport-8-plugin` 代替当前插件
注意事项：
1. vant组件库、css/scss/less、组件内style会转换
2. 但是元素行内样式不会转换


### 在 Vue3+ts 项目中新增 postcss.config.js 文件会报错
https://juejin.cn/post/7157168950990766087
https://segmentfault.com/a/1190000041809605
https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md

```
// 1、env.d.ts 文件中声明类型
declare module 'postcss-px-to-viewport'

// 2、vite.config.ts 文件配置

// @ts-ignore
import pxtovw from 'postcss-px-to-viewport'

const my_pxtovw = pxtovw({
  unitToConvert: 'px',
  viewportWidth: 375
})

export default defineConfig({
  plugins: [vue()],
  base: './',
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
})
```
