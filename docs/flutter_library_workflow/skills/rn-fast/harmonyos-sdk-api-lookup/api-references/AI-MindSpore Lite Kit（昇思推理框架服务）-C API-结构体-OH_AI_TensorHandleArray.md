

```
1. typedef struct OH_AI_TensorHandleArray {...} OH_AI_TensorHandleArray
```

## 概述

PhonePC/2in1TabletTVWearable

张量数组结构体，用于存储张量数组指针和张量数组长度。

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
| size\_t handle\_num | 张量数组长度。 |
| [OH\_AI\_TensorHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-mindspore-oh-ai-tensorhandle)\* handle\_list | 指向张量数组的指针。 |