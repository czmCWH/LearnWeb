// 函数式组件，App 是项目的根组件
function App() {

  // 返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <h2>设置 border 边框</h2>

      {/* 
       1、边框线宽
        `border-数值` 对应  `border-width: <number>px;`
        `border-t-数值、border-r-数值、border-b-数值、border-l-数值` 对应 top、right、bottom、left 方向上的宽度；
        `border-x-数值` 左右边框宽度；
        `border-y-数值` 上下边框宽度；
        
        `border` 对应 `border-width: 1px;`
        `border-0` 对应 `border: 0px`，重置样式；

       2、边框颜色
        `border-blue-500` 表示4个方向边框均为标准蓝色；
        `border-x-green-50` 水平方向边框为绿色；
        `border-[#243c5a]` 自定义的值设置边框颜色；
        `border-transparent` 透明边框（常用于占位，防止 hover 增加边框时产生抖动）；

        不透明度的几种方式：
          border-[#f2122c]/20
          border-[#f2122c]/[.2]
          border-[rgba(242,18,44,0.5)] ，注意 rgba内不能有空格
      */}
      <div className="size-25 mx-auto border-x-5 border-blue-400"></div>
      <div className="size-25 mx-auto my-5 border-y-5 border-blue-400"></div>
      {/* 设置边框不透明度 */}
      <div className="size-25 m-auto border-10 border-[#f2122c]/20"></div>
      <div className="size-25 m-auto my-5 border-10 border-[rgba(242,18,44,0.5)]"></div>

      {/* 
       3、边框圆角
        rounded 默认圆角4px；
        rounded-sm 小圆角； rounded-md 中等圆角6px； rounded-lg 大圆角8px； rounded-[xl|2xl|3xl] 更大圆角；
        rounded-full 胶囊状或圆形；
        rounded-none: 无圆角；
        rounded-[<value>] 自定义圆角大小

        只将元素的一侧设置为圆角：rounded-t-lg、rounded-r-lg、rounded-b-lg、rounded-l-lg
        只将元素的一个角做成圆角：rounded-tl-lg、rounded-tr-lg、rounded-br-lg、rounded-bl-lg

       4、边框样式
        border-solid: 实线（默认）；
        border-dashed: 虚线；
        border-dotted: 点线；
        border-double: 双实线；
        border-none: 无边框；
       */}

      <div className="w-50 h-25 m-auto border-8 border-solid border-blue-400 rounded-full"></div>
      <div className="w-50 h-25 m-auto border-8 border-solid border-red-400 rounded-[50px]"></div>
      <div className="size-50 my-5 m-auto border-8 border-purple-400 rounded-tl-2xl rounded-tr-[50px] rounded-b-[25px]"></div>

      {/* 
       5、outline 轮廓线
        在处理按钮点击或表单焦点时，通常使用 outline 而不是 border，因为它不占据布局空间。
          outline-none: 移除默认轮廓。
          outline: 默认轮廓。
          outline-2: 2px 轮廓。
          outline-offset-2: 轮廓与元素之间的间距。
      */}
    </>
  );
}

export default App;
