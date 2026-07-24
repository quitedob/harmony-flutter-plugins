说明

本模块首批接口从API version 12开始支持，后续版本的新增接口，采用上角标单独标记接口的起始版本。

## UICommonEvent

PhonePC/2in1TabletTVWearable

用于设置基础事件回调。方法入参为undefined的时候，重置对应的事件回调。

### setOnClick

PhonePC/2in1TabletTVWearable

setOnClick(callback: Callback<ClickEvent> | undefined): void

设置[点击事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click)的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<[ClickEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#clickevent)> | undefined | 是 | 点击事件的回调函数。 |

### setOnTouch

PhonePC/2in1TabletTVWearable

setOnTouch(callback: Callback<TouchEvent> | undefined): void

设置[触摸事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch)的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<[TouchEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#touchevent对象说明)> | undefined | 是 | 触摸事件的回调函数。 |

### setOnAppear

PhonePC/2in1TabletTVWearable

setOnAppear(callback: Callback<void> | undefined): void

设置[onAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#onappear)挂载显示事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<void> | undefined | 是 | 挂载显示事件的回调函数。 |

### setOnDisappear

PhonePC/2in1TabletTVWearable

setOnDisappear(callback: Callback<void> | undefined): void

设置[onDisAppear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-show-hide#ondisappear)卸载消失事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<void> | undefined | 是 | 卸载消失事件的回调。 |

### setOnKeyEvent

PhonePC/2in1TabletTVWearable

setOnKeyEvent(callback: Callback<KeyEvent> | undefined): void

设置[按键事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key)的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<[KeyEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-key#keyevent对象说明)> | undefined | 是 | 按键事件的回调函数。 |

### setOnFocus

PhonePC/2in1TabletTVWearable

setOnFocus(callback: Callback<void> | undefined): void

设置[onFocus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-focus-event#onfocus)获焦事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<void> | undefined | 是 | 获焦事件的回调。 |

### setOnBlur

PhonePC/2in1TabletTVWearable

setOnBlur(callback: Callback<void> | undefined): void

设置[onBlur](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-focus-event#onblur)失焦事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<void> | undefined | 是 | 失焦事件的回调。 |

### setOnHover

PhonePC/2in1TabletTVWearable

setOnHover(callback: HoverCallback | undefined): void

设置[onHover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-hover#onhover)悬浮事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [HoverCallback](/consumer/cn/doc/harmonyos-references/ts-uicommonevent#hovercallback) | undefined | 是 | 悬浮事件的回调函数。 |

### setOnMouse

PhonePC/2in1TabletTVWearable

setOnMouse(callback: Callback<MouseEvent> | undefined): void

设置[onMouse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-mouse-key#onmouse)鼠标事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#callback12)<[MouseEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-mouse-key#mouseevent对象说明)> | undefined | 是 | 鼠标事件的回调函数。 |

### setOnSizeChange

PhonePC/2in1TabletTVWearable

setOnSizeChange(callback: SizeChangeCallback | undefined): void

设置[onSizeChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-size-change-event#onsizechange)组件区域变化事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | [SizeChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-size-change-event#sizechangecallback) | undefined | 是 | 组件区域变化事件的回调函数。 |

### setOnVisibleAreaApproximateChange

PhonePC/2in1TabletTVWearable

setOnVisibleAreaApproximateChange(options: VisibleAreaEventOptions, event: VisibleAreaChangeCallback | undefined): void

设置限制回调间隔的[onVisibleAreaChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-visible-area-change-event#onvisibleareachange)可见区域变化事件的回调。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| options | [VisibleAreaEventOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-visible-area-change-event#visibleareaeventoptions12) | 是 | 可见区域变化相关的参数。 |
| event | [VisibleAreaChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-visible-area-change-event#visibleareachangecallback12) | undefined | 是 | 可见区域变化事件的回调函数。当组件可见面积与自身面积的比值接近options中设置的阈值时触发该回调。 |

说明

此接口与[onVisibleAreaChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-visible-area-change-event#onvisibleareachange)接口存在如下差异，onVisibleAreaChange在每一帧都会进行可见区域比例的计算，如果注册节点太多，系统功耗存在劣化。此接口降低了可见区域比例计算的频度，计算间隔由[VisibleAreaEventOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-visible-area-change-event#visibleareaeventoptions12)的expectedUpdateInterval参数决定。

当前接口的可见区域回调阈值默认包含0。例如，开发者设置回调阈值为[0.5]，实际生效的阈值为[0.0, 0.5]。

## HoverCallback

PhonePC/2in1TabletTVWearable

type HoverCallback = (isHover: boolean, event: HoverEvent)=> void

hover事件的回调类型。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| isHover | boolean | 是 | 是否处于hover状态，true表示处于hover状态，false表示不在hover状态。 |
| event | [HoverEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-hover#hoverevent10对象说明) | 是 | 获取鼠标或手写笔悬浮的位置坐标。 |