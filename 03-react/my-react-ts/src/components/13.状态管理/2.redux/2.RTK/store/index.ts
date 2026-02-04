import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterSlice'
import channelReducer from './modules/channelStore'


// 👉 步骤2，configureStore API 创建一个 Redux store，用来组合子模块
const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
  }
})

// 导出 RootState 和 AppDispatch 类型，供 Hooks 使用
export type RootState = ReturnType<typeof store.getState>;  // 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type AppDispatch = typeof store.dispatch;

export default store;


// 👉 步骤3，为 React 注入 store
// 使用 React-Redux 来做 React 组件和 Redux store 的通信。
// 在应用程序根组件包裹 <Provider store={store}> 使得所有组件都能访问到 store。
// 全局状态应该维护在 Redux store 内，局部状态应该维护在局部 React 组件内。

/*
<Provider store={store}>
  <ToolkitBox />
</Provider>
 */