import { useState, useEffect } from "react";

import './index.scss'

// 函数式组件，App 是项目的根组件
function App() {
  const [count, setCount] = useState(0);


  // 2、返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <div className="bg-blue-500 text-red">Tailwind CSS</div>
      <div className="w-93.75 h-50  bg-amber-300 flex justify-center text-center">
        好好学习
      </div>

      <h2 className="text-xs">设置 background 背景123</h2>
      
      <div className="pink-box">红色的盒子</div>

      <div className="blue-box"></div>
    </> 
  );
}

export default App;
