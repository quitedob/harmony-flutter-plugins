当应用需要导入本地书籍到书架时，开发者可通过[DocumentViewPicker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-picker#documentviewpicker)先将书籍文件导入到[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。然后利用解析能力获取书籍信息，用于书架中书封，书名，作者等信息的展示。

## 业务流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/HTymOqNKTqKWPLG1PwtZUg/zh-cn_image_0000002227052488.png?HW-CC-KV=V1&HW-CC-Date=20260414T032837Z&HW-CC-Expire=86400&HW-CC-Sign=267EBFE87AF01F8351AD55D2E6C4BE695496A3E7C82AA057FBE69EA0B1FDA4EA "点击放大")

## 接口说明

获取书籍信息共涉及3个接口，具体API说明请参考下表。

展开

| 接口名 | 描述 |
| --- | --- |
| [getDefaultHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-book-parser#section896820167243)(path: string): Promise<BookParserHandler> | 获取书籍默认解析器。 |
| [getBookInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-book-parser#section599065683812)(): BookInfo | 获取书籍信息。 |
| [getResourceContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/reader-book-parser#section17546184255211)(spineIndex: number, filePath: string): ArrayBuffer | 获取书籍内容资源。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { common } from '@kit.AbilityKit';
   2. import { bookParser } from '@kit.ReaderKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit';
   4. import { image } from '@kit.ImageKit';
   ```
2. 通过提前导入到[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)中的书籍文件，初始化书籍解析器。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. private defaultHandler: bookParser.BookParserHandler | null = null;

   3. aboutToAppear(): void {
   4. this.init().then(() => {
   5. });
   6. }

   8. private async init() {
   9. let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
   10. let path: string = `${context.filesDir}/abc.epub`;
   11. try {
   12. this.defaultHandler = await bookParser.getDefaultHandler(path);
   13. } catch (error) {
   14. hilog.error(0x0000, "testTAG", `getDefaultHandler failed, Code: ${error.code}, message: ${error.message}`);
   15. }
   16. }
   ```
3. 获取书名、作者、书封信息并进行展示。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @State bookCover: PixelMap | null = null;
   2. @State bookTitle: string = '';
   3. @State author: string = '';

   5. aboutToAppear(): void {
   6. this.init().then(() => {
   7. this.getBookInfo();
   8. });
   9. }

   11. private async getBookInfo() {
   12. try {
   13. let bookInfo: bookParser.BookInfo | undefined = this.defaultHandler?.getBookInfo();
   14. if (bookInfo) {
   15. this.bookTitle = bookInfo.bookTitle || '';
   16. this.author = bookInfo?.bookCreator || '';
   17. // SpineIndex is not required for obtaining the book cover.
   18. let buffer = this.defaultHandler?.getResourceContent(-1, bookInfo.bookCoverImage);
   19. let imageSource: image.ImageSource = image.createImageSource(buffer);
   20. this.bookCover = await imageSource.createPixelMap();
   21. imageSource.release();
   22. }
   23. hilog.info(0x0000, 'testTAG', 'getBookInfo bookInfo is: ' + JSON.stringify(bookInfo));
   24. } catch (error) {
   25. hilog.error(0x0000, 'testTAG', `getBookInfo failed, Code: ${error.code}, message: ${error.message}`);
   26. }
   27. }

   29. build() {
   30. Column() {
   31. Text('书名：' + this.bookTitle)
   32. .fontSize(20)
   33. .fontColor("#E6000000")
   34. .margin({ top: 50 })
   35. Text('作者：' + this.author)
   36. .fontSize(20)
   37. .fontColor("#E6000000")
   38. .margin({ top: 10 })
   39. Image(this.bookCover)
   40. .width(200)
   41. .aspectRatio(3 / 4)
   42. .borderRadius(5)
   43. .margin({ top: 10 })
   44. }
   45. .alignItems(HorizontalAlign.Start)
   46. .margin({ left: 10, right: 10 })
   47. }
   ```