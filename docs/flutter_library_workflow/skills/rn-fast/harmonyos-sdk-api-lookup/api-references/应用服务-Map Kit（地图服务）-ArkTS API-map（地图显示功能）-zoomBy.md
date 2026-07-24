## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## zoomBy

PhonePC/2in1TabletWearable

zoomBy(amount: number, focus?: mapCommon.MapPoint): CameraUpdate

根据给定增量并以给定的屏幕像素点为中心点缩放地图级别。

以屏幕左顶点为（0, 0）点，focus.positionX正值代表可视区域向右移动，负值代表可视区域向左移动。focus.positionY正值代表可视区域向下移动，负值代表可视区域向上移动。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| amount | number | 是 | 地图缩放级别增量。 |
| focus | [mapCommon.MapPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-common#mappoint) | 否 | 地图缩放中心点对应的屏幕坐标。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [CameraUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-cameraupdate) | 描述地图状态将要发生的变化。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-map)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Invalid input parameter. |

**示例：**



```
1. let focus: mapCommon.MapPoint = {
2. positionX: 100,
3. positionY: 200
4. };
5. let cameraUpdate: map.CameraUpdate = map.zoomBy(10, focus);
```