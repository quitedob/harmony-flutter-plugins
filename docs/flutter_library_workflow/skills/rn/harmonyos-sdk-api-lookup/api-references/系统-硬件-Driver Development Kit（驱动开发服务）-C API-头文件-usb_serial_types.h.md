## 概述

PC/2in1

提供USB Serial DDK中的枚举变量、结构体定义与宏定义。

**引用文件：** <usb\_serial/usb\_serial\_types.h>

**库：** libusb\_serial\_ndk.z.so

**系统能力：** SystemCapability.Driver.UsbSerial.Extension

**起始版本：** 18

**相关模块：** [USBSerialDDK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-serialddk)

## 汇总

PC/2in1

### 结构体

PC/2in1

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [UsbSerial\_Params](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-serialddk-usbserial-params) | UsbSerial\_Params | 定义USB Serial DDK使用的USB串口参数。 |
| [UsbSerial\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-serialddk-usbserial-devicehandle) | UsbSerial\_Device | USB串口设备数据结构（不透明）。 |

### 枚举

PC/2in1

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [UsbSerial\_DdkRetCode](/consumer/cn/doc/harmonyos-references/capi-usb-serial-types-h#usbserial_ddkretcode) | UsbSerial\_DdkRetCode | 定义USB Serial DDK使用的返回码。 |
| [UsbSerial\_FlowControl](/consumer/cn/doc/harmonyos-references/capi-usb-serial-types-h#usbserial_flowcontrol) | UsbSerial\_FlowControl | 定义USB Serial DDK中的流量控制。 |
| [UsbSerial\_Parity](/consumer/cn/doc/harmonyos-references/capi-usb-serial-types-h#usbserial_parity) | UsbSerial\_Parity | 定义USB Serial DDK使用的校验参数枚举。 |

## 枚举类型说明

PC/2in1

### UsbSerial\_DdkRetCode

PC/2in1



```
1. enum UsbSerial_DdkRetCode
```

**描述**

定义USB Serial DDK使用的返回码。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| USB\_SERIAL\_DDK\_NO\_PERM = 201 | 权限被拒绝。 |
| USB\_SERIAL\_DDK\_INVALID\_PARAMETER = 401 | 无效参数。 |
| USB\_SERIAL\_DDK\_SUCCESS = 31600000 | 操作成功。 |
| USB\_SERIAL\_DDK\_INVALID\_OPERATION = 31600001 | 无效操作。 |
| USB\_SERIAL\_DDK\_INIT\_ERROR = 31600002 | 初始化失败。 |
| USB\_SERIAL\_DDK\_SERVICE\_ERROR = 31600003 | 服务错误。 |
| USB\_SERIAL\_DDK\_MEMORY\_ERROR = 31600004 | 内存相关错误，例如内存不足、内存数据复制失败或内存应用程序故障。 |
| USB\_SERIAL\_DDK\_IO\_ERROR = 31600005 | I/O 错误。 |
| USB\_SERIAL\_DDK\_DEVICE\_NOT\_FOUND = 31600006 | 未找到设备。 |

### UsbSerial\_FlowControl

PC/2in1



```
1. enum UsbSerial_FlowControl
```

**描述**

定义USB Serial DDK中的流量控制。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| USB\_SERIAL\_NO\_FLOW\_CONTROL = 0 | 无流量控制。 |
| USB\_SERIAL\_SOFTWARE\_FLOW\_CONTROL = 1 | 软件流控。 |
| USB\_SERIAL\_HARDWARE\_FLOW\_CONTROL = 2 | 硬件流控。 |

### UsbSerial\_Parity

PC/2in1



```
1. enum UsbSerial_Parity
```

**描述**

定义USB Serial DDK使用的校验参数枚举。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| USB\_SERIAL\_PARITY\_NONE = 0 | 无校验。 |
| USB\_SERIAL\_PARITY\_ODD = 1 | 奇校验。 |
| USB\_SERIAL\_PARITY\_EVEN = 2 | 偶校验。 |