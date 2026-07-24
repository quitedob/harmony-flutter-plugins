

```
1. typedef struct {...} BufferHandle
```

## 概述

PhonePC/2in1TabletTVWearable

缓冲区句柄，用于对缓冲区的信息传递和获取。句柄包含了缓冲区的文件描述符、尺寸、格式、用途、虚拟地址、共享内存键、物理地址、自定义数据。

**起始版本：** 8

**相关模块：** [NativeWindow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-nativewindow)

**所在头文件：** [buffer\_handle.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-handle-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t fd | 缓冲区文件描述符，若不支持则为-1。 |
| int32\_t width | 缓冲区内存的宽度，单位为像素。 |
| int32\_t stride | 缓冲区内存的步幅，单位为字节。 |
| int32\_t height | 缓冲区内存的高度，单位为像素。 |
| int32\_t size | 缓冲区内存的大小，单位为字节。 |
| int32\_t format | 缓冲区内存的格式，取值具体可见[OH\_NativeBuffer\_Format](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_format)枚举值。 |
| uint64\_t usage | 缓冲区内存的用途，按位标志位，取值具体可见[OH\_NativeBuffer\_Usage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_usage)枚举值。 |
| void\* virAddr | 缓冲区内存的虚拟地址。 |
| int32\_t key | 缓冲区共享内存键值。 |
| uint64\_t phyAddr | 缓冲区内存的物理地址。 |
| uint32\_t reserveFds | 额外数据的文件描述符数量。 |
| uint32\_t reserveInts | 额外数据的整型值数量。 |
| int32\_t reserve[0] | 额外数据。 |