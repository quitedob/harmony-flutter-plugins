## 概要

从5.1.0(18)开始，AR Engine支持识别平面语义能力。

对于检测到的平面，开发者可以通过AR Engine识别该平面的语义，语义类型包括墙面、地面、座椅、桌面、天花板、门、窗户、床、平面空间、立方体体积、立方体空间容积和未知类型（平面空间、立方体体积和立方体空间容积仅在高精几何重建模式下支持）。

## 接口说明

获取平面语义信息可以通过[ARPlane](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section3392194311417)平面对象获取，以下接口为平面相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARTrackable.getPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section14241133116264) | 获取追踪目标的位姿信息。 |
| [ARTrackable.getAnchors](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section10878141483010) | 获取绑定到输入可跟踪对象的锚点对象。 |
| [ARPose.getMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section5278038164917) | 将位姿数据转换为一个4x4的矩阵。 |
| [ARPlane.getPolygonXZ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section12949442354) | 获取检测到的平面2D顶点数组。 |
| [ARPlane.getSubsumedBy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1127511467514) | 获取平面的父平面（当平面与另一个平面合并时会生成父平面）。 |
| [ARPlane.isPoseInExtents](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section102761471453) | 检查给定位姿是否在平面的边界矩形内。 |
| [ARPlane.isPoseInPolygon](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1471811920162) | 检查给定位姿是否在平面的边界多边形内。 |

## 开发步骤

AR Engine仅输出识别到的平面数据。为便于用户观察，开发者可使用AGP（Ark Graphics Platform）渲染引擎或者[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)绘制识别的平面。关于AGP的介绍可以查看[ArkGraphics 3D简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkgraphics3d-overview)和[AGP引擎](https://gitcode.com/openharmony/graphic_graphic_3d)。

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)的创建可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession)章节。

识别平面语义之前需要先检测识别环境中的平面，如何检测识别环境中的平面请参考[检测环境中的平面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-get-plane)。

### 导入模块

识别平面语义能力所需要导入的模块如下：

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

定义变量planeLabel接收平面类型标签信息。

收起

自动换行

深色代码主题

复制

```
1. let planeLabel: arEngine.ARSemanticPlaneLabel;
```

### 显示平面语义信息

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

更改semanticMode为[ARSemanticMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section19325205718138).PLANE，启用平面语义识别能力。

在设备界面上显示识别到平面的信息，使用重复调用函数方法在设备界面上实时更新识别到的平面语义信息。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARTargetBuilder(): void {
3. ARTarget();
4. }

6. @Component
7. struct ARTarget {
8. @State arContext?: arViewController.ARViewContext = undefined;
9. // 平面类型
10. @State targetPlaneLabel: arEngine.ARSemanticPlaneLabel = planeLabel;
11. private intervalId: number = -1;
12. // 重复调用函数时间间隔为33ms，即设定为30fps
13. private delayInterval: number = 33;

15. build(): void {
16. NavDestination() {
17. RelativeContainer() {
18. if (this.arContext) {
19. ARView({ context: this.arContext })
20. .height('100%')
21. .width('100%')
22. .alignRules({
23. center: { anchor: '__container__', align: VerticalAlign.Center },
24. middle: { anchor: '__container__', align: HorizontalAlign.Center }
25. })

27. // 在屏幕底部显示识别的平面信息
28. Column() {
29. Text(`Label: ${convertSemanticLabel(this.targetPlaneLabel)}`)
30. .infoStyles()
31. }
32. .alignItems(HorizontalAlign.Center)
33. .margin({ bottom: 10 })
34. .alignRules({
35. bottom: { anchor: "__container__", align: VerticalAlign.Bottom },
36. middle: { anchor: "__container__", align: HorizontalAlign.Center }
37. })
38. }
39. }
40. }
41. .onAppear(() => {
42. this.initARView();
43. // 设定在30fps下更新识别平面语义信息
44. this.intervalId = setInterval(() => {
45. this.targetPlaneLabel = planeLabel;
46. }, this.delayInterval);
47. })
48. .onWillDisappear(() => {
49. // 退出setInterval函数
50. clearInterval(this.intervalId);
51. this.stopARView();
52. })
53. .onShown(() => {
54. this.resumeARView();
55. })
56. .onHidden(() => {
57. this.pauseARView();
58. })
59. .hideTitleBar(true)
60. .hideBackButton(true)
61. .hideToolBar(true)
62. }

64. private initARView(): void {
65. Scene.load().then((scene: Scene) => {
66. let viewContext: arViewController.ARViewContext = new arViewController.ARViewContext();
67. viewContext.scene = scene;
68. viewContext.callback = new ARViewCallbackImpl();
69. viewContext.config = {
70. type: arEngine.ARType.WORLD,
71. planeFindingMode: arEngine.ARPlaneFindingMode.HORIZONTAL_AND_VERTICAL,
72. powerMode: arEngine.ARPowerMode.NORMAL,
73. semanticMode: arEngine.ARSemanticMode.PLANE, // 识别平面语义
74. poseMode: arEngine.ARPoseMode.GRAVITY,
75. depthMode: arEngine.ARDepthMode.AUTOMATIC,
76. meshMode: arEngine.ARMeshMode.DISABLED,
77. focusMode: arEngine.ARFocusMode.AUTO
78. }
79. viewContext.init().then(() => {
80. this.arContext = viewContext;
81. console.info('Succeeded in initializing ARView.');
82. }).catch((err: BusinessError) => {
83. console.error(`Failed to init ARView. Code is ${err.code}, message is ${err.message}.`);
84. })
85. })
86. }

88. private stopARView(): void {
89. // ...
90. }
91. private resumeARView(): void {
92. // ...
93. }
94. private pauseARView(): void {
95. // ...
96. }
97. }

99. // 界面显示文本样式
100. @Extend(Text)
101. function infoStyles() {
102. .fontColor(Color.Yellow)
103. .fontSize(24)
104. .textShadow({
105. radius: 10,
106. color: Color.Black,
107. offsetX: 0,
108. offsetY: 0
109. })
110. .textAlign(TextAlign.Start)
111. }
```

### 获取语义信息

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法进行帧数据更新，在设备界面上显示识别到的平面类型。

增加获取语义信息的方法plane.label，获取每一帧识别到的平面语义信息。

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

15. let arSession: arEngine.ARSession = ctx.session;

17. try {
18. let frame: arEngine.ARFrame = arSession.getFrame();
19. let camera: arEngine.ARCamera = frame.getCamera();
20. let trackable: arEngine.ARTrackable[] = [];

22. if (camera.state === arEngine.ARTrackingState.TRACKING) {
23. trackable = arSession.getAllTrackables(arEngine.ARTrackableType.PLANE);
24. console.info(`Succeeded in getting tracking plane, length is: ${trackable.length}`);
25. }

27. for (let i = 0; i < trackable.length; ++i) {
28. let plane: arEngine.ARPlane = trackable[i] as arEngine.ARPlane;

30. // 更新识别的平面语义信息
31. planeLabel = plane.label;
32. console.info(`Succeeded in updating frame data for loop: ${plane.label}`);
33. }

35. } catch (error) {
36. const err: BusinessError = error as BusinessError;
37. console.error(`Failed to update data. Code is ${err.code}, message is ${err.message}.`);
38. }
39. }
40. }
```

### 识别平面语义的自定义方法

自定义方法获取顶点数据getVertices、创建索引generateMeshIndex、创建mesh数据generateMeshInput，可参考[检测平面的自定义方法](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-get-plane#section142331216260)。

arrayBufferFloat32ToNumber可以参考[数据类型转换说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arraybuffer-info)。

平面语义标签转换convertSemanticLabel可参考如下。

收起

自动换行

深色代码主题

复制

```
1. function convertSemanticLabel(obj: number): string {
2. let res: string = '';
3. if (obj === 0) {
4. res = 'UNKNOWN';
5. } else if (obj === 1) {
6. res = 'WALL';
7. } else if (obj === 2) {
8. res = 'FLOOR';
9. } else if (obj === 3) {
10. res = 'SEAT';
11. } else if (obj === 4) {
12. res = 'TABLE';
13. } else if (obj === 5) {
14. res = 'CEILING';
15. } else if (obj === 6) {
16. res = 'DOOR';
17. } else if (obj === 7) {
18. res = 'WINDOW';
19. } else if (obj === 8) {
20. res = 'BED';
21. } else if (obj === 9) {
22. res = 'PLANE SPACE';
23. } else if (obj === 10) {
24. res = 'CUBE VOLUME';
25. } else if (obj === 11) {
26. res = 'CUBE SPACE';
27. }
28. return res;
29. }
```