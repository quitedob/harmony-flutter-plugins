## 概要

从5.0.5(17)开始，AR Engine支持获取深度图的能力。

AR Engine提供的深度估计功能通过算法输出深度图数据（物体表面离相机的距离组成的图）和深度置信度图信息，为开发者提供环境三维感知能力。该技术可应用于例如测量、体积估算、场景重建等获取空间物体深度信息场景，基于此信息完成一些空间计算任务，比如计算物体体积等。

**图1** 深度渲染示意图   
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/1fudm_VrR7O9bWpp2aKcSg/zh-cn_image_0000002500306270.png?HW-CC-KV=V1&HW-CC-Date=20260414T053703Z&HW-CC-Expire=86400&HW-CC-Sign=13E0821F9AC99B6A5D807BAA3E3367471C453376746AD7277A7299978459CD82)

注意

本功能仅提供能力，接入该功能不构成对产品的质量保证或任何承诺，详见[AR Engine深度估计功能技术局限性及免责声明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-appendix#section1854314717219)。

本章节涉及的AR Engine能力如下：

* 运动跟踪能力
* 环境跟踪能力（平面检测）

## 接口说明

以下接口为AR深度估计相关接口。详细接口和说明，请参考[AR Engine API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine)。

展开

| 接口名 | 描述 |
| --- | --- |
| [HMS\_AREngine\_ARSession\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga47713cb18234569e03b5216b6c8442d3) | 创建一个新的[AREngine\_ARSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga2dbf3585f50628750ec855501c043650)会话。 |
| [HMS\_AREngine\_ARSession\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga1d1cacf372a8011a439f0e4e76994259) | 更新AR Engine的计算结果。 |
| [HMS\_AREngine\_ARSession\_Configure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga6394ae995148abbe3d00082817bf320a) | 配置[AREngine\_ARSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga2dbf3585f50628750ec855501c043650)会话。 |
| [HMS\_AREngine\_ARFrame\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gadfcb9589137a39c5afcb217e18853a9d) | 创建一个新的[AREngine\_ARFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gaf35f728a1179ef54a3eba9f1cf021719)对象，将指针存储到\*outFrame中。 |
| [HMS\_AREngine\_ARSession\_SetDisplayGeometry](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga3f23bf747def8303c3fb261a9e9a2286) | 设置显示的高和宽（以像素为单位）。该高度和宽度是显示视图的高度和宽度，如果不一致，会导致显示相机预览出错。 |
| [HMS\_AREngine\_ARSession\_SetCameraGLTexture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gac697e4be36db63ed6098f154aa9ac01c) | 设置可用于存储相机预览流数据的OpenGL纹理。 |
| [HMS\_AREngine\_ARSession\_GetAllTrackables](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gac5b39338f95317671d8de6d4f409cf9c) | 获取所有指定类型的可跟踪对象集合。 |
| [HMS\_AREngine\_ARTrackableList\_AcquireItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gab1782eeeeddc01b77a140af915cb351c) | 从可跟踪列表中获取指定index的对象。 |
| [HMS\_AREngine\_ARPlane\_GetCenterPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gabbb03027afb984be8542d00d2eebd063) | 获取从平面的局部坐标系到世界坐标系转换的位姿信息。 |
| [HMS\_AREngine\_ARFrame\_AcquireCamera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga5295c975a0ff3d633a1dde5a8eb70863) | 获取当前帧的相机参数对象。 |
| [HMS\_AREngine\_ARPose\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gafb471f39563ca1a4947d4f87c77e24e2) | 分配并初始化一个新的位姿对象。 |
| [HMS\_AREngine\_ARCamera\_GetPose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga00df108c4ba187967a10e9c4d2e27d3a) | 获取当前相机对象在AR世界空间中的位姿。 |
| [HMS\_AREngine\_ARConfig\_SetDepthMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section12608229155413) | 设置深度模式。 |
| [HMS\_AREngine\_ARFrame\_AcquireDepthImage16Bits](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section138574584154) | 获取当前帧的深度图像。 |
| [HMS\_AREngine\_ARFrame\_AcquireDepthConfidenceImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section4424501286) | 获取当前帧的深度图像对应的置信度信息。 |
| [HMS\_AREngine\_ARImage\_GetNativeBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section367418528228) | 获取当前帧图像对象的NativeBuffer数据。 |

## 开发步骤

本章节给出了关键开发步骤，完整代码可以参考[示例代码](https://gitcode.com/harmonyos_samples/arengine_-sample-code_-clientdemo_cpp)。

### 声明Native接口

开发者可参考AR物体摆放章节的[声明Native接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section1557014318265)。

### 创建UI界面

首先创建一个UI界面ARDepth.ets，用于选择是否开启深度图渲染模式。

收起

自动换行

深色代码主题

复制

```
1. // 此代码可参考示例代码：ARSample/entry/src/main/ets/pages/ARDepth.ets。
2. @Builder
3. export function ARDepthBuilder() {
4. ARDepth();
5. }

7. @Component
8. struct ARDepth {
9. pageInfo: NavPathStack = new NavPathStack();

11. build(): void {
12. NavDestination() {
13. Column() {
14. Button('关闭深度图渲染模式', { type: ButtonType.Normal, stateEffect: true })
15. .borderRadius(8)
16. .width('50%')
17. .height('5%')
18. .onClick(() => {
19. this.pageInfo.pushPathByName('ARDepthRender', 0); // 0表示关闭渲染
20. })

22. Button('开启深度图渲染模式', { type: ButtonType.Normal, stateEffect: true })
23. .borderRadius(8)
24. .width('50%')
25. .height('5%')
26. .onClick(() => {
27. this.pageInfo.pushPathByName('ARDepthRender', 1); // 1表示打开渲染
28. })
29. }
30. .justifyContent(FlexAlign.SpaceEvenly)
31. .width('100%')
32. .height('100%')
33. }
34. .onReady((context: NavDestinationContext) => {
35. this.pageInfo = context.pathStack;
36. })
37. .hideTitleBar(true)
38. .hideBackButton(true)
39. .hideToolBar(true)
40. }
41. }
```

最后创建一个ARDepthRender.ets，使用[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件用于加载相机预览画面，并定时触发每一帧绘制。

收起

自动换行

深色代码主题

复制

```
1. // 此代码可参考示例代码：ARSample/entry/src/main/ets/pages/ARDepthRender.ets。
2. import { deviceInfo } from '@kit.BasicServicesKit';
3. import { resourceManager } from '@kit.LocalizationKit';
4. import arEngineDemo from 'libentry.so';

6. @Builder
7. export function ARDepthRenderBuilder() {
8. ARDepthRender();
9. }

11. @Component
12. struct ARDepthRender {
13. pageInfo: NavPathStack = new NavPathStack();
14. private interval: number = -1;
15. private isUpdate: boolean = true;
16. private params: number = 0;
17. private xComponentId = 'ARDepth';
18. @State context: Context = this.getUIContext().getHostContext() as Context;
19. private resMgr: resourceManager.ResourceManager = this.context.resourceManager;
20. @State distance: string = '';
21. @State rotation: number = deviceInfo.deviceType === 'tablet' ? 3 : 0;

23. build(): void {
24. NavDestination() {
25. RelativeContainer() {
26. XComponent({ id: this.xComponentId, type: XComponentType.SURFACE, libraryname: 'entry' })
27. .width('100%')
28. .height('100%')
29. .alignRules({
30. center: { anchor: '__container__', align: VerticalAlign.Center },
31. middle: { anchor: '__container__', align: HorizontalAlign.Center }
32. })
33. .onLoad(() => {
34. this.interval = setInterval(() => {
35. if (this.isUpdate) {
36. // 每一帧通过调用AR Engine的Native API update来更新计算结果
37. arEngineDemo.update(this.xComponentId);
38. this.distance = arEngineDemo.getDistance(this.xComponentId);
39. }
40. }, 33) // 将帧速率设置为30fps（每33ms刷新一次帧）
41. })
42. .onDestroy(() => {
43. clearInterval(this.interval);
44. })

46. Text(this.distance)
47. .fontColor(Color.Yellow)
48. .fontSize(24)
49. .textShadow({
50. radius: 10,
51. color: Color.Black,
52. offsetX: 0,
53. offsetY: 0
54. })
55. .textAlign(TextAlign.Center)
56. .alignRules({
57. bottom: { anchor: '__container__', align: VerticalAlign.Bottom },
58. middle: { anchor: '__container__', align: HorizontalAlign.Center }
59. })
60. }
61. }
62. .onAppear(() => {
63. arEngineDemo.init(this.resMgr);
64. let config: Int32Array = new Int32Array([0, this.params, 1, this.rotation]);
65. arEngineDemo.start(this.xComponentId, config);
66. })
67. .onWillDisappear(() => {
68. arEngineDemo.stop(this.xComponentId);
69. })
70. .onShown(() => {
71. this.isUpdate = true;
72. arEngineDemo.show(this.xComponentId);
73. })
74. .onHidden(() => {
75. this.isUpdate = false;
76. arEngineDemo.hide(this.xComponentId);
77. })
78. .onReady((context: NavDestinationContext) => {
79. this.pageInfo = context.pathStack;
80. this.params = context.pathInfo.param as number;
81. })
82. .hideTitleBar(true)
83. .hideBackButton(true)
84. .hideToolBar(true)
85. }

87. }
```

配置路由进行页面间跳转，页面路由配置详细可查看[组件导航(Navigation) (推荐)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)。

### 引入AR Engine

开发者可参考AR物体摆放章节的[引入AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arworld#section183721115521)。

### 创建AR会话

创建AR会话并配置为开启深度模式。

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
7. // 设置深度模式为开启状态。
8. HMS_AREngine_ARConfig_SetDepthMode(arSession, arConfig, ARENGINE_DEPTH_MODE_AUTOMATIC);
9. // 配置器设置给AR会话。
10. HMS_AREngine_ARSession_Configure(arSession, arConfig);
```

### 获取当前环境中的深度图

调用[HMS\_AREngine\_ARFrame\_AcquireDepthImage16Bits](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section138574584154)函数，获取当前环境中的深度信息，并将结果存放在depthImage中。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARFrame *arFrame = nullptr;
2. // 创建AR单帧对象
3. HMS_AREngine_ARFrame_Create(arSession, &arFrame);
4. AREngine_ARImage *depthImage = nullptr;
5. // 获取深度图
6. HMS_AREngine_ARFrame_AcquireDepthImage16Bits(arSession, arFrame, &depthImage);
7. // 获取深度图的nativeBuffer
8. OH_NativeBuffer* depthBuffer;
9. HMS_AREngine_ARImage_GetNativeBuffer(arSession, depthImage, &depthBuffer);
```

### 获取当前深度图对应的深度置信度图

调用[HMS\_AREngine\_ARFrame\_AcquireDepthConfidenceImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#section4424501286)函数，获取当前深度图对应的置信度图。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARFrame *arFrame = nullptr;
2. // 创建AR单帧对象
3. HMS_AREngine_ARFrame_Create(arSession, &arFrame);
4. AREngine_ARImage *depthConfidenceImage = nullptr;
5. // 获取深度置信度图
6. HMS_AREngine_ARFrame_AcquireDepthConfidenceImage(arSession, arFrame, &depthConfidenceImage);
7. // 获取深度置信图的nativeBuffer
8. OH_NativeBuffer* depthConfidenceBuffer;
9. HMS_AREngine_ARImage_GetNativeBuffer(arSession, depthConfidenceImage, &depthConfidenceBuffer);
```

### 获取深度图和深度置信度图中的值

深度图和深度置信度图包装为[AREngine\_ARImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#gabfee13b0076f2f00b7efdef2717add59)对象，可以通过此对象获取对应的深度图和深度置信度图。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARImageFormat format;
2. // 获取当前帧图像的数据格式
3. HMS_AREngine_ARImage_GetFormat(arSession, depthImage, &format);
4. int32_t depthWidth;
5. // 获取深度图的宽度
6. HMS_AREngine_ARImage_GetWidth(arSession, depthImage, &depthWidth);
7. int32_t depthHeight;
8. // 获取深度图的高度
9. HMS_AREngine_ARImage_GetHeight(arSession, depthImage, &depthHeight);
10. uint8_t *depthData = nullptr;
11. int32_t depthLength = 0;
12. // 获取深度图的数据
13. HMS_AREngine_ARImage_GetPlaneData(arSession, depthImage, 0, (const uint8_t **)&depthData, &depthLength);
```

### 使用完毕后，销毁深度图和深度置信度图

收起

自动换行

深色代码主题

复制

```
1. HMS_AREngine_ARImage_Release(depthImage);
2. HMS_AREngine_ARImage_Release(depthConfidenceImage);
```