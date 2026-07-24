获取全质量图和未压缩图的对象。

说明

本模块首批接口从API version 23开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| main | [ImageType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-t#imagetype) | 否 | 否 | 全质量图和未压缩图的对象。 |

## release

PhonePC/2in1TabletTVWearable

release(): Promise<void>

释放输出资源。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**示例：**



```
1. import { camera } from '@kit.CameraKit';

3. async function releaseCapturePhoto(capturePhoto: camera.CapturePhoto): Promise<void> {
4. await capturePhoto.release();
5. }
```