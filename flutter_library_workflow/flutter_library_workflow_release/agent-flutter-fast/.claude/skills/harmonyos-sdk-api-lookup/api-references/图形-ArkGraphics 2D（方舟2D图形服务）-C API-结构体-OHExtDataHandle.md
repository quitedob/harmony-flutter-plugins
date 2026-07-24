

```
1. typedef struct OHExtDataHandle {...} OHExtDataHandle
```

## 概述

PhonePC/2in1TabletTVWearable

扩展数据句柄结构体定义。

**起始版本：** 9

**废弃版本：** 从API version 10开始废弃，不再提供替代接口。

**相关模块：** [NativeWindow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativewindow)

**所在头文件：** [external\_window.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t fd | 句柄 Fd，-1代表不支持。 |
| uint32\_t reserveInts | Reserve数组的个数。 |
| int32\_t reserve[0] | Reserve数组。 |