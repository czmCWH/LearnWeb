/*
 1、使用 Context 机制实现跨层级组件通信 - 全局状态管理
  实现步骤：
    1、使用 createContext 方法创建一个上下文对象 Ctx；
    2、在顶层组件 App 中通过 Ctx.Provider 组件提供数据；
    3、在底层组件 中通过 useContext hook 函数获取消费数据；
  
 
 */

import { createContext, useContext } from "react";

// 1、创建一个上下文对象
const MsgContext = createContext('');

function A() {
  return (
    <>
      <h4>A 组件</h4>
      <B />
    </>
  )
}

function B() {

  // 3、使用 useContext hook 消费数据
  const useMsg = useContext(MsgContext);

  return (
    <>
      <h4>B 组件</h4>
      <div>{useMsg}</div>
    </>
  )
}

function ContextBox() {
  // 2、在顶层组件
  const msg = 'App Msg';

  return (
    <>
      {/* 2、在顶层组件中，通过 Provider 组件提供数据 */}
      <MsgContext.Provider value={msg}>
        <h3>顶层组件 ContextBox</h3>
        <A />
      </MsgContext.Provider>
    </>
  )
}

export default ContextBox
