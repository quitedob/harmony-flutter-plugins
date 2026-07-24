## 概要

在开发AR应用之前，需调用AR会话接口创建一个唯一的AR会话，供后续操作与管理使用。在整个AR应用生命周期中，AR会话扮演着至关重要的角色。

开发者可以使用[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)来进行AR会话session的创建与销毁等操作。

[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)和[ARSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arengine#section19193165314510)的不同之处在于，[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)不仅封装了AR会话session，还集成了AR场景的创建与管理，从而使得开发更为便捷。

在进行后续功能开发前，请确保已创建一个可用且唯一的AR会话。

## 接口说明

AR会话主要依赖[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，以下接口为AR会话相关接口。详细接口和说明，请参考[arViewController（AR场景管理能力）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller)。

展开

| 接口名 | 描述 |
| --- | --- |
| [ARViewContext.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section07524457283) | 初始化[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，初始化AR会话和设置AR渲染场景等。 |
| [ARViewContext.pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9795165613212) | 暂停相机跟踪与AR场景渲染。 |
| [ARViewContext.destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section169251835133414) | 销毁[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，释放ARView使用资源，包括AR会话与呈现场景销毁，在退出ARView场景时使用。 |
| [ARViewContext.resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section639015333356) | 用于恢复暂停的相机跟踪与AR场景渲染。 |
| [ARViewContext.scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section885612613616) | 设置ARView的AR场景。 |
| [ARViewContext.scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section1371542426) | 获得的AR呈现场景，用于管理空间节点。 |
| [ARViewContext.session](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section18461161774312) | 获取AR会话，用于获取相关AR环境跟踪、相机跟踪、命中检测等能力，如相机位姿、平面信息、创建锚点等。 |
| [ARViewContext.config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section4323184815436) | 设置AR会话的配置文件，如北向坐标、性能模式等。 |
| [ARViewContext.callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section20507194174418) | 设置回调函数，以根据回调功能实现对应业务逻辑。 |

## 开发步骤

对于使用ArkTS的任何AR应用，首先需要创建一个AR会话[ARViewContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section12681656121519)，用于管理AR Engine的系统状态。

### 导入模块

导入AR Engine相关模块，导入方法如下。

收起

自动换行

深色代码主题

复制

```
1. import { arEngine, ARView, arViewController } from '@kit.AREngine';
2. import { Node, Scene } from '@kit.ArkGraphics3D';
3. import { BusinessError } from '@kit.BasicServicesKit';
```

### 初始化AR会话和AR场景

通过[ARViewContext.init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section07524457283)方法初始化一个AR会话及场景。

在此之前请确保已获取相机权限，否则将不会加载AR场景，具体指导请参考[前置准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-preparations#section148162301428)或者[申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-preparations#section12219144310509)。

AR会话及场景创建好后使用[组件导航（Navigation）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)组件及[ARView](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-component-arview#section46518288429)组件在设备上显示AR场景，关于[组件导航（Navigation）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation)具体指导可参考[前置准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-preparations#section148162301428)。

收起

自动换行

深色代码主题

复制

```
1. @Builder
2. export function ARWorldBuilder(): void {
3. ARWorld();
4. }

6. @Component
7. struct ARWorld {
8. @State arContext?: arViewController.ARViewContext = undefined;

10. // 创建UI窗口，显示AR场景
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
22. }
23. }
24. }
25. .onAppear(() => {
26. this.initARView();
27. })
28. .onWillDisappear(() => {
29. this.stopARView();
30. })
31. .onShown(() => {
32. this.resumeARView();
33. })
34. .onHidden(() => {
35. this.pauseARView();
36. })
37. .hideTitleBar(true)
38. .hideBackButton(true)
39. .hideToolBar(true)
40. }

42. private initARView(): void {
43. Scene.load().then((scene: Scene) => {
44. let viewContext: arViewController.ARViewContext = new arViewController.ARViewContext();
45. viewContext.scene = scene;
46. viewContext.callback = new ARViewCallbackImpl();  // 通过回调实现业务场景
47. viewContext.config = {
48. type: arEngine.ARType.WORLD,
49. planeFindingMode: arEngine.ARPlaneFindingMode.HORIZONTAL_AND_VERTICAL,
50. powerMode: arEngine.ARPowerMode.NORMAL,
51. semanticMode: arEngine.ARSemanticMode.NONE,
52. poseMode: arEngine.ARPoseMode.GRAVITY,
53. depthMode: arEngine.ARDepthMode.AUTOMATIC,
54. meshMode: arEngine.ARMeshMode.DISABLED,
55. focusMode: arEngine.ARFocusMode.AUTO
56. }
57. viewContext.init().then(() => {
58. this.arContext = viewContext;
59. console.info('Succeeded in initializing ARView.');
60. }).catch((err: BusinessError) => {
61. console.error(`Failed to init ARView. Code is ${err.code}, message is ${err.message}.`);
62. })
63. })
64. }
65. }
```

### 使用AR会话对象处理业务

调用[ARViewCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9396615174614)，使用其中的[onFrameUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section52341758194715)方法获取AR会话对象，之后可根据开发者所需的具体业务编写处理逻辑。

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

10. async onFrameUpdate(ctx: arViewController.ARViewContext, sysBootTs: number): Promise<void> {
11. if (!ctx.session) {
12. return;
13. }

15. let arSession: arEngine.ARSession = ctx.session; // 获取AR会话

17. try {
18. // 示例为一个帧对象的获取与销毁
19. let frame: arEngine.ARFrame = arSession.getFrame();
20. await frame.release();

22. } catch (error) {
23. const err: BusinessError = error as BusinessError;
24. console.error(`Failed to update data. Code is ${err.code}, message is ${err.message}.`);
25. }
26. }
27. }
```

### 暂停AR会话

要暂停AR会话，开发者可以使用[ARViewContext.pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section9795165613212)方法，在应用置为后台时可以暂停AR会话和暂停AR场景。

收起

自动换行

深色代码主题

复制

```
1. private pauseARView(): void {
2. if (!this.arContext) {
3. return;
4. }
5. try {
6. this.arContext.pause();
7. } catch (error) {
8. const err: BusinessError = error as BusinessError;
9. console.error(`Failed to pause context. Code is ${err.code}, message is ${err.message}.`);
10. }
11. }
```

### 恢复AR会话

要恢复暂停的AR会话和AR场景，开发者可以使用[ARViewContext.resume](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section639015333356)方法。

收起

自动换行

深色代码主题

复制

```
1. private resumeARView(): void {
2. if (!this.arContext) {
3. return;
4. }
5. try {
6. this.arContext.resume();
7. } catch (error) {
8. const err: BusinessError = error as BusinessError;
9. console.error(`Failed to resume context. Code is ${err.code}, message is ${err.message}.`);
10. }
11. }
```

### 销毁AR会话

退出AR会话和AR场景时，开发者可以使用[ARViewContext.destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-api-arviewcontroller#section169251835133414)方法同时销毁AR会话及AR场景。

收起

自动换行

深色代码主题

复制

```
1. private stopARView(): void {
2. if (!this.arContext) {
3. return;
4. }
5. try {
6. this.arContext.destroy();
7. } catch (error) {
8. const err: BusinessError = error as BusinessError;
9. console.error(`Failed to stop context. Code is ${err.code}, message is ${err.message}`);
10. }
11. }
```

说明

组件生命周期的方法，除[aboutToAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttoappear)、[aboutToDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttodisappear)、[onPageShow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#onpageshow)、[onPageHide](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#onpagehide)外，还可以使用[Navigation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-navigation)的[页面生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-navigation-navigation#页面生命周期)所示方法，开发者可根据需要进行选择。