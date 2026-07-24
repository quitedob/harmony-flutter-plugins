## 概述

PhoneTabletTV

此结构体描述下发帧生成命令[HMS\_FG\_Dispatch\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_fg_dispatch_gles)需要的参数信息，每一帧都需要进行更新。该接口仅适配OpenGL ES图形API平台。

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

**所在头文件：** [frame\_generation\_gles.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/frame__generation__gles_8h)

## 汇总

PhoneTabletTV

### 成员变量

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t [inputColor](/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___g_l_e_s#inputcolor) | 真实渲染帧颜色缓冲区索引，支持格式包括GL\_RGBA8、GL\_R11F\_G11F\_B10F、GL\_RGBA16F。  取值范围：[0, 2^32 -1]。 |
| uint32\_t [inputDepthStencil](/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___g_l_e_s#inputdepthstencil) | 真实渲染帧深度模板缓冲区索引，支持格式包括GL\_DEPTH24\_STENCIL8、GL\_DEPTH32F\_STENCIL8。  取值范围：[0, 2^32 -1]。 |
| [FG\_Mat4x4](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___mat4x4) [viewProj](/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___g_l_e_s#viewproj) | 真实渲染帧视图投影矩阵，即世界空间到相机裁剪空间坐标系转换矩阵，矩阵必须是4x4列主序的矩阵。 |
| [FG\_Mat4x4](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_f_g___mat4x4) [invViewProj](/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___g_l_e_s#invviewproj) | 真实渲染帧逆视图投影矩阵，即相机裁剪空间到世界空间坐标系转换矩阵，矩阵必须是4x4列主序的矩阵。 |
| uint32\_t [outputColor](/consumer/cn/doc/harmonyos-references/_f_g___dispatch_description___g_l_e_s#outputcolor) | 预测帧缓冲区索引，此预测帧缓冲区需要用户创建并输入，支持格式包括GL\_RGBA8、GL\_R11F\_G11F\_B10F、GL\_RGBA16F。  取值范围：[0, 2^32 -1]。 |

## 结构体成员变量说明

PhoneTabletTV

### inputColor

PhoneTabletTV



```
1. uint32_t FG_DispatchDescription_GLES::inputColor
```

**描述**

真实渲染帧颜色缓冲区索引，支持格式包括GL\_RGBA8、GL\_R11F\_G11F\_B10F、GL\_RGBA16F。

### inputDepthStencil

PhoneTabletTV



```
1. uint32_t FG_DispatchDescription_GLES::inputDepthStencil
```

**描述**

真实渲染帧深度模板缓冲区索引，支持格式包括GL\_DEPTH24\_STENCIL8、GL\_DEPTH32F\_STENCIL8。

### invViewProj

PhoneTabletTV



```
1. FG_Mat4x4 FG_DispatchDescription_GLES::invViewProj
```

**描述**

真实渲染帧逆视图投影矩阵，即相机裁剪空间到世界空间坐标系转换矩阵，矩阵必须是4x4列主序的矩阵。

### outputColor

PhoneTabletTV



```
1. uint32_t FG_DispatchDescription_GLES::outputColor
```

**描述**

预测帧缓冲区索引，此预测帧缓冲区需要用户创建并输入，支持格式包括GL\_RGBA8、GL\_R11F\_G11F\_B10F、GL\_RGBA16F。

### viewProj

PhoneTabletTV



```
1. FG_Mat4x4 FG_DispatchDescription_GLES::viewProj
```

**描述**

真实渲染帧视图投影矩阵，即世界空间到相机裁剪空间坐标系转换矩阵，矩阵必须是4x4列主序的矩阵。