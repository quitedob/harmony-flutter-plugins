

```
1. typedef struct {...} Print_PrinterCapability
```

## 概述

PhonePC/2in1Tablet

表示打印机能力。

**起始版本：** 12

**相关模块：** [OH\_Print](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print)

**所在头文件：** [ohprint.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| [Print\_ColorMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_colormode) \*supportedColorModes | 支持的色彩模式数组。 |
| uint32\_t supportedColorModesCount | 支持的色彩模式数量。 |
| [Print\_DuplexMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_duplexmode) \*supportedDuplexModes | 支持的双面打印模式数组。 |
| uint32\_t supportedDuplexModesCount | 支持的双面打印模式数量。 |
| [Print\_PageSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-pagesize) \*supportedPageSizes | 支持的打印纸张尺寸数组。 |
| uint32\_t supportedPageSizesCount | 支持的打印纸张尺寸数量。 |
| char \*supportedMediaTypes | JSON 字符串数组格式的支持的打印介质类型。 |
| [Print\_Quality](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_quality) \*supportedQualities | 支持的打印质量数组。 |
| uint32\_t supportedQualitiesCount | 支持的打印质量数量。 |
| char \*supportedPaperSources | JSON 字符串数组格式的支持的纸张来源。 |
| uint32\_t supportedCopies | 支持的份数。 |
| [Print\_Resolution](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-print-print-resolution) \*supportedResolutions | 支持的打印机分辨率数组。 |
| uint32\_t supportedResolutionsCount | 支持的打印机分辨率数量。 |
| [Print\_OrientationMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohprint-h#print_orientationmode) \*supportedOrientations | 支持的方向数组。 |
| uint32\_t supportedOrientationsCount | 支持的方向数量。 |
| char \*advancedCapability | JSON 格式的高级能力。 |