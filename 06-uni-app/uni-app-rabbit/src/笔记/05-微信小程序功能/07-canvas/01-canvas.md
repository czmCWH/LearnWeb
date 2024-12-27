# 一、canvas 画布
* 微信小程序
canvas 标签：<https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html>
canvas AIP：<https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html>

* uni-app
canvas 标签：<https://uniapp.dcloud.net.cn/component/canvas.html>
canvas AIP：<https://uniapp.dcloud.net.cn/api/canvas/canvasToTempFilePath.html#canvastotempfilepath>

* 菜鸟教程 canvas 

canvas drawImage()：<https://www.runoob.com/tags/canvas-drawimage.html>

- 解释的非常清楚
- 可以在线练习

# 二、参考博客

## 代码示例

非常不错，带有源码：<https://blog.csdn.net/gitblog_09777/article/details/141977501?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-1-141977501-blog-88610245.235%5Ev43%5Epc_blog_bottom_relevance_base6&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-1-141977501-blog-88610245.235%5Ev43%5Epc_blog_bottom_relevance_base6&utm_relevant_index=2>
<项目地址:https://gitcode.com/open-source-toolkit/7e953>，代码已下载到本地了。

<https://juejin.cn/post/7446201937274880050>，uni-app+vue3绘制图片，等待所有图片加载完成return Promise.all(imagePromises).then 再绘制。

<https://mp.weixin.qq.com/s/Ul7-KBYZgt-twbY8fg5opA>，微信小程序画布canvas的使用以及案例图片加水印的处理。

<https://mp.weixin.qq.com/s/Fdv-0D5ybR3T3PIhr6gBJA>，小程序 — canvas图片合成，【拼相框】

<https://github.com/nimoat/photo-edit>，微信小程序：图片裁剪、缩放、涂鸦、添加文字、拼长图、拼相框、表情包制作。便捷的图片编辑工具。【有解题思路】

微信小程序画布canvas的使用以及案例图片加水印的处理：<https://mp.weixin.qq.com/s/Ul7-KBYZgt-twbY8fg5opA>

开源小程序，练手必备，仿“美图秀秀”处理图片：<https://mp.weixin.qq.com/s/xhLC0mwAEMO8k4lHD8bztQ>
四、拼长图
拼长图界面由image组件构成。用户从系统相册选择图片时，将图片的临时路径保存到数组中，而image组件使用列表渲染（wx:for）将数组中的图片全部载入界面，实现拼接的演示效果。在image上绑定longtap事件，长按一张图片后，弹出删除该图片的确认框，确认后在数组中删除该图片的路径，实现删除的演示效果。
保存时，将数组中的图片依次画在隐藏canvas上，所有图片宽度保持一致，高度按图片比例缩放，每张图片的定位由图片的宽高、缩放比计算得到。这样就实现的拼长图的功能。


# 三、Canvas 的基本使用

旧版 Canvas 迁移指南：<https://developers.weixin.qq.com/miniprogram/dev/framework/ability/canvas-legacy-migration.html>

```js
// 1、定义 canvas 标签
<canvas id="myCanvas" type="2d" />

// 2、修改获取 CanvasContext
wx.createSelectorQuery()
    .select('#myCanvas') // 在 WXML 中填入的 id
    .node(({ node: canvas }) => {
        const context = canvas.getContext('2d')
    })
    .exec()

// 3、画布大小初始化
// 旧版 canvas 不能修改宽高
// 新版 Canvas 2D 接口允许开发者自由修改画布的逻辑大小，默认宽高为 300*150。
wx.createSelectorQuery()
    .select('#myCanvas') // 在 WXML 中填入的 id
    .fields({ node: true, size: true })
    .exec((res) => {
        // Canvas 对象实例
        const canvas = res[0].node
        // Canvas 画布的实际绘制宽高，画布逻辑大小
        const renderWidth = res[0].width
        const renderHeight = res[0].height
        // Canvas 绘制上下文
        const ctx = canvas.getContext('2d')

        // 初始化画布大小
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = renderWidth * dpr
        canvas.height = renderHeight * dpr
        ctx.scale(dpr, dpr)
    })

// 4、绘制图片
const image = canvas.createImage()
image.onload = () => {
    context.drawImage(
        image,
        0,
        0,
        150,
        100,
    )
}
image.src = 'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_wx_logo.png'

// 5、把当前画布指定区域的内容导出生成指定大小的图片
wx.canvasToTempFilePath({
    canvas: canvas,
    success(res) {
        //
    }
})
```
