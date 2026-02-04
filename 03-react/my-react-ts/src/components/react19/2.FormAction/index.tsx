import { useActionState } from "react";
import { useFormStatus } from "react-dom";

/*
 React 19 中新增 Form 的新特性

 1、form.action
 React 19 新增 action 接受一个函数。React 会自动捕获表单提交，并将 FormData 对象传递给该函数。
 
 2、useActionState Hook 
  useActionState 是管理表单 Action 状态的标准钩子。
    接收2个参数，其返回值为 [当前状态, 触发函数, 是否正在执行]
    参数1，Action 函数，用于处理表单逻辑；
    参数2，表单的初始状态

 3、useFormStatus Hook，是一个用于在表单子组件中获取表单状态的钩子。
  只要组件在 <form> 内部，调用它就能拿到 pending（是否正在提交）、data（当前提交的数据）、method（POST/GET）等。
 */

export const FormAction = () => {

  
  
  // Action 函数：处理表单提交逻辑
  // previousState: 上一次执行后的状态
  // formData: 自动收集的表单数据对象
  const handleAction = async (previousState: any, formData: FormData) => { 
    console.log('--- 提交参数 keys = ', [...formData.keys()]);
    console.log('--- 提交参数 values = ', [...formData.values()]); 
    const username = formData.get("username");
    const password = formData.get("password");
    console.log('--- 正在提交:', { username, password });
    await delay(1500);
    
    // 返回的结果会更新到 state 中
    return {
      success: true,
      code: 1,
      msg: `用户 ${username} 提交成功`
    };
  } 

  // 2. useActionState 钩子
  // 参数 1: Action 函数
  // 参数 2: 初始状态
  // 返回值: [当前状态, 触发函数, 是否正在执行]
  const [state, submitAction, isPending] = useActionState(handleAction, null);
  console.log("👉 state = ", state);
  console.log("👉 isPending = ", isPending);
 
  return (
    <form action={submitAction} method="post">
      <label>
        用户名：
        <input 
          type="text" 
          name="username" 
        />
      </label>
      <label>
        密码：
        <input  
          type="password" 
          name="password" 
        />
      </label>
      {/* <button type="submit">提交</button> */}
      {/* 
        <submitButton isPending={isPending}/> 使用 props 传递值会报错，对于 深层状态 传值，需要使用 context
       */}
      <SubmitButton />
    </form>
  )
} 

/**
 * 自定义 Form 表单中的提交按钮组件 - 演示 useFormStatus 的用法
 * 
 */
const SubmitButton = () => {
  // useFormStatus 自动获取父级 <form> 的状态
  // 注意：它只能在 <form> 内部的子组件中使用
  /*
   - pending，表单是否正在提交；
   - data，当前正在提交的 FormData 对象；
   - method，
   - action，

   */
  const { pending, data, method, action } = useFormStatus();

  console.log('--- submitButton pending:', pending);
  console.log('--- submitButton data:', data);
  console.log('--- submitButton method:', method);

  return <button type="submit">{pending ? "提交中..." : "提交"}</button>
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}