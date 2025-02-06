# 一、使用使用了props传递数据，则ref获取到组件实例为 null

* 1、定义 HighTest组件
```vue
<template>
  <view class="h_header">
    <text>测试内容</text>
  </view>
</template>

<script setup>
  const open = () => {
    console.log('i m fine')
  }
  defineExpose({
    open
  })
</script>
```

* 2、定义 SomeTest组件
```vue
<template>
  <view class="h_header">
    <text>{{ '---' + props.content + '---' }}</text>
  </view>
</template>

<script setup>
  const props = defineProps({
    content: String
  }) 

  const open = () => {
    console.log('i m fine')
  }
  defineExpose({
    open
  })
</script>
```

* 3、ref获取2个组件的实例
```vue
<template>
  <view class="content">
    <SomeTest ref="someRef" :content="someText"></SomeTest>
    <HighTest ref="testRef"></HighTest>
    <button @click="onButton">点击获取ref</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SomeTest from './some-test.vue'
import HighTest from './high-test.vue'

const someText = ref('我是父组件内的内容！')

const someRef = ref(null)
const testRef = ref(null)

 const onButton = () => {
  console.log('---czm someRef =', someRef.value)    // 这里打印一直是 null
  someRef.value?.open()
  console.log('----czm testRef = ', testRef.value)  // 可以正常获取到组件
  testRef.value?.open()
 }

</script>
```

官方解答：<https://ask.dcloud.net.cn/question/204250>

```
经过测试，在快手小程序组件基础库 1.8.0 是正常的，在基础库 1.8.0 之后获取失败，具体原因还有待调查。
建议先降低基础库版本使用
```
