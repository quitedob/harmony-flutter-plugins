

```
1. enum ArkUI_NodeAttributeType
```

## 概述

定义ArkUI在Native侧可以设置的富文本类组件相关属性样式集合，包含TextEditor组件属性设置。

**起始版本：** 24

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_node.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h)

## NODE\_TEXT\_EDITOR\_ENTER\_KEY\_TYPE



```
1. NODE_TEXT_EDITOR_ENTER_KEY_TYPE = MAX_NODE_SCOPE_NUM * ARKUI_NODE_TEXT_EDITOR = 22000
```

TextEditor组件回车键类型，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 回车键类型，参数类型[ArkUI\_EnterKeyType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_enterkeytype)，默认值为ARKUI\_ENTER\_KEY\_TYPE\_NEW\_LINE。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 回车键类型，参数类型[ArkUI\_EnterKeyType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_enterkeytype)。 |

## NODE\_TEXT\_EDITOR\_CARET\_COLOR



```
1. NODE_TEXT_EDITOR_CARET_COLOR = 22001
```

TextEditor组件光标颜色，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].u32 | 光标颜色，采用0xARGB格式，例如0xFFFF0000表示红色。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].u32 | 光标颜色，采用0xARGB格式。 |

## NODE\_TEXT\_EDITOR\_SCROLL\_BAR\_COLOR



```
1. NODE_TEXT_EDITOR_SCROLL_BAR_COLOR = 22002
```

TextEditor组件滚动条颜色，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .data[0].u32 | 滚动条颜色，采用0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .data[0].u32 | 滚动条颜色，采用0xARGB格式。 |

## NODE\_TEXT\_EDITOR\_BAR\_STATE



```
1. NODE_TEXT_EDITOR_BAR_STATE = 22003
```

TextEditor组件滚动条显示模式，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 文本区域的滚动条显示模式，参数类型[ArkUI\_BarState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_barstate)，默认值为ARKUI\_BAR\_STATE\_AUTO。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 文本区域的滚动条显示模式，参数类型[ArkUI\_BarState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_barstate)。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_DATA\_DETECTOR



```
1. NODE_TEXT_EDITOR_ENABLE_DATA_DETECTOR = 22004
```

TextEditor组件文本实体识别功能开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用文本实体识别功能，0表示禁用，1表示启用，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用了文本实体识别功能。 |

## NODE\_TEXT\_EDITOR\_DATA\_DETECTOR\_CONFIG



```
1. NODE_TEXT_EDITOR_DATA_DETECTOR_CONFIG = 22005
```

TextEditor组件识别配置，支持属性设置和属性重置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 识别配置，参数类型[ArkUI\_TextDataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkui-nativemodule-oh-arkui-textdatadetectorconfig)。 |

## NODE\_TEXT\_EDITOR\_EDIT\_MENU\_OPTIONS



```
1. NODE_TEXT_EDITOR_EDIT_MENU_OPTIONS = 22006
```

TextEditor组件扩展菜单选项，支持属性设置和属性重置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 扩展菜单选项，参数类型[ArkUI\_TextEditMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-texteditmenuoptions)。 |

## NODE\_TEXT\_EDITOR\_PLACEHOLDER



```
1. NODE_TEXT_EDITOR_PLACEHOLDER = 22007
```

TextEditor组件无输入时的提示文本选项，支持属性设置和属性重置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 无输入时的提示文本选项，参数类型[ArkUI\_TextEditorPlaceholderOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nativemodule-oh-arkui-texteditorplaceholderoptions)。 |

## NODE\_TEXT\_EDITOR\_STYLED\_STRING\_CONTROLLER



```
1. NODE_TEXT_EDITOR_STYLED_STRING_CONTROLLER = 22008
```

TextEditor组件属性字符串控制器，支持属性设置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 属性字符串控制器，参数类型[ArkUI\_TextEditorStyledStringController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vemodule-oh-arkui-texteditorstyledstringcontroller)。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_PREVIEW\_TEXT



```
1. NODE_TEXT_EDITOR_ENABLE_PREVIEW_TEXT = 22009
```

TextEditor组件预上屏功能开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用预上屏功能，0表示禁用，1表示启用，默认值为1。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用预上屏功能，0表示禁用，1表示启用。 |

## NODE\_TEXT\_EDITOR\_LAYOUT\_MANAGER



```
1. NODE_TEXT_EDITOR_LAYOUT_MANAGER = 22010
```

TextEditor组件TextLayoutManager获取，支持属性获取。

作为属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .object | 布局管理器，参数类型[ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_SELECTED\_DATA\_DETECTOR



```
1. NODE_TEXT_EDITOR_ENABLE_SELECTED_DATA_DETECTOR = 22011
```

TextEditor组件文本选择识别AI菜单开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用文本选择识别的AI菜单，0表示禁用，1表示启用，默认值为1。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用了文本选择识别的AI菜单。 |

## NODE\_TEXT\_EDITOR\_SELECTED\_BACKGROUND\_COLOR



```
1. NODE_TEXT_EDITOR_SELECTED_BACKGROUND_COLOR = 22012
```

TextEditor组件选中内容背景颜色，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .data[0].u32 | 选中内容的背景颜色，采用0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .data[0].u32 | 选中内容的背景颜色，采用0xARGB格式。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_KEYBOARD\_ON\_FOCUS



```
1. NODE_TEXT_EDITOR_ENABLE_KEYBOARD_ON_FOCUS = 22013
```

TextEditor组件非点击获焦时拉起输入法开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 非点击获焦时是否拉起输入法，0表示不拉起，1表示拉起，默认值为1。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 非点击获焦时是否拉起输入法，0表示不拉起，1表示拉起。 |

## NODE\_TEXT\_EDITOR\_MAX\_LENGTH



```
1. NODE_TEXT_EDITOR_MAX_LENGTH = 22014
```

TextEditor组件最大字符数，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 最大字符数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 最大字符数。 |

## NODE\_TEXT\_EDITOR\_MAX\_LINES



```
1. NODE_TEXT_EDITOR_MAX_LINES = 22015
```

TextEditor组件内容最大行数，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 文本编辑器中内容的最大行数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 文本编辑器中内容的最大行数。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_HAPTIC\_FEEDBACK



```
1. NODE_TEXT_EDITOR_ENABLE_HAPTIC_FEEDBACK = 22016
```

TextEditor组件触觉反馈开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否在文本编辑器中启用触觉反馈，0表示不启用，1表示启用，默认值为1。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用了触觉反馈，0表示不启用，1表示启用。 |

## NODE\_TEXT\_EDITOR\_COPY\_OPTIONS



```
1. NODE_TEXT_EDITOR_COPY_OPTIONS = 22017
```

TextEditor组件复制选项，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 复制选项，参数类型[ArkUI\_CopyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_copyoptions)，默认值为ARKUI\_COPY\_OPTIONS\_LOCAL\_DEVICE。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 复制选项，参数类型[ArkUI\_CopyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_copyoptions)。 |

## NODE\_TEXT\_EDITOR\_KEYBOARD\_APPEARANCE



```
1. NODE_TEXT_EDITOR_KEYBOARD_APPEARANCE = 22018
```

TextEditor组件键盘外观，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 键盘外观，参数类型[ArkUI\_KeyboardAppearance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_keyboardappearance)，默认值为ARKUI\_KEYBOARD\_APPEARANCE\_NONE\_IMMERSIVE。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 键盘外观，参数类型[ArkUI\_KeyboardAppearance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_keyboardappearance)。 |

## NODE\_TEXT\_EDITOR\_STOP\_BACK\_PRESS



```
1. NODE_TEXT_EDITOR_STOP_BACK_PRESS = 22019
```

TextEditor组件是否阻止返回事件传播，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否阻止返回事件传播，0表示不阻止，1表示阻止，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否阻止返回事件传播，0表示不阻止，1表示阻止。 |

## NODE\_TEXT\_EDITOR\_ENABLE\_AUTO\_SPACING



```
1. NODE_TEXT_EDITOR_ENABLE_AUTO_SPACING = 22020
```

TextEditor组件中西文自动间距开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用自动间距，0表示不启用，1表示启用，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用自动间距，0表示不启用，1表示启用。 |

## NODE\_TEXT\_EDITOR\_CUSTOM\_KEYBOARD



```
1. NODE_TEXT_EDITOR_CUSTOM_KEYBOARD = 22021
```

TextEditor组件自定义键盘，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 自定义键盘，参数类型[ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h)。 |
| .value[0]?.i32 | 设置自定义键盘是否支持避让功能，0表示不支持，1表示支持，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .object | 自定义键盘，参数类型[ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h)。 |
| .value[0].i32 | 设置自定义键盘是否支持避让功能，0表示不支持，1表示支持。 |

## NODE\_TEXT\_EDITOR\_BIND\_SELECTION\_MENU



```
1. NODE_TEXT_EDITOR_BIND_SELECTION_MENU = 22022
```

TextEditor组件自定义文本选择菜单绑定，支持属性设置和属性重置。

作为属性设置方法参数[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 文本选择菜单，参数类型[ArkUI\_TextEditorSelectionMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/tivemodule-oh-arkui-texteditorselectionmenuoptions)。 |

## NODE\_TEXT\_EDITOR\_INCLUDE\_FONT\_PADDING



```
1. NODE_TEXT_EDITOR_INCLUDE_FONT_PADDING = 22023
```

TextEditor组件首行末行防截断间距开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否添加间距，0表示不添加，1表示添加，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否添加间距，0表示不添加，1表示添加。 |

## NODE\_TEXT\_EDITOR\_FALLBACK\_LINE\_SPACING



```
1. NODE_TEXT_EDITOR_FALLBACK_LINE_SPACING = 22024
```

TextEditor组件行高自适应开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 行高是否自适应，0表示不自适应，1表示自适应，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 行高是否自适应，0表示不自适应，1表示自适应。 |

## NODE\_TEXT\_EDITOR\_COMPRESS\_LEADING\_PUNCTUATION



```
1. NODE_TEXT_EDITOR_COMPRESS_LEADING_PUNCTUATION = 22025
```

TextEditor组件行首标点符号压缩开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用标点符号压缩，0表示不启用，1表示启用，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用标点符号压缩，0表示不启用，1表示启用。 |

## NODE\_TEXT\_EDITOR\_SELECTED\_DRAG\_PREVIEW\_STYLE



```
1. NODE_TEXT_EDITOR_SELECTED_DRAG_PREVIEW_STYLE = 22026
```

TextEditor组件选中拖拽预览样式，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .object | 选中拖拽预览样式配置，参数类型[ArkUI\_SelectedDragPreviewStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-arkui-textselecteddragpreviewstyle)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .object | 选中拖拽预览样式配置，参数类型[ArkUI\_SelectedDragPreviewStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-arkui-textselecteddragpreviewstyle)。 |

## NODE\_TEXT\_EDITOR\_SINGLE\_LINE



```
1. NODE_TEXT_EDITOR_SINGLE_LINE = 22027
```

TextEditor组件单行模式开关，支持属性设置、属性重置和属性获取。

作为属性设置方法参数、属性获取方法返回值[ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)格式如下。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| .value[0].i32 | 是否启用单行模式，0表示不启用，1表示启用，默认值为0。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| .value[0].i32 | 是否启用单行模式，0表示不启用，1表示启用。 |