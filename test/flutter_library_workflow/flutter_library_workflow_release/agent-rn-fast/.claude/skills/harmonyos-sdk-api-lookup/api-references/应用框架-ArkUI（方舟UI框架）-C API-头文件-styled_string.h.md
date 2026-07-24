## 概述

PhonePC/2in1TabletTVWearable

在Native侧定义[组件类型](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype)为ARKUI\_NODE\_TEXT的组件的文本样式和文本布局管理器。

**引用文件：** <arkui/styled\_string.h>

**库：** libace\_ndk.z.so

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**相关示例：** [StyledStringSample](https://gitcode.com/HarmonyOS_Samples/guide-snippets/tree/master/ArkUISample/StyledStringSample)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring) | ArkUI\_StyledString | 定义文本组件支持的格式化字符串数据对象。 |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle) | OH\_ArkUI\_SpanStyle | 定义属性字符串样式对象。  可以通过[OH\_ArkUI\_SpanStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_create)接口创建对应的属性字符串样式对象。  可以通过[OH\_ArkUI\_SpanStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_destroy)接口销毁属性字符串样式对象。  对象创建后通过[OH\_ArkUI\_SpanStyle\_SetStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setstart)和[OH\_ArkUI\_SpanStyle\_SetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlength)指定样式作用的范围。  对象创建后通过OH\_ArkUI\_SpanStyle\_SetXXXStyle系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_SpanStyle\_SetTextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_settextstyle)设置字体样式效果。 |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment) | OH\_ArkUI\_ImageAttachment | 定义图片样式对象。  可以通过[OH\_ArkUI\_ImageAttachment\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_create)接口创建对应的图片样式对象。  可以通过[OH\_ArkUI\_ImageAttachment\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_destroy)接口销毁图片样式对象。  对象创建后通过OH\_ArkUI\_ImageAttachment\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_ImageAttachment\_SetPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setpixelmap)设置图片源。 |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan) | OH\_ArkUI\_CustomSpan | 定义自定义绘制Span。  可以通过[OH\_ArkUI\_CustomSpan\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_create)接口创建对应的自定义绘制Span对象。  可以通过[OH\_ArkUI\_CustomSpan\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_destroy)接口销毁自定义绘制Span对象。  对象创建后通过[OH\_ArkUI\_CustomSpan\_RegisterOnMeasureCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registeronmeasurecallback)和[OH\_ArkUI\_CustomSpan\_RegisterOnDrawCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registerondrawcallback)接口注册绘制回调函数。 |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle) | OH\_ArkUI\_TextStyle | 定义文本字体样式。  可以通过[OH\_ArkUI\_TextStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_create)接口创建对应的文本字体样式对象。  可以通过[OH\_ArkUI\_TextStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_destroy)接口销毁文本字体样式对象。  对象创建后通过OH\_ArkUI\_TextStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_TextStyle\_SetFontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontcolor)设置字体颜色。 |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle) | OH\_ArkUI\_ParagraphStyle | 定义段落样式。  可以通过[OH\_ArkUI\_ParagraphStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_create)接口创建对应的段落样式对象。  可以通过[OH\_ArkUI\_ParagraphStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_destroy)接口销毁段落样式对象。  对象创建后通过OH\_ArkUI\_ParagraphStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_ParagraphStyle\_SetTextAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextalign)设置文本对齐方式。 |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle) | OH\_ArkUI\_GestureStyle | 定义事件手势样式。  可以通过[OH\_ArkUI\_GestureStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_create)接口创建对应的事件手势样式对象。  可以通过[OH\_ArkUI\_GestureStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_destroy)接口销毁事件手势样式对象。  对象创建后通过OH\_ArkUI\_GestureStyle\_RegisterOnXXXCallback系列接口注册具体的事件回调，例如通过[OH\_ArkUI\_GestureStyle\_RegisterOnClickCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_registeronclickcallback)注册点击事件回调。 |
| [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle) | OH\_ArkUI\_TextShadowStyle | 定义文本阴影样式。  可以通过[OH\_ArkUI\_TextShadowStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_create)接口创建对应的文本阴影样式对象。  可以通过[OH\_ArkUI\_TextShadowStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_destroy)接口销毁文本阴影样式对象。  对象创建后通过[OH\_ArkUI\_TextShadowStyle\_SetTextShadow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_settextshadow)接口设置生效的具体样式。 |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle) | OH\_ArkUI\_DecorationStyle | 定义文本装饰线样式。  可以通过[OH\_ArkUI\_DecorationStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_create)接口创建对应的文本装饰线样式对象。  可以通过[OH\_ArkUI\_DecorationStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_destroy)接口销毁文本装饰线样式对象。  对象创建后通过OH\_ArkUI\_DecorationStyle\_SetXXX系列接口设置生效的具体样式，例如通过[OH\_ArkUI\_DecorationStyle\_SetTextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_settextdecorationtype)设置装饰线类型。 |
| [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle) | OH\_ArkUI\_BaselineOffsetStyle | 定义基线偏移量样式。  可以通过[OH\_ArkUI\_BaselineOffsetStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_create)接口创建对应的基线偏移量样式对象。  可以通过[OH\_ArkUI\_BaselineOffsetStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_destroy)接口销毁基线偏移量样式对象。  对象创建后通过[OH\_ArkUI\_BaselineOffsetStyle\_SetBaselineOffset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_setbaselineoffset)接口设置具体的基线偏移量值。 |
| [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle) | OH\_ArkUI\_LetterSpacingStyle | 定义字符间距样式。  可以通过[OH\_ArkUI\_LetterSpacingStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_create)接口创建对应的字符间距样式对象。  可以通过[OH\_ArkUI\_LetterSpacingStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_destroy)接口销毁字符间距样式对象。  对象创建后通过[OH\_ArkUI\_LetterSpacingStyle\_SetLetterSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_setletterspacing)接口设置具体的字符间距值。 |
| [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle) | OH\_ArkUI\_LineHeightStyle | 定义行高样式。  可以通过[OH\_ArkUI\_LineHeightStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_create)接口创建对应的行高样式对象。  可以通过[OH\_ArkUI\_LineHeightStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_destroy)接口销毁行高样式对象。  对象创建后通过[OH\_ArkUI\_LineHeightStyle\_SetLineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_setlineheight)接口设置具体的固定行高值。 |
| [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle) | OH\_ArkUI\_UrlStyle | 定义超链接样式。  可以通过[OH\_ArkUI\_UrlStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_create)接口创建对应的超链接样式对象。  可以通过[OH\_ArkUI\_UrlStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_destroy)接口销毁超链接样式对象。  对象创建后通过[OH\_ArkUI\_UrlStyle\_SetUrl](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_seturl)接口设置链接地址。 |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle) | OH\_ArkUI\_BackgroundColorStyle | 定义背景颜色样式。  可以通过[OH\_ArkUI\_BackgroundColorStyle\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_create)接口创建对应的背景颜色样式对象。  可以通过[OH\_ArkUI\_BackgroundColorStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_destroy)接口销毁背景颜色样式对象。  对象创建后通过[OH\_ArkUI\_BackgroundColorStyle\_SetColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_setcolor)和[OH\_ArkUI\_BackgroundColorStyle\_SetRadius](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_setradius)接口设置背景颜色和圆角。 |
| [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan) | OH\_ArkUI\_UserDataSpan | 定义用户数据Span样式。  可以通过[OH\_ArkUI\_UserDataSpan\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_create)接口创建对应的用户数据Span样式对象。  可以通过[OH\_ArkUI\_UserDataSpan\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_destroy)接口销毁用户数据Span样式对象。  对象创建后通过[OH\_ArkUI\_UserDataSpan\_SetUserData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_setuserdata)接口绑定用户数据。 |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo) | OH\_ArkUI\_LeadingMarginSpanDrawInfo | 定义段落缩进的自定义绘制信息。  可以通过[OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_create)接口创建对应的段落缩进的自定义绘制信息对象。  可以通过[OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_destroy)接口销毁段落缩进的自定义绘制信息对象。  对象用于在[OH\_ArkUI\_ParagraphStyle\_RegisterOnDrawLeadingMarginCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_registerondrawleadingmargincallback)注册的回调函数中，提供当前行的绘制上下文信息。 |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager) | ArkUI\_TextLayoutManager | 定义文本布局管理器对象。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_ArkUI\_StyledStringKey](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey) | OH\_ArkUI\_StyledStringKey | 属性字符串的属性类型枚举。 |
| [OH\_ArkUI\_SuperscriptStyle](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_superscriptstyle) | OH\_ArkUI\_SuperscriptStyle | 定义文本上下角标样式枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\* OH\_ArkUI\_StyledString\_Create(OH\_Drawing\_TypographyStyle\* style, OH\_Drawing\_FontCollection\* collection)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_create) | 创建指向ArkUI\_StyledString对象的指针。 |
| [void OH\_ArkUI\_StyledString\_Destroy(ArkUI\_StyledString\* handle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_destroy) | 释放被ArkUI\_StyledString对象占据的内存。 |
| [void OH\_ArkUI\_StyledString\_PushTextStyle(ArkUI\_StyledString\* handle, OH\_Drawing\_TextStyle\* style)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_pushtextstyle) | 将新的排版风格设置到当前格式化字符串样式栈顶。 |
| [void OH\_ArkUI\_StyledString\_AddText(ArkUI\_StyledString\* handle, const char\* content)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_addtext) | 基于当前格式化字符串样式设置对应的文本内容。 |
| [void OH\_ArkUI\_StyledString\_PopTextStyle(ArkUI\_StyledString\* handle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_poptextstyle) | 将当前格式化字符串对象中栈顶样式出栈。 |
| [OH\_Drawing\_Typography\* OH\_ArkUI\_StyledString\_CreateTypography(ArkUI\_StyledString\* handle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_createtypography) | 基于格式字符串对象创建指向[OH\_Drawing\_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)对象的指针，用于提前进行文本测算排版。[OH\_Drawing\_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)对象的生命周期由应用管理，当应用销毁该对象时，应同步调用[NODE\_TEXT\_CONTENT\_WITH\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h-nodeattributetype-text#node_text_content_with_styled_string)对应的reset方法进行置空，避免野指针崩溃风险。 |
| [void OH\_ArkUI\_StyledString\_AddPlaceholder(ArkUI\_StyledString\* handle, OH\_Drawing\_PlaceholderSpan\* placeholder)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_addplaceholder) | 设置占位符。 |
| [ArkUI\_StyledString\_Descriptor\* OH\_ArkUI\_StyledString\_Descriptor\_Create(void)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_create) | 创建属性字符串数据对象。 |
| [void OH\_ArkUI\_StyledString\_Descriptor\_Destroy(ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_destroy) | 释放被[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象占据的内存。 |
| [int32\_t OH\_ArkUI\_UnmarshallStyledStringDescriptor(uint8\_t\* buffer, size\_t bufferSize, ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_unmarshallstyledstringdescriptor) | 将包含属性字符串信息的字节数组反序列化为属性字符串。 |
| [int32\_t OH\_ArkUI\_MarshallStyledStringDescriptor(uint8\_t\* buffer, size\_t bufferSize, ArkUI\_StyledString\_Descriptor\* descriptor, size\_t\* resultSize)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_marshallstyledstringdescriptor) | 将属性字符串信息序列化为字节数组。 |
| [const char\* OH\_ArkUI\_ConvertToHtml(ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_converttohtml) | 将属性字符串信息转换成html。 |
| [ArkUI\_StyledString\_Descriptor\* OH\_ArkUI\_StyledString\_Descriptor\_CreateWithString(const char\* value, const OH\_ArkUI\_SpanStyle\*\* styles, int32\_t length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_createwithstring) | 创建纯文本内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。 |
| [ArkUI\_StyledString\_Descriptor\* OH\_ArkUI\_StyledString\_Descriptor\_CreateWithImageAttachment(const OH\_ArkUI\_ImageAttachment\* value)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_createwithimageattachment) | 创建图片内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。 |
| [ArkUI\_StyledString\_Descriptor\* OH\_ArkUI\_StyledString\_Descriptor\_CreateWithCustomSpan(const OH\_ArkUI\_CustomSpan\* value)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_createwithcustomspan) | 创建自定义绘制Span内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_GetLength(const ArkUI\_StyledString\_Descriptor\* descriptor, int32\_t\* length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_getlength) | 获取属性字符串的字符长度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_GetString(const ArkUI\_StyledString\_Descriptor\* descriptor, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_getstring) | 获取属性字符串的文本内容。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_IsEqual(const ArkUI\_StyledString\_Descriptor\* firstDescriptor, const ArkUI\_StyledString\_Descriptor\* secondDescriptor, bool\* isEqual)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_isequal) | 判断两个属性字符串是否相同。当属性字符串的文本及样式均一致，视为相同。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_SubStyledString(const ArkUI\_StyledString\_Descriptor\* descriptor, ArkUI\_StyledString\_Descriptor\* subDescriptor, uint32\_t start, uint32\_t length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_substyledstring) | 获取属性字符串的子属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_GetStyles(const ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, uint32\_t length, OH\_ArkUI\_StyledStringKey styledKey, OH\_ArkUI\_SpanStyle\*\* styles, uint32\_t stylesSize, uint32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_getstyles) | 获取属性字符串指定范围内的样式集合。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_FromHtml(ArkUI\_StyledString\_Descriptor\* descriptor, const char\* html)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_fromhtml) | 将HTML格式字符串转换成属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_ReplaceString(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, uint32\_t length, const char\* string)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_replacestring) | 替换属性字符串指定范围的文本。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_InsertString(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, const char\* string)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_insertstring) | 在属性字符串的指定位置插入文本。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_RemoveString(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, uint32\_t length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_removestring) | 移除属性字符串指定范围的文本。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_ReplaceStyle(ArkUI\_StyledString\_Descriptor\* descriptor, const OH\_ArkUI\_SpanStyle\* spanStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_replacestyle) | 替换属性字符串指定范围内的样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_SetStyle(ArkUI\_StyledString\_Descriptor\* descriptor, const OH\_ArkUI\_SpanStyle\* spanStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_setstyle) | 为属性字符串指定范围设置新样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_RemoveStyle(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, uint32\_t length, OH\_ArkUI\_StyledStringKey styledKey)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_removestyle) | 清除属性字符串指定范围内容的指定类型样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_ClearStyles(ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_clearstyles) | 清除属性字符串对象的所有样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_ReplaceStyledString(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, uint32\_t length, const ArkUI\_StyledString\_Descriptor\* other)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_replacestyledstring) | 替换指定范围的属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_InsertStyledString(ArkUI\_StyledString\_Descriptor\* descriptor, uint32\_t start, const ArkUI\_StyledString\_Descriptor\* other)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_insertstyledstring) | 在属性字符串的指定位置插入新的属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_AppendStyledString(ArkUI\_StyledString\_Descriptor\* descriptor, const ArkUI\_StyledString\_Descriptor\* other)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_appendstyledstring) | 在属性字符串的末尾追加新的属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_StyledString\_Descriptor\_InvalidateCustomSpan(const ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_invalidatecustomspan) | 主动刷新属性字符串中的自定义绘制Span。 |
| [OH\_ArkUI\_TextStyle\* OH\_ArkUI\_TextStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_create) | 创建[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象。 |
| [void OH\_ArkUI\_TextStyle\_Destroy(OH\_ArkUI\_TextStyle\* textStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_destroy) | 释放[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetFontColor(OH\_ArkUI\_TextStyle\* textStyle, uint32\_t fontColor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontcolor) | 设置文本字体样式中的字体颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetFontColor(const OH\_ArkUI\_TextStyle\* textStyle, uint32\_t\* fontColor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getfontcolor) | 获取文本字体样式中的字体颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetFontFamily(OH\_ArkUI\_TextStyle\* textStyle, const char\* fontFamily)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontfamily) | 设置文本字体样式中的字体族。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetFontFamily(const OH\_ArkUI\_TextStyle\* textStyle, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getfontfamily) | 获取文本字体样式中的字体族。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetFontSize(OH\_ArkUI\_TextStyle\* textStyle, float fontSize)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontsize) | 设置文本字体样式中的字体大小。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetFontSize(const OH\_ArkUI\_TextStyle\* textStyle, float\* fontSize)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getfontsize) | 获取文本字体样式中的字体大小。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetFontWeight(OH\_ArkUI\_TextStyle\* textStyle, uint32\_t fontWeight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontweight) | 设置文本字体样式中的字体粗细。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetFontWeight(const OH\_ArkUI\_TextStyle\* textStyle, uint32\_t\* fontWeight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getfontweight) | 获取文本字体样式中的字体粗细。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetFontStyle(OH\_ArkUI\_TextStyle\* textStyle, ArkUI\_FontStyle fontStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setfontstyle) | 设置文本字体样式中的字体风格。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetFontStyle(const OH\_ArkUI\_TextStyle\* textStyle, ArkUI\_FontStyle\* fontStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getfontstyle) | 获取文本字体样式中的字体风格。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetStrokeWidth(OH\_ArkUI\_TextStyle\* textStyle, float strokeWidth)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setstrokewidth) | 设置文本字体样式中的描边宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetStrokeWidth(const OH\_ArkUI\_TextStyle\* textStyle, float\* strokeWidth)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getstrokewidth) | 获取文本字体样式中的描边宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetStrokeColor(OH\_ArkUI\_TextStyle\* textStyle, uint32\_t strokeColor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setstrokecolor) | 设置文本字体样式中的描边颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetStrokeColor(const OH\_ArkUI\_TextStyle\* textStyle, uint32\_t\* strokeColor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getstrokecolor) | 获取文本字体样式中的描边颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_SetSuperscript(OH\_ArkUI\_TextStyle\* textStyle, OH\_ArkUI\_SuperscriptStyle superscript)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_setsuperscript) | 设置文本字体样式中的上下标样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextStyle\_GetSuperscript(const OH\_ArkUI\_TextStyle\* textStyle, OH\_ArkUI\_SuperscriptStyle\* superscript)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_getsuperscript) | 获取文本字体样式中的上下标样式。 |
| [OH\_ArkUI\_SpanStyle\* OH\_ArkUI\_SpanStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_create) | 创建[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象。 |
| [void OH\_ArkUI\_SpanStyle\_Destroy(OH\_ArkUI\_SpanStyle\* spanStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_destroy) | 释放[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetStyledKey(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_StyledStringKey\* styledKey)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getstyledkey) | 获取属性字符串样式对象的样式类型。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetStart(OH\_ArkUI\_SpanStyle\* spanStyle, int32\_t start)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setstart) | 设置属性字符串样式对象的起始位置。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetStart(const OH\_ArkUI\_SpanStyle\* spanStyle, int32\_t\* start)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getstart) | 获取属性字符串样式对象的起始位置。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetLength(OH\_ArkUI\_SpanStyle\* spanStyle, int32\_t length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlength) | 设置属性字符串样式对象的长度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetLength(const OH\_ArkUI\_SpanStyle\* spanStyle, int32\_t\* length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getlength) | 获取属性字符串样式对象的长度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetTextStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_TextStyle\* textStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_settextstyle) | 设置属性字符串样式对象的文本字体样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetTextStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_TextStyle\* textStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_gettextstyle) | 获取属性字符串样式对象的文本字体样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetParagraphStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_ParagraphStyle\* paragraphStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setparagraphstyle) | 设置属性字符串样式对象的段落样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetParagraphStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_ParagraphStyle\* paragraphStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getparagraphstyle) | 获取属性字符串样式对象的段落样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetGestureStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_GestureStyle\* gestureStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setgesturestyle) | 设置属性字符串样式对象的事件手势样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetGestureStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_GestureStyle\* gestureStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getgesturestyle) | 获取属性字符串样式对象的事件手势样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetTextShadowStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_TextShadowStyle\* textShadowStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_settextshadowstyle) | 设置属性字符串样式对象的文本阴影样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetTextShadowStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_TextShadowStyle\* textShadowStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_gettextshadowstyle) | 获取属性字符串样式对象的文本阴影样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetDecorationStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_DecorationStyle\* decorationStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setdecorationstyle) | 设置属性字符串样式对象的文本装饰线样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetDecorationStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_DecorationStyle\* decorationStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getdecorationstyle) | 获取属性字符串样式对象的文本装饰线样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetBaselineOffsetStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_BaselineOffsetStyle\* baselineOffsetStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setbaselineoffsetstyle) | 设置属性字符串样式对象的基线偏移量样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetBaselineOffsetStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_BaselineOffsetStyle\* baselineOffsetStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getbaselineoffsetstyle) | 获取属性字符串样式对象的基线偏移量样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetLetterSpacingStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_LetterSpacingStyle\* letterSpacingStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setletterspacingstyle) | 设置属性字符串样式对象的字符间距样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetLetterSpacingStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_LetterSpacingStyle\* letterSpacingStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getletterspacingstyle) | 获取属性字符串样式对象的字符间距样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetLineHeightStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_LineHeightStyle\* lineHeightStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlineheightstyle) | 设置属性字符串样式对象的行高样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetLineHeightStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_LineHeightStyle\* lineHeightStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getlineheightstyle) | 获取属性字符串样式对象的行高样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetUrlStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_UrlStyle\* urlStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_seturlstyle) | 设置属性字符串样式对象的超链接样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetUrlStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_UrlStyle\* urlStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_geturlstyle) | 获取属性字符串样式对象的超链接样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetBackgroundColorStyle(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_BackgroundColorStyle\* backgroundColorStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setbackgroundcolorstyle) | 设置属性字符串样式对象的背景颜色样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetBackgroundColorStyle(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_BackgroundColorStyle\* backgroundColorStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getbackgroundcolorstyle) | 获取属性字符串样式对象的背景颜色样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetUserDataSpan(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_UserDataSpan\* userDataSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setuserdataspan) | 设置属性字符串样式对象的用户数据Span样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetUserDataSpan(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_UserDataSpan\* userDataSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getuserdataspan) | 获取属性字符串样式对象的用户数据Span样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetCustomSpan(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_CustomSpan\* customSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setcustomspan) | 设置属性字符串样式对象的自定义绘制Span样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetCustomSpan(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_CustomSpan\* customSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getcustomspan) | 获取属性字符串样式对象的自定义绘制Span样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_SetImageAttachment(OH\_ArkUI\_SpanStyle\* spanStyle, const OH\_ArkUI\_ImageAttachment\* imageAttachment)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setimageattachment) | 设置属性字符串样式对象的图片样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_SpanStyle\_GetImageAttachment(const OH\_ArkUI\_SpanStyle\* spanStyle, OH\_ArkUI\_ImageAttachment\* imageAttachment)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_getimageattachment) | 获取属性字符串样式对象的图片样式。 |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo\* OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_create) | 创建[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象。 |
| [void OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Destroy(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_destroy) | 释放[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetX(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float x)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setx) | 设置段落缩进的自定义绘制信息对象中当前行相对于组件的水平偏移。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetX(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float\* x)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getx) | 获取段落缩进的自定义绘制信息对象中当前行相对于组件的水平偏移。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetTop(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float top)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_settop) | 设置段落缩进的自定义绘制信息对象中行顶与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetTop(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float\* top)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_gettop) | 获取段落缩进的自定义绘制信息对象中行顶与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetBottom(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float bottom)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setbottom) | 设置段落缩进的自定义绘制信息对象中行底与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetBottom(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float\* bottom)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getbottom) | 获取段落缩进的自定义绘制信息对象中行底与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetBaseline(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float baseline)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setbaseline) | 设置段落缩进的自定义绘制信息对象中当前行的基线与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetBaseline(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, float\* baseline)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getbaseline) | 获取段落缩进的自定义绘制信息对象中当前行的基线与组件上边缘的距离。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetTextDirection(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, ArkUI\_TextDirection direction)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_settextdirection) | 设置段落缩进的自定义绘制信息对象中文本内容的方向。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetTextDirection(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, ArkUI\_TextDirection\* direction)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_gettextdirection) | 获取段落缩进的自定义绘制信息对象中文本内容的方向。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetStart(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, uint32\_t start)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setstart) | 设置段落缩进的自定义绘制信息对象中当前行的起始索引。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetStart(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, uint32\_t\* start)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getstart) | 获取段落缩进的自定义绘制信息对象中当前行的起始索引。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetEnd(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, uint32\_t end)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setend) | 设置段落缩进的自定义绘制信息对象中当前行的结束索引。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetEnd(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, uint32\_t\* end)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getend) | 获取段落缩进的自定义绘制信息对象中当前行的结束索引。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetFirst(OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, bool first)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_setfirst) | 设置段落缩进的自定义绘制信息对象中当前行是否为段落的首行。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetFirst(const OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo, bool\* first)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_getfirst) | 获取段落缩进的自定义绘制信息对象中当前行是否为段落的首行。 |
| [OH\_ArkUI\_ParagraphStyle\* OH\_ArkUI\_ParagraphStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_create) | 创建[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象。 |
| [void OH\_ArkUI\_ParagraphStyle\_Destroy(OH\_ArkUI\_ParagraphStyle\* paragraphStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_destroy) | 释放[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetTextAlign(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextAlignment align)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextalign) | 设置段落样式中的水平方向的文本对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetTextAlign(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextAlignment\* align)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_gettextalign) | 获取段落样式中的水平方向的文本对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetTextIndent(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, float textIndent)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextindent) | 设置段落样式中的首行文本缩进。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetTextIndent(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, float\* textIndent)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_gettextindent) | 获取段落样式中的首行文本缩进。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetMaxLines(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, int32\_t maxLines)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setmaxlines) | 设置段落样式中的最大行数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetMaxLines(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, int32\_t\* maxLines)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getmaxlines) | 获取段落样式中的最大行数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetOverflow(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextOverflow overflow)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setoverflow) | 设置段落样式中的段落超长时的显示方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetOverflow(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextOverflow\* overflow)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getoverflow) | 获取段落样式中的段落超长时的显示方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetWordBreak(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_WordBreak wordBreak)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setwordbreak) | 设置段落样式中的断行规则。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetWordBreak(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_WordBreak\* wordBreak)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getwordbreak) | 获取段落样式中的断行规则。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginPixelMap(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, struct OH\_PixelmapNative\* pixelmap)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setleadingmarginpixelmap) | 设置段落样式中的段落缩进的像素图。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginPixelMap(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, struct OH\_PixelmapNative\*\* pixelmap)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getleadingmarginpixelmap) | 获取段落样式中的段落缩进的像素图。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginWidth(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t width)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setleadingmarginwidth) | 设置段落样式中的段落缩进宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginWidth(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t\* width)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getleadingmarginwidth) | 获取段落样式中的段落缩进宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginHeight(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t height)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setleadingmarginheight) | 设置段落样式中的段落缩进高度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginHeight(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t\* height)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getleadingmarginheight) | 获取段落样式中的段落缩进高度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetParagraphSpacing(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t paragraphSpacing)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_setparagraphspacing) | 设置段落样式中的段落间距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetParagraphSpacing(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, uint32\_t\* paragraphSpacing)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_getparagraphspacing) | 获取段落样式中的段落间距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetTextVerticalAlign(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextVerticalAlignment verticalAlignment)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextverticalalign) | 设置段落样式中的垂直方向的文本对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetTextVerticalAlign(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextVerticalAlignment\* verticalAlignment)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_gettextverticalalign) | 获取段落样式中的垂直方向的文本对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_RegisterOnDrawLeadingMarginCallback(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, void(\*onDraw)(ArkUI\_DrawContext\* context, OH\_ArkUI\_LeadingMarginSpanDrawInfo\* drawInfo))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_registerondrawleadingmargincallback) | 设置段落样式中绘制段落缩进时触发的回调函数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_RegisterOnGetLeadingMarginCallback(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, float(\*leadingMargin)())](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_registerongetleadingmargincallback) | 设置段落样式中获取段落缩进距离时触发的回调函数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_SetTextDirection(OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextDirection textDirection)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_settextdirection) | 设置段落样式中的文本方向。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ParagraphStyle\_GetTextDirection(const OH\_ArkUI\_ParagraphStyle\* paragraphStyle, ArkUI\_TextDirection\* textDirection)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_gettextdirection) | 获取段落样式中的文本方向。 |
| [OH\_ArkUI\_GestureStyle\* OH\_ArkUI\_GestureStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_create) | 创建[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象。 |
| [void OH\_ArkUI\_GestureStyle\_Destroy(OH\_ArkUI\_GestureStyle\* gestureStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_destroy) | 释放[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_GestureStyle\_RegisterOnClickCallback(OH\_ArkUI\_GestureStyle\* gestureStyle, void(\*onClick)(ArkUI\_NodeEvent\*))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_registeronclickcallback) | 设置事件手势样式中的点击事件回调。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_GestureStyle\_RegisterOnLongPressCallback(OH\_ArkUI\_GestureStyle\* gestureStyle, void(\*onLongPress)(ArkUI\_GestureEvent\*))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_registeronlongpresscallback) | 设置事件手势样式中的长按事件回调。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_GestureStyle\_RegisterOnTouchCallback(OH\_ArkUI\_GestureStyle\* gestureStyle, void(\*onTouch)(ArkUI\_NodeEvent\*))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_registerontouchcallback) | 设置事件手势样式中的触摸事件回调。 |
| [OH\_ArkUI\_TextShadowStyle\* OH\_ArkUI\_TextShadowStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_create) | 创建[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象。 |
| [void OH\_ArkUI\_TextShadowStyle\_Destroy(OH\_ArkUI\_TextShadowStyle\* textShadowStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_destroy) | 释放[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextShadowStyle\_SetTextShadow(OH\_ArkUI\_TextShadowStyle\* textShadowStyle, const OH\_ArkUI\_ShadowOptions\*\* options, uint32\_t length)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_settextshadow) | 设置文本阴影样式的文本阴影选项。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextShadowStyle\_GetTextShadow(const OH\_ArkUI\_TextShadowStyle\* textShadowStyle, OH\_ArkUI\_ShadowOptions\*\* shadowOptions, uint32\_t shadowOptionsSize, uint32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_gettextshadow) | 获取文本阴影样式的文本阴影选项。 |
| [OH\_ArkUI\_DecorationStyle\* OH\_ArkUI\_DecorationStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_create) | 创建[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象。 |
| [void OH\_ArkUI\_DecorationStyle\_Destroy(OH\_ArkUI\_DecorationStyle\* decorationStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_destroy) | 释放[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_SetTextDecorationType(OH\_ArkUI\_DecorationStyle\* decorationStyle, ArkUI\_TextDecorationType type)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_settextdecorationtype) | 设置文本装饰线样式的装饰线类型。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_GetTextDecorationType(const OH\_ArkUI\_DecorationStyle\* decorationStyle, ArkUI\_TextDecorationType\* type)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_gettextdecorationtype) | 获取文本装饰线样式的装饰线类型。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_SetColor(OH\_ArkUI\_DecorationStyle\* decorationStyle, uint32\_t color)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_setcolor) | 设置文本装饰线样式的装饰线颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_GetColor(const OH\_ArkUI\_DecorationStyle\* decorationStyle, uint32\_t\* color)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_getcolor) | 获取文本装饰线样式的装饰线颜色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_SetTextDecorationStyle(OH\_ArkUI\_DecorationStyle\* decorationStyle, ArkUI\_TextDecorationStyle style)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_settextdecorationstyle) | 设置文本装饰线样式的装饰线样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_GetTextDecorationStyle(const OH\_ArkUI\_DecorationStyle\* decorationStyle, ArkUI\_TextDecorationStyle\* style)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_gettextdecorationstyle) | 获取文本装饰线样式的装饰线样式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_SetThicknessScale(OH\_ArkUI\_DecorationStyle\* decorationStyle, float thicknessScale)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_setthicknessscale) | 设置文本装饰线样式的装饰线的粗细缩放比例。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_GetThicknessScale(const OH\_ArkUI\_DecorationStyle\* decorationStyle, float\* thicknessScale)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_getthicknessscale) | 获取文本装饰线样式的装饰线的粗细缩放比例。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_SetEnableMultiType(OH\_ArkUI\_DecorationStyle\* decorationStyle, bool enableMultiType)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_setenablemultitype) | 设置文本装饰线样式中是否开启多装饰线显示。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_DecorationStyle\_GetEnableMultiType(const OH\_ArkUI\_DecorationStyle\* decorationStyle, bool\* enableMultiType)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_getenablemultitype) | 获取文本装饰线样式中是否开启多装饰线显示。 |
| [OH\_ArkUI\_BaselineOffsetStyle\* OH\_ArkUI\_BaselineOffsetStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_create) | 创建[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象。 |
| [void OH\_ArkUI\_BaselineOffsetStyle\_Destroy(OH\_ArkUI\_BaselineOffsetStyle\* baselineOffsetStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_destroy) | 释放[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BaselineOffsetStyle\_SetBaselineOffset(OH\_ArkUI\_BaselineOffsetStyle\* baselineOffsetStyle, float baselineOffset)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_setbaselineoffset) | 设置基线偏移量。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BaselineOffsetStyle\_GetBaselineOffset(const OH\_ArkUI\_BaselineOffsetStyle\* baselineOffsetStyle, float\* baselineOffset)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_getbaselineoffset) | 获取基线偏移量。 |
| [OH\_ArkUI\_LetterSpacingStyle\* OH\_ArkUI\_LetterSpacingStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_create) | 创建[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象。 |
| [void OH\_ArkUI\_LetterSpacingStyle\_Destroy(OH\_ArkUI\_LetterSpacingStyle\* letterSpacingStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_destroy) | 释放[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LetterSpacingStyle\_SetLetterSpacing(OH\_ArkUI\_LetterSpacingStyle\* letterSpacingStyle, float letterSpacing)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_setletterspacing) | 设置字符间距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LetterSpacingStyle\_GetLetterSpacing(const OH\_ArkUI\_LetterSpacingStyle\* letterSpacingStyle, float\* letterSpacing)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_getletterspacing) | 获取字符间距。 |
| [OH\_ArkUI\_LineHeightStyle\* OH\_ArkUI\_LineHeightStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_create) | 创建[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象。 |
| [void OH\_ArkUI\_LineHeightStyle\_Destroy(OH\_ArkUI\_LineHeightStyle\* lineHeightStyle)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_destroy) | 释放[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LineHeightStyle\_SetLineHeight(OH\_ArkUI\_LineHeightStyle\* lineHeightStyle, float lineHeight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_setlineheight) | 设置文本行高。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_LineHeightStyle\_GetLineHeight(const OH\_ArkUI\_LineHeightStyle\* lineHeightStyle, float\* lineHeight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_getlineheight) | 获取文本行高。 |
| [OH\_ArkUI\_BackgroundColorStyle\* OH\_ArkUI\_BackgroundColorStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_create) | 创建[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象。 |
| [void OH\_ArkUI\_BackgroundColorStyle\_Destroy(OH\_ArkUI\_BackgroundColorStyle\* style)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_destroy) | 释放[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BackgroundColorStyle\_SetColor(OH\_ArkUI\_BackgroundColorStyle\* style, uint32\_t color)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_setcolor) | 设置背景颜色样式的背景色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BackgroundColorStyle\_GetColor(const OH\_ArkUI\_BackgroundColorStyle\* style, uint32\_t\* color)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_getcolor) | 获取背景颜色样式的背景色。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BackgroundColorStyle\_SetRadius(OH\_ArkUI\_BackgroundColorStyle\* style, float topLeft, float topRight, float bottomLeft, float bottomRight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_setradius) | 设置背景颜色样式的背景圆角。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_BackgroundColorStyle\_GetRadius(const OH\_ArkUI\_BackgroundColorStyle\* style, float\* topLeft, float\* topRight, float\* bottomLeft, float\* bottomRight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_getradius) | 获取背景颜色样式的背景圆角。 |
| [OH\_ArkUI\_UrlStyle\* OH\_ArkUI\_UrlStyle\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_create) | 创建[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象。 |
| [void OH\_ArkUI\_UrlStyle\_Destroy(OH\_ArkUI\_UrlStyle\* style)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_destroy) | 释放[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_UrlStyle\_SetUrl(OH\_ArkUI\_UrlStyle\* style, const char\* url)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_seturl) | 设置超链接样式的超链接内容。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_UrlStyle\_GetUrl(const OH\_ArkUI\_UrlStyle\* style, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_geturl) | 获取超链接样式的超链接内容。 |
| [OH\_ArkUI\_UserDataSpan\* OH\_ArkUI\_UserDataSpan\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_create) | 创建[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象。 |
| [void OH\_ArkUI\_UserDataSpan\_Destroy(OH\_ArkUI\_UserDataSpan\* userDataSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_destroy) | 释放[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_UserDataSpan\_SetUserData(OH\_ArkUI\_UserDataSpan\* userDataSpan, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_setuserdata) | 设置用户数据Span样式中的用户数据。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_UserDataSpan\_GetUserData(const OH\_ArkUI\_UserDataSpan\* userDataSpan, void\*\* userData)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_getuserdata) | 获取用户数据Span样式中的用户数据。 |
| [OH\_ArkUI\_CustomSpan\* OH\_ArkUI\_CustomSpan\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_create) | 创建[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象。 |
| [void OH\_ArkUI\_CustomSpan\_Destroy(OH\_ArkUI\_CustomSpan\* customSpan)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_destroy) | 释放[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_CustomSpan\_RegisterOnMeasureCallback(OH\_ArkUI\_CustomSpan\* customSpan, ArkUI\_CustomSpanMetrics\*(\*onMeasure)(float))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registeronmeasurecallback) | 设置自定义绘制Span获取尺寸大小时的回调函数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_CustomSpan\_RegisterOnDrawCallback(OH\_ArkUI\_CustomSpan\* customSpan, void(\*onDraw)(ArkUI\_DrawContext\*, ArkUI\_CustomSpanDrawInfo\*))](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registerondrawcallback) | 注册自定义绘制Span绘制时的回调函数。 |
| [OH\_ArkUI\_ImageAttachment\* OH\_ArkUI\_ImageAttachment\_Create()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_create) | 创建[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象。 |
| [void OH\_ArkUI\_ImageAttachment\_Destroy(OH\_ArkUI\_ImageAttachment\* imageAttachment)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_destroy) | 释放[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象占用的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetPixelMap(OH\_ArkUI\_ImageAttachment\* imageAttachment, struct OH\_PixelmapNative\* pixelmap)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setpixelmap) | 设置图片样式中的图片数据源。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetPixelMap(const OH\_ArkUI\_ImageAttachment\* imageAttachment, struct OH\_PixelmapNative\*\* pixelmap)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getpixelmap) | 获取图片样式中的图片数据源。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetResource(OH\_ArkUI\_ImageAttachment\* imageAttachment, const char\* resource)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setresource) | 设置图片样式中的图片资源地址。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetResource(const OH\_ArkUI\_ImageAttachment\* imageAttachment, char\* buffer, int32\_t bufferSize, int32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getresource) | 获取图片样式中的图片资源地址。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetSizeWidth(OH\_ArkUI\_ImageAttachment\* imageAttachment, float width)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setsizewidth) | 设置图片样式中的图片宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetSizeWidth(const OH\_ArkUI\_ImageAttachment\* imageAttachment, float\* width)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getsizewidth) | 获取图片样式中的图片宽度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetSizeHeight(OH\_ArkUI\_ImageAttachment\* imageAttachment, float height)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setsizeheight) | 设置图片样式中的图片高度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetSizeHeight(const OH\_ArkUI\_ImageAttachment\* imageAttachment, float\* height)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getsizeheight) | 获取图片样式中的图片高度。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetVerticalAlign(OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_ImageSpanAlignment verticalAlign)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setverticalalign) | 设置图片样式中的图片对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetVerticalAlign(const OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_ImageSpanAlignment\* verticalAlign)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getverticalalign) | 获取图片样式中的图片对齐方式。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetObjectFit(OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_ObjectFit objectFit)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setobjectfit) | 设置图片样式中的图片缩放类型。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetObjectFit(const OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_ObjectFit\* objectFit)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getobjectfit) | 获取图片样式中的图片缩放类型。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetMargin(OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_Margin margin)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setmargin) | 设置图片样式中的图片外边距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetMargin(const OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_Margin\* margin)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getmargin) | 获取图片样式中的图片外边距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetPadding(OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_Margin padding)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setpadding) | 设置图片样式中的图片内边距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetPadding(const OH\_ArkUI\_ImageAttachment\* imageAttachment, ArkUI\_Margin\* padding)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getpadding) | 获取图片样式中的图片内边距。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetBorderRadiuses(OH\_ArkUI\_ImageAttachment\* imageAttachment, float topLeft, float topRight, float bottomLeft, float bottomRight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setborderradiuses) | 设置图片样式中的图片圆角。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetBorderRadiuses(const OH\_ArkUI\_ImageAttachment\* imageAttachment, float\* topLeft, float\* topRight, float\* bottomLeft, float\* bottomRight)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getborderradiuses) | 获取图片样式中的图片圆角。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetColorFilter(OH\_ArkUI\_ImageAttachment\* imageAttachment, const float\* colorFilter, uint32\_t size)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setcolorfilter) | 设置图片样式中的图片颜色过滤器。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetColorFilter(const OH\_ArkUI\_ImageAttachment\* imageAttachment, float\*\* colorFilter, uint32\_t colorFilterSize, uint32\_t\* writeLength)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getcolorfilter) | 获取图片样式中的图片颜色过滤器。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetDrawingColorFilter(OH\_ArkUI\_ImageAttachment\* imageAttachment, const OH\_Drawing\_ColorFilter\* drawingColorFilter)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setdrawingcolorfilter) | 设置图片样式中的图片颜色滤镜。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetDrawingColorFilter(const OH\_ArkUI\_ImageAttachment\* imageAttachment, OH\_Drawing\_ColorFilter\* drawingColorFilter)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getdrawingcolorfilter) | 获取图片样式中的图片颜色滤镜。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetSyncLoad(OH\_ArkUI\_ImageAttachment\* imageAttachment, bool syncLoad)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setsyncload) | 设置图片样式中是否同步加载图片。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetSyncLoad(const OH\_ArkUI\_ImageAttachment\* imageAttachment, bool\* syncLoad)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getsyncload) | 获取图片样式中是否同步加载图片。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_SetSupportSvg(OH\_ArkUI\_ImageAttachment\* imageAttachment, bool supportSvg)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setsupportsvg) | 设置图片样式中是否开启SVG标签解析能力增强功能。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_ImageAttachment\_GetSupportSvg(const OH\_ArkUI\_ImageAttachment\* imageAttachment, bool\* supportSvg)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_getsupportsvg) | 获取图片样式中是否开启SVG标签解析能力增强功能。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextEditorChangeEvent\_GetRangeBefore(const OH\_ArkUI\_TextEditorChangeEvent\* event, uint32\_t\* start, uint32\_t\* end)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_texteditorchangeevent_getrangebefore) | 获取文本变化信息中的待替换内容的范围。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextEditorChangeEvent\_GetReplacementStyledString(const OH\_ArkUI\_TextEditorChangeEvent\* event, ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_texteditorchangeevent_getreplacementstyledstring) | 获取文本变化信息中的用于替换的属性字符串。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextEditorChangeEvent\_GetPreviewStyledString(const OH\_ArkUI\_TextEditorChangeEvent\* event, ArkUI\_StyledString\_Descriptor\* descriptor)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_texteditorchangeevent_getpreviewstyledstring) | 获取文本变化信息中的预览内容属性字符串。 |
| [void OH\_ArkUI\_TextLayoutManager\_Dispose(ArkUI\_TextLayoutManager\* layoutManager)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_dispose) | 释放被文本布局管理器对象占据的内存。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetLineCount(ArkUI\_TextLayoutManager\* layoutManager, int32\_t\* outLineCount)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getlinecount) | 获取文本行数。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetRectsForRange(ArkUI\_TextLayoutManager\* layoutManager, int32\_t start, int32\_t end, OH\_Drawing\_RectWidthStyle widthStyle, OH\_Drawing\_RectHeightStyle heightStyle, OH\_Drawing\_TextBox\*\* outTextBoxes)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getrectsforrange) | 获取给定的矩形区域宽度样式以及高度样式的规格下，文本中任意区间范围内的字符或占位符所占的绘制区域信息。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetGlyphPositionAtCoordinate(ArkUI\_TextLayoutManager\* layoutManager, double dx, double dy, OH\_Drawing\_PositionAndAffinity\*\* outPos)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getglyphpositionatcoordinate) | 获取距离给定坐标最近的字形的位置信息。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetLineMetrics(ArkUI\_TextLayoutManager\* layoutManager, int32\_t lineNumber, OH\_Drawing\_LineMetrics\* outMetrics)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getlinemetrics) | 获取指定行的行信息、文本样式信息、以及字体属性信息。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetCharacterPositionAtCoordinate(ArkUI\_TextLayoutManager\* layoutManager, double dx, double dy, OH\_Drawing\_PositionAndAffinity\*\* outPos)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getcharacterpositionatcoordinate) | 获取距离指定坐标最近的字符的位置信息。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetGlyphRangeForCharacterRange(ArkUI\_TextLayoutManager\* layoutManager, OH\_Drawing\_Range\* charRange, OH\_Drawing\_Range\*\* outGlyphRange, OH\_Drawing\_Range\*\* outActualCharRange)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getglyphrangeforcharacterrange) | 获取由指定字符范围所生成的字形范围。 |
| [ArkUI\_ErrorCode OH\_ArkUI\_TextLayoutManager\_GetCharacterRangeForGlyphRange(ArkUI\_TextLayoutManager\* layoutManager, OH\_Drawing\_Range\* glyphRange, OH\_Drawing\_Range\*\* outCharRange, OH\_Drawing\_Range\*\* outActualGlyphRange)](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textlayoutmanager_getcharacterrangeforglyphrange) | 获取由指定字形范围所生成的字符范围。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### OH\_ArkUI\_StyledStringKey

PhonePC/2in1TabletTVWearable



```
1. enum OH_ArkUI_StyledStringKey
```

**描述**

属性字符串的样式类型枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_ARKUI\_STYLEDSTRINGKEY\_UNSPECIFIED = -1 | 未指定样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_FONT = 0 | 文本字体样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_DECORATION = 1 | 文本装饰线样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_BASELINE\_OFFSET = 2 | 文本基线偏移量样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_LETTER\_SPACING = 3 | 文本字符间距样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_TEXT\_SHADOW = 4 | 文本阴影样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_LINE\_HEIGHT = 5 | 文本行高样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_BACKGROUND\_COLOR = 6 | 文本背景颜色样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_URL = 7 | 超链接样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_GESTURE = 100 | 事件手势样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_PARAGRAPH\_STYLE = 200 | 文本段落样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_IMAGE = 300 | 图片样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_CUSTOM\_SPAN = 400 | 自定义绘制Span样式。 |
| OH\_ARKUI\_STYLEDSTRINGKEY\_USER\_DATA = 500 | 用户数据Span样式。 |

### OH\_ArkUI\_SuperscriptStyle

PhonePC/2in1TabletTVWearable



```
1. enum OH_ArkUI_SuperscriptStyle
```

**描述**

定义文本上下角标样式枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_ARKUI\_SUPERSCRIPTSTYLE\_NORMAL = 0 | 普通文本样式。 |
| OH\_ARKUI\_SUPERSCRIPTSTYLE\_SUPERSCRIPT = 1 | 上标文本样式。 |
| OH\_ARKUI\_SUPERSCRIPTSTYLE\_SUBSCRIPT = 2 | 下标文本样式。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_ArkUI\_StyledString\_Create()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_StyledString* OH_ArkUI_StyledString_Create(OH_Drawing_TypographyStyle* style, OH_Drawing_FontCollection* collection)
```

**描述：**

创建指向ArkUI\_StyledString对象的指针。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Drawing\_TypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typographystyle)\* style | 指向OH\_Drawing\_TypographyStyle的指针，由[OH\_Drawing\_CreateTypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypographystyle)获取。 |
| [OH\_Drawing\_FontCollection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-fontcollection)\* collection | 指向OH\_Drawing\_FontCollection的指针，由[OH\_Drawing\_CreateFontCollection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_createfontcollection)获取。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* | 创建指向ArkUI\_StyledString对象的指针。如果对象返回空指针，表示创建失败，失败的原因是地址空间已满，或者是style，collection参数异常如空指针。 |

### OH\_ArkUI\_StyledString\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_Destroy(ArkUI_StyledString* handle)
```

**描述：**

释放被ArkUI\_StyledString对象占据的内存。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |

### OH\_ArkUI\_StyledString\_PushTextStyle()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_PushTextStyle(ArkUI_StyledString* handle, OH_Drawing_TextStyle* style)
```

**描述：**

将新的排版风格设置到当前格式化字符串样式栈顶。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |
| [OH\_Drawing\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-textstyle)\* style | 指向OH\_Drawing\_TextStyle对象的指针。 |

### OH\_ArkUI\_StyledString\_AddText()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_AddText(ArkUI_StyledString* handle, const char* content)
```

**描述：**

基于当前格式化字符串样式设置对应的文本内容。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |
| const char\* content | 指向文本内容的指针。 |

### OH\_ArkUI\_StyledString\_PopTextStyle()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_PopTextStyle(ArkUI_StyledString* handle)
```

**描述：**

将当前格式化字符串对象中栈顶样式出栈。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |

### OH\_ArkUI\_StyledString\_CreateTypography()

PhonePC/2in1TabletTVWearable



```
1. OH_Drawing_Typography* OH_ArkUI_StyledString_CreateTypography(ArkUI_StyledString* handle)
```

**描述：**

基于格式字符串对象创建指向[OH\_Drawing\_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)对象的指针，用于提前进行文本测算排版。[OH\_Drawing\_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)对象的生命周期由应用管理，当应用销毁该对象时，应同步调用[NODE\_TEXT\_CONTENT\_WITH\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h-nodeattributetype-text#node_text_content_with_styled_string)对应的reset方法进行置空，避免野指针崩溃风险。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_Drawing\_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)\* | 指向OH\_Drawing\_Typography对象的指针。如果对象返回空指针，表示创建失败，失败的原因可能是handle参数异常如空指针。 |

### OH\_ArkUI\_StyledString\_AddPlaceholder()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_AddPlaceholder(ArkUI_StyledString* handle, OH_Drawing_PlaceholderSpan* placeholder)
```

**描述：**

设置占位符。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-styledstring)\* handle | 指向ArkUI\_StyledString对象的指针。 |
| [OH\_Drawing\_PlaceholderSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-placeholderspan)\* placeholder | 指向OH\_Drawing\_PlaceholderSpan对象的指针。 |

### OH\_ArkUI\_StyledString\_Descriptor\_Create()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_StyledString_Descriptor* OH_ArkUI_StyledString_Descriptor_Create(void)
```

**描述：**

创建属性字符串数据对象。

**起始版本：** 14

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* | 指向ArkUI\_StyledString\_Descriptor对象的指针。 |

### OH\_ArkUI\_StyledString\_Descriptor\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_StyledString_Descriptor_Destroy(ArkUI_StyledString_Descriptor* descriptor)
```

**描述：**

释放被ArkUI\_StyledString\_Descriptor对象占据的内存。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向ArkUI\_StyledString\_Descriptor对象的指针。 |

### OH\_ArkUI\_UnmarshallStyledStringDescriptor()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_ArkUI_UnmarshallStyledStringDescriptor(uint8_t* buffer, size_t bufferSize, ArkUI_StyledString_Descriptor* descriptor)
```

**描述：**

将包含属性字符串信息的字节数组反序列化为属性字符串。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| uint8\_t\* buffer | 待反序列化的字节数组。 |
| size\_t bufferSize | 字节数组长度。 |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向ArkUI\_StyledString\_Descriptor对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_MarshallStyledStringDescriptor()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_ArkUI_MarshallStyledStringDescriptor(uint8_t* buffer, size_t bufferSize, ArkUI_StyledString_Descriptor* descriptor, size_t* resultSize)
```

**描述：**

将属性字符串信息序列化为字节数组。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| uint8\_t\* buffer | 字节数组，用于存储属性字符串序列化后的数据。 |
| size\_t bufferSize | 字节数组长度。 |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向ArkUI\_StyledString\_Descriptor对象的指针。 |
| size\_t\* resultSize | 属性字符串转换后的字节数组实际长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 无效的属性字符串。 |

### OH\_ArkUI\_ConvertToHtml()

PhonePC/2in1TabletTVWearable



```
1. const char* OH_ArkUI_ConvertToHtml(ArkUI_StyledString_Descriptor* descriptor)
```

**描述：**

将属性字符串信息转化成html。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向ArkUI\_StyledString\_Descriptor对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const char\* | html。该指针由内部管理，在[OH\_ArkUI\_StyledString\_Descriptor\_Destroy()](/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_destroy)时释放。 |

### OH\_ArkUI\_StyledString\_Descriptor\_CreateWithString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_StyledString_Descriptor* OH_ArkUI_StyledString_Descriptor_CreateWithString(const char* value, const OH_ArkUI_SpanStyle** styles, int32_t length)
```

**描述**

创建纯文本内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_StyledString\_Descriptor\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_destroy)销毁它。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* value | 属性字符串文本内容字符串。 |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\*\* styles | 属性字符串初始化选项，指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象数组的指针。 |
| int32\_t length | 属性字符串初始化选项的长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* | 指向创建的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。  如果结果为空指针，表示创建失败，失败的原因可能是传入参数异常。 |

### OH\_ArkUI\_StyledString\_Descriptor\_CreateWithImageAttachment()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_StyledString_Descriptor* OH_ArkUI_StyledString_Descriptor_CreateWithImageAttachment(const OH_ArkUI_ImageAttachment* value)
```

**描述**

创建图片内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_StyledString\_Descriptor\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_destroy)销毁它。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* value | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* | 指向创建的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。  如果结果为空指针，表示创建失败，失败的原因可能是传入参数异常。 |

### OH\_ArkUI\_StyledString\_Descriptor\_CreateWithCustomSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_StyledString_Descriptor* OH_ArkUI_StyledString_Descriptor_CreateWithCustomSpan(const OH_ArkUI_CustomSpan* value)
```

**描述**

创建自定义绘制Span内容类型的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_StyledString\_Descriptor\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_descriptor_destroy)销毁它。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* value | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* | 指向创建的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。  如果结果为空指针，表示创建失败，失败的原因可能是传入参数异常。 |

### OH\_ArkUI\_StyledString\_Descriptor\_GetLength()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_GetLength(const ArkUI_StyledString_Descriptor* descriptor, int32_t* length)
```

**描述**

获取属性字符串的字符长度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| int32\_t\* length | 字符长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_GetString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_GetString(const ArkUI_StyledString_Descriptor* descriptor, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取属性字符串的文本内容。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| char\* buffer | 文本内容写入内存的缓冲区，内存空间需由开发者分配。 |
| int32\_t bufferSize | 缓冲区大小。 |
| int32\_t\* writeLength | 返回值为[ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时表示实际写入缓冲区的长度。  返回值为[ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时表示字符串完整写入缓冲区所需要的最小长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_StyledString\_Descriptor\_IsEqual()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_IsEqual(const ArkUI_StyledString_Descriptor* firstDescriptor, const ArkUI_StyledString_Descriptor* secondDescriptor, bool* isEqual)
```

**描述**

判断两个属性字符串是否相同。当属性字符串的文本及样式均一致，视为相同。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* firstDescriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* secondDescriptor | 指向另一个[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| bool\* isEqual | 两个属性字符串是否相同。true表示相同；false表示不相同。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_SubStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_SubStyledString(const ArkUI_StyledString_Descriptor* descriptor, ArkUI_StyledString_Descriptor* subDescriptor, uint32_t start, uint32_t length)
```

**描述**

获取属性字符串的子属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* subDescriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)子属性字符串对象的指针。 |
| uint32\_t start | 子属性字符串的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 子属性字符串的字符长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_GetStyles()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_GetStyles(const ArkUI_StyledString_Descriptor* descriptor, uint32_t start, uint32_t length, OH_ArkUI_StyledStringKey styledKey, OH_ArkUI_SpanStyle** styles, uint32_t stylesSize, uint32_t* writeLength)
```

**描述**

获取属性字符串指定范围内的样式集合。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 指定范围的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 指定范围的长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |
| [OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey) styledKey | 需要获取的指定样式类型，取值为[OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey)中的枚举。 |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\*\* styles | 指向样式对象数组的缓冲区指针。 |
| uint32\_t stylesSize | 样式对象数组的缓冲区大小。 |
| uint32\_t\* writeLength | 属性字符串中获取到的样式对象的数组的实际大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_StyledString\_Descriptor\_FromHtml()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_FromHtml(ArkUI_StyledString_Descriptor* descriptor, const char* html)
```

**描述**

将HTML格式字符串转换成属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| const char\* html | 待转换为属性字符串的HTML格式字符串。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_ReplaceString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_ReplaceString(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, uint32_t length, const char* string)
```

**描述**

替换属性字符串指定范围的文本。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 指定范围的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 指定范围的长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |
| const char\* string | 替换的新文本内容。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_InsertString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_InsertString(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, const char* string)
```

**描述**

在属性字符串的指定位置插入文本。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 插入位置。取值范围[0, 属性字符串的字符长度]。 |
| const char\* string | 插入的新文本内容。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_RemoveString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_RemoveString(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, uint32_t length)
```

**描述**

移除属性字符串指定范围的文本。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 指定范围的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 指定范围的字符长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_ReplaceStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_ReplaceStyle(ArkUI_StyledString_Descriptor* descriptor, const OH_ArkUI_SpanStyle* spanStyle)
```

**描述**

替换属性字符串指定范围内的样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。  需先调用[OH\_ArkUI\_SpanStyle\_SetStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setstart)和[OH\_ArkUI\_SpanStyle\_SetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlength)在该对象中设置目标范围。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_SetStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_SetStyle(ArkUI_StyledString_Descriptor* descriptor, const OH_ArkUI_SpanStyle* spanStyle)
```

**描述**

为属性字符串指定范围设置新样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。需先调用[OH\_ArkUI\_SpanStyle\_SetStart](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setstart)和[OH\_ArkUI\_SpanStyle\_SetLength](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_setlength)在该对象中设置目标范围。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_RemoveStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_RemoveStyle(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, uint32_t length, OH_ArkUI_StyledStringKey styledKey)
```

**描述**

清除属性字符串指定范围内容的指定类型样式。

说明

被清除后属性样式取对应TextEditor组件对应属性的默认值。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 指定范围的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 指定范围的长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |
| [OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey) styledKey | 样式类型枚举值，取值为[OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_ClearStyles()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_ClearStyles(ArkUI_StyledString_Descriptor* descriptor)
```

**描述**

清除属性字符串对象的所有样式。

说明

被清除后属性样式取对应TextEditor组件对应属性的默认值。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_ReplaceStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_ReplaceStyledString(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, uint32_t length, const ArkUI_StyledString_Descriptor* other)
```

**描述**

替换指定范围的属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 指定范围的起始位置。取值范围[0, 属性字符串的字符长度]。 |
| uint32\_t length | 指定范围的长度。取值范围[0, 属性字符串的字符长度与参数start的差值]。 |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* other | 指向新的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_InsertStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_InsertStyledString(ArkUI_StyledString_Descriptor* descriptor, uint32_t start, const ArkUI_StyledString_Descriptor* other)
```

**描述**

在属性字符串的指定位置插入新的属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| uint32\_t start | 插入位置。取值范围[0, 属性字符串的字符长度]。 |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* other | 指向新的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_AppendStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_AppendStyledString(ArkUI_StyledString_Descriptor* descriptor, const ArkUI_StyledString_Descriptor* other)
```

**描述**

在属性字符串的末尾追加新的属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* other | 指向新的[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_StyledString\_Descriptor\_InvalidateCustomSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_StyledString_Descriptor_InvalidateCustomSpan(const ArkUI_StyledString_Descriptor* descriptor)
```

**描述**

主动刷新属性字符串中的自定义绘制Span。

说明

调用该接口会立即触发通过[OH\_ArkUI\_CustomSpan\_RegisterOnDrawCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_registerondrawcallback)注册在自定义绘制Span上的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_INVALID\_STYLED\_STRING](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 属性字符串无效。 |

### OH\_ArkUI\_TextStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_TextStyle* OH_ArkUI_TextStyle_Create()
```

**描述**

创建[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_TextStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |

### OH\_ArkUI\_TextStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_TextStyle_Destroy(OH_ArkUI_TextStyle* textStyle)
```

**描述**

释放[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |

### OH\_ArkUI\_TextStyle\_SetFontColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetFontColor(OH_ArkUI_TextStyle* textStyle, uint32_t fontColor)
```

**描述**

设置文本字体样式中的字体颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t fontColor | 字体颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetFontColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetFontColor(const OH_ArkUI_TextStyle* textStyle, uint32_t* fontColor)
```

**描述**

获取文本字体样式中的字体颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t\* fontColor | 字体颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetFontFamily()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetFontFamily(OH_ArkUI_TextStyle* textStyle, const char* fontFamily)
```

**描述**

设置文本字体样式中的字体族。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| const char\* fontFamily | 字体族。存放待设置的字体名称，不同字体名称通过逗号拼接。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetFontFamily()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetFontFamily(const OH_ArkUI_TextStyle* textStyle, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取文本字体样式中的字体族。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| char\* buffer | 字体族内容写入内存的缓冲区，内存空间需由开发者分配。 |
| int32\_t bufferSize | 缓冲区最多可写入的字符的数量。 |
| int32\_t\* writeLength | 返回[ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示实际写入缓冲区的字符串长度。  返回[ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示字符串完整写入缓冲区所需要的最小长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_TextStyle\_SetFontSize()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetFontSize(OH_ArkUI_TextStyle* textStyle, float fontSize)
```

**描述**

设置文本字体样式中的字体大小。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| float fontSize | 字体大小，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetFontSize()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetFontSize(const OH_ArkUI_TextStyle* textStyle, float* fontSize)
```

**描述**

获取文本字体样式中的字体大小。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| float\* fontSize | 字体大小，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetFontWeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetFontWeight(OH_ArkUI_TextStyle* textStyle, uint32_t fontWeight)
```

**描述**

设置文本字体样式中的字体粗细。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t fontWeight | 字体粗细。取值范围为[100, 900]中的整百数值，例如100、900。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetFontWeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetFontWeight(const OH_ArkUI_TextStyle* textStyle, uint32_t* fontWeight)
```

**描述**

获取文本字体样式中的字体粗细。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t\* fontWeight | 字体粗细。取值范围为[100, 900]中的整百数值，例如100、900。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetFontStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetFontStyle(OH_ArkUI_TextStyle* textStyle, ArkUI_FontStyle fontStyle)
```

**描述**

设置文本字体样式中的字体风格。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| [ArkUI\_FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_fontstyle) fontStyle | 字体风格。取值为[ArkUI\_FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_fontstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetFontStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetFontStyle(const OH_ArkUI_TextStyle* textStyle, ArkUI_FontStyle* fontStyle)
```

**描述**

获取文本字体样式中的字体风格。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| [ArkUI\_FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_fontstyle)\* fontStyle | 字体风格。取值为[ArkUI\_FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_fontstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetStrokeWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetStrokeWidth(OH_ArkUI_TextStyle* textStyle, float strokeWidth)
```

**描述**

设置文本字体样式中的描边宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| float strokeWidth | 描边宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetStrokeWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetStrokeWidth(const OH_ArkUI_TextStyle* textStyle, float* strokeWidth)
```

**描述**

获取文本字体样式中的描边宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| float\* strokeWidth | 描边宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetStrokeColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetStrokeColor(OH_ArkUI_TextStyle* textStyle, uint32_t strokeColor)
```

**描述**

设置文本字体样式中的描边颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t strokeColor | 描边颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetStrokeColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetStrokeColor(const OH_ArkUI_TextStyle* textStyle, uint32_t* strokeColor)
```

**描述**

获取文本字体样式中的描边颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| uint32\_t\* strokeColor | 描边颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_SetSuperscript()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_SetSuperscript(OH_ArkUI_TextStyle* textStyle, OH_ArkUI_SuperscriptStyle superscript)
```

**描述**

设置文本字体样式中的上下标样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| [OH\_ArkUI\_SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_superscriptstyle) superscript | 上下标样式。取值为[OH\_ArkUI\_SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_superscriptstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextStyle\_GetSuperscript()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextStyle_GetSuperscript(const OH_ArkUI_TextStyle* textStyle, OH_ArkUI_SuperscriptStyle* superscript)
```

**描述**

获取文本字体样式中的上下标样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |
| [OH\_ArkUI\_SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_superscriptstyle)\* superscript | 上下标样式。取值为[OH\_ArkUI\_SuperscriptStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_superscriptstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_SpanStyle* OH_ArkUI_SpanStyle_Create()
```

**描述**

创建[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_SpanStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_spanstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |

### OH\_ArkUI\_SpanStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_SpanStyle_Destroy(OH_ArkUI_SpanStyle* spanStyle)
```

**描述**

释放[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |

### OH\_ArkUI\_SpanStyle\_GetStyledKey()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetStyledKey(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_StyledStringKey* styledKey)
```

**描述**

获取属性字符串样式对象的样式类型。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey)\* styledKey | 样式类型的枚举值。取值为[OH\_ArkUI\_StyledStringKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstringkey)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetStart()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetStart(OH_ArkUI_SpanStyle* spanStyle, int32_t start)
```

**描述**

设置属性字符串样式对象的起始位置。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| int32\_t start | 属性字符串样式对象的起始位置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetStart()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetStart(const OH_ArkUI_SpanStyle* spanStyle, int32_t* start)
```

**描述**

获取属性字符串样式对象的起始位置。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| int32\_t\* start | 属性字符串样式对象的起始位置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetLength()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetLength(OH_ArkUI_SpanStyle* spanStyle, int32_t length)
```

**描述**

设置属性字符串样式对象的长度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| int32\_t length | 属性字符串样式对象的长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetLength()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetLength(const OH_ArkUI_SpanStyle* spanStyle, int32_t* length)
```

**描述**

获取属性字符串样式对象的长度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| int32\_t\* length | 属性字符串样式对象的长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetTextStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetTextStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_TextStyle* textStyle)
```

**描述**

设置属性字符串样式对象的文本字体样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetTextStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetTextStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_TextStyle* textStyle)
```

**描述**

获取属性字符串样式对象的文本字体样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)\* textStyle | 指向[OH\_ArkUI\_TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetParagraphStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetParagraphStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_ParagraphStyle* paragraphStyle)
```

**描述**

设置属性字符串样式对象的段落样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetParagraphStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetParagraphStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_ParagraphStyle* paragraphStyle)
```

**描述**

获取属性字符串样式对象的段落样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetGestureStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetGestureStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_GestureStyle* gestureStyle)
```

**描述**

设置属性字符串样式对象的事件手势样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetGestureStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetGestureStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_GestureStyle* gestureStyle)
```

**描述**

获取属性字符串样式对象的事件手势样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetTextShadowStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetTextShadowStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_TextShadowStyle* textShadowStyle)
```

**描述**

设置属性字符串样式对象的文本阴影样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* textShadowStyle | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetTextShadowStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetTextShadowStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_TextShadowStyle* textShadowStyle)
```

**描述**

获取属性字符串样式对象的文本阴影样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* textShadowStyle | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetDecorationStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetDecorationStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_DecorationStyle* decorationStyle)
```

**描述**

设置属性字符串样式对象的文本装饰线样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetDecorationStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetDecorationStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_DecorationStyle* decorationStyle)
```

**描述**

获取属性字符串样式对象的文本装饰线样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetBaselineOffsetStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetBaselineOffsetStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_BaselineOffsetStyle* baselineOffsetStyle)
```

**描述**

设置属性字符串样式对象的基线偏移量样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* baselineOffsetStyle | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetBaselineOffsetStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetBaselineOffsetStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_BaselineOffsetStyle* baselineOffsetStyle)
```

**描述**

获取属性字符串样式对象的基线偏移量样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* baselineOffsetStyle | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetLetterSpacingStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetLetterSpacingStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_LetterSpacingStyle* letterSpacingStyle)
```

**描述**

设置属性字符串样式对象的字符间距样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* letterSpacingStyle | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetLetterSpacingStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetLetterSpacingStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_LetterSpacingStyle* letterSpacingStyle)
```

**描述**

获取属性字符串样式对象的字符间距样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* letterSpacingStyle | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetLineHeightStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetLineHeightStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_LineHeightStyle* lineHeightStyle)
```

**描述**

设置属性字符串样式对象的行高样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* lineHeightStyle | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetLineHeightStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetLineHeightStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_LineHeightStyle* lineHeightStyle)
```

**描述**

获取属性字符串样式对象的行高样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* lineHeightStyle | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetUrlStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetUrlStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_UrlStyle* urlStyle)
```

**描述**

设置属性字符串样式对象的超链接样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* urlStyle | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetUrlStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetUrlStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_UrlStyle* urlStyle)
```

**描述**

获取属性字符串样式对象的超链接样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* urlStyle | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetBackgroundColorStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetBackgroundColorStyle(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_BackgroundColorStyle* backgroundColorStyle)
```

**描述**

设置属性字符串样式对象的背景颜色样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* backgroundColorStyle | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetBackgroundColorStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetBackgroundColorStyle(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_BackgroundColorStyle* backgroundColorStyle)
```

**描述**

获取属性字符串样式对象的背景颜色样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* backgroundColorStyle | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetUserDataSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetUserDataSpan(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_UserDataSpan* userDataSpan)
```

**描述**

设置属性字符串样式对象的用户数据Span样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* userDataSpan | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetUserDataSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetUserDataSpan(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_UserDataSpan* userDataSpan)
```

**描述**

获取属性字符串样式对象的用户数据Span样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* userDataSpan | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetCustomSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetCustomSpan(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_CustomSpan* customSpan)
```

**描述**

设置属性字符串样式对象的自定义绘制Span样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* customSpan | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetCustomSpan()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetCustomSpan(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_CustomSpan* customSpan)
```

**描述**

获取属性字符串样式对象的自定义绘制Span样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* customSpan | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_SetImageAttachment()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_SetImageAttachment(OH_ArkUI_SpanStyle* spanStyle, const OH_ArkUI_ImageAttachment* imageAttachment)
```

**描述**

设置属性字符串样式对象的图片样式。

说明

此操作会替换[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象中已设置的其他样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_SpanStyle\_GetImageAttachment()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_SpanStyle_GetImageAttachment(const OH_ArkUI_SpanStyle* spanStyle, OH_ArkUI_ImageAttachment* imageAttachment)
```

**描述**

获取属性字符串样式对象的图片样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)\* spanStyle | 指向[OH\_ArkUI\_SpanStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-spanstyle)对象的指针。 |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_LeadingMarginSpanDrawInfo* OH_ArkUI_LeadingMarginSpanDrawInfo_Create()
```

**描述**

创建[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_leadingmarginspandrawinfo_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_LeadingMarginSpanDrawInfo_Destroy(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo)
```

**描述**

释放[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetX()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetX(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float x)
```

**描述**

设置段落缩进的自定义绘制信息对象中当前行相对于组件的水平偏移。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float x | 当前行相对于组件的水平偏移，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetX()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetX(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float* x)
```

**描述**

获取段落缩进的自定义绘制信息对象中当前行相对于组件的水平偏移。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float\* x | 当前行相对于组件的水平偏移，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetTop()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetTop(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float top)
```

**描述**

设置段落缩进的自定义绘制信息对象中行顶与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float top | 行顶与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetTop()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetTop(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float* top)
```

**描述**

获取段落缩进的自定义绘制信息对象中行顶与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float\* top | 行顶与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetBottom()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetBottom(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float bottom)
```

**描述**

设置段落缩进的自定义绘制信息对象中行底与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float bottom | 行底与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetBottom()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetBottom(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float* bottom)
```

**描述**

获取段落缩进的自定义绘制信息对象中行底与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float\* bottom | 行底与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetBaseline()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetBaseline(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float baseline)
```

**描述**

设置段落缩进的自定义绘制信息对象中当前行的基线与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float baseline | 当前行的基线与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetBaseline()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetBaseline(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, float* baseline)
```

**描述**

获取段落缩进的自定义绘制信息对象中当前行的基线与组件上边缘的距离。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| float\* baseline | 当前行的基线与组件上边缘的距离，单位px。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetTextDirection()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetTextDirection(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, ArkUI_TextDirection direction)
```

**描述**

设置段落缩进的自定义绘制信息对象中文本内容的方向。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| [ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection) direction | 文本内容的方向。取值为[ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetTextDirection()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetTextDirection(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, ArkUI_TextDirection* direction)
```

**描述**

获取段落缩进的自定义绘制信息对象中文本内容的方向。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| [ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)\* direction | 文本内容的方向。取值为[ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetStart()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetStart(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, uint32_t start)
```

**描述**

设置段落缩进的自定义绘制信息对象中当前行的起始索引。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| uint32\_t start | 当前行的起始索引。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetStart()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetStart(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, uint32_t* start)
```

**描述**

获取段落缩进的自定义绘制信息对象中当前行的起始索引。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| uint32\_t\* start | 当前行的起始索引。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetEnd()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetEnd(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, uint32_t end)
```

**描述**

设置段落缩进的自定义绘制信息对象中当前行的结束索引。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| uint32\_t end | 当前行的结束索引。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetEnd()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetEnd(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, uint32_t* end)
```

**描述**

获取段落缩进的自定义绘制信息对象中当前行的结束索引。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| uint32\_t\* end | 当前行的结束索引。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_SetFirst()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_SetFirst(OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, bool first)
```

**描述**

设置段落缩进的自定义绘制信息对象中当前行是否为段落的首行。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| bool first | 当前行是否为段落的首行。true表示首行；false表示非首行。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LeadingMarginSpanDrawInfo\_GetFirst()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LeadingMarginSpanDrawInfo_GetFirst(const OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo, bool* first)
```

**描述**

获取段落缩进的自定义绘制信息对象中当前行是否为段落的首行。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)\* drawInfo | 指向[OH\_ArkUI\_LeadingMarginSpanDrawInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-nativemodule-oh-arkui-leadingmarginspandrawinfo)对象的指针。 |
| bool\* first | 当前行是否为段落的首行。true表示首行；false表示非首行。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_ParagraphStyle* OH_ArkUI_ParagraphStyle_Create()
```

**描述**

创建[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_ParagraphStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_paragraphstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |

### OH\_ArkUI\_ParagraphStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_ParagraphStyle_Destroy(OH_ArkUI_ParagraphStyle* paragraphStyle)
```

**描述**

释放[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |

### OH\_ArkUI\_ParagraphStyle\_SetTextAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetTextAlign(OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextAlignment align)
```

**描述**

设置段落样式中的水平方向的文本对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textalignment) align | 水平方向的文本对齐方式。取值为[ArkUI\_TextAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetTextAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetTextAlign(const OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextAlignment* align)
```

**描述**

获取段落样式中的水平方向的文本对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textalignment)\* align | 水平方向的文本对齐方式。取值为[ArkUI\_TextAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetTextIndent()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetTextIndent(OH_ArkUI_ParagraphStyle* paragraphStyle, float textIndent)
```

**描述**

设置段落样式中的首行文本缩进。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| float textIndent | 首行缩进值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetTextIndent()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetTextIndent(const OH_ArkUI_ParagraphStyle* paragraphStyle, float* textIndent)
```

**描述**

获取段落样式中的首行文本缩进。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| float\* textIndent | 首行缩进值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetMaxLines()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetMaxLines(OH_ArkUI_ParagraphStyle* paragraphStyle, int32_t maxLines)
```

**描述**

设置段落样式中的最大行数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| int32\_t maxLines | 最大行数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetMaxLines()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetMaxLines(const OH_ArkUI_ParagraphStyle* paragraphStyle, int32_t* maxLines)
```

**描述**

获取段落样式中的最大行数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| int32\_t\* maxLines | 最大行数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetOverflow()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetOverflow(OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextOverflow overflow)
```

**描述**

设置段落样式中的段落超长时的显示方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textoverflow) overflow | 段落超长时的显示方式。取值为[ArkUI\_TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textoverflow)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetOverflow()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetOverflow(const OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextOverflow* overflow)
```

**描述**

获取段落样式中的段落超长时的显示方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textoverflow)\* overflow | 段落超长时的显示方式。取值为[ArkUI\_TextOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textoverflow)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetWordBreak()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetWordBreak(OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_WordBreak wordBreak)
```

**描述**

设置段落样式中的断行规则。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_wordbreak) wordBreak | 断行规则。取值为[ArkUI\_WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_wordbreak)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetWordBreak()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetWordBreak(const OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_WordBreak* wordBreak)
```

**描述**

获取段落样式中的断行规则。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_wordbreak)\* wordBreak | 断行规则。取值为[ArkUI\_WordBreak](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_wordbreak)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginPixelMap()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetLeadingMarginPixelMap(OH_ArkUI_ParagraphStyle* paragraphStyle, struct OH_PixelmapNative* pixelmap)
```

**描述**

设置段落样式中的段落缩进的像素图。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| struct [OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-pixelmapnative)\* pixelmap | 段落缩进的像素图。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginPixelMap()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetLeadingMarginPixelMap(const OH_ArkUI_ParagraphStyle* paragraphStyle, struct OH_PixelmapNative** pixelmap)
```

**描述**

获取段落样式中的段落缩进的像素图。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| struct [OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-pixelmapnative)\*\* pixelmap | 段落缩进的像素图。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetLeadingMarginWidth(OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t width)
```

**描述**

设置段落样式中的段落缩进宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t width | 段落缩进宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetLeadingMarginWidth(const OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t* width)
```

**描述**

获取段落样式中的段落缩进宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t\* width | 段落缩进宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetLeadingMarginHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetLeadingMarginHeight(OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t height)
```

**描述**

设置段落样式中的段落缩进高度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t height | 段落缩进高度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetLeadingMarginHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetLeadingMarginHeight(const OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t* height)
```

**描述**

获取段落样式中的段落缩进高度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t\* height | 段落缩进高度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetParagraphSpacing()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetParagraphSpacing(OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t paragraphSpacing)
```

**描述**

设置段落样式中的段落间距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t paragraphSpacing | 段落间距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetParagraphSpacing()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetParagraphSpacing(const OH_ArkUI_ParagraphStyle* paragraphStyle, uint32_t* paragraphSpacing)
```

**描述**

获取段落样式中的段落间距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| uint32\_t\* paragraphSpacing | 段落间距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetTextVerticalAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetTextVerticalAlign(OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextVerticalAlignment verticalAlignment)
```

**描述**

设置段落样式中的垂直方向的文本对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextVerticalAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textverticalalignment) verticalAlignment | 垂直方向的文本对齐方式。取值为[ArkUI\_TextVerticalAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textverticalalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetTextVerticalAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetTextVerticalAlign(const OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextVerticalAlignment* verticalAlignment)
```

**描述**

获取段落样式中的垂直方向的文本对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextVerticalAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textverticalalignment)\* verticalAlignment | 垂直方向的文本对齐方式。取值为[ArkUI\_TextVerticalAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textverticalalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_RegisterOnDrawLeadingMarginCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_RegisterOnDrawLeadingMarginCallback(OH_ArkUI_ParagraphStyle* paragraphStyle, void(*onDraw)(ArkUI_DrawContext* context, OH_ArkUI_LeadingMarginSpanDrawInfo* drawInfo))
```

**描述**

设置段落样式中绘制段落缩进时触发的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| void(\*onDraw)(ArkUI\_DrawContext\* context | 绘制段落缩进的回调函数。context 图形绘制上下文。drawInfo 自定义绘制信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_RegisterOnGetLeadingMarginCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_RegisterOnGetLeadingMarginCallback(OH_ArkUI_ParagraphStyle* paragraphStyle, float(*leadingMargin)())
```

**描述**

设置段落样式中获取段落缩进距离时触发的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| float(\*leadingMargin)() | 获取段落缩进距离时触发的回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_SetTextDirection()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_SetTextDirection(OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextDirection textDirection)
```

**描述**

设置段落样式中的文本方向。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection) textDirection | 文本方向。取值为[ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ParagraphStyle\_GetTextDirection()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ParagraphStyle_GetTextDirection(const OH_ArkUI_ParagraphStyle* paragraphStyle, ArkUI_TextDirection* textDirection)
```

**描述**

获取段落样式中的文本方向。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)\* paragraphStyle | 指向[OH\_ArkUI\_ParagraphStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-paragraphstyle)对象的指针。 |
| [ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)\* textDirection | 文本方向。取值为[ArkUI\_TextDirection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdirection)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_GestureStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_GestureStyle* OH_ArkUI_GestureStyle_Create()
```

**描述**

创建[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_GestureStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_gesturestyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |

### OH\_ArkUI\_GestureStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_GestureStyle_Destroy(OH_ArkUI_GestureStyle* gestureStyle)
```

**描述**

释放[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |

### OH\_ArkUI\_GestureStyle\_RegisterOnClickCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_GestureStyle_RegisterOnClickCallback(OH_ArkUI_GestureStyle* gestureStyle, void(*onClick)(ArkUI_NodeEvent*))
```

**描述**

设置事件手势样式中的点击事件回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |
| void(\*onClick)(ArkUI\_NodeEvent\*) | 点击事件的回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_GestureStyle\_RegisterOnLongPressCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_GestureStyle_RegisterOnLongPressCallback(OH_ArkUI_GestureStyle* gestureStyle, void(*onLongPress)(ArkUI_GestureEvent*))
```

**描述**

设置事件手势样式中的长按事件回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |
| void(\*onLongPress)(ArkUI\_GestureEvent\*) | 长按事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_GestureStyle\_RegisterOnTouchCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_GestureStyle_RegisterOnTouchCallback(OH_ArkUI_GestureStyle* gestureStyle, void(*onTouch)(ArkUI_NodeEvent*))
```

**描述**

设置事件手势样式中的触摸事件回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)\* gestureStyle | 指向[OH\_ArkUI\_GestureStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-gesturestyle)对象的指针。 |
| void(\*onTouch)(ArkUI\_NodeEvent\*) | 触摸事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextShadowStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_TextShadowStyle* OH_ArkUI_TextShadowStyle_Create()
```

**描述**

创建[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_TextShadowStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_textshadowstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |

### OH\_ArkUI\_TextShadowStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_TextShadowStyle_Destroy(OH_ArkUI_TextShadowStyle* textShadowStyle)
```

**描述**

释放[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* textShadowStyle | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |

### OH\_ArkUI\_TextShadowStyle\_SetTextShadow()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextShadowStyle_SetTextShadow(OH_ArkUI_TextShadowStyle* textShadowStyle, const OH_ArkUI_ShadowOptions** options, uint32_t length)
```

**描述**

设置文本阴影样式的文本阴影选项。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* textShadowStyle | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |
| const [OH\_ArkUI\_ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-shadowoptions)\*\* options | 文本阴影选项，指向[OH\_ArkUI\_ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-shadowoptions)对象数组的指针。 |
| uint32\_t length | 文本阴影选项长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextShadowStyle\_GetTextShadow()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextShadowStyle_GetTextShadow(const OH_ArkUI_TextShadowStyle* textShadowStyle, OH_ArkUI_ShadowOptions** shadowOptions, uint32_t shadowOptionsSize, uint32_t* writeLength)
```

**描述**

获取文本阴影样式的文本阴影选项。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)\* textShadowStyle | 指向[OH\_ArkUI\_TextShadowStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-textshadowstyle)对象的指针。 |
| [OH\_ArkUI\_ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-shadowoptions)\*\* shadowOptions | 文本阴影选项，指向[OH\_ArkUI\_ShadowOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-shadowoptions)对象数组的指针。 |
| uint32\_t shadowOptionsSize | 阴影选项的缓冲区大小。 |
| uint32\_t\* writeLength | 文本阴影样式中实际的文本阴影选项数量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_DecorationStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_DecorationStyle* OH_ArkUI_DecorationStyle_Create()
```

**描述**

创建[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_DecorationStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_decorationstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |

### OH\_ArkUI\_DecorationStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_DecorationStyle_Destroy(OH_ArkUI_DecorationStyle* decorationStyle)
```

**描述**

释放[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |

### OH\_ArkUI\_DecorationStyle\_SetTextDecorationType()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_SetTextDecorationType(OH_ArkUI_DecorationStyle* decorationStyle, ArkUI_TextDecorationType type)
```

**描述**

设置文本装饰线样式的装饰线类型。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| [ArkUI\_TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationtype) type | 装饰线类型。取值为[ArkUI\_TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationtype)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_GetTextDecorationType()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_GetTextDecorationType(const OH_ArkUI_DecorationStyle* decorationStyle, ArkUI_TextDecorationType* type)
```

**描述**

获取文本装饰线样式的装饰线类型。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| [ArkUI\_TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationtype)\* type | 装饰线类型。取值为[ArkUI\_TextDecorationType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationtype)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_SetColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_SetColor(OH_ArkUI_DecorationStyle* decorationStyle, uint32_t color)
```

**描述**

设置文本装饰线样式的装饰线颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| uint32\_t color | 装饰线颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_GetColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_GetColor(const OH_ArkUI_DecorationStyle* decorationStyle, uint32_t* color)
```

**描述**

获取文本装饰线样式的装饰线颜色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| uint32\_t\* color | 装饰线颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_SetTextDecorationStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_SetTextDecorationStyle(OH_ArkUI_DecorationStyle* decorationStyle, ArkUI_TextDecorationStyle style)
```

**描述**

设置文本装饰线样式的装饰线样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| [ArkUI\_TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationstyle) style | 装饰线样式。取值为[ArkUI\_TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_GetTextDecorationStyle()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_GetTextDecorationStyle(const OH_ArkUI_DecorationStyle* decorationStyle, ArkUI_TextDecorationStyle* style)
```

**描述**

获取文本装饰线样式的装饰线样式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| [ArkUI\_TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationstyle)\* style | 装饰线样式。取值为[ArkUI\_TextDecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_textdecorationstyle)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_SetThicknessScale()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_SetThicknessScale(OH_ArkUI_DecorationStyle* decorationStyle, float thicknessScale)
```

**描述**

设置文本装饰线样式的装饰线的粗细缩放比例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| float thicknessScale | 装饰线的粗细缩放比例。取值范围为[0, +∞)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_GetThicknessScale()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_GetThicknessScale(const OH_ArkUI_DecorationStyle* decorationStyle, float* thicknessScale)
```

**描述**

获取文本装饰线样式的装饰线的粗细缩放比例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| float\* thicknessScale | 装饰线的粗细缩放比例。取值范围为[0, +∞)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_SetEnableMultiType()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_SetEnableMultiType(OH_ArkUI_DecorationStyle* decorationStyle, bool enableMultiType)
```

**描述**

设置文本装饰线样式中是否开启多装饰线显示。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| bool enableMultiType | 是否开启多装饰线显示。true表示开启，false表示关闭。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_DecorationStyle\_GetEnableMultiType()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_DecorationStyle_GetEnableMultiType(const OH_ArkUI_DecorationStyle* decorationStyle, bool* enableMultiType)
```

**描述**

获取文本装饰线样式中是否开启多装饰线显示。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)\* decorationStyle | 指向[OH\_ArkUI\_DecorationStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-decorationstyle)对象的指针。 |
| bool\* enableMultiType | 是否开启多装饰线显示。true表示开启，false表示关闭。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BaselineOffsetStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_BaselineOffsetStyle* OH_ArkUI_BaselineOffsetStyle_Create()
```

**描述**

创建[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_BaselineOffsetStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_baselineoffsetstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |

### OH\_ArkUI\_BaselineOffsetStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_BaselineOffsetStyle_Destroy(OH_ArkUI_BaselineOffsetStyle* baselineOffsetStyle)
```

**描述**

释放[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* baselineOffsetStyle | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |

### OH\_ArkUI\_BaselineOffsetStyle\_SetBaselineOffset()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BaselineOffsetStyle_SetBaselineOffset(OH_ArkUI_BaselineOffsetStyle* baselineOffsetStyle, float baselineOffset)
```

**描述**

设置基线偏移量。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* baselineOffsetStyle | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |
| float baselineOffset | 基线偏移量，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BaselineOffsetStyle\_GetBaselineOffset()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BaselineOffsetStyle_GetBaselineOffset(const OH_ArkUI_BaselineOffsetStyle* baselineOffsetStyle, float* baselineOffset)
```

**描述**

获取基线偏移量。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)\* baselineOffsetStyle | 指向[OH\_ArkUI\_BaselineOffsetStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-arkui-nativemodule-oh-arkui-baselineoffsetstyle)对象的指针。 |
| float\* baselineOffset | 基线偏移量，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LetterSpacingStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_LetterSpacingStyle* OH_ArkUI_LetterSpacingStyle_Create()
```

**描述**

创建[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_LetterSpacingStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_letterspacingstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |

### OH\_ArkUI\_LetterSpacingStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_LetterSpacingStyle_Destroy(OH_ArkUI_LetterSpacingStyle* letterSpacingStyle)
```

**描述**

释放[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* letterSpacingStyle | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |

### OH\_ArkUI\_LetterSpacingStyle\_SetLetterSpacing()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LetterSpacingStyle_SetLetterSpacing(OH_ArkUI_LetterSpacingStyle* letterSpacingStyle, float letterSpacing)
```

**描述**

设置字符间距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* letterSpacingStyle | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |
| float letterSpacing | 字符间距值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LetterSpacingStyle\_GetLetterSpacing()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LetterSpacingStyle_GetLetterSpacing(const OH_ArkUI_LetterSpacingStyle* letterSpacingStyle, float* letterSpacing)
```

**描述**

获取字符间距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)\* letterSpacingStyle | 指向[OH\_ArkUI\_LetterSpacingStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-arkui-nativemodule-oh-arkui-letterspacingstyle)对象的指针。 |
| float\* letterSpacing | 字符间距值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LineHeightStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_LineHeightStyle* OH_ArkUI_LineHeightStyle_Create()
```

**描述**

创建[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_LineHeightStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_lineheightstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |

### OH\_ArkUI\_LineHeightStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_LineHeightStyle_Destroy(OH_ArkUI_LineHeightStyle* lineHeightStyle)
```

**描述**

释放[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* lineHeightStyle | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |

### OH\_ArkUI\_LineHeightStyle\_SetLineHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LineHeightStyle_SetLineHeight(OH_ArkUI_LineHeightStyle* lineHeightStyle, float lineHeight)
```

**描述**

设置文本行高。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* lineHeightStyle | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |
| float lineHeight | 固定行高值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_LineHeightStyle\_GetLineHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_LineHeightStyle_GetLineHeight(const OH_ArkUI_LineHeightStyle* lineHeightStyle, float* lineHeight)
```

**描述**

获取文本行高。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)\* lineHeightStyle | 指向[OH\_ArkUI\_LineHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-lineheightstyle)对象的指针。 |
| float\* lineHeight | 固定行高值，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BackgroundColorStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_BackgroundColorStyle* OH_ArkUI_BackgroundColorStyle_Create()
```

**描述**

创建[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_BackgroundColorStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_backgroundcolorstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |

### OH\_ArkUI\_BackgroundColorStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_BackgroundColorStyle_Destroy(OH_ArkUI_BackgroundColorStyle* style)
```

**描述**

释放[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* style | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |

### OH\_ArkUI\_BackgroundColorStyle\_SetColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BackgroundColorStyle_SetColor(OH_ArkUI_BackgroundColorStyle* style, uint32_t color)
```

**描述**

设置背景颜色样式的背景色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* style | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |
| uint32\_t color | 背景颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BackgroundColorStyle\_GetColor()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BackgroundColorStyle_GetColor(const OH_ArkUI_BackgroundColorStyle* style, uint32_t* color)
```

**描述**

获取背景颜色样式的背景色。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* style | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |
| uint32\_t\* color | 背景颜色，0xARGB格式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BackgroundColorStyle\_SetRadius()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BackgroundColorStyle_SetRadius(OH_ArkUI_BackgroundColorStyle* style, float topLeft, float topRight, float bottomLeft, float bottomRight)
```

**描述**

设置背景颜色样式的背景圆角。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* style | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |
| float topLeft | 左上角圆角半径，单位为vp。 |
| float topRight | 右上角圆角半径，单位为vp。 |
| float bottomLeft | 左下角圆角半径，单位为vp。 |
| float bottomRight | 右下角圆角半径，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_BackgroundColorStyle\_GetRadius()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_BackgroundColorStyle_GetRadius(const OH_ArkUI_BackgroundColorStyle* style, float* topLeft, float* topRight, float* bottomLeft, float* bottomRight)
```

**描述**

获取背景颜色样式的背景圆角。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)\* style | 指向[OH\_ArkUI\_BackgroundColorStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-oh-arkui-backgroundcolorstyle)对象的指针。 |
| float\* topLeft | 左上角圆角半径，单位为vp。 |
| float\* topRight | 右上角圆角半径，单位为vp。 |
| float\* bottomLeft | 左下角圆角半径，单位为vp。 |
| float\* bottomRight | 右下角圆角半径，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_UrlStyle\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_UrlStyle* OH_ArkUI_UrlStyle_Create()
```

**描述**

创建[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_UrlStyle\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_urlstyle_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |

### OH\_ArkUI\_UrlStyle\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_UrlStyle_Destroy(OH_ArkUI_UrlStyle* style)
```

**描述**

释放[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* style | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |

### OH\_ArkUI\_UrlStyle\_SetUrl()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_UrlStyle_SetUrl(OH_ArkUI_UrlStyle* style, const char* url)
```

**描述**

设置超链接样式的超链接内容。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* style | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |
| const char\* url | 超链接内容。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_UrlStyle\_GetUrl()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_UrlStyle_GetUrl(const OH_ArkUI_UrlStyle* style, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取超链接样式的超链接内容。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)\* style | 指向[OH\_ArkUI\_UrlStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-urlstyle)对象的指针。 |
| char\* buffer | 超链接内容写入内存的缓冲区，内存空间需由开发者分配。 |
| int32\_t bufferSize | 缓冲区最多可写入的字符的数量。 |
| int32\_t\* writeLength | 返回[ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示实际写入缓冲区的字符的数量。  返回[ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示字符串完整写入缓冲区所需要的最小长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_UserDataSpan\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_UserDataSpan* OH_ArkUI_UserDataSpan_Create()
```

**描述**

创建[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_UserDataSpan\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_userdataspan_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |

### OH\_ArkUI\_UserDataSpan\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_UserDataSpan_Destroy(OH_ArkUI_UserDataSpan* userDataSpan)
```

**描述**

释放[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* userDataSpan | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |

### OH\_ArkUI\_UserDataSpan\_SetUserData()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_UserDataSpan_SetUserData(OH_ArkUI_UserDataSpan* userDataSpan, void* userData)
```

**描述**

设置用户数据Span样式中的用户数据。

说明

该接口允许开发者将任意类型的自定义数据关联到当前的样式对象上。用于在属性字符串中存储用户数据。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* userDataSpan | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |
| void\* userData | 用户数据，生命周期需由开发者自行管理。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_UserDataSpan\_GetUserData()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_UserDataSpan_GetUserData(const OH_ArkUI_UserDataSpan* userDataSpan, void** userData)
```

**描述**

获取用户数据Span样式中的用户数据。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)\* userDataSpan | 指向[OH\_ArkUI\_UserDataSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-userdataspan)对象的指针。 |
| void\*\* userData | 用户数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_CustomSpan\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_CustomSpan* OH_ArkUI_CustomSpan_Create()
```

**描述**

创建[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_CustomSpan\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_customspan_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |

### OH\_ArkUI\_CustomSpan\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_CustomSpan_Destroy(OH_ArkUI_CustomSpan* customSpan)
```

**描述**

释放[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* customSpan | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |

### OH\_ArkUI\_CustomSpan\_RegisterOnMeasureCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_CustomSpan_RegisterOnMeasureCallback(OH_ArkUI_CustomSpan* customSpan, ArkUI_CustomSpanMetrics*(*onMeasure)(float))
```

**描述**

设置自定义绘制Span获取尺寸大小时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* customSpan | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |
| ArkUI\_CustomSpanMetrics\*(\*onMeasure)(float) | 获取尺寸大小的回调函数。fontSize 组件中的文本字体大小，单位为fp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_CustomSpan\_RegisterOnDrawCallback()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_CustomSpan_RegisterOnDrawCallback(OH_ArkUI_CustomSpan* customSpan, void(*onDraw)(ArkUI_DrawContext*, ArkUI_CustomSpanDrawInfo*))
```

**描述**

注册自定义绘制Span绘制时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)\* customSpan | 指向[OH\_ArkUI\_CustomSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-customspan)对象的指针。 |
| void(\*onDraw)(ArkUI\_DrawContext\* | 绘制时的回调函数。context 图形绘制上下文。drawInfo 自定义绘制Span的绘制信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_ArkUI_ImageAttachment* OH_ArkUI_ImageAttachment_Create()
```

**描述**

创建[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象。

说明

当该对象不再使用时，调用[OH\_ArkUI\_ImageAttachment\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_destroy)销毁它。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |

### OH\_ArkUI\_ImageAttachment\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_ImageAttachment_Destroy(OH_ArkUI_ImageAttachment* imageAttachment)
```

**描述**

释放[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象占用的内存。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |

### OH\_ArkUI\_ImageAttachment\_SetPixelMap()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetPixelMap(OH_ArkUI_ImageAttachment* imageAttachment, struct OH_PixelmapNative* pixelmap)
```

**描述**

设置图片样式中的图片数据源。

说明

与[OH\_ArkUI\_ImageAttachment\_SetResource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setresource)同时设置时，后设置的生效。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| struct [OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-pixelmapnative)\* pixelmap | 图片数据源。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetPixelMap()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetPixelMap(const OH_ArkUI_ImageAttachment* imageAttachment, struct OH_PixelmapNative** pixelmap)
```

**描述**

获取图片样式中的图片数据源。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| struct [OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-pixelmapnative)\*\* pixelmap | 图片数据源。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetResource()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetResource(OH_ArkUI_ImageAttachment* imageAttachment, const char* resource)
```

**描述**

设置图片样式中的图片资源地址。

说明

与[OH\_ArkUI\_ImageAttachment\_SetPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setpixelmap)同时设置时，后设置的生效。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| const char\* resource | 图片资源地址。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetResource()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetResource(const OH_ArkUI_ImageAttachment* imageAttachment, char* buffer, int32_t bufferSize, int32_t* writeLength)
```

**描述**

获取图片样式中的图片资源地址。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| char\* buffer | 图片资源地址字符串写入内存的缓冲区，内存空间需由开发者分配。 |
| int32\_t bufferSize | 缓冲区大小。 |
| int32\_t\* writeLength | 返回[ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示实际写入缓冲区的字符串长度。  返回[ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode)时，表示字符串完整写入缓冲区所需要的最小长度。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_ImageAttachment\_SetSizeWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetSizeWidth(OH_ArkUI_ImageAttachment* imageAttachment, float width)
```

**描述**

设置图片样式中的图片宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float width | 图片宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetSizeWidth()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetSizeWidth(const OH_ArkUI_ImageAttachment* imageAttachment, float* width)
```

**描述**

获取图片样式中的图片宽度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float\* width | 图片宽度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetSizeHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetSizeHeight(OH_ArkUI_ImageAttachment* imageAttachment, float height)
```

**描述**

设置图片样式中的图片高度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float height | 图片高度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetSizeHeight()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetSizeHeight(const OH_ArkUI_ImageAttachment* imageAttachment, float* height)
```

**描述**

获取图片样式中的图片高度。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float\* height | 图片高度，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetVerticalAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetVerticalAlign(OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_ImageSpanAlignment verticalAlign)
```

**描述**

设置图片样式中的图片对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_imagespanalignment) verticalAlign | 图片对齐方式。取值为[ArkUI\_ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_imagespanalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetVerticalAlign()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetVerticalAlign(const OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_ImageSpanAlignment* verticalAlign)
```

**描述**

获取图片样式中的图片对齐方式。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_imagespanalignment)\* verticalAlign | 图片对齐方式。取值为[ArkUI\_ImageSpanAlignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_imagespanalignment)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetObjectFit()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetObjectFit(OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_ObjectFit objectFit)
```

**描述**

设置图片样式中的图片缩放类型。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_ObjectFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_objectfit) objectFit | 图片缩放类型。取值为[ArkUI\_ObjectFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_objectfit)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetObjectFit()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetObjectFit(const OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_ObjectFit* objectFit)
```

**描述**

获取图片样式中的图片缩放类型。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_ObjectFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_objectfit)\* objectFit | 图片缩放类型。取值为[ArkUI\_ObjectFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_objectfit)中的枚举。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetMargin()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetMargin(OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_Margin margin)
```

**描述**

设置图片样式中的图片外边距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-margin) margin | 图片外边距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetMargin()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetMargin(const OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_Margin* margin)
```

**描述**

获取图片样式中的图片外边距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-margin)\* margin | 图片外边距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetPadding()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetPadding(OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_Margin padding)
```

**描述**

设置图片样式中的图片内边距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-margin) padding | 图片内边距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetPadding()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetPadding(const OH_ArkUI_ImageAttachment* imageAttachment, ArkUI_Margin* padding)
```

**描述**

获取图片样式中的图片内边距。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [ArkUI\_Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-margin)\* padding | 图片内边距，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetBorderRadiuses()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetBorderRadiuses(OH_ArkUI_ImageAttachment* imageAttachment, float topLeft, float topRight, float bottomLeft, float bottomRight)
```

**描述**

设置图片样式中的图片圆角。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float topLeft | 左上角圆角半径，单位为vp。 |
| float topRight | 右上角圆角半径，单位为vp。 |
| float bottomLeft | 左下角圆角半径，单位为vp。 |
| float bottomRight | 右下角圆角半径，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetBorderRadiuses()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetBorderRadiuses(const OH_ArkUI_ImageAttachment* imageAttachment, float* topLeft, float* topRight, float* bottomLeft, float* bottomRight)
```

**描述**

获取图片样式中的图片圆角。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float\* topLeft | 左上角圆角半径，单位为vp。 |
| float\* topRight | 右上角圆角半径，单位为vp。 |
| float\* bottomLeft | 左下角圆角半径，单位为vp。 |
| float\* bottomRight | 右下角圆角半径，单位为vp。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetColorFilter()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetColorFilter(OH_ArkUI_ImageAttachment* imageAttachment, const float* colorFilter, uint32_t size)
```

**描述**

设置图片样式中的图片颜色过滤器。

说明

与[OH\_ArkUI\_ImageAttachment\_SetDrawingColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setdrawingcolorfilter)同时设置时，后设置的生效。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| const float\* colorFilter | 图片颜色过滤器。 |
| uint32\_t size | 过滤器数组大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetColorFilter()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetColorFilter(const OH_ArkUI_ImageAttachment* imageAttachment, float** colorFilter, uint32_t colorFilterSize, uint32_t* writeLength)
```

**描述**

获取图片样式中的图片颜色过滤器。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| float\*\* colorFilter | 图片颜色过滤器写入内存的缓冲区，内存空间需由开发者分配。 |
| uint32\_t colorFilterSize | 缓冲区大小。 |
| uint32\_t\* writeLength | 图片颜色过滤器数组的实际大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_BUFFER\_SIZE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 缓冲区大小不足。 |

### OH\_ArkUI\_ImageAttachment\_SetDrawingColorFilter()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetDrawingColorFilter(OH_ArkUI_ImageAttachment* imageAttachment, const OH_Drawing_ColorFilter* drawingColorFilter)
```

**描述**

设置图片样式中的图片颜色滤镜。

说明

与[OH\_ArkUI\_ImageAttachment\_SetColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setcolorfilter)同时设置时，后设置的生效。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| const [OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)\* drawingColorFilter | 图片颜色滤镜。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetDrawingColorFilter()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetDrawingColorFilter(const OH_ArkUI_ImageAttachment* imageAttachment, OH_Drawing_ColorFilter* drawingColorFilter)
```

**描述**

获取图片样式中的图片颜色滤镜。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| [OH\_Drawing\_ColorFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-colorfilter)\* drawingColorFilter | 图片颜色滤镜。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetSyncLoad()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetSyncLoad(OH_ArkUI_ImageAttachment* imageAttachment, bool syncLoad)
```

**描述**

设置图片样式中是否同步加载图片。

说明

此属性仅在通过[OH\_ArkUI\_ImageAttachment\_SetResource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_imageattachment_setresource)设置图片源为资源地址时生效。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| bool syncLoad | 是否同步加载图片。true表示同步加载；false表示异步加载。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetSyncLoad()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetSyncLoad(const OH_ArkUI_ImageAttachment* imageAttachment, bool* syncLoad)
```

**描述**

获取图片样式中是否同步加载图片。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| bool\* syncLoad | 是否同步加载图片。true表示同步加载；false表示异步加载。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_SetSupportSvg()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_SetSupportSvg(OH_ArkUI_ImageAttachment* imageAttachment, bool supportSvg)
```

**描述**

设置图片样式中是否开启SVG标签解析能力增强功能。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| bool supportSvg | 是否开启SVG标签解析能力增强功能。true表示开启；false表示不开启。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_ImageAttachment\_GetSupportSvg()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_ImageAttachment_GetSupportSvg(const OH_ArkUI_ImageAttachment* imageAttachment, bool* supportSvg)
```

**描述**

获取图片样式中是否开启SVG标签解析能力增强功能。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)\* imageAttachment | 指向[OH\_ArkUI\_ImageAttachment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-oh-arkui-imageattachment)对象的指针。 |
| bool\* supportSvg | 是否开启SVG标签解析能力增强功能。true表示开启；false表示未开启。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextEditorChangeEvent\_GetRangeBefore()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextEditorChangeEvent_GetRangeBefore(const OH_ArkUI_TextEditorChangeEvent* event, uint32_t* start, uint32_t* end)
```

**描述**

获取文本变化信息中的待替换内容的范围。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const OH\_ArkUI\_TextEditorChangeEvent\* event | 指向[OH\_ArkUI\_TextEditorChangeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-arkui-nativemodule-oh-arkui-texteditorchangeevent)对象的指针。 |
| uint32\_t\* start | 待替换内容范围的起始索引。 |
| uint32\_t\* end | 待替换内容范围的结束索引。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextEditorChangeEvent\_GetReplacementStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextEditorChangeEvent_GetReplacementStyledString(const OH_ArkUI_TextEditorChangeEvent* event, ArkUI_StyledString_Descriptor* descriptor)
```

**描述**

获取文本变化信息中的用于替换的属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const OH\_ArkUI\_TextEditorChangeEvent\* event | 指向[OH\_ArkUI\_TextEditorChangeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-arkui-nativemodule-oh-arkui-texteditorchangeevent)对象的指针。 |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextEditorChangeEvent\_GetPreviewStyledString()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextEditorChangeEvent_GetPreviewStyledString(const OH_ArkUI_TextEditorChangeEvent* event, ArkUI_StyledString_Descriptor* descriptor)
```

**描述**

获取文本变化信息中的预览内容属性字符串。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const OH\_ArkUI\_TextEditorChangeEvent\* event | 指向[OH\_ArkUI\_TextEditorChangeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-arkui-nativemodule-oh-arkui-texteditorchangeevent)对象的指针。 |
| [ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)\* descriptor | 指向[ArkUI\_StyledString\_Descriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-styledstring-descriptor)对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 操作成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_Dispose()

PhonePC/2in1TabletTVWearable



```
1. void OH_ArkUI_TextLayoutManager_Dispose(ArkUI_TextLayoutManager* layoutManager)
```

**描述**

释放被文本布局管理器对象占据的内存。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向ArkUI\_TextLayoutManager对象的指针。 |

### OH\_ArkUI\_TextLayoutManager\_GetLineCount()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetLineCount(ArkUI_TextLayoutManager* layoutManager, int32_t* outLineCount)
```

**描述**

获取文本行数。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向ArkUI\_TextLayoutManager对象的指针。 |
| int32\_t\* outLineCount | 文本行数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetRectsForRange()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetRectsForRange(ArkUI_TextLayoutManager* layoutManager, int32_t start, int32_t end, OH_Drawing_RectWidthStyle widthStyle, OH_Drawing_RectHeightStyle heightStyle, OH_Drawing_TextBox** outTextBoxes)
```

**描述**

获取给定的矩形区域宽度样式以及高度样式的规格下，文本中任意区间范围内的字符或占位符所占的绘制区域信息。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向ArkUI\_TextLayoutManager对象的指针。 |
| int32\_t start | 起始位置索引，start取值需要大于等于0，否则会返回参数异常。 |
| int32\_t end | 结束位置索引，end取值需要大于等于start，否则会返回参数异常。 |
| [OH\_Drawing\_RectWidthStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_rectwidthstyle) widthStyle | 矩形区域宽度样式。 |
| [OH\_Drawing\_RectHeightStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_rectheightstyle) heightStyle | 矩形区域高度样式。 |
| [OH\_Drawing\_TextBox](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-textbox)\*\* outTextBoxes | 指向OH\_Drawing\_TextBox对象的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetGlyphPositionAtCoordinate()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetGlyphPositionAtCoordinate(ArkUI_TextLayoutManager* layoutManager, double dx, double dy, OH_Drawing_PositionAndAffinity** outPos)
```

**描述**

获取距离给定坐标最近的字形的位置信息。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向ArkUI\_TextLayoutManager对象的指针。 |
| double dx | 相对于控件的x坐标，单位为px。 |
| double dy | 相对于控件的y坐标，单位为px。 |
| [OH\_Drawing\_PositionAndAffinity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-positionandaffinity)\*\* outPos | 指向OH\_Drawing\_PositionAndAffinity对象的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetLineMetrics()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetLineMetrics(ArkUI_TextLayoutManager* layoutManager, int32_t lineNumber, OH_Drawing_LineMetrics* outMetrics)
```

**描述**

获取指定行的行信息、文本样式信息、以及字体属性信息。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向ArkUI\_TextLayoutManager对象的指针。 |
| int32\_t lineNumber | 指定行的行号索引，行号索引从0开始计数，lineNumber小于0或大于等于文本行数时会返回参数异常。 |
| [OH\_Drawing\_LineMetrics](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-linemetrics)\* outMetrics | 指向OH\_Drawing\_LineMetrics对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetCharacterPositionAtCoordinate()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetCharacterPositionAtCoordinate(ArkUI_TextLayoutManager* layoutManager, double dx, double dy, OH_Drawing_PositionAndAffinity** outPos)
```

**描述**

获取距离指定坐标最近的字符的位置信息。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向[ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)对象的指针。 |
| double dx | 相对于控件的x坐标，单位为px。 |
| double dy | 相对于控件的y坐标，单位为px。 |
| [OH\_Drawing\_PositionAndAffinity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-positionandaffinity)\*\* outPos | 指向[OH\_Drawing\_PositionAndAffinity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-positionandaffinity)对象的二级指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetGlyphRangeForCharacterRange()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetGlyphRangeForCharacterRange(ArkUI_TextLayoutManager* layoutManager, OH_Drawing_Range* charRange, OH_Drawing_Range** outGlyphRange,
2. OH_Drawing_Range** outActualCharRange);
```

**描述**

获取由指定字符索引范围所生成的字形索引范围以及实际的字符索引范围。例如文本为"世界Hello"，其中文本"世"的字形索引范围为[0, 1]，一个汉字占三个字符，所以其对应的字符索引范围为[0, 3]。如果指定的字符索引范围是[0, 1]，但无法解析出三分之一个汉字，所以实际的字符索引范围是[0, 3]。outGlyphRange、outActualCharRange返回的[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象在使用完成后，需通过[OH\_Drawing\_ReleaseRangeBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_releaserangebuffer)释放。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向[ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)对象的指针。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\* charRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的指针，表示字符索引范围。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\*\* outGlyphRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的二级指针，表示字形索引范围。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\*\* outActualCharRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的二级指针，表示实际的字符索引范围。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### OH\_ArkUI\_TextLayoutManager\_GetCharacterRangeForGlyphRange()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_ErrorCode OH_ArkUI_TextLayoutManager_GetCharacterRangeForGlyphRange(ArkUI_TextLayoutManager* layoutManager, OH_Drawing_Range* glyphRange, OH_Drawing_Range** outCharRange,
2. OH_Drawing_Range** outActualGlyphRange)
```

**描述**

获取由指定字形索引范围所生成的字符索引范围以及实际的字形索引范围。例如文本为"世界Hello"，其字形索引范围为[0, 7]，一个汉字占三个字符，所以其对应的字符索引范围为[0, 11]。如果指定的索引范围是[0, 11]，但字形一共只有7个，所以实际的字形索引范围是[0, 7]。outCharRange、outActualGlyphRange返回的[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象在使用完成后，需通过[OH\_Drawing\_ReleaseRangeBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_releaserangebuffer)释放。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)\* layoutManager | 指向[ArkUI\_TextLayoutManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-textlayoutmanager)对象的指针。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\* glyphRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的指针，表示字形索引范围。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\*\* outCharRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的二级指针，表示字符索引范围。 |
| [OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)\*\* outActualGlyphRange | 指向[OH\_Drawing\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-range)对象的二级指针，表示实际的字形索引范围。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) | 返回结果。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |