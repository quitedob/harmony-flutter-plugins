方便灵活应用文本样式的对象，可通过[TextController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcontroller11)中的[setStyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#setstyledstring12)方法与Text组件绑定，可通过[RichEditorStyledStringController](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#richeditorstyledstringcontroller12)中的[setStyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#setstyledstring12)方法与[RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor)组件绑定。

说明

从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

从API version 20开始，支持通过[getParagraphs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-measureutils#getparagraphs20)获取属性字符串的文本布局信息。

属性字符串目前不支持在worker线程中使用。

属性字符串通过controller绑定时，需要等待布局完成后，绑定生效。当[measure](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#measure12)和setStyledString同时使用，开发者需要通过[@ohos.arkui.inspector (布局回调)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-inspector)判断布局完成，再绑定属性字符串。

## 规则说明

PhonePC/2in1TabletTVWearable

* 当组件样式和属性字符串中的样式冲突时，冲突部分以属性字符串设置的样式为准，未冲突部分则生效组件的样式。
* 当属性字符串和[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)子组件冲突时，属性字符串优先级高，即当Text组件中绑定了属性字符串，忽略Text组件下包含[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)等子组件的情况。
* 不支持[@State](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state)修饰。
* 建议将StyledString定义为成员变量，从而避免应用退后台后被销毁。
* 不支持在[loadContent()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#loadcontent9)之前创建。

## StyledString

PhonePC/2in1TabletTVWearable

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: string | ImageAttachment | CustomSpan, styles?: Array<StyleOptions>)

属性字符串的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | [ImageAttachment](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachment) | [CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan) | 是 | 属性字符串文本内容。  **说明：**  当value的类型为ImageAttachment或CustomSpan时，styles参数不生效。  需要设置styles时，通过[setStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#setstyle)等方法实现。 |
| styles | Array<[StyleOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styleoptions对象说明)> | 否 | 属性字符串初始化选项。  **说明：**  start为异常值时，按默认值0处理；  当length为异常值时，length等于属性字符串在start后的实际长度；  当StyledStringKey与StyledStringValue不匹配时，styles不生效。 |

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| length | number | 是 | 否 | 属性字符串字符的长度。  **说明：**  属性字符串中的ImageAttachment和CustomSpan长度都计为1。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |

### getString

PhonePC/2in1TabletTVWearable

getString(): string

获取字符串信息。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 属性字符串文本内容。  **说明：**  当属性字符串中包含图片或[CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)时，其返回的结果用空格表示。 |

### equals

PhonePC/2in1TabletTVWearable

equals(other: StyledString): boolean

判断两个属性字符串是否相等。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| other | [StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 是 | StyledString类型的比较对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 两个属性字符串是否相等。  true表示相等，false表示不相等。  **说明：**  当属性字符串的文本及样式均一致，视为相等。  不比较[GestureStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#gesturestyle)，当属性字符串配置了不同事件，文本和其他样式相同时，亦视为相等。  当比较[CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)或[LeadingMarginSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#leadingmarginspan22)时，比较的是地址，地址相等，视为相等。 |

### subStyledString

PhonePC/2in1TabletTVWearable

subStyledString(start: number, length?: number): StyledString

获取属性字符串的子属性字符串。不能超出属性字符串的长度。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 子属性字符串开始位置的下标。 |
| length | number | 否 | 子属性字符串的长度。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 子属性字符串。  **说明：**  当start为合法入参时，length的默认值是被查询属性字符串对象的长度与start的值的差。  当start和length越界或者必填传入undefined时，会抛出异常。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### getStyles

PhonePC/2in1TabletTVWearable

getStyles(start: number, length: number, styledKey?: StyledStringKey): Array<SpanStyle>

获取指定范围属性字符串的样式集合。不能超出属性字符串的长度。

该接口仅返回开发者设置的样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围属性字符串的下标。 |
| length | number | 是 | 指定范围属性字符串的长度。 |
| styledKey | [StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明) | 否 | 指定范围属性字符串样式的枚举值。  **说明：**  当不传入该参数时默认获取开发者设置的[StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明)所有枚举值样式。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<[SpanStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#spanstyle对象说明)> | 各样式对象的数组。  **说明：**  当指定范围属性字符串未设置任何样式，则返回空数组。  当start和length越界或者必填传入undefined时，会抛出异常；  当styledKey传入异常值或undefined时，会抛出异常。  当styledKey为CustomSpan时，返回的是创建CustomSpan时传入的样式对象，即修改该样式对象也会影响实际的显示效果。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### fromHtml

PhonePC/2in1TabletTVWearable

static fromHtml(html: string): Promise<StyledString>

将HTML格式字符串转换成属性字符串，当前支持转换的HTML标签范围：<p>、<span>、<img>、<br>、<strong>、<b>、<a>、<i>、<em>、<s>、<u>、<del>、<sup>、<sub>。支持将标签中的style属性样式转换成对应的属性字符串样式。

使用方法参考[示例12（fromHtml和toHtml互相转换）](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#示例12fromhtml和tohtml互相转换)。

展开

| 标签名称 | 说明 |
| --- | --- |
| <p> | 段落，分隔文本段落 |
| <span> | 行内文本，支持样式设置。API version 17及之前，<span>设置的background-color属性转换不生效。 |
| <img> | 插入图片 |
| <strong> | 加粗文本 |
| <br>20+ | 换行 |
| <b>20+ | 加粗文本 |
| <a>20+ | 超链接 |
| <i>20+ | 斜体文本 |
| <em>20+ | 斜体文本 |
| <s>20+ | 删除线（中划线） |
| <u>20+ | 下划线 |
| <del>20+ | 删除线（中划线） |
| <sup>20+ | 上标文本 |
| <sub>20+ | 下标文本 |

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| html | string | 是 | html格式的字符串。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring)> | 属性字符串。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[属性字符串错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-styled-string)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |
| 170001 | Convert Error. |

### toHtml14+

PhonePC/2in1TabletTVWearable

static toHtml(styledString: StyledString): string

将属性字符串转换成HTML格式字符串。支持转换的属性字符串[StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明)包括：StyledStringKey.FONT、StyledStringKey.DECORATION、StyledStringKey.LETTER\_SPACING、StyledStringKey.TEXT\_SHADOW、StyledStringKey.LINE\_HEIGHT、StyledStringKey.IMAGE。

使用方法参考[示例12（fromHtml和toHtml互相转换）](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#示例12fromhtml和tohtml互相转换)。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| styledString | StyledString | 是 | 属性字符串。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | HTML格式字符串。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

## MutableStyledString

PhonePC/2in1TabletTVWearable

继承于[StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring)类。

说明

当start和length越界或者必填传入undefined时，会抛出异常；

当styledKey和styledValue传入异常值或者两者对应关系不匹配时，会抛出异常。

### replaceString

PhonePC/2in1TabletTVWearable

replaceString(start: number , length: number , other: string): void

替换指定范围的字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围的下标。 |
| length | number | 是 | 指定范围的长度。 |
| other | string | 是 | 替换的新文本内容。  **说明：**  替换的字符串使用的是start位置字符的样式。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### insertString

PhonePC/2in1TabletTVWearable

insertString(start: number , other: string): void

插入字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 插入位置的下标。 |
| other | string | 是 | 插入的新文本内容。  **说明：**  插入的字符串使用的是start-1位置字符的样式。若start-1位置字符未设置样式，则使用start位置字符样式。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### removeString

PhonePC/2in1TabletTVWearable

removeString(start: number , length: number): void

移除指定范围的字符串。

当属性字符串中包含图片或[CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)时，同样生效。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围的下标。 |
| length | number | 是 | 指定范围的长度。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### replaceStyle

PhonePC/2in1TabletTVWearable

replaceStyle(spanStyle: SpanStyle): void

替换指定范围内容为指定类型新样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| spanStyle | [SpanStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#spanstyle对象说明) | 是 | 样式对象。  **说明：**  默认清空原有样式，替换为新样式。  当SpanStyle的styledKey为IMAGE或CUSTOM\_SPAN时，只有当start的位置当前是image或CustomSpan且长度为1，才会生效，其余情况无效果。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### setStyle

PhonePC/2in1TabletTVWearable

setStyle(spanStyle: SpanStyle): void

为指定范围内容设置指定类型新样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| spanStyle | [SpanStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#spanstyle对象说明) | 是 | 样式对象。  默认不清空原有样式，叠加新样式。如果StyledStringValue类型相同，则新样式将覆盖旧样式。  当SpanStyle的styledKey为IMAGE或CUSTOM\_SPAN时，只有当start的位置当前是image或CustomSpan且长度为1，才会生效，其余情况无效果。 |

说明

样式的最小颗粒度是StyledStringValue，如果设置了多个相同的StyledStringValue，只有最后一次设置会生效。如设置两个属性不同的TextStyle，则只有第二次设置的TextStyle生效。

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |

### removeStyle

PhonePC/2in1TabletTVWearable

removeStyle(start: number , length: number , styledKey: StyledStringKey): void

清除指定范围内容的指定类型样式。

被清空样式类型对象属性使用的是对应[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)组件属性的设置值，若Text组件未设置值，则使用对应Text组件属性的默认值。

当属性字符串中包含图片时，同样生效。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围开始位置的下标。 |
| length | number | 是 | 指定范围的长度。 |
| styledKey | [StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明) | 是 | 样式类型枚举值。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### removeStyles

PhonePC/2in1TabletTVWearable

removeStyles(start: number , length: number): void

清除指定范围内容的所有样式。

被清空样式类型对象属性使用的是对应[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)组件属性的设置值，若Text组件未设置值，则使用对应Text组件属性的默认值。

当属性字符串中包含图片时，同样生效。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围开始位置的下标。 |
| length | number | 是 | 指定范围的长度。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### clearStyles

PhonePC/2in1TabletTVWearable

clearStyles(): void

清除属性字符串对象的所有样式。

被清空样式类型对象属性使用的是对应[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)组件属性的设置值，若Text组件未设置值，则使用对应Text组件属性的默认值。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### replaceStyledString

PhonePC/2in1TabletTVWearable

replaceStyledString(start: number , length: number , other: StyledString): void

替换指定范围为新的属性字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 指定范围开始位置的下标。 |
| length | number | 是 | 指定范围的长度。 |
| other | [StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 是 | 新的属性字符串对象。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### insertStyledString

PhonePC/2in1TabletTVWearable

insertStyledString(start: number , other: StyledString): void

在指定位置插入新的属性字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| start | number | 是 | 开始插入位置的下标。 |
| other | [StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 是 | 新的属性字符串对象。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2.Incorrect parameters types; 3. Parameter verification failed. |

### appendStyledString

PhonePC/2in1TabletTVWearable

appendStyledString(other: StyledString): void

在末尾位置追加新的属性字符串。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| other | [StyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstring) | 是 | 新的属性字符串对象。 |

## StyledStringValue

PhonePC/2in1TabletTVWearable

type StyledStringValue = TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle |

TextShadowStyle | GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | UrlStyle | CustomSpan | UserDataSpan | BackgroundColorStyle

样式对象类型，用于设置属性字符串的样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [TextStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyle) | 文本字体样式。 |
| [DecorationStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyle) | 文本装饰线样式。 |
| [BaselineOffsetStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#baselineoffsetstyle) | 文本基线偏移量样式。 |
| [LetterSpacingStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#letterspacingstyle) | 文本字符间距样式。 |
| [LineHeightStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#lineheightstyle) | 文本行高样式。 |
| [TextShadowStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textshadowstyle) | 文本阴影样式。 |
| [GestureStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#gesturestyle) | 事件手势样式。 |
| [ParagraphStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#paragraphstyle) | 文本段落样式。 |
| [ImageAttachment](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachment) | 图片样式。 |
| [CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan) | 自定义绘制Span样式。 |
| [UserDataSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#userdataspan) | UserDataSpan样式。 |
| [UrlStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#urlstyle14) | 超链接样式。 |
| [BackgroundColorStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#backgroundcolorstyle14) | 文本背景颜色样式。 |

## StyleOptions对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| start | number | 否 | 是 | 设置属性字符串样式的开始位置。  当start的值小于0或超出字符串长度时，按0处理。 |
| length | number | 否 | 是 | 设置属性字符串样式的长度。  当length的值小于0或超出字符串长度与start的差值时，按字符串长度与start的差值处理。 |
| styledKey | [StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明) | 否 | 否 | 样式类型的枚举值。 |
| styledValue | [StyledStringValue](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringvalue) | 否 | 否 | 样式对象。 |

## SpanStyle对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| start | number | 否 | 否 | 匹配属性字符串样式的开始位置。 |
| length | number | 否 | 否 | 匹配属性字符串样式的长度。 |
| styledKey | [StyledStringKey](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringkey枚举说明) | 否 | 否 | 样式类型的枚举值。 |
| styledValue | [StyledStringValue](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styledstringvalue) | 否 | 否 | 样式对象。 |

## TextStyle

PhonePC/2in1TabletTVWearable

文本字体样式对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| fontColor | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 是 | 获取属性字符串的文本颜色。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontFamily | string | 是 | 是 | 获取属性字符串的文本字体。  默认返回undefined。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontSize | number | 是 | 是 | 获取属性字符串的文本字体大小。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontWeight | number | 是 | 是 | 获取属性字符串的文本字体粗细。  **说明：**  实际返回是字符串，具体返回值和设置值关系参见下方表格。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontStyle | [FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) | 是 | 是 | 获取属性字符串的文本字体样式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontConfigs24+ | [FontConfigs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontconfigs24对象说明) | 是 | 是 | 获取属性字符串的字体配置。  默认返回undefined，表示未设置fontConfigs。  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。  **模型约束：** 此接口仅可在Stage模型下使用。 |
| strokeWidth20+ | number | 是 | 是 | 获取属性字符串的文本描边宽度。  默认返回0，单位为[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| strokeColor20+ | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 是 | 获取属性字符串的文本描边颜色。  默认返回字体颜色。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| superscript20+ | [SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#superscriptstyle20枚举说明) | 是 | 是 | 获取属性字符串的文本上下角标。  默认值：SuperscriptStyle.NORMAL。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

fontWeight参数与返回值的关系如下：

展开

| 参数 | 返回值 |
| --- | --- |
| 100 | '0' |
| 200 | '1' |
| 300 | '2' |
| 400 | '3' |
| 500 | '4' |
| 600 | '5' |
| 700 | '6' |
| 800 | '7' |
| 900 | '8' |
| FontWeight.Bold或'bold' | '9' |
| FontWeight.Normal或'normal' | '10' |
| FontWeight.Bolder或'bolder' | '11' |
| FontWeight.Lighter或'lighter' | '12' |
| FontWeight.Medium或'medium' | '13' |
| FontWeight.Regular或'regular' | '14' |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value?: TextStyleInterface)

文本字体样式的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [TextStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyleinterface对象说明) | 否 | 字体样式设置项。 |

## TextStyleInterface对象说明

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| fontColor | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 字体颜色。  默认为主题色。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontFamily | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 文本字体。  默认为主题字体。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontSize | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 字体大小。  默认字体大小为16fp。  如果LengthMetrics的unit值是percent，当前设置不生效，处理为16fp。  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontWeight | number| [FontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight) | string | 否 | 是 | 字体粗细。  number类型取值[100, 900]，取值间隔为100，默认为400，取值越大，字体越粗。string类型仅支持number类型取值的字符串形式，例如"400"，以及"bold"、"bolder"、"lighter"、"regular"、"medium"，分别对应FontWeight中相应的枚举值。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontStyle | [FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) | 否 | 是 | 字体样式。  默认值：FontStyle.Normal  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| fontConfigs24+ | [FontConfigs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontconfigs24对象说明) | 否 | 是 | 字体配置。默认值继承[FontConfigs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontconfigs24对象说明)。  **元服务API：** 从API version 24开始，该接口支持在元服务中使用。  **模型约束：** 此接口仅可在Stage模型下使用。 |
| strokeWidth20+ | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 文本描边宽度。如果LengthMetrics的unit值是percent，当前设置不生效，处理为0。  设置值小于0时为实心字，大于0时为空心字。  默认值为0。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| strokeColor20+ | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 文本描边颜色。  默认值为字体颜色，设置异常值时取字体颜色。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| superscript20+ | [SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#superscriptstyle20枚举说明) | 否 | 是 | 文本上下角标。  默认值：SuperscriptStyle.NORMAL  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

## GestureStyle

PhonePC/2in1TabletTVWearable

事件手势对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### constructor

PhonePC/2in1TabletTVWearable

constructor(value?: GestureStyleInterface)

事件手势的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [GestureStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#gesturestyleinterface对象说明) | 否 | 事件设置项。 |

## GestureStyleInterface对象说明

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| onClick | Callback<[ClickEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#clickevent)> | 否 | 是 | 设置点击事件。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onLongPress | Callback<[GestureEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-common#gestureevent对象说明)> | 否 | 是 | 设置长按事件。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| onTouch20+ | Callback<[TouchEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#touchevent对象说明)> | 否 | 是 | 设置触摸事件。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

## DecorationOptions20+

PhonePC/2in1TabletTVWearable

文本装饰线样式的额外配置选项对象说明。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| enableMultiType | boolean | 否 | 是 | 是否开启多装饰线显示。  默认值：undefined。设置为true开启，设置为false/undefined关闭。  所有需要显示的装饰线都必须启用此选项，在这些装饰线的交集区域显示多装饰线效果，样式、颜色和粗细将采用最后设置的装饰线的效果。 |

## DecorationStyle

PhonePC/2in1TabletTVWearable

文本装饰线样式对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| type | [TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textdecorationtype) | 是 | 否 | 获取属性字符串的文本装饰线类型。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| color | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 是 | 是 | 获取属性字符串的文本装饰线颜色。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| style | [TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textdecorationstyle12) | 是 | 是 | 获取属性字符串的文本装饰线样式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| thicknessScale20+ | number | 是 | 是 | 获取属性字符串的文本装饰线粗细缩放值。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| options20+ | [DecorationOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationoptions20) | 是 | 是 | 获取属性字符串的文本装饰线样式的额外配置选项。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: DecorationStyleInterface)

文本装饰线样式的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [DecorationStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyleinterface) | 是 | 文本装饰线设置项。  默认值：  {  type: TextDecorationType.None,  color: Color.Black,  style: TextDecorationStyle.SOLID  } |

### constructor20+

PhonePC/2in1TabletTVWearable

constructor(value: DecorationStyleInterface, options?: DecorationOptions)

文本装饰线样式的构造函数，包含额外配置选项。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [DecorationStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyleinterface) | 是 | 文本装饰线设置项。  默认值：  {  type: TextDecorationType.None,  color: Color.Black,  style: TextDecorationStyle.SOLID,  thicknessScale: 1.0  } |
| options | [DecorationOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationoptions20) | 否 | 文本装饰线额外配置选项。  默认值：  {  enableMultiType: undefined  } |

## DecorationStyleInterface

PhonePC/2in1TabletTVWearable

文本装饰线样式接口对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| type | [TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textdecorationtype) | 否 | 否 | 装饰线类型。  默认值：TextDecorationType.None  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| color | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 装饰线颜色。  默认值：Color.Black  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| style | [TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textdecorationstyle12) | 否 | 是 | 装饰线样式。  默认值：TextDecorationStyle.SOLID  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| thicknessScale20+ | number | 否 | 是 | 装饰线粗细缩放。  默认值：1.0  取值范围：[0, +∞)  **说明：** 负值按默认值处理。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |

说明

当文字的下边缘轮廓与装饰线位置相交时，会触发下划线避让规则，下划线将在这些字符处避让文字。常见“gjyqp”等英文字符。

当文本装饰线的颜色设置为Color.Transparent时，装饰线颜色设置为跟随每行第一个字的字体颜色。当文本装饰线的颜色设置为透明色16进制对应值“#00FFFFFF”时，装饰线颜色设置为透明色。

## BaselineOffsetStyle

PhonePC/2in1TabletTVWearable

文本基线偏移量对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| baselineOffset | number | 是 | 否 | 获取属性字符串的文本基线偏移量。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: LengthMetrics)

文本基线偏移的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 是 | 文本基线偏移量设置项。如果LengthMetrics的unit值是percent，该设置不生效。 |

## LetterSpacingStyle

PhonePC/2in1TabletTVWearable

文本字符间距对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| letterSpacing | number | 是 | 否 | 获取属性字符串的文本字符间距。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: LengthMetrics)

文本字符间距的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 是 | 文本字符间距设置项。如果LengthMetrics的unit值是percent，该设置不生效。 |

## LineHeightStyle

PhonePC/2in1TabletTVWearable

文本行高对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| lineHeight | number | 是 | 否 | 获取属性字符串的文本行高。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

### constructor

PhonePC/2in1TabletTVWearable

constructor(lineHeight: LengthMetrics)

文本行高的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| lineHeight | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 是 | 文本行高设置项。如果LengthMetrics的value值不大于0时，不限制文本行高，自适应字体大小。 |

## TextShadowStyle

PhonePC/2in1TabletTVWearable

文本阴影对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| textShadow | Array<[ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明)> | 是 | 否 | 获取属性字符串的文本阴影。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: ShadowOptions | Array<ShadowOptions>)

文本阴影对象的构造函数。

ShadowOptions对象中不支持fill字段。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明) | Array<[ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-image-effect#shadowoptions对象说明)> | 是 | 文本阴影设置项。 |

## ImageAttachment

PhonePC/2in1TabletTVWearable

图片对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| value | [PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap) | 是 | 否 | 获取属性字符串的图片数据源。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| size | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 是 | 是 | 获取属性字符串的图片尺寸。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。  返回number类型值的单位为px。 |
| sizeInVp21+ | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 是 | 是 | 获取属性字符串的图片尺寸。  **元服务API：** 从API version 21开始，该接口支持在元服务中使用。  返回number类型值的单位为vp。  当ImageAttachment尺寸设置为负数值或undefined时，返回为undefined。 |
| verticalAlign | [ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagespanalignment10) | 是 | 是 | 获取属性字符串的图片对齐方式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| objectFit | [ImageFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagefit) | 是 | 是 | 获取属性字符串的图片缩放类型。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| layoutStyle | [ImageAttachmentLayoutStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentlayoutstyle对象说明) | 是 | 是 | 获取属性字符串的图片布局。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| colorFilter15+ | [ColorFilterType](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#colorfiltertype15) | 是 | 是 | 获取属性字符串的图片颜色滤镜效果。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| supportSvg222+ | boolean | 是 | 是 | 获取属性字符串是否开启[SVG标签解析能力增强功能](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-image-svg2-capabilities)。  true：支持SVG解析新能力；false：保持原有SVG解析能力。  默认值：false  **元服务API：** 从API version 22开始，该接口支持在元服务中使用。 |

### constructor

PhonePC/2in1TabletTVWearable

constructor(value: ImageAttachmentInterface)

图片对象的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ImageAttachmentInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentinterface对象说明) | 是 | 图片设置项。 |

### constructor15+

PhonePC/2in1TabletTVWearable

constructor(attachment: Optional<AttachmentType>)

图片对象的构造函数。与value类型入参构造函数相比，attachment参数增加了对undefined类型和[ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr)类型图片的支持。

**元服务API：** 从API version 15开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| attachment | Optional<[AttachmentType](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#attachmenttype15)> | 是 | PixelMap类型或[ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr)类型图片设置项。 |

## AttachmentType15+

PhonePC/2in1TabletTVWearable

type AttachmentType = ImageAttachmentInterface | ResourceImageAttachmentOptions

图片设置项类型，用于设置属性字符串PixelMap类型或[ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr)类型图片。

**元服务API：** 从API version 15开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [ImageAttachmentInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentinterface对象说明) | PixelMap类型图片设置项。 |
| [ResourceImageAttachmentOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#resourceimageattachmentoptions15) | ResourceStr类型图片设置项。 |

## ColorFilterType15+

PhonePC/2in1TabletTVWearable

type ColorFilterType = ColorFilter | DrawingColorFilter

图片颜色滤镜设置项类型。

**元服务API：** 从API version 15开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#colorfilter9) | ColorFilter类型图片颜色滤镜设置项。 |
| [DrawingColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-image#drawingcolorfilter12) | DrawingColorFilter类型图片颜色滤镜设置项。 |

## ImageAttachmentInterface对象说明

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| value | [PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap) | 否 | 否 | 设置图片数据源。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| size | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 否 | 是 | 设置图片大小，不支持百分比。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。  size的默认值与objectFit的值有关，不同的objectFit的值对应size的默认值不同。比如当objectFit的值为Cover时，图片高度为组件高度减去组件上下的内边距，图片宽度为组件宽度减去组件左右的内边距。 |
| verticalAlign | [ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagespanalignment10) | 否 | 是 | 设置图片基于文本的对齐方式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。  默认值：ImageSpanAlignment.BOTTOM |
| objectFit | [ImageFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagefit) | 否 | 是 | 设置图片的缩放类型，当前枚举类型不支持ImageFit.MATRIX。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。  默认值：ImageFit.Cover |
| layoutStyle | [ImageAttachmentLayoutStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentlayoutstyle对象说明) | 否 | 是 | 设置图片布局。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| colorFilter15+ | [ColorFilterType](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#colorfiltertype15) | 否 | 是 | 设置属性字符串的图片颜色滤镜效果。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |

## ImageAttachmentLayoutStyle对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| margin | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | [Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#margin) | 否 | 是 | 设置图片外边距。  默认值：0  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| padding | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | [Padding](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#padding) | 否 | 是 | 设置图片内边距。  默认值：0  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| borderRadius | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | [BorderRadiuses](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#borderradiuses9) | 否 | 是 | 设置圆角。  默认值：0  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

## ResourceImageAttachmentOptions15+

PhonePC/2in1TabletTVWearable

ResourceStr类型图片设置项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| resourceValue | Optional<[ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr)> | 否 | 否 | 设置图片数据源。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| size | [SizeOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#sizeoptions) | 否 | 是 | 设置图片大小。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| verticalAlign | [ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagespanalignment10) | 否 | 是 | 设置图片基于文本的对齐方式。  默认值：ImageSpanAlignment.BOTTOM  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| objectFit | [ImageFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#imagefit) | 否 | 是 | 设置图片的缩放类型，当前枚举类型不支持ImageFit.MATRIX。  默认值：ImageFit.Cover  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| layoutStyle | [ImageAttachmentLayoutStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentlayoutstyle对象说明) | 否 | 是 | 设置图片布局。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| colorFilter | [ColorFilterType](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#colorfiltertype15) | 否 | 是 | 设置属性字符串的图片颜色滤镜效果。  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| syncLoad | boolean | 否 | 是 | 是否同步加载图片，默认是异步加载。同步加载时阻塞UI线程，不会显示占位图。  true：同步加载；false：异步加载。  默认值：false  **元服务API：** 从API version 15开始，该接口支持在元服务中使用。 |
| supportSvg222+ | boolean | 否 | 是 | 控制是否开启[SVG标签解析能力增强功能](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-image-svg2-capabilities)。  true：支持SVG解析新能力；false：保持原有SVG解析能力。  默认值：false  **元服务API：** 从API version 22开始，该接口支持在元服务中使用。 |

## CustomSpan

PhonePC/2in1TabletTVWearable

自定义绘制Span，仅提供基类，具体实现由开发者定义。

自定义绘制Span拖拽显示的缩略图为空白。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### onMeasure

PhonePC/2in1TabletTVWearable

abstract onMeasure(measureInfo: CustomSpanMeasureInfo): CustomSpanMetrics

获取自定义绘制Span的尺寸大小。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| measureInfo | [CustomSpanMeasureInfo](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspanmeasureinfo对象说明) | 是 | 文本的字体大小。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [CustomSpanMetrics](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspanmetrics对象说明) | 自定义绘制Span的尺寸信息。  **说明：**  最终的CustomSpan的高度是由当前Text组件的行高所决定的。当height不传值，则默认取Text组件的fontSize的值作为CustomSpan的高度；当height大于当前行的其他子组件的高度时，此时height即为Text组件的行高。 |

### onDraw

PhonePC/2in1TabletTVWearable

abstract onDraw(context: DrawContext, drawInfo: CustomSpanDrawInfo): void

绘制自定义绘制Span。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [DrawContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#drawcontext) | 是 | 图形绘制上下文。  **说明：**  DrawContext的canvas方法获取的画布是Text组件的画布，绘制时不会超出Text组件的范围。 |
| drawInfo | [CustomSpanDrawInfo](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspandrawinfo对象说明) | 是 | 自定义绘制Span的绘制信息。 |

### invalidate13+

PhonePC/2in1TabletTVWearable

invalidate(): void

主动刷新使用CustomSpan的Text组件。

**元服务API：** 从API version 13开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## CustomSpanMeasureInfo对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| fontSize | number | 否 | 否 | 设置文本字体大小。  单位：[fp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

## CustomSpanMetrics对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| width | number | 否 | 否 | 自定义绘制Span的宽。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| height | number | 否 | 是 | 自定义绘制Span的高。  单位：[vp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

## CustomSpanDrawInfo对象说明

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| x | number | 否 | 否 | 自定义绘制Span相对于挂载组件的偏移。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| lineTop | number | 否 | 否 | 自定义绘制Span相对于Text组件的上边距。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| lineBottom | number | 否 | 否 | 自定义绘制Span相对于Text组件的下边距。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |
| baseline | number | 否 | 否 | 自定义绘制Span的所在行的基线偏移量。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units) |

## ParagraphStyle

PhonePC/2in1TabletTVWearable

文本段落样式对象说明。

除首个段落外，后续段落按'\n'划分。

每个段落的段落样式按首个占位设置的段落样式生效，未设置时，段落按被绑定组件的段落样式生效。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| textAlign | [TextAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textalign) | 是 | 是 | 获取属性字符串文本段落在水平方向的对齐方式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| textIndent | number | 是 | 是 | 获取属性字符串文本段落的首行文本缩进。单位VP  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| maxLines | number | 是 | 是 | 获取属性字符串文本段落的最大行数。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| overflow | [TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textoverflow) | 是 | 是 | 获取属性字符串文本段落超长时的显示方式。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| wordBreak | [WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#wordbreak11) | 是 | 是 | 获取属性字符串文本段落的断行规则。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| leadingMargin | number | [LeadingMarginPlaceholder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#leadingmarginplaceholder11) | 是 | 是 | 获取属性字符串文本段落的缩进。  返回为number类型时，单位为vp。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| paragraphSpacing19+ | number | 是 | 是 | 获取属性字符串文本段落的段落间距。  单位：vp  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |
| textVerticalAlign20+ | [TextVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textverticalalign20) | 是 | 是 | 获取属性字符串文本段落在垂直方向的对齐方式。  一个段落下使用同一字号必须同时设置行高[lineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight)或者同一个段落不同字号文本混排时才有效果差异，否则设置了该属性任意枚举值和未设置该属性都是一样的排版效果。属性字符串[TextStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyle)中的SuperscriptStyle上下角标样式仅在[TextVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textverticalalign20)属性值为TextVerticalAlign.BASELINE时生效，其余垂直对齐方式下上下角标文本和普通文本表现一致，无上下角标效果。  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| leadingMarginSpan22+ | [LeadingMarginSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#leadingmarginspan22) | 是 | 是 | 获取属性字符串文本段落的自定义缩进信息。  **元服务API：** 从API version 22开始，该接口支持在元服务中使用。 |
| textDirection23+ | [TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdirection22) | 是 | 是 | 获取文本方向。  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |

说明

属性字符串的maxLines和overflow仅在Text中生效，建议在组件侧设置。

textAlign只能调整文本整体的布局，不影响字符的显示顺序。若需要调整字符的显示顺序，请参考[镜像状态字符对齐](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-internationalization#镜像状态字符对齐)。

### constructor

PhonePC/2in1TabletTVWearable

constructor(value?: ParagraphStyleInterface)

文本段落样式的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ParagraphStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#paragraphstyleinterface对象说明) | 否 | 段落样式设置项。 |

## ParagraphStyleInterface对象说明

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| textAlign | [TextAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textalign) | 否 | 是 | 设置文本段落在水平方向的对齐方式。  默认值：TextAlign.Start  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| textIndent | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 设置文本段落的首行文本缩进。不支持百分比。  默认值：0  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| maxLines | number | 否 | 是 | 设置文本段落的最大行数，默认不限制。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| overflow | [TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#textoverflow) | 否 | 是 | 设置文本段落超长时的显示方式。  默认值：TextOverflow.None  需配合maxLines使用，单独设置不生效。不支持TextOverflow.MARQUEE。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| wordBreak | [WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#wordbreak11) | 否 | 是 | 设置文本段落的断行规则。  默认值：WordBreak.NORMAL  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| leadingMargin | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | [LeadingMarginPlaceholder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor#leadingmarginplaceholder11) | 否 | 是 | 设置文本段落的缩进。不支持百分比。  默认值：0  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| paragraphSpacing19+ | [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 否 | 是 | 设置文本段落的段落间距。  段落间距默认大小为0。不支持百分比。  **元服务API：** 从API version 19开始，该接口支持在元服务中使用。 |
| textVerticalAlign20+ | [TextVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textverticalalign20) | 否 | 是 | 设置文本段落在垂直方向的对齐方式。  默认值：TextVerticalAlign.BASELINE  **元服务API：** 从API version 20开始，该接口支持在元服务中使用。 |
| leadingMarginSpan22+ | [LeadingMarginSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#leadingmarginspan22) | 否 | 是 | 设置文本段落的自定义缩进。不支持百分比。  默认值：0  **元服务API：** 从API version 22开始，该接口支持在元服务中使用。 |
| textDirection23+ | [TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdirection22) | 否 | 是 | 设置文本方向。  默认值：TextDirection.DEFAULT  **元服务API：** 从API version 23开始，该接口支持在元服务中使用。 |

## UserDataSpan

PhonePC/2in1TabletTVWearable

支持存储自定义扩展信息，用于存储和获取用户数据，仅提供基类，具体实现由开发者定义。

扩展信息不影响实际显示效果。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## LeadingMarginSpan22+

PhonePC/2in1TabletTVWearable

文本段落的自定义缩进，仅提供基类，具体实现由开发者定义。

### onDraw22+

PhonePC/2in1TabletTVWearable

abstract onDraw(context: DrawContext, drawInfo: LeadingMarginSpanDrawInfo): void

绘制自定义图案。段落中的每一行文本都会触发一次onDraw。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [DrawContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#drawcontext) | 是 | 图形绘制上下文。  DrawContext的canvas方法获取的是组件的画布，绘制时不会超出组件的范围。 |
| drawInfo | [LeadingMarginSpanDrawInfo](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#leadingmarginspandrawinfo22对象说明) | 是 | 自定义绘制信息。 |

### getLeadingMargin22+

PhonePC/2in1TabletTVWearable

abstract getLeadingMargin(): LengthMetrics

返回文本段落的缩进距离。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [LengthMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetrics12) | 文本段落的缩进。不支持百分比。  默认值：0 |

## LeadingMarginSpanDrawInfo22+对象说明

PhonePC/2in1TabletTVWearable

自定义绘制信息。

**元服务API：** 从API version 22开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| x | number | 否 | 否 | 当前行相对于组件的水平偏移。direction为RTL时，返回当前行右侧与组件右边缘的距离。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  取值范围：大于等于0。 |
| top | number | 否 | 否 | 行顶与组件上边缘的距离。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  取值范围：大于等于0。 |
| bottom | number | 否 | 否 | 行底与组件上边缘的距离。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  取值范围：大于等于0。 |
| baseline | number | 否 | 否 | 当前行的基线与组件上边缘的距离。  单位：[px](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units)  取值范围：大于等于0。 |
| direction | [TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdirection22) | 否 | 否 | 文本内容的方向。 |
| start | number | 否 | 否 | 当前行的起始索引。  取值范围：大于等于0。 |
| end | number | 否 | 否 | 当前行的结束索引。  取值范围：大于等于0。 |
| first | boolean | 否 | 否 | 当前行是否是段落的首行。  true：首行；false：非首行。 |

## StyledStringKey枚举说明

PhonePC/2in1TabletTVWearable

范围属性字符串样式。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| FONT | 0 | 字体样式键。[TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| DECORATION | 1 | 文本装饰线样式键。[DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| BASELINE\_OFFSET | 2 | 文本基线偏移量样式键。[BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#baselineoffsetstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| LETTER\_SPACING | 3 | 文本字符间距样式键。[LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#letterspacingstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| TEXT\_SHADOW | 4 | 文本阴影样式键。[TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textshadowstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| LINE\_HEIGHT | 5 | 文本行高样式键。[LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#lineheightstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| BACKGROUND\_COLOR14+ | 6 | 文本背景色样式键。[BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#backgroundcolorstyle14)所属键。  **元服务API：** 从API version 14开始，该接口支持在元服务中使用。 |
| URL14+ | 7 | 超链接样式键。[UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#urlstyle14)所属键。  **元服务API：** 从API version 14开始，该接口支持在元服务中使用。 |
| GESTURE | 100 | 事件手势键。[GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#gesturestyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| PARAGRAPH\_STYLE | 200 | 段落样式键。[ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#paragraphstyle)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| IMAGE | 300 | 图片键。[ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachment)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| CUSTOM\_SPAN | 400 | 自定义绘制Span键。[CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |
| USER\_DATA | 500 | UserDataSpan键。[UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#userdataspan)所属键。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |

## BackgroundColorStyle14+

PhonePC/2in1TabletTVWearable

文本背景颜色对象说明。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| textBackgroundStyle | [TextBackgroundStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#textbackgroundstyle11对象说明) | 是 | 否 | 获取属性字符串的文本背景颜色。  默认值：  {  color: Color.Transparent,  radius: 0  } |

### constructor14+

PhonePC/2in1TabletTVWearable

constructor(textBackgroundStyle: TextBackgroundStyle)

文本背景颜色的构造函数。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| textBackgroundStyle | [TextBackgroundStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#textbackgroundstyle11对象说明) | 是 | 文本背景色设置项。  默认值：  {  color: Color.Transparent,  radius: 0  } |

## UrlStyle14+

PhonePC/2in1TabletTVWearable

超链接对象说明。

默认颜色、字号、字重分别是'#ff0a59f7'、'16fp'、'FontWeight.Regular'，若属性字符串设置TextStyle，则TextStyle优先级更高。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### 属性

PhonePC/2in1TabletTVWearable

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| url | string | 是 | 否 | 获取属性字符串的超链接内容。 |

### constructor14+

PhonePC/2in1TabletTVWearable

constructor(url: string)

超链接对象的构造函数。

**元服务API：** 从API version 14开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| url | string | 是 | 超链接设置项。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（属性字符串处理）

从API version 12开始，该示例通过[insertString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#insertstring)、[removeStyles](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#removestyles)、[replaceStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#replacestyle)、[getStyles](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#getstyles)接口实现属性字符串的插入、删除、替换、查看。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct styled_string_process_demo {
5. @State height1: number = 450;
6. @State fontSize1: number = 16;
7. @State fontWeight1: number = 400;
8. @State color1: Color = Color.Blue;
9. scroll: Scroller = new Scroller();
10. fontStyleAttr1: TextStyle = new TextStyle({ fontColor: Color.Blue });
11. fontStyleAttr2: TextStyle = new TextStyle({ fontColor: Color.Orange });
12. // 创建可读写属性字符串的对象mutableStyledString1
13. mutableStyledString1: MutableStyledString = new MutableStyledString("运动45分钟");
14. // 创建构造入参有字符串和样式的对象mutableStyledString2
15. mutableStyledString2: MutableStyledString = new MutableStyledString("test hello world", [{
16. start: 0,
17. length: 5,
18. styledKey: StyledStringKey.FONT,
19. styledValue: this.fontStyleAttr1
20. }]);
21. // 创建只读属性字符串对象styledString2
22. styledString2: StyledString = new StyledString("运动45分钟");
23. spanStyle1: SpanStyle = {
24. start: 0,
25. length: 5,
26. styledKey: StyledStringKey.FONT,
27. styledValue: new TextStyle({ fontColor: Color.Pink })
28. };
29. spanStyle2: SpanStyle = {
30. start: 0,
31. length: 2,
32. styledKey: StyledStringKey.FONT,
33. styledValue: new TextStyle({ fontColor: Color.Red })
34. };
35. @State string1: string = '';
36. @State fontColor1: ResourceColor = Color.Red;
37. controller1: TextController = new TextController();
38. controller2: TextController = new TextController();
39. controller3: TextController = new TextController();

41. async onPageShow() {
42. this.controller1.setStyledString(this.styledString2);
43. this.controller2.setStyledString(this.mutableStyledString1);
44. this.controller3.setStyledString(this.mutableStyledString2);
45. }

47. build() {
48. Column() {
49. Scroll(this.scroll) {
50. Column() {
51. // 显示属性字符串
52. Text(undefined, { controller: this.controller1 })
53. Text(undefined, { controller: this.controller3 }).key('mutableStyledString2')
54. Button('修改string1的值')
55. .onClick(() => {
56. let result = this.mutableStyledString1.equals(this.styledString2);
57. if (result) {
58. this.string1 = this.mutableStyledString1.getString();
59. console.info("mutableStyledString1 content:", this.mutableStyledString1.getString());
60. console.info("mutableStyledString1 length:", this.mutableStyledString1.length);
61. }
62. })

64. // 属性字符串与Span冲突时忽略Span,以及样式与Text组件属性未冲突部分生效Text设置的属性
65. Text(undefined, { controller: this.controller2 }) {
66. Span("span and styledString test")
67. .fontColor(Color.Yellow)
68. .decoration({ type: TextDecorationType.LineThrough })
69. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
70. ImageSpan($r('app.media.startIcon'))
71. }
72. .key('styledString2')
73. .fontColor(this.fontColor1)
74. .letterSpacing(10)
75. .fontSize(32)
76. .fontWeight(600)
77. .fontStyle(FontStyle.Italic)
78. .lineHeight(30)
79. .textShadow({
80. radius: 5,
81. color: Color.Blue,
82. offsetX: 5,
83. offsetY: 5
84. })
85. .textCase(TextCase.UpperCase)
86. .decoration({ type: TextDecorationType.LineThrough, color: Color.Yellow })
87. .baselineOffset(2)
88. .copyOption(CopyOptions.InApp)
89. .margin({ top: 10 })
90. .draggable(true)

92. // 以上冲突测试对照组
93. Text() {
94. Span(this.string1)
95. .fontColor(this.color1)
96. .decoration({ type: TextDecorationType.LineThrough })
97. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
98. ImageSpan($r('app.media.startIcon'))
99. .width(50).height(50)
100. }
101. .letterSpacing(10)
102. .fontSize(32)
103. .fontWeight(600)
104. .fontStyle(FontStyle.Italic)
105. .lineHeight(30)
106. .textShadow({
107. radius: 5,
108. color: Color.Blue,
109. offsetX: 5,
110. offsetY: 5
111. })
112. .textCase(TextCase.UpperCase)
113. .decoration({ type: TextDecorationType.LineThrough, color: Color.Yellow })
114. .baselineOffset(2)

116. Button('设置样式及替换文本')
117. .onClick(() => {
118. this.mutableStyledString1.replaceStyle({
119. start: 2,
120. length: 2,
121. styledKey: StyledStringKey.FONT,
122. styledValue: this.fontStyleAttr1
123. });
124. this.mutableStyledString1.insertString(0, "压力85偏高，");
125. this.mutableStyledString1.setStyle({
126. start: 2,
127. length: 2,
128. styledKey: StyledStringKey.FONT,
129. styledValue: this.fontStyleAttr2
130. });
131. this.controller2.setStyledString(this.mutableStyledString1);
132. })
133. .margin({ top: 10 })

135. Button('查询样式及清空样式')
136. .onClick(() => {
137. let styles = this.mutableStyledString1.getStyles(0, this.mutableStyledString1.length);
138. if (styles.length == 2) {
139. for (let i = 0; i < styles.length; i++) {
140. console.info('StyledString style object start:' + styles[i].start);
141. console.info('StyledString style object length:' + styles[i].length);
142. console.info('StyledString style object key:' + styles[i].styledKey);
143. if (styles[i].styledKey === 0) {
144. let fontAttr = styles[i].styledValue as TextStyle;
145. console.info('StyledString fontColor:' + fontAttr.fontColor);
146. }
147. }
148. }
149. if (styles[0] !== undefined) {
150. this.mutableStyledString2.setStyle(styles[0]);
151. this.controller3.setStyledString(this.mutableStyledString2);
152. }
153. this.mutableStyledString1.removeStyles(2, 3);
154. this.controller2.setStyledString(this.mutableStyledString1);
155. })
156. .margin({ top: 10 })
157. }.width('100%')

159. }
160. .expandSafeArea([SafeAreaType.KEYBOARD])
161. .scrollable(ScrollDirection.Vertical)
162. .scrollBar(BarState.On)
163. .scrollBarColor(Color.Gray)
164. .scrollBarWidth(10)
165. .edgeEffect(EdgeEffect.None)
166. }
167. .width('100%')
168. }
169. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/I6jEsXcPQuOA1qrunWSQeg/zh-cn_image_0000002568919118.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=A34AA0FB17C12002B0E853968A252435575E8176B97B0BC3E9E65EB743A35432)

### 示例2（设置事件）

从API version 12开始，该示例通过[StyleOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#styleoptions对象说明)中的styledKey、styledValue接口实现属性字符串绑定事件。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct styled_string_bind_events_demo {
5. scroll: Scroller = new Scroller();
6. fontStyleAttr1: TextStyle = new TextStyle({ fontColor: Color.Blue });
7. private uiContext: UIContext = this.getUIContext();
8. clickGestureAttr: GestureStyle = new GestureStyle({
9. onClick: () => {
10. this.uiContext.getPromptAction().showToast({ message: 'clickGestureAttr object trigger click event' });
11. this.backgroundColor1 = Color.Yellow;
12. }
13. })
14. gestureStyleAttr: GestureStyle = new GestureStyle({
15. onClick: () => {
16. this.uiContext.getPromptAction().showToast({ message: 'gestureStyleAttr object trigger click event' });
17. this.backgroundColor1 = Color.Green;
18. },
19. onLongPress: () => {
20. this.uiContext.getPromptAction().showToast({ message: 'gestureStyleAttr object trigger long press event' });
21. this.backgroundColor1 = Color.Orange;
22. },
23. onTouch: () => {
24. this.uiContext.getPromptAction().showToast({ message: 'gestureStyleAttr object trigger touch event' });
25. this.backgroundColor1 = Color.Red;
26. }
27. });
28. // 创建事件的对象mutableStyledString3
29. mutableStyledString3: MutableStyledString = new MutableStyledString("hello world", [{
30. start: 0,
31. length: 5,
32. styledKey: StyledStringKey.GESTURE,
33. styledValue: this.clickGestureAttr
34. },
35. {
36. start: 0,
37. length: 5,
38. styledKey: StyledStringKey.FONT,
39. styledValue: this.fontStyleAttr1
40. },
41. {
42. start: 6,
43. length: 5,
44. styledKey: StyledStringKey.GESTURE,
45. styledValue: this.gestureStyleAttr
46. },
47. {
48. start: 6,
49. length: 5,
50. styledKey: StyledStringKey.FONT,
51. styledValue: new TextStyle({ fontColor: Color.Pink })
52. }]);
53. @State backgroundColor1: ResourceColor | undefined = undefined;
54. controller3: TextController = new TextController();

56. async onPageShow() {
57. this.controller3.setStyledString(this.mutableStyledString3);
58. }

60. build() {
61. Column() {
62. Scroll(this.scroll) {
63. Column({ space: 30 }) {
64. Button("响应属性字符串事件改变背景色").backgroundColor(this.backgroundColor1).width('80%')
65. // 包含事件的属性字符串
66. Text(undefined, { controller: this.controller3 }).fontSize(30)
67. .copyOption(CopyOptions.InApp)
68. .draggable(true)
69. .clip(true)
70. }.width('100%')
71. }
72. .expandSafeArea([SafeAreaType.KEYBOARD])
73. .scrollable(ScrollDirection.Vertical)
74. .scrollBar(BarState.On)
75. .scrollBarColor(Color.Gray)
76. .scrollBarWidth(10)
77. .edgeEffect(EdgeEffect.None)
78. }
79. .width('100%')
80. }
81. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/54/v3/vP8BER1vRR2K9b4CwEKneA/zh-cn_image_0000002599478663.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=C9285AA8331D8438ABDA4F361E340C2408755278CECA63DBBA1212F85032E062)

### 示例3（设置文本样式）

从API version 12开始，该示例通过[getStyles](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#getstyles)、[setStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#setstyle)接口实现属性字符串查询和设置样式。



```
1. // xxx.ets
2. import { LengthMetrics, LengthUnit } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct styled_string_set_text_style_demo {
7. fontStyleAttr1: TextStyle = new TextStyle({ fontColor: Color.Blue });
8. fontStyleAttr2: TextStyle = new TextStyle({
9. fontColor: Color.Orange,
10. fontSize: LengthMetrics.vp(20),
11. fontWeight: FontWeight.Bolder,
12. fontStyle: FontStyle.Italic,
13. fontFamily: "Arial",
14. superscript: SuperscriptStyle.SUPERSCRIPT
15. });
16. fontStyleAttr3: TextStyle = new TextStyle({
17. fontColor: Color.Orange,
18. fontSize: LengthMetrics.vp(20),
19. fontWeight: FontWeight.Lighter,
20. fontStyle: FontStyle.Italic,
21. fontFamily: "Arial",
22. superscript: SuperscriptStyle.SUBSCRIPT
23. });
24. // 创建多重TextStyle样式的对象mutableStyledString1
25. mutableStyledString1: MutableStyledString = new MutableStyledString("运动45分钟", [{
26. start: 0,
27. length: 2,
28. styledKey: StyledStringKey.FONT,
29. styledValue: this.fontStyleAttr3
30. }, {
31. start: 2,
32. length: 2,
33. styledKey: StyledStringKey.FONT,
34. styledValue: this.fontStyleAttr2
35. }
36. ]);
37. // 创建有多种样式组合对象mutableStyledString2
38. mutableStyledString2: MutableStyledString = new MutableStyledString("test hello world", [{
39. start: 0,
40. length: 5,
41. styledKey: StyledStringKey.FONT,
42. styledValue: this.fontStyleAttr1
43. }, {
44. start: 0,
45. length: 5,
46. styledKey: StyledStringKey.DECORATION,
47. styledValue: new DecorationStyle({ type: TextDecorationType.LineThrough, color: Color.Blue })
48. }, {
49. start: 0,
50. length: 5,
51. styledKey: StyledStringKey.TEXT_SHADOW,
52. styledValue: new TextShadowStyle({
53. radius: 5,
54. type: ShadowType.COLOR,
55. color: Color.Yellow,
56. offsetX: 10,
57. offsetY: -10
58. })
59. }, {
60. start: 0,
61. length: 5,
62. styledKey: StyledStringKey.BASELINE_OFFSET,
63. styledValue: new BaselineOffsetStyle(LengthMetrics.px(20))
64. }, {
65. start: 0,
66. length: 5,
67. styledKey: StyledStringKey.LETTER_SPACING,
68. styledValue: new LetterSpacingStyle(new LengthMetrics(10, LengthUnit.VP))
69. }, {
70. start: 6,
71. length: 5,
72. styledKey: StyledStringKey.BASELINE_OFFSET,
73. styledValue: new BaselineOffsetStyle(LengthMetrics.fp(10))
74. }
75. ]);
76. @State fontColor1: ResourceColor = Color.Red;
77. controller: TextController = new TextController();
78. options: TextOptions = { controller: this.controller };
79. controller2: TextController = new TextController();
80. spanStyle1: SpanStyle = {
81. start: 0,
82. length: 5,
83. styledKey: StyledStringKey.FONT,
84. styledValue: new TextStyle({ fontColor: Color.Pink })
85. };

87. async onPageShow() {
88. this.controller.setStyledString(this.mutableStyledString1);
89. this.controller2.setStyledString(this.mutableStyledString2);
90. }

92. build() {
93. Column() {
94. Column({ space: 10 }) {
95. // 显示配了字体各种样式的属性字符串，Text组件亦配置冲突部分生效属性字符串配置，未冲突区间生效Text组件属性设置值
96. Text(undefined, this.options)
97. .fontColor(this.fontColor1)
98. .font({ size: 20, weight: 500, style: FontStyle.Normal })
99. // 显示配置了文本阴影、划线、字符间距、基线偏移量的属性字符串，Text组件亦配置生效属性字符串配置
100. Text(undefined, { controller: this.controller2 })
101. .fontSize(30)
102. .copyOption(CopyOptions.InApp)
103. .draggable(true)
104. .decoration({ type: TextDecorationType.Overline, color: Color.Pink })
105. .textShadow({
106. radius: 10,
107. type: ShadowType.COLOR,
108. color: Color.Green,
109. offsetX: -10,
110. offsetY: 10
111. })
112. Button('查询字体样式')
113. .onClick(() => {
114. let styles = this.mutableStyledString1.getStyles(0, this.mutableStyledString1.length);
115. if (styles.length !== 0) {
116. for (let i = 0; i < styles.length; i++) {
117. console.info('mutableStyledString1 style object start:' + styles[i].start);
118. console.info('mutableStyledString1 style object length:' + styles[i].length);
119. console.info('mutableStyledString1 style object key:' + styles[i].styledKey);
120. if (styles[i].styledKey === 0) {
121. let fontAttr = styles[i].styledValue as TextStyle;
122. console.info('mutableStyledString1 fontColor:' + fontAttr.fontColor);
123. console.info('mutableStyledString1 fontSize:' + fontAttr.fontSize);
124. console.info('mutableStyledString1 fontWeight:' + fontAttr.fontWeight);
125. console.info('mutableStyledString1 fontStyle:' + fontAttr.fontStyle);
126. console.info('mutableStyledString1 fontFamily:' + fontAttr.fontFamily);
127. console.info('mutableStyledString1 superscript:' + fontAttr.superscript);
128. }
129. }
130. }
131. })
132. .margin({ top: 10 })
133. Button('查询其他文本样式')
134. .onClick(() => {
135. let styles = this.mutableStyledString2.getStyles(0, this.mutableStyledString2.length);
136. if (styles.length !== 0) {
137. for (let i = 0; i < styles.length; i++) {
138. console.info('mutableStyledString2 style object start:' + styles[i].start);
139. console.info('mutableStyledString2 style object length:' + styles[i].length);
140. console.info('mutableStyledString2 style object key:' + styles[i].styledKey);
141. if (styles[i].styledKey === 1) {
142. let decoAttr = styles[i].styledValue as DecorationStyle;
143. console.info('mutableStyledString2 decoration type:' + decoAttr.type);
144. console.info('mutableStyledString2 decoration color:' + decoAttr.color);
145. }
146. if (styles[i].styledKey === 2) {
147. let baselineAttr = styles[i].styledValue as BaselineOffsetStyle;
148. console.info('mutableStyledString2 baselineOffset:' + baselineAttr.baselineOffset);
149. }
150. if (styles[i].styledKey === 3) {
151. let letterAttr = styles[i].styledValue as LetterSpacingStyle;
152. console.info('mutableStyledString2 letterSpacing:' + letterAttr.letterSpacing);
153. }
154. if (styles[i].styledKey === 4) {
155. let textShadowAttr = styles[i].styledValue as TextShadowStyle;
156. let shadowValues = textShadowAttr.textShadow;
157. if (shadowValues.length > 0) {
158. for (let j = 0; j < shadowValues.length; j++) {
159. console.info('mutableStyledString2 textShadow type:' + shadowValues[j].type);
160. console.info('mutableStyledString2 textShadow radius:' + shadowValues[j].radius);
161. console.info('mutableStyledString2 textShadow color:' + shadowValues[j].color);
162. console.info('mutableStyledString2 textShadow offsetX:' + shadowValues[j].offsetX);
163. console.info('mutableStyledString2 textShadow offsetY:' + shadowValues[j].offsetY);
164. }
165. }
166. }
167. }
168. }
169. })
170. .margin({ top: 10 })
171. Button('更新mutableStyledString1样式')
172. .onClick(() => {
173. this.mutableStyledString1.setStyle(this.spanStyle1);
174. this.controller.setStyledString(this.mutableStyledString1);
175. })
176. .margin({ top: 10 })
177. }.width('100%')
178. }
179. .width('100%')
180. }
181. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/vh-nlFg9R1CgV8-aZqpnGQ/zh-cn_image_0000002568759472.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=9C5361BD2DEE95C175BBA3703CA93E171CB04DD56004023BE898049F21875DDE)

### 示例4（设置图片）

从API version 12开始，该示例通过[ImageAttachment](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentinterface对象说明)接口实现属性字符串设置图片。



```
1. // xxx.ets
2. import { image } from '@kit.ImageKit';
3. import { LengthMetrics } from '@kit.ArkUI';

5. @Entry
6. @Component
7. struct styled_string_set_image_demo {
8. @State message: string = 'Hello World';
9. imagePixelMap: image.PixelMap | undefined = undefined;
10. @State imagePixelMap3: image.PixelMap | undefined = undefined;
11. mutableStr: MutableStyledString = new MutableStyledString('123');
12. controller: TextController = new TextController();
13. private uiContext: UIContext = this.getUIContext();
14. mutableStr2: MutableStyledString = new MutableStyledString('This is set decoration line style to the mutableStr2', [{
15. start: 0,
16. length: 15,
17. styledKey: StyledStringKey.DECORATION,
18. styledValue: new DecorationStyle({
19. type: TextDecorationType.Overline,
20. color: Color.Orange,
21. style: TextDecorationStyle.DOUBLE
22. })
23. }]);

25. async aboutToAppear() {
26. console.info("aboutToAppear initial imagePixelMap");
27. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
28. this.imagePixelMap =
29. await this.getPixmapFromMedia($r('app.media.startIcon'));
30. }

32. private async getPixmapFromMedia(resource: Resource) {
33. let unit8Array = await this.uiContext.getHostContext()?.resourceManager?.getMediaContent(resource.id);
34. let imageSource = image.createImageSource(unit8Array?.buffer.slice(0, unit8Array.buffer.byteLength));
35. let createPixelMap: image.PixelMap = await imageSource.createPixelMap({
36. desiredPixelFormat: image.PixelMapFormat.RGBA_8888
37. });
38. await imageSource.release();
39. return createPixelMap;
40. }

42. build() {
43. Row() {
44. Column({ space: 5 }) {
45. Text(undefined, { controller: this.controller })
46. .copyOption(CopyOptions.InApp)
47. .draggable(true)
48. .fontSize(30)
49. Button('设置图片')
50. .onClick(() => {
51. if (this.imagePixelMap !== undefined) {
52. this.mutableStr = new MutableStyledString(new ImageAttachment({
53. value: this.imagePixelMap,
54. size: { width: 50, height: 50 },
55. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
56. verticalAlign: ImageSpanAlignment.BASELINE,
57. objectFit: ImageFit.Contain
58. }));
59. this.controller.setStyledString(this.mutableStr);
60. }
61. })
62. Button('设置资源类型图片')
63. .onClick(() => {
64. if (this.imagePixelMap !== undefined) {
65. this.mutableStr = new MutableStyledString(new ImageAttachment({
66. // $r('app.media.sky')需要替换为开发者所需的图像资源文件。
67. resourceValue: $r('app.media.sky'),
68. size: { width: 50, height: 50 },
69. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
70. verticalAlign: ImageSpanAlignment.BASELINE,
71. objectFit: ImageFit.Contain,
72. syncLoad: true
73. }));
74. this.controller.setStyledString(this.mutableStr);
75. }
76. })
77. Button('Image之Get')
78. .onClick(() => {
79. let imageArray = this.mutableStr.getStyles(0, 1, StyledStringKey.IMAGE);
80. for (let i = 0; i < imageArray.length; ++i) {
81. console.info('mutableStr start ' + imageArray[i].start + ' length ' + imageArray[i].length + ' type ' +
82. imageArray[i].styledKey);
83. if (imageArray[i].styledKey === 300) {
84. let attachment = imageArray[i].styledValue as ImageAttachment;
85. this.imagePixelMap3 = attachment.value;
86. console.info('mutableStr value ' + JSON.stringify(attachment.value));
87. if (attachment.size !== undefined) {
88. console.info('mutableStr size width ' + attachment.size.width + ' height ' + attachment.size.height);
89. }
90. console.info('mutableStr vertical ' + attachment.verticalAlign);
91. console.info('mutableStr fit ' + attachment.objectFit);
92. if (attachment.layoutStyle !== undefined) {
93. let radius = attachment.layoutStyle.borderRadius as BorderRadiuses;
94. console.info('mutableStr radius ' + JSON.stringify(radius));
95. }
96. }
97. }
98. })
99. Image(this.imagePixelMap3).width(50).height(50)
100. Button('Image之Append')
101. .onClick(() => {
102. let str = new StyledString('123');
103. this.mutableStr.appendStyledString(str);
104. this.controller.setStyledString(this.mutableStr);
105. })
106. Button('Image之Insert 前')
107. .onClick(() => {
108. this.mutableStr.insertString(0, '123');
109. this.controller.setStyledString(this.mutableStr);
110. })
111. Button('Image之Insert 后')
112. .onClick(() => {
113. this.mutableStr.insertString(1, '123');
114. this.controller.setStyledString(this.mutableStr);
115. })
116. Button('Image之replace')
117. .onClick(() => {
118. this.mutableStr.replaceString(2, 5, "789");
119. this.controller.setStyledString(this.mutableStr);
120. })
121. }
122. .width('100%')
123. }
124. .height('100%')
125. }
126. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/RxfKtCLFStCSVrYOgstWcw/zh-cn_image_0000002599358715.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=9C86215294FFC6A04D04BC87A3E81D86D616F56A86731848AB4DB5C169A0A35C)

### 示例5（设置文本行高和段落样式）

从API version 12开始，该示例通过[LineHeightStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#lineheightstyle)、[ParagraphStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#paragraphstyle)接口实现属性字符串设置文本行高和段落样式。



```
1. import { LengthMetrics } from '@kit.ArkUI';

3. const canvasWidth = 1000;
4. const canvasHeight = 100;

6. class LeadingMarginCreator {
7. private settings: RenderingContextSettings = new RenderingContextSettings(true);
8. private offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(canvasWidth, canvasHeight);
9. private offContext: OffscreenCanvasRenderingContext2D = this.offscreenCanvas.getContext("2d", this.settings);
10. public static instance: LeadingMarginCreator = new LeadingMarginCreator();

12. public genSquareMark(fontSize: number): PixelMap {
13. this.offContext = this.offscreenCanvas.getContext("2d", this.settings);
14. this.clearCanvas();
15. const coordinate = fontSize * (1 - 1 / 1.5) / 2;
16. const sideLength = fontSize / 1.5;
17. this.offContext.fillRect(coordinate, coordinate, sideLength, sideLength);
18. return this.offContext.getPixelMap(0, 0, fontSize, fontSize);
19. }

21. private clearCanvas() {
22. this.offContext.clearRect(0, 0, canvasWidth, canvasHeight);
23. }
24. }

26. @Entry
27. @Component
28. struct styled_string_set_lineheight_paragraphstyle_demo {
29. private leadingMarkCreatorInstance = LeadingMarginCreator.instance;
30. leadingMarginPlaceholder1: LeadingMarginPlaceholder = {
31. pixelMap: this.leadingMarkCreatorInstance.genSquareMark(24),
32. size: [15, 15]
33. };
34. titleParagraphStyleAttr: ParagraphStyle =
35. new ParagraphStyle({ textAlign: TextAlign.Center, paragraphSpacing: LengthMetrics.px(10) });
36. // 第一段落首行缩进15vp
37. paragraphStyleAttr1: ParagraphStyle = new ParagraphStyle({ textIndent: LengthMetrics.vp(15) });
38. // 第二段落缩进15vp且首行有placeholder占位显示
39. paragraphStyleAttr2: ParagraphStyle =
40. new ParagraphStyle({ textAlign: TextAlign.Start, leadingMargin: this.leadingMarginPlaceholder1 });
41. // 第三段落不设置缩进配置最大行数及超长显示方式
42. paragraphStyleAttr3: ParagraphStyle = new ParagraphStyle({
43. textAlign: TextAlign.End,
44. textVerticalAlign: TextVerticalAlign.BASELINE,
45. maxLines: 1,
46. wordBreak: WordBreak.BREAK_ALL,
47. overflow: TextOverflow.Ellipsis
48. });
49. // 行高样式对象
50. lineHeightStyle1: LineHeightStyle = new LineHeightStyle(new LengthMetrics(24));
51. // 创建含段落样式的对象paragraphStyledString1
52. paragraphStyledString1: StyledString =
53. new StyledString("段落标题\n正文第一段落开始0123456789正文第一段落结束\n正文第二段落开始hello world正文第二段落结束\n正文第三段落ABCDEFGHIJKLMNOPQRSTUVWXYZ。",
54. [
55. {
56. start: 0,
57. length: 4,
58. styledKey: StyledStringKey.PARAGRAPH_STYLE,
59. styledValue: this.titleParagraphStyleAttr
60. },
61. {
62. start: 0,
63. length: 4,
64. styledKey: StyledStringKey.LINE_HEIGHT,
65. styledValue: new LineHeightStyle(new LengthMetrics(50))
66. }, {
67. start: 0,
68. length: 4,
69. styledKey: StyledStringKey.FONT,
70. styledValue: new TextStyle({ fontSize: LengthMetrics.vp(24), fontWeight: FontWeight.Bolder })
71. },
72. {
73. start: 5,
74. length: 3,
75. styledKey: StyledStringKey.PARAGRAPH_STYLE,
76. styledValue: this.paragraphStyleAttr1
77. },
78. {
79. start: 5,
80. length: 20,
81. styledKey: StyledStringKey.LINE_HEIGHT,
82. styledValue: this.lineHeightStyle1
83. },
84. {
85. start: 32,
86. length: 5,
87. styledKey: StyledStringKey.PARAGRAPH_STYLE,
88. styledValue: this.paragraphStyleAttr2
89. },
90. {
91. start: 32,
92. length: 20,
93. styledKey: StyledStringKey.LINE_HEIGHT,
94. styledValue: this.lineHeightStyle1
95. },
96. {
97. start: 60,
98. length: 5,
99. styledKey: StyledStringKey.PARAGRAPH_STYLE,
100. styledValue: this.paragraphStyleAttr3
101. },
102. {
103. start: 60,
104. length: 5,
105. styledKey: StyledStringKey.LINE_HEIGHT,
106. styledValue: this.lineHeightStyle1
107. }
108. ]);
109. controller: TextController = new TextController();

111. async onPageShow() {
112. this.controller.setStyledString(this.paragraphStyledString1);
113. }

115. build() {
116. Row() {
117. Column({ space: 5 }) {
118. Text(undefined, { controller: this.controller })
119. .width(240)
120. .borderWidth(1)
121. .copyOption(CopyOptions.InApp)
122. .draggable(true)

124. // 查询段落样式
125. Text()
126. .onClick(() => {
127. let styles = this.paragraphStyledString1.getStyles(0, this.paragraphStyledString1.length);
128. if (styles.length !== 0) {
129. for (let i = 0; i < styles.length; i++) {
130. console.info('paragraphStyledString1 style object start:' + styles[i].start);
131. console.info('paragraphStyledString1 style object length:' + styles[i].length);
132. console.info('paragraphStyledString1 style object key:' + styles[i].styledKey);
133. if (styles[i].styledKey === 200) {
134. let paraAttr = styles[i].styledValue as ParagraphStyle;
135. console.info('paragraphStyledString1 textAlign:' + paraAttr.textAlign);
136. console.info('paragraphStyledString1 textIndent:' + paraAttr.textIndent);
137. console.info('paragraphStyledString1 maxLines:' + paraAttr.maxLines);
138. console.info('paragraphStyledString1 wordBreak:' + paraAttr.wordBreak);
139. console.info('paragraphStyledString1 leadingMargin:' + paraAttr.leadingMargin);
140. console.info('paragraphStyledString1 overflow:' + paraAttr.overflow);
141. }
142. }
143. }
144. })
145. .margin({ top: 10 })
146. }
147. .width('100%')
148. }
149. .height('100%')
150. }
151. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c6/v3/6SjMHKS3QO6ryjLDXF-PbQ/zh-cn_image_0000002568919120.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=2912224A9FF217AA3D373A40F700F31DF215804A0CC2A492F8022B0F1B63C337)

### 示例6（设置自定义绘制Span）

从API version 12开始，该示例通过[CustomSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#customspan)接口和[measureTextSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-measureutils#measuretextsize12)实现属性字符串设置自定义绘制Span。



```
1. // xxx.ets
2. import { drawing } from '@kit.ArkGraphics2D';
3. import { LengthMetrics } from '@kit.ArkUI';

5. let gUIContext: UIContext;

7. class MyCustomSpan extends CustomSpan {
8. constructor(word: string, width: number, height: number) {
9. super();
10. this.word = word;
11. this.width = width;
12. this.height = height;
13. }

15. onMeasure(measureInfo: CustomSpanMeasureInfo): CustomSpanMetrics {
16. this.setPx(gUIContext.vp2px(2));
17. let textSize = gUIContext.getMeasureUtils().measureTextSize({ textContent: this.word, fontSize: this.wordFontSize })
18. this.width = textSize.width as number;
19. this.height = textSize.height as number;
20. return {
21. width: gUIContext.px2vp(this.width) + (this.paddingLeft + this.paddingRight) * 2,
22. height: gUIContext.px2vp(this.height) + this.paddingTop + this.paddingBottom
23. };
24. }

26. onDraw(context: DrawContext, options: CustomSpanDrawInfo) {
27. let canvas = context.canvas;

29. const brush = new drawing.Brush();
30. brush.setColor({
31. alpha: 255,
32. red: 0,
33. green: 74,
34. blue: 175
35. });
36. const font = new drawing.Font();
37. font.setSize(gUIContext.vp2px(this.wordFontSize));
38. const textBlob = drawing.TextBlob.makeFromString(this.word, font, drawing.TextEncoding.TEXT_ENCODING_UTF8);
39. canvas.attachBrush(brush);
40. canvas.drawRect({
41. // 绘制的矩形在Span占位大小的范围里居中
42. left: options.x + gUIContext.vp2px(this.paddingLeft),
43. right: options.x + this.width + 2 * gUIContext.vp2px(this.paddingLeft) + gUIContext.vp2px(this.paddingRight),
44. top: options.lineTop,
45. bottom: options.baseline
46. });

48. brush.setColor({
49. alpha: 255,
50. red: 23,
51. green: 169,
52. blue: 141
53. });
54. canvas.attachBrush(brush);
55. // 文字在绘制的矩形里居中
56. canvas.drawTextBlob(textBlob, options.x + 2 * gUIContext.vp2px(this.paddingLeft),
57. options.baseline - gUIContext.vp2px(this.paddingBottom));
58. canvas.detachBrush();
59. }

61. setWord(word: string) {
62. this.word = word;
63. }

65. setPx(px: number) {
66. this.paddingLeft = px;
67. this.paddingRight = px;
68. this.paddingTop = px;
69. this.paddingBottom = px;
70. }

72. width: number = 160;
73. word: string = "drawing";
74. height: number = 10;
75. paddingLeft: number = 0;
76. paddingRight: number = 0;
77. paddingTop: number = 0;
78. paddingBottom: number = 0;
79. wordFontSize: number = 20;
80. }

82. @Entry
83. @Component
84. struct styled_string_set_customspan_demo {
85. customSpan1: MyCustomSpan = new MyCustomSpan("Hello", 80, 10);
86. customSpan2: MyCustomSpan = new MyCustomSpan("World", 80, 40);
87. style: MutableStyledString = new MutableStyledString(this.customSpan1);
88. textController: TextController = new TextController();
89. isPageShow: boolean = true;

91. aboutToAppear() {
92. gUIContext = this.getUIContext();
93. }

95. async onPageShow() {
96. if (!this.isPageShow) {
97. return;
98. }
99. this.isPageShow = false;

101. this.style.appendStyledString(new MutableStyledString("文本绘制 示例代码 CustomSpan", [
102. {
103. start: 0,
104. length: 5,
105. styledKey: StyledStringKey.FONT,
106. styledValue: new TextStyle({ fontColor: Color.Pink })
107. }, {
108. start: 5,
109. length: 5,
110. styledKey: StyledStringKey.FONT,
111. styledValue: new TextStyle({ fontColor: Color.Orange, fontStyle: FontStyle.Italic })
112. }, {
113. start: 10,
114. length: 500,
115. styledKey: StyledStringKey.FONT,
116. styledValue: new TextStyle({ fontColor: Color.Green, fontWeight: FontWeight.Bold })
117. }
118. ]));
119. this.style.appendStyledString(new StyledString(this.customSpan2));
120. this.style.appendStyledString(new StyledString("自定义绘制", [{
121. start: 0,
122. length: 5,
123. styledKey: StyledStringKey.FONT,
124. styledValue: new TextStyle({ fontColor: Color.Green, fontSize: LengthMetrics.px(50) })
125. }]));
126. this.textController.setStyledString(this.style);
127. }

129. build() {
130. Row() {
131. Column() {
132. Text(undefined, { controller: this.textController })
133. .copyOption(CopyOptions.InApp)
134. .fontSize(30)

136. Button("invalidate").onClick(() => {
137. this.customSpan1.setWord("你好");
138. this.customSpan1.invalidate();
139. })
140. }
141. .width('100%')
142. }
143. .height('100%')
144. }
145. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3f/v3/ghJasO9yTSakbpFw7XAZ8A/zh-cn_image_0000002599478665.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=890F988976F0172603D7FE36524FE1226642EFECE771584773C879BF94129CD3)

### 示例7（支持存储自定义扩展信息）

从API version 12开始，该示例通过[UserDataSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#userdataspan)接口实现属性字符串支持存储自定义扩展信息的功能。



```
1. // xxx.ets
2. class MyUserDataSpan extends UserDataSpan {
3. constructor(name: string, age: number) {
4. super();
5. this.name = name;
6. this.age = age;
7. }

9. name: string;
10. age: number;
11. }

13. @Entry
14. @Component
15. struct styled_string_set_userdataspan_demo {
16. @State name: string = "world";
17. @State age: number = 10;
18. controller: TextController = new TextController();
19. styleString: MutableStyledString = new MutableStyledString("hello world", [{
20. start: 0,
21. length: 11,
22. styledKey: StyledStringKey.USER_DATA,
23. styledValue: new MyUserDataSpan("hello", 21)
24. }]);

26. onPageShow(): void {
27. this.controller.setStyledString(this.styleString);
28. }

30. build() {
31. Column() {
32. Text(undefined, { controller: this.controller })
33. Button("get user data").onClick(() => {
34. let arr = this.styleString.getStyles(0, this.styleString.length);
35. let userDataSpan = arr[0].styledValue as MyUserDataSpan;
36. this.name = userDataSpan.name;
37. this.age = userDataSpan.age;
38. })
39. Text("name:" + this.name + "  age: " + this.age)
40. }.width('100%').height(250).padding({ left: 35, right: 35, top: 35 })
41. }
42. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ae/v3/86tZV044TcC1OLuLhQmAOQ/zh-cn_image_0000002568759474.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=EE416CF5219DBC4758FB177FF835D22279B67487555E6E22C727CE1D7349A1BF)

### 示例8（设置超链接）

从API version 14开始，该示例通过[UrlStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#urlstyle14)接口，实现了对属性字符串中超链接设置的支持。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct styled_string_set_urlstyle_demo {
5. urlString: UrlStyle = new UrlStyle("https://www.example.com");
6. mutableStyledString: MutableStyledString = new MutableStyledString("Hello World", [{
7. start: 0,
8. length: "Hello".length,
9. styledKey: StyledStringKey.URL,
10. styledValue: this.urlString
11. }]);
12. controller: TextController = new TextController();

14. async onPageShow() {
15. this.controller.setStyledString(this.mutableStyledString);
16. }

18. build() {
19. Column() {
20. Column() {
21. Text(undefined, { controller: this.controller }).key('mutableStyledString').fontSize(30)
22. }
23. }.width('100%').height(250).padding({ left: 35, right: 35, top: 35 })
24. }
25. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/s1cF1vvlTRKxYODPldhE1g/zh-cn_image_0000002599358717.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=556DAC1BB53E1C0B5994158AC90638EF46AFF4C2060CD39F3385157E53C8FB69)

### 示例9 （给图片设置colorFilter）

从API version 15开始，该示例通过给[ImageAttachment](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentinterface对象说明)设置colorFilter实现了给图像设置颜色滤镜效果。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';
3. import { drawing, common2D } from '@kit.ArkGraphics2D';

5. @Entry
6. @Component
7. struct styled_string_set_image_colorfilter_demo {
8. @State message: string = 'Hello World';
9. mutableStr: MutableStyledString = new MutableStyledString('origin image:');
10. mutableStr2: MutableStyledString = new MutableStyledString('with filter:');
11. controller: TextController = new TextController();
12. controller2: TextController = new TextController();
13. private color: common2D.Color = {
14. alpha: 125,
15. red: 125,
16. green: 125,
17. blue: 255
18. };

20. build() {
21. Row() {
22. Column({ space: 5 }) {
23. Text(undefined, { controller: this.controller })
24. .copyOption(CopyOptions.InApp)
25. .draggable(true)
26. .fontSize(30)
27. .onAppear(() => {
28. this.mutableStr = new MutableStyledString(new ImageAttachment({
29. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
30. resourceValue: $r('app.media.startIcon'),
31. size: { width: 50, height: 50 },
32. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
33. verticalAlign: ImageSpanAlignment.BASELINE,
34. objectFit: ImageFit.Contain,
35. syncLoad: true
36. }));
37. this.controller.setStyledString(this.mutableStr);
38. })
39. Text(undefined, { controller: this.controller2 })
40. .copyOption(CopyOptions.InApp)
41. .draggable(true)
42. .fontSize(30)
43. Button('set image color filter')
44. .onClick(() => {
45. this.mutableStr2 = new MutableStyledString(new ImageAttachment({
46. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
47. resourceValue: $r('app.media.startIcon'),
48. size: { width: 50, height: 50 },
49. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
50. verticalAlign: ImageSpanAlignment.BASELINE,
51. objectFit: ImageFit.Contain,
52. colorFilter: drawing.ColorFilter.createBlendModeColorFilter(this.color, drawing.BlendMode.SRC_IN),
53. syncLoad: true
54. }));
55. this.controller2.setStyledString(this.mutableStr2);
56. })
57. }
58. .width('100%')
59. }
60. .height('100%')
61. }
62. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d7/v3/Id6MRaE1TouW6uW5d6Hfgg/zh-cn_image_0000002568919122.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=0061A354A22EC0B84F596105089BAB23CB04262FB3156289131C8028B6495E80)

### 示例10（属性字符串的插入、删除、替换）

从API version 12开始，该示例通过[subStyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#substyledstring)、[removeString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#removestring)、[removeStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#removestyle)、[clearStyles](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#clearstyles)、[replaceStyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#replacestyledstring)、[insertStyledString](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#insertstyledstring)接口实现属性字符串的插入、删除、替换。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct styled_string_modify_demo {
5. @State message: string = 'Hello World';
6. mutableStr: MutableStyledString = new MutableStyledString('123456', [{
7. start: 0,
8. length: 2,
9. styledKey: StyledStringKey.FONT,
10. styledValue: new TextStyle({ fontColor: Color.Red })
11. }, {
12. start: 0,
13. length: 3,
14. styledKey: StyledStringKey.DECORATION,
15. styledValue: new DecorationStyle({ type: TextDecorationType.LineThrough })
16. }]);
17. mutableStr2: MutableStyledString = new MutableStyledString('with filter:');
18. controller: TextController = new TextController();
19. controller2: TextController = new TextController();

21. build() {
22. Row() {
23. Column({ space: 5 }) {
24. Text(undefined, { controller: this.controller })
25. .copyOption(CopyOptions.InApp)
26. .draggable(true)
27. .fontSize(30)
28. .onAppear(() => {
29. this.controller.setStyledString(this.mutableStr);
30. })
31. Text(undefined, { controller: this.controller2 })
32. .copyOption(CopyOptions.InApp)
33. .draggable(true)
34. .fontSize(30)
35. Button('GetSubStyledString (0,3)').onClick(() => {
36. this.controller2.setStyledString(this.mutableStr.subStyledString(0, 3));
37. })
38. Button('RemoveStyle (0,1,Decoration)').onClick(() => {
39. this.mutableStr.removeStyle(0, 1, StyledStringKey.DECORATION);
40. this.controller.setStyledString(this.mutableStr);
41. })
42. Button('RemoveString (5,1)').onClick(() => {
43. this.mutableStr.removeString(5, 1);
44. this.controller.setStyledString(this.mutableStr);
45. })
46. Button('ClearStyles').onClick(() => {
47. this.mutableStr.clearStyles();
48. this.controller.setStyledString(this.mutableStr);
49. })
50. Button('replaceStyledString').onClick(() => {
51. this.mutableStr.replaceStyledString(3, 1, new StyledString("abc", [{
52. start: 0,
53. length: 3,
54. styledKey: StyledStringKey.FONT,
55. styledValue: new TextStyle({ fontColor: Color.Blue })
56. }]));
57. this.controller.setStyledString(this.mutableStr);
58. })
59. Button('insertStyledString').onClick(() => {
60. this.mutableStr.insertStyledString(4, new StyledString("A"));
61. this.controller.setStyledString(this.mutableStr);
62. })
63. }
64. .width('100%')
65. }
66. .height('100%')
67. }
68. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f6/v3/1IuldW_fTeSztNYvOF3Hug/zh-cn_image_0000002599478667.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=846380C490CB35E7343F9E0EE79048CCEE68203CB4A7FCDA64DDD6ECDEECD523)

### 示例11（属性字符串的文本描边）

从API version 20开始，该示例通过[TextStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyle)设置strokeWidth和strokeColor接口实现属性字符串的文本描边。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct styled_string_strokewidth_strokecolor_demo {
7. @State string1: string = "Hello";
8. spanStyle: SpanStyle = {
9. start: 0,
10. length: 5,
11. styledKey: StyledStringKey.FONT,
12. styledValue: new TextStyle({
13. fontColor: '#ff2787d9',
14. strokeWidth: LengthMetrics.px(-5),
15. strokeColor: Color.Black,
16. fontWeight: FontWeight.Bolder,
17. fontSize: LengthMetrics.px(100)
18. })
19. };
20. spanStyle1: SpanStyle = {
21. start: 0,
22. length: 5,
23. styledKey: StyledStringKey.FONT,
24. styledValue: new TextStyle({
25. fontColor: '#ff2787d9',
26. strokeWidth: LengthMetrics.px(5),
27. strokeColor: Color.Black,
28. fontWeight: FontWeight.Bolder,
29. fontSize: LengthMetrics.px(100)
30. })
31. };

33. mutableStyledString: MutableStyledString = new MutableStyledString(this.string1, []);
34. controller: TextController = new TextController();

36. mutableStyledString1: MutableStyledString = new MutableStyledString(this.string1, []);
37. controller1: TextController = new TextController();

39. async onPageShow() {
40. this.mutableStyledString.setStyle(this.spanStyle)
41. this.controller.setStyledString(this.mutableStyledString);

43. this.mutableStyledString1.setStyle(this.spanStyle1)
44. this.controller1.setStyledString(this.mutableStyledString1);
45. }

47. build() {
48. Column() {
49. // 实心字
50. Text(undefined, { controller: this.controller })
51. .margin({ top: 10, bottom: 50 })
52. .draggable(true)
53. .onDragStart(() => {
54. })
55. // 空心字
56. Text(undefined, { controller: this.controller1 })
57. .margin({ top: 10, bottom: 50 })
58. .draggable(true)
59. .onDragStart(() => {
60. })
61. }
62. .height('100%')
63. .width('100%')
64. }
65. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/hIoozLiFTaGWfkGCial4SA/zh-cn_image_0000002568759476.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=B716BBD227A769AED3C1A2CD22B4628D6B1600F504AE31BF7D9E2980860FEC77)

### 示例12（fromHtml和toHtml互相转换）

该示例通过[fromHtml](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#fromhtml)（从API version 12开始）、[toHtml](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#tohtml14)（从API version 14开始）接口，将HTML中strong、b20+、em20+、i20+、u20+、del20+、s20+、a20+、sub20+、sup20+标签及其style属性中的background-color转换为属性字符串并转回HTML。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct styled_string_html_convert_demo {
5. // 从API version 20开始支持b、em、i、u、del、s、a、sup、sub标签
6. @State html: string = "<p>This is <b>b</b> <strong>strong</strong> <em>em</em> <i>i</i> <u>u</u> <del>del</del> <s>s</s> <span style = \"foreground-color:blue\"> <a href='https://www.example.com'>www.example</a> </span> <span style=\"background-color: red;\">red span</span> <sup>superscript</sup> and <sub>subscript</sub></p>";
7. @State spanString: StyledString | undefined = undefined;
8. @State resultText: string = ""; // 保存结果文本的状态
9. controller: TextController = new TextController;

11. build() {
12. Column() {
13. // 显示转换后的spanString
14. Text(undefined, { controller: this.controller }).height(100)

16. // TextArea显示每个步骤的结果
17. TextArea({ text: this.html })
18. .width("100%")
19. .height(100)
20. .margin(5)

22. // 按钮1:将HTML转换为SpanString
23. Button("Convert HTML to SpanString").onClick(async () => {
24. this.spanString = await StyledString.fromHtml(this.html);
25. this.controller.setStyledString(this.spanString);
26. this.resultText = "Converted HTML to SpanString successfully.";
27. }).margin(5)

29. // 按钮2:将SpanString转换为HTML
30. Button("Convert SpanString to HTML").onClick(() => {
31. if (this.spanString) {
32. // 将spanString转换为HTML并替换当前的HTML状态
33. const newHtml = StyledString.toHtml(this.spanString);
34. if (newHtml !== this.html) { // 通过检查内容是否已经相同来防止重复
35. this.html = newHtml;
36. }
37. this.resultText = "Converted SpanString to HTML successfully.";
38. } else {
39. this.resultText = "SpanString is undefined.";
40. }
41. }).margin(5)

43. // 按钮3:将HTML转换回SpanString
44. Button("Convert HTML back to SpanString").onClick(async () => {
45. this.spanString = await StyledString.fromHtml(this.html);
46. this.controller.setStyledString(this.spanString);
47. this.resultText = "Converted HTML back to SpanString successfully.";
48. }).margin(5)

50. // 重置：重置HTML和SpanString
51. Button("Reset").onClick(() => {
52. this.html = "<p>This is <b>b</b> <strong>strong</strong> <em>em</em> <i>i</i> <u>u</u> <del>del</del> <s>s</s> <span style = \"foreground-color:blue\"> <a href='https://www.example.com'>www.example</a> </span> <span style=\"background-color: red;\">red span</span> <sup>superscript</sup> and <sub>subscript</sub></p>";
53. this.spanString = undefined;
54. this.controller.setStyledString(new StyledString("")); // 使用空的StyledString实例
55. this.resultText = "Reset HTML and SpanString successfully.";
56. }).margin(5)
57. }.width("100%").padding(20)
58. }
59. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/mUuEiLQORyuAFOomzVxkjw/zh-cn_image_0000002599358719.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=20763B24C6CBDDB7DF62390CF7C0ECEBCC843B583FF648E0D41E1F2255638B84)

### 示例13（多装饰线与加粗装饰线）

从API version 20开始，该示例通过[DecorationStyle](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#decorationstyle)中设置enableMultiType、thicknessScale接口，实现多装饰线显示与加粗装饰线的效果。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI'
3. @Entry
4. @Component
5. struct styled_string_set_decorationstyle_demo {
6. @State styledString : StyledString | undefined = undefined
7. controller : TextController = new TextController
8. thickness: number = 2.0
9. mutableStyledString1: MutableStyledString = new MutableStyledString("1234567890", [
10. {
11. start: 0,
12. length: 10,
13. styledKey: StyledStringKey.FONT,
14. styledValue: new TextStyle({ fontColor: Color.Orange, fontSize: LengthMetrics.vp(30) })
15. },
16. {
17. start: 0,
18. length: 4,
19. styledKey: StyledStringKey.DECORATION,
20. styledValue: new DecorationStyle({type: TextDecorationType.LineThrough, thicknessScale: this.thickness}, {enableMultiType: true})
21. },
22. {
23. start: 2,
24. length: 5,
25. styledKey: StyledStringKey.DECORATION,
26. styledValue: new DecorationStyle({type: TextDecorationType.Underline, thicknessScale: this.thickness}, {enableMultiType: true})
27. },
28. {
29. start: 0,
30. length: 4,
31. styledKey: StyledStringKey.DECORATION,
32. styledValue: new DecorationStyle({type: TextDecorationType.Overline, thicknessScale: this.thickness}, {enableMultiType: true})
33. },
34. {
35. start: 6,
36. length: 2,
37. styledKey: StyledStringKey.DECORATION,
38. styledValue: new DecorationStyle({type: TextDecorationType.LineThrough})
39. },
40. {
41. start: 7,
42. length: 2,
43. styledKey: StyledStringKey.DECORATION,
44. styledValue: new DecorationStyle({type: TextDecorationType.LineThrough, color: Color.Green}, {enableMultiType: true})
45. },
46. {
47. start: 8,
48. length: 2,
49. styledKey: StyledStringKey.DECORATION,
50. styledValue: new DecorationStyle({type: TextDecorationType.Overline, color: Color.Green}, {enableMultiType: true})
51. }
52. ]);
53. build() {
54. Column({ space:3 }) {
55. Text(undefined, { controller: this.controller })
56. .height(100)
57. .copyOption(CopyOptions.LocalDevice)
58. .onAppear(()=>{
59. this.styledString = this.mutableStyledString1
60. this.controller.setStyledString(this.mutableStyledString1)
61. })
62. }.width("100%")
63. }
64. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/j5gMXPQlSy2IcUasonapLA/zh-cn_image_0000002568919124.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=78F72574EC229261A5224AA25927382BE5E3451838152054488FF4ACC68ABECD)

### 示例14（获取以vp为单位的图片尺寸）

从API version 21开始，该示例通过[ImageAttachmentInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#imageattachmentinterface对象说明)实现属性字符串设置图片，并且获取该图片以vp为单位的尺寸。



```
1. // xxx.ets
2. import { image } from '@kit.ImageKit';
3. import { LengthMetrics } from '@kit.ArkUI';

5. @Entry
6. @Component
7. struct styled_string_demo4 {
8. @State message: string = "Image info: \n";
9. imagePixelMap: image.PixelMap | undefined = undefined;
10. @State mutableStr: MutableStyledString = new MutableStyledString("");
11. controller: TextController = new TextController();

13. async aboutToAppear() {
14. this.imagePixelMap = await this.getPixmapFromMedia($r('app.media.startIcon'));
15. }

17. private async updateImageInfoStr() {
18. this.message = "Image info: \n";
19. let imageArray = this.mutableStr.getStyles(0, this.mutableStr.length, StyledStringKey.IMAGE);
20. for (let i = 0; i < imageArray.length; ++i) {
21. this.message += (' Image ' + i + ':\n');
22. if (imageArray[i].styledKey === StyledStringKey.IMAGE) {
23. let attachment = imageArray[i].styledValue as ImageAttachment;
24. if (attachment.size !== undefined) {
25. let w: number = attachment.size.width as number;
26. let h: number = attachment.size.height as number;
27. this.message += ('    px size  width = ' + w.toFixed(2) + ' \theight = ' + h.toFixed(2) + '\n');
28. }
29. if (attachment.sizeInVp !== undefined) {
30. let w: number = attachment.sizeInVp.width as number;
31. let h: number = attachment.sizeInVp.height as number;
32. this.message += ('    sizeInVp width = ' + w.toFixed(2) + ' \theight = ' + h.toFixed(2) + '\n\n');
33. }
34. }
35. }
36. }

38. private async getPixmapFromMedia(resource: Resource) {
39. let unit8Array =
40. await this.getUIContext()?.getHostContext()?.resourceManager?.getMediaContent(resource.id);
41. let imageSource = image.createImageSource(unit8Array?.buffer.slice(0, unit8Array.buffer.byteLength));
42. let createPixelMap: image.PixelMap = await imageSource.createPixelMap({
43. desiredPixelFormat: image.PixelMapFormat.RGBA_8888
44. });
45. await imageSource.release();
46. return createPixelMap;
47. }

49. build() {
50. Row() {
51. Column({ space: 5 }) {
52. Text(undefined, { controller: this.controller })
53. .copyOption(CopyOptions.InApp)
54. .draggable(true)
55. .fontSize(30)
56. Button('设置图片 50vp x 50vp')
57. .onClick(() => {
58. if (this.imagePixelMap !== undefined) {
59. this.mutableStr.appendStyledString(new MutableStyledString(new ImageAttachment({
60. value: this.imagePixelMap,
61. size: { width: 50, height: 50 },
62. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
63. verticalAlign: ImageSpanAlignment.BASELINE,
64. objectFit: ImageFit.Contain
65. })));
66. this.controller.setStyledString(this.mutableStr);
67. this.updateImageInfoStr();
68. }
69. }).margin(10)
70. Button('设置图片 70vp x 70vp')
71. .onClick(() => {
72. if (this.imagePixelMap !== undefined) {
73. this.mutableStr.appendStyledString(new MutableStyledString(new ImageAttachment({
74. value: this.imagePixelMap,
75. size: { width: 70, height: 70 },
76. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
77. verticalAlign: ImageSpanAlignment.BASELINE,
78. objectFit: ImageFit.Contain
79. })));
80. this.controller.setStyledString(this.mutableStr);
81. this.updateImageInfoStr();
82. }
83. }).margin(10)
84. Text(this.message).width("80%").padding(30)
85. }
86. .width('100%')
87. }
88. .height('100%')
89. }
90. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3b/v3/oSupoOZoRUCvFp6z2SNLMQ/zh-cn_image_0000002599478669.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=E4A1867E7659B956A7D01D6FE2BED2367CD47CBFD4DB3A6E5F246F959102E99D)

### 示例15（设置段落自定义缩进）

从API version 22开始，该示例通过[LeadingMarginSpan](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#leadingmarginspan22)设置段落缩进，并且自定义缩进图案。



```
1. // xxx.ets
2. import { drawing } from '@kit.ArkGraphics2D';
3. import { LengthMetrics } from '@kit.ArkUI';

5. /**
6. * 实现LeadingMarginSpan
7. */
8. class MyLeadingMarginSpan extends LeadingMarginSpan {
9. text: string = ""

11. constructor(text: string) {
12. super()
13. this.text = text
14. }

16. getText() {
17. return this.text;
18. }

20. // 返回缩进距离
21. getLeadingMargin(): LengthMetrics {
22. console.info("getLeadingMargin")
23. return LengthMetrics.vp(10)
24. }

26. // 回调给开发者行信息，用于canvas绘制
27. onDraw(context: DrawContext, options: LeadingMarginSpanDrawInfo) {
28. console.info("x = " + options.x + options.direction + ", top = " + options.top
29. + ", bottom = " + options.bottom + ", baseline = " + options.baseline
30. + ", direction = " + ", start = " + options.start + ", end = " + options.end + ", first = " + options.first)
31. let canvas = context.canvas;
32. if (!options.first) {
33. return
34. }

36. // 绘制文本符号
37. const font = new drawing.Font();
38. font.setSize(20);
39. const textBlob = drawing.TextBlob.makeFromString(this.text, font, drawing.TextEncoding.TEXT_ENCODING_UTF8);
40. canvas.drawTextBlob(textBlob, options.x - 30, options.top + (options.bottom - options.top) / 2);
41. }
42. }

44. @Entry
45. @Component
46. struct leadingMarginSpanDemo {
47. controller: RichEditorStyledStringController = new RichEditorStyledStringController();
48. options: RichEditorStyledStringOptions = { controller: this.controller };
49. textController: TextController = new TextController();
50. leadingMarginSpan: LeadingMarginSpan = new MyLeadingMarginSpan("●");
51. paragraphStyleAttr2: ParagraphStyle =
52. new ParagraphStyle({ leadingMarginSpan: this.leadingMarginSpan });
53. style: StyledString = new StyledString("段落标题\n段落内容101234567890123456789012345678901234567890123456789",
54. [
55. {
56. start: 0,
57. length: 10,
58. styledKey: StyledStringKey.PARAGRAPH_STYLE,
59. styledValue: this.paragraphStyleAttr2
60. }
61. ]
62. );

64. build() {
65. Column() {
66. Text(undefined, { controller: this.textController })
67. .width("90%")
68. .height("20%")
69. .margin({ top: 10 })
70. .borderWidth(1)
71. .copyOption(CopyOptions.InApp)
72. .draggable(true)

74. RichEditor(this.options)
75. .width("90%")
76. .height("20%")
77. .margin({ top: 10 })
78. .borderWidth(1)
79. Column() {
80. Button('setStyledString')
81. .onClick(() => {
82. this.textController.setStyledString(this.style);
83. this.controller.setStyledString(this.style);
84. }).margin({ top: 10 })
85. // 查询段落样式
86. Button("getStyles")
87. .onClick(() => {
88. let styles = this.style.getStyles(0, this.style.length);
89. if (styles.length == 0) {
90. return
91. }
92. for (let i = 0; i < styles.length; i++) {
93. console.info('getStyles style object start:' + styles[i].start);
94. console.info('getStyles style object length:' + styles[i].length);
95. console.info('getStyles style object key:' + styles[i].styledKey);
96. if (styles[i].styledKey === 200) {
97. let paraAttr = styles[i].styledValue as ParagraphStyle;
98. console.info('getStyles leadingMarginSpan:' + paraAttr.leadingMarginSpan);
99. let leadingMarginSpanClass = paraAttr.leadingMarginSpan as MyLeadingMarginSpan
100. if (leadingMarginSpanClass != null) {
101. console.info('getStyles leadingMarginSpan getText: ' + leadingMarginSpanClass.getText());
102. }
103. }
104. }
105. }).margin({ top: 10 })
106. }
107. }
108. .width('100%')
109. }
110. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/n-FL1512QtOG-SepNdOh1w/zh-cn_image_0000002568759478.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=66C32F5C627B5147AD9F81176DE960BA96C530E6FFA53178F269FF9DC00BF4A5)

### 示例16（使用supportSvg2属性时，SVG图片的显示效果）

从API version 22开始，该示例通过给[ResourceImageAttachmentOptions](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#resourceimageattachmentoptions15)设置supportSvg2属性，使[SVG标签解析能力增强功能](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-image-svg2-capabilities#svg易用性提升)的SVG易用性提升能力生效。



```
1. import { drawing } from '@kit.ArkGraphics2D';
2. import { LengthMetrics } from '@kit.ArkUI';
3. @Entry
4. @Component
5. struct styled_string_process_demo {
6. controller: TextController = new TextController();
7. controller1: TextController = new TextController();
8. imageAttachment: ImageAttachment = new ImageAttachment({
9. // $r("app.media.ice")需要替换为开发者所需的图像资源文件。
10. resourceValue: $r("app.media.ice"),
11. size: { width: 50, height: 50 },
12. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
13. verticalAlign: ImageSpanAlignment.BASELINE,
14. objectFit: ImageFit.Contain,
15. syncLoad: true,
16. supportSvg2: true,
17. colorFilter: drawing.ColorFilter.createBlendModeColorFilter(
18. drawing.Tool.makeColorFromResourceColor(Color.Blue), drawing.BlendMode.SRC_IN)
19. })
20. imageAttachment1: ImageAttachment = new ImageAttachment({
21. // $r("app.media.ice")需要替换为开发者所需的图像资源文件。
22. resourceValue: $r("app.media.ice"),
23. size: { width: 50, height: 50 },
24. layoutStyle: { borderRadius: LengthMetrics.vp(10) },
25. verticalAlign: ImageSpanAlignment.BASELINE,
26. objectFit: ImageFit.Contain,
27. syncLoad: true,
28. supportSvg2: false,
29. colorFilter: drawing.ColorFilter.createBlendModeColorFilter(
30. drawing.Tool.makeColorFromResourceColor(Color.Blue), drawing.BlendMode.SRC_IN)
31. })
32. scroller: Scroller = new Scroller();
33. mutableStr: MutableStyledString = new MutableStyledString('');
34. mutableStr1: MutableStyledString = new MutableStyledString('');
35. aboutToAppear() {
36. this.mutableStr = new MutableStyledString(this.imageAttachment);
37. this.controller.setStyledString(this.mutableStr);
38. this.mutableStr1 = new MutableStyledString(this.imageAttachment1);
39. this.controller1.setStyledString(this.mutableStr1);
40. }

42. build() {
43. Column() {
44. Scroll(this.scroller) {
45. Column() {
46. Text('属性字符串不支持svg2')
47. Text(undefined, { controller: this.controller1 })
48. .draggable(true)
49. .fontSize(30)
50. Text('属性字符串支持svg2')
51. Text(undefined, { controller: this.controller })
52. .draggable(true)
53. .fontSize(30)
54. }.width('100%')
55. }
56. }
57. .width('100%')
58. }
59. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/a0JnuEcwRVyuGAI7ojIGHA/zh-cn_image_0000002599478657.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=28886335E93F7E96FFA76D02E35C5F0A0C6700170889DC6E4F5A5305909106D5)

### 示例17（设置字体配置）

该示例通过[TextStyleInterface](/consumer/cn/doc/harmonyos-references/ts-universal-styled-string#textstyleinterface对象说明)中的[fontConfigs](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#fontconfigs24对象说明)实现属性字符串的字体配置。

从API version 24开始，TextStyleInterface新增fontConfigs属性。



```
1. // xxx.ets
2. import { LengthMetrics } from '@kit.ArkUI';

4. @Entry
5. @Component
6. struct StyledStringFontConfigsDemo {
7. controller1: TextController = new TextController();
8. controller2: TextController = new TextController();
9. scroller: Scroller = new Scroller();

11. aboutToAppear() {
12. // 示例1：启用可变字重
13. let textStyle1: TextStyle = new TextStyle({
14. fontColor: Color.Gray,
15. fontSize: LengthMetrics.vp(18)
16. });
17. let styledString1: MutableStyledString = new MutableStyledString('StyledString with FontConfigs: ', [{
18. start: 0,
19. length: 30,
20. styledKey: StyledStringKey.FONT,
21. styledValue: textStyle1
22. }]);
23. // 为"字体粗细850"这段文本设置字体配置
24. let textStyle2: TextStyle = new TextStyle({
25. fontColor: Color.Blue,
26. fontSize: LengthMetrics.vp(24),
27. fontWeight: 850,
28. fontConfigs: {
29. fontWeightConfigs: {
30. enableVariableFontWeight: true
31. }
32. }
33. });
34. let styledString2: StyledString = new StyledString('字体粗细850', [{
35. start: 0,
36. length: 7,
37. styledKey: StyledStringKey.FONT,
38. styledValue: textStyle2
39. }]);
40. styledString1.appendStyledString(styledString2);
41. this.controller1.setStyledString(styledString1);

43. // 示例2：禁用设备字体粗细级别自动更新
44. let textStyle3: TextStyle = new TextStyle({
45. fontColor: Color.Gray,
46. fontSize: LengthMetrics.vp(18)
47. });
48. let styledString3: MutableStyledString = new MutableStyledString('禁用跟随设备字重级别更新: ', [{
49. start: 0,
50. length: 12,
51. styledKey: StyledStringKey.FONT,
52. styledValue: textStyle3
53. }]);
54. let textStyle4: TextStyle = new TextStyle({
55. fontColor: Color.Blue,
56. fontSize: LengthMetrics.vp(24),
57. fontWeight: 600,
58. fontConfigs: {
59. fontWeightConfigs: {
60. enableDeviceFontWeightCategory: false
61. }
62. }
63. });
64. let styledString4: StyledString = new StyledString('字体粗细600', [{
65. start: 0,
66. length: 7,
67. styledKey: StyledStringKey.FONT,
68. styledValue: textStyle4
69. }]);
70. styledString3.appendStyledString(styledString4);
71. this.controller2.setStyledString(styledString3);
72. }

74. build() {
75. Scroll(this.scroller) {
76. Column() {
77. Text('示例1：启用可变字体粗细调节，支持设置字体粗细为非整百')
78. .fontSize(16)
79. .margin({ bottom: 5 })

81. Text(undefined, { controller: this.controller1 })
82. .fontSize(20)
83. .margin({ bottom: 20 })

85. Text('示例2：设置文本字体粗细不跟随设备字重级别自动更新')
86. .fontSize(16)
87. .margin({ bottom: 5 })

89. Text(undefined, { controller: this.controller2 })
90. .fontSize(20)
91. }
92. .width('100%')
93. .padding(20)
94. }
95. .width('100%')
96. }
97. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/DnCV-geHQre3-FIbieJYeA/zh-cn_image_0000002599358721.png?HW-CC-KV=V1&HW-CC-Date=20260511T034827Z&HW-CC-Expire=86400&HW-CC-Sign=812A073835A713B62EFCAB13331D06CED142F76BFB5847BCAE39DE62EEC45215)