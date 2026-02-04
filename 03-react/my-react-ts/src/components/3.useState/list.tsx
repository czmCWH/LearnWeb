/*
 1、渲染列表
  条件渲染 与 列表渲染中有 key 的概念
    key 是 React 用来识别列表中各个元素的身份证。当列表数据发生变化时，React的协调算法会通过 key 来高效地对比新旧两棵虚拟 DOM 树。
    key 必须稳定且唯一。通常使用数组的索引 index 作为 key。
  
  使用组件：<ListBox />

 */
import { useState } from 'react';

// 1、函数式组件
function HelloWorld() {

  // 定义 List 状态
  const [list, setList] = useState<string[]>([]);
  // 每次 setList 触发 ListBox 组件重新渲染时，ListBox 函数会重新执行，var count = 0 会被重新初始化为 0。所以你的 count 永远无法正常累加。
  // var count = 0;
  // 这里我们使用状态来管理，确保它不会被重置
  const [count, setCount] = useState<number>(0);
  
  // 2、返回组件的视图
  return (
    // <> </> 是一个容器组件
    <>
      <button onClick={() => {
        const item = `项目${count}`;
        //  list.push(item);
        //  setList([...list]);
        
        // 不使用 push，而是通过解构创建新数组（不可变原则）
        setList(prevList => [...prevList, item]);

        setCount(prevCount => prevCount + 1);
      }}>增加</button>

      {/* 1、list 显示所有的项 */}
      <div>
        {list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {/* 2、list 只显示偶数项 */}
      <div>
        {
          list.map((item, index) => {
            return index%2===0 ? (<div key={index}>{item}</div>) : null
          })
        }
      </div>

    </>
  )
}

export default HelloWorld