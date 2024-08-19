import type { User } from '@/types/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 1、定义用户信息状态
    const user = ref<User>()

    // 2、设置用户信息的函数
    const setUser = (u: User) => {
      user.value = u
    }

    // 删除用户信息的函数
    const delUser = () => {
      user.value = undefined
    }

    return { user, setUser, delUser }
  },
  {
    // 开启数据持久化存储到本地
    persist: true
  }
)
