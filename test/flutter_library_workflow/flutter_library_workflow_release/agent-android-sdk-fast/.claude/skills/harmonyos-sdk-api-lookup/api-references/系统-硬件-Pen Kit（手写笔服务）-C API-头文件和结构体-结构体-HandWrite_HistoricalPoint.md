## 概述

PhonePC/2in1Tablet

定义历史触摸点信息的结构体。

**系统能力：** SystemCapability.Stylus.HandWrite

**起始版本：** 6.0.0(20)

**相关模块：** [HandWrite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-c)

**所在头文件：** [native\_handwrite\_api.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-headerfile-declare)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| float [x](/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint#x) | 历史触摸点的X坐标，相对于被触摸元素左边缘，单位：像素。 |
| float [y](/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint#y) | 历史触摸点的Y坐标，相对于被触摸元素上边缘，单位：像素。 |
| int64\_t [timeStamp](/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint#timestamp) | 当前历史触摸点的时间戳，单位：ns。 |
| float [force](/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint#force) | 当前历史触摸点的压力值。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### x

PhonePC/2in1Tablet



```
1. float HandWrite_HistoricalPoint::x
```

**描述**

历史触摸点的X坐标，相对于被触摸元素左边缘。

### y

PhonePC/2in1Tablet



```
1. float HandWrite_HistoricalPoint::y
```

**描述**

历史触摸点的Y坐标，相对于被触摸元素上边缘。

### timeStamp

PhonePC/2in1Tablet



```
1. int64_t HandWrite_HistoricalPoint::timeStamp
```

**描述**

当前历史触摸点的时间戳，单位为ns。

### force

PhonePC/2in1Tablet



```
1. float HandWrite_HistoricalPoint::force
```

**描述**

当前历史触摸点的压力值。