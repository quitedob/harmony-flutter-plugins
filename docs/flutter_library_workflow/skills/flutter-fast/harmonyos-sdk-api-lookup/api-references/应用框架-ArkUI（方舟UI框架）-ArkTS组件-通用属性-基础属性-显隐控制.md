控制组件是否可见。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## visibility

PhonePC/2in1TabletTVWearable

visibility(value: Visibility): T

控制组件的显示或隐藏。当未设置visibility时，组件默认为显示。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Visibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#visibility) | 是 | 控制当前组件显示或隐藏。根据具体场景需要可使用[条件渲染](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-ifelse)代替。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例通过配置visibility的不同值，实现不同的显隐控制效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct VisibilityExample {
5. build() {
6. Column() {
7. Column() {
8. // 隐藏不参与占位
9. Text('None').fontSize(9).width('90%').fontColor(0xCCCCCC)
10. Row().visibility(Visibility.None).width('90%').height(80).backgroundColor(0xAFEEEE)

12. // 隐藏参与占位
13. Text('Hidden').fontSize(9).width('90%').fontColor(0xCCCCCC)
14. Row().visibility(Visibility.Hidden).width('90%').height(80).backgroundColor(0xAFEEEE)

16. // 正常显示，组件默认的显示模式
17. Text('Visible').fontSize(9).width('90%').fontColor(0xCCCCCC)
18. Row().visibility(Visibility.Visible).width('90%').height(80).backgroundColor(0xAFEEEE)
19. }.width('90%').border({ width: 1 })
20. }.width('100%').margin({ top: 5 })
21. }
22. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/rUrew0UQRf-0AHUH_pnjvw/zh-cn_image_0000002568759124.png?HW-CC-KV=V1&HW-CC-Date=20260511T034416Z&HW-CC-Expire=86400&HW-CC-Sign=9E7AB7C821687A7051E10D43B74C4E1C2E4A5BEE67C57637B42017A4F8399C7A)