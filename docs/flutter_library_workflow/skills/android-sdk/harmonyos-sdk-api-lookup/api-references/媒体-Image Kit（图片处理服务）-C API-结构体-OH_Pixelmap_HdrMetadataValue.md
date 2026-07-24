

```
1. typedef struct OH_Pixelmap_HdrMetadataValue {...} OH_Pixelmap_HdrMetadataValue
```

## 概述

PhonePC/2in1TabletTVWearable

Pixelmap使用的HDR元数据值，和OH\_Pixelmap\_HdrMetadataKey关键字相对应。用于[OH\_PixelmapNative\_SetMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_setmetadata)及[OH\_PixelmapNative\_GetMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_getmetadata)，有相应[OH\_Pixelmap\_HdrMetadataKey](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmap_hdrmetadatakey)关键字作为入参时，设置或获取到本结构体中相对应的元数据类型的值。

**起始版本：** 12

**相关模块：** [Image\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule)

**所在头文件：** [pixelmap\_native.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_Pixelmap\_HdrMetadataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmap_hdrmetadatatype) type | HDR\_METADATA\_TYPE关键字对应的具体值。 |
| [OH\_Pixelmap\_HdrStaticMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/i-image-nativemodule-oh-pixelmap-hdrstaticmetadata) staticMetadata | HDR\_STATIC\_METADATA关键字对应的具体值。 |
| [OH\_Pixelmap\_HdrDynamicMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-image-nativemodule-oh-pixelmap-hdrdynamicmetadata) dynamicMetadata | HDR\_DYNAMIC\_METADATA关键字对应的具体值。 |
| [OH\_Pixelmap\_HdrGainmapMetadata](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-image-nativemodule-oh-pixelmap-hdrgainmapmetadata) gainmapMetadata | HDR\_GAINMAP\_METADATA关键字对应的具体值。 |