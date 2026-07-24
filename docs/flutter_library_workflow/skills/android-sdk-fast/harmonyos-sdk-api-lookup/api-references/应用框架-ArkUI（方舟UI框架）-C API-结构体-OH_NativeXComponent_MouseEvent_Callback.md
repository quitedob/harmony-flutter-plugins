

```
1. typedef struct OH_NativeXComponent_MouseEvent_Callback {...} OH_NativeXComponent_MouseEvent_Callback
```

## 概述

PhonePC/2in1TabletTVWearable

注册鼠标事件的回调。

**起始版本：** 9

**相关模块：** [OH\_NativeXComponent Native XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-nativexcomponent-native-xcomponent)

**所在头文件：** [native\_interface\_xcomponent.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [void (\*DispatchMouseEvent)(OH\_NativeXComponent\* component, void\* window)](/consumer/cn/doc/harmonyos-references/xcomponent-oh-nativexcomponent-mouseevent-callback#dispatchmouseevent) | 当鼠标事件被触发时调用。 |
| [void (\*DispatchHoverEvent)(OH\_NativeXComponent\* component, bool isHover)](/consumer/cn/doc/harmonyos-references/xcomponent-oh-nativexcomponent-mouseevent-callback#dispatchhoverevent) | 当悬停事件被触发时调用。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### DispatchMouseEvent()

PhonePC/2in1TabletTVWearable



```
1. void (*DispatchMouseEvent)(OH_NativeXComponent* component, void* window)
```

**描述：**

当鼠标事件被触发时调用。

**起始版本：** 9

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_NativeXComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vexcomponent-native-xcomponent-oh-nativexcomponent)\* component | 表示指向[OH\_NativeXComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vexcomponent-native-xcomponent-oh-nativexcomponent)实例的指针。 |
| void\* window | 表示NativeWindow句柄。 |

### DispatchHoverEvent()

PhonePC/2in1TabletTVWearable



```
1. void (*DispatchHoverEvent)(OH_NativeXComponent* component, bool isHover)
```

**描述：**

当悬停事件被触发时调用。

**起始版本：** 9

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_NativeXComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vexcomponent-native-xcomponent-oh-nativexcomponent)\* component | 表示指向[OH\_NativeXComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/vexcomponent-native-xcomponent-oh-nativexcomponent)实例的指针。 |
| bool isHover | 表示鼠标或手写笔是否悬浮在组件上，进入时为true，离开时为false。 |