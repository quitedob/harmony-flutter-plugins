组件可交互状态下响应[点击事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click)、[触摸事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch)、[拖拽事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-drag-drop)、[按键事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key)、[焦点事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-focus-event)、[鼠标事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-mouse-key)、[轴事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-axis)、[悬浮事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-hover)、[无障碍悬浮事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-accessibility-hover-event)、[手势事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-gesture-settings)、[焦点轴事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-focus_axis)和[表冠事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-crown)。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

禁用控制属性仅在按下时生效，交互过程中更改enabled属性无效。

## enabled

PhonePC/2in1TabletTVWearable

enabled(value: boolean): T

设置组件是否可交互。当未设置enabled时，组件默认可交互。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 值为true表示组件可交互，响应点击等操作。  值为false表示组件不可交互，不响应点击等操作。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例通过enabled设置按钮可交互性。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct EnabledExample {
5. build() {
6. Flex({ justifyContent: FlexAlign.SpaceAround }) {
7. // 点击时无响应
8. Button('disable').enabled(false).backgroundColor(0x317aff).opacity(0.4)
9. Button('enable').backgroundColor(0x317aff)
10. }
11. .width('100%')
12. .padding({ top: 5 })
13. }
14. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/21/v3/9y_gln-0RCSMv5OlXL1-4Q/zh-cn_image_0000002599478365.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034203Z&HW-CC-Expire=86400&HW-CC-Sign=6DF49A5E5D8F03CB0572C85DF0EF1655C2B6DD9F2724157C6BE3A0BE31AA0F34)