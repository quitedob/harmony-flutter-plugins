本模块提供屏幕截图的能力。

说明

* 本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { screenshot } from '@kit.ArkUI';
```

## Rect

PhonePC/2in1TabletTVWearable

表示截取图像的区域。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.WindowManager.WindowManager.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| left | number | 否 | 否 | 表示截取图像区域的左边界，单位为px，该参数应为整数。 |
| top | number | 否 | 否 | 表示截取图像区域的上边界，单位为px，该参数应为整数。 |
| width | number | 否 | 否 | 表示截取图像区域的宽度，单位为px，该参数应为整数。 |
| height | number | 否 | 否 | 表示截取图像区域的高度，单位为px，该参数应为整数。 |

## CaptureOption14+

PhonePC/2in1TabletTVWearable

设置截取图像的信息。

**系统能力：** SystemCapability.WindowManager.WindowManager.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| displayId | number | 否 | 是 | 表示截取图像的显示设备[Display](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#display)的ID号，默认为0，该参数应为大于或等于0的整数，非整数会报参数错误。  **元服务API：** 从API version 14开始，该接口支持在元服务中使用。 |
| blackWindowIds21+ | Array<number> | 否 | 是 | 表示截取图像时不显示的窗口ID列表，默认为空。窗口ID应为大于0的整数，目前仅[闪控球窗口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-floatingball)生效，窗口ID为非闪控球窗口、非整数、小于等于0、或者不存在的窗口ID时报参数错误，错误码为401。推荐使用[getFloatingBallWindowInfo()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-floatingball#getfloatingballwindowinfo)方法获取闪控球窗口ID属性。  **元服务API：** 从API version 21开始，该接口支持在元服务中使用。 |

## PickInfo

PhonePC/2in1TabletTVWearable

截取图像的信息。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.WindowManager.WindowManager.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| pickRect | [Rect](/consumer/cn/doc/harmonyos-references/js-apis-screenshot#rect) | 否 | 否 | 表示截取图像的区域。 |
| pixelMap | [image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap) | 否 | 否 | 表示截取的图像PixelMap对象。 |

## screenshot.pick

PhonePC/2in1TabletTVWearable

pick(): Promise<PickInfo>

获取屏幕截图，当前仅支持获取displayId为0的屏幕截图（如果需要对扩展屏截图，可以通过[capture](/consumer/cn/doc/harmonyos-references/js-apis-screenshot#screenshotcapture14)接口实现），使用Promise异步回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.WindowManager.WindowManager.Core

**设备行为差异：** 该接口在2in1设备中可正常调用，在其他设备中返回801错误码。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[PickInfo](/consumer/cn/doc/harmonyos-references/js-apis-screenshot#pickinfo)> | Promise对象。返回一个PickInfo对象。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[屏幕错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-display)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Capability not supported on this device. |
| 1400003 | This display manager service works abnormally. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. try {
4. let promise = screenshot.pick();
5. promise.then((pickInfo: screenshot.PickInfo) => {
6. console.info('pick Pixel bytes number: ' + pickInfo.pixelMap.getPixelBytesNumber());
7. console.info('pick Rect: ' + pickInfo.pickRect);
8. pickInfo.pixelMap.release(); // PixelMap使用完后及时释放内存
9. }).catch((err: BusinessError) => {
10. console.error(`Failed to pick. Code: ' + Code: ${err.code}, message: ${err.message}`);
11. });
12. } catch (exception) {
13. console.error(`Failed to pick Code: ' + Code: ${exception.code}, message: ${exception.message}`);
14. };
```

## screenshot.capture14+

PhonePC/2in1TabletTVWearable

capture(options?: CaptureOption): Promise<image.PixelMap>

获取屏幕全屏截图，使用Promise异步回调。

此接口可以通过设置不同的displayId截取不同屏幕的截图，且只能截取全屏；[pick](/consumer/cn/doc/harmonyos-references/js-apis-screenshot#screenshotpick)接口可实现区域截屏。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.WindowManager.WindowManager.Core

**设备行为差异：** 在API version 21之前，该接口在2in1设备、Tablet设备中可正常调用，在其他设备中返回801错误码。从API version 21开始，该接口在Phone设备、2in1设备、Tablet设备中可正常调用，在其他设备中返回801错误码。

**需要权限**：API version 22前，需申请ohos.permission.CUSTOM\_SCREEN\_CAPTURE权限；从API version 22开始，需要申请ohos.permission.CUSTOM\_SCREEN\_CAPTURE权限或ohos.permission.CUSTOM\_SCREEN\_RECORDING权限。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [CaptureOption](/consumer/cn/doc/harmonyos-references/js-apis-screenshot#captureoption14) | 否 | 截取图像的相关信息。此参数不填时，默认截取displayId为0的屏幕截图。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | Promise对象。返回一个PixelMap对象。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[屏幕错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-display)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1.Incorrect parameter types. 2.Parameter verification failed. |
| 801 | Capability not supported on this device. |
| 1400003 | This display manager service works abnormally. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { image } from '@kit.ImageKit';

4. let captureOption: screenshot.CaptureOption = {
5. "displayId": 0
6. };
7. try {
8. let promise = screenshot.capture(captureOption);
9. promise.then((pixelMap: image.PixelMap) => {
10. console.info('Succeeded in saving screenshot. Pixel bytes number: ' + pixelMap.getPixelBytesNumber());
11. pixelMap.release(); // PixelMap使用完后及时释放内存
12. }).catch((err: BusinessError) => {
13. console.error(`Failed to save screenshot. Code: ${err.code}, message: ${err.message}`);
14. });
15. } catch (exception) {
16. console.error(`Failed to save screenshot. Code: ${exception.code}, message: ${exception.message}`);
17. };
```