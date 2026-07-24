## 基本概念

码图生成能力支持将字符串转换为自定义格式的码图。

## 场景介绍

码图生成能力支持将字符串转换为自定义格式的码图，包含条形码、二维码生成。

可以将字符串转成联系人码图，手机克隆码图，例如将"HUAWEI"字符串生成码图使用。

## 约束与限制

码图生成能力支持Phone、Tablet、Wearable、2in1、TV（从5.1.0(18)版本开始支持Wearable、从5.1.1(19)版本开始支持2in1、TV）。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/Cnp4-KuvRWSfv_SVxXL2QQ/zh-cn_image_0000002464277490.png?HW-CC-KV=V1&HW-CC-Date=20260414T053418Z&HW-CC-Expire=86400&HW-CC-Sign=4ADD9215960A99E65CB8D58226A96CAC7BBFD60ACAD9E8C86A07DE9FB378C49C "点击放大")

1. 用户向应用发起生成码图请求后，输入需要生成的码图信息，包括码图的类型、宽高等。
2. 应用通过调用Scan Kit的createBarcode接口启动码图生成能力。
3. Scan Kit通过将字符串转换为所需格式的码图并返回给应用。
4. 应用向用户返回生成码图结果。

## 接口说明

接口返回值有两种返回形式：Callback和Promise回调。下表中为码图生成能力的Callback和Promise形式接口，Callback和Promise只是返回值方式不一样，功能相同。具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode)。

展开

| 接口名 | 接口描述 |
| --- | --- |
| [createBarcode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode#section1841142919352)(content: string, options: [CreateOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode#section87678254617)): Promise<image.[PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap)> | 码图生成接口，返回image.PixelMap类型的参数，可以使用Image组件渲染成图片。使用Promise异步回调返回生成的码图。 |
| [createBarcode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-generatebarcode#section129941731103410)(content: string, options: CreateOptions, callback: AsyncCallback<image.PixelMap>): void | 码图生成接口，返回image.PixelMap类型的参数，可以使用Image组件渲染成图片。使用Callback异步回调返回生成的码图。 |

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
   ```
2. 调用码图生成能力的createBarcode接口实现码图生成。
   * 通过Promise方式回调，获取生成的码图。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct Index {
     4. @State pixelMap: image.PixelMap | undefined = undefined

     6. build() {
     7. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
     8. Button('generateBarcode Promise').onClick(() => {
     9. // 以QR码为例，码图生成参数
     10. this.pixelMap = undefined;
     11. let content: string = 'huawei';
     12. let options: generateBarcode.CreateOptions = {
     13. scanType: scanCore.ScanType.QR_CODE,
     14. height: 400,
     15. width: 400
     16. }
     17. try {
     18. // 码图生成接口，成功返回PixelMap格式图片
     19. generateBarcode.createBarcode(content, options).then((pixelMap: image.PixelMap) => {
     20. this.pixelMap = pixelMap;
     21. }).catch((error: BusinessError) => {
     22. hilog.error(0x0001, '[generateBarcode]',
     23. `Failed to get PixelMap by promise with options. Code: ${error.code}, message: ${error.message}`);
     24. })
     25. } catch (error) {
     26. hilog.error(0x0001, '[generateBarcode]',
     27. `Failed to createBarcode by promise with options. Code: ${error.code}, message: ${error.message}`);
     28. }

     30. })
     31. // 获取生成码图后显示
     32. if (this.pixelMap) {
     33. Image(this.pixelMap).width(300).height(300).objectFit(ImageFit.Contain)
     34. }
     35. }
     36. .width('100%')
     37. .height('100%')
     38. }
     39. }
     ```
   * 通过Callback方式回调，获取生成的码图。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct Index {
     4. @State pixelMap: image.PixelMap | undefined = undefined

     6. build() {
     7. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
     8. Button('generateBarcode Callback').onClick(() => {
     9. // 以QR码为例，码图生成参数
     10. let content = 'huawei';
     11. let options: generateBarcode.CreateOptions = {
     12. scanType: scanCore.ScanType.QR_CODE,
     13. height: 400,
     14. width: 400
     15. }
     16. try {
     17. // 码图生成接口，成功返回PixelMap格式图片
     18. generateBarcode.createBarcode(content, options, (error: BusinessError, pixelMap: image.PixelMap) => {
     19. if (error) {
     20. hilog.error(0x0001, '[generateBarcode]',
     21. `Failed to get PixelMap by callback with options. Code: ${error.code}, message: ${error.message}`);
     22. return;
     23. }
     24. this.pixelMap = pixelMap;
     25. })
     26. } catch (error) {
     27. hilog.error(0x0001, '[generateBarcode]',
     28. `Failed to createBarcode by callback with options. Code: ${error.code}, message: ${error.message}`);
     29. }
     30. })
     31. // 获取生成码图后显示
     32. if (this.pixelMap) {
     33. Image(this.pixelMap).width(300).height(300).objectFit(ImageFit.Contain)
     34. }
     35. }
     36. .width('100%')
     37. .height('100%')
     38. }
     39. }
     ```

## 模拟器开发

暂不支持模拟器开发，调用接口会返回错误信息“Emulator is not supported.”