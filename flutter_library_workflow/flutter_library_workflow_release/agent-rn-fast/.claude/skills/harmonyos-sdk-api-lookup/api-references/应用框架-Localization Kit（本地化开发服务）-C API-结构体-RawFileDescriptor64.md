

```
1. typedef struct {...} RawFileDescriptor64
```

## 概述

PhonePC/2in1TabletTVWearable

提供较大rawfile文件描述符信息。RawFileDescriptor64是[OH\_ResourceManager\_GetRawFileDescriptor64](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-raw-file-h#oh_resourcemanager_getrawfiledescriptor64)的输出参数,涵盖了rawfile文件的文件描述符以及在HAP包中的起始位置和长度。

**起始版本：** 11

**相关模块：** [rawfile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-rawfile)

**所在头文件：** [raw\_file.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-raw-file-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int fd | rawfile文件描述符，单位为int。 |
| int64\_t start | rawfile在HAP包中的起始位置，单位为int64\_t。 |
| int64\_t length | rawfile在HAP包中的长度，单位为int64\_t。 |