<script setup>
import { ref } from 'vue'
import SubBox from './SubBox.vue'
</script>

<template>
  <div class="child">
    <h2>父组件</h2>
    <SubBox></SubBox>
  </div>
</template>

<style scoped>
.child {
  padding: 30px;
  border: 1px solid lightpink;
}
</style>
