## 概述

PhonePC/2in1TabletTV

光线追踪阴影（Shadow）算法参数。

**起始版本：** 6.0.0(20)

**相关模块：** [XEngine](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xengine)

**所在头文件：** [xeg\_vulkan\_rt\_visible\_mask.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-vulkan-rt-visible-mask-8h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| float [rayTMax](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#raytmax) | 阴影光线的tMax值。 |
| float [rayTMin](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#raytmin) | 阴影光线的tMin值。 |
| float [sunDirection](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#sundirection) [3] | 方向光的方向。 |
| float [raySourceAngleInDegree](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#raysourceangleindegree) = 0.0f | 沿光源方向进行阴影采样的角度范围，值越大，半影区域越大。此参数的值将被限制在[0.0, 90.0]范围内。默认值为0.0。 |
| uint32\_t [shadowCullMask](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#shadowcullmask) = 0x5FF | 配置光线查询[rayQueryInitializeEXT](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_query.txt)函数中的rayFlags和cullMask参数，高24bit表示rayFlags，低8bit表示cullMask。 默认值为0x5FF，即 ((gl\_RayFlagsOpaqueEXT | gl\_RayFlagsTerminateOnFirstHitEXT) << 8) | 0xFF。 |
| float [shadowCullDistance](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#shadowculldistance) | 阴影剔除的世界空间距离，场景中像素超过此距离时不计算阴影，必须大于0。 |
| uint32\_t [rayPerPixel](/consumer/cn/doc/harmonyos-references/xengine-kit-xeg-rtshadowparameters#rayperpixel) = 1 | 每像素采样数，当前仅支持1spp。默认值为1。 |

## 结构体成员变量说明

PhonePC/2in1TabletTV

### rayPerPixel

PhonePC/2in1TabletTV



```
1. uint32_t XEG_RTShadowParameters::rayPerPixel = 1
```

**描述**

每像素采样数，当前仅支持1spp。默认值为1。

### raySourceAngleInDegree

PhonePC/2in1TabletTV



```
1. float XEG_RTShadowParameters::raySourceAngleInDegree = 0.0f
```

**描述**

沿光源方向进行阴影采样的角度范围，值越大，半影区域越大。此参数的值将被限制在[0.0, 90.0]范围内。默认值为0.0。

### rayTMax

PhonePC/2in1TabletTV



```
1. float XEG_RTShadowParameters::rayTMax
```

**描述**

阴影光线的tMax值。

### rayTMin

PhonePC/2in1TabletTV



```
1. float XEG_RTShadowParameters::rayTMin
```

**描述**

阴影光线的tMin值。

### shadowCullDistance

PhonePC/2in1TabletTV



```
1. float XEG_RTShadowParameters::shadowCullDistance
```

**描述**

阴影剔除的世界空间距离，场景中像素超过此距离时不计算阴影，必须大于0。

### shadowCullMask

PhonePC/2in1TabletTV



```
1. uint32_t XEG_RTShadowParameters::shadowCullMask = 0x5FF
```

**描述**

配置光线查询[rayQueryInitializeEXT](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_ray_query.txt)函数中的rayFlags和cullMask参数，高24bit表示rayFlags，低8bit表示cullMask。 默认值为0x5FF，即 ((gl\_RayFlagsOpaqueEXT | gl\_RayFlagsTerminateOnFirstHitEXT) << 8) | 0xFF。

### sunDirection

PhonePC/2in1TabletTV



```
1. float XEG_RTShadowParameters::sunDirection[3]
```

**描述**

方向光的方向。