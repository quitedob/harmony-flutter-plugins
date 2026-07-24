通过[toolbar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-toolbar#toolbar)通用属性为窗口标题栏添加工具栏项。

说明

该组件从API version 20开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

该组件一般配合[toolbar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-toolbar#toolbar)通用属性进行使用。

## 子组件

PhonePC/2in1TabletTVWearable

仅可包含单个子组件。

## 接口

PhonePC/2in1TabletTVWearable

### ToolBarItem

PhonePC/2in1TabletTVWearable

ToolBarItem(options?: ToolBarItemOptions)

默认在标题栏对应分栏开头位置创建工具栏项，分栏位置由绑定该[toolbar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-toolbar#toolbar)属性的组件所在分栏位置而定。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [ToolBarItemOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-toolbaritem#toolbaritemoptions对象说明) | 否 | 为ToolBarItem提供可选参数，该对象内含有[ToolBarItemPlacement](/consumer/cn/doc/harmonyos-references/ts-basic-components-toolbaritem#toolbaritemplacement枚举说明)枚举类型的placement参数。  默认值：placement: ToolBarItemPlacement.TOP\_BAR\_LEADING |

## 属性

PhonePC/2in1TabletTVWearable

不支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)。

## ToolBarItemOptions对象说明

PhonePC/2in1TabletTVWearable

用于配置ToolBarItem的可选参数，主要通过placement设置工具栏项在标题栏的放置位置。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| placement | [ToolBarItemPlacement](/consumer/cn/doc/harmonyos-references/ts-basic-components-toolbaritem#toolbaritemplacement枚举说明) | 否 | 是 | 设置工具栏项的放置位置。  默认值: ToolBarItemPlacement.TOP\_BAR\_LEADING  设置为ToolBarItemPlacement.TOP\_BAR\_LEADING时，将工具栏项放置在对应顶部栏的开头位置。  设置为ToolBarItemPlacement.TOP\_BAR\_TRAILING时，将工具栏项放置在对应顶部栏的末尾位置。 |

## ToolBarItemPlacement枚举说明

PhonePC/2in1TabletTVWearable

定义工具栏项在标题栏对应分栏的放置位置选项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| TOP\_BAR\_LEADING | 0 | 表示将工具栏项放置在对应顶部栏的开头位置。 |
| TOP\_BAR\_TRAILING | 1 | 表示将工具栏项放置在对应顶部栏的末尾位置。 |

## 示例

PhonePC/2in1TabletTVWearable

示例代码参考[toolbar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-toolbar#示例)。