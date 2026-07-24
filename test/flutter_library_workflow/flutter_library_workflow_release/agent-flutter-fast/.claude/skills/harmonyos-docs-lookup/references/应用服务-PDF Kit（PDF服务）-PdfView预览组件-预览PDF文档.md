PDF Kit提供了丰富的PDF文档预览能力，比如：

* 页面跳转
* 页面缩放
* 单双页显示
* 页面适配
* 滚动视图方式预览

详细说明及使用请参考：[PdfView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfview-component#section724521414201)组件。

## 示例代码

1. 导入相关模块。
2. 以下示例代码中以预览“input.pdf”文件名为例，此时需要确保在工程目录“src/main/resources/rawfile”里存在input.pdf文档，并且拷贝input.pdf文档到沙箱目录。
3. 调用loadDocument方法，加载PDF文档。
4. 调用PdfView预览组件，渲染显示。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService, pdfViewManager, PdfView } from '@kit.PDFKit'
2. import { fileIo } from '@kit.CoreFileKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { BusinessError } from '@kit.BasicServicesKit';

6. @Entry
7. @Component
8. struct Index {
9. private controller: pdfViewManager.PdfController = new pdfViewManager.PdfController();

11. aboutToAppear(): void {
12. let context = this.getUIContext().getHostContext() as Context;
13. let dir: string = context.filesDir
14. // 确保在工程目录src/main/resources/rawfile里存在input.pdf文档
15. let filePath: string = dir + '/input.pdf';
16. try {
17. let res = fileIo.accessSync(filePath);
18. if (!res) {
19. let content: Uint8Array = context.resourceManager.getRawFileContentSync('rawfile/input.pdf');
20. let fdSand =
21. fileIo.openSync(filePath, fileIo.OpenMode.WRITE_ONLY | fileIo.OpenMode.CREATE | fileIo.OpenMode.TRUNC);
22. fileIo.writeSync(fdSand.fd, content.buffer);
23. fileIo.closeSync(fdSand.fd);
24. }
25. } catch (e) {
26. let error: BusinessError = e as BusinessError;
27. hilog.error(0x0000, 'IndexPage', `Code: ${error.code}, message: ${error.message} `);
28. }
29. (async () => {
30. // 该监听方法只能在文档加载前调用一次
31. this.controller.registerPageCountChangedListener((pageCount: number) => {
32. hilog.info(0x0000, 'registerPageCountChanged-', pageCount.toString());
33. });
34. let loadResult1: pdfService.ParseResult = await this.controller.loadDocument(filePath);
35. // 注意：这里刚加载文档，请不要在这里立即设置PDF文档的预览方式
36. })()
37. }

39. build() {
40. Row() {
41. PdfView({
42. controller: this.controller,
43. pageFit: pdfService.PageFit.FIT_WIDTH,
44. showScroll: true
45. })
46. .id('pdfview_app_view')
47. .layoutWeight(1);
48. }
49. .width('100%')
50. .height('100%')
51. }
52. }
```