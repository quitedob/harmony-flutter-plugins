## 概述

PhoneTabletTV

此结构体描述OpenGTX属性配置。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [opengtx\_base.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/opengtx__base_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OpenGTX\_LTPO\_Mode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_ltpo_mode-1) [mode](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#mode) | LTPO方案模式，支持场景模式、触控模式、自适应模式。 |
| int32\_t [targetFPS](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#targetfps) | 游戏应用目标帧率，取值范围[30,144]。 |
| char\* [packageName](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#packagename) | 游戏包名，字节长度范围[1,256]。 |
| char\* [appVersion](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#appversion) | 游戏应用版本号，字节长度范围[1,256]。 |
| [OpenGTX\_EngineType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_enginetype-1) [engineType](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#enginetype) | 游戏引擎类型。 |
| char\* [engineVersion](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#engineversion) | 游戏引擎版本号，字节长度范围[0,256]。 |
| [OpenGTX\_GameType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_gametype-1) [gameType](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#gametype) | 游戏类型。 |
| [OpenGTX\_PictureQualityMaxLevel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#opengtx_picturequalitymaxlevel-1) [pictureQualityMaxLevel](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#picturequalitymaxlevel) | 图像质量。 |
| [OpenGTX\_ResolutionValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_open_g_t_x___resolution_value) [resolutionMaxValue](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#resolutionmaxvalue) | 游戏应用支持的最高分辨率，取值范围360p-8k。 |
| int32\_t [gameMainThreadId](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#gamemainthreadid) | 游戏应用的逻辑线程ID，取值范围[0,∞)。 |
| int32\_t [gameRenderThreadId](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#gamerenderthreadid) | 游戏应用的渲染线程ID，取值范围[0,∞)。 |
| int32\_t [gameKeyThreadIds](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#gamekeythreadids5) [5] | 游戏应用的关键线程ID列表，取值范围[0,∞)。 |
| bool [vulkanSupport](/consumer/cn/doc/harmonyos-references/_open_g_t_x___config_description#vulkansupport) | 是否支持Vulkan。  取值范围：[true, false]。 |

## 结构体成员变量说明

PhoneTabletTV

### appVersion

PhoneTabletTV



```
1. char* OpenGTX_ConfigDescription::appVersion
```

**描述**

游戏应用版本号，字节长度范围[1,256]。

### engineType

PhoneTabletTV



```
1. OpenGTX_EngineType OpenGTX_ConfigDescription::engineType
```

**描述**

游戏引擎类型。

### engineVersion

PhoneTabletTV



```
1. char* OpenGTX_ConfigDescription::engineVersion
```

**描述**

游戏引擎版本号，字节长度范围[0,256]。

### gameKeyThreadIds[5]

PhoneTabletTV



```
1. int32_t OpenGTX_ConfigDescription::gameKeyThreadIds[5]
```

**描述**

游戏应用的关键线程ID列表，取值范围[0,∞)。

### gameMainThreadId

PhoneTabletTV



```
1. int32_t OpenGTX_ConfigDescription::gameMainThreadId
```

**描述**

游戏应用的逻辑线程ID，取值范围[0,∞)。

### gameRenderThreadId

PhoneTabletTV



```
1. int32_t OpenGTX_ConfigDescription::gameRenderThreadId
```

**描述**

游戏应用的渲染线程ID，取值范围[0,∞)。

### gameType

PhoneTabletTV



```
1. OpenGTX_GameType OpenGTX_ConfigDescription::gameType
```

**描述**

游戏类型。

### mode

PhoneTabletTV



```
1. OpenGTX_LTPO_Mode OpenGTX_ConfigDescription::mode
```

**描述**

LTPO方案模式，支持场景模式、触控模式、自适应模式。

### packageName

PhoneTabletTV



```
1. char* OpenGTX_ConfigDescription::packageName
```

**描述**

游戏包名，字节长度范围[1,256]。

### pictureQualityMaxLevel

PhoneTabletTV



```
1. OpenGTX_PictureQualityMaxLevel OpenGTX_ConfigDescription::pictureQualityMaxLevel
```

**描述**

图像质量。

### resolutionMaxValue

PhoneTabletTV



```
1. OpenGTX_ResolutionValue OpenGTX_ConfigDescription::resolutionMaxValue
```

**描述**

游戏应用支持的最高分辨率，取值范围360p-8k。

### targetFPS

PhoneTabletTV



```
1. int32_t OpenGTX_ConfigDescription::targetFPS
```

**描述**

游戏应用目标帧率，取值范围[30,144]。

### vulkanSupport

PhoneTabletTV



```
1. bool OpenGTX_ConfigDescription::vulkanSupport
```

**描述**

是否支持Vulkan。