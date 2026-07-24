## 导入模块

PhonePC/2in1TabletWearable



```
1. import { map, mapCommon } from '@kit.MapKit';
```

## CameraUpdate

PhonePC/2in1TabletWearable

CameraUpdate定义了相机移动参数。CameraUpdate的创建方法参见[newCameraPosition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-map-newcameraposition)等function。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从版本4.1.0(11)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Map.Core

**起始版本：** 4.1.0(11)

**示例：**



```
1. let target: mapCommon.LatLng = {
2. latitude: 39.9,
3. longitude: 116.4
4. };
5. let cameraPosition: mapCommon.CameraPosition = {
6. target: target,
7. zoom: 10
8. };
9. // 新建CameraUpdate对象
10. let cameraUpdate: map.CameraUpdate = map.newCameraPosition(cameraPosition);
11. // 移动相机
12. this.mapController.moveCamera(cameraUpdate);
```