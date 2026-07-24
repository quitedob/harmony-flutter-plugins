

```
1. typedef struct ImageEffect_FilterDelegate {...} ImageEffect_FilterDelegate
```

## 概述

PhonePC/2in1TabletTV

自定义滤镜回调函数结构体。

**起始版本：** 12

**相关模块：** [ImageEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-imageeffect)

**所在头文件：** [image\_effect\_filter.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_EffectFilterDelegate\_SetValue](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#oh_effectfilterdelegate_setvalue) setValue | 参数设置函数指针。 |
| [OH\_EffectFilterDelegate\_Render](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#oh_effectfilterdelegate_render) render | 滤镜渲染函数指针。 |
| [OH\_EffectFilterDelegate\_Save](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#oh_effectfilterdelegate_save) save | 序列化效果器函数指针。 |
| [OH\_EffectFilterDelegate\_Restore](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-image-effect-filter-h#oh_effectfilterdelegate_restore) restore | 反序列化效果器函数指针。 |