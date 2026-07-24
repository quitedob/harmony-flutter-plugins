ManualFocus继承自[ManualFocusQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-manualfocusquery)。

手动对焦对象。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getFocusDistance24+

PhonePC/2in1TabletTVWearable

getFocusDistance(): number

获取当前对焦距离。取值范围为[0.0, 1.0]，其中0.0表示镜头可以对焦的最短距离，1.0表示最远距离。默认值为1.0。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 当前对焦距离。取值范围为[0.0, 1.0]。 |

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

3. function getFocusDistance(photoSession: camera.PhotoSession): number {
4. let focusDistance = 1.0;
5. try {
6. focusDistance = photoSession.getFocusDistance();
7. } catch (error) {
8. // 失败返回错误码error.code并处理。
9. let err = error as BusinessError;
10. console.error(`The getFocusDistance call failed. error code: ${err.code}`);
11. }
12. return focusDistance;
13. }
```

## setFocusDistance24+

PhonePC/2in1TabletTVWearable

setFocusDistance(distance: number): void

设置对焦距离。取值范围为[0.0, 1.0]，其中0.0表示镜头可以对焦的最短距离，1.0表示最远距离。默认值为1.0。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| distance | number | 是 | 对焦距离。取值范围为[0.0, 1.0]。 |

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

3. function setFocusDistance(photoSession: camera.PhotoSession, distance: number): void {
4. try {
5. photoSession.setFocusDistance(distance);
6. } catch (error) {
7. // 失败返回错误码error.code并处理。
8. let err = error as BusinessError;
9. console.error(`The setFocusDistance call failed. error code: ${err.code}`);
10. }
11. }
```