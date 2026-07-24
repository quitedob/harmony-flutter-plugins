设置组件的浮层。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## overlay

PhonePC/2in1TabletTVWearable

overlay(value: string | CustomBuilder | ComponentContent, options?: OverlayOptions ): T

在当前组件上，增加遮罩文本或者叠加自定义组件以及[ComponentContent](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#componentcontent12)作为该组件的浮层。浮层的定位同样基于当前组件进行计算。浮层不通过组件树进行渲染，部分接口（例如[getRectangleById](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentutils#componentutilsgetrectanglebyiddeprecated)）不支持获取浮层中的组件。

说明

* overlay会将浮层组件覆盖在所绑定的组件上方，阻塞用户对浮层下方组件的所有交互操作。若需用户可操作下方组件，应参照[示例2（通过builder设置浮层）](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#示例2通过builder设置浮层)中的实现，在浮层builder的最外层组件上配置.hitTestBehavior(HitTestMode.Transparent)。此配置在通过浮层实现水印时尤其重要，因为水印显示不应妨碍用户对下层组件的操作。
* 多次调用overlay接口时，如果同时传入string类型和[CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8)类型，或者同时传入string类型和[ComponentContent](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#componentcontent12)类型，浮层内容会叠加显示。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8)10+ | [ComponentContent](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#componentcontent12)12+ | 是 | 遮罩文本内容或自定义组件构造函数。  **说明：**  自定义组件作为浮层时，不支持键盘走焦到自定义组件中。通过CustomBuilder设置浮层时，浮层中的内容会在页面刷新时销毁并重新创建，存在一定的性能损耗，页面频繁刷新的场景推荐使用ComponentContent方式设置浮层。 |
| options | [OverlayOptions](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#overlayoptions12) | 否 | 浮层的定位。  **说明：**  API version 12之前，options:  {  align?: [Alignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#alignment),  offset?: {x?: number, y?: number}  } |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

说明

overlay节点不支持[onAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#onappear)和[onDisAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#ondisappear)等和节点挂载/卸载相关的事件。

## OverlayOptions12+

PhonePC/2in1TabletTVWearable

说明

为规范匿名对象的定义，API 12版本修改了此处的元素定义。其中，保留了历史匿名对象的起始版本信息，会出现外层元素@since版本号高于内层元素版本号的情况，但这不影响接口的使用。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| align7+ | [Alignment](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#alignment) | 否 | 是 | 设置浮层相对于组件的方位。  默认值：TopStart  **卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| offset7+ | [OverlayOffset](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-overlay#overlayoffset12) | 否 | 是 | 设置浮层基于自身左上角的偏移量。浮层默认处于组件左上角。  **卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |

说明

align和offset都设置时，效果重叠，浮层相对于组件方位定位后，再基于当前位置的左上角进行偏移。

## OverlayOffset12+

PhonePC/2in1TabletTVWearable

说明

为规范匿名对象的定义，API 12版本修改了此处的元素定义。其中，保留了历史匿名对象的起始版本信息，会出现外层元素@since版本号高于内层元素版本号的情况，但这不影响接口的使用。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| x7+ | number | 否 | 是 | 横向偏移量。  默认值：0  单位：vp  **卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| y7+ | number | 否 | 是 | 纵向偏移量。  默认值：0  单位：vp  **卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |

## ComponentContent12+

PhonePC/2in1TabletTVWearable

type ComponentContent<T = Object> = ComponentContent<T>

组件内容的实体封装。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [ComponentContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent)<T> | 组件内容的实体封装。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（通过string设置浮层）

该示例通过传入string设置浮层。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct OverlayExample {
5. build() {
6. Column() {
7. Column() {
8. Text('floating layer')
9. .fontSize(12).fontColor(0xCCCCCC).maxLines(1)
10. Column() {
11. // $r('app.media.img')需要替换为开发者所需的图像资源文件
12. Image($r('app.media.img'))
13. .width(240).height(240)
14. .overlay("Winter is a beautiful season, especially when it snows.", {
15. align: Alignment.Bottom,
16. offset: { x: 0, y: -15 }
17. })
18. }.border({ color: Color.Black, width: 2 })
19. }.width('100%')
20. }.padding({ top: 20 })
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/KFDtFOKWSWy_Lx77JjbBJA/zh-cn_image_0000002568759130.png?HW-CC-KV=V1&HW-CC-Date=20260511T034422Z&HW-CC-Expire=86400&HW-CC-Sign=57AAB55AEFA9246766CA8C52471A478B4F5FD4ED84DA616FF2F37C6C6F09F59B)

### 示例2（通过builder设置浮层）

该示例通过传入builder设置浮层。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct OverlayExample {
5. @Builder
6. OverlayNode() {
7. Column() {
8. // $r('app.media.img1')需要替换为开发者所需的图像资源文件
9. Image($r('app.media.img1'))
10. Text("This is overlayNode").fontSize(20).fontColor(Color.White)
11. }
12. .width(180)
13. .height(180)
14. .alignItems(HorizontalAlign.Center)
15. .hitTestBehavior(HitTestMode.Transparent) // 配置浮层不阻塞交互
16. }

18. build() {
19. Column() {
20. // $r('app.media.img2')需要替换为开发者所需的图像资源文件
21. Image($r('app.media.img2'))
22. .overlay(this.OverlayNode(), { align: Alignment.Center })
23. .objectFit(ImageFit.Contain)
24. }.width('100%')
25. .border({ color: Color.Black, width: 2 }).padding(20)
26. }
27. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/aPR-ThZkRMG1Np_b2i0-8g/zh-cn_image_0000002599358373.png?HW-CC-KV=V1&HW-CC-Date=20260511T034422Z&HW-CC-Expire=86400&HW-CC-Sign=0C8521533C7368D2B2B5769E13119BA4D74CC57632B9F36F7D36F2D64E09E1E9)

### 示例3（通过ComponentContent设置浮层）

该示例通过overlay传入了ComponentContent使backgroundColor不断发生变化。



```
1. // xxx.ets
2. import { ComponentContent } from '@kit.ArkUI';

4. class Params {
5. backgroundColor: string | Resource = ""

7. constructor(backgroundColor: string | Resource) {
8. this.backgroundColor = backgroundColor;
9. }
10. }

12. @Builder
13. function overlayBuilder(params: Params) {
14. Row() {
15. }.width('100%').height('100%').backgroundColor(params.backgroundColor)
16. }

18. @Entry
19. @Component
20. struct Page_4040 {
21. @State overlayColor: string = 'rgba(0, 0, 0, 0.6)';
22. private uiContext: UIContext = this.getUIContext();
23. private overlayNode: ComponentContent<Params> =
24. new ComponentContent(this.uiContext, wrapBuilder(overlayBuilder), new Params(this.overlayColor))

26. aboutToAppear(): void {
27. setInterval(() => {
28. if (this.overlayColor.includes('0.6')) {
29. this.overlayColor = 'rgba(0, 0, 0, 0.1)'
30. this.overlayNode.update(new Params(this.overlayColor));
31. } else {
32. this.overlayColor = 'rgba(0, 0, 0, 0.6)'
33. this.overlayNode.update(new Params(this.overlayColor));
34. }
35. }, 1000)
36. }

38. build() {
39. Row() {
40. Column() {
41. Text(this.overlayColor)
42. .fontSize(40)
43. .fontWeight(FontWeight.Bold)
44. }
45. .width('100%')
46. }
47. .height('100%')
48. .overlay(this.overlayNode)
49. }
50. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c7/v3/3hsVEcG2RGOvqLk3hHjEUA/zh-cn_image_0000002568918778.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034422Z&HW-CC-Expire=86400&HW-CC-Sign=1658ABDE2AC080C2BC3F7EA8D583F3FD4D5209DDB1129F35E4F8BB6488B4C9AB)