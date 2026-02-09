function App() {
  return (
    // <> </> 是一个容器组件
    <>
      <h3>1、Tailwind 设置间距 padding\margin</h3>
      <h4>margin</h4>
      {/* 
        1、给单边设置外边距
          `m-数值` 对应 `margin: ;` 设置四周的边距
          `mt-数值、mr-数值、mb-数值、ml-数值` 对应 `margin-top\right\bottom\left` 
        
          类名前加上短横线即可设置负边距，如：`-mt-8`。
       */}
       {/* 外边距塌陷解决办法：方法1、父容器加 padding；方法2，父元素设置 overflow-hidden */}
      <div className="size-50 bg-blue-300 overflow-hidden">
        <div className="size-20 mt-5 mr-10 bg-red-400">mt-\mr</div>
        <div className="size-20 mb-2 ml-10 bg-orange-400">mb-\ml</div>
      </div>


       {/* 
         2、设置水平、垂直方向外边距
          `mx-数值` 对应 `margin-left: ; margin-right: ;`
          `my-数值` 对应 `margin-top: ; margin-bottom: ;`
       */}
      <div className="size-50 bg-green-200">
        <div className="size-10 mx-5 inline-block bg-red-500"></div>
        <div className="size-10 mx-5 inline-block bg-red-500"></div>

        <div className="size-10 my-5 bg-red-500"></div>
        <div className="size-10 my-5 bg-red-500"></div>
      </div>


      {/* 
        3、特殊值
          m-0：清除边距；
          m-px 对应 1px；
          mx-auto 对应 `margin: 0 auto;`，水平居中块级元素
          m-auto: 四周自动。
          mt-auto: 将元素推向容器底部
       */}

      <div className="size-25 bg-amber-300">
        <div className="size-10 bg-blue-400 mx-auto"></div>
      </div>
        
      {/* 
        4、控制子元素之间间距
          space-x-数值 or space-y-数值
       */}
      <div className="space-y-4 bg-blue-300">
        <div className="bg-purple-400 size-10">01</div>
        <div className="bg-purple-400 size-10">02</div>
        <div className="bg-purple-400 size-10">03</div>
      </div>
      <div className="flex space-x-4 bg-red-300">
        <div className="bg-blue-400 size-10">01</div>
        <div className="bg-blue-400 size-10">02</div>
        <div className="bg-blue-400 size-10">03</div>
      </div>
      
      {/* 
        5、逻辑属性外边距
         `ms-数值` 对应 `margin-inline-start` 起始方向的外边距；
         `me-数值` 对应 `margin-inline-end` 结束方向的外边距;
         专门为了更好地支持 多语言布局，会根据文本方向（LTR / RTL）自动映射到具体的物理边距（left / right）。
       */}


    </>
  );
}

export default App;