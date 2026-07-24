

```
1. typedef struct UsbControlRequestSetup {...} __attribute__((aligned(8))) UsbControlRequestSetup
```

## 概述

PC/2in1

控制传输setup包，对应USB协议中的Setup Data。

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
| uint8\_t bmRequestType | 请求类型。 |
| uint8\_t bRequest | 具体的请求。 |
| uint16\_t wValue | 具体的请求不同，其代表的含义不一样。 |
| uint16\_t wIndex | 具体的请求不同，其代表的含义不一样，通常用来传递索引或者偏移量。 |
| uint16\_t wLength | 如果有数据阶段的传输，其代表传输的字节个数。 |