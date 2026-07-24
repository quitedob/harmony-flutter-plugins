## 概述

PhoneTabletTV

声明不区分OpenGL ES和Vulkan图形API平台的OpenGTX接口。

**引用文件：** <graphics\_game\_sdk/opengtx\_base.h>

**库：** libopengtx.so

**系统能力：** SystemCapability.GraphicsGame.RenderAccelerate

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

## 汇总

PhoneTabletTV

### 结构体

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| struct [OpenGTX\_ConfigDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description) | 此结构体描述OpenGTX属性配置。 |
| struct [OpenGTX\_GameSceneInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___game_scene_info) | 此结构体描述游戏场景信息，游戏应用获取到场景后传递此参数。 |
| struct [OpenGTX\_FrameRenderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___frame_render_info) | 此结构体描述帧渲染信息，游戏应用获取到帧属性后传递此参数。该参数中的相机矩阵通常用于优化渲染层降负载方案的画质效果。 |
| struct [OpenGTX\_NetworkInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_info) | 此结构体描述当前设备网络信息，游戏应用获取到网络信息后传递此参数。 |
| struct [OpenGTX\_ResolutionValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___resolution_value) | 此结构体描述游戏应用的分辨率值。 |
| struct [OpenGTX\_Vector3](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___vector3) | 此结构体描述OpenGTX三维向量。 |
| struct [OpenGTX\_NetworkLatency](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_latency) | 此结构体描述当前设备网络延迟信息，游戏应用获取到网络延迟后传递此参数。该参数通常用于针对性优化网络延迟。 |

### 类型定义

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef enum [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode) | 此枚举描述OpenGTX接口调用错误码。 |
| typedef enum [OpenGTX\_LTPO\_Mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_ltpo_mode-1) [OpenGTX\_LTPO\_Mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_ltpo_mode) | 此枚举描述OpenGTX\_LTPO模式类型，以控制游戏中的帧率。 |
| typedef enum [OpenGTX\_EngineType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_enginetype-1) [OpenGTX\_EngineType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_enginetype) | 此枚举描述游戏应用的底层游戏引擎类型。 |
| typedef enum [OpenGTX\_GameType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_gametype-1) [OpenGTX\_GameType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_gametype) | 此枚举描述游戏应用的类型。 |
| typedef enum [OpenGTX\_SceneID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_sceneid-1) [OpenGTX\_SceneID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_sceneid) | 此枚举描述OpenGTX算法的游戏场景类型。 |
| typedef enum [OpenGTX\_PictureQualityMaxLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_picturequalitymaxlevel-1) [OpenGTX\_PictureQualityMaxLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_picturequalitymaxlevel) | 此枚举描述游戏应用的图像质量。 |
| typedef enum [OpenGTX\_TempLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_templevel-1) [OpenGTX\_TempLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_templevel) | 此枚举描述设备的温度级别。 |
| typedef struct [OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context) [OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context) | 此结构体描述OpenGTX上下文。 |
| typedef struct [OpenGTX\_ConfigDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description) [OpenGTX\_ConfigDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_configdescription) | 此结构体描述OpenGTX属性配置。 |
| typedef struct [OpenGTX\_GameSceneInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___game_scene_info) [OpenGTX\_GameSceneInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_gamesceneinfo) | 此结构体描述游戏场景信息，游戏应用获取到场景后传递此参数。 |
| typedef struct [OpenGTX\_FrameRenderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___frame_render_info) [OpenGTX\_FrameRenderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_framerenderinfo) | 此结构体描述帧渲染信息，游戏应用获取到帧属性后传递此参数。该参数中的相机矩阵通常用于优化渲染层降负载方案的画质效果。 |
| typedef struct [OpenGTX\_NetworkInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_info) [OpenGTX\_NetworkInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_networkinfo) | 此结构体描述当前设备网络信息，游戏应用获取到网络信息后传递此参数。 |
| typedef struct [OpenGTX\_ResolutionValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___resolution_value) [OpenGTX\_ResolutionValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_resolutionvalue) | 此结构体描述游戏应用的分辨率值。 |
| typedef struct [OpenGTX\_Vector3](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___vector3) [OpenGTX\_Vector3](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_vector3) | 此结构体描述OpenGTX三维向量。 |
| typedef struct [OpenGTX\_NetworkLatency](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_latency) [OpenGTX\_NetworkLatency](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_networklatency) | 此结构体描述当前设备网络延迟信息，游戏应用获取到网络延迟后传递此参数。该参数通常用于针对性优化网络延迟。 |
| typedef void(\* [OpenGTX\_DeviceInfoCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_deviceinfocallback)) ([OpenGTX\_TempLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_templevel-1)) | 设备的温度信息回调。 |

### 枚举

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) {  OPENGTX\_SUCCESS = 0,  OPENGTX\_INVALID\_PARAMETER = 401,  OPENGTX\_CONTEXT\_NOT\_CONFIG = 1009502001,  OPENGTX\_CONTEXT\_NOT\_ACTIVE = 1009502002  } | 此枚举描述OpenGTX接口调用错误码。 |
| [OpenGTX\_LTPO\_Mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_ltpo_mode-1) {  SCENE\_MODE = 0x0001,  TOUCH\_MODE = 0x0010,  ADAPTIVE\_MODE = 0x0100  } | 此枚举描述OpenGTX\_LTPO模式类型，以控制游戏中的帧率。 |
| [OpenGTX\_EngineType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_enginetype-1) {  UNITY = 1,  UNREAL = 2,  MESSIAH = 3,  COCOS = 4,  OTHERS\_ENGINE = 100  } | 此枚举描述游戏应用的底层游戏引擎类型。 |
| [OpenGTX\_GameType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_gametype-1) {  MOBA = 1,  RPG = 2,  FPS = 3,  RAC = 4,  OTHERS\_TYPE = 100  } | 此枚举描述游戏应用的类型。 |
| [OpenGTX\_SceneID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_sceneid-1) {  LOGIN = 1,  GAME\_INTERFACE = 2,  LOADING = 3,  PLAYING = 4,  SPECTATOR = 5,  DEATH = 6,  HEAVY\_LOAD = 7,  OTHERS\_SCENE = 100  } | 此枚举描述OpenGTX算法的游戏场景类型。 |
| [OpenGTX\_PictureQualityMaxLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_picturequalitymaxlevel-1) {  SD = 1,  HD = 2,  FHD = 3,  QHD = 4,  UHD = 5  } | 此枚举描述游戏应用的图像质量。 |
| [OpenGTX\_TempLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_templevel-1) {  TEMP\_LEVEL1 = 1,  TEMP\_LEVEL2 = 2,  TEMP\_LEVEL3 = 3,  TEMP\_LEVEL4 = 4,  TEMP\_LEVEL5 = 5,  TEMP\_LEVEL6 = 6  } | 此枚举描述设备的温度级别。 |

### 函数

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* [HMS\_OpenGTX\_CreateContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_createcontext)([OpenGTX\_DeviceInfoCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_deviceinfocallback) deviceInfoCallback) | 创建OpenGTX上下文实例，每次调用会新建[OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)对象，并返回指向[OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)对象的指针。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_Activate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_activate)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context) | 激活OpenGTX上下文实例。使用OpenGTX上下文实例前需要激活实例。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_Deactivate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_deactivate)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context) | 去激活OpenGTX上下文实例，可通过[HMS\_OpenGTX\_Activate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_activate)重新激活。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_SetConfiguration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_setconfiguration)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context, const [OpenGTX\_ConfigDescription](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description)\* config) | 初始化OpenGTX上下文实例，配置OpenGTX实例属性。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_DispatchFrameRenderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_dispatchframerenderinfo)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context, const [OpenGTX\_FrameRenderInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___frame_render_info)\* frameRenderInfo) | 设置OpenGTX运行所需的场景渲染关键信息，每帧变化均需要更新。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_DispatchGameSceneInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_dispatchgamesceneinfo)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context, const [OpenGTX\_GameSceneInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___game_scene_info)\* gameSceneInfo) | 设置OpenGTX运行所需的游戏场景信息。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_DispatchNetworkInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_dispatchnetworkinfo)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\* context, const [OpenGTX\_NetworkInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_info)\* networkInfo) | 设置OpenGTX运行所需的网络延迟信息。 |
| [OpenGTX\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_errorcode-1) [HMS\_OpenGTX\_DestroyContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_opengtx_destroycontext)([OpenGTX\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_context)\*\* context) | 销毁OpenGTX上下文实例并释放内存资源。 |