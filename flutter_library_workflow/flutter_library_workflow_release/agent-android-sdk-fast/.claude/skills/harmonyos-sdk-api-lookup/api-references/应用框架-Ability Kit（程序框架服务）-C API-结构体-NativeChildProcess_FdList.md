

```
1. typedef struct NativeChildProcess_FdList {...} NativeChildProcess_FdList
```

## 概述

PhonePC/2in1TabletTVWearable

传递给子进程的文件描述符信息列表，文件描述符记录个数不能超过16个。

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
| struct [NativeChildProcess\_Fd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativechildprocess-fd)\* head | 子进程文件描述符记录链表中的第一个记录。 |