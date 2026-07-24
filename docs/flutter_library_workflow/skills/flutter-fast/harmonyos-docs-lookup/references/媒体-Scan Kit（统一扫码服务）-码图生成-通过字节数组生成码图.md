## 基本概念

码图生成能力支持将字节数组转换为自定义格式的码图。

## 场景介绍

码图生成能力支持将字节数组转换为自定义格式的码图。

例如：调用码图生成能力，将字节数组转换成交通一卡通二维码使用。

## 约束与限制

* 码图生成能力支持Phone、Tablet、Wearable、2in1、TV（从5.1.0(18)版本开始支持Wearable、从5.1.1(19)版本开始支持2in1、TV）。
* 若Scan Kit识别某码图内容显示内容为乱码，则该码图的字节数组需要通过专门的解码器解析，例如地铁闸机。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/egB9DNOdT0eD4dnIfd-i_Q/zh-cn_image_0000002464277494.png?HW-CC-KV=V1&HW-CC-Date=20260414T053422Z&HW-CC-Expire=86400&HW-CC-Sign=20BE4A367C53FAD804503210A34347E527A744F9F3D89FE7E67B88BB23F8486B "点击放大")

1. 用户向应用发起生成码图请求后，传入需要生成的码图信息，包括码图的类型、宽高等。
2. 应用通过调用Scan Kit的createBarcode接口启动码图生成能力。
3. Scan Kit通过将字节数组转换为码图并返回给应用。
4. 应用向用户返回生成码图结果。

## 接口说明

通过字节数组生成码图，以Promise形式生成码图。具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode)。

展开

| 接口名 | 接口描述 |
| --- | --- |
| [createBarcode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode#section77911759145019)(content: ArrayBuffer, options: [CreateOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode#section87678254617)): Promise<image.[PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | 码图生成接口，返回image.PixelMap类型的参数，可以使用Image组件渲染成图片。使用Promise异步回调返回生成的码图。 |

## 开发步骤

码图生成根据传参内容直接生成所需码图，需要传入固定参数和可选参数。

为了方便开发者接入，我们提供了详细的样例工程供参考，推荐参考[示例工程](https://gitcode.com/HarmonyOS_Samples/scan-kit_-sample-code_-clientdemo_-arkts)接入。

以下示例为调用码图生成能力的createBarcode接口实现码图生成。

1. 导入码图生成接口模块，该模块提供了码图生成的参数和方法，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 导入码图生成需要的图片模块、错误码模块
   2. import { scanCore, generateBarcode } from '@kit.ScanKit';
   3. import { BusinessError } from '@kit.BasicServicesKit';
   4. import { image } from '@kit.ImageKit';
   5. import { hilog } from '@kit.PerformanceAnalysisKit';
   6. import { buffer } from '@kit.ArkTS';
   ```
2. 调用码图生成能力的createBarcode接口实现码图生成。
   * 通过Promise方式回调，获取生成的码图。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. const TAG: string = 'Create barcode';

     3. @Entry
     4. @Component
     5. struct Index {
     6. @State pixelMap: image.PixelMap | undefined = undefined
     7. build() {
     8. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
     9. Button('generateBarcode Promise').onClick(() => {
     10. this.pixelMap = undefined;
     11. let content: string =
     12. '0177C10DD10F7768600202312110000063458FD14112345678FFFFD381012610b746365409210201b66636540ad0200020000000000110e617003201000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006645fbec664358ECF657CB40693c92da';
     13. let contentBuffer: ArrayBuffer = buffer.from(content, 'hex').buffer; // 将包含十六进制字符的字符串转换成ArrayBuffer
     14. let options: generateBarcode.CreateOptions = {
     15. scanType: scanCore.ScanType.QR_CODE,
     16. height: 400,
     17. width: 400
     18. }
     19. try {
     20. // 码图生成接口，成功返回PixelMap格式图片
     21. generateBarcode.createBarcode(contentBuffer, options).then((pixelMap: image.PixelMap) => {
     22. this.pixelMap = pixelMap;
     23. hilog.info(0x0001, TAG, 'Succeeded in creating barCode.');
     24. }).catch((error: BusinessError) => {
     25. hilog.error(0x0001, TAG, `Failed to createBarCode. Code: ${error.code}, message: ${error.message}`);
     26. })
     27. } catch (error) {
     28. hilog.error(0x0001, TAG,
     29. `Failed to createBarcode by Promise with options. Code: ${error.code}, message: ${error.message}`);
     30. }
     31. })
     32. // 获取生成码图后显示
     33. if (this.pixelMap) {
     34. Image(this.pixelMap).width(300).height(300).objectFit(ImageFit.Contain)
     35. }
     36. }
     37. .width('100%')
     38. .height('100%')
     39. }
     40. }
     ```

## 模拟器开发

暂不支持模拟器开发，调用接口会返回错误信息“Emulator is not supported.”