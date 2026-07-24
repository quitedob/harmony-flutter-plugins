## 概述

PhonePC/2in1Tablet

声明用于发现和连接打印机、通过打印机打印文件、查询已添加打印机列表及其内部打印机信息等功能的 API。

**引用文件：** <BasicServicesKit/ohprint.h>

**库：** libohprint.so

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**相关模块：** [OH\_Print](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) | Print\_StringList | 表示字符串列表。 |
| [Print\_Property](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-property) | Print\_Property | 表示打印机属性。 |
| [Print\_PropertyList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-propertylist) | Print\_PropertyList | 打印机属性列表。 |
| [Print\_Resolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-resolution) | Print\_Resolution | 表示以 dpi 为单位的打印分辨率。 |
| [Print\_Margin](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-margin) | Print\_Margin | 表示打印边距。 |
| [Print\_PageSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-pagesize) | Print\_PageSize | 表示纸张尺寸信息。 |
| [Print\_PrinterCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printercapability) | Print\_PrinterCapability | 表示打印机能力。 |
| [Print\_DefaultValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-defaultvalue) | Print\_DefaultValue | 表示当前属性。 |
| [Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) | Print\_PrinterInfo | 表示打印机信息。 |
| [Print\_PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printjob) | Print\_PrintJob | 表示打印任务结构体。 |
| [Print\_Range](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-range) | Print\_Range | 表示打印范围结构体。 |
| [Print\_PrintAttributes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printattributes) | Print\_PrintAttributes | 表示打印属性结构体。 |
| [Print\_PrintDocCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printdoccallback) | Print\_PrintDocCallback | 表示打印文档状态回调结构体。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Print\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | Print\_ErrorCode | 定义错误码。 |
| [Print\_PrinterState](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerstate) | Print\_PrinterState | 表示打印机状态。 |
| [Print\_DiscoveryEvent](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_discoveryevent) | Print\_DiscoveryEvent | 表示打印机发现事件。 |
| [Print\_PrinterEvent](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerevent) | Print\_PrinterEvent | 表示打印机变更事件。 |
| [Print\_DuplexMode](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_duplexmode) | Print\_DuplexMode | 表示双面打印模式。 |
| [Print\_ColorMode](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_colormode) | Print\_ColorMode | 表示色彩模式。 |
| [Print\_OrientationMode](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_orientationmode) | Print\_OrientationMode | 表示方向模式。 |
| [Print\_Quality](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_quality) | Print\_Quality | 表示打印质量。 |
| [Print\_DocumentFormat](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_documentformat) | Print\_DocumentFormat | 表示文档的 MIME 媒体类型。 |
| [Print\_JobDocAdapterState](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_jobdocadapterstate) | Print\_JobDocAdapterState | 表示打印任务文档适配器状态。 |
| [OH\_Print\_JobState](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_jobstate) | OH\_Print\_JobState | 表示打印任务状态。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void(\*Print\_WriteResultCallback)(const char \*jobId, uint32\_t code)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_writeresultcallback) | Print\_WriteResultCallback | 写文件结果回调。 |
| [typedef void(\*Print\_OnStartLayoutWrite)(const char \*jobId, uint32\_t fd, const Print\_PrintAttributes \*oldAttrs, const Print\_PrintAttributes \*newAttrs, Print\_WriteResultCallback writeCallback)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_onstartlayoutwrite) | Print\_OnStartLayoutWrite | 打印开始布局回调。 |
| [typedef void(\*Print\_OnJobStateChanged)(const char \*jobId, uint32\_t state)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_onjobstatechanged) | Print\_OnJobStateChanged | 打印任务状态回调。 |
| [typedef void (\*Print\_PrinterDiscoveryCallback)(Print\_DiscoveryEvent event, const Print\_PrinterInfo \*printerInfo)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerdiscoverycallback) | Print\_PrinterDiscoveryCallback | 打印机发现回调。 |
| [typedef void (\*Print\_PrinterChangeCallback)(Print\_PrinterEvent event, const Print\_PrinterInfo \*printerInfo)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerchangecallback) | Print\_PrinterChangeCallback | 打印机变更回调。 |
| [Print\_ErrorCode OH\_Print\_Init()](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_init) | - | 此 API 检查并拉起打印服务，初始化打印客户端，并建立与打印服务的连接。 |
| [Print\_ErrorCode OH\_Print\_Release()](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_release) | - | 此 API 关闭与打印服务的连接，解散先前的回调，并释放打印客户端资源。 |
| [Print\_ErrorCode OH\_Print\_StartPrinterDiscovery(Print\_PrinterDiscoveryCallback callback)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_startprinterdiscovery) | - | 此 API 开始发现打印机。 |
| [Print\_ErrorCode OH\_Print\_StopPrinterDiscovery()](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_stopprinterdiscovery) | - | 此 API 停止发现打印机。 |
| [Print\_ErrorCode OH\_Print\_ConnectPrinter(const char \*printerId)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_connectprinter) | - | 此 API 使用打印机 ID 连接打印机。 |
| [Print\_ErrorCode OH\_Print\_StartPrintJob(const Print\_PrintJob \*printJob)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_startprintjob) | - | 此 API 开始发起打印任务。 |
| [Print\_ErrorCode OH\_Print\_RegisterPrinterChangeListener(Print\_PrinterChangeCallback callback)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_registerprinterchangelistener) | - | 此 API 注册打印机变更回调。 |
| [void OH\_Print\_UnregisterPrinterChangeListener()](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_unregisterprinterchangelistener) | - | 此 API 注销打印机变更回调。 |
| [Print\_ErrorCode OH\_Print\_QueryPrinterList(Print\_StringList \*printerIdList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_queryprinterlist) | - | 此 API 查询已添加的打印机列表。 |
| [void OH\_Print\_ReleasePrinterList(Print\_StringList \*printerIdList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_releaseprinterlist) | - | 此 API 释放用于查询的打印机列表内存。 |
| [Print\_ErrorCode OH\_Print\_QueryPrinterInfo(const char \*printerId, Print\_PrinterInfo \*\*printerInfo)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_queryprinterinfo) | - | 此 API 根据打印机 ID 查询打印机信息。 |
| [void OH\_Print\_ReleasePrinterInfo(Print\_PrinterInfo \*printerInfo)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_releaseprinterinfo) | - | 此 API 释放用于查询的打印机信息内存。 |
| [Print\_ErrorCode OH\_Print\_LaunchPrinterManager()](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_launchprintermanager) | - | 此 API 启动系统的打印机管理窗口。 |
| [Print\_ErrorCode OH\_Print\_QueryPrinterProperties(const char \*printerId, const Print\_StringList \*propertyKeyList, Print\_PropertyList \*propertyList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_queryprinterproperties) | - | 此 API 根据属性关键字列表查询对应的打印机属性值。 |
| [void OH\_Print\_ReleasePrinterProperties(Print\_PropertyList \*propertyList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_releaseprinterproperties) | - | 此 API 释放用于查询的属性列表内存。 |
| [Print\_ErrorCode OH\_Print\_UpdatePrinterProperties(const char \*printerId, const Print\_PropertyList \*propertyList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_updateprinterproperties) | - | 此 API 根据属性键值对列表设置打印机属性。 |
| [Print\_ErrorCode OH\_Print\_RestorePrinterProperties(const char \*printerId, const Print\_StringList \*propertyKeyList)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_restoreprinterproperties) | - | 此 API 根据属性关键字列表将打印机属性恢复为默认设置。 |
| [Print\_ErrorCode OH\_Print\_StartPrintByNative(const char \*printJobName, Print\_PrintDocCallback printDocCallback, void \*context)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_startprintbynative) | - | 此 API 提供启动打印对话框的能力。 |
| [typedef void(\*OH\_Print\_OnJobStateChanged)(const char \*jobId, OH\_Print\_JobState state)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_onjobstatechanged) | - | 打印任务状态回调。 |
| [Print\_ErrorCode OH\_Print\_StartPrintWithJobStateCallback(const Print\_PrintJob \*printJob, OH\_Print\_OnJobStateChanged jobStateChangedCb)](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_startprintwithjobstatecallback) | - | 此API下发打印任务，并附带任务状态变更回调功能。 |

## 枚举类型说明

PhonePC/2in1Tablet

### Print\_ErrorCode

PhonePC/2in1Tablet



```
1. enum Print_ErrorCode
```

**描述**

定义错误码。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINT\_ERROR\_NONE = 0 | 操作成功。 |
| PRINT\_ERROR\_NO\_PERMISSION = 201 | 权限校验失败。 |
| PRINT\_ERROR\_INVALID\_PARAMETER = 401 | 参数无效。 |
| PRINT\_ERROR\_GENERIC\_FAILURE = 24300001 | 通用内部错误。 |
| PRINT\_ERROR\_RPC\_FAILURE = 24300002 | RPC 通信错误。 |
| PRINT\_ERROR\_SERVER\_FAILURE = 24300003 | 服务端错误。 |
| PRINT\_ERROR\_INVALID\_EXTENSION = 24300004 | 无效的扩展。 |
| PRINT\_ERROR\_INVALID\_PRINTER = 24300005 | 无效的打印机。 |
| PRINT\_ERROR\_INVALID\_PRINT\_JOB = 24300006 | 无效的打印任务。 |
| PRINT\_ERROR\_FILE\_IO = 24300007 | 读写文件失败。 |
| PRINT\_ERROR\_UNKNOWN = 24300255 | 未知错误。 |

### Print\_PrinterState

PhonePC/2in1Tablet



```
1. enum Print_PrinterState
```

**描述**

表示打印机状态。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINTER\_IDLE | 打印机空闲。 |
| PRINTER\_BUSY | 打印机忙。 |
| PRINTER\_UNAVAILABLE | 打印机不可用。 |

### Print\_DiscoveryEvent

PhonePC/2in1Tablet



```
1. enum Print_DiscoveryEvent
```

**描述**

表示打印机发现事件。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINTER\_DISCOVERED = 0 | 发现打印机。 |
| PRINTER\_LOST = 1 | 丢失打印机。 |
| PRINTER\_CONNECTING = 2 | 正在连接打印机。 |
| PRINTER\_CONNECTED = 3 | 打印机已连接。 |

### Print\_PrinterEvent

PhonePC/2in1Tablet



```
1. enum Print_PrinterEvent
```

**描述**

表示打印机变更事件。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINTER\_ADDED = 0 | 打印机已添加。 |
| PRINTER\_DELETED = 1 | 打印机已删除。 |
| PRINTER\_STATE\_CHANGED = 2 | 打印机状态已变更。 |
| PRINTER\_INFO\_CHANGED = 3 | 打印机信息已变更。 |

### Print\_DuplexMode

PhonePC/2in1Tablet



```
1. enum Print_DuplexMode
```

**描述**

表示双面打印模式。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| DUPLEX\_MODE\_ONE\_SIDED = 0 | 单面模式。 |
| DUPLEX\_MODE\_TWO\_SIDED\_LONG\_EDGE = 1 | 长边翻转双面模式。 |
| DUPLEX\_MODE\_TWO\_SIDED\_SHORT\_EDGE = 2 | 短边翻转双面模式。 |

### Print\_ColorMode

PhonePC/2in1Tablet



```
1. enum Print_ColorMode
```

**描述**

表示色彩模式。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| COLOR\_MODE\_MONOCHROME = 0 | 黑白模式。 |
| COLOR\_MODE\_COLOR = 1 | 彩色模式。 |
| COLOR\_MODE\_AUTO = 2 | 自动模式。 |

### Print\_OrientationMode

PhonePC/2in1Tablet



```
1. enum Print_OrientationMode
```

**描述**

表示方向模式。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| ORIENTATION\_MODE\_PORTRAIT = 0 | 纵向模式。 |
| ORIENTATION\_MODE\_LANDSCAPE = 1 | 横向模式。 |
| ORIENTATION\_MODE\_REVERSE\_LANDSCAPE = 2 | 反向横向模式。 |
| ORIENTATION\_MODE\_REVERSE\_PORTRAIT = 3 | 反向纵向模式。 |
| ORIENTATION\_MODE\_NONE = 4 | 未指定。 |

### Print\_Quality

PhonePC/2in1Tablet



```
1. enum Print_Quality
```

**描述**

表示打印质量。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINT\_QUALITY\_DRAFT = 3 | 草稿质量模式 |
| PRINT\_QUALITY\_NORMAL = 4 | 正常质量模式 |
| PRINT\_QUALITY\_HIGH = 5 | 高质量模式 |

### Print\_DocumentFormat

PhonePC/2in1Tablet



```
1. enum Print_DocumentFormat
```

**描述**

表示文档的 MIME 媒体类型。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| DOCUMENT\_FORMAT\_AUTO | MIME 类型：application/octet-stream。 |
| DOCUMENT\_FORMAT\_JPEG | MIME 类型：image/jpeg。 |
| DOCUMENT\_FORMAT\_PDF | MIME 类型：application/pdf。 |
| DOCUMENT\_FORMAT\_POSTSCRIPT | MIME 类型：application/postscript。 |
| DOCUMENT\_FORMAT\_TEXT | MIME 类型：text/plain。 |

### Print\_JobDocAdapterState

PhonePC/2in1Tablet



```
1. enum Print_JobDocAdapterState
```

**描述**

表示打印任务文档适配器状态。

**起始版本：** 13

展开

| 枚举项 | 描述 |
| --- | --- |
| PRINT\_DOC\_ADAPTER\_PREVIEW\_ABILITY\_DESTROY = 0 | 打印任务预览能力销毁。 |
| PRINT\_DOC\_ADAPTER\_PRINT\_TASK\_SUCCEED = 1 | 打印任务成功。 |
| PRINT\_DOC\_ADAPTER\_PRINT\_TASK\_FAIL = 2 | 打印任务失败。 |
| PRINT\_DOC\_ADAPTER\_PRINT\_TASK\_CANCEL = 3 | 打印任务取消。 |
| PRINT\_DOC\_ADAPTER\_PRINT\_TASK\_BLOCK = 4 | 打印任务阻塞。 |
| PRINT\_DOC\_ADAPTER\_PREVIEW\_ABILITY\_DESTROY\_FOR\_CANCELED = 5 | 因取消导致的打印任务预览能力销毁。 |
| PRINT\_DOC\_ADAPTER\_PREVIEW\_ABILITY\_DESTROY\_FOR\_STARTED = 6 | 因启动导致的打印任务预览能力销毁。 |

## OH\_Print\_JobState

PhonePC/2in1Tablet



```
1. enum OH_Print_JobState
```

**描述**

表示打印任务状态。

**起始版本：** 24

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| OH\_PRINT\_JOB\_SUCCEED | 0 | 打印任务成功。 |
| OH\_PRINT\_JOB\_FAIL | 1 | 打印任务失败。 |
| OH\_PRINT\_JOB\_CANCEL | 2 | 打印任务取消。 |
| OH\_PRINT\_JOB\_BLOCK | 3 | 打印任务阻塞。 |

## 函数说明

PhonePC/2in1Tablet

### Print\_WriteResultCallback()

PhonePC/2in1Tablet



```
1. typedef void(*Print_WriteResultCallback)(const char *jobId, uint32_t code)
```

**描述**

写文件结果回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*jobId | 打印任务的 ID。 |
| uint32\_t code | 写文件的结果。 |

### Print\_OnStartLayoutWrite()

PhonePC/2in1Tablet



```
1. typedef void(*Print_OnStartLayoutWrite)(const char *jobId, uint32_t fd, const Print_PrintAttributes *oldAttrs, const Print_PrintAttributes *newAttrs, Print_WriteResultCallback writeCallback)
```

**描述**

打印开始布局回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*jobId | 打印任务的 ID。 |
| uint32\_t fd | 待写入的文件描述符。 |
| [const Print\_PrintAttributes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printattributes) \*oldAttrs | 上一次的属性。 |
| [const Print\_PrintAttributes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printattributes) \*newAttrs | 当前的属性。 |
| [Print\_WriteResultCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_writeresultcallback) writeCallback | 写文件结果回调。 |

### Print\_OnJobStateChanged()

PhonePC/2in1Tablet



```
1. typedef void(*Print_OnJobStateChanged)(const char *jobId, uint32_t state)
```

**描述**

打印任务状态回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*jobId | 打印任务的 ID。 |
| uint32\_t state | 当前打印任务的状态。 |

### Print\_PrinterDiscoveryCallback()

PhonePC/2in1Tablet



```
1. typedef void (*Print_PrinterDiscoveryCallback)(Print_DiscoveryEvent event, const Print_PrinterInfo *printerInfo)
```

**描述**

打印机发现回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| Print\_DiscoveryEvent event | 打印机发现过程中的发现事件。 |
| [const Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) \*printerInfo | 发现事件发生时的打印机信息。 |

### Print\_PrinterChangeCallback()

PhonePC/2in1Tablet



```
1. typedef void (*Print_PrinterChangeCallback)(Print_PrinterEvent event, const Print_PrinterInfo *printerInfo)
```

**描述**

打印机变更回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| Print\_PrinterEvent event | 打印服务运行期间的打印机变更事件。 |
| [const Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) \*printerInfo | 变更事件发生时的打印机信息。 |

### OH\_Print\_Init()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_Init()
```

**描述**

此 API 检查并拉起打印服务，初始化打印客户端，并建立与打印服务的连接。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。  [PRINT\_ERROR\_SERVER\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) cups 服务无法启动。 |

### OH\_Print\_Release()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_Release()
```

**描述**

此 API 关闭与打印服务的连接，解散先前的回调，并释放打印客户端资源。

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  当前不会返回其他错误码。 |

### OH\_Print\_StartPrinterDiscovery()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_StartPrinterDiscovery(Print_PrinterDiscoveryCallback callback)
```

**描述**

此 API 开始发现打印机。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_PrinterDiscoveryCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerdiscoverycallback) callback | 打印机发现事件的 [Print\_PrinterDiscoveryCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerdiscoverycallback)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。  [PRINT\_ERROR\_SERVER\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 从 BMS 查询打印扩展列表失败。  [PRINT\_ERROR\_INVALID\_EXTENSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 未找到可用的打印扩展。 |

### OH\_Print\_StopPrinterDiscovery()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_StopPrinterDiscovery()
```

**描述**

此 API 停止发现打印机。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。 |

### OH\_Print\_ConnectPrinter()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_ConnectPrinter(const char *printerId)
```

**描述**

此 API 使用打印机 ID 连接打印机。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printerId | 待连接的打印机 ID。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。  [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 打印机应在已发现的打印机列表中。  [PRINT\_ERROR\_SERVER\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法找到负责该打印机的扩展。 |

### OH\_Print\_StartPrintJob()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_StartPrintJob(const Print_PrintJob *printJob)
```

**描述**

此 API 开始发起打印任务。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const Print\_PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printjob) \*printJob | 指向指定打印任务信息的 [Print\_PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printjob) 实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。  [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 打印机应在已连接的打印机列表中。  [PRINT\_ERROR\_SERVER\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法在打印服务中创建打印任务。  [PRINT\_ERROR\_INVALID\_PRINT\_JOB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法在任务队列中找到该任务。 |

### OH\_Print\_RegisterPrinterChangeListener()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_RegisterPrinterChangeListener(Print_PrinterChangeCallback callback)
```

**描述**

此 API 注册打印机变更回调。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_PrinterChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerchangecallback) callback | 待注册的 [Print\_PrinterChangeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_printerchangecallback)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务能力。 |

### OH\_Print\_UnregisterPrinterChangeListener()

PhonePC/2in1Tablet



```
1. void OH_Print_UnregisterPrinterChangeListener()
```

**描述**

此 API 注销打印机变更回调。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

### OH\_Print\_QueryPrinterList()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_QueryPrinterList(Print_StringList *printerIdList)
```

**描述**

此 API 查询已添加的打印机列表。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) \*printerIdList | 用于存储查询到的打印机 ID 列表的 [Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) 实例指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) printerIdList 为 NULL。  [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法查询任何已连接的打印机。  [PRINT\_ERROR\_GENERIC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法复制打印机 ID 列表。 |

### OH\_Print\_ReleasePrinterList()

PhonePC/2in1Tablet



```
1. void OH_Print_ReleasePrinterList(Print_StringList *printerIdList)
```

**描述**

此 API 释放用于查询的打印机列表内存。

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) \*printerIdList | 待释放的已查询打印机 ID 列表。 |

### OH\_Print\_QueryPrinterInfo()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_QueryPrinterInfo(const char *printerId, Print_PrinterInfo **printerInfo)
```

**描述**

此 API 根据打印机 ID 查询打印机信息。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printerId | 待查询的打印机 ID。 |
| [Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) \*\*printerInfo | 用于存储打印机信息的 [Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) 指针的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。  [PRINT\_ERROR\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) printerId 为 NULL 或 printerInfo 为 NULL。  [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法在已连接的打印机列表中找到该打印机。 |

### OH\_Print\_ReleasePrinterInfo()

PhonePC/2in1Tablet



```
1. void OH_Print_ReleasePrinterInfo(Print_PrinterInfo *printerInfo)
```

**描述**

此 API 释放用于查询的打印机信息内存。

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_PrinterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printerinfo) \*printerInfo | 待释放的已查询打印机信息指针。 |

### OH\_Print\_LaunchPrinterManager()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_LaunchPrinterManager()
```

**描述**

此 API 启动系统的打印机管理窗口。

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_GENERIC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法启动打印机管理窗口。 |

### OH\_Print\_QueryPrinterProperties()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_QueryPrinterProperties(const char *printerId, const Print_StringList *propertyKeyList, Print_PropertyList *propertyList)
```

**描述**

此 API 根据属性关键字列表查询对应的打印机属性值。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printerId | 待查询的打印机 ID。 |
| [const Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) \*propertyKeyList | 待查询的属性关键字列表。 |
| [Print\_PropertyList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-propertylist) \*propertyList | 查询到的打印机属性值列表。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 参数之一为 NULL 或关键字列表为空。  [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法找到指定打印机的属性。  [PRINT\_ERROR\_GENERIC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法复制打印机属性。 |

### OH\_Print\_ReleasePrinterProperties()

PhonePC/2in1Tablet



```
1. void OH_Print_ReleasePrinterProperties(Print_PropertyList *propertyList)
```

**描述**

此 API 释放用于查询的属性列表内存。

**系统能力：** SystemCapability.Print.PrintFramework

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Print\_PropertyList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-propertylist) \*propertyList | 待释放的已查询打印机属性值指针。 |

### OH\_Print\_UpdatePrinterProperties()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_UpdatePrinterProperties(const char *printerId, const Print_PropertyList *propertyList)
```

**描述**

此 API 根据属性键值对列表设置打印机属性。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printerId | 待设置的打印机 ID。 |
| [const Print\_PropertyList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-propertylist) \*propertyList | 待设置的打印机属性值列表。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。 |

### OH\_Print\_RestorePrinterProperties()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_RestorePrinterProperties(const char *printerId, const Print_StringList *propertyKeyList)
```

**描述**

此 API 根据属性关键字列表将打印机属性恢复为默认设置。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printerId | 待恢复的打印机 ID。 |
| [const Print\_StringList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-stringlist) \*propertyKeyList | 待恢复的属性关键字列表。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。 |

### OH\_Print\_StartPrintByNative()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_StartPrintByNative(const char *printJobName, Print_PrintDocCallback printDocCallback, void *context)
```

**描述**

此 API 提供启动打印对话框的能力。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*printJobName | 此打印任务的名称。 |
| [Print\_PrintDocCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printdoccallback) printDocCallback | 打印文档状态回调。 |
| void \*context | 调用方应用的上下文。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Print\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 返回 [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 表示执行成功。  [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 需要 ohos.permission.PRINT 权限。  [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) 无法连接到打印服务。 |

### OH\_Print\_OnJobStateChanged()

PhonePC/2in1Tablet



```
1. typedef void(*OH_Print_OnJobStateChanged)(const char *jobId, OH_Print_JobState state)
```

**描述**

打印任务状态回调。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char \*jobId | 打印任务的ID。 |
| [OH\_Print\_JobState](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_jobstate) state | 当前打印任务的状态。 |

### OH\_Print\_StartPrintWithJobStateCallback()

PhonePC/2in1Tablet



```
1. Print_ErrorCode OH_Print_StartPrintWithJobStateCallback(const Print_PrintJob *printJob, OH_Print_OnJobStateChanged jobStateChangedCb)
```

**描述**

此API下发打印任务，并附带任务状态变更回调功能。

**系统能力：** SystemCapability.Print.PrintFramework

**需要权限：** ohos.permission.PRINT

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const [Print\_PrintJob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-printjob) \*printJob | 打印任务结构体。 |
| [OH\_Print\_OnJobStateChanged](/consumer/cn/doc/harmonyos-references/capi-ohprint-h#oh_print_onjobstatechanged) jobStateChangedCb | 打印任务状态回调。 |

**返回：**

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| [PRINT\_ERROR\_NONE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 0 | 执行成功。 |
| [PRINT\_ERROR\_NO\_PERMISSION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 201 | 需要 [ohos.permission.PRINT](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all#ohospermissionprint) 权限。 |
| [PRINT\_ERROR\_INVALID\_PARAMETER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 401 | 参数之一为NULL或关键字列表为空。 |
| [PRINT\_ERROR\_GENERIC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 24300001 | 无法复制回调函数。 |
| [PRINT\_ERROR\_RPC\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 24300002 | 无法连接到打印服务。 |
| [PRINT\_ERROR\_SERVER\_FAILURE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 24300003 | 打印服务中无法创建打印任务结构体。 |
| [PRINT\_ERROR\_INVALID\_PRINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 24300005 | 无法找到指定打印机的属性。 |
| [PRINT\_ERROR\_INVALID\_PRINT\_JOB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_errorcode) | 24300006 | 无法在任务队列中找到该任务。 |