<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { postSortThemeListAPI } from '@/services/home';
import { useMemberStore } from '@/stores';
import { getScreenSize, getStatusBarHeight } from '@/utils/system';

// 定义接收父组件数据
const props = defineProps<{
  titles: { id: number, name: string}[]
  menuTop: number
}>()

// 声明父组件传递的方法
const emit = defineEmits<{
  click: [id: number]
  change: [ids: number[]]
}>()

/** 是否显示 menu */
const isShow = ref(false)
const menuList = ref<{ name: string, id: number, x: number, y: number, key: number }[]>([])

const onShow = () => {
  menuList.value = props.titles.filter((item) => item.id !== -1).map((item, index) => {
    const [x, y] = getItemPosition(index);
    return {
      ...item,
      x,
      y,
      key: Math.random() + index
    }
  })
  // console.log('---czm show list =', menuList.value)
  isShow.value = true
}

const onHidden = () => {
  isShow.value = false
}

// 暴露组件自身的方法给父组件使用
defineExpose({
  onShow,
  onHidden
})

// const { statusBarHeight, windowWidth } = uni.getWindowInfo()
const statusBarHeight = getStatusBarHeight()
const windowWidth = getScreenSize().screenWidth

/** 宽度缩放比例 */
const ratioW = computed(() => {
  const wStr = (windowWidth / 375).toFixed(2)
  return parseFloat(wStr)
})
const calMenuTop = computed(() => {
  if (props.menuTop === 0) {
    let navBarH = Math.floor(4*ratioW.value) + Math.floor(30*ratioW.value) + Math.floor(30*ratioW.value) + Math.floor(8*ratioW.value) + statusBarHeight
    let tabsH = Math.floor(42*ratioW.value)
    return navBarH + tabsH
  } else {
    return props.menuTop
  }
})
/** 行数数 */
const row = computed(() => {
  return Math.ceil(menuList.value.length / column)
})
/** 列数 */
const column = 4
/** 格子的宽度 */
const itemWValue = computed(() => {
  const itemW = (375 - 24)/column
  return (itemW * ratioW.value).toFixed(2)
})
/** 格子的宽度 */
const itemHValue = computed(() => {
  const itemH = 40
  return (itemH * ratioW.value).toFixed(2)
})
// 根据索引获取格子的坐标位置
const getItemPosition = (index: number) => {
  const x = (index % column) * parseFloat(itemWValue.value)
  const y = Math.floor(index / column) * parseFloat(itemHValue.value)
  return [x, y]
}

// 是否可以拖拽
const dragDisabled = ref(true)
// 拖拽格子的索引
const activeIndex = ref(-1)
let oldIndex = -1
let moveToIndex = -1

/** 长按 */
const handleLongpress = () => {
  // console.log('---czm = 1 长按 ')
  dragDisabled.value = false
}

/** 拖拽开始 */
const handleDragStart = (index: number) => {
  // console.log('---czm = 2 拖拽开始')
  activeIndex.value = index
  oldIndex = index
  dragDisabled.value = false
}

/** 拖拽中 */
const onChange: UniHelper.MovableViewOnChange = (e) => {
  const { x, y, source } = e.detail
  if (source !== 'touch' || dragDisabled.value) return;

  const itemW = parseFloat(itemWValue.value)
  const itemH = parseFloat(itemHValue.value)
  const xAxisIdx = Math.floor((x + itemW / 2) / itemW)
  const yAxisIdx = Math.floor((y + itemH / 2) / itemH)

  moveToIndex = Math.min(yAxisIdx * column + xAxisIdx, menuList.value.length - 1)
  // console.log('---czm = 3 拖拽中 = ', activeIndex.value, oldIndex, moveToIndex)

  if (oldIndex !== moveToIndex && oldIndex !== -1 && moveToIndex !== -1) {
    let newList: { id: number, name: string}[] = deepCopy(menuList.value)
    newList.splice(moveToIndex, 0, ...newList.splice(activeIndex.value, 1))
    menuList.value.forEach((item, index) => {
      if (index !== activeIndex.value) {
        const itemIndex = newList.findIndex(val => val.name === item.name);
        [item.x, item.y] = getItemPosition(itemIndex)
      }
    });
    oldIndex = moveToIndex
  }
  let item = menuList.value[activeIndex.value];
  [item.x, item.y] = [x, y];

}

/** 拖拽结束 */
const handleDragEnd = () => {
  if (dragDisabled.value) return
  // console.log('---czm = 4 拖拽结束 = ', activeIndex.value, oldIndex, moveToIndex)
  if (oldIndex !== -1 && moveToIndex !== -1) {
    const moveItem = menuList.value[activeIndex.value];
    [moveItem.x, moveItem.y] = getItemPosition(oldIndex);
    // 排序 menuList
    let newList: { name: string, id: number, x: number, y: number, key: number }[] = deepCopy(menuList.value)
    newList.splice(moveToIndex, 0, ...newList.splice(activeIndex.value, 1))
    setTimeout(() => {
      menuList.value = newList
    }, 300);
  }

  activeIndex.value = -1
  oldIndex = -1
  moveToIndex = -1
  dragDisabled.value = true
}

const deepCopy = (source: any) => {
  return JSON.parse(JSON.stringify(source));
}

// 点击item
const onClickItem = (index: number, item: { name: string, id: number, x: number, y: number, key: number } ) => {
  // console.log('---- czm 点击排序menu = ', item.name, item.id)
  emit('click', item.id)
  isShow.value = !isShow.value
}

// 点击完成排序
const memberStore = useMemberStore()
const onSortOrder = async () => {
  const originStr = props.titles.filter((item) => item.id !== -1).map(item => item.id + item.name).toString()
  const nowStr = menuList.value.map(item => item.id + item.name).toString()
  if (originStr === nowStr) {
    isShow.value = !isShow.value
    return
  }
  // 更新排序1
  if (memberStore.accessToken === undefined) {
    const ids = menuList.value.map(item => item.id)
    emit('change', ids)
    isShow.value = !isShow.value
    return
  }
  // 更新排序2
  let params = menuList.value.map((item, index) => {
    return {
      id: item.id,
      sortOrder: index + 1
    }
  })
  uni.showLoading({ title: '处理中...', mask: true });
  const res = await postSortThemeListAPI(params)
  if (res.code === 1) {
    emit('change', [])
    uni.hideLoading()
    isShow.value = !isShow.value
  } else {
    uni.showToast({ title: res.msg, icon: "none" });
  }
}
</script>

<template>
  <view class="container" v-show="isShow" @click="onHidden">
    <view class="mask-box" :style="{ marginTop: calMenuTop + 'px' }">
      <view class="header-box">
        <view class="left">
          <text class="title">我的主题</text>
          <text class="desc">点击进入主题 长按可拖动排序</text>
        </view>
        <view class="btn" @click.prevent="onSortOrder">完成排序</view>
      </view>
      <view class="radius-box">
        <movable-area
          class="move-container"
          @click.prevent=""
          :style="{ height: (row*parseFloat(itemHValue)) + 'px' }"
        >
          <movable-view
            :style="{ width: itemWValue + 'px', height: itemHValue + 'px' }"
            class="move-item"
            :class="{ active: activeIndex === index }"
            v-for="(item, index) in menuList"
            :key="item.key"
            :x="item.x"
            :y="item.y"
            direction="all"
            :disabled="dragDisabled"
            @longpress="handleLongpress"
            @touchstart="handleDragStart(index)"
            @change="onChange"
            @touchend="handleDragEnd"
            @click="onClickItem(index, item)"
          >
            <text class="item-text">{{ item.name }}</text>
          </movable-view>
        </movable-area>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.mask-box {
  margin: 0 0 0 0;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}
.header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 40rpx 40rpx 0 36rpx;
  box-sizing: border-box;
  background-color: #fff;
  .left {
    display: flex;
    flex-direction: column;
    .title {
      height: 48rpx;
      color: rgba(0, 0, 0, 0.80);
      font-family: "PingFang SC";
      font-size: 32rpx;
      font-weight: 500;
      line-height: 48rpx;
    }
    .desc {
      height: 36rpx;
      color: rgba(0, 0, 0, 0.60);
      font-family: "PingFang SC";
      font-size: 24rpx;
      font-weight: 400;
      line-height: 36rpx;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 44rpx;
    color: #FF307A;
    text-align: right;
    font-family: "PingFang SC";
    font-size: 28rpx;
    font-weight: 500;
  }
}
.radius-box {
  padding: 12rpx 24rpx 24rpx 24rpx;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0px 0px 32rpx 32rpx;
  background-color: #fff;
  // box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16);
}
.move-container {
  width: 100%;
  box-sizing: border-box;
}
.move-item {
  padding: 8rpx;
  box-sizing: border-box;
  opacity: 1;
	z-index: 1;
  &.active {
		opacity: 0.7;
		transform: scale(1.3);
		z-index: 99;
	}
  .item-text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
    background: rgba(255, 48, 122, 0.06);
    color: rgba(0, 0, 0, 0.60);
    font-family: "PingFang SC";
    font-size: 28rpx;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
