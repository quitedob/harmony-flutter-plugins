

```
1. typedef struct {...} ArkUI_AnimateCompleteCallback
```

## 概述

PhonePC/2in1TabletTVWearable

动画播放结束回调类型。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_animate.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-animate-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [ArkUI\_FinishCallbackType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_finishcallbacktype) type | 在动画中定义结束回调的类型。 |
| void\* userData | 用于动画结束回调，传递用户自定义数据。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [void (\*callback)(void\* userData)](/consumer/cn/doc/harmonyos-references/i-arkui-nativemodule-arkui-animatecompletecallback#callback) | 动画播放结束回调。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### callback()

PhonePC/2in1TabletTVWearable



```
1. void (*callback)(void* userData)
```

**描述：**

动画播放结束回调。