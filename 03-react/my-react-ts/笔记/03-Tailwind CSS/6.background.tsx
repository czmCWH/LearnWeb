// 函数式组件，App 是项目的根组件
function App() {

  // 返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <h2>设置 background 背景</h2>

      {/* 
       1、设置背景颜色
        bg-inherit 子元素继承父级背景色；
        bg-current 把当前的文字颜色作为背景色；
        bg-black 黑色；bg-white 白色；
        bg-[#f2122c] 任意颜色
       */}

      <div className="text-red-500">
        <div className="bg-current w-10 h-10"></div>
        <p>这段文字是红色的</p>
        <div className="bg-[#9112f2] size-25"></div>
        <div className="bg-[#9112f2]/25 size-25">背景颜色透明度为 25%</div>
      </div>

      {/* 
       2、背景渐变色
        bg-gradient-to-{direction} 渐变颜色的方向
          t、b：从下到上、从上到下；
          l、r：从右到左、从左到右；
          tr、br、bl、tl 对角线方向；
        
        from-{color} 和 to-{color} 来指定渐变起始和结束的颜色
        via-{color} 中间颜色
        bg-[linear-gradient(90deg,_blue,_#feb47b)] 自定义渐变色
       
       3、径向渐变
        bg-radial-{shape}-{size}
         {shape} 可以为 circle 或 ellipse
         {size} 可以是 closest-side, farthest-corner

       */}
      <div className="size-25 m-auto bg-gradient-to-tr from-cyan-500 via-yellow-400 to-red-500" />
      <div className="size-25 m-auto bg-gradient-to-t bg-[linear-gradient(90deg,_blue,_#feb47b)]" />
      
      {/* 
       4、背景图片
        bg-[url(<value>)] 设置背景图片；
        bg-none 清除背景图；

        背景图片大小：
          bg-cover 铺满容器（等比例缩放直到铺满，最常用）
          bg-contain 包含图片 （完整显示图片，可能留白）
          bg-auto 对应 `background-size: auto` （即默认值）保持图片的原始尺寸（宽度和高度）
          bg-size-[<value>] 自定义图片的大小；
        
        背景图像重复：
          bg-repeat: 重复
          bg-no-repeat: 不重复
        
        背景图片的位置：
          bg-center: 居中
          bg-top, bg-bottom-right 等
          bg-position-[center_top_1rem] 设置自定义位置

        固定/滚动 (Attachment):
         bg-fixed: 背景固定（不随滚动条滚动，常用于视差效果）
         bg-local: 随内容滚动

       */}
      <div className="w-100 h-70 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-cover"></div>
      <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-size-[auto_100%]">
        自定义图片大小：宽度自适应，高度100%
      </div>
      <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-size-[200px_100px] bg-no-repeat bg-amber-300">
        自定义图片大小：宽度200px，高度100px；背景不重复；颜色为黄色；
      </div>
      <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-size-[200px_100px] bg-center bg-no-repeat bg-green-300">
        背景图位置
      </div>
       <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-size-[200px_100px] bg-position-[right_50px_top_75px] bg-no-repeat bg-green-300">
        背景图自定义位置
      </div>

      {/* 
       5、background-clip 控制背景（颜色或图片）的绘制范围
          bg-clip-border (默认)	背景铺在 内容+内边距+边框 下方。配合虚线或半透明边框。
          bg-clip-padding	背景只铺在 内容+内边距 下方，边框处不显示背景。	防止背景图渗入边框区域。
          bg-clip-content	背景只铺在 内容区域（不含 padding）。	制作带留白的内嵌背景图。
          bg-clip-text	背景只显示在 文字形状 内。	制作渐变文字（需配合 text-transparent）。
       */}
      
      <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-cover bg-no-repeat"></div>
      <div className="w-100 h-50 m-auto my-4 bg-[url(/src/assets/background-sea.jpg)] bg-cover bg-no-repeat border-[40px] p-[40px] border-red-400/50 bg-clip-border bg-origin-border">
        希望背景图延伸到边框下面，你需要同时设置 bg-origin-border
      </div>
      <div className="inline-block text-5xl font-extrabold bg-gradient-to-r from-green-400 to-red-500 bg-clip-text text-transparent">
        渐变艺术文字
      </div>
    </> 
  );
}

export default App;