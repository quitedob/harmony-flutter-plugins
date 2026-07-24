## 概述

PhonePC/2in1TabletTVWearable

HiCollie模块对外提供检测业务线程卡死、卡顿，以及上报卡死事件的能力。

**引用文件：** <hicollie/hicollie.h>

**库：** libohhicollie.so

**系统能力：** SystemCapability.HiviewDFX.HiCollie

**起始版本：** 12

**相关模块：** [HiCollie](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [HiCollie\_DetectionParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-hicollie-detectionparam) | HiCollie\_DetectionParam | 检测业务线程卡顿的相关参数。请注意，API 12及以上支持。 |
| [HiCollie\_SetTimerParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-hicollie-settimerparam) | HiCollie\_SetTimerParam | 定义OH\_HiCollie\_SetTimer函数的输入参数。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [HiCollie\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | HiCollie\_ErrorCode | 错误码定义。 |
| [HiCollie\_Flag](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_flag) | HiCollie\_Flag | 定义函数执行超时时发生的动作。 |
| [OH\_HiCollie\_Freeze\_Type](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_freeze_type) | OH\_HiCollie\_Freeze\_Type | 定义FreezeCallback返回的冻屏类型。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_HiCollie\_Task)(void)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_task) | OH\_HiCollie\_Task | 在业务线程卡死检测中，通过实现该函数来检测业务线程是否卡住。  HiCollie将在业务线程中每3秒调用一次该函数。  例如：该函数可实现向业务线程发送消息，在业务线程接收到消息之后，设置一个标记，检查这个标记，确定业务线程是否卡住。 |
| [typedef void (\*OH\_HiCollie\_BeginFunc)(const char\* eventName)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_beginfunc) | OH\_HiCollie\_BeginFunc | 卡顿检测中,函数用于记录业务线程处理事件的开始时间。  由HiCollie检查事件的执行时间。如果超过预设阈值，上报jank事件。  该函数在每个事件处理前插入。 |
| [typedef void (\*OH\_HiCollie\_EndFunc)(const char\* eventName)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_endfunc) | OH\_HiCollie\_EndFunc | 卡顿检测中, 该函数用于检测业务线程处理事件是否卡顿。  由HiCollie检查事件的执行时间。如果超过预设阈值，上报jank事件。  该函数在每个事件处理后插入。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_Init\_StuckDetection(OH\_HiCollie\_Task task)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_init_stuckdetection) | - | 注册应用业务线程卡死的周期性检测任务。用户实现回调函数, 用于定时检测业务线程卡死情况。  默认检测时间：3s上报BUSSINESS\_THREAD\_BLOCK\_3S告警事件，6s上报BUSSINESS\_THREAD\_BLOCK\_6S卡死事件。  **说明：** 在非主线程使用该接口。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_Init\_StuckDetectionWithTimeout(OH\_HiCollie\_Task task, uint32\_t stuckTimeout)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_init_stuckdetectionwithtimeout) | - | 注册应用业务线程卡死的周期性检测任务。用户实现回调函数, 用于定时检测业务线程卡死情况。  开发者可以设置卡死检测时间，可设置的时间范围：[3, 15]，单位：秒。  **说明：** 在非主线程使用该接口。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_Init\_JankDetection(OH\_HiCollie\_BeginFunc\* beginFunc, OH\_HiCollie\_EndFunc\* endFunc, HiCollie\_DetectionParam param)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_init_jankdetection) | - | 注册应用业务线程卡顿检测的回调函数。  线程卡顿监控功能需要开发者实现两个卡顿检测回调函数, 分别放在业务线程处理事件的前后。作为插桩函数，监控业务线程处理事件执行情况。  **说明：** 在非主线程使用该接口。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_Report(bool\* isSixSecond)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_report) | - | 上报应用业务线程卡死事件，生成卡死故障日志，辅助定位应用卡死问题。  先调用OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口，初始化检测的task；  如果task任务超时，结合业务逻辑，调用OH\_HiCollie\_Report接口上报卡死事件。  **说明：**  - 在非主线程使用该接口。  - 该接口仅对[release版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#release版本应用)生效，对[debug版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#debug版本应用)不生效。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_ReportInputBlock()](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_reportinputblock) | - | 上报应用输入无响应事件，生成卡死故障日志，辅助定位应用卡死问题。如果在PC或平板设备上，还会弹窗提示用户继续等待或关闭应用，其他设备不会弹窗。建议如下两种方式使用该接口。  方式一（推荐）：配合OH\_HiCollie\_Report、OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口使用，业务线程通过上述接口周期性检测自身卡死情况，当满足业务线程卡死且有输入事件（如屏幕点击、鼠标点击、键盘输入等）条件时再调用OH\_HiCollie\_ReportInputBlock接口。  方式二：业务线程不通过OH\_HiCollie\_Report、OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口也能检测自身卡死情况，则应用结合业务线程卡死情况和输入事件再调用OH\_HiCollie\_ReportInputBlock接口。  **说明：**  - 该接口可以在主线程使用，比如输入事件需要先经过主线程再封装传递给业务线程处理，业务线程卡死时维护一个状态标志位，主线程结合业务线程的卡死状态标志位和输入事件再调用该接口。  - 该接口仅对[release版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#release版本应用)生效，对[debug版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#debug版本应用)不生效。 |
| [typedef void (\*OH\_HiCollie\_Callback)(void\*)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_callback) | OH\_HiCollie\_Callback | 当用户调用[OH\_HiCollie\_SetTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_settimer)后，未在其自定义的任务超时时间阈值内调用[OH\_HiCollie\_CancelTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_canceltimer)，回调函数将被执行。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_SetTimer(HiCollie\_SetTimerParam param, int \*id)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_settimer) | - | 注册定时器，用于检测函数或代码块执行是否超过自定义时间。  结合OH\_HiCollie\_CancelTimer接口配套使用，应在调用耗时的函数之前使用。 |
| [void OH\_HiCollie\_CancelTimer(int id)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_canceltimer) | - | 取消定时器。  结合OH\_HiCollie\_SetTimer接口配套使用，执行函数或代码块后使用，OH\_HiCollie\_CancelTimer通过id将该任务取消；  若未在自定义时间内取消，则执行回调函数，在特定自定义超时动作下，生成故障日志。 |
| [typedef size\_t (\*OH\_HiCollie\_FreezeCallback)(OH\_HiCollie\_Freeze\_Type type, void\* buffer, size\_t size)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_freezecallback) | OH\_HiCollie\_FreezeCallback | 冻屏事件使用的回调。 |
| [void\* OH\_HiCollie\_SetFreezeCallback(OH\_HiCollie\_FreezeCallback callback)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_setfreezecallback) | - | 将冻屏回调设置进系统，系统将在冻屏事件发生时回调此函数。 |
| [HiCollie\_ErrorCode OH\_HiCollie\_AssociateProcessReport(bool isFreezeEvent)](/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_associateprocessreport) | - | 报告一个进程的冻屏事件，此时会生成APP\_HICOLLIE类型HiAppEvent事件。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### HiCollie\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum HiCollie_ErrorCode
```

**描述**

错误码定义。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| HICOLLIE\_SUCCESS = 0 | 成功。 |
| HICOLLIE\_INVALID\_ARGUMENT = 401 | 无效参数。 |
| HICOLLIE\_WRONG\_THREAD\_CONTEXT = 29800001 | 调用线程错误。 |
| HICOLLIE\_REMOTE\_FAILED = 29800002 | 远程调用错误。 |
| HICOLLIE\_INVALID\_TIMER\_NAME = 29800003 | 无效的函数执行超时检测器名称。  **起始版本：** 18 |
| HICOLLIE\_INVALID\_TIMEOUT\_VALUE = 29800004 | 无效的函数执行超时时间阈值。  **起始版本：** 18 |
| HICOLLIE\_WRONG\_PROCESS\_CONTEXT = 29800005 | 函数执行超时检测接入进程错误。  **起始版本：** 18 |
| HICOLLIE\_WRONG\_TIMER\_ID\_OUTPUT\_PARAM = 29800006 | 用于保存返回的计时器id的指针不应为NULL。  **起始版本：** 18 |
| OH\_HICOLLIE\_REACH\_REPORT\_LIMIT = 29800007 | 上报频率超过限制。  **起始版本：** 24 |

### HiCollie\_Flag

PhonePC/2in1TabletTVWearable



```
1. enum HiCollie_Flag
```

**描述**

定义函数执行超时时发生的动作。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| HICOLLIE\_FLAG\_DEFAULT = (~0) | 默认动作，生成日志及执行恢复动作。 |
| HICOLLIE\_FLAG\_NOOP = (0) | 仅执行回调函数。 |
| HICOLLIE\_FLAG\_LOG = (1 << 0) | 生成日志。 |
| HICOLLIE\_FLAG\_RECOVERY = (1 << 1) | 执行恢复动作。 |

### OH\_HiCollie\_Freeze\_Type

PhonePC/2in1TabletTVWearable



```
1. enum OH_HiCollie_Freeze_Type
```

**描述**

定义FreezeCallback返回的冻屏类型。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_THREAD\_BLOCK\_3S | 主线程超时一个周期。  **起始版本：** 24 |
| OH\_THREAD\_BLOCK\_6S | 主线程超时两个周期。  **起始版本：** 24 |
| OH\_LIFECYCLE\_HALF\_TIMEOUT | Ability生命周期超时一个周期。  **起始版本：** 24 |
| OH\_LIFECYCLE\_TIMEOUT | Ability生命周期超时两个周期。  **起始版本：** 24 |
| OH\_APP\_INPUT\_BLOCK | 输入事件超时。  **起始版本：** 24 |
| OH\_BUSINESS\_THREAD\_BLOCK\_3S | 通过[OH\_HiCollie\_Report](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_report)上报3S冻屏事件。  **起始版本：** 24 |
| OH\_BUSINESS\_THREAD\_BLOCK\_6S | 通过[OH\_HiCollie\_Report](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_report)上报6S冻屏事件。  **起始版本：** 24 |
| OH\_BUSINESS\_INPUT\_BLOCK | 通过[OH\_HiCollie\_ReportInputBlock](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_reportinputblock)上报冻屏事件。  **起始版本：** 24 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_HiCollie\_Task()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiCollie_Task)(void)
```

**描述**

在业务线程卡死检测中，通过实现该函数来检测业务线程是否卡住。

HiCollie将在业务线程中每3秒调用一次该函数。

例如：该函数可实现向业务线程发送消息，在业务线程接收到消息之后，设置一个标记，检查这个标记，确定业务线程是否卡住。

**起始版本：** 12

### OH\_HiCollie\_BeginFunc()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiCollie_BeginFunc)(const char* eventName)
```

**描述**

卡顿检测中,函数用于记录业务线程处理事件的开始时间。

由HiCollie检查事件的执行时间。如果超过预设阈值，上报jank事件。

该函数在每个事件处理前插入。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* eventName | 业务线程处理事件的名字。 |

### OH\_HiCollie\_EndFunc()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiCollie_EndFunc)(const char* eventName)
```

**描述**

卡顿检测中, 该函数用于检测业务线程处理事件是否卡顿。

由HiCollie检查事件的执行时间。如果超过预设阈值，上报jank事件。

该函数在每个事件处理后插入。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| const char\* eventName | 业务线程处理事件的名字。 |

### OH\_HiCollie\_Init\_StuckDetection()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_Init_StuckDetection(OH_HiCollie_Task task)
```

**描述**

注册应用业务线程卡死的周期性检测任务。用户实现回调函数, 用于定时检测业务线程卡死情况。

默认检测时间：3s上报BUSSINESS\_THREAD\_BLOCK\_3S告警事件，6s上报BUSSINESS\_THREAD\_BLOCK\_6S卡死事件。

说明

* 在非主线程使用该接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_HiCollie\_Task](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_task) task | 每3秒执行一次的周期性检测任务，用于检测业务线程是否卡住。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_WRONG\_THREAD\_CONTEXT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800001 - 调用线程错误。仅能在非主线程中调用该函数。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_Init\_StuckDetectionWithTimeout()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_Init_StuckDetectionWithTimeout(OH_HiCollie_Task task, uint32_t stuckTimeout)
```

**描述**

注册应用业务线程卡死的周期性检测任务。用户实现回调函数, 用于定时检测业务线程卡死情况。

开发者可以设置卡死检测时间，可设置的时间范围：[3, 15]，单位：秒。

说明

* 在非主线程使用该接口。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_HiCollie\_Task](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_task) task | 每stuckTimeout时间执行一次的周期性检测任务，用于检测业务线程是否卡住。 |
| uint32\_t stuckTimeout | 检测业务线程卡死时间。任务执行超过stuckTimeout时间上报卡死告警事件；任务超过stuckTimeout \* 2时间上报卡死事件。  单位：s。规定：最大值15s，最小值3s。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_INVALID\_ARGUMENT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 401 - 卡死检测时间设置错误。  [HICOLLIE\_WRONG\_THREAD\_CONTEXT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800001 - 调用线程错误。仅能在非主线程中调用该函数。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_Init\_JankDetection()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_Init_JankDetection(OH_HiCollie_BeginFunc* beginFunc, OH_HiCollie_EndFunc* endFunc, HiCollie_DetectionParam param)
```

**描述**

注册应用业务线程卡顿检测的回调函数。

线程卡顿监控功能需要开发者实现两个卡顿检测回调函数, 分别放在业务线程处理事件的前后。作为插桩函数，监控业务线程处理事件执行情况。

说明

* 在非主线程使用该接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_HiCollie\_BeginFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_beginfunc)\* beginFunc | 检测业务线程处理事件前的函数。 |
| [OH\_HiCollie\_EndFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_endfunc)\* endFunc | 检测业务线程处理事件后的函数。 |
| [HiCollie\_DetectionParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-hicollie-detectionparam) param | 扩展参数以供将来使用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_INVALID\_ARGUMENT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 401 - 开始函数和结束函数两者都必须有值或为空，否则将返回该错误值。  [HICOLLIE\_WRONG\_THREAD\_CONTEXT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800001 - 调用线程错误。仅能在非主线程中调用该函数。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_Report()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_Report(bool* isSixSecond)
```

**描述**

上报应用业务线程卡死事件，生成卡死故障日志，辅助定位应用卡死问题。

先调用OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口，初始化检测的task；

如果task任务超时，结合业务逻辑，调用OH\_HiCollie\_Report接口上报卡死事件。

说明

* 在非主线程使用该接口。
* 该接口仅对[release版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#release版本应用)生效，对[debug版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#debug版本应用)不生效。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| bool\* isSixSecond | 布尔指针。布尔指针的值。如果卡住6秒，则为真。如果卡住3秒，则为False。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_INVALID\_ARGUMENT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 401 - 开始函数和结束函数两者都必须有值或为空，否则将返回该错误值。  [HICOLLIE\_WRONG\_THREAD\_CONTEXT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800001 - 调用线程错误。仅能在非主线程中调用该函数。  [HICOLLIE\_REMOTE\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800002 - 远程调用错误。请求IPC远程服务失败。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_ReportInputBlock()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_ReportInputBlock()
```

**描述**

上报应用输入无响应事件，生成卡死故障日志，辅助定位应用卡死问题。如果在PC或平板设备上，还会弹窗提示用户继续等待或关闭应用，其他设备不会弹窗。建议如下两种方式使用该接口。

方式一（推荐）：配合OH\_HiCollie\_Report、OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口使用，业务线程通过上述接口周期性检测自身卡死情况，当满足业务线程卡死且有输入事件（如屏幕点击、鼠标点击、键盘输入等）条件时再调用OH\_HiCollie\_ReportInputBlock接口。

方式二：业务线程不通过OH\_HiCollie\_Report、OH\_HiCollie\_Init\_StuckDetection或OH\_HiCollie\_Init\_StuckDetectionWithTimeout接口也能检测自身卡死情况，则应用结合业务线程卡死情况和输入事件再调用OH\_HiCollie\_ReportInputBlock接口。

说明

* 该接口可以在主线程使用，比如输入事件需要先经过主线程再封装传递给业务线程处理，业务线程卡死时维护一个状态标志位，主线程结合业务线程的卡死状态标志位和输入事件再调用该接口。
* 该接口仅对[release版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#release版本应用)生效，对[debug版本应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/performance-analysis-kit-terminology#debug版本应用)不生效。

**起始版本：** 24

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_REMOTE\_FAILED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800002 - 远程调用错误。请求IPC远程服务失败。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_Callback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_HiCollie_Callback)(void*)
```

**描述**

当用户调用[OH\_HiCollie\_SetTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_settimer)后，未在其自定义的任务超时时间阈值内调用[OH\_HiCollie\_CancelTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_canceltimer)，回调函数将被执行。

**起始版本：** 18

### OH\_HiCollie\_SetTimer()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_SetTimer(HiCollie_SetTimerParam param, int *id)
```

**描述**

注册定时器，用于检测函数或代码块执行是否超过自定义时间。

结合OH\_HiCollie\_CancelTimer接口配套使用，应在调用耗时的函数之前使用。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [HiCollie\_SetTimerParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-hicollie-settimerparam) param | 定义输入参数。 |
| int \*id | 返回的计时器id的指针不应为NULL。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | [HICOLLIE\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 0 - 成功。  [HICOLLIE\_INVALID\_TIMER\_NAME](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800003 - 无效的计时器名称，不应为NULL或空字符串。  [HICOLLIE\_INVALID\_TIMEOUT\_VALUE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800004 - 无效的超时值。  [HICOLLIE\_WRONG\_PROCESS\_CONTEXT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800005 - 无效的接入检测进程上下文，appspawn与nativespawn进程中不可调用。  [HICOLLIE\_WRONG\_TIMER\_ID\_OUTPUT\_PARAM](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) 29800006 - 用于保存返回的计时器id的指针，不应该为NULL。  具体可参考[HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode)。 |

### OH\_HiCollie\_CancelTimer()

PhonePC/2in1TabletTVWearable



```
1. void OH_HiCollie_CancelTimer(int id)
```

**描述**

取消定时器。

结合OH\_HiCollie\_SetTimer接口配套使用，执行函数或代码块后使用，OH\_HiCollie\_CancelTimer通过id将该任务取消；

若未在自定义时间内取消，则执行回调函数，在特定自定义超时动作下，生成故障日志。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int id | 执行[OH\_HiCollie\_SetTimer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_settimer)函数后更新的计时器id。 |

### OH\_HiCollie\_FreezeCallback()

PhonePC/2in1TabletTVWearable



```
1. typedef size_t (*OH_HiCollie_FreezeCallback)(OH_HiCollie_Freeze_Type type, void* buffer, size_t size)
```

**描述**

冻屏事件使用的回调[OH\_HiCollie\_SetFreezeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_setfreezecallback)。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| OH\_HiCollie\_Freeze\_Type type | 冻屏事件类型。 |
| void\* buffer | 系统提供log buffer，其中的内容将被迁移到APP\_FREEZE或APP\_HICOLLIE事件当中。 |
| size\_t size | 可以使用的缓冲区大小，最大值为64KB。 如果超过上限，可能导致应用crash。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| size\_t | 已使用的缓冲区大小，单位字节。 |

注意

返回值超过64KB时，日志内容可能为空。

### OH\_HiCollie\_SetFreezeCallback()

PhonePC/2in1TabletTVWearable



```
1. void* OH_HiCollie_SetFreezeCallback(OH_HiCollie_FreezeCallback callback)
```

**描述**

将冻屏回调设置进系统，系统将在冻屏事件发生时回调此函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_HiCollie\_FreezeCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#oh_hicollie_freezecallback) callback | 回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| void\* | 本进程内上次传入的回调函数。 |

### OH\_HiCollie\_AssociateProcessReport()

PhonePC/2in1TabletTVWearable



```
1. HiCollie_ErrorCode OH_HiCollie_AssociateProcessReport(bool isFreezeEvent)
```

**描述**

报告一个进程的冻屏事件，此时会生成APP\_HICOLLIE类型HiAppEvent事件。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| bool isFreezeEvent | 上报事件类型。true：上报6S冻屏事件。false：上报3S冻屏事件。 |

说明

BUSINESS\_THREAD\_BLOCK\_3S、BUSINESS\_THREAD\_BLOCK\_6S等同于BUSSINESS\_THREAD\_BLOCK\_3S、BUSSINESS\_THREAD\_BLOCK\_6S。

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [HiCollie\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hicollie-h#hicollie_errorcode) | HICOLLIE\_SUCCESS：0 - 成功。  OH\_HICOLLIE\_REACH\_REPORT\_LIMIT：29800007 - 上报频率过高。 |

说明

1分钟内最多上报1次。