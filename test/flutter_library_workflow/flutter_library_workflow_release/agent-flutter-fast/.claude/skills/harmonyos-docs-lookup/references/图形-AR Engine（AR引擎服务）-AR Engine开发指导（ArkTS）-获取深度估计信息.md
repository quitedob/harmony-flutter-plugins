## 概要

从5.1.0(18)开始，AR Engine支持获取深度估计信息能力。

AR Engine提供的深度估计功能通过算法输出深度估计数据（物体表面离相机的距离）和深度置信度信息，为开发者提供环境三维感知能力。该技术可应用于测量、体积估算、场景重建等场景。基于空间物体的深度信息，开发者可完成一些空间计算任务，比如计算物体体积等。

开发者如果需要使用获取深度图功能请使用NAPI进行开发，参见[获取深度图](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-get-depth)。ArkTS API将于后期版本上线深度图能力。

**图1** 深度估计信息示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/wMK-FjCcRrOV_elQayeDLQ/zh-cn_image_0000002532146185.png?HW-CC-KV=V1&HW-CC-Date=20260414T053619Z&HW-CC-Expire=86400&HW-CC-Sign=E49224D4D2A38A698AF7889C4C266924EF709868C2053FF47AC947E211FAF6CD)

注意

本功能仅提供能力，接入该功能不构成对产品的质量保证或任何承诺，详见[AR Engine深度估计功能技术局限性及免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-appendix#section1854314717219)。

本章节涉及的AR Engine能力如下：

* 运动跟踪能力
* 环境跟踪能力（平面检测）

## 接口说明

获取深度估计信息可以通过[ARFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section83421523123819)帧对象获取，以下接口为深度估计相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARSession.getFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section114051108916) | 获取AR Engine处理后的一帧数据。 |
| [ARFrame.acquireDepthImage16Bits](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section8978424152512) | 获取当前帧对应的深度图像对象。 |
| [ARFrame.acquireDepthConfidenceImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section58412318287) | 获取当前帧的深度置信度图像。 |

## 开发步骤

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)的创建可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession)章节。

### 导入模块

获取深度估计信息能力所需的模块导入方法如下：

收起

自动换行

深色代码主题

复制

```
1. import { arEngine, ARView, arViewController } from '@kit.AREngine';
2. import { Node, Scene } from '@kit.ArkGraphics3D';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

### 定义变量

定义变量centerDistance深度估计距离和centerConfidence深度置信度。

收起

自动换行

深色代码主题

复制

```
1. let centerDistance: number;
2. let centerConfidence: number;
```

### 显示深度估计信息

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

在设备界面上显示深度估计信息及深度置信度信息，使用重复调用函数方法在设备界面上实时更新深度估计信息及置信度信息。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARDepthBuilder(): void {
3. ARDepth();
4. }

6. @Component
7. struct ARDepth {
8. private delayInterval: number = 33;
9. private intervalId: number = -1;
10. @State arContext?: arViewController.ARViewContext = undefined;
11. @State depthConfidence: number = 0;
12. @State depthDistance: string = '0';

14. build(): void {
15. NavDestination() {
16. RelativeContainer() {
17. if (this.arContext) {
18. ARView({ context: this.arContext })
19. .height('100%')
20. .width('100%')
21. .alignRules({
22. center: { anchor: "__container__", align: VerticalAlign.Center },
23. middle: { anchor: "__container__", align: HorizontalAlign.Center }
24. })

26. // 在屏幕上显示中心点、深度估计值及置信度
27. Text('●')
28. .fontSize(8)
29. .fontColor(Color.Red)
30. .alignRules({
31. center: { anchor: '__container__', align: VerticalAlign.Center },
32. middle: { anchor: '__container__', align: HorizontalAlign.Center }
33. })

35. Column() {
36. Text(`${this.depthDistance} | ${this.depthConfidence}`)
37. .fontColor(Color.Yellow)
38. .fontSize(24)
39. .textShadow({
40. radius: 10,
41. color: Color.Black,
42. offsetX: 0,
43. offsetY: 0
44. })
45. }
46. .alignItems(HorizontalAlign.Center)
47. .margin({ bottom: 10 })
48. .alignRules({
49. bottom: { anchor: "__container__", align: VerticalAlign.Bottom },
50. middle: { anchor: "__container__", align: HorizontalAlign.Center }
51. })
52. }
53. }
54. }
55. .onAppear(() => {
56. this.initARView();
57. this.renderDepthMsg();
58. })
59. .onWillAppear(() => {
60. this.stopARView();
61. })
62. .onShown(() => {
63. this.resumeARView();
64. })
65. .onHidden(() => {
66. this.pauseARView();
67. })
68. .hideTitleBar(true)
69. .hideBackButton(true)
70. .hideToolBar(true)
71. }

73. private initARView(): void {
74. Scene.load().then((scene: Scene) => {
75. let viewContext: arViewController.ARViewContext = new arViewController.ARViewContext();
76. viewContext.scene = scene;
77. viewContext.callback = new ARViewCallbackImpl();
78. viewContext.config = {
79. type: arEngine.ARType.WORLD,
80. planeFindingMode: arEngine.ARPlaneFindingMode.HORIZONTAL_AND_VERTICAL,
81. powerMode: arEngine.ARPowerMode.NORMAL,
82. semanticMode: arEngine.ARSemanticMode.NONE,
83. poseMode: arEngine.ARPoseMode.GRAVITY,
84. depthMode: arEngine.ARDepthMode.AUTOMATIC,
85. meshMode: arEngine.ARMeshMode.DISABLED,
86. focusMode: arEngine.ARFocusMode.AUTO
87. }
88. viewContext.init().then(() => {
89. this.arContext = viewContext;
90. console.info('Succeeded in initializing ARView.');
91. }).catch((err: BusinessError) => {
92. console.error(`Failed to init ARView. Code is ${err.code}, message is ${err.message}`);
93. })
94. })
95. }

97. private renderDepthMsg(): void {
98. this.intervalId = setInterval(() => {
99. if (centerDistance === undefined || centerConfidence === undefined) {
100. return;
101. }
102. this.depthDistance = centerDistance.toFixed(4);
103. this.depthConfidence = centerConfidence;
104. }, this.delayInterval)
105. }

107. private stopARView(): void {
108. if (!this.arContext) {
109. return;
110. }
111. try {
112. clearInterval(this.intervalId);
113. this.arContext.destroy();
114. centerDistance = 0;
115. centerConfidence = 0;
116. } catch (error) {
117. const err: BusinessError = error as BusinessError;
118. console.error(`Failed to stop context. Code is ${err.code}, message is ${err.message}`);
119. }
120. }

122. private resumeARView(): void {
123. // ...
124. }
125. private pauseARView(): void {
126. // ...
127. }
128. }
```

### 获取深度估计信息

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法获取到AR会话对象后进行深度估计，获取深度信息、置信度信息。

收起

自动换行

深色代码主题

复制

```
1. class ARViewCallbackImpl extends arViewController.ARViewCallback {
2. onAnchorAdd(ctx: arViewController.ARViewContext, node: Node, anchor: arEngine.ARAnchor): void {
3. // ...
4. }

6. onAnchorUpdate(ctx: arViewController.ARViewContext, node: Node, anchor: arEngine.ARAnchor): void {
7. // ...
8. }

10. onFrameUpdate(ctx: arViewController.ARViewContext, sysBootTs: number): void {
11. if (!ctx.session) {
12. return;
13. }

15. let session: arEngine.ARSession | undefined = ctx.session;

17. try {
18. let frame: arEngine.ARFrame = session.getFrame();
19. let depthImage: arEngine.ARImage = frame.acquireDepthImage16Bits();
20. let confidenceImage: arEngine.ARImage = frame.acquireDepthConfidenceImage();
21. let depthPlane: number[] = arrayBufferInt32ToNumber(depthImage.planes[0].buffer);
22. let confidencePlane: number[] = arrayBufferInt32ToNumber(confidenceImage.planes[0].buffer);
23. const index: number = depthImage.height * depthImage.width / 2 + depthImage.width / 2;

25. centerDistance = depthPlane[index] / 1000;
26. centerConfidence = confidencePlane[index];
27. } catch (error) {
28. const err: BusinessError = error as BusinessError;
29. console.error(`Failed to acquire depth information. Code is ${err.code}, message is ${err.message}`);
30. }
31. }
32. }
```

### 获取深度估计信息的自定义方法

自定义数据转换方法arrayBufferInt32ToNumber可参考[数据类型转换说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arraybuffer-info)。