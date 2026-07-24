## 场景介绍

调用[getPagePixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section858145014542)方法，将指定PDF缩略图转化为图片。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [getPagePixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section858145014542)(pageIndex: number, isSync?: boolean): Promise<image.PixelMap> | 获取对应PDF页面的缩略图，使用Promise异步回调。 |

## 示例代码

1. 调用loadDocument方法，加载PDF文档。
2. 调用getPagePixelMap方法，获取image.PixelMap对象。
3. 将image.PixelMap转化为二进制图片文件并保存。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService, pdfViewManager } from '@kit.PDFKit';
2. import { image } from '@kit.ImageKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { hilog } from '@kit.PerformanceAnalysisKit';

7. @Entry
8. @Component
9. struct PdfPage {
10. private controller: pdfViewManager.PdfController = new pdfViewManager.PdfController();
11. private context = this.getUIContext().getHostContext() as Context;
12. private loadResult: pdfService.ParseResult = pdfService.ParseResult.PARSE_ERROR_FORMAT;

14. aboutToAppear(): void {
15. // 确保沙箱目录有input.pdf文档
16. let filePath = this.context.filesDir + '/input.pdf';
17. (async () => {
18. this.loadResult = await this.controller.loadDocument(filePath);
19. })()
20. }

22. // 将 pixelMap 转成图片格式
23. pixelMap2Buffer(pixelMap: image.PixelMap): Promise<ArrayBuffer> {
24. return new Promise((resolve, reject) => {
25. /**
26. 设置打包参数
27. format：图片打包格式
28. quality：JPEG 编码输出图片质量
29. */
30. let packOpts: image.PackingOption = { format: 'image/jpeg', quality: 98 }
31. // 创建ImagePacker实例
32. const imagePackerApi = image.createImagePacker()
33. imagePackerApi.packToData(pixelMap, packOpts).then((buffer: ArrayBuffer) => {
34. resolve(buffer)
35. }).catch((err: BusinessError) => {
36. reject()
37. })
38. })
39. }

41. build() {
42. Column() {
43. // 转换为图片并保存到应用沙箱
44. Button('getPagePixelMap').onClick(async () => {
45. if (this.loadResult === pdfService.ParseResult.PARSE_SUCCESS) {
46. let pixmap: image.PixelMap = await this.controller.getPagePixelMap(0, true);
47. if (!pixmap) {
48. return
49. }
50. const imgBuffer = await this.pixelMap2Buffer(pixmap)
51. try {
52. const file =
53. fs.openSync(this.context.filesDir + `/${Date.now()}.png`, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
54. await fs.write(file.fd, imgBuffer);
55. // 关闭文件
56. await fs.close(file.fd)
57. } catch (e) {
58. let error: BusinessError = e as BusinessError;
59. hilog.error(0x0000, 'getPagePixelMap-', `Code: ${error.code}, message: ${error.message} `);
60. }
61. }
62. })
63. }
64. }
65. }
```