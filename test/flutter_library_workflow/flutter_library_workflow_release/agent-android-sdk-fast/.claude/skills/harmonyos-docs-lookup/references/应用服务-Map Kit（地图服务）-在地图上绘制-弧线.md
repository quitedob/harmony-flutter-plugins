## 场景介绍

本章节将向您介绍如何在地图上绘制弧线，通过[MapArcParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section943619551002)类设置弧线的位置、宽度、颜色等参数。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/duz9PYQ2Tq6KkflD8M3BFQ/zh-cn_image_0000002511013702.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031559Z&HW-CC-Expire=86400&HW-CC-Sign=3B98142FE02A72E9DB7FF04B8A6136177AD4D284E9777FE0BF2F5E9377E1D5D0 "点击放大")

## 接口说明

添加弧线功能主要由[MapArcParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section943619551002)、[addArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section123390488448)和[MapArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-maparc)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-maparc)。

展开

| 接口名 | 描述 |
| --- | --- |
| [MapArcParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section943619551002) | 弧线参数。 |
| [addArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section123390488448)(params: [mapCommon.MapArcParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section943619551002)): [MapArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-maparc) | 添加一条弧线。 |
| [MapArc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-maparc) | 弧线，支持更新和查询相关属性。 |

## 开发步骤

### 添加弧线

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { map, mapCommon, MapComponent } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 添加弧线，在callback方法中创建初始化参数并新建MapArc。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct MapArcDemo {
   4. private TAG = "OHMapSDK_MapArcDemo";
   5. private mapOptions?: mapCommon.MapOptions;
   6. private mapController?: map.MapComponentController;
   7. private callback?: AsyncCallback<map.MapComponentController>;
   8. private mapArc?: map.MapArc;

   10. aboutToAppear(): void {
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 34.757975,
   15. longitude: 113.665412
   16. },
   17. zoom: 6
   18. }
   19. }

   21. this.callback = async (err, mapController) => {
   22. if (!err) {
   23. this.mapController = mapController;
   24. if (!this.mapController) {
   25. console.error(this.TAG, "mapController is null");
   26. return;
   27. }
   28. // 设置弧线参数
   29. let mapArcParams: mapCommon.MapArcParams = {
   30. // 弧线起点坐标
   31. startPoint: {
   32. latitude: 39.913138,
   33. longitude: 116.415112
   34. },
   35. // 弧线终点坐标
   36. endPoint: {
   37. latitude: 28.239473,
   38. longitude: 112.954094
   39. },
   40. // 弧线中心点坐标
   41. centerPoint: {
   42. latitude: 33.86970399048567,
   43. longitude: 112.08633528544145
   44. },
   45. width: 10,
   46. color: 0xffff0000,
   47. visible: true,
   48. zIndex: 100
   49. };
   50. // 添加弧线
   51. try {
   52. this.mapArc = await this.mapController.addArc(mapArcParams);
   53. } catch (e) {
   54. console.error(`Failed to create the mapArc, code is：${e.code}, message is ${e.message}`);
   55. }
   56. } else {
   57. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   58. }
   59. }
   60. }

   62. build() {
   63. Stack() {
   64. Column() {
   65. MapComponent({
   66. mapOptions: this.mapOptions,
   67. mapCallback: this.callback
   68. })
   69. .width('100%')
   70. .height('100%');
   71. }.width('100%')
   72. }.height('100%')
   73. }
   74. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/61/v3/O_H9X3zRQWSPu8zr9KsbYg/zh-cn_image_0000002542453729.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031559Z&HW-CC-Expire=86400&HW-CC-Sign=5B447C6B8DF143FB107A3838DB12313E7FF75157A8AABA5FBB8C6DC34F496D78 "点击放大")