## 概述

PhonePC/2in1TabletTVWearable

声明捕获会话概念。

**引用文件：** <ohcamera/capture\_session.h>

**库：** libohcamera.so

**系统能力：** SystemCapability.Multimedia.Camera.Core

**起始版本：** 11

**相关模块：** [OH\_Camera](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks) | CaptureSession\_Callbacks | 捕获会话的回调。 |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession) | Camera\_CaptureSession | 捕获会话对象。  可以使用[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)方法创建指针。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [typedef void (\*OH\_CaptureSession\_OnFocusStateChange)(Camera\_CaptureSession\* session, Camera\_FocusState focusState)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onfocusstatechange) | OH\_CaptureSession\_OnFocusStateChange | 在[CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)中被调用的捕获会话焦点状态回调。 |
| [typedef void (\*OH\_CaptureSession\_OnError)(Camera\_CaptureSession\* session, Camera\_ErrorCode errorCode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onerror) | OH\_CaptureSession\_OnError | 在[CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)中被调用的捕获会话错误回调。 |
| [typedef void (\*OH\_CaptureSession\_OnSmoothZoomInfo)(Camera\_CaptureSession\* session, Camera\_SmoothZoomInfo\* smoothZoomInfo)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsmoothzoominfo) | OH\_CaptureSession\_OnSmoothZoomInfo | 拍照会话平滑变焦信息回调，触发平滑变焦后该回调会返回。 |
| [typedef void (\*OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange)(Camera\_CaptureSession\* session, Camera\_AutoDeviceSwitchStatusInfo\* autoDeviceSwitchStatusInfo)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onautodeviceswitchstatuschange) | OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange | 捕获会话设备切换状态回调。 |
| [typedef void (\*OH\_CaptureSession\_OnSystemPressureLevelChange)(Camera\_CaptureSession\* session, Camera\_SystemPressureLevel systemPressureLevel)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsystempressurelevelchange) | OH\_CaptureSession\_OnSystemPressureLevelChange | 捕获系统压力状态变化回调。 |
| [typedef void (\*OH\_CaptureSession\_OnControlCenterEffectStatusChange)(Camera\_CaptureSession\* session, Camera\_ControlCenterStatusInfo\* controlCenterStatusInfo)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_oncontrolcentereffectstatuschange) | OH\_CaptureSession\_OnControlCenterEffectStatusChange | 相机控制器效果激活状态变化回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterCallback(Camera\_CaptureSession\* session, CaptureSession\_Callbacks\* callback)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registercallback) | - | 注册捕获会话事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterCallback(Camera\_CaptureSession\* session, CaptureSession\_Callbacks\* callback)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregistercallback) | - | 注销捕获会话事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterSmoothZoomInfoCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnSmoothZoomInfo smoothZoomInfoCallback)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registersmoothzoominfocallback) | - | 注册平滑变焦信息事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterSmoothZoomInfoCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnSmoothZoomInfo smoothZoomInfoCallback)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregistersmoothzoominfocallback) | - | 注销平滑变焦信息事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetSessionMode(Camera\_CaptureSession\* session, Camera\_SceneMode sceneMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setsessionmode) | - | 设置会话模式。  此接口不能在[OH\_CaptureSession\_BeginConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_beginconfig)之后使用。  建议在使用[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)后立即使用此接口。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddSecureOutput(Camera\_CaptureSession\* session, Camera\_PreviewOutput\* previewOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addsecureoutput) | - | 把其中一条PreviewOutput标记成安全输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_BeginConfig(Camera\_CaptureSession\* session)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_beginconfig) | - | 开始捕获会话配置。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CommitConfig(Camera\_CaptureSession\* session)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig) | - | 提交捕获会话配置。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddInput(Camera\_CaptureSession\* session, Camera\_Input\* cameraInput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addinput) | - | 添加相机输入。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RemoveInput(Camera\_CaptureSession\* session, Camera\_Input\* cameraInput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removeinput) | - | 删除相机输入。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddPreviewOutput(Camera\_CaptureSession\* session, Camera\_PreviewOutput\* previewOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addpreviewoutput) | - | 添加预览输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RemovePreviewOutput(Camera\_CaptureSession\* session, Camera\_PreviewOutput\* previewOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removepreviewoutput) | - | 删除预览输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddPhotoOutput(Camera\_CaptureSession\* session, Camera\_PhotoOutput\* photoOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addphotooutput) | - | 添加拍照输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RemovePhotoOutput(Camera\_CaptureSession\* session, Camera\_PhotoOutput\* photoOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removephotooutput) | - | 删除拍照输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddVideoOutput(Camera\_CaptureSession\* session, Camera\_VideoOutput\* videoOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addvideooutput) | - | 添加录像输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RemoveVideoOutput(Camera\_CaptureSession\* session, Camera\_VideoOutput\* videoOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removevideooutput) | - | 删除录像输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_AddMetadataOutput(Camera\_CaptureSession\* session, Camera\_MetadataOutput\* metadataOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_addmetadataoutput) | - | 添加元数据输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RemoveMetadataOutput(Camera\_CaptureSession\* session, Camera\_MetadataOutput\* metadataOutput)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_removemetadataoutput) | - | 删除元数据输出。 |
| [Camera\_ErrorCode OH\_CaptureSession\_Start(Camera\_CaptureSession\* session)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_start) | - | 启动捕获会话。 |
| [Camera\_ErrorCode OH\_CaptureSession\_Stop(Camera\_CaptureSession\* session)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_stop) | - | 停止捕获会话。 |
| [Camera\_ErrorCode OH\_CaptureSession\_Release(Camera\_CaptureSession\* session)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_release) | - | 释放捕获会话。 |
| [Camera\_ErrorCode OH\_CaptureSession\_HasFlash(Camera\_CaptureSession\* session, bool\* hasFlash)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_hasflash) | - | 检查设备是否有闪光灯。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsFlashModeSupported(Camera\_CaptureSession\* session, Camera\_FlashMode flashMode, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_isflashmodesupported) | - | 检查是否支持指定的闪光灯模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetFlashMode(Camera\_CaptureSession\* session, Camera\_FlashMode\* flashMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getflashmode) | - | 获取当前闪光灯模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetFlashMode(Camera\_CaptureSession\* session, Camera\_FlashMode flashMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setflashmode) | - | 设置闪光灯模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsExposureModeSupported(Camera\_CaptureSession\* session, Camera\_ExposureMode exposureMode, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_isexposuremodesupported) | - | 检查是否支持指定的曝光模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetExposureMode(Camera\_CaptureSession\* session, Camera\_ExposureMode\* exposureMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getexposuremode) | - | 获取当前曝光模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetExposureMode(Camera\_CaptureSession\* session, Camera\_ExposureMode exposureMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setexposuremode) | - | 设置曝光模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetMeteringPoint(Camera\_CaptureSession\* session, Camera\_Point\* point)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getmeteringpoint) | - | 获取当前测量点。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetMeteringPoint(Camera\_CaptureSession\* session, Camera\_Point point)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setmeteringpoint) | - | 设置计量区域的中心点。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetExposureBiasRange(Camera\_CaptureSession\* session, float\* minExposureBias, float\* maxExposureBias, float\* step)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getexposurebiasrange) | - | 查询曝光补偿范围。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetExposureBias(Camera\_CaptureSession\* session, float exposureBias)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setexposurebias) | - | 设置曝光补偿。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetExposureBias(Camera\_CaptureSession\* session, float\* exposureBias)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getexposurebias) | - | 获取当前曝光补偿。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsFocusModeSupported(Camera\_CaptureSession\* session, Camera\_FocusMode focusMode, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_isfocusmodesupported) | - | 检查是否支持指定的聚焦模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetFocusMode(Camera\_CaptureSession\* session, Camera\_FocusMode\* focusMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getfocusmode) | - | 获取当前聚焦模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetFocusMode(Camera\_CaptureSession\* session, Camera\_FocusMode focusMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setfocusmode) | - | 设置聚焦模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetFocusPoint(Camera\_CaptureSession\* session, Camera\_Point\* focusPoint)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getfocuspoint) | - | 获取当前焦点。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetFocusPoint(Camera\_CaptureSession\* session, Camera\_Point focusPoint)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setfocuspoint) | - | 设置焦点。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetZoomRatioRange(Camera\_CaptureSession\* session, float\* minZoom, float\* maxZoom)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getzoomratiorange) | - | 获取所有支持的缩放比例范围。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetZoomRatio(Camera\_CaptureSession\* session, float\* zoom)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getzoomratio) | - | 获取当前缩放比例。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetZoomRatio(Camera\_CaptureSession\* session, float zoom)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setzoomratio) | - | 设置缩放比例。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsVideoStabilizationModeSupported(Camera\_CaptureSession\* session, Camera\_VideoStabilizationMode mode, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_isvideostabilizationmodesupported) | - | 检查是否支持指定的录像防抖模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetVideoStabilizationMode(Camera\_CaptureSession\* session, Camera\_VideoStabilizationMode\* mode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getvideostabilizationmode) | - | 获取当前录像防抖模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetVideoStabilizationMode(Camera\_CaptureSession\* session, Camera\_VideoStabilizationMode mode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setvideostabilizationmode) | - | 设置录像防抖模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanAddInput(Camera\_CaptureSession\* session, Camera\_Input\* cameraInput, bool\* isSuccessful)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canaddinput) | - | 确定是否可以将相机输入添加到会话中。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanAddPreviewOutput(Camera\_CaptureSession\* session, Camera\_PreviewOutput\* cameraOutput, bool\* isSuccessful)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canaddpreviewoutput) | - | 确定是否可以将相机预览输出添加到会话中。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanAddPhotoOutput(Camera\_CaptureSession\* session, Camera\_PhotoOutput\* cameraOutput, bool\* isSuccessful)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canaddphotooutput) | - | 确定是否可以将拍照输出添加到会话中。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanAddVideoOutput(Camera\_CaptureSession\* session, Camera\_VideoOutput\* cameraOutput, bool\* isSuccessful)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canaddvideooutput) | - | 确定是否可以将录像输出添加到会话中。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanPreconfig(Camera\_CaptureSession\* session, Camera\_PreconfigType preconfigType, bool\* canPreconfig)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canpreconfig) | - | 检查是否支持指定的预配置类型。 |
| [Camera\_ErrorCode OH\_CaptureSession\_CanPreconfigWithRatio(Camera\_CaptureSession\* session, Camera\_PreconfigType preconfigType, Camera\_PreconfigRatio preconfigRatio, bool\* canPreconfig)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_canpreconfigwithratio) | - | 检查是否支持带比例的预配置类型。 |
| [Camera\_ErrorCode OH\_CaptureSession\_Preconfig(Camera\_CaptureSession\* session, Camera\_PreconfigType preconfigType)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_preconfig) | - | 设置预配置类型。 |
| [Camera\_ErrorCode OH\_CaptureSession\_PreconfigWithRatio(Camera\_CaptureSession\* session, Camera\_PreconfigType preconfigType, Camera\_PreconfigRatio preconfigRatio)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_preconfigwithratio) | - | 设置带有比例的预配置类型。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetExposureValue(Camera\_CaptureSession\* session, float\* exposureValue)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getexposurevalue) | - | 查询曝光值。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetFocalLength(Camera\_CaptureSession\* session, float\* focalLength)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getfocallength) | - | 获取当前焦距值。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetSmoothZoom(Camera\_CaptureSession\* session, float targetZoom, Camera\_SmoothZoomMode smoothZoomMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setsmoothzoom) | - | 触发平滑变焦。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetSupportedColorSpaces(Camera\_CaptureSession\* session, OH\_NativeBuffer\_ColorSpace\*\* colorSpace, uint32\_t\* size)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getsupportedcolorspaces) | - | 获取支持的色彩空间列表。 |
| [Camera\_ErrorCode OH\_CaptureSession\_DeleteColorSpaces(Camera\_CaptureSession\* session, OH\_NativeBuffer\_ColorSpace\* colorSpace)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_deletecolorspaces) | - | 删除色彩空间列表。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetActiveColorSpace(Camera\_CaptureSession\* session, OH\_NativeBuffer\_ColorSpace\* colorSpace)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getactivecolorspace) | - | 获取当前色彩空间。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetActiveColorSpace(Camera\_CaptureSession\* session, OH\_NativeBuffer\_ColorSpace colorSpace)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setactivecolorspace) | - | 设置当前色彩空间。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterAutoDeviceSwitchStatusCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange autoDeviceSwitchStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registerautodeviceswitchstatuscallback) | - | 注册设备切换事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterAutoDeviceSwitchStatusCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange autoDeviceSwitchStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregisterautodeviceswitchstatuscallback) | - | 注销设备切换事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsAutoDeviceSwitchSupported(Camera\_CaptureSession\* session, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_isautodeviceswitchsupported) | - | 检查是否支持自动设备切换。 |
| [Camera\_ErrorCode OH\_CaptureSession\_EnableAutoDeviceSwitch(Camera\_CaptureSession\* session, bool enabled)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_enableautodeviceswitch) | - | 是否启用相机设备的自动切换。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterSystemPressureLevelChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnSystemPressureLevelChange systemPressureLevelChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registersystempressurelevelchangecallback) | - | 注册系统压力状态变化回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterSystemPressureLevelChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnSystemPressureLevelChange systemPressureLevelChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregistersystempressurelevelchangecallback) | - | 注销系统压力状态变化回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetQualityPrioritization(Camera\_CaptureSession\* session, Camera\_QualityPrioritization qualityPrioritization)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setqualityprioritization) | - | 设置录像质量优先级。  默认为高录像质量，设置为功耗平衡将降低录像质量以减少功耗。实际功耗收益因平台而异。建议该接口在[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)和[OH\_CaptureSession\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_start)之间调用。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsMacroSupported(Camera\_CaptureSession\* session, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_ismacrosupported) | - | 检查是否支持微距能力。 |
| [Camera\_ErrorCode OH\_CaptureSession\_EnableMacro(Camera\_CaptureSession\* session, bool enabled)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_enablemacro) | - | 是否启用相机设备的微距能力。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetWhiteBalance(Camera\_CaptureSession\* session, int32\_t colorTemperature)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setwhitebalance) | - | 设置白平衡的色温。  设置前，建议通过[OH\_CaptureSession\_GetWhiteBalanceRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getwhitebalancerange)获取支持配置的白平衡色温范围。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetWhiteBalance(Camera\_CaptureSession\* session, int32\_t \*colorTemperature)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getwhitebalance) | - | 获取当前白平衡色温值。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetWhiteBalanceMode(Camera\_CaptureSession\* session, Camera\_WhiteBalanceMode\* whiteBalanceMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getwhitebalancemode) | - | 获取当前的白平衡模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsWhiteBalanceModeSupported(Camera\_CaptureSession\* session, Camera\_WhiteBalanceMode whiteBalanceMode, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_iswhitebalancemodesupported) | - | 检查是否支持指定的白平衡模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_SetWhiteBalanceMode(Camera\_CaptureSession\* session, Camera\_WhiteBalanceMode whiteBalanceMode)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setwhitebalancemode) | - | 设置白平衡模式。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetWhiteBalanceRange(Camera\_CaptureSession\* session, int32\_t \*minColorTemperature, int32\_t \*maxColorTemperature)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getwhitebalancerange) | - | 获取支持配置的白平衡色温范围。 |
| [Camera\_ErrorCode OH\_CaptureSession\_IsControlCenterSupported(Camera\_CaptureSession\* session, bool\* isSupported)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_iscontrolcentersupported) | - | 检查是否支持相机控制器。 |
| [Camera\_ErrorCode OH\_CaptureSession\_GetSupportedEffectTypes(Camera\_CaptureSession\* session, Camera\_ControlCenterEffectType\*\* types, uint32\_t\* size)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getsupportedeffecttypes) | - | 获取相机控制器支持的效果类型。 |
| [Camera\_ErrorCode OH\_CaptureSession\_DeleteSupportedEffectTypes(Camera\_CaptureSession\* session, Camera\_ControlCenterEffectType\* types, uint32\_t size)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_deletesupportedeffecttypes) | - | 删除相机控制器效果类型列表。 |
| [Camera\_ErrorCode OH\_CaptureSession\_EnableControlCenter(Camera\_CaptureSession\* session, bool enabled)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_enablecontrolcenter) | - | 是否启用相机控制器。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterControlCenterEffectStatusChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnControlCenterEffectStatusChange controlCenterEffectStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registercontrolcentereffectstatuschangecallback) | - | 注册相机控制器效果激活状态变化回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterControlCenterEffectStatusChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnControlCenterEffectStatusChange controlCenterEffectStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregistercontrolcentereffectstatuschangecallback) | - | 注销相机控制器效果激活状态变化回调。 |
| [typedef void (\*OH\_CaptureSession\_OnMacroStatusChange)(Camera\_CaptureSession\* session, bool isMacroDetected)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onmacrostatuschange) | OH\_CaptureSession\_OnMacroStatusChange | 相机会话微距状态改变回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterMacroStatusChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnMacroStatusChange macroStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registermacrostatuschangecallback) | - | 注册相机会话微距状态改变回调函数。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterMacroStatusChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnMacroStatusChange macroStatusChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregistermacrostatuschangecallback) | - | 取消注册相机会话微距状态改变回调函数。 |
| [typedef void (\*OH\_CaptureSession\_OnIsoChange)(Camera\_CaptureSession\* session, int32\_t isoValue)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onisochange) | OH\_CaptureSession\_OnIsoChange | 用于在相机会话中监听感光度（ISO）变化的回调函数。 |
| [Camera\_ErrorCode OH\_CaptureSession\_RegisterIsoChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnIsoChange isoChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_registerisochangecallback) | - | 注册监听感光度（ISO）改变的事件回调。 |
| [Camera\_ErrorCode OH\_CaptureSession\_UnregisterIsoChangeCallback(Camera\_CaptureSession\* session, OH\_CaptureSession\_OnIsoChange isoChange)](/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_unregisterisochangecallback) | - | 取消注册监听感光度（ISO）改变的事件回调。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_CaptureSession\_OnFocusStateChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnFocusStateChange)(Camera_CaptureSession* session, Camera_FocusState focusState)
```

**描述**

在[CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)中被调用的捕获会话焦点状态回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_FocusState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusstate) focusState | 回调传递的会话焦点状态。 |

### OH\_CaptureSession\_OnError()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnError)(Camera_CaptureSession* session, Camera_ErrorCode errorCode)
```

**描述**

在[CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)中被调用的捕获会话错误回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) errorCode | 捕获会话的错误码。 |

**参考：**

[CAMERA\_SERVICE\_FATAL\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode)

### OH\_CaptureSession\_OnSmoothZoomInfo()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnSmoothZoomInfo)(Camera_CaptureSession* session, Camera_SmoothZoomInfo* smoothZoomInfo)
```

**描述**

拍照会话平滑变焦信息回调，触发平滑变焦后该回调会返回。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_SmoothZoomInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-smoothzoominfo)\* smoothZoomInfo | 回调传递的平滑变焦参数信息。 |

### OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnAutoDeviceSwitchStatusChange)(Camera_CaptureSession* session, Camera_AutoDeviceSwitchStatusInfo* autoDeviceSwitchStatusInfo)
```

**描述**

捕获会话设备切换状态回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_AutoDeviceSwitchStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-autodeviceswitchstatusinfo)\* autoDeviceSwitchStatusInfo | 回调传递的设备切换状态信息。 |

### OH\_CaptureSession\_OnSystemPressureLevelChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnSystemPressureLevelChange)(Camera_CaptureSession* session, Camera_SystemPressureLevel systemPressureLevel)
```

**描述**

捕获系统压力状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_SystemPressureLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_systempressurelevel) systemPressureLevel | 回调传递的系统压力等级。 |

### OH\_CaptureSession\_OnControlCenterEffectStatusChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnControlCenterEffectStatusChange)(Camera_CaptureSession* session, Camera_ControlCenterStatusInfo* controlCenterStatusInfo)
```

**描述**

相机控制器效果激活状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [Camera\_ControlCenterStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-controlcenterstatusinfo)\* controlCenterStatusInfo | 回调传递的相机控制器效果激活状态。 |

### OH\_CaptureSession\_RegisterCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterCallback(Camera_CaptureSession* session, CaptureSession_Callbacks* callback)
```

**描述**

注册捕获会话事件回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)\* callback | 要注册的捕获会话事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterCallback(Camera_CaptureSession* session, CaptureSession_Callbacks* callback)
```

**描述**

注销捕获会话事件回调。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [CaptureSession\_Callbacks](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-capturesession-callbacks)\* callback | 要注销的捕获会话事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_RegisterSmoothZoomInfoCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterSmoothZoomInfoCallback(Camera_CaptureSession* session, OH_CaptureSession_OnSmoothZoomInfo smoothZoomInfoCallback)
```

**描述**

注册平滑变焦信息事件回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnSmoothZoomInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsmoothzoominfo) smoothZoomInfoCallback | 要注册的平滑变焦信息事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterSmoothZoomInfoCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterSmoothZoomInfoCallback(Camera_CaptureSession* session, OH_CaptureSession_OnSmoothZoomInfo smoothZoomInfoCallback)
```

**描述**

注销平滑变焦信息事件回调。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnSmoothZoomInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsmoothzoominfo) smoothZoomInfoCallback | 要注销的平滑变焦信息事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_SetSessionMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetSessionMode(Camera_CaptureSession* session, Camera_SceneMode sceneMode)
```

**描述**

设置会话模式。

此接口不能在[OH\_CaptureSession\_BeginConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_beginconfig)之后使用。

建议在使用[OH\_CameraManager\_CreateCaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-manager-h#oh_cameramanager_createcapturesession)后立即使用此接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_SceneMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_scenemode) sceneMode | 相机模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。  CAMERA\_SESSION\_CONFIG\_LOCKED：会话配置已锁定。 |

### OH\_CaptureSession\_AddSecureOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddSecureOutput(Camera_CaptureSession* session, Camera_PreviewOutput* previewOutput)
```

**描述**

把其中一条PreviewOutput标记成安全输出。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreviewOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-previewoutput)\* previewOutput | 要标记为安全输出的Camera\_PreviewOutput。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。  CAMERA\_SESSION\_CONFIG\_LOCKED：会话配置已锁定。 |

### OH\_CaptureSession\_BeginConfig()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_BeginConfig(Camera_CaptureSession* session)
```

**描述**

开始捕获会话配置。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_CONFIG\_LOCKED：会话配置已锁定。 |

### OH\_CaptureSession\_CommitConfig()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CommitConfig(Camera_CaptureSession* session)
```

**描述**

提交捕获会话配置。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_AddInput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddInput(Camera_CaptureSession* session, Camera_Input* cameraInput)
```

**描述**

添加相机输入。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-input)\* cameraInput | 要添加的相机输入实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_RemoveInput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RemoveInput(Camera_CaptureSession* session, Camera_Input* cameraInput)
```

**描述**

删除相机输入。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-input)\* cameraInput | 要删除的相机输入实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_AddPreviewOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddPreviewOutput(Camera_CaptureSession* session, Camera_PreviewOutput* previewOutput)
```

**描述**

添加预览输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreviewOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-previewoutput)\* previewOutput | 要添加的预览输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_RemovePreviewOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RemovePreviewOutput(Camera_CaptureSession* session, Camera_PreviewOutput* previewOutput)
```

**描述**

删除预览输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreviewOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-previewoutput)\* previewOutput | 要删除的预览输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_AddPhotoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddPhotoOutput(Camera_CaptureSession* session, Camera_PhotoOutput* photoOutput)
```

**描述**

添加拍照输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PhotoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-photooutput)\* photoOutput | 要添加的拍照输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_RemovePhotoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RemovePhotoOutput(Camera_CaptureSession* session, Camera_PhotoOutput* photoOutput)
```

**描述**

删除拍照输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PhotoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-photooutput)\* photoOutput | 要删除的拍照输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_AddVideoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddVideoOutput(Camera_CaptureSession* session, Camera_VideoOutput* videoOutput)
```

**描述**

添加录像输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-videooutput)\* videoOutput | 要添加的录像输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_RemoveVideoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RemoveVideoOutput(Camera_CaptureSession* session, Camera_VideoOutput* videoOutput)
```

**描述**

删除录像输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-videooutput)\* videoOutput | 要删除的录像输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_AddMetadataOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_AddMetadataOutput(Camera_CaptureSession* session, Camera_MetadataOutput* metadataOutput)
```

**描述**

添加元数据输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_MetadataOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-metadataoutput)\* metadataOutput | 要添加的元数据输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_RemoveMetadataOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RemoveMetadataOutput(Camera_CaptureSession* session, Camera_MetadataOutput* metadataOutput)
```

**描述**

删除元数据输出。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_MetadataOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-metadataoutput)\* metadataOutput | 要删除的元数据输出实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_OPERATION\_NOT\_ALLOWED：操作不允许。 |

### OH\_CaptureSession\_Start()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_Start(Camera_CaptureSession* session)
```

**描述**

启动捕获会话。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 要启动的Camera\_CaptureSession实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_Stop()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_Stop(Camera_CaptureSession* session)
```

**描述**

停止捕获会话。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 要停止的Camera\_CaptureSession实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_Release()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_Release(Camera_CaptureSession* session)
```

**描述**

释放捕获会话。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 要释放的Camera\_CaptureSession实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_HasFlash()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_HasFlash(Camera_CaptureSession* session, bool* hasFlash)
```

**描述**

检查设备是否有闪光灯。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool\* hasFlash | 是否支持闪光灯的结果。返回true表示支持闪光灯，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_IsFlashModeSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsFlashModeSupported(Camera_CaptureSession* session, Camera_FlashMode flashMode, bool* isSupported)
```

**描述**

检查是否支持指定的闪光灯模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FlashMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_flashmode) flashMode | 要检查的闪光灯模式。 |
| bool\* isSupported | 是否支持闪光灯模式的结果。返回true表示支持闪光灯模式，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetFlashMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetFlashMode(Camera_CaptureSession* session, Camera_FlashMode* flashMode)
```

**描述**

获取当前闪光灯模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FlashMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_flashmode)\* flashMode | 当前闪光灯模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetFlashMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetFlashMode(Camera_CaptureSession* session, Camera_FlashMode flashMode)
```

**描述**

设置闪光灯模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FlashMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_flashmode) flashMode | 要设置的闪光灯模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_IsExposureModeSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsExposureModeSupported(Camera_CaptureSession* session, Camera_ExposureMode exposureMode, bool* isSupported)
```

**描述**

检查是否支持指定的曝光模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_ExposureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_exposuremode) exposureMode | 要检查的曝光模式。 |
| bool\* isSupported | 是否支持曝光模式的结果。返回true表示支持曝光模式，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetExposureMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetExposureMode(Camera_CaptureSession* session, Camera_ExposureMode* exposureMode)
```

**描述**

获取当前曝光模式。如果未通过[OH\_CaptureSession\_SetExposureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setexposuremode)接口进行设置，则直接调用该接口查询当前曝光模式，会返回无效值。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_ExposureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_exposuremode)\* exposureMode | 当前的曝光模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetExposureMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetExposureMode(Camera_CaptureSession* session, Camera_ExposureMode exposureMode)
```

**描述**

设置曝光模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_ExposureMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_exposuremode) exposureMode | 要设置的曝光模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetMeteringPoint()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetMeteringPoint(Camera_CaptureSession* session, Camera_Point* point)
```

**描述**

获取当前测量点。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-point)\* point | 当前测量点。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetMeteringPoint()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetMeteringPoint(Camera_CaptureSession* session, Camera_Point point)
```

**描述**

设置计量区域的中心点。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-point) point | 要设置的测量点。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetExposureBiasRange()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetExposureBiasRange(Camera_CaptureSession* session, float* minExposureBias, float* maxExposureBias, float* step)
```

**描述**

查询曝光补偿范围。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* minExposureBias | 曝光补偿的最小值。 |
| float\* maxExposureBias | 曝光补偿的最大值。 |
| float\* step | 每个级别之间的曝光补偿阶梯。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetExposureBias()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetExposureBias(Camera_CaptureSession* session, float exposureBias)
```

**描述**

设置曝光补偿。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float exposureBias | 要设置的曝光补偿。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetExposureBias()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetExposureBias(Camera_CaptureSession* session, float* exposureBias)
```

**描述**

获取当前曝光补偿。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* exposureBias | 当前的曝光补偿。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_IsFocusModeSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsFocusModeSupported(Camera_CaptureSession* session, Camera_FocusMode focusMode, bool* isSupported)
```

**描述**

检查是否支持指定的聚焦模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FocusMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusmode) focusMode | 要检查的聚焦模式。 |
| bool\* isSupported | 是否支持聚焦模式的结果。返回true表示支持聚焦模式，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetFocusMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetFocusMode(Camera_CaptureSession* session, Camera_FocusMode* focusMode)
```

**描述**

获取当前聚焦模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FocusMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusmode)\* focusMode | 当前聚焦模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetFocusMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetFocusMode(Camera_CaptureSession* session, Camera_FocusMode focusMode)
```

**描述**

设置聚焦模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_FocusMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusmode) focusMode | 要设置的聚焦模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetFocusPoint()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetFocusPoint(Camera_CaptureSession* session, Camera_Point* focusPoint)
```

**描述**

获取当前焦点。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-point)\* focusPoint | 当前焦点。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetFocusPoint()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetFocusPoint(Camera_CaptureSession* session, Camera_Point focusPoint)
```

**描述**

设置焦点。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-point) focusPoint | 要设置的目标点。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetZoomRatioRange()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetZoomRatioRange(Camera_CaptureSession* session, float* minZoom, float* maxZoom)
```

**描述**

获取所有支持的缩放比例范围。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* minZoom | 缩放比范围的最小值。 |
| float\* maxZoom | 缩放比例范围的最大值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetZoomRatio()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetZoomRatio(Camera_CaptureSession* session, float* zoom)
```

**描述**

获取当前缩放比例。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* zoom | 当前缩放比例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetZoomRatio()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetZoomRatio(Camera_CaptureSession* session, float zoom)
```

**描述**

设置缩放比例。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float zoom | 要设置的目标缩放比。  设置可变焦距比到底层生效需要一定时间，获取正确设置的可变焦距比需要等待1~2帧的时间。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_IsVideoStabilizationModeSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsVideoStabilizationModeSupported(Camera_CaptureSession* session, Camera_VideoStabilizationMode mode, bool* isSupported)
```

**描述**

检查是否支持指定的录像防抖模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoStabilizationMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_videostabilizationmode) mode | 要检查的录像防抖模式。 |
| bool\* isSupported | 是否支持录像防抖模式的结果。返回true表示支持录像防抖模式，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetVideoStabilizationMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetVideoStabilizationMode(Camera_CaptureSession* session, Camera_VideoStabilizationMode* mode)
```

**描述**

获取当前录像防抖模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoStabilizationMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_videostabilizationmode)\* mode | 当前录像防抖模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetVideoStabilizationMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetVideoStabilizationMode(Camera_CaptureSession* session, Camera_VideoStabilizationMode mode)
```

**描述**

设置录像防抖模式。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoStabilizationMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_videostabilizationmode) mode | 要设置的录像防抖模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_CanAddInput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanAddInput(Camera_CaptureSession* session, Camera_Input* cameraInput, bool* isSuccessful)
```

**描述**

确定是否可以将相机输入添加到会话中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_Input](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-input)\* cameraInput | 要设置的相机输入实例。 |
| bool\* isSuccessful | 是否可以将相机输入添加到会话中的结果。返回true表示可以将相机输入添加到会话中，返回false表示不可以。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_CanAddPreviewOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanAddPreviewOutput(Camera_CaptureSession* session, Camera_PreviewOutput* cameraOutput, bool* isSuccessful)
```

**描述**

确定是否可以将相机预览输出添加到会话中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreviewOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-previewoutput)\* cameraOutput | 要设置的预览输出实例。 |
| bool\* isSuccessful | 是否可以将相机预览输出添加到会话中的结果。返回true表示可以将相机预览输出添加到会话中，返回false表示不可以。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_CanAddPhotoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanAddPhotoOutput(Camera_CaptureSession* session, Camera_PhotoOutput* cameraOutput, bool* isSuccessful)
```

**描述**

确定是否可以将拍照输出添加到会话中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PhotoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-photooutput)\* cameraOutput | 要设置的拍照输出实例。 |
| bool\* isSuccessful | 拍照输出是否可以添加到会话中的结果。返回true表示拍照输出可以添加到会话中，返回false表示不可以。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_CanAddVideoOutput()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanAddVideoOutput(Camera_CaptureSession* session, Camera_VideoOutput* cameraOutput, bool* isSuccessful)
```

**描述**

确定是否可以将录像输出添加到会话中。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_VideoOutput](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-videooutput)\* cameraOutput | 要添加的录像输出实例。 |
| bool\* isSuccessful | 录像输出是否可以添加到会话中的结果。返回true表示录像输出可以添加到会话中，返回false表示不可以。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_CanPreconfig()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanPreconfig(Camera_CaptureSession* session, Camera_PreconfigType preconfigType, bool* canPreconfig)
```

**描述**

检查是否支持指定的预配置类型。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreconfigType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigtype) preconfigType | 要检查的预配置类型。 |
| bool\* canPreconfig | 是否支持预配置的结果。返回true表示支持预配置，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_CanPreconfigWithRatio()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_CanPreconfigWithRatio(Camera_CaptureSession* session, Camera_PreconfigType preconfigType, Camera_PreconfigRatio preconfigRatio, bool* canPreconfig)
```

**描述**

检查是否支持带比例的预配置类型。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreconfigType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigtype) preconfigType | 要检查的预配置类型。 |
| [Camera\_PreconfigRatio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigratio) preconfigRatio | 要检查的预配置比例。 |
| bool\* canPreconfig | 是否支持预配置的结果。返回true表示支持预配置，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_Preconfig()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_Preconfig(Camera_CaptureSession* session, Camera_PreconfigType preconfigType)
```

**描述**

设置预配置类型。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreconfigType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigtype) preconfigType | 指定的预配置类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_PreconfigWithRatio()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_PreconfigWithRatio(Camera_CaptureSession* session, Camera_PreconfigType preconfigType, Camera_PreconfigRatio preconfigRatio)
```

**描述**

设置带有比例的预配置类型。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_PreconfigType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigtype) preconfigType | 指定的预配置类型。 |
| [Camera\_PreconfigRatio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigratio) preconfigRatio | 指定的预配置比例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_GetExposureValue()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetExposureValue(Camera_CaptureSession* session, float* exposureValue)
```

**描述**

查询曝光值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* exposureValue | 当前的曝光值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_GetFocalLength()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetFocalLength(Camera_CaptureSession* session, float* focalLength)
```

**描述**

获取当前焦距值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float\* focalLength | 当前焦距值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetSmoothZoom()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetSmoothZoom(Camera_CaptureSession* session, float targetZoom, Camera_SmoothZoomMode smoothZoomMode)
```

**描述**

触发平滑变焦。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| float targetZoom | 要设置的目标变焦比。 |
| [Camera\_SmoothZoomMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_smoothzoommode) smoothZoomMode | 平滑变焦模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetSupportedColorSpaces()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetSupportedColorSpaces(Camera_CaptureSession* session, OH_NativeBuffer_ColorSpace** colorSpace, uint32_t* size)
```

**描述**

获取支持的色彩空间列表。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| OH\_NativeBuffer\_ColorSpace\*\* colorSpace | 如果方法调用成功，将记录支持的OH\_NativeBuffer\_ColorSpace列表。 |
| uint32\_t\* size | 如果方法调用成功，将记录支持的OH\_NativeBuffer\_ColorSpace列表的大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_DeleteColorSpaces()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_DeleteColorSpaces(Camera_CaptureSession* session, OH_NativeBuffer_ColorSpace* colorSpace)
```

**描述**

删除色彩空间列表。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [OH\_NativeBuffer\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace)\* colorSpace | 如果方法调用成功，将删除的OH\_NativeBuffer\_ColorSpace列表。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_GetActiveColorSpace()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetActiveColorSpace(Camera_CaptureSession* session, OH_NativeBuffer_ColorSpace* colorSpace)
```

**描述**

获取当前色彩空间。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [OH\_NativeBuffer\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace)\* colorSpace | 当前的OH\_NativeBuffer\_ColorSpace。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_SetActiveColorSpace()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetActiveColorSpace(Camera_CaptureSession* session, OH_NativeBuffer_ColorSpace colorSpace)
```

**描述**

设置当前色彩空间。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [OH\_NativeBuffer\_ColorSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-buffer-common-h#oh_nativebuffer_colorspace) colorSpace | 要设置的目标OH\_NativeBuffer\_ColorSpace。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_RegisterAutoDeviceSwitchStatusCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterAutoDeviceSwitchStatusCallback(Camera_CaptureSession* session, OH_CaptureSession_OnAutoDeviceSwitchStatusChange autoDeviceSwitchStatusChange)
```

**描述**

注册设备切换事件回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onautodeviceswitchstatuschange) autoDeviceSwitchStatusChange | 要注册的设备切换事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterAutoDeviceSwitchStatusCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterAutoDeviceSwitchStatusCallback(Camera_CaptureSession* session, OH_CaptureSession_OnAutoDeviceSwitchStatusChange autoDeviceSwitchStatusChange)
```

**描述**

注销设备切换事件回调。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnAutoDeviceSwitchStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onautodeviceswitchstatuschange) autoDeviceSwitchStatusChange | 要注销的设备切换事件回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_IsAutoDeviceSwitchSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsAutoDeviceSwitchSupported(Camera_CaptureSession* session, bool* isSupported)
```

**描述**

检查是否支持自动设备切换。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool\* isSupported | 是否支持自动设备切换的结果。返回true表示支持自动设备切换，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_EnableAutoDeviceSwitch()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_EnableAutoDeviceSwitch(Camera_CaptureSession* session, bool enabled)
```

**描述**

是否启用相机设备的自动切换。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool enabled | 是否启用自动切换的标志。返回true表示启用自动切换，返回false表示不启用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_RegisterSystemPressureLevelChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterSystemPressureLevelChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnSystemPressureLevelChange systemPressureLevelChange)
```

**描述**

注册系统压力状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnSystemPressureLevelChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsystempressurelevelchange) systemPressureLevelChange | 要注册的系统压力状态变化OH\_CaptureSession\_OnSystemPressureLevelChange回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterSystemPressureLevelChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterSystemPressureLevelChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnSystemPressureLevelChange systemPressureLevelChange)
```

**描述**

注销系统压力状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnSystemPressureLevelChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onsystempressurelevelchange) systemPressureLevelChange | 要注销的系统压力状态变化OH\_CaptureSession\_OnSystemPressureLevelChange回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_SetQualityPrioritization()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetQualityPrioritization(Camera_CaptureSession* session, Camera_QualityPrioritization qualityPrioritization)
```

**描述**

设置录像质量优先级。

默认为高录像质量，设置为功耗平衡将降低录像质量以减少功耗。实际功耗收益因平台而异。建议该接口在[OH\_CaptureSession\_CommitConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_commitconfig)和[OH\_CaptureSession\_Start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_start)之间调用。

**起始版本：** 14

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_QualityPrioritization](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_qualityprioritization) qualityPrioritization | 要设置的录像质量优先级，默认为高录像质量。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_IsMacroSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsMacroSupported(Camera_CaptureSession* session, bool* isSupported)
```

**描述**

检查是否支持微距能力。

**起始版本：** 19

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool\* isSupported | 是否支持微距能力的结果。返回true表示支持微距能力，返回false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK = 0：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_EnableMacro()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_EnableMacro(Camera_CaptureSession* session, bool enabled)
```

**描述**

是否启用相机设备的微距能力。

**起始版本：** 19

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool enabled | 是否启用微距能力的标志。返回true表示启用微距能力，返回false表示不启用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK = 0：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。  CAMERA\_OPERATION\_NOT\_ALLOWED：不允许操作。 |

### OH\_CaptureSession\_SetWhiteBalance()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetWhiteBalance(Camera_CaptureSession* session, int32_t colorTemperature)
```

**描述**

设置白平衡的色温。

设置前，建议通过[OH\_CaptureSession\_GetWhiteBalanceRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_getwhitebalancerange)获取支持配置的白平衡色温范围。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| int32\_t colorTemperature | 色温值，单位为K。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：设置成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_GetWhiteBalance()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetWhiteBalance(Camera_CaptureSession* session, int32_t *colorTemperature)
```

**描述**

获取当前白平衡色温值。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| int32\_t \*colorTemperature | 色温值，单位为K。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：函数调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_GetWhiteBalanceMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetWhiteBalanceMode(Camera_CaptureSession* session, Camera_WhiteBalanceMode* whiteBalanceMode)
```

**描述**

获取当前的白平衡模式。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_WhiteBalanceMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_whitebalancemode)\* whiteBalanceMode | 白平衡模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：函数调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_IsWhiteBalanceModeSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsWhiteBalanceModeSupported(Camera_CaptureSession* session, Camera_WhiteBalanceMode whiteBalanceMode, bool* isSupported)
```

**描述**

检查是否支持指定的白平衡模式。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_WhiteBalanceMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_whitebalancemode) whiteBalanceMode | 指定的白平衡模式。 |
| bool\* isSupported | 用于返回是否支持指定的白平衡模式，支持返回true，否则返回false。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：函数调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_SetWhiteBalanceMode()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_SetWhiteBalanceMode(Camera_CaptureSession* session, Camera_WhiteBalanceMode whiteBalanceMode)
```

**描述**

设置白平衡模式。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_WhiteBalanceMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_whitebalancemode) whiteBalanceMode | 白平衡模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：设置成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_GetWhiteBalanceRange()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetWhiteBalanceRange(Camera_CaptureSession* session, int32_t *minColorTemperature, int32_t *maxColorTemperature)
```

**描述**

获取支持配置的白平衡色温范围。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| int32\_t \*minColorTemperature | 支持的最小色温值，单位为K。 |
| int32\_t \*maxColorTemperature | 支持的最大色温值，单位为K。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：函数调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：相机会话未配置。 |

### OH\_CaptureSession\_IsControlCenterSupported()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_IsControlCenterSupported(Camera_CaptureSession* session, bool* isSupported)
```

**描述**

检查是否支持相机控制器。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool\* isSupported | 是否支持相机控制器的结果。true表示支持，false表示不支持。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK = 0：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_GetSupportedEffectTypes()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_GetSupportedEffectTypes(Camera_CaptureSession* session, Camera_ControlCenterEffectType** types, uint32_t* size)
```

**描述**

获取相机控制器支持的效果类型。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_ControlCenterEffectType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_controlcentereffecttype)\*\* types | 如果方法调用成功，将记录支持的Camera\_ControlCenterEffectType列表。 |
| uint32\_t\* size | 如果方法调用成功，将记录支持的Camera\_ControlCenterEffectType列表的大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。 |

### OH\_CaptureSession\_DeleteSupportedEffectTypes()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_DeleteSupportedEffectTypes(Camera_CaptureSession* session, Camera_ControlCenterEffectType* types, uint32_t size)
```

**描述**

删除相机控制器效果类型列表。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| [Camera\_ControlCenterEffectType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_controlcentereffecttype)\* types | 如果方法调用成功，要删除的Camera\_ControlCenterEffectType列表。 |
| uint32\_t size | 要删除的Camera\_ControlCenterEffectType列表的大小。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_EnableControlCenter()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_EnableControlCenter(Camera_CaptureSession* session, bool enabled)
```

**描述**

是否启用相机控制器。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | Camera\_CaptureSession实例。 |
| bool enabled | 是否启用相机控制器的标志。true表示启用，false表示禁用。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK = 0：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SESSION\_NOT\_CONFIG：捕获会话未配置。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_CaptureSession\_RegisterControlCenterEffectStatusChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterControlCenterEffectStatusChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnControlCenterEffectStatusChange controlCenterEffectStatusChange)
```

**描述**

注册相机控制器效果激活状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnControlCenterEffectStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_oncontrolcentereffectstatuschange) controlCenterEffectStatusChange | 要注册的相机控制器效果激活状态变化OH\_CaptureSession\_OnControlCenterEffectStatusChange回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterControlCenterEffectStatusChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterControlCenterEffectStatusChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnControlCenterEffectStatusChange controlCenterEffectStatusChange)
```

**描述**

注销相机控制器效果激活状态变化回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 传递回调的Camera\_CaptureSession实例。 |
| [OH\_CaptureSession\_OnControlCenterEffectStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_oncontrolcentereffectstatuschange) controlCenterEffectStatusChange | 要注销的相机控制器效果激活状态变化OH\_CaptureSession\_OnControlCenterEffectStatusChange回调。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_OnMacroStatusChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnMacroStatusChange)(Camera_CaptureSession* session, bool isMacroDetected)
```

**描述**

相机会话微距状态改变回调。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession实例的指针。 |
| bool isMacroDetected | 是否进入超级微距，true表示进入超级微距，false表示未进入超级微距。 |

### OH\_CaptureSession\_RegisterMacroStatusChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterMacroStatusChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnMacroStatusChange macroStatusChange)
```

**描述**

注册相机会话微距状态改变回调函数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession实例的指针。 |
| [OH\_CaptureSession\_OnMacroStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onmacrostatuschange) macroStatusChange | 微距状态改变回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_UnregisterMacroStatusChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterMacroStatusChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnMacroStatusChange macroStatusChange)
```

**描述**

取消注册相机会话微距状态改变回调函数。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession实例的指针。 |
| [OH\_CaptureSession\_OnMacroStatusChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onmacrostatuschange) macroStatusChange | 微距状态改变回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。 |

### OH\_CaptureSession\_OnIsoChange()

PhonePC/2in1TabletTVWearable



```
1. typedef void (*OH_CaptureSession_OnIsoChange)(Camera_CaptureSession* session, int32_t isoValue)
```

**描述**

用于在相机会话中监听感光度（ISO）变化的回调函数。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession的指针。 |
| int32\_t isoValue | 回调中获取的感光度（ISO）的值。 |

### OH\_CaptureSession\_RegisterIsoChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_RegisterIsoChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnIsoChange isoChange)
```

**描述**

注册监听感光度（ISO）改变的事件回调。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession实例的指针。 |
| [OH\_CaptureSession\_OnIsoChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onisochange) isoChange | OH\_CaptureSession\_OnIsoChange类型的回调函数，用于监听ISO改变。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。 |

### OH\_CaptureSession\_UnregisterIsoChangeCallback()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_CaptureSession_UnregisterIsoChangeCallback(Camera_CaptureSession* session, OH_CaptureSession_OnIsoChange isoChange)
```

**描述**

取消注册监听感光度（ISO）改变的事件回调。

**起始版本：** 22

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_CaptureSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturesession)\* session | 指向Camera\_CaptureSession实例的指针。 |
| [OH\_CaptureSession\_OnIsoChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_onisochange) isoChange | OH\_CaptureSession\_OnIsoChange类型的回调函数，用于监听ISO改变。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数缺失或者参数类型不正确。 |