

```
1. typedef struct OH_OnFrameAvailableListener {...} OH_OnFrameAvailableListener
```

## 概述

PhonePC/2in1TabletTVWearable

一个OH\_NativeImage的监听者，通过[OH\_NativeImage\_SetOnFrameAvailableListener](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_setonframeavailablelistener)接口注册该监听结构体，当有buffer可获取时，将触发回调给用户。

**起始版本：** 11

**相关模块：** [OH\_NativeImage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-nativeimage)

**所在头文件：** [native\_image.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| void\* context | 用户自定义的上下文信息，会在回调触发时返回给用户。 |
| [OH\_OnFrameAvailable](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_onframeavailable) onFrameAvailable | 有buffer可获取时触发的回调函数。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_OnFrameAvailable)(void \*context)](/consumer/cn/doc/harmonyos-references/capi-oh-nativeimage-oh-onframeavailablelistener#oh_onframeavailable) | OH\_OnFrameAvailable() | 有buffer可获取时触发的回调函数。  **起始版本：** 11  **系统能力：** SystemCapability.Graphic.Graphic2D.NativeImage |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### OH\_OnFrameAvailable()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_OnFrameAvailable)(void *context)
```

**描述**

有buffer可获取时触发的回调函数。

**系统能力：** SystemCapability.Graphic.Graphic2D.NativeImage

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void \*context | 用户自定义的上下文信息，会在回调触发时返回给用户。 |