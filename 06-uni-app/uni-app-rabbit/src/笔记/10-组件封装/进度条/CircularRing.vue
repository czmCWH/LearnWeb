<script setup lang="ts">
/**
 * @description 用 CSS 实现半圆环形进度条（上半圆，开口向下，顺时针，0%~100%）
 * 使用：<CircularRing :percent="45" />，percent取值为 0～100
 * 参考：https://juejin.cn/post/6891173045675769864?from=search-suggest
 */
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
  percent: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
  lineCap?: CanvasLineCap;
}>(), {
  percent: 0,
  size: uni.upx2px(258),
  strokeWidth: uni.upx2px(16),
  strokeColor: '#49D1D1',
  backgroundColor: '#F0F0F0'
});

/** 左右端点 top */
const capTop = computed(() => {
  return (props.size - props.strokeWidth) * 0.5 + 'px';
})

</script>

<template>
  <view
    :style="{
      position: 'relative',
      width: props.size + 'px',
      height: props.size * 0.5 + 'px',
    }"
  >
    <!-- 背景扇形 -->
    <view class="progress-ring"
      :style="{
        width: props.size + 'px',
        height: props.size + 'px',
        background: `conic-gradient(from -90deg, ${props.backgroundColor} 0deg 180deg, transparent 180deg 360deg)`
      }"
    >
      <!-- 轨道扇形 -->
      <view
        class="progress-fill"
        :style="{
          background: `conic-gradient(from -90deg, ${props.strokeColor} calc(${props.percent} * 1.8deg), transparent 0deg)`
        }"
      />
      <!-- 中间填充蒙版 -->
      <view
        class="progress-inner"
        :style="{
          top: props.strokeWidth + 'px',
          left: props.strokeWidth + 'px',
          width: props.size - props.strokeWidth * 2 + 'px',
          height: props.size - props.strokeWidth * 2 + 'px',
        }"
      />
    </view>
    <!-- 右边端点 -->
    <view
      class="line-cap"
      :style="{
        width: props.strokeWidth + 'px',
        height: props.strokeWidth + 'px',
        backgroundColor: props.strokeColor,
        top: capTop,
        left: '0px',

      }"
    />
    <!-- 右边端点 -->
    <view
      class="line-cap"
      :style="{
        width: props.strokeWidth + 'px',
        height: props.strokeWidth + 'px',
        backgroundColor: props.backgroundColor,
        top: capTop,
        right: '0px',
      }"
    />
    <!-- 进度端点 -->
    <view
      class="line-cap"
      :style="{
        width: props.strokeWidth + 'px',
        height: props.strokeWidth + 'px',
        backgroundColor: props.strokeColor,
        top: capTop,
        left: '0px',
        'transform-origin': `${props.size * 0.5}px center`,
        transform: `rotate(${props.percent * 1.8}deg)`
      }"
    />
  </view>

</template>

<style scoped>
.progress-ring {
  position: relative;
  border-radius: 50%;
  /* 底层灰色轨道（完整圆环） */
  background: conic-gradient(from -90deg,#F0F0F0 0deg 180deg, transparent 180deg 360deg);
  /* 裁剪：只显示上半部分（开口向下） */
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* 动态计算填充角度：--percent 是 0~100 */
  background: conic-gradient(from -90deg, red calc(var(--percent) * 1.8deg), transparent 0deg);
  /* 同样裁剪上半部分 */
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}
.progress-inner {
  position: absolute;
  /* width: calc(100% - 32rpx);
  height: calc(100% - 32rpx); */
  border-radius: 50%;
  /* 动态计算填充角度：--percent 是 0~100 */
  background: #fff;
  clip-path: polygon(0 0, 100% 0, 100% 60%, 0 60%);
}
.line-cap {
  position: absolute;
  border-radius: 50%;
  z-index: 88;
}
</style>
