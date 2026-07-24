## 概述

PhonePC/2in1TabletTVWearable

定义相机的基本接口和功能。

**引用文件：** <ohcamera/camera.h>

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
| [Camera\_DeviceQueryInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-devicequeryinfo) | Camera\_DeviceQueryInfo | 相机设备的查询信息。 |
| [Camera\_Size](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-size) | Camera\_Size | 大小参数。 |
| [Camera\_Profile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-profile) | Camera\_Profile | 相机流的配置文件。 |
| [Camera\_FrameRateRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-frameraterange) | Camera\_FrameRateRange | 帧速率范围。 |
| [Camera\_VideoProfile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-videoprofile) | Camera\_VideoProfile | 录像配置文件。 |
| [Camera\_OutputCapability](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-outputcapability) | Camera\_OutputCapability | 相机输出能力。 |
| [Camera\_Device](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-device) | Camera\_Device | 相机设备对象。 |
| [Camera\_StatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-statusinfo) | Camera\_StatusInfo | 相机状态信息。 |
| [Camera\_Point](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-point) | Camera\_Point | 点参数。 |
| [Camera\_Location](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-location) | Camera\_Location | 拍照位置。 |
| [Camera\_PhotoCaptureSetting](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-photocapturesetting) | Camera\_PhotoCaptureSetting | 要设置的拍照捕获选项。 |
| [Camera\_FrameShutterInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-frameshutterinfo) | Camera\_FrameShutterInfo | 帧快门回调信息。 |
| [Camera\_CaptureEndInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-captureendinfo) | Camera\_CaptureEndInfo | 捕获结束信息。 |
| [Camera\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-rect) | Camera\_Rect | 矩形定义。  检测点应在0-1坐标系内，该坐标系左上角为(0，0)，右下角为(1，1)。  此坐标系以设备充电口在右侧时的横向设备方向为基准。  例如应用的预览界面布局以设备充电口在下侧时的竖向方向为基准，布局宽高为(w，h)， 返回点为(x，y)，则转换后的坐标点为(1-y，x)。 |
| [Camera\_MetadataObject](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-metadataobject) | Camera\_MetadataObject | 元数据对象基础。 |
| [Camera\_TorchStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-torchstatusinfo) | Camera\_TorchStatusInfo | 手电筒状态信息。 |
| [Camera\_SmoothZoomInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-smoothzoominfo) | Camera\_SmoothZoomInfo | 平滑变焦参数信息。 |
| [Camera\_CaptureStartInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-capturestartinfo) | Camera\_CaptureStartInfo | 拍照开始信息。 |
| [Camera\_FrameShutterEndInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-frameshutterendinfo) | Camera\_FrameShutterEndInfo | 拍照曝光结束信息。 |
| [Camera\_FoldStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-foldstatusinfo) | Camera\_FoldStatusInfo | 折叠状态信息。 |
| [Camera\_AutoDeviceSwitchStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-autodeviceswitchstatusinfo) | Camera\_AutoDeviceSwitchStatusInfo | 自动设备切换状态信息。 |
| [Camera\_ConcurrentInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-concurrentinfo) | Camera\_ConcurrentInfo | 相机并发能力信息。 |
| [Camera\_ControlCenterStatusInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-controlcenterstatusinfo) | Camera\_ControlCenterStatusInfo | 控制器效果激活状态信息。 |
| [Camera\_OcclusionDetectionResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-occlusiondetectionresult) | Camera\_OcclusionDetectionResult | 相机镜头遮挡、脏污检测结果。 |
| [OH\_Camera\_ZoomRange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-oh-camera-zoomrange) | OH\_Camera\_ZoomRange | 变焦范围配置。 |
| [OH\_Camera\_PhysicalAperture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-oh-camera-physicalaperture) | OH\_Camera\_PhysicalAperture | 物理光圈配置。 |
| [Camera\_Manager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-manager) | Camera\_Manager | 相机管理器对象。  可以使用[OH\_Camera\_GetCameraManager](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_getcameramanager)方法创建指针。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Camera\_ErrorCode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | Camera\_ErrorCode | 相机错误代码的枚举。 |
| [Camera\_Status](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_status) | Camera\_Status | 相机状态的枚举。 |
| [Camera\_SceneMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_scenemode) | Camera\_SceneMode | 相机模式的枚举。 |
| [Camera\_Position](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_position) | Camera\_Position | 相机位置的枚举。 |
| [Camera\_Type](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_type) | Camera\_Type | 相机类型的枚举。 |
| [Camera\_Connection](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_connection) | Camera\_Connection | 相机连接类型的枚举。 |
| [OH\_Camera\_SensorColorFilterArrangement](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_sensorcolorfilterarrangement) | OH\_Camera\_SensorColorFilterArrangement | 传感器滤色阵列排列方式。 |
| [Camera\_Format](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_format) | Camera\_Format | 相机格式类型的枚举。 |
| [Camera\_FlashMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_flashmode) | Camera\_FlashMode | 闪光模式的枚举。 |
| [OH\_Camera\_FlashState](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_flashstate) | OH\_Camera\_FlashState | 闪光灯状态枚举。 |
| [Camera\_ExposureMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_exposuremode) | Camera\_ExposureMode | 曝光模式的枚举。 |
| [OH\_Camera\_ExposureMeteringMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_exposuremeteringmode) | OH\_Camera\_ExposureMeteringMode | 曝光测光模式枚举。 |
| [Camera\_FocusMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusmode) | Camera\_FocusMode | 聚焦模式的枚举。 |
| [Camera\_FocusState](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_focusstate) | Camera\_FocusState | 焦点状态的枚举。 |
| [Camera\_VideoStabilizationMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_videostabilizationmode) | Camera\_VideoStabilizationMode | 录像防抖模式的枚举。 |
| [Camera\_ImageRotation](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_imagerotation) | Camera\_ImageRotation | 图像旋转角度的枚举。 |
| [Camera\_QualityLevel](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_qualitylevel) | Camera\_QualityLevel | 图像质量等级的枚举。 |
| [Camera\_MetadataObjectType](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_metadataobjecttype) | Camera\_MetadataObjectType | 元数据对象类型的枚举。 |
| [Camera\_TorchMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_torchmode) | Camera\_TorchMode | 手电筒模式的枚举。 |
| [Camera\_SmoothZoomMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_smoothzoommode) | Camera\_SmoothZoomMode | 平滑变焦模式的枚举。 |
| [Camera\_SystemPressureLevel](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_systempressurelevel) | Camera\_SystemPressureLevel | 系统压力等级的枚举。 |
| [Camera\_PreconfigType](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigtype) | Camera\_PreconfigType | 预配置照片分辨率的枚举。 |
| [Camera\_PreconfigRatio](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_preconfigratio) | Camera\_PreconfigRatio | 预配置照片比例的枚举。 |
| [Camera\_HostDeviceType](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_hostdevicetype) | Camera\_HostDeviceType | 远程设备类型枚举。 |
| [Camera\_FoldStatus](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_foldstatus) | Camera\_FoldStatus | 折叠状态枚举。 |
| [Camera\_QualityPrioritization](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_qualityprioritization) | Camera\_QualityPrioritization | 录像质量优先级的枚举。 |
| [Camera\_ConcurrentType](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_concurrenttype) | Camera\_ConcurrentType | 相机并发状态的枚举。 |
| [Camera\_WhiteBalanceMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_whitebalancemode) | Camera\_WhiteBalanceMode | 白平衡模式枚举。 |
| [Camera\_ControlCenterEffectType](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_controlcentereffecttype) | Camera\_ControlCenterEffectType | 控制器效果类型枚举。 |
| [Camera\_PhotoQualityPrioritization](/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_photoqualityprioritization) | Camera\_PhotoQualityPrioritization | 拍照画质优先策略枚举。 |
| [OH\_Camera\_OISMode](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_oismode) | OH\_Camera\_OISMode | 光学防抖（Optical Image Stabilization）模式枚举。 |
| [OH\_Camera\_OISAxes](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_oisaxes) | OH\_Camera\_OISAxes | 光学防抖（OIS）轴枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [Camera\_ErrorCode OH\_Camera\_GetCameraManager(Camera\_Manager\*\* cameraManager)](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_getcameramanager) | 创建CameraManager实例。 |
| [Camera\_ErrorCode OH\_Camera\_DeleteCameraManager(Camera\_Manager\* cameraManager)](/consumer/cn/doc/harmonyos-references/capi-camera-h#oh_camera_deletecameramanager) | 删除CameraManager实例。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### Camera\_ErrorCode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_ErrorCode
```

**描述**

相机错误代码的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_OK = 0 | 相机结果正常。 |
| CAMERA\_INVALID\_ARGUMENT = 7400101 | 参数丢失或参数类型不正确。 |
| CAMERA\_OPERATION\_NOT\_ALLOWED = 7400102 | 不允许操作。 |
| CAMERA\_SESSION\_NOT\_CONFIG = 7400103 | 会话未配置。 |
| CAMERA\_SESSION\_NOT\_RUNNING = 7400104 | 会话未运行。 |
| CAMERA\_SESSION\_CONFIG\_LOCKED = 7400105 | 会话配置已锁定。 |
| CAMERA\_DEVICE\_SETTING\_LOCKED = 7400106 | 设备设置已锁定。 |
| CAMERA\_CONFLICT\_CAMERA = 7400107 | 因冲突而无法使用相机。 |
| CAMERA\_DEVICE\_DISABLED = 7400108 | 由于安全原因，相机已禁用。 |
| CAMERA\_DEVICE\_PREEMPTED = 7400109 | 因被抢占而无法使用相机。 |
| CAMERA\_UNRESOLVED\_CONFLICTS\_WITH\_CURRENT\_CONFIGURATIONS = 7400110 | 与当前配置存在冲突。  **起始版本：** 12 |
| CAMERA\_SERVICE\_FATAL\_ERROR = 7400201 | 相机服务异常。  比如没有相机权限、相机服务重启、跨进程调用异常等。 |

### Camera\_Status

PhonePC/2in1TabletTVWearable



```
1. enum Camera_Status
```

**描述**

相机状态的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_STATUS\_APPEAR = 0 | 显示状态。 |
| CAMERA\_STATUS\_DISAPPEAR = 1 | 消失状态。 |
| CAMERA\_STATUS\_AVAILABLE = 2 | 可用状态。 |
| CAMERA\_STATUS\_UNAVAILABLE = 3 | 不可用状态。 |

### Camera\_SceneMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_SceneMode
```

**描述**

相机模式的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| NORMAL\_PHOTO = 1 | 普通相机模式。 |
| NORMAL\_VIDEO = 2 | 普通视频模式。 |
| SECURE\_PHOTO = 12 | 安全相机模式，主要为银行等有活体检测等安全诉求的应用提供。安全相机的使用需要加密算法框架及可信应用服务，详情请参见[Device Certificate Kit简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/device-certificate-kit-intro)。 |

### Camera\_Position

PhonePC/2in1TabletTVWearable



```
1. enum Camera_Position
```

**描述**

相机位置的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_POSITION\_UNSPECIFIED = 0 | 相对于设备屏幕没有固定的朝向的相机。 |
| CAMERA\_POSITION\_BACK = 1 | 后置。 |
| CAMERA\_POSITION\_FRONT = 2 | 前置。 |

### Camera\_Type

PhonePC/2in1TabletTVWearable



```
1. enum Camera_Type
```

**描述**

相机类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_TYPE\_DEFAULT = 0 | 默认相机类型。 |
| CAMERA\_TYPE\_WIDE\_ANGLE = 1 | 广角相机。 |
| CAMERA\_TYPE\_ULTRA\_WIDE = 2 | 超广角相机。 |
| CAMERA\_TYPE\_TELEPHOTO = 3 | 长焦相机。 |
| CAMERA\_TYPE\_TRUE\_DEPTH = 4 | 景深相机。 |

### Camera\_Connection

PhonePC/2in1TabletTVWearable



```
1. enum Camera_Connection
```

**描述**

相机连接类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_CONNECTION\_BUILT\_IN = 0 | 内置相机。 |
| CAMERA\_CONNECTION\_USB\_PLUGIN = 1 | 使用USB连接的相机。 |
| CAMERA\_CONNECTION\_REMOTE = 2 | 远程相机。 |

### OH\_Camera\_SensorColorFilterArrangement

PhonePC/2in1TabletTVWearable



```
1. enum OH_Camera_SensorColorFilterArrangement
```

**描述**

传感器滤色阵列排列方式。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CAMERA\_SENSOR\_CFA\_BGGR = 0 | BGGR（Blue-Green-Green-Red）滤色阵列排列。  **起始版本：** 24 |
| OH\_CAMERA\_SENSOR\_CFA\_GBRG = 1 | GBRG（Green-Blue-Red-Green）滤色阵列排列。  **起始版本：** 24 |
| OH\_CAMERA\_SENSOR\_CFA\_GRBG = 2 | GRBG（Green-Red-Blue-Green）滤色阵列排列。  **起始版本：** 24 |
| OH\_CAMERA\_SENSOR\_CFA\_RGGB = 3 | RGGB（Red-Green-Green-Blue）滤色阵列排列。  **起始版本：** 24 |

### Camera\_Format

PhonePC/2in1TabletTVWearable



```
1. enum Camera_Format
```

**描述**

相机格式类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_FORMAT\_RGBA\_8888 = 3 | RGBA 8888格式。 |
| CAMERA\_FORMAT\_YUV\_420\_SP = 1003 | YUV 420格式。 |
| CAMERA\_FORMAT\_JPEG = 2000 | JPEG格式。 |
| CAMERA\_FORMAT\_YCBCR\_P010 = 2001 | YCBCR P010 格式。  **起始版本：** 12 |
| CAMERA\_FORMAT\_YCRCB\_P010 = 2002 | YCRCB P010 格式。  **起始版本：** 12 |
| CAMERA\_FORMAT\_HEIC = 2003 | HEIC格式。  **起始版本：** 13 |

### Camera\_FlashMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_FlashMode
```

**描述**

闪光模式的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| FLASH\_MODE\_CLOSE = 0 | 关闭模式。 |
| FLASH\_MODE\_OPEN = 1 | 打开模式。 |
| FLASH\_MODE\_AUTO = 2 | 自动模式。 |
| FLASH\_MODE\_ALWAYS\_OPEN = 3 | 始终打开模式。 |

### OH\_Camera\_FlashState

PhonePC/2in1TabletTVWearable



```
1. enum OH_Camera_FlashState
```

**描述**

闪光灯状态枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CAMERA\_FLASH\_STATE\_UNAVAILABLE = 0 | 闪光灯为不可用状态，为默认值。  **起始版本：** 24 |
| OH\_CAMERA\_FLASH\_STATE\_READY = 1 | 闪光灯为可用状态。  **起始版本：** 24 |
| OH\_CAMERA\_FLASH\_STATE\_FLASHING = 2 | 闪光灯已经被打开。  **起始版本：** 24 |

### Camera\_ExposureMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_ExposureMode
```

**描述**

曝光模式的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| EXPOSURE\_MODE\_UNSPECIFIED = -1 | 曝光模式未指定。  **起始版本：** 24 |
| EXPOSURE\_MODE\_LOCKED = 0 | 锁定曝光模式。 不支持曝光区域中心点设置。  设置该模式后，每次拍照时曝光都会默认锁定。 |
| EXPOSURE\_MODE\_AUTO = 1 | 自动曝光模式。支持曝光区域中心点设置，可以使用[OH\_CaptureSession\_SetMeteringPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-capture-session-h#oh_capturesession_setmeteringpoint)接口设置曝光区域中心点。  设置该模式后，仅设置后的首次拍照生效。 |
| EXPOSURE\_MODE\_CONTINUOUS\_AUTO = 2 | 连续自动曝光。  设置该模式后，拍照系统会根据每次的环境变化自动调整曝光。 |

### OH\_Camera\_ExposureMeteringMode

PhonePC/2in1TabletTVWearable



```
1. enum OH_Camera_ExposureMeteringMode
```

**描述**

曝光测光模式枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CAMERA\_EXPOSURE\_METERING\_MODE\_MATRIX = 0 | 矩阵测光模式。对整个画面测光，适用于自然风景拍摄。  **起始版本：** 24 |
| OH\_CAMERA\_EXPOSURE\_METERING\_MODE\_CENTER = 1 | 中央测光模式。对画面中心区域测光，适用于人像拍摄。  **起始版本：** 24 |
| OH\_CAMERA\_EXPOSURE\_METERING\_MODE\_SPOT = 2 | 点测光模式。对指定微小区域测光，适用于拍摄主体细节（如人物眼睛）。  **起始版本：** 24 |

### Camera\_FocusMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_FocusMode
```

**描述**

聚焦模式的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| FOCUS\_MODE\_MANUAL = 0 | 手动模式。 |
| FOCUS\_MODE\_CONTINUOUS\_AUTO = 1 | 连续自动模式。 |
| FOCUS\_MODE\_AUTO = 2 | 自动模式。 |
| FOCUS\_MODE\_LOCKED = 3 | 锁定模式。 |

### Camera\_FocusState

PhonePC/2in1TabletTVWearable



```
1. enum Camera_FocusState
```

**描述**

焦点状态的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| FOCUS\_STATE\_SCAN = 0 | 扫描状态。 |
| FOCUS\_STATE\_FOCUSED = 1 | 聚焦状态。 |
| FOCUS\_STATE\_UNFOCUSED = 2 | 非聚焦状态。 |

### Camera\_VideoStabilizationMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_VideoStabilizationMode
```

**描述**

录像防抖模式的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| STABILIZATION\_MODE\_OFF = 0 | 关闭录像防抖。 |
| STABILIZATION\_MODE\_LOW = 1 | LOW模式，提供基本的防抖效果。 |
| STABILIZATION\_MODE\_MIDDLE = 2 | MIDDLE模式，表示通过算法可以获得比LOW模式更好的效果。 |
| STABILIZATION\_MODE\_HIGH = 3 | HIGH模式，表示通过算法可以获得比MIDDLE模式更好的效果。 |
| STABILIZATION\_MODE\_AUTO = 4 | 自动选择模式，HDF相机可用。 |

### Camera\_ImageRotation

PhonePC/2in1TabletTVWearable



```
1. enum Camera_ImageRotation
```

**描述**

图像旋转角度的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| IAMGE\_ROTATION\_0 = 0 | 捕获图像旋转0度。  从API version 23开始，推荐使用新枚举值[CAMERA\_IMAGE\_ROTATION\_0](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_imagerotation)。 |
| CAMERA\_IMAGE\_ROTATION\_0 = 0 | 捕获图像旋转0度。  **起始版本：** 23 |
| IAMGE\_ROTATION\_90 = 90 | 捕获图像旋转90度。  从API version 23开始，推荐使用新枚举值[CAMERA\_IMAGE\_ROTATION\_90](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_imagerotation)。 |
| CAMERA\_IMAGE\_ROTATION\_90 = 90 | 捕获图像旋转90度。  **起始版本：** 23 |
| IAMGE\_ROTATION\_180 = 180 | 捕获图像旋转180度。  从API version 23开始，推荐使用新枚举值[CAMERA\_IMAGE\_ROTATION\_180](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_imagerotation)。 |
| CAMERA\_IMAGE\_ROTATION\_180 = 180 | 捕获图像旋转180度。  **起始版本：** 23 |
| IAMGE\_ROTATION\_270 = 270 | 捕获图像旋转270度。  从API version 23开始，推荐使用新枚举值[CAMERA\_IMAGE\_ROTATION\_270](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_imagerotation)。 |
| CAMERA\_IMAGE\_ROTATION\_270 = 270 | 捕获图像旋转270度。  **起始版本：** 23 |

### Camera\_QualityLevel

PhonePC/2in1TabletTVWearable



```
1. enum Camera_QualityLevel
```

**描述**

图像质量等级的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| QUALITY\_LEVEL\_HIGH = 0 | 高图像质量。 |
| QUALITY\_LEVEL\_MEDIUM = 1 | 中等图像质量。 |
| QUALITY\_LEVEL\_LOW = 2 | 低图像质量。 |

### Camera\_MetadataObjectType

PhonePC/2in1TabletTVWearable



```
1. enum Camera_MetadataObjectType
```

**描述**

元数据对象类型的枚举。

**起始版本：** 11

展开

| 枚举项 | 描述 |
| --- | --- |
| FACE\_DETECTION = 0 | 元数据的对象类型，用于人脸检测。  从API version 23开始，推荐使用新枚举值[CAMERA\_METADATA\_OBJECT\_TYPE\_FACE\_DETECTION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_metadataobjecttype)。 |
| CAMERA\_METADATA\_OBJECT\_TYPE\_FACE\_DETECTION = 0 | 元数据的对象类型，用于人脸检测。  **起始版本：** 23 |
| CAMERA\_METADATA\_OBJECT\_TYPE\_HUMAN\_BODY = 1 | 元数据的对象类型，用于人体检测。  **起始版本：** 23 |

### Camera\_TorchMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_TorchMode
```

**描述**

手电筒模式的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| OFF = 0 | 设备手电筒常关。  从API version 23开始，推荐使用新枚举值[CAMERA\_TORCH\_MODE\_OFF](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_torchmode)。 |
| CAMERA\_TORCH\_MODE\_OFF = 0 | 设备手电筒常关。  **起始版本：** 23 |
| ON = 1 | 设备手电筒常开。  从API version 23开始，推荐使用新枚举值[CAMERA\_TORCH\_MODE\_ON](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_torchmode)。 |
| CAMERA\_TORCH\_MODE\_ON = 1 | 设备手电筒常开。  **起始版本：** 23 |
| AUTO = 2 | 设备手电筒自动模式，将根据环境光照水平打开手电筒。  从API version 23开始，推荐使用新枚举值[CAMERA\_TORCH\_MODE\_AUTO](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_torchmode)。 |
| CAMERA\_TORCH\_MODE\_AUTO = 2 | 设备手电筒自动模式，将根据环境光照水平打开手电筒。  **起始版本：** 23 |

### Camera\_SmoothZoomMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_SmoothZoomMode
```

**描述**

平滑变焦模式的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| NORMAL = 0 | 贝塞尔曲线模式。  从API version 23开始，推荐使用新枚举值[CAMERA\_SMOOTH\_ZOOM\_MODE\_NORMAL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_smoothzoommode)。 |
| CAMERA\_SMOOTH\_ZOOM\_MODE\_NORMAL = 0 | 贝塞尔曲线模式。  **起始版本：** 23 |

### Camera\_SystemPressureLevel

PhonePC/2in1TabletTVWearable



```
1. enum Camera_SystemPressureLevel
```

**描述**

系统压力等级的枚举。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| SYSTEM\_PRESSURE\_NORMAL = 0 | 系统压力正常。 |
| SYSTEM\_PRESSURE\_MILD = 1 | 系统压力升高，但是系统不会主动管控。 |
| SYSTEM\_PRESSURE\_SEVERE = 2 | 系统压力可能对图像总质量、性能产生影响。 |
| SYSTEM\_PRESSURE\_CRITICAL = 3 | 系统图像质量、性能产生显著影响。 |
| SYSTEM\_PRESSURE\_SHUTDOWN = 4 | 系统压力过高，停止工作。 |

### Camera\_PreconfigType

PhonePC/2in1TabletTVWearable



```
1. enum Camera_PreconfigType
```

**描述**

预配置照片分辨率的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRECONFIG\_720P = 0 | 预配置照片分辨率为720P。 |
| PRECONFIG\_1080P = 1 | 预配置照片分辨率为1080P。 |
| PRECONFIG\_4K = 2 | 预配置照片分辨率为4K。 |
| PRECONFIG\_HIGH\_QUALITY = 3 | 预配置照片为高质量。 |
| PRECONFIG\_HIGH\_QUALITY\_PHOTOSESSION\_BT2020 = 4 | 预配置支持预览高动态范围显示和HDR动图拍摄。  **起始版本：** 23 |

### Camera\_PreconfigRatio

PhonePC/2in1TabletTVWearable



```
1. enum Camera_PreconfigRatio
```

**描述**

预配置照片比例的枚举。

**起始版本：** 12

展开

| 枚举项 | 描述 |
| --- | --- |
| PRECONFIG\_RATIO\_1\_1 = 0 | 预配置照片比例为1:1。 |
| PRECONFIG\_RATIO\_4\_3 = 1 | 预配置照片比例为4:3。 |
| PRECONFIG\_RATIO\_16\_9 = 2 | 预配置照片比例为16:9。 |

### Camera\_HostDeviceType

PhonePC/2in1TabletTVWearable



```
1. enum Camera_HostDeviceType
```

**描述**

远程设备类型枚举。

**起始版本：** 15

展开

| 枚举项 | 描述 |
| --- | --- |
| HOST\_DEVICE\_TYPE\_UNKNOWN\_TYPE = 0 | 未知设备类型。 |
| HOST\_DEVICE\_TYPE\_PHONE = 0x0E | 手机设备。 |
| HOST\_DEVICE\_TYPE\_TABLET = 0x11 | 平板设备。 |

### Camera\_FoldStatus

PhonePC/2in1TabletTVWearable



```
1. enum Camera_FoldStatus
```

**描述**

折叠状态枚举。

**起始版本：** 13

展开

| 枚举项 | 描述 |
| --- | --- |
| NON\_FOLDABLE = 0 | 不可折叠状态。  从API version 23开始，推荐使用新枚举值[CAMERA\_FOLD\_STATUS\_NON\_FOLDABLE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_foldstatus)。 |
| CAMERA\_FOLD\_STATUS\_NON\_FOLDABLE = 0 | 不可折叠状态。  **起始版本：** 23 |
| EXPANDED = 1 | 展开状态。  从API version 23开始，推荐使用新枚举值[CAMERA\_FOLD\_STATUS\_EXPANDED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_foldstatus)。 |
| CAMERA\_FOLD\_STATUS\_EXPANDED = 1 | 展开状态。  **起始版本：** 23 |
| FOLDED = 2 | 折叠状态。  从API version 23开始，推荐使用新枚举值[CAMERA\_FOLD\_STATUS\_FOLDED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_foldstatus)。 |
| CAMERA\_FOLD\_STATUS\_FOLDED = 2 | 折叠状态。  **起始版本：** 23 |

### Camera\_QualityPrioritization

PhonePC/2in1TabletTVWearable



```
1. enum Camera_QualityPrioritization
```

**描述**

录像质量优先级的枚举。

**起始版本：** 14

展开

| 枚举项 | 描述 |
| --- | --- |
| HIGH\_QUALITY = 0 | 高录像质量。 |
| POWER\_BALANCE = 1 | 功耗平衡录像质量。 |

### Camera\_ConcurrentType

PhonePC/2in1TabletTVWearable



```
1. enum Camera_ConcurrentType
```

**描述**

相机并发状态的枚举。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_CONCURRENT\_TYPE\_LIMITED\_CAPABILITY = 0 | 相机限制并发。 |
| CAMERA\_CONCURRENT\_TYPE\_FULL\_CAPABILITY = 1 | 相机全量并发。 |

### Camera\_WhiteBalanceMode

PhonePC/2in1TabletTVWearable



```
1. enum Camera_WhiteBalanceMode
```

**描述**

白平衡模式枚举。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_WHITE\_BALANCE\_MODE\_AUTO = 0 | 白平衡模式：自动。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_CLOUDY = 1 | 白平衡模式：阴天。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_INCANDESCENT = 2 | 白平衡模式：白炽灯。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_FLUORESCENT = 3 | 白平衡模式：荧光。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_DAYLIGHT = 4 | 白平衡模式：晴天。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_MANUAL = 5 | 白平衡模式：手动。 |
| CAMERA\_WHITE\_BALANCE\_MODE\_LOCKED = 6 | 白平衡模式：锁定。 |

### Camera\_ControlCenterEffectType

PhonePC/2in1TabletTVWearable



```
1. enum Camera_ControlCenterEffectType
```

**描述**

控制器效果类型枚举。

**起始版本：** 20

展开

| 枚举项 | 描述 |
| --- | --- |
| CONTROL\_CENTER\_EFFECT\_TYPE\_BEAUTY = 0 | 控制器效果类型：美颜。 |
| CONTROL\_CENTER\_EFFECT\_TYPE\_PORTRAIT = 1 | 控制器效果类型：人像虚化。 |

### Camera\_PhotoQualityPrioritization

PhonePC/2in1TabletTVWearable



```
1. enum Camera_PhotoQualityPrioritization
```

**描述**

拍照画质优先策略枚举。

**起始版本：** 21

展开

| 枚举项 | 描述 |
| --- | --- |
| CAMERA\_PHOTO\_QUALITY\_PRIORITIZATION\_HIGH\_QUALITY = 0 | 画质优先，拍照需要较长的时间，以输出高画质的图片。 |
| CAMERA\_PHOTO\_QUALITY\_PRIORITIZATION\_SPEED = 1 | 性能优先，会降低画质来提升拍照的速度。 |

### OH\_Camera\_OISMode

PhonePC/2in1TabletTVWearable



```
1. enum OH_Camera_OISMode
```

**描述**

光学防抖（Optical Image Stabilization）模式枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CAMERA\_OIS\_MODE\_OFF = 0 | 关闭光学防抖模式。 |
| OH\_CAMERA\_OIS\_MODE\_AUTO = 1 | 自动光学防抖模式。 |
| OH\_CAMERA\_OIS\_MODE\_CUSTOM = 2 | 手动光学防抖模式。 |

### OH\_Camera\_OISAxes

PhonePC/2in1TabletTVWearable



```
1. enum OH_Camera_OISAxes
```

**描述**

光学防抖（OIS）轴枚举。

**起始版本：** 24

展开

| 枚举项 | 描述 |
| --- | --- |
| OH\_CAMERA\_OIS\_AXES\_PITCH = 0 | 俯仰轴：控制相机机身上下旋转，即机身围绕与镜头水平方向的轴旋转。 |
| OH\_CAMERA\_OIS\_AXES\_YAW = 1 | 偏航轴：控制相机机身左右旋转，即机身围绕与镜头垂直方向的轴旋转。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_Camera\_GetCameraManager()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_Camera_GetCameraManager(Camera_Manager** cameraManager)
```

**描述**

创建CameraManager实例。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_Manager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-manager)\*\* cameraManager | 如果方法调用成功，将创建Camera\_Manager实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |

### OH\_Camera\_DeleteCameraManager()

PhonePC/2in1TabletTVWearable



```
1. Camera_ErrorCode OH_Camera_DeleteCameraManager(Camera_Manager* cameraManager)
```

**描述**

删除CameraManager实例。

**起始版本：** 11

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [Camera\_Manager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-camera-camera-manager)\* cameraManager | 要删除的Camera\_Manager实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [Camera\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-camera-h#camera_errorcode) | CAMERA\_OK：方法调用成功。  CAMERA\_INVALID\_ARGUMENT：参数丢失或参数类型不正确。  CAMERA\_SERVICE\_FATAL\_ERROR：相机服务异常。 |