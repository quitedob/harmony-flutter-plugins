Context是Stage模型的上下文基类，主要用于访问特定应用程序的资源，以及执行应用级操作的回调。

说明

* 本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。
* 本模块接口仅可在Stage模型下使用。

## 不同类型Context的继承和持有关系

PhonePC/2in1TabletTVWearable

* 不同类型Context的继承关系如下：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/8POm9RmgSqmgy736QDjjuw/zh-cn_image_0000002599478233.png?HW-CC-KV=V1&HW-CC-Date=20260511T031947Z&HW-CC-Expire=86400&HW-CC-Sign=627F693F7F7DCD29A340270A841F16F6B161006211966271948529551C7DBEC7)
* 不同类型Context的持有关系如下：

  ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/32/v3/ByKHT45NRByfogfIQZiW1g/zh-cn_image_0000002568759044.png?HW-CC-KV=V1&HW-CC-Date=20260511T031947Z&HW-CC-Expire=86400&HW-CC-Sign=79654B4BD1C05B3EFDB2EB77C500C3F6B98EB5AF5245565B5998BA510DE518F1)

说明

[UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext)是指UI实例上下文，用于关联窗口与UI页面。与本文档中的应用上下文Context无直接关联，不存在继承或持有关系。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { common } from '@kit.AbilityKit';
```

## Context

PhonePC/2in1TabletTVWearable

Context提供了ability或application的上下文的能力，包括访问特定应用程序的资源等。

### 属性

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| resourceManager | resmgr.[ResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource-manager#resourcemanager) | 否 | 否 | 资源管理对象。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| applicationInfo | [ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo) | 否 | 否 | 当前应用程序的信息。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| cacheDir | string | 否 | 否 | 缓存目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| tempDir | string | 否 | 否 | 临时目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| resourceDir11+ | string | 否 | 否 | 资源目录。  **说明**：需要开发者手动在\<module-name>\resource路径下创建resfile目录。创建的resfile目录仅支持以只读方式访问。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| filesDir | string | 否 | 否 | 文件目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| databaseDir | string | 否 | 否 | 数据库目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| preferencesDir | string | 否 | 否 | preferences目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| bundleCodeDir | string | 否 | 否 | 安装包目录。不能拼接路径访问资源文件，请使用[资源管理接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource-manager)访问资源，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| distributedFilesDir | string | 否 | 否 | 分布式文件目录，详情参考[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| cloudFileDir12+ | string | 否 | 否 | 云文件目录。  **元服务API**：从API version 12开始，该接口支持在元服务中使用。 |
| logFileDir22+ | string | 否 | 否 | 日志文件目录。  **元服务API**：从API version 22开始，该接口支持在元服务中使用。 |
| eventHub | [EventHub](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-eventhub) | 否 | 否 | 事件中心，提供订阅、取消订阅、触发事件对象。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| area | contextConstant.[AreaMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-contextconstant#areamode) | 否 | 否 | 文件分区信息，按加密等级[AreaMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-contextconstant#areamode) 进行分区。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| processName18+ | string | 否 | 否 | 当前应用的进程名。  **元服务API**：从API version 18开始，该接口支持在元服务中使用。 |

### createModuleContext(deprecated)

PhonePC/2in1TabletTVWearable

createModuleContext(moduleName: string): Context

根据模块名创建上下文。

说明

* 仅支持获取本应用中其他Module的Context和应用内HSP的Context，不支持获取其他应用的Context。
* 从API version 9 开始支持，从API version 12 开始废弃，建议使用[application.createModuleContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-application#applicationcreatemodulecontext)替代，否则可能导致资源获取异常。
* 由于创建模块上下文的过程涉及资源查询与初始化，耗时相对较长，在对应用流畅性要求较高的场景下，不建议频繁或多次调用createModuleContext接口创建多个Context实例，以免影响用户体验。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| moduleName | string | 是 | 模块名。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Context | 模块的上下文。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. |

**示例：**



```
1. import { common, UIAbility } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. console.info('MyAbility onCreate');
7. let moduleContext: common.Context;
8. try {
9. moduleContext = this.context.createModuleContext('entry');
10. } catch (error) {
11. console.error(`createModuleContext failed, error.code: ${(error as BusinessError).code}, error.message: ${(error as BusinessError).message}`);
12. }
13. }
14. }
```

### getApplicationContext

PhonePC/2in1TabletTVWearable

getApplicationContext(): ApplicationContext

获取当前应用上下文。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [ApplicationContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext) | 应用上下文。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. |

**示例：**



```
1. import { common, UIAbility } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. console.info('MyAbility onCreate');
7. let applicationContext: common.Context;
8. try {
9. applicationContext = this.context.getApplicationContext();
10. } catch (error) {
11. console.error(`getApplicationContext failed, error.code: ${(error as BusinessError).code}, error.message: ${(error as BusinessError).message}`);
12. }
13. }
14. }
```

### getGroupDir10+

PhonePC/2in1TabletTVWearable

getGroupDir(dataGroupID: string): Promise<string>

通过应用中的Group ID获取对应的共享目录，使用Promise异步回调。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| [dataGroupID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-preferences#options10) | string | 是 | 元服务类型的应用创建时，系统会指定分配唯一Group ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回对应的共享目录。如果不存在则返回为空，仅支持应用el2加密级别。 |

**错误码：**

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[元能力子系统错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-ability)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. |
| 16000011 | The context does not exist. |

**示例：**



```
1. import { common, UIAbility } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. console.info('MyAbility onCreate');
7. let groupId = "1";
8. let getGroupDirContext: common.Context = this.context;
9. try {
10. getGroupDirContext.getGroupDir(groupId).then(data => {
11. console.info("getGroupDir result:" + data);
12. })
13. } catch (error) {
14. console.error(`getGroupDirContext failed, error.code: ${(error as BusinessError).code}, error.message: ${(error as BusinessError).message}`);
15. }
16. }
17. }
```

### getGroupDir10+

PhonePC/2in1TabletTVWearable

getGroupDir(dataGroupID: string, callback: AsyncCallback<string>): void

通过应用中的Group ID获取对应的共享目录，使用callback异步回调。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| [dataGroupID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-data-preferences#options10) | string | 是 | 元服务类型的应用创建时，系统会指定分配唯一Group ID。 |
| callback | AsyncCallback<string> | 是 | 回调函数。当获取共享目录成功，err为undefined，data为对应的共享目录，如果不存在则返回为空；否则为错误对象。  **说明**：仅支持应用el2加密级别。 |

**错误码：**

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[元能力子系统错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-ability)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. |
| 16000011 | The context does not exist. |

**示例：**



```
1. import { common, UIAbility } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. console.info('MyAbility onCreate');
7. let getGroupDirContext: common.Context = this.context;

9. getGroupDirContext.getGroupDir("1", (err: BusinessError, data) => {
10. if (err) {
11. console.error(`getGroupDir failed, err: ${JSON.stringify(err)}`);
12. } else {
13. console.info(`getGroupDir result is: ${JSON.stringify(data)}`);
14. }
15. });
16. }
17. }
```

### createAreaModeContext18+

PhonePC/2in1TabletTVWearable

createAreaModeContext(areaMode: contextConstant.AreaMode): Context

创建特定数据加密级别的应用上下文。开发者可以调用该接口创建不同加密级别的上下文，从而获取对应的沙箱路径。

**元服务API**：从API version 18开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| areaMode | [contextConstant.AreaMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-contextconstant#areamode) | 是 | 指定的数据加密等级。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Context | 指定数据加密等级的上下文。 |

**示例：**



```
1. import { common, UIAbility, contextConstant } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
7. let areaMode: contextConstant.AreaMode = contextConstant.AreaMode.EL2;
8. let areaModeContext: common.Context;
9. try {
10. areaModeContext = this.context.createAreaModeContext(areaMode);
11. } catch (error) {
12. hilog.error(0x0000, 'testTag', 'createAreaModeContext error is:%{public}s', JSON.stringify(error));
13. }
14. }
15. }
```

### createDisplayContext15+

PhonePC/2in1TabletTVWearable

createDisplayContext(displayId: number): Context

根据指定的物理屏幕ID创建带有屏幕信息（包括屏幕密度[ScreenDensity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource-manager#screendensity)和屏幕方向[Direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource-manager#direction)）的应用上下文。

**元服务API**：从API version 15开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| [displayId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-i#windowproperties) | number | 是 | 物理屏幕ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [Context](/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context#context) | 带有指定物理屏幕信息的上下文。 |

**错误码：**

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified. 2.Incorrect parameter types. |

**示例：**



```
1. import { common, UIAbility } from '@kit.AbilityKit';
2. import { hilog } from '@kit.PerformanceAnalysisKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate() {
6. hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
7. let displayContext: common.Context;
8. try {
9. displayContext = this.context.createDisplayContext(0);
10. } catch (error) {
11. hilog.error(0x0000, 'testTag', 'createDisplayContext error is:%{public}s', JSON.stringify(error));
12. }
13. }
14. }
```