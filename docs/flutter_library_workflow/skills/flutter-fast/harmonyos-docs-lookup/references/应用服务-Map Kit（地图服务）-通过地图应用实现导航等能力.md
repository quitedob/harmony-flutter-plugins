## 场景介绍

从5.0.3(15)开始，支持地图应用首页、搜索地点、查看地点详情、规划路线和进行导航功能；从6.0.1(21)开始，支持地图应用发起打车功能。

本章节将向您介绍如何打开地图应用实现如下能力：

* 打开地图应用首页
* 打开地图应用搜索地点
* 打开地图应用查看地点详情
* 打开地图应用规划路线
* 打开地图应用进行导航
* 打开地图应用发起打车

## 接口说明

调用地图应用的功能主要通过[petalMaps](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps)命名空间下的[openMapHomePage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1117619561413)、[openMapTextSearch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section2098315915160)、[openMapPoiDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section14159526181316)、[openMapRoutePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1765318218173)、[openMapNavi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section16894648175)、[openMapTaxi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section147354416415)等接口实现，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps)。

展开

| 接口说明 | 描述 |
| --- | --- |
| [TextSearchParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section810823717266) | 文本搜索的参数。 |
| [PoiDetailParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1555293218278) | POI详情的参数。 |
| [RoutePlanParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section491624219261) | 路线规划的参数。 |
| [NaviParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section7249174522611) | 导航的参数。 |
| [TaxiParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1625316256212) | 打车的参数。 |
| [openMapHomePage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1117619561413)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context)): Promise<void> | 打开地图应用首页。 |
| [openMapTextSearch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section2098315915160)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), textSearchParams: [TextSearchParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section810823717266)): Promise<void> | 打开地图应用搜索地点。 |
| [openMapPoiDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section14159526181316)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), poiDetailParams: [PoiDetailParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1555293218278)): Promise<void> | 打开地图应用查看地点详情。 |
| [openMapRoutePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1765318218173)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), routePlanParams: [RoutePlanParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section491624219261)): Promise<void> | 打开地图应用规划路线。 |
| [openMapNavi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section16894648175)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), naviParams: [NaviParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section7249174522611)): Promise<void> | 打开地图应用进行导航。 |
| [openMapTaxi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section147354416415)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), taxiParams: [TaxiParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1625316256212)): Promise<void> | 打开地图应用打车页面。 |

## 地图应用使用的坐标类型

在国内站点，中国大陆使用GCJ02坐标系，中国台湾使用WGS84坐标系。

在海外站点，统一使用WGS84坐标系。坐标系转换参考：[坐标纠偏](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-convert-coordinate)。

## 开发步骤

导入相关模块

收起

自动换行

深色代码主题

复制

```
1. import { petalMaps } from '@kit.MapKit'
```

### 打开地图应用首页

通过[openMapHomePage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1117619561413)，打开地图应用首页。

收起

自动换行

深色代码主题

复制

```
1. try {
2. await petalMaps.openMapHomePage(this.getUIContext().getHostContext());
3. } catch (e) {
4. console.error(`code:${e.code}, message:${e.message}`);
5. }
```

**图1** 打开地图应用首页

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f0/v3/Auc7-jL5TaqvNc6bqa9lUA/zh-cn_image_0000002542561561.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=701A1498905BE42CDFB76A12C5483CCD1000FF8C9297A4636E5E6FD3BD6392BC "点击放大")

### 打开地图应用进行地点搜索

通过[openMapTextSearch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section2098315915160)，传入搜索目标名称，打开地图应用进行地点搜索。

收起

自动换行

深色代码主题

复制

```
1. try {
2. let params: petalMaps.TextSearchParams = {
3. destinationName: '云谷'
4. };
5. await petalMaps.openMapTextSearch(this.getUIContext().getHostContext(), params);
6. } catch (e) {
7. console.error(`code:${e.code}, message:${e.message}`);
8. }
```

**图2** 打开地图应用进行地点搜索

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/QKE9Vc4TSIyfznv7G4h2ug/zh-cn_image_0000002542682051.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=B50ED49EE5F2D420DEC6946A4561D21AB4FD9D1CD848E36406E6B62752E52075 "点击放大")

### 打开地图应用查看地点详情

通过[openMapPoiDetail](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section14159526181316)，传入地点的经纬度，打开地图应用查看地点详情。

收起

自动换行

深色代码主题

复制

```
1. try {
2. let params: petalMaps.PoiDetailParams = {
3. destinationPosition: {
4. latitude: 32.02065982629459,
5. longitude: 118.788899213002
6. },
7. destinationPoiId: '563233191438217472'
8. };
9. await petalMaps.openMapPoiDetail(this.getUIContext().getHostContext(), params);
10. } catch (e) {
11. console.error(`code:${e.code}, message:${e.message}`);
12. }
```

**图3** 打开地图应用查看地点详情

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/36/v3/-ZFUfQu1QX2WyKRnlkbujQ/zh-cn_image_0000002511082286.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=B2E537FF6DAEB3F99CED8EBD9D1D021FBCA213CD76D6951A3AA685D10DBE5182 "点击放大")

### 打开地图应用规划路线

通过[openMapRoutePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section1765318218173)，传入终点经纬度，打开地图应用规划路线。

收起

自动换行

深色代码主题

复制

```
1. try {
2. let params: petalMaps.RoutePlanParams = {
3. destinationPosition: {
4. latitude: 31.983015468224288,
5. longitude: 118.78058590757131
6. }
7. };
8. await petalMaps.openMapRoutePlan(this.getUIContext().getHostContext(), params);
9. } catch (e) {
10. console.error(`code:${e.code}, message:${e.message}`);
11. }
```

**图4** 打开地图应用规划路线

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/ftAaGNfSSHG0UMALEZa2fA/zh-cn_image_0000002542682429.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=F7417087FDF5E217E8FA581AC6FE4432D810055E8730F4178B8D41125BA52BEF "点击放大")

### 打开地图应用进行导航

通过[openMapNavi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section16894648175)，传入终点经纬度，打开地图应用发起导航。

收起

自动换行

深色代码主题

复制

```
1. try {
2. let params: petalMaps.NaviParams = {
3. destinationPosition: {
4. latitude: 31.983015468224288,
5. longitude: 118.78058590757131
6. }
7. };
8. await petalMaps.openMapNavi(this.getUIContext().getHostContext(), params);
9. } catch (e) {
10. console.error(`code:${e.code}, message:${e.message}`);
11. }
```

**图5** 打开地图应用进行导航

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/b0_Y2zpET0K1eIDmukmvmQ/zh-cn_image_0000002542682493.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=A11970E6E5C5117F2E01516F5051C4CAD716C60622491972A8FF572E455906D2 "点击放大")

### 打开地图应用打车页面

通过[openMapTaxi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-petal-maps#section147354416415)，传入终点经纬度，打开地图应用发起打车。

收起

自动换行

深色代码主题

复制

```
1. try {
2. let params: petalMaps.TaxiParams = {
3. destinationPosition: {
4. latitude: 31.983015468224288,
5. longitude: 118.78058590757131
6. }
7. };
8. await petalMaps.openMapTaxi(this.getUIContext().getHostContext(), params);
9. } catch (e) {
10. console.error(`code:${e.code}, message:${e.message}`);
11. }
```

**图6** 打开地图应用进行打车

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/VY5y82S1QxSdEtD3nHbncg/zh-cn_image_0000002511082574.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T031738Z&HW-CC-Expire=86400&HW-CC-Sign=C72A9788563C3C06712E75CF67510177AEDFEBDF29AB2C28DB134D49843CB36D "点击放大")