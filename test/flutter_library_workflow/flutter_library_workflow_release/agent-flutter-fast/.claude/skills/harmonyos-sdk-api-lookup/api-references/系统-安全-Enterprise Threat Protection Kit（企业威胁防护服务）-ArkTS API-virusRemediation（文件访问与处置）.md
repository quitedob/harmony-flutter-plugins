文件访问与处置功能旨在保障数据安全，为安全防护类应用提供威胁文件的扫描与处置能力。其主要功能包括文件打开、应用目录扫描，以及文件隔离、已隔离文件恢复、已隔离文件删除和隔离查询等处置操作。本服务需由安全防护类应用申请相应权限后使用。

**起始版本：** 6.1.1(24)

## 导入模块

PC/2in1



```
1. import { virusRemediation } from '@kit.EnterpriseThreatProtectionKit';
```

## IsolatedFileInfo

PC/2in1

隔离文件信息。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力**：SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| id | string | 否 | 否 | 表示隔离ID，UUID格式，长度为36个字符。 |
| absolutePath | string | 否 | 否 | 表示文件的原始路径。 |
| size | number | 否 | 否 | 表示文件大小，单位: byte。 |
| isolatedTime | number | 否 | 否 | 表示文件隔离时间，单位: ms。 |

## ScanTargetType

PC/2in1

扫描对象类型的枚举。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| BUNDLE | 0 | 应用安装包目录。 |
| SANDBOX | 1 | 应用el2级别加密数据目录。 |

## ScanCallback

PC/2in1

扫描结果的回调类。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

### onReceive

PC/2in1

onReceive(paths: string[]): void

文件目录扫描结果回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| paths | string[] | 是 | 表示扫描文件的绝对路径列表。 |

**示例：**



```
1. let onReceive: (paths: string[]) => void = (files: Array<string>) => {
2. files.forEach((value: string, index: number) => {
3. console.info(`Succeeded in getting file: ${value}.`);
4. })
5. };
```

### onComplete

PC/2in1

onComplete(): void

文件目录扫描完成信息获取回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**示例：**



```
1. let onComplete: () => void = () => {
2. console.info(`Query completed`);
3. };
```

### onError

PC/2in1

onError(code: number, message: string): void

文件目录扫描报错信息获取回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | number | 是 | 错误码。 |
| message | string | 是 | 错误信息。 |

**示例：**



```
1. let onError: (code: number, message: string) => void = (code: number, message: string) => {
2. console.error(`Query error, error code: ${code}, message: ${message}`);
3. };
```

## QueryCallback

PC/2in1

查询隔离文件信息的回调类。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

### onQuery

PC/2in1

onQuery(files: IsolatedFileInfo[]): void

隔离文件信息查询结果回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| files | [IsolatedFileInfo](/consumer/cn/doc/harmonyos-references/erprisethreatprotection-virusremediation-interface#isolatedfileinfo)[] | 是 | 表示隔离文件信息的列表。 |

**示例：**



```
1. let onQuery: (files: virusRemediation.IsolatedFileInfo[]) => void = (files: virusRemediation.IsolatedFileInfo[]) => {
2. files.forEach((value: virusRemediation.IsolatedFileInfo, index: number) => {
3. console.info(`Succeeded in getting isolated file, file id: ${value.id}.`);
4. })
5. };
```

### onComplete

PC/2in1

onComplete(): void

隔离文件信息查询完成信息获取回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**示例：**



```
1. let onComplete: () => void = () => {
2. console.info(`Query completed`);
3. };
```

### onError

PC/2in1

onError(code: number, message: string): void

隔离文件信息查询报错信息获取回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | number | 是 | 错误码。 |
| message | string | 是 | 错误信息。 |

**示例：**



```
1. let onError: (code: number, message: string) => void = (code: number, message: string) => {
2. console.error(`Query error, error code: ${code}, message: ${message}`);
3. };
```

## scanBundleFiles

PC/2in1

scanBundleFiles(type: ScanTargetType, callback: ScanCallback, bundleName?: string, batchNum?: number): void

扫描目标应用目录文件，调用前需确保已获取权限且入参符合规范，否则调用失败。使用callback异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | [ScanTargetType](/consumer/cn/doc/harmonyos-references/erprisethreatprotection-virusremediation-interface#scantargettype) | 是 | 扫描对象类型，取值为0或1，其余取值无效。其中，0代表BUNDLE，即应用安装包目录；1代表SANDBOX，即应用el2级别加密数据目录。当需要扫描特定应用的安装包目录时，选择BUNDLE。 |
| callback | [ScanCallback](/consumer/cn/doc/harmonyos-references/erprisethreatprotection-virusremediation-interface#scancallback) | 是 | 回调函数，返回文件列表和扫描结束通知。 |
| bundleName | string | 否 | 扫描的应用包名。参数为空时，则返回所有允许扫描的应用的文件。 |
| batchNum | number | 否 | 每一轮调用回调函数时返回的文件列表数量。取值范围为[1,200]，超出此范围则参数设置无效不执行扫描任务。不填则取默认值100。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |
| 1023802002 | Access and disposal denied for this path. |

**示例：**



```
1. // 启动文件扫描任务，通过指定回调函数处理扫描过程中接收到的文件路径、扫描完成和错误信息
2. function startFileScanTask() {
3. // 接收扫描结果的回调函数，用于处理扫描得到的文件路径列表
4. let onReceive: (paths: string[]) => void = (files: Array<string>) => {
5. files.forEach((value: string, index: number) => {
6. console.info(`Succeeded in getting file: ${value}.`);
7. })
8. };
9. let onComplete: () => void = () => {
10. console.info(`Scan completed`);
11. };
12. let onError: (code: number, message: string) => void = (code: number, message: string) => {
13. console.error(`Scan error, error code: ${code}, message: ${message}`);
14. }
15. let scanFileCallback: virusRemediation.ScanCallback = {
16. onReceive: onReceive,
17. onComplete: onComplete,
18. onError: onError
19. };
20. // 调用 scanBundleFiles 方法扫描应用安装包目录下的文件，并通过 scanFileCallback 回调处理结果
21. try {
22. virusRemediation.scanBundleFiles(virusRemediation.ScanTargetType.BUNDLE, scanFileCallback);
23. } catch (error) {
24. console.error(`Failed to scan bundle files. Error: ${error}`);
25. }
26. }
```

## openFile

PC/2in1

openFile(path: string): Promise<number>

打开文件。使用Promise异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 是 | [默认路径范围](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/enterprisethreatprotection-introduction#访问限制)下的绝对路径，路径长度不做限制。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<number> | Promise对象，返回文件描述符。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |
| 1023802001 | File not found. |
| 1023802002 | Access and disposal denied for this path. |
| 1023803001 | Access to other users' files is restricted. |
| 1023804001 | Invalid file type. |

**示例：**



```
1. function openFilePromise() {
2. let path: string = '/example/path/to/file.txt';
3. virusRemediation.openFile(path).then((fd: number) => {
4. console.info(`Succeeded in opening file. path: ${path} , fd: ${fd}.`);
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to open file. Code: ${err.code}, message: ${err.message}.`);
7. });
8. }
```

## queryIsolatedFiles

PC/2in1

queryIsolatedFiles(callback: QueryCallback, batchNum?: number): void

查询隔离文件信息。使用callback异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [QueryCallback](/consumer/cn/doc/harmonyos-references/erprisethreatprotection-virusremediation-interface#querycallback) | 是 | 回调函数，返回隔离文件信息列表，并在所有信息成功返回后通知用户查询结束。 |
| batchNum | number | 否 | 每一轮调用回调函数时返回的文件列表数量。取值范围为[1,200]，超出此范围则参数设置无效不执行查询任务。不填则取默认值100。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |

**示例：**



```
1. function startQueryTask() {
2. let onQuery: (files: virusRemediation.IsolatedFileInfo[]) => void = (files: virusRemediation.IsolatedFileInfo[]) => {
3. files.forEach((value: virusRemediation.IsolatedFileInfo, index: number) => {
4. console.info(`Succeeded in getting isolated file, file id: ${value.id}.`);
5. })
6. };
7. let onComplete: () => void = () => {
8. console.info(`Query completed`);
9. };
10. let onError: (code: number, message: string) => void = (code: number, message: string) => {
11. console.error(`Query error, error code: ${code}, message: ${message}`);
12. }
13. let cb: virusRemediation.QueryCallback = {
14. onQuery: onQuery,
15. onComplete: onComplete,
16. onError: onError
17. };
18. try {
19. virusRemediation.queryIsolatedFiles(cb);
20. } catch (error) {
21. console.error(`Failed to get isolated file. Error: ${error}`);
22. }
23. }
```

## isolateThreatFile

PC/2in1

isolateThreatFile(path: string): Promise<string>

隔离指定路径的文件，在调用前应确保当前路径正确有效且隔离区磁盘空间充足。使用Promise异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| path | string | 是 | 待隔离文件的绝对路径。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回隔离ID。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |
| 1023802001 | File not found. |
| 1023802002 | Access and disposal denied for this path. |
| 1023803001 | Access to other users' files is restricted. |
| 1023804001 | Invalid file type. |
| 1023804002 | Disposal is not supported. Please handle it manually. |
| 1023805001 | Quarantine storage space is full. |

**示例：**



```
1. function isolateFilePromise() {
2. let path: string = '/data/service/el2/test/test.txt';
3. virusRemediation.isolateThreatFile(path).then((id: string) => {
4. console.info(`Succeeded in isolating file. path: ${path} , id: ${id}.`);
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to isolate file. Code: ${err.code}, message: ${err.message}.`);
7. });
8. }
```

## restoreIsolatedFile

PC/2in1

restoreIsolatedFile(id: string): Promise<string>

恢复指定隔离ID的文件。使用Promise异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 待恢复文件的隔离ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回文件恢复的路径。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |
| 1023802003 | Existed same file in the restored path. |
| 1023803001 | Access to other users' files is restricted. |
| 1023804003 | Invalid operation. |
| 1023806001 | Database corruption detected. |

**示例：**



```
1. function restoreFilePromise() {
2. let id: string = 'example-id-12345';
3. virusRemediation.restoreIsolatedFile(id).then((path: string) => {
4. console.info(`Succeeded in restoring file. restore path: ${path} , id: ${id}.`);
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to restore file. Code: ${err.code}, message: ${err.message}.`);
7. });
8. }
```

## removeIsolatedFile

PC/2in1

removeIsolatedFile(id: string): Promise<void>

删除指定隔离ID的文件。使用Promise异步回调。

**需要权限：** ohos.permission.SCAN\_REMEDIATE\_VIRUS

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.PCService.VirusRemediation

**起始版本：** 6.1.1(24)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 待删除文件的隔离ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprise-threat-protection)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 201 | Permission denied. |
| 401 | The parameter check failed. |
| 1023801001 | System service exception. |
| 1023803001 | Access to other users' files is restricted. |
| 1023804003 | Invalid operation. |
| 1023806001 | Database corruption detected. |

**示例：**



```
1. function removeIsolatedFilePromise() {
2. let id: string = 'example-id-12345';
3. virusRemediation.removeIsolatedFile(id).then(() => {
4. console.info(`Succeeded in removing file.`);
5. }).catch((err: BusinessError) => {
6. console.error(`Failed to remove file. Code: ${err.code}, message: ${err.message}.`);
7. });
8. }
```