// 函数式组件，App 是项目的根组件
function App() {

  // 返回视图
  return (
    // <> </> 是一个容器组件
    <>
      <h2>设置 text 文本</h2>
      {/* 
       1、字体大小
        text-xs (12px)
        text-sm (14px)
        text-base (16px, 默认)
        text-lg (18px)
        text-xl (20px)
        text-2xl 到 text-9xl: 更大的尺寸；
        text-[<value>] 对应 font-size: <value>; 自定义字体大小；

       2、文本颜色
        text-white / text-black / text-transparent 白色/黑色/透明色；
        text-blue-600 深蓝色；
        text-red-500/50（50% 透明度的红色）；
        text-[#ef560e] 文本自定义颜色；

       3、字体粗细
        font-thin: 极细 (100)
        font-light: 细 (300)
        font-normal: 常规 (400)
        font-medium: 中等 (500)
        font-semibold: 半粗 (600)
        font-bold: 粗体 (700)
        font-black: 极粗 (900)
        font-[<value>] 自定义的值设置字体粗细；

       4、文本行高
        leading-none: 行高为 1 (与字体大小相同，常用于标题，紧贴在一起)。
        leading-tight: 行高为 1.25 (较紧凑)。
        leading-snug: 行高为 1.375 (舒适)。
        leading-normal: 行高为 1.5 (默认值，大多数段落的标准行高)。
        leading-relaxed: 行高为 1.625 (较宽松)。
        leading-loose: 行高为 2 (非常宽松)。

        text-<size>/<number> 同时设置元素的字体大小和行高；
        leading-<number> 固定数值设置字体行高；

       */}

      <p className="text-lg/4 text-blue-500 font-normal">
        爱说话不代表会说话，有的人走到哪儿都喜欢夸夸其谈，不分场合不分对象，丝毫不在意别人的感受，仿佛这个世界只有他最爱表达。
      </p>
      <p className="text-[32px]/[40px] text-[#ef560e] font-medium">
        这样的人自然不受大家欢迎。我们要学会说话的技巧，说该说的，不要肆意表达惹人厌烦。
      </p>

      {/* 
       5、文本字间距 letter-spacing
        tracking-tighter 紧凑；
        tracking-normal 正常；
        tracking-widest 宽松；
        tracking-[.25em] 定义的值设置字母间距；

       6、对齐方式
        text-left: 左对齐。
        text-center: 居中对齐。
        text-right: 右对齐。
        text-justify: 两端对齐。

       7、控制下划线、删除线
        underline: 下划线。
        overline: 上划线。
        line-through: 删除线。
        no-underline: 无装饰。

        decoration-blue-500（设置下划线颜色），decoration-2（设置下划线粗细）。

       8、文本转换
        uppercase: 全大写。
        lowercase: 全小写。
        capitalize: 首字母大写。
        normal-case: 正常。

       */}
      <p className="text-2xl text-red-400 tracking-[16px] text-justify">
        出使外国时，孔子的表现与在本国上朝时一样，都很恭敬庄重，私底下与外国使臣交往时，就变得轻松愉快，无拘无束了。
      </p>
      
      <p className="underline decoration-red-300 decoration-4">
        用法制去引导百姓，使用刑法来整顿他们，老百姓虽然免受刑法，却失去了廉耻之心；用道德教化引导百姓，使用礼制去整顿百姓，百姓不仅会有羞耻之心，而且也会使人心归正。
      </p>
        
      <p className="text-2xl text-blue-400 uppercase">
        abcdefghijklmnopqrstuvwxyz
      </p>

      {/* 
       8、截断与溢出
        truncate: 单行文本溢出显示省略号（...）。
        line-clamp-{n}: 多行文本截断（需要 Tailwind 3.3+）。例如 line-clamp-2 表示最多显示两行，超出部分显示省略号。
        whitespace-nowrap: 强制文本不换行。用于横向滚动条或固定标题
        break-words: 单词太长时自动换行。防止长链接或单词撑破布局
       */}
      <p className="w-32 bg-amber-500 truncate">
        这是一段非常长的文字，超过宽度后会自动显示省略号。
      </p>
      <p className="w-64 line-clamp-2">
        这段文字会在第二行末尾被截断。无论后面还有多少内容，用户都只能看到两行，并以省略号结尾。
      </p>
    </>
  );
}

export default App;
