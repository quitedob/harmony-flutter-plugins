## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## calculateDistance

PhonePC/2in1TabletWearable

calculateDistance(from: mapCommon.LatLng, to: mapCommon.LatLng): number

计算坐标点之间的距离。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| from | [mapCommon.LatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#latlng) | 是 | 起点坐标。 |
| to | [mapCommon.LatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#latlng) | 是 | 终点坐标。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 两个坐标点之间的距离，单位：m。  入参为空返回0。 |

**示例：**



```
1. let fromLatLng: mapCommon.LatLng = {
2. latitude: 38,
3. longitude: 118
4. };
5. let toLatLng: mapCommon.LatLng = {
6. latitude: 39,
7. longitude: 119
8. };

10. let distance = map.calculateDistance(fromLatLng, toLatLng);
```