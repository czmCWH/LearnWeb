# Tailwind css

tailwindcss 官网：<https://tailwindcss.com/>，<https://www.tailwindcss.cn/>

## 学习视频：
<https://www.bilibili.com/video/BV1rcCbB4EWS>，Tailwind CSS 全链路教程，讲的很啰嗦。
<https://www.bilibili.com/cheese/play/ep1174082>，B站，tailwind CSS 快速前端开发入门到精通，需付费17元学习。


### 1、主流CSS样式实现方案：
- 手写原生 CSS & CSS 预处理器（Sass/Less）；
- CSS-in-JS，如：Styled-components 停止维护、Emotion；
- Utility-First CSS，原子化CSS，如：Tailwind、UnoCSS


### 2、原子化CSS
原子化CSS：定义一些细粒度的 class，叫做原子 class，然后在 html 里直接引入这些原子化的 class。


### 3、在 react19+vite+TypeScript 项目集成 Tailwindcss
```shell
$ npm install tailwindcss @tailwindcss/vite
```