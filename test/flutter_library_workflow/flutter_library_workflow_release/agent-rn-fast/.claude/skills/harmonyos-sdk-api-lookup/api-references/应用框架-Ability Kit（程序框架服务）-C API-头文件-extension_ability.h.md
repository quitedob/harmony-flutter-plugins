## 概述

PhonePC/2in1TabletTVWearable

提供ExtensionAbility回调函数类型声明和入口函数名称声明。

**引用文件：** <AbilityKit/ability\_runtime/extension\_ability.h>

**库：** libability\_runtime.so

**系统能力：** SystemCapability.Ability.AbilityRuntime.Core

**起始版本：** 24

**相关模块：** [AbilityRuntime](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [AbilityRuntime\_ExtensionInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-extensioninstance) | - | 定义AbilityRuntime\_ExtensionInstance结构体类型。 |
| [AbilityRuntime\_ExtensionInstance\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-extensioninstance8h) | AbilityRuntime\_ExtensionInstanceHandle | 定义AbilityRuntime\_ExtensionInstance对象指针。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void AbilityRuntime\_Extension\_CreateFunc(AbilityRuntime\_ExtensionInstanceHandle handle, const char \*abilityName);](/consumer/cn/doc/harmonyos-references/capi-extension-ability-h#abilityruntime_extension_createfunc) | AbilityRuntime\_Extension\_CreateFunc | ExtensionAbility创建回调函数类型。ExtensionAbility中必须实现的回调函数类型，用于实例化ExtensionAbility。 |

### 变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| [OH\_AbilityRuntime\_OnNativeExtensionCreate](/consumer/cn/doc/harmonyos-references/capi-extension-ability-h#oh_abilityruntime_onnativeextensioncreate) | [AbilityRuntime\_Extension\_CreateFunc](/consumer/cn/doc/harmonyos-references/capi-extension-ability-h#abilityruntime_extension_createfunc) | ExtensionAbility入口函数名称声明。开发者需要实现一个类型为[AbilityRuntime\_Extension\_CreateFunc](/consumer/cn/doc/harmonyos-references/capi-extension-ability-h#abilityruntime_extension_createfunc)的函数，并将其命名为OH\_AbilityRuntime\_OnNativeExtensionCreate。系统会自动查找并调用此函数来完成ExtensionAbility实例的初始化。  **起始版本：** 24 |

## 函数说明

PhonePC/2in1TabletTVWearable

### AbilityRuntime\_Extension\_CreateFunc()

PhonePC/2in1TabletTVWearable



```
1. typedef void AbilityRuntime_Extension_CreateFunc(AbilityRuntime_ExtensionInstanceHandle handle, const char *abilityName)
```

**描述**

ExtensionAbility创建回调函数类型。ExtensionAbility中必须实现的回调函数类型，用于实例化ExtensionAbility。

**起始版本：** 24

**参数：**

展开

| 参数名 | 描述 |
| --- | --- |
| [AbilityRuntime\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-extensioninstance8h) handle | 回调函数传入AbilityRuntime\_ExtensionInstanceHandle实例的指针。 |
| const char \*abilityName | 回调函数传入的ExtensionAbility的名称。 |

## 变量说明

PhonePC/2in1TabletTVWearable

### OH\_AbilityRuntime\_OnNativeExtensionCreate

PhonePC/2in1TabletTVWearable



```
1. AbilityRuntime_Extension_CreateFunc OH_AbilityRuntime_OnNativeExtensionCreate
```

**描述**

ExtensionAbility入口函数名称声明。开发者需要实现一个类型为[AbilityRuntime\_Extension\_CreateFunc](/consumer/cn/doc/harmonyos-references/capi-extension-ability-h#abilityruntime_extension_createfunc)的函数，并将其命名为OH\_AbilityRuntime\_OnNativeExtensionCreate。系统会自动查找并调用此函数来完成ExtensionAbility实例的初始化。

**起始版本：** 24

**示例代码：**



```
1. #include <AbilityKit/ability_runtime/extension_ability.h>

3. extern "C" void OH_AbilityRuntime_OnNativeExtensionCreate(AbilityRuntime_ExtensionInstance *instance,
4. const char *abilityName) {
5. if (!instance) {
6. // 记录错误日志以及其他业务处理
7. return;
8. }
9. // ExtensionAbility 初始化工作
10. }
```