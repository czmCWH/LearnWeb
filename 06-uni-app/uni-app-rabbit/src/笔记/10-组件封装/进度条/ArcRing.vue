<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';

/**
 * @description 半圆环形进度条（上半圆，开口向下，顺时针，0%~100%）
 * 使用方式： <ArcRing :percent="progress1" :size="100" :showText="false" />
 */

const props = withDefaults(defineProps<{
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  text?: string;
  textColor?: string;
  textSize?: number;
  duration?: number;
  animated?: boolean;
  lineCap?: CanvasLineCap;
}>(), {
  size: 200,
  strokeWidth: 10,
  color: '#1890ff',
  backgroundColor: '#f0f0f0',
  showText: true,
  textColor: '#000',
  textSize: 16,
  duration: 500,
  animated: true,
  lineCap: 'round'
});

const animatedPercent = ref(props.percent);
const ctx = ref<UniApp.CanvasContext | null>(null);
let animationTimer: number | null = null;

const center = computed(() => props.size / 2);
const radius = computed(() => (props.size - props.strokeWidth) / 2);
const textDisplay = computed(() => props.text ?? `${Math.round(animatedPercent.value)}%`);

const instance = getCurrentInstance();

// 上半圆（开口向下）：从 -π（左）到 0（右），顺时针
const START_ANGLE = -Math.PI;
const END_ANGLE = 0;
const ARC_RANGE = Math.PI; // 180度

const drawCircle = (percent: number) => {
  if (!ctx.value) return;
  const cx = center.value;
  const cy = center.value;
  const r = radius.value;

  ctx.value.clearRect(0, 0, props.size, props.size);

  // 背景半环（完整上半圆）
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, r, START_ANGLE, END_ANGLE, false); // false = 顺时针
  ctx.value.setLineWidth(props.strokeWidth);
  ctx.value.setStrokeStyle(props.backgroundColor);
  ctx.value.setLineCap(props.lineCap);
  ctx.value.stroke();

   // 确保进度不超过100%
  const actualPercent = Math.min(percent, 100);

  // 进度半环
  const endAngle = START_ANGLE + ARC_RANGE * (actualPercent / 100);
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, r, START_ANGLE, endAngle, false);
  ctx.value.setStrokeStyle(props.color);
  ctx.value.setLineWidth(props.strokeWidth);
  ctx.value.setLineCap(props.lineCap);
  ctx.value.stroke();

  // 文字（居中显示）
  if (props.showText) {
    ctx.value.setFillStyle(props.textColor);
    ctx.value.setFontSize(props.textSize);
    ctx.value.setTextAlign('center');
    ctx.value.setTextBaseline('middle');
    ctx.value.fillText(textDisplay.value, cx, cy);
  }

  ctx.value.draw();
};

const animate = (from: number, to: number) => {
  if (!props.animated || from === to) {
    animatedPercent.value = to;
    drawCircle(to);
    return;
  }

  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }

  const startTime = Date.now();
  const duration = props.duration;

  const step = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    const current = from + (to - from) * progress;
    animatedPercent.value = current;
    drawCircle(current);

    if (progress < 1) {
      animationTimer = setTimeout(step, 16);
    } else {
      animatedPercent.value = to;
      animationTimer = null;
    }
  };

  step();
};

onMounted(() => {
  nextTick(() => {
    if (instance?.proxy) {
      ctx.value = uni.createCanvasContext('circleCanvas', instance.proxy);
    } else {
      ctx.value = uni.createCanvasContext('circleCanvas');
    }
    drawCircle(props.percent);
  });
});

watch(() => props.percent, (newVal, oldVal) => {
  animate(oldVal, newVal);
});

watch([
  () => props.size,
  () => props.strokeWidth,
  () => props.color,
  () => props.backgroundColor,
  () => props.text,
  () => props.showText,
  () => props.textColor,
  () => props.textSize,
  () => props.lineCap
], () => {
  drawCircle(animatedPercent.value);
}, { deep: false });
</script>

<template>
  <view class="circle-progress-wrapper">
    <canvas
      id="circleCanvas"
      class="circle-canvas"
      :style="{ width: props.size + 'px', height: props.size + 'px' }"
      canvas-id="circleCanvas"
    />
  </view>
</template>


<style scoped>
.circle-progress-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-canvas {
  display: block;
}
</style>
