Ability模块将二级模块API组织在一起方便开发者进行导出。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { ability } from '@kit.AbilityKit';
```

## DataAbilityHelper

PhonePC/2in1TabletTVWearable

type DataAbilityHelper = \_DataAbilityHelper

DataAbilityHelper二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.FAModel

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_DataAbilityHelper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-dataabilityhelper) | DataAbilityHelper二级模块。 |

## PacMap

PhonePC/2in1TabletTVWearable

type PacMap = \_PacMap

PacMap二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.FAModel

展开

| 类型 | 说明 |
| --- | --- |
| [\_PacMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-dataabilityhelper#pacmap) | DataAbilityHelper二级模块。 |

## DataAbilityOperation

PhonePC/2in1TabletTVWearable

type DataAbilityOperation = \_DataAbilityOperation

DataAbilityOperation二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.FAModel

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_DataAbilityOperation](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-dataabilityoperation) | DataAbilityOperation二级模块。 |

## DataAbilityResult

PhonePC/2in1TabletTVWearable

type DataAbilityResult = \_DataAbilityResult

DataAbilityResult二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.FAModel

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_DataAbilityResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-dataabilityresult) | DataAbilityResult二级模块。 |

## AbilityResult

PhonePC/2in1TabletTVWearable

type AbilityResult = \_AbilityResult

AbilityResult二级模块。

**系统能力**：SystemCapability.Ability.AbilityBase

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AbilityResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-abilityresult) | AbilityResult二级模块。 |

## ConnectOptions

PhonePC/2in1TabletTVWearable

type ConnectOptions = \_ConnectOptions

ConnectOptions二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_ConnectOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-connectoptions) | ConnectOptions二级模块。 |

## StartAbilityParameter

PhonePC/2in1TabletTVWearable

type StartAbilityParameter = \_StartAbilityParameter

StartAbilityParameter二级模块。

**系统能力**：SystemCapability.Ability.AbilityRuntime.FAModel

**模型约束**：此接口仅可在FA模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_StartAbilityParameter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-startabilityparameter) | StartAbilityParameter二级模块。 |

**示例：**



```
1. import { ability } from '@kit.AbilityKit';

3. let dataAbilityHelper: ability.DataAbilityHelper;
4. let pacMap: ability.PacMap;
5. let dataAbilityOperation: ability.DataAbilityOperation;
6. let dataAbilityResult: ability.DataAbilityResult;
7. let abilityResult: ability.AbilityResult;
8. let connectOptions: ability.ConnectOptions;
9. let startAbilityParameter: ability.StartAbilityParameter;
```