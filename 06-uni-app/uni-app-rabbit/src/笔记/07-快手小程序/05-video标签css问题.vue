<script setup lang="ts">

</script>

<!-- <video
        class="video-box"
        src="https://phantasm-file.xiangshuren.com/admin/1/2025/01/17/1737108197646_74dcf3db.mp4"
        autoplay
        loop
        :show-center-play-btn="false"
        :controls="false"
        :show-fullscreen-btn="true"
        :enable-progress-gesture="false"
        object-fit="contain"
        @loadeddata="onLoadedmetadata"
        @error="onErrorVideo"
      /> -->
<!--
https://phantasm-file.xiangshuren.com/admin/1/2025/01/17/1737107553593_58be6da9.mp4

https://phantasm-file.xiangshuren.com/admin/1/2025/01/17/1737108197646_74dcf3db.mp4
  -->

<template>
  <view class="pink-box">
    <view class="first-box">
      <view class="media-content">
        <video
          class="video-box"
          src="https://phantasm-file.xiangshuren.com/admin/1/2025/01/17/1737108197646_74dcf3db.mp4"
          autoplay
          loop
          :show-center-play-btn="false"
          :controls="false"
          :show-fullscreen-btn="true"
          :enable-progress-gesture="false"
          object-fit="cover"
        />
      </view>
    </view>
  </view>
  <view class="green-box"></view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
}
.pink-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: pink;
  .first-box {
    position: relative;
    margin: 72rpx 48rpx 40rpx;
    flex: 1 !important;
    background-color: red;
    box-sizing: border-box;
    .media-content {
      position: relative;
      border-radius: 48rpx;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: greenyellow;
      .video-box {
        // position: absolute;
        // top: 0;
        // left: 0;
        // bottom: 0;
        // right: 0;
        width: 100%;
        height: 100%;
        border-radius: 48rpx;
      }
    }

  }
}
.green-box {
  width: 100%;
  height: 200rpx;
  background-color: green;
}
</style>
