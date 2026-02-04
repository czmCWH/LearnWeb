import { useState } from "react"
/*
 1、自定义 Hook 函数
  概念：自定义 Hook 是以 use 开头的函数，通过自定义 Hook 函数可以用来实现逻辑的封装和复用。
  实现步骤：
    - 编写一个 use 开头的函数；
    - 在函数内部编写封装的逻辑；
    - return 出去组件中使用到的状态和方法；
    - 组件中调用函数，解构结果值，并使用值；
 
 2、应用场景
  - 通常用于抽取组件中数据的获取，如：组件挂载时的网络请求。此种组件称为 智能组件

  项目开发中，通常采用 “智能组件” + “UI组件” 实现页面的构建。


 */

// function HookBox() {

//   const [show, setShow] = useState(true)
  
//   const onToggle = () => setShow((pre) => !pre)

//   return (
//     <>
//       { show && <div>this is div</div> }
//       <button onClick={onToggle}>隐藏/显示</button>
//     </>
//   )
// }
// export default HookBox

// 如上 HookBox 组件中 布尔状态的逻辑 和当前组件耦合在一起，可以通过自定义Hook抽取用于复用

// 步骤1，封装以 use 开头的自定义 Hook
function useToggle() {
  // 1、抽取可服用的逻辑代码
  const [show, setShow] = useState(true)
  const toggle = () => setShow((pre) => !pre)

  // 2、返回状态、函数供供其它组件使用
  return {
    show,
    toggle
  }
}

function HookBox() {  

  // 步骤2，使用自定义 Hook
  // 执行自定义 hook 函数，结构其状态和函数进行使用
  const { show, toggle } = useToggle()
  
  return (
    <>
      { show && <div>this is div</div> }
      <button onClick={toggle}>隐藏/显示</button>
    </>
  )
}
export default HookBox