// 创建计数器 store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useChannelStore = defineStore('channel', () => {
  // 定义类型
  type ChannelItem = {
    id: number
    name: string
  }
  type ResData = {
    data: {
      channels: ChannelItem[]
    }
    message: string
  }

  // 2、定义响应式数据(state)
  const list = ref<ChannelItem[]>([])

  // 3、获取数据(异步action)
  const getList = async () => {
    const res = await axios.request<ResData>({
      url: 'http://geek.itheima.net/v1_0/channels',
      method: 'GET'
    })
    list.value = res.data.data.channels
  }

  // 3、以对象的方式return 出去供组件使用
  return {
    list,
    getList
  }
})
