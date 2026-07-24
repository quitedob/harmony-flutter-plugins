## 概述

PhonePC/2in1TabletTVWearable

定义事件打点配置函数的所有配置项名称。如果开发者想要对应用事件打点功能进行配置，可以直接使用配置项常量。

**引用文件：** <hiappevent/hiappevent\_cfg.h>

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
| [DISABLE](/consumer/cn/doc/harmonyos-references/capi-hiappevent-cfg-h#disable) "disable" | 事件打点开关。默认值为false。true：关闭打点功能，false：不关闭打点功能。  **起始版本：** 8 |
| [MAX\_STORAGE](/consumer/cn/doc/harmonyos-references/capi-hiappevent-cfg-h#max_storage) "max\_storage" | 事件文件目录存储配额大小。默认值为“10M”。  **起始版本：** 8 |

## 宏定义说明

PhonePC/2in1TabletTVWearable

### DISABLE

PhonePC/2in1TabletTVWearable



```
1. #define DISABLE "disable"
```

**描述**

事件打点开关。默认值为false。true：关闭打点功能，false：不关闭打点功能。

**起始版本：** 8

### MAX\_STORAGE

PhonePC/2in1TabletTVWearable



```
1. #define MAX_STORAGE "max_storage"
```

**描述**

事件文件目录存储配额大小。默认值为“10M”。

**起始版本：** 8