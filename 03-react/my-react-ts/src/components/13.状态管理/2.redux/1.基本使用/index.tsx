/*
 1、Redux - 状态管理工具，全局状态管理
  Redux 是 React 最常用的集中状态管理工具，类似于 Vue 中的 Pinia（或 Vuex），可以独立于框架运行。
  作用：通过集中管理的方式管理应用的状态。

  安装：npm install redux

 2、Redux 使用步骤
  步骤1、定义一个 reducer 函数；作用，根据不同的 action 对象，返回一个新的 state 对象。
    reducer 函数签名是 : (state, action) => newState
    state 参数，一个js对象，表示管理的数据初始状态。
    action 参数，一个描述发生了什么的对象，通过其 type 属性标记区分。
    newState 返回值，根据当前想要做的修改返回一个新的状态

  步骤2、调用 createStore 方法传入 reducer 函数，生成一个 store 实例对象；
  步骤3、调用 store 实例的 subscribe 方法 订阅 数据的变化（数据一旦变化，可以得到通知）；
  步骤4、调用 store 实例的 dispatch 方法 提交一个 action 对象 触发数据变化（告诉reducer 您想怎么改变数据）；
  步骤5、调用 store 实例的 getState 方法 获取最新的状态数据更新到视图中；

 3、Redux 的三个核心概念
  为了指责清晰，数据流向明确，Redux把整个数据修改的流程分成了3个核心概念：
    1、state：一个对象，存放着我们管理的数据状态；
    2、action：一个对象，用来描述你想怎么修改数据；
    3、reducer：一个函数，根据 action 的描述生成一个新的 state；

 ⚠️：
  1、Redux 是基于浏览器内存的存储方式，当刷新时状态会恢复为初始值。对于需要持久化的数据，需借用 LocalStorage。
 
 */

import { useEffect, useState } from 'react'
import store from './counterStore'

function ReduxBox() {

  // 👉 步骤5，使用本地 state 来同步 redux store 的值，从而触发 UI 更新
  const [count, setCount] = useState(store.getState().value);

  useEffect(() => {

    // 👉 步骤3，订阅 store 变化，并返回取消订阅的函数
    const unsubscribe = store.subscribe(() => {
      console.log('--- state 变化了，value= ', store.getState().value);
      setCount(store.getState().value); // 同步到本地 state 触发渲染
    });

    // 组件卸载时清理订阅
    return () => unsubscribe(); 

  }, [])

  // 👉 步骤4，dispatch 提交一个 action 对象，更新状态
  const onDec = () => {
    store.dispatch({ type: 'counter/decremented' });
  }

  const onInc = () => {
    store.dispatch({ type: 'counter/incremented' });
  }

  return (
    <>
      <div>
        <button onClick={onDec}>减少-</button>
        <span>{ count }</span>
        <button onClick={onInc}>增加+</button>
      </div>
    </>
  )
}

export default ReduxBox;