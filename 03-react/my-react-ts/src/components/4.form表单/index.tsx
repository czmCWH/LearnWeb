/*
 1、受控表单绑定
 概念：使用 React 组件的状态（useState）控制表单的状态。即：状态与value属性双向绑定。
 实现：
  - state 状态变量绑定到 input 标签的 value 属性；
  - 把 input 最新的 value 值设置给 state；

 */

import { useState } from 'react';

// 函数式组件
function FormBox() {
  
  // 管理表单状态
  const [formData, setFormData] = useState({
    username: "zhangsan",
    password: "123",
  })

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    // 禁用 form 表单提交操作的默认行为，如：刷新页面，把参数添加到地址栏等功能
    ev.preventDefault();

    console.log('--- 提交参数 = ', formData);
  }
  
  // 2、返回视图
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          用户名：
          <input 
            type="text" 
            name="username" 
            value={formData.username}
            onChange={(ev) => setFormData({...formData, username: ev.target.value})}
          />
        </label>
        <label>
          密码：
          <input  
            type="password" 
            name="password" 
            value={formData.password}
            onChange={(ev) => setFormData({...formData, password: ev.target.value})}
          />
        </label>
        <button type="submit">提交</button>
      </form>
    </>
  )
}

export default FormBox
