

```
1. typedef struct UsbSerial_Params {...} __attribute__((aligned(8))) UsbSerial_Params
```

## 概述

PC/2in1

定义USB Serial DDK使用的USB串口参数。

**起始版本：** 18

**相关模块：** [USBSerialDDK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-serialddk)

**所在头文件：** [usb\_serial\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-usb-serial-types-h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t baudRate | 波特率，单位为波特。 |
| uint8\_t nDataBits | 数据位比特数。 |
| uint8\_t nStopBits | 停止位比特数。 |
| uint8\_t parity | 校验参数设置（0：无校验；1：奇校验；2：偶校验；）。 |