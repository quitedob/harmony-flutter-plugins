## 场景介绍

新增热力图层，用于展示数据的分布情况。通过热力图功能，将数据用不同颜色的区块在地图上展示，可以直观地描述在地图上某个区域内人群或车辆的密度和分布情况。热力图适用于大数据密度可视化场景，如人流分布，热点区域等。

6.0.0(20)开始，支持热力图功能。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/M7NwgizTQ4OjMRiaDaUVUQ/zh-cn_image_0000002510884088.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031639Z&HW-CC-Expire=86400&HW-CC-Sign=E0865A468646DC561DFF06F5C3F7F216028FB8177397D7F552D29DB37EC5F0C0 "点击放大")

## 接口说明

热力图功能主要由[HeatmapParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section273113662417)、[addHeatmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section849314585910)和[Heatmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-heatmap#section792365317339)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-heatmap#section792365317339)。

展开

| 接口名 | 描述 |
| --- | --- |
| [HeatmapParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section273113662417) | 热力图参数。 |
| [addHeatmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section849314585910)(params: [mapCommon.HeatmapParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section273113662417)): Promise<[Heatmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-heatmap#section792365317339)> | 新增热力图。 |
| [Heatmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-heatmap#section792365317339) | 热力图，支持修改和删除热力图，例如：支持设置颜色、设置透明度等。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { map, mapCommon, MapComponent } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 增加热力图。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct HeatMapDemo {
   4. private TAG = "OHMapSDK_HeatMapDemo";
   5. private mapOption?: mapCommon.MapOptions;
   6. private mapController?: map.MapComponentController;
   7. private callback?: AsyncCallback<map.MapComponentController>;

   9. aboutToAppear(): void {
   10. this.mapOption = {
   11. position: {
   12. target: {
   13. latitude: 31.000000,
   14. longitude: 118.000000
   15. },
   16. zoom: 11
   17. }
   18. }
   19. this.callback = async (err, mapController) => {
   20. console.info(this.TAG, "mapCallback err=" + JSON.stringify(err) +
   21. "; mapController=" + JSON.stringify(mapController));
   22. if (!err) {
   23. this.mapController = mapController;
   24. let data: mapCommon.WeightedLatLng[] = [];
   25. // 生成500个随机坐标点，用于热力图数据
   26. for (let i = 0; i < 500; i++) {
   27. data.push({
   28. point: {
   29. longitude: 118.000000 + Math.random() * 1 - 0.25,
   30. latitude: 31.000000 + Math.random() * 1 - 0.25
   31. },
   32. intensity: 1
   33. });
   34. }
   35. let heatMapOptions: mapCommon.HeatmapParams = {
   36. id: 'heatmap0001',
   37. data:data,
   38. radius:20,
   39. intensity: {
   40. 2: 1,
   41. 5: 5,
   42. 8: 10
   43. }
   44. }
   45. try {
   46. // 添加热力图
   47. await this.mapController?.addHeatmap(heatMapOptions);
   48. } catch (e) {
   49. console.error(this.TAG, `code:${e.code}, message:${e.message}`);
   50. }
   51. } else {
   52. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   53. }
   54. }
   55. }
   56. build() {
   57. Stack() {
   58. Column() {
   59. MapComponent({ mapOptions: this.mapOption, mapCallback: this.callback })
   60. .width('100%')
   61. .height('100%');
   62. }.width('100%')
   63. }.height('100%')
   64. }
   65. }
   ```