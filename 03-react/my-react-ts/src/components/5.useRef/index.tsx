import { useRef, useEffect } from "react";

/*
 1、useRef Hooks
  useRef 是 React 的 Hook 函数，返回值一个可变的 ref 对象，该对象只有一个 .current 属性。
  ref.current 是一个“通用容器”，可以在组件的整个生命周期内持久保存任何值，且对它的修改不会触发组件重新渲染。

  useRef 应用场景：
    - useRef 可以用于创建一个 Ref 对象，用于引用 DOM 元素。ref 对象 .current 属性就会指向这个 DOM 节点。
    - useRef 存储定时器ID、websocket 连接实例或任何与渲染无关的数据时非常有用。

 2、useRef 获取/操作 DOM 的使用步骤：
    - 调用 useRef 函数创建 ref 对象，并于 JSX 绑定；
    - 在 DOM 可用时，通过 ref.current 拿到 DOM 对象；
 
 */

export const RefBox = () => {
  
  // 1、创建一个 Ref 来存放 input 元素
  const inputRef = useRef<HTMLInputElement>(null);

  // 2、使用 useRef 存储任意可变的值，这个值不是状态，不会引起视图的更新
  const isMounted = useRef(false);

  useEffect(() => {
    console.log('--- ✅ 组件挂载完成');

    isMounted.current = true;

    // 2、组件挂载成功时，使用 ref 让输入框获取焦点
    inputRef.current?.focus();

    return (() => {
      console.log('--- ❌ 组件卸载完成！');
    })
  }, [])

  const handleClick = () => {
    // 使用 ref 获取 dom 元素信息
    console.log('输入内容 = ', inputRef.current?.value);
  }

  return (
    <>
      {/* 1、绑定 ref 对象到 DOM */}
      <input ref={inputRef} />
      <button onClick={handleClick}>获取输入内容</button>
    </>
  )
}