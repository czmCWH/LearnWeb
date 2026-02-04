// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // 负责解析 Tailwind 指令和类名
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,      // 设计稿宽度
      unitPrecision: 3,        // px转vw后保留的小数位数
      viewportUnit: 'vw',      // 指定转换单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的选择器
      minPixelValue: 1,        // 小于或等于1px不转换
      mediaQuery: false,       // 允许在媒体查询中转换px
      exclude: [/node_modules/], // 排除库文件（防止第三方UI如Vant变小）
    },
    'autoprefixer': {},        // 自动补全浏览器前缀
  }
}
