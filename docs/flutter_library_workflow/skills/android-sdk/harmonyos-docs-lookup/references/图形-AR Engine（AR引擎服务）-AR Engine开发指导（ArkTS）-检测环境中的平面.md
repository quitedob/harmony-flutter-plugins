## 概要

从5.1.0(18)开始，AR Engine支持检测环境中的平面能力。

本章节介绍如何通过AR Engine进行平面检测。通过学习本章节，可以检测当前环境中的平面，并在应用中处理这些平面。

本章节涉及的AR Engine能力如下：

* 运动跟踪能力
* 环境跟踪能力（平面检测）

注意

初始化之后需要缓慢移动相机来寻找平面。

## 接口说明

检测平面通过[ARPlane](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section3392194311417)平面对象进行，以下接口为平面相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

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

### 导入模块

平面检测能力所需的模块导入如下：

收起

自动换行

深色代码主题

复制

```
1. import { arEngine, ARView, arViewController } from '@kit.AREngine';
2. import { Node, Scene, Vec3 } from '@kit.ArkGraphics3D';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. import { Matrix4 } from '@kit.ArkUI';
```

### 显示预览流

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARPlaneBuilder(): void {
3. ARPlane();
4. }

6. @Component
7. struct ARPlane {
8. @State arContext?: arViewController.ARViewContext = undefined;

10. build(): void {
11. // ...
12. }

14. private initARView(): void {
15. // ...
16. }
17. private stopARView(): void {
18. // ...
19. }
20. private resumeARView(): void {
21. // ...
22. }
23. private pauseARView(): void {
24. // ...
25. }
26. }
```

### 检测环境平面

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法进行帧数据更新，通过[ARSession.getAllTrackables](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section559349112710)方法获取所有识别到的平面。

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
24. console.info(`Succeeded in getting tracking plane, length is: ${trackable.length}`);  // 打印当前识别到的平面数量
25. }

27. } catch (error) {
28. const err: BusinessError = error as BusinessError;
29. console.error(`Failed to update data. Code is ${err.code}, message is ${err.message}.`);
30. }
31. }
32. }
```

### 检测平面的自定义方法

自定义方法获取顶点数据getVertices、创建索引generateMeshIndex、创建mesh数据generateMeshInput。

收起

自动换行

深色代码主题

复制

```
1. // 获取三维空间顶点坐标，第一个入参的位姿矩阵按垂直列排列，第二个坐标点为(x, 0, z, 1)，对应x-z平面。
2. export function getVertices(mat: Matrix4, point: number[]): Vec3[] {
3. let result: Vec3[] = [];
4. for (let i = 0; i < point.length; i += 2) {
5. let single: Vec3 = {
6. x: (mat[2] * point[i] + mat[6] * 0
7. + mat[10] * point[i + 1] + mat[14] * 1.0),
8. y: mat[1] * point[i] + mat[5] * 0
9. + mat[9] * point[i + 1] + mat[13] * 1.0,
10. z: -(mat[0] * point[i] + mat[4] * 0
11. + mat[8] * point[i + 1] + mat[12] * 1.0),
12. }
13. result.push(single);
14. }
15. return result;
16. }
17. // 创建 ARWorld 的 mesh索引。由于平面是由三角形拼接而成的，因此每个平面上的每个三角形的首个顶点索引都是相同的。
18. export function generateMeshIndex(input: Vec3[][]): number[] {
19. let result: number[] = [];
20. let start: number = 0;

22. for (let i = 0; i < input.length; i++) {
23. let length: number = input[i].length;

25. for (let j = start + 1; j < start + length - 1; j++) {
26. result.push(start);
27. result.push(j);
28. result.push(j + 1);
29. }
30. start += length;
31. }
32. return result;
33. }

35. export function generateMeshInput(vex: Vec3[][]): Vec3[] {
36. let result: Vec3[] = [];
37. for (let i = 0; i < vex.length; i++) {
38. let tmp: Vec3[] = vex[i];
39. for (let j = 0; j < tmp.length; j++) {
40. result.push(tmp[j]);
41. }
42. }
43. return result;
44. }
```