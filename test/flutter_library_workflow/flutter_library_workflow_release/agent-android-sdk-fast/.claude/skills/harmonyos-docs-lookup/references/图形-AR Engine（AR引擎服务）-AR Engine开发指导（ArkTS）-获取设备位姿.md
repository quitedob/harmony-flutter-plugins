## 概要

从5.1.0(18)开始，AR Engine支持获取设备位姿能力。

设备位姿描述了物体在真实世界中的位置和朝向。AR Engine提供了世界坐标下6自由度（6DoF）的位姿计算，包括物体的位置（沿x、y、z轴方向位移）和朝向（绕x、y、z轴旋转）。通过AR Engine，开发者可以实时获取设备在空间中任意时刻的位姿。

## 世界坐标系与位姿示意

设备位姿一般在世界坐标系下进行表示。世界坐标系描述了真实物理空间中物体的绝对位置，其正方向如图所示。

**图1** 世界坐标系示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/BNc6-2V0QF-P7QDl1GQMQQ/zh-cn_image_0000002500426118.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=B3A911F97C42207084EF41DED7098F1B222A7A09630AAC843A149121CE36FE89)

AR Engine会自动完成世界坐标系初始化。

在AR Engine中，设备位姿由一个7维向量描述，包括旋转量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/5x-eT5uLTXyabKL31eV8qw/zh-cn_formulaimage_0000002532306169.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=9A8EED326AEC6F31D15CE1323213D2C3F35DB46270C84551E0149AA6D9E0683B)和位移量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/93FexdA1SnKR6MdfqrpMbg/zh-cn_formulaimage_0000002532306171.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=5B457F35666E34BAED7CC4969C010966E4AB08644B4E27B3DBE8299538856EEE)。其中旋转量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/Pa4yCbl5S_WUVZd9NZSiYg/zh-cn_formulaimage_0000002500306278.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=D56ACA7CCB9BDEBD4C3E7E27FD49DACF434597763BA2AC9CB75323A9A55CAA5E)是一组四元数，描述了设备相对于坐标原点的旋转状态；位移量![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/vbDC7x-2T1mb--bQM51KGw/zh-cn_formulaimage_0000002500306280.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=013549FCE6367BC18AAE0F48182BEC66C2A3BF53213E7703FDBB234DBBC3DB03)是一组三维向量，描述了设备相对于坐标原点的平移状态，如下图所示。

**图2** 设备位姿的旋转和平移变化示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f2/v3/vhIGXVAWQEaPd6CbMUJr-w/zh-cn_image_0000002532306167.png?HW-CC-KV=V1&HW-CC-Date=20260414T053608Z&HW-CC-Expire=86400&HW-CC-Sign=B2891664196A88DC6E89753E13F111327114193B3CF38D836008BA3E5B5D78F1)

通过旋转分量和平移分量，可以描述设备在空间中任意时刻的位姿状态。

## 接口说明

获取设备位姿可以通过[ARCamera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section176984261612)相机对象获取，以下接口为获取设备位姿接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-arkts-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARCamera.getPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section0507108132710) | 获取摄像机在世界空间中的位姿信息。 |

## 开发步骤

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)的创建可以参考[管理AR会话](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession)章节。

### 导入模块

获取设备位姿能力需要依赖以下模块。

收起

自动换行

深色代码主题

复制

```
1. import { arEngine, ARView, arViewController } from '@kit.AREngine';
2. import { Node, Scene, Vec3 } from '@kit.ArkGraphics3D';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

Vec3是一个三维向量，用于存储设备的位姿信息。

### 定义变量

定义两个变量pose和stateReason，用于接收pose位姿信息和追踪失败原因。

收起

自动换行

深色代码主题

复制

```
1. let pose: arEngine.ARPose;
2. let stateReason: arEngine.ARTrackingStateReason;
```

### 显示预览流及设备位姿信息

首先初始化AR会话和AR场景，可以参考[初始化AR会话和AR场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-arsession#section3391814131611)章节。

在设备界面上显示设备位姿信息及追踪失败原因，使用重复调用函数方法在设备界面上实时更新位姿和追踪失败原因的信息。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARPoseBuilder(): void {
3. ARPose();
4. }

6. @Component
7. struct ARPose {
8. @State arContext?: arViewController.ARViewContext = undefined;
9. private intervalId: number = -1;
10. // 重复调用函数时间间隔为33ms，即设定为30fps
11. private delayInterval: number = 33;
12. // 位姿的信息参数
13. @State translation: Vec3 = {
14. x: 0,
15. y: 0,
16. z: 0
17. }
18. // 追踪失败的原因
19. @State reason: arEngine.ARTrackingStateReason = stateReason;

21. build(): void {
22. NavDestination() {
23. RelativeContainer() {
24. if (this.arContext) {
25. ARView({ context: this.arContext })
26. .height('100%')
27. .width('100%')
28. .alignRules({
29. center: { anchor: "__container__", align: VerticalAlign.Center },
30. middle: { anchor: "__container__", align: HorizontalAlign.Center }
31. })

33. // 在屏幕上显示设备位姿信息
34. Column() {
35. Text(`x: ${this.translation.x.toFixed(4)}`)
36. .infoStyles()
37. Text(`y: ${this.translation.y.toFixed(4)}`)
38. .infoStyles()
39. Text(`z: ${this.translation.z.toFixed(4)}`)
40. .infoStyles()
41. Text(`reason: ${this.reason}`)
42. .infoStyles()
43. }
44. .alignItems(HorizontalAlign.Start)
45. .margin({ left: 28, top: 28 })
46. .alignRules({
47. top: { anchor: "__container__", align: VerticalAlign.Top },
48. left: { anchor: "__container__", align: HorizontalAlign.Start }
49. })
50. }
51. }
52. }
53. .onAppear(() => {
54. this.initARView();
55. // 设定在30fps下更新位姿和追踪失败原因的信息
56. this.intervalId = setInterval(() => {
57. if (pose !== undefined) {
58. this.translation = pose.translation;
59. this.reason = stateReason;
60. }
61. }, this.delayInterval);
62. })
63. .onWillDisappear(() => {
64. // 退出setInterval函数
65. clearInterval(this.intervalId);
66. this.stopARView();
67. })
68. .onShown(() => {
69. this.resumeARView();
70. })
71. .onHidden(() => {
72. this.pauseARView();
73. })
74. .hideTitleBar(true)
75. .hideBackButton(true)
76. .hideToolBar(true)
77. }

79. private initARView(): void {
80. // ...
81. }
82. private stopARView(): void {
83. // ...
84. }
85. private resumeARView(): void {
86. // ...
87. }
88. private pauseARView(): void {
89. // ...
90. }
91. }

93. // 界面显示文本样式
94. @Extend(Text)
95. function infoStyles() {
96. .fontColor(Color.Yellow)
97. .fontSize(24)
98. .textShadow({
99. radius: 10,
100. color: Color.Black,
101. offsetX: 0,
102. offsetY: 0
103. })
104. .textAlign(TextAlign.Start)
105. }
```

### 获取设备位姿信息

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法获取AR会话对象arSession，之后通过AR会话对象arSession获取每一帧对应的设备位姿信息。

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

15. let arSession: arEngine.ARSession = ctx.session; // 获取AR会话

17. try {
18. // 获取每一帧的设备位姿信息及追踪失败的原因
19. let frame: arEngine.ARFrame = arSession.getFrame();
20. pose = frame.getCamera().getPose();
21. stateReason = frame.getCamera().stateReason;
22. } catch (error) {
23. const err: BusinessError = error as BusinessError;
24. console.error(`Failed to update data. Code is ${err.code}, message is ${err.message}`);
25. }
26. }
27. }
```