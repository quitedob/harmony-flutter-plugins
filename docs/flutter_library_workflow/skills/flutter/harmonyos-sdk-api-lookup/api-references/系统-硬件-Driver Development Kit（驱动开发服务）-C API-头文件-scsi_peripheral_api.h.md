## 概述

PC/2in1

声明用于主机侧访问SCSI设备的SCSI Peripheral DDK接口。

**引用文件：** <scsi\_peripheral/scsi\_peripheral\_api.h>

**库：** libscsi.z.so

**系统能力：** SystemCapability.Driver.SCSI.Extension

**起始版本：** 18

**相关模块：** [ScsiPeripheralDDK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk)

## 汇总

PC/2in1

### 函数

PC/2in1

展开

| 名称 | 描述 |
| --- | --- |
| [int32\_t OH\_ScsiPeripheral\_Init(void)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_init) | 初始化SCSI Peripheral DDK。 |
| [int32\_t OH\_ScsiPeripheral\_Release(void)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_release) | 释放SCSI Peripheral DDK。 |
| [int32\_t OH\_ScsiPeripheral\_Open(uint64\_t deviceId, uint8\_t interfaceIndex, ScsiPeripheral\_Device \*\*dev)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_open) | 打开deviceId和interfaceIndex指定的SCSI设备。其中，deviceId可以通过USB设备的总线编号左移32位后、同其设备地址进行或运算得到，interfaceIndex为需要打开的USB接口的索引值。 |
| [int32\_t OH\_ScsiPeripheral\_Close(ScsiPeripheral\_Device \*\*dev)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_close) | 关闭SCSI设备。 |
| [int32\_t OH\_ScsiPeripheral\_TestUnitReady(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_TestUnitReadyRequest \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_testunitready) | 检查逻辑单元是否已经准备好。 |
| [int32\_t OH\_ScsiPeripheral\_Inquiry(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_InquiryRequest \*request,ScsiPeripheral\_InquiryInfo \*inquiryInfo, ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_inquiry) | 查询SCSI设备的基本信息。 |
| [int32\_t OH\_ScsiPeripheral\_ReadCapacity10(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_ReadCapacityRequest \*request,ScsiPeripheral\_CapacityInfo \*capacityInfo, ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_readcapacity10) | 获取SCSI设备的容量信息。 |
| [int32\_t OH\_ScsiPeripheral\_RequestSense(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_RequestSenseRequest \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_requestsense) | 获取sense data（SCSI设备返回给主机的信息，用于报告设备的状态、错误信息以及诊断信息）。 |
| [int32\_t OH\_ScsiPeripheral\_Read10(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_IORequest \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_read10) | 从指定逻辑块读取数据。 |
| [int32\_t OH\_ScsiPeripheral\_Write10(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_IORequest \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_write10) | 写数据到设备的指定逻辑块。 |
| [int32\_t OH\_ScsiPeripheral\_Verify10(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_VerifyRequest \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_verify10) | 校验指定逻辑块。 |
| [int32\_t OH\_ScsiPeripheral\_SendRequestByCdb(ScsiPeripheral\_Device \*dev, ScsiPeripheral\_Request \*request,ScsiPeripheral\_Response \*response)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_sendrequestbycdb) | 以CDB（Command Descriptor Block）方式发送SCSI命令。 |
| [int32\_t OH\_ScsiPeripheral\_CreateDeviceMemMap(ScsiPeripheral\_Device \*dev, size\_t size,ScsiPeripheral\_DeviceMemMap \*\*devMmap)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_createdevicememmap) | 创建缓冲区。请在缓冲区使用完后，调用[OH\_ScsiPeripheral\_DestroyDeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_destroydevicememmap)销毁缓冲区，否则会造成资源泄漏。 |
| [int32\_t OH\_ScsiPeripheral\_DestroyDeviceMemMap(ScsiPeripheral\_DeviceMemMap \*devMmap)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_destroydevicememmap) | 销毁缓冲区。请在缓冲区使用完后及时销毁缓冲区，否则会造成资源泄漏。 |
| [int32\_t OH\_ScsiPeripheral\_ParseBasicSenseInfo(uint8\_t \*senseData, uint8\_t senseDataLen,ScsiPeripheral\_BasicSenseInfo \*senseInfo)](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_parsebasicsenseinfo) | 解析基本的sense data，包括Information、Command specific information、Sense key specific字段。 |

## 函数说明

PC/2in1

### OH\_ScsiPeripheral\_Init()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Init(void)
```

**描述**

初始化SCSI Peripheral DDK。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 初始化DDK失败。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。 |

### OH\_ScsiPeripheral\_Release()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Release(void)
```

**描述**

释放SCSI Peripheral DDK。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。 |

### OH\_ScsiPeripheral\_Open()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Open(uint64_t deviceId, uint8_t interfaceIndex, ScsiPeripheral_Device **dev)
```

**描述**

打开deviceId和interfaceIndex指定的SCSI设备。其中，deviceId可以通过USB设备的总线编号左移32位后、同其设备地址进行或运算得到，interfaceIndex为需要打开的USB接口的索引值。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| uint64\_t deviceId | 设备ID，代表要操作的设备。 |
| uint8\_t interfaceIndex | 接口索引，对应SCSI设备的接口。 |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*\*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空或\*dev为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生IO错误。  [SCSIPERIPHERAL\_DDK\_DEVICE\_NOT\_FOUND](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 通过deviceId和interfaceIndex找不到设备。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_Close()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Close(ScsiPeripheral_Device **dev)
```

**描述**

关闭SCSI设备。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*\*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空或\*dev为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。 |

### OH\_ScsiPeripheral\_TestUnitReady()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_TestUnitReady(ScsiPeripheral_Device *dev, ScsiPeripheral_TestUnitReadyRequest *request,ScsiPeripheral_Response *response)
```

**描述**

检查逻辑单元是否已经准备好。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_TestUnitReadyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iperipheralddk-scsiperipheral-testunitreadyrequest) \*request | 逻辑单元检查命令（test unit ready）的请求信息，详情参见[ScsiPeripheral\_TestUnitReadyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iperipheralddk-scsiperipheral-testunitreadyrequest)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | 逻辑单元检查命令（test unit ready）的响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、request为空或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_Inquiry()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Inquiry(ScsiPeripheral_Device *dev, ScsiPeripheral_InquiryRequest *request,ScsiPeripheral_InquiryInfo *inquiryInfo, ScsiPeripheral_Response *response)
```

**描述**

查询SCSI设备的基本信息。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_InquiryRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-scsiperipheralddk-scsiperipheral-inquiryrequest) \*request | inquiry命令的请求信息，详情参见[ScsiPeripheral\_InquiryRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-scsiperipheralddk-scsiperipheral-inquiryrequest)。 |
| [ScsiPeripheral\_InquiryInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-inquiryinfo) \*inquiryInfo | inquiry命令返回的查询信息，详情参见[ScsiPeripheral\_InquiryInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-inquiryinfo)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | inquiry命令返回的原始响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空、inquiryInfo 为空、inquiryInfo->data或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_ReadCapacity10()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_ReadCapacity10(ScsiPeripheral_Device *dev, ScsiPeripheral_ReadCapacityRequest *request,ScsiPeripheral_CapacityInfo *capacityInfo, ScsiPeripheral_Response *response)
```

**描述**

获取SCSI设备的容量信息。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_ReadCapacityRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/siperipheralddk-scsiperipheral-readcapacityrequest) \*request | read capacity命令的请求信息，详情参见[ScsiPeripheral\_ReadCapacityRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/siperipheralddk-scsiperipheral-readcapacityrequest)。 |
| [ScsiPeripheral\_CapacityInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-capacityinfo) \*capacityInfo | read capacity命令返回的容量信息，详情参见[ScsiPeripheral\_CapacityInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-capacityinfo)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | read capacity命令返回的原始响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空、capacityInfo为空或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_RequestSense()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_RequestSense(ScsiPeripheral_Device *dev, ScsiPeripheral_RequestSenseRequest *request,ScsiPeripheral_Response *response)
```

**描述**

获取sense data（SCSI设备返回给主机的信息，用于报告设备的状态、错误信息以及诊断信息）。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_RequestSenseRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/siperipheralddk-scsiperipheral-requestsenserequest) \*request | Request Sense命令的请求信息，详情参见[ScsiPeripheral\_RequestSenseRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/siperipheralddk-scsiperipheral-requestsenserequest)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | Request Sense命令返回的响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_Read10()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Read10(ScsiPeripheral_Device *dev, ScsiPeripheral_IORequest *request,ScsiPeripheral_Response *response)
```

**描述**

从指定逻辑块读取数据。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_IORequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-iorequest) \*request | read命令的请求信息，详情参见[ScsiPeripheral\_IORequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-iorequest)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | read命令返回的响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空、request->data或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_Write10()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Write10(ScsiPeripheral_Device *dev, ScsiPeripheral_IORequest *request,ScsiPeripheral_Response *response)
```

**描述**

写数据到设备的指定逻辑块。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_IORequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-iorequest) \*request | write命令的请求信息，详情参见[ScsiPeripheral\_IORequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-iorequest)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | write命令返回的响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空、request->data为空或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_Verify10()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_Verify10(ScsiPeripheral_Device *dev, ScsiPeripheral_VerifyRequest *request,ScsiPeripheral_Response *response)
```

**描述**

校验指定逻辑块。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_VerifyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-scsiperipheralddk-scsiperipheral-verifyrequest) \*request | verify命令的请求信息，详情参见[ScsiPeripheral\_VerifyRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/api-scsiperipheralddk-scsiperipheral-verifyrequest)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | verify命令返回的响应信息，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、request为空或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_SendRequestByCdb()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_SendRequestByCdb(ScsiPeripheral_Device *dev, ScsiPeripheral_Request *request,ScsiPeripheral_Response *response)
```

**描述**

以CDB（Command Descriptor Block）方式发送SCSI命令。

**需要权限：** ohos.permission.ACCESS\_DDK\_SCSI\_PERIPHERAL

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| [ScsiPeripheral\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-request) \*request | 请求，详情参见[ScsiPeripheral\_Request](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-request)。 |
| [ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response) \*response | 响应，详情参见[ScsiPeripheral\_Response](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-response)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_NO\_PERM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 权限校验失败。  [SCSIPERIPHERAL\_DDK\_INIT\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 未初始化DDK。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、 request为空、request->data为  空、request->cdbLength为0或者response为空。  [SCSIPERIPHERAL\_DDK\_SERVICE\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 与DDK服务通信失败。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。  [SCSIPERIPHERAL\_DDK\_IO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) DDK发生I/O错误。  [SCSIPERIPHERAL\_DDK\_TIMEOUT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 传输超时。  [SCSIPERIPHERAL\_DDK\_INVALID\_OPERATION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 不支持该操作。 |

### OH\_ScsiPeripheral\_CreateDeviceMemMap()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_CreateDeviceMemMap(ScsiPeripheral_Device *dev, size_t size,ScsiPeripheral_DeviceMemMap **devMmap)
```

**描述**

创建缓冲区。请在缓冲区使用完后，调用[OH\_ScsiPeripheral\_DestroyDeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_destroydevicememmap)销毁缓冲区，否则会造成资源泄漏。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device) \*dev | 设备句柄，详情参见[ScsiPeripheral\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-device)。 |
| size\_t size | 缓冲区的大小。 |
| [ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap) \*\*devMmap | 创建的缓冲区通过该参数返回给调用者，详情参见[ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) dev为空、devMmap为空或\*devMmap为空。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。 |

### OH\_ScsiPeripheral\_DestroyDeviceMemMap()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_DestroyDeviceMemMap(ScsiPeripheral_DeviceMemMap *devMmap)
```

**描述**

销毁缓冲区。请在缓冲区使用完后及时销毁缓冲区，否则会造成资源泄漏。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap) \*devMmap | 待销毁的由[OH\_ScsiPeripheral\_CreateDeviceMemMap](/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-api-h#oh_scsiperipheral_createdevicememmap)创建的缓冲区，详情参见[ScsiPeripheral\_DeviceMemMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsiperipheralddk-scsiperipheral-devicememmap)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) devMmap为空。  [SCSIPERIPHERAL\_DDK\_MEMORY\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 内存操作失败。 |

### OH\_ScsiPeripheral\_ParseBasicSenseInfo()

PC/2in1



```
1. int32_t OH_ScsiPeripheral_ParseBasicSenseInfo(uint8_t *senseData, uint8_t senseDataLen,ScsiPeripheral_BasicSenseInfo *senseInfo)
```

**描述**

解析基本的sense data，包括Information、Command specific information、Sense key specific字段。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| uint8\_t \*senseData | 待解析的sense data。 |
| uint8\_t senseDataLen | sense data长度。 |
| [ScsiPeripheral\_BasicSenseInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-scsiperipheralddk-scsiperipheral-basicsenseinfo) \*senseInfo | 用于保存解析后的基本信息，详情参见[ScsiPeripheral\_BasicSenseInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pi-scsiperipheralddk-scsiperipheral-basicsenseinfo)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | [SCSIPERIPHERAL\_DDK\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) 调用接口成功。  [SCSIPERIPHERAL\_DDK\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_ddkerrcode) senseData格式不是描述符或固定格式、senseDataLen小于  [SCSIPERIPHERAL\_MIN\_DESCRIPTOR\_FORMAT\_SENSE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_min_descriptor_format_sense)或者senseDataLen小于[SCSIPERIPHERAL\_MIN\_FIXED\_FORMAT\_SENSE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-scsi-peripheral-types-h#scsiperipheral_min_fixed_format_sense)。 |