

```
1. typedef struct ScsiPeripheral_InquiryInfo {...} ScsiPeripheral_InquiryInfo
```

## 概述

PC/2in1

SCSI inquiry 数据。

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
| uint8\_t deviceType | 设备类型。 |
| char idVendor[[SCSIPERIPHERAL\_VENDOR\_ID\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h) + 1] | 制造商 id。 |
| char idProduct[[SCSIPERIPHERAL\_PRODUCT\_ID\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h) + 1] | 产品 id。 |
| char revProduct[[SCSIPERIPHERAL\_PRODUCT\_REV\_LEN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h) + 1] | 产品版本。 |
| [ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap)\* data | 所有的查询数据。 |