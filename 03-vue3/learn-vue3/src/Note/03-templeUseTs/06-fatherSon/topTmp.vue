<script setup lang="ts">
import StyleButton from './StyleButton.vue'

const handleMsg = (msg: string) => {
  console.log(msg)
}

const handleList = () => {
  console.log('---list')
}

</script>

<template>
  <div>
    <StyleButton color="red" btnType="success"  @get-msg="handleMsg" @get-list="handleList"/>
  </div>
</template>

<style scoped>

</style>