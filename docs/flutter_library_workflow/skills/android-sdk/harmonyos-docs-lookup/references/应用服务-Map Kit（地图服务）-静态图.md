## 场景介绍

本章节将向您介绍如何使用静态图功能。静态图功能会返回一张地图图片，您可以将地图以图片形式嵌入自己的应用/元服务中。在使用时，您可以指定请求的地图位置、图片大小。

**图1** 静态图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/38YIJxTuSNGDqBZlsx8vrA/zh-cn_image_0000002542676919.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031720Z&HW-CC-Expire=86400&HW-CC-Sign=B88AECE50E47F91608736EFBA9AB42F9ADD40C98780A9A56AB75E252DB2BCF4E "点击放大")

## 接口说明

以下是地图静态图相关接口，获取静态图功能主要由[staticMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap)。

展开

| 接口名 | 描述 |
| --- | --- |
| [StaticMapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1555293218278) | 用于描述静态图属性。 |
| [getMapImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1117619561413)(options: [StaticMapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1555293218278)): Promise<[image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | 根据提供的参数创建静态图。 |
| [getMapImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1068516421577)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), options: [StaticMapOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1555293218278)): Promise<[image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | 根据提供的参数创建静态图。支持上传Context上下文。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { staticMap } from '@kit.MapKit';
   2. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 创建静态图初始化参数，调用[getMapImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-staticmap#section1117619561413)方法获取静态图，效果如下图。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct StaticMapDemo {
   4. @State image?: PixelMap = undefined;

   6. build() {
   7. Column() {
   8. this.buildDemoUI();
   9. }.width('100%')
   10. .margin({ bottom: 48 })
   11. .backgroundColor(0xf2f2f2)
   12. .height('100%')
   13. }

   15. @Builder
   16. buildDemoUI() {
   17. // 展示获取的静态图
   18. Image(this.image)
   19. .width('100%')
   20. .fitOriginalSize(false)
   21. .border({ width: 1 })
   22. .borderStyle(BorderStyle.Dashed)
   23. .objectFit(ImageFit.Contain)
   24. .height("90%")

   26. Row() {
   27. Button("getStaticMap")
   28. .fontSize(12)
   29. .onClick(async () => {
   30. // 设置静态图标记参数
   31. let markers: Array<staticMap.StaticMapMarker> = [{
   32. location: {
   33. latitude: 50,
   34. longitude: 126.3
   35. },
   36. font: 'statics',
   37. defaultIconSize: staticMap.IconSize.TINY
   38. }];

   40. // 设置静态图绘制路径参数
   41. let path: staticMap.StaticMapPath = {
   42. locations: [
   43. {
   44. latitude: 50,
   45. longitude: 126
   46. },
   47. {
   48. latitude: 50.3,
   49. longitude: 126
   50. },
   51. {
   52. latitude: 50.3,
   53. longitude: 126.3
   54. },
   55. {
   56. latitude: 49.7,
   57. longitude: 126
   58. },
   59. {
   60. latitude: 50,
   61. longitude: 126
   62. }
   63. ],
   64. width: 3
   65. };

   67. // 拼装静态图参数
   68. let option: staticMap.StaticMapOptions = {
   69. location: {
   70. latitude: 50,
   71. longitude: 126
   72. },
   73. zoom: 10,
   74. imageWidth: 1024,
   75. imageHeight: 1024,
   76. scale: 1,
   77. markers: markers,
   78. path: path
   79. };

   81. try {
   82. // 获取静态图
   83. this.image = await staticMap.getMapImage(option);
   84. console.info("Succeeded in getting image.");
   85. } catch (error) {
   86. const err: BusinessError = error as BusinessError;
   87. console.error(`Failed in getting image, code: ${err.code}, message: ${err.message}`);
   88. }
   89. })
   90. }.margin({ top: 12 })
   91. }
   92. }
   ```

   **图2** 调用getMapImage方法获取静态图   
   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/xXFiLQkMQiahgCd8CnfeSg/zh-cn_image_0000002517200111.png?HW-CC-KV=V1&HW-CC-Date=20260414T031720Z&HW-CC-Expire=86400&HW-CC-Sign=F04D425BA893DBA3D39031264D02209CFAC75C36F791B45C189F851378CC736B "点击放大")