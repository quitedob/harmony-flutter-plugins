[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件支持的布局算法详细信息。

说明

本模块首批接口从API version 24开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { LayoutAlgorithm, CustomLayoutAlgorithm, RowLayoutAlgorithm, ColumnLayoutAlgorithm, StackLayoutAlgorithm, GridLayoutAlgorithm } from '@kit.ArkUI';
```

## LayoutAlgorithm

PhonePC/2in1TabletTVWearable

动态布局容器[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)的布局算法基础类型。

说明

该类型变量可以赋值具体的布局算法类对象，如[CustomLayoutAlgorithm](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#customlayoutalgorithm)类对象、[RowLayoutAlgorithm](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#rowlayoutalgorithm)类对象等。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## CustomLayoutAlgorithm

PhonePC/2in1TabletTVWearable

自定义布局算法类。

说明

CustomLayoutAlgorithm类对象可以赋值给LayoutAlgorithm类型变量，作为[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件的入参指定布局算法。

**装饰器类型：** @ObservedV2

### onMeasure

PhonePC/2in1TabletTVWearable

onMeasure(self: FrameNode, constraint: LayoutConstraint): void

通过重写此函数，开发者可以自定义测量子组件的大小。ArkUI框架会在动态布局组件确定尺寸时，将该组件对应的FrameNode和布局约束通过onMeasure传递给开发者。不允许在onMeasure函数中改变状态变量。

说明

在此函数中，开发者可以调用[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[getChild()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#getchild12)方法获取子组件FrameNode，调用[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[measure()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#measure12)方法测量子组件大小，参考DynamicLayout组件[示例1（自定义布局算法实现瀑布流布局）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例1自定义布局算法实现瀑布流布局)。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self | [FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1) | 是 | 动态布局组件在组件树上的实体节点。 |
| constraint | [LayoutConstraint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#layoutconstraint12) | 是 | 动态布局组件进行测量时使用的布局约束。 |

### onLayout

PhonePC/2in1TabletTVWearable

onLayout(self: FrameNode, position: Position): void

通过重写此函数，开发者可以自定义排列子组件的位置。ArkUI框架会在动态布局组件确定位置时，将该组件对应的FrameNode和布局位置通过onLayout传递给开发者。不允许在onLayout函数中改变状态变量。

说明

在此函数中，开发者可以调用[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[getChild()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#getchild12)方法获取子组件FrameNode，调用[FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1)的[layout()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#layout12)方法设置子组件位置，参考DynamicLayout组件[示例1（自定义布局算法实现瀑布流布局）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例1自定义布局算法实现瀑布流布局)。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self | [FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#framenode-1) | 是 | 动态布局组件在组件树上的实体节点。 |
| position | [Position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#position) | 是 | 动态布局组件进行布局时使用的位置信息。 |

**示例：**

请参考DynamicLayout组件[示例1（自定义布局算法实现瀑布流布局）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例1自定义布局算法实现瀑布流布局)。

## RowLayoutAlgorithm

PhonePC/2in1TabletTVWearable

水平方向线性布局算法类。

说明

RowLayoutAlgorithm类对象可以赋值给LayoutAlgorithm类型变量，作为[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件的入参指定布局算法。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| space | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 横向布局元素水平方向间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。  装饰器类型：@Trace |
| alignItems | [VerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#verticalalign) | 否 | 是 | 所有子组件在垂直方向上的对齐格式。  默认值：VerticalAlign.Center  非法值：按默认值处理。  装饰器类型：@Trace |
| justifyContent | [FlexAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#flexalign) | 否 | 是 | 所有子组件在水平方向上的对齐格式。  默认值：FlexAlign.Start  非法值：按默认值处理。  装饰器类型：@Trace |
| isReverse | boolean | 否 | 是 | 子组件在水平方向上的排列是否反转。取值为true表示子组件在水平方向上反转排列，由于水平方向受通用属性[direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#direction)影响，如果[direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#direction)属性生效，再做一次反转。取值为false表示子组件在水平方向上正序排列。  默认值：false  非法值：按默认值处理。  装饰器类型：@Trace |

### constructor

PhonePC/2in1TabletTVWearable

constructor(option?: RowLayoutAlgorithmOptions)

水平方向线性布局算法类的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| option | [RowLayoutAlgorithmOptions](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#rowlayoutalgorithmoptions对象说明) | 否 | 水平方向线性布局算法的构造入参，设置布局算法的间距、主轴对齐方式、交叉轴对齐方式及主轴排列方向。 |

**示例：**

请参考DynamicLayout组件[示例2（切换布局算法）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例2切换布局算法)。

## RowLayoutAlgorithmOptions对象说明

PhonePC/2in1TabletTVWearable

设置水平方向线性布局算法的间距、主轴对齐方式、交叉轴对齐方式及主轴排列方向。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| space | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 横向布局元素水平方向间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。 |
| alignItems | [VerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#verticalalign) | 否 | 是 | 所有子组件在垂直方向上的对齐格式。  默认值：VerticalAlign.Center  非法值：按默认值处理。 |
| justifyContent | [FlexAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#flexalign) | 否 | 是 | 所有子组件在水平方向上的对齐格式。  默认值：FlexAlign.Start  非法值：按默认值处理。 |
| isReverse | boolean | 否 | 是 | 子组件在水平方向上的排列是否反转。取值为true表示子组件在水平方向上反转排列，由于水平方向受通用属性[direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#direction)影响，如果[direction](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#direction)属性生效，再做一次反转。取值为false表示子组件在水平方向上正序排列。  默认值：false  非法值：按默认值处理。 |

## ColumnLayoutAlgorithm

PhonePC/2in1TabletTVWearable

垂直方向线性布局算法类。

说明

ColumnLayoutAlgorithm类对象可以赋值给LayoutAlgorithm类型变量，作为[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件的入参指定布局算法。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| space | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 纵向布局元素垂直方向间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。  装饰器类型：@Trace |
| alignItems | [HorizontalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#horizontalalign) | 否 | 是 | 所有子组件在水平方向上的对齐格式。  默认值：HorizontalAlign.Center  非法值：按默认值处理。  装饰器类型：@Trace |
| justifyContent | [FlexAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#flexalign) | 否 | 是 | 所有子组件在垂直方向上的对齐格式。  默认值：FlexAlign.Start  非法值：按默认值处理。  装饰器类型：@Trace |
| isReverse | boolean | 否 | 是 | 子组件在垂直方向上的排列是否反转。取值为true表示子组件在垂直方向上反转排列。取值为false表示子组件在垂直方向上正序排列。  默认值：false  非法值：按默认值处理。  装饰器类型：@Trace |

### constructor

PhonePC/2in1TabletTVWearable

constructor(option?: ColumnLayoutAlgorithmOptions)

垂直方向线性布局算法类的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| option | [ColumnLayoutAlgorithmOptions](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#columnlayoutalgorithmoptions对象说明) | 否 | 垂直方向线性布局算法的构造入参，设置布局算法的间距、主轴对齐方式、交叉轴对齐方式及主轴排列方向。 |

**示例：**

请参考DynamicLayout组件[示例2（切换布局算法）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例2切换布局算法)。

## ColumnLayoutAlgorithmOptions对象说明

PhonePC/2in1TabletTVWearable

设置垂直方向线性布局算法的间距、主轴对齐方式、交叉轴对齐方式及主轴排列方向。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| space | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 纵向布局元素垂直方向间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。 |
| alignItems | [HorizontalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#horizontalalign) | 否 | 是 | 所有子组件在水平方向上的对齐格式。  默认值：HorizontalAlign.Center  非法值：按默认值处理。 |
| justifyContent | [FlexAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#flexalign) | 否 | 是 | 所有子组件在垂直方向上的对齐格式。  默认值：FlexAlign.Start  非法值：按默认值处理。 |
| isReverse | boolean | 否 | 是 | 子组件在垂直方向上的排列是否反转。取值为true表示子组件在垂直方向上反转排列。取值为false表示子组件在垂直方向上正序排列。  默认值：false  非法值：按默认值处理。 |

## StackLayoutAlgorithm

PhonePC/2in1TabletTVWearable

堆叠布局算法类。

说明

StackLayoutAlgorithm类对象可以赋值给LayoutAlgorithm类型变量，作为[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件的入参指定布局算法。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| alignContent | [LocalizedAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#localizedalignment20) | 否 | 是 | 设置子组件在堆叠布局算法中对齐格式。  默认值：LocalizedAlignment.CENTER  非法值：按默认值处理。  装饰器类型：@Trace |

### constructor

PhonePC/2in1TabletTVWearable

constructor(option?: StackLayoutAlgorithmOptions)

堆叠布局算法类的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| option | [StackLayoutAlgorithmOptions](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#stacklayoutalgorithmoptions对象说明) | 否 | 堆叠布局算法的构造入参，设置九宫格对齐格式。 |

**示例：**

请参考DynamicLayout组件[示例2（切换布局算法）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例2切换布局算法)。

## StackLayoutAlgorithmOptions对象说明

PhonePC/2in1TabletTVWearable

设置堆叠布局算法的对齐方式。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| alignContent | [LocalizedAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#localizedalignment20) | 否 | 是 | 设置子组件在堆叠布局算法中对齐格式。  默认值：LocalizedAlignment.CENTER  非法值：按默认值处理。 |

## GridLayoutAlgorithm

PhonePC/2in1TabletTVWearable

网格布局算法类。

说明

GridLayoutAlgorithm类对象可以赋值给LayoutAlgorithm类型变量，作为[DynamicLayout](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout)组件的入参指定布局算法。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| columnsTemplate | string | [ItemFillPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#itemfillpolicy22) | 否 | 是 | 设置当前网格布局的列数。  默认值：'1fr'  非法值：按默认值处理。  装饰器类型：@Trace |
| columnsGap | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 列与列之间的间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。  装饰器类型：@Trace |
| rowsGap | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 行与行之间的间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。  装饰器类型：@Trace |

### constructor

PhonePC/2in1TabletTVWearable

constructor(option?: GridLayoutAlgorithmOptions)

网格布局算法类的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| option | [GridLayoutAlgorithmOptions](/consumer/cn/doc/harmonyos-references/js-apis-arkui-layoutalgorithm#gridlayoutalgorithmoptions对象说明) | 否 | 网格布局算法的构造入参，设置网格布局的列数、列间距、行间距。 |

**示例：**

请参考DynamicLayout组件[示例2（切换布局算法）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-dynamiclayout#示例2切换布局算法)。

## GridLayoutAlgorithmOptions对象说明

PhonePC/2in1TabletTVWearable

设置网格布局算法的列数模板、列间距、行间距。

**模型约束：** 此接口仅可在Stage模型下使用。

**卡片能力：** 从API version 24开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 24开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| columnsTemplate | string | [ItemFillPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#itemfillpolicy22) | 否 | 是 | 设置当前网格布局的列数。  默认值：'1fr'  非法值：按默认值处理。 |
| columnsGap | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 列与列之间的间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。 |
| rowsGap | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 行与行之间的间距。  默认值：LengthMetrics.vp(0)  非法值：按默认值处理。 |