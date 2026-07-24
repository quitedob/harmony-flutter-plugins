## 概述

PhonePC/2in1TabletTVWearable

声明了媒体数据结构AVMemory的定义。

**引用文件：** <multimedia/player\_framework/native\_avmemory.h>

**库：** libnative\_media\_core.so

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 9

**相关模块：** [Core](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) | OH\_AVMemory | 为音视频内存接口定义native层对象。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AVMemory \*OH\_AVMemory\_Create(int32\_t size)](/consumer/cn/doc/harmonyos-references/capi-native-avmemory-h#oh_avmemory_create) | 创建OH\_AVMemory实例的指针。 |
| [uint8\_t \*OH\_AVMemory\_GetAddr(struct OH\_AVMemory \*mem)](/consumer/cn/doc/harmonyos-references/capi-native-avmemory-h#oh_avmemory_getaddr) | 获取内存虚拟地址。 |
| [int32\_t OH\_AVMemory\_GetSize(struct OH\_AVMemory \*mem)](/consumer/cn/doc/harmonyos-references/capi-native-avmemory-h#oh_avmemory_getsize) | 获取内存长度。 |
| [OH\_AVErrCode OH\_AVMemory\_Destroy(struct OH\_AVMemory \*mem)](/consumer/cn/doc/harmonyos-references/capi-native-avmemory-h#oh_avmemory_destroy) | 释放OH\_AVMemory实例指针的资源。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AVMemory\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_AVMemory *OH_AVMemory_Create(int32_t size)
```

**描述**

创建OH\_AVMemory实例的指针。

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 10

**废弃版本：** 11

**替代接口：** [OH\_AVBuffer\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avbuffer-h#oh_avbuffer_create)

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int32\_t size | 创建内存的大小，单位字节。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) \* | 如果创建成功，返回OH\_AVMemory实例的指针，如果失败，返回NULL。  使用结束后需要通过OH\_AVMemory\_Destroy释放内存。  可能的失败原因：  1. size <= 0。  2. 创建OH\_AVMemory失败。  3. OH\_AVMemory内存分配失败。 |

### OH\_AVMemory\_GetAddr()

PhonePC/2in1TabletTVWearable



```
1. uint8_t *OH_AVMemory_GetAddr(struct OH_AVMemory *mem)
```

**描述**

获取内存虚拟地址。

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 9

**废弃版本：** 11

**替代接口：** [OH\_AVBuffer\_GetAddr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avbuffer-h#oh_avbuffer_getaddr)

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) \*mem | 指向OH\_AVMemory实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint8\_t \* | 如果内存有效，返回内存的虚拟地址，如果内存无效，返回NULL。  可能的失败原因：  1. 输入mem为空指针。  2. 输入mem参数结构校验失败。  3. 输入mem中内存为空指针。 |

### OH\_AVMemory\_GetSize()

PhonePC/2in1TabletTVWearable



```
1. int32_t OH_AVMemory_GetSize(struct OH_AVMemory *mem)
```

**描述**

获取内存长度。

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 9

**废弃版本：** 11

**替代接口：** [OH\_AVBuffer\_GetCapacity](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avbuffer-h#oh_avbuffer_getcapacity)

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) \*mem | 指向OH\_AVMemory实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 如果内存有效，返回内存长度，如果内存无效，返回-1。  可能的失败原因：  1. 输入mem为空指针。  2. 输入mem参数结构校验失败。  3. 输入mem中内存为空指针。 |

### OH\_AVMemory\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. OH_AVErrCode OH_AVMemory_Destroy(struct OH_AVMemory *mem)
```

**描述**

释放OH\_AVMemory实例指针的资源。

**系统能力：** SystemCapability.Multimedia.Media.Core

**起始版本：** 10

**废弃版本：** 11

**替代接口：** [OH\_AVBuffer\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-avbuffer-h#oh_avbuffer_destroy)

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [struct OH\_AVMemory](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-core-oh-avmemory) \*mem | 指向OH\_AVMemory实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AVErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-averrors-h#oh_averrcode) | AV\_ERR\_OK：释放成功。  AV\_ERR\_INVALID\_VAL：  1. 输入mem为空指针。  2. 输入mem参数结构校验失败。  3. 输入mem不是开发者创建的。 |