# 一、up-popup 组件中使用 textarea 报错

## 1、问题描述

在 `uview-plus` 组件库中的 `up-popup` 组件内使用 `textarea` 组件，在快手小程序中会出现如下bug：
* `up-popup` 弹窗显示时，`textarea` 组件的 frame 正常显示，`placeholder` 不显示，点击无法响应输入；
* 快手开发者工具可以正常看到 `textarea` 组件的结构，表现都正常。
* 在微信小程序中表现正常。

问题代码如下：
```vue
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';

const placeholderText = ref('好好学习，天天向上');
const inputText = ref('');
const isShow = ref(false)

// 显示弹窗
const show = () => {
  console.log('---显示=');
  isShow.value = true;
  setTimeout(() => {
    placeholderText.value = '';
  }, 500);
}

// 关闭弹窗
const close = () => {
  console.log('---隐藏=');
  isShow.value = false;
  placeholderText.value = '';
}

defineExpose({
  show,
  close
})
</script>

<template>

<up-popup
  :show="isShow"
  mode="bottom"
  :safeAreaInsetBottom="false"
  round="48rpx"
  @open="show"
  @close="close"
>
  <view class="popup-content">
    <view class="textarea-container">
      <textarea
        v-if="placeholderText"
        class="textarea-content"
        placeholder-class="placeholder"
        :placeholder="placeholderText"
        v-model="inputText"
        :maxlength="200"
        :cursor-spacing="90"
      />
    </view>
  </view>
</up-popup>
</template>

<style lang="scss">
.popup-content {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 48rpx 48rpx 0 0;
  box-shadow: 0px 0px 7.8px 0px rgba(0, 0, 0, 0.16);
  width: 100%;
  height: 200rpx;
}
.textarea-container {
  margin: 0 40rpx;
  margin-top: 12rpx;
  padding: 16rpx 20rpx;
  width: calc(100% - 80rpx);
  height: 144rpx;
  box-sizing: border-box;
  border-radius: 16rpx;
  background: rgba(0, 0, 0, 0.04);

}
.textarea-content {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.80);
    font-family: "PingFang SC";
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
  }
  .placeholder {
    color: rgba(0, 0, 0, 0.40);
    font-family: "PingFang SC";
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
  }
</style>
```
## 2、解决办法如下

1、通过 v-if 指令 控制 `textarea` 组件在 `up-popup` 弹窗显示时重新渲染；

2、提高 `textarea` 组件的 `z-index` css 层级样式；

```vue
<script setup lang="ts">
const placeholderText = ref('好好学习，天天向上');
// #ifdef MP-KUAISHOU
placeholderText.value = '';
// #endif

const show = () => {
  console.log('---显示=');
  isShow.value = true;
  // #ifdef MP-KUAISHOU
  setTimeout(() => {
    placeholderText.value = '好好学习，天天向上';
  }, 500);
  // #endif
}

// 关闭弹窗
const close = () => {
  console.log('---隐藏=');
  isShow.value = false;
  // #ifdef MP-KUAISHOU
  placeholderText.value = '';
  // #endif
}
</script>

<template>
  <textarea
    v-if="placeholderText"
    class="textarea-content"
  />
</template>

<style lang="scss">
  .textarea-content {
    /*  #ifdef MP-KUAISHOU  */
    z-index: 99999999 !important;
    :nth-child(n) {
      z-index: 99999999 !important;
    }
    /*  #endif  */
  }
</style>
```
