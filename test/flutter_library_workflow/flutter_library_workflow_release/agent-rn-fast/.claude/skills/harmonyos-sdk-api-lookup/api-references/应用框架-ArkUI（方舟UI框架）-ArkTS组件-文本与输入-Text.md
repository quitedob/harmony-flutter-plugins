显示一段文本的组件。

说明

该组件从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

文本在组件区域显示效果与字体资源相关，默认字体排印可见[字体排印视觉指引](https://developer.huawei.com/consumer/cn/doc/design-guides/font-0000001828772001)。

## 子组件

PhonePC/2in1TabletTVWearable

可以包含[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)、[ImageSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-imagespan)、[SymbolSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-symbolspan)和[ContainerSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-containerspan)子组件。

说明

使用[子组件](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#子组件)实现[图文混排](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-text-image-layout)场景。

## 接口

PhonePC/2in1TabletTVWearable

Text(content?: string | Resource , value?: TextOptions)

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| content | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 否 | 文本内容。当不包含子组件[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)和未设置[属性字符串](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string)时该参数生效。  默认值：' '  **说明：**  显示内容的优先级：属性字符串>Span>Text的文本内容。 |
| value11+ | [TextOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoptions11) | 否 | 文本组件初始化选项。 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)，还支持以下属性：

**布局与对齐**

展开

| 属性 | 说明 |
| --- | --- |
| baselineOffset | 设置文本基线的偏移量。 |
| halfLeading12+ | 设置文本是否垂直居中。 |
| textAlign | 设置文本段落在水平方向的对齐方式。 |
| textContentAlign21+ | 设置文本内容区在组件内的垂直对齐方式。 |
| textVerticalAlign20+ | 设置文本段落在垂直方向的对齐方式。 |

**字体样式**

展开

| 属性 | 说明 |
| --- | --- |
| decoration | 设置文本装饰线样式及其颜色。 |
| font10+ | 设置文本样式。 |
| font12+ | 设置文本样式，支持设置字体配置项。 |
| fontColor | 设置字体颜色。 |
| fontFamily | 设置字体族。 |
| fontFeature12+ | 设置文字特性效果，比如数字等宽的特性。 |
| fontSize | 设置字体大小。 |
| fontStyle | 设置字体样式。 |
| fontWeight | 设置文本的字体粗细。 |
| fontWeight12+ | 设置文本字重，支持设置字体配置项。 |
| letterSpacing | 设置文本字符间距。 |
| shaderStyle20+ | 设置文本渐变或纯色效果。 |
| textCase | 设置文本大小写。 |
| textShadow10+ | 设置文字阴影效果。 |

**文本溢出、断行与折行**

展开

| 属性 | 说明 |
| --- | --- |
| ellipsisMode11+ | 设置省略位置。 |
| lineBreakStrategy12+ | 设置折行规则。 |
| marqueeOptions18+ | 设置文本跑马灯模式的配置项。 |
| textOverflow | 设置文本超长时的显示方式。 |
| wordBreak11+ | 设置断行规则。 |

**行与段落**

展开

| 属性 | 说明 |
| --- | --- |
| enableAutoSpacing20+ | 设置是否开启中文与西文的自动间距。 |
| lineHeight | 设置文本的文本行高。 |
| lineHeightMultiple22+ | 设置文本的行高倍数。 |
| lineSpacing12+ | 设置文本的行间距。 |
| lineSpacing20+ | 设置文本的行间距。当不配置LineSpacingOptions时，首行上方和尾行下方默认会有行间距。 |
| maxLineHeight22+ | 设置文本的最大行高。 |
| maxLines | 设置文本的最大行数。 |
| minLineHeight22+ | 设置文本的最小行高。 |
| minLines22+ | 设置文本显示的最小行数。 |
| optimizeTrailingSpace20+ | 优化行尾空格。 |
| textIndent10+ | 设置首行文本缩进。 |

**字体自适应**

展开

| 属性 | 说明 |
| --- | --- |
| heightAdaptivePolicy10+ | 设置文本自适应布局调整字号的方式。 |
| maxFontScale12+ | 设置文本最大的字体缩放倍数。 |
| maxFontSize | 设置文本最大显示字号。 |
| minFontScale12+ | 设置文本最小的字体缩放倍数。 |
| minFontSize | 设置文本最小显示字号。 |

**文本选择与复制**

展开

| 属性 | 说明 |
| --- | --- |
| caretColor14+ | 设置文本框选中区域手柄颜色。 |
| copyOption9+ | 设置组件是否支持文本可复制粘贴。 |
| draggable9+ | 设置选中文本拖拽效果。 |
| selectedBackgroundColor14+ | 设置文本选中底板颜色。 |
| selection11+ | 设置选中区域。 |
| textSelectable12+ | 设置是否支持文本可选择、可获焦。 |

**文本识别**

展开

| 属性 | 说明 |
| --- | --- |
| dataDetectorConfig11+ | 设置文本识别配置。 |
| enableDataDetector11+ | 设置是否进行文本特殊实体识别。 |
| enableSelectedDataDetector22+ | 设置是否对选中文本进行实体识别。 |

**自定义菜单**

展开

| 属性 | 说明 |
| --- | --- |
| bindSelectionMenu11+ | 设置自定义选择菜单。 |
| editMenuOptions12+ | 设置自定义菜单扩展项。 |

**其他功能**

展开

| 属性 | 说明 |
| --- | --- |
| contentTransition20+ | 文本动效属性。 |
| enableHapticFeedback13+ | 设置是否开启触控反馈。 |
| privacySensitive12+ | 设置是否支持卡片敏感隐私信息。 |

以下是详细的接口说明：

### baselineOffset

PhonePC/2in1TabletTVWearable

baselineOffset(value: number | ResourceStr)

设置文本基线的偏移量。

设置该值为百分比时，按默认值显示。

正数内容向上偏移，负数向下偏移。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 文本基线的偏移量。  默认值：0  从API version 20开始，支持[Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource)类型。 |

### bindSelectionMenu11+

PhonePC/2in1TabletTVWearable

bindSelectionMenu(spanType: TextSpanType, content: CustomBuilder, responseType: TextResponseType, options?: SelectionMenuOptions)

设置自定义选择菜单。

bindSelectionMenu的长按响应时长为600ms，[bindContextMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-menu#bindcontextmenu8)的长按响应时长为800ms，当两者同时绑定且触发方式均为长按时，优先响应bindSelectionMenu。

自定义菜单超长时，建议内部嵌套使用[Scroll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll)组件，避免键盘被遮挡。

说明

该接口不支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

通过[editMenuOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)设置文本选择菜单时，保留系统默认的风格，触发菜单弹出的条件不变。

通过[bindSelectionMenu](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#bindselectionmenu11)设置文本选择菜单时，风格由开发者定义，触发菜单弹出的条件由开发者定义。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| spanType | [TextSpanType](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textspantype11枚举说明) | 是 | 选择菜单的类型。  默认值：TextSpanType.TEXT |
| content | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8) | 是 | 选择菜单的内容。 |
| responseType | [TextResponseType](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textresponsetype11枚举说明) | 是 | 选择菜单的响应类型。  默认值：TextResponseType.LONG\_PRESS |
| options | [SelectionMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#selectionmenuoptions) | 否 | 选择菜单的选项。 |

### caretColor14+

PhonePC/2in1TabletTVWearable

caretColor(color: ResourceColor)

设置文本框选中区域手柄颜色。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| color | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 文本选中手柄颜色。  默认值：'#007DFF' |

### contentTransition20+

PhonePC/2in1TabletTVWearable

contentTransition(transition: Optional<ContentTransition>)

可以设置为数字翻牌动效[NumericTextTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#numerictexttransition20)。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| transition | Optional<[ContentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#contenttransition20)> | 是 | 文本动效属性。 |

### copyOption9+

PhonePC/2in1TabletTVWearable

copyOption(value: CopyOptions)

设置组件是否支持文本可复制粘贴。

从API version 20开始，当Text组件执行复制操作时，会将HTML格式的内容添加到剪贴板中。

* 当Text组件包含子组件时，仅支持[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)和[ImageSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-imagespan)子组件向剪贴板中添加HTML格式的内容。
* 设置Text组件的属性字符串时，请参考属性字符串[toHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#tohtml14)接口文档，以了解支持转换为HTML的范围。

设置copyOption为CopyOptions.InApp或者CopyOptions.LocalDevice时：

* 长按文本，会弹出文本选择菜单，可选中文本并进行复制、全选操作。
* 默认情况下，长按选中文本可拖拽。若要取消此功能，可将 draggable 设置为 false。
* 若需要支持Ctrl+C复制，需同时设置[textSelectable](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textselectable12)为TextSelectableMode.SELECTABLE\_FOCUSABLE。

此时Text会监听onClick事件，手势事件为非冒泡事件，若需要点击Text组件区域响应父组件的点击手势事件，建议在父组件上使用[parallelGesture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-settings#parallelgesture)绑定手势识别，也可参考[示例7设置文本识别](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#示例7设置文本识别)。

由于卡片没有长按事件，此场景下长按文本，不会弹出文本选择菜单。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [CopyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#copyoptions9) | 是 | 组件是否支持文本可复制粘贴。  默认值：CopyOptions.None |

### dataDetectorConfig11+

PhonePC/2in1TabletTVWearable

dataDetectorConfig(config: TextDataDetectorConfig)

设置文本识别配置，可配置识别类型、实体显示样式，以及是否开启长按预览等。

需配合[enableDataDetector](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)一起使用，设置enableDataDetector为true时，dataDetectorConfig的配置才能生效。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| config | [TextDataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdatadetectorconfig11对象说明) | 是 | 文本识别配置。 |

### decoration

PhonePC/2in1TabletTVWearable

decoration(value: DecorationStyleInterface)

设置文本装饰线样式及其颜色。

说明

当文字的下边缘轮廓与装饰线位置相交时，会触发下划线避让规则，下划线将在这些字符处避让文字。常见"gjyqp"等英文字符。

当文本装饰线的颜色设置为Color.Transparent时，装饰线颜色设置为跟随每行第一个字的字体颜色。当文本装饰线的颜色设置为透明色16进制对应值"#00FFFFFF"时，装饰线颜色设置为透明色。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [DecorationStyleInterface12+](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyleinterface) | 是 | 文本装饰线样式对象。  默认值：  {  type: TextDecorationType.None,  color: Color.Black,  style: TextDecorationStyle.SOLID  }  **说明：**  style参数不支持卡片能力。 |

### draggable9+

PhonePC/2in1TabletTVWearable

draggable(value: boolean)

设置选中文本拖拽效果。

不能和[onDragStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-drag-drop#ondragstart)事件同时使用。

当draggable设置为true时，需配合[CopyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#copyoptions9)使用，设置copyOptions为CopyOptions.InApp或者CopyOptions.LocalDevice，支持对选中文本的拖拽及复制到输入框。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 选中文本拖拽效果。  true表示选中文本可拖拽，false表示不可拖拽。  默认值：false |

### editMenuOptions12+

PhonePC/2in1TabletTVWearable

editMenuOptions(editMenu: EditMenuOptions)

设置自定义菜单扩展项，允许用户设置扩展项的文本内容、图标、回调方法。

调用[disableMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablemenuitems20)或[disableSystemServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablesystemservicemenuitems20)接口屏蔽文本选择菜单内的系统服务菜单项时，editMenuOptions接口内回调方法[onCreateMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#oncreatemenu12)的入参列表中不包含被屏蔽的菜单选项。

说明

通过[editMenuOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)设置文本选择菜单时，保留系统默认的风格，触发菜单弹出的条件不变。

通过[bindSelectionMenu](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#bindselectionmenu11)设置文本选择菜单时，风格由开发者定义，触发菜单弹出的条件由开发者定义。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| editMenu | [EditMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#editmenuoptions) | 是 | 扩展菜单选项。 |

### ellipsisMode11+

PhonePC/2in1TabletTVWearable

ellipsisMode(value: EllipsisMode)

设置省略位置。

ellipsisMode属性需要与overflow设置为TextOverflow.Ellipsis以及maxLines使用，单独设置ellipsisMode属性不生效。

EllipsisMode.START和EllipsisMode.CENTER仅在单行超长文本生效。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [EllipsisMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#ellipsismode11) | 是 | 省略位置。  默认值：EllipsisMode.END |

### enableAutoSpacing20+

PhonePC/2in1TabletTVWearable

enableAutoSpacing(enabled: Optional<boolean>)

设置是否开启中文与西文的自动间距。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 是否开启中文与西文的自动间距。  true为开启自动间距，false为不开启。  默认值：false |

### enableDataDetector11+

PhonePC/2in1TabletTVWearable

enableDataDetector(enable: boolean)

设置是否进行文本特殊实体识别。当enableDataDetector设置为true时，识别特殊实体。

所识别实体的样式如下，即字体颜色改为蓝色、并添加蓝色下划线。



```
1. color: '#ff007dff'
2. decoration:{
3. type: TextDecorationType.Underline,
4. color: '#ff007dff',
5. style: TextDecorationStyle.SOLID
6. }
```

说明

* 设备底层需要具备文本识别能力，该接口才能生效。
* 当[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)设置为TextOverflow.MARQUEE时，不进行文本特殊实体识别。
* 当[copyOption](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)设置不为CopyOptions.None且[textSelectable](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textselectable12)设置为TextSelectableMode.UNSELECTABLE时，仍然具有通过菜单复制特殊实体的能力，但不具备选择文本的能力。
* 手势点击和鼠标右键点击实体，会根据实体类型弹出对应的实体操作菜单，鼠标左键点击实体会直接响应菜单的第一个选项。
* 当copyOption设置为CopyOptions.None时，点击实体弹出的菜单不包含翻译、分享和搜索选项。
* 从API version 20开始，支持选中文本后识别实体，在文本选择菜单与鼠标右键菜单中显示对应菜单选项。菜单选项包括[TextMenuItemId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textmenuitemid12)中的url（打开链接）、email（新建邮件）、phoneNumber（呼叫）、address（导航至该位置）、dateTime（新建日程提醒）。选中文本后识别实体弹出对应菜单选项，要求在选中范围内包括一个完整的AI实体，才能展示对应的选项。例如，实体是https://developer.huawei.com时，只选中com，菜单不会显示打开链接选项。
* 从API version 20开始，支持在文本选择菜单中显示“问问小艺”选项。当copyOption设置为CopyOptions.LocalDevice或CopyOptions.CROSS\_DEVICE(deprecated)时，选中文本后：

  + 如果enableDataDetector设置为false，显示问问小艺选项。
  + 如果enableDataDetector设置为true，此时选中范围内，没有一个AI实体，显示问问小艺选项。
  + 如果enableDataDetector设置为true，此时选中范围内，有一个以上的AI实体，显示问问小艺选项。
  + 如果enableDataDetector设置为true，此时选中范围内，恰好有一个AI实体，展示[TextMenuItemId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textmenuitemid12)中的对应的选项，此时不显示问问小艺选项。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enable | boolean | 是 | 使能文本识别。  true表示文本可实体识别，false表示不可识别。  默认值：false |

### enableHapticFeedback13+

PhonePC/2in1TabletTVWearable

enableHapticFeedback(isEnabled: boolean)

设置是否开启触控反馈。

开启触控反馈时，需要在工程的[module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中配置requestPermissions字段开启振动权限，配置如下：



```
1. "requestPermissions": [
2. {
3. "name": "ohos.permission.VIBRATE",
4. }
5. ]
```

说明

从API version 18开始，该接口支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 13开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isEnabled | boolean | 是 | 是否开启触控反馈。  true表示开启，false表示不开启。  默认值：true |

### enableSelectedDataDetector22+

PhonePC/2in1TabletTVWearable

enableSelectedDataDetector(enable: boolean | undefined)

设置是否对选中文本进行实体识别。该接口依赖设备底层应具有文本识别能力，否则设置不会生效。

当enableSelectedDataDetector设置为true时，默认识别所有类型的实体。

需要[CopyOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#copyoptions9)为CopyOptions.LocalDevice或CopyOptions.CROSS\_DEVICE时，本功能生效。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enable | boolean | undefined | 是 | 开启选中词文本识别。  true：开启识别，false：关闭识别。默认值为：true。 |

### font10+

PhonePC/2in1TabletTVWearable

font(value: Font)

设置文本样式。

包括字体大小、字体粗细、字体族和字体风格。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#font) | 是 | 文本样式。 |

### font12+

PhonePC/2in1TabletTVWearable

font(fontValue: Font, options?: FontSettingOptions)

设置文本样式，支持设置字体配置项。

仅Text组件生效，其子组件不生效。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fontValue | [Font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#font) | 是 | 设置文本样式。 |
| options | [FontSettingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontsettingoptions12对象说明) | 否 | 设置字体配置项。 |

### fontColor

PhonePC/2in1TabletTVWearable

fontColor(value: ResourceColor)

设置字体颜色。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 字体颜色。  默认值：'#e6182431'  Wearable设备上默认值为：'#c5ffffff' |

### fontFamily

PhonePC/2in1TabletTVWearable

fontFamily(value: string | Resource)

设置字体族。

说明

可以使用[loadFontSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-graphics-text#loadfontsync)注册自定义字体。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 字体族。默认字体'HarmonyOS Sans'。  使用多个字体时，请用逗号','分隔，字体的优先级按顺序生效。例如：'Arial,HarmonyOS Sans'。 |

### fontFeature12+

PhonePC/2in1TabletTVWearable

fontFeature(value: string)

设置文字特性效果，比如数字等宽的特性。

格式为：normal | <feature-tag-value>

<feature-tag-value>的格式为：<string> [ <integer> | on | off ]

<feature-tag-value>的个数可以有多个，中间用','隔开。

例如，使用等宽数字的输入格式为："ss01" on。

说明

不支持Text内同时存在文本内容和Span或ImageSpan子组件。如果同时存在，只显示Span或ImageSpan内的内容。

字体排版引擎会对开发者传入的宽度[width](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#width)进行向下取整，保证是整型像素后进行排版。如果向上取整，可能会出现文字右侧被截断。

当多个Text组件在[Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row)容器内布局且没有设置具体的布局分配信息时，Text会以Row的最大尺寸进行布局。如果需要子组件主轴累加的尺寸不超过Row容器主轴的尺寸，可以设置[layoutWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#layoutweight)或者是以[Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout)布局来约束子组件的主轴尺寸。

系统默认字体支持的liga连字：Th fb ff fb ffb ffh ffi ffk ffl fh fi fk fl rf rt rv rx ry。常导致Span、属性字符串的效果不符合预期，关闭liga连字特性可以规避。

文字特性效果与使用的字体文件密切相关。例如，8标点挤压功能在当前系统默认字体中仅对左侧标点符号生效，而右侧标点符号及感叹号、顿号、问号均不生效。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | 是 | 文字特性效果。 |

fontFeature属性列表：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/47IF8Dn2QsizNqrDaLFQyw/zh-cn_image_0000002599358625.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=72693C6A731946AFB401DD3032D16170D9851E34682237B86607B99DBEC6C627)

设置fontFeature属性，fontFeature是OpenType字体的高级排版能力，如支持连字、数字等宽等特性，一般用在自定义字体中，其能力需要字体本身支持。

更多fontFeature能力介绍可参考[font-feature-settings property](https://www.w3.org/TR/css-fonts-3/#font-feature-settings-prop)和[OpenType Features](https://sparanoid.com/lab/opentype-features/)。

### fontSize

PhonePC/2in1TabletTVWearable

fontSize(value: number | string | Resource)

设置字体大小。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 字体大小。fontSize为number类型时，使用fp单位。不支持设置百分比字符串。  默认值：16fp  Wearable设备上默认值为：15fp |

### fontStyle

PhonePC/2in1TabletTVWearable

fontStyle(value: FontStyle)

设置字体样式。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) | 是 | 字体样式。  默认值：FontStyle.Normal |

### fontWeight

PhonePC/2in1TabletTVWearable

fontWeight(value: number | FontWeight | ResourceStr)

设置文本的字体粗细，设置过大可能会在不同字体下有截断。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | [FontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight) | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 文本的字体粗细，number类型取值[100, 900]，取值间隔为100，默认为400，取值越大，字体越粗。string类型仅支持number类型取值的字符串形式，例如"400"，以及"bold"、"bolder"、"lighter"、"regular"、"medium"，分别对应FontWeight中相应的枚举值。  默认值：FontWeight.Normal  Wearable设备上默认值为：FontWeight.Regular  从API version 20开始，支持[Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource)类型。 |

### fontWeight12+

PhonePC/2in1TabletTVWearable

fontWeight(weight: number | FontWeight | ResourceStr, options?: FontSettingOptions)

设置文本字重，支持设置字体配置项。

仅Text组件生效，其子组件不生效。常见问题参考[设置enableVariableFontWeight为true后字重不能跟随设置调节](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-text-faq#设置enablevariablefontweight为true后字重不能跟随设置调节)。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| weight | number | [FontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight) | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 设置文本字重。number类型取值[100, 900]，取值间隔为100，默认为400，取值越大，字体越粗。string类型仅支持number类型取值的字符串形式，例如"400"，以及"bold"、"bolder"、"lighter"、"regular"、"medium"，分别对应FontWeight中相应的枚举值。  从API version 20开始，支持[Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource)类型。 |
| options | [FontSettingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontsettingoptions12对象说明) | 否 | 设置字体配置项。  当options的参数enableVariableFontWeight取值false时，禁用可变字重调节，weight取值为[100, 900]范围内的整百数值时，字重取值为weight。weight是非整百数值时，字重取默认值400。  当options的参数enableVariableFontWeight取值true时，启用可变字重调节，weight取值为[100, 900]范围内任意整数时，字重取值为weight。 |

### halfLeading12+

PhonePC/2in1TabletTVWearable

halfLeading(halfLeading: boolean)

设置文本是否垂直居中。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| halfLeading | boolean | 是 | 设置文本是否垂直居中。  true表示将行间距平分至行的顶部与底部，false则不平分。  默认值：false |

### heightAdaptivePolicy10+

PhonePC/2in1TabletTVWearable

heightAdaptivePolicy(value: TextHeightAdaptivePolicy)

设置文本自适应布局调整字号的方式。

规则如下：

* MAX\_LINES\_FIRST模式：优先使用[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)属性来调整文本高度。如果使用maxLines属性的布局大小超过了布局约束，则尝试在[minFontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minfontsize)和[maxFontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxfontsize)的范围内缩小字体以显示更多文本。
* MIN\_FONT\_SIZE\_FIRST模式：优先使用minFontSize属性来调整文本高度。如果使用minFontSize属性可以将文本布局在一行中，则尝试在minFontSize和maxFontSize的范围内增大字体并使用最大限度的字体大小在一行内显示，否则按minFontSize显示。
* LAYOUT\_CONSTRAINT\_FIRST模式：优先使用布局约束来调整文本高度。如果布局大小超过布局约束，则尝试在minFontSize和maxFontSize的范围内缩小字体以满足布局约束。如果将字体大小缩小到minFontSize后，布局大小仍然超过布局约束，则删除超过布局约束的行。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [TextHeightAdaptivePolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textheightadaptivepolicy10) | 是 | 文本自适应高度的方式。  默认值：TextHeightAdaptivePolicy.MAX\_LINES\_FIRST |

### letterSpacing

PhonePC/2in1TabletTVWearable

letterSpacing(value: number | ResourceStr)

设置文本字符间距。

设置该值为百分比时，按默认值显示。设置该值为0时，按默认值显示。string类型支持number类型取值的字符串形式，可以附带单位，例如"10"、"10fp"。

当取值为负值时，文字会被压缩。负值过小时会将组件内容区大小压缩为0，导致内容无法显示。

对每个字符生效，包括行尾字符。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | 文本字符间距。  默认值：0  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  从API version 20开始，支持[Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource)类型。 |

### lineBreakStrategy12+

PhonePC/2in1TabletTVWearable

lineBreakStrategy(strategy: LineBreakStrategy)

设置折行规则。该属性在[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)不等于WordBreak.BREAK\_ALL的时候生效，且不支持连词符。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| strategy | [LineBreakStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#linebreakstrategy12) | 是 | 文本的折行规则。  默认值：LineBreakStrategy.GREEDY |

### lineHeight

PhonePC/2in1TabletTVWearable

lineHeight(value: number | string | Resource)

设置文本的文本行高。

设置值不大于0时，不限制文本行高，自适应字体大小，number类型时单位为fp。string类型支持number类型取值的字符串形式，可以附带单位，例如"10"、"10fp"。

说明

特殊字符字体高度远超出同行的其他字符高度时，文本框出现截断、遮挡、内容相对位置发生变化等不符合预期的显示异常，需要开发者调整组件高度、行高等属性，修改对应的页面布局。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 文本的文本行高。 |

### lineHeightMultiple22+

PhonePC/2in1TabletTVWearable

lineHeightMultiple(value: number | undefined)

使用倍数模式设置文本的行高。

设置行高为入参（value）与字高（fontHeight）的乘积。

说明

当lineHeightMultiple使用有效值和[lineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)或[lineSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing12)同时设置时，仅lineHeightMultiple生效。lineHeightMultiple小于0时，lineHeightMultiple不生效，使用[lineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)和[lineSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing12)设置行高和行间距。

**卡片能力：** 从API version 22开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | undefined | 是 | 使用行高的倍数数值。  取值范围：[0, +∞)  **说明：**  - 设置的值小于0时，lineHeightMultiple不生效。  - 设置的值等于0时，等效于设置为1，表现为行高没有变化。  - 支持小数输入。 |

### lineSpacing12+

PhonePC/2in1TabletTVWearable

lineSpacing(value: LengthMetrics)

设置文本的行间距，设置值不大于0时，取默认值0。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 是 | 文本的行间距。默认值：0 |

### lineSpacing20+

PhonePC/2in1TabletTVWearable

lineSpacing(value: LengthMetrics, options?: LineSpacingOptions)

设置文本的行间距。当不配置LineSpacingOptions时，首行上方和尾行下方默认会有行间距。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 是 | 文本的行间距。设置值不大于0时，取默认值0。 |
| options | [LineSpacingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#linespacingoptions20对象说明) | 否 | 设置行间距配置项。  默认值：{ onlyBetweenLines: false } |

### marqueeOptions18+

PhonePC/2in1TabletTVWearable

marqueeOptions(options: Optional<TextMarqueeOptions>)

设置文本跑马灯模式的配置项。

当textOverflow设置为TextOverflow.MARQUEE时，marqueeOptions的设置才能生效。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[TextMarqueeOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textmarqueeoptions18对象说明)> | 是 | 当Text组件的textOverflow属性设置为MARQUEE时，可通过marqueeOptions设置跑马灯动效具体的属性，如开关、步长、循环次数、方向等。 |

### maxFontScale12+

PhonePC/2in1TabletTVWearable

maxFontScale(scale: number | Resource)

设置文本最大的字体缩放倍数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| scale | number | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 文本最大的字体缩放倍数。  取值范围：[1, +∞)  **说明：**  设置的值小于1时，按值为1处理，其余异常值默认不生效。 |

### maxFontSize

PhonePC/2in1TabletTVWearable

maxFontSize(value: number | string | Resource)

设置文本最大显示字号。

string类型支持number类型取值的字符串形式，可以附带单位，例如"10"、"10fp"。

需配合[minFontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minfontsize)以及[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)或布局大小限制使用，单独设置不生效。

自适应字号生效时，fontSize设置不生效。

maxFontSize小于等于0或者maxFontSize小于minFontSize时，自适应字号不生效，此时按照[fontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontsize)属性的值生效，未设置时按照其默认值生效。

从API version 18开始支持在子组件和属性字符串上生效，未设置字号的部分会自适应。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 文本最大显示字号。  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### maxLineHeight22+

PhonePC/2in1TabletTVWearable

maxLineHeight(value: LengthMetrics | undefined)

设置文本的最大行高，设置值不大于0时，最大行高不受限制。

maxLineHeight小于minLineHeight时，maxLineHeight按照minLineHeight属性的值生效。

**卡片能力：** 从API version 22开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | undefined | 是 | 文本的最大行高，不支持百分比。  设置的值不大于0时按0处理，设置为0时，最大行高不受限制。 |

### selectedDragPreviewStyle23+

PhonePC/2in1TabletTVWearable

selectedDragPreviewStyle(value: SelectedDragPreviewStyle | undefined)

设置文本拖拽时的背板样式。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [SelectedDragPreviewStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#selecteddragpreviewstyle23对象说明) | undefined | 是 | 文本拖拽时的背板样式。  设置为undefined时：背板颜色跟随主题，浅色模式显示白色，深色模式显示黑色。 |

### maxLines

PhonePC/2in1TabletTVWearable

maxLines(value: number)

设置文本的最大行数。

默认情况下，文本是自动折行的，如果指定此属性，则文本最多不会超过指定的行数。如果有多余的文本，可以通过[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)来指定截断方式。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | 是 | 文本的最大行数。  **说明：**  取值范围：[0, INT32\_MAX]  设置为0时，不显示文本内容。 |

### minFontScale12+

PhonePC/2in1TabletTVWearable

minFontScale(scale: number | Resource)

设置文本最小的字体缩放倍数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| scale | number | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 文本最小的字体缩放倍数。  取值范围：[0, 1]  **说明：**  设置的值小于0时按0处理，大于1时按1处理，其余异常值默认不生效。 |

### minFontSize

PhonePC/2in1TabletTVWearable

minFontSize(value: number | string | Resource)

设置文本最小显示字号。

string类型支持number类型取值的字符串形式，可以附带单位，例如"10"、"10fp"。

需配合[maxFontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxfontsize)以及[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)或布局大小限制使用，单独设置不生效。

自适应字号生效时，fontSize设置不生效。

minFontSize小于或等于0时，自适应字号不生效，此时按照[fontSize](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontsize)属性的值生效，未设置时按照其默认值生效。

从API version 18开始，支持在子组件和属性字符串上生效，未设置字号的部分会自适应。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | string | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 文本最小显示字号。  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### minLineHeight22+

PhonePC/2in1TabletTVWearable

minLineHeight(value: LengthMetrics | undefined)

设置文本的最小行高，设置值不大于0时，取默认值0。

**卡片能力：** 从API version 22开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | undefined | 是 | 文本的最小行高，不支持百分比。  设置的值不大于0时按0处理。 |

### minLines22+

PhonePC/2in1TabletTVWearable

minLines(minLines: Optional<number>)

设置文本显示的最小行数。

如果实际文本高度小于最小行数对应的高度，最后显示高度为最小行数对应的高度。

与[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)同时配置时，最小行高显示范围不会超过最大行高限制。

如果文本设置了[constraintSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#constraintsize)，那么组件最后显示高度会在[constraintSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#constraintsize)约束内。

**卡片能力：** 从API version 22开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| minLines | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<number> | 是 | 文本最小行数。  取值范围：[0, INT32\_MAX]  设置的值小于0时按0处理。 |

### includeFontPadding23+

PhonePC/2in1TabletTVWearable

includeFontPadding(include: Optional<boolean>)

设置是否在首行和尾行增加间距以避免文字截断。不通过该接口设置，默认不增加间距。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| include | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 是否在首行和尾行增加间距以避免文字截断。  true表示在首行和尾行增加间距；false表示在首行和尾行不增加间距。 |

### fallbackLineSpacing23+

PhonePC/2in1TabletTVWearable

fallbackLineSpacing(enabled: Optional<boolean>)

针对多行文字叠加，支持行高基于文字实际高度自适应。此接口仅当行高小于文字实际高度时生效。不通过该接口设置，默认行高不基于文字实际高度自适应。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 行高是否基于文字实际高度自适应。  true表示行高基于文字实际高度自适应；false表示行高不基于文字实际高度自适应。 |

### optimizeTrailingSpace20+

PhonePC/2in1TabletTVWearable

optimizeTrailingSpace(optimize: Optional<boolean>)

设置是否在文本布局过程中优化每行末尾的空格，可解决行尾空格影响对齐显示效果问题。

设置Text.optimizeTrailingSpace为true时：

* 多行、单行、图文混排等多种情况下均会优化行尾空格（TextAlign.Center或TextAlign.End时，优化效果明显）；
* 纯空格文本时，修饰线、阴影、背景色跟随空格文本显示；
* 行首空格不在优化范围内，行尾文本强制换行，每行行尾空格根据组件宽度优化行尾空格。

当纯空格文本设置优化行尾空格[optimizeTrailingSpace](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#optimizetrailingspace20)为true时，不允许同时设置文本背景色[backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundcolor)、空格装饰线[decoration](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#decoration)和对齐[textAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign)三个属性。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| optimize | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 是否优化每行末尾的空格。  true表示优化末尾空格，false则不优化。  默认值：false |

### compressLeadingPunctuation23+

PhonePC/2in1TabletTVWearable

compressLeadingPunctuation(enabled: Optional<boolean>)

设置是否开启行首标点符号压缩。

说明

* 行首标点符号默认不压缩。
* 支持压缩的标点符号，请参考[ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-graphics-text#paragraphstyle)的行首压缩的标点范围。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| enabled | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<boolean> | 是 | 是否开启行首标点符号压缩。  true表示开启行首标点符号压缩；false表示不开启行首标点符号压缩。 |

### privacySensitive12+

PhonePC/2in1TabletTVWearable

privacySensitive(supported: boolean)

设置是否支持卡片敏感隐私信息。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| supported | boolean | 是 | 是否支持卡片敏感隐私信息。  默认值为false，当设置为true时，隐私模式下文字将被遮罩为横杠“-”样式。  **说明：**  设置为null则表示不敏感。  进入隐私模式需要卡片框架支持。隐私遮罩的类型可以通过[obscured](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-obscured#obscured)配置。 |

### selectedBackgroundColor14+

PhonePC/2in1TabletTVWearable

selectedBackgroundColor(color: ResourceColor)

设置文本选中底板颜色。如果未设置不透明度，默认为20%不透明度。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| color | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 文本选中底板颜色。  默认值：'#007DFF' |

### selection11+

PhonePC/2in1TabletTVWearable

selection(selectionStart: number, selectionEnd: number)

设置选中区域。

选中区域高亮且显示手柄和文本选择菜单。

当[copyOption](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)设置为CopyOptions.None时，设置selection属性不生效。

当[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)设置为TextOverflow.MARQUEE时，设置selection属性不生效。

当selectionStart大于等于selectionEnd时不选中。可选范围为[0, textSize]，其中textSize为文本内容最大字符数，入参小于0时处理为0，大于textSize时处理为textSize。

当selectionStart或selectionEnd位于截断的不可见区域时，文本不选中。当[clip](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clip12)设置为false时，超出父组件的文本可以被选中。

可通过[onTextSelectionChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#ontextselectionchange11)接口获取选中区域位置变化结果。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| selectionStart | number | 是 | 所选文本的起始位置。  默认值：-1 |
| selectionEnd | number | 是 | 所选文本的结束位置。  默认值：-1 |

### shaderStyle20+

PhonePC/2in1TabletTVWearable

shaderStyle(shader: ShaderStyle)

可以显示为径向渐变[RadialGradientStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#radialgradientstyle20)或线性渐变[LinearGradientStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#lineargradientstyle20)或纯色[ColorShaderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#colorshaderstyle20)的效果，shaderStyle的优先级高于[fontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-symbolspan#fontcolor)和AI识别，纯色建议使用[fontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-symbolspan#fontcolor)。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| shader | [ShaderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#shaderstyle20) | 是 | 径向渐变或线性渐变或纯色。  根据传入的参数区分处理径向渐变[RadialGradientStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#radialgradientstyle20)或线性渐变[LinearGradientStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#lineargradientstyle20)或纯色[ColorShaderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#colorshaderstyle20)，最终设置到Text文本上显示为渐变色效果。  **说明：**  当设置为径向渐变[RadialGradientStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#radialgradientstyle20)时，若[RadialGradientOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-gradient-color#radialgradientoptions18对象说明)的center参数设置到组件范围外时，可将repeating参数设置为true，此时渐变效果会更明显。 |

### textAlign

PhonePC/2in1TabletTVWearable

textAlign(value: TextAlign)

设置文本段落在水平方向的对齐方式。

文本段落宽度占满Text组件宽度。

可通过[align](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-location#align)属性控制文本段落在垂直方向上的位置，此组件中不可通过align属性控制文本段落在水平方向上的位置，具体效果如下：

* Alignment.TopStart、Alignment.Top、Alignment.TopEnd：内容顶部对齐。
* Alignment.Start、Alignment.Center、Alignment.End：内容垂直居中。
* Alignment.BottomStart、Alignment.Bottom、Alignment.BottomEnd：内容底部对齐。

当textAlign属性设置为TextAlign.JUSTIFY时，需要根据文本内容设置[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)属性，且最后一行文本水平对齐首部，不参与两端对齐。

说明

textAlign只能调整文本整体的布局，不影响字符的显示顺序。若需要调整字符的显示顺序，请参考[镜像状态字符对齐](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-internationalization#镜像状态字符对齐)。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [TextAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textalign) | 是 | 文本段落在水平方向的对齐方式。  默认值：TextAlign.Start  Wearable设备上默认值为：TextAlign.Center |

### textCase

PhonePC/2in1TabletTVWearable

textCase(value: TextCase)

设置文本大小写。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [TextCase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textcase) | 是 | 文本大小写。  默认值：TextCase.Normal |

### textContentAlign21+

PhonePC/2in1TabletTVWearable

textContentAlign(textContentAlign: Optional<TextContentAlign>)

设置文本内容区在组件内的垂直对齐方式。

此接口可以在文本内容区高度大于组件高度时生效，确保文本内容区的对齐方式正确显示。

**元服务API：** 从API version 21开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| textContentAlign | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[TextContentAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textcontentalign21)> | 是 | 文本段落在垂直方向的对齐方式。  默认(undefined和异常值情况下)和align属性设置为Center效果一致。 |

### textDirection23+

PhonePC/2in1TabletTVWearable

textDirection(direction: TextDirection | undefined)

指定文本排版方向，未通过该接口设置时，默认文本排版方向遵循组件布局方向。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| direction | [TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdirection22) | undefined | 是 | 文本排版方向。  设置为undefined时，按照TextDirection.DEFAULT处理，表现为文本排版方向遵循组件布局方向。 |

### textIndent10+

PhonePC/2in1TabletTVWearable

textIndent(value: Length)

设置首行文本缩进。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Length](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#length) | 是 | 首行文本缩进。  默认值：0  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### textOverflow

PhonePC/2in1TabletTVWearable

textOverflow(options: TextOverflowOptions)

设置文本超长时的显示方式。

当[TextOverflowOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflowoptions18对象说明)设置为TextOverflow.None、TextOverflow.Clip或TextOverflow.Ellipsis时：

* 设置为TextOverflow.None、TextOverflow.Clip，文本超长时按最大行截断显示。
* 设置为TextOverflow.Ellipsis，文本超长时显示不下的文本用省略号代替。
* 需配合[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)使用，单独设置不生效。
* 断行规则参考[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)。默认情况下参考WordBreak.BREAK\_WORD的截断方式，文本截断按字进行。例如，英文以单词为最小单位进行截断。若需要以字母为单位进行截断，可设置wordBreak属性为WordBreak.BREAK\_ALL。
* 折行规则参考[lineBreakStrategy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linebreakstrategy12)。该属性在[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)不等于WordBreak.BREAK\_ALL的时候生效，不支持连词符。
* 从API version 11开始，建议优先组合[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)和[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)属性来设置截断方式，具体详见[示例4设置文本断行及折行](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#示例4设置文本断行及折行)、[如何解决Text组件文本为中文、数字、英文混合时显示省略号截断异常的问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-faqs/faqs-arkui-347)。

当TextOverflowOptions设置为TextOverflow.MARQUEE时：

* 文本在一行内滚动显示。
* 设置[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)及[copyOption](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)属性均不生效。
* Text组件[clip](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clip12)属性默认为true。
* 属性字符串的[CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)不支持跑马灯模式。
* [textAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign)属性的生效规则：当文本不可滚动时，textAlign属性生效；当文本可滚动时，textAlign属性不生效。
* 从API version 12开始，当TextOverflowOptions设置为TextOverflow.MARQUEE时，支持ImageSpan组件，文本和图片可在一行内滚动显示。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [TextOverflowOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflowoptions18对象说明) | 是 | 文本超长显示方式对象 |

### textSelectable12+

PhonePC/2in1TabletTVWearable

textSelectable(mode: TextSelectableMode)

设置是否支持文本可选择、可获焦。

需配合[copyOption](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| mode | [TextSelectableMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textselectablemode12) | 是 | 文本是否支持可选择、可获焦。  默认值：TextSelectableMode.SELECTABLE\_UNFOCUSABLE |

### textShadow10+

PhonePC/2in1TabletTVWearable

textShadow(value: ShadowOptions | Array<ShadowOptions>)

设置文字阴影效果。

不支持ShadowOptions对象中的type、fill字段和color字段的智能取色模式。

从API version 11开始，该接口支持以数组形式入参，实现多重文字阴影。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明) | Array<[ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明)>11+ | 是 | 文字阴影效果。 |

### textVerticalAlign20+

PhonePC/2in1TabletTVWearable

textVerticalAlign(textVerticalAlign: Optional<TextVerticalAlign>)

设置文本段落在垂直方向的对齐方式。

说明

* 与[halfLeading](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#halfleading12)同时配置时，halfLeading不生效。
* 一个段落下使用同一字号必须同时设置行高[lineHeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)或者同一个段落不同字号文本混排时才有效果差异，否则设置了该属性任意枚举值和未设置该属性都是一样的排版效果。属性字符串[TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyle)中的SuperscriptStyle上下角标样式仅在[TextVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textverticalalign20)属性值为TextVerticalAlign.BASELINE时生效，其余垂直对齐方式下上下角标文本和普通文本表现一致，无上下角标效果。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| textVerticalAlign | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[TextVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textverticalalign20)> | 是 | 文本段落在垂直方向的对齐方式。  默认值：TextVerticalAlign.BASELINE |

### wordBreak11+

PhonePC/2in1TabletTVWearable

wordBreak(value: WordBreak)

设置断行规则。

默认情况下，不调用wordBreak或者设置WordBreak.BREAK\_WORD时，文本截断按字进行。例如，英文以单词为最小单位进行截断。

WordBreak.BREAK\_ALL与{overflow: TextOverflow.Ellipsis}、maxLines组合使用，可实现英文单词按字母截断，超出部分以省略号显示。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#wordbreak11) | 是 | 断行规则。  默认值：WordBreak.BREAK\_WORD |

## TextSpanType11+枚举说明

PhonePC/2in1TabletTVWearable

[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)类型信息。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| TEXT | 0 | Span为文字类型。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| IMAGE | 1 | Span为图像类型。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| MIXED | 2 | Span为图文混合类型。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| DEFAULT15+ | 3 | 注册此类型菜单但未注册TEXT、IMAGE、MIXED菜单时，文字类型、图片类型、图文混合类型都会触发并显示此类型对应的菜单。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |

说明

菜单类型的匹配顺序如下。例如，用户长按文本时，根据以下规则查找：

1. 查找是否注册了TextSpanType.TEXT、TextResponseType.LONG\_PRESS菜单
2. 查找是否注册了TextSpanType.TEXT、TextResponseType.DEFAULT菜单
3. 查找是否注册了TextSpanType.DEFAULT、TextResponseType.LONG\_PRESS菜单
4. 查找是否注册了TextSpanType.DEFAULT、TextResponseType.DEFAULT菜单

## TextResponseType11+枚举说明

PhonePC/2in1TabletTVWearable

选择菜单的响应类型。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| RIGHT\_CLICK | 0 | 通过鼠标右键触发菜单弹出。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| LONG\_PRESS | 1 | 通过长按触发菜单弹出。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| SELECT | 2 | 通过鼠标选中触发菜单弹出。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| DEFAULT15+ | 3 | 注册此类型的菜单，但未注册RIGHT\_CLICK、LONG\_PRESS、SELECT时，右键、长按、鼠标、[selection](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selection11)选中均会触发并显示此类型对应的菜单。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |

说明

菜单类型的匹配顺序如下。例如，用户长按文本时，根据以下规则查找：

1. 查找是否注册了TextSpanType.TEXT、TextResponseType.LONG\_PRESS菜单
2. 查找是否注册了TextSpanType.TEXT、TextResponseType.DEFAULT菜单
3. 查找是否注册了TextSpanType.DEFAULT、TextResponseType.LONG\_PRESS菜单
4. 查找是否注册了TextSpanType.DEFAULT、TextResponseType.DEFAULT菜单

## TextOverflowOptions18+对象说明

PhonePC/2in1TabletTVWearable

文本超长显示方式对象。

说明

为规范匿名对象的定义，API 18版本修改了此处的元素定义。其中，保留了历史匿名对象的起始版本信息，会出现外层元素@since版本号高于内层元素版本号的情况，但这不影响接口的使用。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| overflow7+ | [TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textoverflow) | 否 | 否 | 文本超长时的显示方式。  默认值：TextOverflow.Clip  **卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |

## 事件

PhonePC/2in1TabletTVWearable

除支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)外，还支持以下事件：

### onCopy11+

PhonePC/2in1TabletTVWearable

onCopy(callback:(value: string) => void)

长按文本内部区域弹出剪贴板后，点击剪贴板复制按钮，触发该回调。目前只有文本可以复制。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | 是 | 复制的文本内容。 |

### onTextSelectionChange11+

PhonePC/2in1TabletTVWearable

onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void)

文本选择的位置发生变化时，触发该回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| selectionStart | number | 是 | 所选文本的起始位置。 |
| selectionEnd | number | 是 | 所选文本的结束位置。 |

### onMarqueeStateChange18+

PhonePC/2in1TabletTVWearable

onMarqueeStateChange(callback: Callback<MarqueeState>)

跑马灯动画进行到特定的阶段时，触发该回调。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | Callback<[MarqueeState](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#marqueestate18枚举说明)> | 是 | 通过callback参数指定触发回调的状态，状态由MarqueeState枚举定义，例如开始滚动、滚动一次、滚动完成。 |

## TextOptions11+

PhonePC/2in1TabletTVWearable

Text初始化参数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| controller | [TextController](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcontroller11) | 否 | 否 | 文本控制器。 |

## TextController11+

PhonePC/2in1TabletTVWearable

Text组件的控制器。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 导入对象



```
1. controller: TextController = new TextController()
```

### closeSelectionMenu11+

PhonePC/2in1TabletTVWearable

closeSelectionMenu(): void

关闭自定义选择菜单或系统默认选择菜单。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### setStyledString12+

PhonePC/2in1TabletTVWearable

setStyledString(value: StyledString): void

触发绑定或更新属性字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 是 | 属性字符串。  **说明：**  StyledString的子类[MutableStyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#mutablestyledstring)也可以作为入参值。 |

说明

多次调用setStyledString，会用新的入参覆盖已绑定的属性字符串，而不是叠加新的入参。

属性字符串通过controller绑定时，需要等待布局完成后，绑定生效。当[measure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#measure12)和setStyledString同时使用，开发者需要通过[@ohos.arkui.inspector (布局回调)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-inspector)判断布局完成，再绑定属性字符串。

在API version 14及以下版本，开发者调用TextController的setStyledString接口设置属性字符串，如果调用时TextController还未绑定对应的Text，则此次设置无效。

从API version 15开始，TextController会保存设置的属性字符串。当TextController已经和Text绑定，则Text会自动设置属性字符串，显示对应的样式。

这一区别体现在[aboutToAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttoappear)中设置属性字符串，API 14及以下版本不生效，API 15及以上版本生效，推荐用法请参考[创建并应用StyledString和MutableStyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-styled-string#创建并应用styledstring和mutablestyledstring)。

### getLayoutManager12+

PhonePC/2in1TabletTVWearable

getLayoutManager(): LayoutManager

获取布局管理器对象。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [LayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#layoutmanager12) | 布局管理器对象。 |

### setTextSelection23+

PhonePC/2in1TabletTVWearable

setTextSelection(selectionStart: number | undefined, selectionEnd: number | undefined, options?: SelectionOptions): void

设置文本选择区域并高亮显示。

说明

当[copyOption](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9)设置为CopyOptions.None时，设置setTextSelection不生效。

当[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)设置为TextOverflow.MARQUEE时，设置setTextSelection不生效。

当selectionStart大于等于selectionEnd时不选中。可选范围为[0, textSize]，其中textSize为文本内容最大字符数，入参小于0时处理为0，大于textSize时处理为textSize。

当selectionStart或selectionEnd位于截断的不可见区域时，文本不选中。截断为false时，超出父组件的文本选中区域生效。

如果设备为PC/2in1，即使options被赋值为MenuPolicy.SHOW，调用setTextSelection也不弹出菜单。

当emoji表情被选中区域截断时，若表情的起始位置包含在设置的文本选中区域内，该表情就会被选中。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| selectionStart | number | undefined | 是 | 文本选择区域起始位置。  取值范围：[0, +∞），值为负数或undefined时按0处理。 |
| selectionEnd | number | undefined | 是 | 文本选择区域结束位置。  取值范围：[0, +∞），值为负数或undefined时按0处理。 |
| options | [SelectionOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-text-style#selectionoptions12对象说明) | 否 | 选中文字时的配置。  默认值：SelectionOptions中MenuPolicy.DEFAULT |

## TextMarqueeOptions18+对象说明

PhonePC/2in1TabletTVWearable

Marquee初始化参数。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| start | boolean | 否 | 否 | 控制跑马灯进入播放状态。  true表示播放，false表示不播放。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| step | number | 否 | 是 | 滚动动画文本滚动步长。  默认值：4.0vp  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| spacing23+ | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 两轮跑马灯之间的间距。如果LengthMetrics的unit值是PERCENT，当前设置不生效，按默认值处理。  默认值：48.0vp  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |
| loop | number | 否 | 是 | 设置重复滚动的次数，小于等于零时无限循环。  默认值：-1  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| fromStart | boolean | 否 | 是 | 设置文本从头开始滚动或反向滚动。  true表示从头开始滚动，false表示反向滚动。  默认值：true  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| delay | number | 否 | 是 | 设置每次滚动的时间间隔。  默认值：0  单位：毫秒  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| fadeout | boolean | 否 | 是 | 设置文字超长时的渐隐效果。  true表示支持渐隐效果，false表示不支持渐隐效果。  当Text内容超出显示范围时，未完全展现的文字边缘将应用渐隐效果。若两端均有文字未完全显示，则两端同时应用渐隐效果。在渐隐效果开启状态下，clip属性将自动锁定为true，不允许设置为false。  默认值：false  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| marqueeStartPolicy | [MarqueeStartPolicy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#marqueestartpolicy18枚举说明) | 否 | 是 | 设置跑马灯启动策略，该属性值生效需将start设置为true。  默认值：TV设备上默认值为MarqueeStartPolicy.ON\_FOCUS，其他设备默认值为MarqueeStartPolicy.DEFAULT  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| marqueeUpdatePolicy23+ | [MarqueeUpdatePolicy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#marqueeupdatepolicy23枚举说明) | 否 | 是 | 跑马灯组件属性更新后，跑马灯的滚动策略。  当跑马灯为播放状态，且文本内容宽度超过跑马灯组件宽度时，该属性生效。  默认值：MarqueeUpdatePolicy.DEFAULT  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |

## MarqueeStartPolicy18+枚举说明

PhonePC/2in1TabletTVWearable

Marquee的滚动方式，可选择默认持续滚动或条件触发滚动。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DEFAULT | 0 | 默认持续滚动。 |
| ON\_FOCUS | 1 | 获焦以及鼠标悬浮时开始滚动。 |

## MarqueeUpdatePolicy23+枚举说明

PhonePC/2in1TabletTVWearable

跑马灯组件属性更新后，跑马灯的滚动策略。

**元服务API：** 从API version 23开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DEFAULT | 0 | 跑马灯组件属性更新后，从开始位置，运行跑马灯效果。 |
| PRESERVE\_POSITION | 1 | 跑马灯组件属性更新后，保持当前位置，运行跑马灯效果。 |

## MarqueeState18+枚举说明

PhonePC/2in1TabletTVWearable

Marquee状态回调的返回值。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| START | 0 | 跑马灯滚动开始。 |
| BOUNCE | 1 | 完成一次跑马灯滚动，如果循环次数不是1，将会多次返回。 |
| FINISH | 2 | 跑马灯全部循环次数完成。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置文本布局）

该示例通过[textAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign)、[lineHeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)、[baselineOffset](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#baselineoffset)、[halfLeading](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#halfleading12)（从API version 12开始）属性展示了文本布局的效果。



```
1. // xxx.ets
2. @Extend(Text)
3. function style(TextAlign: TextAlign) {
4. .textAlign(TextAlign)
5. .fontSize(12)
6. .border({ width: 1 })
7. .padding(10)
8. .width('100%')
9. .margin(5)
10. }

12. @Entry
13. @Component
14. struct TextExample1 {
15. @State changeTextAlignIndex: number = 0;
16. @State changeDecorationIndex: number = 0;
17. @State textAlign: TextAlign[] = [TextAlign.Start, TextAlign.Center, TextAlign.End];
18. @State textAlignStr: string[] = ['Start', 'Center', 'End'];

20. build() {
21. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
22. // 设置文本水平方向对齐方式
23. // 单行文本
24. Text('textAlign').fontSize(9).fontColor(0xCCCCCC)
25. Text(`TextAlign set to ${this.textAlignStr[this.changeTextAlignIndex]}.`)
26. .style(this.textAlign[this.changeTextAlignIndex])

28. // 多行文本
29. Text(`This is the text content with textAlign set to ${this.textAlignStr[this.changeTextAlignIndex]}.`)
30. .style(this.textAlign[this.changeTextAlignIndex])
31. .margin(5)

33. Row() {
34. Button('当前TextAlign类型：' + this.textAlignStr[this.changeTextAlignIndex]).onClick(() => {
35. this.changeTextAlignIndex++;
36. if (this.changeTextAlignIndex > (this.textAlignStr.length - 1)) {
37. this.changeTextAlignIndex = 0;
38. }
39. })
40. }.justifyContent(FlexAlign.Center).width('100%')

42. // 设置文本行高
43. Text('lineHeight').fontSize(9).fontColor(0xCCCCCC)
44. Text('This is the text with the line height set. This is the text with the line height set.')
45. .style(TextAlign.Start)
46. Text('This is the text with the line height set. This is the text with the line height set.')
47. .style(TextAlign.Start)
48. .lineHeight(20)

50. // 设置文本基线偏移
51. Text('baselineOffset').fontSize(9).fontColor(0xCCCCCC)
52. Text('This is the text content with baselineOffset 0.')
53. .baselineOffset(0)
54. .style(TextAlign.Start)
55. Text('This is the text content with baselineOffset 30.')
56. .baselineOffset(30)
57. .style(TextAlign.Start)
58. Text('This is the text content with baselineOffset -20.')
59. .baselineOffset(-20)
60. .style(TextAlign.Start)

62. // 设置文本是否居中对齐
63. Text('halfLeading').fontSize(9).fontColor(0xCCCCCC)
64. Text("This is the text with the halfLeading set.")
65. .lineHeight(60)
66. .halfLeading(true)
67. .style(TextAlign.Start)
68. Text("This is the text without the halfLeading set.")
69. .lineHeight(60)
70. .halfLeading(false)
71. .style(TextAlign.Start)
72. }.height(600).width('100%').padding({ left: 35, right: 35, top: 35 })
73. }
74. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/dw6cvqHJT7eqlvWSm5D6hg/zh-cn_image_0000002568919030.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=DCAE6AF4CD7088991B35E492415D25AE8080DEEDDD678636855AB6CA25D51EAB)

### 示例2（设置文本样式）

该示例通过[decoration](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#decoration)、[letterSpacing](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#letterspacing)、[textCase](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcase)、[fontFamily](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontfamily)、[textShadow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textshadow10)（从API version 10开始）、fontStyle、[textIndent](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textindent10)（从API version 10开始）、[fontWeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontweight12)（从API version 12开始，支持设置字重无极调节配置项）属性展示了不同样式的文本效果。



```
1. // xxx.ets
2. @Extend(Text)
3. function style() {
4. .font({ size: 12 }, { enableVariableFontWeight: true })
5. .border({ width: 1 })
6. .padding(10)
7. .width('100%')
8. .margin(5)
9. }

11. @Entry
12. @Component
13. struct TextExample2 {
14. @State changeDecorationIndex: number = 0;
15. @State textDecorationType: TextDecorationType[] =
16. [TextDecorationType.LineThrough, TextDecorationType.Overline, TextDecorationType.Underline];
17. @State textDecorationTypeStr: string[] = ['LineThrough', 'Overline', 'Underline'];
18. @State textDecorationStyle: TextDecorationStyle[] =
19. [TextDecorationStyle.SOLID, TextDecorationStyle.DOTTED, TextDecorationStyle.WAVY];
20. @State textDecorationStyleStr: string[] = ['SOLID', 'DOTTED', 'WAVY'];

22. build() {
23. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
24. Text('decoration').fontSize(9).fontColor(0xCCCCCC)
25. Text('This is the text content with the decoration set to LineThrough and the color set to Red.')
26. .decoration({
27. type: this.textDecorationType[this.changeDecorationIndex],
28. color: Color.Red,
29. style: this.textDecorationStyle[this.changeDecorationIndex]
30. })
31. .style()
32. .margin(5)

34. Row() {
35. Button('decoration type：' + this.textDecorationTypeStr[this.changeDecorationIndex] + ' & ' +
36. this.textDecorationStyleStr[this.changeDecorationIndex]).onClick(() => {
37. this.changeDecorationIndex++;
38. if (this.changeDecorationIndex > (this.textDecorationTypeStr.length - 1)) {
39. this.changeDecorationIndex = 0;
40. }
41. })
42. }.justifyContent(FlexAlign.Center).width('100%')

44. // 文本字符间距
45. Text('letterSpacing').fontSize(9).fontColor(0xCCCCCC)
46. Text('This is the text content with letterSpacing 0.')
47. .letterSpacing(0)
48. .style()
49. Text('This is the text content with letterSpacing 3.')
50. .letterSpacing(3)
51. .style()
52. Text('This is the text content with letterSpacing -1.')
53. .letterSpacing(-1)
54. .style()

56. Text('textCase').fontSize(9).fontColor(0xCCCCCC)
57. Text('This is the text content with textCase set to Normal.')
58. .textCase(TextCase.Normal)
59. .style()
60. // 文本全小写展示
61. Text('This is the text content with textCase set to LowerCase.')
62. .textCase(TextCase.LowerCase)
63. .style()
64. // 文本全大写展示
65. Text('This is the text content with textCase set to UpperCase.')
66. .textCase(TextCase.UpperCase)
67. .style()

69. Text('fontFamily').fontSize(9).fontColor(0xCCCCCC)
70. // 设置字体列表
71. Text('This is the text content with fontFamily')
72. .style()
73. .fontFamily('HarmonyOS Sans')

75. Text('textShadow').fontSize(9).fontColor(0xCCCCCC)
76. // 设置文字阴影效果
77. Text('textShadow')
78. .style()
79. .textAlign(TextAlign.Center)
80. .fontSize(40)
81. .textShadow({
82. radius: 10,
83. color: Color.Black,
84. offsetX: 0,
85. offsetY: 0
86. })

88. Text('fontStyle').fontSize(9).fontColor(0xCCCCCC)
89. // 设置字体样式
90. Text('This is the text content with fontStyle set to Italic')
91. .style()
92. .fontStyle(FontStyle.Italic)
93. Text('This is the text content with fontStyle set to Normal')
94. .style()
95. .fontStyle(FontStyle.Normal)

97. Text('textIndent').fontSize(9).fontColor(0xCCCCCC)
98. // 设置文字缩进
99. Text('This is the text content with textIndent 30')
100. .style()
101. .textIndent(30)

103. Text('fontWeight').fontSize(9).fontColor(0xCCCCCC)
104. // 设置文本的字体粗细
105. Text('This is the text content with fontWeight 800')
106. .style()
107. .fontWeight('800', { enableVariableFontWeight: true })

109. }.width('100%').padding({ left: 35, right: 35 })
110. }
111. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/E4Mo_9pBTAmJ_7AFCJOxdA/zh-cn_image_0000002599478575.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=15861FB2F218E960AA8C43DD0B11D54635150FAF3485B312DDD34603DFF8B313)

### 示例3（设置文本超长省略）

该示例通过[maxLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines)、[textOverflow](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow)、[ellipsisMode](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#ellipsismode11)属性展示了文本超长省略以及调整省略位置的效果，通过MULTILINE\_START和MULTILINE\_CENTER两种类型实现了单行文本和多行文本场景下的省略号在行首和行中的效果。同时，可以通过[marqueeOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#marqueeoptions18)配置跑马灯模式下的配置项以及跑马灯动画进行到特定的阶段时，触发的回调[onMarqueeStateChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#onmarqueestatechange18)。

从API version 11开始，通过[ellipsisMode](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#ellipsismode11)属性设置文本超长时的显示方式。

从API version 18开始，新增[marqueeOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#marqueeoptions18)属性设置跑马灯模式下的配置项，同时新增回调[onMarqueeStateChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#onmarqueestatechange18)。

从API version 24开始，[EllipsisMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#ellipsismode11)新增了MULTILINE\_START和MULTILINE\_CENTER枚举。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';

4. @Extend(Text)
5. function style() {
6. .textAlign(TextAlign.Center)
7. .fontSize(15)
8. .border({ width: 1 })
9. .padding(10)
10. .width('100%')
11. .margin(5)
12. }

14. @Entry
15. @Component
16. struct TextExample3 {
17. @State text: string =
18. 'The text component is used to display a piece of textual information.' +
19. 'Support universal attributes and universal text attributes.' +
20. 'The text component is used to display a piece of textual information.' +
21. 'Support universal attributes and universal text attributes.';
22. @State ellipsisModeIndex: number = 0;
23. @State ellipsisMode: EllipsisMode[] =
24. [EllipsisMode.START, EllipsisMode.CENTER, EllipsisMode.END, EllipsisMode.MULTILINE_START,
25. EllipsisMode.MULTILINE_CENTER]; // 从API version 24开始新增MULTILINE_START和MULTILINE_CENTER
26. @State ellipsisModeStr: string[] = ['START', 'CENTER', 'END', 'MULTILINE_START',
27. 'MULTILINE_CENTER'];

29. build() {
30. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
31. // 文本超长时显示方式
32. Text('TextOverflow+maxLines').fontSize(12).fontColor(Color.Black)
33. // 超出maxLines截断内容展示
34. Text('This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content. This is the setting of textOverflow to Clip text content This is the setting of textOverflow to None text content.')
35. .textOverflow({ overflow: TextOverflow.Clip })
36. .maxLines(1)
37. .style()

39. // 超出maxLines展示省略号
40. Text('This is set textOverflow to Ellipsis text content This is set textOverflow to Ellipsis text content.')
41. .textOverflow({ overflow: TextOverflow.Ellipsis })
42. .maxLines(1)
43. .style()

45. Text('marquee').fontSize(12).fontColor(Color.Black)
46. // 设置文本超长时以跑马灯的方式展示
47. Text('This is the text with the text overflow set marquee')
48. .textOverflow({ overflow: TextOverflow.MARQUEE })
49. .style()
50. .marqueeOptions({
51. start: true,
52. fromStart: true,
53. step: 6,
54. spacing: LengthMetrics.vp(48), // 从API version 23开始新增
55. loop: -1,
56. delay: 0,
57. fadeout: false,
58. marqueeStartPolicy: MarqueeStartPolicy.DEFAULT,
59. marqueeUpdatePolicy: MarqueeUpdatePolicy.DEFAULT // 从API version 23开始新增
60. })
61. .onMarqueeStateChange((state: MarqueeState) => {
62. if (state == MarqueeState.START) {
63. // "收到状态: START";
64. } else if (state == MarqueeState.BOUNCE) {
65. // "收到状态: BOUNCE";
66. } else if (state == MarqueeState.FINISH) {
67. // "收到状态: FINISH";
68. }
69. })

71. // 设置文本超长时省略号的位置
72. Text('ellipsisMode(单行文本)').fontSize(12).fontColor(Color.Black)
73. Text(this.text)
74. .textOverflow({ overflow: TextOverflow.Ellipsis })
75. .ellipsisMode(this.ellipsisMode[this.ellipsisModeIndex])
76. .maxLines(1)
77. .style()
78. Text('ellipsisMode(多行文本)').fontSize(12).fontColor(Color.Black)
79. Text(this.text)
80. .textOverflow({ overflow: TextOverflow.Ellipsis })
81. .ellipsisMode(this.ellipsisMode[this.ellipsisModeIndex])
82. .maxLines(3)
83. .style()

85. Row() {
86. Button('更改省略号位置：' + this.ellipsisModeStr[this.ellipsisModeIndex]).onClick(() => {
87. this.ellipsisModeIndex++;
88. if (this.ellipsisModeIndex > (this.ellipsisModeStr.length - 1)) {
89. this.ellipsisModeIndex = 0;
90. }
91. })
92. }
93. }.height(600).width('100%').padding({ left: 35, right: 35, top: 35 })
94. }
95. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e/v3/qgEG_aQ4S4S-Zq2Jx3rj3g/zh-cn_image_0000002568759384.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=E5FA1CDCC79CC6349B3017B530AB4B6A9A4044F632A5E80DFE042AA872213418)

### 示例4（设置文本断行及折行）

该示例通过[wordBreak](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#wordbreak11)（从API version 11开始）、[lineBreakStrategy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linebreakstrategy12)（从API version 12开始）、[clip](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clip12)属性展示了文本在不同断行、折行规则下的效果以及文本超长时是否截断。



```
1. // xxx.ets
2. @Extend(Text)
3. function style() {
4. .fontSize(12)
5. .border({ width: 1 })
6. .padding(10)
7. .width('100%')
8. .margin(5)
9. }

11. @Entry
12. @Component
13. struct TextExample4 {
14. @State text: string =
15. 'The text component is used to display a piece of textual information.Support universal attributes and universal text attributes.';
16. @State text2: string =
17. "They can be classified as built-in components–those directly provided by the ArkUI framework and custom components – those defined by developers" +
18. "The built-in components include buttons radio buttons progress indicators and text You can set the rendering effect of these components in method chaining mode," +
19. "page components are divided into independent UI units to implement independent creation development and reuse of different units on pages making pages more engineering-oriented.";
20. @State textClip: boolean = false;
21. @State wordBreakIndex: number = 0;
22. @State wordBreak: WordBreak[] = [WordBreak.NORMAL, WordBreak.BREAK_ALL, WordBreak.BREAK_WORD];
23. @State wordBreakStr: string[] = ['NORMAL', 'BREAK_ALL', 'BREAK_WORD'];
24. @State lineBreakStrategyIndex: number = 0;
25. @State lineBreakStrategy: LineBreakStrategy[] =
26. [LineBreakStrategy.GREEDY, LineBreakStrategy.HIGH_QUALITY, LineBreakStrategy.BALANCED];
27. @State lineBreakStrategyStr: string[] = ['GREEDY', 'HIGH_QUALITY', 'BALANCED'];

29. build() {
30. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
31. Text('wordBreak').fontSize(9).fontColor(0xCCCCCC)
32. // 设置文本断行规则
33. Text(this.text)
34. .maxLines(2)
35. .textOverflow({ overflow: TextOverflow.Ellipsis })
36. .wordBreak(this.wordBreak[this.wordBreakIndex])
37. .style()

39. Row() {
40. Button('当前wordBreak模式：' + this.wordBreakStr[this.wordBreakIndex]).onClick(() => {
41. this.wordBreakIndex++;
42. if (this.wordBreakIndex > (this.wordBreakStr.length - 1)) {
43. this.wordBreakIndex = 0;
44. }
45. })
46. }

48. Text('clip').fontSize(9).fontColor(0xCCCCCC)
49. // 设置文本是否超长截断
50. Text('This is set wordBreak to WordBreak text Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu.')
51. .wordBreak(WordBreak.NORMAL)
52. .maxLines(2)
53. .clip(this.textClip)
54. .style()
55. Row() {
56. Button('切换clip：' + this.textClip).onClick(() => {
57. this.textClip = !this.textClip;
58. })
59. }

61. Text('lineBreakStrategy').fontSize(9).fontColor(0xCCCCCC)
62. // 设置文本折行规则
63. Text(this.text2)
64. .lineBreakStrategy(this.lineBreakStrategy[this.lineBreakStrategyIndex])
65. .style()
66. Row() {
67. Button('当前lineBreakStrategy模式：' + this.lineBreakStrategyStr[this.lineBreakStrategyIndex]).onClick(() => {
68. this.lineBreakStrategyIndex++;
69. if (this.lineBreakStrategyIndex > (this.lineBreakStrategyStr.length - 1)) {
70. this.lineBreakStrategyIndex = 0;
71. }
72. })
73. }
74. }.height(600).width('100%').padding({ left: 35, right: 35, top: 35 })
75. }
76. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/RvsMu0JMT5uBcB20Ynhd4A/zh-cn_image_0000002599358627.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=2694840D7217ED589EE854F43B52C033AE457207822D5608F0758FA4807AF082)

### 示例5（设置文本选中和复制）

该示例通过[selection](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selection11)（从API version 11开始）、[onCopy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#oncopy11)（从API version 11开始）、[draggable](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#draggable9)（从API version 9开始）、[caretColor](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#caretcolor14)（从API version 14开始）、[selectedBackgroundColor](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selectedbackgroundcolor14)（从API version 14开始）接口展示了文本选中、触发复制回调、设置文本选中可拖拽以及修改手柄和选中颜色的效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample5 {
5. @State onCopy: string = '';
6. @State text: string =
7. 'This is set selection to Selection text content This is set selection to Selection text content.';
8. @State start: number = 0;
9. @State end: number = 20;

11. build() {
12. Column() {
13. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start }) {
14. Text(this.text)
15. .fontSize(12)
16. .border({ width: 1 })
17. .lineHeight(20)
18. .margin(30)
19. .copyOption(CopyOptions.InApp)
20. .selection(this.start, this.end)
21. .onCopy((value: string) => {
22. this.onCopy = value;
23. })
24. .draggable(true)
25. .caretColor(Color.Red)
26. .selectedBackgroundColor(Color.Grey)
27. .enableHapticFeedback(true)
28. Button('Set text selection')
29. .onClick(() => {
30. // 变更文本选中起始点、终点
31. this.start = 10;
32. this.end = 30;
33. })
34. Text(this.onCopy).fontSize(12).margin(10).key('copy')
35. }.height(600).width(335).padding({ left: 35, right: 35, top: 35 })
36. }.width('100%')
37. }
38. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4f/v3/F5C9cCdKS7WYmSqhQt7jgQ/zh-cn_image_0000002568919032.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=A555CC7EEE949BA7A689A53A7A0B7637A4790E1D3B289125DDB0CE033D2F302B)

### 示例6（设置文本自适应和缩放倍数限制范围）

该示例通过[heightAdaptivePolicy](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#heightadaptivepolicy10)（从API version 10开始）属性展示文本自适应效果以及通过[minFontScale](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minfontscale12)（从API version 12开始）、[maxFontScale](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxfontscale12)（从API version 12开始）展示设置字体缩放倍数限制范围。



```
1. // xxx.ets
2. @Extend(Text)
3. function style(HeightAdaptivePolicy: TextHeightAdaptivePolicy) {
4. .width('80%')
5. .height(90)
6. .borderWidth(1)
7. .minFontSize(10)
8. .maxFontSize(30)
9. .maxLines(2)
10. .margin(5)
11. .textOverflow({ overflow: TextOverflow.Ellipsis })
12. .heightAdaptivePolicy(HeightAdaptivePolicy)
13. }

15. @Entry
16. @Component
17. struct TextExample6 {
18. build() {
19. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center }) {
20. // 设置文本自适应高度的方式
21. Text('heightAdaptivePolicy').fontSize(9).fontColor(0xCCCCCC)
22. Text('This is the text with the height adaptive policy set.')
23. .style(TextHeightAdaptivePolicy.MAX_LINES_FIRST)
24. Text('This is the text with the height adaptive policy set.')
25. .style(TextHeightAdaptivePolicy.MIN_FONT_SIZE_FIRST)
26. Text('This is the text with the height adaptive policy set.')
27. .style(TextHeightAdaptivePolicy.LAYOUT_CONSTRAINT_FIRST)

29. Text('fontScale').fontSize(9).fontColor(0xCCCCCC)
30. Text('This is the text content with minFontScale set to 1 and maxFontScale set to 1.2')
31. .style(TextHeightAdaptivePolicy.MAX_LINES_FIRST)
32. .minFontScale(1)
33. .maxFontScale(1.2)
34. }.height(600).width('100%').padding({ left: 35, right: 35, top: 35 })
35. }
36. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7/v3/bq4DuDOoThiwQ_BhFiYFNA/zh-cn_image_0000002599478577.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=070E5B484E8A311CC8A62BC885750A3529D74B47E5F3B45478DD9E0F557922CC)

### 示例7（设置文本识别）

从API version 11开始，该示例通过[enableDataDetector](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)、[dataDetectorConfig](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11)接口实现了文本识别的功能。当[enableDataDetector](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11)设为true且不设置[dataDetectorConfig](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11)时，系统会识别所有实体类型，并将识别实体的字体颜色改为蓝色、添加蓝色下划线。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample7 {
5. @State phoneNumber: string = '(86) (755) ********';
6. @State url: string = 'www.********.com';
7. @State email: string = '***@example.com';
8. @State address: string = 'XX省XX市XX区XXXX';
9. @State datetime: string = 'XX年XX月XX日XXXX';
10. @State enableDataDetector: boolean = true;
11. @State types: TextDataDetectorType[] = [];

13. build() {
14. Row() {
15. Column() {
16. Text(
17. '电话号码：' + this.phoneNumber + '\n' +
18. '链接：' + this.url + '\n' +
19. '邮箱：' + this.email + '\n' +
20. '地址：' + this.address + '\n' +
21. '时间：' + this.datetime
22. )
23. .fontSize(16)
24. .copyOption(CopyOptions.InApp)
25. .enableDataDetector(this.enableDataDetector)
26. .dataDetectorConfig({
27. types: this.types, onDetectResultUpdate: (result: string) => {
28. }
29. })
30. .textAlign(TextAlign.Center)
31. .borderWidth(1)
32. .padding(10)
33. .width('100%')
34. Text(
35. '电话号码：' + this.phoneNumber + '\n' +
36. '时间：' + this.datetime
37. )
38. .fontSize(16)
39. .copyOption(CopyOptions.LocalDevice)
40. .textAlign(TextAlign.Center)
41. .borderWidth(1)
42. .padding(10)
43. .width('100%')
44. TextInput({ text: 'TextInput这个是输入框内容' })
45. .copyOption(CopyOptions.LocalDevice)
46. TextArea({ text: 'TextArea这个是输入框内容' })
47. .copyOption(CopyOptions.LocalDevice)
48. Search()
49. .copyOption(CopyOptions.LocalDevice)
50. }
51. .width('100%')
52. // 使用parallelGesture中的TapGesture替代onClick属性，达到非冒泡事件类似冒泡
53. // 的效果，点击Text组件区域Column上的点击事件正常响应
54. .parallelGesture(TapGesture().onAction((event: GestureEvent) => {
55. console.info('test column onClick timestamp:' + event.timestamp);
56. }), GestureMask.Normal)
57. }
58. .height('100%')
59. }
60. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/Wx-Ap-EARBOS8Y2xf0DbYQ/zh-cn_image_0000002568759386.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=85FE3A77376700BEF949CFBE200D2A0723FBC12E7F7611E069D41171095E65FB)

### 示例8（文本绑定自定义菜单）

从API version 11开始，该示例通过[bindSelectionMenu](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#bindselectionmenu11)、[onTextSelectionChange](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#ontextselectionchange11)、[closeSelectionMenu](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#closeselectionmenu11)接口实现了文本绑定自定义菜单的功能。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample8 {
5. controller: TextController = new TextController();
6. options: TextOptions = { controller: this.controller };

8. build() {
9. Column() {
10. Column() {
11. Text(undefined, this.options) {
12. Span('Hello World')
13. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
14. ImageSpan($r('app.media.startIcon'))
15. .width(50)
16. .height(50)
17. .objectFit(ImageFit.Fill)
18. .verticalAlign(ImageSpanAlignment.CENTER)
19. }
20. .copyOption(CopyOptions.InApp)
21. .bindSelectionMenu(TextSpanType.IMAGE, this.LongPressImageCustomMenu, TextResponseType.LONG_PRESS, {
22. onDisappear: () => {
23. console.info(`自定义选择菜单关闭时回调`);
24. },
25. onAppear: () => {
26. console.info(`自定义选择菜单弹出时回调`);
27. },
28. onMenuShow: () => {
29. console.info(`自定义选择菜单显示时回调`);
30. },
31. onMenuHide: () => {
32. console.info(`自定义选择菜单隐藏时回调`);
33. }
34. })
35. .bindSelectionMenu(TextSpanType.TEXT, this.RightClickTextCustomMenu, TextResponseType.RIGHT_CLICK)
36. .bindSelectionMenu(TextSpanType.MIXED, this.SelectMixCustomMenu, TextResponseType.SELECT)
37. .onTextSelectionChange((selectionStart: number, selectionEnd: number) => {
38. console.info(`文本选中区域变化回调, selectionStart: ${selectionStart}, selectionEnd: ${selectionEnd}`);
39. })
40. .borderWidth(1)
41. .borderColor(Color.Red)
42. .width(200)
43. .height(100)
44. }
45. .width('100%')
46. .backgroundColor(Color.White)
47. .alignItems(HorizontalAlign.Start)
48. .padding(25)
49. }
50. .height('100%')
51. }

53. @Builder
54. RightClickTextCustomMenu() {
55. Column() {
56. Menu() {
57. MenuItemGroup() {
58. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
59. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Right Click Menu 1", labelInfo: "" })
60. .onClick((event) => {
61. this.controller.closeSelectionMenu();
62. })
63. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Right Click Menu 2", labelInfo: "" })
64. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Right Click Menu 3", labelInfo: "" })
65. }
66. }
67. .MenuStyles()
68. }
69. }

71. @Builder
72. LongPressImageCustomMenu() {
73. Column() {
74. Menu() {
75. MenuItemGroup() {
76. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
77. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Long Press Image Menu 1", labelInfo: "" })
78. .onClick((event) => {
79. this.controller.closeSelectionMenu();
80. })
81. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Long Press Image Menu 2", labelInfo: "" })
82. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Long Press Image Menu 3", labelInfo: "" })
83. }
84. }
85. .MenuStyles()
86. }
87. }

89. @Builder
90. SelectMixCustomMenu() {
91. Column() {
92. Menu() {
93. MenuItemGroup() {
94. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
95. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Select Mixed Menu 1", labelInfo: "" })
96. .onClick((event) => {
97. this.controller.closeSelectionMenu();
98. })
99. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Select Mixed Menu 2", labelInfo: "" })
100. MenuItem({ startIcon: $r('app.media.startIcon'), content: "Select Mixed Menu 3", labelInfo: "" })
101. }
102. }
103. .MenuStyles()
104. }
105. }
106. }

108. @Extend(Menu)
109. function MenuStyles() {
110. .radius($r('sys.float.ohos_id_corner_radius_card'))
111. .clip(true)
112. .backgroundColor('#F0F0F0')
113. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/qrngS8UwTw2hnPSdxodSvA/zh-cn_image_0000002599358629.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=D91EDF2E41E3625052762743904B5A90F9627CB0F035B382EED620013C412A68)

### 示例9（设置文本特性与行间距）

从API version 12开始，该示例通过[fontFeature](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontfeature12)、[lineSpacing](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing12)接口展示了设置文本特性与行间距的效果，同时，配置[LineSpacingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#linespacingoptions20对象说明)中的onlyBetweenLines（从API version 20开始）属性，可以设置文本的行间距，是否仅在行与行之间生效。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';

4. @Extend(Text)
5. function style() {
6. .fontSize(12)
7. .border({ width: 1 })
8. .width('100%')
9. }

11. @Entry
12. @Component
13. struct TextExample9 {
14. build() {
15. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween }) {
16. Text('lineSpacing').fontSize(9).fontColor(0xCCCCCC)
17. // 设置文本行间距
18. Text('This is a context with no lineSpacing set.')
19. .lineSpacing(undefined)
20. .style()
21. Text('This is a context with lineSpacing set to 20_px.')
22. .lineSpacing(LengthMetrics.px(20))
23. .style()
24. Text('This is the context with lineSpacing set to 20_vp.')
25. .lineSpacing(LengthMetrics.vp(20))
26. .style()
27. Text('This is the context with lineSpacing set to 20_fp.')
28. .lineSpacing(LengthMetrics.fp(20))
29. .style()
30. Text('This is the context with lineSpacing set to 20_lpx.')
31. .lineSpacing(LengthMetrics.lpx(20))
32. .style()
33. Text('This is the context with lineSpacing set to 100%.')
34. .lineSpacing(LengthMetrics.percent(1))
35. .style()
36. Text('The line spacing of this context is set to 20_px, and the spacing is effective only between the lines.')
37. .lineSpacing(LengthMetrics.px(20), { onlyBetweenLines: true })
38. .style()

40. Text('fontFeature').fontSize(9).fontColor(0xCCCCCC)
41. // 设置文本特性
42. Text('This is frac on : 1/2 2/3 3/4')
43. .fontFeature("\"frac\" on")
44. .style()
45. Text('This is frac off: 1/2 2/3 3/4')
46. .fontFeature("\"frac\" off")
47. .style()
48. }.height(300).width(350).padding({ left: 35, right: 35, top: 35 })
49. }
50. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/EXx_D-AJSDq2XfloLa5soA/zh-cn_image_0000002568919034.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=275A9E4EAECC95FEE210602AF774A8550AD5DD7EF068380FC26FF232CCAE712B)

### 示例10（获取文本信息）

从API version 12开始，该示例通过[getLayoutManager](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#getlayoutmanager12)接口调用文本的布局管理对象获取文本信息，同时，[LayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#layoutmanager12)中的[getRectsForRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getrectsforrange14)（从API version 14开始）接口可以获取指定矩形宽度和高度下，文本中任意区间范围内字符或占位符的绘制区域信息。



```
1. // xxx.ets
2. import { text } from '@kit.ArkGraphics2D';

4. @Entry
5. @Component
6. struct TextExample10 {
7. @State lineCount: string = "";
8. @State glyphPositionAtCoordinate: string = "";
9. @State lineMetrics: string = "";
10. @State rectsForRangeStr: string = "";
11. controller: TextController = new TextController();
12. @State textStr: string =
13. 'Hello World! 您好，世界！';

15. build() {
16. Scroll() {
17. Column() {
18. Text('Text组件getLayoutManager接口获取段落相对组件的信息')
19. .fontSize(15)
20. .fontColor(0xCCCCCC)
21. .width('90%')
22. .padding(10)
23. Text(this.textStr, { controller: this.controller })
24. .fontSize(25)
25. .borderWidth(1)
26. .onAreaChange(() => {
27. let layoutManager: LayoutManager = this.controller.getLayoutManager();
28. this.lineCount = "LineCount: " + layoutManager.getLineCount();
29. })

31. Text('LineCount').fontSize(15).fontColor(0xCCCCCC).width('90%').padding(10)
32. Text(this.lineCount)

34. Text('GlyphPositionAtCoordinate').fontSize(15).fontColor(0xCCCCCC).width('90%').padding(10)
35. Button("相对组件坐标[150,50]字形信息")
36. .onClick(() => {
37. let layoutManager: LayoutManager = this.controller.getLayoutManager();
38. let position: PositionWithAffinity = layoutManager.getGlyphPositionAtCoordinate(150, 50);
39. this.glyphPositionAtCoordinate =
40. "相对组件坐标[150,50] glyphPositionAtCoordinate position: " + position.position + " affinity: " +
41. position.affinity;
42. })
43. .margin({ bottom: 20, top: 10 })
44. Text(this.glyphPositionAtCoordinate)

46. Text('LineMetrics').fontSize(15).fontColor(0xCCCCCC).width('90%').padding(10)
47. Button("首行行信息、文本样式信息、以及字体属性信息")
48. .onClick(() => {
49. let layoutManager: LayoutManager = this.controller.getLayoutManager();
50. let lineMetrics: LineMetrics = layoutManager.getLineMetrics(0);
51. this.lineMetrics = "lineMetrics is " + JSON.stringify(lineMetrics) + "\n\n";
52. let runMetrics = lineMetrics.runMetrics;
53. runMetrics.forEach((value, key) => {
54. this.lineMetrics += "runMetrics key is " + key + " " + JSON.stringify(value) + "\n\n";
55. })
56. })
57. .margin({ bottom: 20, top: 10 })
58. Text(this.lineMetrics)

60. Text('getRectsForRange').fontSize(15).fontColor(0xCCCCCC).width('90%').padding(10)
61. Button("获取指定矩形宽度和高度下，文本中任意区间范围内字符或占位符的绘制区域信息")
62. .onClick(() => {
63. let layoutManager: LayoutManager = this.controller.getLayoutManager();
64. let range: TextRange = { start: 0, end: 1 };
65. let rectsForRangeInfo: text.TextBox[] =
66. layoutManager.getRectsForRange(range, text.RectWidthStyle.TIGHT, text.RectHeightStyle.TIGHT);
67. this.rectsForRangeStr = "getRectsForRange result is " + "\n\n";
68. rectsForRangeInfo.forEach((value, key) => {
69. this.rectsForRangeStr += "rectsForRange key is " + key + " " + JSON.stringify(value) + "\n\n";
70. })
71. })
72. .margin({ bottom: 20, top: 10 })
73. Text(this.rectsForRangeStr)
74. }
75. .margin({ top: 100, left: 8, right: 8 })
76. }
77. }
78. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/01/v3/Th4V0NwXR66vXz_j848HHw/zh-cn_image_0000002599478579.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=EE37C2B23E3ECDB32FAA76DFB4B2DD7E019328836F203B84F57BE3E9C62242A3)

### 示例11（实现键盘框选文本）

从API version 12开始，该示例通过[textSelectable](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textselectable12)属性实现了设置TextSelectMode.SELECTABLE\_FOCUSABLE时能够触发键盘框选文本功能。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample11 {
5. @State message: string =
6. 'TextTextTextTextTextTextTextText' + 'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText';

8. build() {
9. Column() {
10. Text(this.message)
11. .width(300)
12. .height(100)
13. .maxLines(5)
14. .fontColor(Color.Black)
15. .copyOption(CopyOptions.InApp)
16. .selection(3, 8)
17. .textSelectable(TextSelectableMode.SELECTABLE_FOCUSABLE)
18. }.width('100%').margin({ top: 100 })
19. }
20. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/yfMqKC1pTviVjQou5fVOOw/zh-cn_image_0000002568759388.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=C6F45E8F39BA5C526E02450BFB413AB7AA42F97A56073F2089AE578AEA4B1730)

### 示例12（文本扩展自定义菜单）

从API version 12开始，该示例通过[editMenuOptions](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12)接口实现了文本设置自定义菜单扩展项的文本内容、图标以及回调的功能，同时，可以在[onPrepareMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#属性-1)（从API version 20开始）回调中，进行菜单数据的设置。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample12 {
5. @State text: string = 'Text editMenuOptions'
6. @State endIndex: number = 0;
7. onCreateMenu = (menuItems: Array<TextMenuItem>) => {
8. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
9. let item1: TextMenuItem = {
10. content: 'create1',
11. icon: $r('app.media.startIcon'),
12. id: TextMenuItemId.of('create1'),
13. };
14. let item2: TextMenuItem = {
15. content: 'create2',
16. id: TextMenuItemId.of('create2'),
17. icon: $r('app.media.startIcon'),
18. };
19. menuItems.push(item1);
20. menuItems.unshift(item2);
21. let targetIndex = menuItems.findIndex(item => item.id.equals(TextMenuItemId.askAI));
22. if (targetIndex !== -1) {
23. menuItems.splice(targetIndex, 1); // 从目标索引删除1个元素
24. }
25. targetIndex = menuItems.findIndex(item => item.id.equals(TextMenuItemId.TRANSLATE));
26. if (targetIndex !== -1) {
27. menuItems.splice(targetIndex, 1);
28. }
29. return menuItems;
30. }
31. onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
32. if (menuItem.id.equals(TextMenuItemId.of("create2"))) {
33. console.info("拦截 id: create2 start:" + textRange.start + "; end:" + textRange.end);
34. return true;
35. }
36. if (menuItem.id.equals(TextMenuItemId.of("prepare1"))) {
37. console.info("拦截 id: prepare1 start:" + textRange.start + "; end:" + textRange.end);
38. return true;
39. }
40. if (menuItem.id.equals(TextMenuItemId.COPY)) {
41. console.info("拦截 COPY start:" + textRange.start + "; end:" + textRange.end);
42. return true;
43. }
44. if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
45. console.info("不拦截 SELECT_ALL start:" + textRange.start + "; end:" + textRange.end);
46. return false;
47. }
48. return false;
49. }
50. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
51. onPrepareMenu = (menuItems: Array<TextMenuItem>) => {
52. let item1: TextMenuItem = {
53. content: 'prepare1_' + this.endIndex,
54. icon: $r('app.media.startIcon'),
55. id: TextMenuItemId.of('prepare1'),
56. };
57. menuItems.unshift(item1);
58. return menuItems;
59. }
60. @State editMenuOptions: EditMenuOptions = {
61. onCreateMenu: this.onCreateMenu,
62. onMenuItemClick: this.onMenuItemClick,
63. onPrepareMenu: this.onPrepareMenu
64. };

66. build() {
67. Column() {
68. Text(this.text)
69. .fontSize(20)
70. .copyOption(CopyOptions.LocalDevice)
71. .editMenuOptions(this.editMenuOptions)
72. .margin({ top: 100 })
73. .onTextSelectionChange((selectionStart: number, selectionEnd: number) => {
74. this.endIndex = selectionEnd;
75. })
76. }
77. .width("90%")
78. .margin("5%")
79. }
80. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3a/v3/cf0Ys7ILQ2C0ZfcsONwykg/zh-cn_image_0000002599358631.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=843DD6F5767FD85CA0B9750053821E2B04247F153277D1B0877AAB702122B838)

### 示例13（配置隐私隐藏）

从API version 12开始，该示例通过[privacySensitive](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#privacysensitive12)属性展示了文本如何配置隐私隐藏的效果，实际显示需要卡片框架支持。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample13 {
5. build() {
6. Column({ space: 10 }) {
7. Text("privacySensitive")
8. .privacySensitive(true)
9. .margin({ top: 30 })
10. }
11. .alignItems(HorizontalAlign.Center)
12. .width("100%")
13. }
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/_bVFfjFlSOWIEBsxK0Bdnw/zh-cn_image_0000002568919036.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=E946AB3169372FEBE4762FE6354E000B4C56776C6C55AF55F971B4453AEEC99B)

### 示例14（设置中西文自动间距）

从API version 20开始，该示例通过[enableAutoSpacing](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enableautospacing20)属性设置中西文自动间距。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample {
5. build() {
6. Row() {
7. Column() {
8. Text('开启中西文自动间距').margin(5)
9. Text('中西文Auto Spacing自动间距')
10. .enableAutoSpacing(true)
11. Text('关闭中西文自动间距').margin(5)
12. Text('中西文Auto Spacing自动间距')
13. .enableAutoSpacing(false)
14. }.height('100%')
15. }
16. .width('60%')
17. }
18. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/7hcsp3UXTI-xiutzZ95_5w/zh-cn_image_0000002599478581.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=3574A713D22BD0A496F09EAE28B35D71BC982467665C0061FFF2100F8249FBAE)

### 示例15（文本颜色按线性或径向渐变）

从API version 20开始，该示例通过[shaderStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#shaderstyle20)接口实现了对Text组件显示为渐变色和纯色的功能。



```
1. @Entry
2. @Component
3. struct ShaderColorStyle {
4. @State message: string = 'Hello World';
5. @State linearGradientOptions1: LinearGradientOptions =
6. {
7. angle: 45,
8. colors: [[Color.Red, 0.0], [Color.Blue, 0.3], [Color.Green, 0.5]]
9. };
10. @State linearGradientOptions2: LinearGradientOptions =
11. {
12. direction: GradientDirection.LeftTop,
13. colors: [[Color.Red, 0.0], [Color.Blue, 0.3], [Color.Green, 0.5]],
14. repeating: true,
15. };
16. @State radialGradientOptions: RadialGradientOptions =
17. {
18. center: [50, 50],
19. radius: 20,
20. colors: [[Color.Red, 0.0], [Color.Blue, 0.3], [Color.Green, 0.5]],
21. repeating: true,
22. };
23. @State colorShaderStyle: ColorShaderStyle =
24. {
25. color: Color.Blue
26. };
27. build() {
28. Column({ space: 5 }) {
29. Text('angle为45°的线性渐变').fontSize(18).width('90%').fontColor(0xCCCCCC)
30. .margin({ top: 40, left: 40 })
31. Text(this.message)
32. .fontSize(50)
33. .width('80%')
34. .height(50)
35. .shaderStyle(this.linearGradientOptions1)
36. Text('direction为LeftTop的线性渐变').fontSize(18).width('90%').fontColor(0xCCCCCC)
37. .margin({ top: 40, left: 40 })
38. Text(this.message)
39. .fontSize(50)
40. .width('80%')
41. .height(50)
42. .shaderStyle(this.linearGradientOptions2)
43. Text('径向渐变').fontSize(18).width('90%').fontColor(0xCCCCCC)
44. .margin({ top: 40, left: 40 })
45. Text(this.message)
46. .fontSize(50)
47. .width('80%')
48. .height(50)
49. .shaderStyle(this.radialGradientOptions)
50. Text('纯色').fontSize(18).width('90%').fontColor(0xCCCCCC)
51. .margin({ top: 40, left: 40 })
52. Text(this.message)
53. .fontSize(50)
54. .width('80%')
55. .height(50)
56. .shaderStyle(this.colorShaderStyle)
57. }
58. }
59. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/9TbAPUWASk2gJXsIKXzSsA/zh-cn_image_0000002568759390.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=991FB1B03D1B319367079135A8FE5CB368E7B00CA9B33563F3CDA6DE208D897F)

### 示例16（配置除去行尾空格）

从API version 20开始，该示例通过[optimizeTrailingSpace](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#optimizetrailingspace20)属性展示了文本如何配置除去行尾空格的效果，一般需要与对齐功能搭配使用，实际显示需要字体引擎支持。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample16 {
5. build() {
6. Column() {
7. Text("Trimmed space enabled     ")
8. .fontSize(30)
9. .fontWeight(FontWeight.Bold)
10. .margin({ top: 20 })
11. .optimizeTrailingSpace(true)
12. .textAlign(TextAlign.Center)
13. Text("Trimmed space disabled     ")
14. .fontSize(30)
15. .fontWeight(FontWeight.Bold)
16. .margin({ top: 20 })
17. .optimizeTrailingSpace(false)
18. .textAlign(TextAlign.Center)
19. }
20. .width("100%")
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/W4DMGhTNQrWIANFPutOcDA/zh-cn_image_0000002599358633.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=72CA95BCFE597A957655AF0C1C602F9504E970D92AF78BF9C58CE66F967D6184)

### 示例17（文本垂直对齐）

从API version 20开始，该示例通过[textVerticalAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textverticalalign20)属性展示了文本如何设置文本垂直对齐效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample14 {
5. build() {
6. Column({ space: 10 }) {
7. Text() {
8. Span("Hello")
9. .fontSize(50)
10. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
11. ImageSpan($r('app.media.startIcon'))
12. .width(30).height(30)
13. .verticalAlign(ImageSpanAlignment.FOLLOW_PARAGRAPH)// 从API version 20开始，支持ImageSpanAlignment.FOLLOW_PARAGRAPH
14. Span("World")
15. }
16. .textVerticalAlign(TextVerticalAlign.CENTER)
17. .borderWidth(1)
18. }
19. .alignItems(HorizontalAlign.Center)
20. .width("100%")
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/qSakEUziQZ2J4tTrI5rp7Q/zh-cn_image_0000002568919038.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=6B695EC4CBC94F2FD79A42CEF9D8FAA93A83FE3A5A49BE10042D67542722FD60)

### 示例18（文本翻牌动效）

从API version 20开始，该示例通过[contentTransition](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#contenttransition20)属性展示了数字翻牌效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextNumberTransition {
5. @State number: number = 98;
6. @State numberTransition: NumericTextTransition =
7. new NumericTextTransition({ flipDirection: FlipDirection.DOWN, enableBlur: false });

9. build() {
10. Column() {
11. Text(this.number + "")
12. .borderWidth(1)
13. .fontSize(40)
14. .contentTransition(this.numberTransition)
15. Button("change number")
16. .onClick(() => {
17. this.number++;
18. })
19. .margin(10)
20. }
21. .justifyContent(FlexAlign.Center)
22. .height('100%')
23. .width('100%')
24. }
25. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ae/v3/BQAotgwbS6-3CvnJaPF-LQ/zh-cn_image_0000002599478583.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=C92015824984D4453DC8657B2EDC5A782D31EFC3EE9C4DE4C8CD7DA0A2F6F6C2)

### 示例19（文本内容区垂直对齐）

从API version 21开始，该示例通过[textContentAlign](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcontentalign21)属性展示了当文本内容区高度大于组件高度时文本内容区的垂直对齐。



```
1. @Entry
2. @Component
3. struct TextContentAlignExample {

5. build() {
6. Column() {
7. Row() {
8. Text('这是一段展示文字')
9. .fontSize(30)
10. .backgroundColor(Color.Gray)
11. .width('80%')
12. .height(20)
13. .textContentAlign(TextContentAlign.CENTER)
14. }.height('60%')
15. }
16. }
17. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3f/v3/kfOWRx3MTKGC1K-XfYWJYw/zh-cn_image_0000002568759392.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=174B51401139C11A20975E594CFC3B7CF5992FBF7C658A88B094807EAD5D6E34)

### 示例20（倍数行高和最大最小行高）

从API version 22开始，该示例通过[lineHeightMultiple](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheightmultiple22)属性展示了使用倍数模式设置行高，同时通过[minLineHeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minlineheight22)和[maxLineHeight](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlineheight22)来设置最小和最大行高值。



```
1. import { LengthUnit } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct Index {
6. @State message: string = 'hello';

8. build() {
9. Scroll() {
10. Column() {
11. Row() {
12. Text(this.message)
13. .lineHeight(176)
14. .backgroundColor(0xffc0c0c0)
15. .fontSize(50)
16. Text(this.message)
17. .lineHeightMultiple(3)
18. .backgroundColor(0xffc0c0c0)
19. .fontSize(50)
20. Text(this.message)
21. .lineHeight(300)
22. .maxLineHeight({value:176,unit:LengthUnit.FP})
23. .backgroundColor(0xffc0c0c0)
24. .fontSize(50)
25. Text(this.message)
26. .lineHeight(10)
27. .minLineHeight({value:176,unit:LengthUnit.FP})
28. .backgroundColor(0xffc0c0c0)
29. .fontSize(50)
30. }
31. }
32. }.height('100%')
33. .width('100%')
34. }
35. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/zPPG0OqMQJW_LuuBbEK2Lw/zh-cn_image_0000002599358635.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=CF26FE0D336A1E1C760B0C6411E1888DFF8282EF69F76758F27141B251F8BA67)

### 示例21（文本设置显示最小行数）

从API version 22开始，该示例使用[minLines](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minlines22)属性设置文本显示的最小行数。



```
1. @Entry
2. @Component
3. struct TextExample1 {
4. @State message1: string = 'Hello world!';
5. @State message2: string = 'The minimum number of lines displayed for this text setting is 1';

7. build() {
8. Column() {
9. Text(this.message1)
10. .minLines(3)
11. .fontSize(20)
12. .margin(10)
13. .width('95%')
14. .border({ width: 1 })
15. Text(this.message2)
16. .minLines(1)
17. .fontSize(20)
18. .margin(10)
19. .width('95%')
20. .border({ width: 1 })
21. }.height(100).width('90%').margin(10)
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/4SheVwtNRPGeEazZgYzAHQ/zh-cn_image_0000002568919040.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=8426832D869B9CF3C4DE55B80694B3E60938FEF58BFEE6C8D3328C87FEFC1B39)

### 示例22（设置文本选择区域并高亮显示）

从API version 23开始，该示例使用[TextController](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcontroller11)中的[setTextSelection](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#settextselection23)设置文本选择区域并高亮显示。



```
1. @Entry
2. @Component
3. struct Index {
4. controller: TextController = new TextController();
5. @State textStr: string = 'Hello World! 你好，世界！';

7. build() {
8. Scroll() {
9. Column() {
10. Text(this.textStr, { controller: this.controller })
11. .fontSize(25)
12. .borderWidth(1)
13. .copyOption(CopyOptions.LocalDevice)
14. Button("setTextSelection")
15. .onClick(() => {
16. this.controller.setTextSelection(1, 6, { menuPolicy: MenuPolicy.HIDE })
17. })
18. .margin({ bottom: 20, top: 10 } as Margin)
19. }
20. .margin({ top: 100, left: 8, right: 8 } as Margin)
21. }
22. }
23. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/autNwI1DTpGcS0hQIJQDrg/zh-cn_image_0000002599478585.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=90E47CF1F740D1F46CDC8B61C3473698EE320ACEC2CC667A2821FE29583B6A6A)

### 示例23（设置行首标点压缩）

该示例通过[compressLeadingPunctuation](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#compressleadingpunctuation23)接口设置行首标点压缩，左侧有间距的标点符号位于行首时，标点会直接压缩间距至左侧边界。

从API version 23开始，支持compressLeadingPunctuation接口。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct Index {
5. build() {
6. Column(){
7. Text("\u300C行首标点压缩打开")
8. .compressLeadingPunctuation(true)
9. .margin(5)
10. .border({ width: 1 })
11. .fontSize(30)
12. .width("90%")
13. Text("\u300C行首标点压缩关闭")
14. .compressLeadingPunctuation(false)
15. .border({ width: 1 })
16. .fontSize(30)
17. .width("90%")
18. }
19. }
20. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/TI5PhWV6SXaAJP3SMnvAZg/zh-cn_image_0000002568759394.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=60EB0C1BB561E22E4BE409A8FB87448A05152E4C07AAB819ED7F12B7085EA952)

### 示例24（设置自适应间距）

该示例通过[includeFontPadding](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#includefontpadding23)接口增加首行尾行间距和[fallbackLineSpacing](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fallbacklinespacing23)接口设置自适应行间距。

从API version 23开始，新增[includeFontPadding](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#includefontpadding23)和[fallbackLineSpacing](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fallbacklinespacing23)接口。



```
1. // xxx.ets

3. const UYGHUR_TEXT: string = 'ياخشىمۇسەنياخشىمۇسەنياخشىمۇسەنياخشىمۇسەنياخشىمۇسەنياخشىمۇسەنياخشىمۇسەن';
4. @Entry
5. @Component
6. struct Index {
7. @State include: boolean | null | undefined = false;
8. @State fallback: boolean | null | undefined = false;
9. @State displayText: string = UYGHUR_TEXT;

11. build() {
12. Column() {
13. Text(this.displayText)
14. .includeFontPadding(this.include)
15. .fallbackLineSpacing(this.fallback)
16. .lineHeight(5)
17. .width('100%')
18. .height(100)
19. .backgroundColor('#eee')
20. .borderWidth(1)
21. .borderColor('#dddddd')

23. Scroll() {
24. Column() {
25. // --- IncludeFontPadding相关按钮 ---
26. Button('设置includePadding: ' + this.include)
27. .onClick(() => {
28. this.include = this.include === false ? true : false;
29. })
30. .margin({ bottom: 10 })

32. // --- FallbackLineSpacing相关按钮 ---
33. Button('设置fallbackLineSpacing: ' + this.fallback)
34. .onClick(() => {
35. this.fallback = this.fallback === false ? true : false;
36. })
37. .margin({ bottom: 10 })

39. }
40. .width('100%')
41. .padding(5)
42. }
43. .height(250)
44. .backgroundColor('transparent')
45. .scrollBarWidth(2)
46. .scrollBarColor('#888')

48. }
49. .width('100%')
50. .height('100%')
51. .padding(20)
52. }
53. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e8/v3/fu54I7NHRsKz2w9SLRVguA/zh-cn_image_0000002599358637.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=303B262FC5E21A41F2BB3627A5A4D70E931A40A1C5AF4684694C6D11D23EB53E)

### 示例25（设置文本拖拽时的背板样式）

该示例通过[selectedDragPreviewStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selecteddragpreviewstyle23)接口设置文本拖拽时的背板样式。

从API version 23开始，新增selectedDragPreviewStyle接口。



```
1. @Entry
2. @Component
3. struct TextTest {
4. build() {
5. Column() {
6. Text('This is drag text')
7. .copyOption(CopyOptions.InApp)
8. .width(200)
9. .height(100)
10. .margin(150)
11. .draggable(true)
12. .selectedDragPreviewStyle({color: 'rgba(227, 248, 249, 1)'})
13. }
14. .height('100%')
15. }
16. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/4zfl484mQ22CCEGTtSRDXg/zh-cn_image_0000002568919042.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=64F2B6338FA55D814854763CEE354D119A96061E312870715E073A68FC92F285)

### 示例26（设置文本排版方向）

该示例通过[textDirection](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textdirection23)接口设置文本排版方向。

从API version 23开始，新增textDirection接口。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct TextExample {
5. @State text: string = 'Text文本排版方向示例';

7. build() {
8. Column({ space: 3 }) {
9. Text('Text文本排版方向DEFAULT')
10. .fontSize(12).width('90%').margin(5)
11. Text(this.text)
12. .width('95%')
13. .borderWidth(1)
14. Text('Text文本排版方向RTL')
15. .fontSize(12).width('90%').margin(5)
16. Text(this.text)
17. .width('95%')
18. .borderWidth(1)
19. .textDirection(TextDirection.RTL)
20. Text('Text文本排版方向RTL，文本水平方向对齐方式LEFT')
21. .fontSize(12).width('90%').margin(5)
22. Text(this.text)
23. .width('95%')
24. .borderWidth(1)
25. .textDirection(TextDirection.RTL)
26. .textAlign(TextAlign.LEFT)
27. }
28. .width('100%')
29. .height('100%')
30. }
31. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/ECK6AdrrQoyAzHq0gJnCUw/zh-cn_image_0000002599478587.png?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=49EBD8F1718596F8C658629099EBE8D860391C817EFB5A4EC6F3FE493A15EA89)

### 示例27（获取指定坐标和范围对应的文本信息）

从API version 24开始，支持[getCharacterPositionAtCoordinate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getcharacterpositionatcoordinate24)，[getGlyphRangeForCharacterRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getglyphrangeforcharacterrange24)，[getCharacterRangeForGlyphRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getcharacterrangeforglyphrange24)接口。该示例通过[getLayoutManager](/consumer/cn/doc/harmonyos-references/ts-basic-components-text#getlayoutmanager12)接口调用文本的布局管理对象获取文本信息，通过[LayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#layoutmanager12)中的[getCharacterPositionAtCoordinate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getcharacterpositionatcoordinate24)获取坐标字符的位置信息，通过[getGlyphRangeForCharacterRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getglyphrangeforcharacterrange24)根据字符索引范围获取字形索引范围和实际的字符索引范围，通过[getCharacterRangeForGlyphRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#getcharacterrangeforglyphrange24)根据字形索引范围获取字符索引范围和实际的字形索引范围。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct TextExample10 {
7. @State start: number = 10;
8. @State end: number = 20;
9. textController: TextController = new TextController();
10. textStr: string = "Hello World! 您好，世界!";
11. @State str1: string = ""
12. @State str2: string = ""
13. @State str3: string = ""
14. @State str4: string = ""
15. textStyleAttrs: TextStyle =
16. new TextStyle({ fontWeight: FontWeight.Bolder, fontSize: LengthMetrics.vp(24), fontStyle: FontStyle.Italic });
17. titleParagraphStyleAttr: ParagraphStyle =
18. new ParagraphStyle({ paragraphSpacing: LengthMetrics.px(50), textIndent: LengthMetrics.vp(15) });
19. mutableStyledString: MutableStyledString =
20. new MutableStyledString("属性字符串TextStyle测试\n属性字符串测试\n属性字符串TextStyle测试");

22. build() {
23. Column() {
24. Text(this.textStr, { controller: this.textController }) {
25. Span("Hello World 123 \n")
26. Span("Hello World 456 \n")
27. Span("Hello World 789 \n")
28. }
29. .fontSize(25)
30. .borderWidth(1)

32. Text(this.str1)
33. Text(this.str2)
34. Text(this.str3)
35. Text(this.str4)

37. Button("点击可增加属性字符串").onClick(() => {
38. this.textController.setStyledString(this.mutableStyledString)
39. })

41. Button("相对组件坐标[150,50]字形信息")
42. .onClick(() => {
43. let layoutManager: LayoutManager = this.textController.getLayoutManager();
44. let position1: PositionWithAffinity = layoutManager.getGlyphPositionAtCoordinate(150, 50);
45. this.str1 = "相对组件坐标[150,50] glyphPosition position: " + position1.position +
46. " affinity: " +
47. position1.affinity;

49. let position2: PositionWithAffinity =
50. layoutManager.getCharacterPositionAtCoordinate(150, 50) as PositionWithAffinity;
51. this.str2 = "相对组件坐标[150,50] characterPosition position: " + position2.position +
52. " affinity: " +
53. position2.affinity;

55. let range1: TextRange = { start: this.start, end: this.end };
56. let ranges1: Array<TextRange> = layoutManager.getGlyphRangeForCharacterRange(range1) as Array<TextRange>
57. this.str3 = "getGlyphRangeForCharacterRange 字形数 " + ranges1[0].start + " " + ranges1[0].end + "\n" +
58. "getGlyphRangeForCharacterRange 实际字符数 " + ranges1[1].start + " " + ranges1[1].end

60. let range2: TextRange = { start: this.start, end: this.end };
61. let ranges2: Array<TextRange> = layoutManager.getCharacterRangeForGlyphRange(range2) as Array<TextRange>
62. this.str4 = "getCharacterRangeForGlyphRange 字符数 " + ranges2[0].start + " " + ranges2[0].end + "\n" +
63. "getCharacterRangeForGlyphRange 实际字形数 " + ranges2[1].start + " " + ranges2[1].end
64. })
65. .margin({ bottom: 20, top: 10 })
66. }.justifyContent(FlexAlign.Center).width("100%").height("100%")
67. }
68. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e9/v3/FYgpp0cgQTaolEmPrVohHg/zh-cn_image_0000002568759396.gif?HW-CC-KV=V1&HW-CC-Date=20260511T035053Z&HW-CC-Expire=86400&HW-CC-Sign=5D99B72367AEE70F98CC09ECFF4FB373C967B702972F2B548D819BDB504B178C)