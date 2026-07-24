## 概述

PhoneTabletTV

声明Vulkan图形API平台的超帧接口。

**引用文件：** <graphics\_game\_sdk/frame\_generation\_vk.h>

**库：** libframegeneration.so

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
| struct [FG\_ContextDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___context_description___v_k) | 此结构体描述创建超帧上下文实例[FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)所需的属性信息。 |
| struct [FG\_ImageFormat\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k) | 此结构体描述超帧输入输出图像的格式信息，该接口仅适配Vulkan图形API平台。 |
| struct [FG\_ImageSync\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k) | 此结构体描述超帧输入输出图像同步状态信息，用于创建超帧图像内存屏障。 |
| struct [FG\_ImageInfo\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_info___v_k) | 此结构体描述超帧输入输出图像信息。 |
| struct [FG\_DispatchDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___v_k) | 此结构体描述下发帧生成命令[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)需要的参数信息，每一帧都需要进行更新。该接口仅适配Vulkan图形API平台。 |

### 类型定义

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef struct [FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk) [FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk) | 此结构体描述超帧上下文，该接口仅适配Vulkan图形API平台。 |
| typedef struct [FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk) [FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk) | 超帧输入输出图像结构体，该接口仅适配Vulkan图形API平台。 |
| typedef struct [FG\_ContextDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___context_description___v_k) [FG\_ContextDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_contextdescription_vk) | 此结构体描述创建超帧上下文实例[FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)所需的属性信息。 |
| typedef struct [FG\_ImageFormat\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k) [FG\_ImageFormat\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_imageformat_vk) | 此结构体描述超帧输入输出图像的格式信息，该接口仅适配Vulkan图形API平台。 |
| typedef struct [FG\_ImageSync\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_sync___v_k) [FG\_ImageSync\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_imagesync_vk) | 此结构体描述超帧输入输出图像同步状态信息，用于创建超帧图像内存屏障。 |
| typedef struct [FG\_ImageInfo\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_info___v_k) [FG\_ImageInfo\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_imageinfo_vk) | 此结构体描述超帧输入输出图像信息。 |
| typedef struct [FG\_DispatchDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___v_k) [FG\_DispatchDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_dispatchdescription_vk) | 此结构体描述下发帧生成命令[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)需要的参数信息，每一帧都需要进行更新。该接口仅适配Vulkan图形API平台。 |

### 函数

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* [HMS\_FG\_CreateContext\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_createcontext_vk)(const [FG\_ContextDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___context_description___v_k)\* contextDescription) | 创建超帧上下文实例，调用成功则返回指向[FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)对象的指针，失败返回nullptr。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_SetAlgorithmMode\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setalgorithmmode_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, const [FG\_AlgorithmModeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___algorithm_mode_info)\* predictionModeInfo) | 设置超帧算法模式，包括预测算法模式和运动估计模式，必选。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_SetResolution\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setresolution_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, const [FG\_ResolutionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___resolution_info)\* resolutionInfo) | 设置超帧输入输出图像分辨率，必选。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_SetCvvZSemantic\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setcvvzsemantic_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, [FG\_CvvZSemantic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_cvvzsemantic-1) semantic) | 设置超帧齐次裁剪空间Z/W范围及深度测试函数，可选调用，未调用则默认模式设置为FG\_CVV\_Z\_SEMANTIC\_ZERO\_TO\_ONE\_FORWARD\_Z。 该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_SetImageFormat\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setimageformat_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, const [FG\_ImageFormat\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___image_format___v_k)\* format) | 设置超帧输入输出图像格式，可选调用。未调用则真实帧颜色缓冲区和预测帧缓冲区图像格式默认为VK\_FORMAT\_R8G8B8A8\_UNORM； 深度模板缓冲区图像格式默认为VK\_FORMAT\_D24\_UNORM\_S8\_UINT。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_SetDepthStencilYDirectionInverted\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setdepthstencilydirectioninverted_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, bool inverted) | 设置颜色缓冲区相对深度模板缓冲区是否存在y轴翻转的标志位，可选调用，未调用则默认无翻转。如果渲染管线中颜色缓冲区相对深度模板缓冲区基于y轴翻转了180度，则设为true；如果颜色缓冲区与深度模板缓冲区绘制方向一致则设为false。该接口仅适配Vulkan图形API平台。 |
| [FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk)\* [HMS\_FG\_CreateImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_createimage_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, VkImage image, VkImageView view) | 创建超帧输入输出图像实例。真实帧颜色缓冲区、深度模板缓冲区、预测帧缓冲区均需要通过该接口创建对应的图像实例， 并传入预测帧生成接口[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)进行预测帧绘制。该接口将用户提供的图像资源和超帧算法实现之间建立关联。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_DestroyImage\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_destroyimage_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, [FG\_Image\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_image_vk)\* image) | 销毁超帧输入输出图像实例，取消对应关联。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_Activate\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_activate_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context) | 激活超帧上下文实例。已激活的超帧实例可调用[HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)接口生成预测帧，激活超帧上下文实例前必须先调用[HMS\_FG\_SetAlgorithmMode\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setalgorithmmode_vk)和[HMS\_FG\_SetResolution\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setresolution_vk)接口完成配置。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_Deactivate\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_deactivate_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context) | 去激活超帧上下文实例，可通过[HMS\_FG\_Activate\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_activate_vk)接口重新激活。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_IsActive\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_isactive_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, bool\* isActive) | 查询超帧上下文实例是否处于激活状态，该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_Dispatch\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, const [FG\_DispatchDescription\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___v_k)\* desc) | 配置帧预测所需的参数信息，生成预测帧，当前处于激活状态时有效，该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [HMS\_FG\_DestroyContext\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_destroycontext_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\*\* context) | 销毁超帧上下文实例并释放内存资源，该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode) [HMS\_FG\_SetIntegrationMode\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setintegrationmode_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, const [FG\_IntegrationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___intergration_info)\* integrationInfo) | 设置帧预测集成信息，当[FG\_PredictionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_predictionmode-1)为FG\_PREDICTION\_MODE\_INTERPOLATION时，[FG\_IntegrationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___intergration_info)中的presentMode、needDepthAndColorCache、needFlipColorTexture成员才会生效。其他情况下这些参数应忽略或设置为默认值。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode) [HMS\_FG\_SetUiPredictionEnabled\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_setuipredictionenabled_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, bool isEnabled) | 选择是否启用UI预测功能，这个功能只能在系统显示模式下启用，在游戏显示模式下无效。该接口仅适配Vulkan图形API平台。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode) [HMS\_FG\_SetTargetFps\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_settargetfps_vk)([FG\_Context\_VK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_context_vk)\* context, int targetFps) | 设置超帧后的目标帧率，这个设置仅在系统显示模式下生效，对游戏显示模式无影响。参数targetFps的取值范围[30, 144]旨在确保在不同平台上的性能稳定性和用户体验一致性。开发者应根据实际业务场景选择合适的帧率。该接口在游戏初次上架之后生效且仅适配Vulkan图形API平台。 |