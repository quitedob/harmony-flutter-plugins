AbilityRunningInfo是记录Ability运行信息和状态的数据结构，通过[getAbilityRunningInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitymanager#abilitymanagergetabilityrunninginfos14)方法获取。

说明

本模块首批接口从API version 14开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { abilityManager } from '@kit.AbilityKit';
```

## AbilityRunningInfo

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| ability | [ElementName](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-elementname) | 否 | 否 | Ability的ElementName信息。 |
| pid | number | 否 | 否 | 进程ID。 |
| uid | number | 否 | 否 | 所属应用程序的UID。 |
| processName | string | 否 | 否 | 进程的名称。 |
| startTime | number | 否 | 否 | Ability的启动时间。 |
| abilityState | [abilityManager.AbilityState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitymanager#abilitystate14) | 否 | 否 | Ability的状态。 |

**示例：**



```
1. import { abilityManager } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. try {
5. abilityManager.getAbilityRunningInfos()
6. .then((data: abilityManager.AbilityRunningInfo[]) => {
7. for (let i = 0; i < data.length; i++) {
8. let abilityInfo = data[i];
9. console.info(`getAbilityRunningInfos success, data: ${JSON.stringify(abilityInfo)}`);
10. }
11. })
12. .catch((error: BusinessError) => {
13. console.error(`getAbilityRunningInfos fail, error code: ${JSON.stringify(error.code)}, error msg: ${JSON.stringify(error.message)}`);
14. })
15. } catch (e) {
16. let code = (e as BusinessError).code;
17. let msg = (e as BusinessError).message;
18. console.error(`getAbilityRunningInfos fail, error code: ${JSON.stringify(code)}, error msg: ${JSON.stringify(msg)}`);
19. }
```