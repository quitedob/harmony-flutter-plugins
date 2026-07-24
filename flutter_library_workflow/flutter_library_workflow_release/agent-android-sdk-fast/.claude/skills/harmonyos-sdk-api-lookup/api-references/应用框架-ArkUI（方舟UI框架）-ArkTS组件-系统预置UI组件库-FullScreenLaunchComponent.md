全屏启动元服务组件，当被拉起方授权使用方可以嵌入式运行元服务时，使用方全屏嵌入式运行元服务；未授权时，使用方跳出式拉起元服务。

说明

该组件从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

该组件不支持在Wearable设备上使用。

如果需要在该组件中实现可嵌入式运行的元服务，必须继承自[EmbeddableUIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-embeddableuiability)。否则，系统无法保证元服务功能正常。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { FullScreenLaunchComponent } from '@kit.ArkUI';
```

## 子组件

PhonePC/2in1TabletTVWearable

无

## 属性

PhonePC/2in1TabletTVWearable

不支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)。

## 事件

PhonePC/2in1TabletTVWearable

不支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## FullScreenLaunchComponent

PhonePC/2in1TabletTVWearable

FullScreenLaunchComponent({ content: Callback<void>, appId: string, options?: AtomicServiceOptions, onError?: ErrorCallback, onTerminated?: Callback<TerminationInfo> })

**装饰器类型：**[@Component](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#component)

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| content | Callback<void> | 是 | [@BuilderParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builderparam) | 可以使用组件组合来自定义拉起元服务前的占位图标，实现类似大桌面应用图标的效果。点击占位组件后，将拉起元服务。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| appId | string | 是 | - | 需要拉起的元服务appId，appId是元服务的唯一标识。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。可在应用市场元服务一栏找到需要使用的元服务，在元服务隐私声明内找到对应元服务开发者的联系方式，联系对应元服务开发者获取。 |
| options | [AtomicServiceOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-atomicserviceoptions) | 否 | - | 拉起元服务参数。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onError18+ | [ErrorCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-base#errorcallback) | 否 | - | 被拉起的嵌入式运行元服务在运行过程中发生异常时触发本回调。可通过回调参数中的code、name和message获取错误信息并做处理。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| onTerminated18+ | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-base#callback)<[TerminationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-embedded-component#terminationinfo)> | 否 | - | 被拉起的嵌入式运行元服务通过点击元服务退出按钮、手势侧滑、调用[terminateSelfWithResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#terminateselfwithresult)或者[terminateSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#terminateself)正常退出时，触发本回调函数。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| onReceive20+ | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-base#callback)<Record<string, Object>> | 否 | - | 被拉起的嵌入式运行元服务通过[Window](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-window-stage)调用API时，触发本回调。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

说明

* 若元服务通过调用[terminateSelfWithResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#terminateselfwithresult)退出，其携带的信息会传给回调函数的入参；
* 若元服务通过调用[terminateSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#terminateself)退出，上述回调函数的入参中，"code"取默认值"0"，"want"为"undefined"；
* 从API版本26.0.0开始，元服务通过手势侧滑退出触发onTerminated回调。

## 示例

PhonePC/2in1TabletTVWearable

本示例展示组件使用方法和扩展的元服务。实际运行时请使用开发者自己的元服务appId。

FullScreenLaunchComponent组件需要由使用方调用。在提供方完成本地的安装后，即可实现在使用方应用或者元服务中全屏嵌入式拉起提供方的效果。

**使用方**



```
1. // 使用方入口界面Index.ets内容如下:
2. import { FullScreenLaunchComponent } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct Index {
7. @State appId: string = '6917573653426122083'; // 元服务appId

9. build() {
10. Row() {
11. Column() {
12. FullScreenLaunchComponent({
13. content: ColumnChild,
14. appId: this.appId,
15. options: {},
16. onTerminated: (info) => {
17. console.info(`onTerminated code: ${info.code.toString()}`);
18. },
19. onError: (err) => {
20. console.error(`onError code: ${err.code}, message: ${err.message}`);
21. },
22. onReceive: (data) => {
23. console.info(`onReceive, data: ${JSON.stringify(data)}`);
24. }
25. }).width("80vp").height("80vp")
26. }
27. .width('100%')
28. }
29. .height('100%')
30. }
31. }

33. @Builder
34. function ColumnChild() {
35. Column() {
36. Image($r('app.media.startIcon'))
37. Text('test')
38. }
39. }
```

**组件提供方**

元服务提供方需要修改两个文件：

* 提供方入口文件：/src/main/ets/entryability/EntryAbility.ets。



```
1. import { AbilityConstant, Want, EmbeddableUIAbility } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';

5. const DOMAIN = 0x0000;

7. export default class EntryAbility extends EmbeddableUIAbility {
8. storage = new LocalStorage(); // 初始化示例，用于存储窗口和窗口阶段的信息
9. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
10. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
11. }

13. onDestroy(): void {
14. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
15. }

17. onWindowStageCreate(windowStage: window.WindowStage): void {
18. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
19. let mainWindow = windowStage.getMainWindowSync()
20. this.storage.setOrCreate("window", mainWindow)
21. this.storage.setOrCreate("windowStage", windowStage)
22. windowStage.loadContent('pages/Index', this.storage);
23. }

25. onWindowStageDestroy(): void {
26. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
27. }

29. onForeground(): void {
30. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onForeground');
31. }

33. onBackground(): void {
34. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onBackground');
35. }
36. }
```

* 提供方扩展Ability入口页面文件：/src/main/ets/pages/Index.ets。



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. import { window } from '@kit.ArkUI';

4. const DOMAIN = 0x0000;

6. @Entry
7. @Component
8. struct Index {
9. // 用于存储本地数据
10. private storage: LocalStorage | undefined = this.getUIContext().getSharedLocalStorage();

12. build() {
13. Row() {
14. Column() {
15. GridRow({ columns: 2 }) {
16. GridCol() {
17. Button("setWindowSystemBar")
18. .onClick(() => {
19. this.testSetSystemBarEnable()
20. }).width(120)
21. }.height(60)

23. GridCol() {
24. Button("setGestureBack")
25. .onClick(() => {
26. this.testSetGestureBackEnable()
27. }).width(120)
28. }.height(60)

30. GridCol() {
31. Button("setImmersive")
32. .onClick(() => {
33. this.testSetImmersiveEnable()
34. }).width(120)
35. }.height(60)

37. GridCol() {
38. Button("setSpecificSystemBarEnabled")
39. .onClick(() => {
40. this.testSetSpecificSystemBarEnabled()
41. }).width(120)
42. }.height(60)
43. }
44. }
45. .width('100%')
46. }
47. .height('100%')
48. }

50. // 设置窗口系统栏的显示状态
51. testSetSystemBarEnable() {
52. let window: window.Window | undefined = this.storage?.get("window");
53. let p = window?.setWindowSystemBarEnable(["status"])
54. p?.then(() => {
55. console.info('setWindowSystemBarEnable success');
56. }).catch((err: BusinessError) => {
57. console.error(`setWindowSystemBarEnable failed, error = ${JSON.stringify(err)}`);
58. })
59. }

61. // 启用或禁用手势返回功能
62. testSetGestureBackEnable() {
63. let window: window.Window | undefined = this.storage?.get("window");
64. let p = window?.setGestureBackEnabled(true)
65. p?.then(() => {
66. console.info('setGestureBackEnabled success');
67. }).catch((err: BusinessError) => {
68. console.error(`setGestureBackEnabled failed, error = ${JSON.stringify(err)}`);
69. })
70. }

72. // 启用沉浸式模式
73. testSetImmersiveEnable() {
74. let window: window.Window | undefined = this.storage?.get("window");
75. try {
76. window?.setImmersiveModeEnabledState(true)
77. } catch (err) {
78. console.error(`setImmersiveModeEnabledState failed, error = ${JSON.stringify(err)}`);
79. }
80. }

82. // 设置特定的系统栏的显示状态
83. testSetSpecificSystemBarEnabled() {
84. let window: window.Window | undefined = this.storage?.get("window");
85. let p = window?.setSpecificSystemBarEnabled('navigationIndicator', false, false)
86. p?.then(() => {
87. console.info('setSpecificSystemBarEnabled success');
88. }).catch((err: BusinessError) => {
89. console.error(`setSpecificSystemBarEnabled failed, error = ${JSON.stringify(err)}`);
90. })
91. }
92. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/29/v3/0bCXJdRsTDC7qfnF_QFMTQ/zh-cn_image_0000002568919420.png?HW-CC-KV=V1&HW-CC-Date=20260511T035849Z&HW-CC-Expire=86400&HW-CC-Sign=6A817FDD9504AA512255A11B8D833800D050DB243A4B57C10A65AE0EC2436280)