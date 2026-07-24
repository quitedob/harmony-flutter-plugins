PDF Kit支持对指定页面添加、删除页眉页脚。页眉页脚信息包含文字、日期和页码等相关内容，并可设置字体大小、颜色和间距等相关样式，具体属性参考[HeaderFooterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section3237995481)。如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/bx_9Wo9pR8S_UWn3KApjBg/zh-cn_image_0000002533821277.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T032419Z&HW-CC-Expire=86400&HW-CC-Sign=1ADDF7B0B93EF2FC93C4E6C420B0624873FBD052879DBE66891223854D16C179 "点击放大")

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [addHeaderFooter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section4211341401)(info: HeaderFooterInfo, startIndex: number, endIndex: number, oddPages: boolean, evenPages: boolean): void | 插入PDF文档页眉页脚。 |
| [removeHeaderFooter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section19996123722218)(): boolean | 删除PDF文档页眉页脚。 |

注意

[addHeaderFooter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section4211341401)方法属于耗时业务，需要遍历每一页去添加页眉页脚，添加页面较多时建议放到线程里去处理。

## 示例代码

**添加页眉页脚：**

1. 调用loadDocument方法，加载PDF文档。
2. 实例化页眉页脚HeaderFooterInfo类，并设置相关属性，包括字体大小、颜色和间距等。
3. 调用addHeaderFooter方法，添加页眉页脚到页面中。
4. 保存PDF文档到应用沙箱。

**删除页眉页脚：**

1. 调用loadDocument方法，加载PDF文档。
2. 调用removeHeaderFooter方法，删除页眉页脚。
3. 保存PDF文档到应用沙箱。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService } from '@kit.PDFKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { Font } from '@kit.ArkUI';

5. @Entry
6. @Component
7. struct PdfPage {
8. private pdfDocument: pdfService.PdfDocument = new pdfService.PdfDocument();
9. private context = this.getUIContext().getHostContext() as Context;

11. build() {
12. Column() {
13. Button('addHeaderFooter').onClick(async () => {
14. // 确保沙箱目录有input.pdf文档
15. let filePath = this.context.filesDir + '/input.pdf';
16. let res = this.pdfDocument.loadDocument(filePath);
17. if (res === pdfService.ParseResult.PARSE_SUCCESS) {
18. let hfInfo: pdfService.HeaderFooterInfo = new pdfService.HeaderFooterInfo();
19. hfInfo.fontInfo = new pdfService.FontInfo();
20. // 确保字体路径存在
21. let font: Font = new Font()
22. hfInfo.fontInfo.fontPath = font.getFontByName('HarmonyOS Sans')?.path;
23. // 如果不知道字体的具体名称，可以为空字符串
24. hfInfo.fontInfo.fontName = '';
25. hfInfo.textSize = 10;
26. hfInfo.charset = pdfService.CharsetType.PDF_FONT_DEFAULT_CHARSET;
27. hfInfo.underline = false;
28. hfInfo.textColor = 0x00000000;
29. hfInfo.leftMargin = 1.0;
30. hfInfo.topMargin = 40.0;
31. hfInfo.rightMargin = 1.0;
32. hfInfo.bottomMargin = 40.0;
33. hfInfo.headerLeftText = 'left H <<dd.mm.yyyy>> <<1/n>>';
34. hfInfo.headerCenterText = 'center H <<m/d/yyyy>> <<1/n>>';
35. hfInfo.headerRightText = 'right H <<m/d>><<1>>';
36. hfInfo.footerLeftText = 'left F <<m/d>><<1>>';
37. hfInfo.footerCenterText = 'center F <<m/d>><<1>>';
38. hfInfo.footerRightText = 'right F <<dd.mm.yyyy>><<1>>';
39. this.pdfDocument.addHeaderFooter(hfInfo, 1, 5, true, true);
40. let outPdfPath = this.context.filesDir + '/testAddHeaderFooter.pdf';
41. let result = this.pdfDocument.saveDocument(outPdfPath);
42. hilog.info(0x0000, 'PdfPage', 'addHeaderFooter %{public}s!', result ? 'success' : 'fail');
43. }
44. this.pdfDocument.releaseDocument();
45. })
46. Button('removeHeaderFooter').onClick(async () => {
47. let filePath = this.context.filesDir + '/testAddHeaderFooter.pdf';
48. let res = this.pdfDocument.loadDocument(filePath);
49. if (res === pdfService.ParseResult.PARSE_SUCCESS && this.pdfDocument.hasHeaderFooter()) {
50. let removeResult = this.pdfDocument.removeHeaderFooter();
51. if (removeResult) {
52. let outPdfPath = this.context.filesDir + '/removeHeaderFooter.pdf';
53. let result = this.pdfDocument.saveDocument(outPdfPath);
54. hilog.info(0x0000, 'PdfPage', 'removeHeaderFooter %{public}s!', result ? 'success' : 'fail');
55. }
56. }
57. this.pdfDocument.releaseDocument();
58. })
59. }
60. }
61. }
```