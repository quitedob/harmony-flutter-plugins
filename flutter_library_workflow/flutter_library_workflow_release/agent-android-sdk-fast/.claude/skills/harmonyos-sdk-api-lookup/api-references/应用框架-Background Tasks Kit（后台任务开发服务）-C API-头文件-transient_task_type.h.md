## 概述

PhonePC/2in1TabletTVWearable

定义短时任务的错误码和结构体。

**引用文件：** <transient\_task/transient\_task\_type.h>

**库：** libtransient\_task.so

**系统能力：** SystemCapability.ResourceSchedule.BackgroundTaskManager.TransientTask

**起始版本：** 11

**相关模块：** [TransientTask](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-transienttask)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [TransientTask\_DelaySuspendInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-transienttask-transienttask-delaysuspendinfo) | TransientTask\_DelaySuspendInfo | 定义短时任务返回信息结构体。用于返回当前短时任务的任务ID和剩余时间。 |
| [TransientTask\_TransientTaskInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-transienttask-transienttask-transienttaskinfo) | TransientTask\_TransientTaskInfo | 定义所有短时任务信息结构体。用于返回当日剩余总配额和已申请的所有短时任务信息。 |

### 宏定义

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| TRANSIENT\_TASK\_MAX\_NUM 3 | 同一时刻最大短时任务数量。  **起始版本：** 20 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [TransientTask\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-transient-task-type-h#transienttask_errorcode) | TransientTask\_ErrorCode | 定义短时任务错误码。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*TransientTask\_Callback)(void)](/consumer/cn/doc/harmonyos-references/capi-transient-task-type-h#transienttask_callback) | TransientTask\_Callback | 定义短时任务超时回调类型。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### TransientTask\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum TransientTask_ErrorCode
```

**描述**

定义短时任务错误码。

**起始版本：** 13

展开

| 枚举项 | 描述 |
| --- | --- |
| ERR\_TRANSIENT\_TASK\_OK = 0 | 成功。 |
| ERR\_TRANSIENT\_TASK\_INVALID\_PARAM = 401 | 参数检查失败。可能原因：1.必选参数没有传入。2.参数类型错误。 |
| ERR\_TRANSIENT\_TASK\_PARCEL\_FAILED = 9800002 | Parcel读写操作失败。 |
| ERR\_TRANSIENT\_TASK\_TRANSACTION\_FAILED = 9800003 | IPC通信失败。 |
| ERR\_TRANSIENT\_TASK\_SYS\_NOT\_READY = 9800004 | 系统服务失败。 |
| ERR\_TRANSIENT\_TASK\_CLIENT\_INFO\_VERIFICATION\_FAILED = 9900001 | 短时任务客户端信息校验失败。 |
| ERR\_TRANSIENT\_TASK\_SERVICE\_VERIFICATION\_FAILED = 9900002 | 短时任务服务端校验失败。 |
| ERR\_TRANSIENT\_TASK\_PARCELABLE\_FAILED = 9900003 | 短时任务Parcel读写操作失败。可能原因：1.参数非法。2.申请内存失败。 |
| ERR\_TRANSIENT\_TASK\_SERVICE\_NOT\_READY = 9900004 | 短时任务系统服务失败。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### TransientTask\_Callback()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*TransientTask_Callback)(void)
```

**描述**

定义短时任务超时回调类型。

**起始版本：** 13