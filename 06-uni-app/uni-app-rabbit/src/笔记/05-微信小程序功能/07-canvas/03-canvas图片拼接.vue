<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance, nextTick, onMounted } from 'vue'
import { isImageUrl } from '@/utils/tools';
import type { TemplateItem } from '@/types/home';
import type { MadeParams, WorksItem, MovableBoxInfo } from '@/types/made';
import { useMemberStore } from '@/stores';

// 声明父组件传递的属性
const props = defineProps<{
  /** 制作状态：-1：制作失败；0: 正在制作；1：制作成功；2：开始制作 */
  status: number
  /** 制作类型： */
  madeType: number
  templateItem?: TemplateItem
  workItem?: WorksItem
  madeParams?: MadeParams
  pageTimestamp: number   // 页面时间戳
}>()

const getTemplateId = () => {
  return props.templateItem?.id
}

// 暴露组件自身的方法，供父组件调用
defineExpose({
  getTemplateId
})


// 当前使用的模型 id
const id = computed(() => {
  return props.status === 1 ? props.workItem?.id : props.templateItem?.id
})

// 画布容器的宽、高
const panelContentW = ref('100%')
const panelContentH = ref('100%')

const instance = getCurrentInstance()

// 画布宽高比
let panelAspectRatio = '3/4'
// 画布的大小
let panelW = 0
let panelH = 0
// 移动盒子的大小
let moveBoxW: number
let moveBoxH: number

// 移动元素的排列方向：row column
let moveDirection = 'row'
// 移动元素的大小、位置、缩放信息
const firstMovableInfo = ref<MovableBoxInfo>({ x: 0, y: 0, scale: 1, initialWidth: 0, initialHeight: 0 })
const secondMovableInfo = ref<MovableBoxInfo>({ x: 0, y: 0, scale: 1, initialWidth: 0, initialHeight: 0 })

// 图片1
const firstImgUrl = "https://phantasm-file-sh.oss-cn-shanghai.aliyuncs.com/admin/1/2024/11/21/1732159669122_df3a9ede%E9%A3%9E%E5%A4%A9%E7%A5%9E%E5%A5%B3(1).jpg"
const firstimgW = 1189
const firstimgH = 1609

// 图片2
const secondImgUrl = "https://phantasm-file-sh.oss-cn-shanghai.aliyuncs.com/admin/1/2024/12/10/1733821141626_18704c59优雅.jpg"
const secondimgW = 1024
const secondimgH = 1024

onMounted(() => {
  let selectorQuery = uni.createSelectorQuery().in(instance?.proxy);
  selectorQuery?.select(".media-container")
    .boundingClientRect((data ) => {
      const { width, height } = data as UniApp.NodeInfo
      // console.log('---czm 盒子的大小 = ', width, height)

      // 1、设置画布面板的大小
      if (panelAspectRatio === '3/4') {
        panelW = width ?? 0
        panelH = panelW*4/3
      } else {
        panelW = width ?? 0
        panelH = panelW*3/4
      }

      panelContentW.value = panelW + 'px'
      panelContentH.value = panelH + 'px'

      // 2、设置移动盒子的大小
      if (moveDirection === 'row') {
        moveBoxW = panelW*0.5
        moveBoxH = panelH
      } else {
        moveBoxW = panelW
        moveBoxH = panelH*0.5
      }

      // 设置移动盒子1的大小
      firstMovableInfo.value.initialWidth = moveBoxW
      firstMovableInfo.value.initialHeight = moveBoxH

      if (moveBoxW/moveBoxH >= firstimgW/firstimgH) {
        firstMovableInfo.value.initialHeight = moveBoxW * firstimgH / firstimgW
      } else {
        firstMovableInfo.value.initialWidth = moveBoxH * firstimgW / firstimgH
      }

      // 设置移动盒子1的大小
      secondMovableInfo.value.initialWidth = moveBoxW
      secondMovableInfo.value.initialHeight = moveBoxH

      if (moveBoxW/moveBoxH >= secondimgW/secondimgH) {
        secondMovableInfo.value.initialHeight = moveBoxW * secondimgH / secondimgW
      } else {
        secondMovableInfo.value.initialWidth = moveBoxH * secondimgW / secondimgH
      }
    })
    .exec()
})

const onChangeFirstMovable: UniHelper.MovableViewOnChange = (e) => {
  const { x, y, source } = e.detail
  if (source === 'touch') {
    firstMovableInfo.value.x = x
    firstMovableInfo.value.y = y
  }
}

const onScaleFristMovable: UniHelper.MovableViewOnScale = (e) => {
  const { x, y, scale } = e.detail
  firstMovableInfo.value.x = x
  firstMovableInfo.value.y = y
  if (Number(e.detail.scale)) {
    firstMovableInfo.value.scale = Number(e.detail.scale)
  }
}

const onChangeSecondMovable: UniHelper.MovableViewOnChange = (e) => {
  const { x, y, source } = e.detail
  if (source === 'touch') {
    secondMovableInfo.value.x = x
    secondMovableInfo.value.y = y
  }
}

const onScaleSecondMovable: UniHelper.MovableViewOnScale = (e) => {
  const { x, y, scale } = e.detail
  secondMovableInfo.value.x = x
  secondMovableInfo.value.y = y
  if (Number(e.detail.scale)) {
    secondMovableInfo.value.scale = Number(e.detail.scale)
  }
}

const onMovableEnd = () => {
  console.log('---移动结束 first =', firstMovableInfo.value)
  console.log('---移动结束 second =', secondMovableInfo.value)
}

const onSave = () => {

  uni.showLoading({ title: '处理中...', mask: true })
  const imgFirCrd = getDrawCoordinate(firstMovableInfo.value, firstimgW, firstimgH, false)
  const imgSecCrd = getDrawCoordinate(secondMovableInfo.value, secondimgW, secondimgH, true)
  // console.log('----点击保存 =', imgFirCrd, imgSecCrd)
  let selectorQuery = uni.createSelectorQuery().in(instance?.proxy);
  selectorQuery?.select('#myCanvas')
      .fields({ size: true, node: true }, async (res: any) => {

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
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 绘制背景
        ctx.fillStyle = "#FFFFFF"
				ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.save();

        const loadImage = (src: string) => {
          return new Promise((resolve, reject) => {
            const img = canvas.createImage()
            img.src = src
            img.onload = () => resolve(img);
            img.onerror = (err: any) => reject(err);
          })
        }

        await Promise.all([loadImage(firstImgUrl), loadImage(secondImgUrl)]).then((images) => {
          console.log('----------开始绘制图片')
          ctx.drawImage(images[0], imgFirCrd.dx, imgFirCrd.dy, imgFirCrd.dWidth, imgFirCrd.dHeight, imgFirCrd.sx, imgFirCrd.sy, imgFirCrd.sWidth, imgFirCrd.sHeight)
          ctx.drawImage(images[1], imgSecCrd.dx, imgSecCrd.dy, imgSecCrd.dWidth, imgSecCrd.dHeight, imgSecCrd.sx, imgSecCrd.sy, imgSecCrd.sWidth, imgSecCrd.sHeight)
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
              uni.showToast({ title: '保存成功', icon: "none" });
            },
            fail: (err) => {
              console.log('---绘制失败 error = ', err)
              uni.showToast({ title: JSON.stringify(res), icon: "none" });
            }
          }, instance)

        }).catch((err) => {
          uni.showToast({ title: JSON.stringify(res), icon: "none" });
          console.log('----图片加载失败 err =', err)
        })
      })
      .exec()
}

// 图片经历移动、缩放后，获取绘制坐标
const getDrawCoordinate = (movableBoxInfo: MovableBoxInfo, imgWidth: number, imgHeight: number, isSecond: boolean) => {
  const { x, y, scale, initialWidth, initialHeight } = movableBoxInfo
  const scaleW = scale * initialWidth
  const scaleH = scale * initialHeight

  // 计算显示区域
  const visibleLeft = Math.max(0, x)
  const visibleRight = Math.min(x + scaleW, moveBoxW)
  const visibleTop = Math.max(0, y)
  const visibleBottom = Math.min(y + scaleH, moveBoxH)

  // 图片像素和缩放盒子的比率
  const ratioW = imgWidth / scaleW
  const ratioH = imgHeight / scaleH

  // 1、图片需要绘制的像素区域
  const dx = (visibleLeft - x) * ratioW
  const dy = (visibleTop - y) * ratioH
  const dWidth = Math.max(0, visibleRight - visibleLeft) * ratioW
  const dHeight = Math.max(0, visibleBottom - visibleTop) * ratioH

  // 2、需要逻辑渲染的区域
  let sx = Math.max(0, x)
  let sy =  Math.max(0, y)
  const sWidth = visibleRight - visibleLeft
  const sHeight = visibleBottom - visibleTop

  if (isSecond) {
    if (moveDirection === 'row') {  // 右边图片
      sx += moveBoxW
      return { dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight }
    } else {  // 下边图片
      sy += moveBoxH
      return { dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight }
    }
  } else {
    return { dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight }
  }
}

// 获取绘制坐标【原始】
const getDrawCoordinate1 = () => {
  const { x, y, scale, initialWidth, initialHeight } = firstMovableInfo.value
  const scaleW = scale * initialWidth
  const scaleH = scale * initialHeight

  // 计算显示区域
  const visibleLeft = Math.max(0, x)
  const visibleRight = Math.min(x + scaleW, moveBoxW)
  const visibleTop = Math.max(0, y)
  const visibleBottom = Math.min(y + scaleH, moveBoxH)

  // 图片像素和缩放盒子的比率
  const ratioW = firstimgH / scaleW
  const ratioH = firstimgH / scaleH

  // 1、图片需要绘制的像素区域
  const dx = (visibleLeft - x) * ratioW
  const dy = (visibleTop - y) * ratioH
  const dWidth = Math.max(0, visibleRight - visibleLeft)
  const dHeight = Math.max(0, visibleBottom - visibleTop)

  // 2、需要逻辑渲染的区域
  const sx = Math.max(0, x)
  const sy =  Math.max(0, y)
  const sWidth = visibleRight - visibleLeft
  const sHeight = visibleBottom - visibleTop
}


</script>

<!-- 媒体展示box：展示预览、配置list选择 等 -->
<template>
  <!-- 展示图片、视频 -->
  <view class="media-container flex-row-center">
    <view class="media-content" :style="{ width: panelContentW, height: panelContentH, flexDirection: moveDirection }">
      <movable-area :class="moveDirection === 'row' ? 'row-item' : 'column-item'">
        <movable-view
          id="first"
          :style="{ width: firstMovableInfo.initialWidth + 'px', height: firstMovableInfo.initialHeight + 'px' }"
          direction="all"
          :animation="false"
          :scale-min="0.5"
          :scale-max="5"
          scale
          @change="onChangeFirstMovable"
          @scale="onScaleFristMovable"
          @touchend="onMovableEnd"
        >
          <image
            :src="firstImgUrl"
            mode="aspectFit"
            style="width: 100%; height: 100%;"
          />
        </movable-view>
      </movable-area>
      <movable-area :class="moveDirection === 'row' ? 'row-item' : 'column-item'">
        <movable-view
          id="first"
          :style="{ width: secondMovableInfo.initialWidth + 'px', height: secondMovableInfo.initialHeight + 'px' }"
          direction="all"
          :animation="false"
          :scale-min="0.5"
          :scale-max="5"
          scale
          @change="onChangeSecondMovable"
          @scale="onScaleSecondMovable"
          @touchend="onMovableEnd"
        >
          <image
            :src="secondImgUrl"
            mode="aspectFit"
            style="width: 100%; height: 100%;"
          />
        </movable-view>
      </movable-area>
      <canvas type="2d" id="myCanvas" canvas-id="myCanvas" class="canvas-content"></canvas>
      <button class="save-btn" @click="onSave">保存</button>
      <!-- 加载loading -->
      <view v-if="status === 0" style="background: rgba(0, 0, 0, 0.30);" class="loading-box">
        <image class="loading-img" src="https://www.xiangshuren.com/wxmp/made_loading.png" mode="aspectFill" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.media-container {
  position: relative;
  margin: 72rpx 48rpx 40rpx;
  flex: 1 !important;
  background-color: pink;
  box-sizing: border-box;
  .media-content {
    display: flex;
    justify-content: space-between;
    position: relative;
    // border-radius: 48rpx;
    background-color: red;
    overflow: hidden;
    .row-item {
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
    .column-item {
      width: 100%;
      height: 50%;
      overflow: hidden;
    }
    .canvas-content {
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 100%;
      height: 100%;
    }
    .save-btn {
      position: absolute;
      top: 100px;
      left: 50px;
      width: 100px;
      height: 40px;
      font-size: 14px;
      background-color: orange;

    }
  }
}
.loading-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 88;
  border-radius: 48rpx;
  .loading-img {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 144rpx;
    height: 144rpx;
    border-radius: 48rpx;
    animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
