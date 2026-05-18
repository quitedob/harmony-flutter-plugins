## 概述

PhoneTabletTV

此结构体描述当前设备网络延迟信息，游戏应用获取到网络延迟后传递此参数。该参数通常用于针对性优化网络延迟。

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
| int32\_t [total](/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_latency#total) | 游戏的总延迟，以ms为单位，取值范围[0,200]。 |
| int32\_t [up](/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_latency#up) | 游戏上行时延，以ms为单位，取值范围[0,200]。 |
| int32\_t [down](/consumer/cn/doc/harmonyos-references/_open_g_t_x___network_latency#down) | 游戏下行时延，以ms为单位，取值范围[0,200]。 |

## 结构体成员变量说明

PhoneTabletTV

### down

PhoneTabletTV



```
1. int32_t OpenGTX_NetworkLatency::down
```

**描述**

游戏下行时延，以ms为单位，取值范围[0,200]。

### total

PhoneTabletTV



```
1. int32_t OpenGTX_NetworkLatency::total
```

**描述**

游戏的总延迟，以ms为单位，取值范围[0,200]。

### up

PhoneTabletTV



```
1. int32_t OpenGTX_NetworkLatency::up
```

**描述**

游戏上行时延，以ms为单位，取值范围[0,200]。