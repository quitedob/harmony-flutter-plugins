本文主要介绍了多UI实例涉及的概念，以及使用[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)的方法替换全局接口的原因，并提供了相应的替换方案。

## 基本概念

**UI实例：** UI实例是用于管理用户界面的对象，主要负责组件、布局、动画以及交互事件等UI功能的管理。每个窗口对象都会创建并管理一个UI实例。

**UI上下文：** UI上下文是指UI实例运行环境的抽象概念，UI功能在UI上下文中运行，其效果最终反映在相应的UI实例中。

**全局接口：** ArkUI提供的一系列全局接口，这些接口在调用时无需显式指定UI实例或组件。它们会根据调用发生时所在的UI上下文，自动作用于相应的UI实例。

**调用作用域：** 调用作用域是确保UI实例在异步任务执行过程中维持正确上下文关联的核心机制。该机制通过建立明确的上下文标识体系，保证异步操作能够准确关联到其归属的UI实例。其工作机制分为下面四步：

* 标识注册：UI实例初始化时自动生成唯一标识符。
* 上下文绑定：UI实例发起的任务自动携带实例标识。
* 作用域保护：在异步边界（包括NAPI调用、Promise回调、Worker通信等）维持标识传递。
* 上下文恢复：异步任务执行时恢复其关联的UI实例标识。

下图展示了多线程下的异步任务执行场景。以Task 1为例，最初在Thread-1执行，执行途中向Thread-2抛出Task 1.2，抛出Task的同时携带了UI上下文标识，Task 1.2执行完成后又再次向Thread-3抛出Task 1.3，Task 1.3执行后重新向Thread-1抛出Task 1.4。同一Thread可能先后执行来自不同窗口的Task，执行Task时，根据Task的UI上下文标识确认当前Task属于哪一个窗口，确保异步操作能够关联到正确的UI实例。

**图1** 调用作用域原理图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/92/v3/fNxeOhsGR6mXRZxUiN5JEg/zh-cn_image_0000002540771368.png?HW-CC-KV=V1&HW-CC-Date=20260414T035540Z&HW-CC-Expire=86400&HW-CC-Sign=91DF78563DA296BA545A76DF6845B09909C982EBADADE7C8961CBFBB1C4A0ED7)

## UI上下文不明确

UI上下文不明确是指调用ArkUI全局接口时，调用点无法明确识别UI实例的问题。

当前的系统支持两种[应用模型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/application-models)——FA模型和Stage模型。在FA模型中，每个UI实例拥有独立的ArkTS引擎，全局接口可以通过ArkTS引擎跟踪到对应的UI实例上，因此不存在UI上下文不明确的问题。

在Stage模型中，一个ArkTS引擎中可运行多个ArkUI实例。全局接口通过分析调用链中的上下文信息来确定当前UI上下文，异步接口和非UI接口可能导致UI上下文跟踪失败。

为了保证全局接口的相关功能正常，开发者应当使用UIContext的接口替换全局接口。

下图展示了Stage模型下ArkTS引擎和UI上下文的对应关系，一个ArkTS引擎中存在两个[Ability](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/abilitykit-overview)，这些Ability对应了三个窗口，三个窗口各自对应一个ArkUI实例。

**图2** 多实例关系图

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7d/v3/oUWJPfRMRtCmwAY3U-Bg1w/zh-cn_image_0000002571291663.png?HW-CC-KV=V1&HW-CC-Date=20260414T035540Z&HW-CC-Expire=86400&HW-CC-Sign=92F832BE738083CEA56C3F703BA752ECC9EB2CA7DE33D62F2ECC98036FB60DAB)

## UIContext接口替换全局接口的关系

部分多实例替代接口如下表所示，UIContext实例支持的全量接口以[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)中描述为准。

示例代码使用的接口中，[isAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#isavailable20)从API version 20开始生效，其余接口从API version 18开始生效。

展开

| 全局接口 | 替代接口 | 说明 |
| --- | --- | --- |
| @ohos.animator | createAnimator | 自定义动画控制器 |
| @ohos.arkui.componentSnapshot | getComponentSnapshot | 组件截图 |
| @ohos.arkui.componentUtils | getComponentUtils | 组件工具类 |
| @ohos.arkui.dragController | getDragController | 拖拽控制器 |
| @ohos.arkui.inspector | getUIInspector | 组件布局回调 |
| @ohos.arkui.observer | getUIObserver | 无感监听 |
| @ohos.font | getFont | 自定义字体 |
| @ohos.measure | getMeasureUtil | 文本计算 |
| @ohos.mediaquery | getMediaQuery | 媒体查询 |
| @ohos.promptAction | getPromptAction | 弹窗 |
| @ohos.router | getRouter | 页面路由 |
| AlertDialog | showAlertDialog | 警告弹窗 |
| ActionSheet | showActionSheet | 列表选择弹窗 |
| CalendarPickerDialog | 不支持 | 日历选择器弹窗 |
| DatePickerDialog | showDatePickerDialog | 日期滑动选择弹窗 |
| TimePickerDialog | showTimePickerDialog | 时间滑动选择器弹窗 |
| TextPickerDialog | showTextPickerDialog | 文本滑动选择器弹窗 |
| ContextMenu | getContextMenuController | 菜单控制 |
| vp2px/px2vp/fp2px/px2fp/lpx2px/px2lpx | vp2px/px2vp/fp2px/px2fp/lpx2px/px2lpx | 像素单位转换 |
| focusControl | getFocusControl | 焦点控制 |
| cursorControl | getCursorControl | 光标控制 |
| getContext | getHostContext | 获取当前的Ability的Context |
| LocalStorage.getShared | getSharedLocalStorage | 获取Ability传递的Storage |
| animateTo | animateTo | 显式动画 |
| animateToImmediately | 不支持 | 显式立即动画 |

## 常见UIContext接口替换全局接口的场景

以下UIContext接口替换全局接口示例以[像素单位](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)接口为例。

### 通过自定义组件获取UIContext

当全局接口在[自定义组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-js-custom-components)的成员方法或组件生命周期方法等其他作用域中，且this指向自定义组件时，可以通过调用自定义组件的成员方法[getUIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-api#getuicontext)来获取UIContext对象。

说明

1. 在异步调用的回调方法中使用getUIContext，或者该接口的起始调用不在当前页面时，可能会在自定义组件销毁后调用接口，从而导致返回undefined。
2. 该方法只能通过this调用，不能通过new关键字创建的自定义组件对象调用。
3. 通过在[自定义声明式节点 (BuilderNode)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode)中创建的自定义节点获取的UIContext与创建BuilderNode的UIContext指向同一个UI实例。

使用全局接口，该接口已经废弃，推荐使用下方的UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // pages/NewGlobal.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. @Entry
7. @Component
8. struct Index {
9. build() {
10. RelativeContainer() {
11. Text('Calculate 20vp to px')
12. .fontWeight(FontWeight.Bold)
13. .alignRules({
14. center: { anchor: '__container__', align: VerticalAlign.Center },
15. middle: { anchor: '__container__', align: HorizontalAlign.Center }
16. })
17. .onClick(() => {
18. let pxValue = vp2px(20);
19. })
20. }
21. .height('100%')
22. .width('100%')
23. }
24. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';

3. const DOMAIN = 0x0000;

5. @Entry
6. @Component
7. struct Index {
8. build() {
9. RelativeContainer() {
10. Text('Calculate 20vp to px')
11. .fontWeight(FontWeight.Bold)
12. .alignRules({
13. center: { anchor: '__container__', align: VerticalAlign.Center },
14. middle: { anchor: '__container__', align: HorizontalAlign.Center }
15. })
16. .onClick(() => {
17. let uiContext = this.getUIContext();
18. let pxValue = uiContext.vp2px(20);
19. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
20. })
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```

[NewGlobal.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/NewGlobal.ets#L15-L42)

### 通过窗口对象获取UIContext对象

开发者可以通过窗口对象的[getUIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#getuicontext10)方法获取UIContext对象。

说明

1. 必须在UI实例创建完成后，才可以通过窗口对象的getUIContext方法获取UIContext。建议在loadContent的成功回调中调用，以确保UI实例准备就绪。
2. vp2px/px2vp在UI实例未创建时会获取默认值进行计算，替换时可考虑获取当前默认的[Display](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#display)对象的逻辑像素密度进行计算结果，可参考[像素单位转换接口替换为UIContext接口](/consumer/cn/doc/harmonyos-guides/arkts-global-interface#像素单位转换接口替换为uicontext接口)。

使用全局接口：

收起

自动换行

深色代码主题

复制

```
1. // entryability/EntryAbility.ets
2. import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { window } from '@kit.ArkUI';

6. const DOMAIN = 0x0000;

8. export default class EntryAbility extends UIAbility {
9. // ...

11. onWindowStageCreate(windowStage: window.WindowStage): void {
12. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
13. // 在loadContent前调用时，vp2px会根据屏幕默认像素密度返回计算结果。
14. let pxValue = vp2px(20);
15. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
16. windowStage.loadContent('pages/Index', (err) => {
17. if (err.code) {
18. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
19. return;
20. }
21. // 需要在回调中调用。
22. let pxValue = vp2px(20);
23. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
24. });
25. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
26. pxValue = vp2px(20);
27. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
28. }

30. // ...
31. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { ContextUtils } from '../Common/ContextUtils';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';
6. import { PixelUtils } from '../Common/UIContext';
7. import { PixelUtil } from '../Common/Utils';

9. const DOMAIN = 0x0000;

11. export default class EntryAbility extends UIAbility {
12. // ···
13. onWindowStageCreate(windowStage: window.WindowStage): void {
14. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
15. let localStorage = new LocalStorage();
16. localStorage.setOrCreate('message', 'Message from Storage')
17. hilog.info(DOMAIN, 'testTag', '%{public}s', 'success localStorage');
18. let window = windowStage.getMainWindowSync();
19. // 注册主窗的回调。
20. WindowUIContextUtils.registerWindowCallback(window);
21. // 在loadContent前调用getUIContext时，UI实例未创建，存在异常。
22. windowStage.loadContent('pages/Index', localStorage, (err) => {
23. // 需要在loadContent完成后获取UIContext。
24. if (err.code) {
25. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
26. return;
27. }
28. // 需要在回调中调用。
29. try {
30. let uiContext = window.getUIContext();
31. PixelUtils.setUIContext(uiContext);
32. // 主窗获焦可能早于loadContent完成，需要在成功后设置保证有效。
33. WindowUIContextUtils.setActiveUIContext(uiContext)
34. if (!uiContext) {
35. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
36. return;
37. }
38. let pxValue = uiContext.vp2px(20);
39. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
40. } catch (e) {
41. hilog.error(DOMAIN, 'testTag', `Can't get UIContext, ${e}`);
42. }
43. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
44. hilog.info(DOMAIN, 'testTag', `loadContent success.`);
45. });
46. }

48. // ···

50. onWindowStageDestroy(): void {
51. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
52. // 在窗口销毁时需要移除失效的UIContext
53. PixelUtil.removeUIContext();
54. }

56. // ···
57. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L16-L136)

### 通过静态方法获取UIContext对象

从API version 22开始，开发者可以通过UIContext类静态方法如[resolveUIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#resolveuicontext22)获取UIContext对象。

说明

* 优先通过自定义组件或者窗口对象获取UIContext，通过这两种方式获取不受调用作用域的影响，且获取到的是可预期的UIContext实例。
* 使用该方案替换全局接口可以保证在同一个调用点保持与原先全局接口行为一致，但是不能保证能够作用到期望的UI实例上。

下面举例说明在不同时机使用静态方法替换全局接口的方法。

使用全局接口：

收起

自动换行

深色代码主题

复制

```
1. // entryability/EntryAbility.ets
2. import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { window } from '@kit.ArkUI';

6. const DOMAIN = 0x0000;

8. export default class EntryAbility extends UIAbility {
9. // ...

11. onWindowStageCreate(windowStage: window.WindowStage): void {
12. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
13. // 在loadContent前调用，此时无UI实例，vp2px会根据屏幕默认像素密度返回计算结果。
14. let pxValue = vp2px(20);
15. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
16. windowStage.loadContent('pages/Index', (err) => {
17. if (err.code) {
18. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
19. return;
20. }
21. // 在loadContent异步回调中调用，此时有UI实例，但上下文不明确，此时会根据主窗的像素密度返回计算结果。
22. let pxValue = vp2px(20);
23. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
24. });
25. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
26. pxValue = vp2px(20);
27. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
28. }

30. // ...
31. }
```

收起

自动换行

深色代码主题

复制

```
1. // pages/Index.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. @Entry
7. @Component
8. struct Index {
9. build() {
10. RelativeContainer() {
11. Text('Calculate 20vp to px')
12. .fontWeight(FontWeight.Bold)
13. .alignRules({
14. center: { anchor: '__container__', align: VerticalAlign.Center },
15. middle: { anchor: '__container__', align: HorizontalAlign.Center }
16. })
17. .onClick(() => {
18. // 在有UI实例且上下文明确时调用，此时会根据此时UI上下文对应的实例的像素密度返回计算结果。
19. let pxValue = vp2px(20);
20. })
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```

使用静态方法替换：

收起

自动换行

深色代码主题

复制

```
1. // entryability/EntryAbility.ets
2. import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
3. import { hilog } from '@kit.PerformanceAnalysisKit';
4. import { window, UIContext } from '@kit.ArkUI';

6. const DOMAIN = 0x0000;

8. export default class EntryAbility extends UIAbility {
9. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
10. try {
11. this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
12. } catch (err) {
13. hilog.error(DOMAIN, 'testTag', 'Failed to set colorMode. Cause: %{public}s', JSON.stringify(err));
14. }
15. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
16. }

18. onDestroy(): void {
19. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
20. }

22. onWindowStageCreate(windowStage: window.WindowStage): void {
23. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
24. // 在loadContent前调用，此时无UI实例，vp2px会根据屏幕默认像素密度返回计算结果。
25. // 此时UIContext对象的解析策略ResolveStrategy为UNDEFINED。
26. let resolvedUIContext = UIContext.resolveUIContext();
27. let pxValue = resolvedUIContext.vp2px(20);
28. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
29. windowStage.loadContent('pages/Index', (err) => {
30. if (err.code) {
31. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
32. return;
33. }
34. // 在loadContent异步回调中调用，此时有UI实例，但上下文不明确，此时会根据主窗的像素密度返回计算结果。
35. // 此时UIContext对象的解析策略ResolveStrategy为UNIQUE。
36. let resolvedUIContext = UIContext.resolveUIContext();
37. let pxValue = resolvedUIContext.vp2px(20);
38. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
39. });
40. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
41. pxValue = vp2px(20);
42. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
43. }

45. onWindowStageDestroy(): void {
46. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
47. }

49. onForeground(): void {
50. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onForeground');
51. }

53. onBackground(): void {
54. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onBackground');
55. }
56. }
```

收起

自动换行

深色代码主题

复制

```
1. // pages/Index.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { UIContext } from '@kit.ArkUI';

5. const DOMAIN = 0x0000;

7. @Entry
8. @Component
9. struct Index {
10. build() {
11. RelativeContainer() {
12. Text('Calculate 20vp to px')
13. .fontWeight(FontWeight.Bold)
14. .alignRules({
15. center: { anchor: '__container__', align: VerticalAlign.Center },
16. middle: { anchor: '__container__', align: HorizontalAlign.Center }
17. })
18. .onClick(() => {
19. // 在有UI实例且上下文明确时调用，此时会根据此时UI上下文对应的实例的像素密度返回计算结果。
20. // 此时UIContext对象的解析策略ResolveStrategy为CALLING_SCOPE。
21. let resolvedUIContext = UIContext.resolveUIContext();
22. let pxValue = resolvedUIContext.vp2px(20);
23. })
24. }
25. .height('100%')
26. .width('100%')
27. }
28. }
```

[resolveUIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#resolveuicontext22)接口获取UIContext的逻辑与下面示例通过基础查询接口组合使用的代码逻辑是等价的。

收起

自动换行

深色代码主题

复制

```
1. function GetUIContextByAtomicInterface(): UIContext {
2. let callingScopeUIContext = UIContext.getCallingScopeUIContext();
3. if (callingScopeUIContext) {
4. hilog.info(0x00, 'testTag', `Get UIContext of calling scope.`)
5. return callingScopeUIContext;
6. }
7. let allContexts = UIContext.getAllUIContexts();
8. let length = allContexts.length;
9. if (length === 1) {
10. hilog.info(0x00, 'testTag', `Get UIContext of unique UI instance.`)
11. return allContexts[0];
12. }
13. let lastFocusedUIContext = UIContext.getLastFocusedUIContext();
14. if (lastFocusedUIContext) {
15. hilog.info(0x00, 'testTag', `Get UIContext of last focused instance.`)
16. return lastFocusedUIContext;
17. }
18. let lastForegroundUIContext = UIContext.getLastForegroundUIContext();
19. if (lastForegroundUIContext) {
20. hilog.info(0x00, 'testTag', `Get UIContext of last foregrounded instance.`)
21. return lastForegroundUIContext;
22. }
23. if (length !== 0) {
24. hilog.info(0x00, 'testTag', `Get UIContext with maximum instanceId.`)
25. return allContexts[length - 1];
26. }
27. hilog.info(0x00, 'testTag', `Get UIContext of undefined calling scope.`)
28. return new UIContext();
29. }
```

如果开发者希望自定义UIContext的获取策略，或者需要排除上述默认规则中的某些判断条件，建议直接使用上述代码中涉及的基础查询接口进行组合替换，以实现更符合业务场景的上下文获取逻辑。

### 在封装的接口中获取UI上下文

开发者通常在封装的接口中使用全局接口。对于这类场景，应优先考虑增加UIContext类型的入参。如果应用只有一个窗口，可以使用全局存储对象来保存UIContext。

说明

1. 创建UI实例是异步过程，需要在回调中调用窗口对象的getUIContext来获取UIContext对象。
2. 建议增加可选的UIContext入参，方便调用者传入UIContext。
3. vp2px/px2vp在UI实例未创建时会获取默认值进行计算，替换时可考虑获取当前默认的Display对象的逻辑像素密度进行计算，可参考[像素单位转换接口替换为UIContext接口](/consumer/cn/doc/harmonyos-guides/arkts-global-interface#像素单位转换接口替换为uicontext接口)。

使用全局接口：

收起

自动换行

深色代码主题

复制

```
1. // common/Utils.ets
2. class PixelUtils {
3. static vp2px(vpValue: number) : number {
4. return vp2px(vpValue);
5. }

7. static fp2px(fpValue: number) : number | undefined {
8. return fp2px(fpValue);
9. }

11. static lpx2px(lpxValue: number) : number | undefined {
12. return lpx2px(lpxValue);
13. }
14. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // common/Utils.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. export class PixelUtil {
7. static uiContext: UIContext | undefined;

9. static setUIContext(uiContext: UIContext): void {
10. PixelUtil.uiContext = uiContext;
11. }

13. static removeUIContext(): void {
14. PixelUtil.uiContext = undefined;
15. }

17. static vp2px(vpValue: number, uiContext?: UIContext): number | undefined {
18. let _uiContext = uiContext ?? PixelUtil.uiContext;
19. if (!_uiContext || !_uiContext.isAvailable()) {
20. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
21. return undefined;
22. }
23. return _uiContext.vp2px(vpValue)
24. }

26. static fp2px(fpValue: number, uiContext?: UIContext): number | undefined {
27. let _uiContext = uiContext ?? PixelUtil.uiContext;
28. if (!_uiContext || !_uiContext.isAvailable()) {
29. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
30. return undefined;
31. }
32. return _uiContext.fp2px(fpValue)
33. }

35. lpx2px(lpxValue: number, uiContext?: UIContext): number | undefined {
36. let _uiContext = uiContext ?? PixelUtil.uiContext;
37. if (!_uiContext || !_uiContext.isAvailable()) {
38. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
39. return undefined;
40. }
41. return _uiContext.lpx2px(lpxValue)
42. }
43. }
```

[Utils.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/Common/Utils.ets#L15-L60)

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { ContextUtils } from '../Common/ContextUtils';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';
6. import { PixelUtils } from '../Common/UIContext';
7. import { PixelUtil } from '../Common/Utils';

9. const DOMAIN = 0x0000;

11. export default class EntryAbility extends UIAbility {
12. // ···
13. onWindowStageCreate(windowStage: window.WindowStage): void {
14. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
15. let localStorage = new LocalStorage();
16. localStorage.setOrCreate('message', 'Message from Storage')
17. hilog.info(DOMAIN, 'testTag', '%{public}s', 'success localStorage');
18. let window = windowStage.getMainWindowSync();
19. // 注册主窗的回调。
20. WindowUIContextUtils.registerWindowCallback(window);
21. // 在loadContent前调用getUIContext时，UI实例未创建，存在异常。
22. windowStage.loadContent('pages/Index', localStorage, (err) => {
23. // 需要在loadContent完成后获取UIContext。
24. if (err.code) {
25. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
26. return;
27. }
28. // 需要在回调中调用。
29. try {
30. let uiContext = window.getUIContext();
31. PixelUtils.setUIContext(uiContext);
32. // 主窗获焦可能早于loadContent完成，需要在成功后设置保证有效。
33. WindowUIContextUtils.setActiveUIContext(uiContext)
34. if (!uiContext) {
35. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
36. return;
37. }
38. let pxValue = uiContext.vp2px(20);
39. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
40. } catch (e) {
41. hilog.error(DOMAIN, 'testTag', `Can't get UIContext, ${e}`);
42. }
43. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
44. hilog.info(DOMAIN, 'testTag', `loadContent success.`);
45. });
46. }

48. // ···

50. onWindowStageDestroy(): void {
51. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
52. // 在窗口销毁时需要移除失效的UIContext
53. PixelUtil.removeUIContext();
54. }

56. // ···
57. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L16-L136)

使用替换的封装接口时，建议在能够获取UIContext的场景下传入UIContext参数。

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { PixelUtil } from '../Common/Utils';

4. const DOMAIN = 0x0000;

6. @Entry
7. @Component
8. struct Index {
9. build() {
10. RelativeContainer() {
11. Text('Calculate 20vp to px')
12. .fontWeight(FontWeight.Bold)
13. .alignRules({
14. center: { anchor: '__container__', align: VerticalAlign.Center },
15. middle: { anchor: '__container__', align: HorizontalAlign.Center }
16. })
17. .onClick(() => {
18. let pxValue = PixelUtil.vp2px(20, this.getUIContext());
19. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
20. })
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```

[VpPage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/VpPage.ets#L16-L43)

无法获取UIContext时，可考虑直接调用。

收起

自动换行

深色代码主题

复制

```
1. let pxValue = PixelUtils.vp2px(20);
2. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L37-L40)

### 应用存在多窗时，通过最近获焦窗口获取UIContext

当应用有多个窗口且无法直接获取UIContext时，可通过最近获得焦点的窗口获取其UIContext。

说明

1. 该方案将跟踪最近一个获得焦点的窗口，在调用具体功能时，该窗口可能处于失焦状态。
2. 创建窗口时需要调用registerWindowCallback注册回调。

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // common/WindowUtils.ets
2. import { display, window } from '@kit.ArkUI';
3. import { hilog } from '@kit.PerformanceAnalysisKit';

5. const DOMAIN = 0x0000;

7. export class WindowUIContextUtils {
8. public static activeUIContext: UIContext | undefined;

10. static registerWindowCallback(windowClass: window.Window): void {
11. try {
12. windowClass.on('windowEvent', (event: window.WindowEventType) => {
13. if (event === window.WindowEventType.WINDOW_ACTIVE) {
14. try {
15. let uiContext = windowClass.getUIContext();
16. WindowUIContextUtils.activeUIContext = uiContext;
17. } catch (exception) {
18. hilog.error(DOMAIN, 'testTag', `Can't get UIContext, ${exception}`);
19. }
20. }
21. });
22. } catch (exception) {
23. console.error(`Failed to unregister callback. Cause: ${exception}`);
24. }
25. }

27. static unregisterWindowCallback(windowClass: window.Window): void {
28. windowClass.off('windowEvent');
29. }

31. static setActiveUIContext(uiContext: UIContext): void {
32. WindowUIContextUtils.activeUIContext = uiContext;
33. }

35. static vp2px(vpValue: number, uiContext?: UIContext): number {
36. let _uiContext = uiContext ?? WindowUIContextUtils.activeUIContext;
37. if (!_uiContext || !_uiContext.isAvailable()) {
38. let displayClass = display.getDefaultDisplaySync();
39. let density = displayClass.densityPixels;
40. return vpValue * density;
41. }

43. return _uiContext.vp2px(vpValue);
44. }
45. }
```

[WindowUtils.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/Common/WindowUtils.ets#L15-L62)

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { ContextUtils } from '../Common/ContextUtils';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';
6. import { PixelUtils } from '../Common/UIContext';
7. import { PixelUtil } from '../Common/Utils';

9. const DOMAIN = 0x0000;

11. export default class EntryAbility extends UIAbility {
12. // ···
13. onWindowStageCreate(windowStage: window.WindowStage): void {
14. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
15. let localStorage = new LocalStorage();
16. localStorage.setOrCreate('message', 'Message from Storage')
17. hilog.info(DOMAIN, 'testTag', '%{public}s', 'success localStorage');
18. let window = windowStage.getMainWindowSync();
19. // 注册主窗的回调。
20. WindowUIContextUtils.registerWindowCallback(window);
21. // 在loadContent前调用getUIContext时，UI实例未创建，存在异常。
22. windowStage.loadContent('pages/Index', localStorage, (err) => {
23. // 需要在loadContent完成后获取UIContext。
24. if (err.code) {
25. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
26. return;
27. }
28. // 需要在回调中调用。
29. try {
30. let uiContext = window.getUIContext();
31. PixelUtils.setUIContext(uiContext);
32. // 主窗获焦可能早于loadContent完成，需要在成功后设置保证有效。
33. WindowUIContextUtils.setActiveUIContext(uiContext)
34. if (!uiContext) {
35. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
36. return;
37. }
38. let pxValue = uiContext.vp2px(20);
39. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
40. } catch (e) {
41. hilog.error(DOMAIN, 'testTag', `Can't get UIContext, ${e}`);
42. }
43. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
44. hilog.info(DOMAIN, 'testTag', `loadContent success.`);
45. });
46. }

48. onWindowStageWillDestroy(windowStage: window.WindowStage) {
49. let window = windowStage.getMainWindowSync();
50. hilog.info(DOMAIN, 'testTag', '%{public}s', `The main window: ${window}`);
51. // 注销主窗的回调。
52. WindowUIContextUtils.unregisterWindowCallback(window);
53. }

55. // ···
56. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L17-L135)

收起

自动换行

深色代码主题

复制

```
1. // pages/WindowTestPage.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';

7. const DOMAIN = 0x0000;

9. @Entry
10. @Component
11. struct Index {
12. private subWindow: window.Window | undefined;

14. build() {
15. Column() {
16. Text('Create SubWindow')
17. .onClick(() => {
18. let config: window.Configuration = {
19. name: 'test',
20. windowType: window.WindowType.TYPE_DIALOG,
21. ctx: this.getUIContext().getHostContext()
22. };
23. try {
24. window.createWindow(config, (err: BusinessError, windowClass: window.Window) => {
25. const errCode: number = err.code;
26. if (errCode) {
27. hilog.error(DOMAIN, 'testTag', `Failed to create the window. Cause: ${errCode}`);
28. return;
29. }
30. // 在窗口创建后注册回调。
31. this.subWindow = windowClass;
32. try {
33. windowClass.setUIContent('pages/Index', () => {
34. WindowUIContextUtils.registerWindowCallback(windowClass);
35. windowClass.resize(500, 1000);
36. windowClass.showWindow();
37. });
38. } catch (exception) {
39. hilog.error(DOMAIN, 'testTag', `Failed to setUIContent. Cause : ${exception}`);
40. }
41. });
42. } catch (exception) {
43. hilog.error(DOMAIN, 'testTag', `Failed to create the window. Cause : ${exception}`);
44. }
45. })
46. Text('Destroy SubWindow')
47. .onClick(() => {
48. if (this.subWindow) {
49. // 在窗口销毁前注销回调。
50. WindowUIContextUtils.unregisterWindowCallback(this.subWindow);
51. this.subWindow.destroyWindow();
52. }
53. })
54. }
55. .height('100%')
56. .width('100%')
57. }
58. }
```

[WindowTestPage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/WindowTestPage.ets#L15-L75)

### 执行绑定UI实例的闭包

对于UIContext中没有提供替代的接口（例如CalendarPickerDialog），或者开发者自定义实现的业务行为与多实例相关，需要和实例绑定时（例如，一个代码段），可以使用UIContext对象[runScopedTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#runscopedtask)方法执行闭包。

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. @Entry
2. @Component
3. struct CalendarPickerDialogPage {
4. private selectedDate: Date = new Date('2025-10-01');

6. build() {
7. RelativeContainer() {
8. Button('Show CalendarPicker Dialog')
9. .alignRules({
10. center: { anchor: '__container__', align: VerticalAlign.Center },
11. middle: { anchor: '__container__', align: HorizontalAlign.Center }
12. })
13. .onClick(() => {
14. let uiContext = this.getUIContext();
15. uiContext.runScopedTask(() => {
16. CalendarPickerDialog.show({
17. selected: this.selectedDate,
18. backgroundColor: Color.White,
19. backgroundBlurStyle: BlurStyle.NONE,
20. shadow: ShadowStyle.OUTER_FLOATING_SM
21. });
22. });
23. })
24. }
25. .height('100%')
26. .width('100%')
27. }
28. }
```

[CalendarPickerDialogPage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/CalendarPickerDialogPage.ets#L15-L45)

## 特殊全局接口替换示例

部分全局接口在替换为UIContext接口时，需要考虑一些特殊的调用场景。

### 像素单位转换接口替换为UIContext接口

因为不同的UI实例可以有不同的转换系数，[像素单位](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)接口计算结果依赖UI实例。其中fp2px/px2fp/lpx2px/px2lpx接口在无有效UI上下文时会返回undefined，而vp2px/px2vp接口在无有效UI上下文时，会获取默认屏幕像素密度进行计算。

展开

| 像素单位转换接口调用时机 | 接口行为 | 可能与预期不一致的场景 |
| --- | --- | --- |
| 主窗口创建并调用loadContent或setUIContent前。 | 没有合适的UI实例。  px2vp/vp2px使用默认屏幕的density进行换算，返回结果。  fp2px/px2fp/lpx2px/px2lpx返回undefined。 | px2vp/vp2px在多屏场景下可能与预期不一致。如预期以主屏的逻辑像素密度计算结果，实际以扩展屏的像素密度计算结果。 |
| 在loadContent或setUIContent后，且在UI的回调函数中。 | 根据UI跟踪的调用域（Scope）找到具体的UI实例，使用该UI实例关联的信息进行计算。 | 无 |
| 应用单Ability单窗口的场景，并在loadContent或setUIContent之后，但在非UI的其他异步回调中调用。 | 无法根据UI跟踪的调用域（Scope）找到具体的UI实例，但根据当前单例场景可以确定唯一UI实例，使用该UI实例关联的信息进行计算。 | 无 |
| 多Ability或多窗口的多UI实例场景，在loadContent或setUIContent调用之后，但在其他异步回调中调用。 | 无法根据UI跟踪的调用域（Scope）找到具体的UI实例，也无法确定唯一实例。接口按照最近获焦、最近前台、最近创建的优先级依次查找匹配的UI实例，并根据UI实例关联的信息进行计算。 | 多实例场景可能存在作用实例和预期不一致。如预期以主窗所处屏幕的逻辑像素密度计算结果，实际以子窗所处屏幕的像素密度计算结果。 |
| 所有的窗口销毁，无UI实例后。 | 没有合适的UI实例。  px2vp/vp2px使用默认屏幕的density进行换算，返回结果。  fp2px/px2fp/lpx2px/px2lpx返回undefined。 | px2vp/vp2px在多屏场景下可能与预期不一致。如预期以扩展屏的逻辑像素密度计算结果，实际以主屏的像素密度计算结果。 |

在实际的开发场景中，全局接口可能在UI实例创建前被调用。此时，在替换vp2px/px2vp时，开发者可以通过[display.getDefaultDisplaySync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displaygetdefaultdisplaysync9)获取当前默认屏幕的逻辑像素密度计算结果；替换fp2px/px2fp/lpx2px/px2lpx接口时，可以直接返回undefined，以保证行为的一致性。

使用全局接口：

收起

自动换行

深色代码主题

复制

```
1. // Common/UIContext.ets
2. export class PixelUtils {
3. static vp2px(vpValue: number) : number {
4. return vp2px(vpValue);
5. }

7. static fp2px(fpValue: number) : number | undefined {
8. return fp2px(fpValue);
9. }

11. static lpx2px(lpxValue: number) : number | undefined {
12. return lpx2px(lpxValue);
13. }
14. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. import { hilog } from '@kit.PerformanceAnalysisKit';
2. import { display } from '@kit.ArkUI';

4. const DOMAIN = 0x0000;

6. export class PixelUtils {
7. public static uiContext: UIContext | undefined;

9. static setUIContext(uiContext: UIContext): void {
10. PixelUtils.uiContext = uiContext;
11. }

13. static vp2px(vpValue: number, uiContext?: UIContext): number | undefined {
14. let _uiContext = uiContext ?? PixelUtils.uiContext;
15. if (!_uiContext || !_uiContext.isAvailable()) {
16. let displayClass = display.getDefaultDisplaySync();
17. let density = displayClass.densityPixels;
18. return vpValue * density;
19. }
20. return _uiContext.vp2px(vpValue)
21. }

23. static fp2px(fpValue: number, uiContext?: UIContext): number | undefined {
24. let _uiContext = uiContext ?? PixelUtils.uiContext;
25. if (!_uiContext || !_uiContext.isAvailable()) {
26. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
27. return undefined;
28. }
29. return _uiContext.fp2px(fpValue)
30. }

32. lpx2px(lpxValue: number, uiContext?: UIContext): number | undefined {
33. let _uiContext = uiContext ?? PixelUtils.uiContext;
34. if (!_uiContext || !_uiContext.isAvailable()) {
35. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
36. return undefined;
37. }
38. return _uiContext.lpx2px(lpxValue)
39. }
40. }
```

[UIContext.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/Common/UIContext.ets#L15-L57)

### 获取Ability的Context

[getContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-getcontext)接口用于在UI页面中获取对应UI实例所属Ability的Context，因此依赖于UI实例。

展开

| getContext接口的调用时机 | 接口行为 | 可能与预期不一致的场景 |
| --- | --- | --- |
| 主窗口创建并调用loadContent或setUIContent前。 | 没有合适的UI实例，返回undefined。 | 无 |
| 主窗口创建并调用loadContent或setUIContent后，且传入自定义组件对象。 | 跟踪自定义组件所属的UI实例，返回该UI实例所属Ability的Context。 | 无 |
| 在loadContent或setUIContent后，且在UI的回调函数中。 | 根据UI跟踪的调用域（Scope）找到具体的UI实例，返回该UI实例所属Ability的Context。 | 无 |
| 应用单Ability单窗口的场景，并在loadContent或setUIContent之后，但在非UI的其他异步回调中调用且未传入自定义组件对象。 | 无法根据UI跟踪的调用域（Scope）找到具体的UI实例，但根据当前单例场景可以确定唯一UI实例，返回该UI实例所属Ability的Context。 | 无 |
| 多Ability或多窗口的多UI实例场景，在loadContent或setUIContent调用之后，但在其他异步回调中调用且未传入自定义组件对象。 | 无法根据UI跟踪的调用域(Scope)找到具体的UI实例，也无法确定唯一实例。接口按照最近获焦、最近前台、最近创建的优先级依次查找匹配的UI实例，返回该UI实例所属Ability的Context。 | 多实例场景可能与预期不一致。如存在两个Ability时，预期返回第一个创建的Ability的Context，实际返回第二个创建的Ability的Context。 |
| 所有的窗口销毁，无UI实例后。 | 没有合适的UI实例，返回undefined。 | 无 |

在单Ability场景中，建议直接获取Ability的context属性。

使用全局接口，该接口已经废弃，推荐使用下方的UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // Common/ContextUtils.ets
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0x0000;

6. @Entry
7. @Component
8. struct GetContextPage {
9. @State message: string = 'Hello World';

11. build() {
12. RelativeContainer() {
13. Text(this.message)
14. .fontWeight(FontWeight.Bold)
15. .alignRules({
16. center: { anchor: '__container__', align: VerticalAlign.Center },
17. middle: { anchor: '__container__', align: HorizontalAlign.Center }
18. })
19. .onClick(() => {
20. // 需要确保传入的是自定义组件对象。
21. let context = getContext(this);
22. hilog.info(DOMAIN, 'testTag', `The context is ${context}`);
23. })
24. }
25. .height('100%')
26. .width('100%')
27. }
28. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. export class ContextUtils {
2. public static context: Context | undefined;

4. static setContext(context: Context): void {
5. ContextUtils.context = context;
6. }

8. static getContext(uiContext?: UIContext): Context | undefined {
9. if (uiContext) {
10. return uiContext.getHostContext();
11. }

13. return ContextUtils.context;
14. }
15. }
```

[ContextUtils.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/Common/ContextUtils.ets#L15-L31)

接口的默认返回值设置为Ability的成员属性context。

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { ContextUtils } from '../Common/ContextUtils';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';
6. import { PixelUtils } from '../Common/UIContext';
7. import { PixelUtil } from '../Common/Utils';

9. const DOMAIN = 0x0000;

11. export default class EntryAbility extends UIAbility {
12. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
13. // ···
14. ContextUtils.setContext(this.context);
15. hilog.info(DOMAIN, 'testTag', '%{public}s', 'setContext success');
16. // ···
17. }

19. onDestroy(): void {
20. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onDestroy');
21. }
22. // ···
23. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L18-L134)

在UI界面中，建议传入UIContext，以保证符合预期或直接调用getHostContext。

收起

自动换行

深色代码主题

复制

```
1. import { ContextUtils } from '../Common/ContextUtils';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. const DOMAIN = 0xF811;

6. @Entry
7. @Component
8. struct Index {
9. build() {
10. Column() {
11. Text('getContext')
12. .onClick(() => {
13. let context = ContextUtils.getContext(this.getUIContext());
14. hilog.info(DOMAIN, 'testTag', `The context is ${context}`);
15. })
16. }
17. .height('100%')
18. .width('100%')
19. }
20. }
```

[ContextPage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/ContextPage.ets#L16-L38)

无UI场景直接返回窗口创建时设置的默认返回值。

收起

自动换行

深色代码主题

复制

```
1. let context = ContextUtils.getContext();
2. hilog.info(DOMAIN, 'testTag', `The context is ${context}`);
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L45-L48)

### LocalStorage替换为UIContext的接口

LocalStorage是页面级的UI状态存储，通过@Entry装饰器接收的参数可以在页面内共享同一个LocalStorage实例。使用全局接口时，开发者使用[getShared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-state-management#getshareddeprecated)向@Entry装饰器传递LocalStorage对象。使用UIContext接口后，无法直接获取UIContext对象，可以将[EntryOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-entry#entryoptions10)的useSharedStorage参数设置为true，以使用共享的LocalStorage实例对象。

使用全局接口，该接口已经废弃，推荐使用下方的UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // pages/LocalStoragePage
2. @Entry({storage: LocalStorage.getShared()})
3. @Component
4. struct LocalStoragePage {
5. @LocalStorageLink('message') message: string = 'Hello World';

7. build() {
8. RelativeContainer() {
9. Text(this.message)
10. .id('LocalStoragePageHelloWorld')
11. .fontWeight(FontWeight.Bold)
12. .alignRules({
13. center: { anchor: '__container__', align: VerticalAlign.Center },
14. middle: { anchor: '__container__', align: HorizontalAlign.Center }
15. })
16. .onClick(() => {
17. let storage = LocalStorage.getShared();
18. if (storage) {
19. storage.setOrCreate('message', 'onClick is called.')
20. }
21. })
22. }
23. .height('100%')
24. .width('100%')
25. }
26. }
```

使用UIContext接口替换：

收起

自动换行

深色代码主题

复制

```
1. // pages/LocalStoragePage
2. @Entry({ useSharedStorage: true })
3. @Component
4. struct LocalStoragePage {
5. @LocalStorageLink('message') message: string = 'Hello World';

7. build() {
8. RelativeContainer() {
9. Text(this.message)
10. .id('LocalStoragePageHelloWorld')
11. .fontWeight(FontWeight.Bold)
12. .alignRules({
13. center: { anchor: '__container__', align: VerticalAlign.Center },
14. middle: { anchor: '__container__', align: HorizontalAlign.Center }
15. })
16. .onClick(() => {
17. let uiContext = this.getUIContext();
18. let storage = uiContext.getSharedLocalStorage();
19. if (storage) {
20. storage.setOrCreate('message', 'onClick is called.');
21. this.message = 'LocalStoragePageHelloWorld';
22. }
23. })
24. }
25. .height('100%')
26. .width('100%')
27. }
28. }
```

[LocalStoragePage.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/pages/LocalStoragePage.ets#L15-L45)

使用共享的LocalStorage对象需要在loadContent时传入LocalStorage，详细可参考[LocalStorage：页面级UI状态存储](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-localstorage)。

收起

自动换行

深色代码主题

复制

```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { ContextUtils } from '../Common/ContextUtils';
5. import { WindowUIContextUtils } from '../Common/WindowUtils';
6. import { PixelUtils } from '../Common/UIContext';
7. import { PixelUtil } from '../Common/Utils';

9. const DOMAIN = 0x0000;

11. export default class EntryAbility extends UIAbility {
12. // ···
13. onWindowStageCreate(windowStage: window.WindowStage): void {
14. hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
15. let localStorage = new LocalStorage();
16. localStorage.setOrCreate('message', 'Message from Storage')
17. hilog.info(DOMAIN, 'testTag', '%{public}s', 'success localStorage');
18. let window = windowStage.getMainWindowSync();
19. // 注册主窗的回调。
20. WindowUIContextUtils.registerWindowCallback(window);
21. // 在loadContent前调用getUIContext时，UI实例未创建，存在异常。
22. windowStage.loadContent('pages/Index', localStorage, (err) => {
23. // 需要在loadContent完成后获取UIContext。
24. if (err.code) {
25. hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
26. return;
27. }
28. // 需要在回调中调用。
29. try {
30. let uiContext = window.getUIContext();
31. PixelUtils.setUIContext(uiContext);
32. // 主窗获焦可能早于loadContent完成，需要在成功后设置保证有效。
33. WindowUIContextUtils.setActiveUIContext(uiContext)
34. if (!uiContext) {
35. hilog.error(DOMAIN, 'testTag', `Can't get UIContext`);
36. return;
37. }
38. let pxValue = uiContext.vp2px(20);
39. hilog.info(DOMAIN, 'testTag', `20vp equals to ${pxValue}px`);
40. } catch (e) {
41. hilog.error(DOMAIN, 'testTag', `Can't get UIContext, ${e}`);
42. }
43. // loadContent是异步接口，在此处调用不能保证UI实例已经创建成功。
44. hilog.info(DOMAIN, 'testTag', `loadContent success.`);
45. });
46. }

48. // ···
49. }
```

[EntryAbility.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkUISample/UIContext/entry/src/main/ets/entryability/EntryAbility.ets#L19-L133)