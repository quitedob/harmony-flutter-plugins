设置组件是否使用反色能力，反色能力是在深浅色切换时自动对颜色值进行反色或变换，开发者可以通过主动设置不启用反色算法，以保持在深浅色切换时的原有逻辑。

说明

本模块首批接口从API version 21开始支持。后续版本的新增接口，采用上角标单独标记该接口的起始版本。

## allowForceDark

PhonePC/2in1TabletTVWearable

allowForceDark(value: boolean): T

设置组件是否使用反色能力。

说明

* 当组件主动设置不使用反色能力时，该组件及其所有子组件均不启用反色能力，不受父组件、祖先组件以及自身子组件的反色配置影响。
* 该接口仅在开启了反色能力的情况下生效，开启反色能力可参考[利用反色能力快速适配深色模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ui-dark-light-color-adaptation#利用反色能力快速适配深色模式)。

**元服务API：** 从API version 21开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 组件是否使用反色能力。true：组件使用反色能力；false：组件不使用反色能力。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable



```
1. // 组件添加allowForceDark(false)属性后，说明对当前组件不使用反色相关能力。
2. @Entry
3. @Component
4. struct ComponentPage {
5. build() {
6. Column() {
7. Column() {
8. Text("Hello World")
9. .fontSize(20)
10. .fontColor(Color.Blue)
11. .onClick(() => {
12. console.info(`Text is clicked`);
13. })
14. }
15. .allowForceDark(false) // Column及其子组件Text不生效反色能力，不受父组件Column使用反色能力的影响。

17. Row() {
18. Button('BUTTON')
19. .backgroundColor(Color.Grey)
20. .allowForceDark(true)
21. .onClick(() => {
22. console.info(`Button is clicked`);
23. })
24. }
25. .allowForceDark(false) // Row及其子组件Button不生效反色能力，不受父组件Column使用反色能力的影响。
26. }
27. .allowForceDark(true)
28. .width('100%')
29. .height('100%')
30. }
31. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7/v3/f_6MgrQSQ1681Vov4YlJXQ/zh-cn_image_0000002568918782.png?HW-CC-KV=V1&HW-CC-Date=20260511T034431Z&HW-CC-Expire=86400&HW-CC-Sign=B69F5FA35531986F57BD743EE643A8C3C243B67EA4E208BBD01F7E9ADE2ECD01)