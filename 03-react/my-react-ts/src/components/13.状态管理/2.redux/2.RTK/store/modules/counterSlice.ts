/*
 1、Redux Slice
  “slice” 是应用中单个功能的 Redux reducer 逻辑和 action 的集合, 通常一起定义在一个文件中。
  该名称来自于将根 Redux 状态对象拆分为多个状态 “slice”。
  
  一个 slice 包含一个特定功能或部分的 state 相关的 reducer 逻辑和 action。
  Redux Toolkit 的 createSlice API 为你提供的每个 reducer 函数生成 action creator 和 action 类型

 2、

 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 为 slice state 定义一个类型
interface CounterState {
  count: number
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  count: 0
}

// 👉 步骤1，创建 Slice Reducer 和 Action
const counterSlice = createSlice({
  // 1、定义一个名称
  name: 'counter',
  // 2、定义初始状态数据，createSlice 将从 initialState 参数推断 state 类型
  // initialState: {
  //   value: 0
  // },
  // 或者直接使用外部定义的初始类型
  initialState,
  // 3、在 reducers 中定义修改状态的方法，这个是一个同步方法，可以直接修改状态
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.count += action.payload
    }
  }
})

// 以按需导出的方式，导出 action
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 选择器等其他代码可以使用导入的 `RootState` 类型
// export const selectCount = (state: RootState) => state.counter.value

// 以默认导出的方式导出 reducer
export default counterSlice.reducer
