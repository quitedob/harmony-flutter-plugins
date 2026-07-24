## 场景介绍

根据用户指定的两个经纬度坐标点，计算这两个点间的直线距离，单位为米。

## 接口说明

以下是距离计算功能相关接口，主要由[map](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map)命名空间下的[calculateDistance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-calculatedistance)方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-calculatedistance)。

展开

| 接口名 | 描述 |
| --- | --- |
| [mapCommon.LatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section20691173773810) | 经纬度对象。 |
| [calculateDistance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-calculatedistance)(from: [mapCommon.LatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section20691173773810), to: [mapCommon.LatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#section20691173773810)): number | 计算坐标点之间的距离。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { map, mapCommon } from '@kit.MapKit';
   ```
2. 初始化需要计算的坐标，调用[calculateDistance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-calculatedistance)方法计算距离。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let fromLatLng: mapCommon.LatLng = {
   2. latitude: 38,
   3. longitude: 118
   4. };
   5. let toLatLng: mapCommon.LatLng = {
   6. latitude: 39,
   7. longitude: 119
   8. };
   9. // 计算坐标点之间的距离
   10. let distance = map.calculateDistance(fromLatLng, toLatLng);
   ```