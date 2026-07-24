光学防抖（OIS）查询对象。

说明

* 本模块首批接口从API version 10 开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 24开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## isOISModeSupported24+

PhonePC/2in1TabletTVWearable

isOISModeSupported(mode: OISMode): boolean

检测是否支持指定的OIS模式。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mode | [OISMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#oismode24) | 是 | 设置的OIS模式。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 当前设备是否支持指定的OIS模式。返回true表示支持指，返回false表示不支持。 |

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

3. function isOISModeSupported(photoSession: camera.PhotoSession, mode: camera.OISMode): boolean {
4. let isSupported = false;
5. try {
6. isSupported = photoSession.isOISModeSupported(mode);
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The isOISModeSupported call failed. error code: ${err.code}`);
10. }
11. return isSupported;
12. }
```

## getSupportedOISBiasRange24+

PhonePC/2in1TabletTVWearable

getSupportedOISBiasRange(oisAxis: OISAxes): Array<number>

获取指定OIS轴向支持的偏置范围。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| oisAxis | [OISAxes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#oisaxes24) | 是 | OIS轴向。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<number> | 偏置范围。 |

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

3. function getSupportedOISBiasRange(photoSession: camera.PhotoSession, oisAxis: camera.OISAxes): Array<number> {
4. let biasRange: Array<number> = [];
5. try {
6. biasRange = photoSession.getSupportedOISBiasRange(oisAxis);
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getSupportedOISBiasRange call failed. error code: ${err.code}`);
10. }
11. return biasRange;
12. }
```

## getSupportedOISBiasStep24+

PhonePC/2in1TabletTVWearable

getSupportedOISBiasStep(oisAxis: OISAxes): number

获取指定OIS轴向的偏置步长。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| oisAxis | [OISAxes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#oisaxes24) | 是 | OIS轴向。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 偏置步长值。 |

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

3. function getSupportedOISBiasStep(photoSession: camera.PhotoSession, oisAxis: camera.OISAxes): number {
4. let biasStep = 0.0;
5. try {
6. biasStep = photoSession.getSupportedOISBiasStep(oisAxis);
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getSupportedOISBiasStep call failed. error code: ${err.code}`);
10. }
11. return biasStep;
12. }
```

## getCurrentOISMode24+

PhonePC/2in1TabletTVWearable

getCurrentOISMode(): OISMode

获取当前OIS模式。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [OISMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#oismode24) | 当前OIS模式。 |

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

3. function getCurrentOISMode(photoSession: camera.PhotoSession): camera.OISMode {
4. let mode: camera.OISMode = camera.OISMode.OFF;
5. try {
6. mode = photoSession.getCurrentOISMode();
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getCurrentOISMode call failed. error code: ${err.code}`);
10. }
11. return mode;
12. }
```

## getCurrentCustomOISBias24+

PhonePC/2in1TabletTVWearable

getCurrentCustomOISBias(oisAxis: OISAxes): number

获取指定OIS轴向的当前自定义偏置值。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| oisAxis | [OISAxes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#oisaxes24) | 是 | OIS轴向。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 当前偏置值。 |

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

3. function getCurrentCustomOISBias(photoSession: camera.PhotoSession, oisAxis: camera.OISAxes): number {
4. let bias = 0.0;
5. try {
6. bias = photoSession.getCurrentCustomOISBias(oisAxis);
7. } catch (error) {
8. let err = error as BusinessError;
9. console.error(`The getCurrentCustomOISBias call failed. error code: ${err.code}`);
10. }
11. return bias;
12. }
```