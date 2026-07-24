PDF Kit支持判断PDF文档是否加密及删除PDF加密锁。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [isEncrypted](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section8613112012)(path: string): boolean | 判断当前文档是否已加密。 |
| [removeSecurity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pdf-arkts-pdfservice#section0716101115205)(): boolean | 删除文档加密锁。 |

## 示例代码

1. 调用isEncrypted方法，判断PDF文档是否加密。
2. 如果是加密PDF文档，调用removeSecurity方法移除PDF文档的加密锁。

收起

自动换行

深色代码主题

复制

```
1. import { pdfService } from '@kit.PDFKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. @Entry
5. @Component
6. struct PdfPage {
7. private pdfDocument: pdfService.PdfDocument = new pdfService.PdfDocument();
8. private context = this.getUIContext().getHostContext() as Context;

10. build() {
11. Column() {
12. // 判断文档是否加密，并删除加密
13. Button('isEncryptedAndRemoveSecurity').onClick(async () => {
14. // 确保沙箱目录有input.pdf文档
15. let filePath = this.context.filesDir + '/input.pdf';
16. let isEncrypt = this.pdfDocument.isEncrypted(filePath);
17. if (isEncrypt) {
18. let hasRemoveEncrypt = this.pdfDocument.removeSecurity();
19. hilog.info(0x0000, 'PdfPage', 'isEncryptedAndRemoveSecurity %{public}s!',
20. hasRemoveEncrypt ? 'success' : 'fail');
21. }
22. })
23. }
24. }
25. }
```