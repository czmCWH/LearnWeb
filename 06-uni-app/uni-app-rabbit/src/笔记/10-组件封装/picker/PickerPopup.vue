<script setup lang="ts">
/**
 * @description 首页弹窗组件：月份选择、卡路里目标选择
 */
import { ref, computed } from 'vue';
import { getFirstDaysOfPreviousSixMonths } from '@/utils/calendar';

// 定义属性接收父组件方法，用于子组件调用父组件的方法
const emit = defineEmits<{
  confirm: [date?: Date, calorie?: number]
}>()

const isShow = ref(false)
/** 1：选择月份；2：选择卡路里 */
let showType = 0;

const title = ref('');
const columns = ref<String[]>([]);
const defaultIndex = ref<any[]>([]);
let currentIndex: number | undefined = undefined;

let firstDaysArray: Date[] = [];
const calorieArray = ['1800', '1900', '2000', '2100', '2200'];

/**
 * 显示弹窗
 * @param type 1：选择月份；2：选择卡路里
 * @param date 当前选择的日期
 * @param calorie 当前选择卡路里
 */
const show = (type: number, date?: Date, calorie?: Number ) => {
  showType = type;
  let itemStr = '';
  if (type === 1 && date !== undefined) {
    title.value = '日期选择';
    firstDaysArray = getFirstDaysOfPreviousSixMonths(new Date());
    const dateArray = firstDaysArray.map(date => {
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    });
    columns.value = dateArray;
    itemStr = `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }
  if (type === 2 && calorie !== undefined) {
    title.value = '每日目标';
    columns.value = calorieArray;
    itemStr = `${calorie}`;
  }

  const index = columns.value.indexOf(itemStr);
  if (index !== -1) {
    setTimeout(() => {
       defaultIndex.value = [index];
    }, 200);
  } else {
    defaultIndex.value = [];
  }
  currentIndex = defaultIndex.value[0];
  isShow.value = true;
}

const onChange: UniHelper.PickerViewOnChange = (e) => {
  const { type, detail } = e;
  const selectIdx = detail.value[0];
  currentIndex = selectIdx
}

const onSubmit = () => {
  if (currentIndex !== undefined) {
    if (showType === 1) {
      let date = firstDaysArray[currentIndex];
      emit('confirm', date, undefined);
    } else {
      let calorie = calorieArray[currentIndex];
      emit('confirm', undefined, Number(calorie));
    }
  }
  isShow.value = false;
}

const onHidden = () => {
  firstDaysArray = [];
}

// 暴露子组件的属性 和 方法 允许父组件访问。
defineExpose({
  show
})
</script>

<template>
  <up-popup
    v-model:show="isShow"
    hidden="onHidden"
    mode="center"
    :safeAreaInsetBottom="false"
    :closeOnClickOverlay="true"
    round="48rpx"
  >
    <view class="pop-container">
      <text>{{ title }}</text>
      <picker-view indicator-class="indicator" :immediate-change="true" :value="defaultIndex" class="picker-view" @change="onChange">
        <picker-view-column class="column">
          <view class="item" v-for="(item,index) in columns" :key="index">{{ item }}</view>
        </picker-view-column>
      </picker-view>
      <view class="submit-btn" @click="onSubmit">确定</view>
    </view>
  </up-popup>
</template>

<style lang="scss">
.pop-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 636rpx;
  padding: 40rpx;
  box-sizing: border-box;
  border-radius: 48rpx;

  text {
    font-size: 32rpx;
    font-weight: bold;
    color: #000;
  }
  .picker-view {
    width: 100%;
    height: 350rpx;
    .indicator {
      height: 100rpx;
    }
    .item {
      line-height: 100rpx;
		  text-align: center;
    }
  }
  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #13c2c2;
    color: #fff;
    text-align: center;
    height: 96rpx;
    border-radius: 32rpx;
    font-size: 32rpx;
  }
}
</style>
