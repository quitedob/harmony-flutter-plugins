用于决定在组件的宽高动画过程中，如何将动画最终的组件内容绘制在组件上。

说明

从API version 10开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## renderFit

PhonePC/2in1TabletTVWearable

renderFit(fitMode: RenderFit): T

设置宽高动画过程中的组件内容填充方式。不通过该接口设置，保持动画终态的内容大小，并且内容始终与组件保持左上角对齐。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fitMode | [RenderFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#renderfit10) | 是 | 设置宽高动画过程中的组件内容填充方式。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## renderFit18+

PhonePC/2in1TabletTVWearable

renderFit(fitMode: Optional<RenderFit>): T

设置宽高动画过程中的组件内容填充方式。不通过该接口设置，保持动画终态的内容大小，并且内容始终与组件保持左上角对齐。与[renderFit](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-renderfit#renderfit)相比，fitMode参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fitMode | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[RenderFit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#renderfit10)> | 是 | 设置宽高动画过程中的组件内容填充方式。  当fitMode的值为undefined时，取默认值。恢复为内容填充方式为RenderFit.TOP\_LEFT的效果。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

说明

对于TEXTURE和SURFACE类型的[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件，当不设置renderFit属性时，取默认值为RenderFit.RESIZE\_FILL。

对于SURFACE类型的[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件，背景色设置为不透明的纯黑色，在API version 18之前，其renderFit通用属性仅支持设置为RenderFit.RESIZE\_FILL；在API version 18及之后，支持所有的RenderFit枚举值。

对于使用[ArkUI NDK接口](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-access-the-arkts-page)创建的XComponent组件，不支持使用属性获取函数[getAttribute](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getattribute)获取其renderFit属性值。

## 示例

PhonePC/2in1TabletTVWearable

该示例主要演示通过renderFit设置宽高动画过程中的组件内容不同填充方式。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct RenderFitExample {
5. @State width1: number = 100;
6. @State height1: number = 30;
7. flag: boolean = true;

9. build() {
10. Column() {
11. Text("Hello")
12. .width(this.width1)
13. .height(this.height1)
14. .borderWidth(1)
15. .textAlign(TextAlign.Start)
16. .renderFit(RenderFit.LEFT)// 设置LEFT的renderFit，动画过程中，动画的终态内容与组件保持左对齐
17. .margin(20)

19. Text("Hello")
20. .width(this.width1)
21. .height(this.height1)
22. .textAlign(TextAlign.Center)
23. .borderWidth(1)
24. .renderFit(RenderFit.CENTER)// 设置CENTER的renderFit，动画过程中，动画的终态内容与组件保持中心对齐
25. .margin(20)

27. Button("animate")
28. .onClick(() => {
29. this.getUIContext()?.animateTo({ curve: Curve.Ease }, () => {
30. if (this.flag) {
31. this.width1 = 150;
32. this.height1 = 50;
33. } else {
34. this.width1 = 100;
35. this.height1 = 30;
36. }
37. this.flag = !this.flag;
38. })
39. })
40. }.width("100%").height("100%").alignItems(HorizontalAlign.Center)
41. }
42. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/29/v3/KE5k-sWKSheWHK18g5dwjw/zh-cn_image_0000002568918820.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034546Z&HW-CC-Expire=86400&HW-CC-Sign=7C033C0692E4B874985ED509B1ECCF0CE75D176834E1FD6EE22C1BD77C7BBC6E)