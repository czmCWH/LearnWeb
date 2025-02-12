# 一、适配安全区域

方式一：通过 CSS 设置安全内边距

> 注意：在小程序模拟器里面 safe-area-inset 永远是0，通常在真机上看效果

```css
.container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

方式二：代码获取安全边距
```ts
<script setup> 
// 已被废弃。由于 getSystemInfo 接口里承载了过多内容，单次调用可能比较久。
// const { safeAreaInsets } = uni.getSystemInfoSync()
// 可使用
const { statusBarHeight, safeArea } = uni.getWindowInfo()

console.log(statusBarHeight)
</script>
```

```ts
const res = wx.getSystemInfoSync();
console.log(res.pixelRatio); // 输出设备像素比
```

# 二、获取 DOM 节点

<https://ask.dcloud.net.cn/article/id-37887__page-2>
<https://juejin.cn/post/7156424196547936263>

```ts
// 注意：instance 的获取应该放在
const instance = getCurrentInstance();

// let selectorQuery: UniApp.SelectorQuery | undefined

setTimeout(async () => {
  
  console.log('----czm instance =', instance)
  const query = uni.createSelectorQuery().in(instance?.proxy);
  query
    .select("#preBox")
    .boundingClientRect((data) => {
      console.log("---czm = 得到布局位置信息" + JSON.stringify(data))
    })
    .exec();
 }, 2000);
```

在网页中使用 `document.querySelector` 来査找 DOM 节点，在 uni-app 或小程序中则没有这样一个方法，而是调用 API `uni.createSelectorQuery` 创建一个查询实例(查询器)，进而调用该实例的方法来查询页面中的节点元素。

```ts
onLoad(() => {
  // 1、创建查询器
  const querySelector = uni.createSelectorQuery()

  /**
   * 2、查询元素
   * boundingClientRect 节点的宽高及位置，长度单位是 px
   * scrolloffset：节点滚动的位置，仅支持 scro11-view 组件或页面(viewport)
   */

  // 查询符合条件的第一个节点
  querySelector.select('.box').boundingClientRect((res) => {
    console.log(res)
  })

  // 查询符合条件的全部节点，返回的是数组
  querySelector.selectAll('.box').boundingClientRect((res) => {
    console.log(res)
  })

  // 查询视口，即可获取视口的尺寸、滚动位置等信息
  querySelector.selectViewport().boundingClientRect((res) => {
    console.log(res)
  })

  // 3、执行查询
  querySelector.exec()
})
```

# 三、easycom 组件自动导入

<https://uniapp.dcloud.net.cn/component/#easycom>

`easycom` 是 `uni-app` 自定义的加载组件的规范，按该规范定义的组件可以实现自动导入，其规范要求如下:
1. 安装在项目根目录的 `components` 目录下，并符合 `components/组件名称/组件名称.vue`
2. 安装在 `uni modules` 目录下，路径为 `uni_modules/插件ID/components/组件名称/组件名称.vue`。

> 注意：`uni-app` 为了调试性能的原因，修改 `easycom` 规则不会实时生效，配置完后，需要重启HX或者重新编译项目才能正常使用功能。

# 四、设置 page 根元素的样式

```js
<style>
/* page 是原生小程序页面最外层的标签(虽然我们从未写过)，uni-app 中可以通过 page 标签选择器设置整个页面的背景 */
/* page不能写带scope的style标签中，否则无效 */
page {
  background-color: rgb(240, 240, 240);
  height: 100%;   /* 给page设置 height，可以使得 safe-area-inset 生效 */
}

/**  :host 选择器指定组件所在节点的默认样式 */ 
:host {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
}
</style>
```
快手小程序支持 :host 选择器： <https://open.kuaishou.com/docs/develop/frame/custom_comp/component_temp_style.html>

# 五、rpx 换算为 px

将rpx单位值转换成px，<https://uniapp.dcloud.net.cn/api/ui/font.html>

```js
const width = uni.upx2px(750) + 'px';
```
