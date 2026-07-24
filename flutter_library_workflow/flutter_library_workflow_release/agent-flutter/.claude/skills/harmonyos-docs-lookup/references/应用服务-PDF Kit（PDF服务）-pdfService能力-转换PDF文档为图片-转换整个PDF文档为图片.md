## 场景介绍

将整个PDF文档的页面转换为图片，每页为一张图片，并且所有图片存放在指定的同一个文件夹下。

当前支持的图片格式请参考[ImageFormat](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section1713111745313)。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [convertToImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section1029783924311)(path: string, format: ImageFormat, onProgress?: (progress: number) => number): boolean | 转换PDF文档为图片。 |

## 示例代码

1. 调用loadDocument方法，加载PDF文档。
2. 设置要输出图片的文件夹，调用convertToImage方法转化PDF文档所有页面为图片。

收起

自动换行

深色代码主题

复制

```
1. import { fileIo as fs } from '@kit.CoreFileKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { pdfService } from '@kit.PDFKit';

5. @Entry
6. @Component
7. struct PdfPage {
8. private pdfDocument: pdfService.PdfDocument = new pdfService.PdfDocument();
9. private context = this.getUIContext().getHostContext() as Context;
10. private loadResult: pdfService.ParseResult = pdfService.ParseResult.PARSE_ERROR_FORMAT;

12. aboutToAppear(): void {
13. // 确保沙箱目录有input.pdf文档
14. let filePath = this.context.filesDir + '/input.pdf';
15. this.loadResult = this.pdfDocument.loadDocument(filePath);
16. }

18. build() {
19. Column() {
20. // 获取为图片并保存到应用沙箱
21. Button('convertToImage').onClick(async () => {
22. if (this.loadResult === pdfService.ParseResult.PARSE_SUCCESS) {
23. let outputPath = this.getUIContext().getHostContext()?.filesDir + '/output/';
24. fs.mkdir(outputPath);
25. // 将所有的页面转化为png图片，并存储在output文件夹里，确保output文件夹目录存在
26. let res = this.pdfDocument.convertToImage(outputPath, pdfService.ImageFormat.PNG);
27. hilog.info(0x0000, 'PdfPage', 'convertToImage %{public}s!', res ? 'success' : 'fail');
28. }
29. })
30. }
31. }
32. }
```