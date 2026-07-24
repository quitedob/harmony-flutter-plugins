接入手写套件后，可以在应用中创建手写功能界面。界面包括画布和工具栏两部分，画布部分支持手写笔和手指的书写效果绘制，工具栏部分提供多种笔刷和编辑工具，并支持对手写功能进行设置。接入手写套件后将自动开启一笔成形和报点预测功能，无需再单独接入。

从5.1.0(18)开始，手写套件新增支持设置工具栏默认笔刷、各笔刷默认宽度。

从6.0.0(20)开始，手写套件新增支持自定义画布大小、缩略图能力。

## 场景介绍

在应用中创建手写功能界面，效果如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/IWaUAB5AS3SUZNEOSwE_DA/zh-cn_image_0000002503542522.png?HW-CC-KV=V1&HW-CC-Date=20260414T045902Z&HW-CC-Expire=86400&HW-CC-Sign=255E792C584C41D26EC5D86C40B32E3EDB52B9EB907EC6C1888B5969CF16DA68 "点击放大")

1. 可以加载和显示手写文件。
2. 可以编辑和保存手写文件。
3. Pen Kit手写套件仅支持上下滑动，不支持左右滑动。

## 开发流程

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/t1XklzhrTJCIH4iDyQ-UTg/zh-cn_image_0000002503702336.png?HW-CC-KV=V1&HW-CC-Date=20260414T045902Z&HW-CC-Expire=86400&HW-CC-Sign=4432E04127AC3F936AB9C5CD0DDC9924B24653176DCB5092B3AF9C00721A4CE2)

## 接口说明

展开

| 接口 | 接口描述 |
| --- | --- |
| [HandwriteComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwritecomponent) | 构建画布控件 |
| [HandwriteController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwritecontroller) | 画布的主要功能入口类 |

## 开发步骤

1.EntryAbility入口设置Context。

收起

自动换行

深色代码主题

复制

```
1. import { UIAbility } from '@kit.AbilityKit';
2. import { window } from '@kit.ArkUI';
3. import GlobalContext from '../utils/ContextConfig';

5. export default class EntryAbility extends UIAbility {

7. onWindowStageCreate(windowStage: window.WindowStage): void {
8. // 主窗口已创建，为此功能设置主页面
9. windowStage.loadContent('pages/HandWritingDemo', (err) => {
10. if (err.code) {
11. return;
12. }
13. });
14. GlobalContext.setContext(this.context);
15. }
16. }
```

2.新建GlobalContext类。

收起

自动换行

深色代码主题

复制

```
1. import { common } from "@kit.AbilityKit";

3. declare namespace globalThis {
4. let _brushEngineContext: common.UIAbilityContext;
5. };

7. export default class GlobalContext {
8. static getContext(): common.UIAbilityContext {
9. return globalThis._brushEngineContext;
10. }

12. static setContext(context: common.UIAbilityContext): void {
13. globalThis._brushEngineContext = context;
14. }
15. }
```

3.构造包含手写组件的控件/页面，下面以控件为例。

收起

自动换行

深色代码主题

复制

```
1. import { HandwriteController, HandwriteComponent, PenType, PenHspInfo } from '@kit.Penkit';

3. @Entry
4. @Component
5. struct HandWriteDemoComp {
6. controller: HandwriteController = new HandwriteController();
7. // 根据应用存储规则，获取到手写文件保存的路径，此处仅为实例参考
8. initPath: string = this.getUIContext().getHostContext()?.filesDir + '/aa';
9. penWidth: number = 5;
10. ballpointPenWidth: number = 6;

12. aboutToAppear() {
13. // 加载时设置保存动作完成后的回调。
14. this.controller.onLoad(this.callback);
15. }

17. // 手写文件内容加载完毕渲染上屏后的回调,通知接入用户,可在此处进行自定义行为
18. callback = () => {
19. // 自定义行为,例如文件加载完毕后展示用户操作指导
20. }

22. build() {
23. Row() {
24. Stack({ alignContent: Alignment.TopStart }) {
25. HandwriteComponent({
26. handwriteController: this.controller,
27. defaultPenType: PenType.PEN, // 可选属性，默认笔刷
28. defaultPenInfo: [{ penType: PenType.PEN, penWidth: this.penWidth },
29. { penType: PenType.BALLPOINT_PEN, penWidth: this.ballpointPenWidth }] as PenHspInfo[], //可选属性，各笔刷的默认宽度
30. widthRatio: 1, // 可选属性，自定义画布大小，宽度占比（0-1）。
31. heightRatio: 1, // 可选属性，自定义画布大小，高度占比（0-1）。
32. onInit: () => {
33. // 画布初始化完成时的回调。此时可以调用接口加载和显示笔记内容
34. this.controller?.load(this.initPath);
35. },
36. onScale: (scale: number) => {
37. // 画布缩放时的回调方法，将返回当前手写控件的缩放比例，可在此处进行自定义行为。
38. }
39. })
40. Button("save")
41. .onClick(async () => {
42. // 需根据应用存储规则，获取到手写文件保存的路径，此处仅为实例参考
43. const path = this.getUIContext().getHostContext()?.filesDir + '/aa';
44. await this.controller?.save(path).then().catch((error: Error) => {
45. console.info("err：" + error);
46. })
47. // 获取缩略图
48. this.controller.getThumbnail(this.controller?.getContentRange())?.then((pixelMap: PixelMap) => {
49. if (pixelMap) {
50. pixelMap.release()
51. console.info('getThumbnail success')
52. }
53. })
54. })
55. }
56. .width('100%')
57. }
58. .height('100%')
59. }
60. }
```

完整示例代码可参考[手写笔服务（ArkTS）](https://developer.huawei.com/consumer/cn/codelabsPortal/carddetails/tutorials_PenKit-Next-Easy)。