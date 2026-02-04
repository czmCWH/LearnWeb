
/* 
 1、useState Hook - 定义状态变量
  useState 是一个 React Hook 函数，它允许我们向组件添加一个状态变量，从而控制影响组件的渲染结果。
  
  * useState 函数说明：
    - useState 是一个函数，返回值是一个数组；
    - 返回数组中的第一个参数是状态变量，第二个参数是set 函数，用来修改状态变量；
    - 和普通 js 变量不同的是，状态变量一旦发生变化组件的视图UI也会跟着变化（数据驱动视图）。
  
  * 状态变量的修改规则
    在 React 中，状态是只读的，只能调用 set 方法替换它而不是去修改它，直接修改状态不能引发视图更新。
    例如：修改对象类型状态变量，只有调用 set 方法传递一个全新的对象来修嘎，才能出发视图更新。

 */

import { useState } from 'react';

// 1、函数式组件
function HelloWorld() {
  // 1、调用 useState 给组件添加一个 number 类型的状态变量
  const [count, setCount] = useState(0)

  // 2、修改状态变量，UI重新渲染
  const onDec = () => {
    setCount(count - 1);
  } 

  const onInc = () => {
    // count++;   // ⚠️，直接修改 count 不会引发视图更新，必须使用 setCount 替换。
    setCount(count + 1);
    // ⚠️，setCount 执行后，立即获取 count 的值是上一次的值，而不是最新的。因为 setCount 方法执行是异步的。
    console.log('--- count = ', count);
  }

  // 2、对象类型的状态变量
  const [user, setUser] = useState({
    name: '张三',
    age: 0,
  });

  // React 中事件的命名采用驼峰式
  const handlAge = () => {
    // 报错：直接修改对象属性无法更新状态
    // user.age++;
    // setUser(user);

    // 方式1，创建新对象来更新对象类型的状态
    // setUser({
    //   ...user,
    //   age: user.age + 1,
    // });

    // 方式2，通过函数式更新（推荐）
    setUser((preUser) => ({  // 就近原则，preUser 是最新的状态
      ...preUser, 
      age: preUser.age + 1,
    }))
  }

  // 2、返回组件的视图
  return (
    // <> </> 是一个容器组件
    <>
      <h4>1、useState Hook 定义状态变量</h4>
      <div>
        <button onClick={onDec}>减少-</button>
        <span>{ count }</span>
        <button onClick={onInc}>增加+</button>
      </div>

      <h4>2、对象类型的状态变量</h4>
      <div>
        <span>name={user.name}, age={user.age}</span>
      </div>
      <button onClick={handlAge}>增加+</button>

    </>
  )
}

export default HelloWorld