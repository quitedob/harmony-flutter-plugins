## 概述

PhonePC/2in1Tablet

弱信号预测相关信息。

**起始版本：** 5.1.0(18)

**相关模块：** [NetworkBoost](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-overview)

**所在头文件：** [network\_boost\_quality.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/network-boost-c-files-quality)

## 汇总

PhonePC/2in1Tablet

### 成员变量

PhonePC/2in1Tablet

展开

| 名称 | 描述 |
| --- | --- |
| bool [isLastPredictionValid](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction#islastpredictionvalid) | 最近一次的弱信号预测是否有效，true表示最近一次的弱信号预测依旧有效，false表示最近一次的弱信号预测失效，此时startTime和duration参数忽略。 |
| uint32\_t [startTime](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction#starttime) | 预计多长时间进入弱信号（单位：s），取值范围为0和任意正数。 |
| uint32\_t [duration](/consumer/cn/doc/harmonyos-references/network-boost-c-struct-weak_signal_prediction#duration) | 预计在弱信号区域停留时长（单位：s），取任意正数。取值0，此次预测结果无效。 |

## 结构体成员变量说明

PhonePC/2in1Tablet

### duration

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_WeakSignalPrediction::duration
```

**描述**

预计在弱信号区域停留时长（单位：s），取任意正数。取值0，此次预测结果无效。

### isLastPredictionValid

PhonePC/2in1Tablet



```
1. bool NetworkBoost_WeakSignalPrediction::isLastPredictionValid
```

**描述**

最近一次的弱信号预测是否有效，true表示最近一次的弱信号预测依旧有效，false表示最近一次的弱信号预测失效，此时startTime和duration参数忽略。

### startTime

PhonePC/2in1Tablet



```
1. uint32_t NetworkBoost_WeakSignalPrediction::startTime
```

**描述**

预计多长时间进入弱信号（单位：s），取值范围为0和任意正数。