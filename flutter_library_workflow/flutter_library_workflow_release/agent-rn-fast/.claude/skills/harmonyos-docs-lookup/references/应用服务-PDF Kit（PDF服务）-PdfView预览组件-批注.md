进入批注模式，目前支持高亮、下划线和删除线类型批注。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [enableAnnotation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section1771517381253)(annotationType: SupportedAnnotationType, color?: number): void | 在常用操作之间切换并添加批注。 |

## 示例代码

1. 先加载PDF文档。
2. 调用PdfView预览组件，渲染显示。
3. 调用enableAnnotation方法，进入批注模式。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService, pdfViewManager, PdfView } from '@kit.PDFKit';

3. @Entry
4. @Component
5. struct PdfPage {
6. private pdfController = new pdfViewManager.PdfController();
7. private context = this.getUIContext().getHostContext() as Context;

9. aboutToAppear(): void {
10. // 确保沙箱目录有input.pdf文档
11. let filePath = this.context.filesDir + '/input.pdf';
12. (async () => {
13. let loadResult: pdfService.ParseResult = await this.pdfController.loadDocument(filePath);
14. if (pdfService.ParseResult.PARSE_SUCCESS === loadResult) {
15. // 添加删除线批注
16. this.pdfController.enableAnnotation(pdfViewManager.SupportedAnnotationType.STRIKETHROUGH, 0xAAEEEEEE);
17. }
18. })()
19. }

21. build() {
22. Column() {
23. // 加载PdfView组件进行预览
24. PdfView({
25. controller: this.pdfController,
26. pageFit: pdfService.PageFit.FIT_WIDTH,
27. showScroll: true
28. })
29. .id('pdfview_app_view')
30. .layoutWeight(1);
31. }
32. }
33. }
```