[Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text)组件的子组件，用于统一管理多个[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)、[ImageSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-imagespan)的背景色及圆角弧度。

说明

该组件从API version 11开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## 子组件

PhonePC/2in1TabletTVWearable

可以包含[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span)、[ImageSpan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-imagespan) 子组件。

## 接口

PhonePC/2in1TabletTVWearable

ContainerSpan()

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## 属性

PhonePC/2in1TabletTVWearable

仅支持以下属性：

### textBackgroundStyle

PhonePC/2in1TabletTVWearable

textBackgroundStyle(style: TextBackgroundStyle)

设置文本背景样式。子组件在不设置该属性时，将继承此属性值。

说明

从API version 12开始，该接口支持在[attributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifier)中调用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| style | [TextBackgroundStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#textbackgroundstyle11对象说明) | 是 | 文本背景样式。  默认值：  {  color: Color.Transparent,  radius: 0  } |

### attributeModifier12+

PhonePC/2in1TabletTVWearable

attributeModifier(modifier: AttributeModifier<ContainerSpanAttribute>)

设置组件的动态属性。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| modifier | [AttributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#attributemodifiert)<ContainerSpanAttribute> | 是 | 动态设置组件的属性。 |

## 事件

PhonePC/2in1TabletTVWearable

不支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（设置背景样式）

从API version 11开始，该示例通过[textBackgroundStyle](/consumer/cn/doc/harmonyos-references/ts-basic-components-containerspan#textbackgroundstyle)属性展示了文本设置背景样式的效果。



```
1. // xxx.ets
2. @Component
3. @Entry
4. struct Index {
5. build() {
6. Column() {
7. Text() {
8. ContainerSpan() {
9. // $r('app.media.app_icon')需要替换为开发者所需的图像资源文件。
10. ImageSpan($r('app.media.app_icon'))
11. .width('40vp')
12. .height('40vp')
13. .verticalAlign(ImageSpanAlignment.CENTER)
14. Span('   Hello World !   ').fontSize('16fp').fontColor(Color.White)
15. }
16. .textBackgroundStyle({
17. color: "#7F007DFF",
18. radius: {
19. topLeft: 12,
20. topRight: 12,
21. bottomLeft: 12,
22. bottomRight: 12
23. }
24. })
25. }
26. }.width('100%').alignItems(HorizontalAlign.Center)
27. }
28. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/u_BEPgDFSSiHhKRtG_on-w/zh-cn_image_0000002568759466.png?HW-CC-KV=V1&HW-CC-Date=20260511T035203Z&HW-CC-Expire=86400&HW-CC-Sign=3C99B545C04129ABB6354ACF22CF7079765C3578856C8C9B42156EB1C492314D)

### 示例2（通过attributeModifier设置背景样式）

从API version 12开始，该示例通过[attributeModifier](/consumer/cn/doc/harmonyos-references/ts-basic-components-containerspan#attributemodifier12)属性展示了文本设置背景样式的效果。



```
1. import { ContainerSpanModifier } from '@kit.ArkUI';

3. class MyContainerSpanModifier extends ContainerSpanModifier {
4. applyNormalAttribute(instance: ContainerSpanAttribute): void {
5. super.applyNormalAttribute?.(instance);
6. this.textBackgroundStyle({ color: "#7F007DFF", radius: "12vp" });
7. }
8. }

10. @Entry
11. @Component
12. struct ContainerSpanModifierExample {
13. @State containerSpanModifier: ContainerSpanModifier = new MyContainerSpanModifier();

15. build() {
16. Column() {
17. Text() {
18. ContainerSpan() {
19. // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件。
20. ImageSpan($r('app.media.startIcon'))
21. .width('40vp')
22. .height('40vp')
23. .verticalAlign(ImageSpanAlignment.CENTER)
24. Span(' I\'m ContainerSpan attributeModifier ').fontSize('16fp').fontColor(Color.White)
25. }.attributeModifier(this.containerSpanModifier as MyContainerSpanModifier)
26. }
27. }.width('100%').alignItems(HorizontalAlign.Center)
28. }
29. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/oGAHf2inSaWfWMS8tzkoww/zh-cn_image_0000002599358709.png?HW-CC-KV=V1&HW-CC-Date=20260511T035203Z&HW-CC-Expire=86400&HW-CC-Sign=E5CAAF8D68092D4EB495CD76F3320A2E4EE2A235C8BF874F42E03D7508AF097D)