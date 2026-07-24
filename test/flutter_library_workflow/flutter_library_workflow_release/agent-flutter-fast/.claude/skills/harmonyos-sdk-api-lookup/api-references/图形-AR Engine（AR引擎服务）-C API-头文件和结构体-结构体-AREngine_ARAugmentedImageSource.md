## 概述

PhoneTabletTV

图像数据。

**起始版本：** 5.1.0(18)

**相关模块：** [AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine)

**所在头文件：** [ar\_engine\_core.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-header-file)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| const char \*[imageName](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#imagename) | 图像名，不允许为空，255个字符以内，超过255个字符的部分将被自动截断。 |
| const uint8\_t \*[imageData](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#imagedata) | 灰度图像元素数组地址。 |
| int32\_t [pixelWidth](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#pixelwidth) | 图像像素宽度。 |
| int32\_t [pixelHeight](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#pixelheight) | 图像像素高度。 |
| int32\_t [stride](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#stride) | 图像步幅。 |
| float [realWidthInMeters](/consumer/cn/doc/harmonyos-references/arengine-struct-araugmentedimagesource#realwidthinmeters) | 图像中对象的实际物理宽度。无限制，默认值为A4纸张尺寸。 |

## 结构体成员变量说明

PhoneTabletTV

### imageName

PhoneTabletTV



```
1. const char* AREngine_ARAugmentedImageSource::imageName
```

**描述**

图像名，不允许为空，255个字符以内，超过255个字符的部分将被自动截断。

### imageData

PhoneTabletTV



```
1. const uint8_t* AREngine_ARAugmentedImageSource::imageData
```

**描述**

灰度图像元素数组地址。

### pixelWidth

PhoneTabletTV



```
1. int32_t AREngine_ARAugmentedImageSource::pixelWidth
```

**描述**

图像像素宽度。

### pixelHeight

PhoneTabletTV



```
1. int32_t AREngine_ARAugmentedImageSource::pixelHeight
```

**描述**

图像像素高度。

### stride

PhoneTabletTV



```
1. int32_t AREngine_ARAugmentedImageSource::stride
```

**描述**

图像步幅。

### realWidthInMeters

PhoneTabletTV



```
1. float AREngine_ARAugmentedImageSource::realWidthInMeters
```

**描述**

图像中对象的实际物理宽度。无限制，默认值为291mm。