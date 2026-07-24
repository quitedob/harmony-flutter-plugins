色彩管理类，用于查询色彩空间参数。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 12开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## getSupportedColorSpaces12+

PhonePC/2in1TabletTVWearable

getSupportedColorSpaces(): Array<colorSpaceManager.ColorSpace>

获取支持的色彩空间列表。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<[colorSpaceManager.ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-colorspacemanager#colorspace)> | 支持的色彩空间列表。若接口调用失败，返回undefined。 |

**示例：**



```
1. import { colorSpaceManager } from '@kit.ArkGraphics2D';

3. function getSupportedColorSpaces(session: camera.PhotoSession): Array<colorSpaceManager.ColorSpace> {
4. let colorSpaces: Array<colorSpaceManager.ColorSpace> = [];
5. colorSpaces = session.getSupportedColorSpaces();
6. return colorSpaces;
7. }
```