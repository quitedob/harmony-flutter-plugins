## 概述

PhonePC/2in1TabletTV

提供访问统一数据管理框架数据的接口、数据结构、枚举类型。当参数类型为char\*时，字符串必须以空字符（'\0'）结尾。

**引用文件：** <database/udmf/udmf.h>

**库：** libudmf.so

**系统能力：** SystemCapability.DistributedDataManager.UDMF.Core

**起始版本：** 12

**相关模块：** [UDMF](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf)

## 汇总

PhonePC/2in1TabletTV

### 结构体

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata) | OH\_UdmfData | 定义统一数据对象数据结构。 |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord) | OH\_UdmfRecord | 定义统一数据对象中记录数据的数据结构，称为数据记录。 |
| [OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider) | OH\_UdmfRecordProvider | 定义统一数据对象中的数据提供者。 |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty) | OH\_UdmfProperty | 定义统一数据对象中数据记录的属性结构。 |
| [OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo) | OH\_Udmf\_ProgressInfo | 定义进度信息的数据结构。 |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams) | OH\_UdmfGetDataParams | 定义异步获取UDMF数据的请求参数。 |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions) | OH\_UdmfOptions | 数据操作选项，定义数据操作的可选参数。 |
| [OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams) | OH\_UdmfDataLoadParams | 表示数据加载参数结构体。 |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo) | OH\_UdmfDataLoadInfo | 表示数据加载信息结构体。 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Udmf\_Intention](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention) | Udmf\_Intention | 描述UDMF数据通路枚举类型。 |
| [Udmf\_ShareOption](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption) | Udmf\_ShareOption | UDMF支持的设备内使用范围类型枚举。 |
| [Udmf\_FileConflictOptions](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_fileconflictoptions) | Udmf\_FileConflictOptions | 定义文件拷贝冲突时的选项。 |
| [Udmf\_ProgressIndicator](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_progressindicator) | Udmf\_ProgressIndicator | 定义进度条指示选项，可选择是否采用系统默认进度显示。 |
| [Udmf\_Visibility](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_visibility) | Udmf\_Visibility | 定义数据的可见性等级。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [UDMF\_KEY\_BUFFER\_LEN (512)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_key_buffer_len) | - | 统一数据对象唯一标识符最小空间长度。 |
| [typedef void (\*OH\_Udmf\_DataProgressListener)(OH\_Udmf\_ProgressInfo\* progressInfo, OH\_UdmfData\* data)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_dataprogresslistener) | OH\_Udmf\_DataProgressListener | 定义获取进度信息和数据的监听回调函数。  使用时需要判断数据是否返回空指针。只有当进度达到100%时，才会返回数据。 |
| [OH\_UdmfData\* OH\_UdmfData\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_create) | - | 创建统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfData\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [void OH\_UdmfData\_Destroy(OH\_UdmfData\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_destroy) | - | 销毁统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)指针指向的实例对象。 |
| [int OH\_UdmfData\_AddRecord(OH\_UdmfData\* pThis, OH\_UdmfRecord\* record)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_addrecord) | - | 添加一个数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)到统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中。 |
| [bool OH\_UdmfData\_HasType(OH\_UdmfData\* pThis, const char\* type)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_hastype) | - | 检查统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中是否存在指定类型。 |
| [char\*\* OH\_UdmfData\_GetTypes(OH\_UdmfData\* pThis, unsigned int\* count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_gettypes) | - | 获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有类型结果集。 |
| [OH\_UdmfRecord\*\* OH\_UdmfData\_GetRecords(OH\_UdmfData\* pThis, unsigned int\* count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_getrecords) | - | 获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有记录结果集。 |
| [typedef void (\*UdmfData\_Finalize)(void\* context)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmfdata_finalize) | UdmfData\_Finalize | 定义用于释放上下文的回调函数，统一数据提供者对象销毁时触发。 |
| [OH\_UdmfRecordProvider\* OH\_UdmfRecordProvider\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_create) | - | 创建一个统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfRecordProvider\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [int OH\_UdmfRecordProvider\_Destroy(OH\_UdmfRecordProvider\* provider)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_destroy) | - | 销毁统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)指针指向的实例对象。 |
| [typedef void\* (\*OH\_UdmfRecordProvider\_GetData)(void\* context, const char\* type)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_getdata) | OH\_UdmfRecordProvider\_GetData | 定义用于按类型获取数据的回调函数。当从OH\_UdmfRecord中获取数据时，会触发此回调函数，得到的数据就是这个回调函数返回的数据。 |
| [int OH\_UdmfRecordProvider\_SetData(OH\_UdmfRecordProvider\* provider, void\* context, const OH\_UdmfRecordProvider\_GetData callback, const UdmfData\_Finalize finalize)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_setdata) | - | 设置统一数据提供者的数据提供回调函数。 |
| [OH\_UdmfRecord\* OH\_UdmfRecord\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_create) | - | 创建统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfRecord\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [void OH\_UdmfRecord\_Destroy(OH\_UdmfRecord\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_destroy) | - | 销毁统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)指针指向的实例对象。 |
| [int OH\_UdmfRecord\_AddGeneralEntry(OH\_UdmfRecord\* pThis, const char\* typeId, unsigned char\* entry, unsigned int count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addgeneralentry) | - | 添加用户自定义的通用数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。对于已定义UDS的类型（比如PlainText、Link、Pixelmap等）不可使用该接口。 |
| [int OH\_UdmfRecord\_AddPlainText(OH\_UdmfRecord\* pThis, OH\_UdsPlainText\* plainText)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addplaintext) | - | 增加纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddHyperlink(OH\_UdmfRecord\* pThis, OH\_UdsHyperlink\* hyperlink)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addhyperlink) | - | 增加超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddHtml(OH\_UdmfRecord\* pThis, OH\_UdsHtml\* html)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addhtml) | - | 增加超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddAppItem(OH\_UdmfRecord\* pThis, OH\_UdsAppItem\* appItem)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addappitem) | - | 增加桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddFileUri(OH\_UdmfRecord\* pThis, OH\_UdsFileUri\* fileUri)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addfileuri) | - | 增加文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddPixelMap(OH\_UdmfRecord\* pThis, OH\_UdsPixelMap\* pixelMap)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addpixelmap) | - | 增加像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddArrayBuffer(OH\_UdmfRecord\* record, const char\* type, OH\_UdsArrayBuffer\* buffer)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addarraybuffer) | - | 增加一个ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)的数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_AddContentForm(OH\_UdmfRecord\* pThis, OH\_UdsContentForm\* contentForm)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_addcontentform) | - | 增加一个内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)的数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [char\*\* OH\_UdmfRecord\_GetTypes(OH\_UdmfRecord\* pThis, unsigned int\* count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_gettypes) | - | 获取统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中所有类型的结果集。 |
| [int OH\_UdmfRecord\_GetGeneralEntry(OH\_UdmfRecord\* pThis, const char\* typeId, unsigned char\*\* entry, unsigned int\* count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getgeneralentry) | - | 获取统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中的特定类型的数据结果集。 |
| [int OH\_UdmfRecord\_GetPlainText(OH\_UdmfRecord\* pThis, OH\_UdsPlainText\* plainText)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getplaintext) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据。 |
| [int OH\_UdmfRecord\_GetHyperlink(OH\_UdmfRecord\* pThis, OH\_UdsHyperlink\* hyperlink)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_gethyperlink) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)数据。 |
| [int OH\_UdmfRecord\_GetHtml(OH\_UdmfRecord\* pThis, OH\_UdsHtml\* html)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_gethtml) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据。 |
| [int OH\_UdmfRecord\_GetAppItem(OH\_UdmfRecord\* pThis, OH\_UdsAppItem\* appItem)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getappitem) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)数据。 |
| [int OH\_UdmfRecord\_SetProvider(OH\_UdmfRecord\* pThis, const char\* const\* types, unsigned int count, OH\_UdmfRecordProvider\* provider)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_setprovider) | - | 将指定类型的统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)设置至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。 |
| [int OH\_UdmfRecord\_GetFileUri(OH\_UdmfRecord\* pThis, OH\_UdsFileUri\* fileUri)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getfileuri) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)数据。 |
| [int OH\_UdmfRecord\_GetPixelMap(OH\_UdmfRecord\* pThis, OH\_UdsPixelMap\* pixelMap)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getpixelmap) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)数据。 |
| [int OH\_UdmfRecord\_GetArrayBuffer(OH\_UdmfRecord\* record, const char\* type, OH\_UdsArrayBuffer\* buffer)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getarraybuffer) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)数据。 |
| [int OH\_UdmfRecord\_GetContentForm(OH\_UdmfRecord\* pThis, OH\_UdsContentForm\* contentForm)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_getcontentform) | - | 从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)数据。 |
| [int OH\_UdmfData\_GetPrimaryPlainText(OH\_UdmfData\* data, OH\_UdsPlainText\* plainText)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_getprimaryplaintext) | - | 从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中获取第一个纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据。 |
| [int OH\_UdmfData\_GetPrimaryHtml(OH\_UdmfData\* data, OH\_UdsHtml\* html)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_getprimaryhtml) | - | 从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中获取第一个超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据。 |
| [int OH\_UdmfData\_GetRecordCount(OH\_UdmfData\* data)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_getrecordcount) | - | 获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有记录数量。 |
| [OH\_UdmfRecord\* OH\_UdmfData\_GetRecord(OH\_UdmfData\* data, unsigned int index)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_getrecord) | - | 获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中指定位置的数据记录。 |
| [bool OH\_UdmfData\_IsLocal(OH\_UdmfData\* data)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_islocal) | - | 检查统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)是否是来自本端设备的数据。 |
| [OH\_UdmfProperty\* OH\_UdmfProperty\_Create(OH\_UdmfData\* unifiedData)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_create) | - | 创建统一数据对象中数据记录属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfProperty\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [void OH\_UdmfProperty\_Destroy(OH\_UdmfProperty\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_destroy) | - | 销毁数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)指针指向的实例对象。 |
| [const char\* OH\_UdmfProperty\_GetTag(OH\_UdmfProperty\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_gettag) | - | 从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取用户自定义标签值。 |
| [int64\_t OH\_UdmfProperty\_GetTimestamp(OH\_UdmfProperty\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_gettimestamp) | - | 从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取时间戳。 |
| [Udmf\_ShareOption OH\_UdmfProperty\_GetShareOption(OH\_UdmfProperty\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_getshareoption) | - | 从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取设备内适用范围属性。 |
| [int OH\_UdmfProperty\_GetExtrasIntParam(OH\_UdmfProperty\* pThis, const char\* key, int defaultValue)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_getextrasintparam) | - | 从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取自定义的附加整型参数。 |
| [const char\* OH\_UdmfProperty\_GetExtrasStringParam(OH\_UdmfProperty\* pThis, const char\* key)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_getextrasstringparam) | - | 从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取自定义的附加字符串参数。 |
| [int OH\_UdmfProperty\_SetTag(OH\_UdmfProperty\* pThis, const char\* tag)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_settag) | - | 设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的自定义标签值。 |
| [int OH\_UdmfProperty\_SetShareOption(OH\_UdmfProperty\* pThis, Udmf\_ShareOption option)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_setshareoption) | - | 设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的设备内适用范围[Udmf\_ShareOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption)参数。 |
| [int OH\_UdmfProperty\_SetExtrasIntParam(OH\_UdmfProperty\* pThis, const char\* key, int param)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_setextrasintparam) | - | 设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的附加整型参数。 |
| [int OH\_UdmfProperty\_SetExtrasStringParam(OH\_UdmfProperty\* pThis, const char\* key, const char\* param)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_setextrasstringparam) | - | 设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的附加字符串参数。 |
| [OH\_UdmfOptions\* OH\_UdmfOptions\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_create) | - | 创建指向[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。当不再需要使用指针时，请使用[OH\_UdmfOptions\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [void OH\_UdmfOptions\_Destroy(OH\_UdmfOptions\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_destroy) | - | 销毁指向[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [const char\* OH\_UdmfOptions\_GetKey(OH\_UdmfOptions\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_getkey) | - | 从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据的唯一标识符信息。 |
| [int OH\_UdmfOptions\_SetKey(OH\_UdmfOptions\* pThis, const char\* key)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_setkey) | - | 设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据的唯一标识符内容参数。 |
| [Udmf\_Intention OH\_UdmfOptions\_GetIntention(OH\_UdmfOptions\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_getintention) | - | 从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据通路信息。 |
| [int OH\_UdmfOptions\_SetIntention(OH\_UdmfOptions\* pThis, Udmf\_Intention intention)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_setintention) | - | 设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据通路内容参数。 |
| [int OH\_UdmfOptions\_Reset(OH\_UdmfOptions\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_reset) | - | 重置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例为空。 |
| [int OH\_Udmf\_GetUnifiedData(const char\* key, Udmf\_Intention intention, OH\_UdmfData\* unifiedData)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getunifieddata) | - | 从统一数据管理框架数据库中获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| [int OH\_Udmf\_GetUnifiedDataByOptions(OH\_UdmfOptions\* options, OH\_UdmfData\*\* dataArray, unsigned int\* dataSize)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getunifieddatabyoptions) | - | 通过数据通路类型从统一数据管理框架数据库中获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| [int OH\_Udmf\_SetUnifiedData(Udmf\_Intention intention, OH\_UdmfData\* unifiedData, char\* key, unsigned int keyLen)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_setunifieddata) | - | 从统一数据管理框架数据库中写入统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| [int OH\_Udmf\_SetUnifiedDataByOptions(OH\_UdmfOptions\* options, OH\_UdmfData \*unifiedData, char \*key, unsigned int keyLen)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_setunifieddatabyoptions) | - | 从统一数据管理框架数据库中写入统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| [int OH\_Udmf\_UpdateUnifiedData(OH\_UdmfOptions\* options, OH\_UdmfData\* unifiedData)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_updateunifieddata) | - | 对统一数据管理框架数据库中的统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据进行数据更改。 |
| [int OH\_Udmf\_DeleteUnifiedData(OH\_UdmfOptions\* options, OH\_UdmfData\*\* dataArray, unsigned int\* dataSize)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_deleteunifieddata) | - | 删除统一数据管理框架数据库中的统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| [void OH\_Udmf\_DestroyDataArray(OH\_UdmfData\*\* dataArray, unsigned int dataSize)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_destroydataarray) | - | 销毁数据数组内存。 |
| [int OH\_UdmfProgressInfo\_GetProgress(OH\_Udmf\_ProgressInfo\* progressInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfprogressinfo_getprogress) | - | 从进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)中获取进度百分比数据。 |
| [int OH\_UdmfProgressInfo\_GetStatus(OH\_Udmf\_ProgressInfo\* progressInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfprogressinfo_getstatus) | - | 从进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)中获取状态信息。 |
| [OH\_UdmfGetDataParams\* OH\_UdmfGetDataParams\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_create) | - | 创建异步获取UDMF数据的请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)指针及实例对象。  当不再需要使用指针时，请使用[OH\_UdmfGetDataParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [void OH\_UdmfGetDataParams\_Destroy(OH\_UdmfGetDataParams\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_destroy) | - | 销毁异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)指针指向的实例对象。 |
| [void OH\_UdmfGetDataParams\_SetDestUri(OH\_UdmfGetDataParams\* params, const char\* destUri)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_setdesturi) | - | 设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的目标路径。  若设置了目标路径，会将文件类型的数据进行拷贝到指定路径。回调中获取到的文件类型数据会被替换为目标路径的URI。  若不设置目标路径，则不会执行拷贝文件操作。回调中获取到的文件类型数据为源端路径URI。  若应用涉及复杂文件处理策略，或需要将文件拷贝在多个路径下时，建议不设置此参数，由应用自行完成文件拷贝相关处理。 |
| [void OH\_UdmfGetDataParams\_SetFileConflictOptions(OH\_UdmfGetDataParams\* params, const Udmf\_FileConflictOptions options)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_setfileconflictoptions) | - | 设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的文件冲突选项。 |
| [void OH\_UdmfGetDataParams\_SetProgressIndicator(OH\_UdmfGetDataParams\* params, const Udmf\_ProgressIndicator progressIndicator)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_setprogressindicator) | - | 设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的进度条指示选项。 |
| [void OH\_UdmfGetDataParams\_SetDataProgressListener(OH\_UdmfGetDataParams\* params, const OH\_Udmf\_DataProgressListener dataProgressListener)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_setdataprogresslistener) | - | 设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的监听回调函数。 |
| [Udmf\_Visibility OH\_UdmfOptions\_GetVisibility(OH\_UdmfOptions\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_getvisibility) | - | 从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据可见性等级。 |
| [int OH\_UdmfOptions\_SetVisibility(OH\_UdmfOptions\* pThis, Udmf\_Visibility visibility)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_setvisibility) | - | 设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据可见性等级。 |
| [typedef OH\_UdmfData\* (\*OH\_Udmf\_DataLoadHandler)(OH\_UdmfDataLoadInfo\* acceptableInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_dataloadhandler) | OH\_Udmf\_DataLoadHandler | 表示用于加载数据的回调函数。 |
| [OH\_UdmfDataLoadParams\* OH\_UdmfDataLoadParams\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadparams_create) | - | 创建指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针。 |
| [void OH\_UdmfDataLoadParams\_Destroy(OH\_UdmfDataLoadParams\* pThis)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadparams_destroy) | - | 销毁数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)指针指向的实例对象。 |
| [void OH\_UdmfDataLoadParams\_SetLoadHandler(OH\_UdmfDataLoadParams\* params, const OH\_Udmf\_DataLoadHandler dataLoadHandler)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadparams_setloadhandler) | - | 设置数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)中的数据加载处理函数。 |
| [void OH\_UdmfDataLoadParams\_SetDataLoadInfo(OH\_UdmfDataLoadParams\* params, OH\_UdmfDataLoadInfo\* dataLoadInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadparams_setdataloadinfo) | - | 设置数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)中的数据加载信息。 |
| [OH\_UdmfDataLoadInfo\* OH\_UdmfDataLoadInfo\_Create()](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_create) | - | 创建指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |
| [void OH\_UdmfDataLoadInfo\_Destroy(OH\_UdmfDataLoadInfo\* dataLoadInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_destroy) | - | 销毁数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)指针指向的实例对象。 |
| [char\*\* OH\_UdmfDataLoadInfo\_GetTypes(OH\_UdmfDataLoadInfo\* dataLoadInfo, unsigned int\* count)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_gettypes) | - | 从数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中获取数据类型列表。 |
| [void OH\_UdmfDataLoadInfo\_SetType(OH\_UdmfDataLoadInfo\* dataLoadInfo, const char\* type)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_settype) | - | 设置数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的数据类型。 |
| [int OH\_UdmfDataLoadInfo\_GetRecordCount(OH\_UdmfDataLoadInfo\* dataLoadInfo)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_getrecordcount) | - | 获取数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的记录数量。 |
| [void OH\_UdmfDataLoadInfo\_SetRecordCount(OH\_UdmfDataLoadInfo\* dataLoadInfo, unsigned int recordCount)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdataloadinfo_setrecordcount) | - | 设置数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的记录数量。 |
| [OH\_UdmfData\* OH\_UDMF\_GetDataElementAt(OH\_UdmfData\*\* dataArray, unsigned int index)](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getdataelementat) | - | 从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数组中获取指定下标的统一数据对象数据。 |

## 枚举类型说明

PhonePC/2in1TabletTV

### Udmf\_Intention

PhonePC/2in1TabletTV



```
1. enum Udmf_Intention
```

**描述**

描述UDMF数据通路枚举类型。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_INTENTION\_DRAG | 拖拽数据通路。 |
| UDMF\_INTENTION\_PASTEBOARD | 剪贴板数据通路。 |
| UDMF\_INTENTION\_DATA\_HUB | 公共数据通路。  **起始版本：** 20 |
| UDMF\_INTENTION\_SYSTEM\_SHARE | 系统分享数据通路。  **起始版本：** 20 |
| UDMF\_INTENTION\_PICKER | Picker数据通路。  **起始版本：** 20 |
| UDMF\_INTENTION\_MENU | 菜单数据通路。  **起始版本：** 20 |

### Udmf\_ShareOption

PhonePC/2in1TabletTV



```
1. enum Udmf_ShareOption
```

**描述**

UDMF支持的设备内使用范围类型枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| SHARE\_OPTIONS\_INVALID | 表示不合法的使用范围类型。 |
| SHARE\_OPTIONS\_IN\_APP | 表示允许在本设备同应用内使用。 |
| SHARE\_OPTIONS\_CROSS\_APP | 表示允许在本设备内跨应用使用。 |

### Udmf\_FileConflictOptions

PhonePC/2in1TabletTV



```
1. enum Udmf_FileConflictOptions
```

**描述**

定义文件拷贝冲突时的选项。

**起始版本：** 15

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_OVERWRITE = 0 | 目标路径存在同文件名时覆盖。若不配置策略，默认使用改策略。 |
| UDMF\_SKIP = 1 | 目标路径存在同文件名时跳过。 |

### Udmf\_ProgressIndicator

PhonePC/2in1TabletTV



```
1. enum Udmf_ProgressIndicator
```

**描述**

定义进度条指示选项，可选择是否采用系统默认进度显示。

**起始版本：** 15

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_NONE = 0 | 不采用系统默认进度显示。 |
| UDMF\_DEFAULT = 1 | 采用系统默认进度显示，500ms内获取数据完成将不会拉起默认进度条。 |

### Udmf\_Visibility

PhonePC/2in1TabletTV



```
1. enum Udmf_Visibility
```

**描述**

定义数据的可见性等级。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| UDMF\_ALL | 可见性等级，所有应用可见。 |
| UDMF\_OWN\_PROCESS | 可见性等级，仅数据提供者可见。 |

## 函数说明

PhonePC/2in1TabletTV

### OH\_UdmfGetDataParams\_SetAcceptableInfo()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_SetAcceptableInfo(OH_UdmfGetDataParams* params, OH_UdmfDataLoadInfo* acceptableInfo)
```

**描述**

设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中可接收的数据描述信息。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* params | 表示指向[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* acceptableInfo | 表示指向[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |

### OH\_UdmfDataLoadParams\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfDataLoadParams* OH_UdmfDataLoadParams_Create()
```

**描述**

创建指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针。

**起始版本：** 20

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)\* | 如果创建成功，返回一个指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针；否则返回nullptr。 |

### OH\_UdmfDataLoadParams\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadParams_Destroy(OH_UdmfDataLoadParams* pThis)
```

**描述**

销毁数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)指针指向的实例对象。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)\* pThis | 表示指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针。 |

### OH\_UdmfDataLoadParams\_SetLoadHandler()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadParams_SetLoadHandler(OH_UdmfDataLoadParams* params, const OH_Udmf_DataLoadHandler dataLoadHandler)
```

**描述**

设置数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)中的数据加载处理函数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)\* params | 表示指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针。 |
| [const OH\_Udmf\_DataLoadHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_dataloadhandler) dataLoadHandler | 表示用户定义的数据加载处理函数。 |

### OH\_UdmfDataLoadParams\_SetDataLoadInfo()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadParams_SetDataLoadInfo(OH_UdmfDataLoadParams* params, OH_UdmfDataLoadInfo* dataLoadInfo)
```

**描述**

设置数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)中的数据加载信息。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)\* params | 表示指向数据加载参数[OH\_UdmfDataLoadParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadparams)实例的指针。 |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |

### OH\_UdmfDataLoadInfo\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfDataLoadInfo* OH_UdmfDataLoadInfo_Create()
```

**描述**

创建指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。

**起始版本：** 20

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* | 如果创建成功，返回一个指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针；否则返回nullptr。 |

### OH\_UdmfDataLoadInfo\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadInfo_Destroy(OH_UdmfDataLoadInfo* dataLoadInfo)
```

**描述**

销毁数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)指针指向的实例对象。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |

### OH\_UdmfDataLoadInfo\_GetTypes()

PhonePC/2in1TabletTV



```
1. char** OH_UdmfDataLoadInfo_GetTypes(OH_UdmfDataLoadInfo* dataLoadInfo, unsigned int* count)
```

**描述**

从数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中获取数据类型列表。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |
| unsigned int\* count | 返回的数据类型数量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| char\*\* | 返回数据类型的字符串数组。 |

### OH\_UdmfDataLoadInfo\_SetType()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadInfo_SetType(OH_UdmfDataLoadInfo* dataLoadInfo, const char* type)
```

**描述**

设置数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的数据类型。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |
| const char\* type | 表示数据类型的字符串。 |

### OH\_UdmfDataLoadInfo\_GetRecordCount()

PhonePC/2in1TabletTV



```
1. int OH_UdmfDataLoadInfo_GetRecordCount(OH_UdmfDataLoadInfo* dataLoadInfo)
```

**描述**

获取数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的记录数量。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回记录的数量。 |

### OH\_UdmfDataLoadInfo\_SetRecordCount()

PhonePC/2in1TabletTV



```
1. void OH_UdmfDataLoadInfo_SetRecordCount(OH_UdmfDataLoadInfo* dataLoadInfo, unsigned int recordCount)
```

**描述**

设置数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)中的记录数量。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* dataLoadInfo | 表示指向数据加载信息[OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)实例的指针。 |
| unsigned int recordCount | 表示记录的数量。 |

### OH\_Udmf\_DataLoadHandler()

PhonePC/2in1TabletTV



```
1. typedef OH_UdmfData* (*OH_Udmf_DataLoadHandler)(OH_UdmfDataLoadInfo* acceptableInfo)
```

**描述**

表示用于加载数据的回调函数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfDataLoadInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdataloadinfo)\* acceptableInfo | 表示接收端可接收的数据类型和数量信息。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* (\*OH\_Udmf\_DataLoadHandler) | 返回待加载的数据。 |

### OH\_UdmfOptions\_GetVisibility()

PhonePC/2in1TabletTV



```
1. Udmf_Visibility OH_UdmfOptions_GetVisibility(OH_UdmfOptions* pThis)
```

**描述**

从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据可见性等级。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Udmf\_Visibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_visibility) | 返回数据可见性等级[Udmf\_Visibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_visibility)的值。 |

### OH\_UdmfOptions\_SetVisibility()

PhonePC/2in1TabletTV



```
1. int OH_UdmfOptions_SetVisibility(OH_UdmfOptions* pThis, Udmf_Visibility visibility)
```

**描述**

设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据可见性等级。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [Udmf\_Visibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_visibility) visibility | 数据可见性等级[Udmf\_Visibility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_visibility)参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行结果。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### UDMF\_KEY\_BUFFER\_LEN()

PhonePC/2in1TabletTV



```
1. UDMF_KEY_BUFFER_LEN (512)
```

**描述**

统一数据对象唯一标识符最小空间长度。

**起始版本：** 12

### OH\_Udmf\_DataProgressListener()

PhonePC/2in1TabletTV



```
1. typedef void (*OH_Udmf_DataProgressListener)(OH_Udmf_ProgressInfo* progressInfo, OH_UdmfData* data)
```

**描述**

定义获取进度信息和数据的监听回调函数。

使用时需要判断数据是否返回空指针。只有当进度达到100%时，才会返回数据。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)\* progressInfo | 进度信息，作为出参使用。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 返回的统一数据对象，作为出参使用。 |

### OH\_UdmfData\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfData* OH_UdmfData_Create()
```

**描述**

创建统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfData\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfdata_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* | 执行成功则返回一个指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例对象的指针，否则返回nullptr。 |

**参考：**

OH\_UdmfData

### OH\_UdmfData\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfData_Destroy(OH_UdmfData* pThis)
```

**描述**

销毁统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)指针指向的实例对象。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* pThis | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |

**参考：**

OH\_UdmfData

### OH\_UdmfData\_AddRecord()

PhonePC/2in1TabletTV



```
1. int OH_UdmfData_AddRecord(OH_UdmfData* pThis, OH_UdmfRecord* record)
```

**描述**

添加一个数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)到统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* pThis | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* record | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfData\_HasType()

PhonePC/2in1TabletTV



```
1. bool OH_UdmfData_HasType(OH_UdmfData* pThis, const char* type)
```

**描述**

检查统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中是否存在指定类型。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* pThis | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| const char\* type | 表示指定类型的字符串指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 返回查找类型的状态。返回false表示不存在指定类型，返回true表示存在指定类型。 |

### OH\_UdmfData\_GetTypes()

PhonePC/2in1TabletTV



```
1. char** OH_UdmfData_GetTypes(OH_UdmfData* pThis, unsigned int* count)
```

**描述**

获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有类型结果集。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* pThis | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| unsigned int\* count | 该参数是输出参数，结果集中的类型数量会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| char\*\* | 执行成功时返回统一数据对象的类型结果集，否则返回nullptr。 |

### OH\_UdmfData\_GetRecords()

PhonePC/2in1TabletTV



```
1. OH_UdmfRecord** OH_UdmfData_GetRecords(OH_UdmfData* pThis, unsigned int* count)
```

**描述**

获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有记录结果集。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* pThis | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| unsigned int\* count | 该参数是输出参数，结果集中的记录数量会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\*\* | 执行成功时返回统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)结果集，否则返回nullptr。 |

### UdmfData\_Finalize()

PhonePC/2in1TabletTV



```
1. typedef void (*UdmfData_Finalize)(void* context)
```

**描述**

定义用于释放上下文的回调函数，统一数据提供者对象销毁时触发。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void\* context | 要释放的上下文指针。 |

### OH\_UdmfRecordProvider\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfRecordProvider* OH_UdmfRecordProvider_Create()
```

**描述**

创建一个统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfRecordProvider\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 13

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)\* | 执行成功时返回一个指向统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)实例对象的指针，否则返回nullptr。 |

### OH\_UdmfRecordProvider\_Destroy()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecordProvider_Destroy(OH_UdmfRecordProvider* provider)
```

**描述**

销毁统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)指针指向的实例对象。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)\* provider | 表示指向统一数据提供者对象[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecordProvider\_GetData()

PhonePC/2in1TabletTV



```
1. typedef void* (*OH_UdmfRecordProvider_GetData)(void* context, const char* type)
```

**描述**

定义用于按类型获取数据的回调函数。当从OH\_UdmfRecord中获取数据时，会触发此回调函数，得到的数据就是这个回调函数返回的数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void\* context | 用[OH\_UdmfRecordProvider\_SetData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_setdata)设置的上下文指针。 |
| const char\* type | 要获取的数据类型。详细类型信息见[udmf\_meta.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-meta-h)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| void\* | 需要返回一个标准化数据。 |

### OH\_UdmfRecordProvider\_SetData()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecordProvider_SetData(OH_UdmfRecordProvider* provider, void* context, const OH_UdmfRecordProvider_GetData callback, const UdmfData_Finalize finalize)
```

**描述**

设置统一数据提供者的数据提供回调函数。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)\* provider | 指向统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)实例对象的指针。 |
| void\* context | 上下文指针，将作为第一个参数传入[OH\_UdmfRecordProvider\_GetData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_getdata)。 |
| const [OH\_UdmfRecordProvider\_GetData](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_getdata) callback | 获取数据的回调函数。详见：[OH\_UdmfRecordProvider\_GetData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecordprovider_getdata)。 |
| const [UdmfData\_Finalize](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmfdata_finalize) finalize | 可选的回调函数，可以用于统一数据提供者销毁时释放上下文数据。详见：[UdmfData\_Finalize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmfdata_finalize)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfRecord* OH_UdmfRecord_Create()
```

**描述**

创建统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfRecord\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfrecord_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* | 执行成功则返回一个指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例对象的指针，否则返回nullptr。 |

### OH\_UdmfRecord\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfRecord_Destroy(OH_UdmfRecord* pThis)
```

**描述**

销毁统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)指针指向的实例对象。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据对象[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |

### OH\_UdmfRecord\_AddGeneralEntry()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddGeneralEntry(OH_UdmfRecord* pThis, const char* typeId, unsigned char* entry, unsigned int count)
```

**描述**

添加用户自定义的通用数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。对于已定义UDS的类型（比如PlainText、Link、Pixelmap等）不可使用该接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* typeId | 表示数据类型标识，为和系统定义的类型进行区分，建议以'ApplicationDefined'开头。 |
| unsigned char\* entry | 表示用户自定义数据。 |
| unsigned int count | 表示用户自定义数据的大小。数据大小不超过4KB。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddPlainText()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddPlainText(OH_UdmfRecord* pThis, OH_UdsPlainText* plainText)
```

**描述**

增加纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)\* plainText | 表示指向纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddHyperlink()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddHyperlink(OH_UdmfRecord* pThis, OH_UdsHyperlink* hyperlink)
```

**描述**

增加超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)\* hyperlink | 表示指向超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddHtml()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddHtml(OH_UdmfRecord* pThis, OH_UdsHtml* html)
```

**描述**

增加超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)\* html | 表示指向超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddAppItem()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddAppItem(OH_UdmfRecord* pThis, OH_UdsAppItem* appItem)
```

**描述**

增加桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)\* appItem | 表示指向桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddFileUri()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddFileUri(OH_UdmfRecord* pThis, OH_UdsFileUri* fileUri)
```

**描述**

增加文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)\* fileUri | 表示指向文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddPixelMap()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddPixelMap(OH_UdmfRecord* pThis, OH_UdsPixelMap* pixelMap)
```

**描述**

增加像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)\* pixelMap | 表示指向像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddArrayBuffer()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddArrayBuffer(OH_UdmfRecord* record, const char* type, OH_UdsArrayBuffer* buffer)
```

**描述**

增加一个ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)的数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* record | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* type | 表示自定义的ArrayBuffer数据的数据类型标识，不可与已有的数据类型标识重复。 |
| [OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)\* buffer | 表示指向ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_AddContentForm()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_AddContentForm(OH_UdmfRecord* pThis, OH_UdsContentForm* contentForm)
```

**描述**

增加一个内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)的数据至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)\* contentForm | 表示指向内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_GetTypes()

PhonePC/2in1TabletTV



```
1. char** OH_UdmfRecord_GetTypes(OH_UdmfRecord* pThis, unsigned int* count)
```

**描述**

获取统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中所有类型的结果集。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| unsigned int\* count | 该参数是输出参数，结果集中的类型数量会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| char\*\* | 执行成功时返回类型列表，否则返回nullptr。 |

### OH\_UdmfRecord\_GetGeneralEntry()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetGeneralEntry(OH_UdmfRecord* pThis, const char* typeId, unsigned char** entry, unsigned int* count)
```

**描述**

获取统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中的特定类型的数据结果集。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* typeId | 表示数据类型标识。 |
| unsigned char\*\* entry | 该参数是输出参数，结果集中数据的具体信息会写入该变量。 |
| unsigned int\* count | 该参数是输出参数，结果集中的数据长度会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。 |

### OH\_UdmfRecord\_GetPlainText()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetPlainText(OH_UdmfRecord* pThis, OH_UdsPlainText* plainText)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)\* plainText | 该参数是输出参数，表示指向纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。 |

### OH\_UdmfRecord\_GetHyperlink()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetHyperlink(OH_UdmfRecord* pThis, OH_UdsHyperlink* hyperlink)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)\* hyperlink | 该参数是输出参数，表示指向超链接类型[OH\_UdsHyperlink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshyperlink)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。 |

### OH\_UdmfRecord\_GetHtml()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetHtml(OH_UdmfRecord* pThis, OH_UdsHtml* html)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)\* html | 该参数是输出参数，表示指向超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。 |

### OH\_UdmfRecord\_GetAppItem()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetAppItem(OH_UdmfRecord* pThis, OH_UdsAppItem* appItem)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)\* appItem | 该参数是输出参数，表示指向桌面图标类型[OH\_UdsAppItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsappitem)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。 |

### OH\_UdmfRecord\_SetProvider()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_SetProvider(OH_UdmfRecord* pThis, const char* const* types, unsigned int count, OH_UdmfRecordProvider* provider)
```

**描述**

将指定类型的统一数据提供者[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)设置至统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* const\* types | 表示一组指定的要提供的数据类型。 |
| unsigned int count | 表示指定的数据类型的数量。 |
| [OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)\* provider | 表示指向统一数据提供者对象[OH\_UdmfRecordProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecordprovider)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_GetFileUri()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetFileUri(OH_UdmfRecord* pThis, OH_UdsFileUri* fileUri)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)\* fileUri | 该参数是输出参数，表示指向文件Uri类型[OH\_UdsFileUri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsfileuri)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_GetPixelMap()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetPixelMap(OH_UdmfRecord* pThis, OH_UdsPixelMap* pixelMap)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)\* pixelMap | 该参数是输出参数，表示指向像素图片类型[OH\_UdsPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udspixelmap)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_GetArrayBuffer()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetArrayBuffer(OH_UdmfRecord* record, const char* type, OH_UdsArrayBuffer* buffer)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* record | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* type | 表示要获取的ArrayBuffer类型数据的数据类型标识。 |
| [OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)\* buffer | 该参数是输出参数，表示指向ArrayBuffer类型[OH\_UdsArrayBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsarraybuffer)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfRecord\_GetContentForm()

PhonePC/2in1TabletTV



```
1. int OH_UdmfRecord_GetContentForm(OH_UdmfRecord* pThis, OH_UdsContentForm* contentForm)
```

**描述**

从统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)中获取内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)数据。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* pThis | 表示指向统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| [OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)\* contentForm | 该参数是输出参数，表示指向内容卡片类型[OH\_UdsContentForm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udscontentform)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfData\_GetPrimaryPlainText()

PhonePC/2in1TabletTV



```
1. int OH_UdmfData_GetPrimaryPlainText(OH_UdmfData* data, OH_UdsPlainText* plainText)
```

**描述**

从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中获取第一个纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| [OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)\* plainText | 该参数是输出参数，表示指向纯文本类型[OH\_UdsPlainText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udsplaintext)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfData\_GetPrimaryHtml()

PhonePC/2in1TabletTV



```
1. int OH_UdmfData_GetPrimaryHtml(OH_UdmfData* data, OH_UdsHtml* html)
```

**描述**

从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中获取第一个超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| [OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)\* html | 该参数是输出参数，表示指向超文本标记语言类型[OH\_UdsHtml](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udshtml)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfData\_GetRecordCount()

PhonePC/2in1TabletTV



```
1. int OH_UdmfData_GetRecordCount(OH_UdmfData* data)
```

**描述**

获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中包含的所有记录数量。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回统一数据对象[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)的数量。 |

### OH\_UdmfData\_GetRecord()

PhonePC/2in1TabletTV



```
1. OH_UdmfRecord* OH_UdmfData_GetRecord(OH_UdmfData* data, unsigned int index)
```

**描述**

获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中指定位置的数据记录。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| unsigned int index | 表示要获取的统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)在统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)中的下标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)\* | 执行成功时返回统一数据记录[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例对象的指针，否则返回nullptr。 |

### OH\_UdmfData\_IsLocal()

PhonePC/2in1TabletTV



```
1. bool OH_UdmfData_IsLocal(OH_UdmfData* data)
```

**描述**

检查统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)是否是来自本端设备的数据。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* data | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 返回数据是否是来自本端设备。返回true表示来自本端设备，返回false表示来自远端设备。 |

### OH\_UdmfProperty\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfProperty* OH_UdmfProperty_Create(OH_UdmfData* unifiedData)
```

**描述**

创建统一数据对象中数据记录属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)指针及实例对象。当不再需要使用指针时，请使用[OH\_UdmfProperty\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfproperty_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* unifiedData | 表示指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* | 执行成功则返回一个指向属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例对象的指针，否则返回nullptr。 |

### OH\_UdmfProperty\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfProperty_Destroy(OH_UdmfProperty* pThis)
```

**描述**

销毁数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)指针指向的实例对象。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |

### OH\_UdmfProperty\_GetTag()

PhonePC/2in1TabletTV



```
1. const char* OH_UdmfProperty_GetTag(OH_UdmfProperty* pThis)
```

**描述**

从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取用户自定义标签值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const char\* | 执行成功时返回自定义标签值的字符串指针，否则返回nullptr。 |

### OH\_UdmfProperty\_GetTimestamp()

PhonePC/2in1TabletTV



```
1. int64_t OH_UdmfProperty_GetTimestamp(OH_UdmfProperty* pThis)
```

**描述**

从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取时间戳。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int64\_t | 返回时间戳值。 |

### OH\_UdmfProperty\_GetShareOption()

PhonePC/2in1TabletTV



```
1. Udmf_ShareOption OH_UdmfProperty_GetShareOption(OH_UdmfProperty* pThis)
```

**描述**

从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取设备内适用范围属性。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Udmf\_ShareOption](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption) | 返回设备内适用范围属性[Udmf\_ShareOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption)值。 |

### OH\_UdmfProperty\_GetExtrasIntParam()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProperty_GetExtrasIntParam(OH_UdmfProperty* pThis, const char* key, int defaultValue)
```

**描述**

从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取自定义的附加整型参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |
| const char\* key | 表示键值对的键。 |
| int defaultValue | 用于用户自行设置获取值失败时的默认值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 执行成功返回指定的键关联的整型值，否则返回用户设置的默认值defaultValue。 |

### OH\_UdmfProperty\_GetExtrasStringParam()

PhonePC/2in1TabletTV



```
1. const char* OH_UdmfProperty_GetExtrasStringParam(OH_UdmfProperty* pThis, const char* key)
```

**描述**

从数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)中获取自定义的附加字符串参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |
| const char\* key | 表示键值对的键。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const char\* | 执行成功时返回指定的键关联的字符串值的指针，否则返回nullptr。 |

### OH\_UdmfProperty\_SetTag()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProperty_SetTag(OH_UdmfProperty* pThis, const char* tag)
```

**描述**

设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的自定义标签值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |
| const char\* tag | 表示自定义标签值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfProperty\_SetShareOption()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProperty_SetShareOption(OH_UdmfProperty* pThis, Udmf_ShareOption option)
```

**描述**

设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的设备内适用范围[Udmf\_ShareOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption)参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)实例的指针。 |
| [Udmf\_ShareOption](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption) option | 表示设备内适用范围[Udmf\_ShareOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_shareoption)参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfProperty\_SetExtrasIntParam()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProperty_SetExtrasIntParam(OH_UdmfProperty* pThis, const char* key, int param)
```

**描述**

设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的附加整型参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* key | 表示键值对的键。 |
| int param | 表示键值对的值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfProperty\_SetExtrasStringParam()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProperty_SetExtrasStringParam(OH_UdmfProperty* pThis, const char* key, const char* param)
```

**描述**

设置数据属性[OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)的附加字符串参数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfProperty](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfproperty)\* pThis | 表示指向数据属性[OH\_UdmfRecord](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfrecord)实例的指针。 |
| const char\* key | 表示键值对的键。 |
| const char\* param | 表示键值对的值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfOptions\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfOptions* OH_UdmfOptions_Create()
```

**描述**

创建指向[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。当不再需要使用指针时，请使用[OH\_UdmfOptions\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfoptions_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 20

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* | 执行成功则返回一个指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针，否则返回nullptr。 |

### OH\_UdmfOptions\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfOptions_Destroy(OH_UdmfOptions* pThis)
```

**描述**

销毁指向[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |

### OH\_UdmfOptions\_GetKey()

PhonePC/2in1TabletTV



```
1. const char* OH_UdmfOptions_GetKey(OH_UdmfOptions* pThis)
```

**描述**

从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据的唯一标识符信息。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const char\* | 输入有效入参时返回符串指针，否则返回nullptr。 |

### OH\_UdmfOptions\_SetKey()

PhonePC/2in1TabletTV



```
1. int OH_UdmfOptions_SetKey(OH_UdmfOptions* pThis, const char* key)
```

**描述**

设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据的唯一标识符内容参数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| const char\* key | 数据的唯一标识符的新字符串值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfOptions\_GetIntention()

PhonePC/2in1TabletTV



```
1. Udmf_Intention OH_UdmfOptions_GetIntention(OH_UdmfOptions* pThis)
```

**描述**

从数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中获取数据通路信息。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Udmf\_Intention](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention) | 返回[Udmf\_Intention](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention)的值。 |

### OH\_UdmfOptions\_SetIntention()

PhonePC/2in1TabletTV



```
1. int OH_UdmfOptions_SetIntention(OH_UdmfOptions* pThis, Udmf_Intention intention)
```

**描述**

设置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例中的数据通路内容参数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [Udmf\_Intention](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention) intention | 数据通路类型参数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_UdmfOptions\_Reset()

PhonePC/2in1TabletTV



```
1. int OH_UdmfOptions_Reset(OH_UdmfOptions* pThis)
```

**描述**

重置数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例为空。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* pThis | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。 |

### OH\_Udmf\_GetUnifiedData()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_GetUnifiedData(const char* key, Udmf_Intention intention, OH_UdmfData* unifiedData)
```

**描述**

从统一数据管理框架数据库中获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* key | 表示数据库存储的唯一标识符。 |
| [Udmf\_Intention](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention) intention | 表示数据通路类型[Udmf\_Intention](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention)。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* unifiedData | 该参数是输出参数，获取到的统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)会写入该变量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_GetUnifiedDataByOptions()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_GetUnifiedDataByOptions(OH_UdmfOptions* options, OH_UdmfData** dataArray, unsigned int* dataSize)
```

**描述**

通过数据通路类型从统一数据管理框架数据库中获取统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* options | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\*\* dataArray | 该参数是输出参数，表示统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)列表。  需要使用[OH\_UDMF\_GetDataElementAt](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getdataelementat)函数通过下标访问每个元素。  此指针需要使用[OH\_Udmf\_DestroyDataArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_destroydataarray)函数释放。 |
| unsigned int\* dataSize | 该参数是输出参数，表示获取到的统一数据对象个数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_SetUnifiedData()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_SetUnifiedData(Udmf_Intention intention, OH_UdmfData* unifiedData, char* key, unsigned int keyLen)
```

**描述**

从统一数据管理框架数据库中写入统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Udmf\_Intention](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention) intention | 表示数据通路类型[Udmf\_Intention](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_intention)。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* unifiedData | 表示统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。 |
| char\* key | 表示成功将数据设置到数据库后对应数据的唯一标识符。 |
| unsigned int keyLen | 表示唯一标识符参数的空间大小，内存大小不小于512字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_SetUnifiedDataByOptions()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_SetUnifiedDataByOptions(OH_UdmfOptions* options, OH_UdmfData *unifiedData, char *key, unsigned int keyLen)
```

**描述**

从统一数据管理框架数据库中写入统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* options | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata) \*unifiedData | 指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |
| char \*key | 成功将数据设置到数据库后对应数据的唯一标识符，内存大小不小于[UDMF\_KEY\_BUFFER\_LEN](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_key_buffer_len)。 |
| unsigned int keyLen | 唯一标识符参数的空间大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_UpdateUnifiedData()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_UpdateUnifiedData(OH_UdmfOptions* options, OH_UdmfData* unifiedData)
```

**描述**

对统一数据管理框架数据库中的统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据进行数据更改。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* options | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\* unifiedData | 指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_DeleteUnifiedData()

PhonePC/2in1TabletTV



```
1. int OH_Udmf_DeleteUnifiedData(OH_UdmfOptions* options, OH_UdmfData** dataArray, unsigned int* dataSize)
```

**描述**

删除统一数据管理框架数据库中的统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数据。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)\* options | 指向数据操作选项[OH\_UdmfOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfoptions)实例的指针。 |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\*\* dataArray | 该参数是输出参数，统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)列表，需要使用[OH\_UDMF\_GetDataElementAt](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getdataelementat)函数通过下标访问每个元素。此指针需要使用[OH\_Udmf\_DestroyDataArray](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_destroydataarray)函数释放。 |
| unsigned int\* dataSize | 该参数是输出参数，表示获取到的统一数据对象个数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。请参阅错误码定义[Udmf\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-err-code-h#udmf_errcode)。  若返回UDMF\_E\_OK，表示执行成功。  若返回UDMF\_E\_INVALID\_PARAM，表示传入了无效参数。  若返回UDMF\_ERR，表示内部数据错误。可能的原因是服务故障或者内存不足等。 |

### OH\_Udmf\_DestroyDataArray()

PhonePC/2in1TabletTV



```
1. void OH_Udmf_DestroyDataArray(OH_UdmfData** dataArray, unsigned int dataSize)
```

**描述**

销毁数据数组内存。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\*\* dataArray | 指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)的指针列表。 |
| unsigned int dataSize | 列表中的数据大小。 |

**参考：**

OH\_UdmfData

### OH\_UdmfProgressInfo\_GetProgress()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProgressInfo_GetProgress(OH_Udmf_ProgressInfo* progressInfo)
```

**描述**

从进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)中获取进度百分比数据。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)\* progressInfo | 表示进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回进度百分比数据。 |

### OH\_UdmfProgressInfo\_GetStatus()

PhonePC/2in1TabletTV



```
1. int OH_UdmfProgressInfo_GetStatus(OH_Udmf_ProgressInfo* progressInfo)
```

**描述**

从进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)中获取状态信息。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)\* progressInfo | 表示进度信息[OH\_Udmf\_ProgressInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmf-progressinfo)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回状态信息。 |

### OH\_UdmfGetDataParams\_Create()

PhonePC/2in1TabletTV



```
1. OH_UdmfGetDataParams* OH_UdmfGetDataParams_Create()
```

**描述**

创建异步获取UDMF数据的请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)指针及实例对象。

当不再需要使用指针时，请使用[OH\_UdmfGetDataParams\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmfgetdataparams_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 15

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* | 执行成功则返回一个指向属性[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例对象的指针，否则返回nullptr。 |

### OH\_UdmfGetDataParams\_Destroy()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_Destroy(OH_UdmfGetDataParams* pThis)
```

**描述**

销毁异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)指针指向的实例对象。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* pThis | 表示指向异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |

### OH\_UdmfGetDataParams\_SetDestUri()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_SetDestUri(OH_UdmfGetDataParams* params, const char* destUri)
```

**描述**

设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的目标路径。

若设置了目标路径，会将文件类型的数据进行拷贝到指定路径。回调中获取到的文件类型数据会被替换为目标路径的URI。

若不设置目标路径，则不会执行拷贝文件操作。回调中获取到的文件类型数据为源端路径URI。

若应用涉及复杂文件处理策略，或需要将文件拷贝在多个路径下时，建议不设置此参数，由应用自行完成文件拷贝相关处理。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* params | 表示指向异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |
| const char\* destUri | 表示目标路径地址。 |

### OH\_UdmfGetDataParams\_SetFileConflictOptions()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_SetFileConflictOptions(OH_UdmfGetDataParams* params, const Udmf_FileConflictOptions options)
```

**描述**

设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的文件冲突选项。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* params | 表示指向异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |
| const [Udmf\_FileConflictOptions](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_fileconflictoptions) options | 表示文件拷贝冲突时的选项。 |

### OH\_UdmfGetDataParams\_SetProgressIndicator()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_SetProgressIndicator(OH_UdmfGetDataParams* params, const Udmf_ProgressIndicator progressIndicator)
```

**描述**

设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的进度条指示选项。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* params | 表示指向异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |
| const [Udmf\_ProgressIndicator](/consumer/cn/doc/harmonyos-references/capi-udmf-h#udmf_progressindicator) progressIndicator | 表示是否使用默认进度条选项。 |

### OH\_UdmfGetDataParams\_SetDataProgressListener()

PhonePC/2in1TabletTV



```
1. void OH_UdmfGetDataParams_SetDataProgressListener(OH_UdmfGetDataParams* params, const OH_Udmf_DataProgressListener dataProgressListener)
```

**描述**

设置异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)中的监听回调函数。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)\* params | 表示指向异步请求参数[OH\_UdmfGetDataParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfgetdataparams)实例的指针。 |
| const [OH\_Udmf\_DataProgressListener](/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_dataprogresslistener) dataProgressListener | 用户自定义的监听回调函数，可用于获取进度信息和数据。 |

### OH\_UDMF\_GetDataElementAt()

PhonePC/2in1TabletTV



```
1. OH_UdmfData* OH_UDMF_GetDataElementAt(OH_UdmfData** dataArray, unsigned int index)
```

**描述**

从统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)数组中获取指定下标的统一数据对象数据。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)\*\* dataArray | 指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)的指针数组。  只接受从[OH\_Udmf\_GetUnifiedDataByOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_getunifieddatabyoptions)和[OH\_Udmf\_DeleteUnifiedData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-h#oh_udmf_deleteunifieddata)接口中获得的指针数组。 |
| unsigned int index | 表示要获取到的统一数据对象的下标。请确保该值不超出数组范围，否则会出现数组越界。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_UdmfData\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata) | 执行成功则返回一个指向统一数据对象[OH\_UdmfData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-udmf-oh-udmfdata)实例对象的指针，如果输入数组为空，则返回空。 |