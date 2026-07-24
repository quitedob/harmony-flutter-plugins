## 场景介绍

通过加载本地路径的PDF文档，实现打开PDF文档的预览功能。当PDF文档做了批注等相关的信息时，可以使用保存功能。

和pdfService的打开和保存能力相同，具体区别查看pdfService的[打开和保存PDF文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/pdf-open-document)的场景介绍。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [loadDocument](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section073321844615)(path: string, password?: string, initPageIndex?: number, onProgress?: Callback<number>): Promise<pdfService.ParseResult> | 加载PDF文档。 |
| [saveDocument](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section1641615224414)(path: string, onProgress?: Callback<number>): Promise<number> | 保存PDF文档，使用Promise异步回调。 |

## 示例代码

1. 在aboutToAppear函数里面加载PDF文档。
2. 调用PdfView预览组件，渲染显示。
3. 在【savePdfDocument】按钮中调用saveDocument方法另存为PDF文档。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService, PdfView, pdfViewManager } from '@kit.PDFKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. @Entry
5. @Component
6. struct PdfPage {
7. private controller: pdfViewManager.PdfController = new pdfViewManager.PdfController();
8. private context = this.getUIContext().getHostContext() as Context;
9. private loadResult: pdfService.ParseResult = pdfService.ParseResult.PARSE_ERROR_FORMAT;

11. aboutToAppear(): void {
12. // 确保沙箱目录有input.pdf文档
13. let filePath = this.context.filesDir + '/input.pdf';
14. (async () => {
15. this.loadResult = await this.controller.loadDocument(filePath);
16. })()
17. }

19. build() {
20. Column() {
21. // 保存Pdf文档
22. Button('savePdfDocument').onClick(async () => {
23. if (this.loadResult === pdfService.ParseResult.PARSE_SUCCESS) {
24. let savePath = this.context.filesDir + '/savePdfDocument.pdf';
25. let result = await this.controller.saveDocument(savePath);
26. hilog.info(0x0000, 'PdfPage', 'savePdfDocument %{public}s!', result ? 'success' : 'fail');
27. }
28. })
29. PdfView({
30. controller: this.controller,
31. pageFit: pdfService.PageFit.FIT_WIDTH,
32. showScroll: true
33. })
34. .id('pdfview_app_view')
35. .layoutWeight(1);
36. }
37. .width('100%')
38. .height('100%')
39. }
40. }
```