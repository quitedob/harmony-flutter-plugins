## 场景介绍

锻炼记录，记录用户一次活动的基本信息，包括锻炼的起止时间，运动类型，统计数据，详情数据等，支持写入、读取和删除，每条锻炼记录数据需要关联数据源。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1924917579222)(exerciseSequence: [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)[] | [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)): Promise<void> | 保存锻炼记录，入参为单个[ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)或[ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)数组。 |
| [readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section410015582312)<T extends [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)>(request: [ExerciseSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17500162113363)): Promise<T[]> | 查询锻炼记录，通过[ExerciseSequenceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17500162113363)设置查询条件，可按数据类型，字段、时间范围等条件查询。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section9995200190)(exerciseSequence: [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316) | [ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)[]): Promise<void> | 删除锻炼记录，按入参删除指定的锻炼记录，可传入单个[ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)或[ExerciseSequence](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17704373316)数组。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section14926161311104)(request: [ExerciseSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section207708111867) | [ExerciseSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section207708111867)[]): Promise<void> | 删除锻炼记录，按[ExerciseSequenceDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section207708111867)删除，可设置数据类型、时间范围、数据源等删除条件。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权对应数据类型权限后，才有权限调用接口操作相关数据类型数据。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

### 保存用户的锻炼记录

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
3. 创建锻炼记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 构造跑步记录
   2. const startTime = 1698040800000; // 2023-10-23 14:00:00
   3. const endTime = 1698042600000; // 2023-10-23 14:30:00

   5. const runningSequence: healthStore.exerciseSequenceHelper.running.Model = {
   6. dataType: healthStore.exerciseSequenceHelper.DATA_TYPE,
   7. // insertDataSource插入数据源接口返回的dataSourceId，或读取已有数据源的dataSourceId
   8. dataSourceId: 'xxx',
   9. startTime: startTime, // 2023-10-23 14:00:00
   10. endTime: endTime, // 2023-10-23 14:30:00
   11. localDate: '10/23/2023',
   12. timeZone: '+0800',
   13. modifiedTime: new Date().getTime(),
   14. exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
   15. duration: 1800,
   16. summaries: {
   17. distance: {
   18. totalDistance: 2000
   19. },
   20. calorie: {
   21. totalCalories: 20
   22. },
   23. speed: {
   24. avg: 5,
   25. max: 6
   26. }
   27. },
   28. details: {
   29. exerciseHeartRate: [
   30. {
   31. startTime: startTime,
   32. bpm: 88
   33. },
   34. {
   35. startTime: startTime + 5000,
   36. bpm: 89
   37. }
   38. ],
   39. speed: [
   40. {
   41. startTime: startTime,
   42. speed: 2.5
   43. },
   44. {
   45. startTime: startTime + 5000,
   46. speed: 2.3
   47. }
   48. ],
   49. altitude: [
   50. {
   51. startTime: startTime,
   52. altitude: 100
   53. },
   54. {
   55. startTime: startTime + 5000,
   56. altitude: 101
   57. }
   58. ]
   59. }
   60. };
   ```
4. 调用[saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1924917579222)方法执行保存数据请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.saveData(runningSequence);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in saving data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to save data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```

### 读取用户的锻炼记录

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

### 删除指定的锻炼记录

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 查询待删除的锻炼记录。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 查询跑步记录
   2. const sequenceReadRequest: healthStore.ExerciseSequenceReadRequest<healthStore.exerciseSequenceHelper.running.DetailFields> = {
   3. startTime: 1698040800000,
   4. endTime: 1698042600000,
   5. exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE
   6. };
   7. const runningSequences = await healthStore.readData<healthStore.exerciseSequenceHelper.running.Model>(sequenceReadRequest);
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section9995200190)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. for (let index = 0; index < runningSequences.length; index++) {
   3. const runningSequence = runningSequences[index];
   4. await healthStore.deleteData(runningSequence);
   5. }
   6. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   7. } catch (err) {
   8. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   9. }
   ```

### 根据请求删除用户锻炼记录

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建删除请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let exerciseSequenceDeleteRequest: healthStore.ExerciseSequenceDeleteRequest= {
   2. exerciseType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE,
   3. startTime: 1698633801000,
   4. endTime: 1698633801000
   5. }
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section14926161311104)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.deleteData(exerciseSequenceDeleteRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```