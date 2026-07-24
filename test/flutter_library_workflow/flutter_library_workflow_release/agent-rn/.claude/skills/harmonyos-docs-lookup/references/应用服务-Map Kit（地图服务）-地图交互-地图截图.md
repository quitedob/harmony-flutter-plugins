本章节将向您介绍如何实现地图截图功能。

地图截图指对当前屏幕显示区域进行截屏，支持对地图、覆盖物、Logo进行屏幕截图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d6/v3/qVwFutgxTbedw4JJn_RfNQ/zh-cn_image_0000002511002724.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031544Z&HW-CC-Expire=86400&HW-CC-Sign=46C7EE02695364FC08CB019EBACB4D59402377F59A07E313B0340E84CD5A5640 "点击放大")

## 接口说明

以下是地图截图相关接口，以下功能主要由[snapshot](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section4803202315197)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section4803202315197)。

展开

| 接口名 | 描述 |
| --- | --- |
| [snapshot](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section4803202315197)(): Promise<[image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | 地图截图。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   3. import { image } from '@kit.ImageKit';
   ```
2. 调用[snapshot](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section4803202315197)方法对当前屏幕进行截图。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct HuaweiMapDemo {
   4. private mapOptions?: mapCommon.MapOptions;
   5. private callback?: AsyncCallback<map.MapComponentController>;
   6. private mapController?: map.MapComponentController;
   7. @State image?: image.PixelMap = undefined;

   9. aboutToAppear(): void {
   10. // 地图初始化参数，设置地图中心点坐标及层级
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 39.9,
   15. longitude: 116.4
   16. },
   17. zoom: 10
   18. }
   19. };

   21. // 地图初始化的回调
   22. this.callback = async (err, mapController) => {
   23. if (!err) {
   24. // 获取地图的控制器类，用来操作地图
   25. this.mapController = mapController;
   26. } else {
   27. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   28. }
   29. };
   30. }

   32. build() {
   33. Stack() {
   34. Column() {
   35. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback })
   36. .width('100%')
   37. .height('50%');

   39. Scroll(new Scroller()) {
   40. Column() {
   41. Image(this.image)
   42. .objectFit(ImageFit.Auto)
   43. .border({ width: 1, color: Color.Red }).width("100%")
   44. Button("获取截图")
   45. .margin({ left: 10 })
   46. .fontSize(12)
   47. .onClick(async () => {
   48. if (this.mapController) {
   49. let pixelMap = await this.mapController.snapshot();
   50. this.image = pixelMap;
   51. }
   52. });
   53. }
   54. }.width('70%').height("50%")
   55. }.width('100%')
   56. }.height('100%')
   57. }
   58. }
   ```