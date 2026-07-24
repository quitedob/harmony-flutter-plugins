Aperture继承自[ApertureQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-aperturequery)。

物理光圈对象。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getPhysicalAperture24+

PhonePC/2in1TabletTVWearable

getPhysicalAperture(): number

获取当前物理光圈值。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 当前物理光圈值。 |

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

3. function getPhysicalAperture(photoSession: camera.PhotoSession): number {
4. let aperture = 0.0;
5. try {
6. aperture = photoSession.getPhysicalAperture();
7. } catch (error) {
8. // 失败返回错误码error.code并处理。
9. let err = error as BusinessError;
10. console.error(`The getPhysicalAperture call failed. error code: ${err.code}`);
11. }
12. return aperture;
13. }
```

## setPhysicalAperture24+

PhonePC/2in1TabletTVWearable

setPhysicalAperture(aperture: number): void

设置物理光圈值。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| aperture | number | 是 | 物理光圈值。 |

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

3. function setPhysicalAperture(photoSession: camera.PhotoSession, aperture: number): void {
4. try {
5. photoSession.setPhysicalAperture(aperture);
6. } catch (error) {
7. // 失败返回错误码error.code并处理。
8. let err = error as BusinessError;
9. console.error(`The setPhysicalAperture call failed. error code: ${err.code}`);
10. }
11. }
```