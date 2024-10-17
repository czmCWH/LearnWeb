<script setup lang="ts">
import { Button as VanButton } from 'vant'
// import { useUserStore } from '@/stores/modules/user'
import { useUserStore } from '@/stores'
import axios, { request } from '@/utils/request'
import type { User } from '@/types/user'

const userStore = useUserStore()

const loginHandle = () => {
  userStore.setUser({
    id: '1',
    avatar: 'https://www.baidu.com',
    token: 'adfshkfhk',
    mobile: '13403423323',
    account: 'sdfsf'
  })
}

const exitHandle = () => {
  userStore.delUser()
}
const getUserInfo = () => {
  axios.request({
    url: 'patient/myUser',
    method: 'GET'
  })
}
const login = () => {
  axios
    .request({
      url: 'login/password',
      method: 'POST',
      data: {
        mobile: '13211112222',
        password: 'abc12345'
      }
    })
    .then((res: any) => {
      console.log('---成功-', res)
    })
    .catch((error: any) => {
      console.log('---失败-', error)
    })
}
const login2 = async () => {
  const { data } = await request<User>('login/password', 'post', {
    mobile: '13211112222',
    password: 'abc12345'
  })
  console.log('---登录测试2', data)
}
</script>

<template>
  <div>
    <h2>状态管理、数据持久化</h2>
    <div>用户信息：{{ userStore.user }}</div>
    <van-button @click="loginHandle">登录</van-button>
    <van-button @click="exitHandle">退出</van-button>

    <div style="margin-top: 20px">
      <h2>网络请求封装</h2>
      <van-button @click="getUserInfo">模拟请求失败</van-button>
      <van-button @click="login">登录测试</van-button>
      <van-button @click="login2">登录测试2</van-button>
    </div>
  </div>
</template>

<style scoped></style>
