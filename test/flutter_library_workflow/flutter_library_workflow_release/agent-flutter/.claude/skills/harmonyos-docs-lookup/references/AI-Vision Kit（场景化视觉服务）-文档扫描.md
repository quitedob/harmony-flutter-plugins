## 场景介绍

文档扫描控件提供拍摄文档并转换为高清扫描件的服务。仅需拍摄文档，即可自动裁剪和优化，并支持图片、PDF格式保存和分享；同时支持拍摄或从图库选择图片识别表格，生成表格文档。

可广泛用于教育办公场景，扫描文档、票据、课堂PPT和书籍等输出图片/PDF供用户完成发送、存档等操作。

**图1** 文档扫描示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/lLe9FekuS12BNmC3REwubQ/zh-cn_image_0000002271471913.png?HW-CC-KV=V1&HW-CC-Date=20260414T051606Z&HW-CC-Expire=86400&HW-CC-Sign=8F9F6B4CB9D6BB1F0DB376BD643FBC666973AC0A70DD075276D09DBA7591460F "点击放大")

## 约束与限制

* 支持的语种类型：简体中文、英文。
* 文档扫描暂时只支持phone、tablet设备。
* 不允许被其他组件或窗口遮挡。

## 接口说明

以下仅列出demo中调用的部分主要接口，具体API说明详见[API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vision-document-scanner)。

展开

| 接口名 | 描述 |
| --- | --- |
| [DocumentScanner](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vision-document-scanner#section143611912403) | 文档扫描控件 |
| [DocumentScannerResultCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vision-document-scanner#section3361123418402) | 文档扫描结果 |

## 开发步骤

1. 将文档扫描控件相关的类添加至工程。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { DocType, DocumentScanner, DocumentScannerConfig, SaveOption, FilterId, ShootingMode } from "@kit.VisionKit";
   ```
2. 配置布局，根据业务场景配置文档扫描控件的相关属性，获取返回的文档图片uri列表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { hilog } from '@kit.PerformanceAnalysisKit';

   3. const TAG = 'DocumentScanner'

   5. @Entry
   6. @Component
   7. struct Index {
   8. private docScanConfig = new DocumentScannerConfig()

   10. aboutToAppear() {
   11. this.docScanConfig.supportType = [DocType.DOC, DocType.SHEET]
   12. this.docScanConfig.isGallerySupported = true
   13. this.docScanConfig.editTabs = []
   14. this.docScanConfig.maxShotCount = 3
   15. this.docScanConfig.defaultFilterId = FilterId.ORIGINAL
   16. this.docScanConfig.defaultShootingMode = ShootingMode.MANUAL
   17. this.docScanConfig.isShareable = true
   18. this.docScanConfig.originalUris = []
   19. }

   21. build() {
   22. Column() {
   23. DocumentScanner({
   24. scannerConfig: this.docScanConfig,
   25. onResult: (code: number, saveType: SaveOption, uris: string[]) => {
   26. hilog.info(0x0001, TAG, `result code: ${code}, save: ${saveType}`)
   27. uris.forEach(uriString => {
   28. hilog.info(0x0001, TAG, `uri: ${uriString}`)
   29. })
   30. }
   31. }).size({ width: '100%', height: '100%' })
   32. }
   33. .height('100%')
   34. .width('100%')
   35. }
   36. }
   ```

## 开发实例

### Index.ets

收起

自动换行

深色代码主题

复制

```
1. // 开发实例分两页实现，一页为文档扫描入口页，一页为文档扫描实现页
2. // 文档扫描入口页，需引入文档扫描实现页，以下文实例为例，实现页文件名为DocDemoPage
3. import { DocDemoPage } from './DocDemoPage'

5. @Entry
6. @Component
7. struct MainPage {
8. @Provide('pathStack') pathStack: NavPathStack = new NavPathStack()

10. @Builder
11. PageMap(name: string) {
12. if (name === 'documentScanner') {
13. DocDemoPage()
14. }
15. }

17. // 文档扫描入口按钮，可替换为业务入口
18. build() {
19. Navigation(this.pathStack) {
20. Button('DocumentScanner', { stateEffect: true, type: ButtonType.Capsule })
21. .width('50%')
22. .height(40)
23. .onClick(() => {
24. this.pathStack.pushPath({ name: 'documentScanner' })
25. })
26. }.title('文档扫描控件demo').navDestination(this.PageMap)
27. .mode(NavigationMode.Stack)
28. }
29. }
```

### DocDemoPage.ets

收起

自动换行

深色代码主题

复制

```
1. // 文档扫描实现页，文件名为DocDemoPage，需被引入至入口页
2. import {
3. DocType,
4. DocumentScanner,
5. DocumentScannerConfig,
6. SaveOption,
7. FilterId,
8. ShootingMode
9. } from "@kit.VisionKit"
10. import { hilog } from '@kit.PerformanceAnalysisKit';

12. const TAG: string = 'DocDemoPage'

14. // 文档扫描页，用于加载UIExtensionAbility
15. @Component
16. export struct DocDemoPage {
17. @State docImageUris: string[] = []
18. @Consume('pathStack') pathStack: NavPathStack
19. private docScanConfig = new DocumentScannerConfig()

21. aboutToAppear() {
22. this.docScanConfig.supportType = [DocType.DOC, DocType.SHEET]
23. this.docScanConfig.isGallerySupported = true
24. this.docScanConfig.editTabs = []
25. this.docScanConfig.maxShotCount = 3
26. this.docScanConfig.defaultFilterId = FilterId.ORIGINAL
27. this.docScanConfig.defaultShootingMode = ShootingMode.MANUAL
28. this.docScanConfig.isShareable = true
29. this.docScanConfig.originalUris = []
30. }

32. build() {
33. NavDestination() {
34. Stack({ alignContent: Alignment.Top }) {
35. // 展示文档扫描结果
36. List() {
37. ForEach(this.docImageUris, (uri: string) => {
38. ListItem() {
39. Image(uri)
40. .objectFit(ImageFit.Contain)
41. .width(100)
42. .height(100)
43. }
44. })
45. }
46. .listDirection(Axis.Vertical)
47. .alignListItem(ListItemAlign.Center)
48. .margin({
49. top: 50
50. })
51. .width('80%')
52. .height('80%')

54. // 文档扫描
55. DocumentScanner({
56. scannerConfig: this.docScanConfig,
57. onResult: (code: number, saveType: SaveOption, uris: string[]) => {
58. hilog.info(0x0001, TAG, `result code: ${code}, save: ${saveType}`)
59. if (code === -1) {
60. this.pathStack.pop()
61. }
62. uris.forEach(uriString => {
63. hilog.info(0x0001, TAG, `uri: ${uriString}`)
64. })
65. this.docImageUris = uris
66. }
67. })
68. .size({ width: '100%', height: '100%' })
69. }
70. .width('100%')
71. .height('100%')
72. }
73. .width('100%')
74. .height('100%')
75. .hideTitleBar(true)
76. }
77. }
```