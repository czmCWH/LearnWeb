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

缩放 movable-view 后，拖动触发 bindchange 方法获得的 x，y 值不正确。我个人理解是：正确的 x，y 值应该是 movable-view 的左上角点相对于 movable-area 的左上角点的偏移量，具体表现却不是如此。

