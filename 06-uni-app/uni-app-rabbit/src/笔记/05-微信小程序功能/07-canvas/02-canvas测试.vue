<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const instance = getCurrentInstance()
let selectorQuery: UniApp.SelectorQuery | undefined

onLoad(() => {
  selectorQuery = uni.createSelectorQuery().in(instance?.proxy);
  // selectorQuery?.select(".media-container")
  //   .boundingClientRect((data ) => {
  //     const { width, height } = data as UniApp.NodeInfo
  //     console.log('---czm 盒子的大小 = ', width, height)
  //     // 1、3 : 4
  //     mediaBoxWidth.value = width + 'px'
  //     mediaBoxHeight.value = ((width ?? 0) * 4 / 3) + 'px'
  //     console.log('---czm 盒子的大小 2 = ', width, ((width ?? 0) * 4 / 3))
  //     // 2、4 : 3

  //   })
  //   .exec()
})

const imgUrl = "https://phantasm-file-sh.oss-cn-shanghai.aliyuncs.com/admin/1/2024/11/21/1732159669122_df3a9ede%E9%A3%9E%E5%A4%A9%E7%A5%9E%E5%A5%B3(1).jpg"


// 点击保存
const onSave = async () => {

  selectorQuery?.select('#myCanvas')
      .fields({ size: true, node: true }, (res: any) => {
        const { width, height, node } = res
        // Canvas 对象
        const canvas = res.node
        // 渲染上下文
        const ctx = canvas.getContext('2d')

        // 初始化画布大小，wx小程序默认为 300x150，因此必须调整
        const dpr = uni.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        // 绘制背景
        ctx.fillStyle = "#FFFFFF"
				ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.save();

        const image = canvas.createImage()
        image.src = imgUrl
        image.onload = () => {
          // 背景填充颜色
          // 327, 436
          console.log('--- 图片加载成功')
          // 327, 436
          //
          // ctx.drawImage(image, 0, 0, 320, 201)
          const dWidth = 1189*0.5
          const dHeight = 1189*0.5*4/1.5
          console.log('---czm =', dWidth, dHeight)
          ctx.drawImage(image, dWidth, 0, dWidth, dHeight, 0, 0, width*0.5, height)
          ctx.drawImage(image, 0, 0, dWidth, dHeight, width*0.5, 0, width*0.5, height)
          ctx.save()
          uni.canvasToTempFilePath({
            canvasId: 'myCanvas',
            canvas: canvas,
            success: function (res) {
              console.log('---画布生成图片成功 = ', res.tempFilePath)
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath
              })
              wx.hideLoading();
            },
            fail: (err) => {
              console.log('---画图失败 error = ', err)
            }
          }, instance)
        }

      })
      .exec((res) => {
        // console.log('---czm res =', res)
      })

}

const exportImg = () => {
  uni.canvasToTempFilePath({
    canvasId: 'myCanvas',
    success: function (res) {
      console.log('---画布生成图片成功 = ', res.tempFilePath)
      // uni.previewImage({
      //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
      // })
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
      wx.hideLoading();
    },
    fail: (err) => {
      console.log('---画图失败 error = ', err)
    }
  }, instance)
}
</script>

<template>
  <view class="viewport">
    <view class="container canvas-content">
      <!-- type="2d" -->
      <canvas id="myCanvas" canvas-id="myCanvas" class="canvas-content" type="2d"></canvas>
    </view>
    <button class="save-btn" @click="onSave">保存</button>
  </view>
</template>

<style lang="scss">
page {
  background-color: #FAFAFA;
}
.viewport {
  padding: 0 32rpx;
  display: flex;
  flex-direction: column;
}
.container {
  width: 100%;
  height: 600rpx;
}
.canvas-content {
  position: absolute;
  left: -9999;
  top: -9999;
  width: 654rpx;
  height: 872rpx;

}
.save-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 196rpx 56rpx 0;
  height: 112rpx;
  border-radius: 56rpx;
  background: linear-gradient(90deg, #FF7566 0%, #FF599E 33.33%, #F56DD5 66.67%, #D393FF 100%);
  color: #FFF;
  text-align: center;
  font-family: "PingFang SC";
  font-size: 28rpx;
  font-weight: 500;
}
</style>
