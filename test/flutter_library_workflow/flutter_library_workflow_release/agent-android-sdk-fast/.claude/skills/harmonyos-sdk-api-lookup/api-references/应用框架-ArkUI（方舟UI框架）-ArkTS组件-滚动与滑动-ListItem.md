用来展示列表具体item，必须配合List来使用。

说明

* 该组件从API version 7开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 该组件的父组件只能是[List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list)或者[ListItemGroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-listitemgroup)。
* 当ListItem配合[LazyForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-lazyforeach)使用时，ListItem子组件在ListItem创建时创建。配合[if/else](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-ifelse)、[ForEach](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-rendering-control-foreach)使用时，或父组件为List/ListItemGroup时，ListItem子组件在ListItem布局时创建。

## 子组件

PhonePC/2in1TabletTVWearable

可以包含单个子组件。

## 接口

PhonePC/2in1TabletTVWearable

### ListItem10+

PhonePC/2in1TabletTVWearable

ListItem(value?: ListItemOptions)

创建ListItem组件。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [ListItemOptions](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitemoptions10对象说明) | 否 | 为ListItem提供可选参数，该对象内含有[ListItemStyle](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitemstyle10枚举说明)枚举类型的style参数。  默认值：{ style: ListItemStyle.NONE } |

### ListItem(deprecated)

PhonePC/2in1TabletTVWearable

ListItem(value?: string)

创建ListItem组件。

说明

从API version 7开始支持，从API version 10开始废弃，建议使用[ListItem10+](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitem10)替代。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | string | 否 | 无 |

## 属性

PhonePC/2in1TabletTVWearable

除支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)外，还支持以下属性：

### sticky(deprecated)

PhonePC/2in1TabletTVWearable

sticky(value: Sticky)

设置ListItem吸顶效果。

说明

从API version 7开始支持，从API version 9开始废弃，建议使用[sticky](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list#sticky9)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [Sticky](/consumer/cn/doc/harmonyos-references/ts-container-listitem#stickydeprecated枚举说明) | 是 | ListItem吸顶效果。  默认值：Sticky.None |

### editable(deprecated)

PhonePC/2in1TabletTVWearable

editable(value: boolean | EditMode)

设置当前ListItem元素是否可编辑，进入编辑模式后可删除或移动列表项。

说明

从API version 7开始支持，从API version 9开始废弃，无替代接口。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | [EditMode](/consumer/cn/doc/harmonyos-references/ts-container-listitem#editmodedeprecated枚举说明) | 是 | ListItem元素是否可编辑。  默认值：false |

### selectable8+

PhonePC/2in1TabletTVWearable

selectable(value: boolean)

设置当前ListItem元素是否可以被鼠标框选。外层List容器的鼠标框选开启时，ListItem的框选才生效。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | ListItem元素是否可以被鼠标框选。设置为true时可以被鼠标框选，设置为false时无法被鼠标框选。  默认值：true |

### selected10+

PhonePC/2in1TabletTVWearable

selected(value: boolean)

设置当前ListItem选中状态。该属性支持[$$](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-two-way-sync)双向绑定变量。该属性需要在设置[多态样式](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-polymorphic-style)前使用才能生效选中态样式。

**卡片能力：** 从API version 10开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | boolean | 是 | 当前ListItem选中状态。设置为true时为选中状态，设置为false时为默认状态。  默认值：false |

### swipeAction9+

PhonePC/2in1TabletTVWearable

swipeAction(value: SwipeActionOptions)

用于设置ListItem的划出组件。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| value | [SwipeActionOptions](/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeactionoptions9对象说明) | 是 | ListItem的划出组件。 |

## Sticky(deprecated)枚举说明

PhonePC/2in1TabletTVWearable

ListItem吸顶效果枚举。

说明

从API version 7开始支持，从API version 9开始废弃，建议使用List组件的[stickyStyle枚举](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-list#stickystyle9枚举说明)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| None | - | 无吸顶效果。 |
| Normal | - | 当前item吸顶。 |
| Opacity | - | 当前item吸顶显示透明度变化效果。 |

## EditMode(deprecated)枚举说明

PhonePC/2in1TabletTVWearable

ListItem元素编辑模式枚举。

说明

从API version 7开始支持，从API version 9开始废弃，无替代接口。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| None | - | 编辑操作不限制。 |
| Deletable | - | 可删除。 |
| Movable | - | 可移动。 |

## SwipeEdgeEffect9+枚举说明

PhonePC/2in1TabletTVWearable

滑动效果枚举。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| Spring | - | ListItem划动距离超过划出组件大小后可以继续划动。  如果设置了删除区域，ListItem划动距离超过删除阈值后可以继续划动，  松手后按照弹簧阻尼曲线回弹。 |
| None | - | ListItem划动距离不能超过划出组件大小。  如果设置了删除区域，ListItem划动距离不能超过删除阈值，  并且在设置删除回调的情况下，达到删除阈值后松手触发删除回调。 |

## SwipeActionOptions9+对象说明

PhonePC/2in1TabletTVWearable

start和end对应的@builder函数中顶层必须是单个组件，否则会引发未定义行为。如果@builder函数中顶层是if/else、ForEach等语句，那么需要保证if/else、ForEach等语句必须能生成单个组件。

滑动手势只在listItem区域上，如果子组件划出ListItem区域外，在ListItem以外部分不会响应划动手势。所以在多列模式下，建议不要将划出组件设置太宽。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| start | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8) | [SwipeActionItem](/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeactionitem10对象说明) | 否 | 是 | ListItem向右划动时item左边的组件（List垂直布局时）或ListItem向下划动时item上方的组件（List水平布局时）。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| end | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8) | [SwipeActionItem](/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeactionitem10对象说明) | 否 | 是 | ListItem向左划动时item右边的组件（List垂直布局时）或ListItem向上划动时item下方的组件（List水平布局时）。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| edgeEffect | [SwipeEdgeEffect](/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeedgeeffect9枚举说明) | 否 | 是 | 滑动效果。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onOffsetChange11+ | (offset: number) => void | 否 | 是 | 当列表项向左或向右滑动（当列表方向为“垂直”时），向上或向下滑动（当列表方向为“水平”时）位置发生变化触发，以vp为单位。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |

## SwipeActionItem10+对象说明

PhonePC/2in1TabletTVWearable

List垂直布局，ListItem向右滑动时，item左边的长距离滑动删除选项。向左滑动时，item右边的长距离滑动删除选项。

List水平布局，ListItem向上滑动时，item下边的长距离滑动删除选项。向下滑动时，item上边的长距离滑动删除选项。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| actionAreaDistance | [Length](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#length) | 否 | 是 | 设置组件长距离滑动删除距离阈值。即划出组件被完全滑进视窗后，继续滑动触发删除的距离阈值。  默认值：56vp  **说明：**  不支持设置百分比。  删除距离阈值大于item宽度减去划出组件宽度，或删除距离阈值小于等于0就不会设置删除区域。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onAction | () => void | 否 | 是 | 组件进入长距删除区后抬手时触发。  **说明：**  滑动后松手的位置超过或等于设置的距离阈值，并且设置的距离阈值有效时才会触发。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onEnterActionArea | () => void | 否 | 是 | 在滑动条目进入删除区域时调用，只触发一次，当再次进入时仍触发。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| onExitActionArea | () => void | 否 | 是 | 当滑动条目退出删除区域时调用，只触发一次，当再次退出时仍触发。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| builder | [CustomBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#custombuilder8) | 否 | 是 | 当列表项向左或向右滑动（当列表方向为“垂直”时），向上或向下滑动（当列表方向为“水平”时）时显示的操作项。  **元服务API：** 从API version 11开始，该接口支持在元服务中使用。 |
| builderComponent18+ | [ComponentContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent) | 否 | 是 | 当列表项向左或向右滑动（当列表方向为“垂直”时），向上或向下滑动（当列表方向为“水平”时）时显示的操作项。  **说明：**  该参数的优先级高于参数builder。即同时设置builder和builderComponent时，以builderComponent设置的值为准。  同一个builderComponent不推荐同时给不同的start/end使用，否则会导致显示问题。  **元服务API：** 从API version 18开始，该接口支持在元服务中使用。 |
| onStateChange11+ | (state:[SwipeActionState](/consumer/cn/doc/harmonyos-references/ts-container-listitem#swipeactionstate11枚举说明)) => void | 否 | 是 | 当列表项滑动状态变化时候触发。  **元服务API：** 从API version 12开始，该接口支持在元服务中使用。 |

## ListItemOptions10+对象说明

PhonePC/2in1TabletTVWearable

ListItem组件参数。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| style | [ListItemStyle](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitemstyle10枚举说明) | 否 | 是 | 设置List组件卡片样式。  默认值：ListItemStyle.NONE  设置为ListItemStyle.NONE时无样式。  设置为ListItemStyle.CARD时，建议配合[ListItemGroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-listitemgroup)的ListItemGroupStyle.CARD同时使用，显示默认卡片样式。  卡片样式下，ListItem默认规格：高度48vp，宽度100%，左右内边距8vp。如果需要实现ListItem高度自适应，可以把height设置为undefined。  卡片样式下，为卡片内的列表选项提供了默认的focus、hover、press、selected和disable样式。  **说明：**  当设置为ListItemStyle.CARD时，List的listDirection属性值须为Axis.Vertical，如果设置为Axis.Horizontal，会导致显示混乱；List属性alignListItem默认为ListItemAlign.Center，居中对齐显示。 |

## ListItemStyle10+枚举说明

PhonePC/2in1TabletTVWearable

List组件卡片样式枚举。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| NONE | 0 | 无样式。 |
| CARD | 1 | 显示默认卡片样式。 |

## SwipeActionState11+枚举说明

PhonePC/2in1TabletTVWearable

列表项滑动状态枚举。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| COLLAPSED | 0 | 收起状态，当ListItem向左或向右滑动（当列表方向为“垂直”时），  向上或向下滑动（当列表方向为“水平”时）时操作项处于隐藏状态。 |
| EXPANDED | 1 | 展开状态，当ListItem向左或向右滑动（当列表方向为“垂直”时），  向上或向下滑动（当列表方向为“水平”时）时操作项处于显示状态。  **说明：**  需要ListItem设置向左或向右滑动（当列表方向为“垂直”时），  向上或向下滑动（当列表方向为“水平”时）时显示的操作项。 |
| ACTIONING | 2 | 长距离状态，当ListItem进入长距删除区后删除ListItem的状态。  **说明：**  滑动后松手的位置超过或等于设置的距离阈值，并且设置的距离阈值有效时才能进入该状态。 |

## 事件

PhonePC/2in1TabletTVWearable

### onSelect8+

PhonePC/2in1TabletTVWearable

onSelect(event: (isSelected: boolean) => void)

ListItem元素被鼠标框选的状态改变时触发回调。

**卡片能力：** 从API version 9开始，该接口支持在ArkTS卡片中使用。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isSelected | boolean | 是 | 进入鼠标框选范围即被选中返回true， 移出鼠标框选范围即未被选中返回false。 |

## ListItemSwipeActionManager21+

PhonePC/2in1TabletTVWearable

ListItem划出菜单的管理器。

### expand21+

PhonePC/2in1TabletTVWearable

expand(node: FrameNode, direction: ListItemSwipeActionDirection): void

展开指定ListItem的划出菜单。

**元服务API：** 从API version 21开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| node | [FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode) | 是 | ListItem节点对象。 |
| direction | [ListItemSwipeActionDirection](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitemswipeactiondirection21枚举说明) | 是 | ListItem划出菜单的展开方向。 |

**错误码：**

以下错误码的详细介绍请参见[自定义节点错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-node)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 100023 | The component type of the node is incorrect. |
| 106203 | The node not mounted to component tree. |

说明

* 如果List组件cachedCount属性isShow参数设置为true，List显示区域外已预加载完成的ListItem支持展开，否则List显示区域外节点不支持展开。

### collapse21+

PhonePC/2in1TabletTVWearable

collapse(node: FrameNode): void

收起指定ListItem的划出菜单。

**元服务API：** 从API version 21开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| node | [FrameNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode) | 是 | ListItem节点对象。 |

**错误码：**

以下错误码的详细介绍请参见[自定义节点错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-node)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 100023 | The component type of the node is incorrect. |
| 106203 | The node not mounted to component tree. |

## ListItemSwipeActionDirection21+枚举说明

PhonePC/2in1TabletTVWearable

ListItem划出菜单的展开方向。

**元服务API：** 从API version 21开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| START | 0 | 当列表方向是垂直方向时，LTR模式下表示ListItem的左边，RTL模式下表示ListItem的右边。当列表是水平方向时，表示ListItem的上边。 |
| END | 1 | 当列表方向是垂直方向时，LTR模式下表示ListItem的右边，RTL模式下表示ListItem的左边。当列表是水平方向时，表示ListItem的下边。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（创建ListItem）

该示例实现了创建ListItem的基本用法。



```
1. // xxx.ets
2. export class ListDataSource implements IDataSource {
3. private list: number[] = [];

5. constructor(list: number[]) {
6. this.list = list;
7. }

9. totalCount(): number {
10. return this.list.length;
11. }

13. getData(index: number): number {
14. return this.list[index];
15. }

17. registerDataChangeListener(listener: DataChangeListener): void {
18. }

20. unregisterDataChangeListener(listener: DataChangeListener): void {
21. }
22. }

24. @Entry
25. @Component
26. struct ListItemExample {
27. private arr: ListDataSource = new ListDataSource([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

29. build() {
30. Column() {
31. List({ space: 20, initialIndex: 0 }) {
32. LazyForEach(this.arr, (item: number) => {
33. ListItem() {
34. Text('' + item)
35. .width('100%')
36. .height(100)
37. .fontSize(16)
38. .textAlign(TextAlign.Center)
39. .borderRadius(10)
40. .backgroundColor(0xFFFFFF)
41. }
42. }, (item: string) => item)
43. }.width('90%')
44. .scrollBar(BarState.Off)
45. }.width('100%').height('100%').backgroundColor(0xDCDCDC).padding({ top: 5 })
46. }
47. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/w39m9PAPQDyUHPBR_pIZ8w/zh-cn_image_0000002599478455.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034908Z&HW-CC-Expire=86400&HW-CC-Sign=43A7CD479EEFAB9579A0FA614774B6915AE9CE7CDF05F54E3699DE3B75103485)

### 示例2（设置划出组件）

该示例展示了ListItem设置了swipeAction的横滑效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ListItemExample2 {
5. @State arr: number[] = [0, 1, 2, 3, 4];
6. @State enterEndDeleteAreaString: string = 'not enterEndDeleteArea';
7. @State exitEndDeleteAreaString: string = 'not exitEndDeleteArea';
8. private scroller: ListScroller = new ListScroller();

10. @Builder
11. itemEnd() {
12. Row() {
13. Button('Delete').margin('4vp')
14. Button('Set').margin('4vp').onClick(() => {
15. try {
16. this.scroller.closeAllSwipeActions();
17. } catch (error) {
18. console.info('Failed to close all swipe actions:', error);
19. }
20. })
21. }.padding('4vp').justifyContent(FlexAlign.SpaceEvenly)
22. }

24. build() {
25. Column() {
26. List({ space: 10, scroller: this.scroller }) {
27. ForEach(this.arr, (item: number) => {
28. ListItem() {
29. Text('item' + item)
30. .width('100%')
31. .height(100)
32. .fontSize(16)
33. .textAlign(TextAlign.Center)
34. .borderRadius(10)
35. .backgroundColor(0xFFFFFF)
36. }
37. .transition(TransitionEffect.OPACITY)
38. .swipeAction({
39. end: {
40. builder: () => {
41. this.itemEnd()
42. },
43. onAction: () => {
44. this.getUIContext()?.animateTo({ duration: 1000 }, () => {
45. let index = this.arr.indexOf(item);
46. this.arr.splice(index, 1);
47. });
48. },
49. actionAreaDistance: 56,
50. onEnterActionArea: () => {
51. this.enterEndDeleteAreaString = 'enterEndDeleteArea';
52. this.exitEndDeleteAreaString = 'not exitEndDeleteArea';
53. },
54. onExitActionArea: () => {
55. this.enterEndDeleteAreaString = 'not enterEndDeleteArea';
56. this.exitEndDeleteAreaString = 'exitEndDeleteArea';
57. }
58. }
59. })
60. }, (item: number) => item.toString())
61. }

63. Text(this.enterEndDeleteAreaString).fontSize(20)
64. Text(this.exitEndDeleteAreaString).fontSize(20)
65. }
66. .padding(10)
67. .backgroundColor(0xDCDCDC)
68. .width('100%')
69. .height('100%')
70. }
71. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/-SLOc2JmRkuH3K1cm1l2ow/zh-cn_image_0000002568759264.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034908Z&HW-CC-Expire=86400&HW-CC-Sign=F860C1C7744F5218D4A7D806B0F572902F49393C942D2D1FB2372CF707B95C35)

### 示例3（设置卡片样式）

该示例展示了ListItem的卡片样式效果。



```
1. // xxx.ets
2. @Entry
3. @Component
4. struct ListItemExample3 {
5. build() {
6. Column() {
7. List({ space: '4vp', initialIndex: 0 }) {
8. ListItemGroup({ style: ListItemGroupStyle.CARD }) {
9. ForEach([ListItemStyle.CARD, ListItemStyle.CARD, ListItemStyle.NONE], (itemStyle: number, index?: number) => {
10. ListItem({ style: itemStyle }) {
11. Text('' + index)
12. .width('100%')
13. .textAlign(TextAlign.Center)
14. }
15. })
16. }

18. ForEach([ListItemStyle.CARD, ListItemStyle.CARD, ListItemStyle.NONE], (itemStyle: number, index?: number) => {
19. ListItem({ style: itemStyle }) {
20. Text('' + index)
21. .width('100%')
22. .textAlign(TextAlign.Center)
23. }
24. })
25. }
26. .width('100%')
27. .multiSelectable(true)
28. .backgroundColor(0xDCDCDC)
29. }
30. .width('100%')
31. .padding({ top: 5 })
32. }
33. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/LkNHUHJeRBuZj2oPWP9vmg/zh-cn_image_0000002599358507.jpeg?HW-CC-KV=V1&HW-CC-Date=20260511T034908Z&HW-CC-Expire=86400&HW-CC-Sign=25ED9E257E777F39554B4A7681C7BEC2EA9721BAA70A4B1481FC8B9E8966CE27)

### 示例4（通过ComponentContent设置划出组件）

该示例通过[ComponentContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent#componentcontent-1)设置ListItem中的划出组件操作时显示的操作项。



```
1. // xxx.ets
2. import { ComponentContent } from '@kit.ArkUI';

4. class BuilderParams {
5. text: string | Resource;
6. scroller: ListScroller;

8. constructor(text: string | Resource, scroller: ListScroller) {
9. this.text = text;
10. this.scroller = scroller;
11. }
12. }

14. @Builder
15. function itemBuilder(params: BuilderParams) {
16. Row() {
17. Button(params.text).margin('4vp')
18. Button('Set').margin('4vp').onClick(() => {
19. params.scroller.closeAllSwipeActions()
20. })
21. }.padding('4vp').justifyContent(FlexAlign.SpaceEvenly)
22. }

24. @Component
25. struct MyListItem {
26. scroller: ListScroller = new ListScroller();
27. @State arr: number[] = [0, 1, 2, 3, 4];
28. @State project ?: number = 0;
29. startBuilder ?: ComponentContent<BuilderParams> = undefined;
30. endBuilder ?: ComponentContent<BuilderParams> = undefined;
31. builderParam = new BuilderParams('delete', this.scroller);

33. aboutToAppear(): void {
34. this.startBuilder = new ComponentContent(this.getUIContext(), wrapBuilder(itemBuilder), this.builderParam);
35. this.endBuilder = new ComponentContent(this.getUIContext(), wrapBuilder(itemBuilder), this.builderParam);
36. }

38. GetStartBuilder() {
39. this.startBuilder?.update(new BuilderParams('StartDelete', this.scroller));
40. return this.startBuilder;
41. }

43. GetEndBuilder() {
44. this.endBuilder?.update(new BuilderParams('EndDelete', this.scroller));
45. return this.endBuilder;
46. }

48. build() {
49. ListItem() {
50. Text('item' + this.project)
51. .width('100%')
52. .height(100)
53. .fontSize(16)
54. .textAlign(TextAlign.Center)
55. .borderRadius(10)
56. .backgroundColor(0xFFFFFF)
57. }
58. .transition(TransitionEffect.OPACITY)
59. .swipeAction({
60. end: {
61. builderComponent: this.GetEndBuilder(),
62. onAction: () => {
63. this.getUIContext()?.animateTo({ duration: 1000 }, () => {
64. let index = this.arr.indexOf(this.project);
65. this.arr.splice(index, 1);
66. });
67. },
68. actionAreaDistance: 56
69. },
70. start: {
71. builderComponent: this.GetStartBuilder(),
72. onAction: () => {
73. this.getUIContext()?.animateTo({ duration: 1000 }, () => {
74. let index = this.arr.indexOf(this.project);
75. this.arr.splice(index, 1);
76. });
77. },
78. actionAreaDistance: 56
79. }
80. })
81. .padding(5)
82. }
83. }

85. @Entry
86. @Component
87. struct ListItemExample {
88. @State arr: number[] = [0, 1, 2, 3, 4];
89. private scroller: ListScroller = new ListScroller();

91. build() {
92. Column() {
93. List({ space: 10, scroller: this.scroller }) {
94. ListItemGroup() {
95. ForEach(this.arr, (project: number) => {
96. MyListItem({ scroller: this.scroller, project: project, arr: this.arr })
97. }, (item: string) => item)
98. }
99. }
100. }
101. .padding(10)
102. .backgroundColor(0xDCDCDC)
103. .width('100%')
104. .height('100%')
105. }
106. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/30/v3/4OXnP9VLRkmun8vnGp8TiA/zh-cn_image_0000002568918912.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034908Z&HW-CC-Expire=86400&HW-CC-Sign=4C8F5A50D5177298283506E08F0217E6A5598AAE4F9FC2697B9018EA4F399B04)

### 示例5（通过ListItemSwipeActionManager管理划出菜单）

从API version 21开始，该示例通过[ListItemSwipeActionManager](/consumer/cn/doc/harmonyos-references/ts-container-listitem#listitemswipeactionmanager21)管理ListItem的划出菜单。



```
1. // xxx.ets
2. import { BusinessError } from '@kit.BasicServicesKit';

4. @Entry
5. @Component
6. struct ListItemExample5 {
7. @Builder
8. itemAction(str: string) {
9. Row() {
10. Button(str).margin('4vp')
11. }.padding('4vp').justifyContent(FlexAlign.SpaceEvenly)
12. }

14. build() {
15. Flex({ wrap: FlexWrap.Wrap }) {
16. Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
17. Button('expand start')
18. .onClick(() => {
19. try {
20. let node: FrameNode | null = this.getUIContext().getAttachedFrameNodeById('listItem');
21. ListItemSwipeActionManager.expand(node, ListItemSwipeActionDirection.START)
22. } catch (error) {
23. console.error('Error expand item:', (error as BusinessError).code, (error as BusinessError).message);
24. }
25. })
26. Button('expand end')
27. .onClick(() => {
28. try {
29. let node: FrameNode | null = this.getUIContext().getAttachedFrameNodeById('listItem');
30. ListItemSwipeActionManager.expand(node, ListItemSwipeActionDirection.END)
31. } catch (error) {
32. console.error('Error expand item:', (error as BusinessError).code, (error as BusinessError).message);
33. }
34. })
35. Button('collapse')
36. .onClick(() => {
37. try {
38. let node: FrameNode | null = this.getUIContext().getAttachedFrameNodeById('listItem');
39. ListItemSwipeActionManager.collapse(node)
40. } catch (error) {
41. console.error('Error collapse item:', (error as BusinessError).code, (error as BusinessError).message);
42. }
43. })
44. }
45. .margin({ bottom: 10 })

47. List({ space: 10 }) {
48. ListItem() {
49. Text('item')
50. .width('100%')
51. .height(100)
52. .fontSize(16)
53. .textAlign(TextAlign.Center)
54. .borderRadius(10)
55. .backgroundColor(0xFFFFFF)
56. }
57. .id('listItem')
58. .transition(TransitionEffect.OPACITY)
59. .swipeAction({
60. start: {
61. builder: () => {
62. this.itemAction('start')
63. },
64. },
65. end: {
66. builder: () => {
67. this.itemAction('end')
68. },
69. }
70. })
71. }
72. .height('80%')

74. }
75. .padding(10)
76. .backgroundColor(0xDCDCDC)
77. .width('100%')
78. .height('100%')
79. }
80. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/MDBWpG3ZRda9OC3UhPDMpQ/zh-cn_image_0000002599478457.gif?HW-CC-KV=V1&HW-CC-Date=20260511T034908Z&HW-CC-Expire=86400&HW-CC-Sign=D43858F0C76795E0AE749B2908463B7FDD8268E16E114469918991B864224608)