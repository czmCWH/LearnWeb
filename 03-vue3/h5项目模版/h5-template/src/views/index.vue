<script setup lang="ts">
import { ref, watch } from 'vue'
import { $t } from '@/locales'
console.log('---深色模式 =', window.matchMedia('(prefers-color-scheme: dark)').matches)
console.log('--- userAgent =', navigator.userAgent)
</script>
<template>
  <div class="main">H5项目模版</div>
  <h2>{{ $t('demo.description') }}</h2>
  <h3>{{ $t('tools.successBtn') }}</h3>
</template>

<style lang="scss" scoped>
.main {
  width: 375px;
  height: 375px;
  background-color: var(--cp-primary);
  color: black;
  text-align: center;
}
</style>
