## 概要

从6.0.0(20)开始，AR Engine支持高精几何重建能力。

本章节通过AR Engine高精几何重建能力来识别空间中的立方体物体或者嵌入式立方体空间，计算出被识别物体或空间的长、宽、高以及体积。可以用于测量立方体体积以及嵌入式空间的大小。

注意

本功能仅提供能力，接入该功能不构成对产品的质量保证或任何承诺，详见[AR Engine高精几何重建功能技术局限性及免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-appendix#section68356131976)。

## 接口说明

高精几何重建主要依赖[ARSemanticDenseData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section137161158185414)，以下接口为高精几何重建的相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARSession.getFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section114051108916) | 获取AR Engine处理后的一帧数据。 |
| [ARFrame.acquireSemanticDense](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section945690181710) | 返回当前帧的高精几何重建对象数据。 |
| [ARSemanticDenseData.acquireCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1458368561) | 返回一个高精几何重建对象的立方体数据信息的列表。 |
| [ARSemanticDenseData.release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section13749838482) | 释放高精几何重建对象数据。 |

## 开发步骤

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)的创建可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession)章节。

### 导入模块

高精几何重建能力所需要导入的模块如下：

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

定义变量cubeVertexData接收立方体顶点数据，定义变量cubeConfidence接收识别出立方体的置信度数据，定义变量cubeLabel接收立方体的语义信息。

收起

自动换行

深色代码主题

复制

```
1. let cubeVertexData: Array<number>;
2. let cubeConfidence: number;
3. let cubeLabel: arEngine.ARSemanticPlaneLabel;
```

### 显示预览流

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

更改semanticDenseMode为[ARSemanticDenseMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section162053411246).CUBE\_VOLUME，启用体积测量识别能力。

在设备界面上显示识别到的几何数据信息，使用重复调用函数方法在设备界面上实时更新识别到的几何数据信息。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARSemanticDenseBuilder(): void {
3. ARSemanticDense();
4. }

6. @Component
7. struct ARSemanticDense {
8. @State arContext?: arViewController.ARViewContext = undefined;

10. build(): void {
11. NavDestination() {
12. RelativeContainer() {
13. if (this.arContext) {
14. ARView({ context: this.arContext })
15. .height('100%')
16. .width('100%')
17. .alignRules({
18. center: { anchor: '__container__', align: VerticalAlign.Center },
19. middle: { anchor: '__container__', align: HorizontalAlign.Center }
20. })
21. }
22. }
23. }
24. .onAppear(() => {
25. this.initARView();
26. })
27. .onWillDisappear(() => {
28. this.stopARView();
29. })
30. .onShown(() => {
31. this.resumeARView();
32. })
33. .onHidden(() => {
34. this.pauseARView();
35. })
36. .hideTitleBar(true)
37. .hideBackButton(true)
38. .hideToolBar(true)
39. }

41. private initARView(): void {
42. Scene.load().then((scene: Scene) => {
43. let viewContext: arViewController.ARViewContext = new arViewController.ARViewContext();
44. viewContext.scene = scene;
45. viewContext.callback = new ARViewCallbackImpl();
46. viewContext.config = {
47. type: arEngine.ARType.WORLD,
48. planeFindingMode: arEngine.ARPlaneFindingMode.HORIZONTAL_AND_VERTICAL,
49. powerMode: arEngine.ARPowerMode.NORMAL,
50. semanticDenseMode: arEngine.ARSemanticDenseMode.CUBE_VOLUME, // 开启体积测量
51. poseMode: arEngine.ARPoseMode.GRAVITY,
52. depthMode: arEngine.ARDepthMode.DISABLED,
53. meshMode: arEngine.ARMeshMode.DISABLED,
54. focusMode: arEngine.ARFocusMode.AUTO
55. }
56. viewContext.init().then(() => {
57. this.arContext = viewContext;
58. console.info('Succeeded in initializing ARView.');
59. }).catch((err: BusinessError) => {
60. console.error(`Failed to init ARView. Code is ${err.code}, message is ${err.message}.`);
61. })
62. })
63. }

65. private stopARView(): void {
66. // ...
67. }
68. private resumeARView(): void {
69. // ...
70. }
71. private pauseARView(): void {
72. // ...
73. }
74. }
```

### 获取立方体体积数据

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法进行帧数据更新，通过[ARSession.getFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section114051108916)方法获取当前帧，通过[ARFrame.acquireSemanticDense](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section945690181710)获得当前帧的高精几何重建对象数据，通过[ARSemanticDenseData.acquireCubeData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section1458368561)从高精几何重建对象数据中获取识别到的立方体体积数据，相关变量定义参考[定义变量](/consumer/cn/doc/harmonyos-guides/arengine-volume-measurement#section57509123317)。

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
19. if (frame) {
20. let semanticData : arEngine.ARSemanticDenseData = frame.acquireSemanticDense();
21. if(semanticData){
22. if(semanticData.cubeDataSize>0){
23. // 获取第一个Cube的体积数据
24. let semanticCubeData: arEngine.ARSemanticDenseCubeData = semanticData.acquireCubeData()[0];
25. cubeVertexData = semanticCubeData.vertexData;
26. cubeConfidence = semanticCubeData.confidence;
27. cubeLabel = semanticCubeData.label;
28. }
29. semanticData.release();
30. }
31. }
32. } catch (error) {
33. const err: BusinessError = error as BusinessError;
34. console.error(`Failed to update data. Code is ${err.code}, message is ${err.message}.`);
35. }
36. }
37. }
```