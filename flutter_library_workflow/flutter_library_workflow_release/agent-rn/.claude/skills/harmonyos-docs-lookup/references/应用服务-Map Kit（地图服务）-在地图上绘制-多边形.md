## 场景介绍

本章节将向您介绍如何在地图上绘制多边形。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/gQlOTqNrRtyRsXGUP4LDKw/zh-cn_image_0000002510853850.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031603Z&HW-CC-Expire=86400&HW-CC-Sign=85C2A1844E1A2F8BC56BF4B0950AECADF8725EF6836276950EB72FC587BA61F7 "点击放大")

## 接口说明

添加多边形功能主要由[MapPolygonOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section1615694815308)、[addPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1825517119280)和[MapPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolygon)提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolygon)。

展开

| 接口名 | 描述 |
| --- | --- |
| [MapPolygonOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section1615694815308) | 多边形参数。 |
| [addPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mapcomponentcontroller#section1825517119280)(options: [mapCommon.MapPolygonOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section1615694815308)): Promise<[MapPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolygon)> | 在地图上添加一个多边形。 |
| [MapPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-mappolygon) | 多边形，支持更新和查询相关属性。 |

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
2. 添加多边形，在callback方法中创建初始化参数并新建polygon。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct MapPolygonDemo {
   4. private mapOptions?: mapCommon.MapOptions;
   5. private mapController?: map.MapComponentController;
   6. private callback?: AsyncCallback<map.MapComponentController>;
   7. private mapPolygon?: map.MapPolygon;

   9. aboutToAppear(): void {
   10. // 地图初始化参数
   11. this.mapOptions = {
   12. position: {
   13. target: {
   14. latitude: 31.98,
   15. longitude: 118.78
   16. },
   17. zoom: 14
   18. }
   19. };
   20. this.callback = async (err, mapController) => {
   21. if (!err) {
   22. this.mapController = mapController;
   23. // 多边形初始化参数
   24. let polygonOptions: mapCommon.MapPolygonOptions = {
   25. points: [
   26. { longitude: 118.78, latitude: 31.975 },
   27. { longitude: 118.78, latitude: 31.985 },
   28. { longitude: 118.79, latitude: 31.985 },
   29. { longitude: 118.79, latitude: 31.975 }
   30. ],
   31. clickable: true,
   32. fillColor: 0xff00DE00,
   33. geodesic: false,
   34. strokeColor: 0xff000000,
   35. jointType: mapCommon.JointType.DEFAULT,
   36. strokeWidth: 10,
   37. visible: true,
   38. zIndex: 10
   39. }
   40. // 创建多边形
   41. try {
   42. this.mapPolygon = await this.mapController.addPolygon(polygonOptions);
   43. } catch (e) {
   44. console.error(`Failed to create the mapPolygon, code is：${e.code}, message is ${e.message}`);
   45. }
   46. } else {
   47. console.error(`Failed to initialize the map, code is：${err.code}, message is ${err.message}`);
   48. }
   49. };
   50. }

   52. build() {
   53. Stack() {
   54. Column() {
   55. MapComponent({ mapOptions: this.mapOptions, mapCallback: this.callback });
   56. }.width('100%')
   57. }.height('100%')
   58. }
   59. }
   ```

   ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/FNZHoHXPQfaqp_E-GbmCdA/zh-cn_image_0000002511014074.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031603Z&HW-CC-Expire=86400&HW-CC-Sign=6CF6B1E5D252B5DC346891733DB0D51E74533EDB7D21D9E4ED6B0A3A49389376 "点击放大")