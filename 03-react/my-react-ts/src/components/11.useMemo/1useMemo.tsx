import { useState, useMemo } from 'react';

/*
<https://zh-hans.react.dev/reference/react/useMemo#reference>

 1、useMemo Hook 缓存
  useMemo 的作用是在组件每次重新渲染的时候缓存计算的结果。

  - 一般不会使用 useMemo，当存在消耗非常大的计算会被使用
 
 */  

function fib(n: number): number {
  console.log('--- fib函数执行了');
  if (n < 3) 
    return 1
  return fib(n - 2) + fib(n - 1)
}


const UseMemo = () => {

  const [count1, setCount1] = useState(0);

  const [count2, setCount2] = useState(0);

  const onCount1 = () => {
    setCount1(count1 + 1)
  }

  const onCount2 = () => {
    setCount2(count2 + 1)
  }

  // 存在问题，count2发生改变，fib 也会重新执行
  // const result1 = fib(count1);
  // 
  const result1 = useMemo(() => {
    // 返回计算的结果
    return fib(count1);
  }, [count1])  // [count1] 表示依赖项，表示那个数据发生变化时 useMemo 的参数1才会执行


  return (
    <div className="page-box">
      <div className="title">useMemo Hook 的使用</div>
      <h2>result1 = {result1}</h2>
      <div>
        <button onClick={onCount1}>修改count1: </button>{count1}
      </div>
      <div>
        <button onClick={onCount2}>修改count2: </button>{count2}
      </div>
      
    </div>
  )
}

export default UseMemo