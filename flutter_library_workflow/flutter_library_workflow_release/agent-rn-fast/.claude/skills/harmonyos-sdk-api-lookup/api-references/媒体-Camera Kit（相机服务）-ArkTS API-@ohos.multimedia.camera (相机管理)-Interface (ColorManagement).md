ColorManagement继承自[ColorManagementQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-colormanagementquery)。

色彩管理类，用于设置色彩空间参数。

说明

* 本模块首批接口从API version 10开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本Interface首批接口从API version 12开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { camera } from '@kit.CameraKit';
```

## setColorSpace12+

PhonePC/2in1TabletTVWearable

setColorSpace(colorSpace: colorSpaceManager.ColorSpace): void

设置色彩空间。

使用该接口前，必须先通过[getSupportedColorSpaces](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-colormanagementquery#getsupportedcolorspaces12)获取当前设备所支持的ColorSpaces。该接口建议在[addOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#addoutput11)之后、[commitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#commitconfig11-1)之前调用，如果在[commitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#commitconfig11-1)之后调用该接口，会导致相机会话配置耗时增加。

P3广色域与HDR高动态范围成像：

应用可以下发不同的色彩空间（ColorSpace）参数来支持P3广色域以及HDR的功能。若应用不主动设置色彩空间，拍照、录像模式均默认为SDR拍摄。

应用针对不同模式使能HDR效果、设置的色彩空间以及设置相机输出流[Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#profile)中的[CameraFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#cameraformat)一一对应关系可参考下表。例如，在录像模式下若需要选择HDR拍摄，相机预览输出流和录像输出流[Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-i#profile)中的[CameraFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-e#cameraformat)可选择CAMERA\_FORMAT\_YCRCB\_P010，色彩空间ColorSpace可选择设置BT2020\_HLG\_LIMIT。

在拍照模式下，若需要获取HDR高显效果的图片，可通过设置色彩空间（ColorSpace）为DISPLAY\_P3或BT2020\_HLG实现。其中BT2020\_HLG能够表示更广的色域，需要搭配使用预览输出格式（Profile.format）P010（CAMERA\_FORMAT\_YCRCB\_P010/CAMERA\_FORMAT\_YCBCR\_P010）来提升图像质感。

从API version 23开始，可以通过接口[getSupportedFullOutputCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-cameramanager#getsupportedfulloutputcapability23)查询是否支持拍照模式下的预览P010格式。

* 若应用不主动设置色彩空间，在拍照模式下，当预览输出格式为CAMERA\_FORMAT\_YUV\_420\_SP时，色彩空间默认为SRGB；当预览输出格式为CAMERA\_FORMAT\_YCRCB\_P010/CAMERA\_FORMAT\_YCBCR\_P010时，色彩空间默认为BT2020\_HLG。
* 若应用主动设置色彩空间，在拍照模式下，预览输出格式与色彩空间必须按照下列表格中的对应关系配置，若不满足则会在[setColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-colormanagement#setcolorspace12)或[commitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-session#commitconfig11-1)时返回错误码。

拍照模式：

展开

| SDR/HDR拍摄 | 预览输出格式 | 色彩空间 |
| --- | --- | --- |
| SDR(Default) | CAMERA\_FORMAT\_YUV\_420\_SP | SRGB |
| HDR P3 | CAMERA\_FORMAT\_YUV\_420\_SP | DISPLAY\_P3 |
| HDR BT.2020 | CAMERA\_FORMAT\_YCRCB\_P010、  CAMERA\_FORMAT\_YCBCR\_P010 | BT2020\_HLG |

在录像模式下，使能SDR或HDR\_VIVID拍摄效果时，CameraFormat与ColorSpace必须按照下列表格中的对应关系配置，若不满足表格中CameraFormat与ColorSpace配置，会导致预览异常等问题。

录像模式：

展开

| SDR/HDR拍摄 | CameraFormat | ColorSpace |
| --- | --- | --- |
| SDR(Default) | CAMERA\_FORMAT\_YUV\_420\_SP | BT709\_LIMIT |
| HDR\_VIVID | CAMERA\_FORMAT\_YCRCB\_P010 | BT2020\_HLG\_LIMIT、  BT2020\_HLG |
| HDR\_VIVID | CAMERA\_FORMAT\_YCBCR\_P010 | BT2020\_HLG\_LIMIT、  BT2020\_HLG |

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| colorSpace | [colorSpaceManager.ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-colorspacemanager#colorspace) | 是 | 色彩空间，通过[getSupportedColorSpaces](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-camera-colormanagementquery#getsupportedcolorspaces12)接口获取。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400101 | Parameter missing or parameter type incorrect. |
| 7400102 | The colorSpace does not match the format. |
| 7400103 | Session not config. |
| 7400201 | Camera service fatal error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { colorSpaceManager } from '@kit.ArkGraphics2D';

4. function setColorSpace(session: camera.PhotoSession, colorSpaces: Array<colorSpaceManager.ColorSpace>): void {
5. if (colorSpaces === undefined || colorSpaces.length <= 0) {
6. return;
7. }
8. try {
9. session.setColorSpace(colorSpaces[0]);
10. } catch (error) {
11. let err = error as BusinessError;
12. console.error(`The setColorSpace call failed, error code: ${err.code}`);
13. }
14. }
```

## getActiveColorSpace12+

PhonePC/2in1TabletTVWearable

getActiveColorSpace(): colorSpaceManager.ColorSpace

获取当前设置的色彩空间。

**元服务API：** 从API version 19开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Multimedia.Camera.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [colorSpaceManager.ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-colorspacemanager#colorspace) | 当前设置的色彩空间。 |

**错误码：**

以下错误码的详细介绍请参见[Camera错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-camera)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 7400103 | Session not config. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { colorSpaceManager } from '@kit.ArkGraphics2D';

4. function getActiveColorSpace(session: camera.PhotoSession): colorSpaceManager.ColorSpace | undefined {
5. let colorSpace: colorSpaceManager.ColorSpace | undefined = undefined;
6. try {
7. colorSpace = session.getActiveColorSpace();
8. } catch (error) {
9. let err = error as BusinessError;
10. console.error(`The getActiveColorSpace call failed. error code: ${err.code}`);
11. }
12. return colorSpace;
13. }
```