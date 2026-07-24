## 概述

PhonePC/2in1Tablet

线段表相关数据结构及函数定义。

**引用文件：** <FASTKit/fast\_ads\_segment\_map.h>

**库：** libfast\_ads.so

**系统能力：** SystemCapability.FAST.Core

**起始版本：** 6.0.2(22)

**相关模块：** [FAST](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast)

## 汇总

PhonePC/2in1Tablet

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [FAST\_SegmentMapQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) [FAST\_SegmentMapQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype) | 线段表支持的查询操作类型。 |
| typedef enum [FAST\_SegmentMapUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) [FAST\_SegmentMapUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype) | 线段表支持的更新操作类型。 |
| typedef struct [FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) [FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) | 线段表的不透明配置。 |
| typedef void \* [FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) | 线段表的句柄。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [FAST\_SegmentMapQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) { [FAST\_SEGMENTMAP\_QUERY\_TYPE\_SUM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 0, [FAST\_SEGMENTMAP\_QUERY\_TYPE\_MIN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 1, [FAST\_SEGMENTMAP\_QUERY\_TYPE\_MAX](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 2 } | 线段表支持的查询操作类型。 |
| [FAST\_SegmentMapUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) { [FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SET](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 0, [FAST\_SEGMENTMAP\_UPDATE\_TYPE\_ADD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 1, [FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SUB](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast) = 2 } | 线段表支持的更新操作类型。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_CreateConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_createconfig) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*\*config) | 创建线段表的不透明配置。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_DestroyConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_destroyconfig) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config) | 销毁线段表的不透明配置。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_SetQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_setquerytype) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config, [FAST\_SegmentMapQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) type) | 设置线段表不透明配置中的查询类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_SetUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_setupdatetype) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config, [FAST\_SegmentMapUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) type) | 设置线段表不透明配置中的更新类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_create) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) \*handle, size\_t size, const int32\_t \*array, [FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config) | 创建线段表。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_destroy) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle) | 销毁线段表实例，释放内存，再次调用为未定义行为。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_update) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle, size\_t left, size\_t right, int32\_t value) | 更新线段表的区间，根据配置按照赋值、加法、减法等操作更新。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Query](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_query) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle, size\_t left, size\_t right, int32\_t \*result) | 查询线段表的区间，根据配置返回最大值、最小值、求和等数据。 |