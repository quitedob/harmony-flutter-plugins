ManualExposure继承自[ManualExposureQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-manualexposurequery)。

手动曝光对象。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getExposureDuration24+

PhonePC/2in1TabletTVWearable

getExposureDuration(): number

获取当前曝光时长值。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 当前曝光时长值。单位：微秒。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400102 | Operation not allowed, session or inputdevice maybe abnormal. |
| 7400103 | Session not config. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function getExposureDuration(photoSession: camera.PhotoSession): number {
4. let exposureDuration: number = 0;
5. try {
6. exposureDuration = photoSession.getExposureDuration();
7. } catch (error) {
8. // 失败返回错误码error.code并处理。
9. let err = error as BusinessError;
10. console.error(`The getExposureDuration call failed. error code: ${err.code}`);
11. }
12. return exposureDuration;
13. }
```

## setExposureDuration24+

PhonePC/2in1TabletTVWearable

setExposureDuration(exposureDuration: number): void

设置曝光时长值。

仅在[ExposureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#exposuremode).EXPOSURE\_MODE\_MANUAL 手动曝光模式下设置生效。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| exposureDuration | number | 是 | 曝光时长值。单位：微秒。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400103 | Session not config. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function setExposureDuration(photoSession: camera.PhotoSession, exposureDuration: number): void {
4. try {
5. photoSession.setExposureDuration(exposureDuration);
6. } catch (error) {
7. // 失败返回错误码error.code并处理。
8. let err = error as BusinessError;
9. console.error(`The setExposureDuration call failed. error code: ${err.code}`);
10. }
11. }
```

## onExposureInfoChange24+

PhonePC/2in1TabletTVWearable

onExposureInfoChange(callback: Callback<ExposureInfo>): void

订阅曝光信息变化事件回调。曝光参数更改后，系统将返回更新后的曝光信息。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | Callback<[ExposureInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#exposureinfo24)> | 是 | 回调函数，用于获取曝光值变化信息。 |

**示例：**



```
1. function onExposureInfoChange(photoSession: camera.PhotoSession): void {
2. photoSession.onExposureInfoChange((exposureInfo: camera.ExposureInfo) => {
3. console.info(`Exposure info changed, exposureTime: ${exposureInfo.exposureTime}`);
4. });
5. }
```

## offExposureInfoChange24+

PhonePC/2in1TabletTVWearable

offExposureInfoChange(callback?: Callback<ExposureInfo>): void

取消订阅曝光信息变化事件回调。如果订阅了曝光信息，请在释放相机前取消订阅。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | Callback<[ExposureInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#exposureinfo24)> | 否 | 回调函数，如果指定参数则取消对应callback（callback对象不可是匿名函数），否则取消所有callback。 |

**示例：**



```
1. function offExposureInfoChange(photoSession: camera.PhotoSession): void {
2. photoSession.offExposureInfoChange();
3. }
```