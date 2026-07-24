## 场景介绍

数据源提供了应用或者设备的信息，每一个运动健康数据必须关联数据源信息，通过DataSourceId进行关联。

说明

DataSourceId在插入数据源信息时由平台生成，无法更改。

## 接口说明

展开

| 接口名 | 描述 |
| --- | --- |
| [insertDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section127081351115614)(dataSource: [DataSourceBase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section137003251628)): Promise<string> | 插入数据源，入参为数据源基类[DataSourceBase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section137003251628)。 |
| [readDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1275644314589)(request: [DataSourceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section13571101918281)): Promise<[DataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section197195291918)[]> | 查询数据源，通过[DataSourceReadRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section13571101918281)设置查询条件，可按DataSourceId/包名/设备UniqueId查询数据源。 |
| [updateDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section7156914939)(dataSource: [DataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section197195291918)): Promise<void> | 更新数据源，其中数据源的dataSourceId和uniqueId字段无法更新。 |

## 开发前检查

* 完成[申请运动健康服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)与[配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-configuration-client-id)。
* 接口首次调用前，需先使用[init](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#section1571935817328)方法进行初始化。
* 需先通过[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-add-permissions#section0247115178)接口引导用户授权，用户授权任意数据类型权限后，才有权限调用数据源相关接口。
* 错误码请参考[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，常见问题请参考[Health Service Kit常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-faqs)。

## 开发步骤

### 插入数据源

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建数据源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let dataSource: healthStore.DataSourceBase = {
   2. deviceInfo: {
   3. uniqueId: 'test',
   4. name: 'test', // 插入数据源时此字段必填
   5. category: healthStore.DeviceCategory.WEARABLE_BAND, // 插入数据源时此字段必填
   6. productId: '0554', // 插入数据源时此字段必填
   7. model: 'lotana',
   8. manufacturer: 'HUAWEI',
   9. mac: 'testDeviceMac',
   10. sn: 'testDeviceSn',
   11. hardwareVersion: '1',
   12. softwareVersion: '2',
   13. firmwareVersion: '3',
   14. udid: ''
   15. }
   16. }
   ```
3. 调用[insertDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section127081351115614)方法执行插入请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. const dataSourceId = await healthStore.insertDataSource(dataSource);
   3. hilog.info(0x0000, 'testTag', `Succeeded in inserting dataSource, the dataSourceId is ${dataSourceId}.`);
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to insert dataSource. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```

### 读取数据源

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建数据源读取请求。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let readSourceRequest: healthStore.DataSourceReadRequest = {
   2. deviceUniqueId: 'testudidupdate'
   3. }
   ```
3. 调用[readDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section1275644314589)方法执行查询请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. let dataSources = await healthStore.readDataSource(readSourceRequest);
   3. dataSources.forEach((dataSource) => {
   4. hilog.info(0x0000, 'testTag', `Succeeded in reading dataSource, the dataSourceId is ${dataSource.dataSourceId}.`);
   5. });
   6. } catch (err) {
   7. hilog.error(0x0000, 'testTag', `Failed to read dataSource. Code: ${err.code}, message: ${err.message}`);
   8. }
   ```

### 更新数据源

1. 导入运动健康服务功能模块及相关公共模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { healthStore } from '@kit.HealthServiceKit';
   2. import { hilog } from '@kit.PerformanceAnalysisKit';
   ```
2. 创建数据源。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let newDataSource: healthStore.DataSource = {
   2. deviceInfo: {
   3. uniqueId: 'test',
   4. name: 'test',
   5. category: healthStore.DeviceCategory.WEARABLE_BAND,
   6. productId: '0554',
   7. model: 'lotana',
   8. manufacturer: 'HUAWEI',
   9. mac: 'testDeviceMac',
   10. sn: 'testDeviceSn',
   11. hardwareVersion: '1',
   12. softwareVersion: '2',
   13. firmwareVersion: '3',
   14. // 修改udid
   15. udid: 'updateudid'
   16. },
   17. // 此处dataSourceId值为开发步骤插入数据源时，返回的dataSourceId
   18. dataSourceId: 'xxx'
   19. }
   ```
3. 调用[updateDataSource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore#zh-cn_topic_0000001768344397_section7156914939)方法执行更新请求，并处理返回结果。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. try {
   2. await healthStore.updateDataSource(newDataSource);
   3. hilog.info(0x0000, 'testTag', 'Succeeded in updating dataSource.');
   4. } catch (err) {
   5. hilog.error(0x0000, 'testTag', `Failed to update dataSource. Code: ${err.code}, message: ${err.message}`);
   6. }
   ```