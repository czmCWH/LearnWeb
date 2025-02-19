# 一、movable-view 的 size 改变，其移动范围不更新

快手小程序，movable-view 样式绑定修改 size 后，movable-view 的移动范围不更新。

问题：

如下代码所示，pink 盒子的初始 size 为 0x0，那么其刚好可以在 movable-area 内移动。css绑定修改 size 后，移动范围没有更新，和 size 为 0x0 时一样。

<https://ask.dcloud.net.cn/question/205428>
<https://developers.kuaishou.com/topic?tid=26449&bizType=miniprogram&tag=1739241276612>
<https://developers.weixin.qq.com/community/develop/doc/00066e818cc8c8abdef11bc8e66000?highLine=movable-view>


## 解决办法：
> 在样式变化后，可以通过 v-if 条件渲染的方式，强制 movable-view 重新加载。

```vue
<script setup lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'

const boxW = ref(600)
const boxH = ref(500)

</script>

<template>
  <view ref="containerRef" class="move-container">
    <movable-area class="area" scale-area>
      <!-- 解决办法：对于快手小程序，如果去掉 v-if="boxW > 0"，则 movable-view 的移动范围是按 size 为 0x0 计算出来的，此时移动范围是错误的。  -->
      <movable-view
        v-if="boxW > 0"
        :style="{ width: boxW + 'rpx', height: boxH + 'rpx', 'background-color': 'red' }"
        direction='all'
        :scale-min="0.2"
        :scale-max="10"
        scale
      >
      </movable-view>
    </movable-area>
  </view>
  <view class="move-container">
    <movable-area class='area' scale-area>
      <movable-view
        style="width: 600rpx; height: 500rpx; background-color: orange;"
        direction='all'
        :animation="false"
        :scale-min="0.2"
        :scale-max="10"
        scale
      >
      </movable-view>
    </movable-area>
  </view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
}
.move-container {
  margin-top: 50rpx;
  width: 100%;
  height: 600rpx;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.area {
  width: 50%;
  height: 100%;
  background-color: aquamarine;
  .move-box {
    width: 600rpx;
    height: 500rpx;
    background-color: orange;
  }
}
</style>
```

# 二、movable-view 缩放移动后，x,y 坐标错误

## 问题：

<https://developers.kuaishou.com/topic?tid=26513&bizType=miniprogram&tag=1739845722409>

缩放 movable-view 后，拖动触发 bindchange 方法获得的 (x, y) 是相对于【它自身缩小、放大后显示位置】的偏移量，而不是相对于 movable-area 左上角的坐标点。

## 解决办法：

如下伪代码换算：

```js
// movable-view 的相关值
let scale = 1;  // 缩放大小
const initialWidth, initialHeight;    // 初始size
const scaleWidth, scaleHeight;    // 缩放后的 size

// movable-view 缩放后 原点 的偏移量，前提条件是 movable-view 的 scale 为 1 时，它的左上角定位在 movable-area 的左上角。
const offX = (scaleWidth - initialWidth)*0.5
const offY = (scaleHeight - initialHeight)*0.5

// 换算 movable-view 左上角相对于 movable-area 左上角的坐标为 positionX、positionY
---- 1、放大

const positionX = -offX + x;
const positionY = -offY + y;

---- 2、缩小
const positionX = -offX + x;
const positionY = -offY + y;
```

