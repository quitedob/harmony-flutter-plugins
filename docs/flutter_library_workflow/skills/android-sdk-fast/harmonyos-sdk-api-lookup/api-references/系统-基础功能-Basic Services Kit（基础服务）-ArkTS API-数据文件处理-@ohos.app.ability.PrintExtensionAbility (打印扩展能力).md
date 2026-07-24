该模块为打印扩展能力的操作API，提供调用打印扩展能力的接口。

说明

本模块首批接口从API version 14开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

## 导入模块

PhonePC/2in1Tablet



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';
```

## PrintExtensionAbility

PhonePC/2in1Tablet

### onCreate

PhonePC/2in1Tablet

onCreate(want: Want): void

初始化扩展能力，会在系统首次连接打印扩展时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| **参数名** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| want | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-want#want) | 是 | 表示调用打印页面需要参数。 |

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';
2. import { Want } from '@kit.AbilityKit';

4. export default class HWPrintExtension extends PrintExtensionAbility {
5. onCreate(want: Want): void {
6. console.info('onCreate');
7. // ...
8. }
9. }
```

### onStartDiscoverPrinter

PhonePC/2in1Tablet

onStartDiscoverPrinter(): void

开始发现与设备连接的打印机时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onStartDiscoverPrinter(): void {
5. console.info('onStartDiscoverPrinter enter');
6. // ...
7. }
8. }
```

### onStopDiscoverPrinter

PhonePC/2in1Tablet

onStopDiscoverPrinter(): void

停止发现打印机时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onStopDiscoverPrinter(): void {
5. console.info('onStopDiscoverPrinter enter');
6. // ...
7. }
8. }
```

### onConnectPrinter

PhonePC/2in1Tablet

onConnectPrinter(printerId: number): void

连接到特定打印机时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| **参数名** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| printerId | number | 是 | 表示打印机ID。 |

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onConnectPrinter(printerId: number): void {
5. console.info('onConnectPrinter enter');
6. // ...
7. }
8. }
```

### onDisconnectPrinter

PhonePC/2in1Tablet

onDisconnectPrinter(printerId: number): void

断开与特定打印机的连接时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| **参数名** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| printerId | number | 是 | 表示打印机ID。 |

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onDisconnectPrinter(printerId: number): void {
5. console.info('onDisconnectPrinter enter');
6. // ...
7. }
8. }
```

### onStartPrintJob24+

PhonePC/2in1Tablet

onStartPrintJob(jobInfo: print.PrintJob): void

开始打印任务时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| jobInfo | [print.PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-print#printjob24) | 是 | 表示打印任务的信息。 |

**示例：**



```
1. import { print, PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onStartPrintJob(jobInfo: print.PrintJob): void {
5. console.info('onStartPrintJob, jobId is: ' + jobInfo.jobId);
6. // ...
7. }
8. }
```

### onCancelPrintJob24+

PhonePC/2in1Tablet

onCancelPrintJob(jobInfo: print.PrintJob): void

移除已开始的打印任务时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| jobInfo | [print.PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-print#printjob24) | 是 | 表示打印任务的信息。 |

**示例：**



```
1. import { print, PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onCancelPrintJob(jobInfo: print.PrintJob): void {
5. console.info('onCancelPrintJob, jobId is: ' + jobInfo.jobId);
6. // ...
7. }
8. }
```

### onRequestPrinterCapability24+

PhonePC/2in1Tablet

onRequestPrinterCapability(printerId: number): print.PrinterCapability

请求打印机能力时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| printerId | number | 是 | 表示打印机ID。 |

**返回值：**

展开

| **类型** | **说明** |
| --- | --- |
| [print.PrinterCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-print#printercapability24) | 表示打印能力。 |

**示例：**



```
1. import { print, PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onRequestPrinterCapability(printerId: number): print.PrinterCapability {
5. console.info('onRequestPrinterCapability enter');
6. // ...
7. let tmp : print.PrinterCapability = {
8. colorMode : 1,
9. duplexMode : 1,
10. pageSize : []
11. };
12. return tmp;
13. }
14. }
```

### onDestroy

PhonePC/2in1Tablet

onDestroy(): void

结束打印扩展时调用。

**系统能力：** SystemCapability.Print.PrintFramework

**示例：**



```
1. import { PrintExtensionAbility } from '@kit.BasicServicesKit';

3. export default class HWPrintExtension extends PrintExtensionAbility {
4. onDestroy(): void {
5. console.info('onDestroy');
6. }
7. }
```