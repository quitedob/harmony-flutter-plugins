## 概述

PhonePC/2in1TabletTVWearable

HiDebug模块代码结构体定义。

**引用文件：** <hidebug/hidebug\_type.h>

**库：** libohhidebug.so

**系统能力：** SystemCapability.HiviewDFX.HiProfiler.HiDebug

**起始版本：** 12

**相关模块：** [HiDebug](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [HiDebug\_ThreadCpuUsage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-threadcpuusage) | HiDebug\_ThreadCpuUsage | 应用程序所有线程的CPU使用率结构体定义。 |
| [HiDebug\_SystemMemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-systemmeminfo) | HiDebug\_SystemMemInfo | 系统内存信息结构类型定义。 |
| [HiDebug\_NativeMemInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-nativememinfo) | HiDebug\_NativeMemInfo | 应用程序进程本机内存信息结构类型定义。 |
| [HiDebug\_MemoryLimit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-memorylimit) | HiDebug\_MemoryLimit | 应用程序进程内存限制结构类型定义。 |
| [OH\_HiDebug\_RequestTraceConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-oh-hidebug-requesttraceconfig) | OH\_HiDebug\_RequestTraceConfig | 请求trace采集的配置结构类型定义。 |
| [HiDebug\_JsStackFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-jsstackframe) | HiDebug\_JsStackFrame | js栈帧内容的定义。 |
| [HiDebug\_NativeStackFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-nativestackframe) | HiDebug\_NativeStackFrame | native栈帧内容的定义。 |
| [HiDebug\_StackFrame](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-stackframe) | HiDebug\_StackFrame | 栈帧内容的定义。 |
| [HiDebug\_MallocDispatch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch) | HiDebug\_MallocDispatch | 应用程序进程可替换/恢复的HiDebug\_MallocDispatch表结构类型定义。 |
| [HiDebug\_GraphicsMemorySummary](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-graphicsmemorysummary) | HiDebug\_GraphicsMemorySummary | 应用图形显存占用详情的结构定义。 |
| [HiDebug\_ProcessSamplerConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-processsamplerconfig) | HiDebug\_ProcessSamplerConfig | 采样配置的结构定义。 |
| [HiDebug\_Backtrace\_Object\_\_\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-backtrace-object--8h) | HiDebug\_Backtrace\_Object | 用于栈回溯及栈解析的对象。 |
| [HiDebug\_ThreadCpuUsage\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-threadcpuusage) | HiDebug\_ThreadCpuUsagePtr | HiDebug\_ThreadCpuUsage指针定义。 |
| [OH\_HiDebug\_ResProfilerConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-oh-hidebug-resprofilerconfig) | OH\_HiDebug\_ResProfilerConfig | 定义资源采集配置结构体类型。 |
| [OH\_HiDebug\_ProfilingResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-oh-hidebug-profilingresult) | OH\_HiDebug\_ProfilingResult | 封装单次资源采集的结果。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [HiDebug\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_errorcode) | HiDebug\_ErrorCode | 错误码定义。 |
| [HiDebug\_TraceFlag](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_traceflag) | HiDebug\_TraceFlag | 采集trace线程的类型。 |
| [HiDebug\_StackFrameType](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_stackframetype) | HiDebug\_StackFrameType | 栈帧类型的枚举值定义。 |
| [HiDebug\_CrashObjType](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_crashobjtype) | HiDebug\_CrashObjType | 维测信息数据类型的枚举。 |
| [OH\_HiDebug\_ResourceType](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#oh_hidebug_resourcetype) | OH\_HiDebug\_ResourceType | 定义资源采集类型的枚举。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [HIDEBUG\_TRACE\_TAG\_FFRT](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_ffrt) (1ULL << 13) | FFRT任务标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_COMMON\_LIBRARY](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_common_library) (1ULL << 16) | 公共库子系统标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_HDF](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_hdf) (1ULL << 18) | HDF子系统标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_NET](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_net) (1ULL << 23) | 网络标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_NWEB](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_nweb) (1ULL << 24) | NWeb标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_AUDIO](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_audio) (1ULL << 27) | 分布式音频标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_FILE\_MANAGEMENT](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_file_management) (1ULL << 29) | 文件管理标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_OHOS](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_ohos) (1ULL << 30) | OHOS通用标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_ABILITY\_MANAGER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_ability_manager) (1ULL << 31) | Ability Manager标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_CAMERA](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_camera) (1ULL << 32) | 相机模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_MEDIA](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_media) (1ULL << 33) | 媒体模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_IMAGE](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_image) (1ULL << 34) | 图像模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_AUDIO](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_audio) (1ULL << 35) | 音频模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_DATA](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_data) (1ULL << 36) | 分布式数据管理器模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_GRAPHICS](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_graphics) (1ULL << 38) | 图形模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_ARKUI](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_arkui) (1ULL << 39) | ArkUI开发框架标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_NOTIFICATION](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_notification) (1ULL << 40) | 通知模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_MISC](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_misc) (1ULL << 41) | MISC模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_MULTIMODAL\_INPUT](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_multimodal_input) (1ULL << 42) | 多模态输入模块标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_RPC](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_rpc) (1ULL << 46) | RPC标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_ARK](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_ark) (1ULL << 47) | JSVM虚拟机标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_WINDOW\_MANAGER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_window_manager) (1ULL << 48) | 窗口管理器标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_SCREEN](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_screen) (1ULL << 50) | 分布式屏幕标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_CAMERA](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_camera) (1ULL << 51) | 分布式相机标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_HARDWARE\_FRAMEWORK](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_hardware_framework) (1ULL << 52) | 分布式硬件框架标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_GLOBAL\_RESOURCE\_MANAGER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_global_resource_manager) (1ULL << 53) | 全局资源管理器标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_HARDWARE\_DEVICE\_MANAGER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_hardware_device_manager) (1ULL << 54) | 分布式硬件设备管理器标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_SAMGR](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_samgr) (1ULL << 55) | SA标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_POWER\_MANAGER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_power_manager) (1ULL << 56) | 电源管理器标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_SCHEDULER](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_scheduler) (1ULL << 57) | 分布式调度程序标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_INPUT](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_distributed_input) (1ULL << 59) | 分布式输入标签。  **起始版本：** 12 |
| [HIDEBUG\_TRACE\_TAG\_BLUETOOTH](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_trace_tag_bluetooth) (1ULL << 60) | 蓝牙标签。  **起始版本：** 12 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_HiDebug\_RequestTraceCallback)(HiDebug\_ErrorCode errorCode, const char\* filePath)](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#oh_hidebug_requesttracecallback) | OH\_HiDebug\_RequestTraceCallback | 请求trace采集的回调类型定义。 |
| [typedef void (\*OH\_HiDebug\_ProfilingCallback)(OH\_HiDebug\_ProfilingResult\* result)](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#oh_hidebug_profilingcallback) | OH\_HiDebug\_ProfilingCallback | 定义资源采集回调函数。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### HiDebug\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum HiDebug_ErrorCode
```

**描述**

错误码定义。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| HIDEBUG\_SUCCESS = 0 | 成功。 |
| HIDEBUG\_INVALID\_ARGUMENT = 401 | 无效参数，可能的原因： 1.参数传值问题；2.参数类型问题。 |
| HIDEBUG\_TRACE\_CAPTURED\_ALREADY = 11400102 | 重复采集。 |
| HIDEBUG\_NO\_PERMISSION = 11400103 | 没有写文件的权限。 |
| HIDEBUG\_TRACE\_ABNORMAL = 11400104 | 系统内部错误。 |
| HIDEBUG\_NO\_TRACE\_RUNNING = 11400105 | 当前没有trace正在运行。 |
| OH\_HIDEBUG\_TRACE\_STORAGE\_LIMIT = 11400120 | trace文件存储达到限制。  **起始版本：** 24。 |
| HIDEBUG\_INVALID\_SYMBOLIC\_PC\_ADDRESS = 11400200 | 传入符号解析函数的pc地址是无效的。  **起始版本：** 20。 |
| HIDEBUG\_NOT\_SUPPORTED = 11400300 | 当前设备不支持。  **起始版本：** 22 |
| HIDEBUG\_UNDER\_SAMPLING = 11400301 | 当前进程正在采样。  **起始版本：** 22 |
| HIDEBUG\_RESOURCE\_UNAVAILABLE = 11400302 | 采样资源不可用。  **起始版本：** 22 |
| HIDEBUG\_RES\_PROF\_SUCCESS = 11400400 | 资源采集启动/停止成功。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_ARG = 11400410 | 资源采集参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_MAX\_DURATION = 11400411 | 资源采集最大持续时间参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_FILTER\_SIZE = 11400412 | 资源采集过滤大小参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_MAX\_STACK\_DEPTH = 11400413 | 资源采集最大回栈深度参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_STATISTICS\_INTERVAL = 11400414 | 资源采集统计间隔参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_SAMPLE\_INTERVAL = 11400415 | 资源采集采样大小参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_INVALID\_RESOURCE\_TYPE = 11400416 | 资源采集资源类型参数无效。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_PERMISSION\_DENIED = 11400420 | 资源采集权限不足，采集资源的目标进程仅支持调用接口进程本身。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_ALREADY\_STARTED = 11400421 | 资源采集重复启动。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_NOT\_STARTED = 11400422 | 资源采集未启动，停止失败。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_PROCESS\_OVERLIMIT = 11400423 | 资源采集进程数超出 4 个限制。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_CONFLICT = 11400424 | 资源采集与命令行工具或系统采集任务冲突。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_AUTO\_STOPPED\_BY\_DURATION = 11400425 | 资源采集到达指定最大持续时间限制自动停止。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_DAILY\_QUOTA\_EXCEEDED = 11400426 | 资源采集每日配额超出 10 次限制。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_CPU\_OVERLOADED = 11400427 | 系统 CPU 处于高负载状态，CPU 占用率超过 70%。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_MEM\_PRESSURE\_CRITICAL = 11400428 | 内存可用空间紧张，可用空间少于 15%。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_STORAGE\_PRESSURE\_CRITICAL = 11400429 | 存储可用空间紧张，可用空间少于 15%。  **起始版本：** 24 |
| HIDEBUG\_RES\_PROF\_FAILURE = 11400430 | 资源采集启动/停止失败。  **起始版本：** 24 |

### HiDebug\_TraceFlag

PhonePC/2in1TabletTVWearable



```
1. enum HiDebug_TraceFlag
```

**描述**

采集trace线程的类型。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| HIDEBUG\_TRACE\_FLAG\_MAIN\_THREAD = 1 | 只采集当前应用主线程。 |
| HIDEBUG\_TRACE\_FLAG\_ALL\_THREADS = 2 | 采集当前应用下所有线程。 |

### HiDebug\_StackFrameType

PhonePC/2in1TabletTVWearable



```
1. enum HiDebug_StackFrameType
```

**描述**

栈帧类型的枚举值定义。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| HIDEBUG\_STACK\_FRAME\_TYPE\_JS = 1 | js类型栈帧。 |
| HIDEBUG\_STACK\_FRAME\_TYPE\_NATIVE = 2 | native类型栈帧。 |

### HiDebug\_CrashObjType

PhonePC/2in1TabletTVWearable



```
1. enum HiDebug_CrashObjType
```

**描述**

维测信息数据类型的枚举。

**起始版本：** 23

展开

| 枚举项 | 描述 |
| --- | --- |
| HIDEBUG\_CRASHOBJ\_STRING = 0 | 字符串 |
| HIDEBUG\_CRASHOBJ\_MEMORY\_64B = 1 | 64字节内存块 |
| HIDEBUG\_CRASHOBJ\_MEMORY\_256B = 2 | 256字节内存块 |
| HIDEBUG\_CRASHOBJ\_MEMORY\_1024B = 3 | 1024字节内存块 |
| HIDEBUG\_CRASHOBJ\_MEMORY\_2048B = 4 | 2048字节内存块 |
| HIDEBUG\_CRASHOBJ\_MEMORY\_4096B = 5 | 4096字节内存块 |

### OH\_HiDebug\_ResourceType

PhonePC/2in1TabletTVWearable



```
1. enum OH_HiDebug_ResourceType
```

**描述**

定义资源采集类型的枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_RES\_TYPE\_FD | 文件描述符  **起始版本：** 24 |
| OH\_RES\_TYPE\_THREAD | 线程  **起始版本：** 24 |
| OH\_RES\_TYPE\_NATIVE | Native 内存  **起始版本：** 24 |
| OH\_RES\_TYPE\_GPU | GPU 内存  **起始版本：** 24 |
| OH\_RES\_TYPE\_GLOBAL\_HANDLE | 全局句柄  **起始版本：** 24 |

## 宏定义说明

PhonePC/2in1TabletTVWearable

### HIDEBUG\_TRACE\_TAG\_FFRT

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_FFRT (1ULL << 13)
```

**描述**

FFRT任务标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_COMMON\_LIBRARY

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_COMMON_LIBRARY (1ULL << 16)
```

**描述**

公共库子系统标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_HDF

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_HDF (1ULL << 18)
```

**描述**

HDF子系统标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_NET

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_NET (1ULL << 23)
```

**描述**

网络标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_NWEB

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_NWEB (1ULL << 24)
```

**描述**

NWeb标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_AUDIO

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_AUDIO (1ULL << 27)
```

**描述**

分布式音频标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_FILE\_MANAGEMENT

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_FILE_MANAGEMENT (1ULL << 29)
```

**描述**

文件管理标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_OHOS

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_OHOS (1ULL << 30)
```

**描述**

OHOS通用标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_ABILITY\_MANAGER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_ABILITY_MANAGER (1ULL << 31)
```

**描述**

Ability Manager标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_CAMERA

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_CAMERA (1ULL << 32)
```

**描述**

相机模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_MEDIA

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_MEDIA (1ULL << 33)
```

**描述**

媒体模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_IMAGE

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_IMAGE (1ULL << 34)
```

**描述**

图像模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_AUDIO

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_AUDIO (1ULL << 35)
```

**描述**

音频模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_DATA

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_DATA (1ULL << 36)
```

**描述**

分布式数据管理器模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_GRAPHICS

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_GRAPHICS (1ULL << 38)
```

**描述**

图形模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_ARKUI

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_ARKUI (1ULL << 39)
```

**描述**

ArkUI开发框架标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_NOTIFICATION

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_NOTIFICATION (1ULL << 40)
```

**描述**

通知模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_MISC

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_MISC (1ULL << 41)
```

**描述**

MISC模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_MULTIMODAL\_INPUT

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_MULTIMODAL_INPUT (1ULL << 42)
```

**描述**

多模态输入模块标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_RPC

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_RPC (1ULL << 46)
```

**描述**

RPC标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_ARK

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_ARK (1ULL << 47)
```

**描述**

JSVM虚拟机标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_WINDOW\_MANAGER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_WINDOW_MANAGER (1ULL << 48)
```

**描述**

窗口管理器标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_SCREEN

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_SCREEN (1ULL << 50)
```

**描述**

分布式屏幕标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_CAMERA

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_CAMERA (1ULL << 51)
```

**描述**

分布式相机标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_HARDWARE\_FRAMEWORK

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_HARDWARE_FRAMEWORK (1ULL << 52)
```

**描述**

分布式硬件框架标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_GLOBAL\_RESOURCE\_MANAGER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_GLOBAL_RESOURCE_MANAGER (1ULL << 53)
```

**描述**

全局资源管理器标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_HARDWARE\_DEVICE\_MANAGER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_HARDWARE_DEVICE_MANAGER (1ULL << 54)
```

**描述**

分布式硬件设备管理器标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_SAMGR

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_SAMGR (1ULL << 55)
```

**描述**

SA标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_POWER\_MANAGER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_POWER_MANAGER (1ULL << 56)
```

**描述**

电源管理器标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_SCHEDULER

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_SCHEDULER (1ULL << 57)
```

**描述**

分布式调度程序标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_DISTRIBUTED\_INPUT

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_DISTRIBUTED_INPUT (1ULL << 59)
```

**描述**

分布式输入标签。

**起始版本：** 12

### HIDEBUG\_TRACE\_TAG\_BLUETOOTH

PhonePC/2in1TabletTVWearable



```
1. #define HIDEBUG_TRACE_TAG_BLUETOOTH (1ULL << 60)
```

**描述**

蓝牙标签。

**起始版本：** 12

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_HiDebug\_RequestTraceCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiDebug_RequestTraceCallback)(HiDebug_ErrorCode errorCode, const char* filePath)
```

**描述**

请求trace采集的回调类型定义。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| HiDebug\_ErrorCode errorCode | 返回结果码，参考[HiDebug\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h#hidebug_errorcode)。 |
| const char\* filePath | 返回采集的trace文件，失败时可能是空指针。 |

### OH\_HiDebug\_ProfilingCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiDebug_ProfilingCallback)(OH_HiDebug_ProfilingResult* result)
```

**描述**

定义资源采集回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_HiDebug\_ProfilingResult\* result | 资源采集回调函数的参数。 |