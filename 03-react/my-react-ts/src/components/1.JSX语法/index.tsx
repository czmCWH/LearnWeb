/*
 1、现代 React
  React 由 Meta 公司研发，是一个用于 构建Web和原生交互界面的库。
  React 是全球最流行，大厂必备。
  
  - 函数式组件 + Hooks API 是现代 React 开发的绝对标准。

 2、JSX 语法
  JSX 是 JavaScript 和 XML（HTML）的缩写，表示在 JS 代码中编写 HTML 模版结构，它是 React 中编写UI模版的方式。
  JSX 并不是标准的 JS语法，它是 JS 的语法扩展。浏览器本身不能识别，需要通过解析工具做解析(如：https://babeljs.io/)之后才能在浏览器中运行。
  优点：
    - 使用 HTML 声明式模版写法；
    - 使用 JS 的可编程能力；
  
  2.1、JSX 大括号语法{} 
   在 JSX 中可以通过 大括号语法{} 识别 JavaScript 中的表达式，比如：常量、js变量、函数/方法调用等等。常用场景：
      1、使用引号传递字符串；
      2、识别 js 变量；
      3、函数调用、方法调用；
      4、使用 js 对象；如：设置 div style
  
    注意，if语句、switch语句、变量声明属于语句，不是表达式，不能出现在 {} 中。
  
  2.2、JSX 列表渲染
   在 JSX 中可以使用原生JS中的 map 方法遍历渲染列表。

  2.3、JSX 条件渲染
   在 React 中，可以通过逻辑与运算符&&、三元表达式(?:) 实现基础的条件渲染，分别实现单一组件按条件渲染、多组件按条件渲染。

 3、React 基础事件绑定
  语法：on + 时间名称 = {事件处理程序的引用}，整体上遵循驼峰命名法。
      在事件回调函数中设置形参e，就可以拿到事件对象。

 */

// 1、函数式组件
function HelloWorld() {

  const total = 100;

  function getName() {
    return '调用 getName 函数返回'
  }

  const list = [
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
  ]

  const isLogin = true;

  // 定义文章类型：0、1、3
  let articleType = 1;
  function getArticleTem() {
    if (articleType === 0) {
      return <div>没有图片的文章</div>
    } else if (articleType === 1) {
      return <div>单图模式文章</div>
    } else {
      return <div>多图文章</div>
    }
  }

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('--- 按钮被点击了，事件对象 e = ', e.target);
  }

  const clickHandlerParams = (name: string) => {
    console.log('--- 按钮被点击了，name = ', name);
  }

  // 2、返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <h1>React 入门 - JSX 基础</h1>
      
      <h3>👉 1、JSX - 大括号语法{}识别 js 表达式</h3>
      <div>
        {'识别JS字符串'}
        {total}
        {
          getName()
        }
        {
          new Date().getDate()
        }
      </div>
      
      <div style={{
        backgroundColor: 'red',
        width: '200px',
        height: '200px'
      }} />

      <h3>👉 2、JSX - 列表渲染</h3>
      <ul>
        {
          list.map((item, index) => {
            // key 的作用：在 react 框架内部使用，提升更新性能。
            return <li key={index}>{item.name}</li>
          })
        }
         {/* 简写1 */}
        {
          list.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))
        }
        {/* 简写2 */}
        {
          list.map((item,index) => <li key={index}>{item.name}</li>)
        }
      </ul>

      <h3>👉 3、JSX - 条件渲染</h3>
      <div>
        {/* 1、逻辑与 && 单一组件渲染 */}
        { isLogin && <span>登录成功</span> }
        {/* 2、三元运算，控制多组件渲染 */}
        { isLogin ? <span>tom</span> : <span>未登录</span>}
      </div>

      <div>
        {/* JSX 实现复杂条件渲染：自定义函数 + if语句实现 */}
        { getArticleTem() }
      </div>

      <h3>👉 4、React 组件 - 事件绑定</h3>
      
      {/* 1、React 基础事件绑定 */}
      <button onClick={clickHandler}>点击按钮1</button>
      
      {/* 2、绑定组件事件，并传递自定义参数 */}
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => clickHandlerParams('jack')}>点击按钮2</button>
    </>
  )
}

export default HelloWorld