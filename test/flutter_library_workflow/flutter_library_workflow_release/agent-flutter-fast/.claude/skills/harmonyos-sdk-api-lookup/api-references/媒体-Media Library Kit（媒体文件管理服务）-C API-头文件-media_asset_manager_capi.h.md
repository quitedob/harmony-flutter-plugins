## 概述

PhonePC/2in1TabletTV

定义媒体资产管理器的接口。使用由媒体资产管理器提供的C API来请求媒体库资源。

**库：** libmedia\_asset\_manager.so

**引用文件：** <multimedia/media\_library/media\_asset\_manager\_capi.h>

**系统能力：** SystemCapability.FileManagement.PhotoAccessHelper.Core

**起始版本：** 12

**相关模块：** [MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager)

## 汇总

PhonePC/2in1TabletTV

### 函数

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager\* OH\_MediaAssetManager\_Create(void)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_create) | 创建一个媒体资产管理器。 |
| [MediaLibrary\_RequestId OH\_MediaAssetManager\_RequestImageForPath(OH\_MediaAssetManager\* manager, const char\* uri, MediaLibrary\_RequestOptions requestOptions, const char\* destPath, OH\_MediaLibrary\_OnDataPrepared callback)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_requestimageforpath) | 请求具有目标路径的图像资源。 |
| [MediaLibrary\_RequestId OH\_MediaAssetManager\_RequestVideoForPath(OH\_MediaAssetManager\* manager, const char\* uri, MediaLibrary\_RequestOptions requestOptions, const char\* destPath, OH\_MediaLibrary\_OnDataPrepared callback)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_requestvideoforpath) | 请求具有目标路径的视频资源。 |
| [bool OH\_MediaAssetManager\_CancelRequest(OH\_MediaAssetManager\* manager, const MediaLibrary\_RequestId requestId)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_cancelrequest) | 通过请求Id取消请求。 |
| [MediaLibrary\_ErrorCode OH\_MediaAssetManager\_RequestMovingPhoto(OH\_MediaAssetManager\* manager, OH\_MediaAsset\* mediaAsset, MediaLibrary\_RequestOptions requestOptions, MediaLibrary\_RequestId\* requestId, OH\_MediaLibrary\_OnMovingPhotoDataPrepared callback)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_requestmovingphoto) | 根据不同的策略模式请求动态照片资源。 |
| [MediaLibrary\_ErrorCode OH\_MediaAssetManager\_RequestImage(OH\_MediaAssetManager\* manager, OH\_MediaAsset\* mediaAsset, MediaLibrary\_RequestOptions requestOptions, MediaLibrary\_RequestId\* requestId, OH\_MediaLibrary\_OnImageDataPrepared callback)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_requestimage) | 根据不同的策略模式请求图像资源。 |
| [MediaLibrary\_ErrorCode OH\_MediaAssetManager\_Release(OH\_MediaAssetManager\* manager)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_release) | 释放[OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)实例。 |
| [MediaLibrary\_ErrorCode OH\_MediaAssetManager\_QuickRequestImage(OH\_MediaAssetManager\* manager, OH\_MediaAsset\* mediaAsset, MediaLibrary\_RequestOptions requestOptions, MediaLibrary\_RequestId\* requestId, OH\_MediaLibrary\_OnQuickImageDataPrepared callback)](/consumer/cn/doc/harmonyos-references/capi-media-asset-manager-capi-h#oh_mediaassetmanager_quickrequestimage) | 根据不同的策略模式请求图像资源。 |

## 函数说明

PhonePC/2in1TabletTV

### OH\_MediaAssetManager\_Create()

PhonePC/2in1TabletTV



```
1. OH_MediaAssetManager* OH_MediaAssetManager_Create(void)
```

**描述**

创建一个媒体资产管理器。

**起始版本：** 12

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* | 返回一个指向OH\_MediaAssetManager实例的指针。 |

### OH\_MediaAssetManager\_RequestImageForPath()

PhonePC/2in1TabletTV



```
1. MediaLibrary_RequestId OH_MediaAssetManager_RequestImageForPath(OH_MediaAssetManager* manager, const char* uri,MediaLibrary_RequestOptions requestOptions, const char* destPath, OH_MediaLibrary_OnDataPrepared callback)
```

**描述**

请求具有目标路径的图像资源。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | 指向OH\_MediaAssetManager实例的指针。 |
| const char\* uri | 请求的图像资源的uri。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) requestOptions | 请求策略模式配置项。 |
| const char\* destPath | 请求资源的目标地址。 |
| [OH\_MediaLibrary\_OnDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_ondataprepared) callback | 媒体资源处理器，当所请求的媒体资源准备完成时会触发回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) | 返回请求Id。 |

### OH\_MediaAssetManager\_RequestVideoForPath()

PhonePC/2in1TabletTV



```
1. MediaLibrary_RequestId OH_MediaAssetManager_RequestVideoForPath(OH_MediaAssetManager* manager, const char* uri,MediaLibrary_RequestOptions requestOptions, const char* destPath, OH_MediaLibrary_OnDataPrepared callback)
```

**描述**

请求具有目标路径的视频资源。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | 指向OH\_MediaAssetManager实例的指针。 |
| const char\* uri | 请求的视频资源的uri。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) requestOptions | 请求策略模式配置项。 |
| const char\* destPath | 请求资源的目标地址。 |
| [OH\_MediaLibrary\_OnDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_ondataprepared) callback | 媒体资源处理器，当所请求的媒体资源准备完成时会触发回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) | 返回请求Id。 |

### OH\_MediaAssetManager\_CancelRequest()

PhonePC/2in1TabletTV



```
1. bool OH_MediaAssetManager_CancelRequest(OH_MediaAssetManager* manager, const MediaLibrary_RequestId requestId)
```

**描述**

通过请求Id取消请求。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | 指向OH\_MediaAssetManager实例的指针。 |
| const [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid) requestId | 待取消的请求Id。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| bool | 如果请求成功取消，则返回true；否则返回false。 |

### OH\_MediaAssetManager\_RequestMovingPhoto()

PhonePC/2in1TabletTV



```
1. MediaLibrary_ErrorCode OH_MediaAssetManager_RequestMovingPhoto(OH_MediaAssetManager* manager,OH_MediaAsset* mediaAsset, MediaLibrary_RequestOptions requestOptions, MediaLibrary_RequestId* requestId,OH_MediaLibrary_OnMovingPhotoDataPrepared callback)
```

**描述**

根据不同的策略模式请求动态照片资源。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)实例指针。 |
| [OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset)\* mediaAsset | 要请求的媒体文件对象的[OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset)实例。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) requestOptions | 用于图像请求策略模式的[MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions)。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)\* requestId | 请求的[MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)，出参。 |
| [OH\_MediaLibrary\_OnMovingPhotoDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onmovingphotodataprepared) callback | 当请求的动态照片准备就绪时调用[OH\_MediaLibrary\_OnMovingPhotoDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onmovingphotodataprepared)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) | MEDIA\_LIBRARY\_OK：方法调用成功。  MEDIA\_LIBRARY\_PARAMETER\_ERROR：参数错误。可能的原因：  1. 未指定强制参数。  2. 参数类型不正确。  3. 参数验证失败。  MEDIA\_LIBRARY\_OPERATION\_NOT\_SUPPORTED：不支持该操作。  MEDIA\_LIBRARY\_PERMISSION\_DENIED：没有权限。  MEDIA\_LIBRARY\_INTERNAL\_SYSTEM\_ERROR：内部系统错误。 |

### OH\_MediaAssetManager\_RequestImage()

PhonePC/2in1TabletTV



```
1. MediaLibrary_ErrorCode OH_MediaAssetManager_RequestImage(OH_MediaAssetManager* manager, OH_MediaAsset* mediaAsset,MediaLibrary_RequestOptions requestOptions, MediaLibrary_RequestId* requestId,OH_MediaLibrary_OnImageDataPrepared callback)
```

**描述**

根据不同的策略模式请求图像资源。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)实例指针。 |
| [OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset)\* mediaAsset | 要请求的媒体文件对象的[OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset)实例。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) requestOptions | 用于图像请求策略模式的[MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions)。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)\* requestId | 请求的[MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)，出参。 |
| [OH\_MediaLibrary\_OnImageDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onimagedataprepared) callback | 当请求的图像源准备就绪时调用[OH\_MediaLibrary\_OnImageDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onimagedataprepared)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) | MEDIA\_LIBRARY\_OK：方法调用成功。  MEDIA\_LIBRARY\_PARAMETER\_ERROR：参数错误。可能的原因：  1. 未指定强制参数。  2. 参数类型不正确。  3. 参数验证失败。  MEDIA\_LIBRARY\_OPERATION\_NOT\_SUPPORTED：不支持该操作。  MEDIA\_LIBRARY\_PERMISSION\_DENIED：没有权限。  MEDIA\_LIBRARY\_INTERNAL\_SYSTEM\_ERROR：内部系统错误。 |

### OH\_MediaAssetManager\_Release()

PhonePC/2in1TabletTV



```
1. MediaLibrary_ErrorCode OH_MediaAssetManager_Release(OH_MediaAssetManager* manager)
```

**描述**

释放[OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)实例。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | 要释放的[OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) | MEDIA\_LIBRARY\_OK：方法调用成功。  MEDIA\_LIBRARY\_PARAMETER\_ERROR：参数错误。可能的原因：  1. 未指定强制参数。  2. 参数类型不正确。  3. 参数验证失败。 |

### OH\_MediaAssetManager\_QuickRequestImage()

PhonePC/2in1TabletTV



```
1. MediaLibrary_ErrorCode OH_MediaAssetManager_QuickRequestImage(OH_MediaAssetManager* manager, OH_MediaAsset* mediaAsset, MediaLibrary_RequestOptions requestOptions, MediaLibrary_RequestId* requestId, OH_MediaLibrary_OnQuickImageDataPrepared callback)
```

**描述**

根据不同的策略模式请求图像资源。

**需要权限：** ohos.permission.READ\_IMAGEVIDEO

**起始版本：** 23

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_MediaAssetManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaassetmanager)\* manager | OH\_MediaAssetManager的实例指针。 |
| [OH\_MediaAsset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-oh-mediaasset)\* mediaAsset | 要请求的媒体文件对象的OH\_MediaAsset实例。 |
| [MediaLibrary\_RequestOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestoptions) requestOptions | 用于图像请求策略模式的MediaLibrary\_RequestOptions。 |
| [MediaLibrary\_RequestId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mediaassetmanager-medialibrary-requestid)\* requestId | 请求的MediaLibrary\_RequestId，该参数为输出参数。 |
| [OH\_MediaLibrary\_OnQuickImageDataPrepared](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#oh_medialibrary_onquickimagedataprepared) callback | 当请求的源数据准备就绪时，将会调用OH\_MediaLibrary\_OnQuickImageDataPrepared方法。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [MediaLibrary\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-media-asset-base-capi-h#medialibrary_errorcode) | MEDIA\_LIBRARY\_OK：方法调用成功。  MEDIA\_LIBRARY\_OPERATION\_NOT\_SUPPORTED：不支持该操作。  MEDIA\_LIBRARY\_PERMISSION\_DENIED：没有权限。  MEDIA\_LIBRARY\_INTERNAL\_SYSTEM\_ERROR：内部系统错误。 |