import { useState, memo } from 'react';

/*
<https://zh-hans.react.dev/reference/react/memo#reference>

 1、React.memo
 memo 缓存组件，只有当组件 props 发生改变的时候才会重新渲染。

 Raact 组件默认渲染机制：只要父组件重新渲染子组件就会重新渲染。

 
 */  

const Memo = () => {

  const [count1, setCount1] = useState(0);

  const onCount1 = () => {
    setCount1(count1 + 1)
  }


  return (
    <div className="page-box">
      <div className="title">React.memo 的使用</div>
      <h2>result1 = {count1}</h2>
      <div>
        <button onClick={onCount1}>修改count1: </button>{count1}
      </div>
      {/* 修改 count1 时，会导致 Son 组件重新渲染  */}
      <Son />
      {/* ⚠️，修改 count1 时，memo 不会重新渲染 */}
      <MemoSon />
    </div>
  )
}

export default Memo


// 经过memo函数包裹生成的缓存组件只有在props发生变化的时候才会重新渲染
const Son = () => {
  console.log('---- 我是子组件 Son，重新渲染了');
  return (
    <>
      <h5>我是子组件 Son</h5>
    </>
  )
}

const MemoSon = memo(function SomeComponent() {
  console.log('---- 我是子组件 MemoSon，重新渲染了');
  return (
    <>
      <h5>我是子组件 MemoSone</h5>
    </>
  )
});