# 一、Tailwind css

tailwindcss 官网：<https://tailwindcss.com/>，<https://www.tailwindcss.cn/>

## 学习教程

<https://juejin.cn/post/7363534953651257353#heading-7>，听说你还不会 Tailwind CSS（基础·上篇）👍👍👍
<https://www.bilibili.com/video/BV1rcCbB4EWS>，Tailwind CSS 全链路教程，讲的很啰嗦。
<https://www.bilibili.com/cheese/play/ep1174082>，B站，tailwind CSS 快速前端开发入门到精通，需付费17元学习。视频代码<https://github.com/yangwawa0323/learning-tailwind-css>


### 1、主流CSS样式实现方案：
- 手写原生 CSS & CSS 预处理器（Sass/Less）；
- CSS-in-JS，如：Styled-components 停止维护、Emotion；
- Utility-First CSS，原子化CSS，如：Tailwind、UnoCSS


原子化CSS：定义一些细粒度的 class，叫做原子 class，然后在 html 里直接引入这些原子化的 class。

# 二、在项目中集成 Tailwindcss

参考官网：<https://tailwindcss.com/docs/installation/using-vite>

react19+vite+TypeScript
```shell
$ npm install tailwindcss @tailwindcss/vite
```

在 VS Code 中安装 Tailwind CSS 插件：`Tailwind CSS IntelliSense`，<https://tailwindcss.com/docs/editor-setup>。


## Tailwind CSS 应用框架
<https://github.com/shadcn-ui/ui>，shadcn-ui/ui，是一个基于 React 和 Tailwind CSS 构建的高质量 UI 组件库，它不是 npm 包，而是可复制粘贴的代码片段集合。


