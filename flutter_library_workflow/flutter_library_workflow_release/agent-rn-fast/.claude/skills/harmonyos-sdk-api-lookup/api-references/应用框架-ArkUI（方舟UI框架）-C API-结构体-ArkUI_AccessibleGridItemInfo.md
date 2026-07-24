

```
1. typedef struct {...} ArkUI_AccessibleGridItemInfo
```

## 概述

PhonePC/2in1TabletTVWearable

用于配置特定组件（[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)、[Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex)、[Select](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select)、[Swiper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper)组件）的属性值。

**起始版本：** 13

**相关模块：** [ArkUI\_Accessibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-accessibility)

**所在头文件：** [native\_interface\_accessibility.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-accessibility-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| bool heading | 是否是标题。true表示是标题，false表示不是标题。 |
| bool selected | 是否被选中。true表示被选中，false表示未被选中。 |
| int32\_t columnIndex | 列下标。取值范围为大于0的整数。 |
| int32\_t rowIndex | 行下标。取值范围为大于0的整数。 |
| int32\_t columnSpan | 列跨度。取值范围为大于0的整数。 |
| int32\_t rowSpan | 行跨度。取值范围为大于0的整数。 |