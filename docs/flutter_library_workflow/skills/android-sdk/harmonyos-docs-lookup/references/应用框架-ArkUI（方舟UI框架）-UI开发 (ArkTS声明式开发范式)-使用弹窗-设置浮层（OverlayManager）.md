浮层（OverlayManager）用于在页面（Page）之上展示自定义的UI内容，位于Dialog、Popup、Menu、BindSheet、BindContentCover和Toast等组件之下，展示范围为当前窗口的安全区内，适用于常驻悬浮等场景。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/d67_86u3RPSQXCV8G4Qung/zh-cn_image_0000002571171561.png?HW-CC-KV=V1&HW-CC-Date=20260414T035217Z&HW-CC-Expire=86400&HW-CC-Sign=ACADDB119B40C9C8676D4009C481AB328343A15225F17638A90DD67F5FF78FEC)

可以通过使用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中的[getOverlayManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getoverlaymanager12)方法获取当前UI上下文关联的[OverlayManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager)对象，再通过该对象调用对应方法。

## 规格约束

* OverlayManager上节点的层级在Page页面层级之上，在Dialog、Popup、Menu、BindSheet、BindContentCover和Toast等组件之下。
* OverlayManager添加的节点显示和消失时没有默认动画。
* OverlayManager上节点安全区域内外的绘制方式与Page一致，键盘避让方式与Page一致。
* 推荐使用AppStorage存储与OverlayManager相关的属性，以避免页面切换时属性值变化导致业务错误。
* 当使用API version 19以下版本时，OverlayManager不支持侧滑（左滑/右滑）关闭，需在[onBackPress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#onbackpress)中添加OverlayManager关闭的逻辑。API 19及以上版本可通过配置[OverlayManagerOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-i#overlaymanageroptions15)中的enableBackPressedEvent属性设置OverlayManager是否响应侧滑手势。
* OverlayManager中的事件机制优先被[WrappedBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-wrapbuilder)装饰的组件接收。若需实现浮层底部接收事件，可通过设置[hitTestBehavior](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-hit-test-behavior#hittestbehavior)为HitTestMode.Transparent将事件传递至底层。

## 设置浮层

在OverlayManager上[新增指定节点（addComponentContent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#addcomponentcontent12)、[删除指定节点（removeComponentContent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#removecomponentcontent12)、[显示所有节点（showAllComponentContents）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#showallcomponentcontents12)和[隐藏所有节点（hideAllComponentContents）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#hideallcomponentcontents12)。

收起

自动换行

深色代码主题

复制

```
1. import { ComponentContent, OverlayManager } from '@kit.ArkUI';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const TAG: string = '[Sample_dialogproject]';
5. const DOMAIN: number = 0xFF00;

7. class Params {
8. public text: string = '';
9. public offset: Position;

11. constructor(text: string, offset: Position) {
12. this.text = text;
13. this.offset = offset;
14. }
15. }

17. @Builder
18. function builderText(params: Params) {
19. Column() {
20. Text(params.text)
21. .fontSize(30)
22. .fontWeight(FontWeight.Bold)
23. }.offset(params.offset)
24. }

26. @Entry
27. @Component
28. export struct OverlayManagerComponent {
29. @State message: string = 'ComponentContent';
30. private uiContext: UIContext = this.getUIContext();
31. private overlayNode: OverlayManager = this.uiContext.getOverlayManager();
32. @StorageLink('contentArray') contentArray: ComponentContent<Params>[] = [];
33. @StorageLink('componentContentIndex') componentContentIndex: number = 0;
34. @StorageLink('arrayIndex') arrayIndex: number = 0;
35. @StorageLink('componentOffset') componentOffset: Position = { x: 0, y: 30 };

37. build() {
38. // ...
39. Column({ space: 10 }) {
40. Button('Increment componentContentIndex:' + this.componentContentIndex)
41. .onClick(() => {
42. ++this.componentContentIndex;
43. })
44. Button('Decrement componentContentIndex:' + this.componentContentIndex)
45. .onClick(() => {
46. --this.componentContentIndex;
47. })
48. Button('Add ComponentContent:' + this.contentArray.length)
49. .onClick(() => {
50. let componentContent = new ComponentContent(
51. this.uiContext, wrapBuilder<[Params]>(builderText),
52. new Params(this.message + (this.contentArray.length), this.componentOffset)
53. )
54. this.contentArray.push(componentContent);
55. this.overlayNode.addComponentContent(componentContent, this.componentContentIndex);
56. })
57. Button('Increment arrayIndex:' + this.arrayIndex)
58. .onClick(() => {
59. ++this.arrayIndex;
60. })
61. Button('Decrement arrayIndex:' + this.arrayIndex)
62. .onClick(() => {
63. --this.arrayIndex;
64. })
65. Button('Delete ComponentContent:' + this.arrayIndex)
66. .onClick(() => {
67. if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
68. let componentContent = this.contentArray.splice(this.arrayIndex, 1);
69. this.overlayNode.removeComponentContent(componentContent.pop());
70. } else {
71. hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
72. }
73. })
74. Button('Show ComponentContent:' + this.arrayIndex)
75. .onClick(() => {
76. if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
77. let componentContent = this.contentArray[this.arrayIndex];
78. this.overlayNode.showComponentContent(componentContent);
79. } else {
80. hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
81. }
82. })
83. Button('Hide ComponentContent:' + this.arrayIndex)
84. .onClick(() => {
85. if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
86. let componentContent = this.contentArray[this.arrayIndex];
87. this.overlayNode.hideComponentContent(componentContent);
88. } else {
89. hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
90. }
91. })
92. Button('Show All ComponentContent')
93. .onClick(() => {
94. this.overlayNode.showAllComponentContents();
95. })
96. Button('Hide All ComponentContent')
97. .onClick(() => {
98. this.overlayNode.hideAllComponentContents();
99. })

101. Button('Go')
102. .onClick(() => {
103. this.getUIContext().getRouter().pushUrl({
104. url: 'pages/Second'
105. })
106. })
107. }
108. .width('100%')
109. .height('100%')
110. // ...
111. }
112. }
```

[OverlayManagerComponent.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/OverlayManager/OverlayManagerComponent.ets#L16-L136)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/j_yUJub4Q3qoxRWRHnvZ1A/zh-cn_image_0000002540771218.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035217Z&HW-CC-Expire=86400&HW-CC-Sign=8355A99F1EA2DE47F1636E20C482586D46CE6008C62B415DDC8F98CC133B4EE7)

显示一个始终在屏幕左侧的悬浮球，点击可以弹出alertDialog弹窗。

收起

自动换行

深色代码主题

复制

```
1. import { ComponentContent, OverlayManager } from '@kit.ArkUI';

3. class Params {
4. public context: UIContext;
5. public offset: Position;
6. constructor(context: UIContext, offset: Position) {
7. this.context = context;
8. this.offset = offset;
9. }
10. }
11. @Builder
12. function builderOverlay(params: Params) {
13. Column() {
14. Stack(){
15. }.width(50).height(50).backgroundColor(Color.Yellow).position(params.offset).borderRadius(50)
16. .onClick(() => {
17. params.context.showAlertDialog(
18. {
19. title: 'title',
20. message: 'Text',
21. autoCancel: true,
22. alignment: DialogAlignment.Center,
23. gridCount: 3,
24. confirm: {
25. value: 'Button',
26. action: () => {}
27. },
28. cancel: () => {}
29. }
30. )
31. })
32. }.focusable(false).width('100%').height('100%').hitTestBehavior(HitTestMode.Transparent)
33. }

35. @Entry
36. @Component
37. export struct OverlayManagerAlertDialog {
38. @State message: string = 'ComponentContent';
39. private uiContext: UIContext = this.getUIContext();
40. private overlayNode: OverlayManager = this.uiContext.getOverlayManager();
41. private overlayContent:ComponentContent<Params>[] = [];
42. controller: TextInputController = new TextInputController();

44. aboutToAppear(): void {
45. let uiContext = this.getUIContext();
46. let componentContent = new ComponentContent(
47. this.uiContext, wrapBuilder<[Params]>(builderOverlay),
48. new Params(uiContext, {x:0, y: 100})
49. );
50. this.overlayNode.addComponentContent(componentContent, 0);
51. this.overlayContent.push(componentContent);
52. }

54. aboutToDisappear(): void {
55. let componentContent = this.overlayContent.pop();
56. this.overlayNode.removeComponentContent(componentContent);
57. }

59. build() {
60. // ···
61. Column() {

63. }
64. .width('100%')
65. .height('100%')
66. // ···
67. }
68. }
```

[OverlayManagerAlertDialog.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/OverlayManager/OverlayManagerAlertDialog.ets#L16-L91)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/seEdb--TSlyIqiGrpLZn0Q/zh-cn_image_0000002571291517.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035217Z&HW-CC-Expire=86400&HW-CC-Sign=4B215CC8A2F3833FA13A299131D472D9279DD731D227F22B8DD79A8023A0959B)

从API version 18开始，可以通过调用UIContext中getOverlayManager方法获取OverlayManager对象，并利用该对象在指定层级上新增指定节点（[addComponentContentWithOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#addcomponentcontentwithorder18)），层次高的浮层会覆盖在层级低的浮层之上。

收起

自动换行

深色代码主题

复制

```
1. import { ComponentContent, LevelOrder, OverlayManager } from '@kit.ArkUI';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const TAG: string = '[Sample_dialogproject]';
5. const DOMAIN: number = 0xFF00;

7. class Params {
8. public text: string = '';
9. public offset: Position;

11. constructor(text: string, offset: Position) {
12. this.text = text;
13. this.offset = offset;
14. }
15. }

17. @Builder
18. function builderTopText(params: Params) {
19. Column() {
20. Stack() {
21. Text(params.text)
22. .fontSize(30)
23. .fontWeight(FontWeight.Bold)
24. }
25. .width(300)
26. .height(200)
27. .padding(5)
28. .backgroundColor('#F7F7F7')
29. .alignContent(Alignment.Top)
30. }.offset(params.offset)
31. }

33. @Builder
34. function builderNormalText(params: Params) {
35. Column() {
36. Stack() {
37. Text(params.text)
38. .fontSize(30)
39. .fontWeight(FontWeight.Bold)
40. }
41. .width(300)
42. .height(400)
43. .padding(5)
44. .backgroundColor('#D5D5D5')
45. .alignContent(Alignment.Top)
46. }.offset(params.offset)
47. }

49. @Entry
50. @Component
51. export struct OverlayManagerWithOrder {
52. private ctx: UIContext = this.getUIContext();
53. private overlayManager: OverlayManager = this.ctx.getOverlayManager();
54. @StorageLink('contentArray') contentArray: ComponentContent<Params>[] = [];
55. @StorageLink('componentContentIndex') componentContentIndex: number = 0;
56. @StorageLink('arrayIndex') arrayIndex: number = 0;
57. @StorageLink('componentOffset') componentOffset: Position = { x: 0, y: 80 };

59. build() {
60. // ...
61. Row() {
62. Column({ space: 5 }) {
63. Button('Open Top-Level Dialog Box')
64. .onClick(() => {
65. let componentContent = new ComponentContent(
66. this.ctx, wrapBuilder<[Params]>(builderTopText),
67. new Params('I am a top-level dialog box', this.componentOffset)
68. );
69. this.contentArray.push(componentContent);
70. this.overlayManager.addComponentContentWithOrder(componentContent, LevelOrder.clamp(100000));
71. })
72. Button('Open Normal Dialog Box')
73. .onClick(() => {
74. let componentContent = new ComponentContent(
75. this.ctx, wrapBuilder<[Params]>(builderNormalText),
76. new Params('I am a normal dialog box', this.componentOffset)
77. );
78. this.contentArray.push(componentContent);
79. this.overlayManager.addComponentContentWithOrder(componentContent, LevelOrder.clamp(0));
80. })
81. Button('Remove Dialog Box').onClick(() => {
82. if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
83. let componentContent = this.contentArray.splice(this.arrayIndex, 1);
84. this.overlayManager.removeComponentContent(componentContent.pop());
85. } else {
86. hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
87. }
88. })
89. }.width('100%')
90. }
91. // ...
92. }
93. }
```

[OverlayManagerWithOrder.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/DialogProject/entry/src/main/ets/pages/OverlayManager/OverlayManagerWithOrder.ets#L16-L117)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3f/v3/gojBsDEHQPOxG1tj4ADhOA/zh-cn_image_0000002540611568.gif?HW-CC-KV=V1&HW-CC-Date=20260414T035217Z&HW-CC-Expire=86400&HW-CC-Sign=1B63007285AE4817ED8DB83A19DF988CCE704AC16D518D54463856FFC4419EDE)