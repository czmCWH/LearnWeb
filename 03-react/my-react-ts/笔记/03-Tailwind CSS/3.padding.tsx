function App() {
  return (
    <>
      <h3>1、Tailwind 设置间距 padding\margin</h3>
      <h4>padding</h4>
      
      {/* 
       1、基本内边距设置
        `p-数值`：元素四周的内边距
        `pt-数值、pr-数值、pb-数值、pl-数值`：元素一侧的内边距
      */}
      
      <div className="p-10 bg-blue-300">
        <div className="size-20 bg-amber-600"></div>
      </div>

      {/* 
       2、设置水平、垂直方向
        `px-数值` 对应 `padding-left & padding-right`
        `py-数值` 对应 `padding-top & padding-bottom`

       */}

      {/* 
       3、其它常用值
        `p-0` 对应 `padding: 0px;`
        `p-px` 对应 `padding: 1px;`
        
       */}
    </>
  );
}

export default App;
