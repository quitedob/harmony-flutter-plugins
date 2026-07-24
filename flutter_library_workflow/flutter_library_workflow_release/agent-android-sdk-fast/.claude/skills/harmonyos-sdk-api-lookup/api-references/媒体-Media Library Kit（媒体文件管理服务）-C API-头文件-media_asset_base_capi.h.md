## 概述

PhonePC/2in1TabletTV

定义了媒体资产管理器的结构和枚举。

**库：** libmedia\_asset\_manager.so

**引用文件：** <multimedia/media\_library/media\_asset\_base\_capi.h>

**系统能力：** SystemCapability.FileManagement.PhotoAccessHelper.Core

**起始版本：** 12

**相关模块：** [MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager)

## 汇总

PhonePC/2in1TabletTV

### 结构体

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) | MediaLibrary\_RequestId | 定义请求Id。  当请求媒体库资源时，会返回此类型。  请求Id可用于取消请求。 |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager) | OH\_MediaAssetManager | 定义媒体资产管理器。  此结构提供了请求媒体库资源的能力。  如果创建失败，则返回空指针。 |
| [OH\_MediaAssetChangeRequest](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetchangerequest) | OH\_MediaAssetChangeRequest | 定义媒体资产更改请求。  此结构体提供了处理媒体资产更改请求的能力。 |
| [OH\_MovingPhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-movingphoto) | OH\_MovingPhoto | 定义动态照片。  此结构体提供了获取关于动态照片的信息的能力。 |
| [OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset) | OH\_MediaAsset | 定义媒体资产。  此结构体提供了封装文件资源属性的能力。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) | MediaLibrary\_RequestOptions | 请求策略模式配置项。  此结构体为媒体资源请求策略模式配置项。 |

### 枚举

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [MediaLibrary\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) | MediaLibrary\_ErrorCode | 媒体库错误代码的枚举。 |
| [MediaLibrary\_DeliveryMode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_deliverymode) | MediaLibrary\_DeliveryMode | 请求资源分发模式。 |
| [MediaLibrary\_MediaType](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediatype) | MediaLibrary\_MediaType | 媒体类型的枚举。 |
| [MediaLibrary\_MediaSubType](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediasubtype) | MediaLibrary\_MediaSubType | 媒体资源子类型的枚举。 |
| [MediaLibrary\_ResourceType](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_resourcetype) | MediaLibrary\_ResourceType | 资源类型的枚举。 |
| [MediaLibrary\_ImageFileType](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_imagefiletype) | MediaLibrary\_ImageFileType | 图像文件类型的枚举。 |
| [MediaLibrary\_MediaQuality](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality) | MediaLibrary\_MediaQuality | 媒体资源质量枚举。此枚举与请求媒体资源时定义的分发模式有关。 |
| [MediaLibrary\_MediaContentType](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype) | MediaLibrary\_MediaContentType | 媒体内容类型的枚举。 |

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_MediaLibrary\_OnDataPrepared)(int32\_t result, MediaLibrary\_RequestId requestId)](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_ondataprepared) | OH\_MediaLibrary\_OnDataPrepared | 当所请求的媒体资源准备完成时会触发回调。 |
| [typedef void (\*OH\_MediaLibrary\_OnImageDataPrepared)(MediaLibrary\_ErrorCode result, MediaLibrary\_RequestId requestId, MediaLibrary\_MediaQuality mediaQuality, MediaLibrary\_MediaContentType type,OH\_ImageSourceNative\* imageSourceNative)](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onimagedataprepared) | OH\_MediaLibrary\_OnImageDataPrepared | 当请求的图像源准备就绪时会触发回调。 |
| [typedef void (\*OH\_MediaLibrary\_OnMovingPhotoDataPrepared)(MediaLibrary\_ErrorCode result, MediaLibrary\_RequestId requestId, MediaLibrary\_MediaQuality mediaQuality, MediaLibrary\_MediaContentType type, OH\_MovingPhoto\* movingPhoto)](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onmovingphotodataprepared) | OH\_MediaLibrary\_OnMovingPhotoDataPrepared | 当请求的动态照片准备就绪时会触发回调。 |

### 变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| static const int32\_t UUID\_STR\_MAX\_LENGTH = 37 | 定义UUID最大长度。这个常量定义了UUID字符串的最大长度。  **起始版本：** 12 |

## 枚举类型说明

PhonePC/2in1TabletTV

### MediaLibrary\_ErrorCode

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_ErrorCode
```

**描述**

媒体库错误代码的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_OK = 0 | 媒体库结果正常。 |
| MEDIA\_LIBRARY\_PERMISSION\_DENIED = 201 | 权限被拒绝。 |
| MEDIA\_LIBRARY\_PARAMETER\_ERROR = 401 | 强制参数未指定，参数类型不正确或参数验证失败。 |
| MEDIA\_LIBRARY\_NO\_SUCH\_FILE = 23800101 | 文件不存在。 |
| MEDIA\_LIBRARY\_INVALID\_DISPLAY\_NAME = 23800102 | 显示名称无效。 |
| MEDIA\_LIBRARY\_INVALID\_ASSET\_URI = 23800103 | 资产uri无效。 |
| MEDIA\_LIBRARY\_INVALID\_PHOTO\_KEY = 23800104 | PhotoKey无效。 |
| MEDIA\_LIBRARY\_OPERATION\_NOT\_SUPPORTED = 23800201 | 不支持该操作。 |
| MEDIA\_LIBRARY\_INTERNAL\_SYSTEM\_ERROR = 23800301 | 内部系统错误。建议重试并检查日志。可能的原因：  1. 数据库已损坏。  2. 文件系统异常。  3. IPC请求超时。 |

### MediaLibrary\_DeliveryMode

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_DeliveryMode
```

**描述**

请求资源分发模式。

快速分发：不考虑资源质量，直接基于现有资源返回。

高质量分发：返回高质量资源，若没有，则触发生成高质量资源，成功后才返回。

均衡分发：若存在高质量资源，则直接返回高质量资源。否则，先返回低质量资源，并触发生成高质量资源，成功后再返回一次高质量资源。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_FAST\_MODE = 0 | 快速分发。 |
| MEDIA\_LIBRARY\_HIGH\_QUALITY\_MODE = 1 | 高质量分发。 |
| MEDIA\_LIBRARY\_BALANCED\_MODE = 2 | 均衡分发。 |

### MediaLibrary\_MediaType

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_MediaType
```

**描述**

媒体类型的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_IMAGE = 1 | 图像资产。 |
| MEDIA\_LIBRARY\_VIDEO = 2 | 视频资产。 |

### MediaLibrary\_MediaSubType

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_MediaSubType
```

**描述**

媒体资源子类型的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_DEFAULT = 0 | 默认照片类型。 |
| MEDIA\_LIBRARY\_MOVING\_PHOTO = 3 | 动态照片类型。 |
| MEDIA\_LIBRARY\_BURST = 4 | 连拍照片类型。 |

### MediaLibrary\_ResourceType

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_ResourceType
```

**描述**

资源类型的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_IMAGE\_RESOURCE = 1 | 图像资源。 |
| MEDIA\_LIBRARY\_VIDEO\_RESOURCE = 2 | 视频资源。 |

### MediaLibrary\_ImageFileType

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_ImageFileType
```

**描述**

图像文件类型的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_IMAGE\_JPEG = 1 | JPEG类型。 |
| MEDIA\_LIBRARY\_IMAGE\_HEIF = 2 | HEIF类型。  **起始版本：** 23 |
| MEDIA\_LIBRARY\_FILE\_VIDEO = 3 | MPEG类型。  **起始版本：** 19 |

### MediaLibrary\_MediaQuality

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_MediaQuality
```

**描述**

媒体资源质量枚举。

此枚举与请求媒体资源时定义的分发模式有关。

快速分发：不考虑资源质量，直接基于现有资源返回。

高质量分发：返回高质量资源，若没有，则触发生成高质量资源，成功后才返回。

均衡分发：若存在高质量资源，则直接返回高质量资源。否则，先返回低质量资源，并触发生成高质量资源，成功后再返回一次高质量资源。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_QUALITY\_FAST = 1 | 不考虑资源质量，直接返回的现有资源。 |
| MEDIA\_LIBRARY\_QUALITY\_FULL = 2 | 高质量资源。 |

### MediaLibrary\_MediaContentType

PhonePC/2in1TabletTV



```
1. enum MediaLibrary_MediaContentType
```

**描述**

媒体内容类型的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| MEDIA\_LIBRARY\_COMPRESSED = 1 | 普通图片格式，如JPEG、HEIC、GIF。 |
| MEDIA\_LIBRARY\_PICTURE\_OBJECT = 2 | 图片解码后的PixelMap、GainMap和图片元数据信息一起封装的对象，方便应用进行编辑和显示。此对象的操作详见[OH\_PictureNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-picturenative)。 |

## 函数说明

PhonePC/2in1TabletTV

### OH\_MediaLibrary\_OnDataPrepared()

PhonePC/2in1TabletTV



```
1. typedef void (*OH_MediaLibrary_OnDataPrepared)(int32_t result, MediaLibrary_RequestId requestId)
```

**描述**

当所请求的媒体资源准备完成时会触发回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| int32\_t result | 请求资源处理的结果。 |
| MediaLibrary\_RequestId requestId | 请求Id。 |

### OH\_MediaLibrary\_OnImageDataPrepared()

PhonePC/2in1TabletTV



```
1. typedef void (*OH_MediaLibrary_OnImageDataPrepared)(MediaLibrary_ErrorCode result,MediaLibrary_RequestId requestId, MediaLibrary_MediaQuality mediaQuality, MediaLibrary_MediaContentType type,OH_ImageSourceNative* imageSourceNative)
```

**描述**

当请求的图像源准备就绪时会触发回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [MediaLibrary\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) result | 处理所请求资源的结果[MediaLibrary\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode)。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) requestId | 请求的[MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)。 |
| [MediaLibrary\_MediaQuality](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality) mediaQuality | 请求源的[MediaLibrary\_MediaQuality](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality)。 |
| [MediaLibrary\_MediaContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype) type | 请求源的[MediaLibrary\_MediaContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype)。 |
| [OH\_ImageSourceNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-imagesourcenative)\* imageSourceNative | 当请求的图像源准备就绪时获取[OH\_ImageSourceNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-imagesourcenative)。 |

### OH\_MediaLibrary\_OnMovingPhotoDataPrepared()

PhonePC/2in1TabletTV



```
1. typedef void (*OH_MediaLibrary_OnMovingPhotoDataPrepared)(MediaLibrary_ErrorCode result,MediaLibrary_RequestId requestId, MediaLibrary_MediaQuality mediaQuality, MediaLibrary_MediaContentType type,OH_MovingPhoto* movingPhoto)
```

**描述**

当请求的动态照片准备就绪时会触发回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [MediaLibrary\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) result | 处理所请求资源的结果[MediaLibrary\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode)。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) requestId | 请求的[MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)。 |
| [MediaLibrary\_MediaQuality](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality) mediaQuality | 请求资源的[MediaLibrary\_MediaQuality](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality)。 |
| [MediaLibrary\_MediaContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype) type | 请求资源的[MediaLibrary\_MediaContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype)。 |
| [OH\_MovingPhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-movingphoto)\* movingPhoto | 当请求的动态图片准备就绪时获取[OH\_MovingPhoto](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-movingphoto)。 |

### OH\_MediaLibrary\_OnQuickImageDataPrepared()

PhonePC/2in1TabletTV



```
1. typedef void (*OH_MediaLibrary_OnQuickImageDataPrepared)(MediaLibrary_ErrorCode result, MediaLibrary_RequestId requestId, MediaLibrary_MediaQuality mediaQuality, MediaLibrary_MediaContentType type, OH_ImageSourceNative* imageSourceNative, OH_PictureNative* pictureNative)
```

**描述**

当请求的图像源准备就绪时调用此函数。如果系统中存在图像缓冲区，则会返回一个图片对象，从而减少编码时间。

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [MediaLibrary\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) result | 处理所请求资源的结果。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) requestId | 请求资源的MediaLibrary\_RequestId。 |
| [MediaLibrary\_MediaQuality](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediaquality) mediaQuality | 请求资源的MediaLibrary\_MediaQuality。 |
| [MediaLibrary\_MediaContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_mediacontenttype) type | 请求来源的MediaLibrary\_MediaContentType。 |
| [OH\_ImageSourceNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-imagesourcenative)\* imageSourceNative | 用于在准备图像文件时获取OH\_ImageSourceNative信息，否则imageSourceNative为null。 |
| [OH\_PictureNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-nativemodule-oh-picturenative)\* pictureNative | 用于在准备图像源时获取OH\_PictureNative信息，否则pictureNative为null。 |