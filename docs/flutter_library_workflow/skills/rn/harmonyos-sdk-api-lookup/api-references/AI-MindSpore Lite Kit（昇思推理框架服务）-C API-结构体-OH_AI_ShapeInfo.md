

```
1. typedef struct OH_AI_ShapeInfo {...} OH_AI_ShapeInfo
```

## 概述

PhonePC/2in1TabletTVWearable

形状维度大小，预留最大维度是32，当前实际支持的最大维度是8。

**起始版本：** 9

**相关模块：** [MindSpore](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mindspore)

**所在头文件：** [model.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-model-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| size\_t shape\_num | 维度数组长度。 |
| int64\_t shape[OH\_AI\_MAX\_SHAPE\_NUM] | 维度数组。 |