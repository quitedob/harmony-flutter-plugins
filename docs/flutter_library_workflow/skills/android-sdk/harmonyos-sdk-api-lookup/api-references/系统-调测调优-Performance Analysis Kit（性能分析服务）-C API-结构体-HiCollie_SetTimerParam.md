

```
1. typedef struct HiCollie_SetTimerParam {...} HiCollie_SetTimerParam
```

## 概述

PhonePC/2in1TabletTVWearable

定义OH\_HiCollie\_SetTimer函数的输入参数。

**起始版本：** 18

**相关模块：** [HiCollie](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie)

**所在头文件：** [hicollie.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| const char \*name | timer任务名称。 |
| unsigned int timeout | 任务超时时间阈值，单位：s。 |
| [OH\_HiCollie\_Callback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_callback) func | 超时发生时执行的回调函数。 |
| void \*arg | 回调函数的参数。 |
| [HiCollie\_Flag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_flag) flag | 超时发生时执行的动作，参考[HiCollie\_Flag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_flag)。 |