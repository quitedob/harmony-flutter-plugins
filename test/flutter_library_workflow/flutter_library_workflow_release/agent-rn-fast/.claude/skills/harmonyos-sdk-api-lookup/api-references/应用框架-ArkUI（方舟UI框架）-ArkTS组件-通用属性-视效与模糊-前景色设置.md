设置组件的前景色。与背景色相对应，前景色会影响绘制组件内容的颜色。主要影响文字的颜色、形状绘制组件的填充色。

说明

从API version 10开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## foregroundColor

PhonePC/2in1TabletTVWearable

foregroundColor(value: ResourceColor | ColoringStrategy): T

设置组件的前景色。当组件未设置前景色，默认继承父组件。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | [ColoringStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#coloringstrategy10) | 是 | 设置组件的前景颜色或者根据智能取色策略设置前景颜色。不支持[属性动画](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-animatorproperty)。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## foregroundColor18+

PhonePC/2in1TabletTVWearable

foregroundColor(color: Optional<ResourceColor | ColoringStrategy>): T

设置组件的前景色。当组件未设置前景色，默认继承父组件。与[foregroundColor](/consumer/cn/doc/harmonyos-references/ts-universal-attributes-foreground-color#foregroundcolor)相比，color参数新增了对undefined类型的支持。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| color | [Optional](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-custom-property#optionalt)<[ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | [ColoringStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#coloringstrategy10)> | 是 | 设置组件的前景颜色或者根据智能取色策略设置前景颜色。不支持属性动画。  当color的值为undefined时，维持之前取值或组件默认取值，具体行为不同组件可能会有差异，建议开发者使用确定颜色或[ColoringStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#coloringstrategy10)。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| T | 返回当前组件。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（使用前景色设置）

该示例主要演示通过foregroundColor设置前景色。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ForegroundColorExample {
5. build() {
6. Column({ space: 100 }) {
7. // 绘制一个直径为150的圆，默认填充色为黑色
8. Circle({ width: 150, height: 200 }).margin(20)
9. // 绘制一个直径为150的圆，设置前景色为橙色
10. Circle({ width: 150, height: 200 }).foregroundColor(Color.Orange)
11. }.width('100%').backgroundColor(Color.Gray)
12. }
13. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/--srM-EdR0OqmjSvoQNxOA/zh-cn_image_0000002568918814.png?HW-CC-KV=V1&HW-CC-Date=20260511T034523Z&HW-CC-Expire=86400&HW-CC-Sign=41447C9D8DC4EE66C431EA74008B946125E36DF80727329D8283AA1816ED31C6)

### 示例2（设置前景色为组件背景色反色）

该示例通过[ColoringStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#coloringstrategy10).INVERT将前景色设置为背景色反色。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ColoringStrategyExample {
5. build() {
6. Column({ space: 100 }) {
7. // 绘制一个直径为150的圆,默认填充色为黑色
8. Circle({ width: 150, height: 200 })
9. // 绘制一个直径为150的圆，设置前景色为组件背景色的反色
10. Circle({ width: 150, height: 200 })
11. .backgroundColor(Color.Black)
12. .foregroundColor(ColoringStrategy.INVERT)
13. }.width('100%')
14. }
15. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4/v3/2mZQ-tf7SDqbEiJkw9SCVw/zh-cn_image_0000002599478359.png?HW-CC-KV=V1&HW-CC-Date=20260511T034523Z&HW-CC-Expire=86400&HW-CC-Sign=105CB5719BCBB44E83AC64DD190191C48FB6CA85551F376C378A6474FED1CE4D)

### 示例3（前景色未继承父组件）

该示例主要演示组件同时设置前景色和背景色与只设置背景色的效果对比。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ForegroundColorInherit {
5. build() {
6. Column() {
7. Button('设置前景色为橘色').fontSize(20).foregroundColor(Color.Orange).backgroundColor(Color.Gray)
8. Divider()
9. Button('未设置前景色继承自父组件').fontSize(20).backgroundColor(Color.Gray)
10. }.foregroundColor(Color.Pink)
11. }
12. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/sWbPD5-ARXe-3xZ11Gl9BQ/zh-cn_image_0000002568759168.png?HW-CC-KV=V1&HW-CC-Date=20260511T034523Z&HW-CC-Expire=86400&HW-CC-Sign=393EE78F50569E3C731A2384F926F3DF499FB28D8BD476D5E06CF8B82EB64B74)