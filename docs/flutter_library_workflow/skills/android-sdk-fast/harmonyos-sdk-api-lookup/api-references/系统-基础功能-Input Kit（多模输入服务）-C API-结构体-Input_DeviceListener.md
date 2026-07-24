

```
1. typedef struct Input_DeviceListener {...} Input_DeviceListener
```

## 概述

PhonePC/2in1TabletTVWearable

定义一个结构体用于监听设备热插拔。

**起始版本：** 13

**相关模块：** [input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-input)

**所在头文件：** [oh\_input\_manager.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-input-manager-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| Input\_DeviceAddedCallback deviceAddedCallback | 定义一个回调函数，用于回调设备热插事件。 |
| Input\_DeviceRemovedCallback deviceRemovedCallback | 定义一个回调函数，用于回调设备热拔事件。 |