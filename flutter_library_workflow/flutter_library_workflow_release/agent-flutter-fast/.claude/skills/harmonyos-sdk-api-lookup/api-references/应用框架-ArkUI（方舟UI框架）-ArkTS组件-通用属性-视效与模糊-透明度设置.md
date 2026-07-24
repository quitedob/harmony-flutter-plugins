设置组件的透明度。

说明

从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## opacity

PhonePC/2in1TabletTVWearable

opacity(value: number | Resource): T

设置组件的不透明度。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | number | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 是 | 元素的不透明度，取值范围为0到1，若设置的值小于0时，则取值为0，若设置的值大于1时，则取值为1，1表示不透明，0表示完全透明，达到隐藏组件效果，但是在布局中占位。  默认值：1  **说明：**  子组件会继承父组件的透明度，并与自身的透明度属性叠加。如：父组件透明度为0.1，子组件设置透明度为0.8，则子组件实际透明度为0.1\*0.8=0.08。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## opacity18+

PhonePC/2in1TabletTVWearable

opacity(opacity: Optional<number | Resource>): T

设置组件的不透明度。与[opacity](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-opacity#opacity)相比，opacity参数新增了对undefined类型的支持。

**卡片能力：** 从API version 18开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| opacity | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<number | [Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource)> | 是 | 元素的不透明度，取值范围为0到1，若设置的值小于0时，则取值为0，若设置的值大于1时，则取值为1，1表示不透明，0表示完全透明，达到隐藏组件效果，但是在布局中占位。  默认值：1  **说明：**  子组件会继承父组件的透明度，并与自身的透明度属性叠加。如：父组件透明度为0.1，子组件设置透明度为0.8，则子组件实际透明度为0.1\*0.8=0.08。  当opacity的值为undefined时，恢复为默认不透明度为1的状态。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

该示例主要显示通过[opacity](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-opacity#opacity)设置组件的不透明度。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct OpacityExample {
5. build() {
6. Column({ space: 5 }) {
7. Text('opacity(1)').fontSize(9).width('90%').fontColor(0xCCCCCC)
8. Text().width('90%').height(50).opacity(1).backgroundColor(0xAFEEEE)
9. Text('opacity(0.7)').fontSize(9).width('90%').fontColor(0xCCCCCC)
10. Text().width('90%').height(50).opacity(0.7).backgroundColor(0xAFEEEE)
11. Text('opacity(0.4)').fontSize(9).width('90%').fontColor(0xCCCCCC)
12. Text().width('90%').height(50).opacity(0.4).backgroundColor(0xAFEEEE)
13. Text('opacity(0.1)').fontSize(9).width('90%').fontColor(0xCCCCCC)
14. Text().width('90%').height(50).opacity(0.1).backgroundColor(0xAFEEEE)
15. Text('opacity(0)').fontSize(9).width('90%').fontColor(0xCCCCCC)
16. Text().width('90%').height(50).opacity(0).backgroundColor(0xAFEEEE)
17. }
18. .width('100%')
19. .padding({ top: 5 })
20. }
21. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/n9F4FVUqQKWmtZlHDbM9CQ/zh-cn_image_0000002568759154.png?HW-CC-KV=V1&HW-CC-Date=20260511T034507Z&HW-CC-Expire=86400&HW-CC-Sign=4415FC9B8D829C2B99C5E6A783F6F66A08E4C8895AB84F1583159FFF04A81128)