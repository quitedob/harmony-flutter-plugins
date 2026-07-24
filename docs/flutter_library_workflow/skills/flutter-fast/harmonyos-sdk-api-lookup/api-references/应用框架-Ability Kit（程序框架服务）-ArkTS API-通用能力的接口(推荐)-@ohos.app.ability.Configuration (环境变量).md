定义了应用运行时的环境变量，包含语言、深浅色、屏幕方向、字体等。开发者可以通过订阅环境变量，适配不同用户偏好，提升交互体验。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { Configuration } from '@kit.AbilityKit';
```

## Configuration

PhonePC/2in1TabletTVWearable

**系统能力**：SystemCapability.Ability.AbilityBase

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| language | string | 否 | 是 | 表示应用当前语言，例如“zh"(中文)，“en”（英文）。  支持开发者[设置应用语言](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/subscribe-system-environment-variable-changes#设置应用语言)。  取值范围参考[获取系统支持的语言列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-i18n#getsystemlanguages9)。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| colorMode | [ConfigurationConstant.ColorMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configurationconstant#colormode) | 否 | 是 | 表示应用深浅色模式，默认为浅色。  支持开发者[设置应用或组件深浅色](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/subscribe-system-environment-variable-changes#设置深浅色模式)。  取值范围：  - COLOR\_MODE\_NOT\_SET：未设置  - COLOR\_MODE\_LIGHT：浅色模式  - COLOR\_MODE\_DARK：深色模式  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| direction | [ConfigurationConstant.Direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configurationconstant#direction) | 否 | 是 | 表示应用屏幕方向。  取值范围：  - DIRECTION\_NOT\_SET：未设置  - DIRECTION\_HORIZONTAL：水平方向  - DIRECTION\_VERTICAL：垂直方向  该环境变量支持在[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)组件和[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)组件中订阅，不支持在[ApplicationContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext)和[AbilityStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitystage)组件容器中订阅。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| screenDensity | [ConfigurationConstant.ScreenDensity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-configurationconstant#screendensity) | 否 | 是 | 表示屏幕显示密度。  取值范围：  - SCREEN\_DENSITY\_NOT\_SET：未设置  - SCREEN\_DENSITY\_SDPI：120  - SCREEN\_DENSITY\_MDPI：160  - SCREEN\_DENSITY\_LDPI：240  - SCREEN\_DENSITY\_XLDPI：320  - SCREEN\_DENSITY\_XXLDPI：480  - SCREEN\_DENSITY\_XXXLDPI：640  字体显示大小与屏幕像素密度呈正相关关系。通过监听屏幕像素密度变化，可以感知字体显示大小的调整。通常情况下，对于相同的物理尺寸，屏幕像素密度越高，字体显示效果越大。  该环境变量支持在[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)组件和[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)组件中订阅，不支持在[ApplicationContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext)和[AbilityStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitystage)组件容器中订阅。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| displayId | number | 否 | 是 | 表示应用所在的物理屏幕ID。  该环境变量支持在[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)组件和[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)组件中订阅，不支持在[ApplicationContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext)和[AbilityStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitystage)组件容器中订阅。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| hasPointerDevice | boolean | 否 | 是 | 表示指针设备是否已连接，如键鼠、触控板等。true表示设备已连接，false表示设备未连接。  **元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| fontId14+ | string | 否 | 是 | 表示应用字体的唯一ID。  **元服务API**：从API version 14开始，该接口支持在元服务中使用。 |
| fontSizeScale12+ | number | 否 | 是 | 表示字体大小缩放比例，取值为非负数，默认值为1。  支持开发者[设置应用字体大小](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/subscribe-system-environment-variable-changes#设置字体大小)。  **元服务API**：从API version 12开始，该接口支持在元服务中使用。 |
| fontWeightScale12+ | number | 否 | 是 | 表示字体粗细缩放比例，取值为非负数，默认值为1。  **元服务API**：从API version 12开始，该接口支持在元服务中使用。 |
| mcc12+ | string | 否 | 是 | 表示移动设备国家代码。  **元服务API**：从API version 12开始，该接口支持在元服务中使用。 |
| mnc12+ | string | 否 | 是 | 表示移动设备网络代码。  **元服务API**：从API version 12开始，该接口支持在元服务中使用。 |
| locale20+ | [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) | 否 | 是 | 表示区域设置。  应用会根据当前的区域设置自动调整其行为，以符合用户的本地化需求。该属性可以通过设置系统语言、设置系统地区和设置应用偏好语言等方式设置。  **元服务API**：从API version 20开始，该接口支持在元服务中使用。 |

**示例：**



```
1. import { UIAbility, AbilityConstant, EnvironmentCallback, Want } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. export default class EntryAbility extends UIAbility {
5. onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
6. let envCallback: EnvironmentCallback = {
7. onConfigurationUpdated(config) {
8. console.info(`envCallback onConfigurationUpdated success: ${JSON.stringify(config)}`);
9. let language = config.language;
10. let colorMode = config.colorMode;
11. let direction = config.direction;
12. let screenDensity = config.screenDensity;
13. let displayId = config.displayId;
14. let hasPointerDevice = config.hasPointerDevice;
15. let fontId = config.fontId;
16. let fontSizeScale = config.fontSizeScale;
17. let fontWeightScale = config.fontWeightScale;
18. let mcc = config.mcc;
19. let mnc = config.mnc;
20. let locale = config.locale;
21. },
22. onMemoryLevel(level) {
23. console.info(`onMemoryLevel level: ${level}`);
24. }
25. };
26. try {
27. let applicationContext = this.context.getApplicationContext();
28. let callbackId = applicationContext.on('environment', envCallback);
29. console.info(`callbackId: ${callbackId}`);
30. } catch (paramError) {
31. console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
32. }
33. }
34. }
```