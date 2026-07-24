

```
1. typedef struct ScsiPeripheral_BasicSenseInfo {...} ScsiPeripheral_BasicSenseInfo
```

## 概述

PC/2in1

sense data的基本信息。

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
| uint8\_t responseCode | 响应码。 |
| bool valid | 信息有效标志位。 |
| uint64\_t information | Information字段。 |
| uint64\_t commandSpecific | Command-specific information字段。 |
| bool sksv | Sense key specific字段的标志位。 |
| uint32\_t senseKeySpecific | Sense key specific字段。 |