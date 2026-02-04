import { useState, useEffect } from "react";

/*
 1、useEffect Hooks
    useEffect 是一个 React Hook 函数，用于在 React 组件中创建 不是由事件引起 而是由渲染本身引起 的操作，比如发送 AJAX 请求、更改 DOM 等。
      - 例如：组件渲染完毕之后就需要和服务器获取数据，这整个过程属于“只由渲染引起的操作”。

    useEffect 语法
      useEffect(() => {}, [])
      - 参数1，称为副作用函数，在函数内部可以放置要执行的操作。
      - 参数2，是一个数组，在数组里放置依赖项，不同的依赖项会影响参数1的执行；
        1、如果参数2是一个空数组，则参数1副作用函数 只会在组件初始渲染时执行一次。--- ⚠️，此时可以获取到 DOM 
        2、如果参数2没有值，则参数1副作用函数在 组件初始渲染+组件更新时执行。
        3、如果参数2是一个非空数组，则参数1副作用函数在 组件初始渲染+特定依赖项变化时执行
 
 2、useEffect与生命周期 （挂载、更新、卸载）

 3、使用 HooksBox 组件：
  const [isShow, setIsShow] = useState(true);
  <button onClick={() => setIsShow(preValue => !preValue)}>隐藏显示</button>
  {isShow ? <HooksBox /> : null}
  {isShow && <HooksBox />}    // 简写方式

 */

export const HooksBox = () => {

  const [count, setCount] = useState(0);
  const [list, setList] = useState<{id: number, name: string}[]>([]);

  const handleAdd = () => {
    setCount((preCount) => preCount + 1);
  }

  // 👉 1、useEffect 参数2为空数组时，其参数1的副作用函数执行时机：只在组件初始渲染时执行一次
  useEffect(() => {
    console.log('--- ✅ 组件挂载完成');

    async function getList() {
      const res = await fetch('http://geek.itheima.net/v1_0/channels');
      const jsonRes = await res.json();
      console.log(jsonRes);
      setList(jsonRes.data.channels);
    }

    getList();

    // 在函数式编程思想中，订阅和取消订阅就是标准结构
    return (() => {
      console.log('--- ❌ 组件卸载完成！');
    })

  }, []) 

  // 👉 2、useEffect 参数2没有时，其参数1的副作用函数执行时机：组件初始渲染+组件更新时执行
  useEffect(() => {
    console.log('--- 组件开始更新');
  })

  // 👉 3、useEffect 参数2是有元素的数组时，其参数1的副作用函数执行时机：组件初始渲染+特定依赖项变化时执行
  // 只有 count 变化时，参数1的副作用函数才会执行。
  useEffect(() => {
    document.title = `当前计数: ${count}`;
    console.log('--- 更新了 count = ', count);
  }, [count])
  
  return ( 
    <>
      <div>当前计数：{count}</div>
      <button onClick={handleAdd}>增加</button>
      <ul>
        {
          list.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </>
  );
}