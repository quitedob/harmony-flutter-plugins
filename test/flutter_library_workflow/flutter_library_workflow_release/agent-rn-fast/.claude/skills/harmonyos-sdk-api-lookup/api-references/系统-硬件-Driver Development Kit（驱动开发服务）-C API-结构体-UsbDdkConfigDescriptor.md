

```
1. typedef struct UsbDdkConfigDescriptor {...} UsbDdkConfigDescriptor
```

## 概述

PC/2in1

配置描述符。

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
| [struct UsbConfigDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbconfigdescriptor) configDescriptor | 标准配置描述符。 |
| [struct UsbDdkInterface](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbddkinterface)\* interface | 该配置所包含的接口。 |
| const uint8\_t\* extra | 未做解析的描述符，包含特定于类或供应商的描述符。 |
| uint32\_t extraLength | 未做解析的描述符长度。 |