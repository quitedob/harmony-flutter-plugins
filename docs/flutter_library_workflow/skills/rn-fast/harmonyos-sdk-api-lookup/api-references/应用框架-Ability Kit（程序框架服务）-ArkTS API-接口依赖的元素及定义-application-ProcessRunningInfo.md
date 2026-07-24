运行进程信息，可以通过appManager中[getProcessRunningInfos](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-appmanager#appmanagergetprocessrunninginfosdeprecated)方法来获取运行进程信息。

说明

* 本模块接口从API version 9 开始废弃，建议使用[ProcessInformation9+](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-processinformation)替代。
* 本模块首批接口从API version 8 开始支持。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import appManager from '@ohos.application.appManager';
```

## 属性

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityRuntime.Mission

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| pid | number | 否 | 否 | 进程ID。 |
| uid | number | 否 | 否 | 应用程序的UID。 |
| processName | string | 否 | 否 | 进程名称。 |
| bundleNames | Array<string> | 否 | 否 | 进程中所有运行的Bundle名称。 |

**示例：**



```
1. import appManager from '@ohos.application.appManager';
2. import { BusinessError } from '@ohos.base';

4. appManager.getProcessRunningInfos().then((data) => {
5. console.info(`success: ${JSON.stringify(data)}`);
6. }).catch((error: BusinessError) => {
7. console.error(`failed: ${JSON.stringify(error)}`);
8. });
```