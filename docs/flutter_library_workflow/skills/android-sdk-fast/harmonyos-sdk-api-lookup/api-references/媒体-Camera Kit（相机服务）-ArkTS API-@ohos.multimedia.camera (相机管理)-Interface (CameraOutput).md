会话中[Session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session)使用的输出信息，output的基类。

说明

本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## release

PhonePC/2in1TabletTVWearable

release(callback: AsyncCallback<void>): void

释放输出资源，通过注册回调函数获取结果。使用callback异步回调。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<void> | 是 | 回调函数。当释放输出资源成功，err为undefined，否则为错误对象。错误码类型[CameraErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#cameraerrorcode)。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400201 | Camera service fatal error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function releasePreviewOutput(previewOutput: camera.PreviewOutput): void {
4. previewOutput.release((err: BusinessError) => {
5. if (err) {
6. console.error(`Failed to release the Preview output instance ${err.code}`);
7. return;
8. }
9. console.info('Callback invoked to indicate that the preview output instance is released successfully.');
10. });
11. }

13. function releaseVideoOutput(videoOutput: camera.VideoOutput): void {
14. videoOutput.release((err: BusinessError) => {
15. if (err) {
16. console.error(`Failed to release the video output instance ${err.code}`);
17. return;
18. }
19. console.info('Callback invoked to indicate that the video output instance is released successfully.');
20. });
21. }
```

## release

PhonePC/2in1TabletTVWearable

release(): Promise<void>

释放输出资源。使用Promise异步回调。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400201 | Camera service fatal error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. function releasePreviewOutput(previewOutput: camera.PreviewOutput): void {
4. previewOutput.release().then(() => {
5. console.info('Promise returned to indicate that the preview output instance is released successfully.');
6. }).catch((error: BusinessError) => {
7. console.error(`Failed to preview output release, error code: ${error.code}`);
8. });
9. }

11. function releaseVideoOutput(videoOutput: camera.VideoOutput): void {
12. videoOutput.release().then(() => {
13. console.info('Promise returned to indicate that the video output instance is released successfully.');
14. }).catch((error: BusinessError) => {
15. console.error(`Failed to video output release, error code: ${error.code}`);
16. });
17. }
```