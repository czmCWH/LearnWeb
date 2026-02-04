/*
 1、在 React 中使用 Redux
  在 React 中使用 Redux，官方要求它安装2个插件：react-redux、Redux Toolkit (RTK）
  <https://cn.redux.js.org/tutorials/typescript-quick-start>

  * Redux Toolkit (RTK） 是官方推荐的编写 Redux 逻辑的方法，它是一套工具的集合集，简化书写方式。
    - 简化 store 的配置方式；
    - 内置 immer 支持可变式状态修改；
    - 内置 thunk 更好的异步创建；
  
  * react-redux 用来链接 Redux 和 React 组件的中间件

  安装：
    1、基于 js 项目
    npm install react-redux
    npm install @reduxjs/toolkit
    
    2、基于 ts 项目
    npm install @types/react-redux
    npm install @reduxjs/toolkit

 2、为 React 注入 store
  react-redux 负责把 Redux 和 React 链接起来，内置 Provider 组件通过 store 参数把创建好的 store 实例注入到应用中，链接正式建立。

 3、在 React 组件使用 store 中的数据
  在 React 组件中使用 store 中的数据，需要用到一个钩子函数 useSelector，它的作用是把 store 中的数据映射到组件中。

 4、React 组件中修改 store 中的数据
  React 组件中修改 store 中的数据需要借助另外一个 hook 函数 useDispatch，它的作用是生成提交 action 对象的 dispatch 函数。
  

  // 1、注入 store 
  // <Provider store={store}>
  //   <ToolkitBox />
  // </Provider>


 */

import { useAppSelector, useAppDispatch } from './store/hooks'
import { increment, decrement, incrementByAmount } from "./store/modules/counterSlice"
import { fetchChannelList } from './store/modules/channelStore';

function ToolkitBox() {

   // `state` 参数已正确推断为 `RootState` 类型
  const { count } = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch()

  const onDec = () => {
    dispatch(decrement())
  }

  const onInc = () => {
    dispatch(increment())
  }

  const onSet = () => {
    dispatch(incrementByAmount(100))
  }

  // Redux 处理异步数据
  const { list } = useAppSelector(state => state.channel)

  const onFetchList = () => {
    dispatch(fetchChannelList())
  }

  return (
    <>
      <button onClick={onDec}>减少</button>
      <span>{ count }</span>
      <button onClick={onInc}>增加</button>
      <button onClick={onSet}>设置为100</button>
      <div>
        <button onClick={onFetchList}>获取数据</button>
      </div>
      <ul>
        {list.map((item: any, index) => <li key={index}>{item.name}</li>)}
      </ul>
    </>
  )
}

export default ToolkitBox