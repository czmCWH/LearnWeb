import { useState } from "react";

// 函数式组件，App 是项目的根组件
function App() {
  const [count, setCount] = useState(0);

  // 2、返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <div className="bg-blue-500 text-red">Tailwind CSS</div>
      <div className="w-96 h-50 bg-amber-300" flex-none justify-center>
        好好学习
      </div>
    </>
  );
}

export default App;
