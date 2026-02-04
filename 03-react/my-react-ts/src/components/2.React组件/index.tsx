/*
 1、React 函数式组件 
  一个组件就是用户界面的一部分，他可以有自己的逻辑和外观，组件之间可以互相嵌套，也可以复用多次。
  组件化开发可以让开发者像搭积木一样构建一个完整的庞大的应用。

  React 中，一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图UI，渲染组件只需要把组件当成标签书写即可 。
    创建组件时，如果使用 js 则文件名为 .jsx；如果使用 ts 则文件名为 .tsx；

 2、组件样式
  React 组件基础的样式控制有2种方式：
    1、行内样式 - 不推荐
    2、class 类名控制
    3、使用 classnames 插件优化类名控制。先安装：npm install classnames
  

 3、

 */

 import { useState } from 'react'
// 导入组件样式
import './index.css'
import classNames from 'classnames';

// 1、函数式组件
function HelloWorld222() {

  const style = {
    color: 'yellow', 
    fontSize: '50px'
  }

  const [count, setCount] = useState(0)
  
  // 2、返回组件的视图
  return (
    // <> </> 是一个容器组件
    <>
      <h1>React 组件</h1>

      {/* 1、行内样式 */}
      <span style={{color: 'red', fontSize: '50px'}}>this is red span</span>
      <span style={style}>this is yellow span</span>

      {/* 2、class 类名样式 */}
      <div className='box' />

      {/* 3、通过条件动态控制 class 类名的显示 */}
      <div className={`fill-box ${count%2 === 0 && 'box-bg'}`}></div>
      <button onClick={() => setCount(count+1)}>修改</button>

      {/* 4、使用 classNames 插件优化类名控制 */}
      <div className={classNames('fill-box', { 'box-bg': count%2 === 0 })}></div>

    </>
  )
}

export default HelloWorld222