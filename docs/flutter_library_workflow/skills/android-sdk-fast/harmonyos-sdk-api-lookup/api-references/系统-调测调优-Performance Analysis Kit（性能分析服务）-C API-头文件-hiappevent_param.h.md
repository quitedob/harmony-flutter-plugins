## 概述

PhonePC/2in1TabletTVWearable

定义所有预定义事件的参数名称。除了与特定应用关联的自定义事件之外，开发者还可以使用预定义事件进行打点。

**引用文件：** <hiappevent/hiappevent\_param.h>

**库：** libhiappevent\_ndk.z.so

**系统能力：** SystemCapability.HiviewDFX.HiAppEvent

**起始版本：** 8

**相关模块：** [HiAppEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hiappevent)

## 汇总

PhonePC/2in1TabletTVWearable

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [PARAM\_USER\_ID](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#param_user_id) "user\_id" | 用户ID。  **起始版本：** 8 |
| [PARAM\_DISTRIBUTED\_SERVICE\_NAME](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#param_distributed_service_name) "ds\_name" | 分布式服务名称。  **起始版本：** 8 |
| [PARAM\_DISTRIBUTED\_SERVICE\_INSTANCE\_ID](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#param_distributed_service_instance_id) "ds\_instance\_id" | 分布式服务实例ID。  **起始版本：** 8 |
| [MAIN\_THREAD\_JANK\_PARAM\_LOG\_TYPE](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_log_type) "log\_type" | 用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测采集日志的类型。  **起始版本：** 22 |
| [MAIN\_THREAD\_JANK\_PARAM\_SAMPLE\_INTERVAL](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_sample_interval) "sample\_interval" | 用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测间隔和采样间隔。  **起始版本：** 22 |
| [MAIN\_THREAD\_JANK\_PARAM\_IGNORE\_STARTUP\_TIME](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_ignore_startup_time) "ignore\_startup\_time" | 用于MAIN\_THREAD\_JANK\_V2事件，应用启动期间忽略主线程超时检测的时间。  **起始版本：** 22 |
| [MAIN\_THREAD\_JANK\_PARAM\_SAMPLE\_COUNT](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_sample_count) "sample\_count" | 用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测的采样栈的次数。  **起始版本：** 22 |
| [MAIN\_THREAD\_JANK\_PARAM\_REPORT\_TIMES\_PER\_APP](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_report_times_per_app) "report\_times\_per\_app" | 用于MAIN\_THREAD\_JANK\_V2事件，每个应用PID一个生命周期内，主线程超时采样上报的次数，一个生命周期内只能设置一次。  **起始版本：** 22 |
| [MAIN\_THREAD\_JANK\_PARAM\_AUTO\_STOP\_SAMPLING](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#main_thread_jank_param_auto_stop_sampling) "auto\_stop\_sampling" | 用于MAIN\_THREAD\_JANK\_V2事件，主线程超时结束时，是否停止采样主线程堆栈。  **起始版本：** 22 |
| [OH\_APP\_CRASH\_PARAM\_EXTEND\_PC\_LR\_PRINTING](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#oh_app_crash_param_extend_pc_lr_printing) "extend\_pc\_lr\_printing" | 用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否打印PC、LR寄存器扩展字节范围的内存内容。  **起始版本：** 24 |
| [OH\_APP\_CRASH\_PARAM\_LOG\_FILE\_CUTOFF\_SZ\_BYTES](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#oh_app_crash_param_log_file_cutoff_sz_bytes) "log\_file\_cutoff\_sz\_bytes" | 用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，按设置的参数值大小截断CPP\_CRASH日志。  **起始版本：** 24 |
| [OH\_APP\_CRASH\_PARAM\_SIMPLIFY\_VMA\_PRINTING](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#oh_app_crash_param_simplify_vma_printing) "simplify\_vma\_printing" | 用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否只打印崩溃日志中出现的地址所属的VMA映射信息，以减小CPP\_CRASH日志文件大小。  **起始版本：** 24 |
| [OH\_APP\_CRASH\_PARAM\_MERGE\_CPPCRASH\_APP\_LOG](/consumer/cn/doc/harmonyos-references/capi-hiappevent-param-h#oh_app_crash_param_merge_cppcrash_app_log) "merge\_cppcrash\_app\_log" | 用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否在CPP\_CRASH场景拼接应用沙箱中指定文件的日志。  **起始版本：** 24 |

## 宏定义说明

PhonePC/2in1TabletTVWearable

### PARAM\_USER\_ID

PhonePC/2in1TabletTVWearable



```
1. #define PARAM_USER_ID "user_id"
```

**描述**

用户ID。

**起始版本：** 8

### PARAM\_DISTRIBUTED\_SERVICE\_NAME

PhonePC/2in1TabletTVWearable



```
1. #define PARAM_DISTRIBUTED_SERVICE_NAME "ds_name"
```

**描述**

分布式服务名称。

**起始版本：** 8

### PARAM\_DISTRIBUTED\_SERVICE\_INSTANCE\_ID

PhonePC/2in1TabletTVWearable



```
1. #define PARAM_DISTRIBUTED_SERVICE_INSTANCE_ID "ds_instance_id"
```

**描述**

分布式服务实例ID。

**起始版本：** 8

### MAIN\_THREAD\_JANK\_PARAM\_LOG\_TYPE

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_LOG_TYPE "log_type"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测采集日志的类型。

**起始版本：** 22

### MAIN\_THREAD\_JANK\_PARAM\_SAMPLE\_INTERVAL

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_SAMPLE_INTERVAL "sample_interval"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测间隔和采样间隔。

**起始版本：** 22

### MAIN\_THREAD\_JANK\_PARAM\_IGNORE\_STARTUP\_TIME

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_IGNORE_STARTUP_TIME "ignore_startup_time"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，应用启动期间忽略主线程超时检测的时间。

**起始版本：** 22

### MAIN\_THREAD\_JANK\_PARAM\_SAMPLE\_COUNT

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_SAMPLE_COUNT "sample_count"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，主线程超时检测的采样栈的次数。

**起始版本：** 22

### MAIN\_THREAD\_JANK\_PARAM\_REPORT\_TIMES\_PER\_APP

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_REPORT_TIMES_PER_APP "report_times_per_app"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，每个应用PID一个生命周期内，主线程超时采样上报的次数，一个生命周期内只能设置一次。

**起始版本：** 22

### MAIN\_THREAD\_JANK\_PARAM\_AUTO\_STOP\_SAMPLING

PhonePC/2in1TabletTVWearable



```
1. #define MAIN_THREAD_JANK_PARAM_AUTO_STOP_SAMPLING "auto_stop_sampling"
```

**描述**

用于MAIN\_THREAD\_JANK\_V2事件，是否停止采样主线程堆栈。

**起始版本：** 22

### OH\_APP\_CRASH\_PARAM\_EXTEND\_PC\_LR\_PRINTING

PhonePC/2in1TabletTVWearable



```
1. #define OH_APP_CRASH_PARAM_EXTEND_PC_LR_PRINTING "extend_pc_lr_printing"
```

**描述**

用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否打印PC、LR寄存器扩展字节范围的内存内容。

**起始版本：** 24

### OH\_APP\_CRASH\_PARAM\_LOG\_FILE\_CUTOFF\_SZ\_BYTES

PhonePC/2in1TabletTVWearable



```
1. #define OH_APP_CRASH_PARAM_LOG_FILE_CUTOFF_SZ_BYTES "log_file_cutoff_sz_bytes"
```

**描述**

用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，按设置的参数值大小截断CPP\_CRASH日志。

**起始版本：** 24

### OH\_APP\_CRASH\_PARAM\_SIMPLIFY\_VMA\_PRINTING

PhonePC/2in1TabletTVWearable



```
1. #define OH_APP_CRASH_PARAM_SIMPLIFY_VMA_PRINTING "simplify_vma_printing"
```

**描述**

用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否只打印崩溃日志中出现的地址所属的VMA映射信息，以减小CPP\_CRASH日志文件大小。

**起始版本：** 24

### OH\_APP\_CRASH\_PARAM\_MERGE\_CPPCRASH\_APP\_LOG

PhonePC/2in1TabletTVWearable



```
1. #define OH_APP_CRASH_PARAM_MERGE_CPPCRASH_APP_LOG "merge_cppcrash_app_log"
```

**描述**

用于设置APP\_CRASH事件中的CPP\_CRASH类型的日志规格，是否在CPP\_CRASH场景拼接应用沙箱中指定文件的日志。

**起始版本：** 24