## 概要

从6.0.0(20)开始，AR Engine支持高精几何重建能力。

本章节通过AR Engine高精几何重建能力来识别空间中的立方体物体或者嵌入式立方体空间，计算出被识别物体或空间的长、宽、高以及体积。可以用于测量立方体体积以及嵌入式空间的大小。

**图1** 稠密点云绘制示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b/v3/wIWZOHidR5CU6sIH1xnZ3Q/zh-cn_image_0000002500306262.png?HW-CC-KV=V1&HW-CC-Date=20260414T053718Z&HW-CC-Expire=86400&HW-CC-Sign=2CFC50065C3F065F0F1506803C59EAC94E22B4AB28E72FBB444F7B0F0D5972E0)

**图2** 体积测量示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d4/v3/stzP0I7WSJ-MArnMbjhuyA/zh-cn_image_0000002532306153.png?HW-CC-KV=V1&HW-CC-Date=20260414T053718Z&HW-CC-Expire=86400&HW-CC-Sign=9F69C5A29570C30A5DE57B6D3669DC8A33D84436D6F2FD687A9E4C17DC6155C3)

**图3** 空间识别示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/UTdOSX_UQS2M83yxzH16Yw/zh-cn_image_0000002532146181.png?HW-CC-KV=V1&HW-CC-Date=20260414T053718Z&HW-CC-Expire=86400&HW-CC-Sign=92B1B3306EB021B249131A2E03350FCAEF49A786C365B41D937500157DC2FC5A)

注意

本功能仅提供能力，接入该功能不构成对产品的质量保证或任何承诺，详见[AR Engine高精几何重建功能技术局限性及免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-appendix#section68356131976)。

本章节涉及的AR Engine 能力如下：

* 运动跟踪能力
* 环境跟踪能力（点云识别）
* 高精几何重建能力

## 接口说明

以下接口为AREngine高精几何重建相关接口，详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine)。

展开

| 接口名 | 描述 |
| --- | --- |
| [HMS\_AREngine\_ARFrame\_AcquireSemanticDenseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section17136162216547) | 获取当前帧的高精几何重建对象数据。 |
| [HMS\_AREngine\_ARConfig\_GetSemanticDenseMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section1099254315514) | 获取已设置的高精几何重建模式。 |
| [HMS\_AREngine\_ARConfig\_SetSemanticDenseMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section1569718841012) | 设置当前所需的高精几何重建模式。 |
| [HMS\_AREngine\_ARSemanticDense\_AcquireCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section7554459949) | 获取识别到的高精几何重建对象数据中的立方体数据。 |
| [HMS\_AREngine\_ARSemanticDense\_AcquireCubeDataSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section383013458212) | 获取识别到的高精几何重建对象数据中的立方体数量。 |
| [HMS\_AREngine\_ARSemanticDense\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section390280482) | 释放高精几何重建对象。 |

## 开发步骤

### 声明Native接口

开发者可参考AR物体摆放章节的[声明Native接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section1557014318265)。

### 创建UI界面

首先创建一个UI界面ARSemanticDense.ets，用于选择高精几何重建相关模式。

收起

自动换行

深色代码主题

复制

```
1. // 此代码可参考示例代码：ARSample/entry/src/main/ets/pages/ARSemanticDense.ets。
2. import { display} from '@kit.ArkUI';

4. @Builder
5. export function ARSemanticDenseBuilder() {
6. ARSemanticDense();
7. }

9. @Component
10. struct ARSemanticDense {
11. pageInfo: NavPathStack = new NavPathStack();
12. @State context: Context = this.getUIContext().getHostContext() as Context;
13. @State showPage: boolean = true;
14. @State rotation: number = display.getDefaultDisplaySync().rotation;
15. @State volume: string = '';

17. build() {
18. NavDestination() {
19. Column() {
20. Button('开启稠密点云', { type: ButtonType.Normal, stateEffect: true })
21. .borderRadius(8)
22. .width('50%')
23. .height('5%')
24. .onClick(() => {
25. this.pageInfo.pushDestinationByName('ARSemanticDenseRender', 0).catch((error: BusinessError) => {
26. console.error(`[pushDestinationByName]failed. Code: ${error.code}.`);
27. });
28. })

30. Button('打开体积测量', { type: ButtonType.Normal, stateEffect: true })
31. .borderRadius(8)
32. .width('50%')
33. .height('5%')
34. .onClick(() => {
35. this.pageInfo.pushDestinationByName('ARSemanticDenseRender', 1).catch((error: BusinessError) => {
36. console.error(`[pushDestinationByName]failed. Code: ${error.code}.`);
37. });
38. })

40. Button('打开空间测量', { type: ButtonType.Normal, stateEffect: true })
41. .borderRadius(8)
42. .width('50%')
43. .height('5%')
44. .onClick(() => {
45. this.pageInfo.pushDestinationByName('ARSemanticDenseRender', 2).catch((error: BusinessError) => {
46. console.error(`[pushDestinationByName]failed. Code: ${error.code}.`);
47. });
48. })
49. }
50. .justifyContent(FlexAlign.SpaceEvenly)
51. .width('100%')
52. .height('100%')
53. }
54. .onReady((context: NavDestinationContext) => {
55. this.pageInfo = context.pathStack;
56. })
57. .hideTitleBar(true)
58. .hideBackButton(true)
59. .hideToolBar(true)
60. }
61. }
```

最后创建一个ARSemanticDenseRender.ets，使用[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件用于加载相机预览画面，并定时触发每一帧绘制。

收起

自动换行

深色代码主题

复制

```
1. // 此代码可参考示例代码：ARSample/entry/src/main/ets/pages/ARSemanticDenseRender.ets。
2. import { display } from '@kit.ArkUI';
3. import { resourceManager } from '@kit.LocalizationKit';
4. import arEngineDemo from 'libentry.so';

6. @Builder
7. export function ARSemanticDenseRenderBuilder() {
8. ARSemanticDenseRender();
9. }

11. @Component
12. struct ARSemanticDenseRender {
13. pageInfo: NavPathStack = new NavPathStack();
14. @State context: Context = this.getUIContext().getHostContext() as Context;
15. private xComponentId: string = 'ARSemanticDense';
16. private resMgr: resourceManager.ResourceManager = this.context.resourceManager;
17. private interval: number = -1;
18. private inputInterval: number = -1;
19. private getCubeInfoInterval: number = -1;
20. private isUpdate: boolean = false;
21. private semanticDenseMode: number = 0;
22. @State showPage: boolean = true;
23. @State rotation: number = display.getDefaultDisplaySync().rotation;
24. @State volume: string = '';

26. build(): void {
27. NavDestination() {
28. RelativeContainer() {

30. XComponent({ id: this.xComponentId, type: XComponentType.SURFACE, libraryname: 'entry' })
31. .opacity(0.2)
32. .width('100%')
33. .height('100%')
34. .zIndex(0.1)
35. .visibility(this.showPage ? Visibility.Visible : Visibility.None)
36. .alignRules({
37. center: { anchor: '__container__', align: VerticalAlign.Center },
38. middle: { anchor: '__container__', align: HorizontalAlign.Center }
39. })
40. .onLoad(() => {
41. this.interval = setInterval(() => {
42. if (this.isUpdate) {
43. arEngineDemo.update(this.xComponentId);
44. if (this.semanticDenseMode != 0) {
45. this.volume = arEngineDemo.getVolume(this.xComponentId);
46. }
47. }
48. }, 33) // 将帧速率设置为30fps（每33ms刷新一次帧）
49. })
50. .onDestroy(() => {
51. if (this.interval !== -1) {
52. clearInterval(this.interval);
53. this.interval = -1;
54. }

56. if (this.inputInterval !== -1) {
57. clearInterval(this.inputInterval);
58. this.inputInterval = -1;
59. }

61. if (this.getCubeInfoInterval !== -1) {
62. clearInterval(this.getCubeInfoInterval);
63. this.getCubeInfoInterval = -1;
64. }
65. })

67. Text(this.volume)
68. .fontColor(Color.Red)
69. .fontSize(14)
70. .textAlign(TextAlign.Center)
71. .alignRules({
72. bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
73. middle: { anchor: '__container__', align: HorizontalAlign.Center }
74. })
75. }
76. }
77. .onAppear(() => {
78. arEngineDemo.init(this.resMgr);
79. let config: Int32Array = new Int32Array([1,this.rotation, 2, this.semanticDenseMode]);
80. arEngineDemo.start(this.xComponentId, config);
81. })
82. .onWillDisappear(async () => {
83. arEngineDemo.stop(this.xComponentId);
84. })
85. .onShown(() => {
86. this.isUpdate = true;
87. arEngineDemo.show(this.xComponentId);
88. })
89. .onHidden(() => {
90. this.isUpdate = false;
91. arEngineDemo.hide(this.xComponentId);
92. })
93. .onReady((context: NavDestinationContext) => {
94. this.pageInfo = context.pathStack;
95. this.semanticDenseMode = context.pathInfo.param as number;
96. })
97. .hideTitleBar(true)
98. .hideBackButton(true)
99. .hideToolBar(true)
100. }
101. }
```

### 引入AR Engine

开发者可参考AR物体摆放章节的[引入AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section183721115521)。

### 创建AR会话并配置高精几何重建相关模式

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARSession *arSession = nullptr;
2. // 创建AR会话。
3. HMS_AREngine_ARSession_Create(nullptr, nullptr, &arSession);
4. AREngine_ARConfig *arConfig = nullptr;
5. // 创建AR会话配置器。
6. HMS_AREngine_ARConfig_Create(arSession, &arConfig);
7. // 配置高精几何重建模式中的体积识别模式
8. HMS_AREngine_ARConfig_SetSemanticDenseMode(arSession, arConfig, ARENGINE_SEMANTIC_DENSE_MODE_CUBE_VOLUME);
9. // 配置器设置给AR会话。
10. HMS_AREngine_ARSession_Configure(arSession, arConfig);
```

### 获取当前环境中的高精几何重建信息

创建一个帧对象，调用[HMS\_AREngine\_ARFrame\_AcquireSemanticDenseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section17136162216547)函数，从当前帧中获取环境中的高精几何重建信息，其中包含了环境中的稠密点云信息和立方体信息。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARFrame *arFrame = nullptr;
2. // 创建AR单帧对象
3. HMS_AREngine_ARFrame_Create(arSession, &arFrame);
4. AREngine_ARSemanticDenseData *arSemanticDense = nullptr;
5. // 获取当前帧的稠密点云信息
6. HMS_AREngine_ARFrame_AcquireSemanticDenseData(arSession, arFrame, &arSemanticDense);
```

### 获取高精几何重建信息中的立方体数据

1. 调用[HMS\_AREngine\_ARSemanticDense\_AcquireCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section7554459949)函数，获取当前环境中的立方体数据，立方体的数据结构详情参考[AREngine\_ARSemanticDenseCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata)。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARSemanticDenseCubeData *semanticDenseCubeData = nullptr;
2. HMS_AREngine_ARSemanticDense_AcquireCubeData(arSession, arSemanticDense, &semanticDenseCubeData);
```

2. 调用[HMS\_AREngine\_ARSemanticDense\_AcquireCubeDataSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section383013458212)函数，获取当前环境中的立方体数量，如果立方体数量大于0，即可从中获取单个立方体的数据进行绘制和体积计算。

收起

自动换行

深色代码主题

复制

```
1. int64_t cubeDataSize = 0;
2. HMS_AREngine_ARSemanticDense_AcquireCubeDataSize(arSession, arSemanticDense, &cubeDataSize);
```

### 绘制相关几何信息

1. 通过获取到的[AREngine\_ARSemanticDenseCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-struct-arsemanticdensecubedata)对象来绘制立方体。

收起

自动换行

深色代码主题

复制

```
1. // 判断获取的立方体数据及数量。
2. if (semanticDenseCubeData != nullptr && cubeDataSize > 0) {
3. // 绘制立方体。
4. mCubeRenderer.Draw(projectionMat, viewMat, arSession, semanticDenseCubeData);
5. }
```