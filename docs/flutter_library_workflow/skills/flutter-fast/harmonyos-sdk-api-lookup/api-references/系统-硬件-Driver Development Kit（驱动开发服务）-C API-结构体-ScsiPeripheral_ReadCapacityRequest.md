

```
1. typedef struct ScsiPeripheral_ReadCapacityRequest {...} ScsiPeripheral_ReadCapacityRequest
```

## 概述

PC/2in1

SCSI命令（read capacity）的请求结构体。

**起始版本：** 18

**相关模块：** [ScsiPeripheralDDK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk)

**所在头文件：** [scsi\_peripheral\_types.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h)

## 汇总

PC/2in1

### 成员变量

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t lbAddress | 逻辑单元地址。 |
| uint8\_t control | Control字段，用于指定一些控制信息。 |
| uint8\_t byte8 | CDB的第八个字节。 |
| uint32\_t timeout | 超时时间（单位: 毫秒）。 |