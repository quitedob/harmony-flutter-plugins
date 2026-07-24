

```
1. typedef struct ImageEffect_FilterNames {...} ImageEffect_FilterNames
```

## 概述

PhonePC/2in1TabletTV

滤镜名信息。

**起始版本：** 12

**相关模块：** [ImageEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect)

**所在头文件：** [image\_effect\_filter.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

**支持C++语言语法的声明如下：**

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t size = 0 | 滤镜名个数。 |
| const char \*\*nameList = nullptr | 滤镜名列表。 |

**支持C语言语法的声明如下：**

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t size | 滤镜名个数。 |
| const char \*\*nameList | 滤镜名列表。 |

### 成员函数

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_EffectFilterInfo \*OH\_EffectFilterInfo\_Create()](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_create) | OH\_EffectFilterInfo\_Create() | 创建OH\_EffectFilterInfo实例，调用[OH\_EffectFilterInfo\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_release)进行资源释放。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_SetFilterName(OH\_EffectFilterInfo \*info, const char \*name)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_setfiltername) | OH\_EffectFilterInfo\_SetFilterName() | 设置滤镜名。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_GetFilterName(OH\_EffectFilterInfo \*info, char \*\*name)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_getfiltername) | OH\_EffectFilterInfo\_GetFilterName() | 获取滤镜名。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_SetSupportedBufferTypes(OH\_EffectFilterInfo \*info, uint32\_t size,ImageEffect\_BufferType \*bufferTypeArray)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_setsupportedbuffertypes) | OH\_EffectFilterInfo\_SetSupportedBufferTypes() | 设置滤镜所支持的内存类型。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_GetSupportedBufferTypes(OH\_EffectFilterInfo \*info, uint32\_t \*size,ImageEffect\_BufferType \*\*bufferTypeArray)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_getsupportedbuffertypes) | OH\_EffectFilterInfo\_GetSupportedBufferTypes() | 获取滤镜所支持的内存类型。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_SetSupportedFormats(OH\_EffectFilterInfo \*info, uint32\_t size,ImageEffect\_Format \*formatArray)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_setsupportedformats) | OH\_EffectFilterInfo\_SetSupportedFormats() | 设置滤镜所支持的像素格式。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_GetSupportedFormats(OH\_EffectFilterInfo \*info, uint32\_t \*size,ImageEffect\_Format \*\*formatArray)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_getsupportedformats) | OH\_EffectFilterInfo\_GetSupportedFormats() | 获取滤镜所支持的像素格式。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |
| [ImageEffect\_ErrorCode OH\_EffectFilterInfo\_Release(OH\_EffectFilterInfo \*info)](/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_release) | OH\_EffectFilterInfo\_Release() | 销毁OH\_EffectFilterInfo实例。  **起始版本：** 12  **系统能力：** SystemCapability.Multimedia.ImageEffect.Core |

## 成员函数说明

PhonePC/2in1TabletTV

### OH\_EffectFilterInfo\_Create()

PhonePC/2in1TabletTV



```
1. OH_EffectFilterInfo *OH_EffectFilterInfo_Create()
```

**描述**

创建OH\_EffectFilterInfo实例，调用[OH\_EffectFilterInfo\_Release](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-imageeffect-filternames#oh_effectfilterinfo_release)进行资源释放。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) | 返回一个指向OH\_EffectFilterInfo实例的指针，创建失败时返回空指针。 |

### OH\_EffectFilterInfo\_SetFilterName()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_SetFilterName(OH_EffectFilterInfo *info, const char *name)
```

**描述**

设置滤镜名。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| const char \*name | 滤镜名，例如：OH\_EFFECT\_BRIGHTNESS\_FILTER。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_GetFilterName()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_GetFilterName(OH_EffectFilterInfo *info, char **name)
```

**描述**

获取滤镜名。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| char \*\*name | 指向char数组的指针，返回滤镜名。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_SetSupportedBufferTypes()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_SetSupportedBufferTypes(OH_EffectFilterInfo *info, uint32_t size,ImageEffect_BufferType *bufferTypeArray)
```

**描述**

设置滤镜所支持的内存类型。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| uint32\_t size | 滤镜所支持内存类型[ImageEffect\_BufferType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_buffertype)个数。 |
| ImageEffect\_BufferType \*bufferTypeArray | 滤镜所支持内存类型[ImageEffect\_BufferType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_buffertype)数组。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_GetSupportedBufferTypes()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_GetSupportedBufferTypes(OH_EffectFilterInfo *info, uint32_t *size,ImageEffect_BufferType **bufferTypeArray)
```

**描述**

获取滤镜所支持的内存类型。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| uint32\_t \*size | 滤镜所支持内存类型[ImageEffect\_BufferType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_buffertype)个数。 |
| ImageEffect\_BufferType \*\*bufferTypeArray | 滤镜所支持内存类型[ImageEffect\_BufferType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_buffertype)数组。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_SetSupportedFormats()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_SetSupportedFormats(OH_EffectFilterInfo *info, uint32_t size,ImageEffect_Format *formatArray)
```

**描述**

设置滤镜所支持的像素格式。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| uint32\_t size | 滤镜所支持像素格式[ImageEffect\_Format](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_format)个数。 |
| ImageEffect\_Format \*formatArray | 滤镜所支持像素格式[ImageEffect\_Format](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_format)数组。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_GetSupportedFormats()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_GetSupportedFormats(OH_EffectFilterInfo *info, uint32_t *size,ImageEffect_Format **formatArray)
```

**描述**

获取滤镜所支持的像素格式。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |
| uint32\_t \*size | 滤镜所支持像素格式[ImageEffect\_Format](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_format)个数。 |
| ImageEffect\_Format \*\*formatArray | 滤镜所支持像素格式[ImageEffect\_Format](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#imageeffect_format)数组。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |

### OH\_EffectFilterInfo\_Release()

PhonePC/2in1TabletTV



```
1. ImageEffect_ErrorCode OH_EffectFilterInfo_Release(OH_EffectFilterInfo *info)
```

**描述**

销毁OH\_EffectFilterInfo实例。

**系统能力：** SystemCapability.Multimedia.ImageEffect.Core

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_EffectFilterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect-oh-effectfilterinfo) \*info | 滤镜信息指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ImageEffect\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode) | [EFFECT\_SUCCESS](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果方法调用成功。  [EFFECT\_ERROR\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-errors-h#imageeffect_errorcode)如果入参为空指针。 |