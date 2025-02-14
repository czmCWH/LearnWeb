# movable-view 

快手小程序，movable-view 样式绑定后，缩小后无法在 movable-area 中随意移动。

问题：
<https://ask.dcloud.net.cn/question/205428>
<https://developers.kuaishou.com/topic?tid=26449&bizType=miniprogram&tag=1739241276612>

```vue
<script setup lang="ts">  
import { ref } from 'vue'  

const styObj = {  
  width: '600rpx',  
  height: '500rpx',  
  'background-color': 'pink'  
}  

</script>  

<template>  
  <view class="move-container">  
    <movable-area class='area' scale-area>  
      <!-- :style="{ width: boxW + 'px', height: boxH + 'px', 'background-color': 'orange'}" -->  
      <movable-view  
        :style="styObj"  
        direction='all'  
        :animation="false"  
        :scale-min="0.1"  
        :scale-max="10"  
        scale  
      >  
      </movable-view>  
    </movable-area>  
  </view>  
  <view class="move-container">  
    <movable-area class='area' scale-area>  
      <movable-view  
        class="move-box"  
        direction='all'  
        :animation="false"  
        :scale-min="0.1"  
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
