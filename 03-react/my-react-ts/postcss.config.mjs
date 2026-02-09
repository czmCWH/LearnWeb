export default {
  plugins: {
    // 1. 先运行 tailwindcss 生成样式
    // 如果你在 vite.config.ts 用了 @tailwindcss/vite，这里就不需要 tailwindcss 插件了
    // "@tailwindcss/postcss": {},
    // 2. 再运行 pxtorem 转换单位
    'postcss-pxtorem': {
      rootValue: 16, // 基准值，对应于根元素的 font-size
      unitPrecision: 5, // 保留小数点位数
      propList: ['*', '!min-width', '!max-width'], // 排除 min-width 和 max-width 属性
      selectorBlackList: ['.ignore'], // 某些不想转换的类名
      replace: true, // 替换而不是添加备用属性
      mediaQuery: false, // 允许在媒体查询中转换 px
      minPixelValue: 2 // 小于 2px 的不转换
    }
  }
}