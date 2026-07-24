## 概述

PhoneTabletTV

声明不区分图形API平台的超帧接口。

**引用文件：** <graphics\_game\_sdk/frame\_generation\_base.h>

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
| struct [FG\_Mat4x4](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___mat4x4) | 此结构体描述列主序4x4矩阵。列主序是指在连续的线性内存地址中，优先按列遍历矩阵元素。 |
| struct [FG\_AlgorithmModeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___algorithm_mode_info) | 此结构体描述超帧算法模式信息。 |
| struct [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dimension2_d) | 此结构体描述2D图像分辨率，以px为单位。 |
| struct [FG\_ResolutionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___resolution_info) | 此结构体描述超帧输入输出图像的分辨率。 |
| struct [FG\_Vec3D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___vec3_d) | 此结构体描述超帧三维向量。 |
| struct [FG\_PerFrameExtendedCameraInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___per_frame_extended_camera_info) | 此结构体描述相机扩展信息。当视图投影矩阵的平移分量非常大时（超过十万），可以提供更加详细的相机信息以获得更加准确的超帧预测效果。 |
| struct [FG\_IntegrationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___intergration_info) | 此结构体描述超帧集成的信息。包括显示模式，是否需要额外缓存深度和颜色纹理，以及是否需要翻转颜色纹理。 |

### 类型定义

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| typedef struct [FG\_Mat4x4](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___mat4x4) [FG\_Mat4x4](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_mat4x4) | 此结构体描述列主序4x4矩阵。列主序是指在连续的线性内存地址中，优先按列遍历矩阵元素。 |
| typedef enum [FG\_PredictionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_predictionmode-1) [FG\_PredictionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_predictionmode) | 此枚举描述超帧预测算法模式。 |
| typedef enum [FG\_MeMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_memode-1) [FG\_MeMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_memode) | 此枚举描述超帧运动估计算法模式，支持基础模式和增强模式。 |
| typedef struct [FG\_AlgorithmModeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___algorithm_mode_info) [FG\_AlgorithmModeInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_algorithmmodeinfo) | 此结构体描述超帧算法模式信息。 |
| typedef enum [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode) | 此枚举描述超帧接口调用错误码。 |
| typedef enum [FG\_CvvZSemantic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_cvvzsemantic-1) [FG\_CvvZSemantic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_cvvzsemantic) | 此枚举描述经过相机投影变换后，齐次裁剪空间Z/W范围及深度测试模式。 |
| typedef enum [FG\_PresentMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_presentmode) [FG\_PresentMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_presentmode) | 定义预测帧呈现模式，该模式包括两种：游戏端预测帧呈现和系统端预测帧呈现。 |
| typedef struct [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___dimension2_d) [FG\_Dimension2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_dimension2d) | 此结构体描述2D图像分辨率，以px为单位。 |
| typedef struct [FG\_ResolutionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___resolution_info) [FG\_ResolutionInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_resolutioninfo) | 此结构体描述超帧输入输出图像的分辨率。 |
| typedef struct [FG\_Vec3D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___vec3_d) [FG\_Vec3D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___vec3_d) | 此结构体描述超帧三维向量。 |
| typedef struct [FG\_PerFrameExtendedCameraInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___per_frame_extended_camera_info) [FG\_PerFrameExtendedCameraInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___per_frame_extended_camera_info) | 此结构体描述相机扩展信息。当视图投影矩阵的平移分量非常大时（超过十万），可以提供更加详细的相机信息以获得更加准确的超帧预测效果。 |
| typedef struct [FG\_IntegrationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___intergration_info) | 此结构体描述超帧集成的信息。包括显示模式，是否需要额外缓存深度和颜色纹理，以及是否需要翻转颜色纹理。 |

### 枚举

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [FG\_PredictionMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_predictionmode-1) {  FG\_PREDICTION\_MODE\_INTERPOLATION = 0,  FG\_PREDICTION\_MODE\_EXTRAPOLATION = 1  } | 此枚举描述超帧预测算法模式。 |
| [FG\_MeMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_memode-1) {  FG\_ME\_MODE\_BASIC = 0,  FG\_ME\_MODE\_ENHANCED = 1  } | 此枚举描述超帧运动估计算法模式，支持基础模式和增强模式。 |
| [FG\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_errorcode-1) {  FG\_SUCCESS = 0,  FG\_INVALID\_PARAMETER = 401,  FG\_CONTEXT\_NOT\_CONFIG = 1009500001,  FG\_CONTEXT\_NOT\_ACTIVE = 1009500002,  FG\_COLLECTING\_PREVIOUS\_FRAMES = 1009500003  } | 此枚举描述超帧接口调用错误码。 |
| [FG\_CvvZSemantic](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_cvvzsemantic-1) {  FG\_CVV\_Z\_SEMANTIC\_MINUS\_ONE\_TO\_ONE\_FORWARD\_Z = 0,  FG\_CVV\_Z\_SEMANTIC\_ZERO\_TO\_ONE\_REVERSE\_Z = 1,  FG\_CVV\_Z\_SEMANTIC\_MINUS\_ONE\_TO\_ONE\_REVERSE\_Z = 2,  FG\_CVV\_Z\_SEMANTIC\_ZERO\_TO\_ONE\_FORWARD\_Z = 3  } | 此枚举描述经过相机投影变换后，齐次裁剪空间Z/W范围及深度测试模式。 |
| [FG\_PresentMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#fg_presentmode) {  FG\_PRESENT\_BY\_GAME = 0,  FG\_PRESENT\_BY\_SYSTEM = 1  } | 定义预测帧呈现模式，该模式包括两种：游戏端预测帧呈现和系统端预测帧呈现。 |