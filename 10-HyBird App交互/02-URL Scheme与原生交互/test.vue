<script setup lang="ts">
const onNativeAction = () => {
  loadUrl('heima://click')
}

const loadUrl = (url: string) => {
  // 创建iframe
  const iframe = document.createElement('iframe')
  // 设置url
  iframe.src = url

  // 设置尺寸(不希望他被看到)
  iframe.style.width = '0'
  iframe.style.height = '0'

  // 添加到页面上
  document.body.appendChild(iframe)

  // 加载了url之后他就没用了，移除iframe
  iframe.parentNode?.removeChild(iframe)
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <button class="btn" @click="onNativeAction">通过 URL Scheme 方式与移动端交互</button>
  </main>
</template>

<style scoped>
.btn {
  margin-top: 200px;
  height: 44px;
  font-size: 15px;
}
</style>
