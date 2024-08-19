<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Tabs as VanTabs, Tab as VanTab } from 'vant';

import axios from 'axios';
import List from './ListItem.vue'
import type { ChannelItem, ChannelRes } from './data.d.ts'

// 1、声明响应式数据(ref + ts)

const channelList = ref<ChannelItem[]>([])

// 2、axios 获取数据
const getList = async () => {
  const res = await axios.request<ChannelRes>({
    url: 'http://geek.itheima.net/v1_0/channels',
    method: 'GET'
  })

  // 3、数据赋值给响应式列表（类型自然匹配）
  channelList.value = res.data.data.channels
  console.log('---', channelList.value[0])
}

onMounted(() => {
  getList()
})

// 4、响应式列表渲染到模版（类型提示）
// 频道id 
const channelId = ref(0)

const tabChange = (id: number) => {
  channelId.value = id
}

</script>

<template>
  <!-- tab切换 -->
  <van-tabs @change="tabChange">
    <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
      <!-- 文章列表组件 -->
      <List :channelId="channelId" />
    </van-tab>
  </van-tabs>

</template>

<style scoped>

</style>

