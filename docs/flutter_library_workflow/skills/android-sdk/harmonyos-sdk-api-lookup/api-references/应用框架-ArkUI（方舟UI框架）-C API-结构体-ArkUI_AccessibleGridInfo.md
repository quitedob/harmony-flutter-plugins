

```
1. typedef struct {...} ArkUI_AccessibleGridInfo
```

## 概述

PhonePC/2in1TabletTVWearable

用于配置特定组件（如[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)、[Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex)、[Select](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select)、[Swiper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-swiper)组件）的网格布局属性。

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
| int32\_t rowCount | 组件的行数。取值范围为大于0的整数。 |
| int32\_t columnCount | 组件的列数。取值范围为大于0的整数。 |
| int32\_t selectionMode | 值为0时表示仅选中网格的一行，非0值时表示选中网格的多行。 |