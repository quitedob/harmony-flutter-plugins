

```
1. typedef struct UsbDeviceDescriptor {...} __attribute__((aligned(8))) UsbDeviceDescriptor
```

## 概述

PC/2in1

标准设备描述符，对应USB协议中Standard Device Descriptor。

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
| uint8\_t bLength | 该描述符的大小，单位为字节。 |
| uint8\_t bDescriptorType | 描述符类型。 |
| uint16\_t bcdUSB | USB协议版本号。 |
| uint8\_t bDeviceClass | 由USB标准化组织（USB-IF）分配的设备类代码。 |
| uint8\_t bDeviceSubClass | 由USB标准化组织（USB-IF）分配的子类代码，其值由bDeviceClass的值限定。 |
| uint8\_t bDeviceProtocol | 由USB标准化组织（USB-IF）分配的协议代码，其值由bDeviceClass和bDeviceSubClass的值限定。 |
| uint8\_t bMaxPacketSize0 | 端点零的最大包大小，只有8，16，32，64是合法的。 |
| uint16\_t idVendor | 由USB标准化组织（USB-IF）分配的厂商编号。 |
| uint16\_t idProduct | 由厂商分配的产品编号。 |
| uint16\_t bcdDevice | 设备版本编号。 |
| uint8\_t iManufacturer | 描述厂商的字符串描述符的索引。 |
| uint8\_t iProduct | 描述产品的字符串描述符的索引。 |
| uint8\_t iSerialNumber | 描述设备序列号的字符串描述符的索引。 |
| uint8\_t bNumConfigurations | 配置数量。 |