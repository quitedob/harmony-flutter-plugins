朗读控件的窗口管理类。

**起始版本：** 5.0.0(12)

## 导入模块

PhonePC/2in1Tablet



```
1. import { WindowManager } from '@kit.SpeechKit';
```

## setWindowStage

PhonePC/2in1Tablet

static setWindowStage(windowStage: window.WindowStage): void

设置窗口管理器，在EntryAbility的onWindowStageCreate方法中调用，否则调用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/speech-textreader-api#init)初始化朗读控件将会失败。更多和设置EntryAbility相关的内容，请见[UIAbility组件生命周期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-lifecycle)。

**元服务API：** 从版本5.0.3(15)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.Component.TextReader

**设备行为差异：** 该接口在PC/2in1中可正常调用，在其他设备类型中无效果。

**起始版本：** 5.0.0(12)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| windowStage | [window.WindowStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage) | 是 | 窗口管理器。管理各个基本窗口单元，即[Window](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window)实例。 |

**示例：**



```
1. import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';
3. import { window } from '@kit.ArkUI';
4. import { WindowManager } from '@kit.SpeechKit';

6. export default class EntryAbility extends UIAbility {
7. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
8. hilog.info(0x0000, 'testTag', 'Ability onCreate');
9. }

11. onDestroy(): void {
12. hilog.info(0x0000, 'testTag', 'Ability onDestroy');
13. }

15. onWindowStageCreate(windowStage: window.WindowStage): void {
16. hilog.info(0x0000, 'testTag', 'Ability onWindowStageCreate');
17. WindowManager.setWindowStage(windowStage);

19. windowStage.loadContent('pages/Index', (err, data) => {
20. if (err) {
21. hilog.error(0x0000, 'testTag', `Failed to load the content. Code: ${err.code}, message: ${err.message}.`);
22. return;
23. }
24. hilog.info(0x0000, 'testTag', `Succeeded in loading the content. Data: ${JSON.stringify(data)}.` );
25. });
26. }

28. onWindowStageDestroy(): void {
29. hilog.info(0x0000, 'testTag', 'Ability onWindowStageDestroy');
30. }

32. onForeground(): void {
33. hilog.info(0x0000, 'testTag', 'Ability onForeground');
34. }

36. onBackground(): void {
37. hilog.info(0x0000, 'testTag', 'Ability onBackground');
38. }
39. }
```

## getWindowStage

PhonePC/2in1Tablet

static getWindowStage(): window.WindowStage

获取窗口管理器。

**元服务API：** 从版本5.0.3(15)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.Component.TextReader

**起始版本：** 5.0.0(12)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [window.WindowStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage) | 窗口管理器。管理各个基本窗口单元，即[Window](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window)实例。 |

**示例：**



```
1. import { WindowManager } from '@kit.SpeechKit';

3. try {
4. let windowManager = WindowManager.getWindowStage()
5. console.info(`TextReader succeeded in getting windowStage.`)
6. } catch (e) {
7. console.error(`TextReader failed to get windowStage. Code: ${e.code}, message: ${e.message}.`)
8. }
```