子标题，用于列表项或内容项顶部，将该列表或内容划分为一个区块，子标题名称用来概括该区块内容。

该组件基于[状态管理（V2）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-overview#状态管理v2)实现，相较于[状态管理（V1）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-overview#状态管理v1)，状态管理（V2）增强了对数据对象的深度观察与管理能力，不再局限于组件层级。借助状态管理（V2），开发者可以通过该组件更灵活地控制子标题的数据和状态，实现更高效的用户界面刷新。

说明

* 该组件从API version 18开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 该组件仅可在Stage模型下使用。
* 如果SubHeaderV2设置[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)和[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)，编译工具链会额外生成节点\_\_Common\_\_，并将通用属性或通用事件挂载在\_\_Common\_\_上，而不是直接应用到SubHeaderV2本身。这可能导致开发者设置的通用属性或通用事件不生效或不符合预期，因此，不建议SubHeaderV2设置通用属性和通用事件。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { SubHeaderV2 } from '@kit.ArkUI';
```

## 子组件

PhonePC/2in1TabletTVWearable

无

## SubHeaderV2

PhonePC/2in1TabletTVWearable

SubHeaderV2({ icon?: SubHeaderV2IconType, title?: SubHeaderV2Title, select?: SubHeaderV2Select, operationType?: SubHeaderV2OperationType, operationItems?: SubHeaderV2OperationItem[], titleBuilder?: SubHeaderV2TitleBuilder; })

子标题，用于列表项顶部，将该组列表划分为一个区块，子标题名称用来概括该区块内容。也可以用于内容项顶部，子标题名称用来概括该区块内容。

**装饰器类型：** @ComponentV2

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| icon | [SubHeaderV2IconType](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2icontype) | 否 | @Param | 图标设置项。  默认值：undefined  当title使用secondaryTitle属性时，设置icon属性才会生效。 |
| title | [SubHeaderV2Title](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2title) | 否 | @Param | 标题设置项。  默认值：undefined |
| select | [SubHeaderV2Select](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2select) | 否 | @Param | select内容以及事件。  默认值：undefined |
| operationType | [SubHeaderV2OperationType](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationtype) | 否 | @Param | 操作区元素样式。  默认值：SubHeaderV2OperationType.BUTTON |
| operationItems | [SubHeaderV2OperationItem](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitem)[] | 否 | @Param | 操作区的设置项。  默认值：undefined |
| titleBuilder | [SubHeaderV2TitleBuilder](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2titlebuilder) | 否 | @BuilderParam | 自定义标题区内容。  默认值：() => void |

## SubHeaderV2IconType

PhonePC/2in1TabletTVWearable

type SubHeaderV2IconType = ResourceStr | SymbolGlyphModifier

图标内容的联合类型。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 类型 | 说明 |
| --- | --- |
| [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 资源类型，用于定义普通图标。 |
| [SymbolGlyphModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/universal-attributes-attribute-symbolglyphmodifier#symbolglyphmodifier) | Symbol类型，用于定义Symbol图标。 |

## SubHeaderV2Title

PhonePC/2in1TabletTVWearable

标题设置项。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| primaryTitle | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 标题内容。  当[SubHeaderV2](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2-1)中同时使用primaryTitle、secondaryTitle、icon属性时，设置primaryTitle属性不生效。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| secondaryTitle | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 副标题内容。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| primaryTitleModifier | [TextModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#自定义modifier) | 否 | 是 | 设置标题文本属性，如设置标题颜色、字体大小、字重等。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| secondaryTitleModifier | [TextModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#自定义modifier) | 否 | 是 | 设置副标题文本属性，如设置副标题颜色、字体大小、字重等。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| titleAccessibilityText23+ | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 设置标题自定义朗读内容。  默认值：undefined  值为undefined时，默认朗读组件显示的标题内容。  装饰器类型：@Trace  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 标题id。需要为标题设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置标题id。  装饰器类型：@Trace  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(options: SubHeaderV2TitleOptions)

标题内容信息SubHeaderV2Title构造函数。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [SubHeaderV2TitleOptions](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2titleoptions) | 是 | 标题内容信息。 |

## SubHeaderV2TitleOptions

PhonePC/2in1TabletTVWearable

用于构建SubHeaderV2Title对象。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| primaryTitle | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 标题内容。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| secondaryTitle | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 副标题内容。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| primaryTitleModifier | [TextModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#自定义modifier) | 否 | 是 | 设置标题文本属性，如设置主标题颜色、字体大小、字重等。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| secondaryTitleModifier | [TextModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#自定义modifier) | 否 | 是 | 设置副标题文本属性，如设置副标题颜色、字体大小、字重等。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| titleAccessibilityText23+ | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 设置标题自定义朗读内容。  默认值：undefined  值为undefined时，默认朗读组件显示的标题内容。  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 标题id。需要为标题设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置标题id。  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

## SubHeaderV2Select

PhonePC/2in1TabletTVWearable

select内容以及事件。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| options | [SelectOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select#selectoption对象说明)[] | 否 | 否 | 下拉选项内容。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| selectedIndex | number | 否 | 是 | 设置下拉菜单初始选项的索引。  第一项的索引为0。  当不设置selected属性时，  默认选择值为-1，菜单项不选中。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| selectedContent | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 设置下拉按钮本身的文本内容。默认值：'' 。从API version 20开始，支持Resource类型。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| onSelect | [SubHeaderV2SelectOnSelect](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2selectonselect) | 否 | 是 | 下拉菜单选中某一项的回调。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| defaultFocus | boolean | 否 | 是 | 下拉按钮是否为默认焦点。  true：下拉按钮是默认焦点。  false：下拉按钮不是默认焦点。  默认值：false  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 下拉按钮id。需要为下拉按钮设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置下拉按钮id。  装饰器类型：@Trace  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(options: SubHeaderV2SelectOptions)

select内容以及事件构造函数。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [SubHeaderV2SelectOptions](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2selectoptions) | 是 | 下拉选项信息。 |

## SubHeaderV2SelectOptions

PhonePC/2in1TabletTVWearable

用于构建SubHeaderV2Select对象。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| options | [SelectOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select#selectoption对象说明)[] | 否 | 否 | 下拉选项内容。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| selectedIndex | number | 否 | 是 | 设置下拉菜单初始选项的索引。  第一项的索引为0。  当不设置selected属性时，  默认选择值为-1，菜单项不选中。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| selectedContent | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 设置下拉按钮本身的文本内容。默认值：''。从API version 20开始，支持Resource类型。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| onSelect | [SubHeaderV2SelectOnSelect](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2selectonselect) | 否 | 是 | 下拉菜单选中某一项的回调。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| defaultFocus | boolean | 否 | 是 | 下拉按钮是否为默认焦点。  true：下拉按钮是默认焦点。  false：下拉按钮不是默认焦点。  默认值：false  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 下拉按钮id。需要为下拉按钮设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置下拉按钮id。  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

## SubHeaderV2SelectOnSelect

PhonePC/2in1TabletTVWearable

type SubHeaderV2SelectOnSelect = (selectedIndex: number, selectedContent?: string) => void

下拉菜单选中某一项的回调类型。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| selectedIndex | number | 是 | 表示选中的下拉菜单项的索引值。 |
| selectedContent | string | 否 | 表示选中的下拉菜单项的内容值。 |

## SubHeaderV2OperationType

PhonePC/2in1TabletTVWearable

操作区元素样式。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| TEXT\_ARROW | 0 | 文本按钮（带右箭头）。 |
| BUTTON | 1 | 文本按钮（不带右箭头）。 |
| ICON\_GROUP | 2 | 图标按钮（最多支持配置三张图标）。 |
| LOADING | 3 | 加载动画。 |

## SubHeaderV2OperationItemType

PhonePC/2in1TabletTVWearable

type SubHeaderV2OperationItemType = ResourceStr | SymbolGlyphModifier

操作区元素内容的联合类型。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 类型 | 说明 |
| --- | --- |
| [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 字符串类型用于定义文本显示或普通图标；资源类型，用于定义普通图标。 |
| [SymbolGlyphModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/universal-attributes-attribute-symbolglyphmodifier#symbolglyphmodifier) | Symbol类型，用于定义Symbol图标。 |

## SubHeaderV2OperationItem

PhonePC/2in1TabletTVWearable

操作区的设置项。

**装饰器类型：** @ObservedV2

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| content | [SubHeaderV2OperationItemType](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemtype) | 否 | 否 | 操作区元素内容。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| action | [SubHeaderV2OperationItemAction](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemaction) | 否 | 是 | 操作区事件。默认值：() => void。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityText | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 子标题右侧icon图标无障碍描述。  默认值：undefined  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityLevel | string | 否 | 是 | 子标题右侧icon图标无障碍重要性。  支持的值为：  "auto"：当前子标题右侧icon图标由无障碍分组服务和ArkUI进行综合判断是否可被无障碍辅助服务所识别。  "yes"：当前子标题右侧icon图标可被无障碍辅助服务所识别。  "no"：当前子标题右侧icon图标不可被无障碍辅助服务所识别。  "no-hide-descendants"：当前子标题右侧icon图标及其所有子组件不可被无障碍辅助服务所识别。  默认值: “yes”。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityDescription | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 子标题右侧icon图标无障碍说明，用于为用户进一步说明当前组件。  默认值：“单指双击即可执行”。  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| defaultFocus | boolean | 否 | 是 | 子标题右侧按钮是否为默认焦点。  true：子标题右侧按钮是默认焦点。  false：子标题右侧按钮不是默认焦点。  默认值：false  装饰器类型：@Trace  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 子标题右侧按钮id。需要为子标题右侧按钮设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置子标题右侧按钮id。  装饰器类型：@Trace  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(options: SubHeaderV2OperationItemOptions)

操作项SubHeaderV2OperationItem的构造函数。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [SubHeaderV2OperationItemOptions](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemoptions) | 是 | 操作项配置信息。用于构建SubHeaderV2OperationItem对象。 |

## SubHeaderV2OperationItemAction

PhonePC/2in1TabletTVWearable

type SubHeaderV2OperationItemAction = () => void

操作区的设置项的回调事件类型。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

## SubHeaderV2OperationItemOptions

PhonePC/2in1TabletTVWearable

用于构建SubHeaderV2OperationItem对象。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| content | [SubHeaderV2OperationItemType](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemtype) | 否 | 否 | 操作项显示的内容。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| action | [SubHeaderV2OperationItemAction](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemaction) | 否 | 是 | 选项操作事件。默认值：() => void。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityText | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 子标题右侧icon图标无障碍描述。  默认值：undefined  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityLevel | string | 否 | 是 | 子标题右侧icon图标无障碍重要性。  支持的值为：  "auto"：当前子标题右侧icon图标由无障碍分组服务和ArkUI进行综合判断是否可被无障碍辅助服务所识别。  "yes"：当前子标题右侧icon图标可被无障碍辅助服务所识别。  "no"：当前子标题右侧icon图标不可被无障碍辅助服务所识别。  "no-hide-descendants"：当前子标题右侧icon图标及其所有子组件不可被无障碍辅助服务所识别。  默认值: “yes”。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| accessibilityDescription | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 子标题右侧icon图标无障碍说明，用于为用户进一步说明当前组件。  默认值：“单指双击即可执行”。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| defaultFocus | boolean | 否 | 是 | 子标题右侧按钮是否为默认焦点。  true：子标题右侧按钮是默认焦点。  false：子标题右侧按钮不是默认焦点。  默认值：false  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| id24+ | string | 否 | 是 | 子标题右侧按钮id。需要为子标题右侧按钮设置id的时候设置此参数，缺省时不设置此参数。  默认值：undefined，表示不设置子标题右侧按钮id。  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。 |

## SubHeaderV2TitleBuilder

PhonePC/2in1TabletTVWearable

type SubHeaderV2TitleBuilder= () => void

自定义标题区内容的回调事件类型。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

## 事件

PhonePC/2in1TabletTVWearable

不支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（效率型子标题）

该示例主要演示子标题左侧为icon、secondaryTitle，右侧operationType为按钮类型。



```
1. import {
2. SubHeaderV2OperationType,
3. SubHeaderV2,
4. SubHeaderV2Title,
5. SubHeaderV2OperationItem,
6. Prompt,
7. TextModifier
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local selectText: string = "TTTTT"
14. @Local selectIndex: number = 2
15. @Local flag: boolean = true;
16. @Local index: number = 1;
17. @Local primaryTitle: ResourceStr = '一级标题';
18. @Local secondaryTitle: ResourceStr = '二级标题';
19. @Local subHeaderIcon: Resource = $r('sys.media.ohos_ic_public_email');
20. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题' });
21. @Local primaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
22. @Local secondaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
23. @Local subHeaderOperationType: SubHeaderV2OperationType = SubHeaderV2OperationType.BUTTON;
24. @Local operationItems: SubHeaderV2OperationItem[] = [];

26. aboutToAppear(): void {
27. this.title = new SubHeaderV2Title({
28. primaryTitle: this.primaryTitle,
29. secondaryTitle: this.secondaryTitle,
30. });
31. this.operationItems = [new SubHeaderV2OperationItem({
32. content: '操作',
33. action: () => {
34. Prompt.showToast({ message: 'demo2' })
35. }
36. })]
37. }

39. build() {
40. Column() {
41. Column() {
42. SubHeaderV2({
43. icon: this.subHeaderIcon,
44. title: this.title,
45. operationType: this.subHeaderOperationType,
46. operationItems: this.operationItems
47. });
48. }
49. }
50. }
51. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/JOsFrbHzSZu9o-V77NqgfA/zh-cn_image_0000002599359027.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=57E3A558D11F8F1DAD83310370F8F71A6F34190315AD38E21C9EA433E5C51414)

### 示例2（双行文本内容型子标题）

该示例主要演示子标题左侧为primaryTitle、secondaryTitle，右侧operationType类型为TEXT\_ARROW。



```
1. import {
2. SubHeaderV2OperationType,
3. SubHeaderV2,
4. SubHeaderV2Title,
5. SubHeaderV2OperationItem,
6. Prompt,
7. TextModifier
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题', secondaryTitle: '二级标题' });
14. @Local primaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
15. @Local secondaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
16. @Local subHeaderOperationType: SubHeaderV2OperationType = SubHeaderV2OperationType.TEXT_ARROW;
17. @Local operationItems: SubHeaderV2OperationItem[] = [];

19. aboutToAppear(): void {
20. this.title = new SubHeaderV2Title({
21. primaryTitle: '一级标题',
22. secondaryTitle: '二级标题'
23. });
24. this.operationItems = [new SubHeaderV2OperationItem({
25. content: '更多',
26. action: () => {
27. Prompt.showToast({ message: 'demo2' })
28. }
29. })]
30. }

32. build() {
33. Column() {
34. Column() {
35. SubHeaderV2({
36. title: this.title,
37. operationType: this.subHeaderOperationType,
38. operationItems: this.operationItems
39. });
40. }
41. }
42. }
43. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/48/v3/xwr8hL-iSzexT6L8PQgsSA/zh-cn_image_0000002568919434.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=8D7CC674972F5A373AD8B1A9032EC5A2BFCD8BA4F68DE0B1C5A240F2CECF1C98)

### 示例3（spinner型内容型子标题）

该示例主要演示子标题左侧为select，右侧operationType类型为ICON\_GROUP。



```
1. import {
2. SubHeaderV2,
3. SubHeaderV2OperationType,
4. SubHeaderV2OperationItem,
5. SubHeaderV2Title,
6. SubHeaderV2Select,
7. Prompt
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local selectedValue: string = 'aaa';
14. @Local selectedIndex: number = 0;
15. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题', secondaryTitle: '二级标题' });
16. @Local operationItems: SubHeaderV2OperationItem[] = [];
17. @Local select: SubHeaderV2Select =
18. new SubHeaderV2Select({ options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }] });

20. aboutToAppear(): void {

22. this.title = new SubHeaderV2Title({
23. primaryTitle: '一级标题',
24. secondaryTitle: '二级标题'
25. });

27. this.selectedValue = 'selectDemo';
28. this.select = new SubHeaderV2Select({
29. options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }],
30. selectedContent: this.selectedValue,
31. selectedIndex: this.selectedIndex,
32. onSelect: (index: number, value?: string) => {
33. Prompt.showToast({ message: 'selectDemo' })
34. }
35. })

37. this.operationItems = [
38. new SubHeaderV2OperationItem({
39. content: $r('sys.media.ohos_ic_public_email'),
40. action: () => {
41. Prompt.showToast({ message: 'demo' })
42. }
43. }),
44. new SubHeaderV2OperationItem({
45. content: $r('sys.media.ohos_ic_public_email'),
46. action: () => {
47. Prompt.showToast({ message: 'demo' })
48. }
49. }),
50. new SubHeaderV2OperationItem({
51. content: $r('sys.media.ohos_ic_public_email'),
52. action: () => {
53. Prompt.showToast({ message: 'demo' })
54. }
55. })]
56. }

58. build() {
59. Column() {
60. Column() {
61. SubHeaderV2({
62. select: this.select,
63. operationType: SubHeaderV2OperationType.ICON_GROUP,
64. operationItems: this.operationItems
65. })
66. }
67. }
68. }
69. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/sf6G4FiHTeWH-AeCsWj7zg/zh-cn_image_0000002599478977.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=3925913A53642CB6CAF54C78A76076BECCBE15DB6F5A5F991C9F8950344F3560)

### 示例4（设置左侧symbol图标）

该示例主要演示子标题左侧icon设置symbol图标。



```
1. import {
2. SubHeaderV2,
3. SubHeaderV2OperationType,
4. SubHeaderV2OperationItem,
5. SubHeaderV2Title,
6. Prompt,
7. SymbolGlyphModifier
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local icon: SymbolGlyphModifier = new SymbolGlyphModifier($r('sys.symbol.ohos_wifi'));

15. aboutToAppear(): void {
16. this.icon = new SymbolGlyphModifier($r('sys.symbol.ohos_wifi')).fontSize(24);
17. this.icon.effectStrategy(SymbolEffectStrategy.HIERARCHICAL)
18. }

20. build() {
21. Column() {
22. SubHeaderV2({
23. icon: this.icon,
24. title: new SubHeaderV2Title({ secondaryTitle: '标题' }),
25. operationType: SubHeaderV2OperationType.BUTTON,
26. operationItems: [new SubHeaderV2OperationItem({
27. content: '操作',
28. action: () => {
29. Prompt.showToast({ message: 'demo' })
30. }
31. })]
32. })
33. }
34. }
35. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/QdwoTMDbR7K4M-KNF8_ahQ/zh-cn_image_0000002568759786.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=A2113581F322A2D53D82A0DAEE8BFAE032E01136AD757098C833D0634C824FBE)

### 示例5（设置右侧symbol图标）

该示例主要演示子标题operationType设置为OperationType.ICON\_GROUP，operationItem的value设置为symbol图标。



```
1. import {
2. SubHeaderV2,
3. SubHeaderV2OperationType,
4. SubHeaderV2OperationItem,
5. SubHeaderV2Title,
6. SubHeaderV2Select,
7. Prompt,
8. SymbolGlyphModifier
9. } from '@kit.ArkUI';

11. @Entry
12. @ComponentV2
13. struct SubHeaderExample {
14. @Local icon: SymbolGlyphModifier = new SymbolGlyphModifier($r('sys.symbol.ohos_wifi'));
15. @Local selectedValue: string = 'aaa';
16. @Local selectedIndex: number = 2;
17. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题', secondaryTitle: '二级标题' });
18. @Local operationItem: SubHeaderV2OperationItem[] = [];
19. @Local select: SubHeaderV2Select =
20. new SubHeaderV2Select({ options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }] });

22. aboutToAppear(): void {
23. this.icon = new SymbolGlyphModifier($r('sys.symbol.ohos_wifi'));
24. this.icon.effectStrategy(SymbolEffectStrategy.HIERARCHICAL);

26. this.selectedValue = 'selectDemo';
27. this.selectedIndex = 2;
28. this.title = new SubHeaderV2Title({
29. primaryTitle: '一级标题',
30. secondaryTitle: '二级标题'
31. });
32. this.select = new SubHeaderV2Select({
33. options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }],
34. selectedContent: this.selectedValue,
35. selectedIndex: this.selectedIndex,
36. onSelect: (index: number, value?: string) => {
37. Prompt.showToast({ message: 'demo' })
38. }
39. })

41. this.operationItem = [
42. new SubHeaderV2OperationItem({
43. content: new SymbolGlyphModifier($r('sys.symbol.ohos_lungs')).fontWeight(FontWeight.Lighter),
44. action: () => {
45. Prompt.showToast({ message: 'demo1' })
46. }
47. }),
48. new SubHeaderV2OperationItem({
49. content: new SymbolGlyphModifier($r('sys.symbol.ohos_lungs'))
50. .renderingStrategy(SymbolRenderingStrategy.MULTIPLE_COLOR)
51. .fontColor([Color.Blue, Color.Grey, Color.Green])
52. ,
53. action: () => {
54. Prompt.showToast({ message: 'demo2' })
55. }
56. }),
57. new SubHeaderV2OperationItem({
58. content: new SymbolGlyphModifier($r('sys.symbol.ohos_lungs'))
59. .renderingStrategy(SymbolRenderingStrategy.MULTIPLE_OPACITY)
60. .fontColor([Color.Blue, Color.Grey, Color.Green])
61. ,
62. action: () => {
63. Prompt.showToast({ message: 'demo3' })
64. }
65. })]
66. }

68. build() {
69. Column() {
70. SubHeaderV2({
71. select: this.select,
72. operationType: SubHeaderV2OperationType.ICON_GROUP,
73. operationItems: this.operationItem
74. })
75. }
76. }
77. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/6HfuawvzQiCWtMUOx8KXog/zh-cn_image_0000002599359029.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=8820279C9762CE26CDDA272439656400B99F7623BC841001F15893B83BD754C3)

### 示例6（自定义标题内容）

该示例主要演示SubHeaderV2设置titleBuilder自定义标题内容的效果。



```
1. import {
2. SubHeaderV2,
3. SubHeaderV2OperationType,
4. SubHeaderV2OperationItem,
5. SubHeaderV2Title,
6. Prompt
7. } from '@kit.ArkUI';

9. @Entry
10. @ComponentV2
11. struct SubHeaderExample {
12. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题' });
13. @Local operationItem: SubHeaderV2OperationItem[] = [];

15. aboutToAppear(): void {
16. this.title = new SubHeaderV2Title({
17. primaryTitle: '一级标题',
18. secondaryTitle: '二级标题'
19. });
20. this.operationItem = [new SubHeaderV2OperationItem({
21. content: '更多信息',
22. action: () => {
23. Prompt.showToast({ message: 'demo' })
24. }
25. })]
26. }

28. @Builder
29. TitleBuilder(): void {
30. Text('自定义标题')
31. .fontSize(24)
32. .fontColor(Color.Blue)
33. .fontWeight(FontWeight.Bold)
34. }

36. build() {
37. Column() {
38. SubHeaderV2({
39. titleBuilder: () => {
40. this.TitleBuilder();
41. },
42. title: this.title,

44. operationType: SubHeaderV2OperationType.TEXT_ARROW,
45. operationItems: this.operationItem
46. })
47. }
48. }
49. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/88/v3/JLz8PAviR4SkFuNoDXjSjg/zh-cn_image_0000002568919436.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=BB9920CC24A8B7BF1685ECB7DF4C9A927A60AC776D67ADB702C1FB3CBDBBC586)

### 示例7（自定义标题样式）

该示例主要演示SubHeaderV2设置标题和副标题字体样式。



```
1. import {
2. SubHeaderV2,
3. SubHeaderV2OperationType,
4. SubHeaderV2OperationItem,
5. SubHeaderV2Title,
6. Prompt,
7. TextModifier
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local primaryModifier: TextModifier = new TextModifier().fontColor(Color.Blue);
14. @Local secondaryModifier: TextModifier = new TextModifier().fontColor(Color.Blue);
15. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题' });
16. @Local operationItems4: SubHeaderV2OperationItem[] = [];

18. aboutToAppear(): void {
19. this.title = new SubHeaderV2Title({
20. primaryTitle: '一级标题',
21. primaryTitleModifier: this.primaryModifier,
22. secondaryTitle: '二级标题',
23. secondaryTitleModifier: this.secondaryModifier
24. });
25. this.operationItems4 = [new SubHeaderV2OperationItem({
26. content: '更多信息',
27. action: () => {
28. Prompt.showToast({ message: 'demo' })
29. }
30. })]
31. }

33. build() {
34. Column() {
35. SubHeaderV2({
36. title: this.title,
37. operationType: SubHeaderV2OperationType.TEXT_ARROW,
38. operationItems: this.operationItems4
39. })
40. }
41. }
42. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/bsLGv8d9QW-R_nHDnCwIyA/zh-cn_image_0000002568919438.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=6B00FA370F038D123EA6A2CE2404B7AD9FC33096BF9BCC77BD70D2DF46BC0F44)

### 示例8（右侧按钮自定义播报）

该示例通过设置SubHeaderV2的右侧按钮属性accessibilityText、accessibilityDescription、accessibilityLevel自定义屏幕朗读播报文本。



```
1. import {
2. SubHeaderV2OperationType,
3. SubHeaderV2,
4. SubHeaderV2Title,
5. SubHeaderV2OperationItem,
6. SubHeaderV2IconType,
7. SubHeaderV2Select,
8. Prompt
9. } from '@kit.ArkUI';

11. @Entry
12. @ComponentV2
13. struct SubHeaderExample {
14. @Local index: number = 1;
15. @Local primaryTitle: ResourceStr = '一级标题';
16. @Local secondaryTitle: ResourceStr = '二级标题';
17. @Local subHeaderIcon: SubHeaderV2IconType | undefined = $r('sys.media.ohos_ic_public_email');
18. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题' });
19. @Local title2: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题', secondaryTitle: '二级标题' });
20. @Local subHeaderOperationType: SubHeaderV2OperationType = SubHeaderV2OperationType.BUTTON;
21. @Local subHeaderOperationType2: SubHeaderV2OperationType = SubHeaderV2OperationType.TEXT_ARROW;
22. @Local subHeaderOperationType3: SubHeaderV2OperationType = SubHeaderV2OperationType.ICON_GROUP;
23. @Local operationItems: SubHeaderV2OperationItem[] = [];
24. @Local selectedValue: string | undefined = 'selectDemo';
25. @Local selectedIndex: number = 0;
26. @Local select: SubHeaderV2Select =
27. new SubHeaderV2Select({ options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }] });

29. aboutToAppear(): void {
30. this.select = new SubHeaderV2Select({ options: [] });
31. this.title = new SubHeaderV2Title({
32. primaryTitle: this.primaryTitle,
33. secondaryTitle: this.secondaryTitle,
34. });
35. this.operationItems = [new SubHeaderV2OperationItem({
36. content: '操作',
37. action: () => {
38. Prompt.showToast({ message: 'demo2' })
39. }
40. })]
41. }

43. build() {
44. Column() {
45. Column() {
46. SubHeaderV2({
47. icon: this.subHeaderIcon,
48. title: this.title,
49. select: this.select,
50. operationType: this.subHeaderOperationType,
51. operationItems: this.operationItems
52. });
53. Divider().color('grey').width('100%').height('2vp')
54. SubHeaderV2({
55. title: this.title2,
56. select: this.select,
57. operationType: this.subHeaderOperationType2,
58. operationItems: this.operationItems
59. });
60. Divider().color('grey').width('100%').height('2vp')
61. SubHeaderV2({
62. select: new SubHeaderV2Select({
63. options: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }],
64. selectedIndex: this.selectedIndex,
65. selectedContent: this.selectedValue,
66. onSelect: (index: number, value?: string) => {
67. this.selectedIndex = index;
68. this.selectedValue = value;
69. Prompt.showToast({ message: this.selectedValue })
70. }
71. }),
72. operationType: this.subHeaderOperationType3,
73. operationItems: [new SubHeaderV2OperationItem({
74. content: $r('sys.media.ohos_ic_public_email'),
75. accessibilityText: '图标1',
76. accessibilityLevel: 'yes',
77. }), new SubHeaderV2OperationItem({
78. content: $r('sys.media.ohos_ic_public_email'),
79. accessibilityText: '图标2',
80. accessibilityLevel: 'no',
81. }), new SubHeaderV2OperationItem({
82. content: $r('sys.media.ohos_ic_public_email'),
83. accessibilityText: '图标3',
84. accessibilityDescription: '点击操作图标3',
85. })]
86. });
87. }
88. Divider().color('grey').width('100%').height('2vp')
89. }
90. }
91. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/wcBmtasESQuZ800SgO5j6w/zh-cn_image_0000002568759788.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=7FDB5248DF2534AD351B225325B0C4BACDA156838F5304260BB7DC791CD7AA0A)

### 示例9（右侧按钮设置默认获焦）

在获焦状态下，该示例通过设置SubHeaderV2的右侧按钮属性defaultFocus使其默认获焦。

从API version 18开始，在[SubHeaderV2OperationItem](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-subheaderv2#subheaderv2operationitemoptions)中新增defaultFocus接口。



```
1. import {
2. SubHeaderV2OperationType,
3. SubHeaderV2,
4. SubHeaderV2Title,
5. SubHeaderV2OperationItem,
6. Prompt,
7. TextModifier
8. } from '@kit.ArkUI';

10. @Entry
11. @ComponentV2
12. struct SubHeaderExample {
13. @Local selectText: string = "TTTTT"
14. @Local selectIndex: number = 2
15. @Local flag: boolean = true;
16. @Local index: number = 1;
17. @Local primaryTitle: ResourceStr = '一级标题';
18. @Local secondaryTitle: ResourceStr = '二级标题';
19. @Local subHeaderIcon: Resource = $r('sys.media.ohos_ic_public_email');
20. @Local title: SubHeaderV2Title = new SubHeaderV2Title({ primaryTitle: '一级标题' });
21. @Local primaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
22. @Local secondaryModifier: TextModifier = new TextModifier().fontColor(Color.Red);
23. @Local subHeaderOperationType: SubHeaderV2OperationType = SubHeaderV2OperationType.BUTTON;
24. @Local operationItems: SubHeaderV2OperationItem[] = [];

26. aboutToAppear(): void {
27. this.title = new SubHeaderV2Title({
28. secondaryTitle: this.secondaryTitle,
29. });
30. this.operationItems = [new SubHeaderV2OperationItem({
31. content: '操作',
32. defaultFocus: true,
33. action: () => {
34. Prompt.showToast({ message: 'demo2' })
35. }
36. })]
37. }

39. build() {
40. Column() {
41. Column() {
42. SubHeaderV2({
43. icon: this.subHeaderIcon,
44. title: this.title,
45. operationType: this.subHeaderOperationType,
46. operationItems: this.operationItems
47. });
48. }
49. }
50. }
51. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/8yMNwl-BQyStsBunzw5wiQ/zh-cn_image_0000002599359031.png?HW-CC-KV=V1&HW-CC-Date=20260511T035923Z&HW-CC-Expire=86400&HW-CC-Sign=5A045861941269C9C279768C9B4E62CC0C0C2BE57A1D7889B000A7F0E0F15888)