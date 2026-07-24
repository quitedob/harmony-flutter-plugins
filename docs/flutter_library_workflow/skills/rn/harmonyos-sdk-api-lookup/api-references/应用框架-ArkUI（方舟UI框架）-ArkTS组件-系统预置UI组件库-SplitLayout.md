上下结构布局介绍了常用的页面布局样式。主要分为上下文本和上下图文两种类型。

说明

* 该组件从API version 10开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 该组件仅可在Stage模型下使用。
* 如果SplitLayout设置[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)和[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)，编译工具链会额外生成节点\_\_Common\_\_，并将通用属性或通用事件挂载在\_\_Common\_\_上，而不是直接应用到SplitLayout本身。这可能导致开发者设置的通用属性或通用事件不生效或不符合预期，因此，不建议SplitLayout设置通用属性和通用事件。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { SplitLayout } from '@kit.ArkUI';
```

## 子组件

PhonePC/2in1TabletTVWearable

无

## SplitLayout

PhonePC/2in1TabletTVWearable

SplitLayout({mainImage: Resource, primaryText: string, secondaryText?: string, tertiaryText?: string, container: () => void })

**装饰器类型：**@Component

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**设备行为差异：** 该接口在Wearable设备上使用时，应用程序运行异常，异常信息中提示接口未定义，在其他设备中可正常调用。

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| mainImage | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | @State | 传入图片。 |
| primaryText | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 是 | @Prop | 标题内容。 |
| secondaryText | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | @Prop | 副标题内容。当需要在标题下方显示副标题时传入，不传入时取默认值，不显示副标题。 |
| tertiaryText | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | @Prop | 辅助文本。当需要显示辅助文本时传入，不传入时取默认值，不显示辅助文本。 |
| container | () => void | 是 | @BuilderParam | 容器内组件。 |

## 事件

PhonePC/2in1TabletTVWearable

不支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable

该示例通过SplitLayout实现了页面布局，并具备自适应能力。



```
1. import { SplitLayout } from '@kit.ArkUI';

3. @Entry
4. @Component
5. struct Index {
6. @State demoImage: Resource = $r("app.media.background");

8. build() {
9. Column() {
10. SplitLayout({
11. mainImage: this.demoImage,
12. primaryText: '新歌推荐',
13. secondaryText: '私人订制新歌精选站，为你推荐专属优质新歌;',
14. tertiaryText: '每日更新',
15. }) {
16. Text('示例：空白区域容器内可添加组件')
17. .margin({ top: 36 })
18. }
19. }
20. .justifyContent(FlexAlign.SpaceBetween)
21. .height('100%')
22. .width('100%')
23. }
24. }
```

小于等于600vp布局：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/Tu6DejM5TguTxR4RZv640A/zh-cn_image_0000002568919432.png?HW-CC-KV=V1&HW-CC-Date=20260511T035917Z&HW-CC-Expire=86400&HW-CC-Sign=68F314D25D6F2222E811EF343AAE3F05362E8E756E4DF44DCAF6EC437A8245D4)

大于600vp且小于等于840vp的布局：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/4VgThNo_RVSGxxxfl7_PSw/zh-cn_image_0000002599478975.png?HW-CC-KV=V1&HW-CC-Date=20260511T035917Z&HW-CC-Expire=86400&HW-CC-Sign=67D90DBB4617AA4D94987E0C840CE5A03A4B0FA79025C6D5AF4A9D1BA90413E4)

大于840vp布局：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/rZVvvqwRT3e6_Xw86zzhOA/zh-cn_image_0000002568759784.png?HW-CC-KV=V1&HW-CC-Date=20260511T035917Z&HW-CC-Expire=86400&HW-CC-Sign=DF6822F1D25837D26EB2B1F3D5A08A48374ECAA02B48D93EB59C8D98D130FAB5)