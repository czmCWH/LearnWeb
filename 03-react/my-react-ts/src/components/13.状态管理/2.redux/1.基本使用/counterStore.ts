// ⚠️，createStore 已被标记为弃用，现代开发建议使用 legacy_createStore 或更现代的 Redux Toolkit (RTK)。 
// import { createStore } from "redux"    
import { legacy_createStore as createStore } from "redux";

// 定义 State 类型
interface CounterState {
  value: number;
}

// 定义 Action 类型
interface CounterAction {
  type: 'counter/incremented' | 'counter/decremented';
}

// 👉 步骤1，定义 reducer 函数
function counterReducer(state: CounterState = { value: 0 }, action: CounterAction): CounterState {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

// 👉 步骤2，创建一个包含应用程序 state 的 Redux store。
// 它的 API 有 { subscribe, dispatch, getState }.
const store = createStore(counterReducer);
export default store;