

```
1. typedef struct UsbConfigDescriptor {...} __attribute__((packed)) UsbConfigDescriptor
```

## 概述

PC/2in1

标准配置描述符，对应USB协议中Standard Configuration Descriptor。

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
| uint16\_t wTotalLength | 该配置描述符的总长度，包含配置、接口、端点和特定于类或供应商的描述符。 |
| uint8\_t bNumInterfaces | 该配置所支持的接口数量。 |
| uint8\_t bConfigurationValue | 设置配置所需要的参数，用来选择当前配置。 |
| uint8\_t iConfiguration | 描述该配置的字符串描述符的索引。 |
| uint8\_t bmAttributes | 配置属性，包含供电模式，远程唤醒等配置。 |
| uint8\_t bMaxPower | 总线供电的USB设备的最大功耗，以2mA为单位。 |