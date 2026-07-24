## 概要

从5.1.0(18)开始，AR Engine支持获取网格扫描信息能力。

本章节介绍如何获取目标物体的网格（mesh）扫描数据信息，通过学习本章节，可以检测当前环境中的自由曲面，并在应用中处理这些曲面信息。

**图1** 环境网格扫描示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/-sSMdhPiTfiG7INquXy4Ug/zh-cn_image_0000002532306163.png?HW-CC-KV=V1&HW-CC-Date=20260414T053623Z&HW-CC-Expire=86400&HW-CC-Sign=BA3A2F221C8124F8C305496BFE5B26C1D4BAF0CFE262033521C2F2905DC8CF7B)

本章节涉及的AR Engine能力如下：

* 运动跟踪能力
* 环境跟踪能力（平面检测）
* 命中检测能力

## 接口说明

网格扫描主要依赖[ARSceneMesh](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section81184417712)，以下接口为AR网格扫描相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARSceneMesh.getVertices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section15211205153115) | 获取场景网格中的顶点坐标数据。 |
| [ARSceneMesh.getVertexNormals](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section4793111183211) | 获取场景网格中的顶点法线坐标数据。 |
| [ARSceneMesh.getTriangleIndices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section19221187183218) | 获取场景网格中的三角形索引数据。 |
| [ARSceneMesh.release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section625851110329) | 释放环境网格数据对象。 |
| [ARFrame.hitTest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section20353182861218) | 根据相机投射光线，获取预览区域中的像素坐标（pixelX和pixelY）来确定射线方向，然后检测这个射线在平面或点云中是否有交点。 |
| [ARHitResult.getHitPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1864219177109) | 获取交点位姿。 |
| [ARHitResult.getTrackable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section727122311104) | 获取被命中的可追踪对象。 |
| [ARHitResult.createAnchor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section12541329171017) | 在交点（intersection）创建一个锚点。 |
| [ARHitResult.release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1690193413100) | 释放命中检测结果对象占用的内存。 |
| [ARPose.getMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section5278038164917) | 将位姿数据转换为一个4x4的矩阵。 |
| [ARPose.release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section22831038104913) | 释放位姿对象占用的内存。 |

## 开发步骤

本章节给出了关键开发步骤，完整代码可以参考[示例代码](https://gitcode.com/HarmonyOS_Samples/arengine_samplecode_clientdemo_arkts)。

AR Engine仅输出识别到的平面数据。为便于用户观察，开发者可使用AGP（Ark Graphics Platform）渲染引擎或者[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)绘制识别的平面。关于AGP的介绍可以查看[ArkGraphics 3D简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkgraphics3d-overview)和[AGP引擎](https://gitcode.com/openharmony/graphic_graphic_3d)。

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)的创建可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession)章节。

### 导入模块

网格扫描能力所需要导入的模块如下：

收起

自动换行

深色代码主题

复制

```
1. import { arEngine, ARView, arViewController } from '@kit.AREngine';
2. import { Node, Scene, Vec3 } from '@kit.ArkGraphics3D';
3. import { window } from '@kit.ArkUI';
4. import { BusinessError } from '@kit.BasicServicesKit';
```

### 定义变量

定义变量hitAnchorList存储放置物体处的锚点信息、hitPoseList存储放置物体处的位姿信息和statusBarHeight设备状态栏高度。

用户点击设备的坐标和显示预览流的坐标不一致，预览流的窗口略小于设备屏幕，因此需要减去设备状态栏高度以获取准确的点击坐标。

收起

自动换行

深色代码主题

复制

```
1. let frame: arEngine.ARFrame;
2. let hitAnchorList: arEngine.ARAnchor[] = [];
3. let hitPoseList: Vec3[] = [];
4. let statusBarHeight: number = 0;
```

### 显示预览流

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARMeshBuilder(): void {
3. ARMesh();
4. }

6. @Component
7. struct ARMesh {
8. @State arContext?: arViewController.ARViewContext = undefined;
9. @State context: Context = this.getUIContext().getHostContext() as Context;

11. build(): void {
12. NavDestination() {
13. RelativeContainer() {
14. if (this.arContext) {
15. ARView({ context: this.arContext })
16. .height('100%')
17. .width('100%')
18. .alignRules({
19. center: { anchor: '__container__', align: VerticalAlign.Center },
20. middle: { anchor: '__container__', align: HorizontalAlign.Center }
21. })
22. .onClick((event) => {
23. this.objectCollisionDetection(event);
24. })
25. }
26. }
27. }
28. .onAppear(() => {
29. this.initARView();
30. this.getAvoidArea();
31. })
32. .onWillDisappear(() => {
33. this.stopARView();
34. })
35. .onShown(() => {
36. this.resumeARView();
37. })
38. .onHidden(() => {
39. this.pauseARView();
40. })
41. .hideTitleBar(true)
42. .hideBackButton(true)
43. .hideToolBar(true)
44. }

46. // 获取用户点击坐标，获取碰撞检测结果
47. private objectCollisionDetection(event: ClickEvent): void {
48. let x: number = this.getUIContext().vp2px(event.windowX);
49. let y: number = this.getUIContext().vp2px(event.windowY) - statusBarHeight;
50. console.info(`Get onclick position, x: ${x} y: ${y}.`);

52. try {
53. let result: arEngine.ARHitResult[] = frame.hitTest(x, y);
54. console.info(`The hitResult size is: ${result.length}.`);
55. if (!result) {
56. return;
57. }

59. for (let i = 0; i < result.length; i++) {
60. let hitResult: arEngine.ARHitResult = result[i];
61. let distance: number = hitResult.distance;

63. if (distance <= 0) {
64. continue;
65. }

67. let hitAnchor: arEngine.ARAnchor = hitResult.createAnchor();
68. let pos: Vec3 = hitAnchor.getPose().translation;

70. hitPoseList.push(pos);
71. hitAnchorList.push(hitAnchor);

73. }
74. console.info('Succeeded in getting hit result.');  // 成功获取碰撞目标
75. } catch (error) {
76. const err: BusinessError = error as BusinessError;
77. console.error(`Failed to get hitResults. Code is ${err.code}, message is ${err.message}`);
78. }
79. }

81. private initARView(): void {
82. Scene.load().then((scene: Scene) => {
83. let viewContext: arViewController.ARViewContext = new arViewController.ARViewContext();
84. viewContext.scene = scene;
85. viewContext.callback = new ARViewCallbackImpl();
86. viewContext.config = {
87. type: arEngine.ARType.WORLD,
88. planeFindingMode: arEngine.ARPlaneFindingMode.HORIZONTAL_AND_VERTICAL,
89. powerMode: arEngine.ARPowerMode.NORMAL,
90. semanticMode: arEngine.ARSemanticMode.NONE,
91. poseMode: arEngine.ARPoseMode.GRAVITY,
92. depthMode: arEngine.ARDepthMode.AUTOMATIC,
93. meshMode: arEngine.ARMeshMode.ENABLE,  // 开启mesh
94. focusMode: arEngine.ARFocusMode.AUTO
95. }
96. viewContext.init().then(() => {
97. this.arContext = viewContext;
98. console.info('Succeeded in initializing ARView.');
99. }).catch((err: BusinessError) => {
100. console.error(`Failed to init ARView. Code is ${err.code}, message is ${err.message}.`);
101. })
102. })
103. }

105. // 获取屏幕上减去状态栏的真实高度（预览流高度）
106. private getAvoidArea(): void {
107. let avoidAreaType: window.AvoidAreaType = window.AvoidAreaType.TYPE_SYSTEM;
108. window.getLastWindow(this.context).then((data) => {
109. // 获取顶部状态栏高度
110. let avoidArea1: window.AvoidArea = data.getWindowAvoidArea(avoidAreaType);
111. statusBarHeight = avoidArea1.topRect.height;
112. console.info(`The statusBarHeight is ${statusBarHeight}.`);
113. }).catch((err: BusinessError) => {
114. console.error(`Failed to obtain the window. Code is ${err.code}, message is ${err.message}.`);
115. })
116. }

118. private stopARView(): void {
119. // ...
120. }
121. private resumeARView(): void {
122. // ...
123. }
124. private pauseARView(): void {
125. // ...
126. }
127. }
```

### 获取mesh网格数据

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法进行帧数据更新，获取mesh网格数据。

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
11. let planeVertices: number[] = [];
12. let vertexNormals: number[] = [];
13. let triangleIndices: number[] = [];

15. if (!ctx.session) {
16. return;
17. }

19. let session: arEngine.ARSession | undefined = ctx.session;

21. try {
22. frame = session.getFrame();
23. let camera: arEngine.ARCamera = frame.getCamera();
24. let sceneMesh: arEngine.ARSceneMesh = frame.acquireSceneMesh();

26. if (camera.state === arEngine.ARTrackingState.TRACKING) {
27. planeVertices = arrayBufferFloat32ToNumber(sceneMesh.getVertices());
28. triangleIndices = arrayBufferInt32ToNumber(sceneMesh.getTriangleIndices());
29. vertexNormals = arrayBufferFloat32ToNumber(sceneMesh.getVertexNormals());

31. // 输出mesh数据
32. console.info(`The mesh data planeVertices is: ${planeVertices}, triangleIndices is: ${triangleIndices},
33. vertexNormals is: ${vertexNormals}.`);
34. }

36. } catch (error) {
37. const err: BusinessError = error as BusinessError;
38. console.error(`Failed to acquire depth information. Code is ${err.code}, message is ${err.message}.`);
39. }
40. }
41. }
```

### 获取网格扫描信息的自定义方法

自定义数据转换方法arrayBufferFloat32ToNumber及arrayBufferInt32ToNumber可以参考[数据类型转换说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arraybuffer-info)。