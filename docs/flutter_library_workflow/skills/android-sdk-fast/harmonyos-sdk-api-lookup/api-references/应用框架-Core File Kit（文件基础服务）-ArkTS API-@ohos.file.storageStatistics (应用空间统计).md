该模块提供空间查询相关的常用功能：包括对内外卡的空间查询、对应用分类数据统计的查询、对应用数据的查询等。

说明

本模块首批接口从API version 8开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTV



```
1. import { storageStatistics } from '@kit.CoreFileKit';
```

## storageStatistics.getCurrentBundleStats9+

PhonePC/2in1TabletTV

getCurrentBundleStats(): Promise<BundleStats>

应用异步获取当前应用存储空间大小（单位为Byte），使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[BundleStats](/consumer/cn/doc/harmonyos-references/js-apis-file-storage-statistics#bundlestats9)> | Promise对象，返回指定卷上的应用存储空间大小（单位为Byte）。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The input parameter is invalid. Possible causes: Mandatory parameters are left unspecified. |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getCurrentBundleStats().then((BundleStats: storageStatistics.BundleStats) => {
3. console.info("getCurrentBundleStats successfully:" + JSON.stringify(BundleStats));
4. }).catch((err: BusinessError) => {
5. console.error("getCurrentBundleStats failed with error:"+ JSON.stringify(err));
6. });
```

## storageStatistics.getCurrentBundleStats9+

PhonePC/2in1TabletTV

getCurrentBundleStats(callback: AsyncCallback<BundleStats>): void

应用异步获取当前应用存储空间大小（单位为Byte），使用callback异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<[BundleStats](/consumer/cn/doc/harmonyos-references/js-apis-file-storage-statistics#bundlestats9)> | 是 | 获取指定卷上的应用存储空间大小之后的回调。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The input parameter is invalid. Possible causes: Mandatory parameters are left unspecified. |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getCurrentBundleStats((error: BusinessError, bundleStats: storageStatistics.BundleStats) => {
3. if (error) {
4. console.error("getCurrentBundleStats failed with error:" + JSON.stringify(error));
5. } else {
6. // do something
7. console.info("getCurrentBundleStats successfully:" + JSON.stringify(bundleStats));
8. }
9. });
```

## storageStatistics.getTotalSize15+

PhonePC/2in1TabletTV

getTotalSize(): Promise<number>

获取内置存储的总空间大小（单位为Byte），使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回内置存储的总空间大小（单位为Byte）。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getTotalSize().then((number: number) => {
3. console.info("getTotalSize successfully:" + JSON.stringify(number));
4. }).catch((err: BusinessError) => {
5. console.error("getTotalSize failed with error:"+ JSON.stringify(err));
6. });
```

## storageStatistics.getTotalSize15+

PhonePC/2in1TabletTV

getTotalSize(callback: AsyncCallback<number>): void

获取内置存储的总空间大小（单位为Byte），使用callback异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<number> | 是 | 获取内置存储的总空间大小之后的回调。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The input parameter is invalid. Possible causes: Mandatory parameters are left unspecified. |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getTotalSize((error: BusinessError, number: number) => {
3. if (error) {
4. console.error("getTotalSize failed with error:" + JSON.stringify(error));
5. } else {
6. // do something
7. console.info("getTotalSize successfully:" + number);
8. }
9. });
```

## storageStatistics.getTotalSizeSync15+

PhonePC/2in1TabletTV

getTotalSizeSync(): number

同步获取内置存储的总空间大小（单位为Byte）。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 返回内置存储的总空间大小（单位为Byte）。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. try {
3. let number = storageStatistics.getTotalSizeSync();
4. console.info("getTotalSizeSync successfully:" + JSON.stringify(number));
5. } catch (err) {
6. let error: BusinessError = err as BusinessError;
7. console.error("getTotalSizeSync failed with error:" + JSON.stringify(error));
8. }
```

## storageStatistics.getFreeSize15+

PhonePC/2in1TabletTV

getFreeSize(): Promise<number>

获取内置存储的可用空间大小（单位为Byte），使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回内置存储的可用空间大小（单位为Byte）。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getFreeSize().then((number: number) => {
3. console.info("getFreeSize successfully:" + JSON.stringify(number));
4. }).catch((err: BusinessError) => {
5. console.error("getFreeSize failed with error:" + JSON.stringify(err));
6. });
```

## storageStatistics.getFreeSize15+

PhonePC/2in1TabletTV

getFreeSize(callback: AsyncCallback<number>): void

获取内置存储的可用空间大小（单位为Byte），使用callback异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<number> | 是 | 获取内置存储的可用空间大小之后的回调。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The input parameter is invalid. Possible causes: Mandatory parameters are left unspecified. |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. storageStatistics.getFreeSize((error: BusinessError, number: number) => {
3. if (error) {
4. console.error("getFreeSize failed with error:" + JSON.stringify(error));
5. } else {
6. // do something
7. console.info("getFreeSize successfully:" + number);
8. }
9. });
```

## storageStatistics.getFreeSizeSync15+

PhonePC/2in1TabletTV

getFreeSizeSync(): number

同步获取内置存储的可用空间大小（单位为Byte）。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 返回内置存储的可用空间大小（单位为Byte）。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13900042 | Unknown error. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';
2. try {
3. let number = storageStatistics.getFreeSizeSync();
4. console.info("getFreeSizeSync successfully:" + JSON.stringify(number));
5. } catch (err) {
6. let error: BusinessError = err as BusinessError;
7. console.error("getFreeSizeSync failed with error:" + JSON.stringify(error));
8. }
```

## BundleStats9+

PhonePC/2in1TabletTV

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| appSize | number | 否 | 否 | 应用安装文件大小（单位为Byte）。 |
| cacheSize | number | 否 | 否 | 应用缓存文件大小（单位为Byte）。 |
| dataSize | number | 否 | 否 | 应用文件存储大小（除应用安装文件）（单位为Byte）。 |

## storageStatistics.getTotalInodes24+

PhonePC/2in1TabletTV

getTotalInodes(): Promise<number>

获取文件系统的inode资源总量，仅支持查询系统数据分区。使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**模型约束**：此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回文件系统inode资源总量。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13600016 | Failed to query the inode information of the data partition. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. storageStatistics.getTotalInodes().then((totalInodes: number) => {
4. console.info("getTotalInodes successfully: " + totalInodes);
5. }).catch((err: BusinessError) => {
6. console.error(`getTotalInodes failed. Code: ${err.code}, Message: ${err.message}`);
7. });
```

## storageStatistics.getFreeInodes24+

PhonePC/2in1TabletTV

getFreeInodes(): Promise<number>

获取文件系统的inode资源剩余量，仅支持查询系统数据分区。使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**模型约束**：此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回文件系统inode资源剩余量。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13600016 | Failed to query the inode information of the data partition. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. storageStatistics.getFreeInodes().then((freeInodes: number) => {
4. console.info("getFreeInodes successfully: " + freeInodes);
5. }).catch((err: BusinessError) => {
6. console.error(`getFreeInodes failed. Code: ${err.code}, Message: ${err.message}`);
7. });
```

## storageStatistics.getCurrentBundleInodes24+

PhonePC/2in1TabletTV

getCurrentBundleInodes(): Promise<number>

获取当前应用的inode占用量，使用Promise异步回调。

**系统能力**：SystemCapability.FileManagement.StorageService.SpatialStatistics

**模型约束**：此接口仅可在Stage模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回当前应用的inode占用量。 |

**错误码：**

以下错误码的详细介绍请参见[文件管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-filemanagement)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 13600001 | IPC error. |
| 13600002 | File system not supported. |
| 13600017 | Failed to query the inode information of the application. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. storageStatistics.getCurrentBundleInodes().then((curInodes: number) => {
4. console.info("getCurrentBundleInodes successfully: " + curInodes);
5. }).catch((err: BusinessError) => {
6. console.error(`getCurrentBundleInodes failed. Code: ${err.code}, Message: ${err.message}`);
7. });
```