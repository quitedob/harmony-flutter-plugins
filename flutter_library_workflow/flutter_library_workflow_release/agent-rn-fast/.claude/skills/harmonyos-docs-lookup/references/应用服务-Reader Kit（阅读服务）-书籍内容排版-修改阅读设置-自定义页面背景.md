当应用需要支持自定义背景时，开发者可通过[ReaderSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section13615732174218)的themeColor及themeBgImg属性，实现对阅读内容自定义背景色及背景图片的实时修改。

更改页面背景色，可能会涉及到字体颜色和深色模式的适配。比如：设置了白色背景，但是当前是深色模式，字体颜色也是白色，这样会导致内容看不清楚。

自定义页面背景图片支持两种存放路径：

* 工程目录resources/rawfile文件夹。
* [应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/jt0AMDQyQYydgTdqTPPtQQ/zh-cn_image_0000002224338886.png?HW-CC-KV=V1&HW-CC-Date=20260414T032858Z&HW-CC-Expire=86400&HW-CC-Sign=EF48588DBFC2D63EC145EE0370C1C8649B0957F92BC1F824951B0D2B4F80A5D7 "点击放大")

## 接口说明

自定义页面背景主要涉及1个接口，具体介绍如下表所示。

展开

| 接口名 | 描述 |
| --- | --- |
| [setPageConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-read-core#section6297758718)(pageConfig: ReaderSetting): void | 设置或者修改页面排版属性。 |

## 开发准备

* 进行自定义背景之前，请先确保已经“[构建阅读器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/reader-read-page)”。
* 已经准备好自定义背景图片资源，并放在对应的目录当中。

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
2. 单独设置背景色。如果有设置背景图片的情况下，背景色通常用于仿真翻页时背面主题色的绘制。否则，背景色还会用于渲染阅读页的背景色。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.readerSetting.themeColor = '#000000';
   2. this.readerSetting.themeBgImg = '';
   3. // 当设置背景色为浅色时，需要将深色模式关掉
   4. this.readerSetting.nightMode = false;
   5. // 当设置背景色为浅色时，字体颜色也需要适配
   6. this.readerSetting.fontColor = '#FFFFFF';
   ```
3. 设置背景图片。需要同时设置与背景图片相近的主题颜色，用于仿真翻页时背面主题色的绘制。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.readerSetting.themeBgImg = 'dark_sky_first.jpg';
   2. this.readerSetting.themeColor = '#000000';
   3. // 当设置背景图为浅色时，需要将深色模式关掉
   4. this.readerSetting.nightMode = false;
   5. // 当设置背景图为浅色时，字体颜色也需要适配
   6. this.readerSetting.fontColor = '#FFFFFF';
   ```
4. 调用ReaderComponentController组件控制器的setPageConfig接口，重新渲染界面。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. this.readerComponentController.setPageConfig(this.readerSetting);
   ```
5. 注册排版引擎资源请求接口，并返回相应的背景图资源。

   在排版引擎检测到是自定义背景图片场景时，会通过接口请求背景图片资源。开发者需要根据返回的文件路径，判断是否为请求背景图片资源。如果是，则根据背景图片资源所在的路径，返回对应的ArrayBuffer。

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

   11. /**
   12. * 资源请求回调
   13. */
   14. private resourceRequest: bookParser.CallbackRes<string, ArrayBuffer> = (filePath: string): ArrayBuffer => {
   15. hilog.info(0x0000, 'testTag', 'resourceRequest : filePath = ' + filePath);
   16. if(filePath.length === 0){
   17. return new ArrayBuffer(0);
   18. }
   19. try {
   20. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   21. // 获取资源路径resources/rawfile下的背景图片文件Uint8Array数据
   22. let value: Uint8Array = context.resourceManager.getRawFileContentSync(filePath);
   23. hilog.info(0x0000, 'testTag', 'resourceRequest : get other resource succeeded ');
   24. return value.buffer as ArrayBuffer;
   25. } catch (error) {
   26. let code = (error as BusinessError).code;
   27. let message = (error as BusinessError).message;
   28. hilog.error(0x0000, 'testTag',
   29. `resourceRequest : get other resource failed, error code: ${code}, message: ${message}.`);
   30. }
   31. // 如果在资源路径源路径resources/rawfile下获取背景图片文件数据失败，则去沙箱目录下获取背景图片数据
   32. return this.loadFileFromPath(filePath);
   33. }

   35. private loadFileFromPath(filePath: string): ArrayBuffer {
   36. try {
   37. let stats = fs.statSync(filePath);
   38. let file = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
   39. let buffer = new ArrayBuffer(stats.size);
   40. fs.readSync(file.fd, buffer);
   41. fs.closeSync(file);
   42. return buffer;
   43. } catch (err) {
   44. hilog.error(0x0000, 'testTag', "mkdir failed with error message: ", err.message, ", error code: ", err.code);
   45. return new ArrayBuffer(0);
   46. }
   47. }
   ```