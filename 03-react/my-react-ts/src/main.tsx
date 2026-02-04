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
import './styles/global.scss'

const root = createRoot(document.getElementById('root')!);

root.render(
  // 2、路由绑定
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)