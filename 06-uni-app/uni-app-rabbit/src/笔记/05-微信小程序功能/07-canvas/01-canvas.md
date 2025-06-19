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


### uni-app 使用 Canvas 绘制图片


```ts
<canvas type="2d" id="myCanvas" canvas-id="myCanvas" class="canvas-content"></canvas>

.canvas-content {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 128px;
  height: 64px;
}


const instance = getCurrentInstance();

// 准备水平并列绘制2张图片，大小为：64x64px
const url = 'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_wx_logo.png';
const imgSize = 64;

// 第1，获取 Canvas 节点、 Size 
const nodeData = await new Promise<any>((resolve) => {
  let query = uni.createSelectorQuery().in(instance?.proxy);
  query.select('#myCanvas')
    .fields({ size: true, node: true }, (res) => {
      resolve(res);
    })
    .exec()
})
const { width, height, node } = nodeData
// Canvas 节点
const canvasNode = node;

// 第2，调整 Canvas 的输出图片的大小，即画布绘制完成后输出的像素大小
// ⚠️，也可以通过css绑定，来修改 <canvas> 标签的 style 大小来指定，这样就不需要这一步设置了。
const pixelRatio = 3;
const actualWidth = width * 3;
const actualHeight = height * 3;

canvasNode.width = actualWidth;
canvasNode.height = actualHeight;
// #ifdef MP-WEIXIN
ctx.scale(pixelRatio, pixelRatio);
// #endif

// 第3，准备好画布
// 3.1、获取 Canvas 上下文
let ctx: any;
// https://developers.weixin.qq.com/miniprogram/dev/api/canvas/RenderingContext.html
// #ifdef MP-WEIXIN
ctx = canvasNode.getContext("2d");
// #endif
// #ifndef MP-WEIXIN
ctx = uni.createCanvasContext('myCanvas');
// #endif

// 3.2、清除画布上次的内容
ctx.clearRect(0, 0, actualWidth, actualHeight);
// 绘制背景
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, actualWidth, actualHeight);


// 第4，准备好图片，根据不同的平台：返回一个 Image 对象、本地文件地址、网络图片下载后的地址
const loadImage = (src: string) => {
  return new Promise<any>((resolve, reject) => {
    // #ifdef MP-WEIXIN
    const img = canvas.createImage()
    img.src = src
    img.onload = () => resolve(img);
    img.onerror = (err: any) => reject(err);
    // #endif
    // #ifndef MP-WEIXIN
    // ⚠️，快手端，网络图片需要下载到本地才可以绘制；而本地图片不需要下载。
    // https://developers.kuaishou.com/topic?tid=3098&bizType=miniprogram
    if (src.startsWith('http')) {
      uni.downloadFile({
        url: src,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    } else {
      resolve(src);
    }
    // #endif
    });
}

// 第5，开始绘制
await Promise.all([loadImage(url), loadImage(url)]).then((images) => {
  ctx.drawImage(images[0], 0, 0, imgSize, imgSize, 0, 0, actualWidth * 0.5, actualHeight);
  ctx.drawImage(images[1], 0, 0, imgSize, imgSize, actualWidth * 0.5, 0, actualWidth * 0.5, actualHeight);
  // #ifdef MP-WEIXIN
  uni.canvasToTempFilePath({
    canvasId: 'myCanvas',
    canvas: canvas,
    width: actualWidth,
    height: actualHeight,
    destWidth: actualWidth,
    destHeight: actualHeight,
    success: function (res) {
     uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
      uni.showToast({ title: "保存成功！", icon: "none" });
    },
    fail: (err) => {
      console.log('---wx 绘制失败 error = ', err)
    }
  }, instance)
  // #endif
  // #ifndef MP-WEIXIN
  ctx.draw(); // 在快手小程序中 callback 回调函数 可能不会调用，可以单独拿出来书写。
  uni.canvasToTempFilePath({
    canvasId: 'myCanvas',
    canvas: canvas,
    width: actualWidth,
    height: actualHeight,
    destWidth: actualWidth,
    destHeight: actualHeight,
    success: function (res) {
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
      uni.showToast({ title: "保存成功！", icon: "none" });
    },
    fail: (err) => {
      console.log('---ks 绘制失败 error = ', err)
    }
  }, instance)
  // #endif

}).catch((err) => {
  console.log('----图片加载失败 err =', err)
});

```


https://developers.kuaishou.com/topic?tid=3118&bizType=miniprogram
