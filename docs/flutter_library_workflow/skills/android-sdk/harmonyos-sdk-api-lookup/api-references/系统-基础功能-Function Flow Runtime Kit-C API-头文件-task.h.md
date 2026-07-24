## 概述

PhonePC/2in1TabletTVWearable

声明任务的C接口。

**引用文件：** <ffrt/task.h>

**库：** libffrt.z.so

**系统能力：** SystemCapability.Resourceschedule.Ffrt.Core

**起始版本：** 10

**相关模块：** [FFRT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [FFRT\_C\_API int ffrt\_task\_attr\_init(ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_init) | 初始化任务属性。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_set\_name(ffrt\_task\_attr\_t\* attr, const char\* name)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_set_name) | 设置任务名字。 |
| [FFRT\_C\_API const char\* ffrt\_task\_attr\_get\_name(const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_get_name) | 获取任务名字。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_destroy(ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_destroy) | 销毁任务属性。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_set\_qos(ffrt\_task\_attr\_t\* attr, ffrt\_qos\_t qos)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_set_qos) | 设置任务QoS。 |
| [FFRT\_C\_API ffrt\_qos\_t ffrt\_task\_attr\_get\_qos(const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_get_qos) | 获取任务QoS。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_set\_delay(ffrt\_task\_attr\_t\* attr, uint64\_t delay\_us)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_set_delay) | 设置任务延迟时间。  设置任务的调度延迟后，任务的输入输出依赖关系不再生效。 |
| [FFRT\_C\_API uint64\_t ffrt\_task\_attr\_get\_delay(const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_get_delay) | 获取任务延迟时间。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_set\_queue\_priority(ffrt\_task\_attr\_t\* attr, ffrt\_queue\_priority\_t priority)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_set_queue_priority) | 设置并行队列任务优先级。 |
| [FFRT\_C\_API ffrt\_queue\_priority\_t ffrt\_task\_attr\_get\_queue\_priority(const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_get_queue_priority) | 获取并行队列任务优先级。 |
| [FFRT\_C\_API void ffrt\_task\_attr\_set\_stack\_size(ffrt\_task\_attr\_t\* attr, uint64\_t size)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_set_stack_size) | 设置任务栈大小。 |
| [FFRT\_C\_API uint64\_t ffrt\_task\_attr\_get\_stack\_size(const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_attr_get_stack_size) | 获取任务栈大小。 |
| [FFRT\_C\_API int ffrt\_this\_task\_update\_qos(ffrt\_qos\_t qos)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_this_task_update_qos) | 更新任务QoS。 |
| [FFRT\_C\_API ffrt\_qos\_t ffrt\_this\_task\_get\_qos(void)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_this_task_get_qos) | 获取任务QoS。 |
| [FFRT\_C\_API uint64\_t ffrt\_this\_task\_get\_id(void)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_this_task_get_id) | 获取任务id。 |
| [FFRT\_C\_API void \*ffrt\_alloc\_auto\_managed\_function\_storage\_base(ffrt\_function\_kind\_t kind)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_alloc_auto_managed_function_storage_base) | 申请函数执行结构的内存。 |
| [FFRT\_C\_API void ffrt\_submit\_base(ffrt\_function\_header\_t\* f, const ffrt\_deps\_t\* in\_deps, const ffrt\_deps\_t\* out\_deps, const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_base) | 提交任务调度执行。 |
| [FFRT\_C\_API ffrt\_task\_handle\_t ffrt\_submit\_h\_base(ffrt\_function\_header\_t\* f, const ffrt\_deps\_t\* in\_deps, const ffrt\_deps\_t\* out\_deps, const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_h_base) | 提交任务调度执行并返回任务句柄。 |
| [FFRT\_C\_API void ffrt\_submit\_f(ffrt\_function\_t func, void\* arg, const ffrt\_deps\_t\* in\_deps, const ffrt\_deps\_t\* out\_deps, const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_f) | 提交任务调度执行，是ffrt\_submit\_base接口的简化包装形式。该接口假定任务不需要销毁回调函数，给定的任务函数和参数被包装为通用任务结构，并将封装后的任务结构和其他参数传递给ffrt\_submit\_base接口。 |
| [FFRT\_C\_API ffrt\_task\_handle\_t ffrt\_submit\_h\_f(ffrt\_function\_t func, void\* arg, const ffrt\_deps\_t\* in\_deps, const ffrt\_deps\_t\* out\_deps, const ffrt\_task\_attr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_h_f) | 提交任务调度执行并返回任务句柄，是ffrt\_submit\_h\_base接口的简化包装形式。该接口假定任务不需要销毁回调函数，给定的任务函数和参数被包装为通用任务结构，并将封装后的任务结构和其他参数传递给ffrt\_submit\_h\_base接口。 |
| [FFRT\_C\_API uint32\_t ffrt\_task\_handle\_inc\_ref(ffrt\_task\_handle\_t handle)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_handle_inc_ref) | 增加任务句柄的引用数。 |
| [FFRT\_C\_API uint32\_t ffrt\_task\_handle\_dec\_ref(ffrt\_task\_handle\_t handle)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_handle_dec_ref) | 减少任务句柄的引用计数。 |
| [FFRT\_C\_API void ffrt\_task\_handle\_destroy(ffrt\_task\_handle\_t handle)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_task_handle_destroy) | 销毁任务句柄。 |
| [FFRT\_C\_API void ffrt\_wait\_deps(const ffrt\_deps\_t\* deps)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_wait_deps) | 等待依赖的任务完成，当前任务开始执行。 |
| [FFRT\_C\_API void ffrt\_wait(void)](/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_wait) | 等待之前所有提交任务完成，当前任务开始执行。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### ffrt\_task\_attr\_init()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_task_attr_init(ffrt_task_attr_t* attr)
```

**描述**

初始化任务属性。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 初始化任务属性成功返回0，  初始化任务属性失败返回-1。 |

### ffrt\_task\_attr\_set\_name()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_set_name(ffrt_task_attr_t* attr, const char* name)
```

**描述**

设置任务名字。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |
| const char\* name | 任务名字。 |

### ffrt\_task\_attr\_get\_name()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API const char* ffrt_task_attr_get_name(const ffrt_task_attr_t* attr)
```

**描述**

获取任务名字。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API const char\* | 获取任务名字成功返回非空指针，  获取任务名字失败返回空指针。 |

### ffrt\_task\_attr\_destroy()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_destroy(ffrt_task_attr_t* attr)
```

**描述**

销毁任务属性。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

### ffrt\_task\_attr\_set\_qos()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_set_qos(ffrt_task_attr_t* attr, ffrt_qos_t qos)
```

**描述**

设置任务QoS。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |
| [ffrt\_qos\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#变量) qos | 任务QoS。 |

### ffrt\_task\_attr\_get\_qos()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API ffrt_qos_t ffrt_task_attr_get_qos(const ffrt_task_attr_t* attr)
```

**描述**

获取任务QoS。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API [ffrt\_qos\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#变量) | 返回任务的QoS，默认返回ffrt\_qos\_default。 |

### ffrt\_task\_attr\_set\_delay()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_set_delay(ffrt_task_attr_t* attr, uint64_t delay_us)
```

**描述**

设置任务延迟时间。

设置任务的调度延迟后，任务的输入输出依赖关系不再生效。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |
| uint64\_t delay\_us | 任务延迟时间，单位微秒。 |

### ffrt\_task\_attr\_get\_delay()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API uint64_t ffrt_task_attr_get_delay(const ffrt_task_attr_t* attr)
```

**描述**

获取任务延迟时间。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API uint64\_t | 返回任务的延迟时间。 |

### ffrt\_task\_attr\_set\_queue\_priority()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_set_queue_priority(ffrt_task_attr_t* attr, ffrt_queue_priority_t priority)
```

**描述**

设置并行队列任务优先级。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |
| [ffrt\_queue\_priority\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#ffrt_queue_priority_t) priority | 任务优先级。 |

### ffrt\_task\_attr\_get\_queue\_priority()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API ffrt_queue_priority_t ffrt_task_attr_get_queue_priority(const ffrt_task_attr_t* attr)
```

**描述**

获取并行队列任务优先级。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API [ffrt\_queue\_priority\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#ffrt_queue_priority_t) | 返回任务优先级。 |

### ffrt\_task\_attr\_set\_stack\_size()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_attr_set_stack_size(ffrt_task_attr_t* attr, uint64_t size)
```

**描述**

设置任务栈大小。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |
| uint64\_t size | 任务栈大小，单位是字节。 |

### ffrt\_task\_attr\_get\_stack\_size()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API uint64_t ffrt_task_attr_get_stack_size(const ffrt_task_attr_t* attr)
```

**描述**

获取任务栈大小。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API uint64\_t | 返回任务栈大小，单位是字节。 |

### ffrt\_this\_task\_update\_qos()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_this_task_update_qos(ffrt_qos_t qos)
```

**描述**

更新任务QoS。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_qos\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#变量) qos | 当前任务待更新的QoS。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 更新任务QoS成功返回0，  更新任务QoS失败返回-1。 |

### ffrt\_this\_task\_get\_qos()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API ffrt_qos_t ffrt_this_task_get_qos(void)
```

**描述**

获取任务QoS。

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API [ffrt\_qos\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#变量) | 返回任务QoS。 |

### ffrt\_this\_task\_get\_id()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API uint64_t ffrt_this_task_get_id(void)
```

**描述**

获取任务id。

**起始版本：** 10

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API uint64\_t | 返回当前任务的id。 |

### ffrt\_alloc\_auto\_managed\_function\_storage\_base()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void *ffrt_alloc_auto_managed_function_storage_base(ffrt_function_kind_t kind)
```

**描述**

申请函数执行结构的内存。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_function\_kind\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#ffrt_function_kind_t) kind | 函数执行结构类型，支持通用和队列函数执行结构类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API void \* | 申请函数执行结构成功返回非空指针，  申请函数执行结构失败返回空指针。 |

### ffrt\_submit\_base()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_submit_base(ffrt_function_header_t* f, const ffrt_deps_t* in_deps, const ffrt_deps_t* out_deps, const ffrt_task_attr_t* attr)
```

**描述**

提交任务调度执行。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_function\_header\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-function-header-t)\* f | 任务执行体封装的指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* in\_deps | 输入依赖指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* out\_deps | 输出依赖指针。 |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性。 |

### ffrt\_submit\_h\_base()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API ffrt_task_handle_t ffrt_submit_h_base(ffrt_function_header_t* f, const ffrt_deps_t* in_deps, const ffrt_deps_t* out_deps, const ffrt_task_attr_t* attr)
```

**描述**

提交任务调度执行并返回任务句柄。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_function\_header\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-function-header-t)\* f | 任务执行体封装的指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* in\_deps | 输入依赖指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* out\_deps | 输出依赖指针。 |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API [ffrt\_task\_handle\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-handle-t) | 提交任务成功返回非空任务句柄，  提交任务失败返回空指针。 |

### ffrt\_submit\_f()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_submit_f(ffrt_function_t func, void* arg, const ffrt_deps_t* in_deps, const ffrt_deps_t* out_deps, const ffrt_task_attr_t* attr)
```

**描述**

提交任务调度执行，是ffrt\_submit\_base接口的简化包装形式。该接口假定任务不需要销毁回调函数，给定的任务函数和参数被包装为通用任务结构，并将封装后的任务结构和其他参数传递给ffrt\_submit\_base接口。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_function\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#ffrt_function_t) func | 指定的任务函数。 |
| void\* arg | 传递给任务函数的参数。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* in\_deps | 输入依赖指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* out\_deps | 输出依赖指针。 |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性。 |

**参考：**

[ffrt\_submit\_base](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_base)

### ffrt\_submit\_h\_f()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API ffrt_task_handle_t ffrt_submit_h_f(ffrt_function_t func, void* arg, const ffrt_deps_t* in_deps, const ffrt_deps_t* out_deps, const ffrt_task_attr_t* attr)
```

**描述**

提交任务调度执行并返回任务句柄，是ffrt\_submit\_h\_base接口的简化包装形式。该接口假定任务不需要销毁回调函数，给定的任务函数和参数被包装为通用任务结构，并将封装后的任务结构和其他参数传递给ffrt\_submit\_h\_base接口。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_function\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-type-def-h#ffrt_function_t) func | 指定的任务函数。 |
| void\* arg | 传递给任务函数的参数。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* in\_deps | 输入依赖指针。 |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* out\_deps | 输出依赖指针。 |
| [const ffrt\_task\_attr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-attr-t)\* attr | 任务属性。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API [ffrt\_task\_handle\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-handle-t) | 提交任务成功返回非空任务句柄，  提交任务失败返回空指针。 |

**参考：**

[ffrt\_submit\_h\_base](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-task-h#ffrt_submit_h_base)

### ffrt\_task\_handle\_inc\_ref()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API uint32_t ffrt_task_handle_inc_ref(ffrt_task_handle_t handle)
```

**描述**

增加任务句柄的引用数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_handle\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-handle-t) handle | 任务句柄。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API uint32\_t | 返回任务句柄原始引用计数。 |

### ffrt\_task\_handle\_dec\_ref()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API uint32_t ffrt_task_handle_dec_ref(ffrt_task_handle_t handle)
```

**描述**

减少任务句柄的引用计数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_handle\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-handle-t) handle | 任务句柄。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API uint32\_t | 返回任务句柄原始引用计数。 |

### ffrt\_task\_handle\_destroy()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_task_handle_destroy(ffrt_task_handle_t handle)
```

**描述**

销毁任务句柄。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_task\_handle\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-task-handle-t) handle | 任务句柄。 |

### ffrt\_wait\_deps()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_wait_deps(const ffrt_deps_t* deps)
```

**描述**

等待依赖的任务完成，当前任务开始执行。

**起始版本：** 10

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [const ffrt\_deps\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-deps-t)\* deps | 依赖的指针。 |

### ffrt\_wait()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API void ffrt_wait(void)
```

**描述**

等待之前所有提交任务完成，当前任务开始执行。

**起始版本：** 10