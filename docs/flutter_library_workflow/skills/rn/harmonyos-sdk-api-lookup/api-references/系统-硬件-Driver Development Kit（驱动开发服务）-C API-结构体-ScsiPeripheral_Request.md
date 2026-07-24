

```
1. typedef struct ScsiPeripheral_Request {...} ScsiPeripheral_Request
```

## 概述

PC/2in1

请求参数结构体。

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
| uint8\_t commandDescriptorBlock[[SCSIPERIPHERAL\_MAX\_CMD\_DESC\_BLOCK\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_max_cmd_desc_block_len)] | 命令描述符块。 |
| uint8\_t cdbLength | 命令描述符块的长度。 |
| int8\_t dataTransferDirection | 数据传输方向：-1为无数据传输的命令，-2为从主机到设备的数据传输(写)，-3为从设备到主机的数据传输(读)，-4为双向数据传输。 |
| [ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap)\* data | 数据传输的缓冲区。 |
| uint32\_t timeout | 超时时间（单位：毫秒）。 |