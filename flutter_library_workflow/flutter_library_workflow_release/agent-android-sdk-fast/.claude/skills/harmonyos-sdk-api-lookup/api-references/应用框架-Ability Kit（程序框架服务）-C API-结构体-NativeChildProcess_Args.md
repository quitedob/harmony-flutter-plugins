

```
1. typedef struct {...} NativeChildProcess_Args
```

## 概述

PhonePC/2in1TabletTVWearable

传递给子进程的参数。

**起始版本：** 13

**相关模块：** [ChildProcess](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-childprocess)

**所在头文件：** [native\_child\_process.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-child-process-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| char\* entryParams | 入口参数，大小不能超过150KB。 |
| struct [NativeChildProcess\_FdList](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativechildprocess-fdlist) fdList | 传递给子进程的文件描述符信息列表。 |