本模块提供获取知识加工对象（KnowledgeProcessor）以及获取知识加工状态（ProcessorStatus）的能力。

由于知识加工能力依赖的嵌入模型只支持在PC/2in1部署，因此当前知识加工能力仅支持PC/2in1设备。

**起始版本：** 6.0.0(20)

## 导入模块

PhonePC/2in1Tablet



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
```

## getKnowledgeProcessor

PhonePC/2in1Tablet

getKnowledgeProcessor(context: common.BaseContext, config: KnowledgeProcessorConfig): Promise<KnowledgeProcessor>

获取知识加工对象，用于获取知识加工状态等操作。使用promise异步回调。

在schema升级场景下，首次开库或调用getKnowledgeProcessor接口前需调用[cleanKnowledgeData](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#cleanknowledgedata)接口。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [common.BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 知识加工对象的上下文。 |
| config | [KnowledgeProcessorConfig](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgeprocessorconfig) | 是 | 知识加工配置。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[KnowledgeProcessor](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgeprocessor)> | Promise对象，返回知识加工对象。 |

**错误码：**

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [1021400000](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400000-内部错误) | Internal error. |
| [1021400001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400001-知识源未配置) | The knowledge source is not configured. |
| [1021400002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400002-知识schema文件不存在) | The knowledge schema file is not found. |
| [1021400003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400003-知识schema内容不合法) | The knowledge schema content is invalid. |
| [1021400004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400004-操作rdb数据源时发生错误) | An error occurred during operations on the RDB source. |

**示例：**



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
2. import { common } from '@kit.AbilityKit';
3. import { relationalStore } from '@kit.ArkData';

5. const storeName: string = "testmail_store.db";
6. const storeConfig: relationalStore.StoreConfig = {
7. name: storeName, // 已触发知识加工的数据库名
8. securityLevel: relationalStore.SecurityLevel.S3,
9. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER,
10. };
11. const knowledgeSourceConfig: knowledgeProcessor.KnowledgeSourceConfig = {
12. rdbSource: storeConfig,
13. };
14. const knowledgeProcessorConfig: knowledgeProcessor.KnowledgeProcessorConfig = {
15. sourceConfig: knowledgeSourceConfig,
16. };
17. // 获取知识加工器的异步函数
18. async function getProcessor() {
19. const context = AppStorage.get<common.UIAbilityContext>("Context") as common.UIAbilityContext;
20. try {
21. // 获取知识加工对象
22. const processor = await knowledgeProcessor.getKnowledgeProcessor(context, knowledgeProcessorConfig);
23. return processor;
24. } catch (err) {
25. console.error("Error: " + err.message + " code: " + err.code);
26. return undefined;
27. }
28. }
```

## cleanKnowledgeData

PhonePC/2in1Tablet

cleanKnowledgeData(context: common.BaseContext, config: KnowledgeProcessorConfig): Promise<void>

根据入参中的知识加工配置获取对应知识库信息，将对应知识库进行清空。使用promise异步回调。

在schema升级场景下，首次开库或调用[getKnowledgeProcessor](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#getknowledgeprocessor)接口前调用cleanKnowledgeData接口，其他场景调用可能会导致知识库数据丢失或者数据损坏。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.1.0(23)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [common.BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 知识加工对象的上下文。 |
| config | [KnowledgeProcessorConfig](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgeprocessorconfig) | 是 | 知识加工配置。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。 |

**错误码：**

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [1021400001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400001-知识源未配置) | The knowledge source is not configured. |
| [1021400002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400002-知识schema文件不存在)  [1021400003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400003-知识schema内容不合法)  [1021400004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400004-操作rdb数据源时发生错误) | The knowledge schema file is not found.  The knowledge schema content is invalid.  An error occurred during operations on the RDB source. |

**示例：**



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
2. import { common } from '@kit.AbilityKit';
3. import { relationalStore } from '@kit.ArkData';

5. const storeName: string = "testmail_store.db";
6. const storeConfig: relationalStore.StoreConfig = {
7. name: storeName, // 已触发知识加工的数据库名
8. securityLevel: relationalStore.SecurityLevel.S3,
9. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER,
10. };
11. const knowledgeSourceConfig: knowledgeProcessor.KnowledgeSourceConfig = {
12. rdbSource: storeConfig,
13. };
14. const knowledgeProcessorConfig: knowledgeProcessor.KnowledgeProcessorConfig = {
15. sourceConfig: knowledgeSourceConfig,
16. };
17. // 清理知识库的异步函数
18. async function cleanKnowledgeData() {
19. const context = AppStorage.get<common.UIAbilityContext>("Context") as common.UIAbilityContext;
20. try {
21. // 清理知识库
22. await knowledgeProcessor.cleanKnowledgeData(context, knowledgeProcessorConfig);
23. } catch (err) {
24. console.error("Error: " + err.message + " code: " + err.code);
25. return undefined;
26. }
27. }
```

## KnowledgeProcessorConfig

PhonePC/2in1Tablet

管理知识加工对象的配置。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| sourceConfig | [KnowledgeSourceConfig](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgesourceconfig) | 是 | 当前知识加工数据源配置。 |

## KnowledgeSourceConfig

PhonePC/2in1Tablet

管理知识数据源配置。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mode | relationalStore.StoreConfig | 否 | RDB数据库配置。加工数据源为RDB数据库时配置，当前版本仅支持RDB数据源，若不填该参数，接口返回错误码[1021400001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400001-知识源未配置)。 |

## KnowledgeProcessConfig

PhonePC/2in1Tablet

知识加工配置。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.1.0(23)

展开

| 名称 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mode | [KnowledgeProcessorMode](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgeprocessormode) | 是 | 知识加工参数。倒排或者倒排+向量两种加工模式. |

## KnowledgeProcessorMode

PhonePC/2in1Tablet

知识加工模式。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.1.0(23)

展开

| 名称 | 说明 |
| --- | --- |
| INVERTED\_INDEX | 倒排加工模式。 |
| INVERTED\_INDEX\_VECTORIZATION | 倒排＋向量加工模式。 |

## KnowledgeProcessor

PhonePC/2in1Tablet

知识加工对象，用于获取知识加工状态等操作。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

### getStatus

PhonePC/2in1Tablet

getStatus(): Promise<ProcessorStatus>

获取知识加工状态。使用promise异步回调。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[ProcessorStatus](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#processorstatus)> | Promise对象，返回知识加工状态。 |

**错误码：**

展开

| **错误码ID** | **错误信息** |
| --- | --- |
| [1021400000](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400000-内部错误) | Internal error. |
| [1021400004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400004-操作rdb数据源时发生错误) | An error occurred during operations on the RDB source. |

**示例：**



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
2. import { common } from '@kit.AbilityKit';
3. import { relationalStore } from '@kit.ArkData';

5. const storeName: string = "testmail_store.db";
6. const storeConfig: relationalStore.StoreConfig = {
7. name: storeName, // 已触发知识加工的数据库名
8. securityLevel: relationalStore.SecurityLevel.S3,
9. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER,
10. };
11. const knowledgeSourceConfig: knowledgeProcessor.KnowledgeSourceConfig = {
12. rdbSource: storeConfig,
13. };
14. const knowledgeProcessorConfig: knowledgeProcessor.KnowledgeProcessorConfig = {
15. sourceConfig: knowledgeSourceConfig,
16. };
17. // 获取知识加工状态的异步函数
18. async function getStatus() {
19. const context = AppStorage.get<common.UIAbilityContext>("Context") as common.UIAbilityContext;
20. try {
21. // 获取知识加工对象
22. const processor = await knowledgeProcessor.getKnowledgeProcessor(context, knowledgeProcessorConfig);
23. // 获取知识加工状态
24. const status: knowledgeProcessor.ProcessorStatus = await processor.getStatus();
25. return status;
26. } catch (err) {
27. console.error("Error: " + err.message + " code: " + err.code);
28. return undefined;
29. }
30. }
```

### startProcess

PhonePC/2in1Tablet

startProcess(config: KnowledgeProcessConfig): Promise<void>

根据入参的配置，启动知识加工。使用promise异步回调。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.1.0(23)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| config | [KnowledgeProcessConfig](/consumer/cn/doc/harmonyos-references/dataaugmentation-knowledgeprocessor-api#knowledgeprocessconfig) | 是 | 知识加工配置。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。 |

**错误码：**

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [801](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal#section801-该设备不支持此api) | Device type error. |
| [1021400000](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400000-内部错误) | Internal error. |
| [1021400005](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/dataaugmentation-error-code#section1021400005-重复启动知识加工) | Feature already active. Function called repeatedly. |

**示例：**



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
2. import { common } from '@kit.AbilityKit';
3. import { relationalStore } from '@kit.ArkData';

5. const storeName: string = "testmail_store.db";
6. const storeConfig: relationalStore.StoreConfig = {
7. name: storeName, // 已触发知识加工的数据库名
8. securityLevel: relationalStore.SecurityLevel.S3,
9. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER,
10. };
11. const knowledgeSourceConfig: knowledgeProcessor.KnowledgeSourceConfig = {
12. rdbSource: storeConfig,
13. };
14. const knowledgeProcessorConfig: knowledgeProcessor.KnowledgeProcessorConfig = {
15. sourceConfig: knowledgeSourceConfig,
16. };
17. // 启动知识加工的异步函数
18. async function startProcess() {
19. const context = AppStorage.get<common.UIAbilityContext>("Context") as common.UIAbilityContext;
20. try {
21. // 获取知识加工对象
22. const processor = await knowledgeProcessor.getKnowledgeProcessor(context, knowledgeProcessorConfig);
23. // 启动知识加工
24. let processMode: knowledgeProcessor.KnowledgeProcessMode = knowledgeProcessor.KnowledgeProcessMode.INVERTED_INDEX;
25. let config: knowledgeProcessor.KnowledgeProcessConfig = {
26. mode: processMode,
27. };
28. await processor.startProcess(config);
29. } catch (err) {
30. console.error("Error: " + err.message + " code: " + err.code);
31. }
32. }
```

### stopProcess

PhonePC/2in1Tablet

stopProcess(): Promise<void>

停止当前知识加工。使用promise异步回调。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.1.0(23)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。 |

**示例：**



```
1. import { knowledgeProcessor } from '@kit.DataAugmentationKit';
2. import { common } from '@kit.AbilityKit';
3. import { relationalStore } from '@kit.ArkData';

5. const storeName: string = "testmail_store.db";
6. const storeConfig: relationalStore.StoreConfig = {
7. name: storeName, // 已触发知识加工的数据库名
8. securityLevel: relationalStore.SecurityLevel.S3,
9. tokenizer: relationalStore.Tokenizer.CUSTOM_TOKENIZER,
10. };
11. const knowledgeSourceConfig: knowledgeProcessor.KnowledgeSourceConfig = {
12. rdbSource: storeConfig,
13. };
14. const knowledgeProcessorConfig: knowledgeProcessor.KnowledgeProcessorConfig = {
15. sourceConfig: knowledgeSourceConfig,
16. };
17. // 停止知识加工的异步函数
18. async function stopProcess() {
19. const context = AppStorage.get<common.UIAbilityContext>("Context") as common.UIAbilityContext;
20. try {
21. // 获取知识加工对象
22. const processor = await knowledgeProcessor.getKnowledgeProcessor(context, knowledgeProcessorConfig);
23. // 停止知识加工
24. await processor.stopProcess();
25. } catch (err) {
26. console.error("Error: " + err.message + " code: " + err.code);
27. }
28. }
```

## ProcessorStatus

PhonePC/2in1Tablet

知识加工状态。

**系统能力：** SystemCapability.DataAugmentation.KnowledgeProcessor

**起始版本：** 6.0.0(20)

展开

| 名称 | 说明 |
| --- | --- |
| DATA\_REMAINING\_TO\_PROCESS | 存在待加工的数据。 |
| DATA\_PROCESSING\_IN\_PROGRESS | 数据正在进行知识加工中。 |
| DATA\_PROCESSING\_COMPLETE | 所有数据已完成加工。 |