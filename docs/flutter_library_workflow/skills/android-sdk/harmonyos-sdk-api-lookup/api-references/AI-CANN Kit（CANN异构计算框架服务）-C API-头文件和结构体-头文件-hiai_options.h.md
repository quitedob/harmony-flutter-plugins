## 概述

PhonePC/2in1TabletTV

选项参数的接口。

支持设置动态shape、变更模型shape、设置数据排列格式、算子融合策略、量化配置、算子级调优、模型级调优、辅助调优、带宽模式等参数配置。

**引用文件：** <CANNKit/hiai\_options.h>

**库：** libhiai\_foundation.so

**系统能力：** SystemCapability.AI.HiAIFoundation

**起始版本：** 4.1.0(11)

**相关模块：** [CANN](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit)

## 汇总

PhonePC/2in1TabletTV

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [HiAI\_FormatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_formatmode) {  HIAI\_FORMAT\_MODE\_NCHW = 0,  HIAI\_FORMAT\_MODE\_ORIGIN = 1  } | 模型编译时数据的排列格式。 |
| [HiAI\_DynamicShapeStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapestatus) {  HIAI\_DYNAMIC\_SHAPE\_DISABLED = 0,  HIAI\_DYNAMIC\_SHAPE\_ENABLED = 1  } | 是否使能编译前可变shape。 |
| [HiAI\_DynamicShapeCacheMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapecachemode) {  HIAI\_DYNAMIC\_SHAPE\_CACHE\_BUILT\_MODEL = 0,  HIAI\_DYNAMIC\_SHAPE\_CACHE\_LOADED\_MODEL = 1  } | 编译前可变shape支持的模式。 |
| [HiAI\_ExecuteDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_executedevice) {  HIAI\_EXECUTE\_DEVICE\_NPU = 0,  HIAI\_EXECUTE\_DEVICE\_CPU = 1,  HIAI\_EXECUTE\_DEVICE\_GPU = 2  } | 模型运行时支持的设备类型。 |
| [HiAI\_FallbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_fallbackmode) {  HIAI\_FALLBACK\_ENABLED = 0,  HIAI\_FALLBACK\_DISABLED = 1  } | 指定的硬件设备无法编译模型时，是否允许CANN Kit选择其他硬件设备，例如CPU。 |
| [HiAI\_DeviceMemoryReusePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_devicememoryreuseplan) {  HIAI\_DEVICE\_MEMORY\_REUSE\_PLAN\_UNSET = 0,  HIAI\_DEVICE\_MEMORY\_REUSE\_PLAN\_LOW = 1,  HIAI\_DEVICE\_MEMORY\_REUSE\_PLAN\_HIGH = 2  } | 设备内存复用配置选项。 |
| [HiAI\_TuningStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningstrategy) {  HIAI\_TUNING\_STRATEGY\_OFF = 0,  HIAI\_TUNING\_STRATEGY\_ON\_DEVICE\_TUNING = 1,  HIAI\_TUNING\_STRATEGY\_ON\_DEVICE\_PREPROCESS\_TUNING = 2,  HIAI\_TUNING\_STRATEGY\_ON\_CLOUD\_TUNING = 3  } | 模型优化策略配置选项。 |
| [HiAI\_TuningMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningmode) {  HIAI\_TUNING\_MODE\_UNSET = 0,  HIAI\_TUNING\_MODE\_AUTO = 1,  HIAI\_TUNING\_MODE\_HETER = 2  } | 辅助调优模式。 |
| [HiAI\_BandMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_bandmode) {  HIAI\_BANDMODE\_UNSET = 0,  HIAI\_BANDMODE\_LOW = 1,  HIAI\_BANDMODE\_NORMAL = 2,  HIAI\_BANDMODE\_HIGH = 3  } | 定义硬件之间带宽模式。 |
| [HiAI\_OmType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_omtype) {  HIAI\_OM\_TYPE\_OFF = 0,  HIAI\_OM\_TYPE\_PROFILING = 1,  HIAI\_OM\_TYPE\_DUMP = 2  } | 维测类型定义。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetInputTensorShapes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setinputtensorshapes) (OH\_NNCompilation \*compilation, NN\_TensorDesc \*inputTensorDescs[], size\_t shapeCount) | 编译时更新模型输入shape。 |
| size\_t [HMS\_HiAIOptions\_GetInputTensorShapeSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getinputtensorshapesize) (const OH\_NNCompilation \*compilation) | 查询选项参数中shape描述的个数。 |
| NN\_TensorDesc \* [HMS\_HiAIOptions\_GetInputTensorShape](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getinputtensorshape) (const OH\_NNCompilation \*compilation, size\_t index) | 查询选项参数中指定索引的shape描述。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetFormatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setformatmode) (OH\_NNCompilation \*compilation, [HiAI\_FormatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_formatmode) formatMode) | 设置模型编译时的数据排列格式。 |
| [HiAI\_FormatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_formatmode) [HMS\_HiAIOptions\_GetFormatMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getformatmode) (const OH\_NNCompilation \*compilation) | 查询模型编译参数中的数据排列格式。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetDynamicShapeStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setdynamicshapestatus) (OH\_NNCompilation \*compilation, [HiAI\_DynamicShapeStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapestatus) status) | 设置编译前可变shape配置中的EnableMode参数。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetDynamicShapeMaxCache](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setdynamicshapemaxcache) (OH\_NNCompilation \*compilation, size\_t maxCacheCount) | 设置编译前可变shape配置中的最大缓存编译后模型数量。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetDynamicShapeCacheMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setdynamicshapecachemode) (OH\_NNCompilation \*compilation, [HiAI\_DynamicShapeCacheMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapecachemode) mode) | 设置编译前可变shape配置中的缓存模式参数。 |
| [HiAI\_DynamicShapeStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapestatus) [HMS\_HiAIOptions\_GetDynamicShapeStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getdynamicshapestatus) (const OH\_NNCompilation \*compilation) | 查询编译前可变shape配置中的状态参数。 |
| size\_t [HMS\_HiAIOptions\_GetDynamicShapeMaxCache](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getdynamicshapemaxcache) (const OH\_NNCompilation \*compilation) | 查询编译前可变shape配置中的最大缓存数量。 |
| [HiAI\_DynamicShapeCacheMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_dynamicshapecachemode) [HMS\_HiAIOptions\_GetDynamicShapeCacheMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getdynamicshapecachemode) (const OH\_NNCompilation \*compilation) | 查询编译前可变shape配置中的cacheMode参数。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetOperatorDeviceOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setoperatordeviceorder) (OH\_NNCompilation \*compilation, const char \*operatorName, [HiAI\_ExecuteDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_executedevice) \*executeDevices, size\_t deviceCount) | 设置算子级调优配置中算子执行设备列表。 |
| size\_t [HMS\_HiAIOptions\_GetOperatorDeviceCount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getoperatordevicecount) (const OH\_NNCompilation \*compilation, const char \*operatorName) | 查询算子级调优配置中指定算子的执行设备个数。 |
| [HiAI\_ExecuteDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_executedevice) \* [HMS\_HiAIOptions\_GetOperatorDeviceOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getoperatordeviceorder) (const OH\_NNCompilation \*compilation, const char \*operatorName) | 查询算子级调优配置中指定算子的执行设备列表。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetModelDeviceOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setmodeldeviceorder) (OH\_NNCompilation \*compilation, [HiAI\_ExecuteDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_executedevice) \*executeDevices, size\_t deviceCount) | 设置模型级调优配置中模型执行设备列表。 |
| size\_t [HMS\_HiAIOptions\_GetModelDeviceCount](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getmodeldevicecount) (const OH\_NNCompilation \*compilation) | 查询模型级调优配置中模型的执行设备个数。 |
| [HiAI\_ExecuteDevice](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_executedevice) \* [HMS\_HiAIOptions\_GetModelDeviceOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getmodeldeviceorder) (const OH\_NNCompilation \*compilation) | 查询模型级调优配置中模型的执行设备列表。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetFallbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setfallbackmode) (OH\_NNCompilation \*compilation, [HiAI\_FallbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_fallbackmode) fallbackMode) | 设置调优配置中的回滚模式。 |
| [HiAI\_FallbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_fallbackmode) [HMS\_HiAIOptions\_GetFallbackMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getfallbackmode) (const OH\_NNCompilation \*compilation) | 查询调优配置中的回滚模式。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetDeviceMemoryReusePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setdevicememoryreuseplan) (OH\_NNCompilation \*compilation, [HiAI\_DeviceMemoryReusePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_devicememoryreuseplan) deviceMemoryReusePlan) | 设置调优配置中的设备内存复用参数。 |
| [HiAI\_DeviceMemoryReusePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_devicememoryreuseplan) [HMS\_HiAIOptions\_GetDeviceMemoryReusePlan](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getdevicememoryreuseplan) (const OH\_NNCompilation \*compilation) | 查询调优配置中的设备内存复用参数。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetTuningStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_settuningstrategy) (OH\_NNCompilation \*compilation, [HiAI\_TuningStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningstrategy) tuningStrategy) | 设置模型编译时的模型优化策略。 |
| [HiAI\_TuningStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningstrategy) [HMS\_HiAIOptions\_GetTuningStrategy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_gettuningstrategy) (const OH\_NNCompilation \*compilation) | 查询模型优化策略。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetQuantConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setquantconfig) (OH\_NNCompilation \*compilation, void \*data, size\_t size) | 设置模型编译时量化配置。 |
| void \* [HMS\_HiAIOptions\_GetQuantConfigData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getquantconfigdata) (const OH\_NNCompilation \*compilation) | 查询量化配置的数据地址。 |
| size\_t [HMS\_HiAIOptions\_GetQuantConfigSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getquantconfigsize) (const OH\_NNCompilation \*compilation) | 查询量化配置的数据大小。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetTuningMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_settuningmode) (OH\_NNCompilation \*compilation, [HiAI\_TuningMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningmode) tuningMode) | 选择辅助调优模式。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetTuningCacheDir](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_settuningcachedir) (OH\_NNCompilation \*compilation, const char \*cacheDir) | 设置辅助调优的缓存目录。 |
| [HiAI\_TuningMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_tuningmode) [HMS\_HiAIOptions\_GetTuningMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_gettuningmode) (const OH\_NNCompilation \*compilation) | 查询辅助调优模式。 |
| const char \* [HMS\_HiAIOptions\_GetTuningCacheDir](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_gettuningcachedir) (const OH\_NNCompilation \*compilation) | 查询辅助调优的缓存目录。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetBandMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setbandmode) (OH\_NNCompilation \*compilation, [HiAI\_BandMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_bandmode) bandMode) | 设置NPU与周边硬件IO资源的带宽模式。 |
| [HiAI\_BandMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_bandmode) [HMS\_HiAIOptions\_GetBandMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_getbandmode) (const OH\_NNCompilation \*compilation) | 查询带宽模式。 |
| OH\_NN\_ReturnCode [HMS\_HiAIOptions\_SetOmOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hms_hiaioptions_setomoptions)(OH\_NNCompilation \*compilation, [HiAI\_OmType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cannkit#hiai_omtype) type, const char \*outputDir) | 设置模型加载时的维测选项信息。 |