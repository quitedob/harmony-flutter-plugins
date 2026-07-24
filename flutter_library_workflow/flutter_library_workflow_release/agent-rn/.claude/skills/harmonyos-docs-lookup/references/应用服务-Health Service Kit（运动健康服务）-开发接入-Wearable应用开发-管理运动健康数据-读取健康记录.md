## 场景介绍

读取最新一条健康记录。

## 约束与限制

从5.1.1(19) Release版本开始支持。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section85773683317)<T extends [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)>(request: [HealthSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section11615192919718)): Promise<T[]> | 查询最新一条健康记录。 |

说明

当前HealthSequenceReadRequest里的时间参数暂不生效，仅支持返回手表侧最新一条数据。

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权对应数据类型权限后，才有权限调用接口操作相关数据类型数据。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建查询健康记录请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let healthSequenceReadRequest: healthStore.HealthSequenceReadRequest = {
   2. healthSequenceDataType: healthStore.healthSequenceHelper.sleepRecord.DATA_TYPE,
   3. startTime: 1695740400000,
   4. endTime: 1695769200000,
   5. readOptions: {
   6. withDetails: true
   7. }
   8. }
   ```
3. 调用[readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section85773683317)方法执行查询请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const healthSequences = await healthStore.readData(healthSequenceReadRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in reading data.');
   4. healthSequences.forEach((healthSequence) => {
   5. hilog.info(0x0000, 'testTag', `the start time is ${healthSequence.startTime}.`);
   6. hilog.info(0x0000, 'testTag', `the end time is ${healthSequence.endTime}.`);
   7. Object.keys(healthSequence.summaries).forEach((key) => {
   8. hilog.info(0x0000, 'testTag', `the summaries of ${key} is ${healthSequence.summaries[key]}.`);
   9. });
   10. });
   11. } catch (err) {
   12. hilog.error(0x0000, 'testTag', `Failed to read data. Code: ${err.code}, message: ${err.message}`);
   13. }
   ```