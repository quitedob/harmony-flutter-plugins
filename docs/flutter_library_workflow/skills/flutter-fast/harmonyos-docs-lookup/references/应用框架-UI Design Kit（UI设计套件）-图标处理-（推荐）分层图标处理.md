## 场景介绍

从5.0.0(12)版本开始， Hds支持分层图标处理能力。

适用于图标为分层资源，且图标展示风格要与华为HarmonyOS Design System设计风格一致的应用场景。以下是一些典型的应用场景：

* 展示带图标的应用列表：可调用UI Design Kit批量处理分层图标的接口获取处理后的应用图标。
* 展示应用详情：可调用UI Design Kit处理单个分层图标的接口获取处理后的应用图标。
* 展示跟随在线主题的应用图标：可调用UI Design Kit处理分层图标的接口获取主题换肤后的应用图标。

## 约束条件

分层图标处理支持Phone、Tablet、PC/2in1设备，并且从5.1.1(19)版本开始，新增支持TV设备。

## 开发步骤

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/8kJXVIS1QW6cHg9BcTRj8Q/zh-cn_image_0000002532304121.png?HW-CC-KV=V1&HW-CC-Date=20260414T041455Z&HW-CC-Expire=86400&HW-CC-Sign=C1DB8C4601AED29E3D535AC39B27519260A2BF2C9315DD1951BB44A097A23311 "点击放大")

1. 设置分层图标。

   将前景资源和背景资源，放到entry/src/main/resources/base/media下，在该目录创建一个json文件（例如：drawable.json），内容为

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. {
   2. "layered-image":
   3. {
   4. "background" : "$media:background",
   5. "foreground" : "$media:foreground"
   6. }
   7. }
   ```
2. 将图标处理的相关类添加至工程。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { LayeredDrawableDescriptor } from '@kit.ArkUI';
   2. import { hdsDrawable } from '@kit.UIDesignKit';
   3. import { image } from '@kit.ImageKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   5. import { resourceManager } from '@kit.LocalizationKit';
   6. import { common } from '@kit.AbilityKit';
   ```

3. 简单配置页面的布局，调用[分层图标接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsdrawable#section156601033183215)获取处理后的图标信息，也可以调用[异步批量处理接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsdrawable#section712131324710)。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. @Entry
   2. @Component
   3. struct Index{
   4. bundleName: string = 'com.example.uidesignkit';
   5. resManager: resourceManager.ResourceManager | undefined = undefined;
   6. layeredDrawableDescriptor: LayeredDrawableDescriptor | undefined = undefined;
   7. @State layeredIconsResult: Array<hdsDrawable.ProcessedIcon> = [];

   9. build() {
   10. Column() {
   11. Column() {
   12. Text('getHdsLayeredIcon')
   13. .fontWeight(FontWeight.Bold)
   14. .fontSize(16)
   15. .margin(5)

   17. Image(this.getHdsLayeredIcon())
   18. .width(48)
   19. .height(48)
   20. }
   21. .margin(20)

   23. Text('getHdsLayeredIcons')
   24. .fontWeight(FontWeight.Bold)
   25. .fontSize(16)
   26. .margin(5)

   28. List() {
   29. ForEach(this.layeredIconsResult,
   30. (item: hdsDrawable.ProcessedIcon, index?: number) => {
   31. ListItem() {
   32. Column() {
   33. Text(item.bundleName)
   34. .fontWeight(FontWeight.Medium)
   35. .fontSize(16)
   36. .margin(5)

   38. Image(item.pixelMap)
   39. .width(48)
   40. .height(48)
   41. }
   42. .margin(15)
   43. }
   44. .width('100%')
   45. }, (item: string) => item.toString())
   46. }
   47. .scrollBar(BarState.On)
   48. .height('60%')
   49. }
   50. .height('100%')
   51. .width('100%')
   52. }

   54. aboutToAppear(): void {
   55. // 获取资源管理器
   56. this.resManager = (this.getUIContext().getHostContext() as common.UIAbilityContext)?.resourceManager;
   57. if (!this.resManager) {
   58. return;
   59. }
   60. // 通过资源管理获取原始分层图标信息
   61. this.layeredDrawableDescriptor = (this.resManager.getDrawableDescriptor($r('app.media.drawable')
   62. .id)) as LayeredDrawableDescriptor;
   63. this.getHdsLayeredIcons();
   64. }

   66. private getHdsLayeredIcon(): image.PixelMap | null {
   67. try {
   68. // 调用HDS分层图标接口处理图标
   69. return hdsDrawable.getHdsLayeredIcon(this.bundleName, this.layeredDrawableDescriptor, 48, true);
   70. } catch (err) {
   71. let message = (err as BusinessError).message;
   72. let code = (err as BusinessError).code;
   73. console.error(`getHdsLayeredIcon failed, code: ${code}, message: ${message}`);
   74. return null;
   75. }
   76. }

   78. private getHdsLayeredIcons(): void {
   79. if (!this.layeredDrawableDescriptor) {
   80. console.error(`getHdsLayeredIcons layeredDrawableDescriptor is undefined.`);
   81. return;
   82. }

   84. // 构造批量接口传参
   85. let options: hdsDrawable.Options = {
   86. size: 48,
   87. hasBorder: true,
   88. parallelNumber: 4
   89. };

   91. let layeredIcons: Array<hdsDrawable.LayeredIcon> = [];
   92. for (let i = 0; i < 10; i++) {
   93. layeredIcons.push({
   94. bundleName: `${this.bundleName}-${i}`,
   95. layeredDrawableDescriptor: this.layeredDrawableDescriptor
   96. });
   97. }

   99. try {
   100. // 调用HDS批量分层接口处理图标
   101. hdsDrawable.getHdsLayeredIcons(layeredIcons, options)
   102. .then((data: Array<hdsDrawable.ProcessedIcon>) => {
   103. console.info(`getHdsLayeredIcons data size: ${data.length}`);
   104. this.layeredIconsResult = data;
   105. })
   106. .catch((err: BusinessError) => {
   107. console.error(`getHdsLayeredIcons return error, code: ${err.code}, msg: ${err.message}`);
   108. });
   109. } catch (err) {
   110. let message = (err as BusinessError).message;
   111. let code = (err as BusinessError).code;
   112. console.error(`getHdsLayeredIcons failed, code: ${code}, message: ${message}`);
   113. }
   114. }
   115. }
   ```

## 开发实例

收起

自动换行

深色代码主题

复制

```
1. import { LayeredDrawableDescriptor } from '@kit.ArkUI';
2. import { hdsDrawable } from '@kit.UIDesignKit';
3. import { image } from '@kit.ImageKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { resourceManager } from '@kit.LocalizationKit';
6. import { common } from '@kit.AbilityKit';

8. @Entry
9. @Component
10. struct Index{
11. bundleName: string = 'com.example.uidesignkit';
12. resManager: resourceManager.ResourceManager | undefined = undefined;
13. layeredDrawableDescriptor: LayeredDrawableDescriptor | undefined = undefined;
14. @State layeredIconsResult: Array<hdsDrawable.ProcessedIcon> = [];

16. build() {
17. Column() {
18. Column() {
19. Text('getHdsLayeredIcon')
20. .fontWeight(FontWeight.Bold)
21. .fontSize(16)
22. .margin(5)

24. Image(this.getHdsLayeredIcon())
25. .width(48)
26. .height(48)
27. }
28. .margin(20)

30. Text('getHdsLayeredIcons')
31. .fontWeight(FontWeight.Bold)
32. .fontSize(16)
33. .margin(5)

35. List() {
36. ForEach(this.layeredIconsResult,
37. (item: hdsDrawable.ProcessedIcon, index?: number) => {
38. ListItem() {
39. Column() {
40. Text(item.bundleName)
41. .fontWeight(FontWeight.Medium)
42. .fontSize(16)
43. .margin(5)

45. Image(item.pixelMap)
46. .width(48)
47. .height(48)
48. }
49. .margin(15)
50. }
51. .width('100%')
52. }, (item: string) => item.toString())
53. }
54. .scrollBar(BarState.On)
55. .height('60%')
56. }
57. .height('100%')
58. .width('100%')
59. }

61. aboutToAppear(): void {
62. // 获取资源管理器
63. this.resManager = (this.getUIContext().getHostContext() as common.UIAbilityContext)?.resourceManager;
64. if (!this.resManager) {
65. return;
66. }
67. // 通过资源管理获取原始分层图标信息
68. this.layeredDrawableDescriptor = (this.resManager.getDrawableDescriptor($r('app.media.drawable').id)) as LayeredDrawableDescriptor;
69. this.getHdsLayeredIcons();
70. }

72. private getHdsLayeredIcon(): image.PixelMap | null {
73. try {
74. // 调用HDS分层图标接口处理图标
75. return hdsDrawable.getHdsLayeredIcon(this.bundleName, this.layeredDrawableDescriptor, 48, true);
76. } catch (err) {
77. let message = (err as BusinessError).message;
78. let code = (err as BusinessError).code;
79. console.error(`getHdsLayeredIcon failed, code: ${code}, message: ${message}`);
80. return null;
81. }
82. }

84. private getHdsLayeredIcons(): void {
85. if (!this.layeredDrawableDescriptor) {
86. console.error(`getHdsLayeredIcons layeredDrawableDescriptor is undefined.`);
87. return;
88. }

90. // 构造批量接口传参
91. let options: hdsDrawable.Options = {
92. size: 48,
93. hasBorder: true,
94. parallelNumber: 4
95. };

97. let layeredIcons: Array<hdsDrawable.LayeredIcon> = [];
98. for (let i = 0; i < 10; i++) {
99. layeredIcons.push({
100. bundleName: `${this.bundleName}-${i}`,
101. layeredDrawableDescriptor: this.layeredDrawableDescriptor
102. });
103. }

105. try {
106. // 调用HDS批量分层接口处理图标
107. hdsDrawable.getHdsLayeredIcons(layeredIcons, options)
108. .then((data: Array<hdsDrawable.ProcessedIcon>) => {
109. console.info(`getHdsLayeredIcons data size: ${data.length}`);
110. this.layeredIconsResult = data;
111. })
112. .catch((err: BusinessError) => {
113. console.error(`getHdsLayeredIcons return error, code: ${err.code}, msg: ${err.message}`);
114. });
115. } catch (err) {
116. let message = (err as BusinessError).message;
117. let code = (err as BusinessError).code;
118. console.error(`getHdsLayeredIcons failed, code: ${code}, message: ${message}`);
119. }
120. }
121. }
```