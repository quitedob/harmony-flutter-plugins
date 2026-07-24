## 概述

PhonePC/2in1TabletTVWearable

声明rwlock的C接口。

**引用文件：** <ffrt/shared\_mutex.h>

**库：** libffrt.z.so

**系统能力：** SystemCapability.Resourceschedule.Ffrt.Core

**起始版本：** 18

**相关模块：** [FFRT](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt)

## 汇总

PhonePC/2in1TabletTVWearable

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [FFRT\_C\_API int ffrt\_rwlock\_init(ffrt\_rwlock\_t\* rwlock, const ffrt\_rwlockattr\_t\* attr)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_init) | 初始化rwlock。 |
| [FFRT\_C\_API int ffrt\_rwlock\_wrlock(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_wrlock) | 获取写锁。 |
| [FFRT\_C\_API int ffrt\_rwlock\_trywrlock(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_trywrlock) | 尝试获取写锁。 |
| [FFRT\_C\_API int ffrt\_rwlock\_rdlock(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_rdlock) | 获取读锁。 |
| [FFRT\_C\_API int ffrt\_rwlock\_tryrdlock(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_tryrdlock) | 尝试获取读锁。 |
| [FFRT\_C\_API int ffrt\_rwlock\_unlock(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_unlock) | 释放rwlock。 |
| [FFRT\_C\_API int ffrt\_rwlock\_destroy(ffrt\_rwlock\_t\* rwlock)](/consumer/cn/doc/harmonyos-references/capi-shared-mutex-h#ffrt_rwlock_destroy) | 销毁rwlock。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### ffrt\_rwlock\_init()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_init(ffrt_rwlock_t* rwlock, const ffrt_rwlockattr_t* attr)
```

**描述**

初始化rwlock。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |
| [const ffrt\_rwlockattr\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlockattr-t)\* attr | rwlock属性指针，仅支持默认，即设定为空指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | rwlock不为空，且attr为空则初始化成功，返回ffrt\_success，  反之初始化rwlock失败，返回ffrt\_error\_inval。 |

### ffrt\_rwlock\_wrlock()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_wrlock(ffrt_rwlock_t* rwlock)
```

**描述**

获取写锁。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 获取写锁成功返回ffrt\_success，  获取写锁失败返回ffrt\_error\_inval或者阻塞当前任务。 |

### ffrt\_rwlock\_trywrlock()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_trywrlock(ffrt_rwlock_t* rwlock)
```

**描述**

尝试获取写锁。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 获取写锁成功返回ffrt\_success，  获取写锁失败返回ffrt\_error\_inval或ffrt\_error\_busy。 |

### ffrt\_rwlock\_rdlock()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_rdlock(ffrt_rwlock_t* rwlock)
```

**描述**

获取读锁。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 获取读锁成功返回ffrt\_success，  获取读锁失败返回ffrt\_error\_inval或者阻塞当前任务。 |

### ffrt\_rwlock\_tryrdlock()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_tryrdlock(ffrt_rwlock_t* rwlock)
```

**描述**

尝试获取读锁。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 获取读锁成功返回ffrt\_success，  获取读锁失败返回ffrt\_error\_inval或ffrt\_error\_busy。 |

### ffrt\_rwlock\_unlock()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_unlock(ffrt_rwlock_t* rwlock)
```

**描述**

释放rwlock。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 释放rwlock成功返回ffrt\_success，  释放rwlock失败返回ffrt\_error\_inval。 |

### ffrt\_rwlock\_destroy()

PhonePC/2in1TabletTVWearable



```
1. FFRT_C_API int ffrt_rwlock_destroy(ffrt_rwlock_t* rwlock)
```

**描述**

销毁rwlock。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ffrt\_rwlock\_t](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ffrt-ffrt-rwlock-t)\* rwlock | rwlock指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| FFRT\_C\_API int | 销毁rwlock成功返回ffrt\_success，  销毁rwlock失败返回ffrt\_error\_inval。 |