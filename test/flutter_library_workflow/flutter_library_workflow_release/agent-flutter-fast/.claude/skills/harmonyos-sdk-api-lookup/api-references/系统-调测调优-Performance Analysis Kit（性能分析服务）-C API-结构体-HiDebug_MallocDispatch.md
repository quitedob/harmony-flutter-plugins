

```
1. typedef struct HiDebug_MallocDispatch {...} HiDebug_MallocDispatch
```

## 概述

PhonePC/2in1TabletTVWearable

应用程序进程可替换/恢复的HiDebug\_MallocDispatch表结构类型定义。

**起始版本：** 20

**相关模块：** [HiDebug](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug)

**所在头文件：** [hidebug\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-hidebug-type-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [void\* (\*malloc)(size\_t)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#malloc) | 开发者自定义malloc函数指针。 |
| [void\* (\*calloc)(size\_t, size\_t)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#calloc) | 开发者自定义calloc函数指针。 |
| [void\* (\*realloc)(void\*, size\_t)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#realloc) | 开发者自定义realloc函数指针。 |
| [void (\*free)(void\*)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#free) | 开发者自定义free函数指针。 |
| [void\* (\*mmap)(void\*, size\_t, int, int, int, off\_t)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#mmap) | 开发者自定义mmap函数指针。 |
| [int (\*munmap)(void\*, size\_t)](/consumer/cn/doc/harmonyos-references/capi-hidebug-hidebug-mallocdispatch#munmap) | 开发者自定义munmap函数指针。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### malloc()

PhonePC/2in1TabletTVWearable



```
1. void* (*malloc)(size_t)
```

**描述**

开发者自定义malloc函数指针。

### calloc()

PhonePC/2in1TabletTVWearable



```
1. void* (*calloc)(size_t, size_t)
```

**描述**

开发者自定义calloc函数指针。

### realloc()

PhonePC/2in1TabletTVWearable



```
1. void* (*realloc)(void*, size_t)
```

**描述**

开发者自定义realloc函数指针。

### free()

PhonePC/2in1TabletTVWearable



```
1. void (*free)(void*)
```

**描述**

开发者自定义free函数指针。

### mmap()

PhonePC/2in1TabletTVWearable



```
1. void* (*mmap)(void*, size_t, int, int, int, off_t)
```

**描述**

开发者自定义mmap函数指针。

### munmap()

PhonePC/2in1TabletTVWearable



```
1. int (*munmap)(void*, size_t)
```

**描述**

开发者自定义munmap函数指针。