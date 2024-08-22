<!--
此文件为开发者工具生成，生成时间: 2024/8/22下午2:21:42
使用方法：
在 /Users/CZM/Git/github/LearnWeb/09-uni-app/uni-app-rabbit/dist/dev/mp-weixin/pages/index/index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 /Users/CZM/Git/github/LearnWeb/09-uni-app/uni-app-rabbit/dist/dev/mp-weixin/pages/index/index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view is="components/XtxSwiper">
        <view class="carousel XtxSwiper--carousel data-v-17cc3903 XtxSwiper--data-v-17cc3903">
          <swiper :autoplay="false" :circular="true" class="data-v-17cc3903 XtxSwiper--data-v-17cc3903" :interval="3000" :current="0"></swiper>
          <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903">
            <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
            <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
            <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
            <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903 active XtxSwiper--active"></text>
            <text class="dot XtxSwiper--dot data-v-17cc3903 XtxSwiper--data-v-17cc3903"></text>
          </view>
        </view>
  </view>
  <view is="pages/index/components/CategoryPanel">
    <view class="category CategoryPanel--category data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-778 sk-text">居家</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-752 sk-text">锦鲤</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-669 sk-text">服饰</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-788 sk-text">母婴</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-689 sk-text">个护</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-413 sk-text">严选</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-516 sk-text">数码</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-569 sk-text">运动</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-149 sk-text">杂项</text>
      </navigator>
      <navigator class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81" hover-class="none">
        <image class="icon CategoryPanel--icon data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"></image>
        <text class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-268 sk-text">品牌</text>
      </navigator>
    </view>
  </view>
  <view is="pages/index/components/HotPanel">
    <view class="panel HotPanel--panel hot HotPanel--hot data-v-df6c854a HotPanel--data-v-df6c854a">
      <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
        <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
          <text class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-988 sk-text">特惠推荐</text>
          <text class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-151 sk-text">精选全攻略</text>
        </view>
        <navigator class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a" hover-class="none">
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
        <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
          <text class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-662 sk-text">爆款推荐</text>
          <text class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-115 sk-text">最受欢迎</text>
        </view>
        <navigator class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a" hover-class="none">
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
        <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
          <text class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-22 sk-text">一站买全</text>
          <text class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-944 sk-text">精心优选</text>
        </view>
        <navigator class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a" hover-class="none">
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
      <view class="item HotPanel--item data-v-df6c854a HotPanel--data-v-df6c854a">
        <view class="title HotPanel--title data-v-df6c854a HotPanel--data-v-df6c854a">
          <text class="title-text HotPanel--title-text data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-563 sk-text">新鲜好物</text>
          <text class="title-desc HotPanel--title-desc data-v-df6c854a HotPanel--data-v-df6c854a sk-transparent sk-text-14-2857-601 sk-text">生活加分项</text>
        </view>
        <navigator class="cards HotPanel--cards data-v-df6c854a HotPanel--data-v-df6c854a" hover-class="none">
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
          <image class="image HotPanel--image data-v-df6c854a HotPanel--data-v-df6c854a sk-image" mode="aspectFit"></image>
        </navigator>
      </view>
    </view>
  </view>
  <view is="components/XtxGuess" class="r r">
    <view class="caption XtxGuess--caption data-v-e94a02da XtxGuess--data-v-e94a02da">
      <text class="text XtxGuess--text data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-0-0000-261 sk-text sk-pseudo sk-pseudo-circle">猜你喜欢</text>
    </view>
  </view>
</template>

<style>
.sk-transparent {
  color: transparent !important;
}
.sk-text-3-3333-905 {
  background-image: linear-gradient(transparent 3.3333%, #EEEEEE 0%, #EEEEEE 96.6667%, transparent 0%) !important;
  background-size: 100% 27.1739rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-322 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 38.0435rpx;
  position: relative !important;
}
.sk-text-14-2857-778 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-752 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-669 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-788 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-689 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-413 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-516 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-569 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-149 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-268 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-988 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 43.1159rpx;
  position: relative !important;
}
.sk-text-14-2857-151 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 32.9710rpx;
  position: relative !important;
}
.sk-text-14-2857-662 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 43.1159rpx;
  position: relative !important;
}
.sk-text-14-2857-115 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 32.9710rpx;
  position: relative !important;
}
.sk-text-14-2857-22 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 43.1159rpx;
  position: relative !important;
}
.sk-text-14-2857-944 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 32.9710rpx;
  position: relative !important;
}
.sk-text-14-2857-563 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 43.1159rpx;
  position: relative !important;
}
.sk-text-14-2857-601 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 32.9710rpx;
  position: relative !important;
}
.sk-text-0-0000-261 {
  background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
  background-size: 100% 30.7971rpx;
  position: relative !important;
}
.sk-image {
  background: #EFEFEF !important;
}
.sk-pseudo::before, .sk-pseudo::after {
    background: #EFEFEF !important;
    background-image: none !important;
    color: transparent !important;
    border-color: transparent !important;
  }
.sk-pseudo-rect::before, .sk-pseudo-rect::after {
    border-radius: 0 !important;
  }
.sk-pseudo-circle::before, .sk-pseudo-circle::after {
    border-radius: 50% !important;
  }
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
