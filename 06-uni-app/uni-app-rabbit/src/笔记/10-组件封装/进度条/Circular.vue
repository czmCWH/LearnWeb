
<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue';

/**
 * @description 环形进度条组件
 * 使用方式：<Circular :percent="progress1" :size="100" :showText="false" />
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

// 获取组件实例（用于 createCanvasContext）
const instance = getCurrentInstance();

const drawCircle = (percent: number) => {
  if (!ctx.value) return;
  const cx = center.value;
  const cy = center.value;
  const r = radius.value;

  ctx.value.clearRect(0, 0, props.size, props.size);

  // 背景环
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.value.setLineWidth(props.strokeWidth);
  ctx.value.setStrokeStyle(props.backgroundColor);
  ctx.value.setLineCap(props.lineCap);
  ctx.value.stroke();

   // 确保进度不超过100%
  const actualPercent = Math.min(percent, 100);

  // 进度环
  const endAngle = -Math.PI / 2 + 2 * Math.PI * (actualPercent / 100);
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, r, -Math.PI / 2, endAngle);
  ctx.value.setStrokeStyle(props.color);
  ctx.value.setLineWidth(props.strokeWidth);
  ctx.value.setLineCap(props.lineCap);
  ctx.value.stroke();

  // 文字
  if (props.showText) {
    ctx.value.setFillStyle(props.textColor);
    ctx.value.setFontSize(props.textSize);
    ctx.value.setTextAlign('center');
    ctx.value.setTextBaseline('middle');
    ctx.value.fillText(textDisplay.value, cx, cy);
  }

  ctx.value.draw(); // 小程序中必须调用 draw()
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
      animationTimer = setTimeout(step, 16); // ~60fps
    } else {
      animatedPercent.value = to;
      animationTimer = null;
    }
  };

  step();
};

onMounted(() => {
  nextTick(() => {
    // ✅ 正确获取 canvas 上下文（uni-app 小程序）
    if (instance?.proxy) {
      ctx.value = uni.createCanvasContext('circleCanvas', instance.proxy);
    } else {
      // 兜底（H5 可能不需要 proxy）
      ctx.value = uni.createCanvasContext('circleCanvas');
    }
    drawCircle(props.percent);
  });
});

watch(() => props.percent, (newVal, oldVal) => {
  animate(oldVal, newVal);
});

// 监听其他可能影响绘制的属性
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
