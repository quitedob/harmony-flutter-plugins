

```
1. typedef struct {...} OH_ImageBufferData
```

## 概述

PhonePC/2in1TabletTVWearable

OH\_ImageBufferData是native层封装的图像数据结构体。获取OH\_ImageNative\_GetBufferData对象使用[OH\_ImageNative\_GetBufferData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-native-h#oh_imagenative_getbufferdata)函数。

结构体中保存的是对原图像数据的浅拷贝，当原数据被释放后，不应再对该结构体中的指针进行任何读写操作，否则会出现未定义行为。

**起始版本：** 23

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [image\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-native-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t \*rowStride | 图像颜色分量行间距的数组，单位为像素（px）。 |
| int32\_t \*pixelStride | 图像颜色分量像素间距的数组，单位为像素（px）。 |
| int32\_t numStride | 数组长度。 |
| size\_t bufferSize | 缓冲区的大小，单位为字节（Byte）。 |
| OH\_NativeBuffer \*nativeBuffer | 图像的OH\_NativeBuffer缓冲区对象的指针。 |