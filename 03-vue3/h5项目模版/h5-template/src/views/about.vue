<script setup lang="ts">
import { $t } from '../locales/index'

console.log('---深色模式 =', window.matchMedia('(prefers-color-scheme: dark)').matches)
console.log('--- userAgent =', navigator.userAgent)
</script>

<template>
  <div class="about">我是关于orange</div>
  <h2>{{ $t('demo.description') }}</h2>
  <h3>{{ $t('tools.successBtn') }}</h3>
</template>

<style lang="scss" scoped>
.about {
  background-color: orange;
  width: 375px;
  height: 20px;
}
</style>
