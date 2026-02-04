import { useState } from "react";

/*
 1、ReactHook 使用规则
  只能在组件中 或 其它自定义Hook 函数中使用；
  只能在组件的顶层调用，不能嵌套在 if、for、其它函数中；
 */

// ❌，不能在组件外使用
// const [value, setValue] = useState(0);

function HookBox() {

  const foo = () => {
    // ❌ 不能在组件内的方法中使用
    // const [value, setValue] = useState(0);
  }

  return (
    <>
    </>
  )
}

export default HookBox