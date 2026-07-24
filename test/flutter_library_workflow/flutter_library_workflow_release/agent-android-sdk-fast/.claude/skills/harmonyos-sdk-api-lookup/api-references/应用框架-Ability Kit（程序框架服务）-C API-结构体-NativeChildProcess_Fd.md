

```
1. typedef struct {...} NativeChildProcess_Fd
```

## 概述

PhonePC/2in1TabletTVWearable

传递给子进程的文件描述符信息。

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
| char\* fdName | 文件描述符的键，最大长度为20字符。 |
| int32\_t fd | 文件描述符的值。 |
| struct [NativeChildProcess\_Fd](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativechildprocess-fd)\* next | 下一个文件描述记录指针。 |