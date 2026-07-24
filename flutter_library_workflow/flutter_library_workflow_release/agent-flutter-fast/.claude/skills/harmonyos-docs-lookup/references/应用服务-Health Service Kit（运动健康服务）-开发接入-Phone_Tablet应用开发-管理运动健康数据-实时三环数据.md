## 场景介绍

实时三环数据，包括实时步数，活动热量，锻炼时长，活动小时数以及目标类数据。

说明

此接口使用日常活动数据类型读权限，参考[权限说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-permission-description)。

## OAuth权限

联盟卡片申请的权限名称：日常活动 > 日常活动数据（读）

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [readActivityReport](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice#section9432058162017)(): Promise<[ActivityReport](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice#section17562157135210)> | 读取实时三环数据。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权日常活动数据类型读权限（参考[权限说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-permission-description)）后，才有权限读取实时三环数据。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthService } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 调用[readActivityReport](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice#section9432058162017)方法读取实时三环数据，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const result: healthService.workout.ActivityReport = await healthService.workout.readActivityReport();

   4. hilog.info(0x0000, 'testTag', 'Succeeded in reading ActivityReport');
   5. Object.keys(result).forEach(key => {
   6. hilog.info(0x0000, 'testTag', `the ${key} is ${result[key]}`);
   7. });
   8. } catch(err) {
   9. hilog.error(0x0000, 'testTag', `Failed to read ActivityReport. Code: ${err.code}, message: ${err.message}`);
   10. }
   ```