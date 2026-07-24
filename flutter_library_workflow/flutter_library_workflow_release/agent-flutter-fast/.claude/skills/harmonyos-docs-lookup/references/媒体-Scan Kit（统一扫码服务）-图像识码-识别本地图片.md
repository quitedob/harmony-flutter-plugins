## 基本概念

图片识码能力支持对图库中的码图进行扫描识别，并获取信息。

## 场景介绍

图片识码能力支持对图库中的条形码、二维码、MULTIFUNCTIONAL CODE进行识别，并获得码类型、码值、码位置信息。该能力可用于一图单码和一图多码的识别，比如条形码、付款码等。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/24/v3/_6s_00M9S1qkF51hDQXK0g/zh-cn_image_0000002497196941.png?HW-CC-KV=V1&HW-CC-Date=20260414T053407Z&HW-CC-Expire=86400&HW-CC-Sign=3BA07B03E2E773B03841F48CC92F1C4EE6A5C0A5CEAB1DE695B961C34C461688 "点击放大")

1. 用户向开发者的应用发起图片识码请求。
2. 应用通过调用Scan Kit的decode接口启动图片识码。
3. Scan Kit通过回调返回图片识码结果。
4. 应用向用户返回扫码结果。

## 接口说明

接口返回值有两种返回形式：Callback和Promise回调。下表中为启动图片识码Callback和Promise形式接口，Callback和Promise只是返回值方式不一样，功能相同。具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-imagedecode)。

展开

| 接口名 | 描述 |
| --- | --- |
| [decode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-imagedecode#section9221156204617)(inputImage: [InputImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-imagedecode#section2194164873812), options?: scanBarcode.[ScanOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scanbarcode-api#section1285191073117)): Promise<Array<scanBarcode.[ScanResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-scanbarcode-api#section10614317162112)>> | 启动图片识码，通过InputImage传入图片信息，通过ScanOptions进行识码参数设置（options为可选参数），使用Promise异步回调返回识码结果。 |
| [decode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-imagedecode#section12482559194718)(inputImage: InputImage, options: scanBarcode.ScanOptions, callback: AsyncCallback<Array<scanBarcode.ScanResult>>): void | 启动图片识码，通过InputImage传入图片信息，通过ScanOptions进行识码参数设置，使用Callback异步回调返回识码结果。 |
| [decode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/scan-imagedecode#section17256144317492)(inputImage: InputImage, callback: AsyncCallback<Array<scanBarcode.ScanResult>>): void | 启动图片识码，通过InputImage传入图片信息，使用Callback异步回调返回识码结果。 |

## 开发步骤

图片识码接口支持识别图库中的条形码，二维码以及MULTIFUNCTIONAL CODE，并返回图片中码图的值，类型以及码的位置信息（码图最小外接矩形左上角和右下角的坐标）。

为了方便开发者接入，我们提供了详细的样例工程供参考，推荐参考[示例工程](https://gitcode.com/HarmonyOS_Samples/scan-kit_-sample-code_-clientdemo_-arkts)接入。

以下示例为调用图片识码的detectBarcode.decode接口获取码图信息。

1. 导入图片识码接口和相关接口模块，该接口提供了图片识码参数和方法，导入方法如下。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 导入图片识码需要的日志和picker模块
   2. import { scanCore, scanBarcode, detectBarcode } from '@kit.ScanKit';
   3. import { photoAccessHelper } from '@kit.MediaLibraryKit';
   4. import { hilog } from '@kit.PerformanceAnalysisKit';
   5. import { BusinessError } from '@kit.BasicServicesKit';
   ```
2. 调用detectBarcode.decode接口解析码图。
   * 通过Promise回调函数得到扫码结果，InputImage对象中uri参数推荐通过[picker](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-photoviewpicker)方式获取。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry
     2. @Component
     3. struct DetectPage {
     4. build() {
     5. Column() {
     6. Button('Promise with options')
     7. .backgroundColor('#0D9FFB')
     8. .fontSize(20)
     9. .fontColor($r('sys.color.comp_background_list_card'))
     10. .fontWeight(FontWeight.Normal)
     11. .align(Alignment.Center)
     12. .type(ButtonType.Capsule)
     13. .width('90%')
     14. .height(40)
     15. .margin({ top: 5, bottom: 5 })
     16. .onClick(() => {
     17. // 定义识码参数options
     18. let options: scanBarcode.ScanOptions = {
     19. scanTypes: [scanCore.ScanType.ALL],
     20. enableMultiMode: true,
     21. }
     22. // 通过picker拉起图库的图片
     23. let photoOption = new photoAccessHelper.PhotoSelectOptions();
     24. photoOption.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
     25. photoOption.maxSelectNumber = 1;
     26. let photoPicker = new photoAccessHelper.PhotoViewPicker();
     27. photoPicker.select(photoOption).then((result) => {
     28. // 定义识码参数inputImage，其中uri为picker选择图片
     29. let inputImage: detectBarcode.InputImage = { uri: result.photoUris[0] };
     30. try {
     31. // 调用图片识码接口
     32. detectBarcode.decode(inputImage, options).then((result: Array<scanBarcode.ScanResult>) => {
     33. hilog.info(0x0001, '[Scan Sample]',
     34. `Succeeded in getting ScanResult by promise with options, result is ${JSON.stringify(result)}`);
     35. }).catch((error: BusinessError) => {
     36. hilog.error(0x0001, '[Scan Sample]',
     37. `Failed to get ScanResult by promise with options. Code: ${error.code}, message: ${error.message}`);
     38. });
     39. } catch (error) {
     40. hilog.error(0x0001, '[Scan Sample]',
     41. `Failed to detectBarcode. Code: ${error.code}, message: ${error.message}`);
     42. }
     43. }).catch((error: BusinessError) => {
     44. hilog.error(0x0001, '[Scan Sample]',
     45. `Failed to select a photo. Code: ${error.code}, message: ${error.message}`);
     46. })
     47. });
     48. }
     49. .width('100%')
     50. .height('100%')
     51. .alignItems(HorizontalAlign.Center)
     52. .justifyContent(FlexAlign.Center)
     53. }
     54. }
     ```
   * 通过Callback回调函数得到扫码结果，InputImage对象中uri参数推荐通过[picker](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/photoaccesshelper-photoviewpicker)方式获取。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. @Entry

     3. @Component
     4. struct DetectPage {
     5. build() {
     6. Column() {
     7. Button('Callback with options')
     8. .backgroundColor('#0D9FFB')
     9. .fontSize(20)
     10. .fontColor($r('sys.color.comp_background_list_card'))
     11. .fontWeight(FontWeight.Normal)
     12. .align(Alignment.Center)
     13. .type(ButtonType.Capsule)
     14. .width('90%')
     15. .height(40)
     16. .margin({ top: 5, bottom: 5 })
     17. .onClick(() => {
     18. // 定义识码参数options
     19. let options: scanBarcode.ScanOptions = {
     20. scanTypes: [scanCore.ScanType.ALL],
     21. enableMultiMode: true,
     22. enableAlbum: true
     23. }
     24. // 通过选择模式拉起photoPicker界面，用户可以选择一个图片
     25. let photoOption = new photoAccessHelper.PhotoSelectOptions();
     26. photoOption.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
     27. photoOption.maxSelectNumber = 1;
     28. let photoPicker = new photoAccessHelper.PhotoViewPicker();
     29. photoPicker.select(photoOption).then((result) => {
     30. // 定义识码参数inputImage，其中uri为picker选择图片
     31. let inputImage: detectBarcode.InputImage = { uri: result.photoUris[0] };
     32. try {
     33. // 调用图片识码接口
     34. detectBarcode.decode(inputImage, options,
     35. (error: BusinessError, result: Array<scanBarcode.ScanResult>) => {
     36. if (error && error.code) {
     37. hilog.error(0x0001, '[Scan Sample]',
     38. `Failed to get ScanResult by callback with options. Code: ${error.code}, message: ${error.message}`);
     39. return;
     40. }
     41. hilog.info(0x0001, '[Scan Sample]',
     42. `Succeeded in getting ScanResult by callback with options, result is ${JSON.stringify(result)}`);
     43. });
     44. } catch (error) {
     45. hilog.error(0x0001, '[Scan Sample]',
     46. `Failed to detectBarcode. Code: ${error.code}, message: ${error.message}`);
     47. }
     48. }).catch((error: BusinessError) => {
     49. hilog.error(0x0001, '[Scan Sample]',
     50. `Failed to select a photo. Code: ${error.code}, message: ${error.message}`);
     51. })
     52. });
     53. }
     54. .width('100%')
     55. .height('100%')
     56. .alignItems(HorizontalAlign.Center)
     57. .justifyContent(FlexAlign.Center)
     58. }
     59. }
     ```

## 模拟器开发

支持模拟器开发，模拟器使用指导请参见[使用模拟器运行应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-run-emulator)。