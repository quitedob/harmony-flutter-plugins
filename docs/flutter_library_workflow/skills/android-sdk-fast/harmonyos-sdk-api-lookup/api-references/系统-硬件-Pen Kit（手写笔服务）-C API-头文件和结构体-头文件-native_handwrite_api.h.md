## 概述

PhonePC/2in1Tablet

声明用于对外提供手写能力。

**库：** libhandwrite\_ndk.z.so

**引用文件：** <handwrite/native\_handwrite\_api.h>

**系统能力：** SystemCapability.Stylus.Handwrite

**起始版本：** 6.0.0(20)

**相关模块：** [HandWrite](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-c)

## 汇总

PhonePC/2in1Tablet

### 结构体

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| struct [HandWrite\_HistoricalPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint) | 定义历史触摸点信息的结构体。 |

### 枚举

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| enum [Handwrite\_ErrCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-c#handwrite_errcode) {  E\_NO\_ERROR = 0,  E\_PARAMS = 401,  E\_INNER\_ERROR = 1010400001  } | 定义手写错误码。 |

### 函数

PhonePC/2in1Tablet

展开

| 名称 | 函数 |
| --- | --- |
| int32\_t [HMS\_HandWrite\_GetPredictPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-c#hms_handwrite_getpredictpoint)(const [HandWrite\_HistoricalPoint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/pen-handwrite-struct-historicalpoint) \*event, int32\_t size, float \*predictPointX, float \*predictPointY) | 此接口用于获取预测点。 |