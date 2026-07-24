## 场景介绍

健康记录，记录健康记录的基本信息，包括健康记录的起止时间，数据类型，字段值，明细数据等，支持写入、读取和删除，每条健康记录需要关联数据源。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1840517577188)(healthSequence: [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)[] | [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)): Promise<void> | 保存健康记录，入参为单个[HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)或[HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)数组。 |
| [readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section85773683317)<T extends [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)>(request: [HealthSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section11615192919718)): Promise<T[]> | 查询健康记录，通过[HealthSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section11615192919718)设置查询条件，可按数据类型，字段、时间范围等条件查询。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section15631966119)(healthSequence: [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532) | [HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)[]): Promise<void> | 删除健康记录，按入参删除指定的健康记录，可传入单个[HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)或[HealthSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1038711561532)数组。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section8621134581112)(request: [HealthSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1779165141119) | [HealthSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1779165141119)[]): Promise<void> | 删除健康记录，按[HealthSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1779165141119)删除，可设置数据类型、时间范围、数据源等删除条件。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权对应数据类型权限后，才有权限调用接口操作相关数据类型数据。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

### 保存用户的健康记录

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 获取dataSourceId，参考[管理数据源](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-datasource-manage)，插入一个新的数据源或读取已有数据源。
3. 创建健康记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let healthSequence: healthStore.healthSequenceHelper.sleepRecord.Model = {
   2. summaries: {
   3. fallAsleepTime: 1695740400000, // 2023-09-26 23:00:00
   4. wakeupTime: 1695769200000, // 2023-09-27 7:00:00
   5. sleepScore: 80,
   6. wakeCount: 2,
   7. sleepType: 1,
   8. shallowDuration: 14400,
   9. deepDuration: 7200,
   10. dreamDuration: 7200,
   11. wakeDuration: 0,
   12. duration: 28800
   13. },
   14. dataType: healthStore.healthSequenceHelper.sleepRecord.DATA_TYPE,
   15. // insertDataSource插入数据源接口返回的dataSourceId，或读取已有数据源的dataSourceId
   16. dataSourceId: 'xxx',
   17. localDate: '09/26/2023',
   18. startTime: 1695740400000,
   19. endTime: 1695769200000,
   20. timeZone: '+0800',
   21. modifiedTime: 1695769200000,
   22. details: {
   23. sleepSegment: [
   24. {
   25. startTime: 1695740400000, // 2023-09-26 23:00:00
   26. endTime: 1695747600000, // 2023-09-27 01:00:00
   27. sleepStatus: 2
   28. },
   29. {
   30. startTime: 1695747600000, // 2023-09-27 01:00:00
   31. endTime: 1695754800000, // 2023-09-27 03:00:00
   32. sleepStatus: 1
   33. },
   34. {
   35. startTime: 1695754800000, // 2023-09-27 03:00:00
   36. endTime: 1695762000000, // 2023-09-27 05:00:00
   37. sleepStatus: 3
   38. },
   39. {
   40. startTime: 1695762000000, // 2023-09-27 05:00:00
   41. endTime: 1695769200000, // 2023-09-27 07:00:00
   42. sleepStatus: 2
   43. }
   44. ]
   45. }
   46. }
   ```
4. 调用[saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1840517577188)方法执行保存数据请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.saveData(healthSequence);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in saving data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to save data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```

### 读取用户的健康记录

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

### 删除指定的健康记录

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 查询待删除健康记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let healthSequenceReadRequest: healthStore.HealthSequenceReadRequest = {
   2. healthSequenceDataType: healthStore.healthSequenceHelper.sleepRecord.DATA_TYPE,
   3. startTime: 1695740400000,
   4. endTime: 1695769200000
   5. }
   6. const healthSequences = await healthStore.readData(healthSequenceReadRequest);
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section15631966119)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. for (let index = 0; index < healthSequences.length; index++) {
   3. const healthSequence = healthSequences[index];
   4. await healthStore.deleteData(healthSequence);
   5. }
   6. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   7. } catch (err) {
   8. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   9. }
   ```

### 根据请求删除用户健康记录

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建删除健康记录请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. const healthSequenceDeleteRequest: healthStore.HealthSequenceDeleteRequest= {
   2. healthSequenceDataType: healthStore.healthSequenceHelper.sleepRecord.DATA_TYPE,
   3. startTime: 1695740400000,
   4. endTime: 1695769200000
   5. }
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section8621134581112)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.deleteData(healthSequenceDeleteRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```