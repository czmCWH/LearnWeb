import { create } from 'zustand';

/*
<https://zustand-demo.pmnd.rs/>

 1、Zustand 状态管理插件
  $ npm install zustand
  
  使用步骤：创建 Store；消费 Store；
 */  

// 定义 Store 的状态类型
interface CounterState {
  count: number;
  inc: () => void;
  dec: () => void;
  setCount: (value: number) => void;
}


// 步骤1，创建 Store
// create 的参数接收一个函数，此函数参数必须返回一个对象，对象内部编写状态数据和方法；
const useStore = create<CounterState>((set) => {
  return {
    // 1、定义状态
    count: 1,
    // 2、定义修改状态数据的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1 
      }));
    },
    dec: () => {
      // set 函数，专门用于修改状态，并且只能调用此函数修改状态。
      set((state) => {    // state 表示 store 对象
        return {
          count: state.count - 1
        }
      });
    },
    setCount: (value: number) => set({ count: value}),
  }
})

const ZustandDemo = () => {

  // 步骤2，绑定 store 到组件
  const { count, inc, dec, setCount } = useStore();

  const onChangeInc = () => {
    inc();
  }

  const onChangeDec = () => {
    dec();
  }

  const onSet = () => {
    setCount(222);
  }

  return (
    <div className="page-box">
      <div className="title">Zustand 插件的使用</div>
      <h2>result1 = {count}</h2>
      <div>
        <button onClick={onChangeInc}>增加count</button>
        <button onClick={onChangeDec}>减少count</button>
        <button onClick={onSet}>设置count</button>
      </div>
    </div>
  )
}

export default ZustandDemo