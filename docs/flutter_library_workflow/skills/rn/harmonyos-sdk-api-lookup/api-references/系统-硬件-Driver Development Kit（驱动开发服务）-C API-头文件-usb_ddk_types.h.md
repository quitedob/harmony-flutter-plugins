## 概述

PC/2in1

提供USB DDK中的枚举变量、结构体定义与宏定义。

**引用文件：** <usb/usb\_ddk\_types.h>

**库：** libusb\_ndk.z.so

**系统能力：** SystemCapability.Driver.USB.Extension

**起始版本：** 10

**相关模块：** [UsbDdk](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk)

## 汇总

PC/2in1

### 结构体

PC/2in1

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [UsbControlRequestSetup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbcontrolrequestsetup) | UsbControlRequestSetup | 控制传输setup包，对应USB协议中的Setup Data。 |
| [UsbDeviceDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbdevicedescriptor) | UsbDeviceDescriptor | 标准设备描述符，对应USB协议中Standard Device Descriptor。 |
| [UsbConfigDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbconfigdescriptor) | UsbConfigDescriptor | 标准配置描述符，对应USB协议中Standard Configuration Descriptor。 |
| [UsbInterfaceDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbinterfacedescriptor) | UsbInterfaceDescriptor | 标准接口描述符，对应USB协议中Standard Interface Descriptor。 |
| [UsbEndpointDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbendpointdescriptor) | UsbEndpointDescriptor | 标准端点描述符，对应USB协议中Standard Endpoint Descriptor。 |
| [UsbDdkEndpointDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbddkendpointdescriptor) | UsbDdkEndpointDescriptor | 端点描述符。 |
| [UsbDdkInterfaceDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbddkinterfacedescriptor) | UsbDdkInterfaceDescriptor | 接口描述符。 |
| [UsbDdkInterface](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbddkinterface) | UsbDdkInterface | USB接口，是特定接口下备用设置的集合。 |
| [UsbDdkConfigDescriptor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbddkconfigdescriptor) | UsbDdkConfigDescriptor | 配置描述符。 |
| [UsbRequestPipe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbrequestpipe) | UsbRequestPipe | 请求管道。 |
| [UsbDeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usbdevicememmap) | UsbDeviceMemMap | 设备内存映射，通过[OH\_Usb\_CreateDeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usb-ddk-api-h#oh_usb_createdevicememmap)创建设备内存映射，使用内存映射后的缓冲区，获得更好的性能。 |
| [Usb\_DeviceArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usbddk-usb-devicearray) | Usb\_DeviceArray | 设备ID清单，用于存放[OH\_Usb\_GetDevices](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usb-ddk-api-h#oh_usb_getdevices)接口获取到的设备ID列表和设备数量。 |

### 枚举

PC/2in1

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [UsbDdkErrCode](/consumer/cn/doc/harmonyos-references/capi-usb-ddk-types-h#usbddkerrcode) | UsbDdkErrCode | USB DDK 错误码定义。 |

## 枚举类型说明

PC/2in1

### UsbDdkErrCode

PC/2in1



```
1. enum UsbDdkErrCode
```

**描述**

USB DDK 错误码定义。

**起始版本：** 10

展开

| 枚举项 | 描述 |
| --- | --- |
| USB\_DDK\_SUCCESS = 0 | 操作成功。 |
| USB\_DDK\_FAILED = -1 | 操作失败。  **废弃版本：** 16 |
| USB\_DDK\_NO\_PERM = 201 | 没有权限。  **起始版本：** 14 |
| USB\_DDK\_INVALID\_PARAMETER = 401 | 非法参数，在API version 16之前值为-2。 |
| USB\_DDK\_MEMORY\_ERROR = 27400001 | 内存相关的错误，包括：内存不足、内存数据拷贝失败、内存申请失败等，在API version 16之前值为-3。 |
| USB\_DDK\_INVALID\_OPERATION = 27400002 | 非法操作，在API version 16之前值为-4。 |
| USB\_DDK\_NULL\_PTR = -5 | 空指针异常。  **废弃版本：** 16 |
| USB\_DDK\_DEVICE\_BUSY = -6 | 设备忙。  **废弃版本：** 16 |
| USB\_DDK\_IO\_FAILED = 27400003 | 设备I/O操作失败。  **起始版本：** 14 |
| USB\_DDK\_TIMEOUT = 27400004 | 传输超时，在API version 16之前值为-7。 |