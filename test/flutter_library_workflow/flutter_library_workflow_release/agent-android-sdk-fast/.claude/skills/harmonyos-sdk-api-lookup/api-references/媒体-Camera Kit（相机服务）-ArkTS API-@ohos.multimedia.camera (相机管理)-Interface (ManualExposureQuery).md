手动曝光查询对象。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getSupportedExposureDurationRange24+

PhonePC/2in1TabletTVWearable

getSupportedExposureDurationRange(): Array<number>

获取支持的手动曝光时长范围。单位：微秒。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<number> | 支持的手动曝光时长范围。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400102 | peration not allowed, session or inputdevice maybe abnormal. |
| 7400103 | Session not config, only throw in session usage. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function getSupportedExposureDurationRange(photoSession: camera.PhotoSession): Array<number> {
4. let durationRange: Array<number> = [];
5. try {
6. durationRange = photoSession.getSupportedExposureDurationRange();
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getSupportedExposureDurationRange call failed. error code: ${err.code}`);
10. }
11. return durationRange;
12. }
```

## getExposureBiasStep24+

PhonePC/2in1TabletTVWearable

getExposureBiasStep(): number

获取曝光偏置步长。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 曝光偏置步长。 |

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

3. function getExposureBiasStep(photoSession: camera.PhotoSession): number {
4. let biasStep = 0.0;
5. try {
6. biasStep = photoSession.getExposureBiasStep();
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getExposureBiasStep call failed. error code: ${err.code}`);
10. }
11. return biasStep;
12. }
```