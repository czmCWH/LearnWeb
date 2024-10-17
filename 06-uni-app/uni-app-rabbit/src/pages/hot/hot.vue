// /src/pages/hot/hot.vue
<script setup lang="ts">
import { getHotRecommendAPI } from '@/services/hot';
import { onLoad } from '@dcloudio/uni-app'
import type { SubTypeItem } from '@/types/hot'
import { ref } from 'vue'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
// defineProps 是uni-app获取参数的方法，组件中获取的是父传子的数据；页面中获取的是页面参数，即路由参数
const query = defineProps<{
  type: string
}>()

const currUrlMap = hotMap.find((v) => v.type === query.type )
console.log('---czm = ', currUrlMap)
// 动态设置页面导航栏标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

// 高亮选项下标
const activeIndex = ref(0)

// 获取热门推荐数据
const bannerPicture = ref<string>('')
// 在原有类型上扩展finish
const subTypes = ref<(SubTypeItem & {finish?: boolean})[]>([])
const getHotRecommendData = async () => {
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    // 测试技巧：环境变量 import.meta.env
    page: import.meta.env.DEV ? 30: 1,
    pageSize: 10
  })
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}

onLoad(() => {
  getHotRecommendData()
})

// 滚动触底
const onScrolltolower = async () => {
  // 获取当前选项
  const currSubTypes = subTypes.value[activeIndex.value]
  // 当前页码累加
  if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
    currSubTypes.goodsItems.page++
  } else {
    // 标记已结束
    currSubTypes.finish = true
    return
  }
  // 请求传参
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subType: currSubTypes.id,
    page: currSubTypes.goodsItems.page,
    pageSize: currSubTypes.goodsItems.pageSize
  })
  // 新的列表数据
  const newSubTyps = res.result.subTypes[activeIndex.value]
  // 追加数据
  currSubTypes.goodsItems.items.push(...newSubTyps.goodsItems.items)
}

</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
      >{{ item.title }}
      </text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view @scrolltolower="onScrolltolower" v-for="(item, index) in subTypes" :key="item.id" v-show="activeIndex === index" scroll-y class="scroll-view">
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image
            class="thumb"
            :src="goods.picture"
          ></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了～' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
