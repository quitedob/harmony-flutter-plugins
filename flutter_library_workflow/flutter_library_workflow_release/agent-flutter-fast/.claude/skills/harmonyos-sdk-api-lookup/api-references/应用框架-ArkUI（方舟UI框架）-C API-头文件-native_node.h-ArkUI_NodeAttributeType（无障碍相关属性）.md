

```
1. enum ArkUI_NodeAttributeType
```

## 概述

定义ArkUI在Native侧可以设置的无障碍相关属性集合，包含无障碍文本、说明、模式、状态、信息等属性设置。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_node.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h)

## NODE\_ACCESSIBILITY\_GROUP



```
1. NODE_ACCESSIBILITY_GROUP = 62
```

无障碍组属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 为1时表示该组件及其所有子组件为一整个可以选中的组件。无障碍服务将不再关注其子组件内容。参数类型为1或者0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 为1时表示该组件及其所有子组件为一整个可以选中的组件。无障碍服务将不再关注其子组件内容。参数类型为1或者0。 |

## NODE\_ACCESSIBILITY\_TEXT



```
1. NODE_ACCESSIBILITY_TEXT = 63
```

无障碍文本属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .string | 无障碍文本。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .string | 无障碍文本。 |

## NODE\_ACCESSIBILITY\_MODE



```
1. NODE_ACCESSIBILITY_MODE = 64
```

无障碍辅助服务模式，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 辅助服务模式，参数类型[ArkUI\_AccessibilityMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_accessibilitymode)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 辅助服务模式，参数类型[ArkUI\_AccessibilityMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_accessibilitymode)。 |

## NODE\_ACCESSIBILITY\_DESCRIPTION



```
1. NODE_ACCESSIBILITY_DESCRIPTION = 65
```

无障碍说明属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .string | 无障碍说明。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .string | 无障碍说明。 |

## NODE\_ACCESSIBILITY\_ID



```
1. NODE_ACCESSIBILITY_ID = 87
```

无障碍自定义标识ID，支持属性获取。

作为属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 无障碍自定义标识ID。 |

## NODE\_ACCESSIBILITY\_ACTIONS



```
1. NODE_ACCESSIBILITY_ACTIONS = 88
```

定义无障碍支持操作类型属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].u32 | 配置无障碍操作类型，参数类型[ArkUI\_AccessibilityActionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_accessibilityactiontype)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].u32 | 配置无障碍操作类型，参数类型[ArkUI\_AccessibilityActionType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_accessibilityactiontype)。 |

## NODE\_ACCESSIBILITY\_ROLE



```
1. NODE_ACCESSIBILITY_ROLE = 89
```

定义无障碍组件类型属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].u32 | 无障碍组件类型，参数类型[ArkUI\_NodeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].u32 | 无障碍组件类型，参数类型[ArkUI\_NodeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype)。 |

## NODE\_ACCESSIBILITY\_STATE



```
1. NODE_ACCESSIBILITY_STATE = 90
```

定义无障碍状态属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 参数类型为[ArkUI\_AccessibilityState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-accessibilitystate)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .object | 参数类型为[ArkUI\_AccessibilityState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-accessibilitystate)。 |

## NODE\_ACCESSIBILITY\_VALUE



```
1. NODE_ACCESSIBILITY_VALUE = 91
```

定义无障碍信息属性，支持属性设置，属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 参数类型为[ArkUI\_AccessibilityValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-accessibilityvalue)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .object | 参数类型为[ArkUI\_AccessibilityValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-accessibilityvalue)。 |