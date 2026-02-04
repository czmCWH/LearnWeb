import { useState } from "react"

/*
 form 表单的基本使用
 
 */

export const FormBox = () => {

  // 管理表单状态
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    // 禁用 form 表单提交操作的默认行为，如：刷新页面，把参数添加到地址栏等功能
    ev.preventDefault();

    console.log('--- 提交参数 = ', formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          用户名：
          <input 
            type="text" 
            name="username" 
            onChange={(ev) => setFormData({...formData, username: ev.target.value})}
          />
        </label>
        <label>
          密码：
          <input  
            type="password" 
            name="password" 
            onChange={(ev) => setFormData({...formData, password: ev.target.value})}
          />
        </label>
        <button type="submit">提交</button>
      </form>
    </>
  )
}