systemConfiguration模块提供系统环境变化监听回调能力，包括系统深浅色模式、系统语言、系统字体大小缩放比例等变化的回调。

例如，通过对系统深浅色模式变化的监听，应用可感知系统的深浅色模式变化，并动态调整自身应用的深浅色主题以适配系统环境。

该模块与[EnvironmentCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-environmentcallback)模块的区别在于：

* systemConfiguration模块：用于监听系统环境变量[Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configuration)的变化。
* [EnvironmentCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-environmentcallback)模块：用于监听某个应用环境变量[Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configuration)的变化。

说明

本模块首批接口从API version 24 开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { systemConfiguration } from '@kit.AbilityKit';
```

## UpdatedCallback

PhonePC/2in1TabletTVWearable

UpdatedCallback是监听系统环境变化的回调函数，开发者可通过[ApplicationContext.onSystemConfigurationUpdated](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext#applicationcontextonsystemconfigurationupdated24)方法注册自定义的UpdatedCallback，来监听系统环境变化。

### onColorModeUpdated

PhonePC/2in1TabletTVWearable

onColorModeUpdated(colorMode: ConfigurationConstant.ColorMode): void

在注册系统环境变化的监听后，当系统深浅色模式变化时会触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| colorMode | [ConfigurationConstant.ColorMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configurationconstant#colormode) | 是 | 变化后的系统深浅色模式。 |

**示例：**



```
1. import { UIAbility, systemConfiguration, ConfigurationConstant } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onColorModeUpdated(colorMode: ConfigurationConstant.ColorMode) {
8. console.info(`system configuration updated colormode:` + colorMode);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onFontSizeScaleUpdated

PhonePC/2in1TabletTVWearable

onFontSizeScaleUpdated(fontSizeScale: number): void

在注册系统环境变化的监听后，当系统字体大小缩放比例变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fontSizeScale | number | 是 | 变化后的系统字体大小缩放比例。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onFontSizeScaleUpdated(fontSizeScale: number) {
8. console.info(`system configuration updated ability:` + fontSizeScale);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onFontWeightScaleUpdated

PhonePC/2in1TabletTVWearable

onFontWeightScaleUpdated(fontWeightScale: number): void

在注册系统环境变化的监听后，当系统字体粗细缩放比例变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fontWeightScale | number | 是 | 变化后的系统字体粗细缩放比例。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onFontWeightScaleUpdated(fontWeightScale: number) {
8. console.info(`system configuration updated ability:` + fontWeightScale);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onLanguageUpdated

PhonePC/2in1TabletTVWearable

onLanguageUpdated(language: string): void

在注册系统环境变化的监听后，当系统语言变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| language | string | 是 | 变化后的系统语言。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onLanguageUpdated(language: string) {
8. console.info(`system configuration updated ability:` + language);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onFontIdUpdated

PhonePC/2in1TabletTVWearable

onFontIdUpdated(fontId: string): void

在注册系统环境变化的监听后，当系统字体ID变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fontId | string | 是 | 变化后的系统字体ID。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onFontIdUpdated(fontId: string) {
8. console.info(`system configuration updated ability:` + fontId);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onMCCUpdated

PhonePC/2in1TabletTVWearable

onMCCUpdated(mcc: string): void

在注册系统环境变化的监听后，当移动设备国家代码变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mcc | string | 是 | 变化后的移动设备国家代码。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onMCCUpdated(mcc: string) {
8. console.info(`system configuration updated ability:` + mcc);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onMNCUpdated

PhonePC/2in1TabletTVWearable

onMNCUpdated(mnc: string): void

在注册系统环境变化的监听后，当移动设备网络代码变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mnc | string | 是 | 变化后的移动设备网络代码。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onMNCUpdated(mnc: string) {
8. console.info(`system configuration updated ability:` + mnc);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onHasPointerDeviceUpdated

PhonePC/2in1TabletTVWearable

onHasPointerDeviceUpdated(hasPointerDevice: boolean): void

在注册系统环境变化的监听后，当指针设备连接或者断开时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| hasPointerDevice | boolean | 是 | 指针设备是否已连接，如键鼠、触控板等。true表示设备已连接，false表示设备未连接。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onHasPointerDeviceUpdated(hasPointerDevice: boolean) {
8. console.info(`system configuration updated ability:` + hasPointerDevice);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```

### onLocaleUpdated

PhonePC/2in1TabletTVWearable

onLocaleUpdated(locale: string): void

在注册系统环境变化的监听后，当系统区域设置变化时触发回调。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| locale | string | 是 | 变化后的系统区域设置，该字段具体解释可以参考[Configuration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configuration)。 |

**示例：**



```
1. import { UIAbility, systemConfiguration } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onForeground() {
6. let CallBack: systemConfiguration.UpdatedCallback = {
7. onLocaleUpdated(locale: string) {
8. console.info(`system configuration updated ability:` + locale);
9. }
10. }
11. // 1.通过context属性获取applicationContext
12. let applicationContext = this.context.getApplicationContext();
13. try {
14. // 2.通过applicationContext注册监听
15. applicationContext.onSystemConfigurationUpdated(CallBack);
16. } catch (paramError) {
17. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
18. }
19. console.info(`onSystemConfigurationUpdated finish`);
20. }
21. }
```