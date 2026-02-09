function App() {
  return (
    // <> </> 是一个容器组件
    <>
      <h3>1、Tailwind 设置宽高 width\height</h3>
      
      {/* 
        Tailwind v4 继续沿用了传统的比例系统（1单位 = 0.25rem = 4px）
        即，w-1 的 1 表示 0.25 rem，即 4 px，以此类推，w-20 表示 5 rem，即 width: 80px;。同理，h-20 表示 height: 80px; 。
        
        1、Tailwind CSS 的比例系统来源
        几乎所有现代浏览器的默认根字号（Root Font Size）都是 16px。在 CSS 中，1rem 等于根字号。因此，1rem = 16px。
        Tailwind CSS 的比例系统以 16px 为基准，以 4px 为步进，所以 1个单位 = 0.25rem = 4px。

        2、为什么 Tailwind 使用 rem 作为底层单位？
        为了无障碍体验（Accessibility）。
        如果用户在浏览器设置中放大了默认字体（例如调到了 20px），那么 w-4 (1rem) 会自动变为 20px。
        如果使用固定像素 w-[16px]，无论用户如何调整浏览器设置，尺寸都不会变，这会导致布局在文字放大时崩溃。
        
      */}
      
      {/* w-数值、h-数值；如下 宽为 25x4=100px，高为 20x4=80px */}
      <div className="w-25 h-20 bg-blue-400"></div>
      
      {/* w-[]、h-[] 方括号语法，支持任意数值 */}
      <div className="w-[80px] h-[100px] bg-amber-400">直接写px</div>
      <div className="w-[15rem] h-[5rem] bg-red-400">rem换算为px</div>
      <div className="w-[15em] h-20 bg-yellow-500">em和rem的换算方式一样</div>

      {/* w-分子/分母、h-分子/分母；即表示百分比数值 */}
      <div className="w-1/3 h-20 bg-blue-300"></div>

      {/* w-full 表示 width: 100%; 占据父容器的 100% 宽度，另外 h-full 同理 */}
      <div className="w-25 h-20">
        <div className="w-full h-full bg-green-400"></div>
      </div>
      
      {/* w-screen 对应 width: 100vw 占据设备屏幕的 100% 宽度。另外 h-screen 对应 100vh */}
      <div className="w-25 h-20">
        <div className="w-screen h-full bg-red-400"></div>
      </div>

      {/* 使用 w-数值、size-[]、size-分子/分母、size-full 同时设置 width、height */}
      <div className="size-25 bg-yellow-400"></div>
      <div className="size-[100px] bg-red-400"></div>

      {/* min-w-/max-h-、max-w-/max-h- 设置最大最小值 */}
      <div className="min-w-[100px] max-w-100 h-25 bg-purple-400"></div>

      <div className="w-sm h-25 bg-green-400"></div>

      {/* 
        w-auto/h-auto/size-auto，重置 或 自适应 ；
        w-px，对应 width: 1px；
        h-px，对应 height: 1px;
        size-px，对应 width: 1px; height: 1px；
        
      */}

      {/* 
        h-svh、h-lvh、h-dvh 
          传统的 100vh 在移动端浏览器上有一个著名的 Bug：它计算的是固定视口高度，不考虑地址栏。
            当地址栏显示时，100vh 的底部会被地址栏遮挡。
            当用户滚动页面，地址栏收起，页面高度又会发生变化。
        
          为了解决这个问题，CSS 引入了 Small (s)、Large (l) 和 Dynamic (d) 三种模式。

          h-svh (Small Viewport Height) 最小视口高度。对应 100svh
            当浏览器地址栏和工具栏全部显示（展开）时，剩余的可视区域高度。

          h-lvh (Large Viewport Height) 最大视口高度。对应 100lvh。
            当浏览器地址栏和工具栏全部隐藏（收起）时，整个屏幕的可视区域高度。

          h-dvh (Dynamic Viewport Height) —— 最常用 动态视口高度。对应 100dvh。
            它会实时监听工具栏的状态。工具栏展开时，它等于 svh。工具栏收起时，它等于 lvh。

      */}

      
    {/* 
        Responsive design 响应式设计
      
        */}
    </>
  );
}

export default App;