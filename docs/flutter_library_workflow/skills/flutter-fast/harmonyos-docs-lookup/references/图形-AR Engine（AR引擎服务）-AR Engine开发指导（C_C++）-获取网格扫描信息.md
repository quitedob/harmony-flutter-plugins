## 概要

从5.1.0(18)开始，AR Engine支持获取网格扫描信息的能力。

本章节介绍如何获取目标物体的网格扫描（mesh）数据信息，通过学习本章节，可以检测当前环境中包括平面在内的自由曲面，并在应用中处理这些曲面信息。

**图1** 环境网格扫描示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/7_GaXWD8Qj6JJknoA69bHw/zh-cn_image_0000002532306159.png?HW-CC-KV=V1&HW-CC-Date=20260414T053707Z&HW-CC-Expire=86400&HW-CC-Sign=E237AAD71A346E08E0FAC0BB8D089A91944BF7D3F05785652ACD9B633299F213)

本章节涉及的AR Engine能力如下：

* 运动跟踪能力
* 环境跟踪能力（平面检测）
* 命中检测能力

## 接口说明

以下接口为AR网格扫描相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine)。

展开

| 接口名 | 描述 |
| --- | --- |
| [HMS\_AREngine\_ARSession\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga47713cb18234569e03b5216b6c8442d3) | 创建一个新的[AREngine\_ARSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga2dbf3585f50628750ec855501c043650)会话。 |
| [HMS\_AREngine\_ARSession\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga1d1cacf372a8011a439f0e4e76994259) | 更新AR Engine的计算结果。 |
| [HMS\_AREngine\_ARSession\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga6394ae995148abbe3d00082817bf320a) | 配置[AREngine\_ARSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga2dbf3585f50628750ec855501c043650)会话。 |
| [HMS\_AREngine\_ARFrame\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gadfcb9589137a39c5afcb217e18853a9d) | 创建一个新的[AREngine\_ARFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gaf35f728a1179ef54a3eba9f1cf021719)对象，将指针存储到\*outFrame中。 |
| [HMS\_AREngine\_ARSession\_SetDisplayGeometry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga3f23bf747def8303c3fb261a9e9a2286) | 设置显示的高和宽（以像素为单位）。该高度和宽度是显示视图的高度和宽度，如果不一致，会导致显示相机预览出错。 |
| [HMS\_AREngine\_ARSession\_SetCameraGLTexture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gac697e4be36db63ed6098f154aa9ac01c) | 设置可用于存储相机预览流数据的openGL纹理。 |
| [HMS\_AREngine\_ARSession\_GetAllTrackables](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gac5b39338f95317671d8de6d4f409cf9c) | 获取所有指定类型的可跟踪对象集合。 |
| [HMS\_AREngine\_ARTrackableList\_AcquireItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gab1782eeeeddc01b77a140af915cb351c) | 从可跟踪列表中获取指定index的对象。 |
| [HMS\_AREngine\_ARPlane\_GetCenterPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gabbb03027afb984be8542d00d2eebd063) | 获取从平面的局部坐标系到世界坐标系转换的位姿信息。 |
| [HMS\_AREngine\_ARFrame\_AcquireCamera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga5295c975a0ff3d633a1dde5a8eb70863) | 获取当前帧的相机参数对象。 |
| [HMS\_AREngine\_ARPose\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gafb471f39563ca1a4947d4f87c77e24e2) | 分配并初始化一个新的位姿对象。 |
| [HMS\_AREngine\_ARCamera\_GetPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga00df108c4ba187967a10e9c4d2e27d3a) | 获取当前相机对象在AR世界空间中的位姿。 |
| [HMS\_AREngine\_ARFrame\_AcquireSceneMesh](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section25711548111020) | 获取当前帧的mesh信息。 |
| [HMS\_AREngine\_ARSceneMesh\_AcquireVerticesSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section1860218429179) | 获取mesh的顶点个数。 |
| [HMS\_AREngine\_ARSceneMesh\_AcquireVertexList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section2126723166) | 获取mesh顶点集合。 |
| [HMS\_AREngine\_ARSceneMesh\_AcquireIndexListSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section12621161917152) | 获取mesh面片的索引个数。 |
| [HMS\_AREngine\_ARSceneMesh\_AcquireIndexList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section7629354145) | 获取mesh面片的索引集合。 |
| [HMS\_AREngine\_ARSceneMesh\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section446832931813) | 释放当前帧的mesh信息。 |

## 开发步骤

本章节给出了关键开发步骤，完整代码可以参考[示例代码](https://gitcode.com/harmonyos_samples/arengine_-sample-code_-clientdemo_cpp)。

### 声明Native接口

开发者可参考AR物体摆放章节的[声明Native接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section1557014318265)。

### 创建UI界面

创建一个UI界面，使用[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件用于显示相机预览画面，并定时触发每一帧绘制。

收起

自动换行

深色代码主题

复制

```
1. // 此代码可参考示例代码：ARSample/entry/src/main/ets/pages/ARMesh.ets。
2. import { deviceInfo } from '@kit.BasicServicesKit';
3. import { resourceManager } from '@kit.LocalizationKit';
4. import arEngineDemo from 'libentry.so';

6. @Builder
7. export function ARMeshBuilder() {
8. ARMesh();
9. }

11. @Component
12. struct ARMesh {
13. pageInfo: NavPathStack = new NavPathStack();
14. private interval: number = -1;
15. private xComponentId: string = 'ARMesh';
16. @State context: Context = this.getUIContext().getHostContext() as Context;
17. private resMgr: resourceManager.ResourceManager = this.context.resourceManager;
18. @State rotation: number = deviceInfo.deviceType === 'tablet' ? 3 : 0;

20. build(): void {
21. NavDestination() {
22. RelativeContainer() {
23. XComponent({ id: this.xComponentId, type: XComponentType.SURFACE, libraryname: 'entry' })
24. .width('100%')
25. .height('100%')
26. .alignRules({
27. center: { anchor: '__container__', align: VerticalAlign.Center },
28. middle: { anchor: '__container__', align: HorizontalAlign.Center }
29. })
30. .onLoad(() => {
31. console.info(`XComponent onLoad ${this.xComponentId}.`);
32. this.interval = setInterval(() => {
33. // 调用更新Native API来更新AR Engine每帧的计算结果
34. arEngineDemo.update(this.xComponentId);
35. }, 33) // 将帧速率设置为30fps（每33ms刷新一次帧）
36. })
37. .onDestroy(() => {
38. console.info(`XComponent onDestroy ${this.xComponentId}.`);
39. clearInterval(this.interval);
40. })
41. }
42. }
43. .onAppear(() => {
44. arEngineDemo.init(this.resMgr);
45. let config: Int32Array = new Int32Array([1, this.rotation]);
46. arEngineDemo.start(this.xComponentId, config);
47. })
48. .onWillDisappear(() => {
49. arEngineDemo.stop(this.xComponentId);
50. })
51. .onShown(() => {
52. arEngineDemo.show(this.xComponentId);
53. })
54. .onHidden(() => {
55. arEngineDemo.hide(this.xComponentId);
56. })
57. .onReady((context: NavDestinationContext) => {
58. this.pageInfo = context.pathStack;
59. })
60. .hideTitleBar(true)
61. .hideBackButton(true)
62. .hideToolBar(true)
63. }
64. }
```

### 引入AR Engine

开发者可参考AR物体摆放章节的[引入AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section183721115521)。

### 创建AR会话

创建AR会话并配置为开启mesh模式。

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
7. // 设置mesh模式为开启状态。
8. HMS_AREngine_ARConfig_SetMeshMode(arSession, arConfig, ARENGINE_MESH_MODE_ENABLED);
9. // 配置器设置给AR会话。
10. HMS_AREngine_ARSession_Configure(arSession, arConfig);
```

### 获取当前环境中的mesh信息

调用[HMS\_AREngine\_ARFrame\_AcquireSceneMesh](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section25711548111020)函数，获取当前环境中的mesh信息，并将结果存放在sceneMesh中。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARFrame *arFrame = nullptr;
2. // 创建AR单帧对象
3. HMS_AREngine_ARFrame_Create(arSession, &arFrame);
4. AREngine_ARSceneMesh *sceneMesh = nullptr;
5. // 获取当前帧的mesh信息
6. HMS_AREngine_ARFrame_AcquireSceneMesh(arSession, arFrame, &sceneMesh);
```

### 获取当前mesh信息对应的mesh顶点信息

1. 调用[HMS\_AREngine\_ARSceneMesh\_AcquireVerticesSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section1860218429179)函数，获取mesh顶点信息包含的浮点数数量，每三个浮点数组成一个mesh顶点，将结果存放在meshVerticesSize 中。

收起

自动换行

深色代码主题

复制

```
1. int32_t meshVerticesSize = 0;
2. // 获取mesh顶点信息包含的浮点数数量
3. HMS_AREngine_ARSceneMesh_AcquireVerticesSize(arSession, sceneMesh, &meshVerticesSize);
```

2. 调用[HMS\_AREngine\_ARSceneMesh\_AcquireVertexList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section2126723166)函数，获取mesh顶点信息，并将结果保存在meshVertices中。

收起

自动换行

深色代码主题

复制

```
1. float *meshVertices = new float[meshVerticesSize];
2. // 获取mesh顶点信息
3. HMS_AREngine_ARSceneMesh_AcquireVertexList(arSession, sceneMesh, meshVertices, meshVerticesSize);
4. // 获取mesh顶点个数
5. int32_t mPointsNum = meshVerticesSize / 3;
```

### 获取当前mesh信息对应的mesh面片信息

1. 调用[HMS\_AREngine\_ARSceneMesh\_AcquireIndexListSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section12621161917152)函数，获取mesh面片信息对应顶点的索引个数，每三个顶点索引表示一个mesh面片，将结果存放在triangleIndicesSize 中。

收起

自动换行

深色代码主题

复制

```
1. int32_t triangleIndicesSize = 0;
2. // 获取mesh面片信息对应顶点的索引个数
3. HMS_AREngine_ARSceneMesh_AcquireIndexListSize(arSession, sceneMesh, &triangleIndicesSize);
```

2. 调用[HMS\_AREngine\_ARSceneMesh\_AcquireIndexList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section7629354145)函数，获取mesh面片信息对应顶点的索引列表，并将结果保存在meshTriangleIndices中。

收起

自动换行

深色代码主题

复制

```
1. int32_t *meshTriangleIndices = new int32_t[triangleIndicesSize];
2. // 获取mesh面片信息对应顶点的索引列表
3. HMS_AREngine_ARSceneMesh_AcquireIndexList(arSession, sceneMesh, meshTriangleIndices, triangleIndicesSize);
4. // 获取mesh面片个数
5. int32_t mTrianglesNum = triangleIndicesSize / 3;
```

### 使用完毕后，销毁mesh信息

收起

自动换行

深色代码主题

复制

```
1. void HMS_AREngine_ARSceneMesh_Release(AREngine_ARSceneMesh *sceneMesh);
```