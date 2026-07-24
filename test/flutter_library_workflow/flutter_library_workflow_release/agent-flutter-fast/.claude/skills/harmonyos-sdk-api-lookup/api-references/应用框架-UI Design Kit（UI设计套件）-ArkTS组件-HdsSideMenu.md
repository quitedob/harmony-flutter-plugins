本模块提供一种菜单栏样式组件。设置侧边栏对应的一级菜单和二级菜单，并显示其新消息数量。

**起始版本：** 6.0.0(20)

## 导入模块

PhonePC/2in1TabletTV



```
1. import { HdsSideMenu, HdsSideMenuMainItem, HdsSideMenuSubItem, HdsSideMenuBadgeParam} from '@kit.UIDesignKit';
```

## 接口

PhonePC/2in1TabletTV

HdsSideMenu({items?: HdsSideMenuMainItem[], selectedIndex: number, $selectedIndex?: OnSelectedIndexChange, maxItemTextLines?: number})

侧边菜单栏组件信息。

**装饰器类型：** @ComponentV2

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

展开

| 参数名 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| items | [HdsSideMenuMainItem](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenumainitem)[] | 否 | @Param | 一级菜单栏组，数量最多为5个。 |
| selectedIndex | number | 是 | @Param  @Require | 当前选中的菜单栏。  取值范围：大于等于-1的整数。  -1表示当前侧边菜单栏没有菜单被选中。 |
| $selectedIndex | [OnSelectedIndexChange](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#onselectedindexchange) | 否 | @Event | 用于双向绑定selectedIndex。 |
| maxItemTextLines | number | 否 | @Param | 设置最大内容行数。  默认值：1。  取值范围：(0, +∞)的整数。 |

## build

PhonePC/2in1TabletTV

build(): void

struct的默认构造函数，无法直接调用此方法。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

## HdsSideMenuMainItem

PhonePC/2in1TabletTV

HdsSideMenu一级菜单栏。

**装饰器类型**：@ObservedV2

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

### constructor

PhonePC/2in1TabletTV

constructor(param: HdsSideMenuMainItemParam)

HdsSideMenuMainItem的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| param | [HdsSideMenuMainItemParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenumainitemparam) | 是 | HdsSideMenu一级菜单栏的参数。 |

### getSideMenuSubItem

PhonePC/2in1TabletTV

getSideMenuSubItem(): HdsSideMenuSubItem[]

从一级菜单对象获取当前菜单下的二级菜单对象数组。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [HdsSideMenuSubItem](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenusubitem)[] | 当前菜单下的二级菜单对象数组。 |

### updateBadge

PhonePC/2in1TabletTV

updateBadge(badge?: HdsSideMenuBadgeParam): HdsSideMenuMainItem

更新一级菜单栏的角标属性。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| badge | [HdsSideMenuBadgeParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubadgeparam) | 否 | HdsSideMenu上带信息提醒的图标配置信息。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [HdsSideMenuMainItem](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenumainitem) | 当前菜单下的一级菜单对象。 |

## HdsSideMenuSubItem

PhonePC/2in1TabletTV

HdsSideMenu二级菜单栏。

**装饰器类型**：@ObservedV2

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

### constructor

PhonePC/2in1TabletTV

constructor(param: HdsSideMenuSubItemParam)

HdsSideMenuSubItem的构造函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| param | [HdsSideMenuSubItemParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenusubitemparam) | 是 | HdsSideMenu二级菜单栏的参数。 |

### updateBadge

PhonePC/2in1TabletTV

updateBadge(badge?: HdsSideMenuBadgeParam): HdsSideMenuSubItem

更新二级菜单栏的角标属性。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| badge | [HdsSideMenuBadgeParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubadgeparam) | 否 | HdsSideMenu上带信息提醒的图标配置信息。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [HdsSideMenuSubItem](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenusubitem) | 当前菜单下的二级菜单对象。 |

## HdsSideMenuBadgeParam

PhonePC/2in1TabletTV

HdsSideMenu上带信息提醒的图标配置信息。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| count | number | 否 | 是 | 设置提醒消息数。值为0时不显示；值为1时，显示“·”；大于99时，显示“99+”。不支持设置小于0的数字。  默认值：0。 |
| value | string | 否 | 是 | 提示内容的文本字符串，超长文本换行显示。  默认值：""。 |

## HdsSideMenuBaseItemParam

PhonePC/2in1TabletTV

HdsSideMenu菜单栏基础类。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| itemId | string | 否 | 是 | 菜单的id。  默认值：""。 |
| label | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 菜单显示的文本内容。 |
| action | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<void> | 否 | 是 | 点击菜单时的回调。 |

## HdsSideMenuMainItemParam

PhonePC/2in1TabletTV

HdsSideMenu一级菜单栏配置项，继承自[HdsSideMenuBaseItemParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubaseitemparam)。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| icon | [ResourceStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcestr) | 否 | 是 | 设置一级菜单栏的图标，优先级高于symbol。 |
| symbol | [SymbolGlyphModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-attribute-modifier#自定义modifier) | 否 | 是 | 设置一级菜单栏的图标。 |
| hdsSideMenuSubItem | [HdsSideMenuSubItem](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenusubitem)[] | 否 | 是 | 设置一级菜单栏中的二级菜单栏数组。二级菜单栏数量最多5个。 |
| badge | [HdsSideMenuBadgeParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubadgeparam) | 否 | 是 | 设置一级菜单栏上带信息提醒的图标配置信息。 |

## HdsSideMenuSubItemParam

PhonePC/2in1TabletTV

HdsSideMenu二级菜单栏配置项，继承自[HdsSideMenuBaseItemParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubaseitemparam)。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| badge | [HdsSideMenuBadgeParam](/consumer/cn/doc/harmonyos-references/ui-design-hdssidemenu#hdssidemenubadgeparam) | 否 | 是 | 设置二级菜单栏上带信息提醒的图标配置信息。 |

## 事件

PhonePC/2in1TabletTV

## OnSelectedIndexChange

PhonePC/2in1TabletTV

type OnSelectedIndexChange = (selectedIndex: number) => void

HdsSideMenu的selectedIndex发生变化时的回调函数。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.UIDesign.HDSPattern.Standard

**起始版本：** 6.0.0(20)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| selectedIndex | number | 是 | 选择项的序号。 |

## 示例

PhonePC/2in1TabletTV

HdsSideMenu提供一种菜单栏样式。



```
1. import { HdsSideMenu, HdsSideMenuMainItem, HdsSideBar } from '@kit.UIDesignKit';
2. import { SymbolGlyphModifier } from '@kit.ArkUI';

4. @Entry
5. @ComponentV2
6. struct Index {
7. @Local isShowSidebar: boolean = true;
8. @Local selectedIndex: number = 1;
9. listOptionsDefault?: HdsSideMenuMainItem[] = [
10. new HdsSideMenuMainItem({
11. symbol: new SymbolGlyphModifier($r('sys.symbol.doc_plaintext')),
12. label: '全部备忘',
13. }),
14. new HdsSideMenuMainItem({
15. symbol: new SymbolGlyphModifier($r('sys.symbol.star')),
16. label: '收藏',
17. }),
18. new HdsSideMenuMainItem({
19. symbol: new SymbolGlyphModifier($r('sys.symbol.lock')),
20. label: '加锁',
21. }),
22. new HdsSideMenuMainItem({
23. symbol: new SymbolGlyphModifier($r('sys.symbol.trash')),
24. label: '最近删除',
25. }),
26. new HdsSideMenuMainItem({
27. label: '文件夹',
28. }),
29. ]

31. @Builder
32. SideBarPanelBuilder() {
33. Column() {
34. HdsSideMenu({
35. items: this.listOptionsDefault,
36. selectedIndex: this.selectedIndex,
37. $selectedIndex: (selectedIndex: number) => {
38. this.selectedIndex = selectedIndex;
39. },
40. })
41. }
42. .width('100%')
43. .height('100%')
44. .margin(40)
45. }

47. @Builder
48. ContentPanelBuilder() {
49. Column() {
50. Image($r('sys.media.ohos_ic_public_albums'))
51. .width('120vp')
52. .height('120vp')
53. }
54. .margin({ top: 250 })
55. }

57. @BuilderParam contentBuilder: () => void = this.ContentPanelBuilder
58. @BuilderParam sideBarBuilder: () => void = this.SideBarPanelBuilder

60. @Builder
61. build() {
62. Stack({ alignContent: Alignment.TopStart }) {
63. Button() {
64. SymbolGlyph(this.isShowSidebar ? $r('sys.symbol.open_sidebar') : $r('sys.symbol.close_sidebar'))
65. .fontWeight(FontWeight.Normal)
66. .fontSize($r('sys.float.ohos_id_text_size_headline7'))
67. .fontColor([$r('sys.color.ohos_id_color_titlebar_icon')])
68. .hitTestBehavior(HitTestMode.None)
69. }
70. .id('side_bar_button')
71. .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
72. .height(30)
73. .width(30)
74. .onClick(() => {
75. this.isShowSidebar = !this.isShowSidebar;
76. })
77. .zIndex(1)
78. .margin({ top: 10, left: 10 })

80. HdsSideBar({
81. sideBarPanelBuilder: (): void => {
82. this.sideBarBuilder()
83. },
84. contentPanelBuilder: (): void => {
85. this.contentBuilder()
86. },
87. isShowSideBar: this.isShowSidebar,
88. $isShowSideBar: (isShowSidebar: boolean) => {
89. this.isShowSidebar = !isShowSidebar
90. },
91. })
92. }
93. }
94. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5f/v3/Lz8UTb7-RpG7Wlxb6SQmMw/zh-cn_image_0000002599359423.png?HW-CC-KV=V1&HW-CC-Date=20260511T044235Z&HW-CC-Expire=86400&HW-CC-Sign=0F3072C6E4B5B4D5092FE28F107FBB8AE8BED6598C3D809F169DC47CA733351D)