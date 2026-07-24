## 概述

PhonePC/2in1Tablet

提供FAST算法加速能力相关接口，实现应用启动、加载、响应时延等指标的优化。

**起始版本：** 6.0.2(22)

## 汇总

PhonePC/2in1Tablet

概述FAST Kit中文件、结构体、宏定义、类型定义、枚举和函数等信息。

### 文件

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [fast\_ads\_segment\_map.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-ads-segment-map-8h) | 线段表相关数据结构及函数定义。 |
| [fast\_ads\_concurrent\_hashmap.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-ads-concurrent-hashmap-8h) | 并发哈希表相关数据结构及函数定义。 |
| [fast\_common\_def.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-common-def-8h) | FAST Kit错误码等类型的公共定义。 |
| [fast\_dsp\_common.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-dsp-common-8h) | 数字信号处理（DSP）通用数据结构和工具函数定义。 |
| [fast\_solver\_rect\_partition.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast-solver-rect-partition-8h) | 矩形划分求解器相关数据结构及函数定义。 |

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) | 定义矩形的数据结构。 |
| struct [FAST\_SplitComplex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-splitcomplex) | 定义单精度浮点复数信号的数据结构（分离格式）。 |
| struct [FAST\_SplitComplexD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-splitcomplexd) | 定义双精度浮点复数信号的数据结构（分离格式）。 |
| struct [FAST\_BiquadCoefficients](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients) | 定义单精度二阶（biquad）IIR滤波器节的系数。 |
| struct [FAST\_BiquadCoefficientsD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficientsd) | 定义双精度二阶（biquad）IIR滤波器节的系数。 |
| struct [FAST\_BiquadState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadstate) | 定义单精度二阶IIR滤波器节的状态变量。 |
| struct [FAST\_BiquadStateD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadstated) | 定义双精度二阶IIR滤波器节的状态变量。 |
| struct [FAST\_Biquadm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadm) | 定义单精度多通道、多节二阶IIR滤波器组的数据结构。 |
| struct [FAST\_BiquadmD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd) | 定义双精度多通道、多节二阶IIR滤波器组的数据结构。 |

### 类型定义

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [FAST\_SegmentMapQueryType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) [FAST\_SegmentMapQueryType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype) | 线段表支持的查询操作类型。 |
| typedef enum [FAST\_SegmentMapUpdateType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) [FAST\_SegmentMapUpdateType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype) | 线段表支持的更新操作类型。 |
| typedef struct [FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) [FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) | 线段表的不透明配置（Opaque Configuration）。 |
| typedef void \* [FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) | 线段表的句柄。 |
| typedef enum [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode) | FAST Kit的错误码。 |
| typedef struct [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) [FAST\_Rect](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rect) | 定义矩形的数据结构。 |
| typedef struct [FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) [FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) | 矩形划分求解器的不透明配置。 |
| typedef struct [FAST\_SplitComplex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-splitcomplex) [FAST\_SplitComplex](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplex) | 单精度浮点复数信号结构体。 |
| typedef struct [FAST\_SplitComplexD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-splitcomplexd) [FAST\_SplitComplexD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplexd) | 双精度浮点复数信号结构体。 |
| typedef struct [FAST\_BiquadCoefficients](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficients) [FAST\_BiquadCoefficients](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadcoefficients) | 单精度二阶IIR滤波器系数。 |
| typedef struct [FAST\_BiquadCoefficientsD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadcoefficientsd) [FAST\_BiquadCoefficientsD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadcoefficientsd) | 双精度二阶IIR滤波器系数。 |
| typedef struct [FAST\_BiquadState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadstate) [FAST\_BiquadState](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadstate) | 单精度二阶IIR滤波器状态。 |
| typedef struct [FAST\_BiquadStateD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadstated) [FAST\_BiquadStateD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadstated) | 双精度二阶IIR滤波器状态。 |
| typedef struct [FAST\_Biquadm](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadm) [FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) | 单精度多通道多节IIR滤波器组。 |
| typedef struct [FAST\_BiquadmD](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-biquadmd) [FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) | 双精度多通道多节IIR滤波器组。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [FAST\_SegmentMapQueryType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) { FAST\_SEGMENTMAP\_QUERY\_TYPE\_SUM = 0, FAST\_SEGMENTMAP\_QUERY\_TYPE\_MIN = 1, FAST\_SEGMENTMAP\_QUERY\_TYPE\_MAX = 2 } | 线段表支持的查询操作类型。 |
| [FAST\_SegmentMapUpdateType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) { FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SET = 0, FAST\_SEGMENTMAP\_UPDATE\_TYPE\_ADD = 1, FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SUB = 2 } | 线段表支持的更新操作类型。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) {  FAST\_ERROR\_CODE\_SUCCESS = 1023100000, FAST\_ERROR\_CODE\_FAIL = 1023100001, FAST\_ERROR\_CODE\_ILLEGAL\_INPUT = 1023100002, FAST\_ERROR\_CODE\_INVALID\_PTR = 1023100003,  FAST\_ERROR\_CODE\_OOM = 1023199001  } | FAST Kit的错误码。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_CreateConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_createconfig) ([FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*\*config) | 创建线段表不透明配置实例。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_DestroyConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_destroyconfig) ([FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config) | 销毁线段表的不透明配置实例并释放内存。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_SetQueryType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_setquerytype) ([FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config, [FAST\_SegmentMapQueryType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1) type) | 设置线段表不透明配置中的查询类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_SetUpdateType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_setupdatetype) ([FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config, [FAST\_SegmentMapUpdateType](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1) type) | 设置线段表不透明配置中的更新类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Create](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_create) ([FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) \*handle, size\_t size, const int32\_t \*array, [FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig) \*config) | 创建线段表。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_Destroy](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_destroy) ([FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle) | 销毁线段表实例。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Update](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_update) ([FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle, size\_t left, size\_t right, int32\_t value) | 更新线段表的区间。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_SegmentMap\_Query](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_segmentmap_query) ([FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle) handle, size\_t left, size\_t right, int32\_t \*result) | 查询线段表的区间。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_RectPartition\_CreateConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_rectpartition_createconfig) ([FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) \*\*config) | 创建矩形划分求解器的不透明配置。 |
| FAST\_EXPORT void [HMS\_FAST\_RectPartition\_DestroyConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_rectpartition_destroyconfig) ([FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) \*config) | 销毁矩形划分求解器的不透明配置。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_RectPartition\_SetAlgo](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_rectpartition_setalgo) ([FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) \*config, const char \*name) | 设置矩形划分求解器使用的算法。目前仅支持扫描线算法“SweepLineAlgo”，输出数量尽可能少（不保证最优性）的不相交矩形集合，复杂度为。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_RectPartition\_Solve](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_rectpartition_solve) ([FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig) \*config, size\_t size, const [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) \*origin, [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) \*result, size\_t \*resultSize) | 在指定不透明配置下解决矩形划分问题。函数接收若干个彼此不相交的矩形作为输入，计算出覆盖相同区域的矩形划分方案，并使输出的矩形数量尽可能少。  **说明**：  1. 输入须保证矩形两两不相交（即任意两个矩形满足： 或 或或 ），否则函数返回FAST\_ERROR\_CODE\_ILLEGAL\_INPUT。  2. 函数能保证输出矩形的数量小于等于输入矩形的数量。 |
| float [HMS\_FAST\_DSP\_Maxmgv](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_maxmgv) (const float \*input, size\_t stride, size\_t length) | 计算步长实值向量中的最大幅值（单精度）。 |
| double [HMS\_FAST\_DSP\_MaxmgvD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_maxmgvd) (const double \*input, size\_t stride, size\_t length) | 计算步长实值向量中的最大幅值（双精度）。 |
| void [HMS\_FAST\_DSP\_Maxvi](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_maxvi) (const float \*input, size\_t stride, size\_t length, float \*value, size\_t \*index) | 查找步长实值向量中的最大值及其索引（单精度）。 |
| void [HMS\_FAST\_DSP\_MaxviD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_maxvid) (const double \*input, size\_t stride, size\_t length, double \*value, size\_t \*index) | 查找步长实值向量中的最大值及其索引（双精度）。 |
| float [HMS\_FAST\_DSP\_Sve](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_sve) (const float \*input, size\_t stride, size\_t length) | 计算步长实值向量的和（单精度）。 |
| double [HMS\_FAST\_DSP\_SveD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_sved) (const double \*input, size\_t stride, size\_t length) | 计算步长实值向量的和（双精度）。 |
| float [HMS\_FAST\_DSP\_Svemg](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_svemg) (const float \*input, size\_t stride, size\_t length) | 计算步长向量的绝对值之和（L1范数）（单精度）。 |
| double [HMS\_FAST\_DSP\_SvemgD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_svemgd) (const double \*input, size\_t stride, size\_t length) | 计算步长向量的绝对值之和（L1范数）（双精度）。 |
| float [HMS\_FAST\_DSP\_Meamgv](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_meamgv) (const float \*input, size\_t stride, size\_t length) | 计算步长实值向量绝对值的均值（单精度）。 |
| double [HMS\_FAST\_DSP\_MeamgvD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_meamgvd) (const double \*input, size\_t stride, size\_t length) | 计算步长实值向量绝对值的均值（双精度）。 |
| float [HMS\_FAST\_DSP\_Dotpr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_dotpr) (const float \*inputA, size\_t strideA, const float \*inputB, size\_t strideB, size\_t length) | 计算两个步长实值向量的点积（单精度）。 |
| double [HMS\_FAST\_DSP\_DotprD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_dotprd) (const double \*inputA, size\_t strideA, const double \*inputB, size\_t strideB, size\_t length) | 计算两个步长实值向量的点积（双精度）。 |
| void [HMS\_FAST\_DSP\_Vsbsm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_vsbsm) (const float \*inputA, size\_t strideA, const float \*inputB, size\_t strideB, float scalar, float \*outputC, size\_t strideC, size\_t length) | 执行向量减法：outputC[i] = (inputA[i] - inputB[i]) \* scalar（单精度）。 |
| void [HMS\_FAST\_DSP\_VsbsmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_vsbsmd) (const double \*inputA, size\_t strideA, const double \*inputB, size\_t strideB, double scalar, double \*outputC, size\_t strideC, size\_t length) | 执行向量减法：outputC[i] = (inputA[i] - inputB[i]) \* scalar（双精度）。 |
| void [HMS\_FAST\_DSP\_Ctoz](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_ctoz) (const float \*input, size\_t strideInput, [FAST\_SplitComplex](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplex) \*output, size\_t strideOutput, size\_t length) | 将交错复数数组转换为分离格式（单精度）。 |
| void [HMS\_FAST\_DSP\_CtozD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_ctozd) (const double \*input, size\_t strideInput, [FAST\_SplitComplexD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplexd) \*output, size\_t strideOutput, size\_t length) | 将交错复数数组转换为分离格式（双精度）。 |
| void [HMS\_FAST\_DSP\_Ztoc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_ztoc) (const [FAST\_SplitComplex](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplex) \*input, size\_t strideInput, float \*output, size\_t strideOutput, size\_t length) | 将分离复数数组转换为交错格式（单精度）。 |
| void [HMS\_FAST\_DSP\_ZtocD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_dsp_ztocd) (const [FAST\_SplitComplexD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_splitcomplexd) \*input, size\_t strideInput, double \*output, size\_t strideOutput, size\_t length) | 将分离复数数组转换为交错格式（双精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetActiveFilters](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setactivefilters) ([FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*filter, const uint8\_t \*activeMask) | 设置二阶滤波器节的激活掩码（单精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetActiveFiltersD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setactivefiltersd) ([FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*filter, const uint8\_t \*activeMask) | 设置二阶滤波器节的激活掩码（双精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetCoeffSingle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setcoeffsingle) ([FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*filter, const float \*coeff, size\_t stride) | 从单精度源数组设置所有二阶滤波器系数（单精度滤波器）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetCoeffDouble](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setcoeffdouble) ([FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*filter, const double \*coeff, size\_t stride) | 从双精度源数组设置所有二阶滤波器系数（单精度滤波器）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetCoeffSingleD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setcoeffsingled) ([FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*filter, const float \*coeff, size\_t stride) | 从单精度源数组设置所有二阶滤波器系数（双精度滤波器）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_SetCoeffDoubleD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_setcoeffdoubled) ([FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*filter, const double \*coeff, size\_t stride) | 从双精度源数组设置所有二阶滤波器系数（双精度滤波器）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_Create](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_create) (size\_t numChannels, size\_t numSections, size\_t maxFrames, [FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*\*filter) | 创建并初始化多通道多节二阶IIR滤波器组（单精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm\_CreateD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_created) (size\_t numChannels, size\_t numSections, size\_t maxFrames, [FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*\*filter) | 创建并初始化多通道多节二阶IIR滤波器组（双精度）。 |
| void [HMS\_FAST\_Biquadm\_Destroy](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_destroy) ([FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*filter) | 销毁二阶滤波器实例（单精度）。 |
| void [HMS\_FAST\_Biquadm\_DestroyD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm_destroyd) ([FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*filter) | 销毁二阶滤波器实例（双精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadm) ([FAST\_Biquadm](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadm) \*filter, const float \*\*input, const size\_t strideInput, float \*\*output, const size\_t strideOutput, size\_t length) | 通过二阶滤波器组处理多通道音频（单精度）。 |
| [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_biquadmd) ([FAST\_BiquadmD](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_biquadmd) \*filter, const double \*\*input, const size\_t strideInput, double \*\*output, const size\_t strideOutput, size\_t length) | 通过二阶滤波器组处理多通道音频（双精度）。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_ConcurrentHashmap\_Create](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_create) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, [HMS\_FAST\_ConcurrentHashmap\_HashFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_hashfunc) hasher, [HMS\_FAST\_ConcurrentHashmap\_KeyEqualFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_keyequalfunc) equaler, float maxLoadFac, size\_t numShards) | 使用给定配置创建并发哈希表。 |
| FAST\_EXPORT void [HMS\_FAST\_ConcurrentHashmap\_Destroy](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_destroy) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle) | 销毁指定并发哈希表。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_ConcurrentHashmap\_Insert](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_insert) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, const [FAST\_ConcurrentHashmapKeyPtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapkeyptr) key, const [FAST\_ConcurrentHashmapValuePtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapvalueptr) value, [FAST\_ConcurrentHashmapValuePtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapvalueptr)\* originValue) | 将给定的键值对插入并发哈希表中，如果键已经存在，则使用value覆写原有的值，并将对应值的地址保存在originValue中。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_ConcurrentHashmap\_Find](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_find) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, const [FAST\_ConcurrentHashmapKeyPtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapkeyptr) key, [FAST\_ConcurrentHashmapValuePtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapvalueptr)\* value) | 在给定并发哈希表中查找输入的键，并将对应的值保存在value中。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_ConcurrentHashmap\_Erase](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_erase) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, const [FAST\_ConcurrentHashmapKeyPtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapkeyptr) key, [FAST\_ConcurrentHashmapKeyPtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapkeyptr)\* originKey, [FAST\_ConcurrentHashmapValuePtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapvalueptr)\* originValue) | 在给定哈希表中删除输入的键，并将键和值分别保存在originKey和originValue中。 |
| FAST\_EXPORT [FAST\_ErrorCode](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1) [HMS\_FAST\_ConcurrentHashmap\_TryInsert](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_tryinsert) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, const [FAST\_ConcurrentHashmapKeyPtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapkeyptr) key, const [FAST\_ConcurrentHashmapValuePtr](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmapvalueptr) value) | 将给定的键值对插入并发哈希表中，如果键已经存在，则不执行任何操作。 |
| FAST\_EXPORT size\_t [HMS\_FAST\_ConcurrentHashmap\_Size](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_size) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle) | 返回给定哈希表当前的元素个数。 |
| FAST\_EXPORT void [HMS\_FAST\_ConcurrentHashmap\_Clear](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_clear) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle) | 清空给定哈希表中维护的所有元素。 |
| FAST\_EXPORT size\_t [HMS\_FAST\_ConcurrentHashmap\_EraseIf](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_eraseif) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, [HMS\_FAST\_ConcurrentHashmap\_HookFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_hookfunc) condFunc, void\* condCtx, [HMS\_FAST\_ConcurrentHashmap\_HookFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_hookfunc) freeFunc, void\* freeCtx) | 删除哈希表中符合开发者定义条件的所有元素，并使用开发者定义的方式释放其内存。 |
| FAST\_EXPORT void [HMS\_FAST\_ConcurrentHashmap\_Traverse](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_traverse) ([FAST\_ConcurrentHashmap](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_concurrenthashmaphandle)\* handle, [HMS\_FAST\_ConcurrentHashmap\_HookFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_hookfunc) condFunc, void\* condCtx, [HMS\_FAST\_ConcurrentHashmap\_HookFunc](/consumer/cn/doc/harmonyos-references/fast-kit-fast#hms_fast_concurrenthashmap_hookfunc) workFunc, void\* workCtx) | 遍历哈希表，将所有符合开发者输入条件的键值对按开发者给定的方式修改。 |

## 类型定义说明

PhonePC/2in1Tablet

### FAST\_ErrorCode

PhonePC/2in1Tablet



```
1. typedef enum FAST_ErrorCode FAST_ErrorCode
```

**描述**

FAST Kit的错误码。

**起始版本：** 6.0.2(22)

### FAST\_Rect

PhonePC/2in1Tablet



```
1. typedef struct FAST_Rect FAST_Rect
```

**描述**

定义矩形的数据结构。

**起始版本：** 6.0.2(22)

### FAST\_RectPartitionConfig

PhonePC/2in1Tablet



```
1. typedef struct FAST_RectPartitionConfig FAST_RectPartitionConfig
```

**描述**

矩形划分求解器的不透明配置（Opaque Configuration），如果未在配置中设置算法，默认的算法是扫描线算法“SweepLineAlgo”。

**起始版本：** 6.0.2(22)

### FAST\_SegmentMapConfig

PhonePC/2in1Tablet



```
1. typedef struct FAST_SegmentMapConfig FAST_SegmentMapConfig
```

**描述**

线段表的不透明配置（Opaque Configuration）。

**起始版本：** 6.0.2(22)

### FAST\_SegmentMapHandle

PhonePC/2in1Tablet



```
1. typedef void* FAST_SegmentMapHandle
```

**描述**

线段表的句柄。

**起始版本：** 6.0.2(22)

### FAST\_SegmentMapQueryType

PhonePC/2in1Tablet



```
1. typedef enum FAST_SegmentMapQueryType FAST_SegmentMapQueryType
```

**描述**

线段表数据结构支持的区间查询操作类型。

**起始版本：** 6.0.2(22)

### FAST\_SegmentMapUpdateType

PhonePC/2in1Tablet



```
1. typedef enum FAST_SegmentMapUpdateType FAST_SegmentMapUpdateType
```

**描述**

线段表数据结构支持的区间更新操作类型。

**起始版本：** 6.0.2(22)

### FAST\_ConcurrentHashmapHandle

PhonePC/2in1Tablet



```
1. typedef void* FAST_ConcurrentHashmapHandle
```

**描述**

并发哈希表的句柄。

**起始版本：** 6.1.1(24)

### FAST\_ConcurrentHashmapKeyPtr

PhonePC/2in1Tablet



```
1. typedef void* FAST_ConcurrentHashmapKeyPtr
```

**描述**

并发哈希表的键指针。

**起始版本：** 6.1.1(24)

### FAST\_ConcurrentHashmapValuePtr

PhonePC/2in1Tablet



```
1. typedef void* FAST_ConcurrentHashmapValuePtr
```

**描述**

并发哈希表的值指针。

**起始版本：** 6.1.1(24)

### HMS\_FAST\_ConcurrentHashmap\_HashFunc

PhonePC/2in1Tablet



```
1. typedef uint64_t (*HMS_FAST_ConcurrentHashmap_HashFunc)(const FAST_ConcurrentHashmapKeyPtr key)
```

**描述**

并发哈希表的哈希值计算回调函数类型。

**起始版本：** 6.1.1(24)

### HMS\_FAST\_ConcurrentHashmap\_KeyEqualFunc

PhonePC/2in1Tablet



```
1. typedef int32_t (*HMS_FAST_ConcurrentHashmap_KeyEqualFunc)(
2. const FAST_ConcurrentHashmapKeyPtr leftKey,
3. const FAST_ConcurrentHashmapKeyPtr rightKey
4. )
```

**描述**

并发哈希表的键比较回调函数类型。

**起始版本：** 6.1.1(24)

### HMS\_FAST\_ConcurrentHashmap\_HookFunc

PhonePC/2in1Tablet



```
1. typedef int32_t (*HMS_FAST_ConcurrentHashmap_HookFunc)(
2. const FAST_ConcurrentHashmapKeyPtr key,
3. FAST_ConcurrentHashmapValuePtr value,
4. void* context
5. )
```

**描述**

并发哈希表的通用回调函数形式。

**起始版本：** 6.1.1(24)

### FAST\_SplitComplex

PhonePC/2in1Tablet



```
1. typedef struct FAST_SplitComplex FAST_SplitComplex
```

**描述**

定义单精度浮点复数信号的数据结构（分离格式：实部和虚部分开存储）。

**起始版本：** 6.1.1(24)

### FAST\_SplitComplexD

PhonePC/2in1Tablet



```
1. typedef struct FAST_SplitComplexD FAST_SplitComplexD
```

**描述**

定义双精度浮点复数信号的数据结构（分离格式：实部和虚部分开存储）。

**起始版本：** 6.1.1(24)

### FAST\_BiquadCoefficients

PhonePC/2in1Tablet



```
1. typedef struct FAST_BiquadCoefficients FAST_BiquadCoefficients
```

**描述**

定义单精度二阶（biquad）IIR滤波器节的系数（直接I型或II型）。传递函数：H(z) = (b0 + b1z⁻¹ + b2z⁻²) / (1 + a1z⁻¹ + a2z⁻²)。分母中的1实际上为系数a0归一化后的结果。

**起始版本：** 6.1.1(24)

### FAST\_BiquadCoefficientsD

PhonePC/2in1Tablet



```
1. typedef struct FAST_BiquadCoefficientsD FAST_BiquadCoefficientsD
```

**描述**

定义双精度二阶（biquad）IIR滤波器节的系数（直接I型或II型）。传递函数：H(z) = (b0 + b1z⁻¹ + b2z⁻²) / (1 + a1z⁻¹ + a2z⁻²)。分母中的1实际上为系数a0归一化后的结果。

**起始版本：** 6.1.1(24)

### FAST\_BiquadState

PhonePC/2in1Tablet



```
1. typedef struct FAST_BiquadState FAST_BiquadState
```

**描述**

定义单精度二阶IIR滤波器节的状态变量。

**起始版本：** 6.1.1(24)

### FAST\_BiquadStateD

PhonePC/2in1Tablet



```
1. typedef struct FAST_BiquadStateD FAST_BiquadStateD
```

**描述**

定义双精度二阶IIR滤波器节的状态变量。

**起始版本：** 6.1.1(24)

### FAST\_Biquadm

PhonePC/2in1Tablet



```
1. typedef struct FAST_Biquadm FAST_Biquadm
```

**描述**

定义单精度多通道、多节二阶IIR滤波器组的数据结构。

**起始版本：** 6.1.1(24)

### FAST\_BiquadmD

PhonePC/2in1Tablet



```
1. typedef struct FAST_BiquadmD FAST_BiquadmD
```

**描述**

定义双精度多通道、多节二阶IIR滤波器组的数据结构。

**起始版本：** 6.1.1(24)

## 枚举类型说明

PhonePC/2in1Tablet

### FAST\_ErrorCode

PhonePC/2in1Tablet



```
1. enum FAST_ErrorCode
```

**描述**

FAST Kit的错误码。

**起始版本：** 6.0.2(22)

展开

| 枚举值 | 描述 |
| --- | --- |
| FAST\_ERROR\_CODE\_SUCCESS = 1023100000 | 成功。 |
| FAST\_ERROR\_CODE\_FAIL = 1023100001 | 失败。 |
| FAST\_ERROR\_CODE\_ILLEGAL\_INPUT = 1023100002 | 非法输入。 |
| FAST\_ERROR\_CODE\_INVALID\_PTR = 1023100003 | 无效指针（例如 NULL）。 |
| FAST\_ERROR\_CODE\_KEY\_EXISTS = 1023110000 | 键已存在。  **起始版本**：6.1.1(24) |
| FAST\_ERROR\_CODE\_KEY\_NOT\_EXISTS = 1023110001 | 键不存在。  **起始版本**：6.1.1(24) |
| FAST\_ERROR\_CODE\_OOM = 1023199001 | 内存溢出。 |

### FAST\_SegmentMapQueryType

PhonePC/2in1Tablet



```
1. enum FAST_SegmentMapQueryType
```

**描述**

线段表支持的查询操作类型。

该枚举定义了线段表数据结构能够处理的各种区间查询操作。

**起始版本：** 6.0.2(22)

展开

| 枚举值 | 描述 |
| --- | --- |
| FAST\_SEGMENTMAP\_QUERY\_TYPE\_SUM | 区间求和查询。 |
| FAST\_SEGMENTMAP\_QUERY\_TYPE\_MIN | 区间最小值查询。 |
| FAST\_SEGMENTMAP\_QUERY\_TYPE\_MAX | 区间最大值查询。 |

### FAST\_SegmentMapUpdateType

PhonePC/2in1Tablet



```
1. enum FAST_SegmentMapUpdateType
```

**描述**

线段表支持的更新操作类型。

该枚举定义了线段表数据结构能够处理的各种区间更新操作。

**起始版本：** 6.0.2(22)

展开

| 枚举值 | 描述 |
| --- | --- |
| FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SET | 赋值更新，区间内的每一个元素赋同一个值。 |
| FAST\_SEGMENTMAP\_UPDATE\_TYPE\_ADD | 加法更新，区间内的每一个元素加同一个值。 |
| FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SUB | 减法更新，区间内的每一个元素减同一个值。 |

## 函数说明

PhonePC/2in1Tablet

### HMS\_FAST\_RectPartition\_CreateConfig()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_RectPartition_CreateConfig (FAST_RectPartitionConfig ** config)
```

**描述**

创建矩形划分求解器的不透明配置。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 指向矩形划分求解器不透明配置[FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig)的指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_RectPartition\_DestroyConfig()

PhonePC/2in1Tablet



```
1. FAST_EXPORT void HMS_FAST_RectPartition_DestroyConfig (FAST_RectPartitionConfig * config)
```

**描述**

销毁矩形划分求解器的不透明配置，并释放内存，再次访问该不透明配置时为未定义行为。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 待销毁的矩形划分求解器的不透明配置[FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig)。 |

### HMS\_FAST\_RectPartition\_SetAlgo()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_RectPartition_SetAlgo (FAST_RectPartitionConfig * config, const char * name )
```

**描述**

设置矩形划分求解器使用的算法。目前仅支持扫描线算法“SweepLineAlgo”，输出数量尽可能少（不保证最优性）的不相交矩形集合，复杂度为O(N logN)。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 待设置的矩形划分求解器的不透明配置[FAST\_RectPartitionConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_rectpartitionconfig)。 |
| name | 矩形求解器使用的算法名称。目前仅支持扫描线算法“SweepLineAlgo”，输出数量尽可能少（不保证最优性）的不相交矩形集合，复杂度为。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config或name为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当算法不支持时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_RectPartition\_Solve()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_RectPartition_Solve (FAST_RectPartitionConfig * config, size_t size, const FAST_Rect * origin, FAST_Rect * result, size_t * resultSize )
```

**描述**

在指定不透明配置下求解矩形划分问题。在调用函数之前需要先初始化参数中的结果数组result。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 矩形划分求解器的不透明配置。如果参数config中未设置算法，默认的算法是扫描线算法“SweepLineAlgo”。 |
| size | 待划分的矩形[FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect)数量。 |
| origin | 待划分的矩形[FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect)源数组。 |
| result | 由矩形划分求解器得到的[FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect)结果，在调用函数之前需要初始化该结果数组，大小需要和源数组相等，否则可能导致溢出。 |
| resultSize | 划分之后的[FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect)数量。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当入参指针为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当输入非法时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)，如矩形存在相交。

当算法求解失败时，返回[FAST\_ERROR\_CODE\_FAIL](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

**注解：**

1. 当选择“SweepLineAlgo”时，不应该返回[FAST\_ERROR\_CODE\_FAIL](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)，此处仅作为预防性设置。

### HMS\_FAST\_SegmentMap\_Create()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_Create (FAST_SegmentMapHandle * handle, size_t size, const int32_t * array, FAST_SegmentMapConfig * config )
```

**描述**

创建线段表。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 指向线段表句柄[FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle)的指针。 |
| size | 底层数组的大小（元素数量）。 |
| array | 可选；用于初始化线段表的底层数组。如果为NULL，则线段表中的元素均初始化为0，否则数组大小必须与参数size保持一致。 |
| config | 线段表的不透明配置[FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig)，若该参数为NULL或未配置，默认查询类型为[FAST\_SEGMENTMAP\_QUERY\_TYPE\_SUM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapquerytype-1)、更新类型为[FAST\_SEGMENTMAP\_UPDATE\_TYPE\_SET](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapupdatetype-1)。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config或handle为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_SegmentMap\_CreateConfig()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_CreateConfig (FAST_SegmentMapConfig ** config)
```

**描述**

创建线段表的不透明配置。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 指向线段表不透明配置[FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig)的指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_SegmentMap\_Destroy()

PhonePC/2in1Tablet



```
1. FAST_EXPORT void HMS_FAST_SegmentMap_Destroy (FAST_SegmentMapHandle handle)
```

**描述**

销毁线段表实例。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 待销毁线段表句柄[FAST\_SegmentMapHandle](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmaphandle)。 |

### HMS\_FAST\_SegmentMap\_DestroyConfig()

PhonePC/2in1Tablet



```
1. FAST_EXPORT void HMS_FAST_SegmentMap_DestroyConfig (FAST_SegmentMapConfig * config)
```

**描述**

销毁线段表的不透明配置。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 待销毁线段表不透明配置[FAST\_SegmentMapConfig](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_segmentmapconfig)。 |

### HMS\_FAST\_SegmentMap\_Query()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_Query (FAST_SegmentMapHandle handle, size_t left, size_t right, int32_t * result )
```

**描述**

查询线段表的区间。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 线段表句柄。 |
| left | 区间左端点 （包含），区间左闭右开。 |
| right | 区间右端点 （不包含），区间左闭右开。 |
| result | 根据区间查询的结果。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当输入非法时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)，如左端点大于等于右端点。

### HMS\_FAST\_SegmentMap\_SetQueryType()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_SetQueryType (FAST_SegmentMapConfig * config, FAST_SegmentMapQueryType type )
```

**描述**

设置线段表不透明配置中的查询类型。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 待修改的线段表不透明配置。 |
| type | 查询类型。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_SegmentMap\_SetUpdateType()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_SetUpdateType (FAST_SegmentMapConfig * config, FAST_SegmentMapUpdateType type )
```

**描述**

设置线段表不透明配置中的更新类型。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| config | 待修改的线段表不透明配置。 |
| type | 更新类型。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当config为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_SegmentMap\_Update()

PhonePC/2in1Tablet



```
1. FAST_EXPORT FAST_ErrorCode HMS_FAST_SegmentMap_Update (FAST_SegmentMapHandle handle, size_t left, size_t right, int32_t value )
```

**描述**

更新线段表的区间。

**起始版本：** 6.0.2(22)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 线段表句柄。 |
| left | 区间左端点 （包含），区间为左闭右开。 |
| right | 区间右端点 （不包含），区间为左闭右开。 |
| value | 待更新的值。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当输入非法时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)，如左端点大于等于右端点。

### HMS\_FAST\_Biquadm\_Create()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_Create (size_t numChannels, size_t numSections, size_t maxFrames, FAST_Biquadm ** filter)
```

**描述**

创建并初始化多通道多节二阶IIR滤波器组（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| numChannels | 信号通道数，必须大于0。 |
| numSections | 每通道级联的 biquad 节数，必须大于0。 |
| maxFrames | 单次处理的最大采样数（每通道），必须大于0。 |
| filter | 指向将接收新创建滤波器地址的变量指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当numChannels、numSections或maxFrames为0时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽分配失败时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_CreateD()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_CreateD (size_t numChannels, size_t numSections, size_t maxFrames, FAST_BiquadmD ** filter)
```

**描述**

创建并初始化多通道多节二阶IIR滤波器组（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| numChannels | 信号通道数，必须大于0。 |
| numSections | 每通道级联的 biquad 节数，必须大于0。 |
| maxFrames | 单次处理的最大采样数（每通道），必须大于0。 |
| filter | 指向将接收新创建滤波器地址的变量指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当numChannels、numSections或maxFrames为0时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽分配失败时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_Destroy()

PhonePC/2in1Tablet



```
1. void HMS_FAST_Biquadm_Destroy (FAST_Biquadm * filter)
```

**描述**

销毁二阶滤波器实例（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 待销毁的二阶滤波器实例。 |

### HMS\_FAST\_Biquadm\_DestroyD()

PhonePC/2in1Tablet



```
1. void HMS_FAST_Biquadm_DestroyD (FAST_BiquadmD * filter)
```

**描述**

销毁二阶滤波器实例（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 待销毁的二阶滤波器实例。 |

### HMS\_FAST\_Biquadm\_SetCoeffSingle()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetCoeffSingle (FAST_Biquadm * filter, const float * coeff, size_t stride)
```

**描述**

从单精度源数组设置所有二阶滤波器系数（单精度滤波器）。系数按每节[b0, b1, b2, a1, a2]的顺序排列。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| coeff | 源系数数组。 |
| stride | 源数组中节与节之间的步长（以节为单位）。值为1表示连续存储。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或coeff为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_SetCoeffDouble()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetCoeffDouble (FAST_Biquadm * filter, const double * coeff, size_t stride)
```

**描述**

从双精度源数组设置所有二阶滤波器系数（单精度滤波器）。系数按每节[b0, b1, b2, a1, a2]的顺序排列。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| coeff | 源系数数组。 |
| stride | 源数组中节与节之间的步长（以节为单位）。值为1表示连续存储。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或coeff为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_SetCoeffSingleD()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetCoeffSingleD (FAST_BiquadmD * filter, const float * coeff, size_t stride)
```

**描述**

从单精度源数组设置所有二阶滤波器系数（双精度滤波器）。系数按每节[b0, b1, b2, a1, a2]的顺序排列。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| coeff | 源系数数组。 |
| stride | 源数组中节与节之间的步长（以节为单位）。值为1表示连续存储。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或coeff为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_SetCoeffDoubleD()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetCoeffDoubleD (FAST_BiquadmD * filter, const double * coeff, size_t stride)
```

**描述**

从双精度源数组设置所有二阶滤波器系数（双精度滤波器）。系数按每节[b0, b1, b2, a1, a2]的顺序排列。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| coeff | 源系数数组。 |
| stride | 源数组中节与节之间的步长（以节为单位）。值为1表示连续存储。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或coeff为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_SetActiveFilters()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetActiveFilters (FAST_Biquadm * filter, const uint8_t * activeMask)
```

**描述**

设置二阶滤波器节的激活掩码（单精度）。掩码顺序为：[ch0\_sec0, ch0\_sec1, ch0\_sec2, ..., ch1\_sec0, ch1\_sec1, ch1\_sec2, ...]。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| activeMask | 布尔数组（大小为 filter->numSections）；非零表示激活。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或activeMask为NULL，或filter的activeFilters为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm\_SetActiveFiltersD()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm_SetActiveFiltersD (FAST_BiquadmD * filter, const uint8_t * activeMask)
```

**描述**

设置二阶滤波器节的激活掩码（双精度）。掩码顺序为：[ch0\_sec0, ch0\_sec1, ch0\_sec2, ..., ch1\_sec0, ch1\_sec1, ch1\_sec2, ...]。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 指向已初始化的二阶滤波器组的指针。 |
| activeMask | 布尔数组（大小为 filter->numSections）；非零表示激活。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter或activeMask为NULL，或filter的activeFilters为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_Biquadm()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_Biquadm (FAST_Biquadm * filter, const float ** input, const size_t strideInput, float ** output, const size_t strideOutput, size_t length)
```

**描述**

通过二阶滤波器组处理多通道音频（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 已初始化的滤波器组。 |
| input | 输入通道指针数组（大小为 filter->numChannels）。 |
| strideInput | 每个输入通道内的步长。值为1表示连续存储。 |
| output | 输出通道指针数组（大小为 filter->numChannels）。 |
| strideOutput | 每个输出通道内的步长。值为1表示连续存储。 |
| length | 要处理的帧数（必须 ≤ filter->maxFrames）。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter、coeff或output为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化或length超出范围时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_BiquadmD()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_BiquadmD (FAST_BiquadmD * filter, const double ** input, const size_t strideInput, double ** output, const size_t strideOutput, size_t length)
```

**描述**

通过二阶滤波器组处理多通道音频（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| filter | 已初始化的滤波器组。 |
| input | 输入通道指针数组（大小为 filter->numChannels）。 |
| strideInput | 每个输入通道内的步长。值为1表示连续存储。 |
| output | 输出通道指针数组（大小为 filter->numChannels）。 |
| strideOutput | 每个输出通道内的步长。值为1表示连续存储。 |
| length | 要处理的帧数（必须 ≤ filter->maxFrames）。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter、coeff或output为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当filter未初始化或length超出范围时，返回[FAST\_ERROR\_CODE\_ILLEGAL\_INPUT](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_DSP\_Maxmgv()

PhonePC/2in1Tablet



```
1. float HMS_FAST_DSP_Maxmgv (const float * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量中的最大幅值（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 要处理的样本数。 |

**返回：**

向量中的最大绝对值。如果length为0，则返回0.0f。

### HMS\_FAST\_DSP\_MaxmgvD()

PhonePC/2in1Tablet



```
1. double HMS_FAST_DSP_MaxmgvD (const double * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量中的最大幅值（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 要处理的样本数。 |

**返回：**

向量中的最大绝对值。如果length为0，则返回0.0。

### HMS\_FAST\_DSP\_Maxvi()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_Maxvi (const float * input, size_t stride, size_t length, float * value, size_t * index)
```

**描述**

查找步长实值向量中的最大值及其索引（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |
| value | 用于存储最大值的指针。如果length为0，则返回-FLT\_MAX。 |
| index | 具有最大值的样本的索引（从0开始）。如果length为0，则返回0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_MaxviD()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_MaxviD (const double * input, size_t stride, size_t length, double * value, size_t * index)
```

**描述**

查找步长实值向量中的最大值及其索引（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |
| value | 用于存储最大值的指针。如果length为0，则返回-DBL\_MAX。 |
| index | 具有最大值的样本的索引（从0开始）。如果length为0，则返回0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_Sve()

PhonePC/2in1Tablet



```
1. float HMS_FAST_DSP_Sve (const float * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量的和（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

input[i]的和。如果length为0，则返回0.0f。

### HMS\_FAST\_DSP\_SveD()

PhonePC/2in1Tablet



```
1. double HMS_FAST_DSP_SveD (const double * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量的和（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

input[i]的和。如果length为0，则返回0.0。

### HMS\_FAST\_DSP\_Svemg()

PhonePC/2in1Tablet



```
1. float HMS_FAST_DSP_Svemg (const float * input, size_t stride, size_t length)
```

**描述**

计算步长向量的绝对值之和（L1范数）（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

输入向量内所有元素的绝对值的和。如果length为0，则返回0.0f。

### HMS\_FAST\_DSP\_SvemgD()

PhonePC/2in1Tablet



```
1. double HMS_FAST_DSP_SvemgD (const double * input, size_t stride, size_t length)
```

**描述**

计算步长向量的绝对值之和（L1范数）（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

输入向量内所有元素的绝对值的和。如果length为0，则返回0.0。

### HMS\_FAST\_DSP\_Meamgv()

PhonePC/2in1Tablet



```
1. float HMS_FAST_DSP_Meamgv (const float * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量绝对值的均值（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

|input[i]|的均值。如果length为0，则返回0.0f。

### HMS\_FAST\_DSP\_MeamgvD()

PhonePC/2in1Tablet



```
1. double HMS_FAST_DSP_MeamgvD (const double * input, size_t stride, size_t length)
```

**描述**

计算步长实值向量绝对值的均值（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 输入向量指针。 |
| stride | 连续样本之间的距离。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

|input[i]|的均值。如果length为0，则返回0.0。

### HMS\_FAST\_DSP\_Dotpr()

PhonePC/2in1Tablet



```
1. float HMS_FAST_DSP_Dotpr (const float * inputA, size_t strideA, const float * inputB, size_t strideB, size_t length)
```

**描述**

计算两个步长实值向量的点积（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| inputA | 第一个输入向量。 |
| strideA | 第一个向量的步长。值为1表示连续存储。 |
| inputB | 第二个输入向量。 |
| strideB | 第二个向量的步长。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

点积：sum(inputA[i] \* inputB[i])。如果length为0，则返回0.0f。

### HMS\_FAST\_DSP\_DotprD()

PhonePC/2in1Tablet



```
1. double HMS_FAST_DSP_DotprD (const double * inputA, size_t strideA, const double * inputB, size_t strideB, size_t length)
```

**描述**

计算两个步长实值向量的点积（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| inputA | 第一个输入向量。 |
| strideA | 第一个向量的步长。值为1表示连续存储。 |
| inputB | 第二个输入向量。 |
| strideB | 第二个向量的步长。值为1表示连续存储。 |
| length | 样本数。 |

**返回：**

点积：sum(inputA[i] \* inputB[i])。如果length为0，则返回0.0。

### HMS\_FAST\_DSP\_Vsbsm()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_Vsbsm (const float * inputA, size_t strideA, const float * inputB, size_t strideB, float scalar, float * outputC, size_t strideC, size_t length)
```

**描述**

执行向量减法：outputC[i] = (inputA[i] - inputB[i]) \* scalar（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| inputA | 第一个输入向量。 |
| strideA | 第一个向量的步长。值为1表示连续存储。 |
| inputB | 第二个输入向量。 |
| strideB | 第二个向量的步长。值为1表示连续存储。 |
| scalar | 用于计算的标量。 |
| outputC | 输出向量（调用者分配）。 |
| strideC | 输出向量的步长。值为1表示连续存储。 |
| length | 样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_VsbsmD()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_VsbsmD (const double * inputA, size_t strideA, const double * inputB, size_t strideB, double scalar, double * outputC, size_t strideC, size_t length)
```

**描述**

执行向量减法：outputC[i] = (inputA[i] - inputB[i]) \* scalar（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| inputA | 第一个输入向量。 |
| strideA | 第一个向量的步长。值为1表示连续存储。 |
| inputB | 第二个输入向量。 |
| strideB | 第二个向量的步长。值为1表示连续存储。 |
| scalar | 用于计算的标量。 |
| outputC | 输出向量（调用者分配）。 |
| strideC | 输出向量的步长。值为1表示连续存储。 |
| length | 样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_Ctoz()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_Ctoz (const float * input, size_t strideInput, FAST_SplitComplex * output, size_t strideOutput, size_t length)
```

**描述**

将交错复数数组（real, imag, real, imag, ...）转换为分离格式（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 交错复数输入（长度为复数数量的2倍）。 |
| strideInput | 复数样本之间的步长。值为1表示连续存储。 |
| output | 分离复数输出结构体。 |
| strideOutput | 输出数组中实部/虚部样本之间的步长。值为1表示连续存储。 |
| length | 要转换的复数样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_CtozD()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_CtozD (const double * input, size_t strideInput, FAST_SplitComplexD * output, size_t strideOutput, size_t length)
```

**描述**

将交错复数数组（real, imag, real, imag, ...）转换为分离格式（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 交错复数输入（长度为复数数量的2倍）。 |
| strideInput | 复数样本之间的步长。值为1表示连续存储。 |
| output | 分离复数输出结构体。 |
| strideOutput | 输出数组中实部/虚部样本之间的步长。值为1表示连续存储。 |
| length | 要转换的复数样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_Ztoc()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_Ztoc (const FAST_SplitComplex * input, size_t strideInput, float * output, size_t strideOutput, size_t length)
```

**描述**

将分离复数数组转换为交错格式（单精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 分离复数输入结构体。 |
| strideInput | 实部/虚部数组中样本之间的步长。值为1表示连续存储。 |
| output | 交错输出数组（长度为复数数量的2倍）。 |
| strideOutput | 输出中复数样本之间的步长。值为1表示连续存储。 |
| length | 要转换的复数样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_DSP\_ZtocD()

PhonePC/2in1Tablet



```
1. void HMS_FAST_DSP_ZtocD (const FAST_SplitComplexD * input, size_t strideInput, double * output, size_t strideOutput, size_t length)
```

**描述**

将分离复数数组转换为交错格式（双精度）。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| input | 分离复数输入结构体。 |
| strideInput | 实部/虚部数组中样本之间的步长。值为1表示连续存储。 |
| output | 交错输出数组（长度为复数数量的2倍）。 |
| strideOutput | 输出中复数样本之间的步长。值为1表示连续存储。 |
| length | 要转换的复数样本数。必须大于0。 |

**返回：**

无。

### HMS\_FAST\_ConcurrentHashmap\_Create()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_ConcurrentHashmap_Create(
2. FAST_ConcurrentHashmapHandle* handle,
3. HMS_FAST_ConcurrentHashmap_HashFunc hasher,
4. HMS_FAST_ConcurrentHashmap_KeyEqualFunc equaler,
5. double maxLoadFac,
6. size_t numShards
7. )
```

**描述**

根据输入配置创建并发哈希表。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| hasher | 开发者定义的哈希值计算回调函数。 |
| equaler | 开发者定义的键比较回调函数。 |
| maxLoadFac | 初始设定的最大负载因子。 |
| numShards | 初始设定的分段数。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle或相关回调函数为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽构造失败时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_ConcurrentHashmap\_Destroy()

PhonePC/2in1Tablet



```
1. void HMS_FAST_ConcurrentHashmap_Destroy(FAST_ConcurrentHashmapHandle handle)
```

**描述**

销毁给定并发哈希表。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 待销毁的并发哈希表句柄。 |

### HMS\_FAST\_ConcurrentHashmap\_Insert()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_ConcurrentHashmap_Insert(
2. FAST_ConcurrentHashmapHandle handle,
3. const FAST_ConcurrentHashmapKeyPtr key,
4. const FAST_ConcurrentHashmapValuePtr value,
5. FAST_ConcurrentHashmapValuePtr* originValue
6. )
```

**描述**

将给定键值对插入并发哈希表，如果给定的键在哈希表中已经存在，则覆写原有的值。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| key | 待插入的键指针。 |
| value | 待插入的值指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当哈希表中存在相同的键时，使用value覆盖已有的值并返回[FAST\_ERROR\_CODE\_KEY\_EXISTS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当内存耗尽时，返回[FAST\_ERROR\_CODE\_OOM](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_ConcurrentHashmap\_Find()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_ConcurrentHashmap_Find(
2. FAST_ConcurrentHashmapHandle handle,
3. const FAST_ConcurrentHashmapKeyPtr key,
4. FAST_ConcurrentHashmapValuePtr* value
5. )
```

**描述**

查找并发哈希表中给定键对应的值，将结果保存在value指针中。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| key | 待查找的键指针。 |
| value | 用于保存查询结果的指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle、key或value为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当哈希表中不存在匹配的键时，返回[FAST\_ERROR\_CODE\_KEY\_NOT\_EXISTS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_ConcurrentHashmap\_Erase()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_ConcurrentHashmap_Erase(
2. FAST_ConcurrentHashmapHandle handle,
3. const FAST_ConcurrentHashmapKeyPtr key,
4. FAST_ConcurrentHashmapKeyPtr* originKey,
5. FAST_ConcurrentHashmapValuePtr* originValue
6. )
```

**描述**

在并发哈希表中删除给定的键及其对应的值，并将其值保存在originalKey和originalValue中以便于开发者进行内存管理; 实际使用时也可根据需求将originalKey或originalValue设为nullptr，此时则不会将键或值的地址返回。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| key | 待删除的键指针。 |
| originKey | 用于返回哈希表中保存的键的指针，可为nullptr。 |
| originValue | 用于返回哈希表中保存的值得指针，可为nullptr。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle或key为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当哈希表中不存在匹配的键时，返回[FAST\_ERROR\_CODE\_KEY\_NOT\_EXISTS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_ConcurrentHashmap\_TryInsert()

PhonePC/2in1Tablet



```
1. FAST_ErrorCode HMS_FAST_ConcurrentHashmap_TryInsert(
2. FAST_ConcurrentHashmapHandle handle,
3. const FAST_ConcurrentHashmapKeyPtr key,
4. const FAST_ConcurrentHashmapValuePtr value
5. )
```

**描述**

将给定键值对插入并发哈希表，如果给定的键在哈希表中已经存在，则放弃插入保持原状。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| key | 待插入的键指针。 |
| value | 待插入的值指针。 |

**返回：**

当成功时，返回[FAST\_ERROR\_CODE\_SUCCESS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当handle、key或value为NULL时，返回[FAST\_ERROR\_CODE\_INVALID\_PTR](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

当哈希表中存在相同的键时，不执行任何操作并返回[FAST\_ERROR\_CODE\_KEY\_EXISTS](/consumer/cn/doc/harmonyos-references/fast-kit-fast#fast_errorcode-1)。

### HMS\_FAST\_ConcurrentHashmap\_Size()

PhonePC/2in1Tablet



```
1. size_t HMS_FAST_ConcurrentHashmap_Size(FAST_ConcurrentHashmapHandle handle)
```

**描述**

返回给定并发哈希表中的元素个数。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |

**返回：**

给定并发哈希表的元素个数，需注意在重度并发操作下该返回值可能与实际值存在细微偏差。

### HMS\_FAST\_ConcurrentHashmap\_Clear()

PhonePC/2in1Tablet



```
1. void HMS_FAST_ConcurrentHashmap_Clear(FAST_ConcurrentHashmapHandle handle)
```

**描述**

清空给定并发哈希表中的所有元素。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |

### HMS\_FAST\_ConcurrentHashmap\_EraseIf()

PhonePC/2in1Tablet



```
1. size_t HMS_FAST_ConcurrentHashmap_EraseIf(
2. FAST_ConcurrentHashmapHandle handle,
3. HMS_FAST_ConcurrentHashmap_HookFunc condFunc,
4. void* condCtx,
5. HMS_FAST_ConcurrentHashmap_HookFunc freeFunc,
6. void* freeCtx
7. )
```

**描述**

遍历哈希表并删除所有符合给定条件的键值对，同时使用开发者定义的freeFunc释放键值对的内存；实际使用时freeFunc可为nullptr，此时要求开发者另行完成内存管理动作。注意：请避免在condFunc和freeFunc中定义复杂的逻辑（如加锁等）以避免死锁等不可控现象。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| condFunc | 开发者定义的删除条件回调函数。 |
| condCtx | 条件回调函数的上下文。 |
| freeFunc | 开发者定义的内存释放回调函数，可为nullptr。 |
| freeCtx | 内存释放回调函数的上下文。 |

**返回：**

完成删除操作的元素个数。

### HMS\_FAST\_ConcurrentHashmap\_Traverse()

PhonePC/2in1Tablet



```
1. void HMS_FAST_ConcurrentHashmap_Traverse(
2. FAST_ConcurrentHashmapHandle handle,
3. HMS_FAST_ConcurrentHashmap_HookFunc condFunc,
4. void* condCtx,
5. HMS_FAST_ConcurrentHashmap_HookFunc workFunc,
6. void* workCtx
7. )
```

**描述**

遍历哈希表并对所有符合开发者condFunc的键值对执行workFunc中的修改；如果condFunc为nullptr，则对于表中存在的所有键值对都将执行开发者定义的workFunc。注意：请避免在condFunc和workFunc中定义复杂的逻辑（如加锁等）以避免死锁等不可控现象。

**起始版本：** 6.1.1(24)

**参数：**

展开

| 名称 | 描述 |
| --- | --- |
| handle | 并发哈希表句柄。 |
| condFunc | 开发者定义的条件回调函数，可为nullptr。 |
| condCtx | 回调函数的上下文。 |
| workFunc | 开发者定义的修改回调函数。 |
| workCtx | 修改函数的上下文。 |