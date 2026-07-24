## 场景介绍

读取最新一条锻炼记录。

## 约束与限制

从5.1.1(19) Release版本开始支持。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section410015582312)<T extends [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)>(request: [ExerciseSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17500162113363)): Promise<T[]> | 查询最新一条锻炼记录。 |

说明

当前ExerciseSequenceReadRequest里的时间参数暂不生效，仅支持返回手表侧最新一条数据。

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
2. 创建查询请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 查询跑步记录
   2. const sequenceReadRequest: healthStore.ExerciseSequenceReadRequest<healthStore.exerciseSequenceHelper.running.DetailFields> = {
   3. startTime: 1698040800000,
   4. endTime: 1698042600000,
   5. exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
   6. count: 1,
   7. sortOrder: 1,
   8. readOptions: {
   9. withPartialDetails: ['exerciseHeartRate', 'altitude']
   10. }
   11. };
   ```
3. 调用[readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section410015582312)方法执行查询请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const runningSequences = await healthStore.readData<healthStore.exerciseSequenceHelper.running.Model>(sequenceReadRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in reading data.');
   4. runningSequences.forEach((runningSequence) => {
   5. hilog.info(0x0000, 'testTag', `the start time is ${runningSequence.startTime}.`);
   6. hilog.info(0x0000, 'testTag', `the end time is ${runningSequence.endTime}.`);
   7. Object.keys(runningSequence.summaries).forEach((key) => {
   8. Object.keys(runningSequence.summaries[key]).forEach((fieldName) => {
   9. hilog.info(0x0000, 'testTag', `the summaries of ${key} field ${fieldName} is ${runningSequence.summaries[key][fieldName]}.`);
   10. });
   11. });
   12. });
   13. } catch (err) {
   14. hilog.error(0x0000, 'testTag', `Failed to read data. Code: ${err.code}, message: ${err.message}`);
   15. }
   ```