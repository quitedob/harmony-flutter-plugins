

```
1. typedef struct Hid_Device {...} Hid_Device
```

## 概述

PC/2in1

设备基本信息。

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
| const char\* deviceName | 设备名称 |
| uint16\_t vendorId | 厂商ID |
| uint16\_t productId | 产品ID |
| uint16\_t version | 版本号 |
| uint16\_t bustype | 总线类型 |
| Hid\_DeviceProp\* properties | 由[Hid\_DeviceProp](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hid-ddk-types-h#hid_deviceprop)表示的设备特性 |
| uint16\_t propLength | 设备特性数量 |