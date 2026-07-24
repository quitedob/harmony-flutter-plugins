SymbolGlyphModifier用于动态设置SymbolGlyph组件的属性和样式，支持使用if/else语句进行设置。[SymbolGlyph](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-symbolglyph)是一个用于展示图标符号的组件。

说明

从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## SymbolGlyphModifier

PhonePC/2in1TabletTVWearable

定义SymbolGlyphModifier。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### constructor

PhonePC/2in1TabletTVWearable

constructor(src?: Resource)

SymbolGlyphModifier的构造函数。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| src | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 否 | 资源信息。 |

### applyNormalAttribute

PhonePC/2in1TabletTVWearable

applyNormalAttribute?(instance: SymbolGlyphAttribute): void

组件普通状态时的样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| instance | [SymbolGlyphAttribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-symbolglyph) | 是 | 动态设置SymbolGlyph组件的属性。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例通过[SymbolGlyphModifier](/consumer/cn/doc/harmonyos-references/universal-attributes-attribute-symbolglyphmodifier#symbolglyphmodifier)和TextInput组件的[cancelButton](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-textinput#cancelbutton18)属性展示了自定义右侧symbol类型清除按钮样式的效果。



```
1. import { SymbolGlyphModifier } from '@kit.ArkUI';

3. // xxx.ets
4. @Entry
5. @Component
6. struct Index {
7. @State text: string = '';
8. symbolModifier: SymbolGlyphModifier =
9. new SymbolGlyphModifier($r('sys.symbol.trash')).fontColor([Color.Red]).fontSize(16).fontWeight(FontWeight.Regular);

11. build() {
12. Column() {
13. TextInput({ text: this.text, placeholder: 'input your word...' })
14. .height(50)
15. .cancelButton({
16. style: CancelButtonStyle.CONSTANT,
17. icon: this.symbolModifier // 从API version 18开始支持symbol类型
18. })
19. }.margin(10)
20. }
21. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/pgQEVY9vRDaKyZbL6TJGYw/zh-cn_image_0000002599358469.png?HW-CC-KV=V1&HW-CC-Date=20260511T034712Z&HW-CC-Expire=86400&HW-CC-Sign=07D387CC82E5BC8160D03EFBEC9FA1055C76120B9CF10D98A1CD42C5A5858DDA)