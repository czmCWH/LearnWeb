import { useReducer } from 'react';

/*
<https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer>

 1、useReducer Hook - 用于管理组件内部具有复杂逻辑的状态
  useReducer 和 useState 作用类似，它是用来管理相对复杂的状态数据。使用步骤如下：
 
  useReducer 一般在项目中会选择性使用。

 */

// 定义 Action 的类型 (使用联合类型保证类型安全)
type Action =
  | { type: 'INC' }
  | { type: 'DEC' }
  | { type: 'SET'; payload: number };

// 步骤1，定义一个 reducer 函数，作用：根据不同的 action 返回不同的状态。
// 把对于状态的操作提取出来，叫做 action；
// action 需要有专门的方法来完成状态值的更新，称为 reducer；
function tasksReducer(state: number, action: Action) {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

const Reducer = () => {

  // 步骤2，在组件中调用 useReducer，并传入 reducer 函数和状态的初始值；
  const [state, dispatch] = useReducer(tasksReducer, 0);


  // 步骤3，事件发生时，通过 dispatch 函数分派一个action 对象（通知 reducer 要返回哪个新状态并渲染UI）
  const onClickInc = () => {
    dispatch({ type: 'INC' })
  }

  const onClickDec = () => {
    dispatch({ type: 'DEC' })
  }

  const onClickSet = () => {
    dispatch({ type: 'SET', payload: 222 });
  }

  return (
    <div className="page-box">
      <div className="title">useReducer Hook 的使用</div>
      <div>
        <button onClick={onClickDec}>减少</button>
        {state}
        <button onClick={onClickInc}>增加+</button>
      </div>
      <button onClick={onClickSet}>设置set</button>
    </div>
  )
}

export default Reducer