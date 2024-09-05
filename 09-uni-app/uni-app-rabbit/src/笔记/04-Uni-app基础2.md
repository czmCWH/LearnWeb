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
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>
```

# 二、获取 DOM 节点

原生小程序中并没有 DOM 操作相关的内容，也因此在 uni-app 中也是无法对 DOM 进行操作的。
但在实际开发过程中是有获取节点信息，如宽高、位置等信息的需求的。

在网页中使用 `document.querySelector` 来査找 DOM 节点，在 uni-app 或小程序中则没有这样一个方法，而是调用 API `uni.createSelectorQuery` 创建一个查询实例(查询器)，进而调用该实例的方法来查询页面中的节点元素。

```ts
onLoad(() => {
  // 1、创建查询器
  const querySelector = uni.createSelectorQuery()

  /**
   * 2、查询元素
   * boundingClientRect 节点的宽高及位置，长度单位是 px
   * scrolloffset 节点滚动的位置，仅支持 scro11-view 组件或页面(viewport)
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

# 三、easycom 组件规范

<https://uniapp.dcloud.net.cn/component/#easycom>

`easycom` 是 `uni-app` 自定义的加载组件的规范，按该规范定义的组件可以实现自动导入，其规范要求如下:
1. 安装在项目根目录的 `components` 目录下，并符合 `components/组件名称/组件名称.vue`
2. 安装在 `uni modules` 目录下，路径为 `uni_modules/插件ID/components/组件名称/组件名称.vue`。



