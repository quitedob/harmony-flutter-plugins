

```
1. typedef struct Hid_EventProperties {...} Hid_EventProperties
```

## 概述

PC/2in1

设备关注事件属性。

**起始版本：** 11

**相关模块：** [HidDdk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk)

**所在头文件：** [hid\_ddk\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hid-ddk-types-h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| struct [Hid\_EventTypeArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk-hid-eventtypearray) hidEventTypes | 事件类型属性编码数组 |
| struct [Hid\_KeyCodeArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk-hid-keycodearray) hidKeys | 键值属性编码数组 |
| struct [Hid\_AbsAxesArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk-hid-absaxesarray) hidAbs | 绝对坐标属性编码数组 |
| struct [Hid\_RelAxesArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk-hid-relaxesarray) hidRelBits | 相对坐标属性编码数组 |
| struct [Hid\_MscEventArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidddk-hid-msceventarray) hidMiscellaneous | 其它特殊事件属性编码数组 |
| int32\_t hidAbsMax[64] | 绝对坐标属性最大值 |
| int32\_t hidAbsMin[64] | 绝对坐标属性最小值 |
| int32\_t hidAbsFuzz[64] | 绝对坐标属性模糊值 |
| int32\_t hidAbsFlat[64] | 绝对坐标属性固定值 |