当应用需要支持自定义字体时，开发者可通过[ReaderSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section13615732174218)的fontPath属性，实现对阅读内容字体的实时修改。

自定义字体文件支持两种存放路径：

* 工程目录resources/rawfile文件夹。
* [应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/Zk8WC4JqSQKyaaXcl_paRg/zh-cn_image_0000002224338258.png?HW-CC-KV=V1&HW-CC-Date=20260414T032855Z&HW-CC-Expire=86400&HW-CC-Sign=D2E5E47EAE28597EFFC74E470F2E853656BE755583496C7F652D15CBCAF59CA2 "点击放大")

## 接口说明

自定义字体主要涉及3个接口，具体介绍如下表所示。

展开

| 接口名 | 描述 |
| --- | --- |
| [setPageConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section6297758718)(pageConfig: ReaderSetting): void | 设置或者修改页面排版属性。 |
| [on('resourceRequest')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section169541417131914) | 注册资源请求回调，如果设置了自定义背景，字体时，排版引擎会通过此接口获取对应的资源ArrayBuffer。 |
| [off('resourceRequest')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section3912114022216) | 注销资源请求回调接口，可在页面销毁时调用。 |

## 开发准备

* 进行自定义字体之前，请先确保已经“[构建阅读器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/reader-read-page)”。
* 已经准备好字体资源，并放在对应的目录当中。

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { fileIo as fs } from '@kit.CoreFileKit';
   2. import { common } from '@kit.AbilityKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 定义字体文件存放路径：
   * 若资源放在项目resources/rawfile/fonts文件夹下。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. let filePath: string = 'fonts/SourceHanSerifCN-VF.ttf';
     ```
   * 若资源放在[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)下。

     收起

     自动换行

     深色代码主题

     复制

     ```
     1. let filePath: string = this.getUIContext().getHostContext()!.filesDir + '/fonts/SourceHanSerifCN-VF.ttf'
     ```
3. 通过ReaderSetting的fontName和fontPath属性设置自定义字体的名称及所在的路径，并调用ReaderComponentController组件控制器的setPageConfig接口，重新渲染界面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.readerSetting.fontName = '思源宋体';
   2. // 路径为上述两种之一
   3. this.readerSetting.fontPath = filePath;
   4. this.readerComponentController.setPageConfig(this.readerSetting);
   ```
4. 注册排版引擎资源请求接口，并返回相应资源。

   当排版引擎检测到是自定义字体场景时，会通过接口请求字体资源。开发者需要根据返回的文件路径，判断是否为请求字体资源。如果是，则根据字体资源所在的路径，返回对应的ArrayBuffer。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. aboutToAppear(): void {
   2. // 注册资源请求回调
   3. this.readerComponentController.on('resourceRequest', this.resourceRequest);
   4. }

   6. aboutToDisappear(): void {
   7. // 注销资源请求回调
   8. this.readerComponentController.off('resourceRequest');
   9. }

   11. private isFont(filePath: string): boolean {
   12. let options = [".ttf", ".woff2", ".otf"];
   13. let path = filePath.toLowerCase();
   14. let result = path.indexOf(options[0]) != -1 || path.indexOf(options[1]) != -1 || path.indexOf(options[2]) != -1;
   15. hilog.info(0x0000, 'testTag',  'isFont = ' + result);
   16. return result;
   17. }

   19. /**
   20. * 资源请求回调
   21. */
   22. private resourceRequest: bookParser.CallbackRes<string, ArrayBuffer> = (filePath: string): ArrayBuffer => {
   23. hilog.info(0x0000, 'testTag', 'resourceRequest : filePath = ' + filePath);
   24. if (filePath.length === 0) {
   25. return new ArrayBuffer(0);
   26. }
   27. if (!this.isFont(filePath)) {
   28. return new ArrayBuffer(0);
   29. }
   30. try {
   31. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   32. // 获取资源路径resources/rawfile/fonts下的字体文件Uint8Array数据
   33. let value: Uint8Array = context.resourceManager.getRawFileContentSync(this.readerSetting.fontPath);
   34. hilog.info(0x0000, 'testTag', 'resourceRequest : get other resource succeeded ');
   35. return value.buffer as ArrayBuffer;
   36. } catch (error) {
   37. let code = (error as BusinessError).code;
   38. let message = (error as BusinessError).message;
   39. hilog.error(0x0000, 'testTag',
   40. `resourceRequest : get other resource failed, error code: ${code}, message: ${message}.`);
   41. }
   42. // 如果在资源路径源路径resources/rawfile/fonts下获取字体文件数据失败，则去沙箱目录下获取字体文件数据
   43. return this.loadFileFromPath(this.readerSetting.fontPath);
   44. }

   46. private loadFileFromPath(filePath: string): ArrayBuffer {
   47. try {
   48. let stats = fs.statSync(filePath);
   49. let file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
   50. let buffer = new ArrayBuffer(stats.size);
   51. fs.readSync(file.fd, buffer);
   52. fs.closeSync(file);
   53. return buffer;
   54. } catch (err) {
   55. hilog.error(0x0000, 'testTag', "mkdir failed with error message: ", err.message, ", error code: ", err.code);
   56. return new ArrayBuffer(0);
   57. }
   58. }
   ```