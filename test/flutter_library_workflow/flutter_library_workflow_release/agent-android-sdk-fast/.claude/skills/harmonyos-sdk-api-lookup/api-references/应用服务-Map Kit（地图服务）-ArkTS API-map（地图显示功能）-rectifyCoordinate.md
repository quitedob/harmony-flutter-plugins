## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## rectifyCoordinate

PhonePC/2in1TabletWearable

rectifyCoordinate(context: common.Context, locations: Array<mapCommon.CoordinateLatLng>): Promise<Array<mapCommon.CoordinateLatLng>>

根据用户输入的坐标系和坐标以及获取当前的路由地，判断是否需要修正坐标。如果需要修正，则返回修正后的坐标系和坐标。使用Promise异步回调。

说明

* rectifyCoordinate接口仅为解决原始坐标与华为地图展示偏转的问题。
* rectifyCoordinate接口仅支持WGS84坐标系转为GCJ02坐标系。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 5.0.0(12)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| context | [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | Context上下文。 |
| locations | Array<[mapCommon.CoordinateLatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#coordinatelatlng)> | 是 | 输入坐标系和坐标。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Array<[mapCommon.CoordinateLatLng](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#coordinatelatlng)>> | Promise对象，返回修正后的坐标系和坐标。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-map)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Invalid input parameter. |
| 1002600013 | The current routing location is unknown. Try again later. |

**示例：**



```
1. let locations: Array<mapCommon.CoordinateLatLng> = [
2. {
3. // 输入香港坐标和WGS84坐标系，若当前地图站点使用GCJ02坐标系，返回GCJ02坐标系和转换后的香港坐标（输入的坐标转换为GCJ02坐标系）
4. coordinateType: mapCommon.CoordinateType.WGS84,
5. location: { latitude: 22.280556, longitude: 114.984000 }
6. }
7. ];
8. // 包含await的外层方法需要添加async关键字
9. let arr: Array<mapCommon.CoordinateLatLng> = await map.rectifyCoordinate(this.getUIContext().getHostContext(), locations);
```