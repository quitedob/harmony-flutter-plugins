## 场景介绍

运动健康采样数据(SamplePoint)，表示在某时刻（或一段时间）采集到的特定数据类型的样本，由时间、样本值及采样的数据源组成，支持保存、读取和删除等操作。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section16752162611317)(sampleData: [SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)[] | [SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)): Promise<void> | 保存运动健康采样数据，入参为单个[SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)或[SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)数组。 |
| [readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218)<T extends [SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)>(request: [SamplePointReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1419811172920)): Promise<T[]> | 查询运动健康采样数据，通过[SamplePointReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1419811172920)设置查询条件，可按数据类型，字段、时间范围等条件查询。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17146141511121)(samplePoint: [SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323) | [SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)[]): Promise<void> | 删除运动健康采样数据，按入参删除指定的采样数据，可传入单个[SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)或[SamplePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section341712418323)数组。 |
| [deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1502957143419)(request: [SamplePointDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1680218365918) | [SamplePointDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1680218365918)[]): Promise<void> | 删除运动健康采样数据，按[SamplePointDeleteRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1680218365918)条件删除，可设置数据类型、时间范围、数据源等删除条件。 |
| [aggregateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section4878142184216)<T extends [AggregateResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section19656142151412)>(request: [AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section599483722019) | [AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section599483722019)[]): Promise<T[]> | 聚合查询运动健康采样数据，通过[AggregateRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section599483722019)设置查询的数据类型、聚合策略。 |

说明

aggregateData接口读取今日日常活动数据，数据上报存在延时，读取实时日常活动数据建议使用[读取实时三环数据](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-three-ring-read)接口。

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权对应数据类型权限后，才有权限调用接口操作相关数据类型数据。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

### 保存用户的运动健康数据

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
3. 创建运动健康采样数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let samplePoint: healthStore.samplePointHelper.bodyTemperature.Model = {
   2. dataType: healthStore.samplePointHelper.bodyTemperature.DATA_TYPE,
   3. startTime: 1698633801000,
   4. endTime: 1698633801000,
   5. localDate: '10/30/2023',
   6. timeZone: '+0800',
   7. modifiedTime: 1698633801000,
   8. // insertDataSource插入数据源接口返回的dataSourceId，或读取已有数据源的dataSourceId
   9. dataSourceId: 'xxx',
   10. fields: {
   11. bodyTemperature: 39
   12. }
   13. }
   ```
4. 调用[saveData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section16752162611317)方法执行保存数据请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.saveData(samplePoint);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in saving data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to save data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```

### 读取用户的运动健康数据

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
   1. let samplePointReadRequest: healthStore.SamplePointReadRequest = {
   2. samplePointDataType: healthStore.samplePointHelper.bodyTemperature.DATA_TYPE,
   3. startTime: 1698633801000,
   4. endTime: 1698633801000,
   5. fields: {
   6. bodyTemperature: 39
   7. }
   8. }
   ```
3. 调用[readData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section193411928192218)方法执行查询请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let samplePoints = await healthStore.readData(samplePointReadRequest);
   3. samplePoints.forEach((samplePoint) => {
   4. hilog.info(0x0000, 'testTag', `Succeeded in reading data, the bodyTemperature is ${samplePoint.fields.bodyTemperature}.`);
   5. });
   6. } catch (err) {
   7. hilog.error(0x0000, 'testTag', `Failed to read data. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```

### 删除指定的运动健康采样数据

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```

2. 查询待删除的运动健康采样数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let samplePointReadRequest: healthStore.SamplePointReadRequest = {
   2. samplePointDataType: healthStore.samplePointHelper.bodyTemperature.DATA_TYPE,
   3. startTime: 1698633801000,
   4. endTime: 1698633801000
   5. }
   6. let samplePoints: healthStore.SamplePoint[] = await healthStore.readData(samplePointReadRequest);
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17146141511121)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. for (let index = 0; index < samplePoints.length; index++) {
   3. const samplePoint = samplePoints[index];
   4. await healthStore.deleteData(samplePoint);
   5. }
   6. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   7. } catch (err) {
   8. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   9. }
   ```

### 根据请求删除用户运动健康数据

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
   1. let samplePointDeleteRequest: healthStore.SamplePointDeleteRequest = {
   2. dataType: healthStore.samplePointHelper.bodyTemperature.DATA_TYPE,
   3. startTime: 1698633801000,
   4. endTime: 1698633801000
   5. }
   ```
3. 调用[deleteData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section17146141511121)方法执行删除请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.deleteData(samplePointDeleteRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in deleting data.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to delete data. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```

### 聚合查询

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建聚合查询请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let aggregateRequest: healthStore.AggregateRequest<healthStore.samplePointHelper.dailyActivities.AggregateFields> = {
   2. dataType: healthStore.samplePointHelper.dailyActivities.DATA_TYPE,
   3. metrics: {
   4. step: ['sum'],
   5. calorie: ['sum'],
   6. distance: ['sum'],
   7. climbHighAltitude:['sum'],
   8. isIntensity: ['sum'],
   9. isStand: ['sum']
   10. },
   11. groupBy: {
   12. unitType: healthStore.GroupUnitType.DAY
   13. },
   14. startLocalDate: '10/30/2023',
   15. endLocalDate: '10/30/2023'
   16. }
   ```
3. 调用[aggregateData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section4878142184216)方法执行查询请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const aggregateResults = await healthStore.aggregateData<healthStore.samplePointHelper.dailyActivities.AggregateResult>(aggregateRequest);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in reading data.');
   4. aggregateResults.forEach((aggregateResult) => {
   5. hilog.info(0x0000, 'testTag', `the start time is ${aggregateResult.startTime}.`);
   6. hilog.info(0x0000, 'testTag', `the end time is ${aggregateResult.endTime}.`);
   7. Object.keys(aggregateResult.fields).forEach((fieldName) => {
   8. hilog.info(0x0000, 'testTag', `the sum of ${fieldName} is ${aggregateResult.fields[fieldName].sum}.`);
   9. });
   10. });
   11. } catch (err) {
   12. hilog.error(0x0000, 'testTag', `Failed to read data. Code: ${err.code}, message: ${err.message}`);
   13. }
   ```