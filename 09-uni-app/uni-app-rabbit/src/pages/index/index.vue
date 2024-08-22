<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

const isLoading = ref(false)

onLoad( async () => {
  isLoading.value = true
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData()
  ])
  isLoading.value = false
})

// 定义子组件模版对象
const guessRef = ref<XtxGuessInstance>()

// 滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

// 下拉刷新
const isTriggered = ref<boolean>(false)
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  try {
    // 重置猜你喜欢的数据
    guessRef.value?.resetData()
    // 加载数据
    // await getHomeBannerData()
    // await getHomeCategoryData()
    // await getHomeHotData()
    // Promise.all 优化异步加载
    await Promise.all([
      getHomeBannerData(),
      getHomeCategoryData(),
      getHomeHotData(),
      guessRef.value?.getMore()
    ])
    // 结束动画
    isTriggered.value = false
  } catch (err) {
    // 结束动画
    isTriggered.value = false
  }
}

</script>

<template>
  <!-- 手动导入局部组件：导航栏 -->
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading"/>
    <template v-else>
      <!-- 自动导入全局组件，轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板组件 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐组件 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢组件 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
/* 通过 page 设置整个页面的背景，注意 style 标签不能使用 scoped */
page {
  background-color: #F7F7F7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
