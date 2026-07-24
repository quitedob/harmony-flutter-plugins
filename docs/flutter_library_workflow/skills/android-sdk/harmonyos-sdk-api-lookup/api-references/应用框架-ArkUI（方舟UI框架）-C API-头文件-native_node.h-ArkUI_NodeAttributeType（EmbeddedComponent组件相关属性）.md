

```
1. enum ArkUI_NodeAttributeType
```

## 概述

定义ArkUI在Native侧可以设置的EmbeddedComponent组件相关属性样式集合。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_node.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h)

## NODE\_EMBEDDED\_COMPONENT\_WANT



```
1. NODE_EMBEDDED_COMPONENT_WANT = MAX_NODE_SCOPE_NUM * ARKUI_NODE_EMBEDDED_COMPONENT = 1016000
```

定义用于启动EmbeddedAbility的want。支持属性设置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | EmbeddedComponent的want参数。参数类型为[AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-abilitybase-want)。默认值为nullptr。 |

## NODE\_EMBEDDED\_COMPONENT\_OPTION



```
1. NODE_EMBEDDED_COMPONENT_OPTION = 1016001
```

EmbeddedComponent的选项。支持属性设置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | EmbeddedComponent的选项列表，参数类型为[ArkUI\_EmbeddedComponentOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-embeddedcomponentoption)。 |