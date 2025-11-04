# 抖音 Canvas
`tt.createCanvas`，<https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/drawing/picture/tt-create-canvas>

`canvas 画布`，<https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/canvas/canvas>

`CanvasContext.drawImage`，<https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/canvas/v1/canvas-context/draw-image>


## 绘制案例
```vue
<template>
  <canvas 
    id="canvasId"
    canvas-id="canvasId"  
    type="2d"  
    :style="{ width: photoInfo === undefined ?  '300px' : photoInfo.width + 'px', height: photoInfo === undefined ? '300px' :  photoInfo.height + 'px'}" 
  />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';

// 图片资源信息，图片路径、大小
const photoInfo = ref<{
  path: string
  width: number
  height: number
}>();

const instance = getCurrentInstance();
let canvas: any = undefined;

const onChangeImage = async () => {
  const imgFilePath = await chooseMedia(1,1,1,true);
  const imgFileInfo = await uni.getImageInfo({ src: imgFilePath });
  const width = 375.0;
  const height = 375.0 * imgFileInfo.height / imgFileInfo.width;

  photoInfo.value = { path: imgFilePath, width, height };

  let selectorQuery = uni.createSelectorQuery().in(instance?.proxy);
  selectorQuery?.select('#canvasId')
    .fields({ size: true, node: true }, async (res: any) => {
      const { node } = res;
      canvas = node;
      const ctx = node.getContext('2d');

      // 设置 canvas 画布的大小
      const dpr = uni.getSystemInfoSync().pixelRatio;
      canvas.width = width * dpr;   // 配置分辨率，避免图片模糊
      canvas.height = height * dpr;
      
      // 开始绘制图片
      const image = canvas.createImage();
      image.onload = () => {
        // ⚠️，drawImage 前4个坐标参数为图片资源的像素范围；后4个参数为 canvas 画布的大小区域。
        ctx.drawImage(image, 0, 0, imgFileInfo.width, imgFileInfo.height, 0, 0, width * dpr, height * dpr);
      };
      image.onerror = (err: any) => {
        console.log("image 绘制失败 = ", err);
      };
      image.src = imgFilePath;
    })
    .exec();
}

const onSave = () => {
  // 获取画布绘制内容数据
  const base64 = canvas.toDataURL();
  const base64Img = base64.replace(/^data:image\/\w+;base64,/, '');
  const arrayBuffer = uni.base64ToArrayBuffer(base64Img);

  try {
    const fileSystemManager = uni.getFileSystemManager();
    const randomName = Math.random().toString().replace('.', '');
    // @ts-ignore
    const filePath = `${uni.getEnvInfoSync().common.USER_DATA_PATH}/${randomName}.png`;

    // 同步写入临时文件
    // const filePath = `ttfile://user/${Date.now()}.png`;
    console.log('----czm filePath =', filePath);

    // fileSystemManager.writeFileSync(filePath, arrayBuffer, 'binary');
    // uni.saveImageToPhotosAlbum({
    //     filePath: filePath,
    //     success: () => console.log('---- czm 头条 ，保存成功！'),
    //     fail: (err) => console.log('---- czm 头条 ，保存失败 = ', err)
    //   });

    // 异步写入临时文件
    fileSystemManager.writeFile({
      filePath,
      data: arrayBuffer,
      encoding: 'binary',
      success: (res) => {
        console.log('写入成功', res);
        uni.saveImageToPhotosAlbum({
          filePath: filePath,
          success: () => console.log('---- czm 保存成功！'),
          fail: (err) => console.log('---- czm 保存失败 = ', err)
        });
      },
      fail: (err) => {
        console.log('写入失败', err);
      }
    });
  } catch (e) {
      console.log('----czm 失败 = ', e);
  }
}
</script>
```
