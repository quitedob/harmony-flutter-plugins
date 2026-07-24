说明

本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## camera.getCameraManager

PhonePC/2in1TabletTVWearable

getCameraManager(context: Context): CameraManager

获取相机管理器实例，同步返回结果。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 应用上下文。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [CameraManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager) | 相机管理器。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400101 | Parameter missing or parameter type incorrect. |
| 7400201 | Camera service fatal error. |

**示例：**



```
1. import { common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. function getCameraManager(context: common.BaseContext): camera.CameraManager | undefined {
5. let cameraManager: camera.CameraManager | undefined = undefined;
6. try {
7. cameraManager = camera.getCameraManager(context);
8. } catch (error) {
9. let err = error as BusinessError;
10. console.error(`The getCameraManager call failed. error code: ${err.code}`);
11. }
12. return cameraManager;
13. }
```