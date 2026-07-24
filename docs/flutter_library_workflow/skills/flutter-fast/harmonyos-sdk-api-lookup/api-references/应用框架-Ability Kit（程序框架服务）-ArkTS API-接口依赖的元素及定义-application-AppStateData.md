定义应用状态信息，使用接口[on](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-appmanager#appmanageronapplicationstate14)注册应用状态变化监听后，当应用、进程或组件的状态变化时，系统通过[ApplicationStateObserver](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationstateobserver)的[onForegroundApplicationChanged](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationstateobserver#applicationstateobserveronforegroundapplicationchanged)等方法回调给开发者。

说明

本模块首批接口从API version 14 开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { appManager } from '@kit.AbilityKit';
```

## 属性

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| bundleName | string | 否 | 否 | Bundle名称。 |
| uid | number | 否 | 否 | 应用程序的uid。 |
| state | number | 否 | 否 | 应用状态。  0：初始化状态，应用正在初始化  1：就绪状态，应用已初始化完毕  2：前台状态，应用位于前台  3：获焦状态。（预留状态，当前暂不支持）  4：后台状态，应用位于后台  5：退出状态，应用已退出 |
| isSplitScreenMode | boolean | 否 | 否 | 判断应用是否处于分屏模式。  true:应用处于分屏模式。  false:应用不处于分屏模式。 |
| isFloatingWindowMode | boolean | 否 | 否 | 判断应用是否处于悬浮窗模式。  true:应用处于悬浮窗模式。  false:应用不处于悬浮窗模式。 |

**示例：**



```
1. import { appManager } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let applicationStateObserver: appManager.ApplicationStateObserver = {
5. onForegroundApplicationChanged(appStateData: appManager.AppStateData) {
6. console.info(`[appManager] onForegroundApplicationChanged: ${JSON.stringify(appStateData)}`);
7. console.info(`appStateData.bundleName: ${appStateData.bundleName}`);
8. console.info(`appStateData.uid: ${appStateData.uid}`);
9. console.info(`appStateData.state: ${appStateData.state}`);
10. console.info(`appStateData.isSplitScreenMode: ${appStateData.isSplitScreenMode}`);
11. console.info(`appStateData.isFloatingWindowMode: ${appStateData.isFloatingWindowMode}`);
12. },
13. onAbilityStateChanged(abilityStateData: appManager.AbilityStateData) {
14. console.info(`[appManager] onAbilityStateChanged: ${JSON.stringify(abilityStateData)}`);
15. },
16. onProcessCreated(processData: appManager.ProcessData) {
17. console.info(`[appManager] onProcessCreated: ${JSON.stringify(processData)}`);
18. },
19. onProcessDied(processData: appManager.ProcessData) {
20. console.info(`[appManager] onProcessDied: ${JSON.stringify(processData)}`);
21. },
22. onProcessStateChanged(processData: appManager.ProcessData) {
23. console.info(`[appManager] onProcessStateChanged: ${JSON.stringify(processData)}`);
24. },
25. onAppStarted(appStateData: appManager.AppStateData) {
26. console.info(`[appManager] onAppStarted: ${JSON.stringify(appStateData)}`);
27. },
28. onAppStopped(appStateData: appManager.AppStateData) {
29. console.info(`[appManager] onAppStopped: ${JSON.stringify(appStateData)}`);
30. }
31. };

33. try {
34. const observerId = appManager.on('applicationState', applicationStateObserver);
35. console.info(`[appManager] observerCode: ${observerId}`);
36. } catch (paramError) {
37. let code = (paramError as BusinessError).code;
38. let message = (paramError as BusinessError).message;
39. console.error(`[appManager] error code: ${code}, error msg: ${message}`);
40. }
```