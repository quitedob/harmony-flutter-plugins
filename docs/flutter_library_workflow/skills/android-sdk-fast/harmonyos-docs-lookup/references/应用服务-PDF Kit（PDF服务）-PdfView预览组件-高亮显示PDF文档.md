PDF文档在预览时，可以对页面的矩形区域或文本设置高亮显示，高亮颜色可以自定义。

[setHighlightText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section475716341213)可以同时高亮多个不同的文本。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/RQ9rf7PsTwOc39ii8ECbrQ/zh-cn_image_0000002533661317.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T032109Z&HW-CC-Expire=86400&HW-CC-Sign=094C4809348419690C0429B7C42DA5781EE0E0A36F7F89179D8DD2E9243770CA)

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [setHighlightText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section475716341213)(pageIndex: number, textArray: string[], color: number): void | 高亮指定文本。 |

注意

[setHighlightText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section475716341213)和[searchKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfviewmanage#section117864247160)功能互斥。

## 示例代码

1. 加载PDF文档。
2. 调用PdfView预览组件，渲染显示。
3. 在按钮【setHighlightText】里，调用setHighlightText方法，设置单个或多个要高亮的文本。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService, PdfView, pdfViewManager } from '@kit.PDFKit';

3. @Entry
4. @Component
5. struct PdfPage {
6. private controller: pdfViewManager.PdfController = new pdfViewManager.PdfController();
7. private context = this.getUIContext().getHostContext() as Context;
8. private loadResult: pdfService.ParseResult = pdfService.ParseResult.PARSE_ERROR_FORMAT;

10. aboutToAppear(): void {
11. // 确保沙箱目录有input.pdf文档
12. let filePath = this.context.filesDir + '/input.pdf';
13. (async () => {
14. this.loadResult = await this.controller.loadDocument(filePath);
15. })()
16. }

18. build() {
19. Column() {
20. Row() {
21. // 设置文本的高亮显示风格
22. Button('setHighlightText').onClick(async () => {
23. if (this.loadResult === pdfService.ParseResult.PARSE_SUCCESS) {
24. this.controller.setHighlightText(0, ['白皮书'], 0xAAF9CC00);
25. }
26. })
27. }

29. // 加载PdfView组件进行预览
30. PdfView({
31. controller: this.controller,
32. pageFit: pdfService.PageFit.FIT_WIDTH,
33. showScroll: true
34. })
35. .id('pdfview_app_view')
36. .layoutWeight(1);
37. }
38. .width('100%').height('100%')
39. }
40. }
```