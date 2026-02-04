import { useState, useEffect } from "react";

/*
  1、useEffect - 清除副作用
   在 useEffect 中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，
   例如：在 useEffect 中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用。
  
   - 说明：清除副作用的函数 `最常见` 的执行时机是在组件卸载时自动执行。

 */

const Son = () => {
  // 1、渲染时开启定时器
  useEffect(() => {
    
    // 实现副作用操作逻辑
    const timer = setInterval(() => {
      console.log('--- 定时器执行...');
    }, 1000);

    return (() => {
      // 清理副作用逻辑 - 组件卸载时，清除副作用
      clearInterval(timer)
    })
  }, []) 

  return <div>我是子组件</div>
}

const HooksBox = () => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log('--- ✅ 组件挂载完成');

    // 在函数式编程思想中，订阅和取消订阅就是标准结构
    return (() => {
      console.log('--- ❌ 组件卸载完成！');
    })
  }, []) 

  useEffect(() => {
    // 实现副作用操作逻辑

    return (() => {
      // 清理副作用逻辑

    })
  }, []) 

  const onShow = () => {
    setShow(show!)
  }
  
  return ( 
    <>
      {show && <Son />}
      <button onClick={onShow}>卸载添加Son组件</button>
    </>
  );
}

export default HooksBox