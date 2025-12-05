<script lang="ts" setup>
/**
 * @description 渐变旋转 Loading
 */
import { ref } from "vue";

// 可自行传入提示文字
const props = defineProps<{
  text?: string
}>()

const text = ref(props.text || "解析中...")

/**
 * 计算每个圆点的位置和动画延迟
 */
const dotStyle = (n: number) => {
  const deg = (360 / 8) * (n - 1)
  return {
    transform: `rotate(${deg}deg) translateY(-32rpx)`,
    animationDelay: `${(n - 1) * 0.12}s`
  }
}
</script>

<template>
  <view class="parsing-loading">
    <!-- loading 环形动画 -->
    <view class="loader">
      <view class="dot" v-for="n in 8" :key="n" :style="dotStyle(n)"></view>
    </view>
    <view class="loading-text">{{ text }}</view>
  </view>
</template>

<style scoped>
.parsing-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 0;
  width: 100%;
}
.loader {
  position: relative;
  width: 64rpx;
  height: 64rpx;
  margin-bottom: 24rpx;
}
.dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12rpx;
  height: 12rpx;
  margin-left: -6rpx; /* half of width */
  margin-top: -32rpx; /* translateY 距离 */
  background: #007aff;
  border-radius: 50%;
  opacity: 0.85;
  animation: loaderFade 1s linear infinite;
}

@keyframes loaderFade {
  0%, 100% { opacity: 0.25; }
  40% { opacity: 1; }
  60% { opacity: 0.85; }
}
.loading-text {
  font-size: 28rpx;
  color: #888;
  letter-spacing: 2rpx;
}
</style>
