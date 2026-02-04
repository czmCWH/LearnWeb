import { useEffect } from 'react';
import { create } from 'zustand';

/*
<https://zustand-demo.pmnd.rs/>

 1、Zustand 状态管理插件 - 异步支持
  $ npm install zustand
  
  zustand 对于异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要调用 set 方法传入新状态即可。
 */  

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}


// 定义 Store 的状态类型
interface CounterState {
  count: number
  inc: () => void
  channelList: []
  fetchGetList: () => Promise<void>
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
    // 👉 管理异步数据，添加异步方法
    channelList: [],
    fetchGetList: async () => {
      const res = await fetch('http://geek.itheima.net/v1_0/channels');
      const jsonRes = await res.json();
      console.log(jsonRes);
      set({
        channelList: jsonRes.data.channels
      })
    }
  }
})

const ZustandDemo = () => {

  // 步骤2，绑定 store 到组件
  const { count, inc, channelList, fetchGetList } = useStore();

  const onChangeInc = () => {
    inc();
  }

  useEffect(() => {
    fetchGetList();
  }, [fetchGetList])

  return (
    <div className="page-box">
      <div className="title">Zustand 插件的使用</div>
      <h2>result1 = {count}</h2>
      <div>
        <button onClick={onChangeInc}>增加count</button>
      </div>
      <ul>
        {
          channelList.map((item: any) => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default ZustandDemo