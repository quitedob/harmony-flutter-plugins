## 场景介绍

从5.0.0(12)版本开始， Hds支持单层图标处理能力。

适用于图标为单层资源，且图标展示风格要与华为HarmonyOS Design System设计风格一致的应用场景，典型应用场景可参考分层图标[场景介绍](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-design-layered-process#section154545114557)。

## 约束条件

单层图标处理支持Phone、Tablet、PC/2in1设备，并且从5.1.1(19)版本开始，新增支持TV设备。

## 开发步骤

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/_LrwKQurSzuCxruKTeXfVg/zh-cn_image_0000002532144125.png?HW-CC-KV=V1&HW-CC-Date=20260414T041459Z&HW-CC-Expire=86400&HW-CC-Sign=86CA2367C0862E540B2AFA08375E80D4CCE07197517CD2EE4413281FD4AFDAE9 "点击放大")

1. 在entry/src/main/resources/base/media下，配置一张图片资源normal\_icon.png。
2. 将图标处理的相关类添加至工程。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { LayeredDrawableDescriptor, DrawableDescriptor } from '@kit.ArkUI';
   2. import { hdsDrawable } from '@kit.UIDesignKit';
   3. import { image } from '@kit.ImageKit';
   4. import { BusinessError } from '@kit.BasicServicesKit';
   5. import { resourceManager } from '@kit.LocalizationKit';
   6. import { common } from '@kit.AbilityKit';
   ```

3. 简单配置页面的布局，调用[单层图标接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsdrawable#section11716322123212)获取处理后的图标信息，也可以调用[异步批量处理接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdsdrawable#section12429174135913)。

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
   7. drawableDescriptor: DrawableDescriptor | undefined = undefined;
   8. @State iconsResult: Array<hdsDrawable.ProcessedIcon> = [];

   10. build() {
   11. Column() {
   12. Column() {
   13. Text('getHdsIcon')
   14. .fontWeight(FontWeight.Bold)
   15. .fontSize(16)
   16. .margin(5)

   18. Image(this.getHdsIcon())
   19. .width(48)
   20. .height(48)
   21. }
   22. .margin(20)

   24. Text('getHdsIcons')
   25. .fontWeight(FontWeight.Bold)
   26. .fontSize(16)
   27. .margin(5)

   29. List() {
   30. ForEach(this.iconsResult,
   31. (item: hdsDrawable.ProcessedIcon, index?: number) => {
   32. ListItem() {
   33. Column() {
   34. Text(item.bundleName)
   35. .fontWeight(FontWeight.Medium)
   36. .fontSize(16)
   37. .margin(5)

   39. Image(item.pixelMap)
   40. .width(48)
   41. .height(48)
   42. }
   43. .margin(15)
   44. }
   45. .width('100%')
   46. }, (item: string) => item.toString())
   47. }
   48. .scrollBar(BarState.On)
   49. .height('60%')
   50. }
   51. .height('100%')
   52. .width('100%')
   53. }

   55. aboutToAppear(): void {
   56. // 获取资源管理器
   57. this.resManager = (this.getUIContext().getHostContext() as common.UIAbilityContext)?.resourceManager;
   58. if (!this.resManager) {
   59. return;
   60. }

   62. // 通过资源管理获取分层图标信息
   63. this.layeredDrawableDescriptor = (this.resManager.getDrawableDescriptor($r('app.media.drawable').id)) as LayeredDrawableDescriptor;

   65. // 通过资源管理获取单层图标信息
   66. this.drawableDescriptor =
   67. (this.resManager?.getDrawableDescriptor($r('app.media.normal_icon').id)) as DrawableDescriptor;

   69. this.getHdsIcons();
   70. }

   72. private getHdsIcon(): image.PixelMap | null {
   73. try {
   74. // 调用HDS单层图标接口
   75. return hdsDrawable.getHdsIcon(this.bundleName, this.drawableDescriptor?.getPixelMap(), 48,
   76. this.layeredDrawableDescriptor?.getMask().getPixelMap(), true);
   77. } catch (err) {
   78. let message = (err as BusinessError).message;
   79. let code = (err as BusinessError).code;
   80. console.error(`getHdsIcon failed, code: ${code}, message: ${message}`);
   81. return null;
   82. }
   83. }

   85. getHdsIcons(): void {
   86. if (!this.drawableDescriptor) {
   87. console.error(`getHdsIcons drawableDescriptor is undefined.`);
   88. return;
   89. }

   91. if (!this.layeredDrawableDescriptor) {
   92. console.error(`getHdsIcons layeredDrawableDescriptor is undefined.`);
   93. return;
   94. }

   96. // 构造批量接口传参
   97. let options: hdsDrawable.Options = {
   98. size: 48,
   99. hasBorder: true,
   100. parallelNumber: 4
   101. };

   103. let icons: Array<hdsDrawable.Icon> = [];
   104. for (let i = 0; i < 10; i++) {
   105. icons.push({
   106. bundleName: `${this.bundleName}-${i}`,
   107. pixelMap: this.drawableDescriptor.getPixelMap()
   108. })
   109. }

   111. try {
   112. // 调用HDS单层批量接口处理图标
   113. hdsDrawable.getHdsIcons(icons, this.layeredDrawableDescriptor.getMask().getPixelMap(), options)
   114. .then((data: Array<hdsDrawable.ProcessedIcon>) => {
   115. console.info(`getHdsIcons data size: ${data.length}`);
   116. this.iconsResult = data;
   117. })
   118. .catch((err: BusinessError) => {
   119. console.error(`getHdsIcons error, code: ${err.code}, msg: ${err.message}`);
   120. });
   121. } catch (err) {
   122. let message = (err as BusinessError).message;
   123. let code = (err as BusinessError).code;
   124. console.error(`getHdsIcons callback failed: ${message}, code: ${code}`);
   125. }
   126. }
   127. }
   ```

## 开发实例

收起

自动换行

深色代码主题

复制

```
1. import { LayeredDrawableDescriptor, DrawableDescriptor } from '@kit.ArkUI';
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
14. drawableDescriptor: DrawableDescriptor | undefined = undefined;
15. @State iconsResult: Array<hdsDrawable.ProcessedIcon> = [];

17. build() {
18. Column() {
19. Column() {
20. Text('getHdsIcon')
21. .fontWeight(FontWeight.Bold)
22. .fontSize(16)
23. .margin(5)

25. Image(this.getHdsIcon())
26. .width(48)
27. .height(48)
28. }
29. .margin(20)

31. Text('getHdsIcons')
32. .fontWeight(FontWeight.Bold)
33. .fontSize(16)
34. .margin(5)

36. List() {
37. ForEach(this.iconsResult,
38. (item: hdsDrawable.ProcessedIcon, index?: number) => {
39. ListItem() {
40. Column() {
41. Text(item.bundleName)
42. .fontWeight(FontWeight.Medium)
43. .fontSize(16)
44. .margin(5)

46. Image(item.pixelMap)
47. .width(48)
48. .height(48)
49. }
50. .margin(15)
51. }
52. .width('100%')
53. }, (item: string) => item.toString())
54. }
55. .scrollBar(BarState.On)
56. .height('60%')
57. }
58. .height('100%')
59. .width('100%')
60. }

62. aboutToAppear(): void {
63. // 获取资源管理器
64. this.resManager = (this.getUIContext().getHostContext() as common.UIAbilityContext)?.resourceManager;
65. if (!this.resManager) {
66. return;
67. }

69. // 通过资源管理获取分层图标信息
70. this.layeredDrawableDescriptor = (this.resManager.getDrawableDescriptor($r('app.media.drawable').id)) as LayeredDrawableDescriptor;

72. // 通过资源管理获取单层图标信息
73. this.drawableDescriptor =
74. (this.resManager?.getDrawableDescriptor($r('app.media.normal_icon').id)) as DrawableDescriptor;

76. this.getHdsIcons();
77. }

79. private getHdsIcon(): image.PixelMap | null {
80. try {
81. // 调用HDS单层图标接口处理图标
82. return hdsDrawable.getHdsIcon(this.bundleName, this.drawableDescriptor?.getPixelMap(), 48,
83. this.layeredDrawableDescriptor?.getMask().getPixelMap(), true);
84. } catch (err) {
85. let message = (err as BusinessError).message;
86. let code = (err as BusinessError).code;
87. console.error(`getHdsIcon failed, code: ${code}, message: ${message}`);
88. return null;
89. }
90. }

92. getHdsIcons(): void {
93. if (!this.drawableDescriptor) {
94. console.error(`getHdsIcons drawableDescriptor is undefined.`);
95. return;
96. }

98. if (!this.layeredDrawableDescriptor) {
99. console.error(`getHdsIcons layeredDrawableDescriptor is undefined.`);
100. return;
101. }

103. // 构造批量接口传参
104. let options: hdsDrawable.Options = {
105. size: 48,
106. hasBorder: true,
107. parallelNumber: 4
108. };

110. let icons: Array<hdsDrawable.Icon> = [];
111. for (let i = 0; i < 10; i++) {
112. icons.push({
113. bundleName: `${this.bundleName}-${i}`,
114. pixelMap: this.drawableDescriptor.getPixelMap()
115. })
116. }

118. try {
119. // 调用HDS单层批量接口处理图标
120. hdsDrawable.getHdsIcons(icons, this.layeredDrawableDescriptor.getMask().getPixelMap(), options)
121. .then((data: Array<hdsDrawable.ProcessedIcon>) => {
122. console.info(`getHdsIcons data size: ${data.length}`);
123. this.iconsResult = data;
124. })
125. .catch((err: BusinessError) => {
126. console.error(`getHdsIcons error, code: ${err.code}, msg: ${err.message}`);
127. });
128. } catch (err) {
129. let message = (err as BusinessError).message;
130. let code = (err as BusinessError).code;
131. console.error(`getHdsIcons callback failed: ${message}, code: ${code}`);
132. }
133. }
134. }
```