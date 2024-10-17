<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { ref } from 'vue'

const title = ref('你好')
</script>

<template>
  <!-- 手动导入局部组件 -->
  <CustomNavbar />
  <!-- 自动导入全局组件 -->
  <XtxSwiper />
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: red;
}
</style>
