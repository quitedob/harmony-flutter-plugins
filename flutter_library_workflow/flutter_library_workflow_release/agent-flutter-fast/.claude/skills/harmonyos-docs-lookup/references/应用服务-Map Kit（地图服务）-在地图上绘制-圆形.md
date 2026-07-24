## 场景介绍

本章节将向您介绍如何在地图上绘制圆形。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/uXYFwyIZRi2aQj4AsCVNQg/zh-cn_image_0000002542454083.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031606Z&HW-CC-Expire=86400&HW-CC-Sign=8D7D26EF74F8BEB1280E62994781F7D76F8FAC70CE10070B561D7AB010E25F36 "点击放大")

## 接口说明

添加圆形功能主要由[MapCircleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section5282124803117)、[addCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section8212148102813)和[MapCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcircle)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcircle)。

展开

| 接口名 | 描述 |
| --- | --- |
| [MapCircleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section5282124803117) | 圆形参数。 |
| [addCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section8212148102813)(options: [mapCommon.MapCircleOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section5282124803117)): Promise<[MapCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcircle)> | 在地图上添加一个圆，指定圆心经纬度和圆的半径，用于表示某个位置的周边范围。 |
| [MapCircle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcircle) | 圆形，支持更新和查询相关属性。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { MapComponent, mapCommon, map } from '@kit.MapKit';
   2. import { AsyncCallback } from '@kit.BasicServicesKit';
   ```
2. 添加圆，在callback方法中创建初始化参数并新建Circle。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct MapCircleDemo {
   4. private mapOptions?: mapCommon.MapOptions;
   5. private mapController?: map.MapComponentController;
   6. private callback?: AsyncCallback<map.MapComponentController>;
   7. private mapCircle?: map.MapCircle;

   9. aboutToAppear(): void {
   10. // 地图初始化参数
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 39.918,
   15. longitude: 116.397
   16. },
   17. zoom: 14
   18. }
   19. };

   21. this.callback = async (err, mapController) => {
   22. if (!err) {
   23. this.mapController = mapController;
   24. // Circle初始化参数
   25. let mapCircleOptions: mapCommon.MapCircleOptions = {
   26. center: {
   27. latitude: 39.918,
   28. longitude: 116.397
   29. },
   30. radius: 500,
   31. clickable: true,
   32. fillColor: 0xFFFFC100,
   33. strokeColor: 0xFFFF0000,
   34. strokeWidth: 10,
   35. visible: true,
   36. zIndex: 15
   37. }
   38. // 创建Circle
   39. try {
   40. this.mapCircle = await this.mapController.addCircle(mapCircleOptions);
   41. } catch (e) {
   42. console.error(`Failed to create the mapCircle, code is：${e.code}, message is ${e.message}`);
   43. }
   44. } else {
   45. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   46. }
   47. };
   48. }

   50. build() {
   51. Stack() {
   52. Column() {
   53. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
   54. }.width('100%')
   55. }.height('100%')
   56. }
   57. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/GpIn6PIrQWu773ni4Yf5PA/zh-cn_image_0000002542454727.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031606Z&HW-CC-Expire=86400&HW-CC-Sign=C519CD1A57B9C043C697F6D57614D8BC622ED82FCAE91351D70DA541D2A9033D "点击放大")