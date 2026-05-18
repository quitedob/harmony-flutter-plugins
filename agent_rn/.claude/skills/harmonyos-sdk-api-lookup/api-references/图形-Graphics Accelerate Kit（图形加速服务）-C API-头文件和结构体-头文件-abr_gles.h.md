## 概述

PhoneTabletTV

声明OpenGL ES图形API平台的ABR接口。

**引用文件：** <graphics\_game\_sdk/abr\_gles.h>

**库：** libabr.so

**系统能力：** SystemCapability.GraphicsGame.RenderAccelerate

**起始版本：** 5.0.0(12)

**相关模块：** [GraphicsAccelerate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate)

## 汇总

PhoneTabletTV

### 函数

PhoneTabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [ABR\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#abr_errorcode-1) [HMS\_ABR\_MarkFrameBuffer\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_abr_markframebuffer_gles)([ABR\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#abr_context)\* context) | 标记ABR进行自适应渲染处理的GLES Buffer，需要在GLES Buffer开始渲染前调用此接口。 |
| [ABR\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#abr_errorcode-1) [HMS\_ABR\_GetScaledTexture\_GLES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#hms_abr_getscaledtexture_gles)([ABR\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/_graphics_accelerate#abr_context)\* context, uint32\_t originTexture, uint32\_t\* scaledTexture) | 根据原始分辨率的GLES纹理索引获取ABR自适应缩放后的GLES纹理索引。调用前需确认原始纹理有效、渲染上下文有效。originTexture为原始纹理ID，该值不能为0，否则无法正确获取scaledTexure，接口功能失效；scaledTexture不能为空指针，否则会返回错误码ABR\_INVALID\_PARAMETER。 |