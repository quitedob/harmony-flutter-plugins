

```
1. typedef struct UsbRequestPipe {...} __attribute__((aligned(8))) UsbRequestPipe
```

## 概述

PC/2in1

请求管道。

**起始版本：** 10

**相关模块：** [UsbDdk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk)

**所在头文件：** [usb\_ddk\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usb-ddk-types-h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| uint64\_t interfaceHandle | 接口操作句柄。 |
| uint8\_t endpoint | 要通信的端点的地址。 |
| uint32\_t timeout | 超时时间，单位是毫秒。 |