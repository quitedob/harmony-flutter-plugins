

```
1. typedef struct OH_NN_QuantParam {...} OH_NN_QuantParam
```

## 概述

PhonePC/2in1TabletTV

量化信息。

在量化的场景中，32位浮点型数据根据以下公式量化为定点数据：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/3IKpZA_wTxC2H28j8enakA/zh-cn_image_0000002568920214.png?HW-CC-KV=V1&HW-CC-Date=20260511T064700Z&HW-CC-Expire=86400&HW-CC-Sign=7CE721B9D97D00D1274B08BDB6E3365044826EBB4B62B1783BFF90326D4710A2)

其中s和z是量化参数，在OH\_NN\_QuantParam中通过scale和zeroPoint保存，r是浮点数，q是量化后的结果，q\_min是量化后下界，q\_max是量化后的上界，计算方式如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e7/v3/VVBUvY7TRJualQIp1bFdlA/zh-cn_image_0000002599479757.png?HW-CC-KV=V1&HW-CC-Date=20260511T064700Z&HW-CC-Expire=86400&HW-CC-Sign=7030366211742AEDD7CB0009B9E04825E0ADFBC6E7E74E3138D27A700B36529D)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4a/v3/URyWbTdaSdiZ6JOLwopXjw/zh-cn_image_0000002568760568.png?HW-CC-KV=V1&HW-CC-Date=20260511T064700Z&HW-CC-Expire=86400&HW-CC-Sign=E49FA5FB68723B76DCC62B220EF7750C265B1AA7FEDA3932245B3306EE81BA5D)

clamp函数定义如下：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/Wccq183iTemAxPZYWI4XUg/zh-cn_image_0000002599359809.png?HW-CC-KV=V1&HW-CC-Date=20260511T064700Z&HW-CC-Expire=86400&HW-CC-Sign=CD9EB10B2C8520DADC68200B66D4D13F13984EDBB9CD26073E9E0760F3866BC8)

**起始版本：** 9

**废弃版本：** 11

**替代接口：** [NN\_QuantParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-neuralnetworkruntime-nn-quantparam)

**相关模块：** [NeuralNetworkRuntime](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-neuralnetworkruntime)

**所在头文件：** [neural\_network\_runtime\_type.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-neural-network-runtime-type-h)

## 汇总

PhonePC/2in1TabletTV

### 成员变量

PhonePC/2in1TabletTV

展开

| 名称 | 描述 |
| --- | --- |
| uint32\_t quantCount | 指定numBits、scale和zeroPoint数组的长度。在per-layer量化的场景下，quantCount通常指定为1，即一个张量所有通道共享一套量化参数；在per-channel量化场景下，quantCount通常和张量通道数一致，每个通道使用自己的量化参数。 |
| const uint32\_t \*numBits | 量化位数。 |
| const double \*scale | 指向量化公式中scale数据的指针。 |
| const int32\_t \*zeroPoint | 指向量化公式中zero point数据的指针。 |