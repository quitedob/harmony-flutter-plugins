## 场景介绍

当应用程序本地存储的关系型数据存在跨设备同步的需求时，可以将需要同步的表数据迁移到新的支持跨设备的表中，当然也可以在刚完成表创建时设置其支持跨设备。

## 基本概念

关系型数据库跨设备数据同步，支持应用在多设备间同步存储的关系型数据。

* 分布式表：支持组网内多设备间数据同步的数据库表。来自其他设备的数据将同步至本地，并通过与设备ID关联的表名进行存储。
* 数据同步：将设备上数据库中分布式表发生的变更，同步至组网内其他设备。有推送数据和拉取数据两种方式触发同步。
* 数据变化通知：组网内其他设备数据发生的变化同步至当前设备时，会执行已注册的回调函数。

## 运作机制

底层通信组件完成设备发现和认证，会通知上层应用程序设备上线。收到设备上线的消息后数据管理服务可以在两个设备之间建立加密的数据传输通道，利用该通道在两个设备之间进行数据同步。

### 数据跨设备同步机制

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/ohI2oKLbSEmLa_X21OHNiA/zh-cn_image_0000002571291123.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T033943Z&HW-CC-Expire=86400&HW-CC-Sign=89AAD2D8BA8828A0ED08FAFC6520D6C0092F1182825E1E7E4E5BBE9005278176)

业务将数据写入关系型数据库后，向数据管理服务发起同步请求。

数据管理服务从应用沙箱内读取待同步数据，根据对端设备的deviceId将数据发送到其他设备的数据管理服务。再由数据管理服务将数据写入同应用的数据库内。

### 数据变化通知机制

增、删、改数据库时，会给订阅者发送数据变化的通知。主要分为本地数据变化通知和分布式数据变化通知。

* **本地数据变化通知**：本地设备的应用内订阅数据变化通知，数据库增删改数据时，会收到通知。
* **分布式数据变化通知**：同一应用订阅组网内其他设备数据变化的通知，其他设备增删改数据时，本设备会收到通知。

### 数据同步存储机制

跨设备数据同步默认采用多设备协同表模式进行管理。在该模式下，各设备的数据将被隔离存储在独立的分布式表中，而非写入本地表，分布式表名为在原来表名前拼接对端设备的DeviceID标识符，如下图所示。

当某一设备接收到其他设备同步过来的数据时，这些数据将自动写入对应的分布式表中，可通过obtainDistributedTableName获取对应表名并进行查询。

需要注意的是，该模式下不支持对其他设备同步过来的数据进行修改。这一限制旨在保障数据一致性与同步逻辑的稳定性。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/PVIHJlD4Q4ydF-mUZlNvTg/zh-cn_image_0000002540611178.jpg?HW-CC-KV=V1&HW-CC-Date=20260414T033943Z&HW-CC-Expire=86400&HW-CC-Sign=0F308C30AC995A3CCD24C41D04EEDA2AC1751FFAA57F77BDF841E71376A26A8F)

## 约束限制

* 每个应用程序最多支持同时打开16个关系型分布式数据库。
* 单个数据库最多支持注册8个订阅数据变化的回调。
* 不支持将含有复合键的表设置为分布式表。

## 接口说明

以下是关系型设备协同分布式数据库跨设备数据同步功能的相关接口，更多接口及使用方式请见[@ohos.data.relationalStore (关系型数据库)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore)。

展开

| 接口名称 | 描述 |
| --- | --- |
| setDistributedTables(tables: Array<string>, callback: AsyncCallback<void>): void | 设置分布式同步表。 |
| sync(mode: SyncMode, predicates: RdbPredicates, callback: AsyncCallback<Array<[string, number]>>): void | 分布式数据同步。 |
| on(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void | 订阅分布式数据变化。 |
| off(event:'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void | 取消订阅分布式数据变化。 |
| obtainDistributedTableName(device: string, table: string, callback: AsyncCallback<string>): void | 根据本地数据库表名获取指定设备上的表名。 |
| remoteQuery(device: string, table: string, predicates: RdbPredicates, columns: Array<string> , callback: AsyncCallback<ResultSet>): void | 根据指定条件查询远程设备数据库中的数据。 |

## 开发步骤

说明

数据只允许向数据安全标签不高于对端设备安全等级的设备同步数据，具体规则可见[跨设备同步访问控制机制](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/access-control-by-device-and-data-level#跨设备同步访问控制机制)。

1. 导入模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { relationalStore } from '@kit.ArkData'; // 导入模块
   2. import { BusinessError } from '@kit.BasicServicesKit';
   3. import { distributedDeviceManager } from '@kit.DistributedServiceKit';
   4. import { hilog } from '@kit.PerformanceAnalysisKit';
   5. const DOMAIN = 0x0000;
   ```

   [RdbDataSync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkData/RelationalStore/DataSyncAndPersistence/entry/src/main/ets/pages/datasync/RdbDataSync.ets#L16-L24)
2. 请求权限。

   1. 需要申请ohos.permission.DISTRIBUTED\_DATASYNC权限，配置方式请参见[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。
   2. 同时需要在应用首次启动时弹窗向用户申请授权，使用方式请参见[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。
3. 创建关系型数据库，创建数据表，并将需要进行跨设备同步的数据表设置为分布式表。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. let store: relationalStore.RdbStore | undefined = undefined;
   2. // ...
   3. const STORE_CONFIG: relationalStore.StoreConfig = {
   4. name: 'RdbTest.db', // 数据库文件名
   5. securityLevel: relationalStore.SecurityLevel.S3 // 数据库安全级别
   6. };
   7. // 打开数据库并设置分布式表
   8. relationalStore.getRdbStore(context, STORE_CONFIG).then(async (rdbStore: relationalStore.RdbStore) => {
   9. store = rdbStore;
   10. await store.executeSql('CREATE TABLE IF NOT EXISTS EMPLOYEE (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, AGE INTEGER, SALARY REAL, CODES BLOB)');
   11. // 将已创建的表设置分布式表。
   12. await store.setDistributedTables(['EMPLOYEE']);
   13. }).catch((err: BusinessError) => {
   14. hilog.error(DOMAIN, 'rdbDataSync', `Get RdbStore failed, code is ${err.code}, message is ${err.message}`);
   15. });
   ```
4. 订阅组网内其他设备的数据变化消息。

   1. 调用[on('dataChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbstore#ondatachange)接口监听其他设备的数据变化，当数据变化同步至当前设备时，将执行订阅的回调方法，入参为数据发生变化的设备ID列表。
   2. 通过设备ID获取与设备对应的分布式表表名，查询对应设备分布式表中的数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 订阅组网内其他设备的数据变化消息
   2. if (store) {
   3. try {
   4. // 查询组网内的设备列表
   5. const deviceManager = distributedDeviceManager.createDeviceManager('com.example.rdbDataSync');
   6. const deviceList = deviceManager.getAvailableDeviceListSync();
   7. const devices: string[] = [];
   8. deviceList.forEach(item => {
   9. if (item.networkId) {
   10. devices.push(item.networkId);
   11. }
   12. });
   13. // 调用分布式数据订阅接口，注册数据库的观察者
   14. // 当分布式数据库中的数据发生更改时，将调用回调
   15. store.on('dataChange', relationalStore.SubscribeType.SUBSCRIBE_TYPE_REMOTE, async (devices) => {
   16. for (let i = 0; i < devices.length; i++) {
   17. let device = devices[i];
   18. if (!store) {
   19. return;
   20. }
   21. hilog.info(DOMAIN, 'rdbDataSync', `The data of device:${device} has been changed.`);
   22. // 获取device对应的分布式表名。
   23. const distributedTableName = await store.obtainDistributedTableName(device, 'EMPLOYEE');
   24. // 创建查询谓词，查询组网内设备分布式表的数据
   25. const predicates = new relationalStore.RdbPredicates(distributedTableName);
   26. const resultSet = await store.query(predicates);
   27. hilog.info(DOMAIN, 'rdbDataSync', `device ${device}, table EMPLOYEE rowCount is: ${resultSet.rowCount}`);
   28. }
   29. });
   30. } catch (err) {
   31. hilog.error(DOMAIN, 'rdbDataSync', `Failed to register observer. Code:${err.code},message:${err.message}`);
   32. }
   33. }
   ```
5. 同步当前设备数据变化至组网内其他设备。

   1. 当前设备分布式表中的数据发生变化后，调用RdbStore的[sync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbstore#sync-1)接口传入[SYNC\_MODE\_PUSH](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-e#syncmode)参数推送数据变化至其他设备。
   2. 通过谓词的[inDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbpredicates#indevices)方法指定推送的目标设备。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 同步当前设备数据变化至组网内其他设备
   2. if (store) {
   3. // 当前设备分布式数据表中插入新数据
   4. const ret = store.insertSync('EMPLOYEE', {
   5. name: 'sync_me',
   6. age: 18,
   7. salary: 666
   8. });
   9. hilog.info(DOMAIN, 'rdbDataSync', 'Insert to distributed table EMPLOYEE, result: ' + ret);
   10. // 查询组网内的设备列表
   11. const deviceManager = distributedDeviceManager.createDeviceManager('com.example.rdbDataSync');
   12. const deviceList = deviceManager.getAvailableDeviceListSync();
   13. const syncTarget: string[] = [];
   14. deviceList.forEach(item => {
   15. if (item.networkId) {
   16. syncTarget.push(item.networkId);
   17. }
   18. });
   19. if (syncTarget.length === 0) {
   20. hilog.error(DOMAIN, 'rdbDataSync', 'no device to sync');
   21. } else {
   22. // 构造用于同步分布式表的谓词对象
   23. const predicates = new relationalStore.RdbPredicates('EMPLOYEE');
   24. // 指定要同步的设备列表
   25. predicates.inDevices(syncTarget);
   26. try {
   27. // 调用同步数据的接口推送当前设备数据变化至组网内其他设备
   28. const result = await store.sync(relationalStore.SyncMode.SYNC_MODE_PUSH, predicates);
   29. hilog.info(DOMAIN, 'rdbDataSync', 'Push data success.');
   30. // 获取同步结果
   31. for (let i = 0; i < result.length; i++) {
   32. const deviceId = result[i][0];
   33. const syncResult = result[i][1];
   34. if (syncResult === 0) {
   35. hilog.info(DOMAIN, 'rdbDataSync', `device:${deviceId} sync success`);
   36. } else {
   37. hilog.error(DOMAIN, 'rdbDataSync', `device:${deviceId} sync failed, status:${syncResult}`);
   38. }
   39. }
   40. } catch (e) {
   41. hilog.error(DOMAIN, 'rdbDataSync', 'Push data failed, code: ' + e.code + ', message: ' + e.message);
   42. }
   43. }
   44. }
   ```

   [RdbDataSync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkData/RelationalStore/DataSyncAndPersistence/entry/src/main/ets/pages/datasync/RdbDataSync.ets#L85-L134)
6. 拉取组网内其他设备的数据变化。

   1. 当前设备可调用RdbStore的[sync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbstore#sync-1)接口传入[SYNC\_MODE\_PULL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-e#syncmode)参数拉取组网内其他设备的数据变化。
   2. 通过谓词的[inDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbpredicates#indevices)方法指定拉取的目标设备。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 拉取组网内其他设备的数据变化
   2. if (store) {
   3. // 查询组网内的设备列表
   4. const deviceManager = distributedDeviceManager.createDeviceManager('com.example.rdbDataSync');
   5. const deviceList = deviceManager.getAvailableDeviceListSync();
   6. const syncTarget: string[] = [];
   7. deviceList.forEach(item => {
   8. if (item.networkId) {
   9. syncTarget.push(item.networkId);
   10. }
   11. });
   12. if (syncTarget.length === 0) {
   13. hilog.error(DOMAIN, 'rdbDataSync', 'no device to pull data');
   14. } else {
   15. // 构造用于同步分布式表的谓词对象
   16. const predicates = new relationalStore.RdbPredicates('EMPLOYEE');
   17. // 指定要同步的设备列表
   18. predicates.inDevices(syncTarget);
   19. try {
   20. // 调用同步数据的接口拉取其他设备数据变化至当前设备
   21. const result = await store.sync(relationalStore.SyncMode.SYNC_MODE_PULL, predicates);
   22. hilog.info(DOMAIN, 'rdbDataSync', 'Pull data success.');
   23. // 获取同步结果
   24. for (let i = 0; i < result.length; i++) {
   25. const deviceId = result[i][0];
   26. const syncResult = result[i][1];
   27. if (syncResult === 0) {
   28. hilog.info(DOMAIN, 'rdbDataSync', `device:${deviceId} sync success`);
   29. } else {
   30. hilog.error(DOMAIN, 'rdbDataSync', `device:${deviceId} sync failed, status:${syncResult}`);
   31. }
   32. }
   33. } catch (e) {
   34. hilog.error(DOMAIN, 'rdbDataSync', 'Pull data failed, code: ' + e.code + ', message: ' + e.message);
   35. }
   36. }
   37. }
   ```

   [RdbDataSync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkData/RelationalStore/DataSyncAndPersistence/entry/src/main/ets/pages/datasync/RdbDataSync.ets#L136-L178)
7. 当数据未完成同步，或未触发数据同步时，可使用RdbStore的[remoteQuery](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-data-relationalstore-rdbstore#remotequery-1)方法查询组网内指定设备上分布式表中的数据。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. // 查询组网内指定设备上分布式表中的数据
   2. if (store) {
   3. // 查询组网内的设备列表
   4. const deviceManager = distributedDeviceManager.createDeviceManager('com.example.rdbDataSync');
   5. const deviceList = deviceManager.getAvailableDeviceListSync();
   6. const devices: string[] = [];
   7. deviceList.forEach(item => {
   8. if (item.networkId) {
   9. devices.push(item.networkId);
   10. }
   11. });
   12. if (devices.length === 0) {
   13. hilog.error(DOMAIN, 'rdbDataSync', 'no device to query data');
   14. return;
   15. }
   16. // 构造用于查询分布式表的谓词对象
   17. const predicates = new relationalStore.RdbPredicates('EMPLOYEE');
   18. try {
   19. // 查询组网内设备上的分布式表
   20. const resultSet = await store.remoteQuery(devices[0], 'EMPLOYEE', predicates, ['ID', 'NAME', 'AGE', 'SALARY', 'CODES']);
   21. hilog.info(DOMAIN, 'rdbDataSync', `ResultSet column names: ${resultSet.columnNames}, column count: ${resultSet.columnCount}`);
   22. } catch (e) {
   23. hilog.error(DOMAIN, 'rdbDataSync', 'Remote query failed, code: ' + e.code + ', message: ' + e.message);
   24. }
   25. }
   ```

   [RdbDataSync.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/HarmonyOS-feature-20251117/ArkData/RelationalStore/DataSyncAndPersistence/entry/src/main/ets/pages/datasync/RdbDataSync.ets#L180-L212)