// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import router from './router';
// 公共样式
import '@/styles/index.css'
// import '@/styles/global.scss'
import setRootFontSize from "@/utils/setRootFontSize";


// 1. 立即执行一次初始化，设置根元素的字体大小
setRootFontSize();

// 2. 窗口大小改变时重新设置
window.addEventListener('resize', setRootFontSize);
// 移动端建议同时监听横竖屏切换
window.addEventListener('pageshow', (e) => {
  if (e.persisted) setRootFontSize();
});

const root = createRoot(document.getElementById('root')!);

root.render(
  // 2、路由绑定
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)