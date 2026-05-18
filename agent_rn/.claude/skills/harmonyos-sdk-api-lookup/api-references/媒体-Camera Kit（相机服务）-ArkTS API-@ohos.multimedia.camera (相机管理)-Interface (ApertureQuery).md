物理光圈查询对象。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getSupportedPhysicalApertures24+

PhonePC/2in1TabletTVWearable

getSupportedPhysicalApertures(): Array<PhysicalAperture>

获取支持的物理光圈。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<[PhysicalAperture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#physicalaperture24)> | 支持的物理光圈数组。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400102 | Operation not allowed, the inputDevice or the session is abnormal. |
| 7400103 | Session not config. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function getSupportedPhysicalApertures(photoSession: camera.PhotoSession): Array<camera.PhysicalAperture> {
4. let apertures: Array<camera.PhysicalAperture> = [];
5. try {
6. apertures = photoSession.getSupportedPhysicalApertures();
7. } catch (error) {
8. // 失败返回错误码error.code并处理。
9. let err = error as BusinessError;
10. console.error(`The getSupportedPhysicalApertures call failed. error code: ${err.code}`);
11. }
12. return apertures;
13. }
```