GesturePath表示手势路径信息。

本模块用于创建辅助功能注入手势所需的手势路径信息。

说明

* 本模块首批接口从API version 9开始支持，后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletWearable



```
1. import { GesturePath } from '@kit.AccessibilityKit';
```

## GesturePath

PhonePC/2in1TabletWearable

表示手势路径信息。

**系统能力**：SystemCapability.BarrierFree.Accessibility.Core

### 属性

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| points | Array<[GesturePoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-accessibility-gesturepoint#gesturepoint)> | 否 | 否 | 手势触摸点。 |
| durationTime | number | 否 | 否 | 手势总耗时，单位为毫秒。 |

### constructor(deprecated)

PhonePC/2in1TabletWearable

constructor(durationTime: number);

构造函数。

说明

从API version 9开始支持，从API version 12开始废弃，系统不再开放相关能力。

**系统能力**：SystemCapability.BarrierFree.Accessibility.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| durationTime | number | 是 | 手势总耗时，单位为毫秒。 |

**示例：**



```
1. import { GesturePath } from '@kit.AccessibilityKit';

3. let gesturePath = new GesturePath(20);
```